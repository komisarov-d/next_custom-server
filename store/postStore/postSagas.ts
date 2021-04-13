import axios from "axios"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { IPost } from "store/types"

import { CREATE_POST, REMOVE_POST, UPDATE_POST } from "./postReducer"
interface ICreatePost {
   title: string,
   body: string
}
const createPost = (postForm: ICreatePost) => {
   console.log({ ...postForm });

   axios.post<IPost>("http://localhost:3000/api/posts/create", { ...postForm })
}
const updatePost = () => axios.post<IPost>("http://localhost:3000/api/posts/update")
const removePost = (_id: number | string) => axios.delete<IPost>(`http://localhost:3000/api/posts/remove/${_id}`)

function* createPostSaga({ payload: { postForm } }: any): any {
   try {

      const response = yield call(createPost, postForm)
      const post = response.data.post
      yield put({ type: CREATE_POST, payload: post })
   } catch (e) {
      console.log('error ' + e);
   }
}
function* updatePostSaga({ payload: { post } }: any): any {
   try {
      yield call(updatePost)
      yield put({ type: UPDATE_POST, post })
   } catch (e) {
      console.log('error ' + e);
   }
}
function* removePostSaga({ payload: { _id } }: any): any {
   try {
      yield call(removePost, _id)
      yield put({ type: REMOVE_POST, _id })
   } catch (e) {
      console.log('error ' + e);
   }
}

function* postSaga() {
   yield all([
      takeLatest(CREATE_POST, createPostSaga),
      takeLatest(UPDATE_POST, updatePostSaga),
      takeLatest(REMOVE_POST, removePostSaga)
   ]);
}

export default postSaga;