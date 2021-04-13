import mongoose, { Schema } from 'mongoose';
import { IPost } from 'server/serverTypes/postsTypes';


const postSchema: Schema = new Schema({
   title: { type: String, required: true },
   body: { type: String, required: true }
})
export default mongoose.model<IPost>('Post', postSchema)
