
<template>
  <SearchBar />
 <div id="container">
   <div id="mapContainer"></div>
 </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import SearchBar from '../../components/SearchBar.vue'
import festivalsData from '../../data/festival_bretagne_clean.geojson';
// import { mapGetters, mapState } from 'vuex';

export default {
 name: "App",
 components : {
  SearchBar
 },
 data() {
   return{
     center: [48.2020, -2.9326],
     map: null,
     selectedFestival : this.$store.state.selectedFestival,

   }
 },
 computed: {

 },
 methods: {
   setupLeafletMap: function () {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
     this.map = L.map("mapContainer").setView(this.center, 7);
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
     L.geoJSON(festivalsData).addTo(this.map);
     if(this.selectedFestival){
        const selectedFestivalLatLng = [this.selectedFestival.geometry.coordinates[1], this.selectedFestival.geometry.coordinates[0]];
        L.marker(selectedFestivalLatLng).addTo(this.map).bindPopup(`
            <p>Name: ${this.selectedFestival.properties.nom_festival}</p>
            <p>City: ${this.selectedFestival.properties.com_name}</p>
            <p>Usual Month: ${this.selectedFestival.properties.mois_habituel}</p>
            <p>Domain: ${this.selectedFestival.properties.domaine}</p>
          `).openPopup();
        this.map.setView(selectedFestivalLatLng, 8);
     }
   },
 },
 mounted() {
    this.setupLeafletMap();
 },
 watch: {
   selectedFestival(newValue) {
     if(newValue) {
       const selectedFestivalLatLng = [newValue.geometry.coordinates[1], newValue.geometry.coordinates[0]];
       L.marker(selectedFestivalLatLng).addTo(this.map).bindPopup(`
            <p>Name: ${newValue.properties.nom_festival}</p>
            <p>City: ${newValue.properties.com_name}</p>
            <p>Usual Month: ${newValue.properties.mois_habituel}</p>
            <p>Domain: ${newValue.properties.domaine}</p>`)
            .openPopup();
          this.map.setView(selectedFestivalLatLng, 10);
          }
}
},
};

</script>
<style scoped>
#mapContainer {
 width: 100vw;
 height: 80vh;
}
</style>