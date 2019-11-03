class Deck {
  constructor(){
    this.cards = [];
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;

  }

  shuffle() {
      for (var i = this.cards.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temporaryIndex = this.cards[i];
          this.cards[i] = this.cards[j];
          this.cards[j] = temporaryIndex;
      }
  }

  checkSelectedCards() {
    if (this.selectedCards[0].matchInfo === this.selectedCards[1].matchInfo) {
      // for (var i = 0; i < this.selectedCards.length; i++) {
      //   match(this.selectedCards[i]);
      //   console.log(this.selectedCards[i]);
      // }
       this.matches++;
       this.moveToMatched();
     } else {
       this.selectedCards.splice(0, 2);
     }
  }

  moveToMatched() {
    this.matchedCards = this.matchedCards.concat(this.selectedCards);
    this.selectedCards.splice(0, 2);
  }

}
