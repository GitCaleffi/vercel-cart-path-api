# API Usage Examples

This document provides examples of how to use the Vercel Cart Path API.

## Basic Usage

### Example 1: Extract Cart ID

**Request:**
```
GET /api?path=/cart/abc123
```

**Response:**
```json
{
  "fullMatch": "/cart/abc123",
  "groups": ["cart", "abc123"],
  "path": "/cart/abc123",
  "pattern": "\\/(cart|checkout)\\/([a-zA-Z0-9-_]+)",
  "type": "cart",
  "cartId": "abc123"
}
```

### Example 2: Extract Checkout ID

**Request:**
```
GET /api?path=/checkout/order-xyz789
```

**Response:**
```json
{
  "fullMatch": "/checkout/order-xyz789",
  "groups": ["checkout", "order-xyz789"],
  "path": "/checkout/order-xyz789",
  "pattern": "\\/(cart|checkout)\\/([a-zA-Z0-9-_]+)",
  "type": "checkout",
  "cartId": "order-xyz789"
}
```

## Custom Pattern Examples

### Example 3: Extract Product ID

**Request:**
```
GET /api?path=/product/item-456&pattern=/product/item-(\\d+)
```

**Response:**
```json
{
  "fullMatch": "/product/item-456",
  "groups": ["456"],
  "path": "/product/item-456",
  "pattern": "\\/product\\/item-(\\d+)"
}
```

### Example 4: Extract Multiple Values

**Request:**
```
GET /api?path=/cart/cart123/item/item456&pattern=/cart/([^/]+)/item/([^/]+)
```

**Response:**
```json
{
  "fullMatch": "/cart/cart123/item/item456",
  "groups": ["cart123", "item456"],
  "path": "/cart/cart123/item/item456",
  "pattern": "\\/cart\\/([^/]+)\\/item\\/([^/]+)"
}
```

## Error Handling

### Missing Path Parameter

**Request:**
```
GET /api
```

**Response (400):**
```json
{
  "error": "Missing required parameter: path",
  "usage": "GET /api?path=/cart/12345&pattern=(optional)"
}
```

### No Match Found

**Request:**
```
GET /api?path=/invalid/path
```

**Response (404):**
```json
{
  "error": "No match found",
  "path": "/invalid/path",
  "pattern": "\\/(cart|checkout)\\/([a-zA-Z0-9-_]+)"
}
```

### Invalid Regex Pattern

**Request:**
```
GET /api?path=/cart/123&pattern=[invalid(regex
```

**Response (400):**
```json
{
  "error": "Invalid regex pattern",
  "message": "Invalid regular expression: /[invalid(regex/: Unterminated character class"
}
```

## Integration Examples

### JavaScript/Fetch

```javascript
const extractCartId = async (path) => {
  const response = await fetch(`/api?path=${encodeURIComponent(path)}`);
  const data = await response.json();
  return data.cartId;
};

// Usage
const cartId = await extractCartId('/cart/abc123');
console.log(cartId); // "abc123"
```

### cURL

```bash
curl "https://your-domain.vercel.app/api?path=/cart/abc123"
```

### Node.js (with custom pattern)

```javascript
const params = new URLSearchParams({
  path: '/user/john-doe/profile',
  pattern: '/user/([^/]+)/profile'
});

const response = await fetch(`/api?${params}`);
const data = await response.json();
console.log(data.groups[0]); // "john-doe"
```
