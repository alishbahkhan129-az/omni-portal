import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx"; 

// Pages ke imports
import Operations from "./pages/Operations.jsx";
import Projects from "./pages/Projects.jsx";
import Tasks from "./pages/Tasks.jsx";
import Team from "./pages/Team.jsx";

export default function App() {
  return (
    /* bg-gray-50 light mode ke liye aur dark:bg-neutral-900 dark mode ke liye text color ke sath */
    <div className="flex h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pl-60 p-6">
        <Routes>
          <Route path="/" element={<Operations />} /> 
          <Route path="/operations" element={<Operations />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </div>
  );
}