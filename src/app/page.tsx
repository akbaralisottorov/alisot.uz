import { useState } from "react";
import { SEO } from "@/shared/components/SEO";
import Hero from "@/widgets/hero";
import SubscribeForm from "@/features/subscribe-form/subscribe-form";
import { ContactDialog } from "@/features/contact/contact-dialog";
import { FadeIn } from "@/shared/components/animations";
import { useTranslation } from "@/shared/lib/i18n";
import { useHomeData, Article, Book } from "@/shared/hooks/use-home-data";

// Widgets
import CurrentlySection from "@/widgets/CurrentlySection";
import FeaturedArticleSection from "@/widgets/FeaturedArticleSection";
import ProjectsSection from "@/widgets/ProjectsSection";
import ReadingSection from "@/widgets/ReadingSection";
import WritingSection from "@/widgets/WritingSection";
import DigitalGardenTeaserSection from "@/widgets/DigitalGardenTeaserSection";
import BooksShelfSection from "@/widgets/BooksShelfSection";
import NowSection from "@/widgets/NowSection";
import AboutSection from "@/widgets/AboutSection";
import ContactSection from "@/widgets/ContactSection";

export default function Page() {
  const { t, currentLang, langPrefix } = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { articles, books, error } = useHomeData();

  const defaultFeaturedArticle: Article = {
    id: "default-featured-id",
    title: "Tanlov psixologiyasi: Nima uchun biz sotib olamiz?",
    slug: "psychology-of-choice",
    category: "Xulq-atvor iqtisodiyoti",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    excerpt: "Kognitiv og'ishlar, tanlov arxitekturasi va brendlar iste'molchi qarorlariga ta'sir qilish uchun 'System 1' fikrlashidan qanday foydalanishi to'g'risida ilmiy tahlil.",
    content: "",
    status: "PUBLISHED",
    featured: true,
    views: 0,
    authorId: "default-author-id",
    coverImage: "/featured_cover.png",
    readTime: "8 daqiqa",
    author: { id: "default-author-id", email: "admin@alisot.uz", name: "Akbarali Sottorov", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  };

  const featuredArticle = articles.find(a => a.featured) || articles[0] || defaultFeaturedArticle;

  const defaultReadingNow: Book = {
    id: "default-book-id",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    slug: "thinking-fast-and-slow",
    progress: 65,
    rating: 5,
    status: "READING",
    coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400",
    summary: "Inson ongining ikkita tizimi — tezkor (System 1) va chuqur (System 2) fikrlash hamda ularning qaror qabul qilishdagi roli haqida.",
    favoriteQuote: "We can be blind to the obvious, and we are also blind to our blindness.",
    lessonsLearned: "Tizim 1 tez va intuitiv, ammo tizimli xatolarga va kognitiv og'ishlarga moyil. Marketing Tizim 1 bilan bog'lanishi, lekin qarorlarni Tizim 2 tasdiqlashi lozim.",
    changedThinking: "Bu kitob meni marketingda shunchaki 'chiroyli dizayn' emas, balki foydalanuvchilarning intuitiv to'siqlarini yenguvchi 'tanlov arxitekturasi' yaratishga o'rgatdi.",
    relatedArticles: [
      { title: "Tanlov psixologiyasi maqolasi", slug: "psychology-of-choice" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const readingNowBook = books.find(b => b.status === "READING") || defaultReadingNow;

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 px-6 md:px-12 flex flex-col gap-[140px] selection:bg-gold/25 selection:text-foreground">
      <SEO title="Akbarali Sottorov - Digital Home" />

      {/* Hero Section */}
      <FadeIn>
        <Hero />
      </FadeIn>

      {/* Currently Section */}
      <CurrentlySection currentLang={currentLang} t={t} />

      {/* Featured Article Section */}
      <FeaturedArticleSection featuredArticle={featuredArticle} langPrefix={langPrefix} t={t} />

      {/* Projects Case Study Section */}
      <ProjectsSection currentLang={currentLang} t={t} />

      {/* Reading Now Bookshelf Section */}
      <ReadingSection 
        readingNowBook={readingNowBook} 
        langPrefix={langPrefix} 
        t={t} 
        currentLang={currentLang} 
      />

      {/* Writing Section */}
      <WritingSection 
        articles={articles} 
        langPrefix={langPrefix} 
        currentLang={currentLang} 
        error={error} 
      />

      {/* Digital Garden Teaser Section */}
      <DigitalGardenTeaserSection langPrefix={langPrefix} t={t} currentLang={currentLang} />

      {/* Books Shelf Section */}
      <BooksShelfSection books={books} langPrefix={langPrefix} currentLang={currentLang} t={t} />

      {/* Now Section */}
      <NowSection currentLang={currentLang} t={t} />

      {/* Newsletter Section */}
      <section id="newsletter" className="w-full">
        <FadeIn>
          <SubscribeForm />
        </FadeIn>
      </section>

      {/* About Section */}
      <AboutSection langPrefix={langPrefix} t={t} />

      {/* Contact Section */}
      <ContactSection setIsContactOpen={setIsContactOpen} t={t} />

      {/* Contact Dialog */}
      <ContactDialog isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
