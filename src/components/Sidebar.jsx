import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard as DashIcon, 
  ListTodo as TaskIcon, 
  FolderKanban as ProjectIcon, 
  Users as TeamIcon,
  Sun, 
  Moon 
} from 'lucide-react';

const Sidebar = () => {
  // Check kar rahay hain ke pehle se dark mode on hai ya nahi
  const [isDark, setIsDark] = useState(false);

  // Toggle handle karne wala function
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const myLinks = [
    { label: 'Operations', url: '/', icon: <DashIcon size={18} /> },
    { label: 'Tasks', url: '/tasks', icon: <TaskIcon size={18} /> },
    { label: 'Projects', url: '/projects', icon: <ProjectIcon size={18} /> },
    { label: 'Team', url: '/team', icon: <TeamIcon size={18} /> },
  ];

  return (
    /* bg-white ko dark mode mein gray-900 kiya hai */
    <div className="w-60 h-screen bg-white dark:bg-gray-900 border-r dark:border-gray-800 fixed left-0 top-0 p-4 flex flex-col transition-colors duration-300">
      
      <div className="px-2 mb-8">
        <h1 className="text-blue-600 font-extrabold text-xl">
          OmniPortal
        </h1>
      </div>

      <nav className="flex-1">
        {myLinks.map((link) => (
          <NavLink 
            key={link.label} 
            to={link.url}
            className={({ isActive }) => {
              const baseStyle = "flex items-center gap-4 px-4 py-3 rounded-lg mb-1 text-sm transition";
              
              // Active style mein dark mode ka bhi dhyan rakha hai
              const activeStyle = "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold border-l-4 border-blue-600";
              
              // Normal text ko dark mode mein gray-300 rakha hai
              const normalStyle = "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800";
              
              return isActive ? `${baseStyle} ${activeStyle}` : `${baseStyle} ${normalStyle}`;
            }}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* --- Dark Mode Toggle Section --- */}
      <div className="border-t dark:border-gray-800 pt-4 mt-auto">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {isDark ? (
            <><Sun size={18} className="text-yellow-500" /> <span>Light Mode</span></>
          ) : (
            <><Moon size={18} className="text-gray-500" /> <span>Dark Mode</span></>
          )}
        </button>
        
        <div className="mt-4 text-[10px] text-gray-400 px-4">
          <p>Project Version 1.0 - Alishba</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;