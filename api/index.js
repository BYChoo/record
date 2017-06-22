const express = require('express');
const router = express.Router();
const fs = require('fs');
const formidable = require('formidable');
const csv = require('node-csv').createParser();
const async = require('async');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');

// 数据库操作逻辑
const person = require('../model/person.js');
const Cls = require('../model/cls.js');
const absent = require('../model/absent.js');
const User = require('../model/user.js');

// 挂载路由: "/api"

// 上传班级文件并存入数据库
router.post('/uploadFile', (req, res) => {
  var form = new formidable.IncomingForm(); // 创建上传表单  
  form.encoding = 'utf8'; // 设置编码格式
  form.uploadDir = 'static/file'; // 设置上传目录  
  form.keepExtensions = true; // 保留后缀  
  form.maxFieldsSize = 20 * 1024 * 1024; // 文件大小

  form.parse(req, (err, fields, files) => {
    let cls_numbers = 0;
    let cls_name = fields.cls_name; // 上传名册班别
    let user_email = fields.email;
    let parsePath = files.file.path; // 上传后的路径
    csv.parseFile(parsePath, (err, data) => { // 解析csv文件
      if (err) return console.log(err);

      async.waterfall([
        function(cb) {
          Cls.findOne({
            cls: {
              user_email,
              cls_name
            },
            fn(err,row) {
              if(row.length > 0) {
                res.send('fail');
                return;
              } else {
                cb(null);
              }
            }
          })
        },
        function() {
          for (let i = 0; i < data.length; i++) { // 插入名册同学数据
            cls_numbers++;
            let curPerson = data[i];
            let people = {
              student_cls: cls_name,
              student_name: curPerson[0],
              student_id: curPerson[1],
              student_sex: curPerson[2],
              user_email: user_email
            };
            person.insert({
              people,
              fn(error, row) {
                if (error) console.log(err);
              }
            });
          };

          Cls.insert({ // 插入班级数据
            cls: {
              cls_name,
              cls_numbers,
              user_email
            },
            fn(err, row) {
              if (err) console.log(err);
              res.send('success');
            }
          });

          fs.unlink(parsePath, (err) => { // 删除临时文件
            if (err) console.log(err);
          })
        }
      ], function(err) {
        if (err) {
          console.log(err);
        }
      })
    })
  });
});

// 获取所有名册
router.get('/get_allRestor', (req, res) => {
  Cls.findOne({
    cls: {
      user_email: req.query.user_email
    },
    fn(err, row) {
      if (err) console.log(err);
      res.send(row);
    }
  })
});

// 获取某一班级名册
router.get('/get_cls', (req, res) => {
  let cls_name = req.query.cls_name;
  let user_email = req.query.user_email;
  person.find({
    str: {
      student_cls: cls_name,
      user_email
    },
    fn(err, row) {
      if (err) return console.log(err);
      res.send(row);
    }
  })
});

// 发送今天迟到的同学
router.post('/add_cutStudents', (req, res) => {
  let now = new Date();

  async.waterfall([
    function(cb) {
      Cls.findOne({
        cls: {
          cls_name: req.body.cls_name
        },
        fn(err, row) {
          if (err) console.log(err);
          cb(null, row[0].cls_numbers);
        }
      })
    },
    function(nums) {
      absent.insert({
        obj: {
          cls_name: req.body.cls_name,
          absend_date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
          absend_time: req.body.time,
          students: req.body.cutStudents,
          cls_numbers: nums,
          user_email: req.body.email
        },
        fn(err, row) {
          if (err) console.log(err);
          res.send('success');
        }
      })
    }
  ], function(err) {
    console.log(err);
  })
});

// 获取今天迟到的同学
router.get('/get_dayAbsent', (req, res) => {
  let absend_date = req.query.objDate;
  let cls_name = req.query.cls_name;
  let user_email = req.query.email
  absent.find({
    obj: {
      cls_name,
      absend_date,
      user_email
    },
    fn(err, row) {
      if (err) console.log(err);
      res.send(row);
    }
  })
});

// 获取“不是今天”中有缺勤同学的班级
router.get('/get_noTodayAbsent', (req, res) => {
  // 日期,老师
  let absend_date = req.query.date;
  let user_email = req.query.email;
  async.waterfall([
    function(cb) {
      absent.find({
        obj: {
          absend_date,
          user_email
        },
        fn(err, row) {
          if (err) console.log(err);
          res.send(row);
        }
      })
    }
  ], function(err) {
    console.log(err);
  })
});

// 判断日期是否有人迟到
router.get('/get_caledarDay', (req, res) => {
  let absend_date = req.query.date;
  let user_email = req.query.email;
  absent.find({
    obj: {
      absend_date,
      user_email
    },
    fn(err, row) {
      if (err) console.log(err);
      if (row) {
        res.send({
          date: absend_date,
          flag: row.length
        });
      }
    }
  })
});

// 用户注册
router.post('/register', (req, res) => {
  let obj = {
    user_name: req.body.name,
    user_password: cryPwd(req.body.password),
    user_deparment: req.body.deparment,
    user_position: req.body.position,
    user_email: req.body.email
  };

  async.waterfall([
    function(cb) {
      User.find({
        obj: {
          user_email: req.body.email
        },
        fn(err, row) {
          if (err) console.log(err);
          if (row.length > 0) {
            res.send('fail');
          } else {
            cb(null);
          }
        }
      })
    },
    function() {
      User.insert({
        obj,
        fn(err, row) {
          console.log(row);
          if (err) console.log(err);
          res.send(row);
        }
      })
    }
  ], function(err) {
    console.log(err);
  })
});

// 用户登录
router.post('/login', (req, res) => {
  let obj = {
    user_email: req.body.email,
    user_password: cryPwd(req.body.password)
  }
  User.find({
    obj,
    fn(err, row) {
      if (err) console.log(err);
      if (row.length <= 0) {
        res.send('fail');
      } else {
        res.send(row);
      }
    }
  })
})

// 密码加密
function cryPwd(password) {
  var md5 = crypto.createHash('md5');
  return md5.update(password).digest('hex');
}

module.exports = router;
