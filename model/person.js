const mongoose = require('./db.js');
const Schema = mongoose.Schema;

var person_schema = new Schema({
	student_name: {
		type: String,
		required: true
	},
	student_id: {
		type: String,
		required: true
	},
	student_sex: {
		type: String
	},
	student_cls: {
		type: String,
		required: true
	},
	user_email: {
		type: String,
		required: true
	}
});

const person_model = mongoose.model('persons',person_schema);

function person() {};

// 插入
person.prototype.insert = function(strObj) {
	var newPerson = new person_model(strObj.people);
	newPerson.save((err,res) => {
		if(err) return strObj.fn(err);
		strObj.fn(null,res);
	})
};

// 查找
person.prototype.find = function(strObj) {
	person_model.find(strObj.str,(err,row) => {
		if(err) return strObj.fn(err);
		strObj.fn(null,row);
	})
};

// 删除
person.prototype.remove = function(str) {
	person_model.remove(str,(err, res) => {
		if(err) return consoel.log(err);
	})
};

// 更新
person.prototype.update = function(whereStr,updateStr) {
	person_model.update(whereStr,updateStr,(err,res) => {
		if(err) return consoel.log(err);
	})
}

module.exports = new person();

