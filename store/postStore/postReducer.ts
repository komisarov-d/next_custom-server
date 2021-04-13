import { updateObjectInArray } from './../utils/updateObjInArr';
import { TodoActions, TodoState } from "store/types";

export const SET_POSTS = "SET_POSTS";
export const CREATE_POST = "CREATE_POST";
export const REMOVE_POST = "REMOVE_POST";
export const UPDATE_POST = "UPDATE_POST";

const initialState: TodoState = {
   posts: []
};

const postReducer = (state = initialState, action: TodoActions) => {
   switch (action.type) {
      case SET_POSTS:
         return { ...state, posts: action.payload }
      case CREATE_POST:
         return { ...state, posts: [...state.posts, action.payload] }
      case REMOVE_POST:
         return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }
      case UPDATE_POST:
         return {
            ...state,
            posts: updateObjectInArray(state.posts,
               action.payload,
               '_id',
               { title: action.payload.title, body: action.payload.body })
         };
      default:
         return { ...state, };
   }
};

export default postReducer