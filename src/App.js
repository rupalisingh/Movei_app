import About from './Components/About'
import Home from './Components/Home'
import Movies from './Components/Movies';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Components/nav'
function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        {/* <Home/> */}
        <Route path='/' exact component={Home} />

        {/* <Movies/> */}
        <Route path='/Movies' component={Movies} />
        {/* <About/> */}
        {/* <Route path='/About' component={About} /> */}
        <Route path = '/About' render = {(props) =>(
          <About {...props} isAuth = {true}/>
        )}/>

      </Switch>
    </Router>

  );
}

export default App;
