window.onload = function() {
    const popUpNav = document.getElementById("popUpNav");
    const menu = document.getElementById("texteMenu");

    popUpNav.addEventListener("click", function () {
        if (menu.style.opacity === "0") {
            menu.style.opacity = "1";
            menu.style.left = "0";
            menu.style.visibility = "visible";
        } else {
            menu.style.opacity = "0";
            menu.style.left = "+100%";
            menu.style.visibility = "hidden";
        }
    })
};