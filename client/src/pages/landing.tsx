import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TreePine, Users, Clock, Shield, Heart, Camera } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-heritage-beige">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-heritage-peru">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <TreePine className="text-heritage-brown text-3xl" size={32} />
              <h1 className="text-2xl font-bold text-heritage-brown">Heritage Stories</h1>
            </div>
            <Button onClick={handleLogin} className="bg-heritage-brown hover:bg-heritage-chocolate">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-heritage-brown mb-6">
            Preserve Your Family's
            <span className="block text-heritage-chocolate">Legacy Forever</span>
          </h2>
          <p className="text-xl text-heritage-brown/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Share stories, upload memories, and create a beautiful timeline of your family's heritage 
            for future generations to cherish and explore.
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-heritage-brown hover:bg-heritage-chocolate text-white px-8 py-4 text-lg font-semibold"
          >
            Start Your Family Timeline
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-heritage-cornsilk border-heritage-burlywood">
            <CardContent className="p-6 text-center">
              <Camera className="w-12 h-12 text-heritage-peru mx-auto mb-4" />
              <h3 className="text-xl font-bold text-heritage-brown mb-3">Multimedia Stories</h3>
              <p className="text-heritage-brown/70">
                Upload photos, videos, and audio recordings to bring your family stories to life.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-heritage-cornsilk border-heritage-burlywood">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-heritage-peru mx-auto mb-4" />
              <h3 className="text-xl font-bold text-heritage-brown mb-3">Timeline View</h3>
              <p className="text-heritage-brown/70">
                Organize your family history chronologically with an intuitive timeline interface.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-heritage-cornsilk border-heritage-burlywood">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-heritage-peru mx-auto mb-4" />
              <h3 className="text-xl font-bold text-heritage-brown mb-3">Collaborative</h3>
              <p className="text-heritage-brown/70">
                Invite family members to contribute their own stories and memories to the timeline.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-heritage-cornsilk border-heritage-burlywood">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 text-heritage-peru mx-auto mb-4" />
              <h3 className="text-xl font-bold text-heritage-brown mb-3">Secure Storage</h3>
              <p className="text-heritage-brown/70">
                Your precious memories are safely stored and protected with enterprise-grade security.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-heritage-cornsilk border-heritage-burlywood">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 text-heritage-peru mx-auto mb-4" />
              <h3 className="text-xl font-bold text-heritage-brown mb-3">Family Bonding</h3>
              <p className="text-heritage-brown/70">
                Strengthen family connections by sharing and discovering stories across generations.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-heritage-cornsilk border-heritage-burlywood">
            <CardContent className="p-6 text-center">
              <TreePine className="w-12 h-12 text-heritage-peru mx-auto mb-4" />
              <h3 className="text-xl font-bold text-heritage-brown mb-3">Legacy Building</h3>
              <p className="text-heritage-brown/70">
                Create a lasting digital heritage that can be passed down through generations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-heritage-cornsilk to-heritage-beige rounded-xl p-12">
          <h3 className="text-3xl font-bold text-heritage-brown mb-4">
            Ready to Begin Your Family's Story?
          </h3>
          <p className="text-lg text-heritage-brown/80 mb-6">
            Join thousands of families who are preserving their heritage with Heritage Stories.
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-heritage-brown hover:bg-heritage-chocolate text-white px-8 py-4 text-lg font-semibold"
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-heritage-brown text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <TreePine size={24} />
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
