import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, AlertCircle } from "lucide-react";
import RichEditor from "@/components/RichEditor";
import { API_ROUTES, ArticleStatus } from "@/lib/constants";

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: ArticleStatus;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  authorId: string;
}

interface ArticleFormProps {
  initialData?: Partial<ArticleFormData> & { id?: string };
  onSuccess: () => void;
}

const INITIAL_FORM: ArticleFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  status: ArticleStatus.DRAFT,
  featured: false,
  seoTitle: "",
  seoDescription: "",
  authorId: "",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ArticleForm({ initialData, onSuccess }: ArticleFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const [formData, setFormData] = useState<ArticleFormData>(() =>
    initialData
      ? {
          title: initialData.title ?? "",
          slug: initialData.slug ?? "",
          excerpt: initialData.excerpt ?? "",
          content: initialData.content ?? "",
          coverImage: initialData.coverImage ?? "",
          status: (initialData.status as ArticleStatus) ?? ArticleStatus.DRAFT,
          featured: initialData.featured ?? false,
          seoTitle: initialData.seoTitle ?? "",
          seoDescription: initialData.seoDescription ?? "",
          authorId: initialData.authorId ?? "",
        }
      : { ...INITIAL_FORM }
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title ?? "",
        slug: initialData.slug ?? "",
        excerpt: initialData.excerpt ?? "",
        content: initialData.content ?? "",
        coverImage: initialData.coverImage ?? "",
        status: (initialData.status as ArticleStatus) ?? ArticleStatus.DRAFT,
        featured: initialData.featured ?? false,
        seoTitle: initialData.seoTitle ?? "",
        seoDescription: initialData.seoDescription ?? "",
        authorId: initialData.authorId ?? "",
      });
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch(API_ROUTES.users);
        if (!res.ok) throw new Error("Foydalanuvchilarni yuklashda xatolik");
        const data = await res.json();
        if (Array.isArray(data)) {
          setUsers(data as User[]);
          if (!initialData && data.length > 0) {
            setFormData((prev) => ({ ...prev, authorId: data[0].id }));
          }
        }
      } catch (e: any) {
        console.error("Failed to fetch users:", e);
      }
    };
    fetchUsers();
  }, [initialData]);

  const handleField = (name: keyof ArticleFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleField(e.target.name as keyof ArticleFormData, e.target.value);
  };

  const generateSlug = () => {
    if (!initialData && formData.title) {
      handleField("slug", buildSlug(formData.title));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const url = initialData?.id
        ? `${API_ROUTES.admin.articles}/${initialData.id}`
        : API_ROUTES.admin.articles;
      const method = initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Maqolani saqlashda xatolik yuz berdi");
      }

      onSuccess();
    } catch (e: any) {
      setErrorMsg(e.message || "Noma'lum xatolik");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch(API_ROUTES.upload, {
        method: "POST",
        body: uploadData,
      });
      if (!res.ok) throw new Error("Rasm yuklashda xatolik");
      const data = await res.json();
      handleField("coverImage", data.url);
    } catch (err: any) {
      setErrorMsg(err.message || "Rasm yuklashda xatolik yuz berdi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-8 pb-32 text-left">
      <div className="flex items-center justify-between bg-card/60 border border-border/60 rounded-2xl p-4 px-6 sticky top-24 z-10 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4">
          <Select
            value={formData.status}
            onValueChange={(val) => handleField("status", val as ArticleStatus)}
          >
            <SelectTrigger className="w-[140px] bg-background border-border/60 h-10 rounded-xl text-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ArticleStatus.DRAFT}>Draft</SelectItem>
              <SelectItem value={ArticleStatus.PUBLISHED}>Published</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm font-medium text-muted-foreground">
            {formData.status === ArticleStatus.PUBLISHED ? "🟢 Live" : "⚪ Hidden"}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 h-10 font-bold shadow-md shadow-primary/20 cursor-pointer"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saqlanmoqda..." : initialData ? "Yangilash" : "Nashr etish"}
        </Button>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-6 max-w-3xl mx-auto pt-8">
        <div>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleTextInput}
            onBlur={generateSlug}
            className="w-full bg-transparent border-none text-4xl md:text-5xl font-heading font-bold text-foreground focus:ring-0 placeholder:text-muted-foreground/30 p-0 outline-none"
            placeholder="Maqola sarlavhasi..."
            required
          />
        </div>

        <div>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleTextInput}
            className="w-full bg-transparent border-none text-xl md:text-2xl font-light text-muted-foreground focus:ring-0 placeholder:text-muted-foreground/40 p-0 resize-none min-h-[80px] outline-none"
            placeholder="Qisqa tavsif yoki kirish matni..."
          />
        </div>

        <div className="relative pt-6 border-t border-border/40 space-y-4">
          <Label className="text-foreground font-bold text-lg">Maqola matni</Label>
          <RichEditor
            content={formData.content}
            onChange={(html) => handleField("content", html)}
            placeholder="Maqola matnini bu yerga yozing..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-16 border-t border-border/40">
        <div className="space-y-4">
          <Label className="text-foreground font-bold text-lg">Metadata</Label>
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-xs text-muted-foreground">URL Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleTextInput}
              className="bg-card/40 border-border/60 text-foreground font-mono text-xs rounded-xl h-10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImageFile" className="text-xs text-muted-foreground font-bold">Muqova rasmi</Label>
            <div className="flex flex-col gap-3">
              <input
                id="coverImageFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              {formData.coverImage && (
                <div className="relative w-full max-w-[240px] aspect-[16/10] rounded-2xl overflow-hidden border border-border/60 bg-input/40">
                  <img
                    src={formData.coverImage}
                    alt="Cover Preview"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleField("coverImage", "")}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black transition-colors text-xs w-5 h-5 flex items-center justify-center font-bold cursor-pointer"
                    aria-label="Rasmni o'chirish"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {users.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="authorId" className="text-xs text-muted-foreground">Muallif</Label>
              <Select
                value={formData.authorId}
                onValueChange={(val) => handleField("authorId", val)}
              >
                <SelectTrigger className="bg-card/40 border-border/60 rounded-xl h-10 text-foreground">
                  <SelectValue placeholder="Muallif tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name || user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleField("featured", Boolean(checked))}
            />
            <Label htmlFor="featured" className="text-muted-foreground cursor-pointer text-sm">
              Asosiy sahifada ko'rsatish (Featured)
            </Label>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-foreground font-bold text-lg">SEO Sozlamalari</Label>
          <div className="space-y-2">
            <Label htmlFor="seoTitle" className="text-xs text-muted-foreground">SEO Sarlavha</Label>
            <Input
              id="seoTitle"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleTextInput}
              className="bg-card/40 border-border/60 text-foreground rounded-xl h-10"
              placeholder="Qidiruv tizimi uchun sarlavha"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription" className="text-xs text-muted-foreground">SEO Tavsif</Label>
            <Textarea
              id="seoDescription"
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleTextInput}
              className="bg-card/40 border-border/60 text-foreground h-20 text-sm rounded-xl"
              placeholder="Qidiruv natijasida ko'rinadigan tavsif"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
