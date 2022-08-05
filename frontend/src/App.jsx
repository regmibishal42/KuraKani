import {Route,Routes} from 'react-router-dom';
import ChatPage from './Pages/ChatPage';
import HomePage from './Pages/HomePage';
import Wavy from './Pages/Wavy';
import "./App.css";


function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/chats' element={<ChatPage />} />
        <Route path='/wavy' element={<Wavy/>} />
      </Routes>
    </div>
  )
}

export default App
