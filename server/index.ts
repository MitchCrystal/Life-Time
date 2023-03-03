import Koa from 'koa'
import bodyp from 'koa-bodyparser'
import cors from '@koa/cors'
import router from './router'
const app = new Koa()
const port = 4500

app.use(cors())
app.use(bodyp())
app.use(router.routes())



app.listen(port, () => {
  console.log(`Server live and listening on port ${port}`)
})