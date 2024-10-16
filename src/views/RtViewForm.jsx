import { useNavigate, useParams, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import Switch from "react-switch";
import { TbWashMachine } from "react-icons/tb";
import { IoMdRefreshCircle } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import { TbWashDry } from "react-icons/tb";
import { TbWashTemperature1 } from "react-icons/tb";
import { TbWashTemperature2 } from "react-icons/tb";
import { LuTriangle } from "react-icons/lu";
import { TbWash } from "react-icons/tb";
import { TbFlower } from "react-icons/tb";
import { BsQuestionDiamond } from "react-icons/bs";
import { TbWashOff } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { TiArrowBack } from "react-icons/ti";
import { useTranslation } from 'react-i18next';


export default function RtViewForm() {
    const navigate = useNavigate();
    let { uid } = useParams();

    const { i18n, t } = useTranslation()
    const [processStatus, setProcessStatus] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reportDosages, setReportDosages] = useState([]);
    const {metricUnits} = useStateContext()

    useEffect(() => {
        const interval = setInterval(() => {
            if (uid) {
                axiosClient
                    .get(`/rtview/${uid}`)
                    .then(({ data }) => {
                        setProcessStatus(data);
                        console.log("resultado del get RT: ");
                        console.log(data);
                    })
                    .catch((err) => {
                        const response = err.response;
                        if (response && response.status === 401) {
                          // Si hay un error 401, redirige a la página de inicio de sesión
                          window.location = '/login';
                        }
                    });
            }
        }, 1500); // Se ejecutará cada segundo
    
        return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, [uid]);
    

      useEffect(() => {
        const interval = setInterval(() => {
        console.log(uid)
        if (uid) {
          axiosClient
            .get(`/rprocess/${uid}`)
            .then(({ data }) => {
              setReportDosages(data);
              console.log("resultado del get RP: ");
              console.log(data);
            })
            .catch((err) => {
              const response = err.response;
              if (response && response.status === 401) {
                // Si hay un error 401, redirige a la página de inicio de sesión
                window.location = '/login';
              }
            });
        }
    }, 3500); // Se ejecutará cada segundo
         return () => clearInterval(interval); 
      }, [uid]); 


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
    
    const iconSize = 35;

    const [isProcessAccordionOpen, setProcessAccordionOpen] = useState(false);
    const [isSignalFiltersAccordionOpen, setSignalFiltersAccordionOpen] =
        useState(false);
    const toggleProcessAccordion = () => {
        setProcessAccordionOpen(!isProcessAccordionOpen);
    };

    const toggleSignalFiltersAccordion = () => {
        setSignalFiltersAccordionOpen(!isSignalFiltersAccordionOpen);
    };

    processStatus.formula_end_bit = 0
    
    processStatus.washer_pause_bit = 0
    
    processStatus.comm_error_bit = 0

    return (
        <>
            {processStatus.uid && <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('wstatusdet')}</h1>}
            {!processStatus.uid && <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('nostatus')}</h1>}
            <div className="card animated fadeInDown">
                {/*loading && <div className="text-center">Loading...</div>*/}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {/* {!loading && ( 
                    //  <form onSubmit={onSubmit}>*/}
                    <form>
                        <div className="bg-gray-300">
                            <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2 flex items-center">
                                <TbWashMachine fontSize={40} />
                                {processStatus.washer_uid} {' '}
                                {processStatus.washer_name}
                            </h1>
                            <div className="py-12">
                            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                <div className="md:flex ">

                {/* <div className="w-full md:w-1/3 sm:w-3/3 h-auto object-contain mt-10">
                 <GiWashingMachine fontSize={200} style={{ color: 'green' }} />
                </div> */}
                    <div className="w-full md:w-1/3 sm:w-3/3 h-auto object-contain mt-10">
                    <GiWashingMachine
                        fontSize={200}
                        // style={{
                        // color: processStatus.formula_end_bit === 1
                        //     ? 'darkgreen'
                        //     : processStatus.washer_pause_bit === 1
                        //     ? 'rgb(255, 200, 0)'
                        //     : processStatus.comm_error_bit === 1
                        //         ? 'rgb(220, 20, 60)'
                        //         : 'rgb(117, 224, 38)'
                        // }}
                        style={{
                            color: processStatus.formula_end_bit === 1
                                ? 'darkgreen'
                                : processStatus.washer_pause_bit === 1
                                    ? 'rgb(255, 200, 0)'
                                    : processStatus.comm_error_bit === 1
                                        ? 'rgb(220, 20, 60)'
                                        : processStatus === null
                                            ? 'grey' // Color gris si processStatus es null
                                            : 'rgb(117, 224, 38)'
                        }}
                        
                    />
                    </div>

                    <div className="w-full p-4 px-5 py-5">
                    <div className="grid md:grid-cols-2 md:gap-2">
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t('formulanumber')}
                    </label>
                    <input
                        value={processStatus.
                            formula_uid}
                        readOnly
                        className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                        placeholder={t('formulanumber')}
                    />

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t('formulaname')}
                    </label>
                    <input
                        value={processStatus.
                            formula_name}
                        readOnly
                        className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                        placeholder={t('formulaname')}
                    />

                </div>
    </div>
        <div className="grid md:grid-cols-3 md:gap-2">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                {metricUnits == 1 ? "lbs" : "KG"}
                </label>
                <input
                    value={processStatus.washer_real_weight}
                    readOnly
                    className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder="Formula"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('phase1')}
                </label>
                <input
                    value={processStatus.formula_phase_num}
                    readOnly
                    className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder={t('phase1')}
                />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            {t('customer')}
                </label>
                <input
                    value={processStatus.washer_customer}
                    readOnly
                    className="border rounded h-10 w-full bg-gray-200 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                    placeholder={t('customer')}
                />
            </div>
        </div>

        <div className="grid md:grid-cols-1 md:gap-2">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('phasestatus')}
                </label>
                                        <div className="flex space-x-0">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((bit, index) => (
                            <div
                            key={index}
                            className={`px-1 mt-2 border border-gray-300 focus:outline-none ${
                                processStatus.formula_pbits_expected & (1 << index) ? 'bg-gray-200' : ''
                            } ${processStatus.formula_pbits_received & (1 << index) ? 'bg-green-200' : ''}`}
                            >
                            {processStatus.formula_pbits_expected & (1 << index) ? (
                                // Si el bit está activo, muestra el icono TbWashPress
                                renderIconByPhaseType(processStatus.phase_type_active[index], 35)
                            ) : (
                                // Si el bit está inactivo, muestra el icono TbWashDry
                                <TbWashDry fontSize={iconSize} />
                            )}
                            </div>
                        ))}

                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                                <div className="max-w-bg mx-auto bg-white shadow-lg rounded-lg md:max-w-bg my-4 mx-2 md:mx-2.5">
                                    <h1
                                        onClick={toggleProcessAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >
                                        {t('latestdosage')}
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
                                            {/* Contenido del acordeón */}
                                            <table>
                                                <thead>
                                                    <tr>
                                                    <th>{t('dateandtime')}</th>
                                                    <th>{t('cycle')}</th>
                                                    <th>{t('formulanum')}</th>
                                                    <th>{t('formulaname')}</th>
                                                    <th>{t('phase1')}</th>
                                                    <th>{t('product')}</th>
                                                    <th>{t('dose')}</th>
                                                    <th>{t('estvol')}</th>
                                                    <th>{t('realvol')}</th>
                                                    <th>{t('esttim')}</th>
                                                    <th>{t('realtim')}</th>
                                                    </tr>
                                                </thead>
                                                        <tbody>

                                                            {reportDosages && reportDosages.data && Array.isArray(reportDosages.data) && (
                                                                reportDosages.data.map(report => (
                                                                    // <tr key={report.uid}>
                                                                    //     <td>{report.dosage_time}</td>
                                                                    //     <td>{report.process}</td>
                                                                    //     <td>{report.process_formula_num}</td>
                                                                    //     <td>{report.process_formula_name}</td>
                                                                    //     <td>{report.process_phase}</td>
                                                                    //     <td>{report.product_name}</td>
                                                                    //     <td>{report.dose}</td>
                                                                    //     <td>{report.vol_estimated}</td>
                                                                    //     <td>{report.vol_measured}</td>
                                                                    //     <td>{report.time_estimated}</td>
                                                                    //     <td>{report.time_measured}</td>
                                                                    // </tr>
                                                                    <tr key={report.uid} className={report.dosage_result === 11 ? 'text-red-500' : ''}>
                                                                    <td>{report.dosage_time}</td>
                                                                    <td>{report.process}</td>
                                                                    <td>{report.process_formula_num}</td>
                                                                    <td>{report.process_formula_name}</td>
                                                                    <td>{report.process_phase}</td>
                                                                    <td>{report.product_name}</td>
                                                                    <td>{report.dose}</td>
                                                                    <td>{report.vol_estimated}</td>
                                                                    <td>{report.vol_measured}</td>
                                                                    <td>{report.time_estimated}</td>
                                                                    <td>{report.time_measured}</td>
                                                                </tr>
                                                                ))
                                                            )}

                                                        </tbody>

                                                {/* )} */}
                                                </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-bg mx-auto bg-white shadow-lg rounded-lg md:max-w-bg my-4 mx-2 md:mx-2.5">
                                    <h1
                                        onClick={toggleSignalFiltersAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >
                                        {t('latestalarms')}
                                        <span
                                            className={`ml-2 transition-transform transform ${
                                                isSignalFiltersAccordionOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    </h1>
                                    <div
                                        style={{
                                            maxHeight:
                                                isSignalFiltersAccordionOpen
                                                    ? "500px"
                                                    : "0",
                                            overflow: "hidden",
                                        }}
                                        className="md:flex transition-max-height duration-300"
                                    >
                                        <div className="w-full p-4 px-5 py-5">
                                        <table>
                                                <thead>
                                                    <tr>
                                                    <th>{t('dateandtime')}</th>
                                                    <th>{t('cycle')}</th>
                                                    <th>{t('formulanum')}</th>
                                                    <th>{t('formulaname')}</th>
                                                    <th>{t('phase1')}</th>
                                                    <th>{t('channel')}</th>
                                                    <th>{t('product')}</th>
                                                    <th>{t('dose')}</th>
                                                    <th>{t('estvol')}</th>
                                                    <th>{t('realvol')}</th>
                                                    <th>{t('esttim')}</th>
                                                    <th>{t('realtim')}</th>
                                                    </tr>
                                                </thead>
                                                {/* {loading && (
                                                    <tbody>
                                                    <tr>
                                                        <td colSpan="5" className="text-center">
                                                        Loading...
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                )} */}
                                                {/*{!loading && (*/ }
                                                <tbody>
                                                {reportDosages && reportDosages.data2 && reportDosages.data2.map(report => (
                                                    <tr key={report.uid}>
                                                        <td>{report.dosage_time}</td>
                                                        <td>{report.process}</td>
                                                        <td>{report.process_formula_num}</td>
                                                        <td>{report.process_formula_name}</td>
                                                        <td>{report.process_phase}</td>
                                                        <td>{report.channel_num}</td>
                                                        <td>{report.product_name}</td>
                                                        <td>{report.dose}</td>
                                                        <td>{report.vol_estimated}</td>
                                                        <td>{report.vol_measured}</td>
                                                        <td>{report.time_estimated}</td>
                                                        <td>{report.time_measured}</td>
                                                        <td>{report.Alarm}</td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                                {/* )} */}
                                                </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="mt-5 flex justify-between items-center">
        
                        <button className="btn-add">
                        <IoMdRefreshCircle fontSize={40} />
                        </button>
                        </div> */}
                    </form>
            </div>
            <div className="float float-right">
                <Link to="/rtview">
                    <button className="btn-add" >
                        <TiArrowBack fontSize={24}/>
                    </button>
                </Link>
            </div>
        </>
    );
}
