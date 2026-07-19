import { MoreHorizontal, Plus, Calendar } from 'lucide-react'; 

// Premium Single Task Card
const SingleTask = ({ taskName, level, deadline }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 mb-3 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 group cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-center mb-3">
        {/* Soft Pill Badges for Priority Levels */}
        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
          level === 'High' 
            ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400' 
            : 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'
        }`}>
          {level}
        </span>
        {/* Real Lucide Icon Used */}
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition">
          <MoreHorizontal size={14} />
        </button>
      </div>

      {/* Task Name */}
      <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {taskName}
      </h4>

      {/* Footer */}
      <div className="flex justify-between items-center border-t border-gray-50 dark:border-gray-800/60 pt-3 text-gray-400 text-xs">
        <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
          <Calendar size={12} />
          <span>{deadline}</span>
        </div>
        {/* Letter Initials Avatar for professional look */}
        <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-[9px] font-bold text-blue-600 dark:text-blue-400">
          UK
        </div>
      </div>
    </div>
  );
};

// Clean Column Component with Dynamic Data Mapping
const TaskColumn = ({ colTitle, tasks }) => {
  return (
    <div className="bg-gray-50/60 dark:bg-gray-900/40 p-4 rounded-2xl w-full min-h-[500px] border border-gray-100 dark:border-gray-800/60 flex flex-col transition-colors">
      
      {/* Column Header */}
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="font-bold text-gray-700 dark:text-gray-300 text-sm tracking-tight flex items-center gap-2">
          {colTitle} 
          <span className="bg-gray-200/60 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs font-semibold">
            {tasks.length}
          </span>
        </h3>
        <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-1 rounded-md hover:bg-white dark:hover:bg-gray-800 shadow-sm transition">
          <Plus size={14} />
        </button>
      </div>

      {/* Task Cards Area */}
      <div className="flex-1 overflow-y-auto hidden-scrollbar">
        {tasks.length > 0 ? (
          tasks.map((task, idx) => (
            <SingleTask 
              key={idx}
              taskName={task.taskName}
              level={task.level}
              deadline={task.deadline}
            />
          ))
        ) : (
          /* Dynamic Empty State */
          <div className="flex flex-col items-center justify-center h-[350px] border-2 border-dashed border-gray-200/60 dark:border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center italic font-medium">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Tasks = () => {
  // Real-world practice: Saara data ek centralized array mein rakh diya
  const allTasks = [
    { taskName: "Market Research for App", level: "High", deadline: "May 10", status: "To Do" },
    { taskName: "Define User Personas", level: "Medium", deadline: "May 12", status: "To Do" },
    { taskName: "Landing Page UI Design", level: "High", deadline: "May 08", status: "In Progress" },
  ];

  // Filter tasks for specific columns dynamically
  const todoTasks = allTasks.filter(t => t.status === "To Do");
  const inProgressTasks = allTasks.filter(t => t.status === "In Progress");
  const doneTasks = allTasks.filter(t => t.status === "Done");

  return (
    <div className="p-4 space-y-8">
      {/* Board Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Task Pipeline</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track your sprint workflow execution.</p>
        </div>
        <button className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 active:scale-95 transition-all">
          + New Task
        </button>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn colTitle="To Do" tasks={todoTasks} />
        <TaskColumn colTitle="In Progress" tasks={inProgressTasks} />
        <TaskColumn colTitle="Done" tasks={doneTasks} />
      </div>
    </div>
  );
};

export default Tasks;