# vercel-cart-path-api

A Vercel serverless API that extracts values from cart paths using regular expressions.

## Features

- Extract cart IDs from paths like `/cart/:cartId` or `/checkout/:cartId`
- Support for custom regex patterns
- Returns captured groups and matched values
- Built as a Vercel serverless function

## Usage

### Default Pattern (Cart/Checkout Extraction)

Extract cart ID from standard paths:

```
GET /api?path=/cart/abc123
```

Response:
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

### Custom Pattern

Use a custom regex pattern:

```
GET /api?path=/product/item-456&pattern=/product/item-(\\d+)
```

Response:
```json
{
  "fullMatch": "/product/item-456",
  "groups": ["456"],
  "path": "/product/item-456",
  "pattern": "/product/item-(\\d+)"
}
```

## API Parameters

- `path` (required): The URL path to extract values from
- `pattern` (optional): Custom regex pattern. If not provided, uses default cart/checkout pattern

## Examples

### Extract from cart path
```
/api?path=/cart/12345
```

### Extract from checkout path
```
/api?path=/checkout/order-xyz789
```

### Extract multiple values
```
/api?path=/cart/cart123/item/item456&pattern=/cart/([^/]+)/item/([^/]+)
```

## Development

Install dependencies:
```bash
npm install
```

Run tests:
```bash
npm test
```

Run locally with Vercel CLI:
```bash
npm run dev
```

## Deploy to Vercel

```bash
vercel
```

## Error Handling

- Returns `400` if `path` parameter is missing
- Returns `404` if no match is found
- Returns `400` if regex pattern is invalid