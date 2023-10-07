const { Command, Output, boolean } = require("@formidablejs/console");
const { exec, execSync } = require("child_process");
const { getExt } = require('../ext')

class Build extends Command {
  get signature() {
    return "build {--watch-console}";
  }

  get props() {
    return {
      "watch-console": boolean("Watch and rebuild Craftsman").default(false)
    };
  }

  get description() {
    return "Build the Formidable Framework";
  }

  handle() {
    if (this.option("watch-console")) {
      return execSync(
        `imba build bootstrap/console${getExt()} -p -s -f -w -o .formidable`,
        {
          stdio: "inherit",
          cwd: process.cwd(),
        }
      );
    }

    const output = exec(
      `imba build bootstrap/console${getExt()} -p -s -f -o .formidable && imba build bootstrap/build${getExt()} -p -s -f -o .formidable && node craftsman config:cache`,
      {
        stdio: "pipe",
        cwd: process.cwd(),
      }
    );

    const track = [];

    output.stdout.on("data", function (data) {
      if (
        track.includes(data) ||
        data.startsWith(
          "\x1B[93mℹ\x1B[39m built \x1B[1mbootstrap/build.ts\x1B[22m in"
        ) ||
        data.startsWith(
          "\x1B[93mℹ\x1B[39m built \x1B[1mbootstrap/build.imba\x1B[22m in"
        ) ||
        data.startsWith(
          "\x1B[93mℹ\x1B[39m built \x1B[1mbootstrap/console.ts\x1B[22m in"
        ) ||
        data.startsWith(
          "\x1B[93mℹ\x1B[39m built \x1B[1mbootstrap/console.imba\x1B[22m in"
        ) ||
      )
        return;

      if (
        data.startsWith(
          "\x1B[93mℹ\x1B[39m starting to build in \x1B[1m.formidable\x1B[22m"
        )
      ) {
        Output.message("info", "Building Application...");
      } else {
        process.stdout.write(data);
      }

      track.push(data);
    });

    output.stderr.on("data", function (data) {
      process.stdout.write(data);
    });

    output.on("exit", function () {
      process.exit();
    });
  }
}

module.exports = { Build };
