import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useReadingProgress } from "@/lib/use-reading-progress";
import { FadeIn } from "@/components/animations";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const progress = useReadingProgress(article?.title || "", "article");

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setArticle(data);
        } else {
          console.log("API Error:", data);
        }
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 min-h-[50vh] flex justify-center items-center font-sans font-medium text-muted-foreground">
        Maqola yuklanmoqda...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 min-h-[50vh] flex flex-col justify-center items-center text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-4">Maqola topilmadi</h1>
        <Link to="/" className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/95 transition-all inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  const seoTitle = article.seoTitle || article.title;
  const seoDescription = article.seoDescription || article.excerpt;
  const url = `${window.location.origin}/article/${article.slug}`;

  return (
    <div className="w-full max-w-[900px] mx-auto py-12 px-6 md:px-12 text-left selection:bg-gold/25 selection:text-foreground">
      {/* Top reading progress indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gold z-50 transition-all duration-100 ease-out" 
        style={{ width: `${progress}%` }}
      />
      
      <SEO 
        title={seoTitle}
        description={seoDescription}
        url={url}
        image={article.coverImage || undefined}
        type="article"
        publishedAt={article.createdAt}
        authorName={article.author?.name || "Akbarali Sottorov"}
      />
      
      <FadeIn>
        <Link to="/#writing" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-gold mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Barcha maqolalar
        </Link>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted font-medium mb-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(article.createdAt).toLocaleDateString("uz-UZ")}</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>Muallif: {article.author?.name || "Akbarali Sottorov"}</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-border" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {(() => {
                const cleanText = article.content.replace(/<\/?[^>]+(>|$)/g, "");
                const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
                const minutes = Math.ceil(words / 200);
                return `${minutes} daqiqa o'qish`;
              })()}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-[42px] md:text-5xl leading-tight text-foreground mb-10">
          {article.title}
        </h1>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="w-full rounded-[24px] overflow-hidden border border-border shadow-sm mb-12 bg-white p-2">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              loading="lazy"
              className="w-full h-auto max-h-[500px] object-cover rounded-[18px]" 
            />
          </div>
        )}

        {/* Content Body - restricted to max width of 650px for readability */}
        <div 
          className="prose dark:prose-invert max-w-[650px] mx-auto text-muted-foreground leading-relaxed text-base md:text-lg w-full space-y-6"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </FadeIn>
    </div>
  );
}
