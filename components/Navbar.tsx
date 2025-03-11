
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-primary">ThriftHub</Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-gray-600 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/donate" className="text-gray-600 hover:text-primary transition-colors">
              Donate
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-primary transition-colors">
              Admin
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 slide-up">
            <Link
              to="/shop"
              className="block px-4 py-2 text-gray-600 hover:bg-primary/10 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/donate"
              className="block px-4 py-2 text-gray-600 hover:bg-primary/10 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Donate
            </Link>
            <Link
              to="/admin"
              className="block px-4 py-2 text-gray-600 hover:bg-primary/10 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            <Link
              to="/cart"
              className="block px-4 py-2 text-gray-600 hover:bg-primary/10 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
