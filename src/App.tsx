
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
import StapVeiculo from './pages/Veiculo/StapVeiculo';
import EditFipe from './pages/Veiculo/EditFipe';

function App() {
  var time: any;
  const navigate = useNavigate();
 /* const sinespApi = require('sinesp-api');
  let vehicle = sinespApi.search('PGG1537');
  console.log(vehicle);
*/

  const onFilter = () => {
    var token = getAuthData().token;
    const params: AxiosRequestConfig = {

      method: 'POST',
      url: `/api/refresh/${token}`,

    };
    requestBackend(params).then(
      (response) => {
        removeAuthData();
        saveAuthData(response.data);

      }

    ).catch(
      (error) => {
        console.log(error);

      }
    );
  }
  const removeAuth = () => {
    removeAuthData();
    navigate('/auth/login', { replace: true });
  }
  time = setInterval(() => {
    try {
     
      if (isAuthenticated()) {
        onFilter();
      } else {
        removeAuth();
        //     clearInterval(time);
      }
    } catch (error) {
      removeAuth();
      //  clearInterval(time);
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
      { path: 'newveiculo', element: <StapVeiculo  /> },
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
 
