import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home';

function App() {
  return (
    <>
    <div id="loader"></div>
    <Routes>
       <Route path='/' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
