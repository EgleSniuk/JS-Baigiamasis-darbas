import { createKomoda } from "../utils/fetch.js";

const form = document.getElementById("komoda-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Regex taisyklės
  const titleRegex = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž0-9 ]{3,}$/;
  const priceRegex = /^[0-9]+$/;
  const urlRegex = /^https?:\/\/.+/;
  const locationRegex = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž ]{2,}$/;

  // Laukų reikšmės
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const imgUrl = document.getElementById("imgUrl").value;
  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;

  // Validacija
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

  // Objektas POST užklausai
  const newKomoda = {
    title,
    price: Number(price),
    imgUrl,
    description,
    location,
  };

  const created = await createKomoda(newKomoda);

  if (created) {
    message.textContent = "Komoda sėkmingai įkelta!";
    form.reset();

    setTimeout(() => {
      window.location.replace("../index.html");
    }, 2000);
  }
});

// Burger meniu
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
});