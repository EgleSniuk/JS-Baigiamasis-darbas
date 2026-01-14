import { createKomoda } from "../utils/fetch.js";

// Pasiimame formą ir vietą, kur rodysime pranešimus
const form = document.getElementById("komoda-form");
const message = document.getElementById("message");

// Klausomės formos pateikimo įvykio
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Neleidžiame puslapiui persikrauti

  // Regex taisyklės (minimalios, kaip reikalauja užduotis)
  const titleRegex = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž0-9 ]{3,}$/; // bent 3 simboliai
  const priceRegex = /^[0-9]+$/; // tik skaičiai
  const urlRegex = /^https?:\/\/.+/; // turi prasidėti http/https
  const locationRegex = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž ]{2,}$/; // tik raidės

  // Pasiimame laukų reikšmes
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const imgUrl = document.getElementById("imgUrl").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;

  // Validacija – tikriname kiekvieną lauką
  if (!titleRegex.test(title)) {
    message.textContent = "Pavadinimas netinkamas (min. 3 simboliai)";
    return;
  }

  if (!priceRegex.test(price)) {
    message.textContent = "Kaina turi būti tik skaičiai";
    return;
  }

  if (!urlRegex.test(imgUrl)) {
    message.textContent = "Nuotraukos URL turi prasidėti http";
    return;
  }

  if (!locationRegex.test(location)) {
    message.textContent = "Lokacija netinkama (tik raidės)";
    return;
  }

  // Objektas, kurį siųsime į MockAPI (POST)
  const newKomoda = {
    title,
    price: Number(price), // konvertuojame į skaičių
    imgUrl,
    description,
    location,
  };

  // Siunčiame POST užklausą į MockAPI
  const created = await createKomoda(newKomoda);

  // Jei sukūrimas pavyko – rodome pranešimą ir išvalome formą
  if (created) {
    message.textContent = "Komoda sėkmingai įkelta!";
    form.reset();

    // Po 2 sekundžių grįžtame į katalogą
    setTimeout(() => {
      window.location.replace("../index.html");
    }, 2000);
  }
});

// Burger meniu logika (mobiliai versijai)
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

// Paspaudus burger ikoną atidaromas/uždaromas meniu
burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});