let map;
let tabMarker;

function initMap() {
  const nantesCoord = { lat: 47.218102, lng: -1.552800 };
  const baliseMap = document.getElementById("map");
  baliseMap.style.height = "90%";
  baliseMap.style.width = "100%";

  let colorTest = "#7ed87e";
  let colorTerritory = "#FFFBF0";
  let colorText = "#7ed87e";
  let colorAdminCountry = "#7ed87e";
  let coloradminLabel = "#bdbdbd";
  let colorPoiGeo = "#7ed87e";
  let colorPoiLabel = "#7ed87e";
  let colorPoiTxtStroke = "#7ed87e";
  let colorRoadTxt = "#7ed87e";
  let colorRoadGeo = "#7ed87e";
  let colorRoadArte = "#7ed87e";
  let colorHighRoad = "#7ed87e";
  let colorHighRoadControl = "#7ed87e";
  let colorWaterGeo = "#7ed87e";
  let colorWaterTxt = "#7ed87e";

  map = new google.maps.Map(baliseMap, {
    center: nantesCoord,
    zoom: 13,
  });
  //Supprimer les points notables
  map.setOptions({
    styles: [
      {
      "elementType": "geometry",
      "stylers": [
      {
      "color": colorTerritory
      }
      ]
      },
      {
      "elementType": "labels.icon",
      "stylers": [
      {
      "visibility": "off"
      }
      ]
      },
      {
      "elementType": "labels.text.fill",
      "stylers": [
      {
      "color": colorText
      }
      ]
      },
      {
      "elementType": "labels.text.stroke",
      "stylers": [
      {
      "color": colorTerritory
      }
      ]
      },
      {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
      {
      "color": colorText
      }
      ]
      },
      {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
      {
      "color": colorAdminCountry
      }
      ]
      },
      {
      "featureType": "administrative.land_parcel",
      "stylers": [
      {
      "visibility": "off"
      }
      ]
      },
      {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
      {
      "color": coloradminLabel
      }
      ]
      },
      {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
      {
      "color": colorText
      }
      ]
      },
      {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
      {
      "color": colorPoiGeo
      }
      ]
      },
      {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
      {
      "color": colorPoiLabel
      }
      ]
      },
      {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
      {
      "color": colorPoiTxtStroke
      }
      ]
      },
      {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
      {
      "color": colorRoadGeo
      }
      ]
      },
      {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
      {
      "color": colorRoadTxt
      }
      ]
      },
      {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
      {
      "color": colorRoadArte
      }
      ]
      },
      {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
      {
      "color": colorHighRoad
      }
      ]
      },
      {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
      {
      "color": colorHighRoadControl
      }
      ]
      },
      {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
      {
      "color": colorPoiLabel
      }
      ]
      },
      {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
      {
      "color": colorText
      }
      ]
      },
      {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
      {
      "color": colorWaterGeo
      }
      ]
      },
      {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
      {
      "color": colorWaterTxt
      }
      ]
      }
      ],
  });
  tabMarker = recupThemes().then((result) => {
    let tabMarker = []
    for (let i = 0 ; i < result.length ; i ++){
      //Add les markers sur la carte
      const marker = new google.maps.Marker({
        position: {lat : result[i].lat, lng : result[i].long},
        map,
        title: result[i].nom,
        icon: "./img/pinMap/pinMap_" + result[i].theme + ".png",
      });
      //Texte de la pop up ( pour le style il faut faire de l'html et du css)
      const textInPopUp = "<h1>BONJOUR JE SUIS : " + result[i].nom + " et je consiste à " + result[i].description + "</h1>";
      //Add les pop-up des markers
      const infowindow = new google.maps.InfoWindow({
        content: textInPopUp,
        ariaLabel: result[i].nom,
      });
      tabMarker.push({"marker" : marker, "info": infowindow, "open" : false});
      marker.addListener("click", () => {
        if (tabMarker[i].open) {
          tabMarker[i].info.close({
            anchor: marker,
            map,
          });
          tabMarker[i].open = false;
        }
        else{
          allMarkerClose(tabMarker);
          tabMarker[i].info.open({
            anchor: marker,
            map,
          });
          tabMarker[i].open = true;
        } 
      });
      function allMarkerClose(tabMarker){
        for (let j = 0 ; j < tabMarker.length ; j++){
          tabMarker[j].info.close({
            anchor: marker,
            map,
          });
          tabMarker[j].open = false;
        }
      }
    }
    return tabMarker;
  });
}

async function recupThemes(){
  const response = await fetch("./api/themes");
  if (response.status != 200) {
    console.log('Error theme not found');
    console.log('tkt cest normal cest en travaux ici, rien nest fini');
  }
  else{
    const data = await response.json();
    let initiativeTab = recupInitiatives(data);
    return initiativeTab;
  }
}

async function recupInitiatives(data){

  let difficulte = ["facile", "difficile"];
  let initiativeTab = [];
  for (let i = 0 ; i < data.length ; i ++){
    for (let j = 0 ; j < difficulte.length ; j++){
      const response = await fetch("./api/initiative/" + data[i] + "/" + difficulte[j]);
      if (response.status != 200) {
        console.log('Error initiative not found');
        console.log('tkt cest normal cest en travaux ici, rien nest fini');
      }
      else{
        const initiative = await response.json();
        initiative.theme = data[i];
        initiativeTab.push(initiative);
      }
    }
  }
  return initiativeTab;
}



//----------------PARTIE LISTE D'INITIATIVES------------------//
function getInitiative(){
  recupThemes().then(result => {
    let initiativeNameTab = getInitiativeName(result);
    constructHTML(initiativeNameTab);
  });
}

function getInitiativeName(initiativeTab){
  let result = [];
  for (let i = 0 ; i < initiativeTab.length ; i ++){
    result.push(initiativeTab[i].nom);
  }
  return result;
}

function constructHTML(nameTab){
  const ulBalise = document.querySelector("#initiativeListConteneur");
  ulBalise.style.display = "none";
  for (let i = 0 ; i < nameTab.length ; i++){
    let liBalise = document.createElement("li");
    liBalise.innerHTML = nameTab[i];

    //Code dégueu
    liBalise.addEventListener("click", ( e =>{
      tabMarker.then(result => {
        if (result[i].open) {
          result[i].info.close({
            anchor: result[i].marker,
            map,
          });
          result[i].open = false;
        }
        else{
          allMarkerClose(result);
          result[i].info.open({
            anchor: result[i].marker,
            map,
          });
          result[i].open = true;
        }
        function allMarkerClose(tabMarker){
          for (let j = 0 ; j < tabMarker.length ; j++){
            result[j].info.close({
              anchor: result[i].marker,
              map,
            });
            result[j].open = false;
          }
        }  
      });
    }));
    ulBalise.appendChild(liBalise);
  }
}

function openCloseList(){
  const ulBalise = document.querySelector("#initiativeListConteneur");
  if (ulBalise.style.display == "none"){
    ulBalise.style.display = "flex";
    const baliseMap = document.getElementById("map");
    baliseMap.style.height = "50%";
  }
  else{
    ulBalise.style.display = "none";
    const baliseMap = document.getElementById("map");
    baliseMap.style.height = "90%";
  }

}

function backToPrincipal(){
  window.location.href = "../tips";
}

//------------------------------------------------------------//
//-------------------------LAUNCH-----------------------------//
window.initMap = initMap;

const baliseButton = document.querySelector("#activeListe");
baliseButton.addEventListener("click", openCloseList);
getInitiative();

const baliseRetour = document.querySelector("#retourPagePrincipal");
baliseRetour.addEventListener("click", backToPrincipal);
