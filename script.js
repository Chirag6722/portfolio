/* ========================================
   Chirag Honnyal – Portfolio Scripts
   ======================================== */

(function () {
  'use strict';

  // ─── Theme Toggle ───
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  function setTheme(theme) {
    if (theme === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#09090b');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');
    }
    localStorage.setItem('theme', theme);
  }

  themeToggle.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });

  // ─── Header Scroll Affix Effect ───
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.setAttribute('data-affix', 'true');
    } else {
      header.setAttribute('data-affix', 'false');
    }
  }, { passive: true });

  // ─── Mobile Menu Hamburger Toggle ───
  const hamburgerBtn = document.getElementById('hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      header.classList.toggle('mobile-open');
    });
  }

  // ─── Local Time (IST) ───
  function updateTime() {
    const now = new Date();
    const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    const h = ist.getHours().toString().padStart(2, '0');
    const m = ist.getMinutes().toString().padStart(2, '0');
    const s = ist.getSeconds().toString().padStart(2, '0');
    const timeEl = document.getElementById('local-time');
    if (timeEl) {
      timeEl.textContent = `${h}:${m}:${s}`;
    }
  }
  updateTime();
  setInterval(updateTime, 1000);

  // ─── Tech Stack ───
  const techStack = [
    { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=js', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=ts', url: 'https://www.typescriptlang.org/' },
    { name: 'C++', icon: 'https://skillicons.dev/icons?i=cpp', url: 'https://cplusplus.com/' },
    { name: 'C', icon: 'https://skillicons.dev/icons?i=c', url: 'https://en.cppreference.com/w/c' },
    { name: 'HTML5', icon: 'https://skillicons.dev/icons?i=html', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'CSS3', icon: 'https://skillicons.dev/icons?i=css', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'React', icon: 'https://skillicons.dev/icons?i=react', url: 'https://react.dev/' },
    { name: 'Tailwind CSS', icon: 'https://skillicons.dev/icons?i=tailwind', url: 'https://tailwindcss.com/' },
    { name: 'Bootstrap', icon: 'https://skillicons.dev/icons?i=bootstrap', url: 'https://getbootstrap.com/' },
    { name: 'Node.js', icon: 'https://skillicons.dev/icons?i=nodejs', url: 'https://nodejs.org/' },
    { name: 'Express.js', icon: 'https://skillicons.dev/icons?i=express', url: 'https://expressjs.com/' },
    { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb', url: 'https://www.mongodb.com/' },
    { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql', url: 'https://www.mysql.com/' },
    { name: 'Vite', icon: 'https://skillicons.dev/icons?i=vite', url: 'https://vite.dev/' },
    { name: 'Git', icon: 'https://skillicons.dev/icons?i=git', url: 'https://git-scm.com/' },
    { name: 'GitHub', icon: 'https://skillicons.dev/icons?i=github', url: 'https://github.com/' },
    { name: 'EJS', icon: 'https://cdn.simpleicons.org/ejs/B4CA65', url: 'https://ejs.co/', isSimple: true },
    { name: 'Passport.js', icon: 'https://cdn.simpleicons.org/passport/34E27A', url: 'https://www.passportjs.org/', isSimple: true },
    { name: 'Mapbox', icon: 'https://cdn.simpleicons.org/mapbox/ffffff', url: 'https://www.mapbox.com/', isSimple: true },
    { name: 'Cloudinary', icon: 'https://cdn.simpleicons.org/cloudinary/ffffff', url: 'https://cloudinary.com/', isSimple: true },
  ];

  const stackList = document.getElementById('stack-list');
  if (stackList) {
    techStack.forEach(tech => {
      const li = document.createElement('li');
      li.className = 'stack-item';
      const imgClass = tech.isSimple ? ' class="simple-icon"' : '';
      li.innerHTML = `
        <a href="${tech.url}" target="_blank" rel="noopener noreferrer" aria-label="${tech.name}">
          <img alt="${tech.name}"${imgClass} loading="lazy" width="32" height="32" src="${tech.icon}" />
        </a>
        <div class="stack-tooltip">${tech.name}</div>
      `;
      stackList.appendChild(li);
    });
  }

  // ─── Codeforces Heatmap ───
  const CF_HANDLE = 'chiraghonnyal6722';
  const HEATMAP_CONTAINER = document.getElementById('heatmap-container');
  const HEATMAP_LOADING = document.getElementById('heatmap-loading');
  const HEATMAP_LEGEND = document.getElementById('heatmap-legend');
  const HEATMAP_STATS = document.getElementById('heatmap-stats');
  const HEATMAP_TOTAL_TEXT = document.getElementById('heatmap-total-text');
  const TOOLTIP = document.getElementById('heatmap-tooltip');

  async function fetchCodeforcesData() {
    try {
      const response = await fetch(`https://codeforces.com/api/user.status?handle=${CF_HANDLE}&from=1&count=100000`);
      const data = await response.json();

      if (data.status !== 'OK') {
        throw new Error('API returned non-OK status');
      }

      return data.result;
    } catch (err) {
      console.error('Failed to fetch Codeforces data:', err);
      return null;
    }
  }

  function processSubmissions(submissions) {
    const dailyCounts = {};
    let totalAccepted = 0;

    submissions.forEach(sub => {
      if (sub.verdict === 'OK') {
        const date = new Date(sub.creationTimeSeconds * 1000);
        const dateStr = formatDateStr(date);
        dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1;
        totalAccepted++;
      }
    });

    return { dailyCounts, totalAccepted, totalSubmissions: submissions.length };
  }

  function formatDateStr(date) {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function formatDisplayDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  function getLevel(count, maxCount) {
    if (count === 0) return 0;
    if (maxCount <= 0) return 1;
    const ratio = count / maxCount;
    if (ratio <= 0.25) return 1;
    if (ratio <= 0.5) return 2;
    if (ratio <= 0.75) return 3;
    return 4;
  }

  function calculateStreaks(dailyCounts) {
    const today = new Date();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const sortedDates = Object.keys(dailyCounts).sort();
    if (sortedDates.length === 0) return { current: 0, longest: 0 };

    // Calculate current streak
    let d = new Date(today);
    let ds = formatDateStr(d);
    // If no submissions today, check if yesterday had submissions to keep streak alive
    if (!dailyCounts[ds]) {
      d.setDate(d.getDate() - 1);
      ds = formatDateStr(d);
    }
    
    while (true) {
      if (dailyCounts[ds]) {
        currentStreak++;
        d.setDate(d.getDate() - 1);
        ds = formatDateStr(d);
      } else {
        break;
      }
    }

    // Calculate longest streak
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prev = new Date(sortedDates[i - 1] + 'T00:00:00');
        const curr = new Date(sortedDates[i] + 'T00:00:00');
        const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    return { current: currentStreak, longest: longestStreak };
  }

  function renderHeatmap(dailyCounts, stats) {
    if (HEATMAP_LOADING) HEATMAP_LOADING.style.display = 'none';

    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    const startDate = new Date(oneYearAgo);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const counts = Object.values(dailyCounts);
    const maxCount = counts.length > 0 ? Math.max(...counts) : 1;

    const weeks = [];
    let currentDate = new Date(startDate);
    let currentWeek = [];

    while (currentDate <= today) {
      currentWeek.push({
        date: formatDateStr(currentDate),
        count: dailyCounts[formatDateStr(currentDate)] || 0
      });

      if (currentDate.getDay() === 6 || currentDate.getTime() >= today.getTime()) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    // Generate Month Labels Row
    const monthsRow = document.createElement('div');
    monthsRow.className = 'heatmap-months';
    monthsRow.style.position = 'relative';
    monthsRow.style.height = '1.25rem';
    monthsRow.style.marginBottom = '0.25rem';
    monthsRow.style.fontFamily = 'var(--font-mono)';
    monthsRow.style.fontSize = '0.7rem';
    monthsRow.style.color = 'var(--muted-fg)';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let lastMonth = -1;
    let lastLabelCol = -10;

    weeks.forEach((week, colIndex) => {
      const firstDay = week.find(d => d.date);
      if (firstDay) {
        const date = new Date(firstDay.date + 'T00:00:00');
        const month = date.getMonth();
        if (month !== lastMonth) {
          if (colIndex - lastLabelCol >= 3) {
            const span = document.createElement('span');
            span.textContent = months[month];
            span.style.position = 'absolute';
            span.style.left = `${colIndex * 14}px`;
            monthsRow.appendChild(span);
            lastLabelCol = colIndex;
          }
          lastMonth = month;
        }
      }
    });

    const grid = document.createElement('div');
    grid.className = 'heatmap-grid';

    weeks.forEach(week => {
      const col = document.createElement('div');
      col.className = 'heatmap-col';

      if (weeks.indexOf(week) === 0 && week.length < 7) {
        for (let i = 0; i < 7 - week.length; i++) {
          const spacer = document.createElement('div');
          spacer.className = 'heatmap-cell';
          spacer.style.visibility = 'hidden';
          col.appendChild(spacer);
        }
      }

      week.forEach(day => {
        const cell = document.createElement('div');
        cell.className = 'heatmap-cell';
        const level = getLevel(day.count, maxCount);
        cell.setAttribute('data-level', level);
        cell.setAttribute('data-date', day.date);
        cell.setAttribute('data-count', day.count);

        cell.addEventListener('mouseenter', (e) => {
          const displayDate = formatDisplayDate(day.date);
          const countText = day.count === 0 ? 'No submissions' : `${day.count} submission${day.count > 1 ? 's' : ''}`;
          if (TOOLTIP) {
            TOOLTIP.textContent = `${countText} on ${displayDate}`;
            TOOLTIP.classList.add('visible');

            const rect = e.target.getBoundingClientRect();
            TOOLTIP.style.left = `${rect.left + rect.width / 2 - TOOLTIP.offsetWidth / 2}px`;
            TOOLTIP.style.top = `${rect.top - TOOLTIP.offsetHeight - 8}px`;
          }
        });

        cell.addEventListener('mouseleave', () => {
          if (TOOLTIP) TOOLTIP.classList.remove('visible');
        });

        col.appendChild(cell);
      });

      grid.appendChild(col);
    });

    if (HEATMAP_CONTAINER) {
      HEATMAP_CONTAINER.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.position = 'relative';
      wrapper.appendChild(monthsRow);
      wrapper.appendChild(grid);
      HEATMAP_CONTAINER.appendChild(wrapper);
    }

    if (HEATMAP_LEGEND) HEATMAP_LEGEND.style.display = 'flex';

    const yearSubmissions = Object.values(dailyCounts).reduce((a, b) => a + b, 0);
    if (HEATMAP_TOTAL_TEXT) {
      HEATMAP_TOTAL_TEXT.textContent = `${yearSubmissions} submissions in the last year`;
    }

    const streaks = calculateStreaks(dailyCounts);
    if (HEATMAP_STATS) {
      HEATMAP_STATS.style.display = 'flex';
      HEATMAP_STATS.innerHTML = `
        <span>Total Accepted: <strong>${stats.totalAccepted}</strong></span>
        <span>Current Streak: <strong>${streaks.current}d</strong></span>
        <span>Longest Streak: <strong>${streaks.longest}d</strong></span>
      `;
    }
  }

  async function initHeatmap() {
    const submissions = await fetchCodeforcesData();
    if (!submissions) {
      if (HEATMAP_LOADING) {
        HEATMAP_LOADING.innerHTML = '<p style="font-family:var(--font-mono);font-size:0.875rem;color:var(--muted-foreground)">Failed to load Codeforces data. Please try again later.</p>';
      }
      return;
    }

    const { dailyCounts, totalAccepted, totalSubmissions } = processSubmissions(submissions);
    renderHeatmap(dailyCounts, { totalAccepted, totalSubmissions });
  }

  initHeatmap();

  // ─── Intersection Observer for Animations ───
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for scroll-triggered animation
  document.querySelectorAll('.panel, .sep').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.05}s`;
    observer.observe(el);
  });

  // ─── Dynamic Tagline Slider ───
  const taglinePhrases = [
    "Software Engineer",
    "Competitive Programmer"
  ];
  let taglineIndex = 0;
  const taglineHover = document.getElementById('tagline-container');

  function cycleTagline() {
    if (!taglineHover) return;
    const currentEl = taglineHover.querySelector('.tagline-text.active');
    if (!currentEl) return;

    taglineIndex = (taglineIndex + 1) % taglinePhrases.length;
    const nextPhrase = taglinePhrases[taglineIndex];

    const nextEl = document.createElement('p');
    nextEl.className = 'tagline-text enter';
    nextEl.textContent = nextPhrase;
    taglineHover.appendChild(nextEl);

    // Coordinate paint frames to ensure a flawless, buttery transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        currentEl.classList.remove('active');
        currentEl.classList.add('exit');

        nextEl.classList.remove('enter');
        nextEl.classList.add('active');
      });
    });

    // Clean up after 0.9s transition finishes
    setTimeout(() => {
      currentEl.remove();
    }, 900);
  }

  if (taglineHover) {
    setInterval(cycleTagline, 2200);
  }

  // ─── Education Accordion Toggle ───
  document.querySelectorAll('.edu-item').forEach(item => {
    const head = item.querySelector('.edu-head');
    if (head) {
      head.addEventListener('click', () => {
        item.classList.toggle('expanded');
      });
    }
  });

  // ─── Project Accordion Toggle ───
  document.querySelectorAll('.project').forEach(item => {
    const head = item.querySelector('.project-head');
    if (head) {
      head.addEventListener('click', (e) => {
        // Prevent toggle if clicking on live link or github link
        if (e.target.closest('.project-actions a')) {
          return;
        }
        item.classList.toggle('expanded');
      });
    }
  });

  // ─── Profile Photo fallback ───
  const profilePhoto = document.getElementById('profile-photo');
  if (profilePhoto) {
    profilePhoto.addEventListener('error', function() {
      this.style.display = 'none';
      const parent = this.parentElement;
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 10rem; height: 10rem; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white; font-family: var(--font-mono); font-size: 2.5rem;
        font-weight: 700; user-select: none;
        box-shadow: 0 0 0 1px var(--border), 0 0 0 3px var(--bg);
      `;
      placeholder.textContent = 'CH';
      placeholder.id = 'profile-placeholder';
      parent.appendChild(placeholder);
    });
  }

  // ─── Scroll to Top ───
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ─── Command Palette ───
  (function () {
    var IC = {
      about:      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      education:  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>',
      stack:      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>',
      experience: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>',
      projects:   '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
      github:     '<span class="cmd-icon-badge" style="background:#24292f;border-radius:50%"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></span>',
      linkedin:   '<span class="cmd-icon-badge" style="background:#0A66C2;border-radius:3px"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></span>',
      resume:     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',
      sun:        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 3v1"/><path d="M12 20v1"/><path d="M3 12h1"/><path d="M20 12h1"/><path d="m18.364 5.636-.707.707"/><path d="m6.343 17.657-.707.707"/><path d="m5.636 5.636.707.707"/><path d="m17.657 17.657.707.707"/></svg>',
      moon:       '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    };

    var ITEMS = [
      { group: 'Portfolio',     label: 'About',      type: 'scroll', target: '#about',      icon: IC.about },
      { group: 'Portfolio',     label: 'Education',  type: 'scroll', target: '#education',  icon: IC.education },
      { group: 'Portfolio',     label: 'Tech Stack', type: 'scroll', target: '#stack',      icon: IC.stack },
      { group: 'Portfolio',     label: 'Experience', type: 'scroll', target: '#experience', icon: IC.experience },
      { group: 'Portfolio',     label: 'Projects',   type: 'scroll', target: '#projects',   icon: IC.projects },
      { group: 'Social Links',  label: 'GitHub',     type: 'link',   target: 'https://github.com/Chirag6722',                   icon: IC.github },
      { group: 'Social Links',  label: 'LinkedIn',   type: 'link',   target: 'https://www.linkedin.com/in/chirag-honnyal/',     icon: IC.linkedin },
      { group: 'Social Links',  label: 'Resume',     type: 'link',   target: 'https://docs.google.com/document/d/1bZ-Hoa4_vsesUHWC6bQeD5pDpEnppvJviEWDiIQ5hxI/edit?usp=sharing', icon: IC.resume },
      { group: 'Theme',         label: 'Light',      type: 'theme',  target: 'light',       icon: IC.sun },
      { group: 'Theme',         label: 'Dark',       type: 'theme',  target: 'dark',        icon: IC.moon },
    ];

    var overlay      = document.getElementById('cmd-overlay');
    var cmdInput     = document.getElementById('cmd-input');
    var cmdList      = document.getElementById('cmd-list');
    var footerAction = document.getElementById('cmd-footer-action');
    var triggerBtn   = document.getElementById('cmd-trigger');
    var closeBtn     = document.getElementById('cmd-close-btn');

    if (!overlay || !cmdInput || !cmdList) return;

    var activeIdx = 0;
    var filtered  = [];

    function openCmd() {
      overlay.classList.add('open');
      cmdInput.value = '';
      activeIdx = 0;
      renderList('');
      setTimeout(function () { cmdInput.focus(); }, 30);
    }

    function closeCmd() {
      overlay.classList.remove('open');
    }

    function renderList(query) {
      var q = query.toLowerCase().trim();
      filtered = ITEMS.filter(function (item) {
        return !q || item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q);
      });
      if (activeIdx >= filtered.length) activeIdx = 0;

      cmdList.innerHTML = '';

      if (filtered.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'cmd-empty';
        empty.textContent = 'No results found.';
        cmdList.appendChild(empty);
        updateFooter();
        return;
      }

      var currentGroup = null;
      filtered.forEach(function (item, idx) {
        if (item.group !== currentGroup) {
          currentGroup = item.group;
          var lbl = document.createElement('div');
          lbl.className = 'cmd-group-label' + (currentGroup === filtered[0].group ? ' first-group' : '');
          lbl.textContent = item.group;
          cmdList.appendChild(lbl);
        }
        var div = document.createElement('div');
        div.className = 'cmd-item' + (idx === activeIdx ? ' active' : '');
        div.innerHTML = item.icon + '<span class="cmd-label">' + item.label + '</span>';
        div.addEventListener('mouseenter', (function (i) {
          return function () { activeIdx = i; updateActive(); };
        })(idx));
        div.addEventListener('click', (function (it) {
          return function () { execute(it); };
        })(item));
        cmdList.appendChild(div);
      });

      updateFooter();
    }

    function updateActive() {
      var els = cmdList.querySelectorAll('.cmd-item');
      els.forEach(function (el, i) { el.classList.toggle('active', i === activeIdx); });
      var activeEl = cmdList.querySelector('.cmd-item.active');
      if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
      updateFooter();
    }

    function updateFooter() {
      if (!footerAction) return;
      var item = filtered[activeIdx];
      if (!item) { footerAction.textContent = 'Select'; return; }
      if (item.type === 'link')        footerAction.textContent = 'Open Link';
      else if (item.type === 'theme')  footerAction.textContent = 'Set Theme';
      else                             footerAction.textContent = 'Go to Page';
    }

    function execute(item) {
      if (!item) return;
      if (item.type === 'scroll') {
        closeCmd();
        var el = document.querySelector(item.target);
        if (el) {
          var headerEl = document.getElementById('header');
          var offset = (headerEl ? headerEl.offsetHeight : 48) + 12;
          var y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      } else if (item.type === 'link') {
        closeCmd();
        window.open(item.target, '_blank', 'noopener,noreferrer');
      } else if (item.type === 'theme') {
        setTheme(item.target);
      }
    }

    if (triggerBtn) triggerBtn.addEventListener('click', openCmd);
    if (closeBtn)   closeBtn.addEventListener('click', closeCmd);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeCmd();
    });

    cmdInput.addEventListener('input', function (e) {
      activeIdx = 0;
      renderList(e.target.value);
    });

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        overlay.classList.contains('open') ? closeCmd() : openCmd();
        return;
      }
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') {
        e.preventDefault(); closeCmd();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, filtered.length - 1);
        updateActive();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
        updateActive();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        execute(filtered[activeIdx]);
      }
    });
  })();

})();
