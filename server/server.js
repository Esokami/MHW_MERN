require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const { application } = require('express');

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join("client/src")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "src", "index.js"))
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})

require('./config/mongoose.config');
require('./routes/item.routes')(app);
require('./routes/user.routes')(app);

