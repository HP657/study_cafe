const express = require('express');
const app = express();
const port = 8000;


app.set("views", "./views");
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//app.use(express.static('views'));

const routes = require('./routes/router.js');
app.use('/', routes);


app.listen(port, () => {
    console.log(`port ${port} START`);
});
