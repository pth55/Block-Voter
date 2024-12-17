import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import VoterHome from "./VoterHome.jsx"; 
import VoteNow from './VoteNow.jsx';
import { resultStatus} from '../../../../contracts/Elections.js'; 

export default function VoterDashboard() { 
    const [drawerOpen, setDrawerOpen] = useState(false); 
    const [currentComponent, setCurrentComponent] = useState(<VoterHome />); 
    const [isResultsDeclared, setIsResultsDeclared] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const setResultsStatus = async()=>{
            const results = await resultStatus();
            if(results) {
                setIsResultsDeclared(results)
            }
        }

        setResultsStatus();
    }, []);

    useEffect(() => { 
        const voterData = JSON.parse(localStorage.getItem('voterData')); 
        if (!voterData || !voterData.isLogin) { 
            navigate('/'); // Redirect to home if not logged in 
        } 
    }, [navigate]);

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    const handleSidebarClick = (component) => { 
        setCurrentComponent(component); 
        setDrawerOpen(false); 
    };

    const handleLogout = () => { 
        localStorage.removeItem('voterData'); // Clear voter data from localStorage 
        navigate("/"); // Redirect to home after logout 
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-blue-200 border-b border-blue-300">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button 
                                onClick={toggleDrawer} 
                                aria-controls="logo-sidebar" 
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-blue-500 rounded-lg sm:hidden hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link to='/' className="flex ms-2 md:me-24 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-blue-700">
                                Voter Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-[150px] h-screen pt-20 transition-transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-blue-50 border-r border-blue-300 sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-blue-50">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button onClick={() => handleSidebarClick(<VoterHome />)} className="flex items-center p-3 w-full text-blue-600 rounded-lg hover:bg-blue-300 group border-b-2 border-transparent">
                                <span className="ms-3 text-lg">Home</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleSidebarClick(<VoteNow />)} className="flex items-center p-3 w-full text-blue-600 rounded-lg hover:bg-blue-300 group border-b-2 border-transparent">
                                <span className="ms-3 text-lg">{isResultsDeclared? "Vote Now" : "Results"}</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="flex items-center p-3 w-full text-blue-600 rounded-lg hover:bg-blue-300 group border-b-2 border-transparent">
                                <span className="ms-3 text-lg">Log out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="pl-5 pr-5 sm:ml-[150px]">
                <div className="p-10 border-2 border-blue-300 border-dashed rounded-lg mt-0">
                    {currentComponent}
                </div>
            </div>
        </>
    );
}
