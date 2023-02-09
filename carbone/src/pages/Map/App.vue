<template>
  <div>
    <a href="home.html" style="text-align:center;   display: block;"> Retour vers la page d'acceuil </a>
    <a href="solutions.html" style="text-align:center;   display: block;">Des solutions concrètes </a>
    <div class="search-container">
        <p style="margin-top:1em;text-align:center;">Choisir le critère de recherche:</p>
      <select v-model="selectedOption" style="  display: block; margin-left: auto; margin-right: auto;">
        <option value="nom_festival">Nom du festival</option>
        <option value="domaine">Genre</option>
        <option value="mois_habituel">Mois habituel</option>
        <option value="com_name">La commune</option>
        <option value="dep_name">Le département</option>
      </select>
      <input
        type="text"
        v-model="search"
        @input="showSuggestions(search)"
        placeholder="Search festival by name"
        @keyup.enter="resetSuggestions()"
      />
      <div v-if="suggestions.length > 0 && (selectedOption !='nom_festival')">
        <p
          class="suggestions-list"
          v-for="festival in suggestions"
          v-bind:key="festival.properties.fid"
          @click="selectFestival(festival)"
        >{{ festival.properties.nom_festival }}, {{ festival.properties.com_name }} , {{ festival.properties[selectedOption] }}</p>
      </div>
      <div v-if="suggestions.length > 0 && selectedOption=='nom_festival'">
        <p
          class="suggestions-list"
          v-for="festival in suggestions"
          v-bind:key="festival.properties.fid"
          @click="selectFestival(festival), showFestival(selectedFestival)"
        >{{ festival.properties.nom_festival }}, {{ festival.properties.com_name }} </p>
      </div>
      <div class="suggestions-list error" v-if="search && !suggestions.length && !selectedFestival">
        <p>No results found!</p>
      </div>
    </div>
    <button class="showButton" @click="showAllFestivals()" value="">montrer tous les festivals</button>
    <div id="map"></div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import festivalsData from '../../data/festival_bretagne_clean.geojson';





export default {
 name: "App",
 
  data() {
    return {
      festivals: [...festivalsData.features],
      suggestions: [],
      selectedFestival: null,
      search: '',
      selectedOption: 'nom_festival',
      map: null,
      center: [48.2020, -2.9326],
      markers: []
    };
  },
  mounted(){    
      
      
      
  },
  watch: {
    search(newSearch) {
      if (!newSearch) {
        this.resetSuggestions();
      }
    },
  },
  computed: {
    filteredFestivals() {
      return this.festivals.filter(festival => {
        return (
          festival.properties[this.selectedOption]
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    showAllFestivals(){
        delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      });
      var map = L.map('map').setView([48.2020, -2.9326], 7);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        L.geoJSON(festivalsData).addTo(map);
        var festivalLayer = L.geoJSON(festivalsData, {
          pointToLayer: function(feature, latlng) {
            return L.marker(latlng);
          },
          onEachFeature: function(festival, layer) {
            layer.bindPopup(`
                <strong><p>Nom: ${festival.properties.nom_festival}</p></strong>
                <p>Commune: ${festival.properties.com_name}</p>
                <p>Département: ${festival.properties.dep_name}</p>
                <p>Genre: ${festival.properties.domaine}</p>
                <p><a href "${festival.properties.site_web}">Site Web</a></p>
                <p>Mois usuel: ${festival.properties.mois_habituel}</p>
              `);
          }
        });
        festivalLayer.addTo(map);
      },
    showSuggestions() {
      this.suggestions = this.filteredFestivals;
    },
    resetSuggestions() {
      this.suggestions = [];
    },
    selectFestival(festival) {
        this.search = festival.properties[this.selectedOption];
        this.suggestions = [];
        this.selectedFestival = festival;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  padding: 20px;
  min-height: 100vh;
  background-color: rgb(234, 242, 255);
}

.showButton{
  display: block;
  width: 70wh;
  margin: 20px auto;
  padding: 10px 45px;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(53, 112, 63) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background: white url("./../../assets/search-icon.svg") no-repeat 15px center;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(53, 112, 63) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.suggestions-list {
  width: 350px;
  margin: 0 auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  background-color: rgb(24, 171, 95);
  cursor: pointer;
}

.error {
  background-color: tomato;
}
#map { height: 80vh; }

</style>
