require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

require('./config/mongoose.config');
require('./routes/item.routes')(app);
require('./routes/user.routes')(app);

