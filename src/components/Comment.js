import { Component } from 'react';
import '../App.css';
import Replay from './Replay';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { showReplayForm: false };
  }

  toggleForm() {
    this.setState((prev) => {
      return { showReplayForm: !prev.showReplayForm };
    });
  }

  onAddReplay(replay) {
    this.props.onAddReplay(replay);
  }

  render() {
    const { text, value, id } = this.props.comment;
    const { showReplayForm } = this.state;

    return (
      <div className="comment">
        <div className="comment-info">
          <div>{text}</div>
          <div>{value}</div>
          <button onClick={() => this.toggleForm()} className="btn btn-delete">
            Replay
          </button>
        </div>
        {showReplayForm && (
          <Replay onAddReplay={(replay) => this.onAddReplay(replay)} id={id} />
        )}
      </div>
    );
  }
}
