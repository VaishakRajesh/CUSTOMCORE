import { Outlet } from 'react-router-dom'
import Home from './Pages/home/Home'
import Sidebar from './Components/Sidebar/Sidebar'
import Navbar from './Components/Navbar/Navbar'
import Styles from './App.module.css'

function App() {

  return (
      <div>
         <div className={Styles.Body}>
      <Sidebar/>
      <div className={Styles.Container}>
        <Navbar/>
        <Outlet/>
        </div>
        </div>
       </div>
  )
}

export default App
