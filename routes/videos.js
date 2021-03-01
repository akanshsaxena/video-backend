const router = require("express").Router();
const Video = require("../model/Video");

router.get("/getVideo/", async (req, res) => {
  try {
    const {
      _id,
      search
    } = req.query;
    if (_id === "null" && search === "null") {
      const getAdv = await Video.find({});
      res.send(getAdv);
    } else if (search != "null" && _id === "null") {
      const getAdv = await Video.find({
        title: search
      });
      res.send(getAdv);
    } else {
      const getAdv = await Video.find({
        _id: _id
      });
      res.send(getAdv);
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/updateVotes/", async (req, res) => {
  try {
    const {
      _id
    } = req.query;
    const video = await Video.findOne({
      _id: _id,
    });
    let views = video.views;
    const updatedBook = await Video.updateOne({
      _id: _id,
    }, {
      views: views + 1,
    });
    if (updatedBook.ok) {
      console.log("updated vote");
      res.send(updatedBook);
    } else {
      console.log("failed");
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;


/*router.post("/upload", async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) {
    console.log(error);
    return res.send(error.details[0].message);
  }
  const book = new Book({
    authorId: req.body.authorId,
    title: req.body.title,
    description: req.body.description,
    readTime: req.body.readTime,
    category: req.body.category,
    language: req.body.language,
    author: req.body.author,
    thumbnailImg: req.body.thumbnailImg,
    pdfLink: req.body.pdfLink,
  });
  try {
    const savedBook = await book.save();
    console.log("uploaded new book");
    res.send(savedBook);
  } catch (err) {
    res.send(err);
  }
});

router.get("/get/", async (req, res) => {
  try {
    const { category, authorId, bookId, searchText } = req.query;
    if (category === "all") {
      if (!authorId.includes("null")) {
        console.log("searched in author id");
        const getAdv = await Book.find({
          authorId: authorId,
        });
        res.send(getAdv);
      } else if (!bookId.includes("null")) {
        console.log("searched in book id");
        const getAdv = await Book.find({
          _id: bookId,
        });
        res.send(getAdv);
      } else if (!searchText.includes("0")) {
        console.log("search insearch text");
        const getAdv = await Book.find({});
        res.send(getAdv);
      }
    } else {
      console.log("category searched");
      const getAdv = await Book.find({
        category: category,
      });
      res.send(getAdv);
    }
  } catch (err) {
    res.send(err);
  }
});
*/