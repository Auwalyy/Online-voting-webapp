 import mongoose from 'mongoose';

 const userSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true
     },
     email: {
         type: String,
         unique: true,
         required: true,
         lowercase: true
     },
     password: {
         type: String,
         required: true
     },
     role: {
         type: String,
         enum: ['voter', 'admin'],
         default: 'voter'
     },
     createdAt: {
         type: Date,
         default: Date.now
     }
 });

 const User = mongoose.models.User || mongoose.model('User', userSchema);
 export default User;