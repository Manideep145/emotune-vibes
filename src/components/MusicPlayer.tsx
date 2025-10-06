import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart } from "lucide-react";
import { useState } from "react";

type Emotion = 'happy' | 'sad' | 'angry' | 'calm' | 'neutral';

interface MusicPlayerProps {
  emotion: Emotion;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const emotionPlaylists = {
  happy: {
    genre: 'Pop & Upbeat',
    songs: [
      { title: 'Happy', artist: 'Pharrell Williams', duration: '3:53' },
      { title: 'Good Vibrations', artist: 'The Beach Boys', duration: '3:36' },
      { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', duration: '3:59' }
    ]
  },
  sad: {
    genre: 'Melancholic & Blues',
    songs: [
      { title: 'Someone Like You', artist: 'Adele', duration: '4:45' },
      { title: 'The Night We Met', artist: 'Lord Huron', duration: '3:28' },
      { title: 'Skinny Love', artist: 'Bon Iver', duration: '3:58' }
    ]
  },
  angry: {
    genre: 'Rock & Metal',
    songs: [
      { title: 'Break Stuff', artist: 'Limp Bizkit', duration: '2:46' },
      { title: 'One Step Closer', artist: 'Linkin Park', duration: '2:36' },
      { title: 'Killing in the Name', artist: 'Rage Against the Machine', duration: '5:14' }
    ]
  },
  calm: {
    genre: 'Ambient & Chill',
    songs: [
      { title: 'Weightless', artist: 'Marconi Union', duration: '8:09' },
      { title: 'Clair de Lune', artist: 'Claude Debussy', duration: '5:03' },
      { title: 'Strawberry Swing', artist: 'Coldplay', duration: '4:09' }
    ]
  },
  neutral: {
    genre: 'Indie & Alternative',
    songs: [
      { title: 'Electric Feel', artist: 'MGMT', duration: '3:49' },
      { title: 'Float On', artist: 'Modest Mouse', duration: '3:28' },
      { title: 'Take Me Out', artist: 'Franz Ferdinand', duration: '3:57' }
    ]
  }
};

const MusicPlayer = ({ emotion, isPlaying, onPlayPause }: MusicPlayerProps) => {
  const [volume, setVolume] = useState([75]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const playlist = emotionPlaylists[emotion];
  const currentSong = playlist.songs[currentSongIndex];

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.songs.length);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.songs.length) % playlist.songs.length);
  };

  return (
    <div className="space-y-6">
      {/* Now Playing */}
      <Card className="p-8 border-border">
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">Now Playing: {playlist.genre}</span>
          </div>
        </div>

        {/* Album Art */}
        <div className="relative aspect-square bg-gradient-emotion rounded-2xl mb-8 overflow-hidden flex items-center justify-center">
          <div className={`absolute inset-0 ${isPlaying ? 'animate-pulse' : ''}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20" />
          </div>
          <div className="relative z-10">
            <div className="w-32 h-32 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center">
              {isPlaying ? (
                <div className="w-24 h-24 rounded-full border-4 border-primary animate-spin border-t-transparent" />
              ) : (
                <Play className="w-16 h-16 text-primary" />
              )}
            </div>
          </div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">{currentSong.title}</h3>
          <p className="text-muted-foreground">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <Slider defaultValue={[33]} max={100} step={1} className="mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1:23</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={handlePrevious}>
            <SkipBack className="w-5 h-5" />
          </Button>
          
          <Button 
            size="icon" 
            className="w-14 h-14 gradient-primary hover:opacity-90"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleNext}>
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume and Like */}
        <div className="flex items-center gap-4">
          <Volume2 className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <Slider 
            value={volume} 
            onValueChange={setVolume}
            max={100} 
            step={1} 
            className="flex-1"
          />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </Card>

      {/* Playlist */}
      <Card className="p-6 border-border">
        <h3 className="text-xl font-semibold mb-4">Queue</h3>
        <div className="space-y-3">
          {playlist.songs.map((song, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                index === currentSongIndex 
                  ? 'bg-primary/10 border border-primary/20' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => setCurrentSongIndex(index)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
                <span className="text-sm text-muted-foreground">{song.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MusicPlayer;
