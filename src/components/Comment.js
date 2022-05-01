import { Component } from 'react';
import styles from './Comment.module.css';
import NewReplay from './NewReplay';
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
    this.setState({ showReplayForm: false });
  }

  render() {
    const { text, value, id, replays } = this.props.comment;
    const { showReplayForm } = this.state;

    const commentStyles =
      value > 8
        ? styles.comment + ' ' + styles['comment-green']
        : value > 6
        ? styles.comment + ' ' + styles['comment-yellow']
        : styles.comment + ' ' + styles['comment-red'];

    return (
      <div className={commentStyles}>
        <div className={styles['comment-info']}>
          <div>{text}</div>
          <div>{value}</div>
          <button
            onClick={() => this.toggleForm()}
            className={styles.btn + ' ' + styles['btn-yellow']}
          >
            Replay
          </button>
        </div>
        {replays && (
          <div className={styles['replays-form']}>
            <div>Replays</div>
            <div className={styles['replays-list']}>
              {replays.map((replay) => {
                return <Replay key={replay.id} replay={replay} />;
              })}
            </div>
          </div>
        )}

        {showReplayForm && (
          <NewReplay
            onAddReplay={(replay) => this.onAddReplay(replay)}
            id={id}
          />
        )}
      </div>
    );
  }
}
