const mongoose = require('mongoose');

mongoose.connect('"mongodb+srv://mollicaes:u8aYQPS8uUNK4FhP@monsterhunter-east.mrncrjx.mongodb.net/?retryWrites=true&w=majority"', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));