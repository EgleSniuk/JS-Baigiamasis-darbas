import { fetchKomodaById, deleteKomoda } from "../utils/fetch.js";

const komodaWrapper = document.getElementById("komoda-wrapper");
const deleteBtn = document.getElementById("delete-btn");
const backBtn = document.getElementById("back-btn"); // jei turi grįžimo mygtuką

// Gauti ID iš URL
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// Gauti komodos duomenis
const komoda = await fetchKomodaById(id);

// Jei prekė nerasta (pvz., ištrinta anksčiau)
if (!komoda) {
  komodaWrapper.innerHTML = "<p>Prekė nerasta.</p>";
  deleteBtn.style.display = "none";
} else {
  // Atvaizduoti komodą
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

  komodaWrapper.append(image, title, price, location, description);
}

// Ištrynimo logika
deleteBtn.addEventListener("click", async () => {
  const deleted = await deleteKomoda(id);

  if (deleted) {
    // Parodyti pranešimą
    komodaWrapper.innerHTML = "<p>Prekė sėkmingai pašalinta iš katalogo.</p>";

    // Paslėpti delete mygtuką
    deleteBtn.style.display = "none";

    // Po 1.5s grįžti į katalogą
    setTimeout(() => {
      window.location.replace("../index.html");
    }, 1500);
  }
});

// Burger meniu
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});