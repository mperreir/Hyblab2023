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
    imgLogo.style.top = "0";
    imgLogo.style.left = "0px";
    imgLogo.style.zIndex = "2";
    imgLogo.style.width = "450px";

    lienLogo.appendChild(imgLogo);

    const lienCroix = document.createElement("a");
    lienCroix.href = "index.html";
    lienCroix.style.textDecoration = "none";

    const imgMenuBurger = document.createElement("img");
    imgMenuBurger.src = "img/croix.png";
    imgMenuBurger.alt = "croix";
    imgMenuBurger.id = "popUpNav";
    imgMenuBurger.style.position = "absolute";
    imgMenuBurger.style.top = "50px";
    imgMenuBurger.style.right = "50px";
    imgMenuBurger.style.zIndex = "2";

    divIconeHeader.appendChild(lienLogo);
    divIconeHeader.appendChild(imgMenuBurger);
    header.appendChild(divIconeHeader);
}
