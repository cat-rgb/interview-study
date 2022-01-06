const {NodeSSH} = require("node-ssh")

module.exports = class MyPlugin {
    constructor(options) {
        this.options = options
        this.ssh = new NodeSSH()
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync("AutoUploadPlugin", async (compilation, callback) =>{
            // 1.获取输出文件夹
            const outputDir = compilation.outputOptions.path;
            //2.链接
            await this.connectServer()
            // 3.上传
            const serverDir = this.options.remotePath
            await this.ssh.execCommand(`rm -rf${serverDir}/*`)

            await this.uploadFiles(outputDir, serverDir)
            // 4.关闭
            this.ssh.dispose()
            callback()
        })
    }


    async connectServer() {
        await this.ssh.connect({
            host: this.options.host,
            username: this.options.username,
            password: this.options.password
        })
    }

    async uploadFiles(localPath, remotePath) {
        await this.ssh.putDirectory(localPath, remotePath, {
            recursive: true,
            concurrency: 10
        })

    }
}