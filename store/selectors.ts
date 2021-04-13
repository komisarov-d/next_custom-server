import { createSelector } from "reselect";
import { AppState } from "./rootReducer";


const getPosts = (state: AppState) => state.posts.posts;

export const getPostsSelector = createSelector(getPosts, (posts) => posts);

