
var card = new Card(null, null);
var cardContainer = document.querySelector(".card-container");
var cardId = 10;
var cardNumber = 1;
var deck = document.getElementById("deck");
deck = new Deck;
var endTime = 0;
var gamePage = document.querySelector(".game-page");
var main = document.querySelector("main");
var matchCount = document.querySelectorAll(".matches-count");
var menu = document.querySelector(".menu-icon");
var menuOpen = false;
var names = [];
var nameOne = document.querySelectorAll(".name-one");
var nameTwoWelcome = document.getElementById("name-two");
var nameTwo = document.querySelectorAll(".name-two");
var newGameBtn = document.querySelector(".new-game");
var pastGames = document.querySelectorAll(".past-games");
var playBtnMain = document.querySelector(".play-btn");
var playBtnWelcome = document.querySelector(".welcome-btn");
player = new Player(null);
var playerInfo = [];
var playerNames = document.querySelector(".player-names");
var playerOne = document.querySelector(".input-one");
var playerTwo = document.querySelector(".input-two");
// var sidebars = document.querySelector(".sidebar");
var rematchBtn = document.querySelector(".rematch");
var startTime = 0;
var times = [];
var turn = true;
var turnIndicator = document.querySelector(".turn-player");
var welcomeMsg = document.querySelector(".welcome-msg");
var winnerMsg = document.querySelector(".winner-msg");


cardContainer.addEventListener("click", flipCard);
menu.addEventListener("click", dropMenu);
newGameBtn.addEventListener("click", startNewGame);
playBtnMain.addEventListener("click", showDirections);
playBtnWelcome.addEventListener("click", showGame);
playerOne.addEventListener("keyup", checkInputs);
rematchBtn.addEventListener("click", restartGame);
window.addEventListener("load", pullScores);

function startNewGame() {
  main.style.display = "flex";
  // gamePage.style.display = "none";
  playerNames.style.display = "grid";
  welcomeMsg.style.display = "none";
  winnerMsg.style.display = "none";
  winnerMsg.classList.remove("fade-in");
  playerNames.reset();
  nameOne.innerText = "";
  nameTwo.innerText = "";
  playBtnMain.removeAttribute("active");
  pullScores();
};

function restartGame() {
  pullScores();
  showGame();
  winnerMsg.style.display = "none";
  winnerMsg.classList.remove("fade-in");
  document.querySelector(".left-count").innerText = "0";
  document.querySelector(".right-count").innerText = "0";
  playerInfo[0].round++;
  playerInfo[1].round++;
  for (var i = 0; i <pastGames.length; i++) {
    pastGames[i].style.display = "block";
  }
}

function showWinner() {
  if (deck.matches === 5) {
    names.push(playerOne.value);
    names.push(playerTwo.value);
    nameStorage();
    // updateBoard();
    findTime();
    if (playerInfo[0].matchCount > playerInfo[1].matchCount ) {
      document.querySelector(".winner").innerText = `${playerInfo[0].name.toUpperCase()}`;
    } else {
      document.querySelector(".winner").innerText = `${playerInfo[1].name.toUpperCase()}`;
    }
    cardContainer.innerHTML = "";
    winnerMsg.style.display = "grid";
    winnerMsg.classList.add("fade-in");
    deck.matches = 0;
    deck.cards = [];
    playerInfo[0].matchCount = 0;
    playerInfo[1].matchCount = 0;
    cardNumber = 1;
    cardId = 10;
    deck.matchedCards = [];
    gamePage.style.display = "none";
    turnIndicator.parentNode.style.display = "none";
  }
}

function indicateTurn() {
  for (var i = 0; i < playerInfo.length; i++) {
    playerInfo[i].turn = !playerInfo[i].turn;
  }
    if (playerInfo[0].turn) {
      turnIndicator.innerText = `${playerOne.value.toUpperCase()}, IT'S YOUR TURN HONEY!`;
    } else {
      turnIndicator.innerText = `${playerTwo.value.toUpperCase()}, IT'S YOUR TURN HONEY!`;
    }
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
  if (playerInfo.length === 1) {
     for (var i = 0; i < matchCount.length; i++) {
       matchCount[i].innerText = `${deck.matches}`;
      }
    } else {
    for (var i = 0; i < playerInfo.length; i++) {
       if (playerInfo[0].turn) {
         player.findMatch(playerInfo[0]);
         document.querySelector(".left-count").innerText = `${playerInfo[0].matchCount}`;
       } else {
         player.findMatch(playerInfo[1]);
         document.querySelector(".right-count").innerText = `${playerInfo[1].matchCount}`;
       }
     }
    }
   } else {
    setTimeout(function() { flipBack(); }, 1000);

  }
  if (deck.matches < 5) {
    setTimeout(function() { indicateTurn(); }, 1000);
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

// function showWinner() {
//   if (deck.matches === 5) {
//     names.push(playerOne.value);
//     names.push(playerTwo.value);
//     nameStorage();
//     // updateBoard();
//     findTime();
//     cardContainer.innerHTML = "";
//     winnerMsg.style.display = "grid";
//     winnerMsg.classList.add("fade-in");
//     deck.matches = 0;
//     deck.cards = [];
//     playerInfo[0].matchCount = 0;
//     playerInfo[1].matchCount = 0;
//     cardNumber = 1;
//     cardId = 10;
//     deck.matchedCards = [];
//     gamePage.style.display = "none";
//     turnIndicator.parentNode.style.display = "none";
//   }
// }


function pullScores() {
  names = [];
  times = [];
  document.querySelector(".winner-list").innerHTML = "";
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
  var userTime = `0${minutes}:${seconds}`;
  times.push(time);
  timeStorage();
  document.querySelector(".round-time").innerHTML = ` ${minutes} minutes and ${seconds}`;
  if (playerInfo[0].matchCount > playerInfo[1].matchCount ) {
    console.log(playerInfo[0].name);
    console.log(playerInfo);
    document.querySelector(".round-info-left").innerHTML += `<br/>ROUND ${playerInfo[0].round}<br/>${userTime}<br/>`;
  } else {
    document.querySelector(".round-info-right").innerHTML += `<br/>ROUND ${playerInfo[1].round}<br/>${userTime}<br/>`;
  }
}


function showGame() {
  main.style.display = "none";
  gamePage.style.display = "flex";
  if (playerTwo.value) {
    document.querySelector(".right").style.display = "block";
    playerInfo[0].turn = true;
    turnIndicator.parentNode.style.display = "flex";
    turnIndicator.innerText = `${playerOne.value.toUpperCase()}, IT'S YOUR TURN HONEY!`;
  }
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
    var firstPlayer = new Player(playerOne.value);
    playerInfo.push(firstPlayer);
    // firstPlayer.turn = true;
    playerNames.style.display = "none";
    welcomeMsg.style.display = "block";
    for (var i = 0; i < nameOne.length; i++) {
    nameOne[i].innerText = `${playerOne.value.toUpperCase()}`;
    }

  if (playerTwo.value) {
    var secondPlayer = new Player(playerTwo.value);
    playerInfo.push(secondPlayer);
    nameTwoWelcome.innerText =  ` AND ${playerTwo.value.toUpperCase()}`;
    for (var i = 0; i < nameTwo.length; i++) {
    nameTwo[i].innerText = `${playerTwo.value.toUpperCase()}`;
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
