// ============================================
// BIBLE QUIZ - script.js (Auto-Marking + Emoji + Nav)
// ============================================

const landingScreen = document.getElementById('landing-screen');
const quizScreen    = document.getElementById('quiz-screen');
const resultScreen  = document.getElementById('result-screen');

const usernameInput = document.getElementById('username');
const startBtn      = document.getElementById('start-btn');

const currentNumEl   = document.getElementById('current-num');
const qNumEl         = document.getElementById('q-num');
const timerEl        = document.getElementById('timer');
const displayNameEl  = document.getElementById('display-name');
const questionTextEl = document.getElementById('question-text');
const optionsEl      = document.getElementById('options');
const feedbackArea   = document.getElementById('feedback-area');
const feedbackEmoji  = document.getElementById('feedback-emoji');
const feedbackMsg    = document.getElementById('feedback-message');

const prevBtn   = document.getElementById('prev-btn');
const nextBtn   = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

const confirmModal     = document.getElementById('confirm-modal');
const answeredCountEl  = document.getElementById('answered-count');
const cancelSubmitBtn  = document.getElementById('cancel-submit');
const confirmSubmitBtn = document.getElementById('confirm-submit');

const candidateNameEl  = document.getElementById('candidate-name');
const scoreDisplayEl   = document.getElementById('score-display');
const detailedScoreEl  = document.getElementById('detailed-score');
const scoreBadgeEl     = document.getElementById('score-badge');
const studyTipEl       = document.getElementById('study-tip');
const reviewListEl     = document.getElementById('review-list');
const resultChartCtx   = document.getElementById('resultChart').getContext('2d');

let currentIndex = 0;
let userAnswers  = {};
let timeLeft     = 20 * 60; // 20 minutes
let timerInterval = null;
let candidateName = '';
let quizSubmitted = false;
let selectedQuestions = [];
let isWaitingForNext = false;

const TOTAL_QUESTIONS = 100;
const LETTERS = ['A', 'B', 'C', 'D'];

// Emoji arrays for variety
const CORRECT_EMOJIS = ['😊', '😄', '🎉', '✨', '🌟', '👏', '🙌', '💯'];
const WRONG_EMOJIS   = ['😢', '😞', '😔', '💔', '😟', '😕', '🤦', '😿'];

function getRandomEmoji(isCorrect) {
  const arr = isCorrect ? CORRECT_EMOJIS : WRONG_EMOJIS;
  return arr[Math.floor(Math.random() * arr.length)];
}

function init() {
  showScreen('landing');
  startBtn.addEventListener('click', handleStart);
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));
  submitBtn.addEventListener('click', openSubmitModal);
  cancelSubmitBtn.addEventListener('click', closeSubmitModal);
  confirmSubmitBtn.addEventListener('click', submitQuiz);
}

function showScreen(screenName) {
  landingScreen.classList.add('hidden');
  quizScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');

  if (screenName === 'landing') landingScreen.classList.remove('hidden');
  if (screenName === 'quiz')    quizScreen.classList.remove('hidden');
  if (screenName === 'result')  resultScreen.classList.remove('hidden');
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function handleStart() {
  const name = usernameInput.value.trim();
  if (name.length < 3) {
    alert('Please enter your full name (at least 3 characters).');
    usernameInput.focus();
    return;
  }

  candidateName = name;
  displayNameEl.textContent = name;

  // Randomly select 100 questions
  selectedQuestions = shuffleArray(questions).slice(0, TOTAL_QUESTIONS);

  currentIndex = 0;
  userAnswers = {};
  timeLeft = 20 * 60; // 20 minutes
  quizSubmitted = false;
  isWaitingForNext = false;

  renderQuestion();
  updateNavButtons();
  startTimer();
  showScreen('quiz');
}

// Timer functions
function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) submitQuiz();
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  timerEl.textContent = `${m}:${s}`;
  if (timeLeft <= 120) timerEl.style.color = '#dc2626';
  else timerEl.style.color = '#ef4444';
}

// Question Rendering
function renderQuestion() {
  const q = selectedQuestions[currentIndex];
  currentNumEl.textContent = currentIndex + 1;
  qNumEl.textContent = currentIndex + 1;
  questionTextEl.textContent = q.question;

  // Hide feedback area
  feedbackArea.classList.add('hidden');
  feedbackArea.className = 'feedback-area hidden';
  isWaitingForNext = false;

  optionsEl.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('div');
    btn.classList.add('option');
    btn.setAttribute('data-letter', LETTERS[idx]);
    btn.textContent = opt;

    // If already answered, show the marking
    if (userAnswers.hasOwnProperty(currentIndex)) {
      const savedAnswer = userAnswers[currentIndex];
      const correctIdx = q.answer;
      if (idx === correctIdx) {
        btn.classList.add('correct');
      } else if (idx === savedAnswer && savedAnswer !== correctIdx) {
        btn.classList.add('wrong');
      } else {
        btn.classList.add('disabled');
      }
    } else {
      btn.addEventListener('click', () => handleOptionClick(idx));
    }

    optionsEl.appendChild(btn);
  });

  // If already answered, show feedback
  if (userAnswers.hasOwnProperty(currentIndex)) {
    const savedAnswer = userAnswers[currentIndex];
    const correctIdx = q.answer;
    const isCorrect = savedAnswer === correctIdx;
    showFeedback(isCorrect, correctIdx, false);
  }

  updateNavButtons();
}

function updateNavButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === TOTAL_QUESTIONS - 1 ? 'Finish' : 'Next';
}

function navigate(direction) {
  let newIndex = currentIndex + direction;
  if (newIndex >= 0 && newIndex < TOTAL_QUESTIONS) {
    currentIndex = newIndex;
    renderQuestion();
  } else if (newIndex >= TOTAL_QUESTIONS) {
    openSubmitModal();
  }
}

// ===== AUTO-MARKING + EMOJI LOGIC =====
function handleOptionClick(selectedIdx) {
  if (isWaitingForNext) return;

  const q = selectedQuestions[currentIndex];
  const correctIdx = q.answer;
  const isCorrect = selectedIdx === correctIdx;

  // Store answer
  userAnswers[currentIndex] = selectedIdx;

  // Get all option elements
  const optionEls = optionsEl.querySelectorAll('.option');

  // Apply visual feedback
  optionEls.forEach((el, idx) => {
    if (idx === correctIdx) {
      el.classList.add('correct');
    } else if (idx === selectedIdx && !isCorrect) {
      el.classList.add('wrong');
    } else {
      el.classList.add('disabled');
    }
  });

  // Show feedback with emoji
  showFeedback(isCorrect, correctIdx, true);

  isWaitingForNext = true;

  // Auto-advance after delay
  setTimeout(() => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      feedbackMsg.textContent = '🎊 Quiz complete! Preparing your results...';
      setTimeout(() => submitQuiz(), 1500);
    }
  }, 1800);
}

function showFeedback(isCorrect, correctIdx, animate) {
  feedbackArea.classList.remove('hidden');
  feedbackArea.className = 'feedback-area';

  if (isCorrect) {
    feedbackArea.classList.add('correct-feedback');
    feedbackEmoji.textContent = getRandomEmoji(true);
    feedbackMsg.textContent = 'Correct! Well done!';
  } else {
    feedbackArea.classList.add('wrong-feedback');
    feedbackEmoji.textContent = getRandomEmoji(false);
    feedbackMsg.textContent = `Wrong! The correct answer is ${LETTERS[correctIdx]}.`;
  }

  if (!animate) {
    feedbackEmoji.style.animation = 'none';
  }
}

function openSubmitModal() {
  const answered = Object.keys(userAnswers).length;
  answeredCountEl.textContent = answered;
  confirmModal.classList.remove('hidden');
}

function closeSubmitModal() {
  confirmModal.classList.add('hidden');
}

function submitQuiz() {
  if (quizSubmitted) return;
  quizSubmitted = true;
  clearInterval(timerInterval);
  closeSubmitModal();

  const score = calculateScore();
  showResults(score);
}

function calculateScore() {
  let correct = 0;
  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    if (userAnswers[i] !== undefined && selectedQuestions[i].answer === userAnswers[i]) {
      correct++;
    }
  }
  return correct;
}

function showResults(correctCount) {
  showScreen('result');
  const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

  candidateNameEl.textContent = `Candidate: ${candidateName}`;
  scoreDisplayEl.textContent = `${percentage}%`;
  detailedScoreEl.textContent = `${correctCount} / ${TOTAL_QUESTIONS}`;

  // Score badge
  scoreBadgeEl.className = 'score-badge';
  if (percentage >= 50) {
    scoreBadgeEl.classList.add('pass');
    scoreBadgeEl.textContent = 'Pass';
  } else {
    scoreBadgeEl.classList.add('fail');
    scoreBadgeEl.textContent = 'Keep Practicing';
  }

  studyTipEl.textContent = percentage >= 70
    ? '🌟 Excellent work! You have a strong understanding of the Bible!'
    : percentage >= 50
    ? '👍 Good effort! Review the questions you missed to improve.'
    : '📚 Keep studying! The Word of God is worth knowing deeply.';

  renderChart(correctCount, TOTAL_QUESTIONS - correctCount);
}

function renderChart(correct, incorrect) {
  if (window.resultChartInstance) window.resultChartInstance.destroy();
  window.resultChartInstance = new Chart(resultChartCtx, {
    type: 'doughnut',
    data: {
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        data: [correct, incorrect],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            font: { size: 14, family: 'Inter' },
            usePointStyle: true
          }
        }
      }
    }
  });
}
// Start the app
init();
