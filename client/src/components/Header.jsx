import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, User, Menu, X, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { user, isAuthenticated, logout } = useAuth();
    const { getCartItemCount } = useCart();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navigationItems = [
        { name: 'New', href: '/products?sort=newest' },
        { name: 'Men', href: '/products' },
        { name: 'Shoes', href: '/products?category=shoes' },
        { name: 'Clothing', href: '/products?category=shirts,pants,jackets' },
        { name: 'Accessories', href: '/products?category=accessories' },
        { name: 'Sale', href: '/products?sale=true' },
        { name: 'Contact', href: '/contact' }
    ];


    return (
        <>
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                {/* Top bar */}
                <div className="bg-black text-white text-sm py-2">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        Free shipping on orders over ₹100 | Free returns
                    </div>
                </div>

                {/* Main header */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-2xl font-bold text-black">
                                StyleForge
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <form onSubmit={handleSearch} className="w-full">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                </div>
                            </form>
                        </div>

                        {/* Right side icons */}
                        <div className="flex items-center space-x-4">
                            {/* Search icon for mobile */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden"
                                onClick={() => {/* TODO: Implement mobile search */ }}
                            >
                                <Search className="h-5 w-5" />
                            </Button>

                            {/* User menu */}
                            {isAuthenticated ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                                            <User className="h-5 w-5" />
                                            <span className="hidden sm:inline text-sm">
                                                {user?.name?.split(' ')[0]}
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem asChild>
                                            <Link to="/profile">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/orders">Orders</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link to="/wishlist">
                                                <Heart className="h-4 w-4 mr-2" />
                                                Wishlist
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout}>
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link to="/login">Sign In</Link>
                                    </Button>
                                    <Button size="sm" asChild>
                                        <Link to="/register">Join Us</Link>
                                    </Button>
                                </div>
                            )}

                            {/* Wishlist */}
                            {isAuthenticated && (
                                <Button variant="ghost" size="sm" asChild>
                                    <Link to="/wishlist">
                                        <Heart className="h-5 w-5" />
                                    </Link>
                                </Button>
                            )}

                            {/* Shopping cart */}
                            <Button variant="ghost" size="sm" asChild className="relative">
                                <Link to="/cart">
                                    <ShoppingBag className="h-5 w-5" />
                                    {getCartItemCount() > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {getCartItemCount()}
                                        </span>
                                    )}
                                </Link>
                            </Button>

                            {/* Mobile menu button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="md:hidden"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="md:hidden border-t border-gray-200">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-gray-600 hover:bg-gray-50 rounded-md"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile search */}
                            <div className="px-4 py-3 border-t border-gray-200">
                                <form onSubmit={handleSearch}>
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full"
                                        />
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        </>
    )
}


export default Header