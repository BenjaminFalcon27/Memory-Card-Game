import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.showCard = this.showCard.bind(this);
  }

  showCard() {
    this.props.showCard(this.props.id);
  }
  render() {
    if (this.props.face == "front") {
      return <div className={`card-front`}>{this.props.number}</div>;
    }
    if (this.props.face == "back") {
      return (
        <div
          className={`card-back`}
          id={this.props.id}
          onClick={this.showCard}
        ></div>
      );
    } else {
      return <div className={`card-found`}>{this.props.number}</div>;
    }
  }
}

export default Card;
