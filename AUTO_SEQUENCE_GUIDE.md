# ⚡ Automatic Sequence Guide

## Overview

The **Run Full Sequence** feature automates all Twitter account setup steps after Warm Up. When triggered, it will automatically execute all actions in sequence with proper delays.

---

## 🎯 How It Works

### Manual Mode (Existing)
Select individual actions one by one from the dropdown:
- Day 1: Warm Up
- Day 2: Setup Profile
- Day 3: Join Communities
- Day 3: Post Captions
- Day 4: Spam Comments

### **Automatic Mode (NEW)** ⚡
Click **"Run Full Sequence"** and everything happens automatically!

---

## 🚀 Sequence Order

When you click "Run Full Sequence", the following actions are executed automatically:

| Step | Action | Delay | Description |
|------|--------|-------|-------------|
| 1 | **Warm Up** | Immediate | Natural browsing to warm up the account |
| 2 | **Setup Profile** | +1 min | Configure profile (bio, niche, images) |
| 3 | **Join Communities** | +2 min | Join relevant Twitter communities |
| 4 | **Post Captions** | +3 min | Post content to communities |
| 5 | **Spam Comments** | +4 min | Add support comments |

**Total Duration**: ~10 minutes (with delays between actions)

---

## 📱 User Interface

### Dropdown Menu
When you click the Play button (▶️) on a Twitter account, you'll see:

```
┌─────────────────────────────────┐
│ Select Action                   │
├─────────────────────────────────┤
│ ⚡ Run Full Sequence            │ ← NEW!
│    All steps automatically      │
├─────────────────────────────────┤
│ Day 1: Warm Up                  │
│ Day 2: Setup Profile            │
│ Day 3: Join Communities         │
│ Day 3: Post Captions            │
│ Day 4: Spam Comments (Support)  │
└─────────────────────────────────┘
```

### Progress Indicator
When a sequence is running, a progress bar appears on the account card:

```
┌──────────────────────────────────────┐
│ ⚡ Auto Sequence                     │
│ Step 2/5: Setup Profile              │
│ ████████░░░░░░░░░░░ 40%             │
└──────────────────────────────────────┘
```

---

## 🔧 Technical Details

### Delays Between Actions

The system uses increasing delays to mimic human behavior:

```javascript
const delays = [
    60000,   // 1 minute  (Warm Up → Setup Profile)
    120000,  // 2 minutes (Setup Profile → Join Communities)
    180000,  // 3 minutes (Join Communities → Post Captions)
    240000   // 4 minutes (Post Captions → Spam Comments)
];
```

### Queue System

Each action is queued in the BullMQ system:
- Actions are processed one at a time
- Failed actions are retried (2 attempts)
- Success/failure is tracked in the database

### State Management

The frontend tracks sequence progress:
```typescript
{
  running: boolean;      // Is sequence active?
  currentStep: number;   // Current step (0-4)
  totalSteps: number;    // Total steps (4)
  currentAction: string; // Current action name
}
```

---

## 🎨 Visual Features

### 1. **Gradient Button**
The "Run Full Sequence" button has a distinctive purple gradient to stand out.

### 2. **Progress Bar**
Real-time progress indicator showing:
- Current step number
- Action name
- Visual progress bar

### 3. **Status Updates**
Console logs for debugging:
```
Auto-executing: setupProfile
setupProfile queued successfully
Auto-executing: joinCommunity
joinCommunity queued successfully
...
```

---

## 📊 Backend Processing

### API Endpoint
```
POST /api/twitter-accounts/:id/action
Body: { action: "warmUp" | "setupProfile" | ... }
```

### Worker Execution
Each action triggers a worker job:
1. Job added to Redis queue
2. Worker picks up the job
3. Browser automation executes
4. Result saved to database
5. Frontend notified via Socket.io

---

## ⚠️ Important Notes

### 1. **Platform Specific**
- Only available for **Twitter** accounts
- Instagram accounts still use individual actions

### 2. **Account Status**
- Account must be `ACTIVE` to start sequence
- Status changes to `WORKING` during execution
- Returns to `ACTIVE` after completion

### 3. **Delays Are Intentional**
- Delays prevent detection as bot
- Mimics human behavior patterns
- Do not modify delays unless necessary

### 4. **Error Handling**
- If one action fails, subsequent actions still execute
- Check logs for failed actions
- Manual retry available via individual action buttons

---

## 🔍 Monitoring

### Check Progress
1. Look at the account card progress indicator
2. Check the Activities tab for action logs
3. View worker logs in real-time

### View Logs
```bash
# Backend logs
docker-compose logs -f backend

# Worker logs
docker-compose logs -f worker
```

### Database Status
```sql
-- Check account status
SELECT username, status, "lastAction" FROM "TwitterAccount";

-- Check recent activities
SELECT action, status, "createdAt" FROM "Activity" 
ORDER BY "createdAt" DESC LIMIT 20;
```

---

## 🛠️ Customization

### Modify Sequence
Edit the `launchAction` function in `frontend/src/app/page.tsx`:

```typescript
const sequence = ['setupProfile', 'joinCommunity', 'postCommunity', 'spamComments'];
const delays = [60000, 120000, 180000, 240000];
```

### Add New Steps
1. Add action to sequence array
2. Add corresponding delay
3. Ensure worker supports the action
4. Update actionLabels mapping

### Change Delays
```typescript
// Faster sequence (for testing)
const delays = [10000, 20000, 30000, 40000]; // 10s, 20s, 30s, 40s

// Slower sequence (more human-like)
const delays = [120000, 240000, 360000, 480000]; // 2min, 4min, 6min, 8min
```

---

## 🧪 Testing

### Test Sequence
1. Add a Twitter account with valid credentials
2. Click Play button (▶️)
3. Select "Run Full Sequence"
4. Monitor progress on account card
5. Check worker logs for execution details

### Expected Behavior
✅ Warm Up starts immediately  
✅ Progress indicator appears  
✅ Each action queues automatically  
✅ Progress bar updates  
✅ Account returns to ACTIVE when done  

---

## 📝 Example Flow

```
User clicks "Run Full Sequence"
    ↓
Warm Up executes immediately
    ↓
Progress: Step 1/5 - Warm Up
    ↓
[Wait 1 minute]
    ↓
Setup Profile queues
    ↓
Progress: Step 2/5 - Setup Profile
    ↓
[Wait 2 minutes]
    ↓
Join Communities queues
    ↓
Progress: Step 3/5 - Join Communities
    ↓
[Wait 3 minutes]
    ↓
Post Captions queues
    ↓
Progress: Step 4/5 - Post Captions
    ↓
[Wait 4 minutes]
    ↓
Spam Comments queues
    ↓
Progress: Step 5/5 - Spam Comments
    ↓
Sequence Complete! ✅
```

---

## 🎯 Benefits

1. **Time Saving**: No need to manually trigger each action
2. **Consistency**: Same delay pattern for all accounts
3. **Human-like**: Increasing delays mimic natural behavior
4. **Trackable**: Real-time progress monitoring
5. **Reliable**: Queue system ensures execution

---

## 🆘 Troubleshooting

### Sequence Not Starting
- Check account status (must be ACTIVE)
- Verify credentials are valid
- Check worker is running

### Progress Not Updating
- Refresh the page
- Check Socket.io connection
- View browser console for errors

### Actions Failing
- Check worker logs for errors
- Verify account has proper permissions
- Ensure cookies/session are valid

### Sequence Interrupted
- Manual actions can still be triggered
- Restart sequence by clicking "Run Full Sequence" again
- Check database for stuck jobs

---

## 📚 Related Files

- **Frontend**: `frontend/src/app/page.tsx`
- **Worker**: `worker/src/twitter.ts`
- **Scheduler**: `worker/src/utils/scheduler.ts`
- **Backend**: `backend/src/index.ts`

---

## 🚀 Future Enhancements

- [ ] Customizable sequence order
- [ ] Variable delays (randomized)
- [ ] Pause/resume sequence
- [ ] Email notifications on completion
- [ ] Sequence templates (different strategies)
- [ ] Batch sequence for multiple accounts
