const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const videoRouter = require("./routes/videos");
const port = process.env.PORT || 5000;
dotenv.config();
app.use(cors());

//Connect to DB
mongoose
  .connect('mongodb+srv://akanshsaxena:Mongo%40723@covid19.neusj.mongodb.net/youtube', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
//process.env.DB_CONNECT
app.use(express.json());


app.use("/api/videos", videoRouter);

app.listen(port, () => console.log(	`Server is Up and Running at port: ${port}`));