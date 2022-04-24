const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const db = require('./models');
require('dotenv').config()


const app = new Koa();

app.use(koaBody());
app.use(cors());

//require the router here
let index = require('./routes/index');
let books = require('./routes/books');

//use the router here
app.use(books.routes());
app.use(index.routes());

const port = process.env.PORT || 8080
const host = process.env.HOST

db.sequelize
    .authenticate()
    .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(port, (err) => {
        if (err) {
            return console.error('Failed', err);
    }
    console.log(`Listening on port ${port}`);
    return app;
    });
})
.catch((err) => console.error('Unable to connect to the database:', err));

//app.listen(port, host);
console.log('Aplication is running');