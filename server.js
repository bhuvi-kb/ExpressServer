const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: 'YY8nRvfChle4yu6HPABj0TLWFMVCTbD9',
    clientSecret: '86TGeTzyk117RwK6'
});

const port = 3000;

const app= express()
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello from server");
});

app.listen(port, () => {
    console.log("server running at port :", port)}
);



app.post('/searchFlights', (req, res) =>{
    console.log(req.body);
    
    amadeus.shopping.flightOffersSearch.get({
        originLocationCode: req.body.originLocationCode, //SYD
        destinationLocationCode: req.body.destinationLocationCode, // BKK
        departureDate: '2020-08-01', 
        adults: '2'
    }).then((response) => {
        //console.log(response.data);
        res.status(200).send(response.data);

    }).catch((err)=> {
        console.log("Error!");
        res.end("Error getting data")
    });
})
;


//get - read, put - update, post -creeate, del -del

app.post('/hotelInCity', (req, res) =>{

    //console.log(req.body);
    //let city = 'PAR';
    //var reqBody = JSON.parse(req.body);
    //console.log(req.body.cityCode)
    //res.status(200).send(req.body.cityCode);
    
    amadeus.shopping.hotelOffers.get({
        cityCode: req.body.cityCode
    }).then((response) => {
        //console.log(response.data);
        res.status(200).send(response.body);

    }).catch((err) => {
        console.log("Error!");
        res.end("Error getting data")
    });
    
}
);
