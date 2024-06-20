import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import webhookRouter from "./routes/webhook.routes";

dotenv.config();

const app = express();
app.use(bodyParser.json());
export let chatSessions: any = {};

app.use(webhookRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.get("/well", (req, res) => {
  console.log("started!!")
  res.send("<h1>HellTESHESRorld!</h1>");
}); 

export default app;
