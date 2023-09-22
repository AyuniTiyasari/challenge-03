import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import EditTask from './pages/EditTask';

const App = () => {
  return (

      <Routes>
        <Route path='*' element={<Home />} />
        <Route path='/editTask/:id' element={<EditTask />} />
      </Routes>
  )
  }

export default App;
