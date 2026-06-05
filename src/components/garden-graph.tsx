import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";
import { useNavigate } from "react-router-dom";

interface Node {
  id: string;
  name: string;
  val: number;
  color?: string;
  type?: string;
  url?: string;
}

interface Link {
  source: string;
  target: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

export function GardenGraph({ notes }: { notes: any[] }) {
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [themeValue, setThemeValue] = useState("dark");
  
  const [articles, setArticles] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || 
                   document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) setThemeValue("dark");

    // Fetch related content to enrich graph
    fetch("/api/articles")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setArticles(d); })
      .catch(() => {});
      
    fetch("/api/books")
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setBooks(d); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setWindowSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight || 600,
        });
      }
    };
    window.addEventListener("resize", updateSize);
    updateSize();

    setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.zoomToFit(400, 50);
      }
    }, 500);

    return () => window.removeEventListener("resize", updateSize);
  }, [notes, articles, books]);

  const data = useMemo(() => {
    const gData: GraphData = { nodes: [], links: [] };
    const tagsMap = new Map<string, string>();

    const processItem = (item: any, type: string, color: string, urlPrefix: string, activeColorMap?: (i: any) => string) => {
      gData.nodes.push({
        id: `${type}-${item.id || item.slug}`,
        name: item.title,
        val: type === 'book' ? 1.2 : 1.5,
        type: type,
        url: `${urlPrefix}/${item.slug}`,
        color: activeColorMap ? activeColorMap(item) : color,
      });

      const itemTags = item.tags ? (typeof item.tags === 'string' ? item.tags.split(",") : item.tags).map((t: string) => t.trim()).filter(Boolean) : [];
      itemTags.forEach((tag: string) => {
        const tagId = `tag-${tag.toLowerCase()}`;
        if (!tagsMap.has(tagId)) {
          tagsMap.set(tagId, tag);
          gData.nodes.push({
            id: tagId,
            name: `#${tag}`,
            val: 2,
            type: "tag",
            color: "#64748b",
          });
        }
        gData.links.push({
          source: `${type}-${item.id || item.slug}`,
          target: tagId,
        });
      });
      
      // If there are no tags, connect to a central categorical node
      if (itemTags.length === 0) {
        const catId = `cat-${type}`;
        if (!tagsMap.has(catId)) {
          tagsMap.set(catId, type);
          gData.nodes.push({
            id: catId,
            name: type.toUpperCase(),
            val: 2.5,
            type: "category",
            color: "#475569",
          });
        }
        gData.links.push({
          source: `${type}-${item.id || item.slug}`,
          target: catId,
        });
      }
    };

    // Notes
    notes.forEach((note) => {
      processItem(note, "note", "#8b5cf6", "/garden", (n) => 
        n.status === "SEEDLING" ? "#f59e0b" :
        n.status === "INCUBATOR" ? "#3b82f6" :
        n.status === "EVERGREEN" ? "#10b981" : "#8b5cf6"
      );

      // Connect note to its linkedNodes
      if (note.linkedNodes && Array.isArray(note.linkedNodes)) {
        note.linkedNodes.forEach((ln: any) => {
          gData.links.push({
            source: `note-${note.id || note.slug}`,
            target: `note-${ln.id || ln.slug}`,
          });
        });
      }
    });
    
    // Articles
    articles.forEach((article) => {
      processItem(article, "article", "#ef4444", "/article"); 
    });
    
    // Books
    books.forEach((book) => {
      processItem(book, "book", "#a855f7", "/books"); 
    });
    
    // Projects
    const projects = [
      { id: "p1", title: "E-Commerce", tags: "React,TypeScript", slug: "p1" },
      { id: "p2", title: "Task App", tags: "Node.js,MongoDB", slug: "p2" },
      { id: "p3", title: "Portfolio", tags: "React,Vite", slug: "p3" }
    ];
    projects.forEach(p => {
      processItem(p, "project", "#ec4899", "/#projects");
    });

    // Degree calculation for node sizing
    const linkCounts = new Map<string, number>();
    gData.links.forEach(link => {
      const sourceId = typeof link.source === 'object' ? (link.source as any).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as any).id : link.target;
      linkCounts.set(sourceId, (linkCounts.get(sourceId) || 0) + 1);
      linkCounts.set(targetId, (linkCounts.get(targetId) || 0) + 1);
    });

    gData.nodes.forEach(node => {
      const degree = linkCounts.get(node.id) || 0;
      const baseVal = node.type === 'tag' ? 1.5 : node.type === 'category' ? 2.0 : 1.2;
      node.val = baseVal + degree * 0.8;
    });

    return gData;
  }, [notes, articles, books]);

  const handleNodeClick = useCallback(
    (node: any) => {
      if ((node.type === "note" || node.type === "article" || node.type === "book") && node.url) {
        navigate(node.url);
      } else {
        if (fgRef.current) {
          fgRef.current.centerAt(node.x, node.y, 1000);
          fgRef.current.zoom(4, 1000);
        }
      }
    },
    [navigate]
  );

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[600px] md:h-[700px] border border-border/40 rounded-2xl overflow-hidden bg-card/30 backdrop-blur-sm relative"
    >
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 max-w-[85%] md:max-w-none text-[10px] md:text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 border border-border/40 rounded-lg backdrop-blur-md shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
          <span>Evergreen: Pishgan fikr — barqaror</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 border border-border/40 rounded-lg backdrop-blur-md shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3b82f6]"></div>
          <span>Incubator: O'sib bormoqda — regularly update</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-background/80 border border-border/40 rounded-lg backdrop-blur-md shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
          <span>Seedling: Yangi g'oya — hali rivojlanmoqda</span>
        </div>
      </div>
      
      {windowSize.width > 0 && (
        <ForceGraph2D
          ref={fgRef}
          width={windowSize.width}
          height={windowSize.height}
          graphData={data}
          nodeLabel="name"
          nodeColor="color"
          linkColor={() => themeValue === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
          onNodeClick={handleNodeClick}
          nodeRelSize={6}
          d3VelocityDecay={0.3}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const fontSize = node.type === "tag" ? 14 / globalScale : 12 / globalScale;
            ctx.font = `${fontSize}px Inter, sans-serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2);

            ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            if (node.type === "tag") {
              ctx.fillStyle = themeValue === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
              ctx.beginPath();
              ctx.roundRect?.(
                node.x - bckgDimensions[0] / 2, 
                node.y - bckgDimensions[1] / 2, 
                bckgDimensions[0], 
                bckgDimensions[1], 
                4 / globalScale
              );
              ctx.fill();
            } else {
              const radius = Math.max(3, (node.val * 2.5)) / globalScale;
              
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.color || "#ccc";
              ctx.fill();
              
              const isDark = themeValue === "dark";
              ctx.strokeStyle = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)";
              ctx.lineWidth = 1 / globalScale;
              ctx.stroke();
            }

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = node.type === "tag" 
              ? (themeValue === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)")
              : (themeValue === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)");
            
            if (node.type === "tag") {
              ctx.fillText(label, node.x, node.y);
            } else {
              const radius = Math.max(3, (node.val * 2.5)) / globalScale;
              ctx.fillText(label, node.x, node.y + radius + (4 / globalScale));
            }
          }}
        />
      )}
    </div>
  );
}
