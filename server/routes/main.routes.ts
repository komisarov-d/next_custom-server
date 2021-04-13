import { Request, Response, Router } from 'express'
import postSchema from '../models/Posts'
const router = Router()


router.get('/', async (_req: Request, res: Response) => {
   try {
      const posts = await postSchema.find({})
      if (!posts.length) {
         return res.json({ message: 'Posts array is empty!' })
      }
      res.status(200).json({ posts })
   } catch (e) {
      return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' })
   }
})
router.get('/post/:id', async (req: Request, res: Response) => {
   try {
      const post = await postSchema.findOne({ _id: req.params.id })

      res.status(200).json({ post })
   } catch (e) {
      return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' })
   }
})
router.post('/create', async (req: Request, res: Response) => {
   try {
      const match = await postSchema.findOne({ title: req.body.title })
      if (match) return res.json({ message: 'Alreaty exist' })
      const { title, body } = req.body

      if (!title || !body) {
         return res.json({ message: 'Some date are empty' })
      }

      const post = new postSchema({ title, body })
      post.save()

      res.status(200).json({ message: 'Success' })
   } catch (e) {
      return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' })
   }
})

router.delete('/remove/:id', async (req: Request, res: Response) => {
   try {
      await postSchema.deleteOne({ _id: req.params.id })
      res.status(200).json({ message: 'Success remove' })
   } catch (e) {
      return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' })
   }
})
router.post('/:id', async (req: Request, res: Response) => {
   try {
      const post = await postSchema.findById(req.params.id)
      if (!post) {
         return res.status(400).json({ message: 'Post not found' })
      }
      const { title, body } = req.body
      post.title = title
      post.body = body
      post.save()
      res.status(200).json({ message: 'Success', post })
   } catch (e) {
      return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' })
   }
})
export default router