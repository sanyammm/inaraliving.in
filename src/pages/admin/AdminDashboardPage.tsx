// pages/AdminDashboardPage.tsx
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../lib/auth';
import { Building2, Users, Calendar, LogOut, Menu, X, ArrowUp, Mail, Download, Search, Filter, ChevronDown } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Booking {
  id: string;
  roomNumber: string;
  bookedBy: string;
  email: string;
  paid: boolean;
  checkIn: string;
  checkOut: string;
  amount: number;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'contacted' | 'converted';
}

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend?: 'up' | 'down';
  change?: string;
}

interface RecentActivity {
  type: string;
  description: string;
  time: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterOpen, setFilterOpen] = useState<{ [key: string]: boolean }>({
    bookings: false,
    inquiries: false
  });
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Mock data fetch - replace with your actual API calls
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - replace with your actual data
        const mockBookings: Booking[] = [
          {
            id: '1',
            roomNumber: '101',
            bookedBy: 'Rahul Sharma',
            email: 'rahul@example.com',
            paid: true,
            checkIn: '2023-06-15',
            checkOut: '2023-12-15',
            amount: 75000
          },
          {
            id: '2',
            roomNumber: '205',
            bookedBy: 'Priya Patel',
            email: 'priya@example.com',
            paid: false,
            checkIn: '2023-07-01',
            checkOut: '2024-06-30',
            amount: 90000
          },
          {
            id: '3',
            roomNumber: '312',
            bookedBy: 'Amit Singh',
            email: 'amit@example.com',
            paid: true,
            checkIn: '2023-05-20',
            checkOut: '2024-05-19',
            amount: 85000
          }
        ];

        const mockInquiries: Inquiry[] = [
          {
            id: '1',
            name: 'Neha Gupta',
            email: 'neha@example.com',
            phone: '9876543210',
            message: 'Interested in premium single room',
            createdAt: '2023-06-10T14:30:00Z',
            status: 'pending'
          },
          {
            id: '2',
            name: 'Vikram Joshi',
            email: 'vikram@example.com',
            phone: '8765432109',
            message: 'Need information about hostel facilities',
            createdAt: '2023-06-08T10:15:00Z',
            status: 'contacted'
          },
          {
            id: '3',
            name: 'Ananya Reddy',
            email: 'ananya@example.com',
            phone: '7654321098',
            message: 'Looking for accommodation near campus',
            createdAt: '2023-06-05T16:45:00Z',
            status: 'converted'
          }
        ];

        // Calculate stats
        const totalRevenue = mockBookings.reduce((sum, booking) => sum + (booking.paid ? booking.amount : 0), 0);
        
        const fetchedStats: Stat[] = [
          { 
            label: 'Total Bookings', 
            value: mockBookings.length.toString(), 
            icon: Building2,
            trend: 'up',
            change: '8%'
          },
          { 
            label: 'Active Residents', 
            value: mockBookings.filter(b => new Date(b.checkOut) > new Date()).length.toString(), 
            icon: Users,
            trend: 'up',
            change: '5%'
          },
          { 
            label: 'Pending Payments', 
            value: mockBookings.filter(b => !b.paid).length.toString(), 
            icon: Calendar,
            trend: 'down',
            change: '3%'
          },
          { 
            label: 'Total Revenue', 
            value: `₹${(totalRevenue / 1000).toFixed(1)}K`, 
            icon: Calendar,
            trend: 'up',
            change: '12%'
          },
        ];

        const fetchedActivity: RecentActivity[] = [
          { 
            type: 'New Booking', 
            description: 'Room 101 booked by Rahul Sharma', 
            time: '2 hours ago',
            icon: Building2
          },
          { 
            type: 'New Inquiry', 
            description: 'Inquiry from Neha Gupta', 
            time: '1 day ago',
            icon: Mail
          },
          { 
            type: 'Payment Received', 
            description: '₹75,000 from Amit Singh', 
            time: '3 days ago',
            icon: Calendar
          },
        ];

        setStats(fetchedStats);
        setBookings(mockBookings);
        setInquiries(mockInquiries);
        setRecentActivity(fetchedActivity);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const exportToPDF = () => {
    if (!dashboardRef.current) return;

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });

    // Add title
    doc.setFontSize(18);
    doc.text('Inara Living Admin Dashboard', 105, 15, { align: 'center' });

    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, { align: 'center' });

    // Add stats table
    doc.setFontSize(12);
    doc.text('Key Statistics', 15, 30);
    doc.autoTable({
      startY: 35,
      head: [['Metric', 'Value', 'Change']],
      body: stats.map(stat => [
        stat.label,
        stat.value,
        stat.trend === 'up' ? `↑ ${stat.change}` : `↓ ${stat.change}`
      ]),
      theme: 'grid',
      headStyles: { fillColor: [31, 78, 95] } // Your navy color
    });

    // Add recent bookings
    doc.text('Recent Bookings', 15, doc.autoTable.previous.finalY + 15);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
      head: [['Room', 'Student', 'Email', 'Check-In', 'Check-Out', 'Amount', 'Status']],
      body: bookings.map(booking => [
        booking.roomNumber,
        booking.bookedBy,
        booking.email,
        new Date(booking.checkIn).toLocaleDateString(),
        new Date(booking.checkOut).toLocaleDateString(),
        `₹${booking.amount.toLocaleString()}`,
        booking.paid ? 'Paid' : 'Pending'
      ]),
      theme: 'grid',
      headStyles: { fillColor: [31, 78, 95] }
    });

    // Add recent inquiries
    doc.text('Recent Inquiries', 15, doc.autoTable.previous.finalY + 15);
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 20,
      head: [['Name', 'Email', 'Phone', 'Message', 'Date', 'Status']],
      body: inquiries.map(inquiry => [
        inquiry.name,
        inquiry.email,
        inquiry.phone,
        inquiry.message.substring(0, 30) + '...',
        new Date(inquiry.createdAt).toLocaleDateString(),
        inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)
      ]),
      theme: 'grid',
      headStyles: { fillColor: [31, 78, 95] }
    });

    doc.save(`inara-dashboard-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const filteredBookings = bookings.filter(booking =>
    booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.bookedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.phone.includes(searchTerm) ||
    inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-50" ref={dashboardRef}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-[#1f4e5f] text-white flex flex-col transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 sm:translate-x-0 sm:relative sm:z-auto`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#163b49]">
          <div className="flex items-center">
            <img
              src="/images/inaraWhite.webp"
              alt="Inara Living Logo"
              className="h-10 w-auto"
            />
            <span className="ml-2 font-semibold">Inara Admin</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="sm:hidden text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === 'overview' ? 'bg-[#4f46e5] text-white' : 'hover:bg-[#4f46e5]/10'
            }`}
          >
            <Building2 className="h-5 w-5 mr-3" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === 'bookings' ? 'bg-[#4f46e5] text-white' : 'hover:bg-[#4f46e5]/10'
            }`}
          >
            <Calendar className="h-5 w-5 mr-3" />
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === 'inquiries' ? 'bg-[#4f46e5] text-white' : 'hover:bg-[#4f46e5]/10'
            }`}
          >
            <Users className="h-5 w-5 mr-3" />
            Inquiries
          </button>
        </nav>
        <button
          onClick={() => logout()}
          className="w-full flex items-center px-4 py-3 text-left text-white hover:bg-[#4f46e5]/10 transition border-t border-[#163b49]"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="sm:hidden text-[#1f4e5f]"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1f4e5f]">
              {activeTab === 'overview' ? 'Dashboard Overview' : 
               activeTab === 'bookings' ? 'Booking Management' : 'Inquiry Management'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline text-sm text-gray-600">{user?.email}</span>
              <button
                onClick={exportToPDF}
                className="flex items-center px-3 py-2 bg-[#1f4e5f] text-white rounded-lg text-sm hover:bg-[#163b49] transition"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search and Filter Bar */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5] sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 w-full sm:w-auto">
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(prev => ({ ...prev, [activeTab]: !prev[activeTab] }))}
                  className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {filterOpen[activeTab] && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 p-3 border border-gray-200">
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">Paid Bookings</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">Pending Payments</span>
                      </label>
                      {activeTab === 'inquiries' && (
                        <>
                          <label className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">New Inquiries</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded" />
                            <span className="ml-2 text-sm text-gray-700">Contacted</span>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid - Only shown on overview */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {loading ? (
                [...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-200 animate-pulse">
                    <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
                  </div>
                ))
              ) : (
                stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow p-6 border-l-4 border-[#4f46e5] hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="h-10 w-10 rounded-full bg-[#4f46e5]/10 flex items-center justify-center">
                          <stat.icon className="h-5 w-5 text-[#4f46e5]" />
                        </div>
                        {stat.trend && (
                          <span className={`mt-2 text-xs flex items-center ${
                            stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {stat.trend === 'up' ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowUp className="h-3 w-3 mr-1 transform rotate-180" />
                            )}
                            {stat.change}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Dynamic Tab Content */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {activeTab === 'overview' && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#4f46e5]/10">
                          <activity.icon className="h-5 w-5 text-[#4f46e5]" />
                        </div>
                      </div>
                      <div className={`flex-1 ${index !== recentActivity.length - 1 ? 'pb-6 border-b border-gray-200' : ''}`}>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      [...Array(3)].map((_, index) => (
                        <tr key={index}>
                          {[...Array(6)].map((_, i) => (
                            <td key={i} className="px-6 py-4 whitespace-nowrap">
                              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            #{booking.roomNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{booking.bookedBy}</div>
                            <div className="text-sm text-gray-500">{booking.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(booking.checkIn).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              to {new Date(booking.checkOut).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{booking.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.paid ? 'Paid' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-[#4f46e5] hover:text-[#4338ca] mr-3">
                              View
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Message
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          No bookings found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      [...Array(3)].map((_, index) => (
                        <tr key={index}>
                          {[...Array(6)].map((_, i) => (
                            <td key={i} className="px-6 py-4 whitespace-nowrap">
                              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : filteredInquiries.length > 0 ? (
                      filteredInquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{inquiry.email}</div>
                            <div className="text-sm text-gray-500">{inquiry.phone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 line-clamp-2">
                              {inquiry.message}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-[#4f46e5] hover:text-[#4338ca] mr-3">
                              Contact
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Mark as {inquiry.status === 'converted' ? 'Converted' : 'Pending'}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          No inquiries found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}