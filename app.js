const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: '.hbs'
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "classicmodels"
});
db.connect(function (err) {
    if (err) {
        throw err;
    }

    console.log("Connecté à la base de données MySQL!");
});

app.get('/', function (req, res) {
    let query = "select * from products";

    const search = req.query.search;

    console.log('search - ' + search);

    if(search) {
        query += " where productName like '%" + search + "%'";
    }

    db.query(query, function (err, result) {
        if (err) { throw err };

        res.render('home', {
            products: result,
            searchKey: search
        });
    });
});

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});