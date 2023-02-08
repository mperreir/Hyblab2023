async function createNbChocPage(commune) {
    const main = document.getElementsByTagName("main");
    const hammer = new Hammer(main[0]);
    hammer.on("panup", (event) => {
        event.preventDefault();
        document.body.style.opacity = "0";
        setTimeout(() => {
            window.location.href = "main.html";
        }, 0);
    })


}
