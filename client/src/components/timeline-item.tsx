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
      <div className="hidden lg:flex absolute left-6 w-5 h-5 bg-heritage-brown rounded-full border-4 border-white shadow-lg z-10"></div>
      
      {/* Story Card */}
      <div className="lg:ml-20 w-full">
        <Card className="bg-heritage-cornsilk border-heritage-burlywood shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            {/* Story Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h4 className="text-xl font-bold text-heritage-brown mb-1">{story.title}</h4>
                <div className="flex items-center text-heritage-brown/70 text-sm space-x-4">
                  <span>{formatDate(story.eventDate.toString())}</span>
                  <span className="flex items-center">
                    <Avatar className="w-6 h-6 mr-2 border border-heritage-peru">
                      <AvatarImage src={story.author.profileImageUrl || undefined} />
                      <AvatarFallback className="text-xs bg-heritage-beige text-heritage-brown">
                        {getInitials(story.author.firstName || undefined, story.author.lastName || undefined)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{story.author.firstName} {story.author.lastName}</span>
                  </span>
                </div>
              </div>
              {mediaType && (
                <span className="bg-heritage-peru text-white px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 flex items-center">
                  {mediaType.icon}
                  <span className="ml-1">{mediaType.label}</span>
                </span>
              )}
            </div>
            
            {/* Story Content */}
            <p className="text-heritage-brown/80 mb-4 leading-relaxed">
              {story.description}
            </p>
            
            {/* Media Grid */}
            {story.mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
                {story.mediaFiles.slice(0, 4).map((file, index) => (
                  <div key={file.id} className="relative">
                    {file.mimeType.startsWith('image/') ? (
                      <img 
                        src={file.filePath} 
                        alt={file.originalName}
                        className="aspect-square object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    ) : file.mimeType.startsWith('video/') ? (
                      <div className="aspect-square bg-heritage-beige rounded-lg flex items-center justify-center cursor-pointer hover:bg-heritage-cornsilk transition-colors relative">
                        <Video className="text-heritage-brown" size={32} />
                        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                          <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white text-heritage-brown rounded-full w-8 h-8 p-0">
                            <Play size={16} />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square bg-heritage-beige rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-heritage-cornsilk transition-colors">
                        <Music className="text-heritage-brown mb-2" size={24} />
                        <span className="text-xs text-heritage-brown text-center px-1 truncate w-full">
                          {file.originalName}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
                
                {story.mediaFiles.length > 4 && (
                  <div className="aspect-square bg-heritage-brown/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-heritage-brown/20 transition-colors">
                    <span className="text-heritage-brown font-semibold text-sm">
                      +{story.mediaFiles.length - 4} more
                    </span>
                  </div>
                )}
              </div>
            )}
            
            {/* Story Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-heritage-burlywood">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => likeMutation.mutate()}
                  disabled={likeMutation.isPending}
                  className={`flex items-center text-heritage-brown hover:text-heritage-chocolate transition-colors p-0 h-auto ${
                    story.userHasLiked ? 'text-red-500 hover:text-red-600' : ''
                  }`}
                >
                  <Heart 
                    size={16} 
                    className={`mr-1 ${story.userHasLiked ? 'fill-current' : ''}`} 
                  />
                  <span>{story.likesCount}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                  className="flex items-center text-heritage-brown hover:text-heritage-chocolate transition-colors p-0 h-auto"
                >
                  <MessageCircle size={16} className="mr-1" />
                  <span>{story.commentsCount}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-heritage-brown hover:text-heritage-chocolate transition-colors p-0 h-auto"
                >
                  <Share2 size={16} className="mr-1" />
                  Share
                </Button>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-heritage-brown/60 hover:text-heritage-brown transition-colors p-0 h-auto"
              >
                <MoreHorizontal size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
