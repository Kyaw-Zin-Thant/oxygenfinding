import mongoose from 'mongoose'
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema.Types

const TownshipSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true
    },
    regionId: {
      type: ObjectId,
      require: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Township', TownshipSchema)
