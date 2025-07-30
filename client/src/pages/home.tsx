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
  const { data: stories = [], isLoading: storiesLoading, error } = useQuery<StoryWithDetails[]>({
    queryKey: ["/api/stories"],
    retry: false,
  });

  // Handle query errors
  if (error) {
    if (isUnauthorizedError(error as Error)) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    } else {
      toast({
        title: "Error",
        description: "Failed to load stories",
        variant: "destructive",
      });
    }
  }

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
  const filteredStories = (stories || []).filter((story: StoryWithDetails) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "photos") {
      return story.mediaFiles.some((file: any) => file.mimeType.startsWith("image/"));
    }
    if (activeFilter === "videos") {
      return story.mediaFiles.some((file: any) => file.mimeType.startsWith("video/"));
    }
    if (activeFilter === "audio") {
      return story.mediaFiles.some((file: any) => file.mimeType.startsWith("audio/"));
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-primary"></div>
          <div className="text-gray-medium">Loading your family stories...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white smooth-scroll">
      <Navigation user={user as any} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <section className="bg-gradient-to-br from-lavender-light via-sky-blue-light to-soft-white rounded-2xl p-8 mb-8 shadow-xl hover-lift animate-fade-in">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-dark mb-4">
                Preserve Your Family's Legacy
              </h2>
              <p className="text-gray-medium text-lg mb-6 leading-relaxed">
                Share stories, upload memories, and create a beautiful timeline of your family's heritage for future generations to cherish.
              </p>
              <Button 
                onClick={() => setShowStoryForm(true)}
                className="bg-lavender-primary hover:bg-lavender-secondary text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
              >
                <Plus className="mr-2" size={20} />
                Add New Story
              </Button>
            </div>
            <div className="lg:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&w=500&h=400&fit=crop" 
                alt="Family gathering" 
                className="rounded-2xl shadow-lg w-full h-auto hover-lift"
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
        <section className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-dark mb-4 sm:mb-0 flex items-center">
              <Filter className="mr-3 text-sky-blue" size={24} />
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
                      ? "bg-lavender-primary text-white hover:bg-lavender-secondary rounded-xl shadow-md" 
                      : "bg-light-gray text-gray-dark border-light-gray hover:bg-lavender-light rounded-xl"
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
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-lavender-primary via-sky-blue to-lavender-secondary rounded-full hidden lg:block opacity-30"></div>
            
            {storiesLoading ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-pulse-subtle">
                    <div className="w-16 h-16 bg-lavender-light rounded-full flex items-center justify-center">
                      <Filter className="text-lavender-primary" size={32} />
                    </div>
                  </div>
                  <div className="text-gray-medium">Loading your stories...</div>
                </div>
              </div>
            ) : filteredStories.length === 0 ? (
              <div className="text-center py-16 animate-fade-in">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-lavender-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <Plus className="text-lavender-primary" size={40} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-dark mb-3">
                    {(stories || []).length === 0 
                      ? "Start Your Family Timeline"
                      : "No Stories Found"
                    }
                  </h4>
                  <p className="text-gray-medium mb-6">
                    {(stories || []).length === 0 
                      ? "Be the first to add a precious family memory to your timeline."
                      : "Try adjusting your filter to see more stories."
                    }
                  </p>
                  {(stories || []).length === 0 && (
                    <Button 
                      onClick={() => setShowStoryForm(true)}
                      className="bg-lavender-primary hover:bg-lavender-secondary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Plus className="mr-2" size={16} />
                      Add Your First Story
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-8">
                  {filteredStories.map((story: StoryWithDetails, index: number) => (
                    <div key={story.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <TimelineItem 
                        story={story} 
                        isLast={index === filteredStories.length - 1}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Load More Button (placeholder for future pagination) */}
                {filteredStories.length >= 10 && (
                  <div className="text-center mt-12">
                    <Button 
                      variant="outline"
                      className="bg-light-gray border-light-gray text-gray-dark hover:bg-lavender-light px-8 py-3 font-semibold rounded-xl hover-lift"
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
        className="fixed bottom-8 right-8 bg-lavender-primary hover:bg-lavender-secondary text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl z-50 p-0 hover-lift animate-pulse-subtle"
      >
        <Plus size={24} />
      </Button>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-dark to-lavender-primary text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Filter size={24} />
                <h3 className="text-xl font-bold">Heritage Stories</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Preserving family memories for future generations through collaborative storytelling and multimedia preservation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>✓ Multimedia Upload</li>
                <li>✓ Family Timeline</li>
                <li>✓ Collaborative Stories</li>
                <li>✓ Secure Storage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70 text-sm">
            <p>&copy; 2024 Heritage Stories. Built with love for families everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
