const express = require('express');
const router = express.Router();
const {checkForAuthorization,onlyAdmin} = require('../controllers/auth')
const {createProduct,getAllProducts,getInstructorProduct,getCourseById} = require('../controllers/product');

router.post('/createproduct/',checkForAuthorization,onlyAdmin,createProduct);
router.get('/getallproducts/',getAllProducts);
router.get('/instructorcourses',checkForAuthorization,onlyAdmin,getInstructorProduct)
router.get('/product/:id',checkForAuthorization,onlyAdmin,getCourseById)

module.exports = router;