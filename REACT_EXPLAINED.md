# React Explained - For Beginners

## What is React?

React is a JavaScript library for building user interfaces. Think of it like this:
- **Traditional websites**: Write HTML once, it stays the same
- **React websites**: Build components that update automatically when data changes

### Simple Analogy:
Imagine a restaurant menu board:
- **Old way**: Print new menus every time prices change
- **React way**: Use a digital board that updates automatically when you change prices in the database

---

## Core Concepts

### 1. Components (Building Blocks)

**What are Components?**
Think of components like LEGO blocks. Each piece serves a purpose and can be reused.

**Example: Button Component**
```javascript
// Old HTML way:
<button>Click Me</button>

// React component way:
function MyButton() {
  return <button>Click Me</button>;
}

// Now you can use it anywhere:
<MyButton />
<MyButton />
<MyButton />
```

**In Our Project:**
```javascript
// EmotionDisplay.tsx - Shows emotion
function EmotionDisplay({ emotion }) {
  return (
    <div>
      <p>Your emotion: {emotion}</p>
    </div>
  );
}

// MusicPlayer.tsx - Plays music
function MusicPlayer({ song }) {
  return (
    <div>
      <p>Now playing: {song}</p>
    </div>
  );
}
```

### 2. JSX (JavaScript + HTML)

**What is JSX?**
JSX lets you write HTML-like code inside JavaScript.

```javascript
// This is JSX (looks like HTML but it's JavaScript):
const element = <h1>Hello, EmoTune!</h1>;

// You can use JavaScript variables:
const name = "User";
const greeting = <h1>Hello, {name}!</h1>;

// You can use JavaScript expressions:
const emotion = "happy";
const message = <p>You are feeling {emotion}!</p>;
```

**In Our Project:**
```javascript
// Dashboard.tsx
const emotion = "happy";
return (
  <div>
    <h1>EmoTune Dashboard</h1>
    <EmotionDisplay emotion={emotion} />
    {/* JavaScript in curly braces! */}
    <p>Your mood: {emotion.toUpperCase()}</p>
  </div>
);
```

### 3. Props (Passing Data)

**What are Props?**
Props are like function arguments. You pass data from parent to child component.

```javascript
// Parent component passes data:
function Parent() {
  const userName = "John";
  return <Child name={userName} age={25} />;
}

// Child component receives data:
function Child({ name, age }) {
  return <p>{name} is {age} years old</p>;
}
// Output: "John is 25 years old"
```

**In Our Project:**
```javascript
// Dashboard.tsx (Parent)
function Dashboard() {
  const detectedEmotion = "happy";
  
  return (
    <div>
      {/* Passing emotion as prop */}
      <EmotionDisplay emotion={detectedEmotion} isActive={true} />
    </div>
  );
}

// EmotionDisplay.tsx (Child)
function EmotionDisplay({ emotion, isActive }) {
  return (
    <div>
      <p>Emotion: {emotion}</p>
      <p>Active: {isActive ? "Yes" : "No"}</p>
    </div>
  );
}
```

### 4. State (Changing Data)

**What is State?**
State is data that can change. When state changes, React automatically updates the UI.

```javascript
import { useState } from 'react';

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);
  //     ↑          ↑           ↑
  //   value   updater    initial value
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}
```

**How it Works:**
1. `useState(0)` creates a state variable starting at 0
2. `count` is the current value
3. `setCount` is the function to update it
4. When you call `setCount(5)`, React re-renders with new value

**In Our Project:**
```javascript
// Dashboard.tsx
function Dashboard() {
  // State for camera on/off
  const [cameraActive, setCameraActive] = useState(false);
  
  // State for current emotion
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  
  // State for music playing
  const [isPlaying, setIsPlaying] = useState(false);
  
  const toggleCamera = () => {
    setCameraActive(!cameraActive);  // Flip true/false
  };
  
  return (
    <div>
      <button onClick={toggleCamera}>
        {cameraActive ? 'Stop' : 'Start'} Camera
      </button>
      
      <EmotionDisplay emotion={currentEmotion} />
    </div>
  );
}
```

### 5. Effects (Side Effects)

**What is useEffect?**
Effects let you do something when the component loads or when data changes.

```javascript
import { useEffect, useState } from 'react';

function Example() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // This runs when component loads
    console.log("Component loaded!");
    
    // Fetch data from API
    fetch('api/data')
      .then(response => response.json())
      .then(data => setData(data));
      
  }, []); // Empty array = run once when component loads
  
  return <div>{data}</div>;
}
```

**Common Use Cases:**
```javascript
// 1. Run once when component loads:
useEffect(() => {
  console.log("Hello!");
}, []);

// 2. Run when specific value changes:
useEffect(() => {
  console.log("Count changed to:", count);
}, [count]);  // Runs whenever 'count' changes

// 3. Cleanup when component unmounts:
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);
  
  // Cleanup function
  return () => clearInterval(timer);
}, []);
```

**In Our Project:**
```javascript
// Dashboard.tsx
function Dashboard() {
  const [cameraActive, setCameraActive] = useState(false);
  const [emotion, setEmotion] = useState('neutral');
  
  useEffect(() => {
    if (cameraActive) {
      // Start emotion detection when camera is active
      const interval = setInterval(() => {
        // Call API to detect emotion
        fetch('http://localhost:5000/api/detect-emotion', {
          method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
          setEmotion(data.emotion);  // Update state
        });
      }, 3000);  // Every 3 seconds
      
      // Cleanup: stop interval when camera turns off
      return () => clearInterval(interval);
    }
  }, [cameraActive]);  // Run when cameraActive changes
  
  return <EmotionDisplay emotion={emotion} />;
}
```

---

## How Our App Works (Step by Step)

### File Structure:
```
src/
├── App.tsx              # Main app, sets up routing
├── pages/
│   ├── Index.tsx       # Home page
│   ├── Dashboard.tsx   # Main app
│   └── Auth.tsx        # Login page
└── components/
    ├── EmotionDisplay.tsx
    └── MusicPlayer.tsx
```

### Flow of Data:

**1. App.tsx (Router Setup)**
```javascript
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
```
**What it does:** Decides which page to show based on URL

---

**2. Index.tsx (Landing Page)**
```javascript
function Index() {
  const navigate = useNavigate();  // Hook for navigation
  
  return (
    <div>
      <h1>Welcome to EmoTune</h1>
      <button onClick={() => navigate('/dashboard')}>
        Get Started
      </button>
    </div>
  );
}
```
**What it does:** Shows welcome page, button navigates to dashboard

---

**3. Dashboard.tsx (Main App)**
```javascript
function Dashboard() {
  // State variables (data that changes)
  const [cameraActive, setCameraActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Effect: Detect emotion when camera is active
  useEffect(() => {
    if (cameraActive) {
      const interval = setInterval(async () => {
        // Call Python backend
        const response = await fetch('http://localhost:5000/api/detect-emotion', {
          method: 'POST'
        });
        const data = await response.json();
        
        // Update emotion
        setCurrentEmotion(data.emotion);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [cameraActive]);
  
  // Toggle camera function
  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    setIsPlaying(!cameraActive);
  };
  
  // Render UI
  return (
    <div>
      <button onClick={toggleCamera}>
        {cameraActive ? 'Stop' : 'Start'} Detection
      </button>
      
      {/* Pass data to child components */}
      <EmotionDisplay 
        emotion={currentEmotion} 
        isActive={cameraActive} 
      />
      
      <MusicPlayer 
        emotion={currentEmotion}
        isPlaying={isPlaying}
      />
    </div>
  );
}
```

**What happens:**
1. User clicks "Start Detection"
2. `toggleCamera()` runs
3. `setCameraActive(true)` updates state
4. React re-renders component
5. `useEffect` sees `cameraActive` changed
6. Starts interval to call API every 3 seconds
7. API returns emotion
8. `setCurrentEmotion()` updates state
9. React re-renders with new emotion
10. Child components (EmotionDisplay, MusicPlayer) update

---

**4. EmotionDisplay.tsx (Child Component)**
```javascript
function EmotionDisplay({ emotion, isActive }) {
  // Receives props from parent
  
  const emotionConfig = {
    happy: { icon: Smile, color: 'yellow' },
    sad: { icon: Frown, color: 'blue' },
    // ...
  };
  
  const config = emotionConfig[emotion];
  const Icon = config.icon;
  
  return (
    <div>
      <Icon color={config.color} />
      <h3>Current Emotion: {emotion}</h3>
      {isActive && <span>Detecting...</span>}
    </div>
  );
}
```

**What it does:** 
- Receives `emotion` and `isActive` from parent
- Shows appropriate icon and color
- Updates automatically when props change

---

**5. MusicPlayer.tsx (Child Component)**
```javascript
function MusicPlayer({ emotion, isPlaying }) {
  const [currentSong, setCurrentSong] = useState(0);
  
  const playlists = {
    happy: {
      songs: ['Happy - Pharrell', 'Good Vibrations', ...]
    },
    sad: {
      songs: ['Someone Like You - Adele', ...]
    },
    // ...
  };
  
  const playlist = playlists[emotion];
  
  return (
    <div>
      <h3>Now Playing: {playlist.songs[currentSong]}</h3>
      <button onClick={() => setCurrentSong(currentSong + 1)}>
        Next Song
      </button>
    </div>
  );
}
```

**What it does:**
- Gets playlist based on emotion
- Shows songs
- Manages its own state (currentSong)

---

## Common Patterns in Our Code

### 1. Conditional Rendering
```javascript
// Show different content based on condition
{cameraActive ? (
  <p>Camera is ON</p>
) : (
  <p>Camera is OFF</p>
)}

// Or using &&
{cameraActive && <p>Camera is ON</p>}
```

### 2. List Rendering
```javascript
const songs = ['Song 1', 'Song 2', 'Song 3'];

return (
  <div>
    {songs.map((song, index) => (
      <p key={index}>{song}</p>
    ))}
  </div>
);
// Output:
// Song 1
// Song 2
// Song 3
```

### 3. Event Handling
```javascript
// onClick
<button onClick={handleClick}>Click Me</button>

// onChange
<input onChange={(e) => setValue(e.target.value)} />

// onSubmit
<form onSubmit={handleSubmit}>...</form>
```

### 4. Async/Await (API Calls)
```javascript
const fetchEmotion = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/detect-emotion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const data = await response.json();
    setEmotion(data.emotion);
    
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## Styling in React

### 1. Tailwind Classes
```javascript
<div className="p-6 rounded-xl bg-card">
  {/* p-6 = padding, rounded-xl = rounded corners, bg-card = background */}
</div>
```

### 2. Conditional Styling
```javascript
<div className={`p-4 ${isActive ? 'bg-blue-500' : 'bg-gray-500'}`}>
  {/* Background changes based on isActive */}
</div>
```

### 3. Design System (Our Approach)
```javascript
// We define colors in index.css:
:root {
  --primary: 270 70% 60%;
  --emotion-happy: 45 100% 60%;
}

// Use in components:
<div className="bg-primary">  {/* Uses --primary color */}
<div className="text-emotion-happy">  {/* Uses --emotion-happy */}
```

---

## Debugging Tips

### 1. Console Logging
```javascript
function Dashboard() {
  const [emotion, setEmotion] = useState('neutral');
  
  console.log('Current emotion:', emotion);  // Debug output
  
  return <div>...</div>;
}
```

### 2. React DevTools
- Install React DevTools browser extension
- Inspect components
- See props and state in real-time

### 3. Common Errors

**"Cannot read property of undefined"**
```javascript
// Problem:
const emotion = data.emotion;  // data might be undefined

// Solution:
const emotion = data?.emotion || 'neutral';  // Use optional chaining
```

**"Too many re-renders"**
```javascript
// Problem:
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1);  // Causes infinite loop!
  return <div>{count}</div>;
}

// Solution:
function Component() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);  // Only call in event handler
  };
  
  return (
    <div>
      {count}
      <button onClick={increment}>Increase</button>
    </div>
  );
}
```

---

## Summary

**React = Components + Props + State + Effects**

1. **Components**: Reusable pieces of UI
2. **Props**: Pass data from parent to child
3. **State**: Data that changes (triggers re-render)
4. **Effects**: Do something when data changes

**Our App Flow:**
```
User clicks button 
→ State updates 
→ React re-renders 
→ Effect runs 
→ API call 
→ State updates 
→ React re-renders 
→ UI shows new emotion
```

**Key Takeaway**: React makes UI development easier by:
- Automatically updating when data changes
- Breaking UI into reusable components
- Managing complex state simply

---

**Remember**: React is just JavaScript! Everything you see is JavaScript with a special syntax (JSX). Once you understand components, props, and state, you can build any UI!
