const Tea = require('../models/tea');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async(req, res, next)=> {
    const [
        numTea, 
        numCategories,
    ] = await Promise.all([
        Tea.countDocuments({}).exec(),
        Category.countDocuments({}).exec(),
    ]);
    res.render('index', {
        title: 'Tea store',
        head: 'head',
        sidebar: 'sidebar',
        tea_count: numTea,
        category_count: numCategories,
    })
})

exports.tea_list = asyncHandler(async(req, res, next)=> {
    const allTea = await Tea.find({})
    .sort({ title: 1})
    .exec();

    res.render('tea_list', {
        title: 'Tea List',
        head: 'head',
        sidebar: 'sidebar',
        tea_list: allTea,
    })
})

exports.tea_detail = asyncHandler(async(req, res, next)=> {
    const tea = await Tea.findById(req.params.id)
    .sort({ title: 1})
    .populate('category')
    .exec();

    if (tea === null){
        const err = new Error('Tea not found');
        err.status = 404;
        return next(err);
    }

    res.render('tea_detail',{
        title: 'Tea Details',
        head: 'head',
        sidebar: 'sidebar',
        tea,
    })
})

exports.tea_create_get = asyncHandler(async(req, res, next)=> {
    const categories = await Category.find({})
    res.render('tea_form', {
        title: 'Add Tea',
        head: 'head',
        sidebar: 'sidebar',
        categories,
    })
})

exports.tea_create_post = [
    (req, res, next) => {
        if (!(req.body.categories instanceof Array)) {
          if (typeof req.body.categories === "undefined") req.body.categories = [];
          else req.body.categories = new Array(req.body.categories);
        }
        next();
    },

    // Validate and sanitize the name field.
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "Price must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("stock", "Stock must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
  
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a tea object with escaped and trimmed data.
      const tea = new Tea({ 
        name: req.body.name, 
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,  
      });
  
      if (!errors.isEmpty()) {
        const categories = await Category.find({})

        // There are errors. Render the form again with sanitized values/error messages.
        res.render("tea_form", {
            title: 'Add Tea',
            head: 'head',
            sidebar: 'sidebar',
            categories,
            tea
        });
        return;
      } else {
        // Data from form is valid.
        // Check if tea with same name already exists.
        const teaExists = await Tea.findOne({ name: req.body.name }).exec();
        if (teaExists) {
          // tea exists, redirect to its detail page.
          res.redirect(teaExists.url);
        } else {
          await tea.save();
          // New tea saved. Redirect to tea detail page.
          res.redirect(tea.url);
        }
      }
    }),
];

exports.tea_delete_get = asyncHandler(async(req, res, next)=> {
    const tea = await Tea.findById(req.params.id);
    res.render('tea_delete',{
        title: 'Delete Tea',
        head: 'head',
        sidebar: 'sidebar',
        tea
    })
})

exports.tea_delete_post = asyncHandler(async(req, res, next)=> {
    await Tea.findByIdAndRemove(req.body.teaid);
    res.redirect('/store/tea-list');
})

exports.tea_update_get = asyncHandler(async(req, res, next)=> {
    const [tea, categories] = await Promise.all([
        Tea.findById(req.params.id).exec(),
        Category.find({}).exec()
    ]);
    res.render('tea_form',{
        title: 'Update Tea',
        head: 'head',
        sidebar: 'sidebar',
        categories,
        tea,
    })
})

exports.tea_update_post = [
    (req, res, next) => {
        if (!(req.body.categories instanceof Array)) {
          if (typeof req.body.categories === "undefined") req.body.categories = [];
          else req.body.categories = new Array(req.body.categories);
        }
        next();
    },

    // Validate and sanitize the name field.
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("price", "Price must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("stock", "Stock must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
  
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a tea object with escaped and trimmed data.
      const tea = new Tea({ 
        name: req.body.name, 
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,  
        _id: req.params.id,
      });
  
      if (!errors.isEmpty()) {
        const categories = await Category.find({})

        // There are errors. Render the form again with sanitized values/error messages.
        res.render("tea_form", {
            title: 'Add Tea',
            head: 'head',
            sidebar: 'sidebar',
            categories,
            tea
        });
        return;
      } else {
        // Data from form is valid.
        const updatedTea = await Tea.findByIdAndUpdate(req.params.id, tea, {});
        // Redirect to tea detail page.
        res.redirect(updatedTea.url);
      }
    }),
];
