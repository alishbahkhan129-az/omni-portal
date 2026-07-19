import { useState, useEffect } from "react";
import { ListTodo, CheckCircle2, Users, BarChart3, MoreVertical, X } from "lucide-react";

export default function Operations() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    leadMember: "",
    status: "In Progress",
    priority: "Medium"
  });

  // 1️⃣ Pehle local storage check karein ge, agar wahan data nahi hai toh JSON file fetch hogi
  useEffect(() => {
    const savedData = localStorage.getItem("omni_operations_data");

    if (savedData) {
      setData(JSON.parse(savedData));
      setLoading(false);
    } else {
      fetch("/dashboardData.json")
        .then((response) => response.json())
        .then((jsonData) => {
          setData(jsonData);
          localStorage.setItem("omni_operations_data", JSON.stringify(jsonData));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
          setLoading(false);
        });
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.leadMember.trim()) return;

    const newTask = {
      id: Date.now(),
      leadMember: formData.leadMember,
      status: formData.status,
      priority: formData.priority
    };

    // 2️⃣ Naya data state mein add karne ke sath sath Local Storage mein bhi save karna
    setData((prevData) => {
      const updatedData = {
        ...prevData,
        recentTasks: [newTask, ...prevData.recentTasks]
      };
      localStorage.setItem("omni_operations_data", JSON.stringify(updatedData));
      return updatedData;
    });

    setFormData({ leadMember: "", status: "In Progress", priority: "Medium" });
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <p className="text-lg font-medium text-gray-500 animate-pulse">Loading Dashboard Data...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <p className="text-lg font-medium text-red-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Operations Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time system updates and internal metrics.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm active:scale-95"
        >
          + Add New
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Pending Tasks</p>
            <h3 className="text-2xl font-black mt-1 text-gray-800 dark:text-white">{data.stats.pendingTasks}</h3>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-xl">
            <ListTodo size={20} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Completed</p>
            <h3 className="text-2xl font-black mt-1 text-gray-800 dark:text-white">{data.stats.completedTasks}</h3>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-xl">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Active Staff</p>
            <h3 className="text-2xl font-black mt-1 text-gray-800 dark:text-white">{data.stats.activeStaff}</h3>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-500 rounded-xl">
            <Users size={20} />
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800/60 flex justify-between items-center">
          <h2 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-500" /> Recent Operations Log
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/40 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800/60">
                <th className="px-6 py-3">Lead Member</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Priority</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/40 text-sm">
              {data.recentTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">{task.leadMember}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      task.status === "Completed" ? "text-emerald-500" :
                      task.status === "In Progress" ? "text-blue-500" : "text-amber-500"
                    }`}>
                      • {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                      task.priority === "High" ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400" :
                      task.priority === "Medium" ? "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400" :
                      "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] transition-all">
          <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 w-full max-w-md p-6 rounded-2xl shadow-xl space-y-4 text-gray-900 dark:text-white">
            <div className="flex justify-between items-center border-b dark:border-gray-800 pb-3">
              <h3 className="text-lg font-bold">Add New Operations Log</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Lead Member Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Alishba Khan"
                  required
                  value={formData.leadMember}
                  onChange={(e) => setFormData({ ...formData, leadMember: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition">
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-gray-600 dark:text-gray-400">Priority</label>
                <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800/60 border dark:border-gray-700 px-4 py-2.5 rounded-xl outline-none focus:border-blue-500 transition">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-sm active:scale-95">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}