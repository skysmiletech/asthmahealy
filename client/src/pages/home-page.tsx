import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Brain, 
  MessageCircle, 
  StethoscopeIcon, 
  ChevronRight,
  Users,
  Shield,
  Clock
} from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <StethoscopeIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">AsthmaAI Assistant</span>
          </div>
          <div>
            {user ? (
              <Link href="/chat">
                <Button>Go to Chat</Button>
              </Link>
            ) : (
              <Link href="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 -z-10" />
          <div className="container mx-auto text-center relative">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Your Personal Asthma Care Assistant
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Get instant, AI-powered support for managing your asthma symptoms and understanding 
                your treatment options. Available 24/7, backed by medical expertise.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href={user ? "/chat" : "/auth"}>
                  <Button size="lg" className="gap-2">
                    {user ? "Start Chatting" : "Get Started"}
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Comprehensive Asthma Management
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                  <p className="text-muted-foreground">
                    Access helpful information and guidance whenever you need it.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Brain className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
                  <p className="text-muted-foreground">
                    Advanced AI technology to provide accurate and relevant information.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Evidence-Based</h3>
                  <p className="text-muted-foreground">
                    Information backed by latest medical research and guidelines.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quick Response</h3>
                  <p className="text-muted-foreground">
                    Get instant answers to your asthma-related questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Create Account</h3>
                <p className="text-muted-foreground">
                  Sign up in seconds to access personalized asthma care assistance.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Start Chatting</h3>
                <p className="text-muted-foreground">
                  Ask questions and get immediate, accurate responses from our AI.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Better Health</h3>
                <p className="text-muted-foreground">
                  Improve your asthma management with our ongoing support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Take Control of Your Asthma Today
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of users who are managing their asthma better with AI-powered assistance.
            </p>
            <Link href={user ? "/chat" : "/auth"}>
              <Button size="lg" variant="secondary" className="gap-2">
                {user ? "Access Your Dashboard" : "Start Free"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 2024 AsthmaAI Assistant. Not a replacement for professional medical advice.</p>
          <p className="text-sm">
            Always consult with healthcare professionals for medical decisions.
          </p>
        </div>
      </footer>
    </div>
  );
}