const Category = require('../models/category');
const Tea = require('../models/tea');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.category_list = asyncHandler(async(req, res, next)=> {
    const allCategories = await Category.find({})
    .sort({ title: 1})
    .exec();

    res.render('category_list', {
        title: 'Category List',
        head: 'head',
        sidebar: 'sidebar',
        category_list: allCategories,
    })
})

exports.category_detail = asyncHandler(async(req, res, next)=> {
    const [category, allTea] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Tea.find({ category: req.params.id}).exec(),
    ]) 

    if (category === null){
        const err = new Error('category not found');
        err.status = 404;
        return next(err);
    }

    res.render('category_detail',{
        title: 'Category List',
        head: 'head',
        sidebar: 'sidebar',
        tea_list: allTea,
        category,
    })
})

exports.category_create_get = (req, res, next) =>{
    res.render('category_form', {
        title: 'Add category',
        head: 'head',
        sidebar: 'sidebar',
    })
}

exports.category_create_post = [
    // Validate and sanitize the name field.
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a category object with escaped and trimmed data.
      const category = new Category({ 
        name: req.body.name, 
        description: req.body.description,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("category_form", {
            title: 'Add category',
            head: 'head',
            sidebar: 'sidebar',
            errors: errors.array(),
            category
        });
        return;
      } else {
        // Data from form is valid.
        // Check if category with same name already exists.
        const categoryExists = await Category.findOne({ name: req.body.name }).exec();
        if (categoryExists) {
          // category exists, redirect to its detail page.
          res.redirect(categoryExists.url);
        } else {
          await category.save();
          // New category saved. Redirect to category detail page.
          res.redirect(category.url);
        }
      }
    }),
]

exports.category_delete_get = asyncHandler(async(req, res, next)=> {
    const [ category, tea_list ] = await Promise.all([
        Category.findById(req.params.id),
        Tea.find({category: req.params.id})
            .sort({ title: 1})
            .exec()
    ])

    res.render('category_delete', {
        title: 'Delete Category',
        head: 'head',
        sidebar: 'sidebar',
        category,
        tea_list,
    })
})

exports.category_delete_post = asyncHandler(async(req, res, next)=> {
    await Category.findByIdAndRemove(req.body.categoryid);
    res.redirect('/store/categories');
})

exports.category_update_get = asyncHandler(async(req, res, next)=> {
    const category = await Category.findById(req.params.id);
    res.render('category_form', {
        title: 'Update Category',
        head: 'head',
        sidebar: 'sidebar',
        category
    })
})

exports.category_update_post = [
    // Validate and sanitize the name field.
    body("name", "Name must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a category object with escaped and trimmed data.
      const category = new Category({ 
        name: req.body.name, 
        description: req.body.description,
        _id: req.params.id,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.render("category_form", {
            title: 'Update category',
            head: 'head',
            sidebar: 'sidebar',
            errors: errors.array(),
            category
        });
        return;
      } else {
        // Data from form is valid.
        await Category.findByIdAndUpdate(req.params.id, category, {});
        // Redirect to category detail page.
        res.redirect(category.url)
      }
    }),
]
