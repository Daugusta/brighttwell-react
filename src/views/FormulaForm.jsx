import {useNavigate, useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import { TiArrowBack } from "react-icons/ti";
import "./tailwind.css";
import { useTranslation } from 'react-i18next';

export default function UserForm() {
  const navigate = useNavigate();
  let {uid} = useParams();

  const { i18n, t } = useTranslation()
  
  const [formula, setFormula] = useState({
    uid: null,
    num: '',
    name: "newFormula",
    end_phase: 4,
    estimated_time: 60,
    formula_type: 2,
    bleach: 0,
    temperature: 1,
    percentage: 100,
    num_free_mode: 0,
    phases: [

      //{ dosages: Array(6).fill({ num: '', product_name: null, dose: '' }), phase_type: 0 },
      //agregado temporalmente a ver
    ]
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification,metricUnits} = useStateContext()
  console.log("METRIC  ",metricUnits)
  const [products, setProducts] = useState([]);

if (uid) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/formulas/${uid}`)
        .then(({data}) => {
          setLoading(false)
          setFormula(data)
          console.log("resultado del get: ")
          console.log(data)
        })
        .catch(() => {
          setLoading(false)
        })
        axiosClient.get('/products')
        .then(({ data }) => {
          setProducts(data.data)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
          if (response && response.status === 401) {
            // Si hay un error 401, redirige a la página de inicio de sesión
            window.location = '/login';
          }
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (formula.uid) {
      axiosClient.put(`/formulas/${formula.uid}`, formula)
        .then(() => {
          setNotification(`${t('fupdated')}`)
          console.log("formula actualizada")
          console.log(formula)
          navigate('/formulas')
        })
        .catch(err => {
          setNotification(`${t('checkdata')}`)
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
          if (response && response.status === 401) {
            // Si hay un error 401, redirige a la página de inicio de sesión
            window.location = '/login';
          }
        })
    } else {
      console.log(formula)
      axiosClient.post('/formulas', formula)
        .then(() => {
          setNotification(`${t('fcreated')}`)
          navigate('/formulas')
          console.log("formula creada")
          console.log(formula)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
          if (response && response.status === 401) {
            // Si hay un error 401, redirige a la página de inicio de sesión
            window.location = '/login';
          }
        })
    }
  }

  const getProducts = () => {
    
    axiosClient.get('/products')
      .then(({ data }) => {
        setProducts(data.data)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
        if (response && response.status === 401) {
          // Si hay un error 401, redirige a la página de inicio de sesión
          window.location = '/login';
        }
      })
  }

const getAvailablePhaseNumbers = () => {

  if (!formula.phases) {
    return [];
  }
  // Obtén todos los números de fase ya seleccionados
  const selectedPhaseNumbers = formula.phases.map((phase) => phase.num);

  // Filtra los números disponibles excluyendo los ya seleccionados
  return [1, 2, 3, 4, 5, 6, 7, 8].filter((number) => !selectedPhaseNumbers.includes(number));
};

//_________________________________________________________________________________BETA_BEGIN
const addPhase = () => {
  if (!products || products.length === 0) {
    getProducts();
  }

  if (!formula.phases) {
    setFormula({
      ...formula,
      phases: [{
        num: '', // Inicializar el número de fase como una cadena vacía
        phase_type: '',
        delay_1: '',
        delay_2: '',
        delay_2_order: '',
        dosages: Array(6).fill({ num: '', product_name: null, dose: '' }),
      }],
    });
    return;
  }

  const availablePhaseNumbers = getAvailablePhaseNumbers();

  if (availablePhaseNumbers.length > 0) {
    setFormula({
      ...formula,
      phases: [
        ...formula.phases,
        {
          num: '', // Inicializar el número de fase como una cadena vacía
          phase_type: '',
          delay_1: '',
          delay_2: '',
          delay_2_order: '',
          dosages: Array(6).fill({ num: '', product_name: null, dose: '' }),
        },
      ],
    });
  } else {
    console.log('No hay números de fase disponibles');
  }
};

//_________________________________________________________________________________BETA_END
const removePhase = (index) => {
  const newPhases = [...formula.phases];
  newPhases.splice(index, 1);
  setFormula({ ...formula, phases: newPhases });
};

// const invertDelayOrderValue = (value) => {
//   return 7 - value;
// };

const handlePhaseChange = (index, key, value) => {
  let updatedValue = value;

  // if (key === 'delay_2_order') {
  //   updatedValue = invertDelayOrderValue(value); // Invertir el valor antes de actualizar
  // }

  setFormula((prevFormula) => {
    const newPhases = [...prevFormula.phases];
    const currentPhase = { ...newPhases[index] };

    // Verifica si es un campo de dosages
    if (key.startsWith('dropdown') || key.startsWith('input')) {
      const dosageIndex = parseInt(key.replace(/[^\d]/g, '')) - 1; // Obtener el número de la dosis

      currentPhase.dosages = currentPhase.dosages || Array(6).fill({}); // Inicializar el arreglo dosages si aún no existe

      if (key.startsWith('dropdown') && value !== null) {
        const productName = products.find((product) => product.name === value);
        currentPhase.dosages[dosageIndex] = {
          num: dosageIndex + 1,
          product_name: productName ? productName.name : null,
          dose: currentPhase.dosages[dosageIndex]?.dose || null,
        };
      } else if (key.startsWith('input') && currentPhase.dosages[dosageIndex]) {
        currentPhase.dosages[dosageIndex].dose = value;
      }
    } else {
      // Si no es dosages, actualiza directamente en el objeto de la fase
      currentPhase[key] = value;
    }

    newPhases[index] = currentPhase;

    return {
      ...prevFormula,
      phases: newPhases,
    };
  });
};

const generateDropdowns = (index) => {
  const dropdowns = [];
  const inputs = [];
  const radios = [];
  const delayOrder = formula.phases[index].delay_2_order;
  const delayValue = formula.phases[index].delay_2;

  if (delayValue != 0 && delayOrder == 0) {
    formula.phases[index].delay_2_order = 6
  }

  for (let i = 0; i < 6; i++) {
    const dosageIndex = i + 1; // Ajuste para la correspondencia con el número

    
    let isShaded = false;
    //const isShaded = delayOrder >= (6 - dosageIndex + 1);
    //const isShaded = delayValue && delayOrder <= dosageIndex;
    if (delayValue && delayOrder > 0 && delayOrder <= dosageIndex) {
      isShaded = true;
    }

    radios.push(
      <ul>
        <li
          className={` focus:border-green-200 px-2 mt-2 mr-2 text-sm ${formula.phases[index].delay_2_order == dosageIndex || (!formula.phases[index].delay_2_order && dosageIndex === 6) ? '' : 'opacity-10'}`}
          
        >
          <div className="">
            <input
              type="text"
              id={`list-radio-${dosageIndex}`}
              value={formula.phases[index].delay_2}
              onChange={(event) => handlePhaseChange(index, 'delay_2', event.target.value)}
              placeholder={t('delay')}
              className="border  rounded w-20 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
            />
          </div>
        </li>
      </ul>
    );
    
    dropdowns.push(
      <div class="relative  flex items-stretch" data-te-dropdown-ref>
        <select
          class={`border rounded-l h-10 w-3/4 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${isShaded ? 'bg-gray-200' : ''}`}
          key={`dropdown${i}`}
          value={formula.phases[index].dosages && formula.phases[index].dosages.find(dosage => dosage?.num === dosageIndex)?.product_name || ''}
          onChange={(ev) => handlePhaseChange(index, `dropdown${dosageIndex}`, ev.target.value)}
        >
          <option value="">{t('select')}</option>
          {products.map((product, idx) => (
            <option key={idx} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          key={`input${i}`}
          value={formula.phases[index].dosages && formula.phases[index].dosages.find(dosage => dosage?.num === dosageIndex)?.dose || ''}
          onChange={(ev) => handlePhaseChange(index, `input${dosageIndex}`, ev.target.value)}
          //placeholder="g/kg"
          
          placeholder={parseInt(metricUnits) === 1 ? "fl.oz/CW" : "g/kg"}
          class={`border rounded-l h-10 w-1/4 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${isShaded ? 'bg-gray-200' : ''}`}
        />
    
        <ul
          class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
          data-te-dropdown-menu-ref
        >
          <li>
            <a
              class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
              href="#"
              data-te-dropdown-item-ref
            >
              {t('select')}
            </a>
          </li>
          {products.map((product, idx) => (
            <li key={idx}>
              <a
                class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => handlePhaseChange(index, `dropdown${dosageIndex}`, product.product_name)}
              >
                {product.product_name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return { dropdowns, inputs, radios };
};

const [numFreeMode, setNumFreeMode] = useState(0);

// Efecto para inicializar el estado numFreeMode al cargar el componente
  useEffect(() => {
    // Obtén el valor num_free_mode del JSON recibido (supongamos que lo guardas en una variable llamada tuJson)
    const numFreeModeFromJson = formula.num_free_mode;

    setFormula((prevFormula) => ({
      ...prevFormula,
      num_free_mode: numFreeModeFromJson,
    }));
  }, []); 

const toggleBit = (index) => {
  setFormula((prevFormula) => {
    // Realizar la lógica para cambiar el bit en la posición index
    const mask = 1 << index;
    const newNumFreeMode = prevFormula.num_free_mode ^ mask;
    setNumFreeMode(newNumFreeMode);
    console.log('New numFreeMode:', newNumFreeMode);

    // Actualizar el estado de formula
    return {
      ...prevFormula,
      num_free_mode: newNumFreeMode,
    };
  });
};

  return (
    <>
      {formula.uid && <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2"
      >{t('uformulat')}: {formula.name}</h1>}
      {!formula.uid && <h1 className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">{t('nformulat')}</h1>}

      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            {t('loading')}
          </div>
        )}

        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
              <div className="float float-right bg-gray-300 mb-20">
                <Link to="/formulas">
                    <button className="btn-add" >
                        <TiArrowBack fontSize={24}/>
                    </button>
                </Link>
            </div>
        {!loading && (
          
        <form onSubmit={onSubmit}>
          <div class="bg-gray-300">
            <div class="py-12">
              <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg md:max-w-xl mx-2">
              <div class="md:flex ">
                <div class="w-full p-4 px-5 py-5">
                <div class="grid md:grid-cols-3 md:gap-2">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">{t('name')}</label>
                  <input  value={formula.name} onChange={ev => setFormula({...formula, name: ev.target.value})} class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Nombre Formula*"/>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">{t('number')}</label>
                  <input value={formula.num} readOnly={!!formula.uid} onChange={ev => setFormula({...formula, num: ev.target.value})} className={`border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm ${formula.uid ? 'bg-gray-200' : 'focus:border-green-200'}`} placeholder={t('number')}/> 
                </div> 
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">{t('percentage')}</label>
                  <input value={formula.percentage} onChange={ev => setFormula({...formula, percentage: ev.target.value})} type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Porcentaje*"/>
                </div>
                </div>
                
                <div class="grid md:grid-cols-3 md:gap-2">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">{t('Esttime')}</label>
                <input value={formula.estimated_time} onChange={ev => setFormula({...formula, estimated_time: ev.target.value})} class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Tiempo estimado*"/>
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">{t('ephase')}</label>
                
                <select class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  id="endPhase"
                  value={formula.end_phase}
                  onChange={(ev) => setFormula({ ...formula, end_phase: ev.target.value })}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">{t('formtype')}</label>
                
                <select class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  
                  value={formula.formula_type}
                  onChange={(ev) => setFormula({ ...formula, formula_type: ev.target.value })}
                >
                  {[
                    { value: 0, label: t('nonspecified') },
                    { value: 1, label: t('delicate') },
                    { value: 2, label: t('normal') },
                    { value: 3, label:  t('hevaysoil') },
                    { value: 4, label: t('reprocess') },
                    { value: 5, label: t('desize') },
                    { value: 6, label: t('rinsespin') },
                    { value: 7, label: t('recovery') },
                    { value: 8, label: t('other') },
                  ].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                </div>
                </div>
                <div class="grid md:grid-cols-3 md:gap-2">
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">{t('bleach')}</label>
                
              <select class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                
                value={formula.bleach}
                onChange={(ev) => setFormula({ ...formula, bleach: ev.target.value })}
              >
                {[
                  { value: 0, label: t('nonspecified') },
                  { value: 1, label: t('nobleach') },
                  { value: 2, label: t('yesnchorine') },
                  { value: 3, label: t('yeswchorine') },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">{t('temperature')}</label>
                
              <select class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                  
                  value={formula.temperature}
                  onChange={(ev) => setFormula({ ...formula, temperature: ev.target.value })}
                >
                  {[
                    { value: 0, label: t('cold') },
                    { value: 1, label: t('warm') },
                    { value: 2, label: t('hot') },
                    { value: 3, label: t('hightemp') },
                  ].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">{t('freemode')}</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((bit, index) => (
                      <div
                        key={index}
                        className={`px-1 mt-2 border border-gray-300 hover:bg-gray-100 focus:outline-none ${formula.num_free_mode & (1 << index) ? 'bg-green-200' : ''}`}
                        onClick={() => toggleBit(index)}
                      >
                        {bit}
                      </div>
                    ))}
                  </div>
                </div>
                {/* end */}
                </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <button class="float-right m-4 mt-6 pl-4 pt-1 pb-1 pr-4 bg-primary text-white font-medium w-36">{t('save')}</button>
        </form>
         )}
        <div>
        <button class={`m-4 mt-6 pl-4 pt-1 pb-1 pr-4 bg-primary text-white font-medium w-36" ${formula.phases && formula.phases.length >= 8 ? 'disabled' : ''}`}
                onClick={addPhase} 
                disabled={formula.phases && formula.phases.length >= 8}
        >
          {t('addphase')}
        </button>
        </div>

      </div>
{/* <Phases/> */}
{/* <Phases formulaPhases={formula} products={products} /> */}

{formula.phases && formula.phases.map((phase, index) => (
  <div key={index} className="max-w-md mx-auto  rounded-xl  overflow-hidden mt-3 md:max-w-2xl">

  <div class="card mt-2  ">

  <div class="bg-white h-auto flex justify-center">
    
    <div >
        {/* <div className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">Phase # {phase.num}</div> */}
        <div className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">
          {phase.num ? `${t('phase1')} # ${phase.num}` : `${t('nphase1')}`}
        </div>
        <div class=" flex flex-col">

      <div class="grid grid-cols-2  gap-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">{t('phasenum')}</label>
              <input
                value={phase.num || ''} // Establecer el valor como cadena vacía si no hay número de fase
                readOnly={!!phase.num} // Hacer que el campo sea de solo lectura si hay un número de fase existente
                onChange={(ev) => handlePhaseChange(index, 'num', ev.target.value)} // Permitir la edición del número de fase
                className={`border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm ${phase.num ? 'bg-gray-200' : 'bg-white'}`} // Cambiar el color de fondo basado en si hay un número de fase
                placeholder={t('phasenum')} // Agregar un marcador de posición
              />         

            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">{t('phasetyp')}</label>
                <select class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                id={`phaseType_${index}`}
                value={phase.phase_type}
                onChange={(ev) => handlePhaseChange(index, 'phase_type', ev.target.value)}
                >
                <option value="">{t('none')}</option>
                <option value="5">{t('nonspecified')}</option>
                <option value="3">{t('prewash')}</option>
                <option value="4">{t('mwash')}</option>
                <option value="6">{t('bleach')}</option>
                <option value="2">{t('neutral')}</option>
                <option value="1">{t('netsotf')}</option>
                <option value="7">{t('blank')}</option>
                </select>
            </div> 
        </div>
      <div class="grid md:grid-cols-4 md:gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t('delay1')}</label>
            <input class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
              value={phase.delay_1}
              onChange={(ev) => handlePhaseChange(index, 'delay_1', ev.target.value)}
              placeholder={t('delay1p')}
            />
          </div>

      </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="container">
            <div className="input-left">
              {/* Inputs de delay_2_order */}
              
              {generateDropdowns(index).radios}

            </div>
            <div className="input-right">
              <input
              type="range"
              id={`percentageFullRange${index}`}
              step="1"
              min="1"
              max="6"
              orient="vertical"
              onChange={(event) => handlePhaseChange(index, 'delay_2_order', parseInt(event.target.value))}
              //value={phase.delay_2_order} // Usa delay_2_order para sincronizar el valor del rango
              value={!phase.delay_2_order ? 6 : phase.delay_2_order} 
              //value={7 - phase.delay_2_order}
            />

            </div>
          </div>
          
          <div className="container">
            <div>
              {/* Dropdowns */}
              {generateDropdowns(index).dropdowns}
            </div>
          </div>
        </div>
       </div>
      <div
      class="relative mb-4 flex flex-wrap items-stretch"
      data-te-dropdown-ref>
      </div>
          <div class="m-6 ">
              <div
                  class="float-right m-4 mt-6 pl-4 pt-1 pb-1 pr-4 bg-primary text-white font-medium w-36">
              <button 
              onClick={() => removePhase(index)}>
                {t('rphase1')}
              </button>
              </div>
          </div>
        </div>
    </div>

  </div>
  </div>
))}

</>
  )
}