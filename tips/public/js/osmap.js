let map = new OpenLayers.Map("map");
map.addLayer(new OpenLayers.Layer.OSM());

let epsg4326 =  new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
let projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)

var lonLat = new OpenLayers.LonLat( -1.552800, 47.218102).transform(epsg4326, projectTo);
    

var zoom=14;
map.setCenter (lonLat, zoom);

//AJOUT DES MARQUEURS
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

let vectorLayer = new OpenLayers.Layer.Vector("Overlay");

let tabFeature = recupThemes().then(result=> {
    let tabFeature = [];
    let zoomMarker = 7;
    for (let i = 0 ; i < result.length ; i++){
        let pathImg = "./img/pinMap/pinMap_" + result[i].theme + ".png";

        let feature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point( result[i].long, result[i].lat ).transform(epsg4326, projectTo),
            {description: result[i].nom} ,
            {externalGraphic: pathImg, graphicHeight: 25*zoomMarker, graphicWidth: 21*zoomMarker, graphicXOffset:-12, graphicYOffset:-25  }
        );
        tabFeature.push({initiative: result[i].nom, feature : feature, open : false});
        vectorLayer.addFeatures(feature);
    }
    console.log(tabFeature)
    return tabFeature;

});



map.addLayer(vectorLayer);


//Add a selector control to the vectorLayer with popup functions
var controls = {
selector: new OpenLayers.Control.SelectFeature(vectorLayer, { onSelect: createPopup})
};
let openFeatures = [];
function createPopup(feature) {
    for (let j = 0 ; j < openFeatures.length ; j++){
        destroyPopup(openFeatures[j]);               
    }
    openFeatures.push(feature);

    feature.popup = new OpenLayers.Popup.FramedCloud("pop",
        feature.geometry.getBounds().getCenterLonLat(),
        null,
        '<div class="markerContent">'+feature.attributes.description+'</div>',
        null,
        true,
        function() { controls['selector'].unselectAll(); }
    );
    feature.popup.updateSize(new OpenLayers.Size(20, 4));
    map.addPopup(feature.popup);
}

function destroyPopup(feature) {
    for (let j = 0 ; j < openFeatures.length ; j++){
        openFeatures.pop();
    }
    feature.popup.destroy();
    feature.popup = null;
}

map.addControl(controls['selector']);
controls['selector'].activate();

const baliseMap = document.getElementById("map");
baliseMap.style.height = "90%";






//SUPPRIMER LE TEXTE EN PLEIN MILIEU DE LA CARTE
const allId = baliseMap.querySelectorAll("*[id]");
allId[65].innerHTML = "";
