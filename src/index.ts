import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Hello Bun!' })
})

app.post('/run-command', async (c) => {
  const {command} = await c.req.json();

  if(!command){
    c.status(400);
    return c.json({
      status: "ERROR",
      result: "ERROR",
      message: "command cannot be empty"
    })
  }

  return c.json({
    status: "SUCCESS",
    result: "PASSED",
    command: command
  })
})

const port = parseInt(process.env.PORT!) || 3001
console.log(`Running at http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}