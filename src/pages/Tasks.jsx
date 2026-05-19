import { MoreHorizontal, Plus } from 'lucide-react'; // Icons import.

// Task ka dabba SingleTask: Hrr ek task card ki detail (Name, Level, Deadline) handlingssssssssssss
const SingleTask = ({ taskName, level, deadline }) => {
  return (
    /* Card Container: Hover karne pr border ka color blue ho jaye */
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-3 hover:border-blue-400 dark:hover:border-blue-500 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-2">

        {/* Priority dikhane ke liye condition lagayi hai - dark mode colors ke sath Agar level 'High' hai to red, warna blue*/}
        <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${
          level === 'High' 
            ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
            : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
        }`}>
          {level}
        </span>
        {/* Menu button (Option icon) */}
        <button className="text-gray-300 hover:text-gray-400">...</button>
      </div>

        {/* Task ka naam: dark mode mein text color gray-200 ho jayega */}
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-4">{taskName}</h4>

      {/* Footer: Deadline aur ek chota avatar icon */}
      <div className="flex justify-between items-center text-gray-400 text-[10px]">
        <span>{deadline}</span>
        {/* Chota gol circle user avatar ke liye */}
        <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"></div>
      </div>
    </div>
  );
};

// Column component - isme tasks ki list hogi
const TaskColumn = ({ colTitle, total }) => {
  return (
    /* Column background ko dark mode mein thoda alag shade diya hai */
    /* Column Container: min-h-[400px] takay agar tasks na hon tab bhi column lamba dikhe */
    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl w-full min-h-[400px] border border-gray-100 dark:border-gray-800 transition-colors">
     
      {/* Column Header: Title aur total count (jaise: To Do (2)) */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-gray-600 dark:text-gray-300 text-sm">
          {colTitle} <span className="ml-2 text-gray-400 font-normal">({total})</span>
        </h3>
        <button className="text-gray-400 hover:text-gray-600">+</button>
      </div>

      {/* Logic: Column Title ke hisab se specific tasks showingsss */}
      {/* Yahan manually tasks add kiye hain practice ke liye */}
      {colTitle === "To Do" && (
        <>
          <SingleTask taskName="Market Research for App" level="High" deadline="May 10" />
          <SingleTask taskName="Define User Personas" level="Medium" deadline="May 12" />
        </>
      )}

      {colTitle === "In Progress" && (
        <SingleTask taskName="Landing Page UI Design" level="High" deadline="May 08" />
      )}

      {/* Empty State: Agar koi task nahi hai to placeholder text dikhanaaa */}
      {/* Khali column ke liye placeholder */}
      {total === "0" && (
        <p className="text-[10px] text-gray-300 dark:text-gray-600 text-center mt-10 italic">No tasks yet</p>
      )}
    </div>
  );
};

const Tasks = () => {
  return (
    <div className="p-2">

      {/* Title section */}
      {/* Board Header: Main Title aur New Task ka button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Task Board</h1>
          {/* Optional sub-text for consistency */}
          <p className="text-xs text-gray-400">Manage your daily workflow here.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs shadow hover:bg-blue-700">
          + New Task
        </button>
      </div>

      {/* Layout Grid: Mobile pe 1 column, Medium screens (Tablets) se upar 3 columns */}
      {/* Grid for columns: Mobile pe 1, Tablets pe 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Teeno columns ko unke title aur count ke sath call kra phrrrr*/}
        <TaskColumn colTitle="To Do" total="2" />
        <TaskColumn colTitle="In Progress" total="1" />
        <TaskColumn colTitle="Done" total="0" />
      </div>
    </div>
  );
};

export default Tasks;

// Conditional Rendering: {colTitle === "To Do" && ...} ka matlab hai ke tasks sirf tabhi dikhen ge jab column ka naam match karega.
// Tailwind Grid: md:grid-cols-3 board ko desktop par horizontally (aik line mein) aur mobile par vertically adjust karta hai.
// Dark Mode Integration: dark:bg-gray-900/50 jesi classes se screen dark hone par khud ba khud rang badal jayenge.
// Reusable Components: SingleTask ko ek baar likh hai lekin use baar-baar alag data ke sath kiya jaega.