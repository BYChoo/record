const express = require('express');
const favicon = require('serve-favicon')
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/src/assets/favicon.ico'));
app.use(express.static('dist'));

app.use('/api',api);

app.get('*',(req,res,next) => {
	res.sendFile('./dist/index.html');
});

app.listen(port, () => {
  console.log(`服务器运行在端口:${port}`)
});

module.exports = app;
