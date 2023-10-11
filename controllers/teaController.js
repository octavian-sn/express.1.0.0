const Tea = require('../models/tea');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async(req, res, next)=> {
    res.send('Not implemented <b>YET</b>: Home page.')
})

exports.tea_list = asyncHandler(async(req, res, next)=> {
    res.send('Not implemented <b>YET</b>: Tea list.')
})

exports.tea_detail = asyncHandler(async(req, res, next)=> {
    res.send(`Not implemented <b>YET</b>: ${req.params.id}.`)
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
