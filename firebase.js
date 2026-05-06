// ============================================
// BIBLE QUIZ - firebase.js (Auth + Firestore + Leaderboard)
// ============================================

const db = firebase.firestore();
const auth = firebase.auth();

// ============================================
// AUTH FUNCTIONS
// ============================================

function showAuthModal() {
  document.getElementById('auth-modal').classList.remove('hidden');
}

function hideAuthModal() {
  document.getElementById('auth-modal').classList.add('hidden');
  document.getElementById('auth-error').textContent = '';
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
  } else {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    loginTab.classList.remove('active');
    registerTab.classList.add('active');
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errorEl = document.getElementById('auth-error');

  if (name.length < 2) {
    errorEl.textContent = 'Please enter your full name';
    return;
  }
  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters';
    return;
  }

  try {
    const userCred = await auth.createUserWithEmailAndPassword(email, password);
    await userCred.user.updateProfile({ displayName: name });

    // Create user document in Firestore
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
  } catch (err) {
    errorEl.textContent = err.message;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('auth-error');

  try {
    await auth.signInWithEmailAndPassword(email, password);
    hideAuthModal();
  } catch (err) {
    errorEl.textContent = err.message;
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
  if (!user) return;

  const userRef = db.collection('users').doc(user.uid);
  const userDoc = await userRef.get();
  const userData = userDoc.data();

  // Calculate streak
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

  // Update user stats
  await userRef.update({
    totalPoints: newTotalPoints,
    quizzesTaken: (userData.quizzesTaken || 0) + 1,
    bestScore: newBest,
    currentStreak: streak,
    longestStreak: Math.max(streak, userData.longestStreak || 0),
    lastQuizDate: firebase.firestore.FieldValue.serverTimestamp()
  });

  // Save quiz attempt
  await db.collection('quizAttempts').add({
    userId: user.uid,
    userName: user.displayName,
    score: score,
    totalQuestions: totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100),
    timeLeft: timeLeft,
    points: points,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  // Update weekly leaderboard
  await updateWeeklyLeaderboard(user.uid, user.displayName, points);
}

async function updateWeeklyLeaderboard(userId, userName, points) {
  const weekId = getCurrentWeekId();
  const leaderboardRef = db.collection('leaderboard').doc(weekId);
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

  // Sort by points descending
  entries.sort((a, b) => b.points - a.points);

  await leaderboardRef.set({
    weekStart: getWeekStart(),
    weekEnd: getWeekEnd(),
    entries: entries
  });
}

// ============================================
// LEADERBOARD FUNCTIONS
// ============================================

async function fetchLeaderboard() {
  const weekId = getCurrentWeekId();
  const doc = await db.collection('leaderboard').doc(weekId).get();

  if (!doc.exists) return [];
  return doc.data().entries || [];
}

async function renderLeaderboard() {
  const entries = await fetchLeaderboard();
  const container = document.getElementById('leaderboard-list');
  const user = auth.currentUser;

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

  // Show user's rank if not in top 20
  if (user) {
    const userIndex = entries.findIndex(e => e.userId === user.uid);
    if (userIndex >= 20) {
      document.getElementById('user-rank').innerHTML = `
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
  if (!user) return;

  const doc = await db.collection('users').doc(user.uid).get();
  if (!doc.exists) return;

  const data = doc.data();
  document.getElementById('dash-name').textContent = data.name;
  document.getElementById('dash-quizzes').textContent = data.quizzesTaken || 0;
  document.getElementById('dash-best').textContent = (data.bestScore || 0) + '%';
  document.getElementById('dash-points').textContent = (data.totalPoints || 0).toLocaleString();
  document.getElementById('dash-streak').textContent = (data.currentStreak || 0) + ' days';
}

// ============================================
// REWARD CLAIM
// ============================================

async function submitRewardClaim(network, phone) {
  const user = auth.currentUser;
  if (!user) return;

  const weekId = getCurrentWeekId();
  const leaderboard = await fetchLeaderboard();
  const rank = leaderboard.findIndex(e => e.userId === user.uid) + 1;

  if (rank > 3) {
    alert('Only top 3 can claim rewards!');
    return;
  }

  const rewardType = rank === 1 ? '2GB' : rank === 2 ? '1GB' : '500MB';

  await db.collection('rewardClaims').add({
    userId: user.uid,
    userName: user.displayName,
    email: user.email,
    phone: phone,
    network: network,
    rewardType: rewardType,
    rank: rank,
    week: weekId,
    status: 'pending',
    claimedAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert('Reward claim submitted! You will receive your data within 24 hours.');
  document.getElementById('reward-modal').classList.add('hidden');
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
// AUTH STATE LISTENER
// ============================================

auth.onAuthStateChanged(user => {
  const authBtn = document.getElementById('auth-btn');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logout-btn');

  if (user) {
    // User is logged in
    if (authBtn) authBtn.classList.add('hidden');
    if (userInfo) userInfo.classList.remove('hidden');
    if (userName) userName.textContent = user.displayName || user.email;
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    // Load dashboard if on result screen
    loadUserDashboard();
  } else {
    // User is logged out
    if (authBtn) authBtn.classList.remove('hidden');
    if (userInfo) userInfo.classList.add('hidden');
    if (authBtn) authBtn.addEventListener('click', showAuthModal);
  }
});

// Attach form listeners
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const closeAuth = document.getElementById('close-auth');

  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (registerForm) registerForm.addEventListener('submit', handleRegister);
  if (loginTab) loginTab.addEventListener('click', () => switchAuthTab('login'));
  if (registerTab) registerTab.addEventListener('click', () => switchAuthTab('register'));
  if (closeAuth) closeAuth.addEventListener('click', hideAuthModal);

  // Reward claim form
  const rewardForm = document.getElementById('reward-form');
  if (rewardForm) {
    rewardForm.addEventListener('submit', e => {
      e.preventDefault();
      const network = document.getElementById('reward-network').value;
      const phone = document.getElementById('reward-phone').value;
      submitRewardClaim(network, phone);
    });
  }
});
