var playBtnMain = document.querySelector(".play-btn");
var playBtnWelcome = document.querySelector(".welcome-btn");
var welcomeMsg = document.querySelector(".welcome-msg")
var playerOne = document.querySelector(".input-one");
var playerTwo = document.querySelector(".input-two");
var sidebars = document.querySelector(".sidebar");
var cardContainer = document.querySelector(".card-container");
var main = document.querySelector("main");
var gamePage = document.querySelector(".game-page");
var nameOne = document.querySelectorAll(".name-one");
var nameTwo = document.querySelectorAll(".name-two");
// var card = document.querySelectorAll(".card");

playBtnMain.addEventListener("click", showDirections);
playerOne.addEventListener("keyup", checkInputs);
playBtnWelcome.addEventListener("click", showGame);
cardContainer.addEventListener("click", flipCard);

function flipCard(event) {
  console.log(event.target.parentNode);
  specificCard = event.target.parentNode.id;
  // console.log(event.target.parentNode.id);
  // event.target.classList.toggle(`active-${activityType}-btn`);
  // console.log(event.target.className === card-`${}`);
  // if (event.target.className === card-`${}`) {
  document.querySelector(`.${specificCard}`).classList.toggle("flip");
  // }
}

function showGame() {
  main.style.display = "none";
  gamePage.style.display = "flex";
  // nameOne.innerText = "jhkgugi";
}

function checkInputs() {
  if (playerOne.value) {
    playBtnMain.id = "active";
  }
};

function showDirections() {
  if (playBtnMain.id === "active") {
    document.querySelector(".player-names").style.display = "none";
    welcomeMsg.style.display = "block";
    for (var i = 0; i < nameOne.length; i++) {
    nameOne[i].innerText = `${playerOne.value.toUpperCase()}`;
    }
  if (playerTwo.value) {
    for (var i = 0; i < nameTwo.length; i++) {
    nameTwo[i].innerText = ` AND ${playerTwo.value.toUpperCase()}`;
  }
} else {
    document.querySelector(".error").style.display = "block";
  }
}
};
