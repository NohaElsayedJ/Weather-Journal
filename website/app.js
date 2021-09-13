/* Global Variables */

//const { json } = require("body-parser");

//const {json}  = require("body-parser");

//const { response } = require("express");

// Create a new date instance dynamically with JS
let d = new Date();
//let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const keyApi = '252ee05c2cad838bdfab15d3466c0d6a';
const generate = document.querySelector('#generate');



generate.addEventListener('click', async () =>{

    const zipCode = document.querySelector('#zip').value;
    const feelings= document.querySelector('#feelings').value;
    const urlZip= `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${keyApi}`;
    getWeather(urlZip, zipCode, keyApi)

    .then(function (data){
        console.log(data);

        postData('/saveDate', {
            date:d,
            temperature: data.main.temp,
            sentiment: feelings,
        })
        updateUI();
    })
});

const getWeather = async ( urlZip, zip, key)=>{
    const res= await fetch (urlZip+zip+key)

    try{
        const data = await res.json();
        return data;
    }catch(error){
        console.log('Error', error);
    }
}


const postData= async(url='', data={})=>{
    console.log(data);
    const response = await fetch(url,{
        method :"POST",
        credentials : 'same-origin',
        headers :{
        'content-type' : 'application/json',
        },
        body: JSON.stringify(data)
    
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log('Error', error);
    }
}


const updateUI= async() =>{
    const request = await fetch('/getData');
    try{
        const allData= await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temperature').innerHTML = `Temp: ${allData.temperature}`;
        document.getElementById('sentiment').innerHTML = `I feel: ${allData.sentiment}`;

    }catch(error){
        console.log('Error', error);
    }
}


  /*  await fetch ("/saveDate", {
    method :"POST",
    credentials : 'same-origin',
    headers :{
        'content-type' : 'application/json',
    },
    body: JSON.stringify({
        date : newDate,
        temp : temp,
        feelings : feelings,
    }),
})
 
//const nodeA =await fetch('/saveDate')
//const tempData = await nodeA.json()
//console.log(tempData);

    }catch(error){
        console.log('error', error);
    }
})*/

