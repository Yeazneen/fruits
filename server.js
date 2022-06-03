const express = require ('express');
const app = express();

const fruits = require ('./models/fruits.js')
const vegetables = require('./models/vegetables.js')

// importing fruits from wherever it is
const reactViews = require('express-react-views')
const createEngine = reactViews.createEngine
const renderFile = createEngine()

app.set('view engine', 'jsx');
app.engine('jsx', renderFile);

// MIDDLEWARE 
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(req.body)
    next()
})

//Fruits Index route
app.get('/fruits',  (req, res) => {
    res.render('Index', { fruits });
});
//Vegetable Index route
app.get('/vegetables', (req, res) => {
    res.render('vegetables/Index', { vegetables });
});

//New fruits
app.get('/fruits/new', (req, res) => {
    res.render('New')
})
//New vegetables
app.get ('/vegetables/new', (req, res) => {
    res.render('vegetables/New')
})

//CREATE fruit
app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else {
        req.body.readyToEat = false
    }
    fruits.push(req.body)
    res.redirect('/fruits')
})

//Create vegetable
app.post('/vegetables', (req, res ) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    } else { 
        req.body.readyToEat = false
    }
    vegetables.push(req.body)
    res.redirect('/vegetables')
})

//Fruits show route
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    res.render('Show', {
        fruit:fruits[req.params.indexOfFruitsArray]
    });
});

//Vegetables show route
app.get('/vegetables/:indexOfVegetablesArray', (req, res) => {
    res.render('vegetables/Show', {
        vegetable:vegetables[req.params.indexOfVegetablesArray]
    });
});


app.listen(3000, () => {
    console.log('listening');
})