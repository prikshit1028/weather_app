import cloudy from "./cloud.png";
import sunny from "./sun.png";
import snowy from "./snow.png";
import rainy from "./rain.png";

import "./styles.css";

const searchbutton = document.getElementById("search");
const locationn = document.getElementById("location");
const forme = document.getElementById("formid");
const mainbody = document.body;
const currentweather = document.createElement("div");
mainbody.appendChild(currentweather);
const temperature = document.createElement("div");
temperature.setAttribute("id", "tempid");
mainbody.appendChild(temperature);
const day1 = document.createElement("div");
mainbody.appendChild(day1);
const day2 = document.createElement("div");
mainbody.appendChild(day2);
const day3 = document.createElement("div");
mainbody.appendChild(day3);

let data;
function hitapi(city) {
  return fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=19e1d710063a425e80d53054240403&q=${city}&days=3`
  )
    .then((fulfill) => fulfill.json())
    .then((win) => {
      data = win.forecast.forecastday;
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

searchbutton.addEventListener("click", () => {
  const cityname = locationn.value;

  if (cityname.length > 1) {
    console.log(cityname);
    async function finalfunc() {
      const value = await hitapi(cityname);
      handledata(value);
    }

    finalfunc();
  }
});
// value[0].day.condition.text//
function handleForm(event) {
  event.preventDefault();
}
forme.addEventListener("submit", handleForm);

function handledata(somearray) {
  let weathertoday = somearray[0].day.condition.text;
  weathertoday = weathertoday.toLowerCase();

  console.log(weathertoday);
  if (weathertoday.includes("cloudy")) {
    async function setimage() {
      const firstvalue = await fetch(
        `https://pixabay.com/api/?key=42884617-054144fe2dc5cca8ef5acd657&q=cloudy&image_type=photo`,
        {
          mode: "cors",
        }
      );
      const secondvalue = await firstvalue.json();
      const finalurl = secondvalue.hits[1].largeImageURL;

      console.log(finalurl);
      mainbody.style.backgroundImage = `url(${finalurl})`;
    }
    setimage();
  } else if (weathertoday.includes("sun")) {
    async function setimage() {
      const firstvalue = await fetch(
        `https://pixabay.com/api/?key=42884617-054144fe2dc5cca8ef5acd657&q=clear+sky&image_type=photo`,
        {
          mode: "cors",
        }
      );
      const secondvalue = await firstvalue.json();
      const finalurl = secondvalue.hits[0].largeImageURL;

      console.log(finalurl);

      mainbody.style.backgroundImage = `url(${finalurl})`;
    }
    setimage();
  } else if (weathertoday.includes("rain")) {
    async function setimage() {
      const firstvalue = await fetch(
        `https://pixabay.com/api/?key=42884617-054144fe2dc5cca8ef5acd657&q=rain+droplets&image_type=photo`,
        {
          mode: "cors",
        }
      );
      const secondvalue = await firstvalue.json();
      const finalurl = secondvalue.hits[0].largeImageURL;

      console.log(finalurl);

      mainbody.style.backgroundImage = `url( ${finalurl})`;
    }
    setimage();
  } else if (weathertoday.includes("snow")) {
    async function setimage() {
      const firstvalue = await fetch(
        `https://pixabay.com/api/?key=42884617-054144fe2dc5cca8ef5acd657&q=snow&image_type=photo`,
        {
          mode: "cors",
        }
      );
      const secondvalue = await firstvalue.json();
      const finalurl = secondvalue.hits[0].largeImageURL;

      console.log(finalurl);

      mainbody.style.backgroundImage = `url(${finalurl})`;
    }
    setimage();
  }

  const weathertodayCapital = weathertoday.toUpperCase();
  currentweather.textContent = `${weathertodayCapital}`;
  currentweather.style.fontSize = "3.4rem";
  currentweather.style.fontWeight = "500";
  currentweather.style.color = "white";
  temperature.textContent = "";
  const avgtemp_ce = somearray[0].day.avgtemp_c;
  const avgtemp_fa = somearray[0].day.avgtemp_f;
  const tempValue = document.createElement("span");
  tempValue.textContent = `${avgtemp_ce}°C`;
  tempValue.style.fontSize = "1.7rem";
  tempValue.style.color = "white";
  temperature.appendChild(tempValue);
  const weathericon = document.createElement("img");
  temperature.appendChild(weathericon);

  if (weathertoday.includes("cloudy")) {
    weathericon.src = cloudy;
  } else if (weathertoday.includes("sun")) {
    weathericon.src = sunny;
  } else if (weathertoday.includes("rain")) {
    weathericon.src = rainy;
  } else if (weathertoday.includes("snow")) {
    weathericon.src = snowy;
  }
  const celciusButton = document.createElement("button");
  const fahrenheitButton = document.createElement("button");
  celciusButton.textContent = "C";
  fahrenheitButton.textContent = "F";
  const convert = document.createElement("div");
  convert.appendChild(celciusButton);
  convert.appendChild(fahrenheitButton);
  celciusButton.addEventListener("click", () => {
    tempValue.textContent = `${avgtemp_ce}°C`;
  });
  fahrenheitButton.addEventListener("click", () => {
    tempValue.textContent = `${avgtemp_fa}°F`;
  });
  temperature.appendChild(convert);
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfTheYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDateFull = new Date();
  const currentDate = currentDateFull.getDate();
  let currentMonth = currentDateFull.getMonth();
  currentMonth = monthsOfTheYear[currentMonth];
  let currentDay = currentDateFull.getDay();
  let weekday_day2 = currentDay + 1;
  let weekday_day3 = currentDay + 2;
  weekday_day2 = daysOfTheWeek[weekday_day2];
  weekday_day3 = daysOfTheWeek[weekday_day3];
  currentDay = daysOfTheWeek[currentDay];

  day1.textContent = `${currentDay}, ${currentMonth} ${currentDate}`;
  day1.style.color = "white";
  day1.style.fontSize = "1.45rem";
  day2.textContent = `${weekday_day2}, ${currentMonth} ${currentDate + 1}`;
  day2.style.color = "white";
  day2.style.fontSize = "1.45rem";

  day3.textContent = `${weekday_day3}, ${currentMonth} ${currentDate + 2}`;
  day3.style.color = "white";
  day3.style.fontSize = "1.45rem";

  const day1_details = document.createElement("div");
  const day2_details = document.createElement("div");
  const day3_details = document.createElement("div");
  day1_details.textContent = `Humidity: ${somearray[0].day.avghumidity}% | Max-temp: ${somearray[0].day.maxtemp_c}°C | Min-temp: ${somearray[0].day.mintemp_c}°C | Precipitation: ${somearray[0].day.totalprecip_mm}mm | Snow: ${somearray[0].day.totalsnow_cm}cm | UV-index: ${somearray[0].day.uv}`;
  day2_details.textContent = `Humidity: ${somearray[1].day.avghumidity}% | Max-temp: ${somearray[1].day.maxtemp_c}°C | Min-temp: ${somearray[1].day.mintemp_c}°C | Precipitation: ${somearray[1].day.totalprecip_mm}mm | Snow: ${somearray[1].day.totalsnow_cm}cm | UV-index: ${somearray[1].day.uv}`;
  day3_details.textContent = `Humidity: ${somearray[2].day.avghumidity}% | Max-temp: ${somearray[2].day.maxtemp_c}°C | Min-temp: ${somearray[2].day.mintemp_c}°C | Precipitation: ${somearray[2].day.totalprecip_mm}mm | Snow: ${somearray[2].day.totalsnow_cm}cm | UV-index: ${somearray[2].day.uv}`;
  day1_details.style.fontSize = "1.2rem";
  day2_details.style.fontSize = "1.2rem";
  day3_details.style.fontSize = "1.2rem";

  day1.appendChild(day1_details);
  day2.appendChild(day2_details);
  day3.appendChild(day3_details);
}
