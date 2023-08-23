import { Switch, Route,Routes} from 'react-router-dom';
import Home from './Components/Home'
import Item from './Components/Item'
import './App.css';

const App=()=>{
  return(

    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path="/info/:id" element={<Item/>}/>
    </Routes>


  )
}

export default App;
