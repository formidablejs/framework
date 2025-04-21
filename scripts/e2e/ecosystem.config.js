const runtime = () => {
  const isInstalled = (cmd) => {
    try {
      execSync(`${cmd} -v`, { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  };

  if (isInstalled('node')) return 'node';
  if (isInstalled('bun')) return 'bun';

  throw new Error('Neither Node.js nor Bun is installed. Please install one of them.');
};

module.exports = {
  apps: [
    {
      name: 'app',
      script: `${runtime} craftsman serve --port=3000 --addr`,
      time: true,
      error_file: "./error.log",
      out_file: "./log.log"
    }
  ]
}
