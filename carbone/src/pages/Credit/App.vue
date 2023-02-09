<template>
    <div class="container">
        <div id="HL">
            <img id="HYBLAB" src="./svg/logo_hyblab.png">
        </div>
        <div id="LeT">
            <img id="LeTele" src="./svg/logo_Tele.svg">
            <div id="NameTele">
                <div class="Name" id="NT1">Pierre-Marie<br>LE GRAND</div>
                <div class="Name" id="NT2">Frédéric<br>JACQ</div>
            </div>
        </div>
        <div id="AetP">
            <div id="AGR">
                <img id="LogoA" src="./svg/logo_agr.svg">
                <div id="NameA">
                    <div class="Name" id="NT1">Josselin<br>Lévêque</div>
                    <div class="Name" id="NT1">Jules<br>BOURDY</div>
                    <div class="Name" id="NT1">Jules<br>GARCIA</div>
                </div>
            </div>
            
            <div id="Poly">
                <img id="LogoP" src="./svg/logo_poly.svg">
                <div id="NameP">
                    <div class="Name" id="NT1">Oualid<br>ZIZI</div>
                    <div class="Name" id="NT1">Ibrahim<br>EL UMARI</div>
                    <div class="Name" id="NT1">Xianxiang<br>ZHANG</div>
                    <div class="Name" id="NT1">Mamisoa<br>RANDRIANARIMANANA</div>
                </div>
            </div>
        </div>
        <div id="FourLogo">
            <img id="Logo1" src="./svg/logo_oml.svg">
            <img id="Logo2" src="./svg/logo_NantesU.svg">
            <img id="Logo3" src="./svg/logo_cc.svg">
            <img id="Logo4" src="./svg/logo_opensource.svg">
        </div>
        <a href="/home/"><button type="button" id="btnBack" onclick=""></button></a>
    </div>
</template>
<style>
.container{
    text-align: center;
}
#HYBLAB{
    height: 10vh;
    margin-bottom: -4vh;
}
#LeTele{
    margin : 3em 0 0 0;
    height: 5vh;
}
#NameTele{
    display: flex;
    margin :  0 0 2em 0;
    flex: 20% 30% 30% 20%;
    justify-content: center;
}
#NameA,#NameP{
    text-align: center;
}
#NT1{
    flex: 0 30% 0 0;
    text-align: center;
    justify-content: center;
}
#NT2{
    flex: 0 0 30% 0;
    text-align: center;
    justify-content: center;
}
#AetP{
    display: flex;
}
#AGR{
    flex: 50% 0;
    justify-content: center;
}
#Poly{
    flex: 0 50%;
    justify-content: center;
}
#LogoA,#LogoP{
    height: 10vh;
}
#FourLogo{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 1em 1em;
    flex-direction: column;
    display: inline;
}
#Logo1{
    margin: 0 4vw;
    height: 5vh;
}
#Logo2{
    margin: 0 4vw;
    height: 5vh;
}
#Logo3{
    margin: 0 4vw;
    height: 3vh;
    
}
#Logo4{
    margin: 0 4vw;
    height: 6vh;
}
.Name{
    margin: 1vh 5vw;
    font-family: 'JetBrains Mono';
    font-style: normal;
    font-weight: 800;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    text-align: center;
    color: #5050FA;
}
#btnBack,#retour{
    background-image: url("./svg/retour.svg");
    background-size: contain;
    border: 0;
    border-radius: 50%;
    height: 6vh;
    width: 6vh;
    position: absolute;
    left:1vw;
    bottom: 1vh;
}
</style>