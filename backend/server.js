import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'

const app = express()
const PORT = 8000

app.use(cors())
app.use(clerkMiddleware())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(requireAuth())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
