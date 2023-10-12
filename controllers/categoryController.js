const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

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
    res.send(`Not implemented <b>YET</b>: ${req.params.id}.`)
})

exports.category_create_get = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: category_create_get.`)
})

exports.category_create_post = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: category_create_post.`)
})

exports.category_delete_get = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: category_delete_get.`)
})

exports.category_delete_post = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: category_delete_post.`)
})

exports.category_update_get = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: category_update_get.`)
})

exports.category_update_post = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: category_update_post.`)
})
