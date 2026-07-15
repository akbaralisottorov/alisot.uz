import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ArrowLeft, BarChart3, FileText, Users, Shield, RefreshCw } from "lucide-react";
import ArticleForm from "./ArticleForm";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";
import { API_ROUTES, ArticleStatus } from "@/lib/constants";

interface Article {
  id: string;
  title: string;
  slug: string;
  status: ArticleStatus;
  featured: boolean;
  createdAt: string;
  authorId: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}


export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [editArticle, setEditArticle] = useState<Article | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "analytics" | "subscribers" | "security">("analytics");
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [subQuery, setSubQuery] = useState("");
  
  // Captcha states
  const [captchaQuestion, setCaptchaQuestion] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [challengeToken, setChallengeToken] = useState("");
  const [loadingChallenge, setLoadingChallenge] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [securityLogs, setSecurityLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isEditing = location.pathname.includes("/edit");
  const isCreating = location.pathname.includes("/new");
  const editArticleId = isEditing ? location.pathname.split("/")[3] : null;
  
  const fetchChallenge = async () => {
    setLoadingChallenge(true);
    try {
      const res = await fetch(API_ROUTES.admin.challenge);
      if (res.ok) {
        const data = await res.json();
        setCaptchaQuestion(data.question);
        setChallengeToken(data.challengeToken);
      }
    } catch (e) {
      console.error("Failed to fetch captcha challenge", e);
    } finally {
      setLoadingChallenge(false);
    }
  };

  // Verify auth session on mount
  useEffect(() => {
    fetch(API_ROUTES.admin.articles)
      .then((res) => {
        const authed = res.status === 200;
        setIsAuthenticated(authed);
        if (!authed) {
          fetchChallenge();
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        fetchChallenge();
      })
      .finally(() => setCheckingAuth(false));
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch(API_ROUTES.admin.articles);
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setArticles(data as Article[]);
      } else {
        setErrorInfo(data?.details || data?.error || "Noma'lum xatolik");
      }
    } catch (e: any) {
      setErrorInfo(String(e));
    } finally {
      setLoading(false);
    }
  };

  // Fetch single article for editing (avoids race condition with list)
  useEffect(() => {
    if (!isAuthenticated || !isEditing || !editArticleId) return;
    setLoadingEdit(true);
    fetch(`${API_ROUTES.admin.articles}/${editArticleId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) navigate("/admin");
        else setEditArticle(data as Article);
      })
      .catch(() => navigate("/admin"))
      .finally(() => setLoadingEdit(false));
  }, [isAuthenticated, isEditing, editArticleId]);

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
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, captchaAnswer, challengeToken })
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchArticles();
      } else {
        const data = await res.json();
        alert(data.error || "Parol yoki kaptcha noto'g'ri");
        setCaptchaAnswer("");
        fetchChallenge();
      }
    } catch (e) {
      alert("Xatolik yuz berdi");
      fetchChallenge();
    } finally {
      setLoginLoading(false);
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

  const fetchSecurityLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch(API_ROUTES.admin.securityLogs);
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setSecurityLogs(data);
      }
    } catch (e) {
      console.error("Failed to fetch security logs", e);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === "security") {
      fetchSecurityLogs();
    }
  }, [isAuthenticated, activeTab]);

  if (checkingAuth) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (isCreating || isEditing) {
    return (
      <div className="w-full max-w-5xl mx-auto p-6 bg-card/30 border border-border/60 rounded-2xl my-8 backdrop-blur-sm text-left">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Orqaga
          </Button>
          <h1 className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
            {isEditing ? "Maqolani tahrirlash" : "Yangi maqola yaratish"}
          </h1>
        </div>
        
        {isEditing && loadingEdit ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <ArticleForm 
            initialData={isEditing ? (editArticle ?? undefined) : undefined} 
            onSuccess={() => navigate("/admin")} 
          />
        )}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto mt-20 p-8 bg-gradient-to-b from-card/80 to-card/40 border border-border/40 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden group text-left">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        <div className="flex flex-col items-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mb-4 shadow-inner relative group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-foreground tracking-tight text-center">Admin Tizimi</h1>
          <p className="text-xs text-muted-foreground mt-1 text-center">Xavfsiz va himoyalangan workspace</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5 relative z-10">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Admin paroli</label>
            <input 
              type="password" 
              placeholder="Parolni kiriting" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loginLoading}
              className="w-full bg-input/40 border border-border/40 rounded-xl px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:bg-input/60 transition-all text-sm font-medium"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Xavfsizlik testi (Kaptcha)</label>
            <div className="flex gap-2">
              <div className="flex-1 bg-input/30 border border-border/30 rounded-xl px-4 py-3 flex items-center justify-between text-foreground text-sm font-mono relative overflow-hidden">
                {loadingChallenge ? (
                  <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
                ) : (
                  <>
                    <span>Hisoblang: <strong className="text-primary text-base font-bold">{captchaQuestion}</strong> = </span>
                    <button 
                      type="button" 
                      onClick={fetchChallenge}
                      disabled={loginLoading}
                      title="Kaptchani yangilash"
                      className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-input/50 animate-fade-in"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
              <input 
                type="text" 
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="?" 
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                disabled={loginLoading}
                className="w-20 bg-input/40 border border-border/40 rounded-xl px-3 py-3.5 text-center text-foreground font-mono focus:outline-none focus:border-primary/60 focus:bg-input/60 transition-all font-bold text-base"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loginLoading || loadingChallenge} 
            className="w-full rounded-xl py-6 tracking-widest font-bold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 relative overflow-hidden mt-2"
          >
            {loginLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                TEKSHIRILMOQDA...
              </span>
            ) : (
              "K I R I S H"
            )}
          </Button>
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
            <button 
              onClick={() => setActiveTab("security")}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${activeTab === 'security' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Shield className="w-4 h-4" /> Xavfsizlik
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

      {activeTab === "security" && (
        <div className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-heading">Xavfsizlik Tizimi Jurnali</h2>
              <p className="text-sm text-muted-foreground">Admin paneliga kirish urinishlari va xavfsizlik hodisalari tarixi</p>
            </div>
            <Button variant="outline" onClick={fetchSecurityLogs} disabled={loadingLogs} className="rounded-xl border-border/60">
              <RefreshCw className={`w-4 h-4 mr-2 ${loadingLogs ? 'animate-spin' : ''}`} /> Yangilash
            </Button>
          </div>
          
          <div className="bg-card/50 border border-border/60 rounded-2xl overflow-hidden backdrop-blur-sm">
            <Table>
              <TableHeader className="bg-card/30">
                <TableRow className="border-border/40 hover:bg-card/50">
                  <TableHead className="text-muted-foreground">Sana va Vaqt</TableHead>
                  <TableHead className="text-muted-foreground">Hodisa (Event)</TableHead>
                  <TableHead className="text-muted-foreground">IP Manzil</TableHead>
                  <TableHead className="text-muted-foreground">Holati</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loadingLogs ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      Xavfsizlik loglari yuklanmoqda...
                    </TableCell>
                  </TableRow>
                ) : securityLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-muted-foreground">
                      Hech qanday urinishlar topilmadi.
                    </TableCell>
                  </TableRow>
                ) : (
                  securityLogs.map((log: any) => (
                    <TableRow key={log.id} className="border-border/20 hover:bg-card/40 transition-colors">
                      <TableCell className="font-mono text-muted-foreground text-xs py-4">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground text-sm">
                        {log.event === 'SUCCESS' ? 'Muvaffaqiyatli kirish' : 
                         log.event === 'INVALID_PASSWORD' ? 'Noto\'g\'ri parol kiritildi' : 
                         log.event === 'INVALID_CAPTCHA' ? 'Kaptcha xatosi yuz berdi' : log.event}
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground text-sm">
                        {log.ip}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={log.event === 'SUCCESS' ? 'default' : 'destructive'}
                          className={log.event === 'SUCCESS' ? 
                            'bg-green-500/10 text-green-400 border-green-500/20' : 
                            'bg-red-500/10 text-red-400 border-red-500/20'}
                        >
                          {log.event === 'SUCCESS' ? 'RUXSAT ETILDI' : 'BLOKLANDI'}
                        </Badge>
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
