import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { NotificationContainer } from 'react-notifications';
import { asyncActions, selectors } from './slices';

import PrivateRoute from './components/PrivateRoute';
import GamePage from './routes/GamePage';
import HomePage from './routes/HomePage';
import AboutPage from './routes/AboutPage';
import NotFound from './routes/NotFound';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import ContactPage from './routes/ContactPage';

import s from './App.module.css';
import 'react-notifications/lib/notifications.css';

import { FireBaseContext } from './context/fireBaseContext';
import fireBaseClass from './service/firebase';

const App = () => {
  const isUserLoading = useSelector(selectors.selectUserFetch);
  const location = useLocation();
  const dispatch = useDispatch();

  const isPadding =
    location.pathname === '/' || location.pathname === '/game/board';

  const wrapClassNames = cn(s.wrap, { [s.isHomePage]: isPadding });

  useEffect(() => {
    dispatch(asyncActions.getUserAsync());
  }, []);

  if (isUserLoading) {
    return 'Loading...';
  }

  return (
    <FireBaseContext.Provider value={fireBaseClass}>
      <Switch>
        <Route path={'/404'} component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={wrapClassNames}>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <PrivateRoute path='/game' component={GamePage} />
                <PrivateRoute path='/about' component={AboutPage} />
                <Route path='/contact' component={ContactPage} />
                <Route render={() => <Redirect to='/404' />} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </FireBaseContext.Provider>
  );
};

export default App;
