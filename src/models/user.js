import mongoose from 'mongoose'
const { Schema } = mongoose

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    phone: {
      type: String,
      unique: true,
      require: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('User', UserSchema)
