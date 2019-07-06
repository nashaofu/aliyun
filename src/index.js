import Koa from 'koa'
import http from 'http'
import path from 'path'
import https from 'https'
import fs from 'fs-extra'
import parser from 'koa-parser'
import Router from 'koa-router'
import request from './request'

const app = new Koa()
const router = new Router()

router.post('/image', async (ctx, next) => {
  const file = await fs.readFile(ctx.request.body.file.path)
  const { data } = await request(file)
  ctx.body = JSON.stringify(data)
  await next()
})
const options = {
  key: fs.readFileSync(path.join(__dirname, '../ssl/server.key')), // ssl文件路径
  cert: fs.readFileSync(path.join(__dirname, '../ssl/server.pem')) // ssl文件路径
}
app.use(parser())
app.use(router.routes())
app.use(router.allowedMethods())

http.createServer(app.callback()).listen(3001)
https.createServer(options, app.callback()).listen(3000)

// app.listen(3000, (err) => {
//   if (err) throw err
//   console.log('app listen port: 3000')
// })
