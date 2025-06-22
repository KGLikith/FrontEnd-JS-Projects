const apiKey = ;
// open weather api key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchbox=document.querySelector(".search input");

async function checkweather(city){
    console.log(city);
    const response= await fetch(apiUrl +`&q=${city}`+ `&appid=${apiKey}`);

    if(response.status==404){
        document.querySelector(".search input").value="";
        document.querySelector(".search input").placeholder="Invalid city name";
        document.querySelector(".weather").style.display="none";
    }else if(response.status==400){
        document.querySelector(".search input").value="";
        document.querySelector(".search input").placeholder="Please enter the city name";
        document.querySelector(".weather").style.display="none";
    }
    else{
        var data=await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML= data.name;
        document.querySelector(".temp").innerHTML= Math.round(data.main.temp)+"°c";
    
        document.querySelector(".humidity").innerHTML= data.main.humidity + "%";
        document.querySelector(".wind").innerHTML= data.wind.speed+ " m/s";
    
        const weathericon=document.querySelector(".weather-icon");
    
        const weathercond=data.weather[0].main;
        console.log(weathercond);
    
        if(weathercond=="Clear"){
            weathericon.src="./Clear.png";
        }else if (weathercond=="Clouds"){
            weathericon.src="./Clouds.png"
        }else if (weathercond=="Haze"){
            weathericon.src="./Haze.png"
        }else if (weathercond=="Rain"){
            weathericon.src="./storm.png"
        }else if (weathercond=="Drizzle"){
            weathericon.src="./drizzle.png"
        }else if (weathercond=="Snow"){
            weathericon.src="./snow.png"
        }
        document.querySelector(".weather").style.display="block";
    }
}
document.querySelector(".search button").addEventListener("click",()=>{
    console.log(searchbox.value)
    checkweather(searchbox.value);
})

