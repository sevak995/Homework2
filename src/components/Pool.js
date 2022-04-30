import { Component } from 'react';
import Quote from './Quote';
import '../App.css';
import Search from './Search';
import Pagination from './Pagination';

export default class Pool extends Component {
  constructor(props) {
    super(props);
    this.state = { quotes: this.props.quotes };
  }

  queryHandler(query) {
    const { quotes } = this.props;

    const filteredQuotes = quotes.filter((quote) => {
      if (query.trim().length < 3) {
        return quotes;
      }

      const { text, author, comments } = quote;

      const commentsText = comments.map((comment) => comment.text);

      const searchArea = [text, author, ...commentsText];

      return searchArea.find((text) =>
        text.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.setState({ quotes: filteredQuotes });
  }

  render() {
    const { quotes } = this.state;

    return (
      <div className="container">
        <Search query={(query) => this.queryHandler(query)} />
        <Pagination />
        <ul className="quotes-list">
          {quotes.map((quote) => {
            return <Quote quoteData={quote} key={quote.id} />;
          })}
        </ul>
      </div>
    );
  }
}
