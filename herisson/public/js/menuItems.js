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
