import {useEffect, useState} from 'react'
import { Link,Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from "../axios-client.js";
import Sidebar from './Sidebar';
import { IoIosLogOut } from "react-icons/io";
//import Header from './Header';

export default function DefaultLayout() {

  const {user, token, setUser, setToken, notification} = useStateContext();

if(!token){
  return <Navigate to ="/login" />
}

const onLogout = ev => {
  ev.preventDefault()

  axiosClient.post('/logout')
    .then(() => {
      setUser({})
      setToken(null)
    })
    .catch((err) => {
      setLoading(false);
      const response = err.response;
      if (response && response.status === 401) {
        // Si hay un error 401, redirige a la página de inicio de sesión
        window.location = '/login';
      }
    });
}
// cuando hago reload trae de nuevo el user, no se por que trae expert
useEffect(() => {
  axiosClient.get('/user')
    .then(({data}) => {
       setUser(data)
    })
}, [])

const [selectedItem, setSelectedItem] = useState(null);

const handleItemClick = (itemName) => {
  setSelectedItem(itemName === selectedItem ? null : itemName);
};

return (
  <div className="flex flex-row bg-neutral-100 h-screen w-screen">
    <Sidebar/>
    <div className='flex-1'>
      <div className='bg-white h-16 px-4 flex justify-between items-center'>
        <div className='relative'>
        <img className="img" src="./src/assets/brightwell.png" alt="Brightwell" />
        </div>
        <div className='flex items-center gap-2 mr-2'>
          <div className="block text-lg font-bold mr-4">{user.name} &nbsp;</div>
          <div onClick={onLogout} className="btn-logout" href="#"><IoIosLogOut fontSize={40} /></div>
        </div>
      </div>
      <div className="p-4">
          <Outlet/>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        } 
      </div>
    </div>
  </div>

)

}
