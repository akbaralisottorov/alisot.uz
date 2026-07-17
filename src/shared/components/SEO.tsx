import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'project' | 'profile';
  publishedAt?: string;
  authorName?: string;
  canonicalUrl?: string;
  breadcrumbs?: { name: string; item: string }[];
}

export function SEO({ 
  title = "Alisot - Marketing & Brend Strategiyasi", 
  description = "Akbarali Sottorov — Marketing strategy va brand communications mutaxassisining portfolio va blog sahifasi. Xatti-harakatlar iqtisodiyoti va brending.", 
  url = "https://alisot.uz", 
  image = "https://alisot.uz/og-image.png", 
  type = "website",
  publishedAt,
  authorName = "Akbarali Sottorov",
  canonicalUrl,
  breadcrumbs
}: SEOProps) {
  
  const finalCanonicalUrl = canonicalUrl || url;
  
  const schemas: Record<string, any>[] = [];

  // 1. Core Schema by Type
  if (type === 'article') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "image": [image],
      "datePublished": publishedAt,
      "dateModified": publishedAt,
      "mainEntityOfPage": finalCanonicalUrl,
      "author": [{
        "@type": "Person",
        "name": authorName,
        "url": "https://alisot.uz"
      }],
      "publisher": {
        "@type": "Organization",
        "name": "Alisot",
        "logo": {
          "@type": "ImageObject",
          "url": "https://alisot.uz/og-image.png"
        }
      }
    });
  } else if (type === 'project') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": title,
      "description": description,
      "image": image,
      "creator": {
        "@type": "Person",
        "name": authorName,
        "url": "https://alisot.uz"
      }
    });
  } else {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Alisot",
      "url": "https://alisot.uz",
      "author": {
        "@type": "Person",
        "name": "Akbarali Sottorov"
      }
    });
  }

  // 2. Person / Brand Schema (Always present)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Akbarali Sottorov",
    "jobTitle": "Marketing Strategist & Tech Developer",
    "description": "Brand strategy consultant and student researcher in Tashkent specializing in choice architecture, behavioral economics, and interactive technologies.",
    "url": "https://alisot.uz",
    "knowsAbout": [
      "Brand Strategy",
      "Behavioral Economics",
      "Choice Architecture",
      "Frontend Development",
      "AI Workflows"
    ],
    "sameAs": [
      "https://t.me/akbaralisottorov",
      "https://instagram.com/akbaralisottorov",
      "https://linkedin.com/in/akbaralisottorov"
    ]
  });

  // 3. Breadcrumb Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((b, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": b.name,
        "item": b.item.startsWith("http") ? b.item : `https://alisot.uz${b.item}`
      }))
    });
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={finalCanonicalUrl} />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" title="Akbarali Blog RSS Feed" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
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
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
