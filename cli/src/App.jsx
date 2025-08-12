import { Route, Routes } from "react-router-dom";
import Home from "./pagess/Home";
import Layoutt from "./pagess/Layoutt";
import { Dashboard } from "./pagess/Dashboard";
import { Articles } from "./pagess/Articles";
import Blogtitle from "./pagess/Blogtitle";
import GenrateIm from "./pagess/GenrateIm";
import Review from "./pagess/Review";
import Community from "./pagess/Community";

import './index.css';
import Removeobj from "./pagess/Removeobj";
import RemoveBackground from "./pagess/RemoveBackground";
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

function App() {
const {getToken}=useAuth();
useEffect(() => {
  getToken().then((token) => {
    console.log("Token:", token);
  });
}, []);

  return (
    <div>
      <Routes>
        {/* Standalone Navbar route */}
      

        {/* Main /ai layout with nested children */}
        <Route path="/ai" element={<Layoutt />}>
          <Route index element={<Dashboard />} />
          <Route path="w-a" element={<Articles />} />
          <Route path="bt" element={<Blogtitle />} />
          <Route path="gen" element={<GenrateIm />} />
          <Route path="rev" element={<Review />} />
          <Route path="com" element={<Community />} />
          <Route path='ro' element={<Removeobj></Removeobj>} />
          <Route path='remback' element={<RemoveBackground></RemoveBackground>} />
        </Route>

        {/* Home route */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
