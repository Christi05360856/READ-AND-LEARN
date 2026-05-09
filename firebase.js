// ============================================
// BIBLE QUIZ - firebase.js (FULLY FIXED)
// ============================================

const db = firebase.firestore();
const auth = firebase.auth();

// Prevent modal from spam-opening
let authModalShown = false;
let currentScreen = 'landing';
let isProcessingAuth = false;

// ============================================
// SCREEN NAVIGATION (SAFE - NO SIDE EFFECTS)
// ============================================

function showScreen(screenName) {
  if (screenName === currentScreen) return;
  currentScreen = screenName;

  const screens = ['landing-screen', 'quiz-screen', 'result-screen', 'leaderboard-screen', 'rewards-screen', 'profile-screen'];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const targetId = screenName === 'landing' ? 'landing-screen' : 
                   screenName === 'quiz' ? 'quiz-screen' : 
                   screenName === 'result' ? 'result-screen' :
                   screenName === 'leaderboard' ? 'leaderboard-screen' :
                   screenName === 'rewards' ? 'rewards-screen' :
                   screenName === 'profile' ? 'profile-screen' : '';

  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo(0, 0);
  }

  // Update bottom nav active state
  updateBottomNav(screenName);
}

function updateBottomNav(activeScreen) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.nav === activeScreen) {
      item.classList.add('active');
    }
  });
}

function navigateTo(screenName) {
  showScreen(screenName);
  if (screenName === 'leaderboard') renderLeaderboard();
  if (screenName === 'rewards') loadUserDashboard();
  if (screenName === 'profile') loadProfile();
}

window.showScreen = showScreen;
window.navigateTo = navigateTo;

// ============================================
// AUTH FUNCTIONS
// ============================================

function showAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.remove('hidden');
  authModalShown = true;
}

function hideAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.add('hidden');
  const errorEl = document.getElementById('auth-error');
  if (errorEl) errorEl.textContent = '';
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');

  if (tab === 'login') {
    if (loginForm) loginForm.classList.remove('hidden');
    if (registerForm) registerForm.classList.add('hidden');
    if (loginTab) loginTab.classList.add('active');
    if (registerTab) registerTab.classList.remove('active');
  } else {
    if (loginForm) loginForm.classList.add('hidden');
    if (registerForm) registerForm.classList.remove('hidden');
    if (loginTab) loginTab.classList.remove('active');
    if (registerTab) registerTab.classList.add('active');
  }
}

function setAuthLoading(isLoading, button, originalText) {
  if (!button) return;
  button.disabled = isLoading;
  button.textContent = isLoading ? (originalText.includes('Creating') ? 'Creating account...' : 'Signing in...') : originalText;
  button.style.opacity = isLoading ? '0.7' : '1';
}

function showAuthSuccess(msg) {
  const errorEl = document.getElementById('auth-error');
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.style.color = '#22c55e';
  }
}

async function handleRegister(e) {
  e.preventDefault();
  if (isProcessingAuth) return;
  isProcessingAuth = true;

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.textContent : 'Create Account';

  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errorEl = document.getElementById('auth-error');

  setAuthLoading(true, submitBtn, originalText);
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.style.color = '#ef4444';
  }

  if (name.length < 2) {
    if (errorEl) errorEl.textContent = 'Please enter your full name';
    setAuthLoading(false, submitBtn, originalText);
    isProcessingAuth = false;
    return;
  }
  if (password.length < 6) {
    if (errorEl) errorEl.textContent = 'Password must be at least 6 characters';
    setAuthLoading(false, submitBtn, originalText);
    isProcessingAuth = false;
    return;
  }

  try {
    const userCred = await auth.createUserWithEmailAndPassword(email, password);
    await userCred.user.updateProfile({ displayName: name });

    await db.collection('users').doc(userCred.user.uid).set({
      name: name,
      email: email,
      totalPoints: 0,
      quizzesTaken: 0,
      bestScore: 0,
      currentStreak: 0,
      longestStreak: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showAuthSuccess('✅ Account created successfully!');
    setTimeout(() => {
      hideAuthModal();
      updateUIForLoggedInUser(userCred.user);
      setAuthLoading(false, submitBtn, originalText);
      isProcessingAuth = false;
    }, 1200);
  } catch (err) {
    console.error('Registration error:', err);
    if (errorEl) {
      errorEl.style.color = '#ef4444';
      errorEl.textContent = err.message;
    }
    setAuthLoading(false, submitBtn, originalText);
    isProcessingAuth = false;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  if (isProcessingAuth) return;
  isProcessingAuth = true;

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.textContent : 'Login';

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('auth-error');

  setAuthLoading(true, submitBtn, originalText);
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.style.color = '#ef4444';
  }

  try {
    const userCred = await auth.signInWithEmailAndPassword(email, password);
    showAuthSuccess('✅ Login successful!');
    setTimeout(() => {
      hideAuthModal();
      updateUIForLoggedInUser(userCred.user);
      setAuthLoading(false, submitBtn, originalText);
      isProcessingAuth = false;
    }, 800);
  } catch (err) {
    console.error('Login error:', err);
    if (errorEl) {
      errorEl.style.color = '#ef4444';
      errorEl.textContent = err.message;
    }
    setAuthLoading(false, submitBtn, originalText);
    isProcessingAuth = false;
  }
}

async function handleLogout() {
  await auth.signOut();
  location.reload();
}

// ============================================
// UI UPDATES
// ============================================

function updateUIForLoggedInUser(user) {
  const authSection = document.getElementById('auth-section');
  const welcomeSection = document.getElementById('welcome-section');
  const welcomeName = document.getElementById('welcome-name');
  const fixedLogout = document.getElementById('fixed-logout-btn');
  const bottomNav = document.getElementById('bottom-nav');

  if (authSection) authSection.classList.add('hidden');
  if (welcomeSection) welcomeSection.classList.remove('hidden');
  if (welcomeName) welcomeName.textContent = user.displayName || 'Champion';
  if (fixedLogout) fixedLogout.classList.remove('hidden');
  if (bottomNav) bottomNav.classList.remove('hidden');

  const rewardsUserName = document.getElementById('rewards-user-name');
  if (rewardsUserName) rewardsUserName.textContent = user.displayName || user.email;

  // Update week badges dynamically
  updateWeekBadges();

  // Mandatory notification check
  setTimeout(() => checkNotificationStatus(), 1000);

  // Check daily quiz limit
  setTimeout(async () => {
    const limitCheck = await checkDailyQuizLimit();
    if (limitCheck && limitCheck.blocked) {
      showDailyLimitMessage(limitCheck);
    } else {
      showQuizAttemptsLeft(limitCheck.remaining);
    }
  }, 500);
}

function updateWeekBadges() {
  const weekNum = getDisplayWeek();
  const badges = document.querySelectorAll('#leaderboard-week-badge, #week-badge');
  badges.forEach(badge => {
    if (badge) badge.textContent = 'Week ' + weekNum;
  });
}

// ============================================
// QUIZ SAVE FUNCTION
// ============================================

async function saveQuizResult(score, totalQuestions, timeLeft, points) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data() || {};

    const now = new Date();
    const lastQuizDate = userData.lastQuizDate ? userData.lastQuizDate.toDate() : null;
    let streak = userData.currentStreak || 0;

    if (lastQuizDate) {
      const diffDays = Math.floor((now - lastQuizDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) streak++;
      else if (diffDays > 1) streak = 1;
    } else {
      streak = 1;
    }

    const newBest = Math.max(score, userData.bestScore || 0);
    const newTotalPoints = (userData.totalPoints || 0) + points;

    await userRef.set({
      name: user.displayName || userData.name || 'User',
      email: user.email,
      totalPoints: newTotalPoints,
      quizzesTaken: (userData.quizzesTaken || 0) + 1,
      bestScore: newBest,
      currentStreak: streak,
      longestStreak: Math.max(streak, userData.longestStreak || 0),
      lastQuizDate: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    await db.collection('quizAttempts').add({
      userId: user.uid,
      userName: user.displayName || userData.name || 'User',
      score: score,
      totalQuestions: totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      timeLeft: timeLeft,
      points: points,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    await updateWeeklyLeaderboard(user.uid, user.displayName || userData.name || 'User', points);
  } catch (err) {
    console.error('Save quiz error:', err);
  }
}

async function updateWeeklyLeaderboard(userId, userName, points) {
  const weekId = getCurrentWeekId();
  const leaderboardRef = db.collection('leaderboard').doc(weekId);

  try {
    const doc = await leaderboardRef.get();
    let entries = [];
    if (doc.exists) {
      entries = doc.data().entries || [];
    }

    const existingIndex = entries.findIndex(e => e.userId === userId);
    if (existingIndex >= 0) {
      entries[existingIndex].points += points;
      entries[existingIndex].name = userName;
    } else {
      entries.push({ userId: userId, name: userName, points: points });
    }

    entries.sort((a, b) => b.points - a.points);

    await leaderboardRef.set({
      weekStart: getWeekStart(),
      weekEnd: getWeekEnd(),
      entries: entries
    });
  } catch (err) {
    console.error('Leaderboard error:', err);
  }
}

// ============================================
// LEADERBOARD FUNCTIONS
// ============================================

async function fetchLeaderboard() {
  const weekId = getCurrentWeekId();
  try {
    const doc = await db.collection('leaderboard').doc(weekId).get();
    if (!doc.exists) return [];
    return doc.data().entries || [];
  } catch (err) {
    console.error('Fetch leaderboard error:', err);
    return [];
  }
}

function renderLeaderboardHTML(entries, containerId, userRankId) {
  const container = document.getElementById(containerId);
  const user = auth.currentUser;

  if (!container) return;

  if (entries.length === 0) {
    container.innerHTML = '<p class="empty-state">No scores yet this week. Be the first to take the quiz!</p>';
    return;
  }

  let html = '';
  entries.slice(0, 20).forEach((entry, index) => {
    const rank = index + 1;
    const isCurrentUser = user && entry.userId === user.uid;
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
    const rewardBadge = rank <= 3 ? '<span class="reward-badge">🏆 Prize</span>' : '';

    html += '<div class="leaderboard-row ' + (isCurrentUser ? 'current-user' : '') + '">' +
      '<div class="leaderboard-rank">' + medal + '</div>' +
      '<div class="leaderboard-name">' + entry.name + ' ' + rewardBadge + '</div>' +
      '<div class="leaderboard-points">' + entry.points.toLocaleString() + ' pts</div>' +
      '</div>';
  });

  container.innerHTML = html;

  const userRankEl = userRankId ? document.getElementById(userRankId) : null;
  if (userRankEl && user) {
    const userIndex = entries.findIndex(e => e.userId === user.uid);
    if (userIndex >= 20) {
      userRankEl.innerHTML = '<div class="leaderboard-row current-user">' +
        '<div class="leaderboard-rank">#' + (userIndex + 1) + '</div>' +
        '<div class="leaderboard-name">' + entries[userIndex].name + '</div>' +
        '<div class="leaderboard-points">' + entries[userIndex].points.toLocaleString() + ' pts</div>' +
        '</div>';
    } else {
      userRankEl.innerHTML = '';
    }
  }
}

async function renderLeaderboard() {
  const entries = await fetchLeaderboard();
  renderLeaderboardHTML(entries, 'leaderboard-list', 'leaderboard-user-rank');
}

async function renderReviewLeaderboard() {
  const entries = await fetchLeaderboard();
  renderLeaderboardHTML(entries, 'review-leaderboard-list', null);
}

// ============================================
// USER DASHBOARD & REWARDS
// ============================================

async function loadUserDashboard() {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const doc = await db.collection('users').doc(user.uid).get();
    if (!doc.exists) return;

    const data = doc.data();
    const el = (id) => document.getElementById(id);
    if (el('dash-name')) el('dash-name').textContent = data.name || 'User';
    if (el('dash-quizzes')) el('dash-quizzes').textContent = data.quizzesTaken || 0;
    if (el('dash-best')) el('dash-best').textContent = (data.bestScore || 0) + '%';
    if (el('dash-points')) el('dash-points').textContent = (data.totalPoints || 0).toLocaleString();
    if (el('dash-streak')) el('dash-streak').textContent = (data.currentStreak || 0) + ' days';

    if (el('reward-current-points')) {
      el('reward-current-points').textContent = (data.totalPoints || 0).toLocaleString();
    }

    updateRewardProgress(data.totalPoints || 0);
    updateRewardTiers(data.totalPoints || 0);

  } catch (err) {
    console.error('Dashboard error:', err);
  }
}

async function loadProfile() {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const doc = await db.collection('users').doc(user.uid).get();
    if (!doc.exists) return;

    const data = doc.data();
    const joined = data.createdAt ? data.createdAt.toDate().toLocaleDateString() : '-';

    const el = (id) => document.getElementById(id);
    if (el('profile-avatar')) el('profile-avatar').textContent = (data.name || 'U').charAt(0).toUpperCase();
    if (el('profile-name')) el('profile-name').textContent = data.name || 'User';
    if (el('profile-email')) el('profile-email').textContent = data.email || user.email;
    if (el('profile-joined')) el('profile-joined').textContent = 'Joined: ' + joined;
    if (el('profile-quizzes')) el('profile-quizzes').textContent = data.quizzesTaken || 0;
    if (el('profile-best')) el('profile-best').textContent = (data.bestScore || 0) + '%';
    if (el('profile-points')) el('profile-points').textContent = (data.totalPoints || 0).toLocaleString();
    if (el('profile-streak')) el('profile-streak').textContent = (data.currentStreak || 0);

  } catch (err) {
    console.error('Profile error:', err);
  }
}

function updateRewardProgress(points) {
  const fill = document.getElementById('reward-progress-fill');
  const nextMilestoneEl = document.getElementById('reward-next-milestone');
  if (!fill) return;

  // THRESHOLDS: 5K (1GB), 10K (2.5GB), 20K (5GB)
  let nextMilestone = 5000;
  if (points >= 5000) nextMilestone = 10000;
  if (points >= 10000) nextMilestone = 20000;

  let prevMilestone = 0;
  if (points >= 5000) prevMilestone = 5000;
  if (points >= 10000) prevMilestone = 10000;

  const progress = Math.min(100, ((points - prevMilestone) / (nextMilestone - prevMilestone)) * 100);
  fill.style.width = progress + '%';

  if (nextMilestoneEl) {
    nextMilestoneEl.textContent = nextMilestone.toLocaleString();
  }
}

function updateRewardTiers(points) {
  // TIERS: 5K (1GB), 10K (2.5GB), 20K (5GB)
  const tiers = [
    { threshold: 5000, reward: '1GB', id: 'tier-5000' },
    { threshold: 10000, reward: '2.5GB', id: 'tier-10000' },
    { threshold: 20000, reward: '5GB', id: 'tier-20000' }
  ];

  tiers.forEach(tier => {
    const el = document.getElementById(tier.id);
    if (el) {
      if (points >= tier.threshold) {
        el.textContent = 'Unlocked ✅ (' + tier.reward + ')';
        el.classList.add('unlocked');
        el.parentElement.classList.add('tier-unlocked');
      } else {
        const remaining = tier.threshold - points;
        el.textContent = remaining.toLocaleString() + ' pts to go 🔒 (' + tier.reward + ')';
      }
    }
  });
}

// ============================================
// UTILITY FUNCTIONS (FIXED WEEK LOGIC)
// ============================================

// EPOCH: May 5, 2026 (when you launched) - Monday start
const WEEK_EPOCH = new Date('2026-05-05T00:00:00');

function getCurrentWeekId() {
  const now = new Date();
  const diffTime = now - WEEK_EPOCH;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) + 1;
  return '2026-W' + weekNumber;
}

function getWeekStart() {
  const now = new Date();
  const diffTime = now - WEEK_EPOCH;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7);
  const start = new Date(WEEK_EPOCH);
  start.setDate(start.getDate() + (weekNumber * 7));
  return start.toISOString().split('T')[0];
}

function getWeekEnd() {
  const now = new Date();
  const diffTime = now - WEEK_EPOCH;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7);
  const end = new Date(WEEK_EPOCH);
  end.setDate(end.getDate() + (weekNumber * 7) + 6);
  return end.toISOString().split('T')[0];
}

function getDisplayWeek() {
  const now = new Date();
  const diffTime = now - WEEK_EPOCH;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekNumber = Math.floor(diffDays / 7) + 1;
  return weekNumber;
}

// ============================================
// DOM READY & EVENT LISTENERS
// ============================================

function attachEventListeners() {
  const authBtn = document.getElementById('auth-btn');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');

  if (authBtn) authBtn.addEventListener('click', showAuthModal);
  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (registerForm) registerForm.addEventListener('submit', handleRegister);
  if (loginTab) loginTab.addEventListener('click', () => switchAuthTab('login'));
  if (registerTab) registerTab.addEventListener('click', () => switchAuthTab('register'));

  // Welcome screen buttons
  const beginTestBtn = document.getElementById('begin-test-btn');
  const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
  const viewRewardsBtn = document.getElementById('view-rewards-btn');

  if (beginTestBtn) {
    beginTestBtn.addEventListener('click', () => {
      showScreen('quiz');
      if (typeof window.startQuiz === 'function') window.startQuiz();
    });
  }

  if (viewLeaderboardBtn) {
    viewLeaderboardBtn.addEventListener('click', () => {
      showScreen('leaderboard');
      renderLeaderboard();
    });
  }

  if (viewRewardsBtn) {
    viewRewardsBtn.addEventListener('click', () => {
      showScreen('rewards');
      loadUserDashboard();
    });
  }

  // Leaderboard screen buttons
  const backFromLeaderboard = document.getElementById('back-from-leaderboard');
  const takeQuizFromLeaderboard = document.getElementById('take-quiz-from-leaderboard');

  if (backFromLeaderboard) {
    backFromLeaderboard.addEventListener('click', () => showScreen('landing'));
  }
  if (takeQuizFromLeaderboard) {
    takeQuizFromLeaderboard.addEventListener('click', () => {
      showScreen('quiz');
      if (typeof window.startQuiz === 'function') window.startQuiz();
    });
  }

  // Rewards screen buttons
  const backFromRewards = document.getElementById('back-from-rewards');
  const takeQuizFromRewards = document.getElementById('take-quiz-from-rewards');

  if (backFromRewards) {
    backFromRewards.addEventListener('click', () => showScreen('landing'));
  }
  if (takeQuizFromRewards) {
    takeQuizFromRewards.addEventListener('click', () => {
      showScreen('quiz');
      if (typeof window.startQuiz === 'function') window.startQuiz();
    });
  }

  // Reward claim removed — admin handles all reward distribution at week end
}

// ============================================
// AUTH STATE LISTENER (FIXED - NO RECURSION)
// ============================================

auth.onAuthStateChanged(user => {
  if (user) {
    // User just logged in
    updateUIForLoggedInUser(user);
    loadUserDashboard();
    authModalShown = false;
    hideAuthModal();
  } else {
    // User logged out or no session
    const authSection = document.getElementById('auth-section');
    const welcomeSection = document.getElementById('welcome-section');
    const fixedLogout = document.getElementById('fixed-logout-btn');
    const bottomNav = document.getElementById('bottom-nav');

    if (authSection) authSection.classList.remove('hidden');
    if (welcomeSection) welcomeSection.classList.add('hidden');
    if (fixedLogout) fixedLogout.classList.add('hidden');
    if (bottomNav) bottomNav.classList.add('hidden');

    // Reset to landing screen
    showScreen('landing');

    // Always show auth modal when logged out
    if (!authModalShown) {
      setTimeout(() => {
        if (!auth.currentUser) {
          showAuthModal();
        }
      }, 300);
    }
  }
});

// ============================================
// NOTIFICATIONS (MANDATORY)
// ============================================

function checkNotificationStatus() {
  const user = auth.currentUser;
  if (!user) return;

  // Check if already granted
  if (Notification.permission === 'granted') {
    scheduleDailyReminder();
    return;
  }

  // Show mandatory notification modal
  showNotificationModal();
}

function showNotificationModal() {
  let modal = document.getElementById('notification-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'notification-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 420px;">
        <div class="modal-icon">🔔</div>
        <h3>Enable Daily Reminders</h3>
        <p style="color: #64748b; margin-bottom: 20px; font-size: 15px;">
          Stay on top of your Bible study! Get notified when it's time to take your daily quiz and when someone overtakes you on the leaderboard.
        </p>
        <button id="enable-notify-btn" class="primary-btn" style="width: 100%; margin-bottom: 10px;">
          Enable Notifications
        </button>
        <p style="font-size: 12px; color: #94a3b8; margin-top: 8px;">
          This is required to continue using the platform.
        </p>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('enable-notify-btn').addEventListener('click', async () => {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await saveNotificationPreference(true);
        scheduleDailyReminder();
        modal.classList.add('hidden');
        showToast('✅ Notifications enabled!', 'success');
      } else {
        // Keep showing until they allow
        alert('⚠️ Please allow notifications in your browser settings to continue.');
      }
    });
  }
  modal.classList.remove('hidden');
}

async function saveNotificationPreference(enabled) {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await db.collection('users').doc(user.uid).update({
      notificationsEnabled: enabled,
      notificationUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (err) {
    console.error('Save notification pref error:', err);
  }
}

function scheduleDailyReminder() {
  if (!('serviceWorker' in navigator)) return;

  // Register service worker for notifications
  navigator.serviceWorker.register('sw.js').then(reg => {
    console.log('Service Worker registered for notifications');
  }).catch(err => {
    console.error('SW registration failed:', err);
  });

  // Show test notification after 3 seconds
  setTimeout(() => {
    showBrowserNotification("📖 Bible Quiz", "You're all set! We'll remind you daily at 9 AM.");
  }, 3000);
}

function showBrowserNotification(title, body) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(title, {
        body: body,
        icon: '📖',
        badge: '📖',
        tag: 'bible-quiz-daily',
        requireInteraction: false
      });
    });
  }
}

// Daily quiz limit check
async function checkDailyQuizLimit() {
  const user = auth.currentUser;
  if (!user) return false;

  try {
    // Count quizzes taken today
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);

    const snap = await db.collection('quizAttempts')
      .where('userId', '==', user.uid)
      .where('timestamp', '>=', todayStart)
      .where('timestamp', '<', tomorrowStart)
      .get();

    const takenToday = snap.size;
    const maxPerDay = 2;
    const remaining = maxPerDay - takenToday;

    if (remaining <= 0) {
      // Max reached for today
      const msUntilMidnight = tomorrowStart - now;
      return {
        blocked: true,
        nextQuizTime: tomorrowStart,
        msUntilMidnight: msUntilMidnight,
        takenToday: takenToday,
        remaining: 0
      };
    }

    return {
      blocked: false,
      takenToday: takenToday,
      remaining: remaining
    };
  } catch (err) {
    console.error('Daily limit check error:', err);
    return false;
  }
}

function showDailyLimitMessage(timeData) {
  const welcomeSection = document.getElementById('welcome-section');
  const actionsDiv = welcomeSection.querySelector('.welcome-actions');

  // Replace buttons with countdown
  const hours = Math.floor(timeData.msUntilMidnight / (1000 * 60 * 60));
  const minutes = Math.floor((timeData.msUntilMidnight % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeData.msUntilMidnight % (1000 * 60)) / 1000);

  actionsDiv.innerHTML = `
    <div style="background: #fef3c7; border: 2px solid #fbbf24; border-radius: 16px; padding: 24px; text-align: center;">
      <div style="font-size: 48px; margin-bottom: 12px;">⏳</div>
      <h3 style="color: #92400e; margin-bottom: 8px;">You've taken your 2 quizzes today!</h3>
      <p style="color: #a16207; font-size: 14px; margin-bottom: 16px;">
        You can take up to 2 quizzes per day. Come back tomorrow!
      </p>
      <div style="font-size: 32px; font-weight: 800; color: #92400e; font-variant-numeric: tabular-nums;" id="countdown-timer">
        ${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}
      </div>
      <p style="font-size: 12px; color: #a16207; margin-top: 8px;">until next quiz</p>
    </div>
  `;

  // Start countdown
  startCountdown(timeData.msUntilMidnight);
}

let countdownInterval = null;
function showQuizAttemptsLeft(attempts) {
  const el = document.getElementById('quiz-attempts-left');
  if (!el) return;

  if (attempts > 0) {
    el.textContent = '🎯 ' + attempts + ' of 2 quiz attempts left today';
    el.classList.remove('hidden');
  } else {
    el.classList.add('hidden');
  }
}

function startCountdown(msRemaining) {
  clearInterval(countdownInterval);
  let remaining = msRemaining;

  countdownInterval = setInterval(() => {
    remaining -= 1000;
    if (remaining <= 0) {
      clearInterval(countdownInterval);
      location.reload(); // Refresh to unlock quiz
      return;
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    const timerEl = document.getElementById('countdown-timer');
    if (timerEl) {
      timerEl.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    }
  }, 1000);
}

// ============================================
// INITIALIZE
// ============================================

// DISABLE auto-login: set persistence to NONE
auth.setPersistence(firebase.auth.Auth.Persistence.NONE).then(() => {
  console.log('🔒 Auth persistence set to NONE (login required every session)');
}).catch(err => {
  console.error('Auth persistence error:', err);
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachEventListeners);
} else {
  attachEventListeners();
}

console.log('🔥 firebase.js fully loaded');
