import {Navigate, Route, Routes} from 'react-router-dom'
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import { Toaster } from 'react-hot-toast';

function App(){
  return(
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
      
      <Toaster position="top-right" reverseOrder={false} />
      <div className="relative z-10">
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;