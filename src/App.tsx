
import './App.css';
import { useNavigate, useRoutes } from 'react-router-dom';
import Account from './components/Account';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import ListUser from './pages/Users/ListUser';
import { useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { getAuthData, removeAuthData, saveAuthData } from './util/storage';
import { requestBackend } from './util/requests';
import { getTokenData, isAuthenticated } from './util/auth';
import ListVeiculos from './pages/Veiculo/ListVeiculos';
import EditVeiculo from './pages/Veiculo/EditVeiculo';

function App() {
  var time: any;
  const navigate = useNavigate();

  
  const onFilter = () => {
    var token = getAuthData().token;
    const params: AxiosRequestConfig = {
     
      method: 'POST',
      url: `/refresh/${token}`,
      
    };
    requestBackend(params).then(
      (response) => {
        saveAuthData(response.data);
        
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        })
      }
    );
  }
  const removeAuth=()=>{
    removeAuthData();
    navigate('/auth/login', { replace: true });
  }
  time = setInterval(() => {
    try {
      if( isAuthenticated()){
        onFilter();
      } else{
        removeAuth();
        clearInterval(time);
      }
    } catch (error) {
      removeAuth();
      clearInterval(time);
    }
  }, 19980);

  const root = {
    path: '/',
    element: <DashboardLayout />,
    children: [

      { path: 'account', element: <Account /> },

    ],
  };
  const mainRoutes = {

    path: '/app',
    element: <DashboardLayout />,
    children: [
      { path: 'usuarios', element: <ListUser /> },
      { path: 'account', element: <Account /> },
      { path: 'veiculos', element: <ListVeiculos /> },
      { path: 'veiculos/:id', element: <EditVeiculo /> },


    ],
  };
  const auth = {
    path: '/auth/login',
    element: <Login />

  }
  const routing = useRoutes([mainRoutes, auth, root]);

  return <>{routing} </>;

}

export default App;
function setAuthContextData(arg0: { authenticated: boolean; tokenData: any; }) {
  throw new Error('Function not implemented.');
}

