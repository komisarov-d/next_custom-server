import { CREATE_POST, REMOVE_POST, SET_POSTS } from './postReducer';
import { IPost, ISetPosts } from "store/types";

type TPostForm = {
   title: string,
   body: string
}

export const createPostAction = (postForm: TPostForm) => ({ type: CREATE_POST, payload: { postForm } })

export const setPostAction = (payload: IPost[]): ISetPosts => ({ type: SET_POSTS, payload });

export const removePostAction = (_id: number) => ({
   type: REMOVE_POST,
   payload: { _id },
});

