import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { TbWashDry } from "react-icons/tb";
import { TbWashTemperature1 } from "react-icons/tb";
import { TbWashTemperature2 } from "react-icons/tb";
import { LuTriangle } from "react-icons/lu";
import { TbWash } from "react-icons/tb";
import { TbFlower } from "react-icons/tb";
import { BsQuestionDiamond } from "react-icons/bs";
import { TbWashOff } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import PhaseStatus from "./PhaseStatus.jsx";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { useTranslation } from 'react-i18next';



const RtView = () => {

    const { i18n, t } = useTranslation()
    const [processStatus, setProcessStatus] = useState([]);
    const {metricUnits} = useStateContext()
    useEffect(() => {
        // Cargar los datos inicialmente
        getProcessStatus();
    
        // Configurar la recarga automática cada segundo
        const intervalId = setInterval(() => {
          getProcessStatus();
        }, 1500);
    
        // Limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalId);
      }, []);
    
    const getProcessStatus = () => {
      
      //setLoading(true)
      axiosClient.get('/rtview')
        .then(({ data }) => {
      //    setLoading(false)
          setProcessStatus(data.data)
        })
        .catch((err) => {
          //setLoading(false);
          const response = err.response;
          if (response && response.status === 401) {
            // Si hay un error 401, redirige a la página de inicio de sesión
            window.location = '/login';
            //return <Link to ="/login" />
          }
        });
    }
    console.log(processStatus)
    const iconSize = 35;
    const buttonStyle = {
        position: 'relative',
      };
    
      const renderIconByPhaseType = (phaseType, iconSize) => {
        switch (phaseType) {
          case 0:
            return <TbWashDry fontSize={iconSize} />;
          case 1:
            return <TbFlower fontSize={iconSize} />;
          case 2:
            return <TbWash fontSize={iconSize} />;
          case 3:
            return <TbWashTemperature1 fontSize={iconSize} />;
          case 4:
            return <TbWashTemperature2 fontSize={iconSize} />;
          case 5:
            return <BsQuestionDiamond fontSize={iconSize} />;
          case 6:
            return <LuTriangle fontSize={iconSize} />;
          case 7:
            return <TbWashOff fontSize={iconSize} />;
          // Agrega más casos según sea necesario
          default:
            // Puedes mostrar algo predeterminado si el valor no coincide con ningún caso
            return <TbWashDry fontSize={iconSize} />;
        }
      };

  return (
<div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="block text-xl font-bold mr-4">{t('rtv')}</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>{t('number')}</th>
              <th>{metricUnits == 1 ? "lbs" : "KG"}</th>
              <th>{t('formulanum')}</th>
              <th>{t('formulaname')}</th>
              <th>{t('washercustomer')}</th>
              <th>{t('phasestatus')}</th>
              <th>{t('finish')}</th>
              <th>{t('pause')}</th>
            </tr>
          </thead>
            <tbody>
              {processStatus.map((u) => (
                <tr key={u.uid}>
                  <td>{u.washer_uid}</td>
                  <td>{u.washer_real_weight}</td>
                  <td>{u.formula_uid}</td>
                  <td>{u.formula_name}</td>
                  <td>{u.washer_customer}</td>
                  <td>
                        <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((bit, index) => (
                            <div
                            key={index}
                            className={`px-1 mt-2 border border-gray-300 focus:outline-none ${
                                u.formula_pbits_expected & (1 << index) ? 'bg-gray-200' : ''
                            } ${u.formula_pbits_received & (1 << index) ? 'bg-green-200' : ''}`}
                            >
                            {u.formula_pbits_expected & (1 << index) ? (
                                // Si el bit está activo, muestra el icono TbWashPress
                                renderIconByPhaseType(u.phase_type_active[index], 35)
                            ) : (
                                // Si el bit está inactivo, muestra el icono TbWashDry
                                <TbWashDry fontSize={iconSize} />
                            )}
                            </div>
                        ))}
                        </div>
                        
                        {/* <PhaseStatus processStatus={processStatus}/> */}
                  </td>
                  {/* <td>{u.formula_end_bit}</td> */}
                  <td>
                    <div className="px-1 mt-2 border border-gray-300 focus:outline-none w-8 h-8">
                      {u.formula_end_bit === 1 ? (
                        // Si formula_end_bit es 1, muestra el icono correspondiente
                        // <FaCheck fontSize={35} />
                        <FaCheck fontSize={35} style={{ color: 'green' }} />
                      ) : (
                        // Si formula_end_bit es 0, muestra un espacio vacío
                        <div style={{ width: '35px', height: '35px' }} />
                      )}
                    </div>
                  </td>
                  {/* <td>{u.washer_pause_bit}</td> */}
                  <td>
                    <div className="px-1 mt-2 ">
                      {u.washer_pause_bit === 1 ? (
                        // Si washer_pause_bit es 1, muestra el icono correspondiente
                        <IoIosPause fontSize={35} />
                      ) : (
                        // Si washer_pause_bit es 0, muestra un espacio vacío
                        <div style={{ width: '35px', height: '35px' }} />
                      )}
                    </div>
                  </td>
                  <td>
                    <Link to={'/rtview/' + u.uid}>
                    <button className="btn-edit" style={buttonStyle}>
                    <GrOverview />
                    </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          {/* )} */}
        </table>
      </div>
    </div>
  );
}

export default RtView
