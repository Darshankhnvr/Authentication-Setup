import {Navigate, Route, Routes} from 'react-router-dom'
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import { Toaster } from 'react-hot-toast';

function App(){
  return(
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;