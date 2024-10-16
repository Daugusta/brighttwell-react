import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import axiosClient from "../axios-client.js";
import { RiMenuFill } from "react-icons/ri";
import { GiWashingMachine } from "react-icons/gi";
import { TfiControlShuffle } from "react-icons/tfi";
import { RiTShirtAirLine } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { RxRulerSquare } from "react-icons/rx";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { PiGearSixBold } from "react-icons/pi";
import { useTranslation } from 'react-i18next';
import { FcStatistics } from "react-icons/fc";
import { TbChecklist } from "react-icons/tb";
import { FaFileUpload } from "react-icons/fa";

const linkClass = 'flex items-center mt-5 font-light gap-2 px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base';

export default function Sidebar() {
  const { i18n, t } = useTranslation()
  const { parameter } = useStateContext();
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getUnitModel();
  }, [])

  const getUnitModel = () => {
    
    axiosClient.get('/unitmodel')
      .then(({ data }) => {
        //setLoading(false)
        setData(data);
      console.log("Unit Model",data)

      //setMetricUnits(data);
      })
      .catch((err) => {
        console.error("Error fetching unit model:", err);
        const response = err.response;
        if (response && response.status === 401) {
          window.location = '/login';
        }
      })
  }

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="relative min-h-screen">
     <div className="bg-primary sm:w-30 md:w-60 p-3 flex flex-col text-white ">

      <div className="flex items-center gap-2 px-1 py-3">
        <RiMenuFill fontSize={40} />
        <span className='text-neutral-100 text-lg hidden md:inline'>MENU</span>
      </div>
  
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        <Link className={`${linkClass} ${isActive("/channels", "/products") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`} to="/channels">
          <TfiControlShuffle fontSize={40} />
          <span className='text-neutral-100 text-lg hidden md:inline'>{t('channels')}</span>
        </Link>
  
        <Link className={`${linkClass} ${isActive("/washers") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`} to="/washers">
          <GiWashingMachine fontSize={40}/>
          <span className='text-neutral-100 text-lg hidden md:inline'>{t('washers')}</span>
        </Link>
  
        <Link className={`${linkClass} ${isActive("/formulas") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`} to="/formulas">
          <RiTShirtAirLine fontSize={40}/>
          <span className='text-neutral-100 text-lg hidden md:inline '>{t('formulas')}</span>
        </Link>
  
        {/* <Link className={`${linkClass} ${isActive("/calibration") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`} to="/calibration">
          <RxRulerSquare fontSize={40}/>
          <span className='text-neutral-100 text-lg hidden md:inline '>{t('calibration')}</span>
        </Link> */}
        {data >= 3 ? (
          <div className="hidden">
            <Link
              className={`${linkClass} ${isActive("/calibration") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`}
              to="/calibration"
            >
              <RxRulerSquare fontSize={40} />
              <span className="text-neutral-100 text-lg hidden md:inline">{t('calibration')}</span>
            </Link>
          </div>
        ) : (
          <Link
            className={`${linkClass} ${isActive("/calibration") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`}
            to="/calibration"
          >
            <RxRulerSquare fontSize={40} />
            <span className="text-neutral-100 text-lg hidden md:inline">{t('calibration')}</span>
          </Link>
        )}
  
        <Link className={`${linkClass} ${isActive("/rtview") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`} to="/rtview">
          <GrView fontSize={40}/>
          <span className='text-neutral-100 text-lg hidden md:inline '>{t('rtv')}</span>
        </Link>

        <Link className={`${linkClass} ${isActive("/uploadfile") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`} to="/uploadfile">
          <FaFileUpload fontSize={40}/>
          <span className='text-neutral-100 text-lg hidden md:inline '>Upload File</span>
        </Link>

        <Link className={`${linkClass} ${isActive("/advanced") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`} to="/advanced">
        <PiGearSixBold fontSize={40}/>
          <span className='text-neutral-100 text-lg hidden md:inline '>{t('advanced')}</span>
        </Link>

        {/* <Link className={`${linkClass} ${isActive("/statistic") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`} to="/statistic">
        <FcStatistics fontSize={40}/>
          <span className='text-neutral-100 text-lg hidden md:inline '>Statistics</span>
        </Link> */}

        {/* <Link className={`${linkClass} ${isActive("/advanced") ? 'bg-neutral-700' : ''} ${parameter.clean_mode === 1 ? 'pointer-events-none opacity-50' : ''}`} to="/advanced">
        <TbChecklist fontSize={40}/>
          <span className='text-neutral-100 text-lg hidden md:inline '>Test Mode</span>
        </Link> */}
      </div>
    </div>
    </div>
  );
}


