import HomePage from "../Pages/HomePage";
import ChatPage from "../Pages/ChatPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
