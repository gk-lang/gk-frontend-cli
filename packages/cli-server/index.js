#!/usr/bin/env node

/**
 * Module dependencies.
 */
import boxen from "boxen";
import gradientString from "gradient-string";
import app from "./server/app";
// import debugLib from "debug";
import http from "node:http";
import { openBrowser } from "./utils/openBrowser";
import ora from "ora";
import pc from "picocolors";
import morgan from "morgan";

const spinner = ora();

// var debug = debugLib("cli-server:server");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

if (process.env.NODE_ENV !== "production") {
  // 在开发环境中，允许打印 HTML 页面的变化
  app.use(morgan("dev"));
} else {
  // 在生产环境中，禁用日志输出
  app.use(
    morgan("combined", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
    })
  );
}
/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
if (process.env.NODE_ENV === "production") {
  spinner.start("GUI界面启动中...");
  server.listen(port, () => {
    spinner.succeed(`${pc.green("GUI界面启动成功!")}`);
    const address = `http://localhost:${port}`;
    openBrowser(address);
    const welcomeMessage = gradientString("cyan", "magenta").multiline(
      "Hello! 欢迎使用 jzt-cli 脚手架工具 🎉🎉🎉"
    );
    const boxenOprions = {
      padding: 1,
      margin: 1,
      borderColor: "cyan",
      borderStyle: "round",
    };
    console.log(boxen(welcomeMessage, boxenOprions));
    console.log(pc.gray(` UI界面访问地址： `) + pc.greenBright(`${address}`));
    console.log("");
  });
} else {
  spinner.start("cli-server启动中...");
  server.listen(port, () => {
    spinner.succeed(`${pc.green("cli-server启动成功!")}`);
    const address = `http://localhost:${port}/test`;
    openBrowser(address);
    console.log(
      pc.gray(` cli-server服务访问地址： `) + pc.greenBright(`${address}`)
    );
    console.log("");
  });
}
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  spinner.fail(`${pc.red("GUI界面启动失败, 请重新操作!")}`);
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  // var addr = server.address();
  // var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  // debug("Listening on " + bind);
}
