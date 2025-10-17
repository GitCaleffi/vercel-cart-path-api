// Example usage of the regex extraction API

import handler from './api/index.js';

// Helper function to test the API
function testAPI(path, pattern) {
  const req = { query: { path, pattern } };
  const res = {
    statusCode: 200,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      console.log(`\n📍 Path: ${path}`);
      if (pattern) console.log(`🔍 Pattern: ${pattern}`);
      console.log(`✅ Status: ${this.statusCode}`);
      console.log('📦 Response:', JSON.stringify(data, null, 2));
      return this;
    }
  };
  handler(req, res);
}

console.log('=== Vercel Cart Path API Examples ===\n');

// Example 1: Extract from cart path
console.log('Example 1: Basic cart path');
testAPI('/cart/abc123');

// Example 2: Extract from checkout path
console.log('\n\nExample 2: Checkout path');
testAPI('/checkout/order-xyz789');

// Example 3: Cart ID with special characters
console.log('\n\nExample 3: Cart ID with hyphens and underscores');
testAPI('/cart/user_cart-2024');

// Example 4: Custom pattern for product
console.log('\n\nExample 4: Custom pattern for product');
testAPI('/product/item-456', '/product/item-(\\d+)');

// Example 5: Multiple capture groups
console.log('\n\nExample 5: Multiple capture groups');
testAPI('/cart/cart123/item/item456', '/cart/([^/]+)/item/([^/]+)');

// Example 6: No match
console.log('\n\nExample 6: Path with no match');
testAPI('/invalid/path');

// Example 7: Missing path parameter
console.log('\n\nExample 7: Missing path parameter');
testAPI();
