const runtime = () => {
  const isInstalled = (cmd) => {
    try {
      execSync(`${cmd} -v`, { stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  };

  if (isInstalled('bun')) return 'bun';
  if (isInstalled('node')) return 'node';

  throw new Error('Neither Node.js nor Bun is installed. Please install one of them.');
};

console.log(`Using runtime: ${runtime()}\n`);

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
