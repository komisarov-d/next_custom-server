import { NextPageContext } from "next"
import axios from "axios"
import { IPost } from "store/types";
import { useDispatch } from "react-redux";
import { removePostAction } from "store/postStore/postActions";


export interface PostProps {
   post: IPost
}
export default function Post({ post }: PostProps) {
   const dispatch = useDispatch()
   const deleteHandler = () => {
      dispatch(removePostAction(post._id))
   }
   console.log(post);


   if (!post) {
      return <div> Loading...</div>
   }
   return (<>
      <p>Post {post.body}</p>
      <button onClick={deleteHandler}>Delete</button>
   </>)
}
Post.getInitialProps = async ({ query }: NextPageContext) => {
   // console.log(query);

   const response = await axios.get<any>(`http://localhost:3000/api/posts/post/${query.id}`)


   return { post: response.data.post }
}
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//    const response = await axios.get<any>(`http://localhost:3000/api/posts/post/${params!.id}`)
//    const serverPost = response.data.post
//    return { props: { serverPost } }
// }
// export async function getStaticPaths() {
//    return {
//       paths: [
//          '/posts/:id',
//       ],
//       fallback: true,
//    }
// }
