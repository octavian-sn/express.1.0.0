const Tea = require('../models/tea');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

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
    .populate('category')
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
    res.send(`Not implemented <b>YET</b>: tea_create_get.`)
})

exports.tea_create_post = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: tea_create_post.`)
})

exports.tea_delete_get = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: tea_delete_get.`)
})

exports.tea_delete_post = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: tea_delete_post.`)
})

exports.tea_update_get = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: tea_update_get.`)
})

exports.tea_update_post = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: tea_update_post.`)
})
