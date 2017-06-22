const mongoose = require('./db.js');
const Schema = mongoose.Schema;

var user_schema = new Schema({
	user_name: { // 用户名
		type: String,
		required: true
	},
	user_email: { // 邮箱
		type: String,
		required: true
	},
	user_password: { // 密码
		type: String,
		required: true
	},
	user_deparment: { // 所属院系
		type: String,
		required: true
	},
	user_position: { // 职称
		type: String,
		required: true
	}
});

const user_model = mongoose.model('user',user_schema);

function User() {};

User.prototype.insert = function(mixin) {
	var newUser = new user_model(mixin.obj);
	newUser.save((err,row) => {
		if(err) return mixin.fn(err);
		mixin.fn(null,row);
	})
};

User.prototype.find = function(mixin) {
	user_model.find(mixin.obj,(err,row) => {
		if(err) return mixin.fn(err);
		mixin.fn(null,row);
	})
}

module.exports = new User();