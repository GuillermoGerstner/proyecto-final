const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Product', ProductSchema);