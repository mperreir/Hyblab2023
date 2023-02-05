// set up text to print, each item in array is new line
var aText = new Array(
    "erreur de chargement"
);
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row



const introSlide3 = async function() {
    let response = await fetch('../data/data.json');
    const data = await response.json();
    const data_filter = data.filter(function(item){return item.name === "intro3";})[0]
    aText = new Array(data_filter.tchat)
    iIndex = 0;
    iArrLength = aText[0].length;
    iTextPos = 0;
    sContents = '';
    iRow = 0;

    typewriter();
}
