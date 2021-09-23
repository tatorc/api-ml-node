const express = require('express')
const app = express();
const routes = require('./routes/index')
const cors = require("cors");
const helmet = require('helmet');

const config = require('./config')

app.use(cors())
app.use(helmet());
app.use(routes)
app.use(express.json())

app.disable('x-powered-by');

app.listen(config.port, () => {
    console.log(`App listening on port: ${config.port}`)
});