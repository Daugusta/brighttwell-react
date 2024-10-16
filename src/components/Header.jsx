import React from 'react'
import axiosClient from "../axios-client.js";

// const onLogout = ev => {
//     ev.preventDefault()
  
//     axiosClient.post('/logout')
//       .then(() => {
//         setUser({})
//         setToken(null)
//       })
//   }
//   // cuando hago reload trae de nuevo el user, no se por que trae expert
//   useEffect(() => {
//     axiosClient.get('/user')
//       .then(({data}) => {
//          setUser(data)
//       })
//   }, [])

export default function Header() {
  return (
    <div className='bg-white h-16 px-4 flex justify-between items-center'>
      <div className='relative'>
      <img className="img" src="./src/assets/brightwell.png" alt="Brightwell" />
      </div>
      <div className='flex items-center gap-2 mr-2'>
        <div>1</div>
        <div >2</div>
      </div>
    </div>
  )
}
