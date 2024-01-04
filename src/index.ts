import { exec } from "child_process";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ message: "Hello Bun!" });
});

app.post("/run-command", async (c) => {
  const { command } = await c.req.json();

  if (!command) {
    c.status(400);
    return c.json({
      status: "ERROR",
      result: "ERROR",
      message: "command cannot be empty",
    });
  }

  try {
    const result = await executeCommand(command);
    return c.json({
      status: "SUCCESS",
      result,
    });
  } catch (err) {
    return c.json({ error: err });
  }
});

const executeCommand = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        // console.log(stdout);
        resolve(stdout.trim());
      }
    });
  });
};

const port = parseInt(process.env.PORT!) || 3001;

export default {
  port,
  fetch: app.fetch,
};
