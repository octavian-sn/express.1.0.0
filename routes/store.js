const express = require('express');
const router = express.Router();

// Controller modules
const tea_controller = require('../controllers/teaController');
const category_controller = require('../controllers/categoryController');

/* GET store home page. */
router.get('/', tea_controller.index);

// Tea routes
router.get('/tea/create', tea_controller.tea_create_get);

router.post('/tea/create', tea_controller.tea_create_post);

router.get('/tea/:id/delete', tea_controller.tea_delete_get);

router.get('/tea/:id/delete', tea_controller.tea_delete_post);

router.get('/tea/:id/update', tea_controller.tea_delete_get);

router.get('/tea/:id/update', tea_controller.tea_delete_post);

router.get('/tea/:id', tea_controller.tea_detail);

router.get('/tea-list', tea_controller.tea_list);

//Category routes
router.get('/category/create', category_controller.category_create_get);

router.post('/category/create', category_controller.category_create_post);

router.get('/category/:id/delete', category_controller.category_delete_get);

router.get('/category/:id/delete', category_controller.category_delete_post);

router.get('/category/:id/update', category_controller.category_delete_get);

router.get('/category/:id/update', category_controller.category_delete_post);

router.get('/category/:id', category_controller.category_detail);

router.get('/categories', category_controller.category_list);

module.exports = router;
