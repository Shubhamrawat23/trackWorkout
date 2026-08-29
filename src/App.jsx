import './App.css'
import Dashboard from './pages/dashboard'
import LogIn from './pages/login'
import Pageheader from './pages/header'
import MainPage from './pages/main_page'
import WorkoutLog from './pages/ex_log'

function App() {

  return (
    <div className="min-h-screen w-full flex flex-col text-[#FCFCFC] px-2 overflow-y-auto">
      <Pageheader></Pageheader>
      {/* <MainPage></MainPage> */}
      {/* <LogIn></LogIn> */}
      {/* <Dashboard></Dashboard> */}
      <WorkoutLog/>
    </div>
  )
}

export default App
