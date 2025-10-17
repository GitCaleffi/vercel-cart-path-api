/**
 * Vercel serverless function to extract values from cart paths using regex
 * 
 * Expected path patterns:
 * - /cart/:cartId
 * - /cart/:cartId/item/:itemId
 * - /checkout/:cartId
 * 
 * Query parameters:
 * - path: The path to extract values from
 * - pattern: Optional custom regex pattern (defaults to cart ID extraction)
 */

export default function handler(req, res) {
  const { path, pattern } = req.query;

  if (!path) {
    return res.status(400).json({ 
      error: 'Missing required parameter: path',
      usage: 'GET /api?path=/cart/12345&pattern=(optional)'
    });
  }

  try {
    // Default pattern: extract cart ID from paths like /cart/12345 or /checkout/12345
    const defaultPattern = /\/(cart|checkout)\/([a-zA-Z0-9-_]+)/;
    const regex = pattern ? new RegExp(pattern) : defaultPattern;
    
    const match = path.match(regex);

    if (!match) {
      return res.status(404).json({
        error: 'No match found',
        path,
        pattern: regex.source
      });
    }

    // Extract captured groups
    const extracted = {
      fullMatch: match[0],
      groups: match.slice(1),
      path,
      pattern: regex.source
    };

    // If using default pattern, provide semantic names
    if (!pattern) {
      extracted.type = match[1]; // 'cart' or 'checkout'
      extracted.cartId = match[2]; // the ID
    }

    return res.status(200).json(extracted);

  } catch (error) {
    return res.status(400).json({
      error: 'Invalid regex pattern',
      message: error.message
    });
  }
}
