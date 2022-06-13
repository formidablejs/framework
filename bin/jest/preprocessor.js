const { join } = require('path')
const { spawnSync } = require('child_process')

module.exports = {
    process(src, fileName, config, options) {
        const imbac = join('node_modules', '.bin', 'imbac')

        const data = spawnSync(imbac, [fileName, '--platform=node', '--format=cjs', '--print'], {
            cwd: process.cwd(),
            env: process.env,
            stdio: 'pipe',
            encoding: 'utf-8'
        })

        return { code: data.stdout }
    }
}
