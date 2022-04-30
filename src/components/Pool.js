import { Component } from 'react';
import Quote from './Quote';
import '../App.css';

export default class Pool extends Component {
  render() {
    const { quotes } = this.props;

    return (
      <div className="container">
        <ul className="quotes-list">
          {quotes.map((quote) => {
            return <Quote quoteData={quote} key={quote.id} />;
          })}
        </ul>
      </div>
    );
  }
}
