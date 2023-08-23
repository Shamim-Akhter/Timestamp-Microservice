var express = require('express');
var app = express();
const port=8000;

// enable CORS 
// so that your API is remotely testable 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




app.get("/api/:date?",function(req,res){
  if(req.params.date===undefined){
    res.send({"unix": new Date().getTime(), "utc": new Date().toUTCString()});
    res.end();
  }
  else{
  const date=req.params.date;
  const dateInNumberFormat=Number(date);
  
  if(!isNaN(dateInNumberFormat))
  {
    const date=new Date(dateInNumberFormat).toUTCString();
    res.send({
      "unix":dateInNumberFormat,
      "utc":date
    });
  }
  else{
    const newDate=Date.parse(date);
    
   if(isNaN(newDate)){
      res.json({
        "error": "Invalid Date"
      });
    }
      else{
        const array=date.split("-");
        for(let i=0;i<array.length;i++)
        {
          array[i]=array[i].trim();
        }
        if(array[1]===undefined || array[1]=="")
        {
          array[1]="01";
        }
        if(array[2]===undefined || array[2]=="")
        {
          array[2]="01";
        }
        const da=array[0]+"-"+array[1]+"-"+array[2]
        const d= new Date(da);
        res.send({
          "unix":d.getTime(),
          "utc": d.toUTCString()
        });    
      }
   }
  }
})

// listen for requests :)
var listener = app.listen(8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
