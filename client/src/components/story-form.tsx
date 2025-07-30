import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import FileUpload from "@/components/ui/file-upload";
import { Feather, Save, X } from "lucide-react";

const storyFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(50, "Description must be at least 50 characters long"),
  eventDate: z.string().min(1, "Event date is required"),
});

type StoryFormData = z.infer<typeof storyFormSchema>;

interface StoryFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function StoryForm({ onSuccess, onCancel }: StoryFormProps) {
  const { toast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<StoryFormData>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      eventDate: "",
    },
  });

  const createStoryMutation = useMutation({
    mutationFn: async (data: StoryFormData) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("eventDate", data.eventDate);
      
      selectedFiles.forEach(file => {
        formData.append("media", file);
      });

      const response = await fetch("/api/stories", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`${response.status}: ${text || response.statusText}`);
      }

      return response.json();
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create story. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: StoryFormData) => {
    createStoryMutation.mutate(data);
  };

  return (
    <Card className="bg-white shadow-2xl mb-8 rounded-2xl border-light-gray animate-fade-in">
      <CardContent className="p-8">
        <h3 className="text-3xl font-bold text-gray-dark mb-8 flex items-center">
          <Feather className="mr-3 text-lavender-primary" size={28} />
          Share Your Story
        </h3>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-dark font-semibold text-sm">
                Story Title *
              </Label>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="Give your story a meaningful title"
                className={`mt-1 border-light-gray focus:border-lavender-primary focus:ring-lavender-primary rounded-xl transition-all duration-200 ${
                  form.formState.errors.title ? 'border-red-300 focus:border-red-500' : ''
                }`}
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="eventDate" className="text-gray-dark font-semibold text-sm">
                Date of Event *
              </Label>
              <Input
                id="eventDate"
                type="date"
                {...form.register("eventDate")}
                className={`mt-1 border-light-gray focus:border-lavender-primary focus:ring-lavender-primary rounded-xl transition-all duration-200 ${
                  form.formState.errors.eventDate ? 'border-red-300 focus:border-red-500' : ''
                }`}
              />
              {form.formState.errors.eventDate && (
                <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.eventDate.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-dark font-semibold text-sm">
              Story Description *
            </Label>
            <Textarea
              id="description"
              {...form.register("description")}
              rows={6}
              placeholder="Tell your story in detail. Include names, places, and emotions that make this memory special..."
              className={`mt-1 border-light-gray focus:border-lavender-primary focus:ring-lavender-primary resize-none rounded-xl transition-all duration-200 ${
                form.formState.errors.description ? 'border-red-300 focus:border-red-500' : ''
              }`}
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm mt-1 animate-fade-in">{form.formState.errors.description.message}</p>
            )}
          </div>
          
          <FileUpload
            onFilesSelected={setSelectedFiles}
            selectedFiles={selectedFiles}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-light-gray">
            <Button 
              type="submit" 
              disabled={createStoryMutation.isPending}
              className="bg-lavender-primary hover:bg-lavender-secondary text-white flex-1 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
            >
              {createStoryMutation.isPending ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving Story...
                </div>
              ) : (
                <>
                  <Save className="mr-2" size={18} />
                  Save Story
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
              className="border-light-gray text-gray-medium hover:bg-light-gray hover:text-gray-dark flex-1 py-3 rounded-xl transition-all duration-200 font-semibold"
            >
              <X className="mr-2" size={18} />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
