// API bazinis adresas į MockAPI resursą
const BASE_URL = "https://6964e16be8ce952ce1f36b3f.mockapi.io/komodos";


// GET: Gauti visas komodas iš MockAPI
export async function fetchAllKomodos() {
  // Siunčiame GET užklausą į visą kolekciją
  const res = await fetch(BASE_URL);

  // Grąžiname JSON masyvą (visų komodų sąrašą)
  return res.json();
}


// GET: Gauti vieną komodą pagal ID
export async function fetchKomodaById(id) {
  // Siunčiame GET užklausą į konkretų resursą pagal ID
  const res = await fetch(`${BASE_URL}/${id}`);

  // Grąžiname vienos komodos duomenis
  return res.json();
}


// DELETE: Ištrinti komodą pagal ID
export async function deleteKomoda(id) {
  // Siunčiame DELETE užklausą į konkretų resursą
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  // Grąžiname atsakymą (MockAPI grąžina ištrintą objektą)
  return res.json();
}


// POST: Pridėti naują komodą
export async function createKomoda(data) {
  // Siunčiame POST užklausą su JSON duomenimis
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Grąžiname sukurtą objektą
  return res.json();
}