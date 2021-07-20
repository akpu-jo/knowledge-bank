import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MobileNav from './components/MobileNav';

import Navbar from './components/Navbar';
import Player from './components/Player';
import SideNav from './components/SideNav';

function App() {
  return (
    <Router>
      <div className="">
        <Navbar />
        <div className=" md:grid grid-cols-7 gap-4">
          <SideNav />
          <Switch>
            <Route path="/:course">
              <Player />
            </Route>
          </Switch>
          <MobileNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
