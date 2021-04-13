import axios from 'axios'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostAction } from 'store/postStore/postActions'
import { IPost } from 'store/types'
import { MainLayout } from '../../../components/MainLayout'
import { getPostsSelector } from '../../../store/selectors'
import s from '../../styles/Posts.module.scss'

export interface PostsProps {
   serverPosts: IPost[]
}
const Posts: NextPage<PostsProps> = ({ serverPosts }) => {

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(setPostAction(serverPosts))
   }, [])

   const posts = useSelector(getPostsSelector)

   return (
      <MainLayout title={'Posts'}>
         <div>
            <h1 className={s.title}>Posts</h1>
            <ul>
               {posts.map((post: IPost) => {
                  return (
                     <li key={post._id}>
                        <Link href={`/posts/${post._id}`}>
                           <a>
                              {post.title}
                           </a>
                        </Link>
                     </li>
                  )
               })}
            </ul>
         </div>
      </MainLayout>)
}

Posts.getInitialProps = async () => {
   const response = await axios.get<any>('http://localhost:3000/api/posts')

   return { serverPosts: response.data.posts }
}
// export async function getStaticProps() {
//    const response = await axios.get<any>('http://localhost:3000/api/posts')
//    const serverPosts = response.data.posts
//    return {
//       props: { serverPosts }
//    }
// }
export default Posts