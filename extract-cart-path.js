export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid `url` in body' });
  }

  const match = url.match(/.*(\/cart\/.*)/);

  if (match && match[1]) {
    return res.status(200).json({ path: match[1] });
  } else {
    return res.status(404).json({ error: 'No /cart/ path found in URL' });
  }
}
