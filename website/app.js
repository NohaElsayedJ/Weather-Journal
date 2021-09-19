let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let keyApi = '252ee05c2cad838bdfab15d3466c0d6a';
const generate = document.getElementById('generate');
 

    
    

generate.addEventListener('click', per)

function per(e){

    
    let feelings = document.getElementById('feelings').value;
    
   
     getWeather('/getData')
    .then(function(data){
     // console.log(data);
     // console.log(feelings);
      postData('/saveDate', {date : newDate, Temperature:data, Sentiment: feelings })
    })
        updateUI() 
    
}

    const getWeather= async()=>{
    const zipCode = document.querySelector('#zip').value;
    const urlZip= `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${keyApi}&units=metric`;

    const res = await fetch(urlZip)
    try{

    const data = await res.json();;
    const temp = data.main.temp;
    console.log(temp);
    return temp;
    }catch(error){
        console.log("Error", error)
    }
}

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
       // return newData;
      }catch(error) {
      console.log("error", error);
      }
  }


  const updateUI = async () => {
    const request = await fetch('/getData');
    try{
      const allData = await request.json();
     //console.log(allData)
      document.getElementById('date').innerHTML = allData.Date;
      document.getElementById('temp').innerHTML = allData.Temperature+' °C';
      document.getElementById('content').innerHTML = allData.Sentiment;
      
    }catch(error){
      console.log("error", error);
    }
  }
