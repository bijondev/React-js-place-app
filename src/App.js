import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { authContext } from './shared/context/auth-context';

let logoutTimer;


function App() {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uId, token, exprationDate) => {
    setToken(token);
    setUserId(uId);
    const tokenExpirationDate = exprationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({
      userId: uId,
      token: token,
      tokenExpirationDate: tokenExpirationDate.toISOString()
    }))
  }, []);

  const logout = useCallback(() => {
    setToken('');
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token) {
      const remainTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainTime);
    }
    else {
      logoutTimer = clearTimeout();
    }
  }, [token, logout, tokenExpirationDate])


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData &&
      storedData.token &&
      new Date(storedData.tokenExpirationDate) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.tokenExpirationDate));
    }
  }, [login]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }


  return (
    <authContext.Provider value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: logout
    }}>
      <Router>
        <MainNavigation />
        <main className='bg-gray-600 h-full pb-96'>

          {routes}
        </main>
      </Router>
    </authContext.Provider>
  );
}

export default App;
