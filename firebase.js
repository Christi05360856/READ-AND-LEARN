// ============================================
// BIBLE QUIZ - firebase.js (CORRECTED)
// ============================================

const db = firebase.firestore();
const auth = firebase.auth();

// Prevent modal from spam-opening
let authModalShown = false;
let currentScreen = 'landing';
let isProcessingAuth = false;

// ============================================
// TOAST UTILITY
// ============================================

function showToast(message, type = 'info') {
  const existing = document.getElementById('app-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'app-toast';
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    padding: 14px 28px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    animation: fadeInUp 0.3s ease;
    max-width: 90vw;
    text-align: center;
  `;

  if (type === 'success') {
    toast.style.background = '#dcfce7';
    toast.style.color = '#166534';
    toast.style.border = '1px solid #86efac';
  } else if (type === 'error') {
    toast.style.background = '#fee2e2';
    toast.style.color = '#991b1b';
    toast.style.border = '1px solid #fca5a5';
  } else {
    toast.style.background = '#f0f9ff';
    toast.style.color = '#0369a1';
    toast.style.border = '1px solid #bae6fd';
  }

  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 3000);
}

window.showToast = showToast;

// ============================================
// SCREEN NAVIGATION
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
      phoneNumber: '',
      networkProvider: '',
      profileComplete: false,
      claimedMilestones: [],
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
// PROFILE CONTACT (phone + network)
// ============================================

async function saveProfileContact() {
  const user = auth.currentUser;
  if (!user) return;

  const phoneEl = document.getElementById('profile-phone');
  const networkEl = document.getElementById('profile-network');
  const phone = phoneEl ? phoneEl.value.trim() : '';
  const network = networkEl ? networkEl.value : '';

  if (!phone || phone.length < 10) {
    showToast('Please enter a valid phone number', 'error');
    return;
  }
  if (!network) {
    showToast('Please select your network provider', 'error');
    return;
  }

  try {
    await db.collection('users').doc(user.uid).update({
      phoneNumber: phone,
      networkProvider: network,
      profileComplete: true
    });
    showToast('✅ Contact details saved!', 'success');
    loadProfile();
  } catch (err) {
    console.error('Save contact error:', err);
    showToast('Error saving contact details', 'error');
  }
}

window.saveProfileContact = saveProfileContact;

async function saveRequiredContact() {
  const user = auth.currentUser;
  if (!user) return;

  const phoneEl = document.getElementById('req-phone');
  const networkEl = document.getElementById('req-network');
  const phone = phoneEl ? phoneEl.value.trim() : '';
  const network = networkEl ? networkEl.value : '';

  if (!phone || phone.length < 10) {
    showToast('Please enter a valid phone number', 'error');
    return;
  }
  if (!network) {
    showToast('Please select your network provider', 'error');
    return;
  }

  try {
    await db.collection('users').doc(user.uid).update({
      phoneNumber: phone,
      networkProvider: network,
      profileComplete: true
    });

    const modal = document.getElementById('profile-required-modal');
    if (modal) modal.classList.add('hidden');

    showToast('✅ Profile complete! You can now take quizzes.', 'success');
    loadProfile();
  } catch (err) {
    console.error('Save required contact error:', err);
    showToast('Error saving details. Please try again.', 'error');
  }
}

window.saveRequiredContact = saveRequiredContact;

function showRequiredProfileModal() {
  let modal = document.getElementById('profile-required-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'profile-required-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 420px;">
        <div class="modal-icon">📱</div>
        <h3>Complete Your Profile</h3>
        <p style="color: #64748b; margin-bottom: 20px; font-size: 15px;">
          Please add your phone number and network provider to receive weekly data rewards.
        </p>
        <input type="tel" id="req-phone" placeholder="Phone Number (e.g. 08012345678)" required
          style="width: 100%; margin-bottom: 12px; padding: 14px; border-radius: 12px; border: 2px solid #e2e8f0; font-size: 15px; font-family: 'Inter', sans-serif; outline: none;">
        <select id="req-network" required
          style="width: 100%; margin-bottom: 16px; padding: 14px; border-radius: 12px; border: 2px solid #e2e8f0; font-size: 15px; font-family: 'Inter', sans-serif; outline: none; background: white;">
          <option value="">Select Network Provider</option>
          <option value="MTN">MTN</option>
          <option value="Airtel">Airtel</option>
          <option value="Glo">Glo</option>
          <option value="9mobile">9mobile</option>
        </select>
        <button onclick="saveRequiredContact()" class="primary-btn" style="width: 100%;">Save & Continue</button>
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.classList.remove('hidden');
}

// ============================================
// UI UPDATES
// ============================================

async function updateUIForLoggedInUser(user) {
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

  updateWeekBadges();

  // Always show a loading state first
  showQuizAttemptsLeft(null, true);

  // Check if profile is complete
  try {
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data() || {};

    if (!userData.phoneNumber || !userData.networkProvider) {
      showRequiredProfileModal();
      showToast('📱 Please complete your profile to continue', 'info');
      // Hide the attempts indicator while profile is incomplete
      showQuizAttemptsLeft(0);
    } else {
      // Profile complete — check daily limit immediately
      const limitCheck = await checkDailyQuizLimit();
      if (limitCheck.blocked && limitCheck.reason !== 'check_failed') {
        showDailyLimitMessage(limitCheck);
      } else if (limitCheck.blocked && limitCheck.reason === 'check_failed') {
        // Index missing or error — show retry message but DON'T block the button
        showQuizAttemptsLeft(null, true, true);
      } else {
        showQuizAttemptsLeft(limitCheck.remaining);
      }
    }
  } catch (err) {
    console.error('Profile check error:', err);
    showQuizAttemptsLeft(2); // Default to showing 2 attempts if check fails
  }

  setTimeout(() => checkNotificationStatus(), 1000);
}

function updateWeekBadges() {
  const weekNum = getDisplayWeek();
  const badges = document.querySelectorAll('#leaderboard-week-badge, #week-badge');
  badges.forEach(badge => {
    if (badge) badge.textContent = 'Week ' + weekNum;
  });
}

// ============================================
// SEEN QUESTIONS TRACKER (7-day cooldown)
// ============================================

async function getQuizQuestions(allQuestions) {
  const user = auth.currentUser;
  if (!user || !Array.isArray(allQuestions) || allQuestions.length === 0) {
    // Fallback: just shuffle and return 50
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 50);
  }

  try {
    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data() || {};
    const history = userData.questionHistory || [];

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentlySeen = new Set();
    const prunedHistory = [];

    history.forEach(h => {
      const ts = h.seenAt?.toDate ? h.seenAt.toDate() : new Date(h.seenAt);
      if (ts > oneWeekAgo) {
        recentlySeen.add(h.question);
        prunedHistory.push(h);
      }
    });

    let available = allQuestions.filter(q => !recentlySeen.has(q.question));

    // If pool exhausted, reset and use all
    if (available.length < 50) {
      available = allQuestions;
      prunedHistory.length = 0;
    }

    // Shuffle available
    const shuffled = [...available];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const selected = shuffled.slice(0, 50);

    // Save selected questions to history
    const newHistory = selected.map(q => ({
      question: q.question,
      seenAt: firebase.firestore.FieldValue.serverTimestamp()
    }));

    await userRef.update({
      questionHistory: [...prunedHistory, ...newHistory]
    });

    return selected;
  } catch (err) {
    console.error('getQuizQuestions error:', err);
    // Fallback
    const shuffled = [...allQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 50);
  }
}

window.getQuizQuestions = getQuizQuestions;

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

    // Fetch sent milestones from rewardClaims collection
    const sentMilestones = await getSentMilestones(user.uid);

    updateRewardProgress(data.totalPoints || 0);
    updateRewardTiers(data.totalPoints || 0, data.claimedMilestones || [], sentMilestones);

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

    // Populate contact fields
    if (el('profile-phone')) el('profile-phone').value = data.phoneNumber || '';
    if (el('profile-network')) el('profile-network').value = data.networkProvider || '';

  } catch (err) {
    console.error('Profile error:', err);
  }
}

function updateRewardProgress(points) {
  const fill = document.getElementById('reward-progress-fill');
  const nextMilestoneEl = document.getElementById('reward-next-milestone');
  if (!fill) return;

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

// ============================================
// REWARD TIERS - FIXED WITH PROPER LIFECYCLE
// ============================================

/**
 * Fetches milestone rewards that admin has marked as 'sent' from rewardClaims collection
 */
async function getSentMilestones(userId) {
  try {
    const snap = await db.collection('rewardClaims')
      .where('userId', '==', userId)
      .where('type', '==', 'milestone')
      .where('status', '==', 'sent')
      .get();
    
    const sent = [];
    snap.forEach(doc => {
      const data = doc.data();
      if (data.tier) sent.push(data.tier);
    });
    return sent;
  } catch (err) {
    console.error('getSentMilestones error:', err);
    return [];
  }
}

window.getSentMilestones = getSentMilestones;

/**
 * Updates reward tier display with proper lifecycle:
 * - LOCKED: Always visible, shows "X pts to go"
 * - UNLOCKED (not claimed): Shows "Claim Reward" button
 * - CLAIMED (pending): Shows "Claimed — Pending"
 * - SENT/PAID: HIDDEN completely
 */
function updateRewardTiers(points, claimedMilestones, sentMilestones) {
  const tiers = [
    { threshold: 5000, reward: '1GB', id: 'tier-5000', dataReward: '1GB Data' },
    { threshold: 10000, reward: '2.5GB', id: 'tier-10000', dataReward: '2.5GB Data' },
    { threshold: 20000, reward: '5GB', id: 'tier-20000', dataReward: '5GB Data' }
  ];

  const claimed = claimedMilestones || [];
  const sent = sentMilestones || [];

  tiers.forEach(tier => {
    const el = document.getElementById(tier.id);
    const tierCard = el ? el.closest('.reward-tier') : null;
    if (!el) return;

    const isUnlocked = points >= tier.threshold;
    const isClaimed = claimed.includes(tier.threshold);
    const isSent = sent.includes(tier.threshold);

    // HIDE completely if admin has sent/paid this reward
    if (isSent) {
      if (tierCard) tierCard.style.display = 'none';
      return;
    }

    // Ensure card is visible for non-sent states
    if (tierCard) tierCard.style.display = '';

    if (isClaimed) {
      // User claimed but admin hasn't sent yet — show pending status
      el.innerHTML = 'Claimed — Pending ⏳ (' + tier.reward + ')';
      el.classList.add('unlocked');
      if (el.parentElement) el.parentElement.classList.add('tier-unlocked');
      el.style.background = '#fef3c7';
      el.style.color = '#92400e';
      el.style.border = '1px solid #fbbf24';
      el.style.padding = '8px 16px';
      el.style.borderRadius = '10px';
      el.style.fontSize = '13px';
      el.style.fontWeight = '600';
    } else if (isUnlocked) {
      // Threshold reached, not claimed yet — show CLAIM BUTTON
      // FIXED: Proper string escaping for onclick handler
      const onclickAttr = "claimMilestoneReward(" + tier.threshold + ", '" + tier.dataReward.replace(/'/g, "\\'") + "')";
      el.innerHTML = '<button onclick="' + onclickAttr + '" class="primary-btn claim-reward-btn" style="padding: 8px 18px; font-size: 13px; border-radius: 10px; font-weight: 600;">Claim ' + tier.reward + '</button>';
      el.classList.add('unlocked');
      if (el.parentElement) el.parentElement.classList.add('tier-unlocked');
      el.style.background = 'transparent';
    } else {
      // Still locked — show remaining points
      const remaining = tier.threshold - points;
      el.textContent = remaining.toLocaleString() + ' pts to go 🔒 (' + tier.reward + ')';
      el.classList.remove('unlocked');
      if (el.parentElement) el.parentElement.classList.remove('tier-unlocked');
      el.style.background = '#f1f5f9';
      el.style.color = '#64748b';
      el.style.border = 'none';
      el.style.padding = '8px 16px';
      el.style.borderRadius = '10px';
      el.style.fontSize = '13px';
      el.style.fontWeight = '600';
    }
  });
}

window.updateRewardTiers = updateRewardTiers;

async function claimMilestoneReward(threshold, rewardType) {
  const user = auth.currentUser;
  if (!user) {
    showToast('Please login to claim your reward', 'error');
    return;
  }

  // Find the button that was clicked
  const btn = document.querySelector('.claim-reward-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Claiming...';
  }

  try {
    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    const userData = userDoc.data() || {};

    const claimed = userData.claimedMilestones || [];
    if (claimed.includes(threshold)) {
      showToast('You have already claimed this reward!', 'info');
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Claim ' + rewardType.split(' ')[0];
      }
      return;
    }

    if (!userData.phoneNumber || !userData.networkProvider) {
      showToast('Please complete your profile (phone + network) before claiming', 'error');
      navigateTo('profile');
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Claim ' + rewardType.split(' ')[0];
      }
      return;
    }

    await db.collection('rewardClaims').add({
      userId: user.uid,
      userName: user.displayName || userData.name || 'User',
      email: userData.email || user.email,
      phone: userData.phoneNumber,
      network: userData.networkProvider,
      rewardType: rewardType,
      tier: threshold,
      type: 'milestone',
      status: 'pending',
      week: getCurrentWeekId(),
      claimedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    await userRef.update({
      claimedMilestones: firebase.firestore.FieldValue.arrayUnion(threshold)
    });

    showToast('✅ Reward claimed! Admin will send it shortly.', 'success');
    
    // Refresh dashboard to show pending state
    await loadUserDashboard();
  } catch (err) {
    console.error('Claim error:', err);
    showToast('Error claiming reward. Please try again.', 'error');
    if (btn) {
      btn.disabled = false;
      btn.textContent = 'Claim ' + rewardType.split(' ')[0];
    }
  }
}

window.claimMilestoneReward = claimMilestoneReward;

// ============================================
// UTILITY FUNCTIONS
// ============================================

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
// DAILY QUIZ LIMIT (FAIL-CLOSED)
// ============================================

async function checkDailyQuizLimit() {
  const user = auth.currentUser;
  if (!user) {
    return { blocked: true, remaining: 0, takenToday: 0, reason: 'not_logged_in' };
  }

  try {
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
    const remaining = Math.max(0, maxPerDay - takenToday);

    if (remaining <= 0) {
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
    return {
      blocked: true,
      remaining: 0,
      takenToday: 0,
      reason: 'check_failed',
      error: err.message
    };
  }
}

function showDailyLimitMessage(timeData) {
  const welcomeSection = document.getElementById('welcome-section');
  const actionsDiv = welcomeSection ? welcomeSection.querySelector('.welcome-actions') : null;
  if (!actionsDiv) return;

  if (timeData.reason === 'check_failed') {
    actionsDiv.innerHTML = `
      <div style="background: #fee2e2; border: 2px solid #fca5a5; border-radius: 16px; padding: 24px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 12px;">🛡️</div>
        <h3 style="color: #991b1b; margin-bottom: 8px;">Daily Limit Check Unavailable</h3>
        <p style="color: #b91c1c; font-size: 14px; margin-bottom: 16px;">
          We couldn't verify your daily quiz count. Please try again in a moment.
        </p>
        <button onclick="location.reload()" class="primary-btn" style="width: 100%;">Retry</button>
      </div>
    `;
    return;
  }

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

  startCountdown(timeData.msUntilMidnight);
}

let countdownInterval = null;

function showQuizAttemptsLeft(attempts, isLoading, isError) {
  const el = document.getElementById('quiz-attempts-left');
  if (!el) return;

  if (isLoading) {
    el.textContent = isError 
      ? '⚠️ Unable to check daily limit. Tap Begin Test to retry.'
      : '🎯 Checking daily limit...';
    el.classList.remove('hidden');
    el.style.background = isError ? '#fee2e2' : '#f0f9ff';
    el.style.borderColor = isError ? '#fca5a5' : '#bae6fd';
    el.style.color = isError ? '#991b1b' : '#0369a1';
    return;
  }

  const safeAttempts = typeof attempts === 'number' ? attempts : 0;

  if (safeAttempts > 0) {
    el.textContent = '🎯 ' + safeAttempts + ' of 2 quiz attempts left today';
    el.classList.remove('hidden');
    el.style.background = '#f0f9ff';
    el.style.borderColor = '#bae6fd';
    el.style.color = '#0369a1';
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
      location.reload();
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
// BEGIN QUIZ GATEKEEPER
// ============================================

async function handleBeginQuiz() {
  const user = auth.currentUser;
  if (!user) {
    showAuthModal();
    return;
  }

  // Check profile completeness first
  try {
    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data() || {};
    if (!userData.phoneNumber || !userData.networkProvider) {
      showRequiredProfileModal();
      showToast('📱 Please complete your profile before taking a quiz', 'error');
      return;
    }
  } catch (err) {
    console.error('Profile pre-check error:', err);
  }

  const btn = document.getElementById('begin-test-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Checking limit...';
  }

  const limitCheck = await checkDailyQuizLimit();

  if (limitCheck.blocked) {
    if (limitCheck.reason === 'check_failed') {
      // If check failed, let them try anyway but warn them
      showToast('⚠️ Could not verify daily limit. Proceeding...', 'info');
      showScreen('quiz');
      if (typeof window.startQuiz === 'function') window.startQuiz();
      if (btn) {
        btn.disabled = false;
        btn.textContent = '📝 Begin Test';
      }
      return;
    }
    showDailyLimitMessage(limitCheck);
    if (btn) {
      btn.disabled = false;
      btn.textContent = '📝 Begin Test';
    }
    return;
  }

  showScreen('quiz');
  if (typeof window.startQuiz === 'function') window.startQuiz();
}

window.handleBeginQuiz = handleBeginQuiz;

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

  const beginTestBtn = document.getElementById('begin-test-btn');
  const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
  const viewRewardsBtn = document.getElementById('view-rewards-btn');

  if (beginTestBtn) {
    beginTestBtn.addEventListener('click', handleBeginQuiz);
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

  const backFromLeaderboard = document.getElementById('back-from-leaderboard');
  const takeQuizFromLeaderboard = document.getElementById('take-quiz-from-leaderboard');

  if (backFromLeaderboard) {
    backFromLeaderboard.addEventListener('click', () => showScreen('landing'));
  }
  if (takeQuizFromLeaderboard) {
    takeQuizFromLeaderboard.addEventListener('click', handleBeginQuiz);
  }

  const backFromRewards = document.getElementById('back-from-rewards');
  const takeQuizFromRewards = document.getElementById('take-quiz-from-rewards');

  if (backFromRewards) {
    backFromRewards.addEventListener('click', () => showScreen('landing'));
  }
  if (takeQuizFromRewards) {
    takeQuizFromRewards.addEventListener('click', handleBeginQuiz);
  }
}

// ============================================
// AUTH STATE LISTENER
// ============================================

auth.onAuthStateChanged(user => {
  if (user) {
    updateUIForLoggedInUser(user);
    loadUserDashboard();
    authModalShown = false;
    hideAuthModal();
  } else {
    const authSection = document.getElementById('auth-section');
    const welcomeSection = document.getElementById('welcome-section');
    const fixedLogout = document.getElementById('fixed-logout-btn');
    const bottomNav = document.getElementById('bottom-nav');

    if (authSection) authSection.classList.remove('hidden');
    if (welcomeSection) welcomeSection.classList.add('hidden');
    if (fixedLogout) fixedLogout.classList.add('hidden');
    if (bottomNav) bottomNav.classList.add('hidden');

    showScreen('landing');

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
// NOTIFICATIONS
// ============================================

function checkNotificationStatus() {
  const user = auth.currentUser;
  if (!user) return;

  if (Notification.permission === 'granted') {
    scheduleDailyReminder();
    return;
  }

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

  navigator.serviceWorker.register('sw.js').then(reg => {
    console.log('Service Worker registered for notifications');
  }).catch(err => {
    console.error('SW registration failed:', err);
  });

  setTimeout(() => {
    showBrowserNotification("📖 Bible Quiz", "You're all set! We'll remind you daily at 9 AM.");
  }, 3000);
}

function showBrowserNotification(title, body) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(title, {
        body: body,
        tag: 'bible-quiz-daily',
        requireInteraction: false
      });
    });
  }
}

// ============================================
// INITIALIZE
// ============================================

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
