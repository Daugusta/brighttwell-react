import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import CalibrationProcess from "./CalibrationProcess.jsx";
import CalibrationParameters from "./CalibrationParameters.jsx";
import axiosClient from "../axios-client.js";
import { useTranslation } from 'react-i18next';

export default function Calibration() {
    const { i18n, t } = useTranslation()
    const [available, setAvailable] = useState(0);
    const [currentData, setCurrentData] = useState(null);
    const [calibrationSetSent, setCalibrationSetSent] = useState(false); // Nuevo estado para controlar si el valor de calibration_set ya se ha enviado
    const navigate = useNavigate();
    const { parameter, setParameter, setNotification } = useStateContext();
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await axiosClient.get("/calibration");
                setCurrentData(response.data);
                const availableValue = response.data.available;
                console.log("ejecucion");
                setAvailable(availableValue);

                // if (!calibrationSetSent && availableValue === 0) {
                //     await axiosClient.post("/calibration", { calibration_set: 1 });
                //     setCalibrationSetSent(true); // Establecer el estado para indicar que ya se ha enviado el valor de calibration_set
                // }
                if (!calibrationSetSent && availableValue === 0) {
                    // Solo realiza la solicitud si el componente está montado
                    if (isMounted) {
                        await axiosClient.post("/calibration", { calibration_set: 1 });
                        setCalibrationSetSent(true); // Establecer el estado para indicar que ya se ha enviado el valor de calibration_set
                    }
                }
                

            } catch (error) {
                console.error("ERROR:", error);
                console.log("STATUS")
                console.log(response.status)
                const response = error.response;

                if (response && response.status === 401) {
                    //window.location = '/login';
                    // Solo realiza la solicitud si el componente está montado
                    if (isMounted) {
                        // Realizar el POST para establecer calibration_set en 0
                        await axiosClient.post("/calibration", { calibration_set: 0 });
                        // Redirigir a la pantalla de inicio de sesión
                        window.location = '/login';
                    }
                    window.location = '/login';
                }
            }
        };

        // Ejecutar fetchData inicialmente
        fetchData();

        // Establecer un intervalo para realizar la solicitud GET cada 3 segundos
        const interval = setInterval(fetchData, 1000);

        // Limpiar el intervalo al desmontar el componente
        return () => {
            clearInterval(interval);
            isMounted = false;
            // Realizar el POST al salir de la pantalla de calibración si el valor de calibration_set se ha enviado previamente
            if (calibrationSetSent) {
                axiosClient.post("/calibration", { calibration_set: 0 });
            }
            setParameter({
                ...parameter,
                mode: 0,
                channel: 0,
                product: 0,
                destination: 0,
                obtained_volume: 0,
                boton_clean: 0,
                clean_mode: 0
              });
        };
    }, [calibrationSetSent]); // Agregar calibrationSetSent como dependencia para que se ejecute el efecto cuando cambie su valor

    return (
        <div>
            {available === 0 ? (
                <>
                    <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('calibration')}</h1>
                    <CalibrationParameters />
                    <CalibrationProcess currentData={currentData} />
                </>
            ) : (
                <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('nacalibration')}</h1>
            )}
        </div>
    );
}


