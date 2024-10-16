import { useNavigate, Link, useParams,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import Switch from "react-switch";
import { TbWashMachine } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { useTranslation } from 'react-i18next';

export default function ProductForm() {
    const { i18n, t } = useTranslation()
    const navigate = useNavigate();
    let { uid } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const channelUid = queryParams.get('channelUid');
    console.log("ChannelUID nuevo formula:", channelUid);
    const [product, setProduct] = useState({
        uid: null,
        name: "",
        density: 1,
        concentration: 100,
        kf: 2,
        flow_rate: 1,
        state: 0,
        price: 1,
        dosage_control_mode: 0,
        dosage_pump_speed: 80,
        dosage_retry: 0,
        alarms_pulse_detection_range: 0,
        alarms_atempts_before_warning: 1,
        alarms_level_probe_contact: 0,
        main_channelUid: channelUid,
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotification, metricUnits } = useStateContext();
    //const history = useHistory();
    console.log("BEFORE ", uid )
    let  channel_route_Uid;
    if (uid) {
       channel_route_Uid = uid.split('_p')[0];
    }
    console.log("AFETR ", uid )
    if (uid) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/products/${uid}`)
                .then(({ data }) => {
                    setLoading(false);
                    setProduct(data);
                    console.log("resultado del get Product: ");
                    console.log(data);
                })
                .catch((err) => {
                    setLoading(false);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (product.uid) {
            axiosClient
                .put(`/products/${product.uid}`, product)
                .then(() => {
                    setNotification(`${t('productu')}`);
                    //navigate("/channels");
                    navigate(`/channels/${channel_route_Uid}?tab=product`);
                    console.log("lavadora update");
                    console.log(product);
                    //history.push(`/products/new?channelUid=${selectedChannelUid}`);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/products", product)
                .then(() => {
                    setNotification(`${t('productc')}`);
                    //navigate("/channels");
                    navigate(`/channels/${channelUid}?tab=product`);
                    console.log("product creada");
                    console.log(product);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const onDeleteClick = (product) => {
      if (!window.confirm(`${t('dproductc')}  ${product.name}`)) {
        return;
      }
      axiosClient.delete(`/products/${product.uid}`).then(() => {
        setNotification(`${t('productud')}`);
        //navigate("/channels");
        navigate(`/channels/${channel_route_Uid}?tab=product`);
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
                    // <form onSubmit={onSubmit}>
                    <form onSubmit={onSubmit}>
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
                                                        value={product.name}
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
                                                                name: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="Nombre product*"
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
                                        {t('Properties')}
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
                                                        {/* Density (g / cc) */}
                                                        {metricUnits == 1 ? `${t('specificgravity')}` : `${t('density')}`}
                                                    </label>
                                                    <input
                                                        value={product.density}
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
                                                                density: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="Density*"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('Concentration')}
                                                    </label>
                                                    <input
                                                        value={product.concentration}
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
                                                                concentration: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder={t('Concentration')}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {/* Price per kg */}
                                                        {metricUnits == 1 ? `${t('pricepergal')}` : `${t('priceperkg')}`}
                                                    </label>
                                                    <input
                                                        value={product.price}
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
                                                                price: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder={metricUnits == 1 ? `${t('pricepergal')}` : `${t('priceperkg')}`}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-3 md:gap-1">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {/* Kf (ml / pulse) */}
                                                        {metricUnits == 1 ? `${t('kfpoz')}` : `${t('kfpml')}`}
                                                    </label>
                                                    <input
                                                        value={product.kf}
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
                                                                kf: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder={metricUnits == 1 ? `${t('kfpoz')}` : `${t('kfpml')}`}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {/* Flow rate (l / min) */}
                                                        {metricUnits == 1 ? `${t('flowrateoz')}` : `${t('flowratel')}`}
                                                    </label>
                                                    <input
                                                        value={
                                                            product.flow_rate
                                                        }
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
                                                                flow_rate:
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
                                                    {t('state')}
                                                    </label>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <form>
                                                                    <div className="flex items-center">
                                                                        <div className="mt-2 ml-2 radio">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    value="0"
                                                                                    checked={
                                                                                        product.state ===
                                                                                        0
                                                                                    }
                                                                                    onChange={(
                                                                                        ev
                                                                                    ) =>
                                                                                        setProduct(
                                                                                            {
                                                                                                ...product,
                                                                                                state:
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
                                                                        {t('liquid')}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <div className="ml-2 radio">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    value="1"
                                                                                    checked={
                                                                                        product.state ===
                                                                                        1
                                                                                    }
                                                                                    onChange={(
                                                                                        ev
                                                                                    ) =>
                                                                                        setProduct(
                                                                                            {
                                                                                                ...product,
                                                                                                state:
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
                                                                        {t('stocksolution')}
                                                                        </span>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-1 md:gap-1">
                                                <div className="mb-4">
                                                    {/* ... Resto del contenido del acordeón */}

                                                    {/* ... Resto del contenido del acordeón */}
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
                                            <div className="grid md:grid-cols-1 md:gap-1">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('controlmode')}
                                                    </label>
                                                    <select
                                                        value={
                                                            product.dosage_control_mode
                                                        }
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
                                                                dosage_control_mode:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm"
                                                    >
                                                        <option value="0">
                                                        {t('jtime')}
                                                        </option>
                                                        <option value="1">
                                                        {t('flowmeter')}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 md:gap-1">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                        {t('pumpspeed')} %
                                                    </label>
                                                    <input
                                                        value={product.dosage_pump_speed}
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
                                                                dosage_pump_speed: ev.target
                                                                    .value,
                                                            })
                                                        }
                                                        class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                                                        placeholder="Pump Speed %"
                                                    />
                                                </div>
                                            </div>
                                            <div >
                                            <div class="w-full p-4 px-5 py-5">
                                                <div class="grid md:grid-cols-2 md:gap-2">
                                                    <div className="mb-4">
                                                        <label className="block text-gray-700 text-sm font-bold mb-6">
                                                        {t('dosageretry')}
                                                        </label>
                                                        <Switch
                                                            onChange={(
                                                                checked
                                                            ) =>
                                                                setProduct({
                                                                    ...product,
                                                                    dosage_retry:
                                                                        checked
                                                                            ? 1
                                                                            : 0,
                                                                })
                                                            }
                                                            checked={
                                                                product.dosage_retry ===
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
                                                            product.alarms_pulse_detection_range
                                                        }
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
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
                                                            product.alarms_atempts_before_warning
                                                        }
                                                        onChange={(ev) =>
                                                            setProduct({
                                                                ...product,
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
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('levelprovecont')}
                                                    </label>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <form>
                                                                    <div className="flex items-center">
                                                                        <div className="mt-2 ml-2 radio">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    value="0"
                                                                                    checked={
                                                                                        product.alarms_level_probe_contact ===
                                                                                        0
                                                                                    }
                                                                                    onChange={(
                                                                                        ev
                                                                                    ) =>
                                                                                        setProduct(
                                                                                            {
                                                                                                ...product,
                                                                                                alarms_level_probe_contact:
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
                                                                        {t('Open')}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <div className="ml-2 radio">
                                                                            <label>
                                                                                <input
                                                                                    type="radio"
                                                                                    value="1"
                                                                                    checked={
                                                                                        product.alarms_level_probe_contact ===
                                                                                        1
                                                                                    }
                                                                                    onChange={(
                                                                                        ev
                                                                                    ) =>
                                                                                        setProduct(
                                                                                            {
                                                                                                ...product,
                                                                                                alarms_level_probe_contact:
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
                                                                        {t('close')}
                                                                        </span>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {product.uid &&
                                <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
                                    <div class="md:flex ">
                                        <div class="w-full p-4 px-5 py-5">
                                            <div class="grid md:grid-cols-1 md:gap-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    {t('Creation')}
                                                    </label>
                                                    <p>{product.formatted_creation_date} {t('by')} {product.creation_user}</p>
                                                </div>
                                                <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                {t('LastModification')}
                                                    </label>
                                                    <p>{product.formatted_last_change_date} {t('by')} {product.last_change_user}</p>
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
            <div className="float float-right">
            <Link to={`/channels/${channel_route_Uid}?tab=product`}>
                    <button className="btn-add" >
                        <TiArrowBack fontSize={24}/>
                    </button>
                </Link>
            </div>
            {product.num === product.products_count  && (
            <div className="float float-right">
                        <button className="btn-delete" onClick={ev => onDeleteClick(product)}><RiDeleteBin5Line fontSize={24}/></button>
                        </div>
             )}
        </>
    );
}
