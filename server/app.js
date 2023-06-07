// 加载Express模块
const express = require("express");

// 加载MySQL模块
const mysql = require("mysql");

// 加载bodyParser模块
const bodyParser = require("body-parser");

// 加载MD5模块
const md5 = require("md5");

// 创建MySQL连接池
const pool = mysql.createPool({
  host: "127.0.0.1", //MySQL服务器地址
  port: 3306, //MySQL服务器端口号
  user: "root", //数据库用户的用户名
  password: "", //数据库用户密码
  database: "cartoon", //数据库名称
  connectionLimit: 20, //最大连接数
  charset: "utf8", //数据库服务器的编码方式
});

// 创建服务器对象
const server = express();

server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//5.错误处理中间件
server.use((err, req, res, next) => {
  //查看错误信息 (后台cmd中查看)
  console.log(err);
  //响应500和返回响应信息
  res.status(500).send({
    code: 500,
    msg: "服务器端错误",
  });
});

// 加载CORS模块
const cors = require("cors");

// 使用CORS中间件
server.use(
  cors({
    origin: "*",
  })
);

//配置multer中间件
const multer = require("multer");
obj = multer.diskStorage({
  destination: function (req, file, cb) {
    //指定目录
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    // 指定文件名
    // console.log(uuid.v1())
    // console.log(uuid.v4())
    let name = file.originalname;
    // name:  abcd.jpg    xxxdfdd.zip
    let ext = name.substr(name.lastIndexOf("."));
    cb(null, uuid.v4() + ext);
  },
});
const uploadTools = multer({
  storage: obj, // 定义文件的存储规则 （怎么存？保存在哪里？文件名叫什么？）
});
const uuid = require("uuid");

// 静态资源托管upload目录
server.use(express.static("upload"));

// 指定服务器对象监听的端口号
server.listen(3000, () => {
  console.log("server is running...");
});

//接收请求
server.post("/upload", uploadTools.array("uploadFile"), (req, res) => {
  console.log(req.files);
  //整理图片访问地址,返回给客户端
  //{msg:'ok',urls:['http://xxxx','http://xxxxx',....]}
  let urls = [];
  req.files.forEach((item) => {
    urls.push(`http://localhost:3000/${item.filename}`);
  });

  res.send({ msg: "ok", urls: urls });
});

// // 获取所有文章分类的接口
// server.get('/category', (req, res) => {
//   // SQL语句以获取文章分类表的数据
//   let sql = 'SELECT id,category_name FROM xzqa_category ORDER BY id';
//   // 执行SQL语句
//   pool.query(sql, (error, results) => {
//     if (error) throw error;
//     res.send({ message: 'ok', code: 200, results: results });
//   });
// });

// // 获取指定分类下包含文章数据的接口
// server.get('/articles', (req, res) => {
//   // 获取客户端传递的cid参数
//   let cid = req.query.cid;

//   // 获取客户端传递的page参数
//   let page = req.query.page? req.query.page : 1;

//   // 存储每页显示的记录数
//   let pagesize = 20;

//   // 通过公式来计算从第几条记录开始返回
//   let offset = (page - 1) * pagesize;

//   // 用于存储获取到的总记录数
//   let rowcount;

//   // 获取指定分类下的文章总数
//   let sql = 'SELECT COUNT(id) AS count FROM xzqa_article WHERE category_id=?';

//   pool.query(sql, [cid], (error, results) => {
//     if (error) throw error;
//     // 将获取到总记录数赋给rowcount变量
//     rowcount = results[0].count;
//     /**************************************************/
//     // 根据总记录数和每页显示的记录数来计算总页数
//     let pagecount = Math.ceil(rowcount / pagesize);

//     // 查询SQL语句
//     sql = 'SELECT id,subject,description,image FROM xzqa_article WHERE category_id=? LIMIT ?,?';
//     // 执行SQL
//     pool.query(sql, [cid, offset, pagesize], (error, results) => {
//       if (error) throw error;
//       res.send({ message: 'ok', code: 200, results: results, pagecount: pagecount });
//     });

//     /**************************************************/
//   });

// });

// 获取特定文章数据的接口
server.get("/detail", (req, res) => {
  //获取地址栏中的id参数
  let m_id = req.query.m_id;

  // SQL查询
  let sql = "select * from message where m_id=?";

  // 执行SQL查询
  pool.query(sql, [m_id], (error, results) => {
    if (error) throw error;
    // 返回数据到客户端
    res.send({ message: "ok", code: 200, result: results[0] });
  });
});

// 获取特定文章数据的接口
server.get("/cooperation", (req, res) => {
  //获取地址栏中的id参数
  let i_id = req.query.i_id;

  // SQL查询
  let sql = "select * from ip where i_id=?";

  // 执行SQL查询
  pool.query(sql, [i_id], (error, results) => {
    if (error) throw error;
    // 返回数据到客户端
    res.send({ message: "ok", code: 200, result: results[0] });
  });
});

// //用户注册接口
// server.post('/register', (req, res) => {
//   //console.log(md5('12345678'));
//   // 获取用户名和密码信息
//   let username = req.body.username;
//   let password = req.body.password;
//   //以username为条件进行查找操作，以保证用户名的唯一性
//   let sql = 'SELECT COUNT(id) AS count FROM xzqa_author WHERE username=?';
//   pool.query(sql, [username], (error, results) => {
//     if (error) throw error;
//     let count = results[0].count;
//     if (count == 0) {
//       // 将用户的相关信息插入到数据表
//       sql = 'INSERT xzqa_author(username,password) VALUES(?,MD5(?))';
//       pool.query(sql, [username, password], (error, results) => {
//         if (error) throw error;
//         res.send({ message: 'ok', code: 200 });
//       })
//     } else {
//       res.send({ message: 'user exists', code: 201 });
//     }
//   });
// });

// 用户登录接口
//(1)用户登录（post/login）
//浏览器请求的地址：/user/login
server.post("/login", (req, res, next) => {
  //接收请求体
  let obj = req.body;
  //执行SQL命令
  pool.query(
    "select * from userinfo where u_names=? and u_pwd=?",
    [obj.u_names, obj.u_pwd],
    (err, data) => {
      //错误处理
      if (err) {
        next(err);
        return;
      }
      console.log(data);
      if (data.length == 0) {
        res.send({
          code: 0,
          msg: "登录失败",
        });
      } else {
        res.send({
          code: 1,
          msg: "登录成功",
          data: data,
        });
      }
    }
  );
});

//(2)用户注册(post /reg)
//浏览器请求的地址：/user/reg
server.post("/reg", (req, res, next) => {
  //查看请求体
  let obj = req.body;
  pool.query("insert into userinfo set ?", [obj], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.affectedRows == 0) {
      res.send({ code: 0, msg: "用户已存在" });
    } else {
      res.send({ code: 1, msg: "注册成功" });
    }
  });
});

//(2)messagelike用户收藏
server.post("/like", (req, res, next) => {
  //查看请求体
  let obj = req.body;
  pool.query("insert into messagelike  set ? ", [obj], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.affectedRows == 0) {
      res.send({ code: 0, msg: "已收藏不要重复收藏" });
    } else {
      res.send({ code: 1, msg: "收藏成功" });
    }
  });
});

//(2)ip用户收藏
server.post("/love", (req, res, next) => {
  //查看请求体
  let obj = req.body;
  pool.query("insert into iplove  set ? ", [obj], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.affectedRows == 0) {
      res.send({ code: 0, msg: "已收藏不要重复收藏" });
    } else {
      res.send({ code: 1, msg: "收藏成功" });
    }
  });
});


//messagelike查询收藏数据 渲染收藏列表
server.get("/selectlike", (req, res, next) => {
  //在整张表的查询功能中不需要传递请求参数
  //执行SQL命令
  pool.query("select * from messagelike;", (err, data) => {
    //错误处理
    if (err) {
      next(err);
      return;
    }
    //检查数据库返回结果
    //  console.log(result);
    //响应反应结果
    res.send({
      code: 1,
      msg: "返回所有数据",
      data: data,
    });
  });
});


//ip查询收藏数据 渲染收藏列表
server.get("/selectlove", (req, res, next) => {
  //在整张表的查询功能中不需要传递请求参数
  //执行SQL命令
  pool.query("select * from iplove;", (err, data) => {
    //错误处理
    if (err) {
      next(err);
      return;
    }
    //检查数据库返回结果
    //  console.log(result);
    //响应反应结果
    res.send({
      code: 1,
      msg: "返回所有数据",
      data: data,
    });
  });
});

//(4)messagelike删除一个收藏数据 (delete /del)
server.get("/del", (req, res, next) => {
  let m_id = req.query.m_id;
  //  console.log(obj);
  pool.query(
    "delete from messagelike where m_id=?",
    [m_id],
    (err, data) => {
      //错误处理
      if (err) {
        next(err);
        return;
      }
      console.log(data);
      //判断数据的变化条数
      if (data.affectedRows == 0) {
        res.send({ code: 0, msg: "删除失败" });
      } else {
        res.send({ code: 1, msg: "删除成功" });
      }
    }
  );
});


//(4)ip删除一个收藏数据 (delete /del)
server.get("/lovedel", (req, res, next) => {
  let i_id = req.query.i_id;
  //  console.log(obj);
  pool.query(
    "delete from iplove where i_id=?",
    [i_id],
    (err, data) => {
      //错误处理
      if (err) {
        next(err);
        return;
      }
      console.log(data);
      //判断数据的变化条数
      if (data.affectedRows == 0) {
        res.send({ code: 0, msg: "删除失败" });
      } else {
        res.send({ code: 1, msg: "删除成功" });
      }
    }
  );
});


//(4)messagelike删除全部收藏数据 (delete /del)
server.get("/likedel", (req, res, next) => {
  pool.query(
    "delete from messagelike",
    (err, data) => {
      //错误处理
      if (err) {
        next(err);
        return;
      }
      console.log(data);
      //判断数据的变化条数
      if (data.affectedRows == 0) {
        res.send({ code: 0, msg: "删除失败" });
      } else {
        res.send({ code: 1, msg: "删除成功" });
      }
    }
  );
});


//(4)ip删除全部收藏数据 (delete /del)
server.get("/ipdel", (req, res, next) => {
  pool.query(
    "delete from iplove",
    (err, data) => {
      //错误处理
      if (err) {
        next(err);
        return;
      }
      console.log(data);
      //判断数据的变化条数
      if (data.affectedRows == 0) {
        res.send({ code: 0, msg: "删除失败" });
      } else {
        res.send({ code: 1, msg: "删除成功" });
      }
    }
  );
});

//(3)用户信息修改  (put  /edit)
server.put("/edit", (req, res, next) => {
  var obj = req.body;
  // console.log(obj);
  var sql = `update userinfo set u_names="${obj.u_names}",u_pwd="${obj.u_pwd}",u_phone="${obj.u_phone}",u_email="${obj.u_email}",u_pic="${obj.u_pic}" where u_phone="${obj.oldphone}";`;
  console.log(sql);
  pool.query(sql, (err, data) => {
    //错误处理
    if (err) {
      next(err);
      return;
    }
    //console.log(result);
    //判断数据的变化条数
    if (data.affectedRows == 0) {
      res.send({ code: 0, msg: "修改失败" });
    } else {
      res.send({ code: 1, msg: "修改成功" });
    }
  });
});

//查询数据 渲染ip列表
server.get("/ip", (req, res, next) => {
  //在整张表的查询功能中不需要传递请求参数
  //执行SQL命令
  pool.query("select * from ip;", (err, data) => {
    //错误处理
    if (err) {
      next(err);
      return;
    }
    //检查数据库返回结果
    //  console.log(result);
    //响应反应结果
    res.send({
      code: 1,
      msg: "返回所有数据",
      data: data,
    });
  });
});

//查询数据 classify渲染列表
server.get("/classify", (req, res, next) => {
  //在整张表的查询功能中不需要传递请求参数
  //执行SQL命令
  pool.query("select * from message;", (err, data) => {
    //错误处理
    if (err) {
      next(err);
      return;
    }
    //检查数据库返回结果
    //  console.log(result);
    //响应反应结果
    res.send({
      code: 1,
      msg: "返回所有数据",
      data: data,
    });
  });
});

//message分类查询
server.post("/page", (req, res, next) => {
  let obj = req.body;
  console.log(obj);
  var m_kind = `%${obj.m_kind}%`;
  var sql = `select * from message where m_kind like ?`;
  pool.query(sql, [m_kind], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.length == 0) {
      res.send({ code: 201, msg: "查询失败" });
    } else {
      res.send({ code: 200, msg: "查询成功", data: data });
    }
  });
});


//message模糊查询
server.post("/pages", (req, res, next) => {
  let obj = req.body;
  console.log(obj);
  var m_title = `%${obj.m_title}%`;
  var sql = `select * from message where m_title like ?`;
  pool.query(sql, [m_title], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.length == 0) {
      res.send({ code: 201, msg: "查询失败" });
    } else {
      res.send({ code: 200, msg: "查询成功", data: data });
    }
  });
});

//ip模糊查询
server.post("/oriori", (req, res, next) => {
  let obj = req.body;
  console.log(obj);
  var i_title = `%${obj.i_title}%`;
  var sql = `select * from ip where i_title like ?`;
  pool.query(sql, [i_title], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.length == 0) {
      res.send({ code: 201, msg: "查询失败" });
    } else {
      res.send({ code: 200, msg: "查询成功", data: data });
    }
  });
});



//(2)search搜索历史
server.post("/histroy", (req, res, next) => {
  //查看请求体
  let obj = req.body;
  pool.query("insert into search  set ? ", [obj], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.affectedRows == 0) {
      res.send({ code: 0, msg: "搜索历史已存在,不需要在搜索" });
    } else {
      res.send({ code: 1, msg: "搜索历史已存在" });
    }
  });
});


//查询数据 search渲染列表
server.get("/histroys", (req, res, next) => {
  //在整张表的查询功能中不需要传递请求参数
  //执行SQL命令
  pool.query("select * from search;", (err, data) => {
    //错误处理
    if (err) {
      next(err);
      return;
    }
    //检查数据库返回结果
    //  console.log(result);
    //响应反应结果
    res.send({
      code: 1,
      msg: "返回所有数据",
      data: data,
    });
  });
});



//(4)删除全部历史搜索记录 (delete /del)
server.get("/delsearch", (req, res, next) => {
  pool.query(
    "delete from search",
    (err, data) => {
      //错误处理
      if (err) {
        next(err);
        return;
      }
      console.log(data);
      //判断数据的变化条数
      if (data.affectedRows == 0) {
        res.send({ code: 0, msg: "删除失败" });
      } else {
        res.send({ code: 1, msg: "删除成功" });
      }
    }
  );
});

//查询收藏数据库是否存在数据,用来判断关注的状态(已关注/未关注)
server.get("/true", (req, res, next) => {
  let m_id = req.query.m_id;
  //  console.log(obj);
  pool.query(
    "select * from messagelike where m_id=?",
    [m_id],
    (err, data) => {
      //错误处理
      if (err) {
        next(err);
        return;
      }
      console.log(data);
      //判断数据的变化条数
      if (data.length == 0) {
        res.send({ code: 0, msg: "未存在" });
      } else {
        res.send({ code: 1, msg: "已存在",data: data });
      }
    }
  );
});