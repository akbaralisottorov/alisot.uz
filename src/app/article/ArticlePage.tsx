import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useReadingProgress } from "@/lib/use-reading-progress";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useReadingProgress(article?.title || "", "article");

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
      <div className="w-full max-w-4xl mx-auto p-6 min-h-[50vh] flex justify-center items-center">
        <div className="text-slate-400">Maqola yuklanmoqda...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 min-h-[50vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-slate-100 mb-4">Maqola topilmadi</h1>
        <Link to="/" className="text-blue-400 hover:underline">Bosh sahifaga qaytish</Link>
      </div>
    );
  }

  const seoTitle = article.seoTitle || article.title;
  const seoDescription = article.seoDescription || article.excerpt;
  const url = `${window.location.origin}/article/${article.slug}`;

  return (
    <article className="w-full max-w-4xl mx-auto p-6 md:p-10 my-8 bg-slate-900 border border-slate-800 rounded-2xl">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        url={url}
        image={article.coverImage || undefined}
        type="article"
        publishedAt={article.createdAt}
        authorName={article.author?.name || "Admin"}
      />
      
      <div className="mb-8">
        <Link to="/#blog" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-blue-400 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Barcha maqolalar
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
            {new Date(article.createdAt).toLocaleDateString()}
          </Badge>
          <span className="text-slate-500 text-sm">
            Muallif: {article.author?.name || "Admin"}
          </span>
          <span className="text-slate-500 text-sm">
            • {(() => {
              const cleanText = article.content.replace(/<\/?[^>]+(>|$)/g, "");
              const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
              const minutes = Math.ceil(words / 200);
              return `${minutes} daqiqa o'qish`;
            })()}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 leading-tight">
          {article.title}
        </h1>
        
        {article.coverImage && (
          <img 
            src={article.coverImage} 
            alt={article.title} 
            loading="lazy"
            className="w-full h-auto max-h-[400px] object-cover rounded-2xl mb-8" 
          />
        )}
      </div>
      
      <div 
        className="prose prose-invert prose-blue max-w-none text-slate-300 w-full leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
}
