const BASE_URL = "https://6964e16be8ce952ce1f36b3f.mockapi.io/komodos";

// Gauti visas komodas
export async function fetchAllKomodos() {
  const res = await fetch(BASE_URL);
  return res.json();
}

// Gauti vieną komodą pagal ID
export async function fetchKomodaById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

// Ištrinti komodą
export async function deleteKomoda(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// Pridėti naują komodą
export async function createKomoda(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}