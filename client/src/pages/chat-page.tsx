import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

export default function ChatPage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="font-semibold cursor-pointer">Asthma Assistant</span>
          </Link>
          <div className="flex items-center gap-4">
            <span>{user?.username}</span>
            <button
              onClick={() => logoutMutation.mutate()}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow">
            <iframe
              src="https://healthcare-bot-aoqlcrr2zufq6.azurewebsites.net/"
              className="w-full h-[600px] rounded-lg"
              title="Healthcare Bot"
            />
          </div>
        </div>
      </main>
    </div>
  );
}