import React, { Component } from "react";
import Card from "./Card";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { id: 1, number: "FlowerFire", face: "back" },
        { id: 2, number: "Up", face: "back" },
        { id: 3, number: "Blooper", face: "back" },
        { id: 4, number: "Bullet", face: "back" },
        { id: 5, number: "Chain", face: "back" },
        { id: 6, number: "FlowerIce", face: "back" },
        { id: 7, number: "Goomba", face: "back" },
        { id: 8, number: "Mush", face: "back" },
        { id: 9, number: "Giant", face: "back" },
        { id: 10, number: "Giant", face: "back" },
        { id: 11, number: "Mush", face: "back" },
        { id: 12, number: "Goomba", face: "back" },
        { id: 13, number: "FlowerIce", face: "back" },
        { id: 14, number: "Chain", face: "back" },
        { id: 15, number: "Bullet", face: "back" },
        { id: 16, number: "Blooper", face: "back" },
        { id: 17, number: "Up", face: "back" },
        { id: 18, number: "FlowerFire", face: "back" },
      ],
      clickAllowed: true,
    };
  }

  componentDidMount() {
    this.shuffleCards(this.state.cards); // First Shuffle
  }

  shuffleCards(array) {
    array = array.slice();
    var i = array.length,
      j = 0,
      temp;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));

      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.setState({ cards: array });
  }

  countFrontCards() {
    let frontCards = 0;
    for (let j = 0; j < 18; j++) {
      if (this.state.cards[j].face === "front") {
        frontCards++;
      }
    }
    return frontCards;
  }

  checkCardNumber() {
    let numberArray = [];
    for (let j = 0; j < 18; j++) {
      if (this.state.cards[j].face === "front") {
        numberArray.push(this.state.cards[j].number);
      }
    }
    return numberArray;
  }

  triggerGameFinished() {
    let foundCards = 0;
    for (let j = 0; j < 18; j++) {
      if (this.state.cards[j].face === "found") {
        foundCards++;
      }
    }
    if (foundCards === 18) {
      setTimeout(() => alert("game finished"), 500);
    }
  }

  triggerSameCards(number1, number2) {
    if (number1 === number2) {
      return true;
    }
  }

  triggerTwoFrontCards() {
    let frontCards = this.countFrontCards();
    let number = this.checkCardNumber().slice();
    if (frontCards === 2) {
      this.setState({ clickAllowed: false });
      if (number[0] === number[1]) {
        this.setPairFound();
        this.setState({ clickAllowed: true });
      } else {
        setTimeout(() => this.hideAllCards(), 2000);
      }
    }
    this.triggerGameFinished();
  }

  hideAllCards() {
    let cardsTable = this.state.cards.slice();
    let i = cardsTable.length;
    while (i--) {
      if (cardsTable[i].face !== "found") {
        cardsTable[i].face = "back";
      }
    }

    this.setState({ cards: cardsTable, clickAllowed: true });
  }

  setPairFound() {
    let cardsTable = this.state.cards.slice();
    let i = cardsTable.length;
    while (i--) {
      if (cardsTable[i].face === "front") {
        cardsTable[i].face = "found";
      }
    }
    this.setState({ cards: cardsTable });
  }

  showCard(id) {
    if (this.state.clickAllowed) {
      let newCards = this.state.cards.slice();

      for (let j = 0; j < 18; j++) {
        if (newCards[j].id === id) {
          newCards[j].face = "front";
          break;
        }
      }

      this.setState({ cards: newCards }, () => this.triggerTwoFrontCards());
    }
  }

  render() {
    return (
      <div>
        {this.renderClouds()}
        <div className="container">{this.renderTable()}</div>
      </div>
    );
  }

  renderRow(rowNumber) {
    let array = [];
    for (let j = rowNumber * 6; j < rowNumber * 6 + 6; j++) {
      array.push(
        <td key={this.state.cards[j].id}>
          <Card
            id={this.state.cards[j].id}
            number={this.state.cards[j].number}
            showCard={this.showCard.bind(this)}
            face={this.state.cards[j].face}
          />
        </td>
      );
    }

    return array;
  }

  renderTable() {
    return (
      <table className="grid">
        <tbody className="body-tab">
          <tr>{this.renderRow(0)}</tr>
          <tr>{this.renderRow(1)}</tr>
          <tr>{this.renderRow(2)}</tr>
        </tbody>
      </table>
    );
  }

  renderClouds() {
    return (
      <div id="background-wrap">
        <div className="x1">
          <div className="cloud"></div>
        </div>

        <div className="x2">
          <div className="cloud"></div>
        </div>

        <div className="x3">
          <div className="cloud"></div>
        </div>

        <div className="x4">
          <div className="cloud"></div>
        </div>

        <div className="x5">
          <div className="cloud"></div>
        </div>
      </div>
    );
  }

  renderPlayAgain() {
    return <div className="play-again"></div>;
  }
}

export default Grid;
