import './App.css';
import { Component } from 'react';
import Pool from './components/Pool';
import Container from './components/Container';
import { quotes } from './components/quotesData';
import { returnMean } from './utils/utils';

export default class App extends Component {
  constructor() {
    super();
    this.state = { quotes };
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

  render() {
    return (
      <div className="app">
        <Pool quotes={this.state.quotes} />
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
