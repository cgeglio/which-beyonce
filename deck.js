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
       this.matches++;
       this.moveToMatched();
  }
}

  moveToMatched() {
    this.matchedCards = this.matchedCards.concat(this.selectedCards);
    this.selectedCards.splice(0, 2);
  }

};
