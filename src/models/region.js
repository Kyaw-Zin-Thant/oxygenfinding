import mongoose from 'mongoose'
const { Schema } = mongoose

const RegionSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      require: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Region', RegionSchema)
