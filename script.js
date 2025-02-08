const $ = (selector) => document.querySelector(selector);

const hour = $(".hour");
const dot = $(".dot");
const min = $(".min");
const week = $(".week");
const dateElement = $(".date"); // Přidáno správné přiřazení prvku pro datum

let showDot = true;

function update() {
    showDot = !showDot;
    const now = new Date();

    if (showDot) {
        dot.classList.add("invisible");
    } else {
        dot.classList.remove("invisible");
    }

    hour.textContent = String(now.getHours()).padStart(2, "0");
    min.textContent = String(now.getMinutes()).padStart(2, "0");

    // Opraveno: Nastavení datumu správným způsobem
    dateElement.textContent = String(now.getDate()).padStart(2, "0") + "." + 
                              String(now.getMonth() + 1).padStart(2, "0");

    // Aktualizace aktivního dne v týdnu
    Array.from(week.children).forEach(ele => ele.classList.remove("active"));
    week.children[now.getDay() === 0 ? 6 : now.getDay() - 1].classList.add("active");
}

// Okamžitá aktualizace při načtení a poté každou sekundu
update();
setInterval(update, 1000);
