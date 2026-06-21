# June 25 Peaceful Protest Portal

A web platform designed to facilitate peaceful protest organization in Kenya, providing registration, transportation support, and legal aid resources for participants.

## Features

### 🎯 Dynamic Hero Carousel
- **4 rotating banner slides** showcasing key messages
- Auto-advancing carousel (5-second intervals)
- Manual navigation with arrow buttons and dot indicators
- Smooth fade transitions with overlay effects
- Responsive call-to-action buttons on each slide
- Pause on hover functionality
- Mobile-optimized with touch-friendly controls

### 📊 Live Statistics Dashboard
- **Animated counting numbers** that tick up on page load
- **Real-time countdown timer** showing days until June 25th
- Registered participants counter with number animation
- Transport fund raised display (KSh)
- Hover effects and smooth transitions

### 1. Participant Registration
- Simple registration form for peaceful march participants
- Location-based tracking for assembly point coordination
- Auto-generated reference numbers for tracking
- SMS/Email confirmation system (backend integration required)
- Transport assistance checkbox

### 2. Transportation Support
- Detailed bus route information from 4 major regions:
  - Western Route (Kisumu → Nakuru → Nairobi)
  - Eastern Route (Meru → Embu → Nairobi)
  - Rift Valley Route (Eldoret → Nakuru → Nairobi)
  - Coast Route (Mombasa → Voi → Nairobi)
- Transport assistance request form
- M-Pesa and bank donation options with clear payment details
- Passenger capacity tracking and seat allocation

### 3. Legal Aid System
- **Emergency legal hotline**: 0800 JUSTICE (0800 587 8423)
- Three-tier urgency system (Emergency/Urgent/Planning)
- Legal aid request form with case tracking
- Comprehensive "Know Your Rights" section (Article 37)
- Partner organization contacts
- "What to do if arrested" guidelines
- Case reference number generation

### 4. Key Features & Enhancements
- **Responsive design** - works on desktop, tablet, and mobile
- **Accessibility features** - ARIA labels, keyboard navigation
- **Kenya flag color scheme** - green, red, gold theming
- **Form validation** - real-time phone number validation (Kenyan format)
- **LocalStorage persistence** - data saved in browser
- **Organizer console commands** - `getAdminStats()`, `exportRegistrations()`

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: LocalStorage (development) - Should be replaced with backend database in production
- **Styling**: Custom CSS with responsive design, animations, and transitions
- **No external dependencies** - runs entirely in the browser
- **Image support** - Hero carousel accepts JPG/PNG/WebP banners

## Installation & Setup

### Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process or dependencies required

### Production Deployment

For production use, you should:

1. **Set up a backend database** to replace localStorage:
   - Consider PostgreSQL, MySQL, or MongoDB
   - Implement proper data encryption for participant information
   - Add user authentication for organizers

2. **Implement SMS/Email notifications**:
   - Integrate with services like Africa's Talking, Twilio, or SendGrid
   - Set up automated confirmations and updates

3. **Add security measures**:
   - HTTPS/SSL certificate
   - CSRF protection
   - Rate limiting to prevent spam
   - Input sanitization and validation

4. **Backend API endpoints** needed:
   ```
   POST /api/register - Register participant
   POST /api/transport - Request transport
   POST /api/legal - Request legal aid
   GET /api/stats - Get statistics (admin only)
   POST /api/donate - Process donations
   ```

5. **Deploy to a hosting service**:
   - Netlify, Vercel (for static frontend)
   - Heroku, DigitalOcean, AWS (for full-stack with backend)

## File Structure

```
june25/
│
├── index.html          # Main HTML file
├── styles.css          # Styling and responsive design
├── script.js           # Form handling and data management
└── README.md           # This file
```

## Usage

### For Participants

1. **Register for the March**
   - Navigate to the "Register" section
   - Fill in your details
   - Receive a reference number

2. **Request Transportation**
   - Go to "Transport Support" section
   - Select your route
   - Submit request for pickup details

3. **Get Legal Aid**
   - Access "Legal Aid" section
   - Fill in urgency and details
   - Receive case reference number

### For Organizers

Access browser console and use these commands:

```javascript
// View detailed statistics
getAdminStats()

// Export all data
exportRegistrations()
```

**Note**: In production, these should be protected admin endpoints.

## Data Privacy & Security

### Current Implementation (Development)
- Data stored in browser localStorage
- No server-side storage
- Data cleared when browser cache is cleared

### Recommended for Production
1. **Encrypt all participant data** at rest and in transit
2. **Implement GDPR/data protection** compliance
3. **Minimize data collection** - only essential information
4. **Secure data deletion** policy after event
5. **Anonymous participation options** where possible
6. **No tracking or analytics** that could identify individuals

### Important Privacy Notes
- Participant phone numbers are sensitive - encrypt in database
- Legal aid requests contain confidential information - secure storage required
- Consider offering anonymous registration options
- Implement automatic data deletion 30 days post-event

## Customization

### Update Contact Information
Edit in `index.html`:
- Emergency hotline numbers
- Email addresses
- WhatsApp numbers
- Social media links

### Modify Routes
Update bus routes in the Transport Support section (`index.html` lines ~220-225)

### Change Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #1e7e34;
    --secondary-color: #d32f2f;
    --accent-color: #ffd700;
}
```

### Add Assembly Points
Update the select options in the registration form (`index.html` line ~145)

## Mobile Support

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Legal & Ethical Considerations

### This platform is designed for:
✅ Organizing peaceful, legal protests
✅ Facilitating participant safety
✅ Providing legal aid resources
✅ Coordinating logistics

### Not designed for:
❌ Surveillance or intelligence gathering on participants
❌ Sharing participant data with third parties
❌ Organizing illegal activities
❌ Inciting violence

### Constitutional Rights (Kenya)
Article 37 of the Kenyan Constitution guarantees:
- Right to peaceful assembly
- Right to demonstrate
- Right to picket
- Right to present petitions

## Support & Contact

For technical issues with the website:
- Email: tech@june25kenya.org

For protest information:
- Email: info@june25kenya.org
- WhatsApp: +254 712 345 678

## License

This project is open-source and available for peaceful protest organization purposes.

## Disclaimer

This website is a tool for organizing peaceful, legal protests. Users are responsible for complying with all local laws and regulations. The platform facilitates coordination and safety, not illegal activities.

---

**Stand together. March peacefully. Demand change.**
