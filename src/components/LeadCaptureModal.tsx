import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";

interface FormData {
  name: string;
  phone: string;
  agreed: boolean;
}

interface FormErrors {
  name: string;
  phone: string;
  agreed: string;
}

const LeadCaptureModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    agreed: false,
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    phone: "",
    agreed: "",
  });
  const [apiError, setApiError] = useState<string>("");

  // Show modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem("leadSubmitted")) {
        setIsOpen(true);
      }
    }, 5000); // 5000ms = 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: !formData.name.trim() ? "Please enter your name" : "",
      phone: !formData.phone.trim()
        ? "Please enter your phone number"
        : !/^\d{10}$/.test(formData.phone)
        ? "Enter a valid 10 digit number"
        : "",
      agreed: !formData.agreed ? "Please agree to continue" : "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    // Handle checkbox input (checked property exists on checkbox type)
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked, // Use checked for checkboxes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Use value for text and tel inputs
      }));
    }

    // Reset errors if the user interacts with the form
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiError) setApiError("");
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch(
        "https://inaraliving-in.onrender.com/api/inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            agreed: formData.agreed,
          }),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      await response.json();
      localStorage.setItem("leadSubmitted", "true");
      setSubmitted(true);
      setTimeout(() => setIsOpen(false), 3000);
    } catch (error) {
      console.error("Submission failed:", error);
      setApiError("Failed to submit. Please try again or contact us directly.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full mx-auto overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-5 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">
              Exclusive {new Date().getFullYear()} Admissions
            </h3>
            <p className="text-[#D4AF37] text-sm mt-1 flex items-center">
              <FaInfoCircle className="mr-1" /> Limited spots remaining
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-[#D4AF37]"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-green-500 text-5xl mb-4 flex justify-center">
                <FaCheck />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-2">
                Thank You!
              </h4>
              <p className="text-gray-600">
                Our team will contact you shortly.
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Complete this form to get priority access to our premium student
                accommodations.
              </p>

              {apiError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {apiError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#D4AF37]"
                      } focus:ring-2 focus:ring-[#D4AF37]`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg ${
                        errors.phone
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#D4AF37]"
                      } focus:ring-2 focus:ring-[#D4AF37]`}
                      placeholder="10 digit number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-start">
                    <input
                      id="agreed"
                      name="agreed"
                      type="checkbox"
                      checked={formData.agreed}
                      onChange={handleChange}
                      className={`w-4 h-4 mt-1 rounded ${
                        errors.agreed ? "border-red-500" : "border-gray-300"
                      } text-[#D4AF37] focus:ring-[#D4AF37]`}
                    />
                    <label
                      htmlFor="agreed"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a
                        href="/terms"
                        className="text-[#D4AF37] hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms & Conditions
                      </a>{" "}
                      *
                    </label>
                  </div>
                  {errors.agreed && (
                    <p className="text-sm text-red-500 -mt-2">
                      {errors.agreed}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#D4AF37] hover:bg-[#B89930] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-75"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Get Priority Access"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;
