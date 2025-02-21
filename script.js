const $ = (selector) => document.querySelector(selector);

const hour = $(".hour");
const dot = $(".dot");
const min = $(".min");
const sec = $(".sec");
const week = $(".week");
const dateElement = $(".date");
const tempElement = $(".temp-value");

let showDot = true;

async function getTemperature() {
    // Dočasné řešení - simulace teploty
    // Až budete mít API klíč, odkomentujte původní kód a smažte tuto část
    return new Promise((resolve) => {
        const randomTemp = Math.floor(Math.random() * (30 - 15) + 15); // Náhodná teplota mezi 15-30°C
        resolve(randomTemp);
    });
    
    /* Původní kód pro OpenWeather API
    try {
        const API_KEY = 'VÁŠ_API_KLÍČ'; // Vložte sem váš API klíč
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Prague,cz&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        return Math.round(data.main.temp);
    } catch (error) {
        console.error('Chyba při získávání teploty:', error);
        return null;
    }
    */
}

async function updateTemperature() {
    const temp = await getTemperature();
    if (temp !== null) {
        tempElement.textContent = temp;
    }
}

function update() {
    showDot = !showDot;
    const now = new Date();

    // Aktualizace dvojteček
    document.querySelectorAll('.dot').forEach(dot => {
        if (showDot) {
            dot.classList.add("invisible");
        } else {
            dot.classList.remove("invisible");
        }
    });

    // Aktualizace času
    hour.textContent = String(now.getHours()).padStart(2, "0");
    min.textContent = String(now.getMinutes()).padStart(2, "0");
    sec.textContent = String(now.getSeconds()).padStart(2, "0");

    // Aktualizace datumu
    dateElement.textContent = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;

    // Aktualizace dne v týdnu
    const weekdays = document.querySelectorAll('.weekday');
    weekdays.forEach(day => day.classList.remove("active"));
    const activeDay = document.querySelector(`[data-day="${now.getDay()}"]`);
    if (activeDay) activeDay.classList.add("active");
}

// Inicializace
update();
setInterval(update, 500);

// Aktualizace teploty častěji pro testovací účely
updateTemperature();
setInterval(updateTemperature, 5 * 60 * 1000); // Každých 5 minut místo 30
