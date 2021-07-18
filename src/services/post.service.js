import Region from '../models/region';
import Township from '../models/township';
import Post from '../models/post';
import User from '../models/user';
const ObjectId = require('mongoose').Types.ObjectId;

async function getPostService({
  regionId,
  townshipId,
  tomorrowUpdate,
  userId,
  sorting = 'desc',
  filter = '',
}) {
  try {
    let sortDirection = sorting === 'desc' ? -1 : 1;

    let filterQuery = filter
      ? {
          $match: {
            type: filter,
          },
        }
      : filter == 'Oxygen'
      ? {
          $match: {
            type: null,
          },
        }
      : { $match: {} };

    let sortQuery =
      tomorrowUpdate == 'true'
        ? { $sort: { getDate: sortDirection, createdAt: -1 } }
        : { $sort: { createdAt: sortDirection } };
    let projectData = {
      $project: {
        regionId: 1,
        townshipId: 1,
        status: 1,
        plantName: 1,
        address: 1,
        phoneNumber: 1,
        information: 1,
        remark: 1,
        size: 1,
        tomorrowUpdate: 1,
        metadata: 1,
        like: {
          $cond: [{ $in: [userId, '$metadata.likeUsers'] }, true, false],
        },
        dislike: {
          $cond: [{ $in: [userId, '$metadata.dislikeUsers'] }, true, false],
        },
        getDate: 1,
        type: { $cond: ['$type', '$type', ''] },
        createdAt: 1,
      },
    };
    if (!regionId) {
      if (!townshipId) {
        if (tomorrowUpdate === 'true') {
          const post = await Post.aggregate([
            {
              $match: { tomorrowUpdate: true },
            },
            filterQuery,
            projectData,
            sortQuery,
          ]);
          return post;
        }
        const post = await Post.aggregate([
          {
            $match: { tomorrowUpdate: false },
          },
          filterQuery,
          projectData,
          sortQuery,
        ]);
        return post;
      }
      if (tomorrowUpdate === 'true') {
        const post = await Post.aggregate([
          {
            $match: {
              townshipId: ObjectId(townshipId),
              tomorrowUpdate: true,
            },
          },
          filterQuery,
          projectData,
          sortQuery,
        ]);
        return post;
      }
      const post = await Post.aggregate([
        {
          $match: {
            townshipId: ObjectId(townshipId),
            tomorrowUpdate: false,
          },
        },
        filterQuery,
        projectData,
        sortQuery,
      ]);
      return post;
    }

    if (!townshipId) {
      console.log('no twon');
      if (tomorrowUpdate === 'true') {
        const post = await Post.aggregate([
          {
            $match: {
              regionId: ObjectId(regionId),
              tomorrowUpdate: true,
            },
          },
          filterQuery,
          projectData,
          sortQuery,
        ]);
        return post;
      }
      const post = await Post.aggregate([
        {
          $match: {
            regionId: ObjectId(regionId),
            tomorrowUpdate: false,
          },
        },
        filterQuery,
        projectData,
        sortQuery,
      ]);
      return post;
    }
    const region = await Region.findOne({ _id: regionId });
    if (!region) {
      const err = new Error();
      err.message = 'Region not found.';
      err.status = 400;
      throw err;
    }
    const township = await Township.findOne({ _id: townshipId });
    if (!township) {
      const err = new Error();
      err.message = 'Township not found.';
      err.status = 400;
      throw err;
    }
    if (tomorrowUpdate === 'true') {
      const post = await Post.aggregate([
        {
          $match: {
            regionId: region._id,
            townshipId: township._id,
            tomorrowUpdate: true,
          },
        },
        filterQuery,
        projectData,
        sortQuery,
      ]);
      return post;
    }
    const post = await Post.aggregate([
      {
        $match: {
          regionId: region._id,
          townshipId: township._id,
          tomorrowUpdate: false,
        },
      },
      filterQuery,
      projectData,
      sortQuery,
    ]);
    console.log(post);
    return post;
  } catch (error) {
    const err = new Error();
    err.message = error.message;
    err.status = error.status;
    throw err;
  }
}

async function createPostService({
  regionId,
  townshipId,
  status,
  plantName,
  address,
  phoneNumber,
  information,
  remark,
  size,
  tomorrowUpdate,
  getDate,
  type,
}) {
  try {
    const region = await Region.findOne({ _id: regionId });
    if (!region) {
      const err = new Error();
      err.message = 'Region not found.';
      err.status = 400;
      throw err;
    }
    const township = await Township.findOne({ _id: townshipId });
    if (!township) {
      const err = new Error();
      err.message = 'Township not found.';
      err.status = 400;
      throw err;
    }
    getDate ? (getDate = new Date(getDate)) : '';
    const post = new Post({
      regionId: region._id,
      townshipId: township._id,
      status,
      plantName,
      address,
      phoneNumber,
      information,
      remark,
      size,
      tomorrowUpdate,
      getDate,
      type,
    });
    await post.save();
    return { message: 'Success.' };
  } catch (error) {
    const err = new Error();
    err.message = error.message;
    err.status = error.status;
    throw err;
  }
}

async function likePostService({ id, userId }) {
  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      const err = new Error();
      err.message = 'Post not found.';
      err.status = 400;
      throw err;
    }
    let likes = post.metadata.likes;
    let dislikes = post.metadata.dislikes;
    const comments = post.metadata.comments;
    const likeUsers = post.metadata.likeUsers;
    const dislikeUsers = post.metadata.dislikeUsers;
    const checkUser = likeUsers.includes(userId);
    const checkDislikeUser = dislikeUsers.includes(userId);
    if (checkDislikeUser) {
      const disLikeIndex = dislikeUsers.indexOf(userId);
      disLikeIndex > -1 ? dislikeUsers.splice(disLikeIndex, 1) : '';
      disLikeIndex > -1 ? (dislikes = dislikes - 1) : '';
    }
    if (checkUser) {
      likes = likes - 1;
      const index = likeUsers.indexOf(userId);
      if (index > -1) {
        likeUsers.splice(index, 1);
      }

      await Post.findByIdAndUpdate(id, {
        metadata: {
          likes: likes,
          dislikes: dislikes,
          comments: comments,
          likeUsers: likeUsers,
          dislikeUsers: dislikeUsers,
        },
      });
      return { message: 'Success' };
    }
    likes = likes + 1;
    likeUsers.push(userId);
    await Post.findByIdAndUpdate(id, {
      metadata: {
        likes: likes,
        dislikes: dislikes,
        comments: comments,
        likeUsers: likeUsers,
        dislikeUsers: dislikeUsers,
      },
    });
    return { message: 'Success.' };
  } catch (error) {
    const err = new Error();
    err.message = error.message;
    err.status = error.status;
    throw err;
  }
}

async function dislikePostService({ id, userId }) {
  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      const err = new Error();
      err.message = 'Post not found.';
      err.status = 400;
      throw err;
    }
    let likes = post.metadata.likes;
    let dislikes = post.metadata.dislikes;
    const comments = post.metadata.comments;
    const likeUsers = post.metadata.likeUsers;
    const dislikeUsers = post.metadata.dislikeUsers;
    const checkUser = dislikeUsers.includes(userId);
    const checkLikeUser = likeUsers.includes(userId);
    if (checkLikeUser) {
      const likeIndex = likeUsers.indexOf(userId);
      console.log(likeIndex);
      likeIndex > -1 ? likeUsers.splice(likeIndex, 1) : '';
      likeIndex > -1 ? (likes = likes - 1) : '';
    }
    if (checkUser) {
      dislikes = dislikes - 1;
      const index = dislikeUsers.indexOf(userId);
      console.log(index, ' fff ');
      if (index > -1) {
        dislikeUsers.splice(index, 1);
      }

      await Post.findByIdAndUpdate(id, {
        metadata: {
          likes: likes,
          dislikes: dislikes,
          comments: comments,
          likeUsers: likeUsers,
          dislikeUsers: dislikeUsers,
        },
      });
      return { message: 'Success' };
    }
    dislikes = dislikes + 1;
    dislikeUsers.push(userId);
    await Post.findByIdAndUpdate(id, {
      metadata: {
        likes: likes,
        dislikes: dislikes,
        comments: comments,
        likeUsers: likeUsers,
        dislikeUsers: dislikeUsers,
      },
    });
    return { message: 'Success.' };
  } catch (error) {
    const err = new Error();
    err.message = error.message;
    err.status = error.status;
    throw err;
  }
}

async function commentPostService({ id, userId, text }) {
  try {
    const post = await Post.findOne({ _id: id });
    const user = await User.findOne({ _id: ObjectId(userId) });
    if (!post) {
      const err = new Error();
      err.message = 'Post not found.';
      err.status = 400;
      throw err;
    }
    const comments = post.metadata.comments;

    const data = {
      userId,
      text,
      username: user ? user.name : '',
      createDate: new Date(),
    };
    comments.push(data);
    await Post.findByIdAndUpdate(id, {
      metadata: {
        likes: post.metadata.likes,
        dislikes: post.metadata.dislikes,
        comments: comments,
        likeUsers: post.metadata.likeUsers,
        dislikeUsers: post.metadata.dislikeUsers,
      },
    });
    return { message: 'Success.' };
  } catch (error) {
    const err = new Error();
    err.message = error.message;
    err.status = error.status;
    throw err;
  }
}

export {
  getPostService,
  createPostService,
  likePostService,
  dislikePostService,
  commentPostService,
};
