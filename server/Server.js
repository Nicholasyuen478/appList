const express = require("express");
const axios = require("axios");
const cors = require("cors");
const controller = require("./Function/controller");
//express app
const app = express();

//listen for requests
app.listen(3001, () => {
  console.log("listen to 3001");
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET"],
  })
);

//API 
app.get("/getAppList", async (req, res) => {
  const limit = req.query.limit;

  const url =
    limit === 10
      ? "https://rss.applemarketingtools.com/api/v2/hk/apps/top-free/10/apps.json"
      : limit === 20
      ? "https://rss.applemarketingtools.com/api/v2/hk/apps/top-free/25/apps.json"
      : "https://rss.applemarketingtools.com/api/v2/hk/apps/top-free/50/apps.json";

  let callBack = await axios.get(url);
  //   console.log("callBack", callBack);
  if (callBack.status !== 200) {
    res.send({ result: "failed" });
  }
  let appList = await controller.getInformation(
    callBack.data.feed.results.slice(limit - 10, limit)
  );
  // console.log("newAppList", newAppList);
  res.send({ data: appList, result: "success" });
});

app.get("/getAppRecommendation", async (req, res) => {
  const url =
    "https://rss.applemarketingtools.com/api/v2/hk/apps/top-paid/10/apps.json";

  let callBack = await axios.get(url);
  // console.log("callBack", callBack);
  if (callBack.status !== 200) {
    res.send({ result: "failed" });
  }

  let appList = await controller.getInformation(callBack.data.feed.results);
  // console.log("appList", appList);
  res.send({ data: appList, result: "success" });
});
