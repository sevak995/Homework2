import { Component } from 'react';

export default class NewCommnet extends Component {
  render() {
    return (
      <form>
        <input placeholder="Author" onChange={(event) => {}} />
        <textarea placeholder="Text"></textarea>
      </form>
    );
  }
}
