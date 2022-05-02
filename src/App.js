import { Component } from 'react';
import Pool from './components/Pool/Pool';
import Container from './components/Container/Container';
import styles from './App.module.css';

export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Pool />
        <Container containerName="list1" />
        <Container containerName="list2" />
      </div>
    );
  }
}
