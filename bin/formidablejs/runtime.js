const getRuntime = () => {
  const args = process.argv;
  let runtime = 'node';

  if (args) {
    const executor = args[0].split('/').pop();

    if (executor != undefined) {
      runtime = executor;
    }
  }

  return runtime;
}

module.exports = { getRuntime }
