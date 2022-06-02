import React, { Component } from "react";
import Card from "./Card";

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        { id: 1, number: 1, face: "back" },
        { id: 2, number: 2, face: "back" },
        { id: 3, number: 3, face: "back" },
        { id: 4, number: 4, face: "back" },
        { id: 5, number: 5, face: "back" },
        { id: 6, number: 6, face: "back" },
        { id: 7, number: 7, face: "back" },
        { id: 8, number: 8, face: "back" },
        { id: 9, number: 9, face: "back" },
        { id: 10, number: 9, face: "back" },
        { id: 11, number: 8, face: "back" },
        { id: 12, number: 7, face: "back" },
        { id: 13, number: 6, face: "back" },
        { id: 14, number: 5, face: "back" },
        { id: 15, number: 4, face: "back" },
        { id: 16, number: 3, face: "back" },
        { id: 17, number: 2, face: "back" },
        { id: 18, number: 1, face: "back" },
      ],
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
      console.log("game finished");
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
      if (number[0] - number[1] === 0) {
        this.setPairFound();
      } else {
        setTimeout(() => this.hideAllCards(), 2000);
      }
    }
  }

  hideAllCards() {
    let cardsTable = this.state.cards.slice();
    let i = cardsTable.length;
    while (i--) {
      if (cardsTable[i].face != "found") {
        cardsTable[i].face = "back";
      }
    }
    this.setState({ cards: cardsTable });
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
    let newCards = this.state.cards.slice();

    for (let j = 0; j < 18; j++) {
      if (newCards[j].id === id) {
        newCards[j].face = "front";
        break;
      }
    }

    this.setState({ cards: newCards });
  }

  render() {
    return (
      <div className="container">
        {this.renderTable()}
        {this.triggerTwoFrontCards()}
        {this.triggerGameFinished()}
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
        <tbody>
          <tr>{this.renderRow(0)}</tr>
          <tr>{this.renderRow(1)}</tr>
          <tr>{this.renderRow(2)}</tr>
        </tbody>
      </table>
    );
  }
}

export default Grid;
