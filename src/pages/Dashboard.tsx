import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Camera, Music, Pause, Play, SkipForward, Volume2 } from "lucide-react";
import EmotionDisplay from "@/components/EmotionDisplay";
import MusicPlayer from "@/components/MusicPlayer";
import { toast } from "sonner";

const emotions = ['happy', 'sad', 'angry', 'calm', 'neutral'] as const;
type Emotion = typeof emotions[number];

const Dashboard = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('neutral');
  const [isPlaying, setIsPlaying] = useState(false);
  const [detectionProgress, setDetectionProgress] = useState(0);

  useEffect(() => {
    if (cameraActive) {
      // Simulate emotion detection
      const interval = setInterval(() => {
        setDetectionProgress((prev) => {
          if (prev >= 100) {
            const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
            setCurrentEmotion(randomEmotion);
            return 0;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    } else {
      setDetectionProgress(0);
    }
  }, [cameraActive]);

  const toggleCamera = () => {
    if (!cameraActive) {
      toast.success("Camera activated - Emotion detection started");
      setIsPlaying(true);
    } else {
      toast.info("Camera deactivated");
      setIsPlaying(false);
    }
    setCameraActive(!cameraActive);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Music className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">EmoTune</h1>
          </div>
          <Button variant="outline" onClick={toggleCamera}>
            <Camera className="w-4 h-4 mr-2" />
            {cameraActive ? 'Stop Detection' : 'Start Detection'}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emotion Detection Section */}
          <div className="space-y-6">
            <Card className="p-6 border-border">
              <h2 className="text-2xl font-semibold mb-4">Emotion Detection</h2>
              
              {/* Camera Preview */}
              <div className="relative aspect-video bg-muted rounded-xl overflow-hidden mb-6 flex items-center justify-center">
                {cameraActive ? (
                  <div className="absolute inset-0 gradient-emotion opacity-20 animate-pulse" />
                ) : (
                  <Camera className="w-16 h-16 text-muted-foreground" />
                )}
                <div className="relative z-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    {cameraActive ? 'Detecting emotions...' : 'Camera inactive'}
                  </p>
                </div>
              </div>

              {/* Detection Progress */}
              {cameraActive && (
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Detection Progress</span>
                    <span className="text-primary font-medium">{detectionProgress}%</span>
                  </div>
                  <Progress value={detectionProgress} className="h-2" />
                </div>
              )}

              {/* Current Emotion */}
              <EmotionDisplay emotion={currentEmotion} isActive={cameraActive} />
            </Card>

            {/* Emotion Stats */}
            <Card className="p-6 border-border">
              <h3 className="text-xl font-semibold mb-4">Emotion Analysis</h3>
              <div className="space-y-3">
                {emotions.map((emotion) => (
                  <div key={emotion} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{emotion}</span>
                      <span className={`font-medium emotion-${emotion}`}>
                        {currentEmotion === emotion ? '85%' : `${Math.floor(Math.random() * 40 + 10)}%`}
                      </span>
                    </div>
                    <Progress 
                      value={currentEmotion === emotion ? 85 : Math.floor(Math.random() * 40 + 10)} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Music Player Section */}
          <div className="space-y-6">
            <MusicPlayer 
              emotion={currentEmotion} 
              isPlaying={isPlaying}
              onPlayPause={() => setIsPlaying(!isPlaying)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
