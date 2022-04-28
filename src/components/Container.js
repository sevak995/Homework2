import { Component } from 'react';
import SelectedQuote from './SelectedQuote';
import '../App.css';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { sorted: null };
  }

  addHandler() {
    this.props.onAdd(this.props.name);
  }

  onSort() {
    this.setState((prev) => {
      return prev.sorted === null || prev.sorted === 'DOWN'
        ? { sorted: 'UP' }
        : { sorted: 'DOWN' };
    });
  }

  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    let data;
    const unsortedData = this.props.quotesData.filter((quote) => {
      return quote.sectionName === this.props.name;
    });

    if (this.state.sorted === null) {
      data = unsortedData;
    } else if (this.state.sorted === 'UP') {
      const sortedUp = unsortedData.sort((a, b) => {
        return b.mean - a.mean;
      });
      data = sortedUp;
    } else {
      const sortedDown = unsortedData.sort((a, b) => {
        return a.mean - b.mean;
      });
      data = sortedDown;
    }

    const sortBtnStyle = this.state.sorted ? 'btn btn-sorted' : 'btn';
    const sortBtnContent =
      this.state.sorted === 'DOWN'
        ? 'Sorted lowest to highest'
        : this.state.sorted === 'UP'
        ? 'Sorted highest to lowest'
        : 'Unsorted!';

    return (
      <div className="container">
        <div className="btns">
          <button className={sortBtnStyle} onClick={() => this.onSort()}>
            {sortBtnContent}
          </button>
          <button className="btn" onClick={() => this.addHandler()}>
            Add to {this.props.name}
          </button>
        </div>
        <div>
          <ul className="quotes-list">
            {data.map((quote) => {
              return (
                <SelectedQuote
                  quoteData={quote}
                  key={quote.id}
                  onDelete={(id) => this.onDelete(id)}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
