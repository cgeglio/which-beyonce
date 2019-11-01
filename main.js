var playBtn = document.querySelector(".play-btn");
var welcomeMsg = document.querySelector(".welcome-msg")
var playerOne = document.querySelector(".input-one");
var playerTwo = document.querySelector(".input-two");
var nameOne = document.querySelector(".name-one");
var nameTwo = document.querySelector(".name-two");
// var inputArea = document.querySelector(".player-names");
// playBtn.disabled = true;


playBtn.addEventListener("click", showDirections);
playerOne.addEventListener("keyup", checkInputs);
//
// function checkInputs() {
//   if (playerOne.value) {
//     // playBtn.disabled = false;
//     playBtn.id = "active";
// } else
//
//   return;
// }


function checkInputs() {
  if (playerOne.value) {
    playBtn.id = "active";
  }
};

function showDirections() {
  if (playBtn.id === "active") {
    document.querySelector(".player-names").style.display = "none";
    welcomeMsg.style.display = "block";
    nameOne.innerText = `${playerOne.value.toUpperCase()}`;
  if (playerTwo.value) {
    nameTwo.innerText = ` AND ${playerTwo.value.toUpperCase()}`;
  }
} else {
    document.querySelector(".error").style.display = "block";
  }
};
