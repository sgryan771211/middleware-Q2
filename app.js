const express = require('express')
const app = express()
const port = 3000

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const reqTime = (req, res, next) => {
  let date = new Date()
  req.day = date.toLocaleDateString()
  req.time = date.toLocaleTimeString()
  req.start = Date.now()
  next();
};

const resTime = (req, res) => {
  let time = Date.now() - req.start
  if (req.url !== '/favicon.ico') {
    console.log(`${req.day} ${req.time} | ${req.method} from ${req.url} | total time: ${time} ms`)
  }
};

app.use(reqTime)

// 列出全部 Todo
app.get('/', (req, res, next) => {
  res.send(`
  <form action="/" method="POST">
    <button type="submit">Create</button>
  </form>
  <form action="/:id/delete?_method=DELETE" method="POST">
  <button type="submit">delete</button>
  </form>
  `)
  next();
})

// 新增一筆 Todo 頁面
app.get('/new', (req, res, next) => {
  res.send('new')
  next();
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', (req, res, next) => {
  res.send('顯示一筆 Todo')
  next();
})

// 新增一筆  Todo
app.post('/', (req, res, next) => {
  res.send('新增一筆 Todo')
  next();
})

app.delete('/:id/delete', (req, res, next) => {
  res.send('刪除 Todo')
  next();
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})

app.use(resTime)