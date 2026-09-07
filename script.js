const stores = [
  {
    name: "Amarket La Salle",
    address: "2do anillo entre calle Libertad y calle Platanillo, Santa Cruz de la Sierra, Bolivia",
    lat: -17.7714323,
    lng: -63.1854881
  },
  {
    name: "Amarket Velarde",
    address: "Av. Velarde esquina calle Juan de Garay, Santa Cruz de la Sierra, Bolivia",
    lat: -17.7962857,
    lng: -63.1805653
  },
  {
    name: "Amarket Paragua",
    address: "4to anillo casi esquina avenida Paragua, Santa Cruz de la Sierra, Bolivia",
    lat: -17.764562,
    lng: -63.1493811
  },
  {
    name: "Amarket Sirari",
    address: "4to anillo esquina Av. Busch, barrio Sirari, Santa Cruz de la Sierra, Bolivia",
    lat: -17.7651496,
    lng: -63.2048515
  },
  {
    name: "Amarket Isuto",
    address: "3er anillo esquina calle Marcelo Terceros, Santa Cruz de la Sierra, Bolivia",
    lat: -17.7537866,
    lng: -63.1959577
  }
];

const grid = document.getElementById("storeGrid");
const mapFrame = document.getElementById("mapFrame");
const mapTitle = document.getElementById("mapTitle");
const mapAddress = document.getElementById("mapAddress");
const mapsButton = document.getElementById("mapsButton");

// Rutas exactas al pin de cada tienda (coordenadas confirmadas en Google Maps),
// no una búsqueda por texto: así el botón siempre lleva al lugar correcto
// sin importar desde dónde se abra.
function mapsDirectionsUrl(store){
  return "https://www.google.com/maps/dir/?api=1&destination=" + store.lat + "," + store.lng;
}
function mapsEmbedUrl(store){
  return "https://www.google.com/maps?q=" + store.lat + "," + store.lng + "&z=17&output=embed";
}

function selectStore(index){
  const store = stores[index];
  mapTitle.textContent = store.name;
  mapAddress.textContent = store.address;
  mapFrame.src = mapsEmbedUrl(store);
  mapsButton.href = mapsDirectionsUrl(store);

  document.querySelectorAll(".store").forEach((el,i)=>{
    el.classList.toggle("active", i===index);
  });

  if (window.gtag) {
    gtag("event","select_store",{store_name:store.name});
  }
}

stores.forEach((store,index)=>{
  const card = document.createElement("article");
  card.className = "store";
  card.innerHTML = `
    <h3>${store.name}</h3>
    <p>${store.address}</p>
    <button class="btn" type="button">VER EN EL MAPA</button>
  `;
  card.querySelector("button").addEventListener("click",()=>{
    selectStore(index);
    document.querySelector(".map-card").scrollIntoView({behavior:"smooth",block:"start"});
  });
  grid.appendChild(card);
});

selectStore(0);
