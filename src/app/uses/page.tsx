import React, { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Search, Laptop, Code2, PenTool } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { AnimatePresence, motion } from "motion/react";

interface UseItem {
  name: string;
  description: string;
  tags: string[];
}

interface UseCategory {
  title: string;
  icon: React.ReactNode;
  items: UseItem[];
}

const usesData: UseCategory[] = [
  {
    title: "Hardware",
    icon: <Laptop className="w-5 h-5 text-gold" />,
    items: [
      { name: "MacBook Pro 16\"", description: "M3 Max, 64GB RAM. My primary machine that handles everything from heavy rendering to local LLMs.", tags: ["laptop"] },
      { name: "iPhone 15 Pro", description: "Primary mobile device. Great for capturing quick ideas and testing mobile responsive designs.", tags: ["phone"] },
      { name: "Keychron K3 Pro", description: "Low-profile mechanical keyboard with brown switches. Easy to travel with and comfortable for long coding sessions.", tags: ["accessories"] },
      { name: "Logitech MX Master 3S", description: "The most comfortable mouse I've ever used. The horizontal scroll wheel is essential for wide codebases and timelines.", tags: ["accessories"] },
      { name: "Sony WH-1000XM5", description: "Noise-canceling headphones for deep focus work.", tags: ["accessories"] }
    ]
  },
  {
    title: "Software",
    icon: <Code2 className="w-5 h-5 text-gold" />,
    items: [
      { name: "Cursor", description: "My main IDE right now. The AI integration specifically designed for coding flows is unmatched.", tags: ["ide", "ai tools"] },
      { name: "VS Code", description: "Still keep it around for specific workflows and its vast extension ecosystem.", tags: ["ide"] },
      { name: "Notion", description: "The brain of my operations. This is where my digital garden, project plans, and daily logs live.", tags: ["productivity tools"] },
      { name: "Raycast", description: "Replaced Spotlight on Mac completely. Window management, clipboard history, and quick calculations.", tags: ["productivity tools"] },
      { name: "Arc Browser", description: "Organized by spaces and profiles. Helps me separate client work from personal projects cleanly.", tags: ["productivity tools"] },
      { name: "Claude", description: "My go-to conversational UI for complex reasoning and architectural decisions.", tags: ["ai tools"] },
      { name: "ChatGPT (Plus)", description: "Used daily for quick tasks, data formatting, and general assistance.", tags: ["ai tools"] }
    ]
  },
  {
    title: "Content Creation",
    icon: <PenTool className="w-5 h-5 text-gold" />,
    items: [
      { name: "Figma", description: "For all UI design, wireframing, and quick vector assets. I practically live in this tool.", tags: ["design tools"] },
      { name: "DaVinci Resolve", description: "My choice for video editing. Incredibly powerful and the color grading tools are industry standard.", tags: ["editing tools"] },
      { name: "Adobe Photoshop", description: "Used primarily for complex image manipulation and YouTube thumbnails.", tags: ["design tools"] },
      { name: "OBS Studio", description: "For screen recording and streaming. Lightweight and highly customizable.", tags: ["editing tools"] }
    ]
  }
];

export default function UsesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return usesData.map(category => {
      const filteredItems = category.items.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      });
      return { ...category, items: filteredItems };
    }).filter(category => category.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="w-full max-w-[1000px] mx-auto py-12 px-6 md:px-12 text-left selection:bg-gold/25 selection:text-foreground">
      <SEO title="Uses - Akbarali Sottorov" description="A curated list of the hardware and software I use to build things on the internet." />
      
      {/* Header */}
      <FadeIn className="space-y-4 mb-16">
        <h1 className="font-heading font-extrabold text-4xl md:text-[54px] leading-tight text-foreground">What I Use</h1>
        <p className="font-sans text-lg text-muted-foreground max-w-[650px] leading-relaxed mb-8">
          A frequently asked question is what gear and software I use for my daily work. 
          Here is a comprehensive, categorized list of everything I currently rely on to code, design, and create.
        </p>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <Input 
            placeholder="Search tools, hardware, categories..." 
            className="pl-12 bg-white dark:bg-card border-border hover:border-gold/40 focus-ring h-12 rounded-[16px] text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </FadeIn>

      {/* Content */}
      <div className="space-y-16">
        <AnimatePresence mode="popLayout">
          {filteredData.length > 0 ? (
            filteredData.map((category, catIdx) => (
              <motion.section 
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                layout="position"
              >
                <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
                  <div className="p-2 bg-gold/10 rounded-xl text-gold">
                    {category.icon}
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">{category.title}</h2>
                </div>
                
                <StaggerContainer className="grid md:grid-cols-2 gap-[32px]">
                  {category.items.map((item) => (
                    <StaggerItem key={item.name}>
                      <div className="h-full p-8 rounded-[24px] bg-white dark:bg-card border border-border hover:border-gold hover:-translate-y-1 hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
                        <div>
                          <h3 className="font-sans font-bold text-lg text-foreground group-hover:text-gold transition-colors mb-2">
                            {item.name}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                            {item.description}
                          </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 mt-auto">
                          {item.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-2.5 py-1 bg-background border border-border/80 rounded-lg text-xs font-medium text-muted-foreground capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </motion.section>
            ))
          ) : (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20 bg-white dark:bg-card rounded-[24px] border border-border border-dashed"
            >
              <p className="text-muted-foreground text-sm font-medium">No tools or hardware matched your search.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
