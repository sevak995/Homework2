// import './App.css';
import { Component } from 'react';
import Pool from './components/Pool';
import Container from './components/Container';
import { quotes } from './components/quotesData';
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

  addCommentHandler(NewCommnet) {
    console.log(NewCommnet);

    const { id, text, rate } = NewCommnet;

    const { quotes } = this.state;

    const updatedQuotes = quotes.map((quote) => {
      if (quote.id === id) {
        const { comments } = quote;
        const newId = String(comments.length + 1);

        comments.push({ id: newId, text: text, value: rate });

        return { ...quote, comments };
      } else {
        return quote;
      }
    });

    this.setState({ quotes: updatedQuotes });
  }

  onAddReplay(replay) {
    const { text, commentId, quoteId } = replay;

    const { quotes } = this.state;

    const updatedQuotes = quotes.map((quote) => {
      if (quote.id === quoteId) {
        const { comments } = quote;

        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            if (comment.replays === undefined) {
              comment.replays = [];
            }

            const newId = comment.replays.length + 1;
            comment.replays.push({ id: newId, text });
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
    return (
      <div className={styles.app}>
        <Pool
          quotes={
            this.state.searchResult
              ? this.state.searchResult
              : this.state.quotes
          }
          query={(query) => this.queryHandler(query)}
          addCommentHandler={(NewCommnet) => this.addCommentHandler(NewCommnet)}
          onAddReplay={(replay) => this.onAddReplay(replay)}
        />
        <Container
          onAdd={(list) => this.addHandler(list)}
          quotes={this.state.quotes}
          onDelete={(id) => this.deleteHandler(id)}
          containerName="list1"
        />

        <Container
          onAdd={(list) => this.addHandler(list)}
          quotes={this.state.quotes}
          onDelete={(id) => this.deleteHandler(id)}
          containerName="list2"
        />
      </div>
    );
  }
}
