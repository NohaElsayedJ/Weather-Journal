projectData = [];

// Require Express to run server and routes
const express= require('express')
const app = express()

// Start up an instance of app
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require ('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

const server = app.listen(port, ()=>{

    console.log(`Running on localhost ${port}`);
})





 app.get('/getData' , a)
 function a(req, res){
res.send(projectData);
}


;
app.post('/saveDate', f)
function f( req , res ){
   
    const data = req.body;
    newEntry= {
        date : data.date,
        Temperature : data.Temperature,
        sentiment : data.sentiment
    }
    projectData.push(newEntry)
    res.send(projectData);
    console.log(projectData)
   // console.log(projectData);

}
