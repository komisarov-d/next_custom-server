import { Document } from "mongoose";

export interface IPost extends Document {
   id: string | number,
   title: string,
   body: string
}