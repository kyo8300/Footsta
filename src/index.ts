import express from 'express'
const app = express()
const PORT = 4000

app.get('/', (_: any, res: any) => {
  res.send('hello world!')
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
})
