import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, SendIcon, LogOut } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Message } from "@shared/schema";
import { Link } from "wouter";

export default function ChatPage() {
  const { user, logoutMutation } = useAuth();
  const [message, setMessage] = useState("");

  const { data: messages, isLoading: isLoadingMessages } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const chatMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest("POST", "/api/chat", {
        content,
        isBot: false,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    chatMutation.mutate(message);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-semibold cursor-pointer">AsthmaAI Assistant</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Logged in as {user?.username}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => logoutMutation.mutate()}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="h-[600px] overflow-y-auto mb-4 space-y-4">
            {isLoadingMessages ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : messages?.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                Start a conversation about your asthma concerns
              </div>
            ) : (
              messages?.map((msg) => (
                <Card
                  key={msg.id}
                  className={`p-4 ${
                    msg.isBot
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs opacity-70 block mt-2">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </Card>
              ))
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={chatMutation.isPending}
            />
            <Button
              type="submit"
              disabled={chatMutation.isPending || !message.trim()}
            >
              {chatMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendIcon className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
