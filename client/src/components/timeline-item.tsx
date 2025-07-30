import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import type { StoryWithDetails } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, MoreHorizontal, Play, Download, FileImage, Video, Music } from "lucide-react";

interface TimelineItemProps {
  story: StoryWithDetails;
  isLast: boolean;
}

export default function TimelineItem({ story, isLast }: TimelineItemProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);

  const likeMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", `/api/stories/${story.id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stories"] });
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
        description: "Failed to update like",
        variant: "destructive",
      });
    },
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const getMediaIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <FileImage size={16} />;
    if (mimeType.startsWith('video/')) return <Video size={16} />;
    if (mimeType.startsWith('audio/')) return <Music size={16} />;
    return <FileImage size={16} />;
  };

  const getMediaTypeLabel = (mediaFiles: typeof story.mediaFiles) => {
    const hasImages = mediaFiles.some(f => f.mimeType.startsWith('image/'));
    const hasVideos = mediaFiles.some(f => f.mimeType.startsWith('video/'));
    const hasAudio = mediaFiles.some(f => f.mimeType.startsWith('audio/'));

    if (hasVideos) return { icon: <Video size={16} />, label: `${mediaFiles.length} Video${mediaFiles.length > 1 ? 's' : ''}` };
    if (hasAudio) return { icon: <Music size={16} />, label: 'Audio' };
    if (hasImages) return { icon: <FileImage size={16} />, label: `${mediaFiles.length} Photo${mediaFiles.length > 1 ? 's' : ''}` };
    return null;
  };

  const mediaType = getMediaTypeLabel(story.mediaFiles);

  return (
    <div className={`relative flex flex-col lg:flex-row items-start lg:items-center ${isLast ? '' : 'mb-12'}`}>
      {/* Timeline Dot */}
      <div className="hidden lg:flex absolute left-6 w-6 h-6 bg-gradient-to-br from-lavender-primary to-sky-blue rounded-full border-4 border-white shadow-xl z-10 animate-pulse-subtle"></div>
      
      {/* Story Card */}
      <div className="lg:ml-20 w-full">
        <Card className="bg-white border-light-gray shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift rounded-2xl">
          <CardContent className="p-8">
            {/* Story Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h4 className="text-2xl font-bold text-gray-dark mb-2">{story.title}</h4>
                <div className="flex items-center text-gray-medium text-sm space-x-4">
                  <span className="font-medium">{formatDate(story.eventDate.toString())}</span>
                  <span className="flex items-center">
                    <Avatar className="w-7 h-7 mr-2 border-2 border-lavender-primary">
                      <AvatarImage src={story.author.profileImageUrl || undefined} />
                      <AvatarFallback className="text-xs bg-lavender-light text-lavender-primary">
                        {getInitials(story.author.firstName || undefined, story.author.lastName || undefined)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{story.author.firstName} {story.author.lastName}</span>
                  </span>
                </div>
              </div>
              {mediaType && (
                <span className="bg-gradient-to-r from-sky-blue to-lavender-primary text-white px-4 py-2 rounded-full text-sm font-semibold mt-3 sm:mt-0 flex items-center shadow-md">
                  {mediaType.icon}
                  <span className="ml-2">{mediaType.label}</span>
                </span>
              )}
            </div>
            
            {/* Story Content */}
            <p className="text-gray-medium mb-6 leading-relaxed text-lg">
              {story.description}
            </p>
            
            {/* Media Grid */}
            {story.mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {story.mediaFiles.slice(0, 4).map((file, index) => (
                  <div key={file.id} className="relative group">
                    {file.mimeType.startsWith('image/') ? (
                      <img 
                        src={file.filePath} 
                        alt={file.originalName}
                        className="aspect-square object-cover rounded-xl cursor-pointer hover:opacity-90 transition-all duration-200 hover-lift shadow-md group-hover:shadow-lg"
                      />
                    ) : file.mimeType.startsWith('video/') ? (
                      <div className="aspect-square bg-lavender-light rounded-xl flex items-center justify-center cursor-pointer hover:bg-sky-blue-light transition-colors relative shadow-md group-hover:shadow-lg hover-lift">
                        <Video className="text-lavender-primary" size={32} />
                        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                          <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white text-lavender-primary rounded-full w-10 h-10 p-0 shadow-md">
                            <Play size={18} />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square bg-sky-blue-light rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-lavender-light transition-colors shadow-md group-hover:shadow-lg hover-lift">
                        <Music className="text-sky-blue mb-2" size={28} />
                        <span className="text-xs text-sky-blue text-center px-2 truncate w-full font-medium">
                          {file.originalName}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                
                {story.mediaFiles.length > 4 && (
                  <div className="aspect-square bg-gradient-to-br from-lavender-light to-sky-blue-light rounded-xl flex items-center justify-center cursor-pointer hover:from-lavender-secondary hover:to-sky-blue transition-all hover-lift shadow-md">
                    <span className="text-lavender-primary font-bold text-sm">
                      +{story.mediaFiles.length - 4} more
                    </span>
                  </div>
                )}
              </div>
            )}
            
            {/* Story Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-light-gray">
              <div className="flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => likeMutation.mutate()}
                  disabled={likeMutation.isPending}
                  className={`flex items-center transition-all duration-200 p-0 h-auto hover-lift ${
                    story.userHasLiked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-medium hover:text-lavender-primary'
                  }`}
                >
                  <Heart 
                    size={18} 
                    className={`mr-2 ${story.userHasLiked ? 'fill-current' : ''}`} 
                  />
                  <span className="font-medium">{story.likesCount}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center text-gray-medium hover:text-sky-blue transition-all duration-200 p-0 h-auto hover-lift"
                >
                  <MessageCircle size={18} className="mr-2" />
                  <span className="font-medium">{story.commentsCount}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-gray-medium hover:text-lavender-primary transition-all duration-200 p-0 h-auto hover-lift"
                >
                  <Share2 size={18} className="mr-2" />
                  <span className="font-medium">Share</span>
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-medium hover:text-lavender-primary transition-all duration-200 p-0 h-auto hover-lift"
              >
                <MoreHorizontal size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
