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
    <header className="glass-effect sticky top-0 z-40 border-b border-light-gray shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <TreePine className="text-lavender-primary" size={32} />
            <h1 className="text-2xl font-bold text-gray-dark">Heritage Stories</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#timeline" className="text-gray-medium hover:text-lavender-primary transition-colors font-medium flex items-center hover-lift">
              <History className="mr-2" size={16} />
              History
            </a>
            <a href="#stories" className="text-gray-medium hover:text-lavender-primary transition-colors font-medium flex items-center hover-lift">
              <BookOpen className="mr-2" size={16} />
              My Stories
            </a>
            <a href="#family" className="text-gray-medium hover:text-lavender-primary transition-colors font-medium flex items-center hover-lift">
              <Users className="mr-2" size={16} />
              Family
            </a>
            
            {user && (
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8 border-2 border-lavender-primary hover-lift">
                  <AvatarImage src={user.profileImageUrl || undefined} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="bg-lavender-light text-lavender-primary text-sm">
                    {getInitials(user.firstName || undefined, user.lastName || undefined)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-gray-dark font-medium">
                  {user.firstName} {user.lastName}
                </span>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-light-gray text-gray-medium hover:bg-lavender-light hover:text-lavender-primary rounded-xl"
                >
                  Logout
                </Button>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden text-gray-medium hover:text-lavender-primary">
            <Users size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}
