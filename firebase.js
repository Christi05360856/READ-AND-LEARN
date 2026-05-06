// ============================================
// BIBLE QUIZ - firebase.js (STACK OVERFLOW FIXED)
// ============================================

const db = firebase.firestore();
const auth = firebase.auth();

// Prevent modal from spam-opening
let authModalShown = false;
let currentScreen = 'landing';

// ============================================
// SCREEN NAVIGATION (SAFE - NO SIDE EFFECTS)
// ============================================

function showScreen(screenName) {
  // Guard against recursive calls
  if (screenName === currentScreen) return;
  currentScreen = screenName;

  const screens = ['landing-screen', 'quiz-screen', 'result-screen', 'leaderboard-screen', 'rewards-screen'];
  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const targetId = screenName === 'landing' ? 'landing-screen' : 
                   screenName === 'quiz' ? 'quiz-screen' : 
                   screenName === 'result' ? 'result-screen' :
                   screenName === 'leaderboard' ? 'leaderboard-screen' :
                   screenName === 'rewards' ? 'rewards-screen' : '';

  const target = document.getElementById(targetId);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo(0, 0);
  }
}

window.showScreen = showScreen;

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

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errorEl = document.getElementById('auth-error');

  if (name.length < 2) {
    if (errorEl) errorEl.textContent = 'Please enter your full name';
    return;
  }
  if (password.length < 6) {
    if (errorEl) errorEl.textContent = 'Password must be at least 6 characters';
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

    hideAuthModal();
    updateUIForLoggedInUser(userCred.user);
  } catch (err) {
    console.error('Registration error:', err);
    if (errorEl) errorEl.textContent = err.message;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('auth-error');

  try {
    const userCred = await auth.signInWithEmailAndPassword(email, password);
    hideAuthModal();
    updateUIForLoggedInUser(userCred.user);
  } catch (err) {
    console.error('Login error:', err);
    if (errorEl) errorEl.textContent = err.message;
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

  if (authSection) authSection.classList.add('hidden');
  if (welcomeSection) welcomeSection.classList.remove('hidden');
  if (welcomeName) welcomeName.textContent = user.displayName || 'Champion';

  const rewardsUserName = document.getElementById('rewards-user-name');
  if (rewardsUserName) rewardsUserName.textContent = user.displayName || user.email;
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

function updateRewardProgress(points) {
  const fill = document.getElementById('reward-progress-fill');
  const nextMilestoneEl = document.getElementById('reward-next-milestone');
  if (!fill) return;

  let nextMilestone = 5000;
  if (points >= 5000) nextMilestone = 10000;
  if (points >= 10000) nextMilestone = 25000;
  if (points >= 25000) nextMilestone = 50000;

  let prevMilestone = 0;
  if (points >= 5000) prevMilestone = 5000;
  if (points >= 10000) prevMilestone = 10000;
  if (points >= 25000) prevMilestone = 25000;

  const progress = Math.min(100, ((points - prevMilestone) / (nextMilestone - prevMilestone)) * 100);
  fill.style.width = progress + '%';

  if (nextMilestoneEl) {
    nextMilestoneEl.textContent = nextMilestone.toLocaleString();
  }
}

function updateRewardTiers(points) {
  const tiers = [
    { threshold: 5000, id: 'tier-5000' },
    { threshold: 10000, id: 'tier-10000' },
    { threshold: 25000, id: 'tier-25000' }
  ];

  tiers.forEach(tier => {
    const el = document.getElementById(tier.id);
    if (el) {
      if (points >= tier.threshold) {
        el.textContent = 'Unlocked ✅';
        el.classList.add('unlocked');
        el.parentElement.classList.add('tier-unlocked');
      } else {
        const remaining = tier.threshold - points;
        el.textContent = remaining.toLocaleString() + ' pts to go 🔒';
      }
    }
  });
}

// ============================================
// REWARD CLAIM
// ============================================

async function submitRewardClaim(network, phone) {
  const user = auth.currentUser;
  if (!user) {
    alert('Please log in first');
    return;
  }

  try {
    const weekId = getCurrentWeekId();
    const leaderboard = await fetchLeaderboard();
    const rank = leaderboard.findIndex(e => e.userId === user.uid) + 1;

    if (rank === 0 || rank > 3) {
      alert('Only top 3 can claim weekly rewards!');
      return;
    }

    const rewardType = rank === 1 ? '2GB' : rank === 2 ? '1GB' : '500MB';

    await db.collection('rewardClaims').add({
      userId: user.uid,
      userName: user.displayName || 'User',
      email: user.email,
      phone: phone,
      network: network,
      rewardType: rewardType,
      rank: rank,
      week: weekId,
      status: 'pending',
      claimedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert('🎉 Reward claim submitted! You will receive your data within 24 hours.');
    document.getElementById('reward-modal').classList.add('hidden');
  } catch (err) {
    console.error('Reward claim error:', err);
    alert('Error submitting claim: ' + err.message);
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getCurrentWeekId() {
  const now = new Date();
  const year = now.getFullYear();
  const week = getWeekNumber(now);
  return year + '-W' + week;
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getWeekStart() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toISOString().split('T')[0];
}

function getWeekEnd() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + 7;
  return new Date(d.setDate(diff)).toISOString().split('T')[0];
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

  // Reward claim
  const rewardForm = document.getElementById('reward-form');
  const claimRewardBtn = document.getElementById('claim-reward-btn');

  if (rewardForm) {
    rewardForm.addEventListener('submit', e => {
      e.preventDefault();
      const network = document.getElementById('reward-network').value;
      const phone = document.getElementById('reward-phone').value;
      submitRewardClaim(network, phone);
    });
  }

  if (claimRewardBtn) {
    claimRewardBtn.addEventListener('click', () => {
      document.getElementById('reward-modal').classList.remove('hidden');
    });
  }
}

// ============================================
// AUTH STATE LISTENER (FIXED - NO RECURSION)
// ============================================

auth.onAuthStateChanged(user => {
  if (user) {
    // User logged in
    updateUIForLoggedInUser(user);
    loadUserDashboard();
    authModalShown = false;
    
    // Hide auth modal if it's open
    hideAuthModal();
  } else {
    // User logged out
    const authSection = document.getElementById('auth-section');
    const welcomeSection = document.getElementById('welcome-section');

    if (authSection) authSection.classList.remove('hidden');
    if (welcomeSection) welcomeSection.classList.add('hidden');

    // Only show auth modal once per session, and verify still logged out
    if (!authModalShown) {
      setTimeout(() => {
        if (!auth.currentUser && currentScreen === 'landing') {
          showAuthModal();
        }
      }, 800);
    }
  }
});

// ============================================
// INITIALIZE
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachEventListeners);
} else {
  attachEventListeners();
}

console.log('🔥 firebase.js fully loaded');
