require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})

require('./config/mongoose.config');
require('./routes/item.routes')(app);
require('./routes/user.routes')(app);

