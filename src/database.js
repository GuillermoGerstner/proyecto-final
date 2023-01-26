const mongoose = require('mongoose');

//const { PROYECTO_FINAL_MONGODB_HOST, PROYECTO_FINAL_MONGODB_DATABASE } = process.env;
//const MONGODB_URI = `mongodb://${PROYECTO_FINAL_MONGODB_HOST}/${PROYECTO_FINAL_MONGODB_DATABASE}`;

const { CONNECT_URI } = process.env;
const MONGODB_URI = CONNECT_URI;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log(`Database is connected`))
    .catch(err => console.log(err));