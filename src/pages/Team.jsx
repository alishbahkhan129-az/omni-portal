import { Mail, MoreVertical } from 'lucide-react'; 

// Premium Member Card Component
const MemberCard = ({ fullName, jobTitle, isOnline, letter, avatarBg }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800/60 flex flex-col items-center text-center relative shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      
      {/* Absolute Options Menu */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
        <MoreVertical size={14} />
      </button>

      {/* Profile Initials with Dynamic Aesthetic Colors */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold mb-4 shadow-inner transform group-hover:scale-105 transition-transform duration-200 ${avatarBg}`}>
        {letter}
      </div>

      {/* Name and Designation */}
      <h3 className="font-bold text-gray-800 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {fullName}
      </h3>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 mb-4 font-medium">{jobTitle}</p>

      {/* Dynamic Status Badges (Active vs Away vs Offline) */}
      <div className="flex items-center gap-1.5 mb-6">
        <div className={`w-2 h-2 rounded-full ${
          isOnline === 'Active' ? 'bg-emerald-500' : 
          isOnline === 'Away' ? 'bg-amber-500' : 'bg-gray-300'
        }`} />
        <span className={`text-[10px] font-bold uppercase tracking-wider ${
          isOnline === 'Active' ? 'text-emerald-600 dark:text-emerald-400' : 
          isOnline === 'Away' ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'
        }`}>
          {isOnline}
        </span>
      </div>

      {/* Premium Action Button */}
      <button className="w-full py-2.5 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 active:scale-95 transition-all shadow-sm">
        <Mail size={13} /> <span>Send Email</span>
      </button>
    </div>
  );
};

const Team = () => {
  // Added dynamic background classes for beautiful distinct profile circles
  const myTeam = [
    { fullName: "Ahmad Ali", jobTitle: "Lead Developer", isOnline: "Active", letter: "AA", avatarBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400" },
    { fullName: "Sara Khan", jobTitle: "UI/UX Designer", isOnline: "Active", letter: "SK", avatarBg: "bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400" },
    { fullName: "Zainab", jobTitle: "Project Manager", isOnline: "Away", letter: "Z", avatarBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400" },
    { fullName: "Hamza", jobTitle: "QA Engineer", isOnline: "Active", letter: "H", avatarBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Team Directory</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and connect with your organization workspace members.</p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {myTeam.map((person, idx) => (
          <MemberCard 
            key={idx} 
            fullName={person.fullName}
            jobTitle={person.jobTitle}
            isOnline={person.isOnline}
            letter={person.letter}
            avatarBg={person.avatarBg}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;