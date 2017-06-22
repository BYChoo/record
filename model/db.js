const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/record');

// 连接成功
mongoose.connection.on('connected', () => {
	console.log('连接MongoDb数据库成功');
});    

// 连接异常
mongoose.connection.on('error', () => {
	console.log('连接MongoDb数据库异常');
});    
  
module.exports = mongoose;