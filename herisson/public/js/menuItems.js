window.onload = function() {
    const header = document.getElementById("headerMenu");

    const divIconeHeader = document.createElement("div");
    divIconeHeader.id = "iconeHeader";

    const lienLogo = document.createElement("a");
    lienLogo.href = "index.html";
    lienLogo.style.textDecoration = "none";

    const imgLogo = document.createElement("img");
    imgLogo.src = "img/logo_faunare.png";
    imgLogo.alt = "logo";
    imgLogo.id = "logo";
    imgLogo.style.position = "absolute";
    imgLogo.style.top = "2vh";
    imgLogo.style.left = "5vw";
    imgLogo.style.zIndex = "2";
// imgLogo.style.width = "25vw";
    imgLogo.style.height = "3vh";


    lienLogo.appendChild(imgLogo);

    const imgMenuBurger = document.createElement("img");
    imgMenuBurger.src = "img/menu.png";
    imgMenuBurger.alt = "menu";
    imgMenuBurger.id = "popUpNav";
    imgMenuBurger.style.position = "absolute";
    imgMenuBurger.style.top = "2vh";
    imgMenuBurger.style.right = "5vw";
    imgMenuBurger.style.zIndex = "2";
// imgMenuBurger.style.width = "5vw";
    imgMenuBurger.style.height = "2.75vh";

    const lienCroix = document.createElement("a");
    lienCroix.href = "index.html";
    lienCroix.style.textDecoration = "none";

    const imgCroix = document.createElement("img");
    imgCroix.src = "img/croix.png";
    imgCroix.alt = "croix";
    imgCroix.id = "popUpNav";
    imgCroix.style.position = "absolute";
    imgCroix.style.top = "50px";
    imgCroix.style.right = "50px";
    imgCroix.style.zIndex = "2";

    imgCroix.addEventListener("click", function() {
        window.history.back();
    });

    divIconeHeader.appendChild(lienLogo);
    divIconeHeader.appendChild(imgCroix);
    header.appendChild(divIconeHeader);
}
