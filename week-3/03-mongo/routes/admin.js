const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = express.Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username: username,
    password: password,
  });

  res.json(
    {
    message: "ADMIN created successfully.",
    }
  );
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic

  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const image = req.body.image;

  await Course.create({
    title: title,
    description: description,
    price: price,
    image: image
  })

  res.send("Course created Successfully.")

  //res.send("Working");
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  
  const response = await Course.find()
  res.status(200).json(response)
});

module.exports = router;
