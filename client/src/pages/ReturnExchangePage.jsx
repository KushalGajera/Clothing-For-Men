import React from 'react';

const ReturnExchangePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Returns & Exchanges</h1>

      <div className="prose max-w-none">
        <h2>Our Return Policy</h2>
        <p>We want you to be completely satisfied with your purchase from StyleForge. If you are not entirely happy with your order, we're here to help.</p>
        <p>You have <strong>30 calendar days</strong> from the date you received your item to initiate a return or exchange. To be eligible for a return or exchange, your item must be unused, unwashed, and in the same condition that you received it. It must also be in the original packaging with all tags attached.</p>

        <h2>How to Initiate a Return or Exchange</h2>
        <ol>
          <li><strong>Contact Customer Service:</strong> Please contact our customer service team at <a href="mailto:returns@styleforge.com" className="text-blue-600 hover:underline">returns@styleforge.com</a> or call us at +1 (555) 123-4567 to request a Return Merchandise Authorization (RMA) number. Please provide your order number and the reason for your return/exchange.</li>
          <li><strong>Package Your Item:</strong> Securely pack the item(s) in the original packaging, including all tags and accessories. Write the RMA number clearly on the outside of the package.</li>
          <li><strong>Ship Your Item:</strong> You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. We recommend using a trackable shipping service or purchasing shipping insurance, as we cannot guarantee that we will receive your returned item.</li>
        </ol>

        <h2>Refunds</h2>
        <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>

        <h2>Exchanges</h2>
        <p>If you need to exchange an item for a different size, color, or a different product, please follow the return process to send back the original item and place a new order for the desired item. This ensures the fastest processing of your exchange.</p>

        <h2>Damaged or Defective Items</h2>
        <p>If you received a damaged or defective item, please contact us immediately. We will arrange for a replacement or refund and cover all associated shipping costs.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions on how to return your item to us, contact us at <a href="/contact" className="text-blue-600 hover:underline">info@styleforge.com</a>.</p>
      </div>
    </div>
  );
};

export default ReturnExchangePage;