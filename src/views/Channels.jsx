import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link, Navigate} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { FaWaveSquare } from "react-icons/fa";
import { FaWater } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function Channels() {

  const { i18n, t } = useTranslation()
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()
  //const navigate = useNavigate();

  useEffect(() => {
    getChannels();
  }, [])


  const getChannels = () => {
    
    setLoading(true)
    axiosClient.get('/channels')
      .then(({ data }) => {
        setLoading(false)
        setChannels(data.data)
        console.log("objeto completo channel")
        console.log(data.data)
      })
      // .catch(() => {
      //   setLoading(false)
      // })
      .catch((err) => {
        setLoading(false)
        const response = err.response;
        //if (error.response && error.response.status === 401) {
       if (response && response.status === 401) {
          // Realizar el POST para establecer calibration_set en 0
          // Redirigir a la pantalla de inicio de sesión
          window.location = '/login';
      }
      })      
  }


  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="block text-xl font-bold mr-4">{t('channels')}</h1>
        <Link className="btn-add" to="/channels/new">
        {t('addnew')}
        </Link>
      </div>
      <div className="flex flex-wrap">
        {!loading &&
          channels.map((u) => (
            // <div key={u.uid} className="max-w-sm  w-54 h-54 space-between mx-2 my-2 rounded overflow-hidden shadow-lg transition-transform transform hover:shadow-xl">
             <div key={u.uid} className="w-54 h-54 space-between mx-2 my-2 rounded overflow-hidden  transition-transform transform hover:shadow-xl">
                  <Link to={"/channels/" + u.uid} className="bg-white max-w-sm relative flex flex-wrap py-6 rounded shadow-md hover:bg-neutral-300 hover:cursor-pointer">
           
                    <div className="lg:w-1/2 px-3">
                      <p className="text-gray-700 text-base flex items-center">{t('channel')} {u.num} </p>
                      <h2 className="title-font font-semibold text-gray-900 my-6 tracking-widest text-lg">{u.name}</h2>
                      <p className="text-gray-700 text-base flex items-center tracking-widest text-xs"> {console.log("Product Count:", u.products_count)} {u.products_count}P</p>
                      <p className="text-gray-700 text-base flex items-center text-xs mt-1">
                      {u.dosage_pump_type === 0 && <span>{t('Peristaltic')}</span>}
                      {u.dosage_pump_type === 1 && <span>{t('Motor')}</span>}
                      {u.dosage_pump_type === 2 && <span>{t('Pneumatic')}</span>}
                      {u.dosage_pump_type === 3 && <span>{t('Membrane')}</span>}
                      {u.dosage_pump_type === 4 && <span>{t('Venturi')}</span>}
                      {u.dosage_pump_type === 5 && <span>{t('Pneumaticpp')}</span>}
                      {u.dosage_pump_type === 6 && <span>{t('Motorpp')}</span>}
                      </p>          
                    </div>
                    <div className="lg:w-1/2 px-6  justify-between">
                  
                      <p className="m-4 mt-1 pl-4 pt-1 pb-1 text-gray-700 text-xs items-center"><FaWaveSquare fontSize={30}/>
                      <span> {u.water_kf}</span>
                      </p>
                      <p className="m-4 mt-1 pl-4 pt-1 pb-1 text-gray-700 text-xs items-center"><FaWater fontSize={30}/>
                      <span>{u.water_flow_rate}</span>
                      </p>
                    </div>
                  </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
