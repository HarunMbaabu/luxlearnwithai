import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Laptop, School } from "lucide-react"

export default function ProgramDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="border-slate-600 bg-slate-900">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-600 ">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            Program Structure
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">4 months learning:</span> Intensive hands-on training in your chosen field
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">2 months internship:</span> Work on real-world projects with industry
                partners
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Weekly projects:</span> Submit at least 75% of weekly projects and
                articles to qualify for certification
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Certification:</span> Receive a verifiable certificate upon successful
                completion
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-slate-600 bg-slate-900">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-600 ">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            Learning Schedule
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Monday to Thursday:</span> 4 hours/day for physical classes, 3 hours/day
                for online classes
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Fridays:</span> Project work or shadowing professionals in relevant fields
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Morning sessions:</span> 10:00 AM to 2:30 PM EAT
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Evening sessions:</span> 7:00 PM to 10:00 PM EAT
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-slate-600 bg-slate-900">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-600 ">
            <Laptop className="h-5 w-5 text-blue-600 mr-2" />
            Learning Formats and Fees
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Online/Evening Classes:</span> 7,500 KES/month (30,000 KES total)
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Hybrid Classes:</span> 10,500 KES/month (42,000 KES total)
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Physical Classes:</span> 12,500 KES/month (50,000 KES total – includes
                additional service charges)
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Registration fee:</span> 500 KES (refundable if the applicant fails the
                entrance test)
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-slate-600 bg-slate-900">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-600 ">
            <School className="h-5 w-5 text-blue-600 mr-2" />
            Requirements
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Personal laptop:</span> Core i5+, 8GB RAM, 500GB+ storage
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Internet connection:</span> Stable internet for online learners
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Age requirement:</span> Must be 18 years or older
              </p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-blue-600 mt-2.5"></div>
              <p className="text-slate-400">
                <span className="font-medium text-blue-200">Campus location:</span> 1842 Lenana Road, Kilimani, Nairobi (for
                physical/hybrid classes)
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
