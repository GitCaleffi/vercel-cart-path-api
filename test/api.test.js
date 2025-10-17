import { describe, it } from 'node:test';
import assert from 'node:assert';
import handler from '../api/index.js';

// Mock request and response objects
function createMockReq(query = {}) {
  return { query };
}

function createMockRes() {
  const res = {
    statusCode: 200,
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.data = data;
      return this;
    }
  };
  return res;
}

describe('API Handler - Extract value from regex', () => {
  it('should return error when path parameter is missing', () => {
    const req = createMockReq({});
    const res = createMockRes();
    
    handler(req, res);
    
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.data.error, 'Missing required parameter: path');
  });

  it('should extract cart ID from /cart/:cartId path', () => {
    const req = createMockReq({ path: '/cart/abc123' });
    const res = createMockRes();
    
    handler(req, res);
    
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.data.type, 'cart');
    assert.strictEqual(res.data.cartId, 'abc123');
    assert.strictEqual(res.data.fullMatch, '/cart/abc123');
  });

  it('should extract cart ID from /checkout/:cartId path', () => {
    const req = createMockReq({ path: '/checkout/xyz789' });
    const res = createMockRes();
    
    handler(req, res);
    
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.data.type, 'checkout');
    assert.strictEqual(res.data.cartId, 'xyz789');
    assert.strictEqual(res.data.fullMatch, '/checkout/xyz789');
  });

  it('should handle cart IDs with hyphens and underscores', () => {
    const req = createMockReq({ path: '/cart/test-cart_123' });
    const res = createMockRes();
    
    handler(req, res);
    
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.data.cartId, 'test-cart_123');
  });

  it('should work with custom regex pattern', () => {
    const req = createMockReq({ 
      path: '/product/item-456',
      pattern: '/product/item-(\\d+)'
    });
    const res = createMockRes();
    
    handler(req, res);
    
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.data.fullMatch, '/product/item-456');
    assert.strictEqual(res.data.groups[0], '456');
  });

  it('should return 404 when no match is found', () => {
    const req = createMockReq({ path: '/invalid/path' });
    const res = createMockRes();
    
    handler(req, res);
    
    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.data.error, 'No match found');
  });

  it('should return error for invalid regex pattern', () => {
    const req = createMockReq({ 
      path: '/cart/123',
      pattern: '[invalid(regex'
    });
    const res = createMockRes();
    
    handler(req, res);
    
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.data.error, 'Invalid regex pattern');
  });

  it('should extract multiple groups from pattern', () => {
    const req = createMockReq({ 
      path: '/cart/cart123/item/item456',
      pattern: '/cart/([^/]+)/item/([^/]+)'
    });
    const res = createMockRes();
    
    handler(req, res);
    
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.data.groups.length, 2);
    assert.strictEqual(res.data.groups[0], 'cart123');
    assert.strictEqual(res.data.groups[1], 'item456');
  });
});
