import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, Link } from 'react-router-dom';

import './Navbar.css'; 

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // In a real app, you would call an API here
        setSearchResults([]);
    };

    const renderLinks = () => {
        if (!currentUser) {
            return [
                { path: '/', label: 'Home' },
                { path: '/elections', label: 'Elections' },
                { path: '/about', label: 'About' },
            ];
        } else if (currentUser.role === "voter") {
            return [
                { path: '/dashboard', label: 'Dashboard' },
                { path: '/elections/ongoing', label: 'Ongoing Elections' },
                { path: '/history', label: 'History' },
            ];
        } else if (currentUser.role === "admin") {
            return [
                { path: '/admin', label: 'Admin' },
                { path: '/admin/elections', label: 'Manage Elections' },
                { path: '/admin/users', label: 'Manage Users' },
            ];
        }
        return [];
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <button className="mobile-menu-button" onClick={toggleMenu}>
                    {isOpen ? '✕' : '☰'}
                </button>
                <Link to="/" className="logo-link">
                    <img src="/logo.png" alt="Voting System" className="logo" />
                    <h1 className="app-name">CommunityVote</h1>
                </Link>
            </div>

            <div className="desktop-links">
                {renderLinks().map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className="navbar-utilities">
                <div className="search-wrapper">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Find elections..."
                        className="search-input"
                    />
                    {searchQuery.length > 0 && (
                        <div className="search-results">
                            {searchResults.length > 0 ? (
                                searchResults.map((result) => (
                                    <Link key={result.id} to={`/election/${result.id}`}>
                                        {result.title}
                                    </Link>
                                ))
                            ) : (
                                <div className="no-results">No elections found</div>
                            )}
                        </div>
                    )}
                </div>

                {currentUser ? (
                    <div className="user-dropdown">
                        <div className="user-trigger">
                            <img 
                                src={currentUser.photoUrl || '/default-avatar.png'} 
                                alt="User" 
                                className="user-avatar"
                            />
                            <span className="username">{currentUser.name}</span>
                            <span className="dropdown-icon">▼</span>
                        </div>
                        <div className="dropdown-menu">
                            <div className="user-info">
                                <p>{currentUser.email}</p>
                                <p className="role-badge">{currentUser.role}</p>
                            </div>
                            <Link to="/profile" className="dropdown-link">
                                Profile Settings
                            </Link>
                            {currentUser.role === "admin" && (
                                <Link to="/admin/settings" className="dropdown-link">
                                    System Controls
                                </Link>
                            )}
                            <button onClick={logout} className="logout-button">
                                Log Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="login-button">
                            Log In
                        </Link>
                        <Link to="/register" className="register-button">
                            Register
                        </Link>
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="mobile-overlay">
                    <div className="mobile-content">
                        <div className="mobile-header">
                            <h2>Menu</h2>
                            <button className="close-button" onClick={toggleMenu}>×</button>
                        </div>
                        <div className="mobile-links">
                            {renderLinks().map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                                    onClick={toggleMenu}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        {currentUser && (
                            <div className="mobile-user">
                                <p>Signed in as {currentUser.name}</p>
                                <button onClick={logout} className="mobile-logout">
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;