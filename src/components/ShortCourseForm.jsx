"use client";

import { useEffect, useMemo, useState } from "react";

const countries = [
  { name: "Afghanistan", code: "+93", nationality: "Afghan" },
  { name: "Albania", code: "+355", nationality: "Albanian" },
  { name: "Algeria", code: "+213", nationality: "Algerian" },
  { name: "Andorra", code: "+376", nationality: "Andorran" },
  { name: "Angola", code: "+244", nationality: "Angolan" },
  { name: "Antigua and Barbuda", code: "+1-268", nationality: "Antiguan and Barbudan" },
  { name: "Argentina", code: "+54", nationality: "Argentine" },
  { name: "Armenia", code: "+374", nationality: "Armenian" },
  { name: "Australia", code: "+61", nationality: "Australian" },
  { name: "Austria", code: "+43", nationality: "Austrian" },
  { name: "Azerbaijan", code: "+994", nationality: "Azerbaijani" },
  { name: "Bahamas", code: "+1-242", nationality: "Bahamian" },
  { name: "Bahrain", code: "+973", nationality: "Bahraini" },
  { name: "Bangladesh", code: "+880", nationality: "Bangladeshi" },
  { name: "Barbados", code: "+1-246", nationality: "Barbadian" },
  { name: "Belarus", code: "+375", nationality: "Belarusian" },
  { name: "Belgium", code: "+32", nationality: "Belgian" },
  { name: "Belize", code: "+501", nationality: "Belizean" },
  { name: "Benin", code: "+229", nationality: "Beninese" },
  { name: "Bhutan", code: "+975", nationality: "Bhutanese" },
  { name: "Bolivia", code: "+591", nationality: "Bolivian" },
  { name: "Bosnia and Herzegovina", code: "+387", nationality: "Bosnian and Herzegovinian" },
  { name: "Botswana", code: "+267", nationality: "Botswanan" },
  { name: "Brazil", code: "+55", nationality: "Brazilian" },
  { name: "Brunei", code: "+673", nationality: "Bruneian" },
  { name: "Bulgaria", code: "+359", nationality: "Bulgarian" },
  { name: "Burkina Faso", code: "+226", nationality: "Burkinabé" },
  { name: "Burundi", code: "+257", nationality: "Burundian" },
  { name: "Cabo Verde", code: "+238", nationality: "Cape Verdean" },
  { name: "Cambodia", code: "+855", nationality: "Cambodian" },
  { name: "Cameroon", code: "+237", nationality: "Cameroonian" },
  { name: "Canada", code: "+1", nationality: "Canadian" },
  { name: "Central African Republic", code: "+236", nationality: "Central African" },
  { name: "Chad", code: "+235", nationality: "Chadian" },
  { name: "Chile", code: "+56", nationality: "Chilean" },
  { name: "China", code: "+86", nationality: "Chinese" },
  { name: "Colombia", code: "+57", nationality: "Colombian" },
  { name: "Comoros", code: "+269", nationality: "Comorian" },
  { name: "Congo (Republic of the)", code: "+242", nationality: "Congolese" },
  { name: "Congo (Democratic Republic of the)", code: "+243", nationality: "Congolese" },
  { name: "Costa Rica", code: "+506", nationality: "Costa Rican" },
  { name: "Côte d’Ivoire", code: "+225", nationality: "Ivorian" },
  { name: "Croatia", code: "+385", nationality: "Croatian" },
  { name: "Cuba", code: "+53", nationality: "Cuban" },
  { name: "Cyprus", code: "+357", nationality: "Cypriot" },
  { name: "Czechia", code: "+420", nationality: "Czech" },
  { name: "Denmark", code: "+45", nationality: "Danish" },
  { name: "Djibouti", code: "+253", nationality: "Djiboutian" },
  { name: "Dominica", code: "+1-767", nationality: "Dominican" },
  { name: "Dominican Republic", code: "+1-809", nationality: "Dominican" },
  { name: "Ecuador", code: "+593", nationality: "Ecuadorian" },
  { name: "Egypt", code: "+20", nationality: "Egyptian" },
  { name: "El Salvador", code: "+503", nationality: "Salvadoran" },
  { name: "Equatorial Guinea", code: "+240", nationality: "Equatorial Guinean" },
  { name: "Eritrea", code: "+291", nationality: "Eritrean" },
  { name: "Estonia", code: "+372", nationality: "Estonian" },
  { name: "Eswatini", code: "+268", nationality: "Swazi" },
  { name: "Ethiopia", code: "+251", nationality: "Ethiopian" },
  { name: "Fiji", code: "+679", nationality: "Fijian" },
  { name: "Finland", code: "+358", nationality: "Finnish" },
  { name: "France", code: "+33", nationality: "French" },
  { name: "Gabon", code: "+241", nationality: "Gabonese" },
  { name: "Gambia", code: "+220", nationality: "Gambian" },
  { name: "Georgia", code: "+995", nationality: "Georgian" },
  { name: "Germany", code: "+49", nationality: "German" },
  { name: "Ghana", code: "+233", nationality: "Ghanaian" },
  { name: "Greece", code: "+30", nationality: "Greek" },
  { name: "Grenada", code: "+1-473", nationality: "Grenadian" },
  { name: "Guatemala", code: "+502", nationality: "Guatemalan" },
  { name: "Guinea", code: "+224", nationality: "Guinean" },
  { name: "Guinea-Bissau", code: "+245", nationality: "Bissau-Guinean" },
  { name: "Guyana", code: "+592", nationality: "Guyanese" },
  { name: "Haiti", code: "+509", nationality: "Haitian" },
  { name: "Honduras", code: "+504", nationality: "Honduran" },
  { name: "Hungary", code: "+36", nationality: "Hungarian" },
  { name: "Iceland", code: "+354", nationality: "Icelandic" },
  { name: "India", code: "+91", nationality: "Indian" },
  { name: "Indonesia", code: "+62", nationality: "Indonesian" },
  { name: "Iran", code: "+98", nationality: "Iranian" },
  { name: "Iraq", code: "+964", nationality: "Iraqi" },
  { name: "Ireland", code: "+353", nationality: "Irish" },
  { name: "Israel", code: "+972", nationality: "Israeli" },
  { name: "Italy", code: "+39", nationality: "Italian" },
  { name: "Jamaica", code: "+1-876", nationality: "Jamaican" },
  { name: "Japan", code: "+81", nationality: "Japanese" },
  { name: "Jordan", code: "+962", nationality: "Jordanian" },
  { name: "Kazakhstan", code: "+7", nationality: "Kazakhstani" },
  { name: "Kenya", code: "+254", nationality: "Kenyan" },
  { name: "Kiribati", code: "+686", nationality: "I-Kiribati" },
  { name: "Kuwait", code: "+965", nationality: "Kuwaiti" },
  { name: "Kyrgyzstan", code: "+996", nationality: "Kyrgyzstani" },
  { name: "Laos", code: "+856", nationality: "Lao" },
  { name: "Latvia", code: "+371", nationality: "Latvian" },
  { name: "Lebanon", code: "+961", nationality: "Lebanese" },
  { name: "Lesotho", code: "+266", nationality: "Basotho" },
  { name: "Liberia", code: "+231", nationality: "Liberian" },
  { name: "Libya", code: "+218", nationality: "Libyan" },
  { name: "Liechtenstein", code: "+423", nationality: "Liechtensteiner" },
  { name: "Lithuania", code: "+370", nationality: "Lithuanian" },
  { name: "Luxembourg", code: "+352", nationality: "Luxembourgish" },
  { name: "Madagascar", code: "+261", nationality: "Malagasy" },
  { name: "Malawi", code: "+265", nationality: "Malawian" },
  { name: "Malaysia", code: "+60", nationality: "Malaysian" },
  { name: "Maldives", code: "+960", nationality: "Maldivian" },
  { name: "Mali", code: "+223", nationality: "Malian" },
  { name: "Malta", code: "+356", nationality: "Maltese" },
  { name: "Marshall Islands", code: "+692", nationality: "Marshallese" },
  { name: "Mauritania", code: "+222", nationality: "Mauritanian" },
  { name: "Mauritius", code: "+230", nationality: "Mauritian" },
  { name: "Mexico", code: "+52", nationality: "Mexican" },
  { name: "Micronesia", code: "+691", nationality: "Micronesian" },
  { name: "Moldova", code: "+373", nationality: "Moldovan" },
  { name: "Monaco", code: "+377", nationality: "Monegasque" },
  { name: "Mongolia", code: "+976", nationality: "Mongolian" },
  { name: "Montenegro", code: "+382", nationality: "Montenegrin" },
  { name: "Morocco", code: "+212", nationality: "Moroccan" },
  { name: "Mozambique", code: "+258", nationality: "Mozambican" },
  { name: "Myanmar", code: "+95", nationality: "Burmese" },
  { name: "Namibia", code: "+264", nationality: "Namibian" },
  { name: "Nauru", code: "+674", nationality: "Nauruan" },
  { name: "Nepal", code: "+977", nationality: "Nepalese" },
  { name: "Netherlands", code: "+31", nationality: "Dutch" },
  { name: "New Zealand", code: "+64", nationality: "New Zealander" },
  { name: "Nicaragua", code: "+505", nationality: "Nicaraguan" },
  { name: "Niger", code: "+227", nationality: "Nigerien" },
  { name: "Nigeria", code: "+234", nationality: "Nigerian" },
  { name: "North Macedonia", code: "+389", nationality: "Macedonian" },
  { name: "Norway", code: "+47", nationality: "Norwegian" },
  { name: "Oman", code: "+968", nationality: "Omani" },
  { name: "Pakistan", code: "+92", nationality: "Pakistani" },
  { name: "Palau", code: "+680", nationality: "Palauan" },
  { name: "Panama", code: "+507", nationality: "Panamanian" },
  { name: "Papua New Guinea", code: "+675", nationality: "Papua New Guinean" },
  { name: "Paraguay", code: "+595", nationality: "Paraguayan" },
  { name: "Peru", code: "+51", nationality: "Peruvian" },
  { name: "Philippines", code: "+63", nationality: "Filipino" },
  { name: "Poland", code: "+48", nationality: "Polish" },
  { name: "Portugal", code: "+351", nationality: "Portuguese" },
  { name: "Qatar", code: "+974", nationality: "Qatari" },
  { name: "Romania", code: "+40", nationality: "Romanian" },
  { name: "Russia", code: "+7", nationality: "Russian" },
  { name: "Rwanda", code: "+250", nationality: "Rwandan" },
  { name: "Saint Kitts and Nevis", code: "+1-869", nationality: "Kittitian and Nevisian" },
  { name: "Saint Lucia", code: "+1-758", nationality: "Saint Lucian" },
  { name: "Saint Vincent and the Grenadines", code: "+1-784", nationality: "Vincentian" },
  { name: "Samoa", code: "+685", nationality: "Samoan" },
  { name: "San Marino", code: "+378", nationality: "Sammarinese" },
  { name: "Sao Tome and Principe", code: "+239", nationality: "São Toméan" },
  { name: "Saudi Arabia", code: "+966", nationality: "Saudi" },
  { name: "Senegal", code: "+221", nationality: "Senegalese" },
  { name: "Serbia", code: "+381", nationality: "Serbian" },
  { name: "Seychelles", code: "+248", nationality: "Seychellois" },
  { name: "Sierra Leone", code: "+232", nationality: "Sierra Leonean" },
  { name: "Singapore", code: "+65", nationality: "Singaporean" },
  { name: "Slovakia", code: "+421", nationality: "Slovak" },
  { name: "Slovenia", code: "+386", nationality: "Slovenian" },
  { name: "Solomon Islands", code: "+677", nationality: "Solomon Islander" },
  { name: "Somalia", code: "+252", nationality: "Somali" },
  { name: "South Africa", code: "+27", nationality: "South African" },
  { name: "South Sudan", code: "+211", nationality: "South Sudanese" },
  { name: "Spain", code: "+34", nationality: "Spanish" },
  { name: "Sri Lanka", code: "+94", nationality: "Sri Lankan" },
  { name: "Sudan", code: "+249", nationality: "Sudanese" },
  { name: "Suriname", code: "+597", nationality: "Surinamese" },
  { name: "Sweden", code: "+46", nationality: "Swedish" },
  { name: "Switzerland", code: "+41", nationality: "Swiss" },
  { name: "Syria", code: "+963", nationality: "Syrian" },
  { name: "Taiwan", code: "+886", nationality: "Taiwanese" },
  { name: "Tajikistan", code: "+992", nationality: "Tajikistani" },
  { name: "Tanzania", code: "+255", nationality: "Tanzanian" },
  { name: "Thailand", code: "+66", nationality: "Thai" },
  { name: "Timor-Leste", code: "+670", nationality: "Timorese" },
  { name: "Togo", code: "+228", nationality: "Togolese" },
  { name: "Tonga", code: "+676", nationality: "Tongan" },
  { name: "Trinidad and Tobago", code: "+1-868", nationality: "Trinidadian and Tobagonian" },
  { name: "Tunisia", code: "+216", nationality: "Tunisian" },
  { name: "Turkey", code: "+90", nationality: "Turkish" },
  { name: "Turkmenistan", code: "+993", nationality: "Turkmen" },
  { name: "Tuvalu", code: "+688", nationality: "Tuvaluan" },
  { name: "Uganda", code: "+256", nationality: "Ugandan" },
  { name: "Ukraine", code: "+380", nationality: "Ukrainian" },
  { name: "United Arab Emirates", code: "+971", nationality: "Emirati" },
  { name: "United Kingdom", code: "+44", nationality: "British" },
  { name: "United States", code: "+1", nationality: "American" },
  { name: "Uruguay", code: "+598", nationality: "Uruguayan" },
  { name: "Uzbekistan", code: "+998", nationality: "Uzbekistani" },
  { name: "Vanuatu", code: "+678", nationality: "Ni-Vanuatu" },
  { name: "Vatican City", code: "+379", nationality: "Vatican" },
  { name: "Venezuela", code: "+58", nationality: "Venezuelan" },
  { name: "Vietnam", code: "+84", nationality: "Vietnamese" },
  { name: "Yemen", code: "+967", nationality: "Yemeni" },
  { name: "Zambia", code: "+260", nationality: "Zambian" },
  { name: "Zimbabwe", code: "+263", nationality: "Zimbabwean" }
];

const courses = [
  { name: "MS Fabric", price: 5500 },
  { name: "Python For Data Analysis", price: 5500 },
  { name: "SQL for Data Analysis", price: 5500 },
];

function formatKES(amount) {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "";
  return `KES ${amount.toLocaleString("en-KE")}`;
}

export default function ShortCourseForm({ onSubmit, onClose }) {
  const sortedCountries = useMemo(() => {
    if (!Array.isArray(countries)) return [];
    const base = [...countries];
    base.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
    return base;
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    code: "",
    phone: "",
    nationality: "",
    course: "",
    price: 0,
  });

  const [submitted, setSubmitted] = useState(false);

  // ✅ added (duplication handling like FullProgramMonthlyForm)
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    phone: "",
    general: "",
  });

  useEffect(() => {
    const firstCountry = sortedCountries[0];
    setForm((prev) => ({
      ...prev,
      country: firstCountry?.name || "",
      code: firstCountry?.code || "",
      nationality: firstCountry?.nationality || "",
      course: "",
      price: 0,
    }));

    try {
      const el = document.getElementById("short-course-form-scroll");
      if (el) el.scrollTop = 0;
    } catch {}
  }, [sortedCountries]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ clear errors while typing
    setFieldErrors((prev) => ({
      ...prev,
      general: "",
      email: name === "email" ? "" : prev.email,
      phone: name === "phone" ? "" : prev.phone,
    }));

    if (name === "country") {
      const selected = sortedCountries.find((c) => c.name === value);
      setForm((prev) => ({
        ...prev,
        country: value,
        code: selected?.code ?? "",
        nationality: selected?.nationality ?? "",
      }));
      return;
    }

    if (name === "course") {
      const selectedCourse = courses.find((c) => c.name === value);
      setForm((prev) => ({
        ...prev,
        course: value,
        price: selectedCourse?.price ?? 0,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setFieldErrors({ email: "", phone: "", general: "" });

    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "shortCourse", data: form }),
      });

      // ✅ DUPLICATION HANDLING
      if (res.status === 409) {
        setFieldErrors({
          email: "",
          phone: "",
          general: "You have already applied with this cohort",
        });
        setSubmitting(false);
        return;
      }

      if (!res.ok) {
        setFieldErrors({
          email: "",
          phone: "",
          general: "Submission failed. Please try again.",
        });
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      if (onSubmit) onSubmit(form);

      setTimeout(() => {
        setSubmitted(false);
        setSubmitting(false);

        const firstCountry = sortedCountries[0];
        setForm({
          name: "",
          email: "",
          country: firstCountry?.name || "",
          code: firstCountry?.code || "",
          phone: "",
          nationality: firstCountry?.nationality || "",
          course: "",
          price: 0,
        });

        if (onClose) onClose();
      }, 1500);
    } catch {
      setFieldErrors({
        email: "",
        phone: "",
        general: "Submission failed. Please try again.",
      });
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <div className="text-green-700 font-bold mb-2">Application sent!</div>
        <div className="text-gray-700">Please wait for email confirmation.</div>
      </div>
    );
  }

  return (
    <div
      id="short-course-form-scroll"
      className="w-full max-w-full px-4 py-4 bg-white rounded-none sm:rounded-lg sm:max-w-md sm:mx-auto
                 max-h-[85vh] overflow-y-auto overflow-x-hidden"
    >
      {/* ✅ show duplication/general errors */}
      {fieldErrors.general ? (
        <div className="mb-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-800">
          {fieldErrors.general}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-3 py-2 rounded border"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full px-3 py-2 rounded border"
          />
          {fieldErrors.email ? (
            <div className="mt-1 text-sm text-red-700">{fieldErrors.email}</div>
          ) : null}
        </div>

        <div>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border"
          >
            {sortedCountries.map((c, idx) => (
              <option key={(c.code || "") + idx} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={form.code}
            disabled
            className="w-full sm:w-24 px-3 py-2 rounded border bg-gray-100"
          />
          <div className="flex-1">
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number (WhatsApp Preferred)"
              required
              className="w-full px-3 py-2 rounded border"
            />
            {fieldErrors.phone ? (
              <div className="mt-1 text-sm text-red-700">{fieldErrors.phone}</div>
            ) : null}
          </div>
        </div>

        <div>
          <input
            type="text"
            value={form.nationality}
            disabled
            className="w-full px-3 py-2 rounded border bg-gray-100"
            placeholder="Nationality"
          />
        </div>

        <div>
          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border"
          >
            <option value="" disabled>
              Select a Course
            </option>
            {courses.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-700 mb-1">Course Fee</div>
          <input
            type="text"
            value={form.price ? formatKES(form.price) : ""}
            disabled
            className="w-full px-3 py-2 rounded border bg-gray-100 font-bold"
            placeholder="Select a course to view the fee"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full mt-2 px-4 py-2 rounded bg-blue-900 text-white font-bold disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
