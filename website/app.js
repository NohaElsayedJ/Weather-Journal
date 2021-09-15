let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let keyApi = '252ee05c2cad838bdfab15d3466c0d6a';
const generate = document.getElementById('generate');



generate.addEventListener('click', async ()=> {

    const zipCode = document.querySelector('#zip').value;
    let urlZip= `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${keyApi}&units=metric`;
    const feelings= document.querySelector('#feelings').value;

/*function e(p){
    getWeatherDemo(urlZip, zipCode, keyApi)
}


const getWeatherDemo = async(urlZip, zip, key) =>{


    const res = await fetch (urlZip+zip+key)
    try{
        const data =await res.json();
        console.log(data)
    }catch(error){
        console.log("Error",error);
    }
}*/
   const res= await fetch(urlZip);
   const data = await res.json()
   //console.log(data);
   const temp = data.main.temp;
   //console.log(temp);

   function postGet(){
    postData('/saveDate')
      .then(function(data){
        getWeather('/getData')
      })
  }
  
  postGet()
    
    postData('/saveDate', {
        date: newDate,
        Temperature : temp,
        sentiment : feelings
    });

        updateUI()
    
})

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
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  const getWeather = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };

  

const updateUI = async () => {
    const request = await fetch('/getData');
    try{
      const allData = await request.json();
      
      document.getElementById('date').innerHTML = allData[0].date;
      document.getElementById('temp').innerHTML = allData[0].temp;
      document.getElementById('content').innerHTML = allData[0].content;
      console.log(allData);
      
    }catch(error){
      console.log("error", error);
    }
  }
