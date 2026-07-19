import { Folder, MoreVertical, Calendar } from 'lucide-react'; 

// Premium Reusable Project Card
const MyProjectCard = ({ projectName, type, completion, themeColor, rawColor }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-350 group">

      {/* Upper part: Dynamic Icon Container & More Icon */}
      <div className="flex justify-between items-start mb-5">
        <div className={`p-3 rounded-xl ${themeColor} bg-opacity-10 dark:bg-opacity-20`}>
          {/* Icon color now matches the specific theme perfectly */}
          <Folder size={18} className={rawColor} />
        </div>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
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
          {/* 1. FIXED: Progress bar color matches the project theme color now! */}
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${themeColor}`} 
            style={{ width: `${completion}%` }} 
          ></div>
        </div>
      </div>

      {/* Footer: Date & Enhanced Avatar Stack */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/80 flex justify-between items-center text-gray-400">
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500">
          <Calendar size={13} />
          <span>Due: 2026</span>
        </div>

        {/* Dynamic & realistic avatar stack look */}
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
  // Added separate background tailwind classes and text color classes for precision styling
  const myWorks = [
    { projectName: "Omni Portal Admin", type: "Web Development", completion: 75, themeColor: "bg-blue-600", rawColor: "text-blue-600" },
    { projectName: "E-Commerce App", type: "Mobile Design", completion: 45, themeColor: "bg-pink-600", rawColor: "text-pink-600" },
    { projectName: "Brand Identity", type: "Graphic Design", completion: 100, themeColor: "bg-emerald-600", rawColor: "text-emerald-600" },
    { projectName: "SEO Optimization", type: "Marketing", completion: 20, themeColor: "bg-amber-600", rawColor: "text-amber-600" },
  ];

  return (
    <div className="p-4 space-y-8">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Projects Workspace</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track your active team pipelines.</p>
        </div>
        <div className="flex gap-2.5">
          <button className="border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-xl text-sm font-semibold dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all">
            Filter
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-blue-700 active:scale-95 transition-all">
            + New Project
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {myWorks.map((work, index) => (
          <MyProjectCard 
            key={index} 
            projectName={work.projectName}
            type={work.type}
            completion={work.completion}
            themeColor={work.themeColor}
            rawColor={work.rawColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;