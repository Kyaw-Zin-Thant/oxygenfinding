import mongoose from 'mongoose';
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new Schema(
  {
    regionId: {
      type: ObjectId,
      require: true,
    },
    townshipId: {
      type: ObjectId,
      require: true,
    },
    status: {
      type: Array,
      require: true,
    },
    plantName: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    information: {
      type: String,
    },
    remark: {
      type: String,
    },
    size: {
      type: Array,
      require: true,
    },
    tomorrowUpdate: {
      type: Boolean,
      default: false,
    },
    getDate: {
      type: Date,
    },
    type: {
      type: String,
      enum: ['Oxygen', 'Flowmeter', 'Oximeter'],
    },
    metadata: {
      likes: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: Number,
        default: 0,
      },
      comments: [
        {
          userId: ObjectId,
          username: String,
          text: String,
          createDate: Date,
        },
      ],
      likeUsers: [],
      dislikeUsers: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Post', PostSchema);
