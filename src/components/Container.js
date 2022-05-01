import { Component } from 'react';
import SelectedQuote from './SelectedQuote';
import '../App.css';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { sorted: null };
  }

  addHandler() {
    this.props.onAdd(this.props.containerName);
  }

  onSort() {
    this.setState((prev) => {
      return prev.sorted === null
        ? { sorted: 'asc' }
        : prev.sorted === 'asc'
        ? { sorted: 'desc' }
        : { sorted: null };
    });
  }

  onDelete(id) {
    this.props.onDelete(id);
  }

  render() {
    const { containerName, quotes } = this.props;

    let selectedQuotes;
    const unsortedQuotes = quotes.filter((quote) => {
      return quote.sectionName === containerName;
    });

    if (this.state.sorted === null) {
      selectedQuotes = unsortedQuotes;
    } else if (this.state.sorted === 'asc') {
      const sortedUp = unsortedQuotes.sort((a, b) => {
        return b.mean - a.mean;
      });
      selectedQuotes = sortedUp;
    } else {
      const sortedDown = unsortedQuotes.sort((a, b) => {
        return a.mean - b.mean;
      });
      selectedQuotes = sortedDown;
    }

    const sortBtnStyle = this.state.sorted ? 'btn btn-sorted' : 'btn';
    const sortBtnContent =
      this.state.sorted === 'desc'
        ? 'Sorted lowest to highest'
        : this.state.sorted === 'asc'
        ? 'Sorted highest to lowest'
        : 'Unsorted !';

    return (
      <div className="container">
        <div className="btns">
          <button className={sortBtnStyle} onClick={() => this.onSort()}>
            {sortBtnContent}
          </button>
          <button className="btn" onClick={() => this.addHandler()}>
            Add to {containerName}
          </button>
        </div>
        <div>
          <ul className="quotes-list">
            {selectedQuotes.map((quote) => {
              return (
                <SelectedQuote
                  quote={quote}
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
