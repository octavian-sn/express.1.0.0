const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, minLength: 3, maxLength: 50, required: true},
    description: {type: String},
})

CategorySchema.virtual('url').get(function(){
    return `/store/category/${this._id}`;
})

module.exports = mongoose.model('Category', CategorySchema);
