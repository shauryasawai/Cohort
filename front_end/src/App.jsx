import Home from "./pages/Home";
import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostEditorPage from './pages/PostEditorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-post" element={<PostEditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;