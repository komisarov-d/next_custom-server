import express, { Request, Response } from 'express'
import next from 'next'
import mongoose from 'mongoose'
import postRouter from './routes/main.routes'

const PORT = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express()
server.use(express.json());
const startServer = async () => {
  try {
    await app.prepare()
    await mongoose.connect('mongodb+srv://dmitriykomis:dmitriy123qwe@cluster0.ilgc5.mongodb.net/blog')

    server.use('/api/posts', postRouter)

    server.get('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    server.listen(PORT, (err?: any) => {
      if (err) throw err
      // tslint:disable-next-line:no-console
      console.log(` Ready on port ${PORT}`)
    })
  } catch (ex) {
    // tslint:disable-next-line:no-console
    console.error(ex.stack)
    process.exit(1)
  }
}
startServer()
// await mongoose.connect('mongodb+srv://dmitriykomis:dmitriy123qwe@cluster0.ilgc5.mongodb.net/blog')