const express = require('express');
const router = express.Router();

const {createCategory,getCategories} = require('../controllers/category');
const {checkForAuthorization,onlyAdmin} = require('../controllers/auth');

router.post('/createcategory',checkForAuthorization,onlyAdmin,createCategory);
router.get('/categories',checkForAuthorization,onlyAdmin,getCategories)
module.exports = router;