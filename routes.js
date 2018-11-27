const fs = require("fs");

const requestHander = (req, res) => {
  const { url, method } = req;

  if (url === "/") {
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
    `);
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      console.log("chunk :", chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFileSync("message.text", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
};

module.exports = requestHander