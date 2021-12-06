import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Test from './pages/Test';
import Map from './pages/Map';
import ArtistProfile from './pages/ArtistProfile';

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

          <Route 
            exact path="/map"
            element={<Map />}
          />

          <Route 
            exact path="/map/:artistDB"
            element={<ArtistProfile />}
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
