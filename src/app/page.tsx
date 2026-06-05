import Hero from "@/components/hero";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from "@/components/animations";
import SubscribeForm from "@/components/subscribe-form";


const SKILLS = [
  "Marketing Strategy",
  "Brand Communications",
  "Behavioral Economics",
  "Consumer Psychology",
  "Content Strategy",
  "Political Science",
  "Books & Research"
];

const DEFAULT_BOOKS = [
  {
    id: "1",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    status: "READING",
    progress: 65,
    rating: 5,
    summary: "Inson ongining ikkita tizimi — tezkor (System 1) va chuqur (System 2) fikrlash hamda ularning qaror qabul qilishdagi roli haqida."
  },
  {
    id: "2",
    title: "Influence: The Psychology of Persuasion",
    author: "Robert Cialdini",
    status: "COMPLETED",
    progress: 100,
    rating: 5,
    summary: "Odamlarga ta'sir o'tkazish va ishontirishning 6 ta asosiy psixologik tamoyili, ulardan marketingda samarali foydalanish."
  },
  {
    id: "3",
    title: "Contagious: Why Things Catch On",
    author: "Jonah Berger",
    status: "COMPLETED",
    progress: 100,
    rating: 5,
    summary: "G'oyalar va mahsulotlarning virusli tarqalishi, ijtimoiy ta'sir va odamlarning o'zaro ma'lumot ulashish sabablari."
  }
];

export default function Page() {
  const [articles, setArticles] = useState([]);
  const [books, setBooks] = useState<any[]>([]);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else if (data.error) {
          setErrorInfo(data.details || data.error);
        }
      })
      .catch(e => setErrorInfo(String(e)));

    fetch('/api/books')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBooks(data.slice(0, 3));
        }
      })
      .catch(console.error);
  }, []);

  const displayBooks = books.length > 0 ? books : DEFAULT_BOOKS;

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 auto-rows-max gap-6 w-full max-w-[1100px] mx-auto py-10 px-6">
      <SEO />
      
      <FadeIn className="md:col-span-12">
        <Hero />
      </FadeIn>
      
      {/* Soham / Skills Section */}
      <FadeIn delay={0.2} 
        id="skills" 
        className="md:col-span-4 md:row-span-3 bg-card border border-border/60 rounded-2xl p-6 md:p-8 flex flex-col justify-between group backdrop-blur-md"
      >
        <div>
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-primary mb-6 block">Soham</span>
          <StaggerContainer className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <StaggerItem key={skill}>
                <span className="inline-block px-4 py-2 bg-input/40 border border-border/40 rounded-xl text-sm text-muted-foreground transition-colors hover:border-primary">
                  {skill}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeIn>

      {/* Recent Reads / Mutolaa Section */}
      <FadeIn delay={0.3} className="md:col-span-8 bg-card border border-border/60 rounded-2xl p-6 md:p-8 flex flex-col justify-between group backdrop-blur-md">
        <div>
          <div className="flex justify-between items-center mb-6">
            <span className="font-heading text-sm font-bold uppercase tracking-widest text-primary block">So'nggi Mutolaalarim</span>
            <Link to="/books" className="text-xs font-bold text-primary opacity-80 hover:opacity-100 uppercase tracking-widest transition-opacity">Kutubxona &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayBooks.map((book: any, index: number) => (
              <HoverCard key={book.id || index} className="h-full bg-input/20 border border-border/40 p-5 rounded-2xl flex flex-col justify-between group/card hover:border-primary/50 transition-all duration-300">
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      {book.status === "READING" ? "Mutolaa" : "Tugatilgan"}
                    </span>
                    {book.rating && <span className="text-amber-400 text-xs">★ {book.rating}/5</span>}
                  </div>
                  <h3 className="font-heading font-bold text-sm text-foreground group-hover/card:text-primary transition-colors line-clamp-2 mb-1">{book.title}</h3>
                  <p className="text-muted-foreground text-[11px] mb-2">{book.author}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 mb-4 flex-1">{book.summary}</p>
                </div>
                
                {book.status === "READING" && book.progress > 0 && (
                  <div className="mt-auto pt-2 border-t border-border/20">
                    <div className="flex justify-between text-[9px] text-muted-foreground mb-1">
                      <span>Jarayon</span>
                      <span>{book.progress}%</span>
                    </div>
                    <div className="w-full bg-input/40 rounded-full h-1 overflow-hidden">
                      <div className="bg-primary h-1 rounded-full" style={{ width: `${book.progress}%` }}></div>
                    </div>
                  </div>
                )}
              </HoverCard>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Blog Section */}
      <FadeIn delay={0.3}
        id="blog" 
        className="md:col-span-12 bg-card border border-border/60 rounded-2xl p-6 md:p-8 backdrop-blur-md"
      >
        <div className="flex justify-between items-center mb-6">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-primary block">So'nggi Maqolalar</span>
          <Link to="/admin" className="text-xs font-bold text-primary opacity-80 hover:opacity-100 uppercase tracking-widest transition-opacity">Admin Dashboard &rarr;</Link>
        </div>
        
        {errorInfo ? (
          <div className="bg-destructive/20 border border-destructive/50 rounded-2xl p-4 text-destructive-foreground text-sm">
            Ma'lumotlar bazasiga ulanishda xatolik: {errorInfo}
          </div>
        ) : articles.length === 0 ? (
          <p className="text-muted-foreground text-sm">Hozircha maqolalar yo'q. Admindan qo'shing.</p>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <StaggerItem key={article.id}>
                <HoverCard className="h-full bg-input/30 border border-border/40 p-6 rounded-2xl flex flex-col group hover:border-primary transition-all duration-300">
                  {article.featured && <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3">⭐ Featured</span>}
                  {article.coverImage && <img src={article.coverImage} alt={article.title} loading="lazy" className="w-full h-32 object-cover rounded-xl mb-4" />}
                  <Link to={`/article/${article.slug}`}>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{article.excerpt || article.content.substring(0, 100) + "..."}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border/40">
                    <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    <span>{article.author?.name || 'Admin'}</span>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </FadeIn>

      <FadeIn delay={0.35} className="md:col-span-12">
        <SubscribeForm />
      </FadeIn>

      <FadeIn delay={0.4}
        id="contact" 
        className="md:col-span-12 bg-primary/10 border border-primary/20 rounded-2xl p-6 md:p-8 flex items-center justify-between group"
      >
        <div>
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-2 block">Aloqa</span>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Hamkorlikka tayyorman</h2>
          <p className="text-muted-foreground text-sm">Marketing hamkorligi, brand consultancy yoki intellektual suhbat uchun</p>
        </div>
        <a 
          href="mailto:akbaraliy.phone@gmail.com" 
          className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold transition-all hover:opacity-90 flex-shrink-0 hover:scale-105 active:scale-95"
        >
          Email orqali
        </a>
      </FadeIn>
    </div>
  );
}
