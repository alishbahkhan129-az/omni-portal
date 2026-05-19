import { Folder, MoreVertical, Calendar } from 'lucide-react'; //// Icons import.

// card ka component h jo projects ki list mein bar bar use hoga
const MyProjectCard = ({ projectName, type, completion, themeColor }) => {
  return (
    /* Main Card Container: Border, padding aur dark mode ke lie bg-gray-800 set */
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-colors">

      {/* Upper part: Icon aur chota menu button */}
      <div className="flex justify-between items-start mb-5">

        {/* themeColor prop se icon ka background dynamic change hoga */}
        <div className={`p-2 rounded-md ${themeColor}`}>
          <Folder size={18} className="text-white" />
        </div>
        <button className="text-gray-300 hover:text-gray-400">...</button>
      </div>
      
      {/* Title aur Category */}
      <h3 className="font-bold text-gray-700 dark:text-white text-md">{projectName}</h3>
      <p className="text-xs text-gray-400 mb-5">{type}</p>

      {/* Progress Bar: Isme percentage calculate ho rai h */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="dark:text-gray-400">Progress</span>
          <span className="font-bold dark:text-gray-200">{completion}%</span>
        </div>

        {/* Bahar wala gry dabba - dark mode mein thoda dark gray ky lye */}
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">

         {/* Blue line: Iski width 'completion' prop se control ho rahi hai */}
          <div 
            className="bg-blue-600 h-1.5 rounded-full" 
            style={{ width: `${completion}%` }} // Inline style se width set.
          ></div>
        </div>
      </div>

      {/* Footer: Date aur choti team icons */}
      <div className="mt-4 pt-4 border-t dark:border-gray-700 flex justify-between items-center text-gray-400">
        <div className="flex items-center gap-1 text-[10px]">
          <Calendar size={12} />
          <span>Due: 2026</span>
        </div>

        {/* Goul circles team members ke liye */}
        <div className="flex -space-x-2">

          {/* Avatar circles ko dark mode mein adjust kiya hai */}
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 border border-white dark:border-gray-800"></div>
          <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/40 border border-white dark:border-gray-800"></div>
          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 border border-white dark:border-gray-800 flex items-center justify-center text-[8px] font-bold text-gray-500 dark:text-gray-300">+2</div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  // Mere projects ka data isko array mein rakha hai loop chalane ke liye
  const myWorks = [
    { projectName: "Omni Portal Admin", type: "Web Development", completion: 75, themeColor: "bg-blue-500" },
    { projectName: "E-Commerce App", type: "Mobile Design", completion: 45, themeColor: "bg-pink-500" },
    { projectName: "Brand Identity", type: "Graphic Design", completion: 100, themeColor: "bg-green-500" },
    { projectName: "SEO Optimization", type: "Marketing", completion: 20, themeColor: "bg-orange-500" },
  ];

  return (
    <div className="p-2">
      {/* Header section: Heading aur Buttons */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Projects List</h1>
          <p className="text-sm text-gray-400">Projects details.</p>
        </div>
        <div className="flex gap-2">
          <button className="border dark:border-gray-700 px-3 py-1.5 rounded text-xs dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Filter</button>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs shadow-sm hover:bg-blue-700">+ New Project</button>
        </div>
      </div>

      {/* Grid: 4 columns for large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {myWorks.map((work, index) => (
          // MyProjectCard ko props bhej rahi hun
          <MyProjectCard 
            key={index} 
            projectName={work.projectName}
            type={work.type}
            completion={work.completion}
            themeColor={work.themeColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;

// Flexibility: Agr mien myWorks array mein 5th item add karungi, tou page par khud-ba-khud ek naya card aa jayega.
// Dark Mode Ready: Hr rang ke sath dark: class d d hai (jaise dark:bg-gray-800).
// Clean UI: Progress bar aur avatars ka overlap UI ko professional dikhaany ky lie designed hai.