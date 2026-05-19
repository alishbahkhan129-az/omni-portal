import { Mail, MoreVertical } from 'lucide-react'; //Icons import

// MemberCard: Har bande ki info (Name, Job, Status, Initials) display karta hai
const MemberCard = ({ fullName, jobTitle, isOnline, letter }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center relative shadow-sm transition-colors">
      {/* Upper side wala chota menu button */}
      <button className="absolute top-3 right-3 text-gray-300 hover:text-gray-400">
        <MoreVertical size={14} />
      </button>

      {/* Profile ki jagah initials wala circle - color check kar rahay hain */}
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mb-3 ${
        isOnline === 'Active' 
          ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
          : 'bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
      }`}>
        {letter}
      </div>

      {/* Naam aur unki position */}
      <h3 className="font-semibold text-gray-700 dark:text-white">{fullName}</h3>
      <p className="text-[11px] text-gray-400 mb-4">{jobTitle}</p>

      {/* Online/Offline status wala dot */}
      <div className="flex items-center gap-1.5 mb-5">
        <div className={`w-2 h-2 rounded-full ${isOnline === 'Active' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
        <span className="text-[10px] text-gray-400 font-bold uppercase">{isOnline}</span>
      </div>

      {/* Message bhejne ka button */}
      <button className="w-full py-2 border border-gray-100 dark:border-gray-700 rounded-md flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <Mail size={12} /> Send Email
      </button>
    </div>
  );
};

const Team = () => {
  // Members ka array: Isme maine details thori change ki hain
  const myTeam = [
    { fullName: "Ahmad Ali", jobTitle: "Lead Developer", isOnline: "Active", letter: "AA" },
    { fullName: "Sara Khan", jobTitle: "UI/UX Designer", isOnline: "Active", letter: "SK" },
    { fullName: "Zainab", jobTitle: "Project Manager", isOnline: "Away", letter: "Z" },
    { fullName: "Hamza", jobTitle: "QA Engineer", isOnline: "Active", letter: "H" },
  ];

  return (
    <div className="p-2">
      {/* Page Heading */}
      <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Team Directory</h1>

      {/* Cards ko row mein set kiya hai */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {myTeam.map((person, idx) => (
          // Component ko manually props bhej rahi hun
          <MemberCard 
            key={idx} 
            fullName={person.fullName}
            jobTitle={person.jobTitle}
            isOnline={person.isOnline}
            letter={person.letter}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;

// nitials logic: letter prop ka use kiya gaya hai profile picture ki jagah, jo ke clean design lagta hai.
// Relative/Absolute: Card container relative hai aur menu button absolute, iska matlab menu button hamesha card ke kone mein hi rahega chahe card kitna bhi bada ho.
// Flexbox: flex-col items-center ka matlab hai ke card ke andar saari cheezein center mein ek ke niche ek aayengi.