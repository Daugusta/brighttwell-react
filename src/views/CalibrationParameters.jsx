// import React from 'react'
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axiosClient from "../axios-client.js";
// import { useStateContext } from "../contexts/ContextProvider.jsx";
// import { SlEqualizer } from "react-icons/sl";

// const CalibrationParameters = () => {

//     //const navigate = useNavigate();

//     const [parameter, setParameter] = useState({
//         calibration_set: 1,
//         mode: 0,
//         channel: 0,
//         product: 0,
//         destination: 0,
//         // obtained_volume: 0,
//         // $botonClean: 0,
//         // $cleanMode: 0
//     });
//     const [errors, setErrors] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const { setNotification } = useStateContext();
//     const [washers, setWashers] = useState([]);
//     const [channels, setChannels] = useState([]);

//     useEffect(() => {
//         getWashers();
//         getChannels();
//       }, [])

//     const getWashers = () => {
    
//         setLoading(true)
//         axiosClient.get('/washers')
//           .then(({ data }) => {
//             setLoading(false)
//             setWashers(data.data);
//           })
//           .catch(() => {
//             setLoading(false)
//           })
//       }

//       const getChannels = () => {
    
//         setLoading(true)
//         axiosClient.get('/channels')
//           .then(({ data }) => {
//             setLoading(false)
//             setChannels(data.data)
//             console.log("objeto completo channel")
//             console.log(data.data)
//           })
//           .catch(() => {
//             setLoading(false)
//           })
//       }

//       const onSubmit = (ev) => {
//         ev.preventDefault();
//         axiosClient
//             .post("/calibration", parameter)
//             .then(() => {
//                 setNotification("Calibration parameters sent successfully.");
//                 //navigate("/calibration");
//                 console.log(parameter);
//             })
//             .catch((err) => {
//                 const response = err.response;
//                 if (response && response.status === 422) {
//                     setErrors(response.data.errors);
//                 }
//             });
//         };

//   return (
//     <div className="card animated fadeInDown">
//     {loading && <div className="text-center">Loading...</div>}
//     {errors && (
//         <div className="alert">
//             {Object.keys(errors).map((key) => (
//                 <p key={key}>{errors[key][0]}</p>
//             ))}
//         </div>
//     )}
//     {!loading && (
//          <form onSubmit={onSubmit}>
//          {/* <form> */}
//             <div class="bg-gray-300">
//                 <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2 flex items-center">
//                     <SlEqualizer fontSize={25} style={{ marginRight: '8px' }} />
//                     Parameters
//                 </h1>
//                 <div class="py-12">
//                     <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
//                         <div class="md:flex ">
//                             <div class="w-full p-4 px-5 py-5">
//                                 <div class="grid md:grid-cols-1 md:gap-2">
//                                     <div className="mb-4">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                                             Mode
//                                         </label>
//                                         <select
//                                                     value={parameter.mode}
//                                                     onChange={(ev) => setParameter({ ...parameter, mode: ev.target.value })}
                                    
//                                             className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
//                                         >
//                                             <option value="0">Water</option>
//                                             <option value="1">Product</option>
//                                         </select>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                                             Channel
//                                         </label>
//                                         {/* <select
//                                          value={parameter.channel}
//                                          onChange={(ev) => setParameter({ ...parameter, channel: ev.target.value })}
//                                             className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
//                                         >
//                                             {channels.map((channel) => (
//                                                 <option key={channel.num} value={channel.num}>
//                                                     {channel.num}
//                                                 </option>
//                                             ))}
//                                         </select> */}
//                                         <select
//                                             value={parameter.channel}
//                                             onChange={(ev) => setParameter({ ...parameter, channel: ev.target.value })}
//                                             className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
//                                         >
//                                             {channels.map((channel) => (
//                                                 <option key={channel.num} value={channel.num}>
//                                                     {channel.num}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>

//                                 </div>

//                                 <div class="grid md:grid-cols-1 md:gap-2">
//                                     {parameter.mode === '1' ? (
//                                         <div className="mb-4">
//                                             <label className="block text-gray-700 text-sm font-bold mb-2">
//                                                 Product
//                                             </label>
//                                             <select
//                                             value={parameter.product}
//                                             onChange={(ev) => setParameter({ ...parameter, product: ev.target.value })}
//                                             className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
//                                         >
//                                             {channels
//                                                 .find((channel) => channel.num === parseInt(parameter.channel))
//                                                 ?.products.map((product) => (
//                                                     <option key={product.id} value={product.num}>
//                                                         {product.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                     ) : (
//                                         <div className="mb-4">
//                                             <label className="block text-gray-700 text-sm font-bold mb-2">
//                                                 Product
//                                             </label>
//                                             <select
//                                                 disabled
//                                                 value=""
//                                                 className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm bg-gray-300"
//                                             >
//                                                 <option value="">Select a mode first</option>
//                                             </select>
//                                         </div>
//                                     )}

//                                     <div className="mb-4">
//                                         <label className="block text-gray-700 text-sm font-bold mb-2">
//                                             Destination
//                                         </label>
//                                         <select
//                                             value={parameter.destination}  // Ajusta esto según tus necesidades
//                                             onChange={(ev) => setParameter({ ...parameter, destination: ev.target.value })}
//                                             className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
//                                         >
//                                             {washers.map((washerOption) => (
//                                                 <option key={washerOption.id} value={washerOption.num}>
//                                                     {washerOption.name}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-5 flex justify-between items-center">
//             {/* <button className="btn-delete" onClick={ev => onDeleteClick(u)}><RiDeleteBin5Line fontSize={24}/></button> */}
//             <button class="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
//             Confirm
//             </button>
//             </div>
//         </form>
        
//     )}
// </div>
//   )
// }

// export default CalibrationParameters

//PROBAR---------------------------------------------------------------------------
import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { SlEqualizer } from "react-icons/sl";
import { useTranslation } from 'react-i18next';

const CalibrationParameters = () => {

    // const [parameter, setParameter] = useState({
    //     calibration_set: 1,
    //     mode: 0,
    //     channel: 0,
    //     product: 0,
    //     destination: 0,
    // });
    const { i18n, t } = useTranslation()
    const { parameter, setParameter } = useStateContext();
    //console.log(parameter);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();
    const [washers, setWashers] = useState([]);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const washersResponse = await axiosClient.get('/washers');
            const channelsResponse = await axiosClient.get('/channels');
            setLoading(false);
            setWashers(washersResponse.data.data);
            setChannels(channelsResponse.data.data);
            // Establecer valores iniciales en parameter
            if (washersResponse.data.data.length > 0) {
                setParameter(prevState => ({
                    ...prevState,
                    destination: washersResponse.data.data[0].num // Por ejemplo, establecer el primer washer como valor inicial
                }));
            }
            if (channelsResponse.data.data.length > 0) {
                setParameter(prevState => ({
                    ...prevState,
                    channel: channelsResponse.data.data[0].num // Por ejemplo, establecer el primer canal como valor inicial
                }));
            }
        } catch (error) {
            setLoading(false);
            console.error("Error:", error);
        }
    };

    const isDestinationAvailable = parameter.destination !== null && parameter.destination !== undefined && parameter.destination !== ' ' && parameter.destination !== '';

    const onSubmit = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/calibration", parameter)
            .then(() => {
                setNotification(`${t('sparameters')}`);
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
                    <div className="bg-gray-300">
                        <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2 flex items-center">
                            <SlEqualizer fontSize={25} style={{ marginRight: '8px' }} />
                            {t('parameters')}
                        </h1>
                        <div className="py-12">
                            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                                <div className="md:flex ">
                                    <div className="w-full p-4 px-5 py-5">
                                        <div className="grid md:grid-cols-1 md:gap-2">
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                {t('mode')}
                                                </label>
                                                <select
                                                    value={parameter.mode}
                                                    onChange={(ev) => setParameter({ ...parameter, mode: ev.target.value })}
                                                    className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                >

                                                    <option value="0">{t('water')}</option>
                                                    <option value="1">{t('product')}</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                {t('channel')}
                                                </label>
                                                <select
                                            
                                                    value={parameter.channel}
                                                    onChange={(ev) => setParameter({ ...parameter, channel: ev.target.value })}
                                                    className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                >
                                                     <option value="0">{t('schannel')}</option>
                                                    {channels.map((channel) => (
                                                        <option key={channel.num} value={channel.num}>
                                                            {channel.num}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-1 md:gap-2">
                                            {parameter.mode === '1' ? (
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('product')}
                                                    </label>
                                                    <select
                                                        value={parameter.product}
                                                        onChange={(ev) => setParameter({ ...parameter, product: ev.target.value })}
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        <option value="">{t('sproduct')}</option>
                                                        {channels
                                                            .find((channel) => channel.num === parseInt(parameter.channel))
                                                            ?.products.map((product) => (
                                                                <option key={product.num} value={product.num}>
                                                                    {product.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            ) : (
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('product')}
                                                    </label>
                                                    <select
                                                        disabled
                                                        value=""
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm bg-gray-300"
                                                    >
                                                        <option value="">{t('smode')}</option>
                                                    </select>
                                                </div>
                                            )}

                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                {t('destination')}
                                                </label>
                                                <select
                                                    value={parameter.destination}
                                                    onChange={(ev) => setParameter({ ...parameter, destination: ev.target.value })}
                                                    className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                >
                                                    <option value=" ">{t('sdestination')}</option>
                                                    <option value="0">Vase</option>
                                                    {washers.map((washerOption) => (
                                                        
                                                        <option key={washerOption.num} value={washerOption.num}>
                                                            {washerOption.name}
                                                        </option>
                                                    ))}
                                                    
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                        {/* <button className="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"> */}
                        {/* <button
                            className={`text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${!isDestinationAvailable && 'cursor-not-allowed bg-gray-300'}`}
                            disabled={!isDestinationAvailable}
                        > */}
                        {isDestinationAvailable ? (
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
                        {/* {t('confirm')}
                        </button> */}
                    </div>
                </form>
            )}
        </div>
    );
}

export default CalibrationParameters;
