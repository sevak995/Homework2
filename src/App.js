import './App.css';
import { Component } from 'react';
import Pool from './components/Pool';
import Container from './components/Container';
import quotesData from './components/quotesData';

export default class App extends Component {
  constructor() {
    super();
    this.state = { quotesData };
  }

  addHandler(list) {
    let highestMean = { mean: 0 };
    let updatedQuotesData = [];

    this.state.quotesData.forEach((quote) => {
      const { comments, id, sectionName } = quote;

      let currentSum = 0;

      comments.forEach((comment) => {
        currentSum += comment.value;
      });

      const currentMean = currentSum / comments.length;

      if (currentMean > highestMean.mean && sectionName === 'main') {
        highestMean = { id: id, mean: currentMean };
      }

      updatedQuotesData.push({ ...quote, mean: currentMean });
    });

    updatedQuotesData = updatedQuotesData.map((quote) => {
      if (quote.id === highestMean.id) {
        return { ...quote, sectionName: list };
      } else {
        return quote;
      }
    });

    this.setState({ quotesData: updatedQuotesData });
  }

  deleteHandler(id) {
    const updatedQuotesData = this.state.quotesData.map((quote) => {
      if (quote.id === id) {
        return { ...quote, sectionName: 'main' };
      } else {
        return quote;
      }
    });

    this.setState({ quotesData: updatedQuotesData });
  }

  render() {
    return (
      <div className="app">
        <Pool quotesData={this.state.quotesData} />
        <Container
          onAdd={(list) => this.addHandler(list)}
          quotesData={this.state.quotesData}
          onDelete={(id) => this.deleteHandler(id)}
          name="list1"
        />

        <Container
          onAdd={(list) => this.addHandler(list)}
          quotesData={this.state.quotesData}
          onDelete={(id) => this.deleteHandler(id)}
          name="list2"
        />
      </div>
    );
  }
}
