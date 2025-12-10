import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Slack, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 ">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">LuxDev Academy</h3>
            <p className="text-gray-600 mb-4">
              Transforming careers through data science education and AI-powered
              learning.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://x.com/luxdevhq"
                className="text-gray-400 hover:text-blue-900"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.46 2.43H18.34L12 10.71 5.66 2.43H1.54L10.31 13.6 1 22.43h4.12l6.88-8.08 6.88 8.08h4.12l-9.31-8.83 9.77-11.17z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.tiktok.com/@luxdevhq" className="text-gray-400 hover:text-blue-900">
                <Image src={"/tiktok.svg"} alt="TikTok" width={30} height={30} className="-mt-1" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://github.com/LuxDevHQ" className="text-gray-400 hover:text-blue-900">
                <Github className="h-5 w-5" />
                <span className="sr-only">Github</span>
              </Link>
              <Link href="https://join.slack.com/t/luxdevcommunity/shared_invite/zt-2owm0z4zq-2zTu3DgHjqVhca~IDp24MA" className="text-gray-400 hover:text-blue-900">
                <Slack className="h-5 w-5" />
                <span className="sr-only">Slack</span>
              </Link>
              <Link href="https://www.linkedin.com/company/lux-dev-hq/" className="text-gray-400 hover:text-blue-900">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Data Science & AI
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Data Engineering
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Corporate Training
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  For Investors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-900">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Address</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">D18A Garden Court, Garden Estate</li>
              <li className="text-gray-600">Nairobi, Kenya</li>
              <li className="text-gray-600">info@luxdevhq.com</li>
              <li className="text-gray-600">0798166628</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} LuxDev Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
