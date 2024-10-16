import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import ChannelTab from "./ChannelTab.jsx";
import ProductTab from "./ProductTab.jsx";
import { useTranslation } from 'react-i18next';

// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';


export default function UserForm() {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate();
  let {uid} = useParams();
  
  const [channel, setChannel] = useState({
    uid: null,
    num: '',
    name: '',
    water_control_mode: '',
    water_kf: '',
    water_flow_rate: '',
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  const [activeTab, setActiveTab] = useState(1);
  const [totalChannels, setTotalChannels] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    //----
    const tab = queryParams.get('tab');
    if (tab === 'product') {
      setActiveTab(2);
    }
    //-----
    getChannels();
  //}, [])
    }, [location.search]);

  const getChannels = () => {
    
    setLoading(true)
    axiosClient.get('/channels')
      .then(({ data }) => {
        setLoading(false)

        setTotalChannels(data.data.length);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

 
if (uid) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/channels/${uid}`)
        .then(({data}) => {
          setLoading(false)
          setChannel(data)
          console.log("resultado del get Channel edit: ")
          console.log(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }




  return (
    <>
      {channel.uid && <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('updatechannel')} {channel.num}: {channel.name}</h1>}
      {!channel.uid && <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('newchannel')}</h1>}
      {/* <div className="flex flex-col lg:flex-row h-screen"> */}
      <div className="flex flex-col h-screen">
      {/* <div className="lg:w-1/5 bg-white p-4"> */}
      <div className="bg-white p-4">
        <div className="flex">
          <div
            onClick={() => handleTabClick(1)}
            className={`cursor-pointer p-2 ${
              activeTab === 1 ? 'bg-primary text-white' : ''
            } mb-2`}
          >
            {t('parameters')}
          </div>
          <div
            onClick={() => handleTabClick(2)}
            className={`cursor-pointer p-2 ${
              activeTab === 2 ? 'bg-primary text-white' : ''
            }  mb-2 ml-2`}
          >
           {t('product')}    
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-200 p-4">
        <div className="mt-4">
          {activeTab === 1 && <div><ChannelTab totalChannels={totalChannels}/></div>}
          {activeTab === 2 && <div><ProductTab products={channel.products} selectedChannelUid={channel.uid}/></div>}
        </div>
      </div>
    </div>
  
    </>
  )
}