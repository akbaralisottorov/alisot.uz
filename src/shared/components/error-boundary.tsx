import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/shared/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-6 py-12 text-center selection:bg-gold/25 selection:text-foreground">
          <div className="max-w-md w-full bg-white dark:bg-card border border-border p-8 md:p-12 rounded-[24px] shadow-sm flex flex-col items-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h1 className="font-heading text-3xl font-bold mb-4">
              Kutilmagan xatolik yuz berdi
            </h1>
            
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-8">
              Tizimni yuklashda xatolik aniqlandi. Iltimos, sahifani yangilab ko'ring yoki bosh sahifaga qayting.
            </p>

            {process.env.NODE_ENV !== "production" && this.state.error && (
              <pre className="w-full text-left p-4 bg-muted/30 border border-border rounded-xl text-xs font-mono overflow-x-auto text-red-500 max-h-40 mb-8 leading-relaxed">
                {this.state.error.toString()}
              </pre>
            )}

            <Button
              onClick={this.handleReset}
              className="bg-gold hover:bg-gold-hover text-white rounded-[16px] font-bold px-6 h-12 transition-all flex items-center justify-center gap-2 shadow-sm shadow-gold/20 cursor-pointer focus-ring"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sahifani yangilash</span>
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
