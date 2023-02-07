"use strict";

const initSlideAnimationEntree = function(){
  
  UpdateSrcImage('#animationSlideEntree');
    const droit = document.querySelector('#animationSlideEntree .img_droit');
    const haut = document.querySelector('#animationSlideEntree .img_haut');
    const bas = document.querySelector('#animationSlideEntree .img_bas');
    const gauche = document.querySelector('#animationSlideEntree .img_gauche');

    //(Re)set initial position of img
  droit.setAttribute('style', 'transform :translateX(300%);');
  gauche.setAttribute('style', 'transform :translateX(-300%);');
  haut.setAttribute('style', 'transform :translateY(-300%);');
  bas.setAttribute('style', 'transform :translateY(400%);');


  // Animate it

/*****Easing elastic */
  anime({
    targets : "#animationSlideEntree .img_haut",
    translateY: 0,
    delay : 200,
    duration:2000
  });
  anime({
    targets : "#animationSlideEntree .img_gauche",
    translateX: 0,
    delay : 700,
    duration:2000
  });
  anime({
    targets : "#animationSlideEntree .img_droit",
    translateX: 0,
    delay : 1200,
    duration:2000
  });

  //animation finale
  anime({
    targets: "#animationSlideEntree .img_bas",
    translateY : 0,
    delay : 1300,
    direction: 'normal',
    duration :2000,
  })

  anime({
    targets: "#animationSlideEntree ",
    scale: 1.5,
    delay : 1400,
    direction: 'normal',
    duration :2000,
  })
};



"use strict";

const initSlideAnimationEntree2 = function(){
  
  UpdateSrcImage('#animationSlideEntree2');
    const droit = document.querySelector('#animationSlideEntree2 .img_droit');
    const haut = document.querySelector('#animationSlideEntree2 .img_haut');
    const bas = document.querySelector('#animationSlideEntree2 .img_bas');
    const gauche = document.querySelector('#animationSlideEntree2 .img_gauche');

    //(Re)set initial position of img
  droit.setAttribute('style', 'transform :translateX(300%);');
  gauche.setAttribute('style', 'transform :translateX(-300%);');
  haut.setAttribute('style', 'transform :translateY(-300%);');
  bas.setAttribute('style', 'transform :translateY(400%);');


  // Animate it

/*****Easing elastic */
  anime({
    targets : "#animationSlideEntree2 .img_haut",
    translateY: 0,
    delay : 200,
    duration:2000
  });
  anime({
    targets : "#animationSlideEntree2 .img_gauche",
    translateX: 0,
    delay : 700,
    duration:2000
  });
  anime({
    targets : "#animationSlideEntree2 .img_droit",
    translateX: 0,
    delay : 1200,
    duration:2000
  });

  //animation finale
  anime({
    targets: "#animationSlideEntree2 .img_bas",
    translateY : 0,
    delay : 1300,
    direction: 'normal',
    duration :2000,
  })

  anime({
    targets: "#animationSlideEntree2 ",
    scale: 1.5,
    delay : 1400,
    direction: 'normal',
    duration :2000,
  })
};