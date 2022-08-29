require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

/******************************************************************* */
const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'mySessions'
});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store, 
    lang: 'ar'
}))
/********************************************************************************* */
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
/********************************************************************************* */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});
const upload = multer({ storage: storage });
app.post('/admin/add-employee', upload.single('photo'));
app.post('/admin/edit-employee/:id', upload.single('photo'));
/********************************************************************************* */
const adminRoutes = require('./routes/admin');

app.use('/', adminRoutes);
/********************************************************************************* */
mongoose.connect(dbUrl)
    .then(resu => {
        console.log('db connection done !');
        app.listen(port, () => {
            console.log('app conneted on port ' + port)
        })
    })
    .catch(err => {
        console.log(err)
    })