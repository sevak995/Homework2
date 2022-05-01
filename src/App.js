import { Component } from 'react';
import Pool from './components/Pool/Pool';
import Container from './components/Container/Container';
import { quotes } from './utils/quotesData';
import { returnMean, search } from './utils/utils';
import styles from './App.module.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = { quotes, searchResult: null };
  }

  addHandler(list) {
    let highestMean = { mean: 0 };
    let updatedQuotes = [];

    this.state.quotes.forEach((quote) => {
      const { comments, id, sectionName } = quote;

      const currentMean = returnMean(comments);

      if (currentMean > highestMean.mean && sectionName === 'main') {
        highestMean = { id: id, mean: currentMean };
      }

      updatedQuotes.push({ ...quote, mean: currentMean });
    });

    updatedQuotes = updatedQuotes.map((quote) => {
      if (quote.id === highestMean.id) {
        return { ...quote, sectionName: list };
      } else {
        return quote;
      }
    });

    this.setState({ quotes: updatedQuotes });
  }

  deleteHandler(id) {
    const updatedQuotes = this.state.quotes.map((quote) => {
      if (quote.id === id) {
        return { ...quote, sectionName: 'main' };
      } else {
        return quote;
      }
    });

    this.setState({ quotes: updatedQuotes });
  }

  queryHandler(query) {
    const { quotes } = this.state;

    if (query.trim().length < 3) {
      this.setState({ searchResult: null });
      return;
    }

    const searchResult = search(query, quotes);

    this.setState({ searchResult: searchResult });
  }

  addCommentHandler(newComment) {
    const { id, text, rate } = newComment;

    const { quotes } = this.state;

    const updatedQuotes = quotes.map((singleQuote) => {
      if (singleQuote.id === id) {
        const { comments } = singleQuote;
        const newId = String(comments.length + 1);

        comments.push({ id: newId, text: text, value: rate });

        return { ...singleQuote, comments };
      } else {
        return singleQuote;
      }
    });

    this.setState({ quotes: updatedQuotes });
  }

  onAddReply(reply) {
    const { text, commentId, quoteId } = reply;

    const { quotes } = this.state;

    const updatedQuotes = quotes.map((quote) => {
      if (quote.id === quoteId) {
        const { comments } = quote;

        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            if (comment.replys === undefined) {
              comment.replys = [];
            }

            const newId = comment.replys.length + 1;
            comment.replys.push({ id: newId, text });
          }
          return { ...comment };
        });

        return { ...quote, comments: updatedComments };
      } else {
        return quote;
      }
    });

    this.setState({ quotes: updatedQuotes });
  }

  render() {
    const { searchResult, quotes } = this.state;

    return (
      <div className={styles.app}>
        <Pool
          quotes={searchResult ? searchResult : quotes}
          query={(query) => this.queryHandler(query)}
          addCommentHandler={(NewCommnet) => this.addCommentHandler(NewCommnet)}
          onAddReply={(reply) => this.onAddReply(reply)}
        />
        <Container
          onAdd={(list) => this.addHandler(list)}
          quotes={quotes}
          onDelete={(id) => this.deleteHandler(id)}
          containerName="list1"
        />

        <Container
          onAdd={(list) => this.addHandler(list)}
          quotes={quotes}
          onDelete={(id) => this.deleteHandler(id)}
          containerName="list2"
        />
      </div>
    );
  }
}
