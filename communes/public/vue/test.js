const init = async function(){
    // Retrieve the partner's topic from our API
    let response = await fetch('api/energy/test');
    const data1 = await response.json();

    console.log(data1);


    const footer = document.querySelector('body');
    data1.forEach((data) => {
        const p = document.createElement('p');
        p.textContent = data.Departement;
        footer.appendChild(p);
    });
}

init();