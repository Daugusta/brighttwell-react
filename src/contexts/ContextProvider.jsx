import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    parameter: {
        calibration_set: 1,
        mode: 0,
        channel: 0,
        product: 0,
        destination: 0,
        obtained_volume: 0,
        boton_clean: 0,
        clean_mode: 0
   },
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setParameter: () => {},
    setMetricUnits: () => {}
});

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');
    const [parameter, _setParameter] = useState({
        calibration_set: 1,
        mode: 0,
        channel: 0,
        product: 0,
        destination: ' ',
        obtained_volume: 0,
        boton_clean: 0,
        clean_mode: 0,
    });
    const [metricUnits, setMetricUnits] = useState(0);

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        } else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    } 

    const setNotification = message => {
        _setNotification(message);
    
        setTimeout(() => {
          _setNotification('')
        }, 5000)
    }

    const setParameter = (param) => {
        _setParameter(param);
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification,
            parameter,
            setParameter,
            metricUnits, // Agregar los literales unidades metricas
            setMetricUnits // Función para actualizar las unidades metricas
        }}>{children}</StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
