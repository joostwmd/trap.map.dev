import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Test from './pages/Test';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route  
            exact path="/"
            element={<Home />}
          />

          <Route 
            exact path="/callback"
            element={<Test />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
