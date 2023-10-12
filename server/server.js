require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const { application } = require('express');
const path = require('path');
const PORT = process.env.PORT || '8000'

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

app.listen(
    PORT,
    console.log(`Server running on ${process.env.NODE_ENV}`)
);

require('./config/mongoose.config');
require('./routes/item.routes')(app);
require('./routes/user.routes')(app);

