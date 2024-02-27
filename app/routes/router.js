const express = require('express');
const router = express.Router();
const db = require('./../modules/DB/pool.js');

router.get('/', (req, res) => {

});

router.get('/signup', (req, res) => {
    res.render("signup");
});

router.post('/signup', (req, res) => {
    const { name, phone, password } = req.body;
    db.GetUser( name, phone, password );
    res.redirect("main");
});


router.get('/seat', (req, res) => {
    res.render("seat");
});


router.get('/main', (req, res) => {
    res.render("index");
});

router.get('/seats', async (req, res) => {
    const seats = await db.getSeats();
    res.json(seats);
});

router.put('/seat/:seatNumber', async (req, res) => {
    const seatNumber = req.params.seatNumber;
    await db.addSeats(seatNumber);
    res.status(200).json();
});

router.delete('/seat/:seatNumber', async (req, res) => {
    const seatNumber = req.params.seatNumber;
    await db.delSeats(seatNumber);
    res.status(200).json();
});

module.exports = router;
