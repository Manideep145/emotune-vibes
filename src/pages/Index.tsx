import { Button } from "@/components/ui/button";
import { Music, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        
        <div className="container relative z-10 px-4 py-20 text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">Infosys Internship Project</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            EmoTune
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100">
            AI-Based Emotion-Aware Music Recommender System
          </p>
          
          <p className="text-lg text-foreground/80 mb-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Experience music that understands your emotions. Using advanced facial recognition and AI, 
            EmoTune detects your mood in real-time and recommends the perfect soundtrack for every moment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-300">
            <Button 
              size="lg" 
              className="text-lg gradient-primary hover:opacity-90 transition-opacity"
              onClick={() => navigate('/auth')}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Emotion Detection</h3>
              <p className="text-muted-foreground">
                Advanced facial recognition powered by TensorFlow identifies your emotions in real-time
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Mapping</h3>
              <p className="text-muted-foreground">
                AI algorithms map your detected emotions to curated music genres and playlists
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-6">
                <Music className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Music</h3>
              <p className="text-muted-foreground">
                Experience a seamless music player that adapts to your emotional state
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Technology Stack
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['TensorFlow', 'OpenCV', 'React', 'TypeScript', 'Python', 'Spotify API', 'SQLite', 'Supabase'].map((tech) => (
              <div 
                key={tech}
                className="p-6 rounded-xl bg-background border border-border text-center hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <p className="font-semibold">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Emotion-Aware Music?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join EmoTune and discover music that truly understands you
          </p>
          <Button 
            size="lg" 
            className="text-lg gradient-primary hover:opacity-90 transition-opacity"
            onClick={() => navigate('/auth')}
          >
            Start Listening Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
