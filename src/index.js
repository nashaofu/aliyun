import Koa from 'koa'
import fs from 'fs-extra'
import cors from '@koa/cors'
import parser from 'koa-parser'
import Router from 'koa-router'
import request from './request'

const app = new Koa()
const router = new Router()

router.post('/image', async (ctx, next) => {
  if (!ctx.request.body) return ctx.throw(400, '请求参数非法')
  if (!ctx.request.body.file) return ctx.throw(400, '请求参数非法')
  const file = await fs.readFile(ctx.request.body.file.path)
  const { data } = await request(file)
  ctx.body = JSON.stringify(data)
  await next()
})

app.use(cors())
app.use(parser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, err => {
  if (err) throw err
  console.log('http port: 3000')
})
