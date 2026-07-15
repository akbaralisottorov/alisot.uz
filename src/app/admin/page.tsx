import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ArrowLeft, BarChart3, FileText, Users } from "lucide-react";
import ArticleForm from "./ArticleForm";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "analytics" | "subscribers">("analytics");
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [subQuery, setSubQuery] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();

  const isEditing = location.pathname.includes("/edit");
  const isCreating = location.pathname.includes("/new");
  
  // Verify auth session on mount
  useEffect(() => {
    fetch("/api/admin/articles")
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setCheckingAuth(false));
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/admin/articles");
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setArticles(data);
      } else {
        setErrorInfo(data?.details || data?.error || "Unknown error");
        setArticles([]);
      }
    } catch (e: any) {
      setErrorInfo(String(e));
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isEditing && !isCreating) {
      fetchArticles();
    }
  }, [isAuthenticated, isEditing, isCreating]);

  const fetchSubscribers = async () => {
    setLoadingSubs(true);
    try {
      const res = await fetch("/api/admin/subscribers");
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSubs(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === "subscribers") {
      fetchSubscribers();
    }
  }, [isAuthenticated, activeTab]);

  const handleToggleConfirm = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/subscribers/${id}/toggle-confirm`, { method: "PUT" });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      if (res.ok) {
        const updated = await res.json();
        setSubscribers(subscribers.map(sub => sub.id === id ? updated : sub));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Haqiqatan ham ushbu obunachini o'chirib tashlamoqchimisiz?")) return;
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      if (res.ok) {
        setSubscribers(subscribers.filter(sub => sub.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(subQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      setArticles(articles.filter((a: any) => a.id !== id));
    } catch (e) {
      console.error("Failed to delete", e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchArticles();
      } else {
        const data = await res.json();
        alert(data.error || "Parol noto'g'ri");
      }
    } catch (e) {
      alert("Xatolik yuz berdi");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  if (checkingAuth) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (isCreating || isEditing) {
    const articleId = isEditing ? location.pathname.split("/")[3] : null;
    const initialData = isEditing ? articles.find((a: any) => a.id === articleId) : null;
    
    if (isEditing && !initialData && !loading) {
      navigate("/admin");
      return null;
    }

    return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-card/30 border border-border/60 rounded-2xl my-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            {isEditing ? "Edit Article" : "Create New Article"}
          </h1>
        </div>
        
        {loading && isEditing ? (
          <div>Loading...</div>
        ) : (
          <ArticleForm 
            initialData={initialData} 
            onSuccess={() => navigate("/admin")} 
          />
        )}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto mt-20 p-8 bg-card/60 border border-border/60 rounded-2xl backdrop-blur-md">
        <h1 className="text-2xl font-bold font-heading mb-6 text-foreground text-center">Admin Access</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-input/50 border border-border/60 rounded-xl px-4 py-3 text-foreground"
          />
          <Button type="submit" className="w-full rounded-xl py-6 tracking-widest font-bold">L O G I N</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-6">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold font-heading mb-2">Admin Workspace</h1>
          <p className="text-muted-foreground">Manage your content and track performance.</p>
        </div>
        
        <div className="flex items-center gap-4 self-stretch md:self-auto">
          <div className="flex items-center gap-2 p-1 bg-input/50 rounded-2xl border border-border/40 backdrop-blur-sm">
            <button 
              onClick={() => setActiveTab("analytics")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'analytics' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <BarChart3 className="w-4 h-4" /> Analytics
            </button>
            <button 
              onClick={() => setActiveTab("content")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'content' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <FileText className="w-4 h-4" /> Content
            </button>
            <button 
              onClick={() => setActiveTab("subscribers")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'subscribers' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Users className="w-4 h-4" /> Subscribers
            </button>
          </div>
          <Button variant="outline" onClick={handleLogout} className="rounded-xl border-border/60 hover:bg-red-500/10 hover:text-red-400">
            Chiqish
          </Button>
        </div>
      </div>

      {activeTab === "analytics" && (
        <AnalyticsDashboard />
      )}

      {activeTab === "content" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={() => navigate("/admin/articles/new")} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> New Article
            </Button>
          </div>
          <div className="bg-card/50 border border-border/60 rounded-2xl overflow-hidden backdrop-blur-sm">
            <Table>
              <TableHeader className="bg-card/30">
                <TableRow className="border-border/40 hover:bg-card/50">
                  <TableHead className="text-muted-foreground">Title</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Featured</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {errorInfo ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="bg-red-950/20 border border-red-900/50 rounded-2xl p-4 text-red-400 text-sm inline-block">
                        Database connection error: {errorInfo}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      Loading articles...
                    </TableCell>
                  </TableRow>
                ) : articles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      No articles found. Create one!
                    </TableCell>
                  </TableRow>
                ) : (
                  articles.map((article: any) => (
                    <TableRow key={article.id} className="border-border/20 hover:bg-card/40 transition-colors">
                      <TableCell className="font-medium text-foreground py-4">
                        {article.title}
                        <div className="text-xs text-muted-foreground font-mono mt-1 w-full max-w-[200px] truncate">/{article.slug}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={article.status === 'PUBLISHED' ? 'default' : 'secondary'}
                          className={article.status === 'PUBLISHED' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-input/50 text-muted-foreground border-border/40'}>
                          {article.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {article.featured ? (
                          <Badge variant="outline" className="text-orange-400 border-orange-400/30 bg-orange-400/10">⭐ Featured</Badge>
                        ) : (
                          <span className="text-muted-foreground/30">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/articles/${article.id}/edit`)} className="hover:bg-primary/20 hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)} className="hover:bg-red-500/10 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {activeTab === "subscribers" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-heading">Obunachilar</h2>
              <p className="text-sm text-muted-foreground">Blog yangiliklariga a'zo bo'lgan foydalanuvchilar ro'yxati</p>
            </div>
            <input 
              type="text" 
              placeholder="Email bo'yicha qidirish..." 
              value={subQuery}
              onChange={(e) => setSubQuery(e.target.value)}
              className="w-full sm:w-72 bg-input/40 border border-border/60 rounded-xl px-4 py-2.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
          
          <div className="bg-card/50 border border-border/60 rounded-2xl overflow-hidden backdrop-blur-sm">
            <Table>
              <TableHeader className="bg-card/30">
                <TableRow className="border-border/40 hover:bg-card/50">
                  <TableHead className="text-muted-foreground">Email</TableHead>
                  <TableHead className="text-muted-foreground">Sana</TableHead>
                  <TableHead className="text-muted-foreground">Holati</TableHead>
                  <TableHead className="text-right text-muted-foreground">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingSubs ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      Yuklanmoqda...
                    </TableCell>
                  </TableRow>
                ) : filteredSubscribers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      Obunachilar topilmadi.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscribers.map((sub: any) => (
                    <TableRow key={sub.id} className="border-border/20 hover:bg-card/40 transition-colors">
                      <TableCell className="font-medium text-foreground py-4">
                        {sub.email}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <button onClick={() => handleToggleConfirm(sub.id)}>
                          <Badge variant={sub.confirmed ? 'default' : 'secondary'}
                            className={`cursor-pointer hover:opacity-80 transition-opacity ${sub.confirmed ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-input/50 text-muted-foreground border-border/40'}`}>
                            {sub.confirmed ? "Faol (Active)" : "Kutilmoqda (Pending)"}
                          </Badge>
                        </button>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteSubscriber(sub.id)} className="hover:bg-red-500/10 hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
