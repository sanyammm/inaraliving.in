// pages/AdminDashboardPage.tsx
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../lib/auth";
import {
  Building2,
  Users,
  Calendar,
  LogOut,
  Menu,
  X,
  ArrowUp,
  Mail,
  Download,
  Search,
  Filter,
  ChevronDown,
  MessageSquare,
  Check,
  DollarSign,
  IndianRupee,
} from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
// import type  AutoTableOutput from 'jspdf-autotable';

import Modal from "react-modal";

// Set app element for accessibility
Modal.setAppElement("#root");
const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
    borderRadius: "0.75rem",
    border: "none",
    maxWidth: "500px",
    width: "90%",
    backgroundColor: "#ffffff",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

interface Booking {
  _id: string;
  userName: string;
  userPhone: string;
  moveInDate: string;
  transactionId: string;
  roomId: string | null;
  roomName: string | null;
  roomPrice: number | null;
  planName: string | null;
  planPrice: number | null;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  message?: string;
  createdAt: string;
  status?: "pending" | "contacted" | "converted";
}

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend?: "up" | "down";
  change?: string;
}

interface RecentActivity {
  type: string;
  description: string;
  time: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  createdAt: string; // newly added
}

export function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [stats, setStats] = useState<Stat[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<{ [key: string]: boolean }>({
    bookings: false,
    inquiries: false,
  });
  const [selectedFilters, setSelectedFilters] = useState<{
    bookings: string[];
    inquiries: string[];
  }>({
    bookings: [],
    inquiries: [],
  });
  const [selectedMessage, setSelectedMessage] = useState<string>("");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Remove token logic for static/demo use
        const response = await fetch(
          "https://inaraliving-in.onrender.com/api/admin/leads",
          {
            headers: {
              "Content-Type": "application/json",
              // Remove Authorization header if backend does not require it
            },
          }
        );
        const data = await response.json();

        setBookings(data.bookings || []);
        setInquiries(data.inquiries || []);

        // Calculate stats
        const totalRevenue = data.bookings.reduce(
          (sum: number, booking: Booking) => {
            return (
              sum + (booking.status === "Completed" ? booking.totalAmount : 0)
            );
          },
          0
        );

        const paidBookings = data.bookings.filter(
          (b: Booking) => b.status === "Completed"
        ).length;
        const pendingBookings = data.bookings.filter(
          (b: Booking) => b.status === "Pending"
        ).length;

        const fetchedStats: Stat[] = [
          {
            label: "Total Bookings",
            value: data.bookings.length.toString(),
            icon: Building2,
            trend: "up",
            change: "8%",
          },
          {
            label: "Active Residents",
            value: data.bookings
              .filter((b: Booking) => new Date(b.moveInDate) > new Date())
              .length.toString(),
            icon: Users,
            trend: "up",
            change: "5%",
          },
          {
            label: "Pending Payments",
            value: pendingBookings.toString(),
            icon: Calendar,
            trend: pendingBookings > 0 ? "up" : "down",
            change: "3%",
          },
          {
            label: "Paid Bookings",
            value: paidBookings.toString(),
            icon: DollarSign, // or some icon
            trend: "up",
            change: "6%",
          },

          {
            label: "Total Revenue",
            value: `₹${(totalRevenue / 1000).toFixed(1)}K`,
            icon: IndianRupee,
            trend: "up",
            change: "12%",
          },
        ];

        const fetchedActivity: RecentActivity[] = [
          ...data.bookings.map((booking: Booking) => ({
            type: "New Booking",
            description: `${booking.roomName || booking.planName} booked by ${
              booking.userName
            }`,
            time: formatTimeAgo(booking.createdAt),
            icon: Building2,
            createdAt: booking.createdAt,
          })),
          ...data.inquiries.map((inquiry: Inquiry) => ({
            type: "New Inquiry",
            description: `Inquiry from ${inquiry.name}`,
            time: formatTimeAgo(inquiry.createdAt),
            icon: Mail,
            createdAt: inquiry.createdAt,
          })),
        ]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 20); // show latest 20 items or any number you want

        setStats(fetchedStats);
        setRecentActivity(fetchedActivity);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
    });

    // Add title
    doc.setFontSize(18);
    doc.text("Inara Living Admin Dashboard", 148.5, 15, { align: "center" });

    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 148.5, 22, {
      align: "center",
    });

    let finalY = 30;

    // Add stats table if on overview
    if (activeTab === "overview") {
      doc.setFontSize(12);
      doc.text("Key Statistics", 15, finalY);

      autoTable(doc, {
        startY: finalY + 5,
        head: [["Metric", "Value", "Change"]],
        body: stats.map((stat) => [
          stat.label,
          stat.value,
          stat.trend === "up" ? `↑ ${stat.change}` : `↓ ${stat.change}`,
        ]),
        theme: "grid",
        headStyles: { fillColor: [31, 78, 95] },
      });

      // Safely access finalY from doc
      finalY = doc.lastAutoTable?.finalY + 10 || finalY + 10;
    }

    // Section title
    doc.setFontSize(12);
    const sectionTitle =
      activeTab === "bookings"
        ? "Bookings"
        : activeTab === "inquiries"
        ? "Inquiries"
        : "";

    if (sectionTitle) {
      doc.text(sectionTitle, 15, finalY);
      finalY += 5;
    }

    // Add bookings table
    if (activeTab === "bookings") {
      autoTable(doc, {
        startY: finalY,
        head: [
          ["Student", "Phone", "Room/Plan", "Move-In Date", "Amount", "Status"],
        ],
        body: filteredBookings.map((booking) => [
          booking.userName,
          booking.userPhone,
          booking.roomName || booking.planName || "N/A",
          new Date(booking.moveInDate).toLocaleDateString(),
          `₹${booking.totalAmount.toLocaleString()}`,
          booking.status,
        ]),
        theme: "grid",
        headStyles: { fillColor: [31, 78, 95] },
      });
    }

    // Add inquiries table
    if (activeTab === "inquiries") {
      autoTable(doc, {
        startY: finalY,
        head: [["Name", "Phone", "Message", "Date", "Status"]],
        body: filteredInquiries.map((inquiry) => [
          inquiry.name,
          inquiry.phone,
          inquiry.message
            ? inquiry.message.substring(0, 30) +
              (inquiry.message.length > 30 ? "..." : "")
            : "N/A",
          new Date(inquiry.createdAt).toLocaleDateString(),
          inquiry.status
            ? inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)
            : "New",
        ]),
        theme: "grid",
        headStyles: { fillColor: [31, 78, 95] },
      });
    }

    // Save file
    doc.save(`inara-dashboard-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const handleFilterChange = (tab: string, filter: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[tab as keyof typeof prev];
      const isSelected = !currentFilters.includes(filter); // true = just selected

      const newFilters = isSelected
        ? [...currentFilters, filter]
        : currentFilters.filter((f) => f !== filter);

      // Close filter dropdown ONLY when selected, not deselected
      if (isSelected) {
        setFilterOpen((prevOpen) => ({
          ...prevOpen,
          [tab]: false,
        }));
      }

      return {
        ...prev,
        [tab]: newFilters,
      };
    });
  };

  const filteredBookings = bookings
    .filter(
      (booking) =>
        booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.userPhone.includes(searchTerm) ||
        (booking.roomName &&
          booking.roomName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (booking.planName &&
          booking.planName.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((booking) => {
      if (selectedFilters.bookings.length === 0) return true;
      return selectedFilters.bookings.includes(booking.status);
    });

  const filteredInquiries = inquiries
    .filter(
      (inquiry) =>
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.phone.includes(searchTerm) ||
        (inquiry.message &&
          inquiry.message.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((inquiry) => {
      if (selectedFilters.inquiries.length === 0) return true;

      // For "New Inquiries" filter, show the most recent inquiries
      if (selectedFilters.inquiries.includes("New Inquiries")) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(inquiry.createdAt) > oneWeekAgo;
      }

      // For status-based filters
      return selectedFilters.inquiries.some((filter) => {
        if (filter === "pending")
          return !inquiry.status || inquiry.status === "pending";
        return inquiry.status === filter.toLowerCase();
      });
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const updateInquiryStatus = async (
    inquiryId: string,
    status: "contacted" | "pending"
  ) => {
    try {
      await fetch(
        `https://inaraliving-in.onrender.com/api/inquiry/${inquiryId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry._id === inquiryId ? { ...inquiry, status } : inquiry
        )
      );
    } catch {
      alert("Failed to update inquiry status.");
    }
  };

  const markAsContacted = (inquiryId: string) => {
    updateInquiryStatus(inquiryId, "contacted");
  };

  const markAsUncontacted = (inquiryId: string) => {
    updateInquiryStatus(inquiryId, "pending");
  };

  const confirmBooking = async (bookingId: string) => {
    try {
      await fetch(
        `https://inaraliving-in.onrender.com/api/booking/${bookingId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Completed" }),
        }
      );
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Completed" }
            : booking
        )
      );
    } catch {
      alert("Failed to confirm booking.");
    }
  };

  const openWhatsApp = (phone: string, userName: string) => {
    const message = `Hi ${userName},\n\nYour booking with Inara Living has been confirmed. Thank you for choosing us!\n\nBest regards,\nInara Living Team`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone.replace(
      /\D/g,
      ""
    )}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const openMessageModal = (message: string) => {
    setSelectedMessage(message);
    setIsMessageModalOpen(true);
  };

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
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
            onClick={() => {
              setActiveTab("overview");
              setSidebarOpen(false); // auto-close sidebar
            }}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === "overview"
                ? "bg-[#4f46e5] text-white"
                : "hover:bg-[#4f46e5]/10"
            }`}
          >
            <Building2 className="h-5 w-5 mr-3" />
            Overview
          </button>

          <button
            onClick={() => {
              setActiveTab("bookings");
              setSidebarOpen(false); // auto-close sidebar
            }}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === "bookings"
                ? "bg-[#4f46e5] text-white"
                : "hover:bg-[#4f46e5]/10"
            }`}
          >
            <Calendar className="h-5 w-5 mr-3" />
            Bookings
          </button>

          <button
            onClick={() => {
              setActiveTab("inquiries");
              setSidebarOpen(false); // auto-close sidebar
            }}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
              activeTab === "inquiries"
                ? "bg-[#4f46e5] text-white"
                : "hover:bg-[#4f46e5]/10"
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
              {activeTab === "overview"
                ? "Dashboard Overview"
                : activeTab === "bookings"
                ? "Booking Management"
                : "Inquiry Management"}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline text-sm text-gray-600">
                {user?.email}
              </span>
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
                  onClick={() =>
                    setFilterOpen((prev) => ({
                      ...prev,
                      [activeTab]: !prev[activeTab],
                    }))
                  }
                  className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                {filterOpen[activeTab] && (
                  <div className="absolute sm:left-auto sm:right-0 sm:translate-x-0 mt-2 w-60 sm:w-56 bg-white rounded-lg shadow-lg z-20 p-3 border border-gray-200">
                    <div className="space-y-2">
                      {activeTab === "bookings" ? (
                        <>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded"
                              checked={selectedFilters.bookings.includes(
                                "Completed"
                              )}
                              onChange={() =>
                                handleFilterChange("bookings", "Completed")
                              }
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Completed
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded"
                              checked={selectedFilters.bookings.includes(
                                "Pending"
                              )}
                              onChange={() =>
                                handleFilterChange("bookings", "Pending")
                              }
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Pending
                            </span>
                          </label>
                        </>
                      ) : (
                        <>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded"
                              checked={selectedFilters.inquiries.includes(
                                "New Inquiries"
                              )}
                              onChange={() =>
                                handleFilterChange("inquiries", "New Inquiries")
                              }
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              New Inquiries
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded"
                              checked={selectedFilters.inquiries.includes(
                                "contacted"
                              )}
                              onChange={() =>
                                handleFilterChange("inquiries", "contacted")
                              }
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Contacted
                            </span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-[#4f46e5] focus:ring-[#4f46e5] border-gray-300 rounded"
                              checked={selectedFilters.inquiries.includes(
                                "pending"
                              )}
                              onChange={() =>
                                handleFilterChange("inquiries", "pending")
                              }
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              Pending
                            </span>
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
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {loading
                ? [...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow p-6 border-l-4 border-gray-200 animate-pulse"
                    >
                      <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                  ))
                : stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow p-6 border-l-4 border-[#4f46e5] hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            {stat.label}
                          </p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">
                            {stat.value}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="h-10 w-10 rounded-full bg-[#4f46e5]/10 flex items-center justify-center">
                            <stat.icon className="h-5 w-5 text-[#4f46e5]" />
                          </div>
                          {stat.trend && (
                            <span
                              className={`mt-2 text-xs flex items-center ${
                                stat.trend === "up"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {stat.trend === "up" ? (
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
                  ))}
            </div>
          )}

          {/* Dynamic Tab Content */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {activeTab === "overview" && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Activity
                </h2>
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#4f46e5]/10">
                          <activity.icon className="h-5 w-5 text-[#4f46e5]" />
                        </div>
                      </div>
                      <div
                        className={`flex-1 ${
                          index !== recentActivity.length - 1
                            ? "pb-6 border-b border-gray-200"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.type}
                          </p>
                          <span className="text-xs text-gray-500">
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Student
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Room/Plan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Move-In Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      [...Array(3)].map((_, index) => (
                        <tr key={index}>
                          {[...Array(7)].map((_, i) => (
                            <td key={i} className="px-6 py-4 whitespace-nowrap">
                              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {booking.userName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.userPhone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.roomName || booking.planName || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(booking.moveInDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{booking.totalAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => confirmBooking(booking._id)}
                              className="text-[#4f46e5] hover:text-[#4338ca] mr-3 flex items-center"
                              disabled={booking.status === "Completed"}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              {booking.status === "Completed"
                                ? "Confirmed"
                                : "Confirm"}
                            </button>
                            <button
                              onClick={() =>
                                openWhatsApp(
                                  booking.userPhone,
                                  booking.userName
                                )
                              }
                              className="text-gray-600 hover:text-gray-900 flex items-center"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No bookings found matching your search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "inquiries" && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
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
                        <tr key={inquiry._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {inquiry.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {inquiry.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                inquiry.message &&
                                openMessageModal(inquiry.message)
                              }
                              className="text-sm text-gray-900 line-clamp-2 text-left hover:text-[#4f46e5]"
                            >
                              {inquiry.message?.substring(0, 50) +
                                (inquiry.message?.length ?? 0 > 50
                                  ? "..."
                                  : "") || "N/A"}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(inquiry.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                !inquiry.status || inquiry.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : inquiry.status === "contacted"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {inquiry.status
                                ? inquiry.status.charAt(0).toUpperCase() +
                                  inquiry.status.slice(1)
                                : "New"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {inquiry.status === "contacted" ? (
                              <button
                                onClick={() => markAsUncontacted(inquiry._id)}
                                className="text-yellow-600 hover:text-yellow-800 mr-3"
                              >
                                Uncontact
                              </button>
                            ) : (
                              <button
                                onClick={() => markAsContacted(inquiry._id)}
                                className="text-[#4f46e5] hover:text-[#4338ca] mr-3"
                              >
                                Mark as Contacted
                              </button>
                            )}
                            <button
                              onClick={() =>
                                openWhatsApp(inquiry.phone, inquiry.name)
                              }
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Message
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
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

      {/* Message Modal */}
      <Modal
        isOpen={isMessageModalOpen}
        onRequestClose={() => setIsMessageModalOpen(false)}
        style={customModalStyles}
        contentLabel="Inquiry Message"
      >
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold text-[#1f4e5f]">
            Inquiry Message
          </h2>
          <p className="text-gray-700">{selectedMessage}</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsMessageModalOpen(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
