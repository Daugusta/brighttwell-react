import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useTranslation } from 'react-i18next';

export default function Formulas() {
  const { i18n, t } = useTranslation()
  const [formulas, setFormulas] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification, setMetricUnits} = useStateContext()

  useEffect(() => {
    getFormulas();
    getUnits();
  }, [])

  const onDeleteClick = formula => {

    if (!window.confirm(`${t('fconfirm')}  ${formula.name}`)) {
      return
    }
    axiosClient.delete(`/formulas/${formula.uid}`)
  
      .then(() => {
        //setNotification('Formula was successfully deleted')
        setNotification(`${t('fdeleted')}`)
        getFormulas()
      })
  }

  const getFormulas = () => {
    
    setLoading(true)
    axiosClient.get('/formulas')
      .then(({ data }) => {
        setLoading(false)
        setFormulas(data.data)
      })
      .catch((err) => {
        setLoading(false)
        const response = err.response;
        if (response && response.status === 401) {
          // Si hay un error 401, redirige a la página de inicio de sesión
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

  const getBleachLabel = (value) => {
    switch (value) {
      case 0:
        return t('nonspecified');
      case 1:
        return t('nobleach');
      case 2:
        return t('yesnchorine');
      case 3:
        return t('yeswchorine');
      default:
        return '';
    }
  };
  

  return (
    <div >
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1 className="block text-xl font-bold mr-4">{t('formulas')}</h1>
        <Link className="btn-add" to="/formulas/new">{t('addnew')}</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>{t('number')}</th>
            <th>{t('name')}</th>
            <th>{t('phase')}</th>
            <th>{t('ephase')}</th>
            <th>{t('ttime')}</th>
            <th>{t('bleach')}</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
              {t('loading')}
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {formulas.map(u => (
              <tr key={u.uid}>
                <td>{u.num}</td>
                <td>{u.name}</td>
                <td>  
                <div className="formula-bar">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(numeroFase => (
                    <div
                      className={`formula-square ${u.phases && u.phases.some(fase => fase.num === numeroFase) ? 'active' : ''}`}
                      id={`formula${u.num}_${numeroFase}`}
                      key={numeroFase}
                    >
                      {numeroFase}
                    </div>
                  ))}
                </div>
                </td>
                <td>{u.end_phase}</td>
                <td>{u.estimated_time}</td>
                {/* <td>{u.bleach}</td> */}
                <td>{getBleachLabel(u.bleach)}</td>
                <td>
                  <Link  to={'/formulas/' + u.uid}> <button className="btn-edit"><CiEdit /></button></Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}><RiDeleteBin5Line /></button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
