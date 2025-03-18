import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, MessageCircle, StethoscopeIcon } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
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
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Personal Asthma Care Assistant
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get instant, AI-powered support for managing your asthma symptoms and understanding your treatment options.
            </p>
            <Link href={user ? "/chat" : "/auth"}>
              <Button size="lg">
                {user ? "Start Chatting" : "Get Started"}
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
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
                  <MessageCircle className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
                  <p className="text-muted-foreground">
                    Simple and intuitive chat interface for all your questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Healthcare Professionals</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <img
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
                alt="Medical Professional"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1614579093341-d1b1f97e8a75"
                alt="Healthcare Worker"
                className="rounded-lg shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1613932179258-f75a8de3058f"
                alt="Doctor"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 AsthmaAI Assistant. Not a replacement for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
}
