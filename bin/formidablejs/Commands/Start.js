const { Command } = require("@formidablejs/console");
const { execSync } = require("child_process");

class Start extends Command {
  get signature() {
    return "start";
  }

  get description() {
    return "Start the Application Server";
  }

  handle() {
    execSync("node server", {
      stdio: "inherit",
      cwd: process.cwd(),
    });
  }
}

module.exports = { Start };
