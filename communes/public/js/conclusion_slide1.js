"use strict";

// async init function (because of the awaits on fetches)
const initSlide1 = async function(){
  let response = await fetch('../data/data.json');
  const data = await response.json();

  function mise_en_forme(data) {
    const logo = document.querySelector('#logo-environment');
    document.querySelector('#titre').innerHTML = data.titre.toUpperCase();
    document.querySelector('#text1').innerHTML = data.texte1;
    document.querySelector('#text2').innerHTML = data.texte2;
    document.querySelectorAll(".chart-section").forEach((main) => {main.style.backgroundColor = data.color.background[1];});

    logo.data = data.logo;
    change_svg_color(logo, "#000000");

    const score = 0.7;
    const width = document.querySelector('#progress-bar').clientWidth;
    const height = document.querySelector('#progress-bar').clientHeight;

    const svg = d3.select("#progress-bar")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width]);

    svg.selectAll("rect")
        .data([score])
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", height/2)
        .style("fill", data.color.background[0]);

    svg.selectAll("rect2")
        .data([score])
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width*score)
        .attr("height", height)
        .attr("rx", height/2)
        .style("fill", data.color.main[0]);

    svg.selectAll("text")
        .data([score])
        .enter()
        .append("text")
        .attr("x", width*0.05)
        .attr("y", height/2)
        .attr("text-anchor", "left")
        .attr("dominant-baseline", "central")
        .style("font-size", "20px")
        .style("fill", "#FFFFFF")
        .text(Math.round(score*100) + "%");
  }

  function credit(data) {
    const credit = document.querySelectorAll('.credit-titre');
    for (let i = 0; i < credit.length; i++) {
      credit[i].innerHTML = data.credits.titre.toUpperCase();
      credit[i].style.backgroundColor = data.color.main[0];
    }

    const credit_text = document.querySelector('#fourth-slide main');
    for (let i = 0; i < data.credits.membres.length; i++) {
      const p = document.createElement('p');
      let member = data.credits.membres[i];
      p.innerHTML = member.prenom + ' ' + member.nom.toUpperCase() + ' - ' + member.ecole;
      credit_text.appendChild(p);
    }
  }

  mise_en_forme(data.conclusion);
  credit(data.conclusion);
  initSlide2(data.conclusion);
  initSlide3(data.conclusion);
};