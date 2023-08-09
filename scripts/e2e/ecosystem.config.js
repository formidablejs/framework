module.exports = {
  apps: [
    {
      name: 'app',
      script: 'node craftsman serve --port=3030 --addr',
      time: true,
      error_file: "./error.log",
      out_file: "./log.log"
    }
  ]
}
