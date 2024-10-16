import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { TfiRuler } from "react-icons/tfi";
import { IoIosBeaker } from "react-icons/io";
import CalibrationCleaning from "./CalibrationCleaning.jsx";
import { useTranslation } from 'react-i18next';


const CalibrationProcess = ({ currentData }) => {
    //const navigate = useNavigate();
    const { i18n, t } = useTranslation()
    const [errors, setErrors] = useState(null);
    const { setNotification } = useStateContext();
    // const [parameter, setParameter] = useState({
    //     calibration_set: 1,
    //     // mode: 0,
    //     // channel: 0,
    //     // product: 0,
    //     // destination: 0,
    //     obtained_volume: 0,
    //     // $botonClean: 0,
    //     // $cleanMode: 0
    // });
    const { parameter, setParameter } = useStateContext();
    const isCleaningMode = currentData && currentData.clean_enable;

    useEffect(() => {
        if (isCleaningMode !== parameter.clean_mode) {
          // Actualizar el estado solo si hay un cambio en isCleaningMode
          setParameter(prevParameter => ({
            ...prevParameter,
            clean_mode: isCleaningMode
          }));
        }
      }, [isCleaningMode, setParameter]); // Ejecutar el efecto solo cuando cambie isCleaningMode o setParameter
      


    const isTimeAvailable = currentData && (typeof currentData.time !== 'undefined' && currentData.time !== 0);

    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/calibration", parameter)
            .then(() => {
                setNotification("Calibration Process sent successfully.");
                console.log(parameter);
                setTimeout(() => {
                    onReset(ev);
                }, 1000);

            //    navigate("/calibration");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
        };

        const onReset = (ev) => {
            ev.preventDefault();
            // Verificar si parameter está definido antes de acceder a la propiedad 'obtained_volume'
            if (parameter) {
                setParameter({
                    ...parameter,
                    obtained_volume: 0
                });
                axiosClient
                    //.post("/calibration", {obtained_volume: 0})
                    .post("/calibration", {
                        ...parameter,
                        obtained_volume: 0,
                    })
                    .then(() => {
                        setNotification("Calibration updated.");
                        console.log(parameter);
                        //    navigate("/calibration");
                    })
                    .catch((err) => {
                        const response = err.response;
                        if (response && response.status === 422) {
                            setErrors(response.data.errors);
                        }
                    });
            }
        };
        
  return (
    <div className="card animated fadeInDown">

                <form onSubmit={onSubmit}>
                {/* <form> */}
                <div className="bg-gray-300">
                    <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2 flex items-center">
                    <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                    <IoIosBeaker fontSize={40} style={{ position: 'absolute', top: '0', left: '0' }} />
                    <TfiRuler fontSize={20} style={{ position: 'absolute', top: '14px', left: '4px', color: 'black'}} />
                    </div>
                        {/* <IoMdBeaker fontSize={40} /> */}
                        {t('process')}
                    </h1>
                    <div className="py-12">
                        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                            <div className="md:flex ">
                                <div className="w-full p-4 px-5 py-5">
                                    <div className="grid md:grid-cols-1 md:gap-2">
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                            {t('currentkf')}
                                            </label>
                                            <input
                                                //value={currentData ? currentData.current_kf : ''} // Si currentData está definido, muestra current_kf, de lo contrario, muestra una cadena vacía
                                                value={currentData ? currentData.current_kf?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : ''} // Agregar una coma después del primer valor si currentData está definido
                                                readOnly
                                                className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder={t('currentkf')}
                                            />

                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                            {t('currentfr')}
                                            </label>
                                            <input
                                                //value={currentData ? currentData.current_flow_rate : ''} // Si currentData está definido, muestra current_kf, de lo contrario, muestra una cadena vacía
                                                value={currentData ? currentData.current_flow_rate?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : ''} // Agregar una coma después del primer valor si currentData está definido
                                                readOnly
                                                className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder={t('currentfr')}
                                            />
                                        </div>

                                    </div>

                                    <div className="grid md:grid-cols-1 md:gap-2">

                                    <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                            {t('time')}
                                            </label>
                                            <input
                                                //value={currentData ? currentData.time : ''} // Si currentData está definido, muestra current_kf, de lo contrario, muestra una cadena vacía
                                                value={currentData ? currentData.time?.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,") : ''} // Agregar una coma después del primer valor si currentData está definido
                                                readOnly
                                                className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder={t('time')}
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                            {t('pulses')}
                                            </label>
                                            <input
                                                value={currentData ? currentData.pulses : ''} // Si currentData está definido, muestra current_kf, de lo contrario, muestra una cadena vacía
                                                readOnly
                                                className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder={t('pulses')}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                            {t('estvolume')}
                                            </label>
                                            <input
                                                value={currentData ? currentData.est_volume : ''} // Si currentData está definido, muestra current_kf, de lo contrario, muestra una cadena vacía
                                                readOnly
                                                className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder={t('estvolume')}
                                            />
                                        </div>                                
                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                            {t('obvolume')}
                                            </label>
                                            <input
                                                type="number" // Solo admite valores numéricos
                                                min="1" max="30000"
                                                inputMode="numeric" // Permite la entrada numérica manual
                                                value={parameter.obtained_volume}
                                                onChange={(ev) =>
                                                    setParameter({
                                                        ...parameter,
                                                        obtained_volume: ev.target
                                                            .value,
                                                    })
                                                }
                                                readOnly={!isTimeAvailable}  // Hace que el input sea de solo lectura si no es modo de limpieza
                                                className={`border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${isTimeAvailable ? '' : 'bg-gray-300'}`}
                                                placeholder={t('obvolume')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex justify-between items-center">
                {/* <button class="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Confirm
                </button> */}
                {isTimeAvailable ? (
                            <button
                                className="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {t('confirm')}
                            </button>
                        ) : (
                            <button
                                className="text-gray-500 cursor-not-allowed bg-gray-300 font-medium text-sm px-5 py-2.5 text-center"
                                disabled
                            >
                                {t('confirm')}
                            </button>
                )}
                </div>
            </form>
        {/* {isCleaningMode && currentData && <CalibrationCleaning progressData={currentData.progress} parameterSub={parameter}/>} */}
        {isCleaningMode && currentData ? (
            <CalibrationCleaning progressData={currentData.progress} parameterSub={parameter}/>
        ) : null}

    </div>
  )
}

export default CalibrationProcess
