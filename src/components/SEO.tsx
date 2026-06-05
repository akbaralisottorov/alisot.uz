import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  authorName?: string;
  canonicalUrl?: string;
}

export function SEO({ 
  title = "Alisot - Marketing & Brend Strategiyasi", 
  description = "Akbarali Sottorov — Marketing strategy va brand communications mutaxassisining portfolio va blog sahifasi. Xatti-harakatlar iqtisodiyoti va brending.", 
  url = "https://alisot.uz", 
  image = "https://alisot.uz/og-image.png", 
  type = "website",
  publishedAt,
  authorName = "Akbarali Sottorov",
  canonicalUrl
}: SEOProps) {
  
  const finalCanonicalUrl = canonicalUrl || url;
  
  const jsonLd = type === 'article' ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": [image],
    "datePublished": publishedAt,
    "author": [{
        "@type": "Person",
        "name": authorName,
        "url": "https://alisot.uz"
      }]
  } : {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Alisot",
    "url": url,
    "author": {
      "@type": "Person",
      "name": "Akbarali Sottorov"
    }
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akbarali Sottorov",
    "jobTitle": "Marketing Strategist",
    "url": "https://alisot.uz",
    "sameAs": [
      "https://t.me/akbaralisottorov",
      "https://instagram.com/akbaralisottorov",
      "https://linkedin.com/in/akbaralisottorov"
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={finalCanonicalUrl} />
      <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Akbarali Blog" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="uz_UZ" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(personJsonLd)}
      </script>
    </Helmet>
  );
}
