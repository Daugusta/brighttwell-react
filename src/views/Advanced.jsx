import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import Switch from "react-switch";
import { IoIosSave } from "react-icons/io";
import { MdWifiPassword } from "react-icons/md";
import { BsEthernet } from "react-icons/bs";
import { MdOutlineWifiOff } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { VscSettings } from "react-icons/vsc";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from "../constants/index";


export default function Advanced() {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation()
    const { setNotification, metricUnits, setMetricUnits } = useStateContext();
    const [message, setMessage] = useState(null)


    const [networks, setNetworks] = useState([]);
    // test nueva funcionalidad
    const [internetStatus, setInternetStatus] = useState(false);
    const [connectedSsid, setConnectedSsid] = useState('None');
    const [connectionType, setConnectionType] = useState(2);
    const [interfaces, setInterfaces] = useState({});
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //----------------------------------------------------
    const [connect, setConnect] = useState({ ssid: '', password: '', active_network: 0 });
    //const [connect, setConnect] = useState({ ssid: '', password: '', active_network: 0 });
    // const [connect, setconnect] = useState([]);
    const [versionInfo, setVersionInfo] = useState([]);
    // const [versionInfo, setVersionInfo] = useState({
    //     DB_Version1: '',
    //     DB_Version2: '',
    //     Software_Version1: '',
    //     Software_Version2: ''
    // });

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [intf, setIntf] = useState(false);
    //const { setNotification } = useStateContext();
  
    // Ejecuta getNetworks cada 5 segundos
    useEffect(() => {
        getNetworks(); // Ejecuta la función inmediatamente cuando el componente se monta

        const intervalId = setInterval(() => {
            getNetworks(); // Ejecuta la función cada 5 segundos
        }, 8000); // 8000 milisegundos = 8 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    }, []);


    useEffect(() => {
        getInterface();
        getUnits();
        getVersionInfo();
      }, [])

    const getNetworks = () => {
    
        axiosClient.get('/networks')
          .then(({ data }) => {
            setLoading(false)
          console.log(data)

            const { networks , internetStatus , connectedSsid, connectionType } = data;

            // Actualiza los estados correspondientes
            setNetworks(networks);
            setInternetStatus(internetStatus);
            setConnectedSsid(connectedSsid);
            setConnectionType(connectionType);

            // Determina el estado del interruptor en función de si el SSID está vacío o no
            // setConnect(prevConnect => ({
            //     ...prevConnect,
            //     active_network: networks.length > 0 ? 1 : 0  // Si SSID tiene un valor, active_network es 1 (activo), de lo contrario 0 (apagado)
            // }));

          })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 401) {
              window.location = '/login';
            }
          })
      }

      const getInterface = () => {
        setIntf(true)
        axiosClient.get('/networks')
          .then(({ data }) => {
            setIntf(false)
          console.log(data)

            //setNetworks(data); <-- se comenta para desestructurar el json

            // Desestructura la respuesta JSON para obtener los campos
            const { networks, internetStatus, connectedSsid, connectionType } = data;

            // Actualiza los estados correspondientes
            //setNetworks(networks);
            //setInternetStatus(internetStatus);
            const initialSsid = networks.length > 0 ? networks[0].ssid : '';
            // Determina el estado del interruptor en función de si el SSID está vacío o no
            setConnect(prevConnect => ({
                ...prevConnect,
                ssid: initialSsid,
                active_network: connectedSsid && connectionType === 1 ? 1 : 0
                //active_network: connectedSsid ? 1 : 0

            }));

          })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 401) {
              window.location = '/login';
            }
          })
      }

      const getUnits = () => {
    
        axiosClient.get('/metricunit')
          .then(({ data }) => {
            setLoading(false)
          console.log("Metric Unit ",data)

          setMetricUnits(data);
          })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 401) {
              window.location = '/login';
            }
          })
      }

    const getVersionInfo = () => {
    
        axiosClient.get('/versioninfo')
          .then(({ data }) => {
            setLoading(false)
          console.log(data)

          setVersionInfo(data);
          setInterfaces(data.interfaces);

          })
          .catch((err) => {
            const response = err.response;
            if (response && response.status === 401) {
              window.location = '/login';
            }
          })
      }
    //-----------------------------------------------

    //   const updateConnect = (property, value) => {
    //     setConnect(prevConnect => ({
    //       ...prevConnect,
    //       [property]: value
    //     }));

    //       // Verifica si es el campo de contraseña o confirmación de contraseña
    //     if (field === 'password') {
    //         setPassword(value);
    //     }
    //     if (field === 'confirmPassword') {
    //         setConfirmPassword(value);
    //     }
    //   };

      const onChangeLang = (e) => {
        const lang_code = e.target.value
        i18n.changeLanguage(lang_code)
    
        }

    const handlePasswordSubmit = (ev) => {
        ev.preventDefault();
        setMessage(null)
        // Verificar que las contraseñas coincidan
        if (connect.password !== connect.confirmPassword) {
            // Mostrar notificación de error
            setMessage("Password do not Match");
            // Cambiar el estilo del campo password para mostrar un error
            return;  // Salir de la función sin enviar los datos
        }

        connect.active_network = 1;
        setNotification("Change Applied");
        axiosClient
            .post("/networks", {
                ssid: connect.ssid,
                password: connect.password
            })
            .then(() => {
                setNotification(`${t('genericupdate')}`);
                navigate("/advanced");
                console.log("Network Set just");
                console.log(connect);
            })
            .catch((err) => {
                console.error("ERROR:", err);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
                if (response && response.status === 401) {
                    window.location = '/login';
                }
            });
    };
    
    const handleNetworkToggle = (checked) => {

        //const activeNetworkStatus = checked ? 0 : 1;
        const activeNetworkStatus = checked ? 1 : 0;
        setConnect((prevState) => ({
            ...prevState,
            active_network: activeNetworkStatus,
            //active_network: checked ? 1 : 0,
        }));
        setNotification("Change Applied");
        axiosClient
            //.post("/networks", { active_network: checked ? 1 : 0 })
            .post("/networks", { active_network: activeNetworkStatus })
            .then(() => {
                setNotification("Network status updated");
                console.log("Active Network");
                console.log("Active Network Status sent:", activeNetworkStatus);
            })
            .catch((err) => {
                console.error("ERROR:", err);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
                if (response && response.status === 401) {
                    window.location = '/login';
                }
            });
    };
    
    const handleMetricUnitsChange = (event) => {
        //setMetricUnits(event.target.value);
        const selectedUnit = event.target.value;
        setMetricUnits(selectedUnit);
        axiosClient
        .post("/metricunit",  { unitSystem: selectedUnit })
        .then(() => {
            setNotification(`${t('genericupdate')}`);
            navigate("/advanced");
            console.log("Metric Set alone");
            console.log(selectedUnit);
        })
        .catch((err) => {
            console.error("ERROR:", err);
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
            if (response && response.status === 401) {
                window.location = '/login';
              }
        });
    };

    const onSubmit = (ev) => {
        ev.preventDefault();

        axiosClient
            .post("/networks", connect)
            .then(() => {
                setNotification(`${t('genericupdate')}`);
                navigate("/advanced");
                console.log("Network Set");
                console.log(connect);
            })
            .catch((err) => {
                console.error("ERROR:", err);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
                if (response && response.status === 401) {
                    window.location = '/login';
                  }
            });


            axiosClient
            .post("/metricunit",  { unitSystem: metricUnits })
            .then(() => {
                setNotification(`${t('genericupdate')}`);
                navigate("/advanced");
                console.log("Metric Set");
                console.log(metricUnits);
            })
            .catch((err) => {
                console.error("ERROR:", err);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
                if (response && response.status === 401) {
                    window.location = '/login';
                  }
            });
    };

    const [isProcessAccordionOpen, setProcessAccordionOpen] = useState(true);
    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const [isVersionAccordionOpen, setVersionAccordionOpen] = useState(false);

    const toggleProcessAccordion = () => {
        setProcessAccordionOpen(!isProcessAccordionOpen);
    };
    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    const toggleVersionAccordion = () => {
        setVersionAccordionOpen(!isVersionAccordionOpen);
    };

    return (
        <>
            <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('advanced')}</h1>
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
                     
                        <div className="bg-gray-300">
                            <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2 flex items-center">
                                <GrConfigure fontSize={40} />
                            </h1>
                            <div className="py-12">

                                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl my-4 mx-2">
                                    <h1
                                        onClick={toggleProcessAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >

                                    {/* <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    {internetStatus ? (
                                        <MdWifiPassword fontSize={40} color="#90ee90" />  // Verde claro si está conectado
                                    ) : (
                                        <MdOutlineWifiOff fontSize={40} color="#d3d3d3" />  // Gris claro si no está conectado
                                    )}

                                    </div>
                                    {connectedSsid} */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        {internetStatus ? (
                                            connectionType === 1 ? (
                                                <MdWifiPassword fontSize={40} color="#90ee90" />  // Verde claro si está conectado por Wi-Fi
                                            ) : (
                                                <BsEthernet fontSize={40} color="##90ee90" />  // Azul claro si está conectado por cable Ethernet
                                            )
                                        ) : (
                                            <MdOutlineWifiOff fontSize={40} color="#d3d3d3" />  // Gris claro si no hay conexión
                                        )}
                                        {/* Puedes mostrar el SSID si estás conectado por Wi-Fi */}
                                        {connectionType === 1 && (
                                            <label className="text-white text-md  mb-2">
                                                {connectedSsid}
                                            </label>
                                        )}
                                    </div>                                    
                                        
                                    <span
                                        className={`ml-2 transition-transform transform ${
                                            isProcessAccordionOpen
                                                ? "rotate-180"
                                                : ""
                                        }`}
                                    >
                                        ▼
                                    </span>
                                    </h1>
                                    <div
                                        style={{
                                            maxHeight: isProcessAccordionOpen
                                                ? "500px"
                                                : "0",
                                            overflow: "hidden",
                                        }}
                                        className="md:flex transition-max-height duration-300"
                                    >
                                        
                                        <div className="w-full p-4 px-5 py-5">
                                        {message &&
                                        <div className="alert">
                                        <p>{message}</p>
                                        </div>
                                        }
                                            <div className="grid md:grid-cols-2 md:gap-2">
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        WIFI Active
                                                        </label>
                                                        {/* <Switch
                                                        onChange={(checked) =>
                                                            setConnect({
                                                                ...connect,
                                                                active_network:
                                                                    checked
                                                                        ? 1
                                                                        : 0,
                                                            })
                                                        }
                                                        checked={
                                                            connect.active_network ===
                                                            1
                                                        }
                                                        height={20}
                                                        width={40}
                                                        className="react-switch"
                                                        id="loadSelector"
                                                        />  */}
                                                        <Switch
                                                            onChange={handleNetworkToggle}
                                                            checked={connect.active_network === 1}
                                                            height={20}
                                                            width={40}
                                                            className="react-switch"
                                                            id="loadSelector"
                                                        />
                                                         <label className=" text-gray-700 ml-2 text-sm  mb-2">
                                                         {intf ? 'loading...' : 'Current Status'}
                                                        </label> 

                                                    </div>
                                                </div>

                                            <div className="grid md:grid-cols-2 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('networkid')}
                                                    </label>
                                                <select 
                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                //onChange={(ev) => updateConnect('ssid', ev.target.value)}
                                                onChange={(ev) => setConnect({ ...connect, ssid: ev.target.value })}
                                                value={connect.ssid} 
                                                >
                                                {Array.isArray(networks) && networks.map((network, index) => (
                                                    <option key={index} value={network.ssid}>{network.ssid}</option>
                                                ))}
                                                </select>


                                                </div>
                                                {/* <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {t('networkid')}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        onChange={(ev) => updateConnect('ssid', ev.target.value)}
                                                        value={connect.ssid} 
                                                    />
                                                </div> */}

                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('password')}
                                                    </label>

                                                <input
                                                //onChange={(ev) => updateConnect('password', ev.target.value)}
                                                onChange={(ev) => setConnect({ ...connect, password: ev.target.value })}
                                                type="password"
                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                placeholder={t('password')}
                                                />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 md:gap-2">
                                                <div className="mb-4">



                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {/* {t('password')} */}
                                                    Confirm Password
                                                    </label>

                                                <input
                                                //onChange={(ev) => updateConnect('confirmPassword', ev.target.value)}
                                                onChange={(ev) => setConnect({ ...connect, confirmPassword: ev.target.value })}
                                                type="password"
                                                className={`border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm ${
                                                    password !== confirmPassword && confirmPassword !== '' ? 'bg-orange-200' : 'focus:border-green-200'
                                                }`}
                                                placeholder="Confirm Password"
                                                />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-1 md:gap-1">
                                            </div>
                                            <button
                                            type="button" // Cambiado a "button" para evitar el submit
                                            onClick={handlePasswordSubmit} 
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Set NetWork
                                        </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl my-4 mx-2">
                                    <h1
                                        onClick={toggleAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >
                                        <VscSettings fontSize={40} />
                                        {t('parameters')}
                                        <span
                                            className={`ml-2 transition-transform transform ${
                                                isAccordionOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    </h1>
                                    <div
                                        style={{
                                            maxHeight: isAccordionOpen
                                                ? "500px"
                                                : "0",
                                            overflow: "hidden",
                                        }}
                                        className="md:flex transition-max-height duration-300"
                                    >
                                        
                                        <div className="w-full p-4 px-5 py-5">

                                            <div className="grid md:grid-cols-2 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('metricunit')}
                                                    </label>
                                                {/* <select 
                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                onChange={(ev) => setconnect({ 
                                                    //...connect, 
                                                    ssid: ev.target.value })}
                                                >
                                                {Array.isArray(networks) && networks.map((network, index) => (
                                                    <option key={index} value={network.ssid}>{network.ssid}</option>
                                                ))}
                                                </select> */}
                                                <select 
                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                onChange={handleMetricUnitsChange}
                                                value={metricUnits}
                                                >
                                                        <option value="0">
                                                        {t('metric')}
                                                        </option>
                                                        <option value="1">
                                                        {t('imperial')}
                                                        </option>
                                                </select>


                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('language')}
                                                    </label>
                                                    {/* <input
                                                        onChange={(ev) =>
                                                            setconnect({
                                                                //...connect,
                                                                password:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        type="password"
                                                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="password*"
                                                    /> */}
                                                <select 
                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                defaultValue={i18n.language} onChange={onChangeLang}  >
                                                {LANGUAGES.map(({ code, label }) => (
                                                  <option key={code} value={code}>
                                                    {label}
                                                  </option>
                                                ))}
                                                </select>

                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-1 md:gap-1">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl my-4 mx-2">
                                    <h1
                                        onClick={toggleVersionAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >
                                        <IoInformationCircleOutline fontSize={40} />
                                        Version Info
                                        <span
                                            className={`ml-2 transition-transform transform ${
                                                isVersionAccordionOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    </h1>
                                    <div
                                        style={{
                                            maxHeight: isVersionAccordionOpen
                                                ? "500px"
                                                : "0",
                                            overflow: "hidden",
                                        }}
                                        className="md:flex transition-max-height duration-300"
                                    >
                                        
                                        <div className="w-full p-4 px-5 py-5">

                                            <div className="grid md:grid-cols-1 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    DataBase Version : 
                                                    </label>
                                                    <p className="text-center">{versionInfo.DB_Version1}.{versionInfo.DB_Version2}</p>,
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    SoftWare  Version : 
                                                    </label>
                                                    <p className="text-center">{versionInfo.Software_Version1}.{versionInfo.Software_Version2}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Serial Number : 
                                                    </label>
                                                    <p className="text-center">{versionInfo.serial_number}</p>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Network Conf : 
                                                    </label>
                                                    {/* <p className="text-center">{versionInfo.interfaces}</p> */}
                                                    {/* {interfaces && Object.entries(interfaces).map(([name, details]) => (
                                                        <div key={name}>
                                                            <h3>{name}</h3>
                                                            <p>IP Address: {details?.ip_address || 'N/A'}</p>
                                                            <p>Netmask: {details?.netmask || 'N/A'}</p>
                                                            <p>Broadcast: {details?.broadcast || 'N/A'}</p>
                                                            <p>MAC Address: {details?.mac_address || 'N/A'}</p>
                                                        </div>
                                                    ))} */}
                                                    <div className="overflow-y-auto max-h-56 bg-gray-100 p-4 rounded">
                                                        <pre className="whitespace-pre-wrap">
                                                        <code>
                                                            {JSON.stringify(interfaces, null, 2)}
                                                        </code>
                                                        </pre>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="mt-5 flex justify-between items-center">

                        <button className="btn-add">
                        {/* <IoIosSave fontSize={24} onSubmit={onSubmit} /> */}
                        <IoIosSave fontSize={24} />
                        </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
}
