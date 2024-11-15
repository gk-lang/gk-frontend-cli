import express from "express";
import * as os from "node:os";
import * as path from "node:path";
import { JsonDB, Config } from 'node-json-db';
const router = express.Router();
const db = new JsonDB(new Config(`${os.homedir()}/.jzt-cli/db.json`, true, false, '/'));
router.post("/save", async function (req, res, next) {
    const reqData = req.body;
    const data = {
        code: 200,
        codeRemark: "操作成功",
        message: "这是响应信息描述",
        data: reqData
    };
    let presetList = []
    try {
      presetList = await db.getData("/preset");
    } catch (error) {
      presetList = [];
    }
    presetList.push(reqData)
    console.log(presetList);
    await db.push("/preset",presetList);
    res.json(data);
});

router.post("/list", function (req, res, next) {
//   const queryPath = req.body.path;
  const data = {
    code: 200,
    codeRemark: "操作成功",
    message: "这是响应信息描述",
    data: os.homedir(),
  };
  res.json(data);
});
export default router;


