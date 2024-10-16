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


export default function UserForm({ totalChannels }) {
    const { i18n, t } = useTranslation()
    const navigate = useNavigate();
    let { uid } = useParams();
    
    console.log("Total Channels:", totalChannels);
    
    const [channel, setChannel] = useState({
        uid: null,
        name: "",
        water_control_mode: 0,
        water_flow_meter_type: 0,
        water_cost: 1,
        water_kf: 2,
        water_flow_rate: 2,
        dosage_pump_type: 3,
        dosage_flush_type: 1,
        water_test: 1000,
        dosage_initial_test_retry: 0,
        dosage_leak_test: 0,
        dosage_flush_by_pump: 0,
        alarms_pulse_detection_range: 0,
        alarms_atempts_before_warning: 1,
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification, metricUnits } = useStateContext();
    if (uid) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/channels/${uid}`)
                .then(({ data }) => {
                    setLoading(false);
                    setChannel(data);
                    console.log("Channeltab resultado del get: ");
                    console.log(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (channel.uid) {
            axiosClient
                .put(`/channels/${channel.uid}`, channel)
                .then(() => {
                    setNotification(`${t('channelu')}`);
                    navigate("/channels");
                    console.log("lavadora update");
                    console.log(channel);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/channels", channel)
                .then(() => {
                    setNotification(`${t('channelc')}`);
                    navigate("/channels");
                    console.log("channel creada");
                    console.log(channel);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const onDeleteClick = (channel) => {
      if (!window.confirm(`${t('cchanneld')}  ${channel.name}`)) {
        return;
      }
      axiosClient.delete(`/channels/${channel.uid}`).then(() => {
        setNotification(`${t('channeld')}`);
        //getWashers();
        navigate("/channels");
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
                        <div class="bg-gray-300">
                            <div class="py-12">
                                <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                                    <div class="md:flex ">
                                        <div class="w-full p-4 px-5 py-5">
                                            <div class="grid md:grid-cols-1 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('name')}
                                                    </label>
                                                    <input
                                                        value={channel.name}
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                name: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="Nombre channel*"
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
                                        {t('watercontrol')}
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
                                            <div className="grid md:grid-cols-3 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {t('controlmode')}
                                                    </label>
                                                    <select
                                                        value={
                                                            channel.water_control_mode
                                                        }
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                water_control_mode:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                    >
                                                        <option value="0">
                                                        {t('jtime')}
                                                        </option>
                                                        <option value="1">
                                                        {t('flowmeter')}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('flowmetertype')}
                                                    </label>
                                                    <select
                                                        value={
                                                            channel.water_flow_meter_type
                                                        }
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                water_flow_meter_type:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        <option value="0">
                                                        {t('paddlewheel')}
                                                        </option>
                                                        <option value="1">
                                                        {t('ovalgears')}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {/* Cost/l */}
                                                        {metricUnits == 1 ? `${t('costgal')}` : `${t('costl')}`}
                                                    </label>
                                                    <input
                                                        value={channel.water_cost}
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                water_cost: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="*"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 md:gap-1">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {/* Kf (ml / pulse) */}
                                                        {metricUnits == 1 ? `${t('kfpoz')}` : `${t('kfpml')}`}
                                                    </label>
                                                    <input
                                                        value={
                                                            channel.water_kf
                                                        }
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                water_kf:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="*"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {/* Flow rate (l / min) */}
                                                        {metricUnits == 1 ? `${t('flowrateoz')}` : `${t('flowratel')}`}
                                                    </label>
                                                    <input
                                                        value={
                                                            channel.water_flow_rate
                                                        }
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                water_flow_rate:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="*"
                                                    />
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
                                        {t('dosage')}
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
                                            <div className="grid md:grid-cols-2 md:gap-1">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('pumptype')}
                                                    </label>
                                                    <select
                                                        value={
                                                            channel.dosage_pump_type
                                                        }
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                dosage_pump_type:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        <option value="0">
                                                        {t('Peristaltic')}
                                                        </option>
                                                        <option value="1">
                                                        {t('Motor')}
                                                        </option>
                                                        <option value="2">
                                                        {t('Pneumatic')}
                                                        </option>
                                                        <option value="3">
                                                        {t('Membrane')}
                                                        </option>
                                                        <option value="4">
                                                        {t('Venturi')}
                                                        </option>
                                                        <option value="5">
                                                        {t('Pneumaticpp')}
                                                        </option>
                                                        <option value="6">
                                                        {t('Motorpp')}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('flushtype')}
                                                    </label>
                                                    <select
                                                        value={
                                                            channel.dosage_flush_type
                                                        }
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                dosage_flush_type:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        <option value="0">
                                                        {t('noflush')}
                                                        </option>
                                                        <option value="1">
                                                        {t('wateronly')}
                                                        </option>
                                                        <option value="2">
                                                        {t('airflush')}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 md:gap-1">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {/* Water Test (ml) */}
                                                        {metricUnits == 1 ? `${t('watertestoz')}` : `${t('watertestml')}`}
                                                    </label>
                                                    <input
                                                        value={channel.water_test}
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                water_test: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        //placeholder="Water test (ml)"
                                                        placeholder={metricUnits == 1 ? `${t('watertestoz')}` : `${t('watertestml')}`}
                                                    />
                                                </div>
                                            </div>
                                            <div >
                                            <div class="w-full p-4 px-5 py-5">
                                                <div class="grid md:grid-cols-2 md:gap-2">
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-6">
                                                        {t('initialtestretry')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setChannel({
                                                                    ...channel,
                                                                    dosage_initial_test_retry:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                channel.dosage_initial_test_retry ===
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
                                                        {t('leaktest')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setChannel({
                                                                    ...channel,
                                                                    dosage_leak_test:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                channel.dosage_leak_test ===
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
                                                        {t('flushbypump')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setChannel({
                                                                    ...channel,
                                                                    dosage_flush_by_pump:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                channel.dosage_flush_by_pump ===
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

                                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl my-4 mx-2">
                                    <h1
                                        onClick={toggleAccordion}
                                        className="flex items-center justify-between block text-white bg-primary rounded-t-lg text-base font-bold mb-2 p-2 cursor-pointer transition-transform duration-300 transform hover:bg-blue-500"
                                    >
                                        {t('alarms')}
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
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('pulsedetctionrange')}
                                                    </label>
                                                    <select
                                                        value={
                                                            channel.alarms_pulse_detection_range
                                                        }
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                alarms_pulse_detection_range:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        <option value="0">
                                                        {t('low')}
                                                        </option>
                                                        <option value="1">
                                                        {t('medium')}
                                                        </option>
                                                        <option value="2">
                                                        {t('high')}
                                                        </option>
                                                        <option value="3">
                                                        {t('maximun')}
                                                        </option>
                                                    </select>
                                                </div>  
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('attempbeforewarning')}
                                                    </label>
                                                    <select
                                                        value={
                                                            channel.alarms_atempts_before_warning
                                                        }
                                                        onChange={(ev) =>
                                                            setChannel({
                                                                ...channel,
                                                                alarms_atempts_before_warning:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        {[
                                                            0, 1, 2, 3, 4, 5
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
                                {channel.uid &&
                                <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                                    <div class="md:flex ">
                                        <div class="w-full p-4 px-5 py-5">
                                            <div class="grid md:grid-cols-1 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('Creation')}
                                                    </label>
                                                    <p>{channel.formatted_creation_date} {t('by')} {channel.creation_user}</p>
                                                </div>
                                                <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                {t('LastModification')}
                                                    </label>
                                                    <p>{channel.formatted_last_change_date} {t('by')} {channel.last_change_user}</p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div> }
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
            {channel.num === totalChannels  && (
            <div className="float float-right">
                        <button className="btn-delete" onClick={ev => onDeleteClick(channel)}><RiDeleteBin5Line fontSize={24}/></button>
                        </div>
             )}
            <div className="float float-right">
                <Link to="/channels">
                    <button className="btn-add" >
                        <TiArrowBack fontSize={24}/>
                    </button>
                </Link>
            </div>
        </>
    );
}
