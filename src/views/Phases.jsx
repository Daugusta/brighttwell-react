import React, { useState } from 'react';
import "./tailwind.css";

const Phases = ({ formulaPhases, products }) => {
  const [rangeValue, setRangeValue] = useState(6); // Valor predeterminado del rango
  const [formula, setFormula] = useState({
    phases: [] // Inicializamos phases como un arreglo vacío
  });
  // const [formula, setFormula] = useState({
  //   phases: Array.from({ length: formulaPhases.phases.length }, () => ({
  //     delay_2_order: 6 // Valor predeterminado del rango
  //   }))
  // });
  
  console.log(formulaPhases);
  console.log(formula);
  // Función para manejar el cambio de valor del rango+++++++++++++++++++++++++++++++++++++++++
  // Función para manejar el cambio de valor del rango
  const handleRangeChange = (event, index) => {
    const newValue = parseInt(event.target.value);
    setRangeValue(newValue); // Actualiza el valor del rango global

    setFormula(prevFormula => ({
      ...prevFormula,
      phases: prevFormula.phases.map((phase, i) =>
        i === index ? { ...phase, delay_2_order: newValue } : phase
      )
    }));
  };

    // Función para manejar el cambio de valor del input de delay_2_order++++++++++++++++++++++++
    const handleDelayOrderChange = (event, index) => {
      const newValue = parseInt(event.target.value);
      setFormula(prevFormula => ({
        ...prevFormula,
        phases: prevFormula.phases.map((phase, i) =>
          i === index ? { ...phase, delay_2_order: newValue } : phase
        )
      }));
      setRangeValue(newValue); // Actualiza el valor del rango global
    };

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

const handlePhaseChange = (index, key, value) => {
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
  const radios = [];
  const delayOrder = formulaPhases.phases[index].delay_2_order;
  const delayValue = formulaPhases.phases[index].delay_2;

  for (let i = 0; i < 6; i++) {
    const dosageIndex = i + 1;
    const isShaded = delayValue && delayOrder > 0 && delayOrder <= dosageIndex;

    radios.push(
      <ul key={`radio${i}`}>
        <li
          className={`focus:border-green-200 px-2 mt-2 text-sm ${delayOrder === dosageIndex || (delayOrder === 0 && dosageIndex === 6) ? '' : 'opacity-10'}`}
        >
          <div className="">
            <input
              type="text"
              id={`list-radio-${dosageIndex}`}
              value={formulaPhases.phases[index].delay_2}
              onClick={() => handlePhaseChange(index, 'delay_2_order', dosageIndex)}
              className="border rounded w-20 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
            />
          </div>
        </li>
      </ul>
    );

    dropdowns.push(
      <div className="relative flex items-stretch" data-te-dropdown-ref key={`dropdown${i}`}>
        <select
          className={`border rounded-l h-10 w-3/4 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${isShaded ? 'bg-gray-200' : ''}`}
          value={formulaPhases.phases[index].dosages && formulaPhases.phases[index].dosages.find(dosage => dosage?.num === dosageIndex)?.product_name || ''}
          onChange={(ev) => handlePhaseChange(index, `dropdown${dosageIndex}`, ev.target.value)}
          key={`dropdown${i}`}
        >
          <option value="">Seleccionar</option>
          {products.map((product, idx) => (
            <option key={idx} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>

        <input
          value={formulaPhases.phases[index].dosages && formulaPhases.phases[index].dosages.find(dosage => dosage?.num === dosageIndex)?.dose || ''}
          onChange={(ev) => handlePhaseChange(index, `input${dosageIndex}`, ev.target.value)}
          placeholder="g/kg"
          className={`border rounded-l h-10 w-1/4 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${isShaded ? 'bg-gray-200' : ''}`}
          style={{ opacity: isShaded ? 1 : 0.2 }}
          disabled={!isShaded}
          key={`input${i}`}
        />
      </div>
    );
  }

  return { dropdowns, radios };
};
// const generateDropdowns = (index) => {
//   const dropdowns = [];
//   const inputs = [];
//   const radios = [];
//   const delayOrder = formulaPhases.phases[index].delay_2_order;
//   const delayValue = formulaPhases.phases[index].delay_2;
//   for (let i = 0; i < 6; i++) {
//     const dosageIndex = i + 1; // Ajuste para la correspondencia con el número

//     let isShaded = false;
//     //const isShaded = delayOrder >= (6 - dosageIndex + 1);
//     //const isShaded = delayValue && delayOrder <= dosageIndex;
//     if (delayValue && delayOrder > 0 && delayOrder <= dosageIndex) { 
//       isShaded = true;
//     }

//     radios.push(
//       <ul>
//         <li
//           className={` focus:border-green-200 px-2 mt-2 text-sm ${formulaPhases.phases[index].delay_2_order == dosageIndex || (formulaPhases.phases[index].delay_2_order === 0 && dosageIndex === 6) ? '' : 'opacity-10'}`}
//         >
//           <div className="">
//             <input
//               type="text"
//               id={`list-radio-${dosageIndex}`}
//               value={formulaPhases.phases[index].delay_2}
//               onClick={() => handlePhaseChange(index, 'delay_2_order', dosageIndex)}
//               className="border rounded w-20 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
//             />
//           </div>
//         </li>
//       </ul>
//     );
        
//     dropdowns.push(
//       <div class="relative  flex items-stretch" data-te-dropdown-ref>
//         <select
//           class={`border rounded-l h-10 w-3/4 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${isShaded ? 'bg-gray-200' : ''}`}
//           key={`dropdown${i}`}
//           value={formulaPhases.phases[index].dosages && formulaPhases.phases[index].dosages.find(dosage => dosage?.num === dosageIndex)?.product_name || ''}
//           onChange={(ev) => handlePhaseChange(index, `dropdown${dosageIndex}`, ev.target.value)}
//         >
//           <option value="">Seleccionar</option>
//           {products.map((product, idx) => (
//             <option key={idx} value={product.name}>
//               {product.name}
//             </option>
//           ))}
//         </select>
    
//         <input
//           key={`input${i}`}
//           value={formulaPhases.phases[index].dosages && formulaPhases.phases[index].dosages.find(dosage => dosage?.num === dosageIndex)?.dose || ''}
//           onChange={(ev) => handlePhaseChange(index, `input${dosageIndex}`, ev.target.value)}
//           placeholder="g/kg"
//           class={`border rounded-l h-10 w-1/4 focus:outline-none focus:border-green-200 px-2 mt-2 text-sm ${isShaded ? 'bg-gray-200' : ''}`}
//         />
    
//         <ul
//           class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
//           data-te-dropdown-menu-ref
//         >
//           <li>
//             <a
//               class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
//               href="#"
//               data-te-dropdown-item-ref
//             >
//               Seleccionar
//             </a>
//           </li>
//           {products.map((product, idx) => (
//             <li key={idx}>
//               <a
//                 class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
//                 href="#"
//                 data-te-dropdown-item-ref
//                 onClick={() => handlePhaseChange(index, `dropdown${dosageIndex}`, product.product_name)}
//               >
//                 {product.product_name}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   return { dropdowns, inputs, radios };
// };

return (
  formulaPhases.phases && formulaPhases.phases.map((phase, index) => (
    <div key={index} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-3 md:max-w-2xl">
      <div>
        <div className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">
          {phase.num ? `Phase # ${phase.num}` : 'Phase New'}
        </div>
        {/* Primera Fila */}
        <div className="md:flex-1 px-6 py-4">
          <div class="grid grid-cols-2  gap-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phase Number</label>
              <input
                value={phase.num || ''} // Establecer el valor como cadena vacía si no hay número de fase
                readOnly={!!phase.num} // Hacer que el campo sea de solo lectura si hay un número de fase existente
                onChange={(ev) => handleDelayOrderChange(ev, index)} // Permitir la edición del número de fase
                className={`border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm ${phase.num ? 'bg-gray-200' : 'bg-white'}`} // Cambiar el color de fondo basado en si hay un número de fase
                placeholder="Phase Number*" // Agregar un marcador de posición
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phase Type</label>
              <select
                className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
                value={phase.phase_type}
                onChange={(ev) => handlePhaseChange(index, 'phase_type', ev.target.value)}
              >
                <option value="">None</option>
                <option value="0">Non-Specified</option>
                <option value="1">Pre-Wash</option>
                <option value="2">Main Wash</option>
                <option value="3">Bleach</option>
                <option value="4">Neutralizing</option>
                <option value="5">Neutr./Soft.</option>
                <option value="6">Blank</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="container">
            <div className="input-left">
              {/* Inputs de delay_2_order */}
              {generateDropdowns(index).radios}
              {/* {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  id={`list-radio-${i + 1}`}
                  value={phase.delay_2_order === (i + 1) ? phase.delay_2 : ''} // Muestra el valor solo si coincide con delay_2_order
                  onChange={(ev) => handleDelayOrderChange(ev, index)}
                  className={`border rounded w-20 h-10 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500 ${phase.delay_2_order === (i + 1) ? '' : 'opacity-10'}`} // Opacidad basada en si coincide con delay_2_order
                />
              ))} */}
            </div>
            <div className="input-right">
              {/* Rango */}
              <input
                type="range"
                id={`percentageFullRange${index}`}
                step="1"
                min="2"
                max="6"
                orient="vertical"
                onChange={(event) => handleRangeChange(event, index)}
                value={phase.delay_2_order} // Usa delay_2_order para sincronizar el valor del rango
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
    </div>
  ))
);
};

export default Phases;

//   return (
//     formulaPhases.phases && formulaPhases.phases.map((phase, index) => (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-3 md:max-w-2xl">
//       <div>
//       <div className="block text-white bg-primary rounded-lg text-base font-bold mb-2 p-2">
//           {phase.num ? `Phase # ${phase.num}` : 'Phase New'}
//       </div>
//         {/* Primera Fila */}
//         <div className="md:flex-1 px-6 py-4">

//             <div class="grid grid-cols-2  gap-2">
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Phase Number</label>
//               <input
//                 value={phase.num || ''} // Establecer el valor como cadena vacía si no hay número de fase
//                 readOnly={!!phase.num} // Hacer que el campo sea de solo lectura si hay un número de fase existente
//                 onChange={(ev) => handlePhaseChange(index, 'num', ev.target.value)} // Permitir la edición del número de fase
//                 className={`border rounded h-10 w-full focus:outline-none px-2 mt-2 text-sm ${phase.num ? 'bg-gray-200' : 'bg-white'}`} // Cambiar el color de fondo basado en si hay un número de fase
//                 placeholder="Phase Number*" // Agregar un marcador de posición
//               />         

//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Phase Type</label>
//                 <select class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
//                 id={`phaseType_${index}`}
//                 value={phase.phase_type}
//                 onChange={(ev) => handlePhaseChange(index, 'phase_type', ev.target.value)}
//                 >
//                 <option value="">None</option>
//                 <option value="0">Non-Specified</option>
//                 <option value="1">Pre-Wash</option>
//                 <option value="2">Main Wash</option>
//                 <option value="3">Bleach</option>
//                 <option value="4">Neutralizing</option>
//                 <option value="5">Neutr./Soft.</option>
//                 <option value="6">Blank</option>
//                 </select>
//             </div> 
//         </div>
//         </div>
//         <div className="grid grid-cols-2 gap-2">
//           <div className="container">
//             <div className="input-left">
//               {generateDropdowns(index).radios}
//                {/* {[...Array(6)].map((_, index) => (
//                 <input
//                   key={index}
//                   type="number"
//                   id={`value${index + 1}`}
//                   value={index + 1}
//                   style={{
//                     opacity: index + 1 === rangeValue ? 1 : 0.2, // Ajusta la opacidad basada en la coincidencia con el valor del rango
//                     background: index + 1 === rangeValue ? '#f2f2f2' : 'transparent' // Establece el fondo gris para el input seleccionado
//                   }}
//                 />
//               ))} */}
//             </div>

//             <div className="input-right">
//               {/* <input
//                 type="range"
//                 id="percentageFullRange"
//                 step="1"
//                 min="2"
//                 max="6"
//                 orient="vertical"
//                 onChange={handleRangeChange}
//                 value={rangeValue}
//               /> */}
//               <input
//                 type="range"
//                 id={`percentageFullRange${index}`}
//                 step="1"
//                 min="2"
//                 max="6"
//                 orient="vertical"
//                 onChange={(event) => handleRangeChange(event, index)}
//                 value={phase.delay_2_order}
//               />
//             </div>
//           </div>
//           <div className="container">
//             <div >

//             {generateDropdowns(index).dropdowns}

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     ))
//   );
// };

// export default Phases;
