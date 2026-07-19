import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Operations from './pages/Operations';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects'; 
import Team from './pages/Team'; 

// 1. Chota sa 404 Component (Isay tum baad mein alag page bhi bana sakti ho)
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-2">404</h1>
      <p className="text-gray-600 dark:text-gray-400">Oops! Page not found.</p>
    </div>
  );
};

// Main Layout
const MainLayout = () => {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <Sidebar />
      {/* ml-60 padding lagayi hai, dhyan rakhna Sidebar ki width bhi w-60 hi ho taake content chupay nahi */}
      <main className="flex-1 p-8 ml-60 text-gray-900 dark:text-gray-100"> 
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Operations />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          <Route path="team" element={<Team />} />
          
          {/* 2. Yeh route har galat URL ko pakar kar 404 dikhaye ga */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;