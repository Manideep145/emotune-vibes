import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  const milestones = [
    {
      title: "Data Preparation & Model Setup",
      duration: "Week 1-2",
      tasks: [
        "Collect and preprocess facial emotion dataset",
        "Split into training, validation, and testing sets",
        "Collect music tracks and map genres to emotions",
        "Define TensorFlow model architecture"
      ]
    },
    {
      title: "Model Training & Music Mapping",
      duration: "Week 3-4",
      tasks: [
        "Train custom emotion detection model",
        "Perform hyperparameter tuning",
        "Evaluate model performance",
        "Develop emotion-to-music mapping logic"
      ]
    },
    {
      title: "UI Integration & Functional App",
      duration: "Week 5-6",
      tasks: [
        "Develop frontend UI components",
        "Connect emotion detection to music mapping",
        "Integrate music player functionality",
        "Conduct end-to-end flow testing"
      ]
    },
    {
      title: "Final Review & Documentation",
      duration: "Week 7-8",
      tasks: [
        "Bug fixing and optimization",
        "Security checks and validation",
        "Final UI/UX polish",
        "Prepare project documentation"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">About EmoTune</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Project Overview */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Project Overview</h2>
          <Card className="p-8 border-border">
            <p className="text-lg text-foreground/90 leading-relaxed mb-6">
              EmoTune is an innovative AI-powered application developed as part of an Infosys internship project. 
              The system leverages facial emotion detection technology to create a personalized music listening experience.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed">
              Using OpenCV for real-time face detection and a custom-trained TensorFlow model for emotion classification, 
              EmoTune identifies emotions such as happiness, sadness, anger, calmness, and neutral states. These detected 
              emotions are then intelligently mapped to specific music genres, providing users with a seamless and adaptive 
              music streaming experience.
            </p>
          </Card>
        </section>

        {/* Technology Stack */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-4 text-primary">AI & ML</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>TensorFlow - Model training and emotion classification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>OpenCV - Real-time face detection and preprocessing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>NumPy/Pandas - Data handling and analysis</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-4 text-primary">Frontend & Backend</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>React & TypeScript - Modern UI development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Python - Backend processing and model inference</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Spotify API - Music streaming integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>SQLite/Supabase - Data storage and management</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Project Milestones */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Project Milestones</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="p-6 border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-xl font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold">{milestone.title}</h3>
                      <span className="text-sm text-primary font-medium">{milestone.duration}</span>
                    </div>
                    <ul className="space-y-2">
                      {milestone.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Experience the future of emotion-aware music streaming with EmoTune
          </p>
          <Button 
            size="lg" 
            className="gradient-primary hover:opacity-90"
            onClick={() => navigate('/auth')}
          >
            Launch EmoTune
          </Button>
        </section>
      </div>
    </div>
  );
};

export default About;
