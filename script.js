// ==========================================================================
// VIRAJ HOLDINGS CREATIVE & EFFICIENT PORTFOLIO SCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const scrollProgress = document.getElementById('scrollProgress');
  const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const counters = document.querySelectorAll('[data-count]');
  const businessCards = document.querySelectorAll('.business-card');
  const tabBtns = document.querySelectorAll('.tab-btn');

  // Modal Elements
  const modalOverlay = document.getElementById('quickModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCloseCta = document.getElementById('modalCloseCta');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalStat1 = document.getElementById('modalStat1');
  const modalStat2 = document.getElementById('modalStat2');
  const modalPageLink = document.getElementById('modalPageLink');

  // Business Modal Data Dictionary
  const businessDetails = {
    'agro-inputs': {
      badge: '🌾 Agriculture Division',
      title: 'Agro Inputs & Farmer Solutions',
      desc: 'Providing high-yielding hybrid seeds, balanced crop nutrition, plant protection products, and precision farming tools. Backed by direct buyback agreements that guarantee market access for farmers across South India.',
      stat1Title: 'High-Yield Seeds',
      stat1Desc: 'Superior genetic purity & resistance',
      stat2Title: 'Buyback Assurance',
      stat2Desc: 'Guaranteed market linkage for producers',
      link: 'agro-inputs.html'
    },
    'commodity-trading': {
      badge: '📦 Trade & Logistics',
      title: 'Agricultural Commodity Trading',
      desc: 'Connecting agricultural producers, grain mills, and global buyers. We manage multi-state procurement, real-time market risk analysis, quality verification, and efficient warehousing logistics.',
      stat1Title: 'Direct Procurement',
      stat1Desc: 'Sourced directly from farm origins',
      stat2Title: 'Quality Standardized',
      stat2Desc: 'Rigorous grading & laboratory testing',
      link: 'commodity-trading.html'
    },
    'agro-industries': {
      badge: '⚙️ Manufacturing Division',
      title: 'Modern Agro Processing Industries',
      desc: 'Operating modern cotton ginning mills, high-capacity seed processing plants, and temperature-controlled storage facilities. Transforming raw produce into premium industrial & commercial raw materials.',
      stat1Title: 'High-Tech Ginning',
      stat1Desc: 'State-of-the-art lint quality control',
      stat2Title: 'Warehousing Hubs',
      stat2Desc: 'Modern climate-safe storage facilities',
      link: 'agro-industries.html'
    },
    'export-import': {
      badge: '🌍 Global Trade',
      title: 'International Export & Import (EXIM)',
      desc: 'Bringing Indian agricultural excellence to 25+ global markets. Managing end-to-end international freight, phytosanitary certifications, trade documentation, and port logistics.',
      stat1Title: '25+ Countries',
      stat1Desc: 'Global supply network',
      stat2Title: 'EXIM Compliance',
      stat2Desc: 'Seamless customs & port clearance',
      link: 'export-import.html'
    },
    'fmcg': {
      badge: '🧴 Consumer Brands',
      title: 'Fast-Moving Consumer Goods (FMCG)',
      desc: 'Crafting pure, unadulterated consumer goods straight from our integrated agricultural ecosystem. Focused on nutrition, transparent sourcing, and authentic quality for modern households.',
      stat1Title: 'Farm-To-Fork',
      stat1Desc: 'Complete traceability & freshness',
      stat2Title: 'Pure Formulations',
      stat2Desc: 'Zero compromise on quality standards',
      link: 'fmcg.html'
    },
    'farms': {
      badge: '🌾 Sustainable Farming',
      title: 'Sustainable Farms & Cultivation',
      desc: 'Working side-by-side with thousands of smallholder and commercial farmers. Implementing eco-friendly soil practices, water-conserving irrigation, and continuous agronomic guidance.',
      stat1Title: 'Direct Impact',
      stat1Desc: 'Empowering local farming communities',
      stat2Title: 'Eco Cultivation',
      stat2Desc: 'Sustainable post-harvest practices',
      link: 'agro-inputs.html'
    }
  };

  // 1. Header & Scroll Progress
  const updateScrollState = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > 24) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (scrollProgress && docHeight > 0) {
      const progress = (scrollY / docHeight) * 100;
      scrollProgress.style.width = `${progress}%`;
    }
  };

  window.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();

  // 2. Nav Toggle & Dropdown
  const toggleMenu = () => {
    const open = navLinks?.classList.toggle('open');
    navToggle?.setAttribute('aria-expanded', String(open));
  };

  const closeDropdown = () => {
    dropdownToggle?.classList.remove('active');
    dropdownToggle?.setAttribute('aria-expanded', 'false');
    dropdownMenu?.classList.remove('open');
  };

  const toggleDropdown = () => {
    const expanded = dropdownToggle?.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeDropdown();
    } else {
      dropdownToggle?.classList.add('active');
      dropdownToggle?.setAttribute('aria-expanded', 'true');
      dropdownMenu?.classList.add('open');
    }
  };

  navToggle?.addEventListener('click', toggleMenu);
  dropdownToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      closeDropdown();
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target && typeof e.target.closest === 'function' && !e.target.closest('.nav-dropdown')) {
      closeDropdown();
    }
  });

  // 3. Scroll Reveal via IntersectionObserver
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealItems.forEach((item) => revealObserver.observe(item));

  // 4. Counter Animation Observer
  let countersAnimated = false;
  const animateCounters = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute('data-count')) || 0;
      const duration = 1600;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out
        const value = Math.floor(easeProgress * target);
        counter.textContent = `${value}+`;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = `${target}+`;
        }
      };

      requestAnimationFrame(step);
    });
  };

  const counterSection = document.querySelector('.hero-stats');
  if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
      }
    }, { threshold: 0.5 });
    counterObserver.observe(counterSection);
  }

  // 5. Business Category Tabs Filter
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      businessCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px) scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });

  // 6. Business Quick View Glass Modal
  const openModal = (key) => {
    const data = businessDetails[key];
    if (!data) return;

    if (modalBadge) modalBadge.textContent = data.badge;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;
    if (modalStat1) modalStat1.textContent = data.stat1Title;
    if (modalStat2) modalStat2.textContent = data.stat2Title;
    if (modalPageLink) modalPageLink.href = data.link;

    modalOverlay?.classList.add('open');
    modalOverlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay?.classList.remove('open');
    modalOverlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.quick-preview-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalCloseCta?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('open')) {
      closeModal();
    }
  });

  // 7. Business Card Navigation Click
  businessCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target && typeof e.target.closest === 'function' && e.target.closest('.quick-preview-btn')) return;
      const href = card.getAttribute('data-href');
      if (href) window.location.href = href;
    });
  });

  // 8. 3D Hover Parallax Effect on Hero Visual & Cards
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroVisual.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      heroVisual.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
  }

  // 9. 3D Infinity Ecosystem Loop Controller
  const infinityContainer = document.getElementById('infinityLoopShowcase');
  const loopNodes = document.querySelectorAll('.loop-node');
  const loopStageTag = document.getElementById('loopStageTag');
  const loopScrubber = document.getElementById('loopScrubber');
  const loopCaptionSub = document.getElementById('loopCaptionSub');
  const playLoopBtn = document.getElementById('playLoopVideoBtn');

  const stageData = [
    { tag: 'STAGE 1: AGRO INPUTS', sub: 'Quality Seeds & Crop Agronomy', modal: 'agro-inputs' },
    { tag: 'STAGE 2: AGRO PROCESSING', sub: 'Processing & Cotton Ginning Mills', modal: 'agro-industries' },
    { tag: 'STAGE 3: COMMODITY TRADING', sub: 'Direct Farm Sourcing & Logistics', modal: 'commodity-trading' },
    { tag: 'STAGE 4: GLOBAL EXIM', sub: 'Export to 25+ Global Destinations', modal: 'export-import' },
    { tag: 'STAGE 5: FMCG BRANDS', sub: 'Farm-to-Table Consumer Products', modal: 'fmcg' }
  ];

  let currentLoopStage = 0;
  let loopProgress = 0;
  let isLoopPaused = false;

  const setLoopStage = (index) => {
    currentLoopStage = index;
    const data = stageData[index];
    if (!data) return;

    loopNodes.forEach((node, idx) => {
      if (idx === index) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    if (loopStageTag) loopStageTag.textContent = data.tag;
    if (loopCaptionSub) loopCaptionSub.textContent = data.sub;
  };

  // Exact 5-Second Total Cycle across all 5 stages (1 sec per stage)
  setInterval(() => {
    if (isLoopPaused) return;

    loopProgress += 2; // +2% every 100ms = 100% in 5.0 seconds
    if (loopScrubber) loopScrubber.style.width = `${loopProgress}%`;

    // Calculate stage based on 20% increments (5 stages total)
    const newStageIndex = Math.min(Math.floor(loopProgress / 20), stageData.length - 1);
    if (newStageIndex !== currentLoopStage && newStageIndex >= 0) {
      setLoopStage(newStageIndex);
    }

    if (loopProgress >= 100) {
      loopProgress = 0;
      setLoopStage(0);
    }
  }, 100);

  // Node Click Handlers
  loopNodes.forEach((node, idx) => {
    node.addEventListener('click', (e) => {
      e.stopPropagation();
      setLoopStage(idx);
      loopProgress = 0;
      const data = stageData[idx];
      if (data && typeof openModal === 'function') {
        openModal(data.modal);
      }
    });
  });

  // Play/Spin Center Button Click
  if (playLoopBtn) {
    playLoopBtn.addEventListener('click', () => {
      isLoopPaused = !isLoopPaused;
      const iconSpan = playLoopBtn.querySelector('.play-icon');
      if (iconSpan) {
        iconSpan.textContent = isLoopPaused ? '▶' : '🔄';
      }
    });
  }

  // 3D Parallax Tilt Effect on Infinity Loop Container
  if (infinityContainer) {
    infinityContainer.addEventListener('mousemove', (e) => {
      const rect = infinityContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      infinityContainer.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${y * -12}deg) translateY(-4px)`;
    });

    infinityContainer.addEventListener('mouseleave', () => {
      infinityContainer.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  }

  // 10. Back to Top Button Controller
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 320) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 11. Theme Mode Switcher (Dark / Glass Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('viraj_theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('viraj_theme', isDark ? 'dark' : 'light');
  });

  // 12. Interactive Ecosystem Calculator & Sourcing Simulator
  const landSlider = document.getElementById('landSlider');
  const tonnesSlider = document.getElementById('tonnesSlider');
  const regionSelect = document.getElementById('regionSelect');

  const landVal = document.getElementById('landVal');
  const tonnesVal = document.getElementById('tonnesVal');

  const farmersCalc = document.getElementById('farmersCalc');
  const yieldCalc = document.getElementById('yieldCalc');
  const valueCalc = document.getElementById('valueCalc');
  const purityCalc = document.getElementById('purityCalc');

  const updateSimulator = () => {
    if (!landSlider || !tonnesSlider || !regionSelect) return;

    const land = Number(landSlider.value);
    const tonnes = Number(tonnesSlider.value);
    const mult = Number(regionSelect.value) || 1.4;

    if (landVal) landVal.textContent = `${land.toLocaleString()} Hectares`;
    if (tonnesVal) tonnesVal.textContent = `${tonnes.toLocaleString()} Metric Tonnes`;

    const farmers = Math.floor(land * 2.5);
    const yieldBoost = Math.min(25 + Math.floor(land / 140), 52);
    const totalValCr = ((tonnes * 1.42 * mult) / 100).toFixed(1);
    const purity = (99.2 + Math.min(tonnes / 25000, 0.7)).toFixed(1);

    if (farmersCalc) farmersCalc.textContent = `${farmers.toLocaleString()}`;
    if (yieldCalc) yieldCalc.textContent = `+${yieldBoost}%`;
    if (valueCalc) valueCalc.textContent = `₹ ${totalValCr} Cr`;
    if (purityCalc) purityCalc.textContent = `${purity}%`;
  };

  if (landSlider && tonnesSlider && regionSelect) {
    landSlider.addEventListener('input', updateSimulator);
    tonnesSlider.addEventListener('input', updateSimulator);
    regionSelect.addEventListener('change', updateSimulator);
    updateSimulator();
  }
});
