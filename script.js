import { fetchAllKomodos } from "./utils/fetch.js";

const komodosWrapper = document.getElementById("komodos-wrapper");

// Gauti visas komodas
const komodos = await fetchAllKomodos();

// Patikrinti ar yra duomenų
if (komodos.length === 0) {
  komodosWrapper.innerHTML = "<p>Nėra komodų.</p>";
} else {

  // ⭐ RŪŠIAVIMAS NUO MAŽIAUSIOS KAINOS IKI DIDŽIAUSIOS
  komodos.sort((a, b) => a.price - b.price);

  // Atvaizduoti korteles
  komodos.forEach((k) => {
    const card = document.createElement("a");
    card.classList.add("card");

    const link = `./komodos/index.html?id=${k.id}`;
    card.href = link;

    const title = document.createElement("h2");
    title.innerText = k.title;

    const price = document.createElement("h4");
    price.textContent = `Kaina: €${k.price}`;

    const location = document.createElement("h4");
    location.innerText = `Vieta: ${k.location}`;

    const image = document.createElement("img");
    image.src = k.imgUrl;

    card.append(title, price, location, image);
    komodosWrapper.append(card);
  });
}

// Burger meniu
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

