import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SEO } from "@/shared/components/SEO";
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Linkedin, Send, Copy, Check, ChevronLeft, ChevronRight, BookOpen, List } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { useReadingProgress } from "@/shared/hooks/use-reading-progress";
import { FadeIn } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { Article } from "@/shared/types";

interface TocItem {
  text: string;
  id: string;
  tag: string;
}

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { t, langPrefix, currentLang } = useTranslation();

  const [toc, setToc] = useState<TocItem[]>([]);
  const [processedContent, setProcessedContent] = useState("");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [prevArticle, setPrevArticle] = useState<Article | null>(null);
  const [nextArticle, setNextArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  const progress = useReadingProgress(article?.title || "", "article");

  // Fetch current article
  useEffect(() => {
    setLoading(true);
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

  // Fetch all articles to compute prev/next and related
  useEffect(() => {
    fetch("/api/articles")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllArticles(data);
        }
      })
      .catch(console.log);
  }, []);

  // Process HTML for header IDs and Code block copy buttons
  useEffect(() => {
    if (!article?.content) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.content, "text/html");
    
    // Parse Headers for ToC
    const headers = doc.querySelectorAll("h2, h3");
    const tocItems: TocItem[] = [];
    headers.forEach((h, index) => {
      const text = h.textContent || "";
      const id = `header-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
      h.setAttribute("id", id);
      tocItems.push({ text, id, tag: h.tagName.toLowerCase() });
    });

    // Wrap code blocks and insert Copy helper attribute
    const pres = doc.querySelectorAll("pre");
    pres.forEach((pre, index) => {
      pre.classList.add("relative", "group", "p-4", "rounded-xl", "bg-muted/50", "border", "border-border", "my-6", "overflow-x-auto");
      const code = pre.querySelector("code");
      if (code) {
        code.classList.add("font-mono", "text-sm", "text-foreground");
      }
      
      // We will identify the pre index for our click delegation
      pre.setAttribute("data-code-index", index.toString());
    });

    setToc(tocItems);
    setProcessedContent(doc.body.innerHTML);
  }, [article]);

  // Calculate prev, next, and related articles
  useEffect(() => {
    if (!article || allArticles.length === 0) return;
    const sorted = [...allArticles].sort((a, b) => new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime());
    const currentIndex = sorted.findIndex(a => a.id === article.id);
    
    setPrevArticle(currentIndex > 0 ? sorted[currentIndex - 1] : null);
    setNextArticle(currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null);

    // Related articles: same category (excluding current)
    const related = allArticles
      .filter(a => a.id !== article.id && a.category === article.category)
      .slice(0, 2);
    setRelatedArticles(related);
  }, [article, allArticles]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Click delegation handler for code block copy buttons
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON" && target.classList.contains("copy-code-btn")) {
      const indexStr = target.getAttribute("data-code-index");
      if (indexStr !== null) {
        const index = parseInt(indexStr, 10);
        const pres = (e.currentTarget as HTMLDivElement).querySelectorAll("pre");
        const pre = pres[index];
        if (pre) {
          const text = pre.querySelector("code")?.textContent || pre.textContent || "";
          navigator.clipboard.writeText(text);
          target.textContent = "Copied!";
          target.classList.add("text-success");
          setTimeout(() => {
            target.textContent = "Copy";
            target.classList.remove("text-success");
          }, 2000);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 min-h-[50vh] flex justify-center items-center font-sans font-medium text-muted-foreground text-left">
        {t("articlePage.loading")}
      </div>
    );
  }

  if (!article) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 min-h-[50vh] flex flex-col justify-center items-center text-center">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
          {currentLang === "en" ? "Article not found" : currentLang === "ru" ? "Статья не найдена" : "Maqola topilmadi"}
        </h1>
        <Link to={`${langPrefix}/`} className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary/95 transition-all inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> {t("notfound.cta")}
        </Link>
      </div>
    );
  }

  const seoTitle = article.seoTitle || article.title;
  const seoDescription = article.seoDescription || article.excerpt;
  const url = window.location.href;

  const shareText = encodeURIComponent(article.title);
  const shareUrl = encodeURIComponent(url);

  return (
    <div className="w-full max-w-[1100px] mx-auto py-12 px-6 md:px-12 text-left selection:bg-gold/25 selection:text-foreground">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-6">
        
        {/* Left Table of Contents Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-4 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest">
              <List className="w-4 h-4 text-gold" />
              <span>{currentLang === "uz" ? "Mundarija" : currentLang === "en" ? "Contents" : "Содержание"}</span>
            </div>
            
            {toc.length > 0 ? (
              <nav className="flex flex-col gap-2.5">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`text-xs leading-normal hover:text-gold transition-colors font-medium ${
                      item.tag === "h3" ? "pl-3 text-muted-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            ) : (
              <span className="text-xs text-muted leading-relaxed">No headers found.</span>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="col-span-1 lg:col-span-3 max-w-[700px]">
          <FadeIn>
            <Link to={`${langPrefix}/#writing`} className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-gold mb-10 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("articlePage.back")}
            </Link>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted font-medium mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(article.createdAt || "").toLocaleDateString(
                    currentLang === "en" ? "en-US" : currentLang === "ru" ? "ru-RU" : "uz-UZ"
                  )}
                </span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{article.author?.name || "Akbarali Sottorov"}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {(() => {
                    const cleanText = article.content.replace(/<\/?[^>]+(>|$)/g, "");
                    const words = cleanText.trim().split(/\s+/).filter(Boolean).length;
                    const minutes = Math.ceil(words / 200);
                    return `${minutes} ${t("articlePage.readTime")}`;
                  })()}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-heading font-extrabold text-3xl sm:text-[40px] md:text-5xl leading-tight text-foreground mb-8">
              {article.title}
            </h1>

            {/* Cover Image */}
            {article.coverImage && (
              <div className="w-full rounded-[24px] overflow-hidden border border-border shadow-sm mb-10 bg-white p-2">
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  loading="lazy"
                  className="w-full h-auto max-h-[480px] object-cover rounded-[18px]" 
                />
              </div>
            )}

            {/* Article Body */}
            <div 
              className="prose dark:prose-invert max-w-full text-muted-foreground leading-relaxed text-base md:text-lg space-y-6 content-area"
              onClick={handleContentClick}
              dangerouslySetInnerHTML={{ __html: processedContent || article.content }}
            />

            {/* Share and Utilities */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-border/60 py-6 my-12">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Share2 className="w-4 h-4 text-gold" />
                <span>{currentLang === "uz" ? "Ulashish:" : currentLang === "en" ? "Share:" : "Поделиться:"}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background border border-border hover:border-gold rounded-full text-muted-foreground hover:text-gold transition-colors"
                  aria-label="Share on X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background border border-border hover:border-gold rounded-full text-muted-foreground hover:text-gold transition-colors"
                  aria-label="Share on Telegram"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background border border-border hover:border-gold rounded-full text-muted-foreground hover:text-gold transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="p-2 bg-background border border-border hover:border-gold rounded-full text-muted-foreground hover:text-gold transition-colors cursor-pointer flex items-center justify-center"
                  aria-label="Copy Page Link"
                >
                  {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Author Box */}
            <div className="bg-white dark:bg-card border border-border/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center text-center md:text-left mb-12">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-background border border-border shrink-0">
                <img 
                  src="/hero_avatar.png" 
                  alt="Akbarali Sottorov" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
                  }}
                />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">Author</span>
                <h3 className="font-heading text-lg font-bold text-foreground">Akbarali Sottorov</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Brand strategy, marketing consultant, and finance student research enthusiast. Exploring choice architecture, behavioral economics, and building interactive tech.
                </p>
              </div>
            </div>

            {/* Pagination Controls */}
            {(prevArticle || nextArticle) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-10 mb-12">
                {prevArticle ? (
                  <Link 
                    to={`${langPrefix}/article/${prevArticle.slug}`}
                    className="p-5 border border-border/80 hover:border-gold/30 rounded-xl bg-white dark:bg-card flex flex-col gap-2 text-left transition-colors group"
                  >
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1">
                      <ChevronLeft className="w-3.5 h-3.5" />
                      {currentLang === "uz" ? "Oldingi maqola" : currentLang === "en" ? "Previous Post" : "Предыдущая статья"}
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-1">
                      {prevArticle.title}
                    </span>
                  </Link>
                ) : <div />}

                {nextArticle ? (
                  <Link 
                    to={`${langPrefix}/article/${nextArticle.slug}`}
                    className="p-5 border border-border/80 hover:border-gold/30 rounded-xl bg-white dark:bg-card flex flex-col gap-2 text-right transition-colors group items-end"
                  >
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1 justify-end">
                      {currentLang === "uz" ? "Keyingi maqola" : currentLang === "en" ? "Next Post" : "Следующая статья"}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-1">
                      {nextArticle.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>
            )}

            {/* Related Articles Section */}
            {relatedArticles.length > 0 && (
              <div className="border-t border-border/40 pt-10">
                <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-widest mb-6">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span>{currentLang === "uz" ? "O'xshash maqolalar" : currentLang === "en" ? "Related Articles" : "Похожие статьи"}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedArticles.map((rel) => (
                    <Link 
                      key={rel.id} 
                      to={`${langPrefix}/article/${rel.slug}`}
                      className="p-5 bg-white dark:bg-card border border-border/80 hover:border-gold/30 rounded-2xl flex flex-col gap-3 group transition-all duration-300"
                    >
                      <h4 className="font-heading text-base font-bold text-foreground group-hover:text-gold transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {rel.excerpt}
                      </p>
                      <span className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center gap-1 mt-auto pt-2">
                        Read essay <ChevronRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </FadeIn>
        </main>
      </div>
    </div>
  );
}
