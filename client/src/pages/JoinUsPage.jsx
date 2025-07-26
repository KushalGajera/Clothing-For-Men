import React from 'react';
import { Link } from 'react-router-dom';

const JoinUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Join Our Community</h1>

      <div className="prose max-w-none text-center">
        <p className="text-lg text-gray-700 mb-6">
          Become a part of the StyleForge family! By joining us, you'll get access to exclusive benefits, early access to new collections, special discounts, and a personalized shopping experience.
        </p>

        <div className="space-y-4 mb-8">
          <p className="text-xl font-semibold">Why Join Us?</p>
          <ul className="list-disc list-inside mx-auto max-w-md text-left">
            <li>Exclusive Member Discounts</li>
            <li>Early Access to Sales & New Arrivals</li>
            <li>Personalized Style Recommendations</li>
            <li>Birthday Rewards</li>
            <li>Faster Checkout</li>
            <li>Order History & Easy Returns</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register">
            <button className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              Create an Account
            </button>
          </Link>
          <Link to="/login">
            <button className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400">
              Already a Member? Sign In
            </button>
          </Link>
        </div>

        <div className="mt-12 text-gray-600 text-sm">
          <p>By creating an account, you agree to our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> and <Link to="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default JoinUsPage;