import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <nav className="py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm">
        {/* Home Link */}
        <Link to="/" className="text-indigo-600 hover:text-indigo-800">
          Home
        </Link>

        {/* Breadcrumb Path */}
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

          return (
            <React.Fragment key={index}>
              <IoIosArrowForward className="text-gray-400" />
              {isLast ? (
                <span className="text-gray-600 truncate max-w-[120px] capitalize">
                  {segment.replace("-", " ")}
                </span>
              ) : (
                <Link
                  to={path}
                  className="text-indigo-600 hover:text-indigo-800 capitalize"
                >
                  {segment.replace("-", " ")}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
