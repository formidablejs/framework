const { Command } = require("@formidablejs/console");
const { execSync } = require("child_process");
const { getRuntime } = require("../runtime");

class Start extends Command {
  get signature() {
    return "start";
  }

  get description() {
    return "Start the Application Server";
  }

  handle() {
    const runtime = getRuntime();

    execSync(`${runtime} server`, {
      stdio: "inherit",
      cwd: process.cwd(),
    });
  }
}

module.exports = { Start };
