// ============================================
// BIBLE QUIZ - firebase.js (DEBUG VERSION)
// ============================================

console.log('🔥 firebase.js loaded');
console.log('Firebase object exists:', typeof firebase !== 'undefined');

if (typeof firebase === 'undefined') {
  console.error('❌ Firebase SDK not loaded! Check script tags in HTML.');
}

let db, auth;

try {
  db = firebase.firestore();
  auth = firebase.auth();
  console.log('✅ Firebase initialized successfully');
} catch (e) {
  console.error('❌ Firebase init failed:', e.message);
}

// ============================================
// AUTH FUNCTIONS
// ============================================

function showAuthModal() {
  console.log('👉 showAuthModal called');
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.remove('hidden');
    console.log('✅ Auth modal shown');
  } else {
    console.error('❌ auth-modal element not found in DOM');
  }
}

function hideAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) modal.classList.add('hidden');
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
  console.log('👉 handleRegister called');

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
    console.log('Creating user with email:', email);
    const userCred = await auth.createUserWithEmailAndPassword(email, password);
    console.log('✅ User created:', userCred.user.uid);

    await userCred.user.updateProfile({ displayName: name });
    console.log('✅ Profile updated with name:', name);

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
    console.log('✅ User document created in Firestore');

    hideAuthModal();
    alert('Account created successfully!');
  } catch (err) {
    console.error('❌ Registration error:', err);
    if (errorEl) errorEl.textContent = err.message;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  console.log('👉 handleLogin called');

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('auth-error');

  try {
    console.log('Logging in:', email);
    await auth.signInWithEmailAndPassword(email, password);
    console.log('✅ Login successful');
    hideAuthModal();
  } catch (err) {
    console.error('❌ Login error:', err);
    if (errorEl) errorEl.textContent = err.message;
  }
}

async function handleLogout() {
  await auth.signOut();
  location.reload();
}

// ============================================
// QUIZ SAVE FUNCTION
// ============================================

async function saveQuizResult(score, totalQuestions, timeLeft, points) {
  const user = auth.currentUser;
  if (!user) {
    console.log('No user logged in, skipping save');
    return;
  }

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
    console.log('✅ Quiz result saved');
  } catch (err) {
    console.error('❌ Save quiz error:', err);
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
      entries.push({ userId, name: userName, points });
    }

    entries.sort((a, b) => b.points - a.points);

    await leaderboardRef.set({
      weekStart: getWeekStart(),
      weekEnd: getWeekEnd(),
      entries: entries
    });
    console.log('✅ Leaderboard updated');
  } catch (err) {
    console.error('❌ Leaderboard error:', err);
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
    console.error('❌ Fetch leaderboard error:', err);
    return [];
  }
}

async function renderLeaderboard() {
  console.log('👉 renderLeaderboard called');
  const entries = await fetchLeaderboard();
  const container = document.getElementById('leaderboard-list');
  const user = auth.currentUser;

  if (!container) {
    console.error('❌ leaderboard-list element not found');
    return;
  }

  if (entries.length === 0) {
    container.innerHTML = '<p class="empty-state">No scores yet this week. Be the first!</p>';
    return;
  }

  let html = '';
  entries.slice(0, 20).forEach((entry, index) => {
    const rank = index + 1;
    const isCurrentUser = user && entry.userId === user.uid;
    const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
    const rewardBadge = rank <= 3 ? '<span class="reward-badge">🏆 Prize</span>' : '';

    html += `
      <div class="leaderboard-row ${isCurrentUser ? 'current-user' : ''}">
        <div class="leaderboard-rank">${medal}</div>
        <div class="leaderboard-name">${entry.name} ${rewardBadge}</div>
        <div class="leaderboard-points">${entry.points.toLocaleString()} pts</div>
      </div>
    `;
  });

  container.innerHTML = html;

  const userRankEl = document.getElementById('user-rank');
  if (userRankEl && user) {
    const userIndex = entries.findIndex(e => e.userId === user.uid);
    if (userIndex >= 20) {
      userRankEl.innerHTML = `
        <div class="leaderboard-row current-user">
          <div class="leaderboard-rank">#${userIndex + 1}</div>
          <div class="leaderboard-name">${entries[userIndex].name}</div>
          <div class="leaderboard-points">${entries[userIndex].points.toLocaleString()} pts</div>
        </div>
      `;
    }
  }
}

// ============================================
// USER DASHBOARD
// ============================================

async function loadUserDashboard() {
  const user = auth.currentUser;
  if (!user) {
    console.log('No user logged in, skipping dashboard');
    return;
  }

  try {
    const doc = await db.collection('users').doc(user.uid).get();
    if (!doc.exists) {
      console.log('User document not found');
      return;
    }

    const data = doc.data();
    console.log('User data loaded:', data);

    const el = (id) => document.getElementById(id);
    if (el('dash-name')) el('dash-name').textContent = data.name || 'User';
    if (el('dash-quizzes')) el('dash-quizzes').textContent = data.quizzesTaken || 0;
    if (el('dash-best')) el('dash-best').textContent = (data.bestScore || 0) + '%';
    if (el('dash-points')) el('dash-points').textContent = (data.totalPoints || 0).toLocaleString();
    if (el('dash-streak')) el('dash-streak').textContent = (data.currentStreak || 0) + ' days';
  } catch (err) {
    console.error('❌ Dashboard error:', err);
  }
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
      alert('Only top 3 can claim rewards!');
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
    console.error('❌ Reward claim error:', err);
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
  return `${year}-W${week}`;
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
  console.log('👉 Attaching event listeners...');

  const authBtn = document.getElementById('auth-btn');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logout-btn');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const closeAuth = document.getElementById('close-auth');
  const rewardForm = document.getElementById('reward-form');

  if (authBtn) {
    authBtn.addEventListener('click', () => {
      console.log('Auth button clicked');
      showAuthModal();
    });
    console.log('✅ auth-btn listener attached');
  } else {
    console.error('❌ auth-btn not found');
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
    console.log('✅ logout-btn listener attached');
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
    console.log('✅ login-form listener attached');
  } else {
    console.error('❌ login-form not found');
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
    console.log('✅ register-form listener attached');
  } else {
    console.error('❌ register-form not found');
  }

  if (loginTab) {
    loginTab.addEventListener('click', () => switchAuthTab('login'));
    console.log('✅ login-tab listener attached');
  }

  if (registerTab) {
    registerTab.addEventListener('click', () => switchAuthTab('register'));
    console.log('✅ register-tab listener attached');
  }

  if (closeAuth) {
    closeAuth.addEventListener('click', hideAuthModal);
    console.log('✅ close-auth listener attached');
  }

  if (rewardForm) {
    rewardForm.addEventListener('submit', e => {
      e.preventDefault();
      const network = document.getElementById('reward-network').value;
      const phone = document.getElementById('reward-phone').value;
      submitRewardClaim(network, phone);
    });
    console.log('✅ reward-form listener attached');
  }
}

// ============================================
// AUTH STATE LISTENER
// ============================================

if (typeof auth !== 'undefined') {
  auth.onAuthStateChanged(user => {
    console.log('Auth state changed:', user ? 'LOGGED IN' : 'LOGGED OUT');

    const authBtn = document.getElementById('auth-btn');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');

    if (user) {
      if (authBtn) authBtn.classList.add('hidden');
      if (userInfo) userInfo.classList.remove('hidden');
      if (userName) userName.textContent = user.displayName || user.email;
      loadUserDashboard();
    } else {
      if (authBtn) authBtn.classList.remove('hidden');
      if (userInfo) userInfo.classList.add('hidden');
    }
  });
} else {
  console.error('❌ Auth not available for state listener');
}

// ============================================
// INITIALIZE
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachEventListeners);
} else {
  attachEventListeners();
}

console.log('🔥 firebase.js fully loaded and initialized');
