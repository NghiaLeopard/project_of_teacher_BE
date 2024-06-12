const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model")(mongoose, mongoosePaginate);
db.role = require("./role.model");
db.job = require("./job.model")(mongoose, mongoosePaginate);
db.applicants = require("./appicants.model")(mongoose, mongoosePaginate);
db.notification = require("./notification.model")(mongoose, mongoosePaginate);
db.file = require("./file.model")(mongoose)
db.ROLES = ["employee", "employer", "admin"];

module.exports = db;