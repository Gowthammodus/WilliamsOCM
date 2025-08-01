
import React from 'react';
import { IconProps } from '../types';


// --- Local Icons ---
const CalendarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />
    </svg>
);
const QuestionMarkCircleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);
const ShoppingBagIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);
const ChatBubbleOvalLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.53-.405m-3.032-4.242A8.25 8.25 0 013 12c0-4.556 4.03-8.25 9-8.25a9.76 9.76 0 012.53.405m3.032 4.242A8.25 8.25 0 0021 12z" />
    </svg>
);
const NewspaperIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H15m-3 0h3.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H15m-3 0h3.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H15M3 4.5h15.75c.621 0 1.125.504 1.125 1.125v15c0 .621-.504 1.125-1.125 1.125H3.25A2.25 2.25 0 011 18.75V6.75A2.25 2.25 0 013.25 4.5H3Z" />
    </svg>
);
const PlayIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.748 1.295 2.535 0 3.284L7.279 20.99c-1.25.72-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

const OCMEngagementHubPage: React.FC = () => {

    const newsItems = [
        { title: "Oliver Bearman: A Race In My Words", content: "Oliver Bearman's certainly been keeping himself busy during the break..." },
        { title: "Texas artist Bode Robinson brings her magic to F1 Academy for the Grand Finale in Austin this weekend.", content: "At its heart, F1 Academy is all about inspiring young girls and women..." },
        { title: "will.i.am releases new F1-inspired single 'LET'S GO'", content: "Hot on the heels of his single THE FORMULA – released earlier this..." },
        { title: "Sainz Comments on Williams Outqualifying Ferrari Again at Imola", content: "Sainz Comments on Williams Outqualifying Ferrari Again at Imola" }
    ];

    return (
        <div className="bg-white text-gray-800 font-sans">
            <div className="container mx-auto px-4 py-8">
                {/* Action Buttons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <button className="bg-[#00A3A1] text-white font-bold py-3 px-6 rounded-md text-left text-lg hover:bg-[#007f7d] transition-colors">Transformation Management</button>
                    <button className="bg-[#00A3A1] text-white font-bold py-3 px-6 rounded-md text-left text-lg hover:bg-[#007f7d] transition-colors">Operating Model</button>
                    <button className="bg-[#00A3A1] text-white font-bold py-3 px-6 rounded-md text-left text-lg hover:bg-[#007f7d] transition-colors">Portfolio Management</button>
                    <button className="bg-[#00A3A1] text-white font-bold py-3 px-6 rounded-md text-left text-lg hover:bg-[#007f7d] transition-colors">Business Model Management</button>
                    <button className="bg-[#00A3A1] text-white font-bold py-3 px-6 rounded-md text-left text-lg hover:bg-[#007f7d] transition-colors">Value Chain Analysis</button>
                    <button className="bg-[#00A3A1] text-white font-bold py-3 px-6 rounded-md text-left text-lg hover:bg-[#007f7d] transition-colors">Change Management</button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    {/* Left Column: News */}
                    <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <div className="flex items-center mb-4 pb-2 border-b-2">
                             <NewspaperIcon className="w-10 h-10 text-gray-500 mr-3" />
                            <h2 className="text-2xl font-bold text-gray-700">Latest News</h2>
                        </div>
                        <div className="space-y-4">
                            {newsItems.map((item, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.content}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <button className="w-full bg-[#95C11F] text-white font-bold py-3 px-6 rounded-md hover:bg-[#7da319] transition-colors flex items-center justify-center">
                                <NewspaperIcon className="w-6 h-6 mr-2" />
                                Latest Newsletter
                            </button>
                        </div>
                    </div>

                    {/* Middle Column: Videos */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Video 1 */}
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                                <img src="https://i.imgur.com/K1v41Lw.png" alt="Video thumbnail for Communication" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <button className="text-white">
                                        <PlayIcon className="w-20 h-20 opacity-80 hover:opacity-100 transition-opacity" />
                                    </button>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-600 text-sm">
                                Introduction to the Communication... <a href="#" className="text-[#00A3A1] font-bold">Read More </a>
                            </p>
                        </div>
                        {/* Video 2 */}
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                           <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                                <img src="https://i.imgur.com/zCqf74k.png" alt="Video thumbnail for Portal" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <button className="text-white">
                                        <PlayIcon className="w-20 h-20 opacity-80 hover:opacity-100 transition-opacity" />
                                    </button>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-600 text-sm">
                                Learn about Portal
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Actions & Poll */}
                    <div className="lg:col-span-1 space-y-4">
                        <button className="w-full bg-[#E45E65] text-white font-bold py-3 px-6 rounded-md hover:bg-[#c94f56] transition-colors flex items-center justify-between text-lg">
                            What's On? <CalendarIcon className="w-8 h-8" />
                        </button>
                        <button className="w-full bg-[#00A99D] text-white font-bold py-3 px-6 rounded-md hover:bg-[#008a7f] transition-colors flex items-center justify-between text-lg">
                            Feedback & FAQ <QuestionMarkCircleIcon className="w-8 h-8" />
                        </button>
                        <button className="w-full bg-[#95C11F] text-white font-bold py-3 px-6 rounded-md hover:bg-[#7da319] transition-colors flex items-center justify-between text-lg">
                            Across the Business <ShoppingBagIcon className="w-8 h-8" />
                        </button>
                         <button className="w-full bg-[#F37920] text-white font-bold py-3 px-6 rounded-md hover:bg-[#d86a1c] transition-colors flex items-center justify-between text-lg">
                            Pulse <ChatBubbleOvalLeftIcon className="w-8 h-8" />
                        </button>

                        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-4">
                            <h3 className="font-bold text-lg mb-4">Have you been communicated on the change initiative?</h3>
                            <form className="space-y-3">
                                <div><label className="flex items-center"><input type="radio" name="poll" className="mr-2" /> Yes</label></div>
                                <div><label className="flex items-center"><input type="radio" name="poll" className="mr-2" /> No</label></div>
                                <div><label className="flex items-center"><input type="radio" name="poll" className="mr-2" /> Maybe</label></div>
                                <button type="submit" className="w-full bg-[#F37920] text-white font-bold py-3 mt-4 rounded-md hover:bg-[#d86a1c] transition-colors">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Power BI Report */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-md border">
                    <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Live OCM Dashboard</h2>
                    <div className="h-[75vh] bg-gray-200 rounded-md">
                        <iframe
                            title="Live OCM Dashboard"
                            src="https://app.powerbi.com/view?r=eyJrIjoiMWJiM2ZlZDEtZmY3YS00MTI0LWI2NTQtOTczZDAyOTllNjk1IiwidCI6IjFiZTNhNTYzLTcyMDctNDg3YS1hMWJmLTRjNjllM2U0OTMwZSJ9"
                            frameBorder="0"
                            allowFullScreen={true}
                            className="w-full h-full rounded-md"
                        ></iframe>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OCMEngagementHubPage;
