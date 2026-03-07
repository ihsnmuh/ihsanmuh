# Metadata Improvement Plan

Audit of `ihsanmuh.com` metadata — OG images, structured data, sitemap, and related SEO layers.

---

## Critical

### 1. Replace OG Image (favicon → real image)

**File:** `src/components/Molecules/seo/index.tsx`

Default `og:image` currently points to a 512×512 favicon. Should be a proper **1200×630px** branded card.

```ts
// Before
image: `https://${process.env.NEXT_PUBLIC_URL}/favicon/android-chrome-512x512.png`,

// After
image: `https://${process.env.NEXT_PUBLIC_URL}/images/og-default.png`,
```

- [ ] Design and export `/public/images/og-default.png` (1200×630px)
- [ ] For blog posts: consider dynamic OG via `@vercel/og` — generate per-post cards with title + description

---

### 2. Add OG Image Dimensions and Alt

```tsx
// Before
<meta name='image' property='og:image' content={meta.image} />

// After
<meta property='og:image' content={meta.image} />
<meta property='og:image:width' content='1200' />
<meta property='og:image:height' content='630' />
<meta property='og:image:alt' content={meta.title} />
```

- [ ] Update `src/components/Molecules/seo/index.tsx`
- [ ] Remove the incorrect `name='image'` attribute (non-standard)

---

### 3. Fix Sitemap URL Protocol

**File:** `next-sitemap.config.js`

`NEXT_PUBLIC_URL` env var has no protocol prefix, so generated URLs become `ihsanmuh.com/blog` instead of `https://ihsanmuh.com/blog`.

```js
// Before
siteUrl: process.env.NEXT_PUBLIC_URL || 'https://ihsanmuh.com',

// After
siteUrl: process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : 'https://ihsanmuh.com',
```

- [ ] Update `next-sitemap.config.js`
- [ ] Verify `public/sitemap.xml` after next build

---

## Significant

### 4. Set `og:type` to `article` for Blog Posts

**File:** `src/components/Molecules/seo/index.tsx`

Blog posts use default `type: 'website'`. Should be `'article'`.

```ts
// In defaultMeta, keep type: 'website'
// In <Seo> component meta construction:
meta['type'] = props.isBlog ? 'article' : (props.type ?? defaultMeta.type);
```

- [ ] Update `src/components/Molecules/seo/index.tsx`

---

### 5. Fix `og:site_name`

Currently set to the raw domain (`ihsanmuh.com`). Should be a human-readable name.

```ts
// Before
siteName: process.env.NEXT_PUBLIC_URL,

// After
siteName: 'Muhammad Ihsan',
```

- [ ] Update `src/components/Molecules/seo/index.tsx`

---

### 6. Add `twitter:creator`

```tsx
// Add alongside twitter:site
<meta name='twitter:creator' content='@ihsnmuh' />
```

- [ ] Update `src/components/Molecules/seo/index.tsx`

---

### 7. Add `og:locale`

```tsx
<meta property='og:locale' content='en_US' />
```

- [ ] Update `src/components/Molecules/seo/index.tsx`

---

### 8. Fill in Web App Manifest

**File:** `public/favicon/site.webmanifest`

```json
{
  "name": "Muhammad Ihsan",
  "short_name": "Ihsan",
  ...
}
```

- [ ] Update `public/favicon/site.webmanifest`

---

## Structural / Code

### 9. Fix Duplicate BlogPosting JSON-LD

`src/lib/structuredData.ts` exports `getBlogPostingSchema()` but it's never used. Blog posts get an inferior inline version from inside `<Seo>` (missing `url`, `dateModified`, `mainEntityOfPage`).

**Plan:**
- [ ] In `src/pages/blog/[slug].tsx` — import and inject `getBlogPostingSchema()` via `<Head>`
- [ ] Remove the inline `BlogPosting` JSON-LD block from `src/components/Molecules/seo/index.tsx`
- [ ] Enrich `getBlogPostingSchema()` with `url` and `dateModified` fields if available in MDX frontmatter

---

### 10. Inject `getCreativeWorkSchema()` on Projects Page

`src/lib/structuredData.ts` exports `getCreativeWorkSchema()` but the projects page never uses it.

- [ ] Update `src/pages/project/index.tsx` to inject `CreativeWork` JSON-LD per project

---

### 11. Add `article:modified_time` to Blog Posts

**File:** `src/components/Molecules/seo/index.tsx`

If MDX frontmatter exposes an updated date, pass it as `modifiedDate` prop:

```tsx
{meta.modifiedDate && (
  <meta property='article:modified_time' content={meta.modifiedDate} />
)}
```

- [ ] Check if MDX frontmatter has an `updatedAt` or `modifiedAt` field
- [ ] Pass it through `<Seo>` if available

---

### 12. Fix Apple Touch Icon Size

Standard is 180×180, not 57×57.

```ts
// Before
{ rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-touch-icon.png' }

// After
{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }
```

- [ ] Check if `/public/favicon/apple-touch-icon.png` is actually 180×180
- [ ] Update size declaration in `src/components/Molecules/seo/index.tsx`

---

## Priority Order

| # | Task | File | Impact | Effort |
|---|---|---|---|---|
| 1 | Create real OG image (1200×630px) | `public/images/og-default.png` | High | Medium |
| 2 | Add OG image dimensions + alt | `seo/index.tsx` | Medium | Low |
| 3 | Fix sitemap URL protocol | `next-sitemap.config.js` | High | Low |
| 4 | `og:type: article` for blogs | `seo/index.tsx` | Medium | Low |
| 5 | Fix `og:site_name` | `seo/index.tsx` | Low | Low |
| 6 | Add `twitter:creator` | `seo/index.tsx` | Low | Low |
| 7 | Add `og:locale` | `seo/index.tsx` | Low | Low |
| 8 | Fill web manifest name | `site.webmanifest` | Medium | Low |
| 9 | Fix duplicate BlogPosting JSON-LD | `seo/index.tsx`, `[slug].tsx` | Medium | Medium |
| 10 | Inject `CreativeWork` schema | `project/index.tsx` | Low | Medium |
| 11 | Add `article:modified_time` | `seo/index.tsx` | Low | Low |
| 12 | Fix apple touch icon size | `seo/index.tsx` | Low | Low |
