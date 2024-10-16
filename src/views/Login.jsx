import {Link} from "react-router-dom";
import axiosClient from "../axios-client.js";
import {createRef} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { useState } from "react";
//import "../i18n";
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from "../constants/index";



export default function Login() {
  //Traduccion
  const { i18n, t } = useTranslation()

  const emailRef = createRef()
  const passwordRef = createRef()
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onChangeLang = (e) => {
    const lang_code = e.target.value
    i18n.changeLanguage(lang_code)

}

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      passwd: passwordRef.current.value,
    }
    setMessage(null)
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
        if (response && response.status === 500) {
          setMessage("Database disconnected or internal server error")
        }
      })
  }

  return (
    // <div className="login-signup-form animated fadeInDown">
    //   <div className="form">
    //   <img className="img" src="./src/assets/brightwell.png" alt="Brightwell" />
    //     <form onSubmit={onSubmit}>
    //     <h1 className="pretitle">MANAGER</h1>
    //       <h1 className="title">Inicia sesión</h1>

    //       {message &&
    //         <div className="alert">
    //           <p>{message}</p>
    //         </div>
    //       }

    //       <input ref={emailRef} type="email" placeholder="Email"/>
    //       <input ref={passwordRef} type="password" placeholder="Password"/>
    //       <button className="btn btn-block">INGRESAR</button>
    //     </form>
    //   </div>
    // </div>
    
<section className="bg-gray-50 dark:bg-gray-900">

  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  
      <div className="mb-10">
        <select 
        className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
        defaultValue={i18n.language} onChange={onChangeLang}  >
                {LANGUAGES.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
        </select>
        </div>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <img className="img" src="./src/assets/brightwell.png" alt="Brightwell" />
         


          <div className="text-center text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              MANAGER
          </div>
          <h1 className="text-center  text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {t('login')}
              </h1>
              {message &&
             <div className="alert">
               <p>{message}</p>
             </div>
             }
              <form onSubmit={onSubmit}  className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('email')}</label>
                      <input ref={emailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('password')}</label>
                      <input ref={passwordRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{t('enter')}</button>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}