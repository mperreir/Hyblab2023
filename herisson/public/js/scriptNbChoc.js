const hammer = new Hammer(document.documentElement)
hammer.on("panup", (event) => {
    event.preventDefault();
    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "main.html";
    }, 500);
})

