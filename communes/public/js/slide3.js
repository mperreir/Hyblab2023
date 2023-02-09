"use strict";

const initSlide3 = function(data, data_map){
    console.log(data.carte.name);
    document.querySelector('#map-title').innerHTML = data.carte.name.toUpperCase();

    const div_map = document.querySelector('#map');

    const d = [
        {"code": "1", "value": 3404},
        {"code": "2", "value": 95534},
        {"code": "3", "value": 2152},
        {"code": "4", "value": 9814},
        {"code": "5", "value": 89283},
        {"code": "6", "value": 6850},
        {"code": "7", "value": 63366},
        {"code": "8", "value": 73917},
        {"code": "9", "value": 95294},
        {"code": "10", "value": 61266},
        {"code": "11", "value": 46406},
        {"code": "12", "value": 76066},
        {"code": "13", "value": 59475},
        {"code": "14", "value": 67537},
        {"code": "15", "value": 80651},
        {"code": "16", "value": 27095},
        {"code": "17", "value": 98761},
        {"code": "18", "value": 66453},
        {"code": "19", "value": 68530},
        {"code": "21", "value": 52020},
        {"code": "22", "value": 33921},
        {"code": "23", "value": 13131},
        {"code": "24", "value": 63214},
        {"code": "25", "value": 76362},
        {"code": "26", "value": 59943},
        {"code": "27", "value": 85840},
        {"code": "28", "value": 42955},
        {"code": "29", "value": 15709},
        {"code": "30", "value": 19189},
        {"code": "31", "value": 9360},
        {"code": "32", "value": 7879},
        {"code": "33", "value": 51624},
        {"code": "34", "value": 86965},
        {"code": "35", "value": 76236},
        {"code": "36", "value": 99590},
        {"code": "37", "value": 2119},
        {"code": "38", "value": 9337},
        {"code": "39", "value": 33959},
        {"code": "40", "value": 21668},
        {"code": "41", "value": 19434},
        {"code": "42", "value": 31864},
        {"code": "43", "value": 88420},
        {"code": "44", "value": 1809},
        {"code": "45", "value": 94777},
        {"code": "46", "value": 22891},
        {"code": "47", "value": 66037},
        {"code": "48", "value": 50008},
        {"code": "49", "value": 35724},
        {"code": "50", "value": 54942},
        {"code": "51", "value": 1299},
        {"code": "52", "value": 6704},
        {"code": "53", "value": 43175},
        {"code": "54", "value": 26835},
        {"code": "55", "value": 51209},
        {"code": "56", "value": 44132},
        {"code": "57", "value": 70353},
        {"code": "58", "value": 90297},
        {"code": "59", "value": 23742},
        {"code": "60", "value": 28730},
        {"code": "61", "value": 51199},
        {"code": "62", "value": 32746},
        {"code": "63", "value": 20465},
        {"code": "64", "value": 583},
        {"code": "65", "value": 83002},
        {"code": "66", "value": 5188},
        {"code": "67", "value": 38484},
        {"code": "68", "value": 87793},
        {"code": "69", "value": 19066},
        {"code": "70", "value": 69484},
        {"code": "71", "value": 34013},
        {"code": "72", "value": 69689},
        {"code": "73", "value": 50177},
        {"code": "74", "value": 44974},
        {"code": "75", "value": 12652},
        {"code": "76", "value": 28129},
        {"code": "77", "value": 12557},
        {"code": "78", "value": 36596},
        {"code": "79", "value": 48123},
        {"code": "80", "value": 14797},
        {"code": "81", "value": 74605},
        {"code": "82", "value": 16134},
        {"code": "83", "value": 52698},
        {"code": "84", "value": 63125},
        {"code": "85", "value": 39440},
        {"code": "86", "value": 7419},
        {"code": "87", "value": 60575},
        {"code": "88", "value": 40476},
        {"code": "89", "value": 60935},
        {"code": "90", "value": 25203},
        {"code": "91", "value": 31277},
        {"code": "92", "value": 58762},
        {"code": "93", "value": 85141},
        {"code": "94", "value": 79916},
        {"code": "95", "value": 80013},
        {"code": "971", "value": 74695},
        {"code": "972", "value": 7205},
        {"code": "973", "value": 60439},
        {"code": "974", "value": 39447},
        {"code": "976", "value": 15563},
        {"code": "2A", "value": 13595},
        {"code": "2B", "value": 71118},
    ]

    // map_generator(div_map, d, data.main_color);


    d3.xml("../img/carte.svg").then(function(xml) {
        var importedNode = document.importNode(xml.documentElement, true);
        d3.select(importedNode).attr("width", "100%").attr("height", "100%");
        let map = d3.select("#map");
        map.node().appendChild(importedNode);

        color_map(map, d, data.main_color);
    });

    create_legend(document.getElementById("legend"), d, data.main_color);
};

const color_map = function(map, data, main_color){
    let list_code = data.map((item) => {return '.dept-'+item.code;});
    let list_color = color_gradient(data.map((item) => {return item.value;}), main_color);

    for (let i = 0; i < list_code.length; i++){
        map.selectAll(list_code[i]).style("fill", list_color[i]);
    }

    map.selectAll(".land").on("click", function() {
        console.log(this.classList[1]);
    });

    map.selectAll(".land").on("click", function() {
        let dept_code = this.classList[1].replaceAll('dept-', '');

        /*
        d3.xml("../img/dept/" + dept_code + ".svg").then(function(newXml) {
            var newImportedNode = document.importNode(newXml.documentElement, true);
            d3.select("#map").transition().duration(1000).style("opacity", 0)
                .on("end", function() {
                    map.node().innerHTML = '';
                    d3.select(newImportedNode).attr("width", "100%").attr("height", "100%");
                    map.node().appendChild(newImportedNode);
                    d3.select("#map").transition().duration(1000).style("opacity", 1);
                });
        });
         */

        alert(dept_code);
    });

}

function mapValue(value, max_value, main_color_value){
    const color_value_corrected = main_color_value * 0.7;
    return Math.round((value - 0) * (color_value_corrected - 255) / (max_value - 0) + 255);
}

const color_gradient = function(value, main_color){
    const rgb = main_color.match(/\w\w/g).map((x) => {return parseInt(x, 16);});
    const max = Math.max(...value);
    let new_color = [];
    for (let i = 0; i < value.length; i++){
        let r = mapValue(value[i], max, rgb[0]);
        let g = mapValue(value[i], max, rgb[1]);
        let b = mapValue(value[i], max, rgb[2]);
        new_color.push('#'+r.toString(16)+g.toString(16)+b.toString(16));
    }
    return new_color;
}

const create_legend = function(container, data, main_color){

    const rgb = main_color.match(/\w\w/g).map((x) => {return parseInt(x, 16);});
    const color_value_corrected = '#'+Math.round(rgb[0] * 0.7).toString(16)+Math.round(rgb[1] * 0.7).toString(16)+Math.round(rgb[2] * 0.7).toString(16);

    const max = Math.max(...data.map((item) => {return item.value;}));
    const min = Math.min(...data.map((item) => {return item.value;}));

    var legend = d3.select(container).append("svg")
        .attr("viewBox", "0 0 200 20")
        .attr("preserveAspectRatio", "xMinYMin meet");

    var gradient = legend.append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "white")
        .attr("stop-opacity", 1);

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color_value_corrected)
        .attr("stop-opacity", 1);

    legend.append("rect")
        .attr("width", 200)
        .attr("height", 10)
        .style("fill", "url(#gradient)")
        .style("stroke", "black")
        .style("stroke-width", "1px");

    legend.append("text")
        .attr("text-anchor", "start")
        .attr("x", 2)
        .attr("y", 19)
        .text(min + " TWh")
        .style("font-size", "0.7em")
        .style("fill", "white")
        .style("font-family", "Poppins");

    legend.append("text")
        .attr("text-anchor", "end")
        .attr("x", 198)
        .attr("y", 19)
        .text(max + " TWh")
        .style("font-size", "0.7em")
        .style("fill", "white")
        .style("font-family", "Poppins");

}
