const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
require('dotenv').config();

router.get('/', function (req, res) {
    let html = fs.readFileSync(path.resolve(__dirname, `dist/index.html`), 'utf-8');
    let headNumber = html.indexOf('</title>');
    let headEndNumber = html.indexOf('<link');
    let head = html.substring(0,headNumber + '</title>'.length)
    let end = html.substring(headEndNumber,html.length)
    let scriptString = `
        <script>
            window.variable = '${process.env.VARIABLE}'
        </script>
    `
    html = head + scriptString + end
    res.send(html);
});

app.use('/', router);

app.use(express.static(__dirname + '/dist'));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});