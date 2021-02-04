import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import cn from 'classnames';
import GamePage from './routes/GamePage';
import HomePage from './routes/HomePage';
import AboutPage from './routes/AboutPage';
import NotFound from './routes/NotFound';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import ContactPage from './routes/ContactPage';

import s from './App.module.css';

const App = () => {
  const match = useRouteMatch('/');

  const wrapClassNames = cn(s.wrap, { [s.isHomePage]: match.isExact });

  return (
    <Switch>
      <Route path={'/404'} component={NotFound} />
      <Route>
        <>
          <MenuHeader bgActive={!match.isExact} />
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
  );
};

export default App;
