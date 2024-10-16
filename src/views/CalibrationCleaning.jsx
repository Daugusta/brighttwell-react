import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { BsDroplet } from "react-icons/bs";
import ProgressBar from "./ProgressBar.jsx";
import { useTranslation } from 'react-i18next';

const CalibrationCleaning = ({ progressData, parameterSub }) => {
    //const navigate = useNavigate();
    const { i18n, t } = useTranslation()
    const { parameter, setParameter } = useStateContext();
    // const [parameter, setParameter] = useState({
    //     ...parameterSub,
    //     calibration_set: 1,
    //     // mode: 1,
    //     // channel: 5,
    //     // product: 0,
    //     // destination: 0,
    //     //obtained_volume: 0,
    //     boton_clean: 0,
    //     clean_mode: 1
    // });

    //const { parameter, setParameter } = useStateContext();
    //const { parameter, setParameter, setNotification } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [progressValue, setProgressValue] = useState(50);

    const toggleCleaning = () => {
        setParameter((prevParameter) => ({
          ...prevParameter,
          boton_clean: prevParameter.boton_clean === 0 ? 1 : 0,
          clean_mode:  1,
        }));
      };

    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/calibration", parameter)
            .then(() => {
                setNotification(`${t('ccalibration')}`);
                //navigate("/calibration");
                console.log(parameter);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
        };

  return (
    <div className="card animated fadeInDown">
        {loading && <div className="text-center">{t('loading')}</div>}
        {errors && (
            <div className="alert">
                {Object.keys(errors).map((key) => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>
        )}
        {!loading && (
            <form onSubmit={onSubmit}>
            {/* <form> */}
                <div className="bg-gray-300">
                    <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2 flex items-center">
                        <BsDroplet fontSize={40} />
                        {t('cleaning')}
                    </h1>
                    <div className="py-12">
                        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                            <div className="md:flex ">
                                <div className="w-full p-4 px-5 py-5">
                                    <div className="grid md:grid-cols-1 md:gap-2">

                                        <div className="mb-4">
                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                            {t('progress')}
                                            </label>
                                            <ProgressBar progressValue={progressData} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex justify-between items-center">
                {/* <button class="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Start Cleaning
                </button> */}
                 <div>
                    <button
                        className={`text-white ${
                        parameter.boton_clean === 1 ? "bg-red-500" : "bg-primary"
                        } hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                        onClick={toggleCleaning}
                    >
                        {parameter.boton_clean === 1 ? "Stop Cleaning" : "Start Cleaning"}
                    </button>
                    </div>
                </div>
                <button
  onClick={() => {
    setParameter({
      ...parameter,
      obtained_volume: 0,
      boton_clean: 0,
      clean_mode: 0
    });
  }}
  disabled={progressData !== 100} // Deshabilitar el botón cuando progressData es igual a 100
  className={`text-white mt-2 px-5 py-2.5 text-center font-medium text-sm focus:outline-none ${progressData !== 100 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300'}`}
>
{t('close')}
</button>

            </form>
            
            
        )}
    </div>
    )
}

export default CalibrationCleaning
