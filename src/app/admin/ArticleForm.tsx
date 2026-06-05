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
import { Save } from "lucide-react";
import RichEditor from "@/components/RichEditor";

export default function ArticleForm({ initialData, onSuccess }: { initialData?: any, onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    status: "DRAFT",
    featured: false,
    seoTitle: "",
    seoDescription: "",
    authorId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        slug: initialData.slug || "",
        excerpt: initialData.excerpt || "",
        content: initialData.content || "",
        coverImage: initialData.coverImage || "",
        status: initialData.status || "DRAFT",
        featured: initialData.featured || false,
        seoTitle: initialData.seoTitle || "",
        seoDescription: initialData.seoDescription || "",
        authorId: initialData.authorId || "",
      });
    }

    // Fetch users for the author dropdown
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (Array.isArray(data)) {
          setUsers(data);
          if (!initialData && data.length > 0) {
            setFormData(prev => ({ ...prev, authorId: data[0].id }));
          }
        } else {
          console.error("API returned error:", data);
        }
      } catch (e) {
        console.error("Failed to fetch users", e);
      }
    };
    fetchUsers();
  }, [initialData]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const url = initialData ? `/api/admin/articles/${initialData.id}` : `/api/admin/articles`;
      const method = initialData ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Failed to save");
      onSuccess();
    } catch (e) {
      console.error(e);
      alert("Error saving article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-8 pb-32">
      <div className="flex items-center justify-between bg-card/60 border border-border/60 rounded-2xl p-4 px-6 sticky top-24 z-10 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-4">
           <Select value={formData.status} onValueChange={(val) => handleSelectChange('status', val)}>
            <SelectTrigger className="w-[140px] bg-background border-border/60 h-10 rounded-xl">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm font-medium text-muted-foreground">
            {formData.status === 'PUBLISHED' ? 'Live' : 'Hidden'}
          </div>
        </div>
        
        <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-8 h-10 font-bold shadow-md shadow-primary/20">
          <Save className="w-4 h-4 mr-2" />
          {loading ? "Saving..." : initialData ? "Update" : "Publish"}
        </Button>
      </div>

      <div className="space-y-6 max-w-3xl mx-auto pt-8">
        <div>
          <input 
            type="text"
            id="title"
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            onBlur={(!initialData) ? generateSlug : undefined}
            className="w-full bg-transparent border-none text-4xl md:text-5xl font-heading font-bold text-foreground focus:ring-0 placeholder:text-muted-foreground/30 p-0 outline-none"
            placeholder="Article Title..."
            required 
          />
        </div>

        <div>
          <Textarea 
            id="excerpt"
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleChange} 
            className="w-full bg-transparent border-none text-xl md:text-2xl font-light text-muted-foreground focus:ring-0 placeholder:text-muted-foreground/40 p-0 resize-none min-h-[80px] outline-none"
            placeholder="A short subtitle or excerpt..."
          />
        </div>

        <div className="relative pt-6 border-t border-border/40 space-y-4">
          <Label className="text-foreground font-bold text-lg">Maqola matni</Label>
          <RichEditor 
            content={formData.content} 
            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))} 
            placeholder="Maqola matnini bu yerga yozing..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-16 border-t border-border/40">
        <div className="space-y-4">
          <Label className="text-foreground font-bold text-lg">Metadata Settings</Label>
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-xs text-muted-foreground">URL Slug</Label>
            <Input 
              id="slug" name="slug" value={formData.slug} onChange={handleChange} 
              className="bg-card/40 border-border/60 text-foreground font-mono text-xs rounded-xl h-10" required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="coverImage" className="text-xs text-muted-foreground font-bold">Muqova rasmi (Cover Image)</Label>
            <div className="flex flex-col gap-3">
              <input 
                id="coverImageFile" 
                type="file" 
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const uploadData = new FormData();
                  uploadData.append("file", file);
                  
                  try {
                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: uploadData
                    });
                    if (!res.ok) throw new Error("Yuklashda xatolik");
                    const data = await res.json();
                    setFormData(prev => ({ ...prev, coverImage: data.url }));
                  } catch (err) {
                    alert("Rasm yuklashda xatolik yuz berdi");
                    console.error(err);
                  }
                }}
                className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
              {formData.coverImage && (
                <div className="relative w-full max-w-[240px] aspect-[16/10] rounded-2xl overflow-hidden border border-border/60 bg-input/40">
                  <img src={formData.coverImage} alt="Cover Preview" loading="lazy" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImage: "" }))}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black transition-colors text-xs w-5 h-5 flex items-center justify-center font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="featured" checked={formData.featured} 
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: !!checked }))} 
            />
            <Label htmlFor="featured" className="text-muted-foreground cursor-pointer text-sm">Feature this article</Label>
          </div>
        </div>
        
        <div className="space-y-4">
          <Label className="text-foreground font-bold text-lg">SEO Optimization</Label>
          <div className="space-y-2">
            <Label htmlFor="seoTitle" className="text-xs text-muted-foreground">SEO Title</Label>
            <Input 
              id="seoTitle" name="seoTitle" value={formData.seoTitle} onChange={handleChange} 
              className="bg-card/40 border-border/60 text-foreground rounded-xl h-10" placeholder="Overrides title in search"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription" className="text-xs text-muted-foreground">SEO Description</Label>
            <Textarea 
              id="seoDescription" name="seoDescription" value={formData.seoDescription} onChange={handleChange} 
              className="bg-card/40 border-border/60 text-foreground h-20 text-sm rounded-xl"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
