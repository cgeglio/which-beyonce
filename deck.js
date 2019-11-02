class Deck {
  constructor(){
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
  }

  shuffle() {

  }

  checkSelectedCards() {
    console.log(this.selectedCards[0].matchInfo);
    if (this.selectedCards[0].matchInfo === this.selectedCards[1].matchInfo) {
       this.matched = true;
       this.matches++;
     } else {
       this.selectedCards.splice(0, 2);
     }
  }

  moveToMatched() {
    selectedCards[0].style.display = none;
    selectedCards[1].style.display = none;
    this.selectedCards = this.selectedCards.concat(this.matchedCards);

  }

}
