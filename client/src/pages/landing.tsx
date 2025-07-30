import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TreePine, Users, Clock, Shield, Heart, Camera } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-white via-sky-blue-light to-lavender-light smooth-scroll">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-40 border-b border-light-gray shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <TreePine className="text-lavender-primary text-3xl" size={32} />
              <h1 className="text-2xl font-bold text-gray-dark">Heritage Stories</h1>
            </div>
            <Button onClick={handleLogin} className="bg-lavender-primary hover:bg-lavender-secondary text-white px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover-lift">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl lg:text-7xl font-bold text-gray-dark mb-8 leading-tight">
            Preserve Your Family's
            <span className="block text-transparent bg-gradient-to-r from-lavender-primary to-sky-blue bg-clip-text">
              Legacy Forever
            </span>
          </h2>
          <p className="text-xl text-gray-medium mb-10 max-w-3xl mx-auto leading-relaxed">
            Share stories, upload memories, and create a beautiful timeline of your family's heritage 
            for future generations to cherish and explore.
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-gradient-to-r from-lavender-primary to-sky-blue hover:from-lavender-secondary hover:to-lavender-primary text-white px-10 py-4 text-lg font-bold shadow-xl hover:shadow-2xl rounded-2xl animate-pulse-subtle hover-lift"
          >
            Start Your Family Timeline
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="bg-white border-light-gray shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift rounded-2xl animate-slide-up">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-lavender-primary to-sky-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-dark mb-4">Multimedia Stories</h3>
              <p className="text-gray-medium leading-relaxed">
                Upload photos, videos, and audio recordings to bring your family stories to life.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-light-gray shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift rounded-2xl animate-slide-up" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-blue to-lavender-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-dark mb-4">Timeline View</h3>
              <p className="text-gray-medium leading-relaxed">
                Organize your family history chronologically with an intuitive timeline interface.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-light-gray shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift rounded-2xl animate-slide-up" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-lavender-secondary to-lavender-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-dark mb-4">Collaborative</h3>
              <p className="text-gray-medium leading-relaxed">
                Invite family members to contribute their own stories and memories to the timeline.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-light-gray shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift rounded-2xl animate-slide-up" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-blue-light to-sky-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-dark mb-4">Secure Storage</h3>
              <p className="text-gray-medium leading-relaxed">
                Your precious memories are safely stored and protected with enterprise-grade security.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-light-gray shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift rounded-2xl animate-slide-up" style={{animationDelay: '0.4s'}}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-lavender-primary to-sky-blue-light rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-dark mb-4">Family Bonding</h3>
              <p className="text-gray-medium leading-relaxed">
                Strengthen family connections by sharing and discovering stories across generations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-light-gray shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift rounded-2xl animate-slide-up" style={{animationDelay: '0.5s'}}>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-blue to-lavender-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TreePine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-dark mb-4">Legacy Building</h3>
              <p className="text-gray-medium leading-relaxed">
                Create a lasting digital heritage that can be passed down through generations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-3xl p-16 shadow-2xl border border-light-gray animate-fade-in hover-lift">
          <h3 className="text-4xl font-bold text-gray-dark mb-6">
            Ready to Begin Your Family's Story?
          </h3>
          <p className="text-xl text-gray-medium mb-8 max-w-2xl mx-auto">
            Join thousands of families who are preserving their heritage with Heritage Stories.
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-gradient-to-r from-lavender-primary to-sky-blue hover:from-lavender-secondary hover:to-lavender-primary text-white px-12 py-4 text-lg font-bold shadow-xl hover:shadow-2xl rounded-2xl animate-pulse-subtle hover-lift"
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-dark to-lavender-primary text-white py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <TreePine size={28} />
                <h3 className="text-2xl font-bold">Heritage Stories</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Preserving family memories for future generations through collaborative storytelling and multimedia preservation.
              </p>
              <p className="text-white/70 text-xs">
                Trusted by thousands of families worldwide since 2024.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Platform Features</h4>
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-center">
                  <Camera className="w-4 h-4 mr-2 text-sky-blue-light" />
                  Multimedia Upload (50MB max)
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-sky-blue-light" />
                  Interactive Family Timeline
                </li>
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-sky-blue-light" />
                  Collaborative Story Sharing
                </li>
                <li className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-sky-blue-light" />
                  Enterprise-Grade Security
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">File Support</h4>
              <div className="space-y-3 text-white/80 text-sm">
                <div>
                  <p className="font-medium mb-1">Images</p>
                  <p className="text-xs text-white/70">JPG, PNG, GIF, WebP</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Videos</p>
                  <p className="text-xs text-white/70">MP4, MOV, AVI, WebM</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Audio</p>
                  <p className="text-xs text-white/70">MP3, WAV, AAC, OGG</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg">Support & Legal</h4>
              <ul className="space-y-3 text-white/80 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Help Center & FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors hover:underline">
                    Data Export Tools
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70 text-sm mb-4 md:mb-0">
              <p>&copy; 2024 Heritage Stories. Built with love for families everywhere.</p>
              <p className="text-xs mt-1">Secure cloud storage • GDPR compliant • Family-owned business</p>
            </div>
            <div className="flex items-center space-x-4 text-white/70 text-sm">
              <span>Version 1.0</span>
              <span>•</span>
              <span>Last updated: December 2024</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
