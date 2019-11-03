class Card {
  constructor(matchInfo, cardId) {
  this.matchInfo = matchInfo;
  this.cardId = cardId;
  this.matched = false;

}

match(card) {
  console.log(card);
  card.matched = true;
  // removeCard();
  }


}
