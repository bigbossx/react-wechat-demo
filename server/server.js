const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const Video = model.getModel('video')
// Chat.remove({},(e,d)=>{})
// User.remove({},(e,d)=>{})
// Video.remove({},(e,d)=>{})
const server = require('http').Server(app)
const io = require('socket.io')(server)
var path = require('path')
app.use(express.static(path.join(__dirname, 'build')))
io.on('connection', function (socket) {
  // console.log('socket connect success')
  socket.on('sendMsg', function (data) {
    console.log(data)
    const {from, to, msg} = data
    const chatId = [from, to].sort().join('_')
    Chat.create({chatId,from,to,content: msg}, (err, doc) => {
      io.emit('getMsg', Object.assign({}, doc._doc))
    })
  })
  socket.on('sendAddRequest', function (data) {
    const {userId, to} = data
    let create_time = new Date().getTime()
    // 将数据存入对方信息列表中
    User.findOne({_id: to}, (err, doc) => {
      if (doc) {
        doc.friends.push({userId,from: userId,create_time})
        doc.save((err2, doc2) => {
        })
      }
    })
    // 将数据存入自己信息列表中
    User.findOne({_id: userId}, (err, doc) => {
      if (doc) {
        doc.friends.push({userId: to,from: userId,create_time})
        doc.save((err2, doc2) => {
          io.emit('getAddRequest', Object.assign({}, data, {create_time: create_time}))
        })
      }
    })
  })
})
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)
server.listen(8081, () => {
  console.log('node start in port 8081')
})
// process.on('uncaughtException', function (err) {
//   console.log(err)
// })

app.get('/data/user', (req, res) => {
  User.find({}, (err, doc) => {
    if (!err) {
      res.json(doc)
    }
  })
})
app.get('/data/video', (req, res) => {
  Video.find({}, (err, doc) => {
    if (!err) {
      res.json(doc)
    }
  })
})
