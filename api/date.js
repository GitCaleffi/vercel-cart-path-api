export default function handler(req, res) {
  const now = new Date();

  // YYYY-MM-DD
  const isoDate = now.toISOString().slice(0, 10);

  // giorno e mese separati
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  res.status(200).json({
    date: isoDate,
    day,
    month,
    year,
    iso_day: `${year}-${String(
      Math.floor((now - new Date(year, 0, 0)) / 86400000)
    ).padStart(3, "0")}`, // tipo 2025-314
  });
}
