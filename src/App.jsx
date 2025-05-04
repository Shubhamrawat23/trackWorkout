import './App.css'
import Dashboard from './pages/dashboard'
import Exercise_page from './pages/exercise_page'
import LogIn from './pages/login'

function App() {

  return (
    <div className="min-h-screen w-full bg-black shadecn-dark text-[#FCFCFC] px-2 overflow-y-auto">
      {/* <LogIn></LogIn> */}
      {/* <Dashboard></Dashboard> */}
      <Exercise_page></Exercise_page>
    </div>
  )
}

export default App
