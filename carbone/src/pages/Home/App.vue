<script setup>
function show1(){
    document.getElementById("show1").style.display="block";
    document.getElementById("show2").style.display="none";
    }
function show2(){
    document.getElementById("show2").style.display="block";
    document.getElementById("show1").style.display="none";
    }
function OpenWeb(web){
  window.open(web, '_blank')
}
function OnRed(id){
  document.getElementById(id).style.backgroundColor="#FA6D6D";
}
function OnGreen(id){
  document.getElementById(id).style.backgroundColor="#9BFF82";
}
function copy() {
      this.copyContent = "http://hyblab.polytech.univ-nantes.fr";//也可以直接写上等于你想要复制的内容
      var input = document.createElement("input"); // 直接构建input
      input.value = this.copyContent; // 设置内容
      console.log(input.value);
      document.body.appendChild(input); // 添加临时实例
      input.select(); // 选择实例内容
      document.execCommand("Copy"); // 执行复制
      document.body.removeChild(input); // 删除临时实例
      alert("Copié avec succès !");
}
</script>
<template>
  <div class="greetings" id="container">
    <div id="Logo">
      <img alt="Logo" class="logo" src="./svg/Frame.svg" />
    </div>
    <div class="salu">
      Bonjour !<br>
      On vous aide à vous rendre<br>
      dans plus de <span style="color: #4D51F4;">150 festivals</span><br>
      <span style="color: #4D51F4;">en Bretagne</span> en limitant<br>
      votre <span style="color: #4D51F4;">impact carbone</span>
    </div>
    <div id="choisir">
        <a href="map.html"><button type="button" id="btnchoi1"><img id="btnchoi2" src="./svg/choisis_festival_entier.svg"></button></a>
    </div>
    <div id="down">
      <img id="bas" src="./svg/fleche_bas.svg"><br>
      DÉCOUVRE NOS<br>
      INTERVIEWS <br>
      ET RECOMMANDATIONS
    </div>
    
    <div id="br">
    </div>
    <div id="Views">
      <div id="views">
        <div id="goleft">
          <button type="button" id="btngl" @click="show1()"><img id="btngl" src="./svg/fleche.svg"></button>
        </div>
        <div id="goright">
          <button type="button" id="btngr" @click="show2()"><img id="btngr" src="./svg/fleche2.svg"></button>
        </div>
        <div id="show1">
          <div id="INTERVIEWS">INTERVIEWS
          </div>
          
          <div>
            <video id="video" src="./svg/item1.mp4" controls>
            </video>
          </div>
          <div id="FName">
            Michel<br>Festival
          </div>
          <div id="Festivalier">
            Festivalier de père en fils
          </div>
          <div id="descrip">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis auctor risus. Curabitur ut fermentum nisi. Sed interdum ultricies sodales. Nulla consectetur mi quis lacinia suscipit. 
          </div>
        </div>
        <div id="show2">
          <div id="INTERVIEWS">INTERVIEWS
          </div>
          
          <div>
            <video id="video" src="./svg/item2.mp4" controls>
            </video>
          </div>
          <div id="FName">
            Michel2<br>Festival2
          </div>
          <div id="Festivalier">
            Festivalier de père en fils
          </div>
          <div id="descrip">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis auctor risus. Curabitur ut fermentum nisi. Sed interdum ultricies sodales. Nulla consectetur mi quis lacinia suscipit. 
          </div>
        </div>
      </div>
    </div>
    
    <div id="Article">
      <div id="Article1">
        <div id="picture1"></div>
        <div id="ArtiNum1">Lorient en feu</div>
        <div id="descArti1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis auctor risus. Curabitur ut fermentum nisi. Sed interdum ultricies sodales. Nulla consectetur mi quis lacinia suscipit. Vestibulum eu placerat dui. Nunc viverra efficitur consectetur. Integer sed ipsum at felis maximus rutrum. Sed ornare eu ligula ac finibus. Nulla facilisi. </div>
      </div>
      <div id="Article2">
        <div id="picture2"></div>
        <div id="ArtiNum2">Record pour <br>Brest</div>
        <div id="descArti2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis auctor risus. Curabitur ut fermentum nisi. Sed interdum ultricies sodales. Nulla consectetur mi quis lacinia suscipit. Vestibulum eu placerat dui. Nunc viverra efficitur consectetur. Integer sed ipsum at felis maximus rutrum. Sed ornare eu ligula ac finibus. Nulla facilisi. Phasellus gravida efficitur sollicitudin. Morbi quis eleifend ante. </div>
      </div>
      <div id="Article1">
        <div id="picture3"></div>
        <div id="ArtiNum1">Jazz en folie</div>
        <div id="descArti1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mattis auctor risus. Curabitur ut fermentum nisi. Sed interdum ultricies sodales. Nulla consectetur mi quis lacinia suscipit. Vestibulum eu placerat dui. Nunc viverra efficitur consectetur. Integer sed ipsum at felis maximus rutrum. Sed ornare eu ligula ac finibus. Nulla facilisi. Phasellus gravida efficitur sollicitudin. Morbi quis eleifend ante. </div>
      </div>
    </div>


    <div id="ChoisQues1">
      <div id="Ques">Quelle est la distance moyenne parcourue par les spectateurs pour se rendre sur un festival en Bretagne ?</div>
      <button type="button" class="btnQues1" id="red1" @click="OnRed('red1')">50km</button>
      <button type="button" class="btnQues2" id="green1" @click="OnGreen('green1')">104km</button>
      <button type="button" class="btnQues3" id="red2" @click="OnRed('red2')">150km</button>
    </div>
    <div id="ChoisQues2">
      <div id="Ques1">Quel est le pourcentage de festivaliers qui se rendent en voiture aux événements?</div>
      <button type="button" class="btnQues1" id="red3" @click="OnRed('red3')">36%</button>
      <button type="button" class="btnQues2" id="red4" @click="OnRed('red4')">10%</button>
      <button type="button" class="btnQues3" id="green2" @click="OnGreen('green2')">74%</button>
      <div id="Ques2">Parmi eux, combien sont-ils à faire moins de 5 km ?</div>
      <button type="button" class="btnQues4" id="red5" @click="OnRed('red5')">17%</button>
      <button type="button" class="btnQues5" id="green3" @click="OnGreen('green3')">31%</button>
      <button type="button" class="btnQues6" id="red6" @click="OnRed('red6')">63%</button>
      <div id="Ques3">Parmi eux, combien sont-ils seuls à bord?</div>
      <button type="button" class="btnQues7" id="red7" @click="OnRed('red7')">28%</button>
      <button type="button" class="btnQues8" id="red8" @click="OnRed('red8')">52%</button>
      <button type="button" class="btnQues9" id="green4" @click="OnGreen('green4')">91%</button>
    </div>
    <div id="ChoisQues3">
      <div id="Ques">Pour un festival comme les Vieilles Charrues:  Quelle est la part que pèse le transport des spectateurs dans son bilan carbone ?</div>
      <button type="button" class="btnQues1" id="red9" @click="OnRed('red9')">2O%</button>
      <button type="button" class="btnQues2" id="red10" @click="OnRed('red10')">35%</button>
      <button type="button" class="btnQues3" id="green5" @click="OnGreen('green5')">50%</button>
    </div>
    <div id="ChoisQues4">
      <div id="Ques">Combien de tonnes de CO2 pourraient être économisées si les festivaliers venaient par 3 en covoiturage ?</div>
      <li>
        <button type="button" class="btnQues1" id="red11" @click="OnRed('red11')">235 t</button>
        <button type="button" class="btnQues2" id="green6" @click="OnGreen('green6')">717 t</button>
        <button type="button" class="btnQues3" id="red12" @click="OnRed('red12')">922 t</button>
      </li>
    </div>
    <div id="ChoisQues5">
      <div id="Ques">Combien de tonnes de CO2 pourraient être économisées si 65% des festivaliers venaient en train ou transport en commun ? </div>
      <button type="button" class="btnQues1" id="red13" @click="OnRed('red13')">340 t</button>
      <button type="button" class="btnQues2" id="red14" @click="OnRed('red14')">896 t</button>
      <button type="button" class="btnQues3" id="green7" @click="OnGreen('green7')">1290 t</button>
    </div>

    <div id="InfoBackG">
      <div id="Info">
        <div id="Title">
          INFOS
        </div>
        <div id="textInfo">
          <span style="color: #4D51F4; font-weight: 700;">104 km </span>: la distance moyenne parcourue par les spectateurs pour se rendre sur un festival en Bretagne.<br>
          <span style="color: #4D51F4; font-weight: 700;">74 % </span>: le pourcentage des festivaliers qui s'y rendent en voiture ( 14 % de ceux-ci sont seuls à bord ). <br>
          <span style="color: #4D51F4; font-weight: 700;">Près de 30 % </span>: la part des festivaliers qui prennent leur voiture pour faire moins de 5 km. 
        </div>
        <div id="Title">
          Pour un festival comme les Vieilles Charrues : 
        </div>
        <div id="textInfo">
          <span style="color: #4D51F4; font-weight: 700;">50 % </span>: la part que pèse le transport des spectateurs dans son bilan carbone. <br>
          <span style="color: #4D51F4; font-weight: 700;">717 tonnes </span>équivalent CO2 évitées : ce serait l'effet de l'encouragement du covoiturage pour passer à 3 le nombre de spectateurs par voiture en moyenne. <br>
          <span style="color: #4D51F4; font-weight: 700;">1290 tonnes </span>équivalent CO2 évitées : ce serait l'effet de porter la part des festivaliers venant en train et en transports en commun à 65 % des venues.
        </div>
        <div id="SourceInfo">
          <span style="color: #4D51F4; font-weight: 700;">Sources </span><span style="color: #4D51F4;"> : Collectif des festivals et The Shift Project</span>
        </div>
      </div>
    </div>
    <div id="plus">
      <div id="question">
        Votre festival n'est pas sur la carte ?<br> 
        Ajoutez le pour aider les festivaliers à s'y rendre !
      </div>
      <div id="question">
          <a href="credit.html" style="text-align:center;  color:red; display: block;">Credits </a>
      </div>
      <div id="eemail">
        <el-button type="button" id="btnemail" @click="OpenWeb('https://mail.google.com')"></el-button>
        <div id="renseigner">
          Renseignez le nom, l'adresse et la date <br>
          du festival et nous vous répondrons au plus vite !
        </div>
      </div>
      <div id="partager">
        <div id="partext">
          Partagez la carte à vos amis !
        </div>
        <div id="parbtn">
          <el-button type="button" id="btnemail2" @click="OpenWeb('https://mail.google.com')"></el-button>
          <el-button type="button" id="btnmess" @click="OpenWeb('https://www.messenger.com/')"></el-button>
          <el-button type="button" id="btnphone" @click="OpenWeb('https://telegram.org/')"></el-button>
          <el-button type="button" id="btnlink" @click="copy()"></el-button>
        </div>
      </div>
      <div id="retrouver">
        <div id="retroutext">
          Retrouvez le Télégramme sur ses différents réseaux sociaux
        </div>
        <div id="retroubtn">
          <el-button type="button" id="btntwi" @click="OpenWeb('https://www.twitter.com/LeTelegramme')"></el-button>
          <el-button type="button" id="btnface" @click="OpenWeb('https://www.facebook.com/LeTelegramme')"></el-button>
          <el-button type="button" id="btnlin" @click="OpenWeb('https://www.linkedin.com/company/letelegramme/')"></el-button>
          <el-button type="button" id="btnins" @click="OpenWeb('https://www.instagram.com/LeTelegramme')"></el-button>
          <el-button type="button" id="btnyoutu" @click="OpenWeb('https://www.youtube.com/LeTelegramme')"></el-button>
        </div>
      </div>
    </div>
    <div id="up">
      <button type="button" id="remonter" onclick="window.scrollTo('0','0'); "><img id="remonter" src="./svg/remonter.svg"></button>
    </div>
  </div>
</template>

<style>
/* Normalize margin and padding to ease elements positioning */
*{
  padding:0;
  margin:0;
}

.greetings{
  text-align: center;
  width: 100vw;
  margin: 0 auto;
}
#Logo{
  text-align: center;
  height: 30%;
}
.logo{
  margin: 5% 0;
  width: 100%;
}

.salu {
  width: 100%;
  height: 30%;
  color: black;
  font-family: 'JetBrains Mono';
  font-style: italic;
  font-size: 0.3em;
  font-weight: 600;
  text-align: center;
  margin-bottom: 10%;
}

#btnchoi1{
  border: 0;
  height: 20%;
  background: none;
  margin: 5% 0;
}
#btnchoi2{
  height: 20%;
  max-width: 100%;
  background: none;
}
#bas{
  width: 3%;
}
#down{
  font-family: 'JetBrains Mono';
  font-style: italic;
  height: 40%;
  font-weight: 500;
  font-size: 0.3em;
  text-align: center;
  color: #5050FA;
  margin-bottom: 20%;
}

#remonter{
  height: 6%;
  position: fixed;
  left: 5%;
  bottom: 1%;
  background: none;
  opacity:0.99;
  border: 0;
  z-index: 2;
}
#br{
  height: 10%;
}
#foot{
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
#Views{
  background-image: url(./svg/choisis_festival_ligne_dessous.svg) ;
  background-repeat: no-repeat;
  background-size:contain;
  background-position-y: top;
  height: 70vh;
  width: 100%;
}
#views{
  width: 80%;
  height: 60vh;
  border: 0.05em;
  border-color: rgb(145, 141, 141);
  border-radius: 0.5em;
  border-style: ridge;
  position: relative;
  left: 10%;
  top: 10vh;
  background-color: #ffffff;

}
#INTERVIEWS{
  position: absolute;
  top: 3vh;
  left: 3vw;
  font-size: 0.3em;
  font-weight: 800;
  color: #4D51F4;
  font-style: italic;
}
#btngl{
  position: absolute;
  top: 14vh;
  left: 0.1vw;
  width: 2vw;
  background: none;
  border: 0;
  z-index: 2;
}
#btngr{
  position: absolute;
  top: 14vh;
  right: 0.1vw;
  width: 2vw;
  background: none;
  border: 0;
  z-index: 2;
}
#video{
  position: absolute;
  top: 15vh;
  left: 2vw;
  height: 25vh;
  width: 25vh;
  border-radius: 0.2em;
  background-color: #e2e0e0;
}
#FName{
  position: absolute;
  top: 12vh;
  left: 32vh;
  font-size: 0.3em;
  font-weight: 800;
  color: #4D51F4;
  text-align: left;
}
#Festivalier{
  position: absolute;
  float: left;
  width: auto;
  height: auto;
  left: 32vh;
  top: 21vh;
  font-style: italic;
  font-size: 0.17em;

  color: #000000;
}
#descrip{
  position: absolute;
  width: 32%;
  height: 50%;
  left: 32vh;
  top: 23.5vh;
  font-style: normal;
  font-weight: 400;
  font-size: 0.17em;
  line-height: 1.2em;
  text-align: left;
  color: #000000;
}

#Article{
  background-image: url(./svg/Ligne.svg) ;
  background-repeat: no-repeat;
  background-size:contain;
  width: 100%;

}
#Article1{
  
  margin-bottom: 5vh;
  width: 100%;
  height: 60vh;
  position: relative;
}
#picture1{
  background-image: url(./svg/A1.svg);
  background-repeat: no-repeat;
  background-size:contain;
  height: 25vh;
  width: 25vh;
  border-radius: 0.5em;
  position: absolute;
  top: 7vh;
  left: 7vh;
}

#picture3{
  background-image: url(./svg/A3.svg);
  background-repeat: no-repeat;
  background-size:contain;
  height: 25vh;
  width: 25vh;
  border-radius: 0.5em;
  position: absolute;
  top: 7vh;
  left: 7vh;
}
#ArtiNum1{
  position: absolute;
  text-align: right;
  width: 30vh;
  height: 2vh;
  right: 8vh;
  top: 7vh;

  font-weight: 800;
  font-size: 0.3em;
  color: #4D51F4;
  float: right;

}
#descArti1{
  position: absolute;
  text-align: right;
  width: 30%;
  right: 8vh;
  top: 12vh;
  font-weight: 800;
  font-size: 0.14em;
  color: #000000;

}
#Article2{
  margin-bottom: 5vh;
  width: 100%;
  height: 70vh;
  position: relative;
}
#picture2{
  background-image: url(./svg/A2.svg);
  background-repeat: no-repeat;
  background-size:contain;
  height: 25vh;
  width: 25vh;
  border-radius: 0.5em;
  position: absolute;
  top: 7vh;
  right: 7vh;
}
#ArtiNum2{
  position: absolute;
  text-align: left;
  width: 30vh;
  height: 2vh;
  left: 8vh;
  top: 7vh;

  font-weight: 800;
  font-size: 0.3em;
  color: #4D51F4;
  float: left;

}
#descArti2{
  position: absolute;
  text-align: left;
  width: 30%;
  left: 8vh;
  top: 16vh;
  font-weight: 800;
  font-size: 0.14em;
  color: #000000;

}
#InfoBackG{
  height: 100vh;
  width: 100%;
  background-image: url(./svg/Ligne2.svg) ;
  background-repeat: no-repeat;
  background-size:contain;
  background-position-x: right;
  background-position-y: 50%;


}
#Info{
  position: relative;
  left: 10%;
  height: 70vh;
  width: 80%;
  background-color: #ffffff;
  border: 0.5em;
  border-radius: 3em;
  border-style: ridge;
  font-size: 0.15em;
  font-style: italic;
  text-align: left;
}
#Title{
  position: relative;
  left: 5vw;
  top: 5vh;
  font-weight: 800;
  margin: 3vh 0;
}
#textInfo{
  width: 80%;
  position: relative;
  left: 5vw;
  top: 5vh;
}
#SourceInfo{
  position: relative;
  left: 5vw;
  top: 5vh;
  margin-top: 2vh;
}

#plus{
  position: relative;
  background-color: #5050FA;
  color: #ffffff;
  border-radius: 3vw 3vw 0 0;
  width: 100%;
  height: 60vh;
}
#question{
  position: relative;
  top: 3vh;
  font-size: 0.18em;
  font-weight: 700;
  font-family: 'JetBrains Mono';
  align-items: center;
  text-align: center;
  margin: 2vh 0;
}
#eemail{
  width: 100%;
  text-align: center;
}
#btnemail{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/email.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  float: left;
  position: relative;
  top:6vh;
  left: 6vw;
}
#renseigner{
  margin-left: 2vh;
  text-align: left;
  position: relative;
  left: 6vw;
  top: 6vh;
  font-size: 0.18em;
  float: left;
  font-weight: 200;
}
#partager{
  position: absolute;
  top: 20vh;
  width: 100%;
  margin: 2vh 0;
}
#partext{
  font-size: 0.18em;
  font-weight: 700;
  font-family: 'JetBrains Mono';
  align-items: center;
  text-align: center;
  margin: 2vh 0;
}
#parbtn{
  display: flex;
}
#btnemail2{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/email.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  position: absolute;
  top: 7vh;
  left: 15%;
}
#btnmess{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/messenger.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  position: absolute;
  top:7vh;
  left: 35%;
}
#btnphone{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/phone.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  position: absolute;
  top:7vh;
  left: 55%;
}
#btnlink{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/link.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  position: absolute;
  top:7vh;
  left: 75%;
}
#retroutext{
  position: absolute;
  width: 100%;
  top: 35vh;
  font-size: 0.18em;
  font-weight: 700;
  font-family: 'JetBrains Mono';
  align-items: center;
  text-align: center;
  margin: 2vh 0;
}
#btntwi{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/twitter.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  position: absolute;
  top: 42vh;
  left: 5%;
}
#btnface{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/facebook.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  position: absolute;
  top: 42vh;
  left: 25%;
}
#btnlin{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/linkedin.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  position: absolute;
  top: 42vh;
  left: 45%;
}
#btnins{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/ins.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  position: absolute;
  top: 42vh;
  left: 65%;
}
#btnyoutu{
  height: 5vh;
  width: 5vh;
  background-image: url("./svg/youtube.svg");
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 1vh;
  position: absolute;
  top: 42vh;
  left: 85%;
}
#ChoisQues1{
  position: relative;
  left: 10%;
  height: 15vh;
  width: 80%;
  background-color: #ffffff;
  border: 0.5em;
  border-radius: 3em;
  border-style: ridge;
  font-size: 0.15em;
  font-style: italic;
  text-align: left;
}
#ChoisQues2{
  position: relative;
  left: 10%;
  height: 50vh;
  width: 80%;
  background-color: #ffffff;
  border: 0.5em;
  border-radius: 3em;
  border-style: ridge;
  font-size: 0.15em;
  font-style: italic;
  text-align: left;
}
#ChoisQues3{
  position: relative;
  left: 10%;
  height: 15vh;
  width: 80%;
  background-color: #ffffff;
  border: 0.5em;
  border-radius: 3em;
  border-style: ridge;
  font-size: 0.15em;
  font-style: italic;
  text-align: left;
}
#ChoisQues4{
  position: relative;
  left: 10%;
  height: 15vh;
  width: 80%;
  background-color: #ffffff;
  border: 0.5em;
  border-radius: 3em;
  border-style: ridge;
  font-size: 0.15em;
  font-style: italic;
  text-align: left;
}
#ChoisQues5{
  position: relative;
  left: 10%;

  height: 15vh;
  width: 80%;
  background-color: #ffffff;
  border: 0.5em;
  border-radius: 3em;
  border-style: ridge;
  font-size: 0.15em;
  font-style: italic;
  text-align: left;
}
#Ques{
  font-family: 'JetBrains Mono';
  font-style: normal;
  position: relative;
  left: 10%;
  top:1vh;
  height: 70vh;
  width: 80%;
}
#Ques1{
  font-family: 'JetBrains Mono';
  font-style: normal;
  position: absolute;
  left: 10%;
  top:1vh;
  height: 70vh;
  width: 80%;
}
#Ques2{
  font-family: 'JetBrains Mono';
  font-style: normal;
  position: absolute;
  left: 10%;
  top:15vh;
  height: 70vh;
  width: 80%;
}
#Ques3{
  font-family: 'JetBrains Mono';
  font-style: normal;
  position: absolute;
  left: 10%;
  top:30vh;
  height: 70vh;
  width: 80%;
}
.btnQues1{
  background-color: #ffffff;
  position: absolute;
  top: 9vh;
  left: 5vh;
  width: 7vh;
  height: 4vh;
  align-items: center;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 800;
  font-size: 0.5em;
  text-align: center;
  border-color: #d3d3d3;
  border-radius: 2vh;
  border-width: 1em;
  color: #4D51F4;
}
.btnQues2{
  background-color: #ffffff;
  position: absolute;
  top: 9vh;
  left: 20vh;
  width: 7vh;
  height: 4vh;
  
  align-items: center;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 800;
  font-size: 0.5em;
  text-align: center;
  border-color: #d3d3d3;
  border-radius: 2vh;
  border-width: 1em;
  color: #4D51F4;
}
.btnQues3{
  background-color: #ffffff;
  position: absolute;
  top: 9vh;
  left: 35vh;
  width: 7vh;
  height: 4vh;
  
  align-items: center;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 800;
  font-size: 0.5em;
  text-align: center;
  border-color: #d3d3d3;
  border-radius: 2vh;
  border-width: 1em;
  color: #4D51F4;
}
.btnQues4{
  background-color: #ffffff;
  position: absolute;
  top: 22vh;
  left: 5vh;
  width: 7vh;
  height: 4vh;
  align-items: center;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 800;
  font-size: 0.5em;
  text-align: center;
  border-color: #d3d3d3;
  border-radius: 2vh;
  border-width: 1em;
  color: #4D51F4;
}
.btnQues5{
  background-color: #ffffff;
  position: absolute;
  top: 22vh;
  left: 20vh;
  width: 7vh;
  height: 4vh;
  
  align-items: center;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 800;
  font-size: 0.5em;
  text-align: center;
  border-color: #d3d3d3;
  border-radius: 2vh;
  border-width: 1em;
  color: #4D51F4;
}
.btnQues6{
  background-color: #ffffff;
  position: absolute;
  top: 22vh;
  left: 35vh;
  width: 7vh;
  height: 4vh;
  
  align-items: center;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 800;
  font-size: 0.5em;
  text-align: center;
  border-color: #d3d3d3;
  border-radius: 2vh;
  border-width: 1em;
  color: #4D51F4;
}
.btnQues7{
  background-color: #ffffff;
  position: absolute;
  top: 37vh;
  left: 5vh;
  width: 7vh;
  height: 4vh;
  align-items: center;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 800;
  font-size: 0.5em;
  text-align: center;
  border-color: #d3d3d3;
  border-radius: 2vh;
  border-width: 1em;
  color: #4D51F4;
}
.btnQues8{
  background-color: #ffffff;
  position: absolute;
  top: 37vh;
  left: 20vh;
  width: 7vh;
  height: 4vh;
  
  align-items: center;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 800;
  font-size: 0.5em;
  text-align: center;
  border-color: #d3d3d3;
  border-radius: 2vh;
  border-width: 1em;
  color: #4D51F4;
}
.btnQues9{
  background-color: #ffffff;
  position: absolute;
  top: 37vh;
  left: 35vh;
  width: 7vh;
  height: 4vh;
  
  align-items: center;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 800;
  font-size: 0.5em;
  text-align: center;
  border-color: #d3d3d3;
  border-radius: 2vh;
  border-width: 1em;
  color: #4D51F4;
}

#show2{
  display: none;
}


/* ---------- Important media queries for easy responsive content :-) ----------------- */
/* Whatever the devie used, the content will be displayed full width and height if      */
/* the aspect ratio is between 3/4 and 9/16. If not it is locked to either 3/4 or 3/16  */

/* When the aspect ratio is smaller that 3/4, display a 3/4 content */
#container{
   /* To set the size of the container to 100% of the visible viewport height AND for absolute positionning of child elements*/ 
  height: 100%;   /* even on mobile devices with url or navigation bars */
  margin-left: calc((100vw - 100 * 3vh / 4) / 2); /* Add black bands on left and right */
  width: calc(100 * 3vh / 4); /* Force 3/4 aspect ratio */
}

/* We set a default font size here. It will be the base for all other font sizes */
/* Here the font size is proportional to content width */
body{
  font-size: calc(15vh * 3 / 4);
}

/* Fill the whole viewport when its aspect ratio is between 9/16 and 3/4 */
@media screen and (max-aspect-ratio: 3/4) {
  #container{
      margin-left: 0; /* reset margin-left */
      width: 100vw; /* content is full width (and full height because of the default rule for container height */
  }

 
}

/* The content is displayed at 9/16 If the aspect ratio is higher that 9/16  */ 
@media screen and (max-aspect-ratio: 9/16) {
  #container{
      margin-left: 0; /* reset left margin */
      width: 100vw;   /* content is full width */
      margin-top: calc(-50 * 16vw / 9); /* move the content half the height to the top */
      top:50%; /* then center it ! */
      height: calc(100 * 16vw / 9); /* adjust height so that aspect ratio is 9/16 */
  }

 
}

</style>
<script>

</script>