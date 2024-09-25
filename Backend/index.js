import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Functions
async function getData(prompt) {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyBsJI41rgA-jzQPkSLcgdETXvOsQ0OlCUY"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const message = await result.response.text();
  // console.log(result.response.text());

  return message;
}

app.post("/gemini", (req, res) => {
  const prompt = req.body.prompt;
  getData(prompt).then((message) => {
    console.log(`data : ${message}`);
    res.json({ message });
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
