import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import cn from 'classnames';
import GamePage from './routes/GamePage';
import HomePage from './routes/HomePage';
import AboutPage from './routes/AboutPage';
import NotFound from './routes/NotFound';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import ContactPage from './routes/ContactPage';

import s from './App.module.css';
import { FireBaseContext } from './context/fireBaseContext';
import FireBase from './service/firebase';

const App = () => {
  const location = useLocation();

  const isPadding =
    location.pathname === '/' || location.pathname === '/game/board';

  const wrapClassNames = cn(s.wrap, { [s.isHomePage]: isPadding });

  return (
    <FireBaseContext.Provider value={new FireBase()}>
      <Switch>
        <Route path={'/404'} component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={wrapClassNames}>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/game' component={GamePage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/contact' component={ContactPage} />
                <Route render={() => <Redirect to='/404' />} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
    </FireBaseContext.Provider>
  );
};

export default App;
