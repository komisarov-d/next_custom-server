import { CREATE_POST, REMOVE_POST, SET_POSTS, UPDATE_POST } from "./postStore/postReducer";

export interface IPost {
   _id: number,
   title: string,
   body: string
}

export interface TodoState {
   posts: IPost[];
}

export interface IRemovePost {
   type: typeof REMOVE_POST;
   payload: number;
}

export type ICreatePost = {
   type: typeof CREATE_POST;
   payload: IPost;
};

export type IUpdatePost = {
   type: typeof UPDATE_POST;
   payload: IPost;
};
export type ISetPosts = {
   type: typeof SET_POSTS;
   payload: IPost[];
};


export type TodoActions =
   | IRemovePost
   | ICreatePost
   | IUpdatePost
   | ISetPosts