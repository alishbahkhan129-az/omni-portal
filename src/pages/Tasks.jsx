import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Plus, Calendar, X } from 'lucide-react'; 

// Premium Single Task Card
const SingleTask = ({ taskName, level, deadline }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 mb-3 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 group cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-center mb-3">
        {/* Soft Pill Badges for Priority Levels */}
        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${
          level === 'High' 
            ? 'bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400' 
            : level === 'Medium'
            ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'
            : 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
        }`}>
          {level}
        </span>
        <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition">
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
        {/* Letter Initials Avatar */}
        <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-[9px] font-bold text-blue-600 dark:text-blue-400">
          UK
        </div>
      </div>
    </div>
  );
};

// Clean Column Component with Dynamic Data Mapping
const TaskColumn = ({ colTitle, tasks, onOpenModalWithStatus }) => {
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
        <button 
          type="button"
          onClick={() => onOpenModalWithStatus(colTitle)}
          className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-1 rounded-md hover:bg-white dark:hover:bg-gray-800 shadow-sm transition cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Task Cards Area */}
      <div className="flex-1 overflow-y-auto hidden-scrollbar">
        {tasks.length > 0 ? (
          tasks.map((task, idx) => (
            <SingleTask 
              key={task.id || idx}
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
  const initialTasks = [
    { id: 1, taskName: "Market Research for App", level: "High", deadline: "May 10", status: "To Do" },
    { id: 2, taskName: "Define User Personas", level: "Medium", deadline: "May 12", status: "To Do" },
    { id: 3, taskName: "Landing Page UI Design", level: "High", deadline: "May 08", status: "In Progress" },
  ];

  const [allTasks, setAllTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    taskName: "",
    level: "Medium",
    deadline: "Jul 30",
    status: "To Do"
  });

  // LocalStorage check and fallback loading
  useEffect(() => {
    const savedTasks = localStorage.getItem("omni_tasks_data");
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          setAllTasks(parsed);
        }
      } catch (e) {
        console.error("Error parsing tasks localStorage:", e);
      }
    }
  }, []);

  const handleOpenModal = (presetStatus = "To Do") => {
    setFormData((prev) => ({ ...prev, status: presetStatus }));
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.taskName.trim()) return;

    const newTask = {
      id: Date.now(),
      taskName: formData.taskName,
      level: formData.level,
      deadline: formData.deadline || "Jul 30",
      status: formData.status
    };

    const updatedTasks = [newTask, ...allTasks];
    setAllTasks(updatedTasks);
    localStorage.setItem("omni_tasks_data", JSON.stringify(updatedTasks));

    // Reset Form & Close Modal
    setFormData({ taskName: "", level: "Medium", deadline: "Jul 30", status: "To Do" });
    setIsModalOpen(false);
  };

  // Filter tasks for specific columns dynamically
  const todoTasks = allTasks.filter(t => t.status === "To Do");
  const inProgressTasks = allTasks.filter(t => t.status === "In Progress");
  const doneTasks = allTasks.filter(t => t.status === "Done");

  return (
    <div className="p-4 space-y-8 relative">
      {/* Board Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Task Pipeline</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track your sprint workflow execution.</p>
        </div>
        <button 
          type="button" 
          onClick={() => handleOpenModal("To Do")} 
          className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 active:scale-95 transition-all cursor-pointer"
        >
          + New Task
        </button>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TaskColumn colTitle="To Do" tasks={todoTasks} onOpenModalWithStatus={handleOpenModal} />
        <TaskColumn colTitle="In Progress" tasks={inProgressTasks} onOpenModalWithStatus={handleOpenModal} />
        <TaskColumn colTitle="Done" tasks={doneTasks} onOpenModalWithStatus={handleOpenModal} />
      </div>

      {/* + New Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] transition-all p-4">
          <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 w-full max-w-md p-6 rounded-2xl shadow-xl space-y-4 text-gray-900 dark:text-white">
            <div className="flex justify-between items-center border-b dark:border-gray-800 pb-3">
              <h3 className="text-lg font-bold">Add New Task</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Task Title</label>
                <input 
                  type="text"
                  placeholder="e.g. Integrate API Endpoints"
                  required
                  value={formData.taskName}
                  onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Priority Level</label>
                <select 
                  value={formData.level} 
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })} 
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Column Status</label>
                <select 
                  value={formData.status} 
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Deadline (e.g. Jul 28)</label>
                <input 
                  type="text"
                  placeholder="Jul 28"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-sm active:scale-95 cursor-pointer">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;