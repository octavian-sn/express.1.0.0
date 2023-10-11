const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TeaSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: String, required: true},
    stock: {type: Number, required: true},
    category: {type: Schema.Types.ObjectId, ref:'Category'},
})

TeaSchema.virtual('url').get(function(){
    return `/store/tea/${this._id}`;
})

module.exports = mongoose.model('Tea', TeaSchema);