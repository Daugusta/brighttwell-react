import React from 'react'
import axiosClient from "../axios-client.js";
import { useEffect, useState } from "react";
import { useNavigate, useParams,Link, } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { CiEdit } from "react-icons/ci";
import { BiTachometer } from "react-icons/bi";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { useTranslation } from 'react-i18next';

export default function ProductTab( { products, selectedChannelUid } ) {
  let { uid } = useParams();

  //const [products, setProducts] = useState([]);
  const { i18n, t } = useTranslation()
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification, metricUnits } = useStateContext();
  console.log(products);
  console.log("ChannelUID seleccionado:", selectedChannelUid);

    return (
      <div>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
          <h1 className="block text-xl font-bold mr-4">{t('products')}</h1>
          <Link className="btn-add" to={`/products/new?channelUid=${selectedChannelUid}`}>{t('addnew')}</Link>
        </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
              <tr>
                <th>{t('number')}</th>
                <th>{t('name')}</th>
                <th>{t('mode')}</th>
                <th>{metricUnits == 1 ? `${t('kfpoz')}` : `${t('kfpml')}`}</th>
                <th>{metricUnits == 1 ? `${t('flowrateoz')}` : `${t('flowratel')}`}</th>
                <th>{t('pumpspeed')}</th>
                <th>{t('stocksolution')}</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center">
                  {t('loading')}
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {products && products.length > 0 ? (
                  products.map(u => (
                    <tr key={u.uid}>
                      <td>{u.num}</td>
                      <td>{u.name}</td>
                      <td>
                        {u.dosage_control_mode === 0 && <span><FaRegHourglassHalf fontSize={24}/></span>}
                        {u.dosage_control_mode === 1 && <span><BiTachometer fontSize={24}/></span>}
                      </td>
                      <td>{u.kf}</td>
                      <td>{u.flow_rate}</td>
                      <td>{u.dosage_pump_speed} %</td>
                      <td>
                        {u.state === 0 && <span><FaRegCircleXmark fontSize={24}/></span>}
                        {u.state === 1 && <span className="bg-primary"><FaCheckCircle  fontSize={24}/></span>}
                      </td>
                      <td>
                        <Link to={'/products/' + u.uid}><button className="btn-edit"><CiEdit /></button></Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                    {t('noprodavai')}
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
        <div className="float float-right">
                <Link to="/channels">
                    <button className="btn-add" >
                        <TiArrowBack fontSize={24}/>
                    </button>
                </Link>
            </div>
      </div>
    );
                }

