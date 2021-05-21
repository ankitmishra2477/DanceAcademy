const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyparser= require('body-parser');
mongoose.connect('mongodb://localhost/contactdb', {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email:String,
    message:String
  });
  const contactd = mongoose.model('contactD', contactSchema);

const port = 80;

//for loading static files from folder static

app.use('/static',express.static('static'));
app.use(express.urlencoded());

//pug config
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//endpoints

app.get('/',(req,res)=>{
    const params ={ }
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params ={ }
    res.status(200).render('contact.pug',params);
})

app.post('/contact',(req,res) =>{
    let mydata = new contactd(req.body);
    mydata.save().then(()=>{   //.then() as it returns a promise

        res.send("Data is sucessfully saved")
    }).catch(() =>{
        res.status(400).send("Data is not saved")
    });

})


app.listen(port,()=>{
    console.log(`port id running on ${port}`);
})

