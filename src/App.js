
import Main from "./components/Main.js";
import Home from "./components/Home/Home.js";
import { Route, Routes } from "react-router-dom";
function App() {

  return (
    <div className="App">
     
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:username" element={<Main />} />
      </Routes>
     
    </div>
  );
}

export default App;
