'use client'
import FAQAccordion from "../components/faq";
import Footer from "../components/footer";
import Header from "../components/header";
import { Calendar, Clock } from "lucide-react";

const page = () => {
  const registrationUrl = process.env.NEXT_PUBLIC_REGISTRATION_LINK ?? 'https://forms.gle/uACYjjmH4zq3F5Us5';
  return (
    <section className="bg-white text-gray-900">
      <Header />
      {/* Main */}
      <div className=" container mx-auto max-w-6xl">
        <section className="py-32 dark:bg-gray-100 dark:text-gray-800">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl mx-auto mb-16 text-center">
              <span className="font-bold tracking-wider uppercase dark:text-violet-600">
                Pricing
              </span>
              <h2 className="text-4xl font-bold lg:text-5xl">
                Choose your best plan
              </h2>
            </div>
            <div className="flex flex-wrap items-stretch px-4">
              <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                <div className="flex flex-grow flex-col p-6 space-y-6 rounded-md border sm:p-8 dark:bg-gray-50">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">
                      Online/Evening Classes
                    </h4>
                    <span className="text-xl font-bold">
                      7,500 KES
                      <span className="text-sm tracking-wide">/month</span>
                    </span>
                    <p className="text-sm font-medium">(30,000 KES total)</p>
                  </div>
                  <p className="mt-3 leading-relaxed dark:text-gray-600">
                    Evening sessions from 7:00 PM to 10:00 PM EAT
                  </p>
                  <ul className="flex-1 mb-6 dark:text-gray-600">
                    <li className="flex mb-2 space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>4 months learning + 2 months internship</span>
                    </li>
                    <li className="flex mb-2 space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>3 hours/day, Monday to Thursday</span>
                    </li>
                    <li className="flex mb-2 space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Verifiable certification upon completion</span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = registrationUrl;
                    }}
                    className="inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-gray-100 dark:bg-violet-600 dark:text-gray-50"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
              <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                <div className="flex flex-grow flex-col p-6 space-y-6 rounded-md sm:p-8 bg-blue-900 dark:bg-violet-600 text-gray-50">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Hybrid Classes</h4>
                    <span className="text-xl font-bold">
                      10,500 KES
                      <span className="text-sm tracking-wide">/month</span>
                    </span>
                    <p className="text-sm font-medium">(42,000 KES total)</p>
                  </div>
                  <p className="leading-relaxed">
                    Flexible learning with both online and physical classes
                  </p>
                  <ul className="flex-1 space-y-2">
                    <li className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Everything in Online plan</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Access to campus facilities</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Friday project work with mentors</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Flexible attendance options</span>
                    </li>
                  </ul>
                  <a
                    rel="noopener noreferrer"
                    href={process.env.NEXT_PUBLIC_REGISTRATION_LINK || 'https://forms.gle/rkdBC3ywcwx88fb1A'}
                    className="inline-block w-full px-5 py-3 font-bold tracking-wider text-center rounded bg-gray-100 text-blue-900 dark:text-violet-600"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
              <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                <div className="flex flex-grow flex-col p-6 space-y-6 rounded-md border sm:p-8 dark:bg-gray-50">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold">Physical Classes</h4>
                    <span className="text-xl font-bold">
                      12,500 KES
                      <span className="text-sm tracking-wide">/month</span>
                    </span>
                    <p className="text-sm font-medium">(50,000 KES total)</p>
                  </div>
                  <p className="leading-relaxed dark:text-gray-600">
                    In-person classes at our Kilimani campus
                  </p>
                  <ul className="space-y-2 dark:text-gray-600">
                    <li className="flex items-start space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Everything in Hybrid plan</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>4 hours/day, Monday to Thursday</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Morning sessions: 10:00 AM to 2:30 PM</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Friday shadowing with professionals</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Full campus resources access</span>
                    </li>
                  </ul>
                  <a
                    rel="noopener noreferrer"
                    href={process.env.NEXT_PUBLIC_REGISTRATION_LINK || 'https://forms.gle/rkdBC3ywcwx88fb1A'}
                    className="inline-block w-full px-5 py-3 font-semibold tracking-wider text-center rounded bg-gray-100 dark:bg-violet-600 dark:text-gray-50"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="container mx-auto max-w-6xl p-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Program Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                Program Structure
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
                  <p className="text-slate-700">
                    <span className="font-medium">4 months learning:</span>{" "}
                    Intensive hands-on training in your chosen field
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
                  <p className="text-slate-700">
                    <span className="font-medium">2 months internship:</span>{" "}
                    Work on real-world projects with industry partners
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
                  <p className="text-slate-700">
                    <span className="font-medium">Weekly projects:</span> Submit
                    at least 75% of weekly projects to qualify for certification
                  </p>
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                Learning Schedule
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
                  <p className="text-slate-700">
                    <span className="font-medium">Monday to Thursday:</span> 4
                    hours/day for physical classes, 3 hours/day for online
                    classes
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
                  <p className="text-slate-700">
                    <span className="font-medium">Fridays:</span> Project work
                    or shadowing professionals in relevant fields
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
                  <p className="text-slate-700">
                    <span className="font-medium">Morning sessions:</span> 10:00
                    AM to 2:30 PM EAT
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-6xl p-6">
        <FAQAccordion />
      </section>
      <Footer />
    </section>
  );
};

export default page;
