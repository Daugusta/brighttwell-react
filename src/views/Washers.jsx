import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { TbWashMachine } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { IoPlayForwardOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';


export default function Washers() {
  const { i18n, t } = useTranslation()
  const [washers, setWashers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  //const history = useHistory();

  useEffect(() => {
    getWashers();
  }, []);

  const getWashers = () => {
    setLoading(true);
    axiosClient
      .get("/washers")
      .then(({ data }) => {
        setLoading(false);
        setWashers(data.data);
      })
      .catch((err) => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 401) {
          // Si hay un error 401, redirige a la página de inicio de sesión
          window.location = '/login';
        }
      });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="block text-xl font-bold mr-4">{t('washers')}</h1>
        <Link className="btn-add" to="/washers/new">
        {t('addnew')}
        </Link>
      </div>

      <div className="flex flex-wrap">
  {!loading &&
    washers.map((u) => (
      <div key={u.uid} className="max-w-sm w-90 h-64 space-between mx-2 my-2 rounded overflow-hidden  transition-transform transform ">

            <Link to={"/washers/" + u.uid} className="bg-white max-w-sm relative flex flex-wrap py-6 rounded shadow-md hover:bg-neutral-300 hover:cursor-pointer">
              <div className="w-1/2 flex flex-col px-3">
                <p className="text-gray-700 text-base flex items-center"><TbWashMachine fontSize={40} />{u.num}</p>
                <h2 className="title-font font-semibold text-gray-900 my-6 tracking-widest text-lg">{u.name}</h2>
                {/* <p className="text-gray-700 text-base flex items-center tracking-widest text-xs"><CiPlay1 fontSize={24} /> {t('timesignal')}: {u.process_formula_id}</p> */}
                <p className="text-gray-700 text-base flex items-center tracking-widest text-xs">
                    <CiPlay1 fontSize={24} />
                    {/* {t('timesignal')}: {u ?  */}
                    {u ?
                        (u.process_formula_id === 0 ? t('FSelector') :
                        (u.process_formula_id === 1 ? t('timeofsignal8') :
                        (u.process_formula_id === 2 ? t('timeofsignal18') :
                        (u.process_formula_id === 3 ? t('binary') :
                        (u.process_formula_id === 4 ? t('free') : ''))))): ''}
                </p>
                <p className="text-gray-700 text-base flex items-center text-xs mt-1"><CiPause1 fontSize={24}/>
                {u.pause_mode === 0 && <span>{t('pausemodeno')}</span>}
                {u.pause_mode === 1 && <span>{t('pausemodewq')}</span>}
                {u.pause_mode === 2 && <span>{t('pausemodewqd')}</span>}
                </p>          
              </div>
              <div className="w-1/2  px-6 flex flex-col justify-between">
                <span className="m-4 mt-1 pl-4 pt-1 pb-1  bg-primary text-white font-medium w-36">{u.kg} kg</span>
                <p className="m-4 mt-1 pl-4 pt-1 pb-1 text-gray-700 text-xs flex items-center"><IoPlayForwardOutline fontSize={24}/>
                {u.process_phase_trigger_mode === 0 && <span>{t('signal')}</span>}
                {u.process_phase_trigger_mode === 1 && <span>{t('sequential')}</span>}
                </p>
              </div>
            </Link>
      </div>
    ))}
</div>


      {/* <div className="flex flex-wrap">
        {!loading &&
          washers.map((u) => (
            <div key={u.uid} className="max-w-sm  space-between mx-2 my-2 rounded overflow-hidden shadow-lg transition-transform transform hover:shadow-xl">

                  <Link to={"/washers/" + u.uid} className="bg-white max-w-sm relative flex flex-wrap py-6 rounded shadow-md hover:bg-neutral-300 hover:cursor-pointer">
           
                    
                    <div className="w-1/2 flex flex-col px-3">
                      <p className="text-gray-700 text-base flex items-center"><TbWashMachine fontSize={40} />{u.num}</p>
                      <h2 className="title-font font-semibold text-gray-900 my-6 tracking-widest text-lg">{u.name}</h2>
                      <p className="text-gray-700 text-base flex items-center tracking-widest text-xs"><CiPlay1 fontSize={24} /> Time of the Signal: {u.process_formula_id}</p>
                      <p className="text-gray-700 text-base flex items-center text-xs mt-1"><CiPause1 fontSize={24}/>
                      {u.pause_mode === 0 && <span>No</span>}
                      {u.pause_mode === 1 && <span>While in queue</span>}
                      {u.pause_mode === 2 && <span>While in queue & dosage</span>}
                      </p>          
                    </div>
                    
                    <div className="w-1/2  px-6 flex flex-col justify-between">
                      {
                      <span className="m-4 mt-1 pl-4 pt-1 pb-1  bg-primary text-white font-medium w-36">{u.kg} kg</span>
                      <p className="m-4 mt-1 pl-4 pt-1 pb-1 text-gray-700 text-xs flex items-center"><IoPlayForwardOutline fontSize={24}/>
                      {u.process_phase_trigger_mode === 0 && <span>Signal</span>}
                      {u.process_phase_trigger_mode === 1 && <span>Sequential</span>}
                      </p>
                    </div>

                  </Link>


            </div>
          ))}
      </div> */}
    </div>
  );
}
