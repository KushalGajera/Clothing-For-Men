import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About StyleForge</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Welcome to StyleForge, your premier destination for premium men's clothing. 
              We are dedicated to providing modern gentlemen with high-quality, stylish, 
              and comfortable clothing that combines contemporary design with timeless elegance.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At StyleForge, we believe that every man deserves to look and feel his best. 
              Our mission is to craft exceptional clothing that empowers confidence and 
              expresses individual style while maintaining the highest standards of quality and comfort.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quality & Craftsmanship</h2>
            <p className="text-gray-600 mb-6">
              Each piece in our collection is carefully selected and crafted with attention 
              to detail. We work with premium materials and skilled artisans to ensure that 
              every item meets our exacting standards for durability, comfort, and style.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Quality craftsmanship in every piece</li>
              <li>Sustainable and ethical manufacturing practices</li>
              <li>Exceptional customer service and satisfaction</li>
              <li>Continuous innovation in design and materials</li>
              <li>Building lasting relationships with our customers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

