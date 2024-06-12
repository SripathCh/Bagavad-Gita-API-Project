import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { chapterData: null, error: null });
});

app.post("/getChapter", async (req, res) => {
  const chapterNumber = req.body.chapter;
  const options = {
    method: 'GET',
    url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/`,
    headers: {
      'x-rapidapi-key': '26d69d14fcmshfb94cb660660a1fp1d31e8jsn69b9116cda2d',
      'x-rapidapi-host': 'bhagavad-gita3.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.render("index", { chapterData: response.data, error: null });
  } catch (error) {
    res.render("index", { chapterData: null, error: "Error fetching chapter data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
