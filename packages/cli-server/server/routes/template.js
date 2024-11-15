import express from "express";
const router = express.Router();
import { templateList } from "../../constants.js";
router.post("/list", function (req, res, next) {
  const data = {
    code: 200,
    codeRemark: "操作成功",
    message: "这是响应信息描述",
    data: templateList,
  };
  res.json(data);
});

export default router;
