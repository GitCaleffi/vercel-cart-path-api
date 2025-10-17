# Cart Path Extractor API

Estrae il path `/cart/...` da una URL tramite un endpoint Vercel.

### Endpoint

POST `/api/extract-cart-path`

**Body:**
```json
{
  "url": "https://checkout.caleffionline.it/cart/c/abc123?key=xyz"
}
```

**Response:**
```json
{
  "path": "/cart/c/abc123?key=xyz"
}
```

---

## 2. Regex personalizzata

**POST `/api/regex-extract`**
```json
{
  "string": "peso netto: 35kg",
  "regex": "\\d+kg"
}
```

**Risposta:**
```json
{
  "match": "35kg"
}
```



[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TUO-USERNAME/vercel-cart-path-api)
