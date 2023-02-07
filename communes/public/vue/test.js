const init = async function(){
    const body = document.querySelector('body');
    const p1 = document.createElement('p');
    p1.textContent = "TEST";
    body.appendChild(p1);

    // Retrieve the partner's topic from our API
    let response = await fetch('api/energy/test');
    const data1 = await response.json();

    console.log(data1);
    data1.forEach((data) => {
        const p = document.createElement('p');
        p.textContent = data.Departement;
        body.appendChild(p);
    });
}

init();