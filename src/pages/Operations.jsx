import { CheckCircle, Clock, Users, BarChart3, MoreVertical, ArrowUpRight } from 'lucide-react'; 

// Premium Reusable Stat Card
const MyStatsCard = ({ label, count, myIcon, bgColor }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800/60 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200">
      <div className="space-y-1">
        <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-semibold tracking-wider">{label}</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">{count}</h3>
      </div>
      <div className={`p-3 rounded-xl ${bgColor} flex items-center justify-center`}>
        {myIcon}
      </div>
    </div>
  );
};

const Operations = () => {
  const projectList = [
    { id: 1, name: "Website Redesign", manager: "Ahmad Ali", state: "In Progress", urgent: "High" },
    { id: 2, name: "Mobile App QA", manager: "Sara Khan", state: "Completed", urgent: "Medium" },
    { id: 3, name: "API Integration", manager: "Zainab", state: "Pending", urgent: "High" },
    { id: 4, name: "Client Presentation", manager: "Hamza", state: "In Progress", urgent: "Low" },
  ];

  return (
    <div className="p-4 space-y-8"> 

      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Operations Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor current project status and system updates.</p>
        </div>
        <button className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2">
          <span>+ Add New</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MyStatsCard label="Active Projects" count="12" myIcon={<BarChart3 size={20} className="text-blue-600 dark:text-blue-400" />} bgColor="bg-blue-50 dark:bg-blue-950/40" />
        <MyStatsCard label="Pending Tasks" count="48" myIcon={<Clock size={20} className="text-amber-600 dark:text-amber-400" />} bgColor="bg-amber-50 dark:bg-amber-950/40" />
        <MyStatsCard label="Completed" count="156" myIcon={<CheckCircle size={20} className="text-emerald-600 dark:text-emerald-400" />} bgColor="bg-emerald-50 dark:bg-emerald-950/40" />
        <MyStatsCard label="Active Staff" count="24" myIcon={<Users size={20} className="text-indigo-600 dark:text-indigo-400" />} bgColor="bg-indigo-50 dark:bg-indigo-950/40" />
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm transition-all">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="font-bold text-gray-800 dark:text-gray-200 text-base">Recent Projects</h2>
          <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline">
            View All <ArrowUpRight size={14} />
          </button>
        </div>
        
        <div className="overflow-x-auto"> 
          <table className="w-full border-collapse">
            <thead className="text-left text-gray-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider bg-gray-50/70 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="p-4 pl-6">Project Name</th>
                <th className="p-4">Lead Member</th>
                <th className="p-4">Status</th>
                <th className="p-4">Priority</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {projectList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 text-sm transition-colors group">
                  <td className="p-4 pl-6 font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{item.manager}</td>
                  <td className="p-4">
                    {/* Modern Rounded Pill Badges for Status */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${
                      item.state === 'Completed' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' : 
                      item.state === 'In Progress' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400' : 
                      'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.state === 'Completed' ? 'bg-emerald-500' : item.state === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'
                      }`} />
                      {item.state}
                    </span>
                  </td>
                  <td className="p-4">
                    {/* Added Dynamic Priority Badges */}
                    <span className={`text-xs font-semibold ${
                      item.urgent === 'High' ? 'text-red-500 dark:text-red-400' : 
                      item.urgent === 'Medium' ? 'text-amber-500 dark:text-amber-400' : 
                      'text-gray-500 dark:text-gray-400'
                    }`}>
                      {item.urgent}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Operations;