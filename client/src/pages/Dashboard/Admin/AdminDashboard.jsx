import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminHome from "./AdminHome.jsx";
import AddCandidate from './AddCandidate.jsx';
import Controls from './Controls.jsx';
import AllCandidates from './AllCandidates.jsx';

export default function AdminDashboard() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentComponent, setCurrentComponent] = useState(<AdminHome />);
    const toggleDrawer = () => setDrawerOpen(!drawerOpen);
    const navigate = useNavigate();
    
    const handleSidebarClick = (component) => {
        setCurrentComponent(component);
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminData');
        navigate("/");
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-pink-200 border-b border-pink-300">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button 
                                onClick={toggleDrawer} 
                                aria-controls="logo-sidebar" 
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-pink-500 rounded-lg sm:hidden hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <Link to='/' className="flex ms-2 md:me-24 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-pink-600">
                                Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-50 h-screen pt-20 transition-transform ${drawerOpen ? 'translate-x-0' : '-translate-x-full'} bg-pink-50 border-r border-pink-300 sm:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-pink-50">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button onClick={() => handleSidebarClick(<AdminHome />)} className="flex items-center w-full p-2 text-pink-600 rounded-lg hover:bg-pink-300 group">
                                <span className="ms-3 text-lg">Home</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleSidebarClick(<Controls />)} className="flex items-center w-full p-2 text-pink-600 rounded-lg hover:bg-pink-300 group">
                                <span className="ms-3 text-lg">Controls</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleSidebarClick(<AddCandidate />)} className="flex items-center w-full p-2 text-pink-600 rounded-lg hover:bg-pink-300 group">
                                <span className="ms-3 text-lg">Add Candidates</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleSidebarClick(<AllCandidates />)} className="flex items-center w-full p-2 text-pink-600 rounded-lg hover:bg-pink-300 group">
                                <span className="ms-3 text-lg">All Candidates</span>
                            </button>
                        </li>
                        
                        <li>
                            <button onClick={handleLogout} className="flex items-center p-2 w-full text-pink-600 rounded-lg hover:bg-pink-300 group">
                                <span className="ms-3 text-lg">Log out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="pl-[55px] pr-5 sm:ml-[150px]">
                <div className="p-10 border-2 border-pink-300 border-dashed rounded-lg mt-0">
                    {currentComponent}
                </div>
            </div>
        </>
    );
}
