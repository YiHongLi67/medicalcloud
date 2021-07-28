// mongoose是ODM(对象文档模型)
// 导入mongoose模块
const mongoose = require("mongoose");
const express = require("express");
const app = express();
// 连接数据库
mongoose.connect("mongodb://localhost/medicalcloud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
// 监听连接错误事件
db.on("error", console.error.bind(console, "connection error:"));
// 监听连接成功事件
db.once("open", function () {
  console.log("---连接成功---");
});
// 监听连接关闭事件
db.once("close", function () {
  console.log("连接关闭");
});
// 创建activity集合的约束schema
const cardmsgsSchema = new mongoose.Schema({
  province: String,
  city: String,
  area: String,
  clickMenu: Number,
  readArticle: Number,
  forwardArticle: Number,
  register: Number,
  partner: Number,
});
// 根据schema创建model
const cardmsgs = mongoose.model("cardmsgs", cardmsgsSchema);
app.get("/get-showData", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  const data = {};
  if (req.query.name === "province") {
    await cardmsgs
      .aggregate([
        {
          $group: {
            _id: "$province",
            clickMenu: { $sum: "$clickMenu" },
            readArticle: { $sum: "$readArticle" },
            forwardArticle: { $sum: "$forwardArticle" },
            register: { $sum: "$register" },
            partner: { $sum: "$partner" },
          },
        },
      ])
      .then((result) => {
        // 返回查询结果的总长度给前端
        data.len = result.length;
      });
    await cardmsgs
      .aggregate([
        {
          $group: {
            _id: "$province",
            clickMenu: { $sum: "$clickMenu" },
            readArticle: { $sum: "$readArticle" },
            forwardArticle: { $sum: "$forwardArticle" },
            register: { $sum: "$register" },
            partner: { $sum: "$partner" },
          },
        },
        {
          // 跳过当前页码前面的数据
          $skip: (req.query.page - 1) * req.query.pagesize,
        },
        {
          // 只返回当前页的数据
          $limit: +req.query.pagesize,
        },
      ])
      .then((result) => {
        data.result = result;
        res.send(data);
      });
  }
  if (req.query.name === "city") {
    await cardmsgs
      .aggregate([
        {
          $group: {
            _id: { province: "$province", city: "$city" },
            clickMenu: { $sum: "$clickMenu" },
            readArticle: { $sum: "$readArticle" },
            forwardArticle: { $sum: "$forwardArticle" },
            register: { $sum: "$register" },
            partner: { $sum: "$partner" },
          },
        },
      ])
      .then((result) => {
        data.len = result.length;
      });
    await cardmsgs
      .aggregate([
        {
          $group: {
            _id: { province: "$province", city: "$city" },
            clickMenu: { $sum: "$clickMenu" },
            readArticle: { $sum: "$readArticle" },
            forwardArticle: { $sum: "$forwardArticle" },
            register: { $sum: "$register" },
            partner: { $sum: "$partner" },
          },
        },
        {
          $skip: (req.query.page - 1) * req.query.pagesize,
        },
        {
          $limit: +req.query.pagesize,
        },
      ])
      .then((result) => {
        data.result = result;
        res.send(data);
      });
  }
  if (req.query.name === "area") {
    //返回总的数据条数
    await cardmsgs.find().then((result) => {
      data.len = result.length;
    });
    // 初始化查询第一页的数据
    await cardmsgs
      .find()
      .skip((req.query.page - 1) * req.query.pagesize)
      .limit(5)
      .then((result) => {
        data.result = result;
        res.send(data);
      });
  }
});
app.get("/select-showData", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  let condition;
  req.query.condition && (condition = JSON.parse(req.query.condition));
  const data = {};
  if (condition) {
    // 判断是按年还是按月查询
    let reg;
    condition.yearVal
      ? (reg = new RegExp("^" + condition.yearVal))
      : (reg = new RegExp("^" + condition.monthVal));
    if (condition.areaData.length === 1) {
      //查询全部省（按省分组查询）
      await cardmsgs
        .aggregate([
          {
            $match: {
              date: { $regex: reg },
              province: condition.areaData[0],
            },
          },
          {
            $group: {
              _id: "$province",
              clickMenu: { $sum: "$clickMenu" },
              readArticle: { $sum: "$readArticle" },
              forwardArticle: { $sum: "$forwardArticle" },
              register: { $sum: "$register" },
              partner: { $sum: "$partner" },
            },
          },
        ])
        .then((result) => {
          data.len = result.length;
        });
      await cardmsgs
        .aggregate([
          {
            $match: {
              date: { $regex: reg },
              province: condition.areaData[0],
            },
          },
          {
            $group: {
              _id: "$province",
              clickMenu: { $sum: "$clickMenu" },
              readArticle: { $sum: "$readArticle" },
              forwardArticle: { $sum: "$forwardArticle" },
              register: { $sum: "$register" },
              partner: { $sum: "$partner" },
            },
          },
        ])
        .then((result) => {
          data.result = result;
          res.send(data);
        });
    }
    if (condition.areaData.length === 2) {
      //查询全部市(按市分组查询)
      await cardmsgs
        .aggregate([
          {
            $match: {
              date: { $regex: reg },
              province: condition.areaData[0],
              city: condition.areaData[1],
            },
          },
          {
            $group: {
              _id: { province: "$province", city: "$city" },
              clickMenu: { $sum: "$clickMenu" },
              readArticle: { $sum: "$readArticle" },
              forwardArticle: { $sum: "$forwardArticle" },
              register: { $sum: "$register" },
              partner: { $sum: "$partner" },
            },
          },
        ])
        .then((result) => {
          data.len = result.length;
        });
      await cardmsgs
        .aggregate([
          {
            $match: {
              date: { $regex: reg },
              province: condition.areaData[0],
              city: condition.areaData[1],
            },
          },
          {
            $group: {
              _id: { province: "$province", city: "$city" },
              clickMenu: { $sum: "$clickMenu" },
              readArticle: { $sum: "$readArticle" },
              forwardArticle: { $sum: "$forwardArticle" },
              register: { $sum: "$register" },
              partner: { $sum: "$partner" },
            },
          },
          {
            $skip: (req.query.page - 1) * req.query.pagesize,
          },
          {
            $limit: +req.query.pagesize,
          },
        ])
        .then((result) => {
          data.result = result;
          res.send(data);
        });
    }
    if (condition.areaData.length === 3) {
      //查询全部地区(按区查询)
      await cardmsgs
        .aggregate([
          {
            $match: {
              date: { $regex: reg },
              province: condition.areaData[0],
              city: condition.areaData[1],
              area: condition.areaData[2],
            },
          },
          {
            $group: {
              _id: "$area",
              clickMenu: { $sum: "$clickMenu" },
              readArticle: { $sum: "$readArticle" },
              forwardArticle: { $sum: "$forwardArticle" },
              register: { $sum: "$register" },
              partner: { $sum: "$partner" },
            },
          },
        ])
        .then((result) => {
          data.len = result.length;
        });
      await cardmsgs
        .aggregate([
          {
            $match: {
              date: { $regex: reg },
              province: condition.areaData[0],
              city: condition.areaData[1],
              area: condition.areaData[2],
            },
          },

          {
            $skip: (req.query.page - 1) * req.query.pagesize,
          },
          {
            $limit: +req.query.pagesize,
          },
        ])
        .then((result) => {
          data.result = result;
          res.send(data);
        });
    }
  }
});
app.listen(5000, () => {
  console.log("服务器开启在5000端口....");
});
