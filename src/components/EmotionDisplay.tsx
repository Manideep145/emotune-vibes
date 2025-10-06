import { Card } from "@/components/ui/card";
import { Smile, Frown, Angry, Wind, Minus } from "lucide-react";

type Emotion = 'happy' | 'sad' | 'angry' | 'calm' | 'neutral';

interface EmotionDisplayProps {
  emotion: Emotion;
  isActive: boolean;
}

const emotionConfig = {
  happy: {
    icon: Smile,
    label: 'Happy',
    description: 'Upbeat and energetic',
    color: 'emotion-happy'
  },
  sad: {
    icon: Frown,
    label: 'Sad',
    description: 'Melancholic and reflective',
    color: 'emotion-sad'
  },
  angry: {
    icon: Angry,
    label: 'Angry',
    description: 'Intense and powerful',
    color: 'emotion-angry'
  },
  calm: {
    icon: Wind,
    label: 'Calm',
    description: 'Peaceful and relaxing',
    color: 'emotion-calm'
  },
  neutral: {
    icon: Minus,
    label: 'Neutral',
    description: 'Balanced and steady',
    color: 'emotion-neutral'
  }
};

const EmotionDisplay = ({ emotion, isActive }: EmotionDisplayProps) => {
  const config = emotionConfig[emotion];
  const Icon = config.icon;

  return (
    <Card className={`p-6 border-2 transition-all duration-500 ${
      isActive ? 'border-primary scale-105' : 'border-border'
    }`}>
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 transition-all duration-500 ${
          isActive ? 'scale-110 animate-pulse' : ''
        }`}>
          <Icon className={`w-10 h-10 ${config.color}`} />
        </div>
        
        <h3 className="text-2xl font-bold mb-2">
          Current Emotion: <span className={config.color}>{config.label}</span>
        </h3>
        
        <p className="text-muted-foreground mb-4">{config.description}</p>
        
        {isActive && (
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">Active Detection</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EmotionDisplay;
