import BreadCrumbNav from "../components/BreadCrumbNav";


export function HouseRulesPage() {
  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <BreadCrumbNav />
        </div>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1f4e5f] mb-8">
          House Rules
        </h1>

        {/* Introduction */}
        <p className="text-base md:text-lg text-[#4b5563] mb-6">
          Welcome to Inaरa Living! These House Rules ("Rules") must be followed
          by all residents staying in any property ("House") operated by Inaरa
          Living ("Private Limited"). Any breach or violation of these Rules
          will amount to a breach of the Resident Agreement entered by the
          resident with Inaरa Living and may trigger Inaरa Living's rights to
          terminate the agreement. These rules may be updated from time to time
          by Inaरa Living at its sole discretion.
        </p>

        {/* Section: Care of the Building */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#ec4899] mb-4">
          Care of the Building, Common Areas, and Rooms
        </h2>
        <ul className="list-disc list-inside text-sm md:text-base text-[#4b5563] mb-6 space-y-2">
          <li>
            Vandalism is a serious offense. Residents found guilty of committing
            vandalism can be evicted and required to pay for damages.
          </li>
          <li>
            Common-use items (e.g., microwave, iron, kettle, etc.) provided by
            Inaरa Living must remain in common areas and not be moved to
            individual rooms.
          </li>
          <li>
            Any damage to the House must be reported immediately to Inaरa Living
            Representatives. Residents will be liable for damages caused by
            misuse.
          </li>
          <li>
            Residents must keep their room and wardrobe keys safe. Lost keys
            will incur replacement costs.
          </li>
        </ul>

        {/* Section: Intoxication, Betting, and Gambling */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#ec4899] mb-4">
          Intoxication, Betting, and Gambling
        </h2>
        <ul className="list-disc list-inside text-sm md:text-base text-[#4b5563] mb-6 space-y-2">
          <li>
            Possession, distribution, or consumption of illegal substances is
            strictly prohibited. Violations may result in termination of the
            Resident Agreement and notification to parents or authorities.
          </li>
          <li>
            Betting and gambling are strictly prohibited. Violations will result
            in immediate termination of the Resident Agreement.
          </li>
        </ul>

        {/* Section: Conduct & Behaviour */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#ec4899] mb-4">
          Conduct & Behaviour
        </h2>
        <ul className="list-disc list-inside text-sm md:text-base text-[#4b5563] mb-6 space-y-2">
          <li>
            Ragging in any form is strictly prohibited and will be reported to
            legal authorities.
          </li>
          <li>
            Residents must respect all Inaरa Living employees, representatives,
            and service providers.
          </li>
          <li>
            Loud noises, including music, are prohibited between 10:30 PM and
            6:00 AM.
          </li>
          <li>
            Residents must cooperate with Inaरa Living Representatives for
            police verification and other compliance requirements.
          </li>
        </ul>

        {/* Section: Pantry Rules */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#ec4899] mb-4">
          Pantry Rules
        </h2>
        <ul className="list-disc list-inside text-sm md:text-base text-[#4b5563] mb-6 space-y-2">
          <li>
            Cooking is only allowed in designated pantry areas. Personal food
            items must be labeled and stored in common refrigerators.
          </li>
          <li>
            Residents must clean up after using the pantry and dispose of
            leftovers and garbage appropriately.
          </li>
        </ul>

        {/* Section: Security & Safety */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#ec4899] mb-4">
          Security & Safety
        </h2>
        <ul className="list-disc list-inside text-sm md:text-base text-[#4b5563] mb-6 space-y-2">
          <li>
            Residents are responsible for the safety of their personal
            belongings. Inaरa Living will not be liable for any loss or damage.
          </li>
          <li>
            Possession of firearms, lethal weapons, or hazardous materials is
            strictly prohibited.
          </li>
          <li>
            Tampering with security or fire-fighting equipment is prohibited and
            will result in penalties.
          </li>
        </ul>

        {/* Section: General */}
        <h2 className="text-xl md:text-2xl font-semibold text-[#ec4899] mb-4">
          General
        </h2>
        <ul className="list-disc list-inside text-sm md:text-base text-[#4b5563] mb-6 space-y-2">
          <li>No animals or pets are allowed inside the House premises.</li>
          <li>
            Inaरa Living reserves the right to revise these rules at any time
            and will notify residents of any changes.
          </li>
        </ul>

        <p className="text-base md:text-lg text-[#4b5563]">
          For any questions or concerns, please contact the Inaरa Living support
          team.
        </p>
      </div>
    </div>
  );
}

export default HouseRulesPage;
