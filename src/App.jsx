import { Fragment } from 'react';
import logo from './logo.svg';
import Header from './Components/Header/Header';
import View from './Components/View/View';
import Container from 'react-bootstrap/Container';

function App() {
  return (
  <Fragment>
    <Header/>
    <Container className="mt-5 main-content">
        <View/>
    </Container>
  </Fragment>
  );
}

export default App;
