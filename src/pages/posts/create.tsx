
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPostAction } from 'store/postStore/postActions'

export default function createPost() {
   const dispatch = useDispatch()
   const [postForm, setPostForm] = useState({
      title: '',
      body: ''
   })
   const changeHandler = (e: { target: { name: any; value: any } }) => {
      setPostForm({ ...postForm, [e.target.name]: e.target.value })
   }
   const submitHandler = (e: { preventDefault: () => void }) => {
      e.preventDefault()
      dispatch(createPostAction({ ...postForm }))
   }
   return (
      <>
         <div>
            PostsPage
            
            <form onSubmit={submitHandler}>
               <input value={postForm.title} onChange={changeHandler} type="text" name='title' />
               <input value={postForm.body} onChange={changeHandler} type="text" name='body' />
               <button>Send</button>
            </form>

         </div>
      </>)
}


