import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Activity, MessageCircle, Stethoscope as StethoscopeIcon } from "lucide-react";

export default function EducationPage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-semibold cursor-pointer flex items-center gap-2">
              <StethoscopeIcon className="h-6 w-6 text-primary" />
              AsthmaAI Assistant
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/chat">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat Assistant
              </Button>
            </Link>
            <Link href="/symptoms">
              <Button variant="outline" className="gap-2">
                <Activity className="h-4 w-4" />
                Symptom Tracker
              </Button>
            </Link>
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Asthma Management Guide</h1>

          {/* Emergency Section */}
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700">Emergency Warning Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-red-700">
                <li>• Severe difficulty breathing or shortness of breath</li>
                <li>• Chest pain or pressure</li>
                <li>• Difficulty talking or walking</li>
                <li>• Blue lips or fingernails</li>
                <li>• Quick-relief inhaler not helping</li>
                <li className="font-bold mt-4">
                  If you experience these symptoms, seek emergency medical care immediately
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Daily Management */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Daily Asthma Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Medication Tips</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Take controller medications as prescribed</li>
                    <li>• Keep rescue inhaler readily available</li>
                    <li>• Learn proper inhaler technique</li>
                    <li>• Track medication usage</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Common Triggers</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Allergens (pollen, dust, mold)</li>
                    <li>• Air pollution and smoke</li>
                    <li>• Exercise and physical activity</li>
                    <li>• Weather changes</li>
                    <li>• Respiratory infections</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Prompt */}
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Have Questions?</h3>
            <p className="text-muted-foreground mb-4">
              Our AI assistant can provide more detailed information about asthma management
              and answer your specific questions.
            </p>
            <Link href="/chat">
              <Button className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat with AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}