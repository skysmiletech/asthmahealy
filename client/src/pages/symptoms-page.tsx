import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { insertSymptomSchema } from "@shared/schema";
import type { Symptom } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { LogOut, Plus, Loader2, Leaf, StethoscopeIcon } from "lucide-react";

export default function SymptomsPage() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const form = useForm({
    resolver: zodResolver(insertSymptomSchema),
    defaultValues: {
      severity: 1,
      description: "",
      triggers: "",
      medication_used: "",
    },
  });

  const { data: symptoms, isLoading: isLoadingSymptoms } = useQuery<Symptom[]>({
    queryKey: ["/api/symptoms"],
  });

  const symptomMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/symptoms", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/symptoms"] });
      setIsFormVisible(false);
      form.reset();
      toast({
        title: "Success",
        description: "Symptom logged successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    symptomMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-xl font-semibold cursor-pointer flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Leaf className="h-6 w-6 text-primary" />
                <StethoscopeIcon className="h-6 w-6" />
              </div>
              AsthmaAI Assistant
            </span>
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Symptom Tracker</h1>
            <Button onClick={() => setIsFormVisible(!isFormVisible)}>
              <Plus className="h-4 w-4 mr-2" />
              Log Symptom
            </Button>
          </div>

          {isFormVisible && (
            <Card className="p-6 mb-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="severity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Severity Level (1-5)</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((level) => (
                              <SelectItem key={level} value={level.toString()}>
                                {level} - {level === 1 ? "Mild" : level === 5 ? "Severe" : "Moderate"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symptoms Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your symptoms..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="triggers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Triggers (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What might have triggered these symptoms?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medication_used"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medication Used (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What medication did you take?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={symptomMutation.isPending}
                    className="w-full"
                  >
                    {symptomMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save Symptom Log"
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          )}

          <div className="space-y-4">
            {isLoadingSymptoms ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : symptoms?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No symptoms logged yet. Click "Log Symptom" to start tracking.
              </div>
            ) : (
              symptoms?.map((symptom) => (
                <Card key={symptom.id} className="p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        Severity: {symptom.severity}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(symptom.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="mb-2">{symptom.description}</p>
                  {symptom.triggers && (
                    <p className="text-sm text-muted-foreground">
                      Triggers: {symptom.triggers}
                    </p>
                  )}
                  {symptom.medication_used && (
                    <p className="text-sm text-muted-foreground">
                      Medication: {symptom.medication_used}
                    </p>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}