# End Session Feature Documentation

## Overview

The "End Session" feature allows therapists to gracefully end their current practice session and select a different client scenario without leaving the Practice page.

## Feature Components

### 1. **End Session Button**
- **Location**: Top-right of the practice session area
- **Visibility**: Only shown when actively connected to a session
- **Design**: Lavender background with white text, matching the organic design system
- **Icon**: Logout/exit icon for visual clarity

### 2. **Session Management**
When the "End Session" button is clicked:
1. The current API connection is disconnected
2. The client selector modal reopens
3. The modal shows contextual messaging indicating a new scenario selection

### 3. **Contextual Modal Updates**
The client selector modal now adapts based on context:
- **First Visit**: "Select a Client Persona"
- **After Ending Session**: "Choose a New Scenario" with explanation text
- **Button Text**: Changes from "Continue with..." to "Start Session with..."

## User Flow

1. **Active Session**
   - User is in an active practice session with a client persona
   - "Session with [Client Name]" header shows current client
   - "End Session" button is visible

2. **Ending Session**
   - User clicks "End Session" button
   - API connection is terminated
   - Client selector modal opens automatically

3. **Selecting New Scenario**
   - Modal shows "Choose a New Scenario" heading
   - Explanation text: "Your previous session has ended. Select a new client to practice with."
   - User can search and select a different persona
   - Cancel button available to return to current (disconnected) session

4. **Starting New Session**
   - User selects new persona
   - Clicks "Start Session with [New Client]"
   - New session begins with the selected persona

## Technical Implementation

### Hook Updates
```typescript
const handleEndSession = useCallback(() => {
  // Disconnect if connected
  if (connected) {
    disconnect();
  }
  // Show client selector to choose a new scenario
  setShowClientSelector(true);
}, [connected, disconnect]);
```

### UI Components
- Motion animations for smooth transitions
- Responsive design for mobile devices
- Accessibility features (ARIA labels, keyboard navigation)

## Benefits

1. **Seamless Workflow**: No need to navigate away from the Practice page
2. **Clear Context**: Users understand they're switching scenarios
3. **Graceful Cleanup**: Properly disconnects API before switching
4. **Intuitive Design**: Follows the organic design system established in the landing page

## Future Enhancements

1. **Session Summary**: Show brief summary of completed session before switching
2. **Quick Switch**: Add favorite personas for faster selection
3. **Session History**: Track which personas have been practiced with
4. **Progress Tracking**: Show practice statistics per persona 