var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userviews = new Schema({
    UserId: { type: String, require: true, default: "" },
    ViewDate: { type: Date, require: true, default: "" },
    ProductId: { type: String, require: true, default: "" },
});
module.exports = mongoose.model('userviews', userviews);
