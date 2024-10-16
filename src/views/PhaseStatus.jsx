import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import { TbWashDry } from "react-icons/tb";
import { TbWashTemperature1 } from "react-icons/tb";
import { TbWashTemperature2 } from "react-icons/tb";
import { LuTriangle } from "react-icons/lu";
import { TbWash } from "react-icons/tb";
import { TbFlower } from "react-icons/tb";
import { BsQuestionDiamond } from "react-icons/bs";
import { TbWashOff } from "react-icons/tb";
const PhaseStatus = ({ processStatus }) => {
console.log(processStatus)
const [phasestat, setPhasestat] = useState(null);

useEffect(() => {
  setPhasestat(processStatus);
}, [processStatus]);
console.log(phasestat)
if (phasestat && phasestat.phase_type_active) {
  console.log(phasestat.phase_type_active);
} else {
  console.log("phasestat is null or phase_type_active is undefined");
}
      const iconSize = 35;
    //   const buttonStyle = {
    //       position: 'relative',
    //     };
    const renderIconByPhaseType = (phaseType, iconSize) => {
        switch (phaseType) {
          case 0:
            return <TbWashDry fontSize={iconSize} />;
          case 1:
            return <TbFlower fontSize={iconSize} />;
          case 2:
            return <TbWash fontSize={iconSize} />;
          case 3:
            return <TbWashTemperature1 fontSize={iconSize} />;
          case 4:
            return <TbWashTemperature2 fontSize={iconSize} />;
          case 5:
            return <BsQuestionDiamond fontSize={iconSize} />;
          case 6:
            return <LuTriangle fontSize={iconSize} />;
          case 7:
            return <TbWashOff fontSize={iconSize} />;
          // Agrega más casos según sea necesario
          default:
            // Puedes mostrar algo predeterminado si el valor no coincide con ningún caso
            return <TbWashDry fontSize={iconSize} />;
        }
      };

  return (
    <div>
        
        <div className="flex space-x-1">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((bit, index) => (
            <div
            key={index}
            className={`px-1 mt-2 border border-gray-300 focus:outline-none ${
              phasestat.formula_pbits_expected & (1 << index) ? 'bg-gray-200' : ''
            } ${phasestat.formula_pbits_received & (1 << index) ? 'bg-green-200' : ''}`}
            >
            {phasestat.formula_pbits_expected & (1 << index) ? (
                // Si el bit está activo, muestra el icono TbWashPress
                renderIconByPhaseType(phasestat.phase_type_active[index], 35)
            ) : (
                // Si el bit está inactivo, muestra el icono TbWashDry
                <TbWashDry fontSize={iconSize} />
            )}
            </div>
        ))}
        </div>
        
    </div>
  )
}

export default PhaseStatus

// import { useEffect, useState } from "react";
// import axiosClient from "../axios-client.js";
// import { TbWashDry } from "react-icons/tb";
// import { TbWashTemperature1 } from "react-icons/tb";
// import { TbWashTemperature2 } from "react-icons/tb";
// import { LuTriangle } from "react-icons/lu";
// import { TbWash } from "react-icons/tb";
// import { TbFlower } from "react-icons/tb";
// import { BsQuestionDiamond } from "react-icons/bs";
// import { TbWashOff } from "react-icons/tb";

// const PhaseStatus = ({processStatus}) => {
//   // const [formulaPbitsExpected, setFormulaPbitsExpected] = useState([]);
//   // const [formulaPbitsReceived, setFormulaPbitsReceived] = useState([]);
//   // const [phaseTypeActive, setPhaseTypeActive] = useState([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const { data } = await axiosClient.get('/rtview');
//   //       const firstItem = data.data[0];

//   //       setFormulaPbitsExpected(firstItem.formula_pbits_expected);
//   //       setFormulaPbitsReceived(firstItem.formula_pbits_received);
//   //       setPhaseTypeActive(firstItem.phase_type_active);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   //   fetchData(); // Invocar la función async IIFE inmediatamente

//   //   // Configurar la recarga automática cada segundo
//   //   const intervalId = setInterval(() => {
//   //     fetchData();
//   //   }, 30000);

//   //   // Limpiar el intervalo al desmontar el componente
//   //   return () => clearInterval(intervalId);
//   // }, []);

//   // const iconSize = 35;

//   // const renderIconByPhaseType = (phaseType) => {
//   //   // ... (código de renderización del icono)
//   // };

//   return (
//     <div className="flex space-x-1">
//     {[1, 2, 3, 4, 5, 6, 7, 8].map((bit, index) => (
//         <div
//         key={index}
//         className={`px-1 mt-2 border border-gray-300 focus:outline-none ${
//             uprocessStatus.formula_pbits_expected & (1 << index) ? 'bg-gray-200' : ''
//         } ${processStatus.formula_pbits_received & (1 << index) ? 'bg-green-200' : ''}`}
//         >
//         {processStatus.formula_pbits_expected & (1 << index) ? (
//             // Si el bit está activo, muestra el icono TbWashPress
//             renderIconByPhaseType(processStatus.phase_type_active[index], 35)
//         ) : (
//             // Si el bit está inactivo, muestra el icono TbWashDry
//             <TbWashDry fontSize={iconSize} />
//         )}
//         </div>
//     ))}
//     </div> 
//   );
// };

// export default PhaseStatus;
