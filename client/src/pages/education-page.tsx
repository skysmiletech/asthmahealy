import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LogOut,
  Activity,
  MessageCircle,
  Stethoscope,
  Wind,
  Home,
  AlertTriangle,
  Heart,
  Syringe
} from "lucide-react";

export default function EducationPage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-semibold cursor-pointer flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              AsthmaAI Assistant
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/symptoms">
              <Button variant="outline" className="gap-2">
                <Activity className="h-4 w-4" />
                Symptom Tracker
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat Assistant
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Asthma Management Guide</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive information and tips to help you manage your asthma effectively.
              Remember, this information is general guidance - always consult your healthcare
              provider for personalized advice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Emergency Action
                </CardTitle>
                <CardDescription>Know when to seek immediate help</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-red-700">
                  <li>• Severe breathing difficulty</li>
                  <li>• Blue lips or fingernails</li>
                  <li>• Unable to speak in full sentences</li>
                  <li>• Quick-relief inhaler not helping</li>
                  <li className="font-bold">Call emergency services immediately if you experience these symptoms</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-green-500" />
                  Daily Management
                </CardTitle>
                <CardDescription>Key steps for daily asthma control</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-700">
                  <li>• Take medications as prescribed</li>
                  <li>• Monitor and record symptoms</li>
                  <li>• Avoid known triggers</li>
                  <li>• Keep rescue inhaler nearby</li>
                  <li>• Follow your asthma action plan</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem value="triggers">
              <AccordionTrigger className="text-lg">
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5" />
                  Common Triggers
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Environmental</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Pollen and mold</li>
                        <li>• Dust mites</li>
                        <li>• Pet dander</li>
                        <li>• Air pollution</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Activities</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Exercise</li>
                        <li>• Cold air exposure</li>
                        <li>• Strong emotions</li>
                        <li>• Respiratory infections</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="medications">
              <AccordionTrigger className="text-lg">
                <div className="flex items-center gap-2">
                  <Syringe className="h-5 w-5" />
                  Understanding Medications
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Controller Medications</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Taken daily to prevent symptoms and reduce inflammation
                      </p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Inhaled corticosteroids</li>
                        <li>• Long-acting beta agonists</li>
                        <li>• Combination inhalers</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Quick-Relief Medications</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Used for immediate relief of symptoms
                      </p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Short-acting beta agonists</li>
                        <li>• Rescue inhalers</li>
                        <li>• Nebulizer treatments</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="lifestyle">
              <AccordionTrigger className="text-lg">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Lifestyle Management
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Home Environment</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Use air purifiers with HEPA filters</li>
                        <li>• Keep humidity levels between 30-50%</li>
                        <li>• Vacuum regularly with a HEPA vacuum</li>
                        <li>• Use allergen-proof bed covers</li>
                        <li>• Remove carpets if possible</li>
                        <li>• Keep pets out of bedrooms</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold mb-2">Daily Habits</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Monitor daily air quality reports</li>
                        <li>• Exercise in appropriate conditions</li>
                        <li>• Practice stress management techniques</li>
                        <li>• Maintain a healthy diet</li>
                        <li>• Stay hydrated</li>
                        <li>• Get enough sleep</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
            <p className="text-muted-foreground mb-4">
              Our AI assistant can provide more detailed information and answer specific
              questions about asthma management.
            </p>
            <div className="flex gap-4">
              <Link href="/chat">
                <Button className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat with AI Assistant
                </Button>
              </Link>
              <Link href="/symptoms">
                <Button variant="outline" className="gap-2">
                  <Activity className="h-4 w-4" />
                  Track Your Symptoms
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}