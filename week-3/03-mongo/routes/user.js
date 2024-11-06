const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic

    const userName = req.body.userName;
    const password = req.body.password;

    try{
        const response = await User.create({
            userName: userName,
            password: password,
            purchasedCourses: []
        })
        res.status(200).send('User created successfully')
    }catch(error){
        console.error('Error: ', error)
    }


});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
    const response = await Course.find()
    res.status(200).json(response)
    }catch(error){
        console.error('Error: ', error)
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const id = req.params.courseId;
    const userId = req.body.userId;

    const userData = await User.findById(userId)
    userData.purchasedCourses.push(id)

    try{
        const response = await User.findByIdAndUpdate(userId, userData)
        res.status(200).send('Course purchased')
    }catch(error){
        console.error('Error: ', error)
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const userName = req.headers.username;

    try{
        const response = await User.findOne({userName: userName})
        res.status(200).send(response.purchasedCourses);
    }catch(error){
        console.error('Error: ', error)
    }
});

module.exports = router