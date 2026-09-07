const stores = [
  {
    name: "Amarket La Salle",
    address: "2do anillo entre calle Libertad y calle Platanillo, Santa Cruz de la Sierra, Bolivia",
    lat: -17.7714323,
    lng: -63.1854881,
    cid: "8663523850934259682"
  },
  {
    name: "Amarket Velarde",
    address: "Av. Velarde esquina calle Juan de Garay, Santa Cruz de la Sierra, Bolivia",
    lat: -17.7962857,
    lng: -63.1805653,
    cid: "13203689299411360303"
  },
  {
    name: "Amarket Paragua",
    address: "4to anillo casi esquina avenida Paragua, Santa Cruz de la Sierra, Bolivia",
    lat: -17.764562,
    lng: -63.1493811,
    cid: "6520490325231710196"
  },
  {
    name: "Amarket Sirari",
    address: "4to anillo esquina Av. Busch, barrio Sirari, Santa Cruz de la Sierra, Bolivia",
    lat: -17.7651496,
    lng: -63.2048515,
    cid: "2780685632752413716"
  },
  {
    name: "Amarket Isuto",
    address: "3er anillo esquina calle Marcelo Terceros, Santa Cruz de la Sierra, Bolivia",
    lat: -17.7537866,
    lng: -63.1959577,
    cid: "14767915558659220839"
  }
];

const grid = document.getElementById("storeGrid");
const mapFrame = document.getElementById("mapFrame");
const mapTitle = document.getElementById("mapTitle");
const mapAddress = document.getElementById("mapAddress");
const mapsButton = document.getElementById("mapsButton");

// Enlaza directo a la ficha exacta de cada tienda en Google Maps (por su CID,
// el identificador único del local), no a una busqueda por texto ni a
// coordenadas sueltas: asi el nombre y el pin son siempre los correctos,
// sin importar desde donde se abra. Desde la ficha, el usuario toca
// "Cómo llegar" y Maps traza la ruta desde su ubicación actual.
function mapsDirectionsUrl(store){
  return "https://www.google.com/maps?cid=" + store.cid;
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
