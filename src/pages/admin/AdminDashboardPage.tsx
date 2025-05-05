// pages/AdminDashboardPage.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/auth';
import { Building2, Users, Calendar, LogOut, Menu, X } from 'lucide-react';

// Define interfaces for the API response data
interface Booking {
  id: string; // Assuming there's an ID field
  roomNumber: string;
  bookedBy: string;
  paid: boolean;
}

interface Inquiry {
  id: string; // Assuming there's an ID field
  name: string;
  email: string;
  message: string;
  time: string;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface RecentActivity {
  type: string;
  description: string;
  time: string;
}

export function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Fetch data from the backend API
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/admin/leads'); // API URL should be updated based on your server setup
        const data = await response.json();

        const bookingsData: Booking[] = data.bookings || [];
        const inquiriesData: Inquiry[] = data.inquiries || [];

        // Set up stats based on bookings and inquiries data
        const fetchedStats: Stat[] = [
          { label: 'Total Bookings', value: bookingsData.length.toString(), icon: Building2 },
          { label: 'Total Inquiries', value: inquiriesData.length.toString(), icon: Users },
          { label: 'New Bookings', value: bookingsData.filter(b => !b.paid).length.toString(), icon: Calendar },
          { label: 'Revenue', value: '₹2.4L', icon: Calendar }, // Calculate actual revenue if needed
        ];

        setStats(fetchedStats);
        setBookings(bookingsData);
        setInquiries(inquiriesData);

        // Example of recent activity data
        const fetchedActivity: RecentActivity[] = [
          { type: 'New Booking', description: 'Room 102 booked by John Doe', time: '2 hours ago' },
          { type: 'New Inquiry', description: 'Inquiry from Jane Smith', time: '1 day ago' },
        ];

        setRecentActivity(fetchedActivity);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex bg-[#f9fafb]">
      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-[#1f4e5f] text-white flex flex-col transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 sm:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#163b49]">
          <img
            src="/images/inaraWhite.webp" // Replace with the actual path to your logo
            alt="Inaरa Living Logo"
            className="h-10 w-auto"
          />
          <button onClick={() => setSidebarOpen(false)} className="sm:hidden text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activeTab === 'overview' ? 'bg-[#4f46e5] text-white' : 'hover:bg-[#4f46e5]/10'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activeTab === 'bookings' ? 'bg-[#4f46e5] text-white' : 'hover:bg-[#4f46e5]/10'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activeTab === 'inquiries' ? 'bg-[#4f46e5] text-white' : 'hover:bg-[#4f46e5]/10'
            }`}
          >
            Inquiries
          </button>
        </nav>
        <button
          onClick={() => logout()}
          className="w-full px-4 py-3 text-left text-white hover:text-[#4f46e5] transition border-t border-[#163b49]"
        >
          <LogOut className="inline-block h-5 w-5 mr-2" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => setSidebarOpen(true)} className="sm:hidden text-[#1f4e5f]">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1f4e5f]">Inara Dashboard</h1>
            <span className="text-sm text-[#4b5563] hidden sm:block">{user?.email}</span>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="h-8 w-8 bg-[#4f46e5]/20 rounded-full mb-4"></div>
                  <div className="h-4 bg-[#d1d5db] rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-[#d1d5db] rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center transition-transform transform hover:scale-105"
                >
                  <stat.icon className="h-8 w-8 text-[#4f46e5]" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-[#4b5563]">{stat.label}</p>
                    <p className="text-lg font-bold text-[#1f4e5f]">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dynamic Tab Content */}
          <div className="mt-6 bg-white shadow-md rounded-lg p-6 overflow-auto">
            {activeTab === 'overview' && (
              <>
                <h2 className="text-lg font-bold text-[#1f4e5f] mb-4">Recent Activity</h2>
                <ul className="space-y-4">
                  {recentActivity.map((activity: RecentActivity, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#1f4e5f]">{activity.type}</p>
                        <p className="text-sm text-[#4b5563]">{activity.description}</p>
                      </div>
                      <span className="text-sm text-[#4b5563]">{activity.time}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-lg font-bold text-[#1f4e5f] mb-4">Bookings</h2>
                <ul>
                  {bookings.map((booking: Booking, index) => (
                    <li key={index}>
                      <p>{booking.roomNumber} - {booking.bookedBy} - {booking.paid ? 'Paid' : 'Unpaid'}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div>
                <h2 className="text-lg font-bold text-[#1f4e5f] mb-4">Inquiries</h2>
                <ul>
                  {inquiries.map((inquiry: Inquiry, index) => (
                    <li key={index}>
                      <p><strong>{inquiry.name}</strong> ({inquiry.email}) - {inquiry.message}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
