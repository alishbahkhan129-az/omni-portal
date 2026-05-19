import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Operations from './pages/Operations';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects'; 
import Team from './pages/Team'; 

// Ye Layout wala hissa main hai, isse sidebar har page pe nazar ayega
const MainLayout = () => {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Sidebar hamesha left pe rahega */}
      <Sidebar />
      
      {/* Right side wala area jahan pages change honge */}
      <main className="flex-1 p-8 ml-60"> 
        {/* Outlet ka matlab hai ke nested routes yahan show honge */}
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sabse pehle layout load hoga, phir uske andar baqi pages */}
        <Route path="/" element={<MainLayout />}>
          
          {/* Index ka matlab hai ke "/" par ye page khulega */}
          <Route index element={<Operations />} />
          
          {/* Baqi pages ke paths yahan hain */}
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          <Route path="team" element={<Team />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;