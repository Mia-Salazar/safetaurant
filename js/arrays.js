const provinces = ["Alava", "Albacete", "Alicante", "Almería", "Asturias", "Avila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
"Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "La Coruña", "Cuenca", "Gerona", "Granada", "Guadalajara",
"Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "León", "Lérida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra",
"Orense", "Palencia", "Las Palmas", "Pontevedra", "La Rioja", "Salamanca", "Segovia", "Sevilla", "Soria", "Tarragona",
"Santa Cruz de Tenerife", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"];
const zipcodes = {
    "01": "Alava",
    "02": "Albacete",
    "03": "Alicante",
    "04": "Almería",
    "33": "Asturias",
    "05": "Avila",
    "06": "Badajoz",
    "08": "Barcelona",
    "09": "Burgos",
    "10": "Cáceres",
    "11": "Cádiz",
    "39": "Cantabria",
    "12": "Castellón",
    "13": "Ciudad Real",
    "14": "Córdoba",
    "15": "La Coruña",
    "16": "Cuenca",
    "17": "Gerona",
    "18": "Granada",
    "19": "Guadalajara",
    "20": "Guipúzcoa",
    "21": "Huelva",
    "22": "Huesca",
    "07": "Islas Baleares",
    "23": "Jaén",
    "24": "León",
    "25": "Lérida",
    "27": "Lugo",
    "28": "Madrid",
    "29": "Málaga",
    "30": "Murcia",
    "31": "Navarra",
    "32": "Orense",
    "34": "Palencia",
    "35": "Las Palmas",
    "36": "Pontevedra",
    "26": "La Rioja",
    "37": "Salamanca",
    "40": "Segovia",
    "41": "Sevilla",
    "42": "Soria",
    "43": "Tarragona",
    "38": "Santa Cruz de Tenerife",
    "44": "Teruel",
    "45": "Toledo",
    "46": "Valencia",
    "47": "Valladolid",
    "48": "Vizcaya",
    "49": "Zamora",
    "50": "Zaragoza"
}
const foodType = ["Italiana", "India","Americana", "Mexicana", "Japonesa", "Coreana", "Pastelería", "Cafetería", "Tapas", "China", "Pizza", "Hamburguesa", "Vietnamita", "Portuguesa",
"Vegana", "Vegetariana", "Vietnamita", "Peruana", "India", "Tailandesa", "Gourmet", "Fusión", "Catering", "Otro", "Heladería", "Latinoamericana", "Española", "Griega"];

const provinceSelect = document.getElementById("province");
const foodSelect = document.getElementById("foodType");

//Rellenamos los select con los array que encontramos arriba
const fillSelects = () => {
    provinces.forEach((province) => {
      let option = document.createElement("option");
      option.value = province;
      option.innerHTML = province;
      if (province === "Madrid") {
        option.setAttribute("selected", "selected"); 
      }
      provinceSelect.appendChild(option);
    });
    const foodTypeOrderes = foodType.sort();
    foodTypeOrderes.forEach((food) => {
      let option = document.createElement("option");
      option.value = food;
      option.innerHTML = food;
      foodSelect.appendChild(option);
    });
}

fillSelects()