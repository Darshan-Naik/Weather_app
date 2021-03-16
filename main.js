var url = new URL("https://api.openweathermap.org/data/2.5/weather")
const temp = document.querySelector("#temp")
const city = document.querySelector("#city")
const disp = document.querySelector("#disp")
const icon = document.querySelector("#icon")
const humidity = document.querySelector("#humidity")
const min_max = document.querySelector("#min_max")
const wind = document.querySelector("#wind")
const apiId = "d6098c59a2769c9d57bcd811006a6c70"
const input_search = document.querySelector("#search");
var place;
function load(){
    place = localStorage.getItem("place") || "bangalore"
    let input = input_search.value 
    if(input != ""){
        place = input
    }
    var params = new URLSearchParams(url.search)
        params.set("q",place)
        params.set("units","metric")
        params.set("appid",apiId)
        url.search = params
    fetch(url)
    .then(resp => resp.json())
    .then(data => {

        if(data.cod == "404"){
           // alert(data.message)
           input_search.value = null
           input_search.placeholder = data.message
           setTimeout(()=>{
            input_search.placeholder = "Search"
           },2000)
        } else {
        console.log(data)
        setTimeout(()=>{
            input_search.value = null
           },1500)
        localStorage.setItem("place",place)
        temp.innerHTML=`${Math.round(data.main.temp)}°<span>C</span>`
        city.innerHTML=`Weather in ${data.name}`
        disp.innerHTML=`${data.weather[0].description}`
        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        humidity.innerHTML = `Humidity  ${data.main.humidity}%`
        min_max.innerHTML = `Temperature  ${data.main.temp_max}°<span>C</span> / ${data.main.temp_min}°<span>C</span>`
        wind.innerHTML = `Wind speed  ${data.wind.speed}km/h`
        }
    })
}
load()
input_search.addEventListener("keyup",(event)=>{
   if(event.keyCode == 13){
            document.querySelector("#Search_btn").click()
   }
}) 