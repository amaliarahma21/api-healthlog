const router = require('express').Router();
//another route below this line 
const userRoute = require('./users');

router.use('/users', userRoute);
//other route

module.exports = router;