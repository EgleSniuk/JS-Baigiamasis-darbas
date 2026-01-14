import { fetchAllKomodos } from "./utils/fetch.js";

// Elementas, į kurį bus įdėtos visos komodų kortelės
const komodosWrapper = document.getElementById("komodos-wrapper");

// Gauti visas komodas iš MockAPI (GET užklausa)
const komodos = await fetchAllKomodos();

// Patikrinti, ar gauti duomenys nėra tušti
if (komodos.length === 0) {
  komodosWrapper.innerHTML = "<p>Nėra komodų.</p>";
} else {

  // ⭐ RŪŠIAVIMAS NUO MAŽIAUSIOS KAINOS IKI DIDŽIAUSIOS
  // Tai yra privalomas užduoties reikalavimas
  komodos.sort((a, b) => a.price - b.price);

  // Kiekvienai komodai sukurti kortelę ir ją atvaizduoti
  komodos.forEach((k) => {

    // Kortelė yra <a> tag'as, kad būtų galima paspausti ir pereiti į detalų puslapį
    const card = document.createElement("a");
    card.classList.add("card");

    // Nuoroda į komodos detalės puslapį su ID parametru
    const link = `./komodos/index.html?id=${k.id}`;
    card.href = link;

    // Komodos pavadinimas
    const title = document.createElement("h2");
    title.innerText = k.title;

    // Komodos kaina
    const price = document.createElement("h4");
    price.textContent = `Kaina: €${k.price}`;

    // Komodos lokacija
    const location = document.createElement("h4");
    location.innerText = `Vieta: ${k.location}`;

    // Komodos nuotrauka
    const image = document.createElement("img");
    image.src = k.imgUrl;

    // Sudėti visus elementus į kortelę
    card.append(title, price, location, image);

    // Įdėti kortelę į puslapį
    komodosWrapper.append(card);
  });
}

// Burger meniu logika (mobiliai versijai)
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

// Paspaudus burger ikoną atidaromas/uždaromas meniu
burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

