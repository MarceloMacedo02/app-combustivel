
import './App.css';

import "antd/dist/antd.css";
import { useNavigate, useRoutes } from 'react-router-dom';
import Account from './components/Account';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import ListUser from './pages/Users/ListUser';
import { useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { getAuthData, saveAuthData } from './util/storage';
import { requestBackend } from './util/requests';
import { getTokenData, isAuthenticated } from './util/auth'; 
import EditFipe from './pages/Veiculo/EditFipe';
import Setor from './pages/Setor';
import FormSetor from './pages/Setor';
import DashboardNavbar from './components/layout/DashboardNavbar';
import DashboardSidebar from './components/layout/DashboardSidebar';
import NewVeiculo from './pages/Veiculo/NewVeiculo';
import ListVeiculos from './pages/Veiculo/ListVeiculos';

function App() {
  var time: any;
  const navigate = useNavigate();
  /**
   * 
   * @description Reflash token
   */
  /*  const onFilter = () => {
      var token = getAuthData().access_token;
      const params: AxiosRequestConfig = {
  
        method: 'POST',
        url: `/api/refresh_token`,
  
      };
       
      {
        requestBackend(params).then(
          (response) => {
            removeAuthData();
            saveAuthData(response.data);
  
          }
  
        ).catch(
          (error) => {
            console.log(error);
  //removeAuth();
          }
        );
  
  
      }
    }
    /**
     * @description atualização do token automaticamente
    
    time = setInterval(() => {
      try {
  
        if (isAuthenticated()) {
          onFilter();
        } else {
         // removeAuth();
          //     clearInterval(time);
        }
      } catch (error) {
       // removeAuth();
        //  clearInterval(time);
      }
    }, 19980);
  
   
    /**
     * @description remove token
   
    const removeAuth = () => {
      removeAuthData();
      navigate('/auth/login', { replace: true });
    }
  */
  //routes

  /**
   * @description rota principal
   */
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const root = {
    path: '/',
    element: <DashboardSidebar
      onMobileClose={() => setMobileNavOpen(false)}
      openMobile={isMobileNavOpen}
    />,
    children: [
    ],
  };

  const mainRoutes = {
    path: '/app',
    element: <DashboardLayout />,
    children: [
      { path: 'usuarios', element: <ListUser /> },
      { path: 'account', element: <Account /> },
      { path: 'veiculos', element: <ListVeiculos /> },
      { path: 'veiculos/:id', element: <NewVeiculo /> },
      { path: 'setores', element: <FormSetor /> },


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

