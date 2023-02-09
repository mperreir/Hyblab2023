// set up text to print, each item in array is new line
var aText = new Array(
    "erreur de chargement"
);
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row



const introSlide = async function() {
    let response = await fetch('../data/data.json');
    const data = await response.json();
    const value = swiper.activeIndex +1
    const data_filter = data.intro.filter(function(item){return item.name === "intro"+value;})[0]
    document.querySelector("#Elu"+value).data=data_filter.file_name
    aText = new Array(data_filter.tchat)
    iIndex = 0;
    iArrLength = aText[0].length;
    iTextPos = 0;
    sContents = '';
    iRow = 0;

    typewriter();
}
const introSlide2 = async function() {
    let response = await fetch('../data/data.json');
    const data = await response.json();
    const value = swiper.activeIndex +6
    const data_filter = data.intro.filter(function(item){return item.name === "intro"+value;})[0]
    document.querySelector("#Elu"+value).data=data_filter.file_name
    if(value === 6){
        aText = new Array(data_filter.tchat + sessionStorage.getItem("Score"))
    }
    else{
        aText = new Array(data_filter.tchat)
    }
    console.log(aText)
    iIndex = 0;
    iArrLength = aText[0].length;
    iTextPos = 0;
    sContents = '';
    iRow = 0;

    typewriter();
}