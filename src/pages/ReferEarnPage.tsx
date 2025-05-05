import BreadCrumbNav from "../components/BreadCrumbNav";


export function ReferEarnPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <BreadCrumbNav />
        </div>

        {/* Page Content */}
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f4e5f] mb-6">
            Refer and Earn
          </h1>
          <p className="text-base md:text-lg text-[#4b5563] mb-6">
            Help a friend become a part of Inaरa Living and earn rewards{" "}
            <span className="font-semibold text-[#ec4899]">
              #FriendshipGoals
            </span>
            .
          </p>
          <p className="text-base md:text-lg text-[#4b5563] mb-6">
            A true friend helps without expecting anything in return, correct?
            Well, maybe not always. Help your friend find a second home, bunk
            with them, and get rewarded in return.
          </p>

          {/* Steps Section */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#f9fafb] p-6 rounded-lg shadow-md">
                <h2 className="text-xl md:text-2xl font-bold text-[#1f4e5f] mb-4">
                  Step 1
                </h2>
                <p className="text-sm md:text-base text-[#4b5563]">
                  Get your friend to book their second home.
                </p>
              </div>
              <div className="bg-[#f9fafb] p-6 rounded-lg shadow-md">
                <h2 className="text-xl md:text-2xl font-bold text-[#1f4e5f] mb-4">
                  Step 2
                </h2>
                <p className="text-sm md:text-base text-[#4b5563]">
                  Your friend books a bed.
                </p>
              </div>
              <div className="bg-[#f9fafb] p-6 rounded-lg shadow-md">
                <h2 className="text-xl md:text-2xl font-bold text-[#1f4e5f] mb-4">
                  Step 3
                </h2>
                <p className="text-sm md:text-base text-[#4b5563]">
                  Rewards of up to ₹6,000 come straight to you.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12">
            <button className="bg-[#ec4899] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1f4e5f] transition">
              Refer Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferEarnPage;
