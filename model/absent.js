const mongoose = require('./db.js');
const Schema = mongoose.Schema;

var absent_schema = new Schema({
  cls_name: {
    type: String,
    required: true
  },
  cls_numbers: {
    type: Number,
    required: true
  },
  absend_date: { // 缺席的日期
    type: String
  },
  absend_year: {
    type: String,
    required: true,
  },
  absend_month: {
    type: String,
    required: true,
  },
  absend_day: {
    type: String,
    required: true,
  },
  absend_time: {
    type:String,
    required: true
  },
  students: {
    type: Array,
    required: true
  },
  user_email: {
    type: String,
    required: true
  }
});

const absent_model = mongoose.model('absent', absent_schema);

function absent() {};

// 插入当日某班级迟到的同学
absent.prototype.insert = function(strObj) {
  var newAbsent = new absent_model(strObj.obj);
  newAbsent.save((err, row) => {
    if (err) return strObj.fn(err);
    strObj.fn(null, row);
  })
};

// 查找当日某班级迟到的同学
absent.prototype.find = function(strObj) {
  absent_model.find(strObj.obj, (err, row) => {
    if (err) return console.log(err);
    strObj.fn(null, row);
  })
};

// 更新当日某班级迟到的同学
absent.prototype.update = function(strObj) {
  absent_model.update(strObj.whereObj, strObj.updateObj, (err, row) => {
    if (err) return strObj.fn(err);
    strObj.fn(null, row);
  })
}

module.exports = new absent();
