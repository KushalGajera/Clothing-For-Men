import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productsAPI } from '../lib/api';
import { Button } from '../components/ui/button';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getProduct(id);
        setProduct(response.data);
        if (response.data.images && response.data.images.length > 0) {
          setSelectedImage(response.data.images[0]);
        } else if (response.data.colors && response.data.colors.length > 0 && response.data.colors[0].images && response.data.colors[0].images.length > 0) {
          setSelectedImage(response.data.colors[0].images[0]);
        }
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size.');
      return;
    }
    if (!selectedColor && product.colors && product.colors.length > 0) {
      toast.error('Please select a color.');
      return;
    }

    addToCart({
      productId: product._id,
      name: product.name,
      image: selectedImage || product.images[0] || (product.colors && product.colors.length > 0 && product.colors[0].images && product.colors[0].images.length > 0 ? product.colors[0].images[0] : ''),
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return <div className="text-center py-12">Loading product...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-12">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex flex-col items-center">
          <img
            src={selectedImage || product.images[0] || (product.colors && product.colors.length > 0 && product.colors[0].images && product.colors[0].images.length > 0 ? product.colors[0].images[0] : '/api/placeholder/600/800')}
            alt={product.name}
            className="w-full max-w-lg h-auto object-cover rounded-lg shadow-md mb-4"
          />
          <div className="flex space-x-2 overflow-x-auto w-full max-w-lg">
            {product.images && product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
            {product.colors && product.colors.map((colorOption) => (
              colorOption.images && colorOption.images.map((img, index) => (
                <img
                  key={`color-${colorOption.color}-${index}`}
                  src={img}
                  alt={`${product.name} ${colorOption.color} thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${selectedImage === img ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => {
                    setSelectedImage(img);
                    setSelectedColor(colorOption.color);
                  }}
                />
              ))
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.brand}</p>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-gray-500 line-through text-xl">₹{product.originalPrice.toFixed(2)}</span>
            )}
            {product.rating > 0 && (
              <div className="flex items-center ml-4">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg text-gray-700 ml-1">{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
              </div>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <Button
                    key={s.size}
                    variant={selectedSize === s.size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    className="min-w-[60px]"
                  >
                    {s.size} {s.stock === 0 && '(Out of Stock)'}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Select Color:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <div
                    key={c.colorCode}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${selectedColor === c.color ? 'border-blue-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: c.colorCode }}
                    onClick={() => {
                      setSelectedColor(c.color);
                      if (c.images && c.images.length > 0) {
                        setSelectedImage(c.images[0]);
                      }
                    }}
                    title={c.color}
                  ></div>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            {isAuthenticated && (
              <Button size="lg" variant="outline" className="flex-1">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            )}
          </div>

          {/* Product Features/Details (Optional) */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.materials && product.materials.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Materials:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
          )}

          {product.careInstructions && product.careInstructions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Care Instructions:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.careInstructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;