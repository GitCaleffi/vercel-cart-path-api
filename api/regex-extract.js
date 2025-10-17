export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { string, regex } = req.body;

  if (!string || typeof string !== 'string' || !regex || typeof regex !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid `string` or `regex` in body' });
  }

  try {
    const re = new RegExp(regex);
    const match = string.match(re);

    if (match && match[0]) {
      return res.status(200).json({ match: match[0] });
    } else {
      return res.status(404).json({ error: 'No match found' });
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid regex', details: err.message });
  }
}
