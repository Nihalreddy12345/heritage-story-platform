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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <TreePine size={24} />
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
