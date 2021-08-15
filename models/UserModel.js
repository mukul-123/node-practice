const { model, Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Number, required: true,default:1 },
    last_login_ip: { type: String, required: false },
    created_at: { type: Date, required: true },
    modified_at: Date,
  },
  { versionKey: false, autoIndex: true }
);

// export const AuthorModel = model("AuthorModel", AuthorSchema);
module.exports= model('users', UserSchema);
