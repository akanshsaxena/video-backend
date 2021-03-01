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


router.post("/upload", async (req, res) => {
  
  const video = new Video({
	user: {
	    _id: req.body._id,
	    first_name: req.body.first_name,
	    last_name: req.body.last_name,
	    image: req.body.image,
		subscribers: req.body.subscribers,
	},
    filePath: req.body.filePath,	
	createdAt: req.body.createdAt,
	views: req.body.views,
	watch: req.body.watch,
    minutes: req.body.minutes,
    seconds: req.body.seconds,
	hours: req.body.hours,
    title: req.body.title,
    description: req.body.description,
    tags: req.body.tags,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
	
  });
  try {
    const savedBook = await video.save();
    console.log("uploaded new book");
    res.send(savedBook);
  } catch (err) {
    res.send(err);
  }
});
/*
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