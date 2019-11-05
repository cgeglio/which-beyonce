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
var matchCount = document.querySelectorAll(".matches-count");
var startTime = 0;
var endTime = 0;
var menuOpen = false;
var menu = document.querySelector(".menu-icon");
var names = [];
var times = [];


window.addEventListener("load", pullScores);
playBtnMain.addEventListener("click", showDirections);
playerOne.addEventListener("keyup", checkInputs);
playBtnWelcome.addEventListener("click", showGame);
cardContainer.addEventListener("click", flipCard);
newGameBtn.addEventListener("click", startNewGame);
menu.addEventListener("click", dropMenu);

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
    clickedCard.classList.toggle("flip");
  } else if (deck.selectedCards.length === 2) {
    var cardIndex = -1;
    clickedCard.classList.toggle("flip");
    for (var i = 0; i < deck.selectedCards.length; i++) {
      if (deck.selectedCards[i].cardId == clickedCard.id) {
        cardIndex = i;
      }
    }
    if (cardIndex != -1) {
      deck.selectedCards.splice(cardIndex)
    }
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
            cardContainer.removeEventListener("click", flipCard);
            deck.checkSelectedCards();
            }
          }
        }
        checkForMatch();
      }
};

function checkForMatch() {
  if (deck.selectedCards.length === 0) {
     card.match(deck.matchedCards);
     removeCard();
     for (var i = 0; i < matchCount.length; i++) {
       matchCount[i].innerText = `${deck.matches}`;
     }
   } else {
    setTimeout(function() { flipBack(); }, 1000);
  }
};


function removeCard() {
  if (deck.matchedCards.length > 0) {
  for (var i = 0; i < deck.matchedCards.length; i++) {
    var deleted = document.getElementById(deck.matchedCards[i].cardId);
    fadeOut(deleted);
    cardContainer.addEventListener("click", flipCard);
  }
    deck.matchedCards = [];
    setTimeout(function() { showWinner(); }, 5000);
  }
};

function flipBack() {
  for (var i = 0; i < deck.selectedCards.length; i++) {
      var clickCard = document.getElementById(deck.selectedCards[i].cardId);
      clickCard.classList.remove("flip");
    }
    cardContainer.addEventListener("click", flipCard);
    deck.selectedCards = [];
  }


function fadeOut(card) {
    card.style.transition = '2s';
    card.style.opacity = 0;
  }

function showWinner() {
  if (deck.matches === 5) {
    names.push(playerOne.value);
    nameStorage();
    updateBoard();
    findTime();
    cardContainer.innerHTML = "";
    winnerMsg.style.display = "grid";
    winnerMsg.classList.add("fade-in");
    deck.matches = 0;
    deck.cards = [];
    deck.matchedCards = [];
    cardNumber = 1;
    cardId = 10;
    deck.matchedCards = [];
    gamePage.style.display = "none";
  }
}


function pullScores() {
  var nameSet = JSON.parse(localStorage.getItem("names"));
  for (var i = 0; i < nameSet.length; i++) {
    names.push(nameSet[i]);
  }
  var timeSet = JSON.parse(localStorage.getItem("times"));
  for (var i = 0; i < timeSet.length; i++) {
    times.push(timeSet[i]);
}
  updateBoard();
}

function updateBoard() {
  var newTimes = [...times];
  var newNames = [...names];
  var score = 1;
  if (newTimes.length > 4) {
    for (var i = 0; i < 5; i++) {
      var lowestTime = Math.min.apply(Math, newTimes);
      var timeIndex = newTimes.indexOf(lowestTime);
      var bestPlayer = newNames[timeIndex];
      var minutes = Math.floor(lowestTime / 60);
      var seconds = lowestTime - minutes * 60;
      var userTime = `0${minutes}:${seconds}`;
      var highScore = `${score}.  ${bestPlayer},  ${userTime}`;
      score++;
      newTimes.splice(timeIndex, 1);
      newNames.splice(timeIndex, 1);
      document.querySelector(".winner-list").innerHTML += `${highScore} <br />`;
    }
  }
};

function findTime() {
  endTime = new Date();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;
  var time = Math.round(timeDiff);
  var minutes = Math.floor(time / 60);
  var seconds = time - minutes * 60;
  times.push(time);
  timeStorage();
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

function nameStorage() {
  var nameString = JSON.stringify(names);
  localStorage.setItem("names", nameString);
}

function timeStorage() {
  var timeString = JSON.stringify(times);
  localStorage.setItem("times", timeString);
}


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
    deck.shuffle();
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


function dropMenu () {
  var menuDropdown = document.querySelector(".drop-menu");
  menuOpen = !menuOpen;
  if (menuOpen) {
    menuDropdown.style.display= "flex";
  } else {
    menuDropdown.style.display= "none";
  }
};
