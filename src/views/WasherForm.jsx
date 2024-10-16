import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import Switch from "react-switch";
import { TbWashMachine } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { useTranslation } from 'react-i18next';

export default function UserForm() {
    const { i18n, t } = useTranslation()
    const navigate = useNavigate();
    let { uid } = useParams();

    const [washer, setWasher] = useState({
        uid: null,
        num: "",
        name: "",
        kg: 50,
        process_washer_id: "",
        flush_volume: 4,
        flush_air_time: 0,
        kg_selector: 0,
        process_formula_id: 1,
        process_dose_on_id: 0,
        process_phase_trigger_mode: 0,
        process_default_formula: 0,
        loading_unloading_time: 5,
        signal_minimum_time: 2,
        signal_lock_after_signal: 10,
        signal_lock_after_finish: 0,
        pause_mode: 0,
        pause_timeout: 0,
        pause_delay: 0,
        alarm_missing_phases: 0,
        alarm_internal_error: 0,
        alarm_unfinished_process: 0,
        alarm_level_temp: 0,
        alarm_comm_error: 0,
        alarm_data_out_of_range: 0,
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification, metricUnits } = useStateContext();
    const [totalWashers, setTotalWashers] = useState(0);

    useEffect(() => {
        getWashers();
      }, [])

    const getWashers = () => {
    
        setLoading(true)
        axiosClient.get('/washers')
          .then(({ data }) => {
            setLoading(false)
    
            setTotalWashers(data.data.length);
          })
          .catch(() => {
            setLoading(false)
          })
      }

    if (uid) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/washers/${uid}`)
                .then(({ data }) => {
                    setLoading(false);
                    setWasher(data);
                    console.log("resultado del get: ");
                    console.log(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (washer.uid) {
            axiosClient
                .put(`/washers/${washer.uid}`, washer)
                .then(() => {
                    setNotification(`${t('washeru')}`);
                    navigate("/washers");
                    console.log("lavadora update");
                    console.log(washer);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/washers", washer)
                .then(() => {
                    setNotification(`${t('washerc')}`);
                    navigate("/washers");
                    console.log("washer creada");
                    console.log(washer);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const onDeleteClick = (washer) => {
      if (!window.confirm(`${t('cwasherd')}  ${washer.name}`)) {
        return;
      }
      axiosClient.delete(`/washers/${washer.uid}`).then(() => {
        setNotification(`${t('washerd')}`);
        //getWashers();
        navigate("/washers");
      });
    };

    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const [isProcessAccordionOpen, setProcessAccordionOpen] = useState(false);
    const [isSignalFiltersAccordionOpen, setSignalFiltersAccordionOpen] =
        useState(false);
    const [isAlarmReportingAccordionOpen, setAlarmReportingAccordionOpen] =
        useState(false);

    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    const toggleProcessAccordion = () => {
        setProcessAccordionOpen(!isProcessAccordionOpen);
    };

    const toggleSignalFiltersAccordion = () => {
        setSignalFiltersAccordionOpen(!isSignalFiltersAccordionOpen);
    };

    const toggleAlarmReportingAccordion = () => {
        setAlarmReportingAccordionOpen(!isAlarmReportingAccordionOpen);
    };

    return (
        <>
            {washer.uid && <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('wdetailupdate')}: {washer.name}</h1>}
            {!washer.uid && <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('newwasher')}</h1>}
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
                     
                        <div class="bg-gray-300">
                            <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2 flex items-center">
                                <TbWashMachine fontSize={40} />
                                {washer.num}
                            </h1>
                            <div class="py-12">
                                <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                                    <div class="md:flex ">
                                        <div class="w-full p-4 px-5 py-5">
                                            <div class="grid md:grid-cols-3 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('name')}
                                                    </label>
                                                    <input
                                                        value={washer.name}
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                name: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder={t('name')}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {/* Load (Kg) */}
                                                        {metricUnits == 1 ? `${t('loadlbs')}` : `${t('loadkg')}`}
                                                    </label>
                                                    <input
                                                        value={washer.kg}
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                kg: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm "
                                                        placeholder=" "
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-6">
                                                    {t('loadselector')}
                                                    </label>
                                                    <Switch
                                                        onChange={(checked) =>
                                                            setWasher({
                                                                ...washer,
                                                                kg_selector:
                                                                    checked
                                                                        ? 1
                                                                        : 0,
                                                            })
                                                        }
                                                        checked={
                                                            washer.kg_selector ===
                                                            1
                                                        }
                                                        height={20}
                                                        width={40}
                                                        className="react-switch"
                                                        id="loadSelector"
                                                    />
                                                </div>
                                            </div>

                                            <div class="grid md:grid-cols-2 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {/* Flush (l) */}
                                                        {metricUnits == 1 ? `${t('flushgal')}` : `${t('flushl')}`}
                                                    </label>
                                                    <input
                                                        value={
                                                            washer.flush_volume
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                flush_volume:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder=" "
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('Flushat')}
                                                    </label>
                                                    <input
                                                        value={
                                                            washer.flush_air_time
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                flush_air_time:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder={t('Flushat')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl my-4 mx-2">
                                    <h1
                                        onClick={toggleProcessAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >
                                        {t('process')}
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
                                            <div className="grid md:grid-cols-2 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('formulaid')}
                                                    </label>
                                                    <select
                                                        value={
                                                            washer.process_formula_id
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                process_formula_id:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                    >
                                                        <option value="0">
                                                        {t('Fselector')}
                                                        </option>
                                                        <option value="1">
                                                        {t('timeofsignal8')}
                                                        </option>
                                                        <option value="2">
                                                        {t('timeofsignal18')}
                                                        </option>
                                                        <option value="3">
                                                        {t('binary')}
                                                        </option>
                                                        <option value="4">
                                                        {t('free')}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('dosesphaseonID')}
                                                    </label>
                                                    <select
                                                        value={
                                                            washer.process_dose_on_id
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                process_dose_on_id:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        {[
                                                            0, 1, 2, 3, 4, 5, 6,
                                                            7, 8,
                                                        ].map((value) => (
                                                            <option
                                                                key={value}
                                                                value={value}
                                                            >
                                                                {value}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-1 md:gap-1">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('phasetriggermode')}
                                                    </label>
                                                    <select
                                                        value={
                                                            washer.process_phase_trigger_mode
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                process_phase_trigger_mode:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        <option value="0">
                                                        {t('signal')}
                                                        </option>
                                                        <option value="1">
                                                        {t('sequential')}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('selectordefformulae')}
                                                    </label>
                                                    <input
                                                        value={
                                                            washer.process_default_formula
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                process_default_formula:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="Default Formula selector*"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('loadunload')}
                                                    </label>
                                                    <select
                                                        // value={
                                                        //     washer.loading_unloading_time
                                                        // }
                                                        value={parseFloat(washer.loading_unloading_time)}
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                loading_unloading_time:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        {[
                                                            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
                                                        ].map((value) => (
                                                            <option
                                                                key={value}
                                                                value={value}
                                                            >
                                                                {value}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl my-4 mx-2">
                                    <h1
                                        onClick={toggleSignalFiltersAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >
                                        {t('signalfilters')}
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
                                            {/* Contenido del acordeón para Signal Filters (s) */}
                                            <div className="grid md:grid-cols-3 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('minimuntime')}
                                                    </label>
                                                    <input
                                                        value={
                                                            washer.signal_minimum_time
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                signal_minimum_time:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="Minimun time*"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('lockaftersignal')}
                                                    </label>
                                                    <input
                                                        value={
                                                            washer.signal_lock_after_signal
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                signal_lock_after_signal:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="Lock after signal*"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('lockafterend')}
                                                    </label>
                                                    <input
                                                        value={
                                                            washer.signal_lock_after_finish
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                signal_lock_after_finish:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="Lock After end*"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl my-4 mx-2">
                                    <h1
                                        onClick={toggleAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >
                                        {t('machinepause')}
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
                                        <div className="w-full p-4 px-5 py-5 ">
                                            <div className="grid md:grid-cols-1 md:gap-1">
                                                <div className="mb-4">
                                                    {/* ... Resto del contenido del acordeón */}
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                {/* <form> */}
                                                                    <div className="flex items-center">
                                                                        <div className="radio">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    value="0"
                                                                                    checked={
                                                                                        washer.pause_mode ===
                                                                                        0
                                                                                    }
                                                                                    onChange={(
                                                                                        ev
                                                                                    ) =>
                                                                                        setWasher(
                                                                                            {
                                                                                                ...washer,
                                                                                                pause_mode:
                                                                                                    parseInt(
                                                                                                        ev
                                                                                                            .target
                                                                                                            .value
                                                                                                    ),
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                        <span className="ml-2">
                                                                        {t('pausemodeno')}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <div className="radio">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    value="1"
                                                                                    checked={
                                                                                        washer.pause_mode ===
                                                                                        1
                                                                                    }
                                                                                    onChange={(
                                                                                        ev
                                                                                    ) =>
                                                                                        setWasher(
                                                                                            {
                                                                                                ...washer,
                                                                                                pause_mode:
                                                                                                    parseInt(
                                                                                                        ev
                                                                                                            .target
                                                                                                            .value
                                                                                                    ),
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                        <span className="ml-2">
                                                                        {t('pausemodewq')}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <div className="radio">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    value="2"
                                                                                    checked={
                                                                                        washer.pause_mode ===
                                                                                        2
                                                                                    }
                                                                                    onChange={(
                                                                                        ev
                                                                                    ) =>
                                                                                        setWasher(
                                                                                            {
                                                                                                ...washer,
                                                                                                pause_mode:
                                                                                                    parseInt(
                                                                                                        ev
                                                                                                            .target
                                                                                                            .value
                                                                                                    ),
                                                                                            }
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </label>
                                                                        </div>
                                                                        <span className="ml-2">
                                                                        {t('pausemodewqd')}
                                                                        </span>
                                                                    </div>
                                                                {/* </form> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* ... Resto del contenido del acordeón */}
                                                </div>
                                            </div>
                                        </div>
                                         <div class="w-full p-4 px-5 py-5 grid md:grid-cols-1 md:gap-2">
                                          {/*      <div class="grid md:grid-cols-1 md:gap-2">
                                                    <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Pause Timeout
                                                        
                                                    </label>
                                                    <input
                                                        value={
                                                            washer.pause_timeout
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                pause_timeout:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        // class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        // placeholder=" "
                                                        className={`border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${
                                                            washer.pause_mode === 0 ? 'bg-gray-300' : ''
                                                        }`}
                                                        placeholder=" "
                                                        disabled={washer.pause_mode === 0} 
                                                    />

                                                    </div>
                                                </div>
                                                <div class="grid md:grid-cols-1 md:gap-2">
                                                    <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        Pause Delay
                                                        
                                                    </label>
                                                    <input
                                                        value={
                                                            washer.pause_delay
                                                        }
                                                        onChange={(ev) =>
                                                            setWasher({
                                                                ...washer,
                                                                pause_delay:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className={`border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${
                                                            washer.pause_mode === 0 ? 'bg-gray-300' : ''
                                                        }`}
                                                        placeholder=" "
                                                        disabled={washer.pause_mode === 0} 
                                                    />
                                                    </div>
                                                </div>*/}
                                                {washer.pause_mode !== 0 && (
                                                    <>
                                                    <div className="grid md:grid-cols-1 md:gap-2">
                                                        <div className="mb-4">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                                Pause Timeout
                                                            </label>
                                                            <input
                                                                value={washer.pause_timeout}
                                                                onChange={(ev) =>
                                                                    setWasher({
                                                                        ...washer,
                                                                        pause_timeout: ev.target.value,
                                                                    })
                                                                }
                                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                                placeholder=" "
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid md:grid-cols-1 md:gap-2">
                                                        <div className="mb-4">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                                                Pause Delay
                                                            </label>
                                                            <input
                                                                value={washer.pause_delay}
                                                                onChange={(ev) =>
                                                                    setWasher({
                                                                        ...washer,
                                                                        pause_delay: ev.target.value,
                                                                    })
                                                                }
                                                                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                                placeholder=" "
                                                            />
                                                        </div>
                                                    </div>
                                                    </>
                                                )}
                                            </div> 
                                    </div>
                                </div>

                                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl my-4 mx-2">
                                    <h1
                                        onClick={toggleAlarmReportingAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >
                                        {t('alarmreporting')}
                                        <span
                                            className={`ml-2 transition-transform transform ${
                                                isAlarmReportingAccordionOpen
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
                                                isAlarmReportingAccordionOpen
                                                    ? "500px"
                                                    : "0",
                                            overflow: "hidden",
                                        }}
                                        className="transition-max-height duration-300"
                                    >
                                        <div >
                                            <div class="w-full p-4 px-5 py-5">
                                                <div class="grid md:grid-cols-2 md:gap-2">
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-6">
                                                        {t('missingphases')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setWasher({
                                                                    ...washer,
                                                                    alarm_missing_phases:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                washer.alarm_missing_phases ===
                                                                1
                                                            }
                                                            height={20}
                                                            width={40}
                                                            className="react-switch"
                                                            id="loadSelector"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-6">
                                                        {t('internalerror')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setWasher({
                                                                    ...washer,
                                                                    alarm_internal_error:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                washer.alarm_internal_error ===
                                                                1
                                                            }
                                                            height={20}
                                                            width={40}
                                                            className="react-switch"
                                                            id="loadSelector"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="grid md:grid-cols-2 md:gap-2">
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-6">
                                                        {t('unfinishedprocess')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setWasher({
                                                                    ...washer,
                                                                    alarm_unfinished_process:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                washer.alarm_unfinished_process ===
                                                                1
                                                            }
                                                            height={20}
                                                            width={40}
                                                            className="react-switch"
                                                            id="loadSelector"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-6">
                                                        {t('leveltimeout')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setWasher({
                                                                    ...washer,
                                                                    alarm_level_temp:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                washer.alarm_level_temp ===
                                                                1
                                                            }
                                                            height={20}
                                                            width={40}
                                                            className="react-switch"
                                                            id="loadSelector"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="grid md:grid-cols-2 md:gap-2">
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-6">
                                                        {t('commerror')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setWasher({
                                                                    ...washer,
                                                                    alarm_comm_error:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                washer.alarm_comm_error ===
                                                                1
                                                            }
                                                            height={20}
                                                            width={40}
                                                            className="react-switch"
                                                            id="loadSelector"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-6">
                                                            {t('dataoutrange')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setWasher({
                                                                    ...washer,
                                                                    alarm_data_out_of_range:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                washer.alarm_data_out_of_range ===
                                                                1
                                                            }
                                                            height={20}
                                                            width={40}
                                                            className="react-switch"
                                                            id="loadSelector"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-between items-center">
                        {/* <button className="btn-delete" onClick={ev => onDeleteClick(u)}><RiDeleteBin5Line fontSize={24}/></button> */}
                        <button class="btn-add">
                        {/* <IoIosSave fontSize={24} onSubmit={onSubmit} /> */}
                        <IoIosSave fontSize={24} />
                        </button>
                        </div>
                    </form>
                    
                )}
            </div>
            {washer.num === totalWashers  && (
            <div className="float float-right">
                        <button className="btn-delete" onClick={ev => onDeleteClick(washer)}><RiDeleteBin5Line fontSize={24}/></button>
                        </div>
             )}
            <div className="float float-right">
                <Link to="/washers">
                    <button className="btn-add" >
                        <TiArrowBack fontSize={24}/>
                    </button>
                </Link>
            </div>
        </>
    );
}
