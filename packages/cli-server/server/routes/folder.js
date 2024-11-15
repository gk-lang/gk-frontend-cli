import express from "express";
import * as fs from "node:fs";
const router = express.Router();
function getFolderList(path) {
  let cwdPath = "";
  if (path) {
    cwdPath = path;
  } else {
    process.argv.find((item) => {
      if (item.includes("cwdPath")) {
        cwdPath = item.split("=")[1];
      }
    });
  }
  cwdPath = cwdPath.trim();
  const files = fs.readdirSync(cwdPath, { withFileTypes: true });
  const childrenPathList = files.map((file) => {
    const isHidden = /^\./.test(file.name);
    if (file.isDirectory()) {
      return { name: file.name, type: "directory", isHiddenFile: isHidden };
    } else {
      return { name: file.name, type: "file", isHiddenFile: isHidden };
    }
  });
  return {
    cwdPath,
    childrenPathList,
  };
}
router.post("/list", function (req, res, next) {
  const queryPath = req.body.path;
  const resp = getFolderList(queryPath);
  const data = {
    code: 200,
    codeRemark: "操作成功",
    message: "这是响应信息描述",
    queryPath: resp.cwdPath,
    data: resp.childrenPathList,
  };
  res.json(data);
});

export default router;
