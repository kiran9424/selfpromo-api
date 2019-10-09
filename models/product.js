const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({

    title: { type: String, required: true },
    subtitle: String,
    image: String,
    description: String,
    price: Number,
    discountedPrice: Number,
    status: {
        type: String,
        enum: ['active', 'inactive', 'deleted', 'published'],
        default: 'active'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    wsl: [{ type: mongoose.Schema.Types.Mixed, value: String }],
    requirements: [{ type: mongoose.Schema.Types.Mixed, value: String }],
    promoVideoLink: String,
    productLink: String
});

module.exports = mongoose.model('Product', productSchema);