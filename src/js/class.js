export default class Weather {
  constructor(objRefs) {
    this.objRefs = objRefs;
  }

  getFetch(cityName) {
    let apiKey = "aba336b92b728d858c54328906559444";
    const { input, weatherWrap, city, temp, flex, humidity, wind } = this.objRefs;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    flex.innerHTML = "";
    input.value = "";
    let result = fetch(url)
      .then((response) => {
        if (!response.ok) return alert("Введите коректный город");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        weatherWrap.classList.remove("loading");
        city.textContent = `Weather in ${data.name}`;
        let celc = Math.round(data.main.temp - 273.15);
        temp.textContent = `${celc}°C`;

        const iconData = data.weather.map((el) => {
          const img = document.createElement("img");
          img.src = `https://openweathermap.org/img/wn/${el.icon}.png`;
          img.alt = el.description;
          img.classList.add("icon");
          const div = document.createElement("div");
          div.classList.add("description");
          div.textContent = el.description;
          console.dir(div);
          div.append(img);
          return div;
        });
        flex.prepend(...iconData);
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind speed: ${data.wind.speed} km/h`;
      })
      .catch((error) => {
        console.error(`Опа-па, что-то ты начудил`, error);
      });
    return result;
  }
}



