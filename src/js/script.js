oxo.screens.loadScreen("home", function() {
  appearHTP();
  sound();
  //Je sélectionne mon élément et le place dans une variable
  let play = document.querySelector(".home__playIcon");
  //J'écoute le click sur mon élément
  play.addEventListener("click", function() {
    //Je charge le screen "transition"
    oxo.screens.loadScreen("transition", function() {
      appearHTP();
      sound();
      //Je sélectionne mon élément et le place dans une variable
      let next = document.querySelector(".transition__next");
      let text1 = document.querySelector(".transition__text--1");
      let text2 = document.querySelector(".transition__text--2");
      let counterNext = 0;
      //J'écoute le click sur mon élément
      next.addEventListener("click", function() {
        text1.remove();
        text2.style.display = "block";
        counterNext++;
        if (counterNext === 2) {
          //Je charge le screen "game"
          oxo.screens.loadScreen("game", game);
        }
      });
    });
  });
});

function game() {
  appearHTP();
  sound();
  //Fonction pour avoir un nombre aléatoire entre 0 et le max - 1
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function bossCondition($boss, $card) {
    if (picBoss.className == "game__boss game__boss--" + $boss) {
      //Je creer une boucle pour générer aléatoirement mes cartes

      let selectedCards = [];

      function cardsRandom() {
        for (let i = 0; i < 3; i++) {
          var card = document.createElement("div");
          card.classList.add(
            "game__card",
            "game__card--" + cards[getRandomInt(8)]
          );
          if (card.classList.contains("game__card--" + $card)) {
            var card = document.createElement("div");
            card.classList.add(
              "game__card",
              "game__card--" + cards[getRandomInt(8)]
            );
          }
          selectedCards.push(card);
        }
        var card = document.createElement("div");
        card.classList.add("game__card", "game__card--" + $card);
        selectedCards.push(card);

        shuffle(selectedCards).forEach(function(card) {
          divCards.appendChild(card);
        });
      }

      cardsRandom();

      let counterLifeBoss = 0;
      let counterLifeYou = 0;
      let cardsDeck = document.querySelectorAll(".game__card");
      cardsDeck.forEach(cardElement => {
        cardElement.addEventListener("click", function() {
          let divHeartBoss = document.querySelector(".game__hearts--boss");
          let heartBoss = document.querySelector(
            ".game__hearts--boss .game__heart"
          );
          let divHeartYou = document.querySelector(".game__hearts--you");
          let heartYou = document.querySelector(
            ".game__hearts--you .game__heart"
          );
          if (cardElement.className == "game__card game__card--" + $card) {
            divHeartBoss.removeChild(heartBoss);
            counterLifeBoss++;
            // cardsDeck.forEach(cardElement => {
            //   cardElement.remove();
            // });
            // selectedCards = [];
            // cardsRandom();
            // picBoss.remove();
            // bossRandom();

            if (counterLifeBoss === 1) {
              oxo.screens.loadScreen("endWin", function() {
                appearHTP();
                sound();
                let retryWin = document.querySelector(".endWin__restart");
                retryWin.addEventListener("click", function() {
                  window.location.reload();
                });
              });
            }
          } else {
            divHeartYou.removeChild(heartYou);
            counterLifeYou++;
            if (counterLifeYou === 2) {
              oxo.screens.loadScreen("endLoose", function() {
                appearHTP();
                sound();
                let retryLoose = document.querySelector(".endLoose__restart");
                retryLoose.addEventListener("click", function() {
                  window.location.reload();
                });
              });
            }
          }
        });
      });
    }
  }
  let divCards = document.querySelector(".game__cards");
  let cards = [
    "cailloux",
    "communisme",
    "desintox",
    "fakenews",
    "judas",
    "piegeSouris",
    "the",
    "vetement"
  ];
  let divBoss = document.querySelector(".game__picture");
  let nameBoss = ["snoop", "mickey", "jesus", "elon", "panda"];

  //Je creer une variable aléatoire pour générer aléatoirement un boss
  function bossRandom() {
    var boss = document.createElement("div");
    boss.classList.add(
      "game__boss",
      "game__boss--" + nameBoss[getRandomInt(5)]
    );
    divBoss.appendChild(boss);
  }

  bossRandom();

  let picBoss = document.querySelector(".game__boss");
  bossCondition("mickey", "piegeSouris");
  bossCondition("snoop", "desintox");
  bossCondition("jesus", "judas");
  bossCondition("panda", "the");
  bossCondition("elon", "cailloux");
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function appearHTP() {
  let closeHTP = document.querySelector(".htp__close");
  let infoHTP = document.querySelector(".header__icon--info");
  let htp = document.querySelector(".htp");
  infoHTP.addEventListener("click", function() {
    htp.classList.add("is-open");
    closeHTP.addEventListener("click", function() {
      htp.classList.remove("is-open");
    });
  });
}

function sound() {
  let sound = document.querySelector(".header__icon--sound");
  let mute = document.querySelector(".header__icon--mute");
  let audio = document.querySelector("audio");
  sound.addEventListener("click", function() {
    audio.pause();
    sound.style.display = "none";
    mute.style.display = "block";
  });
  mute.addEventListener("click", function() {
    audio.play();
    mute.style.display = "none";
    sound.style.display = "block";
  });
}
