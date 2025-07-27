import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { usersAPI } from '../lib/api';
import { Button } from '../components/ui/button';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await usersAPI.getWishlist();
      setWishlistItems(response.data);
    } catch (err) {
      setError('Failed to load wishlist');
      console.error('Wishlist fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      setActionLoading(prev => ({ ...prev, [productId]: true }));
      await usersAPI.removeFromWishlist(productId);
      setWishlistItems(prev => prev.filter(item => item._id !== productId));
      toast.success('Removed from wishlist');
    } catch (err) {
      toast.error('Failed to remove from wishlist');
      console.error('Remove from wishlist error:', err);
    } finally {
      setActionLoading(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToCart = async (product) => {
    // For products with sizes, we need to redirect to product page
    if (product.sizes && product.sizes.length > 0) {
      toast.error('Please select size and color on the product page');
      return;
    }

    try {
      setActionLoading(prev => ({ ...prev, [`cart_${product._id}`]: true }));
      
      const cartData = {
        productId: product._id,
        name: product.name,
        image: product.images?.[0] || '',
        price: product.price,
        size: product.sizes?.[0]?.size || 'One Size',
        color: product.colors?.[0]?.color || 'Default',
        quantity: 1,
      };

      const result = await addToCart(cartData);
      if (result.success) {
        toast.success('Added to cart successfully!');
      }
    } catch (err) {
      toast.error('Failed to add to cart');
      console.error('Add to cart error:', err);
    } finally {
      setActionLoading(prev => ({ ...prev, [`cart_${product._id}`]: false }));
    }
  };

  const handleClearWishlist = async () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      try {
        setLoading(true);
        await usersAPI.clearWishlist();
        setWishlistItems([]);
        toast.success('Wishlist cleared');
      } catch (err) {
        toast.error('Failed to clear wishlist');
        console.error('Clear wishlist error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-8">You need to be logged in to view your wishlist.</p>
          <Link to="/login">
            <Button>Login to Continue</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Wishlist</h2>
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchWishlist} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8">Save items you love to your wishlist and shop them later.</p>
          <Link to="/products">
            <Button>Discover Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </span>
          {wishlistItems.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearWishlist}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm border overflow-hidden group">
            <div className="relative">
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.images?.[0] || '/api/placeholder/300/400'}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <button
                onClick={() => handleRemoveFromWishlist(product._id)}
                disabled={actionLoading[product._id]}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
              >
                {actionLoading[product._id] ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
                ) : (
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                )}
              </button>
            </div>

            <div className="p-4">
              <Link to={`/products/${product._id}`}>
                <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.rating > 0 && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">⭐ {product.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {product.sizes && product.sizes.length > 0 ? (
                  <Link to={`/products/${product._id}`}>
                    <Button className="w-full" size="sm">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Select Options
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={actionLoading[`cart_${product._id}`]}
                    className="w-full"
                    size="sm"
                  >
                    {actionLoading[`cart_${product._id}`] ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <ShoppingBag className="mr-2 h-4 w-4" />
                    )}
                    Add to Cart
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  disabled={actionLoading[product._id]}
                >
                  {actionLoading[product._id] ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/products">
          <Button variant="outline" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;
