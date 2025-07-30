import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { StoryWithDetails } from "@shared/schema";
import Navigation from "@/components/navigation";
import StoryForm from "@/components/story-form";
import TimelineItem from "@/components/timeline-item";
import { Button } from "@/components/ui/button";
import { Plus, Filter, ChevronDown } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const queryClient = useQueryClient();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
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
  }, [isAuthenticated, isLoading, toast]);

  // Fetch stories
  const { data: stories = [], isLoading: storiesLoading } = useQuery<StoryWithDetails[]>({
    queryKey: ["/api/stories"],
    retry: false,
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
        description: "Failed to load stories",
        variant: "destructive",
      });
    },
  });

  // Story creation success handler
  const handleStoryCreated = () => {
    setShowStoryForm(false);
    queryClient.invalidateQueries({ queryKey: ["/api/stories"] });
    toast({
      title: "Success",
      description: "Your story has been added to the timeline!",
    });
  };

  // Filter stories based on active filter
  const filteredStories = stories.filter(story => {
    if (activeFilter === "all") return true;
    if (activeFilter === "photos") {
      return story.mediaFiles.some(file => file.mimeType.startsWith("image/"));
    }
    if (activeFilter === "videos") {
      return story.mediaFiles.some(file => file.mimeType.startsWith("video/"));
    }
    if (activeFilter === "audio") {
      return story.mediaFiles.some(file => file.mimeType.startsWith("audio/"));
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-heritage-beige flex items-center justify-center">
        <div className="text-heritage-brown">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-heritage-beige">
      <Navigation user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <section className="bg-gradient-to-r from-heritage-cornsilk to-heritage-beige rounded-xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-heritage-brown mb-4">
                Preserve Your Family's Legacy
              </h2>
              <p className="text-heritage-brown/80 text-lg mb-6 leading-relaxed">
                Share stories, upload memories, and create a beautiful timeline of your family's heritage for future generations to cherish.
              </p>
              <Button 
                onClick={() => setShowStoryForm(true)}
                className="bg-heritage-brown hover:bg-heritage-chocolate text-white px-8 py-3 font-semibold shadow-md"
              >
                <Plus className="mr-2" size={20} />
                Add New Story
              </Button>
            </div>
            <div className="lg:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&w=500&h=400&fit=crop" 
                alt="Family gathering" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Story Creation Form */}
        {showStoryForm && (
          <StoryForm 
            onSuccess={handleStoryCreated}
            onCancel={() => setShowStoryForm(false)}
          />
        )}

        {/* Family Timeline */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h3 className="text-2xl font-bold text-heritage-brown mb-4 sm:mb-0 flex items-center">
              <Filter className="mr-3 text-heritage-peru" size={24} />
              Family Timeline
            </h3>
            
            {/* Timeline Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "All" },
                { key: "photos", label: "Photos" },
                { key: "videos", label: "Videos" },
                { key: "audio", label: "Audio" }
              ].map(filter => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.key)}
                  className={
                    activeFilter === filter.key 
                      ? "bg-heritage-brown text-white hover:bg-heritage-chocolate" 
                      : "bg-heritage-beige text-heritage-brown border-heritage-burlywood hover:bg-heritage-cornsilk"
                  }
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-heritage-burlywood hidden lg:block"></div>
            
            {storiesLoading ? (
              <div className="text-center py-8">
                <div className="text-heritage-brown">Loading stories...</div>
              </div>
            ) : filteredStories.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-heritage-brown/60 mb-4">
                  {stories.length === 0 
                    ? "No stories yet. Start by adding your first family memory!"
                    : "No stories match the selected filter."
                  }
                </div>
                {stories.length === 0 && (
                  <Button 
                    onClick={() => setShowStoryForm(true)}
                    className="bg-heritage-brown hover:bg-heritage-chocolate text-white"
                  >
                    <Plus className="mr-2" size={16} />
                    Add Your First Story
                  </Button>
                )}
              </div>
            ) : (
              <>
                {filteredStories.map((story, index) => (
                  <TimelineItem 
                    key={story.id} 
                    story={story} 
                    isLast={index === filteredStories.length - 1}
                  />
                ))}
                
                {/* Load More Button (placeholder for future pagination) */}
                {filteredStories.length >= 10 && (
                  <div className="text-center mt-8">
                    <Button 
                      variant="outline"
                      className="bg-heritage-beige border-heritage-burlywood text-heritage-brown hover:bg-heritage-cornsilk px-8 py-3 font-semibold"
                    >
                      <ChevronDown className="mr-2" size={16} />
                      Load More Stories
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <Button
        onClick={() => setShowStoryForm(true)}
        className="fixed bottom-8 right-8 bg-heritage-brown hover:bg-heritage-chocolate text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl z-50 p-0"
      >
        <Plus size={24} />
      </Button>

      {/* Footer */}
      <footer className="bg-heritage-brown text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Filter size={24} />
                <h3 className="text-xl font-bold">Heritage Stories</h3>
              </div>
              <p className="text-heritage-beige text-sm leading-relaxed">
                Preserving family memories for future generations through collaborative storytelling and multimedia preservation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-heritage-beige text-sm">
                <li>✓ Multimedia Upload</li>
                <li>✓ Family Timeline</li>
                <li>✓ Collaborative Stories</li>
                <li>✓ Secure Storage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-heritage-beige text-sm">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-heritage-chocolate mt-8 pt-8 text-center text-heritage-beige text-sm">
            <p>&copy; 2024 Heritage Stories. Built with love for families everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
