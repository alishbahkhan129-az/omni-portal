import React, { useState, useEffect } from 'react';
import { Folder, MoreVertical, Calendar, X } from 'lucide-react'; 

// Premium Reusable Project Card
const MyProjectCard = ({ projectName, type, completion, themeColor, rawColor, year = "2026" }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-350 group">

      {/* Upper part: Dynamic Icon Container & More Icon */}
      <div className="flex justify-between items-start mb-5">
        <div className={`p-3 rounded-xl ${themeColor} bg-opacity-10 dark:bg-opacity-20`}>
          <Folder size={18} className={rawColor} />
        </div>
        <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <MoreVertical size={16} />
        </button>
      </div>
      
      {/* Title & Category */}
      <h3 className="font-bold text-gray-800 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
        {projectName}
      </h3>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 mb-6 font-medium">{type}</p>

      {/* Progress Bar Container */}
      <div className="mb-5">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-400 font-medium">Progress</span>
          <span className="font-bold text-gray-700 dark:text-gray-200">{completion}%</span>
        </div>

        {/* Track */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${themeColor}`} 
            style={{ width: `${completion}%` }} 
          ></div>
        </div>
      </div>

      {/* Footer: Date & Avatar Stack */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/80 flex justify-between items-center text-gray-400">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500">
          <Calendar size={13} />
          <span>Due: {year}</span>
        </div>

        {/* Avatar stack */}
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[9px] font-bold text-blue-600 dark:text-blue-300">AK</div>
          <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[9px] font-bold text-indigo-600 dark:text-indigo-300">AA</div>
          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[9px] font-bold text-gray-500 dark:text-gray-400">+2</div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const initialWorks = [
    { id: 1, projectName: "Omni Portal Admin", type: "Web Development", completion: 75, themeColor: "bg-blue-600", rawColor: "text-blue-600" },
    { id: 2, projectName: "E-Commerce App", type: "Mobile Design", completion: 45, themeColor: "bg-pink-600", rawColor: "text-pink-600" },
    { id: 3, projectName: "Brand Identity", type: "Graphic Design", completion: 100, themeColor: "bg-emerald-600", rawColor: "text-emerald-600" },
    { id: 4, projectName: "SEO Optimization", type: "Marketing", completion: 20, themeColor: "bg-amber-600", rawColor: "text-amber-600" },
  ];

  const [projects, setProjects] = useState(initialWorks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    type: "Web Development",
    completion: 10,
    categoryColor: "blue"
  });

  // LocalStorage check and fallback loading
  useEffect(() => {
    const savedProjects = localStorage.getItem("omni_projects_data");
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
        }
      } catch (e) {
        console.error("Error parsing projects localStorage:", e);
      }
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.projectName.trim()) return;

    // Map color choice to theme classes
    const colorMap = {
      blue: { themeColor: "bg-blue-600", rawColor: "text-blue-600" },
      pink: { themeColor: "bg-pink-600", rawColor: "text-pink-600" },
      emerald: { themeColor: "bg-emerald-600", rawColor: "text-emerald-600" },
      amber: { themeColor: "bg-amber-600", rawColor: "text-amber-600" },
      purple: { themeColor: "bg-purple-600", rawColor: "text-purple-600" },
    };

    const selectedColor = colorMap[formData.categoryColor] || colorMap.blue;

    const newProject = {
      id: Date.now(),
      projectName: formData.projectName,
      type: formData.type,
      completion: Number(formData.completion) || 0,
      themeColor: selectedColor.themeColor,
      rawColor: selectedColor.rawColor
    };

    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem("omni_projects_data", JSON.stringify(updatedProjects));

    // Reset Form & Close Modal
    setFormData({ projectName: "", type: "Web Development", completion: 10, categoryColor: "blue" });
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 space-y-8 relative">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Projects Workspace</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track your active team pipelines.</p>
        </div>
        <div className="flex gap-2.5">
          <button type="button" className="border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-xl text-sm font-semibold dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all cursor-pointer">
            Filter
          </button>
          <button 
            type="button" 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
          >
            + New Project
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((work) => (
          <MyProjectCard 
            key={work.id || work.projectName} 
            projectName={work.projectName}
            type={work.type}
            completion={work.completion}
            themeColor={work.themeColor}
            rawColor={work.rawColor}
          />
        ))}
      </div>

      {/* + New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] transition-all p-4">
          <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 w-full max-w-md p-6 rounded-2xl shadow-xl space-y-4 text-gray-900 dark:text-white">
            <div className="flex justify-between items-center border-b dark:border-gray-800 pb-3">
              <h3 className="text-lg font-bold">Add New Project</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Project Name</label>
                <input 
                  type="text"
                  placeholder="e.g. AI Portfolio Dashboard"
                  required
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Category / Type</label>
                <select 
                  value={formData.type} 
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })} 
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Design">Mobile Design</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="UI/UX Research">UI/UX Research</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Initial Progress ({formData.completion}%)</label>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={formData.completion}
                  onChange={(e) => setFormData({ ...formData, completion: e.target.value })}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Card Theme Color</label>
                <select 
                  value={formData.categoryColor} 
                  onChange={(e) => setFormData({ ...formData, categoryColor: e.target.value })} 
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition"
                >
                  <option value="blue">Blue</option>
                  <option value="pink">Pink</option>
                  <option value="emerald">Emerald Green</option>
                  <option value="amber">Amber Yellow</option>
                  <option value="purple">Purple</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-sm active:scale-95 cursor-pointer">Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;