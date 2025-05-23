# Session Ready - AI-Powered Therapy Training Platform

Session Ready is an innovative therapy training tool that helps aspiring and practicing therapists develop their client interaction skills through realistic AI-driven simulations. Powered by Google Gemini's Live API, the platform offers voice-based conversations with diverse client personas, providing a safe environment to practice therapeutic interventions before engaging with real clients.

## 🎯 Key Features

### **Interactive Client Sessions**
- **Voice-Based Interactions**: Engage in natural voice conversations with AI clients using Google's Live API
- **Text Chat Interface**: Optional chat window for text-based interactions and session transcripts
- **Real-Time Responses**: Dynamic, contextual responses that simulate authentic therapy sessions

### **Diverse Client Personas**
Nine pre-configured client scenarios, each with unique backgrounds and presenting issues:

1. **Anxious Alex** - 28-year-old graphic designer with generalized anxiety
2. **Grieving Grace** - 62-year-old retired teacher coping with spouse loss
3. **Depressed David** - 45-year-old struggling with persistent depression
4. **Stressed Sam** - 32-year-old startup founder managing work-life balance
5. **Sofia** - 15-year-old teen in foster care, resistant to therapy
6. **Malik** - 29-year-old professional with high-functioning anxiety
7. **Aiko** - 22-year-old college student navigating grief and gender identity
8. **Jordan** - 35-year-old non-binary parent working through C-PTSD
9. **Zahra** - 52-year-old experiencing empty nest syndrome and depression

### **Immersive Environment**
- **Customizable Therapy Rooms**: Choose from modern, organic, or default therapy room backgrounds
- **Visual Avatars**: Each client has a unique visual representation
- **Professional Interface**: Clean, intuitive design that simulates a real therapy setting

### **Learning Tools**
- **Practice Mode**: Safe environment to try different therapeutic approaches
- **Session Management**: Start, pause, and end sessions with ease
- **Persona Selection**: Browse and search through available client scenarios

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini Live API
- **State Management**: Zustand
- **Routing**: React Router
- **Backend**: Supabase
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key
- Supabase account (for backend features)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/session-ready.git
cd session-ready
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📱 Usage Guide

### Starting a Session
1. Navigate to the Practice page
2. Select a client persona from the available options
3. Click the play button to initiate the voice connection
4. Begin speaking to interact with the AI client

### Chat Interface
- Click the chat icon to open the text interface
- Type therapeutic interventions and questions
- View session transcript in real-time

### Session Controls
- **Microphone**: Toggle to mute/unmute your voice input
- **Chat**: Open/close the text chat interface
- **End Session**: Conclude the current session and select a new client

### Customization
- **Change Room**: Select different therapy room backgrounds
- **User Settings**: Configure your therapist profile
- **Client Selection**: Search and filter available personas

## 🏗️ Project Structure

```
session-ready/
├── components/          # React components
│   ├── console/        # Session interface components
│   ├── demo/           # Demo and practice components
│   └── landing/        # Landing page components
├── contexts/           # React contexts (LiveAPI)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configurations
│   ├── presets/        # Client persona definitions
│   └── worklets/       # Audio processing worklets
├── pages/              # Main application pages
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run type-check:watch` - Run TypeScript type checking in watch mode

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache-2.0 License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini team for the powerful AI capabilities
- All contributors who have helped shape this platform
- The therapy and counseling community for their valuable feedback

## 📞 Support

For questions, issues, or suggestions:
- Open an issue on GitHub
- Visit our Community page for discussions
- Check the Features page for detailed documentation

---

**Note**: This is a training tool and should not replace professional supervision or real clinical experience. Always follow ethical guidelines and seek appropriate supervision in your therapeutic practice.
