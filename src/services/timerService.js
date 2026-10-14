// Readify IELTS - Resilient Countdown Timer Service

export class TimerService {
  constructor({
    totalSeconds = 3600,
    mode = 'timed', // 'practice', 'timed', 'full_test'
    onTick = null,
    onWarning = null,
    onExpire = null,
    storageKey = null
  } = {}) {
    this.totalSeconds = totalSeconds;
    this.remainingSeconds = totalSeconds;
    this.mode = mode;
    this.onTick = onTick;
    this.onWarning = onWarning;
    this.onExpire = onExpire;
    this.storageKey = storageKey;

    this.timerId = null;
    this.isPaused = false;
    this.isExpired = false;
    this.deadline = null;
    this.warning10Fired = false;
    this.warning5Fired = false;
  }

  start() {
    this.stop(); // Clear any existing

    // Check if there is an existing deadline saved in storage
    if (this.storageKey) {
      try {
        const saved = JSON.parse(localStorage.getItem(this.storageKey));
        if (saved && saved.deadline) {
          const now = Date.now();
          if (now >= saved.deadline) {
            this.remainingSeconds = 0;
            this.isExpired = true;
            if (this.onExpire) this.onExpire();
            return;
          } else {
            this.deadline = saved.deadline;
            this.remainingSeconds = Math.max(0, Math.round((this.deadline - now) / 1000));
          }
        }
      } catch (e) {
        console.warn('Failed to parse timer from localStorage', e);
      }
    }

    if (!this.deadline) {
      this.deadline = Date.now() + (this.remainingSeconds * 1000);
      this.persist();
    }

    this.isPaused = false;
    this.tick();
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  tick() {
    if (this.isPaused || this.isExpired) return;

    const now = Date.now();
    this.remainingSeconds = Math.max(0, Math.round((this.deadline - now) / 1000));

    // Check 10-min warning (600s)
    if (this.remainingSeconds <= 600 && !this.warning10Fired) {
      this.warning10Fired = true;
      if (this.onWarning) this.onWarning(10);
    }

    // Check 5-min warning (300s)
    if (this.remainingSeconds <= 300 && !this.warning5Fired) {
      this.warning5Fired = true;
      if (this.onWarning) this.onWarning(5);
    }

    // Check Expiry (0s)
    if (this.remainingSeconds <= 0) {
      this.remainingSeconds = 0;
      this.isExpired = true;
      this.stop();
      if (this.onExpire) this.onExpire();
    }

    if (this.onTick) {
      this.onTick(this.remainingSeconds, this.formatTime());
    }

    this.persist();
  }

  pause() {
    if (this.mode === 'full_test') {
      // Full test simulation does not allow pausing
      return false;
    }
    if (!this.isPaused && !this.isExpired) {
      this.isPaused = true;
      this.persist();
      return true;
    }
    return false;
  }

  resume() {
    if (this.isPaused && !this.isExpired) {
      this.isPaused = false;
      this.deadline = Date.now() + (this.remainingSeconds * 1000);
      this.persist();
      return true;
    }
    return false;
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  clearStorage() {
    if (this.storageKey) {
      localStorage.removeItem(this.storageKey);
    }
  }

  persist() {
    if (this.storageKey) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify({
          deadline: this.deadline,
          remainingSeconds: this.remainingSeconds,
          isPaused: this.isPaused,
          mode: this.mode
        }));
      } catch (e) {
        // quota exceeded or private mode
      }
    }
  }

  formatTime() {
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  getTimeSpent() {
    return Math.max(0, this.totalSeconds - this.remainingSeconds);
  }

  formatTimeSpent() {
    const spent = this.getTimeSpent();
    const mins = Math.floor(spent / 60);
    const secs = spent % 60;
    return `${mins}m ${secs}s`;
  }
}
