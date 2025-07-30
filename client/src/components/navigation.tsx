import { TreePine, History, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@shared/schema";

interface NavigationProps {
  user?: User;
}

export default function Navigation({ user }: NavigationProps) {
  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <header className="bg-white shadow-md border-b-2 border-heritage-peru">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <TreePine className="text-heritage-brown" size={32} />
            <h1 className="text-2xl font-bold text-heritage-brown">Heritage Stories</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#timeline" className="text-heritage-brown hover:text-heritage-chocolate transition-colors font-medium flex items-center">
              <History className="mr-2" size={16} />
              History
            </a>
            <a href="#stories" className="text-heritage-brown hover:text-heritage-chocolate transition-colors font-medium flex items-center">
              <BookOpen className="mr-2" size={16} />
              My Stories
            </a>
            <a href="#family" className="text-heritage-brown hover:text-heritage-chocolate transition-colors font-medium flex items-center">
              <Users className="mr-2" size={16} />
              Family
            </a>
            
            {user && (
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8 border-2 border-heritage-peru">
                  <AvatarImage src={user.profileImageUrl || undefined} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="bg-heritage-beige text-heritage-brown text-sm">
                    {getInitials(user.firstName || undefined, user.lastName || undefined)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-heritage-brown font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-heritage-burlywood text-heritage-brown hover:bg-heritage-beige"
                >
                  Logout
                </Button>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden text-heritage-brown">
            <Users size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
