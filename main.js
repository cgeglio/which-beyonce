var playBtnMain = document.querySelector(".play-btn");
var playBtnWelcome = document.querySelector(".welcome-btn");
var welcomeMsg = document.querySelector(".welcome-msg")
var winnerMsg = document.querySelector(".winner-msg")
var playerOne = document.querySelector(".input-one");
var playerTwo = document.querySelector(".input-two");
var sidebars = document.querySelector(".sidebar");
var cardContainer = document.querySelector(".card-container");
var deck = document.getElementById("deck");
deck = new Deck;
var card = new Card (null, null);
var main = document.querySelector("main");
var gamePage = document.querySelector(".game-page");
var nameOne = document.querySelectorAll(".name-one");
var nameTwo = document.querySelectorAll(".name-two");
var cardNumber = 1;
var cardId = 10;
var newGameBtn = document.querySelector(".new-game")
var playerNames = document.querySelector(".player-names");
var cards = document.querySelectorAll(".card");
var startTime = 0;
var endTime = 0;

playBtnMain.addEventListener("click", showDirections);
playerOne.addEventListener("keyup", checkInputs);
playBtnWelcome.addEventListener("click", showGame);
cardContainer.addEventListener("click", flipCard);
newGameBtn.addEventListener("click", startNewGame)

// function pickCards() {
  // if (deck.selectedCards.length < 2) {
  //     flipCard(event);
      // selectCard(event);
//   }
// };

function startNewGame () {
  playerNames.style.display = "grid";
  winnerMsg.style.display = "none";
  welcomeMsg.style.display = "none";
  main.style.display = "flex";
  playerNames.reset();
  nameOne.innerText = "";
  nameTwo.innerText = "";
  playBtnMain.removeAttribute("active");
};


function flipCard(event) {
  clickedCard = event.target.closest(".card");
  if (deck.selectedCards.length < 2) {
    if (clickedCard.classList.contains("flip")) {
      deck.selectedCards.splice(0, 1);
    } else {
      selectCard(clickedCard);
    }


    // clickedNumber = event.target.closest(".flipper");
  clickedCard.classList.toggle("flip");


  } else if (deck.selectedCards.length === 2) {
    var cardIndex = -1;
    clickedCard.classList.toggle("flip");
    for(var i = 0; i < deck.selectedCards.length; i++)
    {
      if(deck.selectedCards[i].cardId == clickedCard.id)
      {
        cardIndex = i;
      }
    }

    if(cardIndex != -1)
    {
      deck.selectedCards.splice(cardIndex)

  }

    // clickedCard.classList.contains("")

  }


};

function selectCard(card) {
  var cardId = parseInt(card.id);
  if (deck.selectedCards.length === 0) {
    for (var i = 0; i < deck.cards.length; i++) {
      if (cardId === deck.cards[i].cardId) {
        deck.selectedCards.push(deck.cards[i]);
      }
    }
  } else if (deck.selectedCards.length === 1) {
      if (cardId !== deck.selectedCards[0].cardId) {
        for (var i = 0; i < deck.cards.length; i++) {
          if (cardId === deck.cards[i].cardId) {
            deck.selectedCards.push(deck.cards[i]);
            deck.checkSelectedCards();
            }
          }
        }
      }
  checkForMatch();
};


function checkForMatch() {
  if (deck.selectedCards.length === 0) {
     card.match(deck.matchedCards);
     removeCard();
  }
};


function removeCard() {
  console.log(deck.matchedCards);
  if (deck.matchedCards.length > 0) {
  for (var i = 0; i < deck.matchedCards.length; i++) {
    console.log(deck.matchedCards);
    var deleted = document.getElementById(deck.matchedCards[i].cardId);
    fadeOut(deleted);
    // deleted.parentNode.removeChild(deleted);
    // console.log(deleted);

  }

    deck.matchedCards = [];
    setTimeout(function() { showWinner(); }, 4000);

  }
  }


  function fadeOut(card) {
    // console.log(deck.matchedCards);
    // for (var i = 0; i < deck.matchedCards.length; i++) {
      // var deleted = document.getElementById(deck.matchedCards[i].cardId);
      console.log(card);
      card.style.transition = '2s';
      card.style.opacity = 0;
    }  // console.log(fadeTarget);
      // var fadeEffect = setInterval(function () {
      //     if (!fadeTarget.style.opacity) {
      //         fadeTarget.style.opacity = 1;
      //     }
      //     if (fadeTarget.style.opacity > 0) {
      //         fadeTarget.style.opacity -= 0.1;
      //     } else {
      //         clearInterval(fadeEffect);
      //     }
      // }, 200);


// user clicks
// if select .length<2
  // timeout flip here
  // if select === 2
  //
  // check match, if yes push to matched, select []
  // if no, select []

// };

function showWinner() {
  if (deck.matches === 5) {
    findTime();
    gamePage.style.display = "none";
    winnerMsg.style.display = "grid";
    deck.matches = 0;
    deck.cards = [];
    deck.matchedCards = [];
    cardNumber = 1;
    cardId = 10;
  }
}

function findTime() {
  endTime = new Date();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;
  var time = Math.round(timeDiff);
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  document.querySelector(".round-time").innerHTML = ` ${minutes} minutes and ${seconds}`;
}


function showGame() {
  main.style.display = "none";
  gamePage.style.display = "flex";
  for (var i=0; i < 5; i++) {
      addCards();
      cardNumber++;
      cardId++;
    }
  cardNumber = 1;
  cardId = 15;
  for (var i=0; i < 5; i++) {
      addCards();
      cardNumber++;
      cardId++;
  }
  startTime = new Date();
};

function checkInputs() {
  if (playerOne.value) {
    playBtnMain.id = "active";
  }
};

function showDirections() {
  if (playBtnMain.id === "active") {
    playerNames.style.display = "none";
    welcomeMsg.style.display = "block";
    for (var i = 0; i < nameOne.length; i++) {
    nameOne[i].innerText = `${playerOne.value.toUpperCase()}`;
    }
  if (playerTwo.value) {
    for (var i = 0; i < nameTwo.length; i++) {
    nameTwo[i].innerText = ` AND ${playerTwo.value.toUpperCase()}`;
  }
}
  } else {
      document.querySelector(".error").style.display = "block";
    }
};


function addCards() {
  var card = new Card(cardNumber, cardId);
  deck.cards.push(card);
  if (deck.cards.length === 10) {
    //deck.shuffle();
    for (var i = 0; i < deck.cards.length; i++) {
    displayCards(deck.cards[i]);
    }
  }
};

function displayCards(card) {
  cardContainer.innerHTML += `
  <div class="card" id="${card.cardId}">
    <div class="flipper flipper-${card.matchInfo}" id="${card.matchInfo}">
      <div class="front">
        <h6>J<br/>V<br/>N</h6>
      </div>
      <img class="back" src="images/JVN-${card.matchInfo}.jpg">
    </div>
  </div>`;
}
