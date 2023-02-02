const dataTest = ["animal1", "animal2", "animal3", "animal4", 1 , 2, 3, 4, 5, 6, 7, 8, 9];
const buttonContainer = document.getElementById("animals-buttons");

buttonContainer.style.width = "innerWidth";
buttonContainer.style.display = "flex";
buttonContainer.style.flexDirection = "column";

dataTest.forEach(function(item){
    const button = document.createElement("button");
    button.id = item;
    button.textContent = item;
    button.style.margin = "20px 0";
    buttonContainer.appendChild(button);
});

