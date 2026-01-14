import { fetchKomodaById, deleteKomoda } from "../utils/fetch.js";

// Elementas, kuriame bus atvaizduojama komodos informacija
const komodaWrapper = document.getElementById("komoda-wrapper");

// Ištrynimo mygtukas
const deleteBtn = document.getElementById("delete-btn");

// Grįžimo į katalogą mygtukas (jei naudojamas)
const backBtn = document.getElementById("back-btn");

// Iš URL pasiimame komodos ID (pvz., ?id=3)
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// Gauname komodos duomenis pagal ID (GET užklausa)
const komoda = await fetchKomodaById(id);

// Jei komoda nerasta (pvz., ištrinta anksčiau arba blogas ID)
if (!komoda) {
  komodaWrapper.innerHTML = "<p>Prekė nerasta.</p>";
  deleteBtn.style.display = "none"; // neradus nėra ką trinti
} else {
  // Sukuriame ir atvaizduojame komodos informaciją

  const image = document.createElement("img");
  image.src = komoda.imgUrl;

  const title = document.createElement("h2");
  title.textContent = komoda.title;

  const price = document.createElement("h4");
  price.textContent = `Kaina: €${komoda.price}`;

  const location = document.createElement("h4");
  location.textContent = `Vieta: ${komoda.location}`;

  const description = document.createElement("p");
  description.textContent = komoda.description;

  // Įdedame visus elementus į wrapper
  komodaWrapper.append(image, title, price, location, description);
}

// Ištrynimo logika (DELETE užklausa)
deleteBtn.addEventListener("click", async () => {
  const deleted = await deleteKomoda(id);

  if (deleted) {
    // Parodome pranešimą, kad prekė ištrinta
    komodaWrapper.innerHTML = "<p>Prekė sėkmingai pašalinta iš katalogo.</p>";

    // Paslepiame delete mygtuką, kad vartotojas nespaustų dar kartą
    deleteBtn.style.display = "none";

    // Po 1.5 sekundės grįžtame į pagrindinį katalogą
    setTimeout(() => {
      window.location.replace("../index.html");
    }, 1500);
  }
});

// Burger meniu logika (mobiliai versijai)
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

// Paspaudus burger ikoną atidaromas/uždaromas meniu
burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});