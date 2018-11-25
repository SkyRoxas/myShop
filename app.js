const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const {url, method} = req

    if(url === '/') {
        res.write(`
            <html>
                <head>
                    <title> My Node.js Server </title>
                </head>
                <body>
                    <form action="./message" method="POST">
                        <input name="message" value="hello world"/>
                        <button>submit</button>
                    </form>
                </body>
            </html>
        `)
        return res.end()
    }
    if(url === '/message' && method === 'POST') {
        fs.writeFileSync('message.text', 'roxas')
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
    }
})

server.listen('3000')

