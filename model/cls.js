const mongoose = require('./db.js');
const Schema = mongoose.Schema;

var cls_schema = new Schema({
	cls_name: {
		type: String,
		required: true
	},
	cls_numbers: {
		type: Number,
		required: true
	},
	user_email: { // 用户凭据
		type: String,
		required: true
	}
});

const cls_model = mongoose.model('cls',cls_schema);

function cls() {};

// 插入班级数据
cls.prototype.insert = function(strObj) {
	var newCls = new cls_model(strObj.cls);
	newCls.save((err,res) => {
		if(err) return strObj.fn(err);
		strObj.fn(null,res)
	})
};

// 查找班级数据
cls.prototype.findAll = function(fn) {
	cls_model.find({},(err,row) => {
		if(err) return fn(err);
		fn(null,row);
	})
};

// 查找某班级数据
cls.prototype.findOne = function(obj) {
	cls_model.find(obj.cls,(err,row) => {
		if(err) obj.fn(err,row);
		obj.fn(null,row);
	})
}

module.exports = new cls();