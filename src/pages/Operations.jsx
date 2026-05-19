import { CheckCircle, Clock, Users, BarChart3 } from 'lucide-react'; // Dashboard ke liye icons import kre

//chota sa reusable component jo stat (Active, Pending etc) ka card banaiga
const MyStatsCard = ({ label, count, myIcon, bgColor }) => {
  return (
    /* Main container: Light mode mein white aur dark mode mein gray-800 background */
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between transition-colors">
      <div>
        {/* Label (e.g. ACTIVE) ko chota aur uppercase dikhany ky lye */}
        <p className="text-[10px] text-gray-400 uppercase font-bold">{label}</p>
        {/* Count ko bra aur bold dikhany ky lye */}
        <h3 className="text-xl font-bold text-gray-700 dark:text-white">{count}</h3>
      </div>
      {/* Icon ky pichy ka background color aur icon display*/}
      <div className={`p-2 rounded-md ${bgColor}`}>
        {myIcon}
      </div>
    </div>
  );
};

const Operations = () => {
  // Projects ka data jo table mein display hog
  const projectList = [
    { id: 1, name: "Website Redesign", manager: "Ahmad Ali", state: "In Progress", urgent: "High" },
    { id: 2, name: "Mobile App QA", manager: "Sara Khan", state: "Completed", urgent: "Medium" },
    { id: 3, name: "API Integration", manager: "Zainab", state: "Pending", urgent: "High" },
    { id: 4, name: "Client Presentation", manager: "Hamza", state: "In Progress", urgent: "Low" },
  ];

  return (
    <div className="p-2 space-y-6"> {/* Puure pag ki padding aur components ka drmiyani gap */}

      {/* Header Section: Title aur 'Add New' button */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">My Operations Board</h1>
          <p className="text-sm text-gray-400">Current project status and updates.</p>
        </div>
        <button className="bg-blue-600 text-white text-sm px-5 py-2 rounded shadow hover:bg-blue-700">
          + Add New
        </button>
      </div>

      {/* Stats Grid: Mobile par 1 column aur bri screens par 4 columns dikhayega */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* phr hr card ko uska label, number, icon aur color pass diy*/}
        <MyStatsCard label="Active" count="12" myIcon={<BarChart3 size={18} className="text-blue-500" />} bgColor="bg-blue-50 dark:bg-blue-900/20" />
        <MyStatsCard label="Pending" count="48" myIcon={<Clock size={18} className="text-orange-500" />} bgColor="bg-orange-50 dark:bg-orange-900/20" />
        <MyStatsCard label="Done" count="156" myIcon={<CheckCircle size={18} className="text-green-500" />} bgColor="bg-green-50 dark:bg-green-900/20" />
        <MyStatsCard label="Staff" count="24" myIcon={<Users size={18} className="text-purple-500" />} bgColor="bg-purple-50 dark:bg-purple-900/20" />
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl overflow-hidden transition-colors">
        {/* Table Header Area */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b dark:border-gray-700">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200">Recent Projects List</h2>
        </div>
        
        <div className="overflow-x-auto"> {/* Mobile par table scrollable banane ky lye */}
          <table className="w-full">
            <thead className="text-left text-gray-400 text-xs border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Lead Member</th>
                <th className="p-4">Status</th>
                <th className="p-4">Priority</th>
                <th className="p-4"></th> {/* Action button ke liye khali coloumn */}
              </tr>
            </thead>
            <tbody>

              {/* projectList array pr loop chalany ky lye */}
              {projectList.map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-sm transition-colors">
                  <td className="p-4 font-medium dark:text-gray-200">{item.name}</td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">{item.manager}</td>
                  <td className="p-4">

                    {/* Status ke hisab se badge ka color change karne ke liye logic */}
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      item.state === 'Completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 
                      item.state === 'In Progress' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 
                      'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {item.state}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 dark:text-gray-400">{item.urgent}</td>
                  <td className="p-4">
                    <button className="text-gray-300 hover:text-gray-500">...</button>
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

export default Operations; // Component ko export kr dya taaky dsri files mein use ho jaaeeeeeeeeeeeeeeeeee

// Conditional Styling: Status wale span mein ternary operators (? :) ka use krdya h taaky "Completed" green dikh aur "In Progress" blue.
// Dark Mode: dark:bg-gray-800 wali classes mujhy bata rh h ky agar user ka system dark mode par h tou kya color hona chahiye.
// Responsive Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 screen size ke mutabiq columns adjust.