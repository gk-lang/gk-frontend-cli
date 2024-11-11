import { spawn } from "node:child_process";
import pc from "picocolors";
import fse from "fs-extra";
import trash from "trash";
const spawnProcess = async (...args) => {
  return new Promise((resolve, reject) => {
    const subprocess = spawn(...args);
    subprocess.stdout.setEncoding("utf8");
    subprocess.stderr.setEncoding("utf8");
    subprocess.stdout.pipe(process.stdout);
    subprocess.stderr.pipe(process.stderr);
    subprocess.on("close", (code) => {
      if (code === 1) {
        reject();
      } else {
        resolve();
      }
    });
  });
};

const baseUrl = process.cwd();
const cwdCli = `${baseUrl}/packages/cli`;
const cwdServer = `${baseUrl}/packages/cli-server`;
const cwdUi = `${baseUrl}/packages/cli-ui`;
// const baseOutputDirectory = `${baseUrl}/dist`;
await Promise.all([
  spawnProcess("npm", ["run", "build"], { cwd: cwdCli }),
  spawnProcess("npm", ["run", "build"], { cwd: cwdServer }),
  spawnProcess("npm", ["run", "build"], { cwd: cwdUi }),
]).then(async () => {
  // if (fse.existsSync(baseOutputDirectory)) {
  //   await trash([baseOutputDirectory]);
  // }
  // fse.mkdirp(`${baseOutputDirectory}/cli`, async (err) => {
  //   if (!err) {
  //     await fse.move(`${cwdCli}/dist-cli`, `${baseOutputDirectory}/cli`, {
  //       overwrite: true,
  //     });
  //   }
  // });
  // fse.mkdirp(`${baseOutputDirectory}/cli-server`, async (err) => {
  //   if (!err) {
  //     await fse.move(
  //       `${cwdServer}/dist-server`,
  //       `${baseOutputDirectory}/cli-server`,
  //       {
  //         overwrite: true,
  //       }
  //     );
  //   }
  // });
  // fse.mkdirp(`${baseOutputDirectory}/cli-ui`, async (err) => {
  //   if (!err) {
  //     await fse.move(`${cwdUi}/dist-ui`, `${baseOutputDirectory}/cli-ui`, {
  //       overwrite: true,
  //     });
  //   }
  // });
  console.log(pc.green("Congratulations! The project has been successfully built!"));
});
