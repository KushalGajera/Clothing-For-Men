import React from 'react';

const ShoppingInfoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Shopping Information</h1>

      <div className="prose max-w-none">
        <h2>Shipping & Delivery</h2>
        <p>We offer various shipping options to meet your needs. Standard shipping typically takes 5-7 business days, while expedited options are available for faster delivery. Shipping costs are calculated at checkout based on your location and chosen shipping method.</p>
        <ul>
          <li>Standard Shipping: 5-7 business days</li>
          <li>Expedited Shipping: 2-3 business days</li>
          <li>International Shipping: Varies by destination</li>
        </ul>

        <h2>Payment Methods</h2>
        <p>We accept a variety of secure payment methods for your convenience:</p>
        <ul>
          <li>Credit/Debit Cards (Visa, MasterCard, American Express, Discover)</li>
          <li>PayPal</li>
          <li>Apple Pay</li>
          <li>Google Pay</li>
        </ul>
        <p>All transactions are securely processed and encrypted.</p>

        <h2>Order Tracking</h2>
        <p>Once your order has shipped, you will receive a confirmation email with a tracking number. You can use this tracking number to monitor the status of your delivery on the carrier's website.</p>

        <h2>Customer Service</h2>
        <p>Our customer service team is available to assist you with any questions or concerns regarding your order, products, or general inquiries. Please visit our <a href="/contact" className="text-blue-600 hover:underline">Contact Us</a> page for various ways to get in touch.</p>
      </div>
    </div>
  );
};

export default ShoppingInfoPage;