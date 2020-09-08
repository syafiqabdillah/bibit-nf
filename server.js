import sslRedirect from 'heroku-ssl-redirect';

const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
app.use(sslRedirect())
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);