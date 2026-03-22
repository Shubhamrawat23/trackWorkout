import './App.css'
import Dashboard from './pages/dashboard'
import Exercise_page from './pages/exercise_page'
import LogIn from './pages/login'
import Pageheader from './pages/header'
import Main_page from './pages/main_page'

function App() {

  return (
    <div className="min-h-screen w-full flex flex-col text-[#FCFCFC] px-2 overflow-y-auto">
      <Pageheader></Pageheader>
      <Main_page></Main_page>
      {/* <LogIn></LogIn> */}
      {/* <Dashboard></Dashboard> */}
      {/* <Exercise_page></Exercise_page> */}
    </div>
  )
}

export default App
