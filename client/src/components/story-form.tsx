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
    <Card className="bg-white shadow-lg mb-8">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-heritage-brown mb-6 flex items-center">
          <Feather className="mr-3 text-heritage-peru" size={24} />
          Share Your Story
        </h3>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title" className="text-heritage-brown font-semibold">
                Story Title *
              </Label>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="Give your story a meaningful title"
                className="mt-2 border-heritage-burlywood focus:border-heritage-brown"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="eventDate" className="text-heritage-brown font-semibold">
                Date of Event *
              </Label>
              <Input
                id="eventDate"
                type="date"
                {...form.register("eventDate")}
                className="mt-2 border-heritage-burlywood focus:border-heritage-brown"
              />
              {form.formState.errors.eventDate && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.eventDate.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-heritage-brown font-semibold">
              Story Description *
            </Label>
            <Textarea
              id="description"
              {...form.register("description")}
              rows={6}
              placeholder="Tell your story in detail. Include names, places, and emotions that make this memory special..."
              className="mt-2 border-heritage-burlywood focus:border-heritage-brown resize-none"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
            )}
          </div>
          
          <FileUpload
            onFilesSelected={setSelectedFiles}
            selectedFiles={selectedFiles}
          />
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              type="submit" 
              disabled={createStoryMutation.isPending}
              className="bg-heritage-brown hover:bg-heritage-chocolate text-white flex-1"
            >
              {createStoryMutation.isPending ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2" size={16} />
                  Save Story
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
              className="border-heritage-burlywood text-heritage-brown hover:bg-heritage-beige flex-1"
            >
              <X className="mr-2" size={16} />
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
