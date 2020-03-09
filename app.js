const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/sumDB', {
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var nameSchema = new mongoose.Schema({
    firstNum: Number,
    secondNum: Number
  });

  var User = mongoose.model("User", nameSchema);

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    getASum()
});

  app.post("/addNumber", (req, res) => {
    var myData = new User(req.body);
    myData.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });


    function getASum(x, y) {
        let c = parseInt(x) + parseInt(y);
        return c;
    }






console.log("Connected")


app.listen(PORT, ()=>{
    console.log(`Sever is running on PORT: ${PORT}`)
})