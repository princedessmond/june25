# Live Statistics Guide - Demo Mode

## Overview

The website now features a **realistic live statistics simulation** perfect for testing and demonstrations. The numbers animate continuously to show growing support for the June 25th protest.

---

## 🎯 Demo Mode Features

### Automatic Number Updates

**Registered Participants**
- **Range**: 2,000 - 6,000 participants
- **Starting point**: Random value between 2,000 - 4,000
- **Increments**: 1-3 new registrations every 3-8 seconds
- **Viral spikes**: 10-50 registrations at once every 20-40 seconds

**Transport Fund Raised**
- **Range**: KSh 8,000 - 12,000
- **Starting point**: Random value between KSh 8,000 - 10,000
- **Increments**: KSh 100-500 every 5-12 seconds
- **Viral spikes**: KSh 200-1,000 during registration spikes

---

## 📊 How It Works

### 1. **Initial Load**
- Page loads with random starting values in the specified ranges
- Numbers smoothly count up from 0 to starting value (2 seconds animation)
- Creates illusion of real-time data loading

### 2. **Continuous Updates**
- Numbers increment at random intervals to simulate real registrations
- Each update triggers a smooth animation (0.8 seconds)
- Numbers flash gold briefly when updated
- Realistic randomization prevents predictable patterns

### 3. **Viral Moments**
- Random spikes every 20-40 seconds simulate social media sharing
- Larger increments (10-50 people) create excitement
- Corresponding fund increases show donation activity

### 4. **Auto-Reset**
- If numbers exceed maximum (6k or 12k), they reset gracefully
- Reset to lower range to allow growth cycle to repeat
- Maintains continuous activity for long-duration demos

---

## 🛠️ Configuration

### Toggle Demo Mode

Open `script.js` and find line 8:

```javascript
const DEMO_MODE = true; // Set to false for production
```

**Demo Mode ON (`true`):**
- Uses simulated live statistics
- Perfect for testing, presentations, and demonstrations
- Shows realistic growing numbers

**Demo Mode OFF (`false`):**
- Uses actual data from localStorage
- Real registration and donation tracking
- Production-ready behavior

---

## 🎨 Visual Effects

### Number Animation
- **Smooth counting**: Numbers increment smoothly using easing
- **Flash effect**: Numbers glow gold when updated
- **Pulse animation**: Optional scale effect on update

### Color Indicators
- **Gold (#ffd700)**: Flash color when number changes
- **Smooth transitions**: 0.3s color fade
- **Attention-grabbing**: Draws eye to live activity

---

## 📈 Statistics Behavior

### Realistic Patterns

**Steady Growth**
```
2,345 → 2,347 → 2,349 → 2,351 (every 3-8 seconds)
```

**Viral Spike**
```
2,351 → 2,397 (sudden +46 from social media share)
```

**Fund Growth**
```
KSh 8,450 → KSh 8,750 → KSh 9,100 (every 5-12 seconds)
```

**Coordinated Spike**
```
Participants: 3,200 → 3,245
Funds: KSh 9,100 → KSh 9,850
(Spike happens together to show correlation)
```

---

## 🚀 Use Cases

### 1. **Website Demo**
- Show potential organizers what the live site will look like
- Demonstrate engagement and growing support
- Create sense of urgency and momentum

### 2. **Presentations**
- Display on projector during meetings
- Show stakeholders the platform capabilities
- Generate excitement about the protest

### 3. **Testing**
- Test how the site handles different numbers
- Verify formatting (thousands separators, KSh symbol)
- Check responsive behavior with varying digit counts

### 4. **Social Media**
- Record screen capture of live numbers
- Share screenshots showing activity
- Create promotional videos

---

## 💡 Customization Options

### Change Number Ranges

Edit `script.js` around line 141:

```javascript
// Current settings
liveRegistrationCount = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000; // 2000-4000
liveFundAmount = Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000; // 8000-10000
```

**Example: Higher starting values**
```javascript
liveRegistrationCount = Math.floor(Math.random() * (6000 - 5000 + 1)) + 5000; // 5000-6000
liveFundAmount = Math.floor(Math.random() * (15000 - 12000 + 1)) + 12000; // 12000-15000
```

### Adjust Update Frequency

**Make updates faster** (more exciting):
```javascript
// Line 162: Change 3000-8000ms to 1000-3000ms
}, Math.random() * (3000 - 1000) + 1000);
```

**Make updates slower** (more realistic):
```javascript
// Line 162: Change 3000-8000ms to 10000-20000ms
}, Math.random() * (20000 - 10000) + 10000);
```

### Change Increment Sizes

**Smaller increments** (slower growth):
```javascript
// Line 153: Change 1-3 to 1-2
const increment = Math.floor(Math.random() * 2) + 1;
```

**Larger increments** (faster growth):
```javascript
// Line 153: Change 1-3 to 3-8
const increment = Math.floor(Math.random() * 6) + 3;
```

---

## 🔄 Production Mode

When ready to go live, switch to production mode:

### Step 1: Disable Demo Mode
```javascript
const DEMO_MODE = false; // Turn off simulation
```

### Step 2: Connect Backend
The site will now use:
- Real registration data from forms
- Actual donation amounts
- Live participant counts

### Step 3: Backend Integration
Connect to your database API to fetch real-time stats:

```javascript
// Example API integration
async function updateRealStats() {
    const response = await fetch('/api/stats');
    const data = await response.json();

    updateLiveStat('registeredCount', data.participants);
    updateLiveStat('fundedAmount', data.funds, true);
}

// Update every 5 seconds
setInterval(updateRealStats, 5000);
```

---

## 📱 Mobile Performance

The live stats work perfectly on mobile:
- **Efficient animations**: Uses requestAnimationFrame
- **No lag**: Optimized update logic
- **Battery-friendly**: Minimal CPU usage
- **Touch-responsive**: Stats still hover-reactive

---

## 🎭 Demo Scenarios

### Scenario 1: Launch Day
```javascript
// Start high to show momentum
liveRegistrationCount = 3500;
liveFundAmount = 9500;
```

### Scenario 2: Early Campaign
```javascript
// Start low to show growth potential
liveRegistrationCount = 2100;
liveFundAmount = 8200;
```

### Scenario 3: Going Viral
```javascript
// Frequent spikes (every 10-20 seconds)
setInterval(() => { /* spike code */ }, Math.random() * (20000 - 10000) + 10000);
```

---

## 🐛 Troubleshooting

**Numbers not updating?**
- Check browser console for errors
- Verify `DEMO_MODE = true` in script.js
- Refresh the page

**Updates too fast/slow?**
- Adjust interval ranges in `startLiveStatsSimulation()`
- See "Adjust Update Frequency" section above

**Numbers resetting unexpectedly?**
- Check max values (6000 for participants, 12000 for funds)
- Increase max values if needed

**Animation looks choppy?**
- Reduce update frequency
- Check browser performance
- Close other tabs to free resources

---

## 🎓 Technical Details

### Animation Method
- **requestAnimationFrame**: Smooth 60fps animations
- **Easing function**: Cubic ease-out for natural deceleration
- **Duration**: 800ms per update

### Performance
- **Memory efficient**: No array building or data retention
- **CPU friendly**: Animations pause when not visible
- **Network-free**: Everything runs client-side

### Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

---

## 📊 Expected Behavior

### First 10 Seconds
```
00:00 - Page loads
00:01 - Numbers count from 0 to ~3,000 and ~9,000
00:02 - Animation completes
00:05 - First increment: +2 participants
00:08 - Fund increment: +KSh 350
00:10 - Participant increment: +1
```

### First Minute
- **6-12 registration updates** (1-3 people each)
- **5-8 fund updates** (KSh 100-500 each)
- **1-2 viral spikes** (10-50 people, KSh 200-1000)
- **Total growth**: ~50-150 participants, ~KSh 1,000-3,000

### One Hour
- **~400 registration updates**
- **~300 fund updates**
- **~100 viral spikes**
- **Pattern**: Continuous realistic activity

---

## 💎 Best Practices

1. **Set appropriate ranges** for your expected turnout
2. **Test before demos** to ensure desired behavior
3. **Match to narrative** - low numbers early, high numbers near event
4. **Monitor performance** on target devices
5. **Switch to production mode** before going live

---

## 🎉 Summary

The live statistics feature provides:
- ✅ **Realistic simulation** for testing
- ✅ **Continuous activity** to show momentum
- ✅ **Easy configuration** for different scenarios
- ✅ **Smooth animations** for professional look
- ✅ **Simple toggle** to switch to production mode

**Perfect for demonstrations, presentations, and testing before your protest website goes live!**

---

*Current Configuration:*
- Demo Mode: **ON**
- Participants Range: **2,000 - 6,000**
- Funds Range: **KSh 8,000 - 12,000**
- Update Frequency: **3-8 seconds (participants), 5-12 seconds (funds)**
- Viral Spikes: **Every 20-40 seconds**

---

**To disable demo mode and use real data, set `DEMO_MODE = false` in script.js line 8.**
