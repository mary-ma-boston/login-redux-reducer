import React, {useContext} from 'react';
import AuthContext from './store/auth-context';

import Home from './components/Home';
import Login from './components/Login';
import MainHeader from './components/MainHeader';

import './App.css';

function App() {
  const auc = useContext(AuthContext);



  return (
    <div>
      <MainHeader />
      {!auc.isLogin && <Login />}
      {auc.isLogin && <Home />}
    </div>
  );
}

export default App;
