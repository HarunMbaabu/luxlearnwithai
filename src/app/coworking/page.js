'use client';

import Image from 'next/image';
import Header from '../components/header';
import Footer from '../components/footer';
import Link from 'next/link';

const cardsData = [
    {
        image: "/dsa.jpg",
        title: "Daily Pass",
        amount: "Ksh. 1,050",
        period: "/day",
        description: "Perfect for short visits or trying out our space",
        features: [
            "8:30am - 5:00pm access",
            "High-speed Wi-Fi",
            "Complimentary tea & coffee",
            "Shared workspace",
            "Printing (additional cost)",
            "Meeting rooms (additional cost)"
        ],
    },
    {
        image: "/dsa.jpg",
        title: "Weekly Pass",
        amount: "Ksh. 4,200",
        period: "/week",
        description: "Great for temporary projects or business trips",
        features: [
            "24/7 access",
            "High-speed Wi-Fi",
            "Complimentary beverages",
            "5hrs meeting room credit",
            "Discounted printing rates",
            "Access to community events",
            "Locker storage"
        ],
    },
    {
        image: "/dsa.jpg",
        title: "Monthly Membership",
        amount: "Ksh. 15,000",
        period: "/month",
        description: "Ideal for freelancers and remote workers",
        features: [
            "24/7 access to all locations",
            "Dedicated desk option",
            "10hrs meeting room credit",
            "Priority Wi-Fi bandwidth",
            "Free printing (100 pages)",
            "Access to premium events",
            "Complimentary parking",
            "Member discounts"
        ],
    }
];

export default function CoworkingPage() {
    const Card = ({ image, title, amount, description, features }) => {
        return (
            <div className="flex flex-col bg-white rounded-lg overflow-hidden h-full">
                <div className="h-48 overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col p-4 flex-grow">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                        <div className="text-2xl font-bold text-blue-900 mb-3">{amount}</div>
                        <p className="text-gray-600 mb-6">{description}</p>

                        <ul className="space-y-2 mb-6">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-auto">
                        <button className="w-full bg-blue-900 hover:bg-blue-950 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
                            Book A Desk
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const CardsContainer = ({ cardsData }) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-12">
                {cardsData.map((card, index) => (
                    <Card
                        key={index}
                        image={card.image}
                        title={card.title}
                        amount={card.amount}
                        description={card.description}
                        features={card.features}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-white">

                {/* Hero Section */}
                <section className="relative h-screen overflow-hidden">
                    <div className="absolute inset-0">
                        <div
                            className={`absolute inset-0`}
                        >
                            <Image
                                src='/homeimage.png'
                                alt={`workspace image`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="relative h-full flex items-center justify-center text-center">
                        <div className="max-w-4xl mx-auto px-4">
                            <h1 className="text-5xl md:text-7xl font-bold text-white mt-8">
                                Your Space to Create, Work, and Thrive
                            </h1>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className=' py-8 px-4 leading-relaxed'>
                    <div className='flex flex-col justify-center items-center container max-w-4xl mx-auto gap-8'>
                        <h2 className='text-4xl md:text-5xl font-black'>Our shared workspaces are beautiful, diverse and promote collaboration.</h2>
                        <p>The flexible seating arrangement allows our members to choose from standing desks to private booths, from swings to couches and everything in between, either indoors or outside. Our communal membership includes all the shared amenities that our locations have to offer including meeting rooms, specialty coffee bars and outdoor cafes, complimentary yoga & meditation, phone booths, prayer rooms, mother’s rooms, showers and so much more. Simply choose an open seat in our coworking area and get to work.</p>
                    </div>
                    <div className='container max-w-4xl mx-auto my-8'>
                        <Link href="#" className="border-2 border-blue-900 text-blue-900 px-4 py-2 rounded-full text-lg hover:bg-blue-900 hover:text-gray-50 transition-all">
                            Schedule a Visit
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-blue-900 text-gray-100 py-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-center my-4">
                            Become a member for full access
                        </h2>
                        <div className='container max-w-4xl mx-auto px-2 md:px-0'>
                            <CardsContainer cardsData={cardsData} />
                        </div>

                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-gray-100 text-gray-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Join Our Community?
                        </h2>
                        <p className="text-xl text-gray-800 mb-8 leading-relaxed">
                            Simply choose an open seat in our coworking area and get to work.
                            Experience the perfect blend of productivity and wellness.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="#" className="bg-blue-900 text-white px-8 py-2 rounded-full text-md hover:bg-blue-950">
                                Book Your Tour Today
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}