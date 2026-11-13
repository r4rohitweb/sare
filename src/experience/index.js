import { createExperienceScope } from './lifecycle.js';

/** Initialize the existing scroll, media, catalogue and canvas interactions after React commits. */
export function initializeExperience(root) {
  const scope = createExperienceScope(root);
  const { listen, setTimeout, clearTimeout, setInterval, clearInterval,
    requestAnimationFrame, cancelAnimationFrame,
    IntersectionObserver, MutationObserver, ResizeObserver } = scope;
  try {
    // ---- script.js ----
    const intro = document.querySelector('.curtain-intro');
    const skipIntro = document.querySelector('.skip-intro');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.documentElement.classList.add('motion-ready');
    let introTimer;
    let entranceAnimations = [];
    function revealHero() {
      entranceAnimations.forEach(animation => animation.cancel());
      if (motionPreference.matches) return;
      const elements = [...document.querySelector('.hero-content').children];
      entranceAnimations = elements.map((element, index) => scope.animate(element, [{
        opacity: 0,
        transform: 'translateY(34px)',
        filter: 'blur(5px)'
      }, {
        opacity: 1,
        transform: 'translateY(0)',
        filter: 'blur(0)'
      }], {
        duration: 900,
        delay: index * 130,
        easing: 'cubic-bezier(.2,.7,.25,1)',
        fill: 'backwards'
      }));
    }
    function finishIntro() {
      const wasPlaying = !document.body.classList.contains('intro-done');
      document.body.classList.add('intro-done');
      document.body.classList.remove('intro-playing');
      clearTimeout(introTimer);
      if (wasPlaying) revealHero();
    }
    function replayIntro() {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      });
      document.body.classList.remove('intro-done');
      document.body.classList.add('intro-playing');
      if (motionPreference.matches) {
        finishIntro();
        return;
      }
      for (const animation of intro.getAnimations({
        subtree: true
      })) {
        animation.cancel();
        animation.play();
      }
      for (const animation of skipIntro.getAnimations()) {
        animation.cancel();
        animation.play();
      }
      clearTimeout(introTimer);
      introTimer = setTimeout(finishIntro, 2300);
    }
    listen(skipIntro, 'click', finishIntro);
    listen(document.querySelector('.sound-toggle'), 'click', replayIntro);
    if (motionPreference.matches || window.location.hash) {
      finishIntro();
    } else {
      document.body.classList.add('intro-playing');
      introTimer = setTimeout(finishIntro, 2300);
    }
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    function closeMenu() {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      mobileNav.hidden = true;
    }
    listen(menuToggle, 'click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mobileNav.hidden = !open;
    });
    listen(document, 'click', event => {
      if (!event.target.closest('.site-header')) closeMenu();
    });
    listen(document, 'keydown', event => {
      if (event.key === 'Escape') {
        if (!mobileNav.hidden) {
          closeMenu();
          menuToggle.focus();
        }
        hideNotice();
        finishIntro();
      }
    });
    mobileNav.querySelectorAll('a').forEach(link => listen(link, 'click', closeMenu));
    listen(window.matchMedia('(min-width: 851px)'), 'change', event => {
      if (event.matches) closeMenu();
    });
    const notice = document.querySelector('.notice');
    let noticeTimer;
    function hideNotice() {
      notice.classList.remove('visible');
    }
    function showNotice(message) {
      clearTimeout(noticeTimer);
      notice.querySelector('span').textContent = message;
      notice.classList.add('visible');
      noticeTimer = setTimeout(hideNotice, 4500);
    }
    listen(notice.querySelector('button'), 'click', hideNotice);
    document.querySelectorAll('[data-notice]').forEach(button => {
      if (!button.matches('.shopping-bag,.wishlist')) listen(button, 'click', () => showNotice(button.dataset.notice));
    });
    document.querySelectorAll('[data-collection]').forEach(link => {
      listen(link, 'click', event => {
        const destination = document.querySelector(link.getAttribute('href'));
        if (!destination) {
          event.preventDefault();
          showNotice(`${link.dataset.collection} — collection coming soon.`);
        }
      });
    });
    const moods = [{
      title: 'Wedding Edit',
      description: 'For the vows, the rituals, and the moments you keep forever. Rich reds and luminous gold bring a timeless bridal story to life.'
    }, {
      title: 'Kanchipuram Icons',
      description: 'Temple-inspired borders. Vivid colour pairings. A celebration of the unmistakable character of Kanchipuram silk.'
    }, {
      title: 'Banarasi Heirlooms',
      description: 'Ornate brocade and jewel-toned drapes, inspired by the enduring beauty of Banarasi weaving. Elegance that feels like a treasured memory.'
    }, {
      title: 'Festive Radiance',
      description: 'Golden afternoons, marigold mornings, and celebrations that last into the night. A little colour for every joyful occasion.'
    }, {
      title: 'Zari Stories',
      description: 'Quiet drama, deep hues, and the glimmer of gold. Discover the beauty of a border, a motif, a detail that catches the light.'
    }, {
      title: 'Sacred Silks',
      description: 'Leaf greens and rich temple tones, inspired by moments of devotion. Graceful drapes for the traditions close to your heart.'
    }];
    const collectionDialog = document.querySelector('.collection-dialog');
    let collectionTrigger;
    document.querySelectorAll('[data-mood]').forEach(card => {
      listen(card, 'click', () => {
        const index = Number(card.dataset.mood);
        const mood = moods[index];
        const image = card.querySelector('img');
        collectionTrigger = card;
        collectionDialog.querySelector('img').src = image.getAttribute('src');
        collectionDialog.querySelector('img').alt = image.alt;
        collectionDialog.querySelector('#collection-title').textContent = mood.title;
        collectionDialog.querySelector('#collection-description').textContent = mood.description;
        collectionDialog.querySelector('.collection-number').textContent = `${String(index + 1).padStart(2, '0')} / 06`;
        collectionDialog.showModal();
        document.body.style.overflow = 'hidden';
      });
    });
    function closeCollection() {
      collectionDialog.close();
    }
    listen(collectionDialog.querySelector('.collection-close'), 'click', closeCollection);
    listen(collectionDialog.querySelector('.collection-back'), 'click', closeCollection);
    listen(collectionDialog, 'click', event => {
      if (event.target !== collectionDialog) return;
      const bounds = collectionDialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeCollection();
    });
    listen(collectionDialog, 'close', () => {
      document.body.style.overflow = '';
      collectionTrigger?.focus({
        preventScroll: true
      });
    });
    const moodGallery = document.querySelector('.mood-gallery');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    function updateGalleryControls() {
      galleryPrev.disabled = moodGallery.scrollLeft <= 2;
      galleryNext.disabled = moodGallery.scrollLeft + moodGallery.clientWidth >= moodGallery.scrollWidth - 2;
    }
    function moveGallery(direction) {
      const distance = moodGallery.querySelector('.mood-card').getBoundingClientRect().width + parseFloat(getComputedStyle(moodGallery).gap);
      moodGallery.scrollBy({
        left: distance * direction,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      });
    }
    listen(galleryPrev, 'click', () => moveGallery(-1));
    listen(galleryNext, 'click', () => moveGallery(1));
    listen(moodGallery, 'scroll', updateGalleryControls, {
      passive: true
    });
    listen(window, 'resize', updateGalleryControls);
    updateGalleryControls();
    
    // Native scrolling drives the pinned showroom journey. Keep wheel, touch,
    // keyboard and hash navigation native; update only visual transforms per frame.
    const heroJourney = document.querySelector('.hero-journey');
    const heroImage = document.querySelector('.hero-image');
    const heroWalkScene = document.querySelector('.hero-walk-scene');
    const heroWalkVideo = document.querySelector('.hero-walk-video');
    let heroWalkLoaded = false;
    let heroWalkReady = false;
    let heroWalkTargetTime = 0;
    const heroWalkFPS = 24;
    const seatedScene = document.querySelector('.hero-seated-scene');
    const seatedImage = document.querySelector('.hero-seated-image');
    const heroContent = document.querySelector('.hero-content');
    const heroCue = document.querySelector('.hero-scroll-cue');
    const heroProgress = document.querySelector('.hero-scroll-progress span');
    const heroStories = [...document.querySelectorAll('.hero-story')];
    const clamp = value => Math.max(0, Math.min(1, value));
    let journeyTop = 0;
    let journeyDistance = 1;
    let scrollFrame = 0;
    let heroRenderedProgress = null;
    let heroLastRenderTime = 0;
    function loadHeroWalk() {
      if (heroWalkLoaded || motionPreference.matches) return;
      heroWalkLoaded = true;
      heroWalkVideo.muted = true;
      heroWalkVideo.querySelectorAll('source[data-src]').forEach(source => source.src = source.dataset.src);
      heroWalkVideo.preload = 'auto';
      heroWalkVideo.load();
    }
    function seekHeroWalk() {
      if (!heroWalkReady || heroWalkVideo.seeking || motionPreference.matches) return;
      if (Math.abs(heroWalkVideo.currentTime - heroWalkTargetTime) > 1 / (heroWalkFPS * 2)) {
        heroWalkVideo.currentTime = heroWalkTargetTime;
      }
    }
    listen(heroWalkVideo, 'loadeddata', () => {
      heroWalkReady = true;
      document.querySelector('.hero').classList.add('has-walk-sequence');
      requestMotionFrame();
    });
    // Finish the pending seek before using the latest scroll target. This avoids
    // piling up decoder work when the user scrolls quickly or changes direction.
    listen(heroWalkVideo, 'seeked', seekHeroWalk);
    listen(heroWalkVideo, 'error', () => {
      heroWalkReady = false;
      document.querySelector('.hero').classList.remove('has-walk-sequence');
      requestMotionFrame();
    });
    function renderHeroWalk(sequenceProgress) {
      if (!Number.isFinite(heroWalkVideo.duration)) return;
      const lastFrame = Math.max(0, Math.floor(heroWalkVideo.duration * heroWalkFPS - .001));
      heroWalkTargetTime = Math.round(sequenceProgress * lastFrame) / heroWalkFPS;
      seekHeroWalk();
    }
    function measureJourney() {
      journeyTop = heroJourney.getBoundingClientRect().top + window.scrollY;
      journeyDistance = Math.max(1, heroJourney.offsetHeight - document.querySelector('.hero').offsetHeight);
      requestMotionFrame();
    }
    function updateScrollScene(timestamp) {
      scrollFrame = 0;
      const reduced = motionPreference.matches;
      const targetProgress = reduced ? 0 : clamp((window.scrollY - journeyTop) / journeyDistance);
      const heroOnScreen = window.scrollY < journeyTop + heroJourney.offsetHeight && window.scrollY + window.innerHeight > journeyTop;
      const elapsed = heroLastRenderTime ? Math.min(64, Math.max(0, timestamp - heroLastRenderTime)) : 16.67;
      heroLastRenderTime = timestamp;
      // Smooth the artwork only; page scrolling, keyboard and touch stay native.
      if (heroRenderedProgress === null || reduced || !heroOnScreen || targetProgress === 0) {
        heroRenderedProgress = targetProgress;
      } else {
        heroRenderedProgress += (targetProgress - heroRenderedProgress) * (1 - Math.exp(-elapsed / 100));
        if (Math.abs(targetProgress - heroRenderedProgress) < .0001) heroRenderedProgress = targetProgress;
      }
      const progress = heroRenderedProgress;
      if (!reduced && heroOnScreen && (progress > .06 || !window.location.hash || window.location.hash === '#home')) loadHeroWalk();
      const hasSequence = heroWalkReady && !reduced;
      const sequenceBlend = hasSequence && progress >= .18 ? 1 : 0;
      document.querySelector('.hero').style.setProperty('--hero-walk-blend', String(sequenceBlend));
      heroWalkScene.style.opacity = String(sequenceBlend);
      heroWalkScene.setAttribute('aria-hidden', String(sequenceBlend < .5));
      if (hasSequence && heroOnScreen) renderHeroWalk(clamp((progress - .19) / .75));
      heroImage.style.transform = `translate3d(${-progress * 2.5}%, ${progress * 3}%, 0) scale(${1 + progress * .66})`;
      const sceneTransition = clamp((progress - .64) / .19);
      const sceneBlend = sceneTransition * sceneTransition * (3 - 2 * sceneTransition);
      const seatedProgress = clamp((progress - .64) / .36);
      seatedScene.style.opacity = String(hasSequence ? 0 : sceneBlend);
      seatedImage.style.transform = `scale(${1 + seatedProgress * .12}) translate3d(0, ${-seatedProgress * 1.3}%, 0)`;
      seatedScene.setAttribute('aria-hidden', String(hasSequence || sceneBlend < .5));
      heroImage.setAttribute('aria-hidden', String(hasSequence ? sequenceBlend >= .5 : sceneBlend >= .5));
      const introVisibility = 1 - clamp(progress / .16);
      heroContent.style.opacity = String(introVisibility);
      heroContent.style.transform = `translate3d(0, ${-progress * 160}px, 0)`;
      heroContent.inert = introVisibility < .05;
      heroCue.style.opacity = String(1 - clamp(progress / .07));
      heroCue.inert = progress > .07;
      heroProgress.style.transform = `scaleX(${progress})`;
      const beats = [[.14, .28, .44, .53], [.43, .56, .65, .73], [.65, .74, .80, .88], [.82, .90, 1, 1.12]];
      heroStories.forEach((story, index) => {
        const [start, full, exit, end] = beats[index];
        const incoming = clamp((progress - start) / (full - start));
        const outgoing = clamp((progress - exit) / (end - exit));
        // The supplied video has no story text; keep captions native and crisp.
        const captionBlend = 1;
        const visibility = reduced ? 0 : incoming * (1 - outgoing) * captionBlend;
        story.style.opacity = String(visibility);
        story.style.transform = `translate3d(0, ${(1 - incoming) * 35 - outgoing * 25}px, 0)`;
        story.setAttribute('aria-hidden', String(visibility < .5));
      });
      if (heroRenderedProgress !== targetProgress) requestMotionFrame();
    }
    function requestMotionFrame() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollScene);
    }
    listen(window, 'scroll', requestMotionFrame, {
      passive: true
    });
    listen(window, 'resize', measureJourney);
    listen(window, 'load', measureJourney);
    measureJourney();
    
    // Reveal the heading first, then each arch as it enters the viewport. Individual
    // observers also reveal offscreen cards when the mobile row is swiped.
    const revealElements = [document.querySelector('.archive-heading > div'), document.querySelector('.archive-intro'), ...document.querySelectorAll('.mood-card'), document.querySelector('.archive-bottom'), document.querySelector('.look-heading'), document.querySelector('.look-runway'), document.querySelector('.look-details'), document.querySelector('.silk-heading'), document.querySelector('.silk-footer'), document.querySelector('.rack-heading'), document.querySelector('.rack-filters'), document.querySelector('.rack-stage'), document.querySelector('.rack-footer'), document.querySelector('.muse-heading'), document.querySelector('.muse-side-left'), document.querySelector('.muse-centre'), document.querySelector('.muse-side-right'), document.querySelector('.muse-footer'), document.querySelector('.motion-heading'), document.querySelector('.motion-manifesto'), document.querySelector('.motion-footer'), document.querySelector('.festive-heading'), document.querySelector('.festive-ribbon'), document.querySelector('.festive-footer'), document.querySelector('.bridal-heading'), document.querySelector('.bridal-selection'), document.querySelector('.bridal-footer'), document.querySelector('.weave-heading'), document.querySelector('.weave-composer'), document.querySelector('.weave-footer'), document.querySelector('.footer-invitation'), document.querySelector('.footer-columns'), document.querySelector('.footer-wordmark')];
    let revealObserver;
    function setupReveals() {
      revealObserver?.disconnect();
      revealElements.forEach(element => element.classList.remove('reveal-pending', 'is-revealed'));
      if (motionPreference.matches || !('IntersectionObserver' in window)) return;
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          entry.target.classList.remove('reveal-pending');
          revealObserver.unobserve(entry.target);
        });
      }, {
        threshold: .12,
        rootMargin: '0px 0px -24px 0px'
      });
      revealElements.forEach((element, index) => {
        element.classList.add('reveal-pending');
        element.style.setProperty('--reveal-delay', `${index > 1 && index < 8 ? (index - 2) * 90 : 0}ms`);
        if (element.classList.contains('look-runway')) element.style.setProperty('--reveal-delay', '120ms');
        if (element.classList.contains('look-details')) element.style.setProperty('--reveal-delay', '240ms');
        if (element.classList.contains('muse-side')) element.style.setProperty('--reveal-delay', '170ms');
        if (element.classList.contains('muse-centre')) element.style.setProperty('--reveal-delay', '80ms');
        revealObserver.observe(element);
      });
    }
    setupReveals();
    listen(motionPreference, 'change', () => {
      finishIntro();
      setupReveals();
      measureJourney();
    });
    
    // Try the Look: eight full-length silhouettes share one animated runway.
    const looks = [{
      name: 'Temple Teal',
      silk: '#158f91',
      blouse: '#d52c63',
      saree: 'Teal Kanjivaram silk',
      blouseName: 'Pink silk blouse',
      description: 'Luminous teal silk with a broad gold border and a contrasting pink blouse.',
      image: 'assets/look-teal.webp'
    }, {
      name: 'Rose & Gold',
      silk: '#dc2369',
      blouse: '#263760',
      saree: 'Rose pink Kanjivaram',
      blouseName: 'Navy silk blouse',
      description: 'Vivid rose pink, a navy contrast, and a sweeping golden pallu.',
      image: 'assets/look-pink.webp'
    }, {
      name: 'Royal Blue',
      silk: '#3339bb',
      blouse: '#d52c72',
      saree: 'Royal blue Kanjivaram',
      blouseName: 'Magenta silk blouse',
      description: 'Royal blue silk with bright magenta accents and a broad gold border.',
      image: 'assets/look-blue.webp'
    }, {
      name: 'Violet Heirloom',
      silk: '#6c3882',
      blouse: '#b99a4b',
      saree: 'Purple brocade silk',
      blouseName: 'Gold silk blouse',
      description: 'Deep violet silk, intricate gold brocade, and a luminous gold blouse.',
      image: 'assets/look-purple.webp'
    }, {
      name: 'Emerald Grace',
      silk: '#24734f',
      blouse: '#ce9e31',
      saree: 'Emerald green silk',
      blouseName: 'Mustard silk blouse',
      description: 'Emerald green silk balanced with warm mustard and traditional gold accents.',
      image: 'assets/look-green.webp'
    }, {
      name: 'Marigold Flame',
      silk: '#e67720',
      blouse: '#237e85',
      saree: 'Orange Kanjivaram silk',
      blouseName: 'Teal silk blouse',
      description: 'Brilliant marigold orange silk with a cool teal contrast and golden zari.',
      image: 'assets/look-orange.webp'
    }, {
      name: 'Golden Hour',
      silk: '#d7ac2f',
      blouse: '#8b2945',
      saree: 'Mustard yellow silk',
      blouseName: 'Maroon silk blouse',
      description: 'Sunlit mustard silk paired with maroon for a rich, festive colour story.',
      image: 'assets/look-yellow.webp'
    }, {
      name: 'Ruby Tradition',
      silk: '#922642',
      blouse: '#286b53',
      saree: 'Maroon temple-border silk',
      blouseName: 'Emerald silk blouse',
      description: 'Deep ruby silk with an emerald blouse and a striking gold temple border.',
      image: 'assets/look-maroon.webp'
    }];
    const tryLook = document.querySelector('.try-look');
    const lookStage = document.querySelector('.look-stage');
    const lookModels = [...document.querySelectorAll('.look-model')];
    const lookDots = document.querySelector('.look-dots');
    const lookPause = document.querySelector('.look-pause');
    let selectedLook = 0;
    let rotationTimer;
    let rotationPaused = false;
    let lookInView = false;
    let pointerOverRunway = false;
    let focusInRunway = false;
    const lookRunway = document.querySelector('.look-runway');
    const dotButtons = looks.map((look, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Show ${look.name}`);
      listen(button, 'click', () => selectLook(index));
      lookDots.append(button);
      return button;
    });
    function refreshRotation() {
      clearInterval(rotationTimer);
      if (rotationPaused || !lookInView || pointerOverRunway || focusInRunway || motionPreference.matches || document.hidden || document.querySelector('dialog[open]')) return;
      rotationTimer = setInterval(() => selectLook(selectedLook + 1, false), 5500);
    }
    function selectLook(index, announce = true) {
      selectedLook = (index + looks.length) % looks.length;
      const look = looks[selectedLook];
      lookModels.forEach((model, i) => {
        let slot = (i - selectedLook + looks.length) % looks.length;
        if (slot > looks.length / 2) slot -= looks.length;
        const distance = Math.abs(slot);
        model.style.setProperty('--slot', slot);
        model.style.setProperty('--model-scale', String(Math.max(.55, 1 - distance * .15)));
        model.style.setProperty('--model-opacity', distance > 2 ? '0' : distance === 2 ? '.46' : distance === 1 ? '.85' : '1');
        model.style.setProperty('--model-blur', distance > 1 ? '1.3px' : '0px');
        model.style.setProperty('--model-layer', String(10 - distance));
        model.classList.toggle('is-selected', i === selectedLook);
        model.setAttribute('aria-pressed', String(i === selectedLook));
        model.setAttribute('aria-hidden', String(distance > 2));
        model.tabIndex = distance > 2 ? -1 : 0;
        dotButtons[i].setAttribute('aria-pressed', String(i === selectedLook));
      });
      tryLook.style.setProperty('--look-silk', look.silk);
      tryLook.style.setProperty('--look-blouse', look.blouse);
      document.querySelector('#selected-look-title').textContent = look.name;
      document.querySelector('.piece-saree-name').textContent = look.saree;
      document.querySelector('.piece-blouse-name').textContent = look.blouseName;
      document.querySelector('.piece-saree-description').textContent = look.description;
      document.querySelector('.look-counter').textContent = `${String(selectedLook + 1).padStart(2, '0')} / 08`;
      document.querySelectorAll('.look-piece[open]').forEach(piece => piece.open = false);
      if (announce) document.querySelector('.look-live-status').textContent = `${look.name}. Look ${selectedLook + 1} of 8. Six coordinated pieces.`;
      updateAddLookButton();
      refreshRotation();
    }
    lookModels.forEach((model, index) => listen(model, 'click', () => selectLook(index)));
    listen(document.querySelector('.look-prev'), 'click', () => selectLook(selectedLook - 1));
    listen(document.querySelector('.look-next'), 'click', () => selectLook(selectedLook + 1));
    listen(lookStage, 'keydown', event => {
      const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      selectLook(event.key === 'Home' ? 0 : event.key === 'End' ? looks.length - 1 : selectedLook + (event.key === 'ArrowRight' ? 1 : -1));
    });
    listen(lookPause, 'click', () => {
      rotationPaused = !rotationPaused;
      if (!rotationPaused) {
        pointerOverRunway = false;
        focusInRunway = false;
      }
      lookPause.setAttribute('aria-pressed', String(rotationPaused));
      lookPause.setAttribute('aria-label', rotationPaused ? 'Play automatic look rotation' : 'Pause automatic look rotation');
      lookPause.querySelector('span').textContent = rotationPaused ? '▷' : 'Ⅱ';
      refreshRotation();
    });
    listen(lookRunway, 'pointerenter', event => {
      if (event.pointerType === 'mouse') {
        pointerOverRunway = true;
        refreshRotation();
      }
    });
    listen(lookRunway, 'pointerleave', () => {
      pointerOverRunway = false;
      refreshRotation();
    });
    listen(tryLook, 'focusin', () => {
      focusInRunway = true;
      refreshRotation();
    });
    listen(tryLook, 'focusout', event => {
      focusInRunway = tryLook.contains(event.relatedTarget);
      refreshRotation();
    });
    listen(document.querySelector('.look-details'), 'pointerenter', event => {
      if (event.pointerType === 'mouse') {
        pointerOverRunway = true;
        refreshRotation();
      }
    });
    listen(document.querySelector('.look-details'), 'pointerleave', () => {
      pointerOverRunway = false;
      refreshRotation();
    });
    listen(document, 'visibilitychange', refreshRotation);
    listen(motionPreference, 'change', refreshRotation);
    let swipeStart;
    let ignoreSwipeClick = false;
    listen(lookStage, 'pointerdown', event => {
      swipeStart = {
        x: event.clientX,
        y: event.clientY
      };
    });
    listen(lookStage, 'pointercancel', () => {
      swipeStart = null;
    });
    listen(lookStage, 'pointerup', event => {
      if (!swipeStart) return;
      const dx = event.clientX - swipeStart.x;
      const dy = event.clientY - swipeStart.y;
      swipeStart = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        selectLook(selectedLook + (dx < 0 ? 1 : -1));
        ignoreSwipeClick = true;
        setTimeout(() => ignoreSwipeClick = false, 100);
      }
    });
    listen(lookStage, 'click', event => {
      if (ignoreSwipeClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        lookInView = entries[0].isIntersecting;
        refreshRotation();
      }, {
        threshold: .15
      }).observe(tryLook);
    }
    
    // Local look selections are style references, with no checkout or invented prices.
    const bagStorageKey = 'noolam-look-bag-v1';
    let savedLooks = [];
    let savedSilks = [];
    try {
      const stored = JSON.parse(localStorage.getItem(bagStorageKey) || '[]');
      if (Array.isArray(stored)) savedLooks = [...new Set(stored.filter(index => Number.isInteger(index) && index >= 0 && index < looks.length))];
    } catch {/* Browsing and bag controls work when storage is unavailable. */}
    try {
      const stored = JSON.parse(localStorage.getItem('noolam-silk-bag-v1') || '[]');
      if (Array.isArray(stored)) savedSilks = [...new Set(stored.filter(index => Number.isInteger(index) && index >= 0 && index < 32))];
    } catch {/* Keep silk selections in memory if storage is unavailable. */}
    const addLookButton = document.querySelector('.add-look-button');
    const bagButton = document.querySelector('.shopping-bag');
    const bagDialog = document.querySelector('.look-bag-dialog');
    const bagCount = document.createElement('span');
    bagCount.className = 'bag-count';
    bagCount.setAttribute('aria-hidden', 'true');
    bagButton.append(bagCount);
    function updateAddLookButton() {
      if (!addLookButton) return;
      const saved = savedLooks.includes(selectedLook);
      addLookButton.firstChild.textContent = saved ? 'Look added to bag ' : 'Add look to bag ';
      addLookButton.setAttribute('aria-label', saved ? `${looks[selectedLook].name} is in your bag` : `Add ${looks[selectedLook].name} look to bag`);
    }
    function persistLookBag() {
      try {
        localStorage.setItem(bagStorageKey, JSON.stringify(savedLooks));
        localStorage.setItem('noolam-silk-bag-v1', JSON.stringify(savedSilks));
      } catch {/* Keep selections in memory. */}
      const count = savedLooks.length + savedSilks.length;
      bagCount.textContent = String(count);
      bagCount.hidden = !count;
      bagButton.setAttribute('aria-label', savedSilks.length ? `Shopping bag, ${count} ${count === 1 ? 'selection' : 'selections'}` : `Shopping bag, ${count} ${count === 1 ? 'look' : 'looks'}`);
      updateAddLookButton();
    }
    listen(addLookButton, 'click', () => {
      if (!savedLooks.includes(selectedLook)) {
        savedLooks.push(selectedLook);
        persistLookBag();
      }
      showNotice(`${looks[selectedLook].name} — six-piece look saved to your bag.`);
    });
    function renderLookBag() {
      const items = bagDialog.querySelector('.look-bag-items');
      items.replaceChildren();
      if (!savedLooks.length && !savedSilks.length) {
        const empty = document.createElement('p');
        empty.className = 'look-bag-empty';
        empty.textContent = 'Your next favourite look is waiting on the runway.';
        items.append(empty);
        return;
      }
      savedLooks.forEach(index => {
        const look = looks[index];
        const row = document.createElement('div');
        row.className = 'look-bag-item';
        const image = document.createElement('img');
        image.src = look.image;
        image.alt = look.name;
        image.width = 48;
        image.height = 85;
        const copy = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = look.name;
        const note = document.createElement('p');
        note.textContent = 'Six coordinated pieces · style selection';
        copy.append(title, note);
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Remove';
        remove.setAttribute('aria-label', `Remove ${look.name} from bag`);
        listen(remove, 'click', () => {
          const position = savedLooks.indexOf(index);
          savedLooks = savedLooks.filter(item => item !== index);
          persistLookBag();
          renderLookBag();
          const remaining = items.querySelectorAll('button');
          if (remaining.length) remaining[Math.min(position, remaining.length - 1)].focus();else bagDialog.querySelector('.look-bag-continue').focus();
        });
        row.append(image, copy, remove);
        items.append(row);
      });
      savedSilks.forEach(index => {
        const silk = silks[index];
        const row = document.createElement('div');
        row.className = 'look-bag-item';
        const image = document.createElement('img');
        image.src = silk.image;
        image.alt = silk.name;
        image.width = 48;
        image.height = 85;
        const copy = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = silk.name;
        const note = document.createElement('p');
        note.textContent = 'Silk selection · the colour edit';
        copy.append(title, note);
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Remove';
        remove.setAttribute('aria-label', `Remove ${silk.name}${silk.kind ? '' : ' silk'} from bag`);
        listen(remove, 'click', () => {
          const position = savedLooks.length + savedSilks.indexOf(index);
          savedSilks = savedSilks.filter(item => item !== index);
          persistLookBag();
          updateSilkButtons();
          renderLookBag();
          const remaining = items.querySelectorAll('button');
          if (remaining.length) remaining[Math.min(position, remaining.length - 1)].focus();else bagDialog.querySelector('.look-bag-continue').focus();
        });
        row.append(image, copy, remove);
        items.append(row);
      });
    }
    listen(bagButton, 'click', () => {
      renderLookBag();
      bagDialog.showModal();
      document.body.style.overflow = 'hidden';
      refreshRotation();
    });
    listen(bagDialog.querySelector('.look-bag-close'), 'click', () => bagDialog.close());
    listen(bagDialog.querySelector('.look-bag-continue'), 'click', () => bagDialog.close());
    listen(bagDialog, 'click', event => {
      if (event.target !== bagDialog) return;
      const rect = bagDialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) bagDialog.close();
    });
    listen(bagDialog, 'close', () => {
      document.body.style.overflow = '';
      bagButton.focus({
        preventScroll: true
      });
      refreshRotation();
    });
    listen(collectionDialog, 'close', refreshRotation);
    persistLookBag();
    selectLook(0, false);
    let lookHeaderFrame;
    function updateLookHeader() {
      lookHeaderFrame = null;
      const bounds = tryLook.getBoundingClientRect();
      const silkBounds = document.querySelector('.silk-journey').getBoundingClientRect();
      const inSilks = silkBounds.top <= 105 && silkBounds.bottom > 110;
      const rackBounds = document.querySelector('.the-rack').getBoundingClientRect();
      const inRack = rackBounds.top <= 105 && rackBounds.bottom > 110;
      const museBounds = document.querySelector('.the-muse').getBoundingClientRect();
      const inMuse = museBounds.top <= 105 && museBounds.bottom > 110;
      const motionBounds = document.querySelector('.silk-motion').getBoundingClientRect();
      const inMotion = motionBounds.top <= 105 && motionBounds.bottom > 110;
      const weaveBounds = document.querySelector('.the-weave').getBoundingClientRect();
      const inWeave = weaveBounds.top <= 105 && weaveBounds.bottom > 110;
      const bridalBounds = document.querySelector('.bridal-collection').getBoundingClientRect();
      const inBridal = bridalBounds.top <= 105 && bridalBounds.bottom > 110;
      const festiveBounds = document.querySelector('.festive-silks').getBoundingClientRect();
      const inFestive = festiveBounds.top <= 105 && festiveBounds.bottom > 110;
      const visible = bounds.top <= 105 && bounds.bottom > 110 || inSilks || inRack || inMuse || inMotion || inWeave || inBridal || inFestive;
      const activeTarget = inWeave ? '#the-weave' : inBridal ? '#bridal' : inMuse || inMotion || inFestive ? '#the-muse' : inRack ? '#the-rack' : inSilks ? '#pick-a-silk' : visible ? '#try-the-look' : '#home';
      document.querySelector('.site-header').classList.toggle('in-look-section', visible);
      document.querySelectorAll('.desktop-nav a,.mobile-nav a').forEach(link => {
        const current = link.getAttribute('href') === activeTarget;
        link.classList.toggle('active', current);
        if (current) link.setAttribute('aria-current', 'page');else link.removeAttribute('aria-current');
      });
    }
    function requestLookHeader() {
      if (!lookHeaderFrame) lookHeaderFrame = requestAnimationFrame(updateLookHeader);
    }
    listen(window, 'scroll', requestLookHeader, {
      passive: true
    });
    listen(window, 'resize', requestLookHeader);
    listen(window, 'load', requestLookHeader);
    updateLookHeader();
    
    // Font loading can move the archive above a direct section link. Align the
    // requested anchor once the initial layout is ready, then leave scrolling native.
    async function alignInitialSection() {
      if (!window.location.hash) return;
      const initialHash = window.location.hash;
      if (document.fonts) await document.fonts.ready;
      if (!scope.isActive()) return;
      if (window.location.hash !== initialHash) return;
      let target;
      try {
        target = document.getElementById(decodeURIComponent(initialHash.slice(1)));
      } catch {
        return;
      }
      if (target) {
        target.scrollIntoView({
          block: 'start',
          behavior: 'instant'
        });
        requestLookHeader();
      }
    }
    if (document.readyState === 'complete') alignInitialSection();else listen(window, 'load', alignInitialSection, {
      once: true
    });
    
    // Pick a Silk: vertical page progress moves the desktop collection sideways.
    // On touch layouts the same rail uses native horizontal swiping, without pinning.
    const silks = [{
      name: 'Monsoon Blue',
      image: 'assets/look-blue.webp'
    }, {
      name: 'Sindoor Sun',
      image: 'assets/look-orange.webp'
    }, {
      name: 'Magenta Shot Silk',
      image: 'assets/look-pink.webp'
    }, {
      name: 'Palace Purple',
      image: 'assets/look-purple.webp'
    }, {
      name: 'Bengal Garden',
      image: 'assets/look-green.webp'
    }, {
      name: 'Kanchi Ruby',
      image: 'assets/look-maroon.webp'
    }, {
      name: 'Benares Gold',
      image: 'assets/look-yellow.webp'
    }, {
      name: 'Temple Teal',
      image: 'assets/look-teal.webp'
    }, {
      name: 'Noolam Royal Blue Zari',
      image: 'assets/rack-blue.webp',
      kind: 'silk',
      category: 'Silk saree',
      tags: ['Gold border', 'Royal blue'],
      description: 'Royal blue silk with golden motifs and a broad, luminous border.'
    }, {
      name: 'Noolam Rani Pink Temple Border',
      image: 'assets/rack-pink.webp',
      kind: 'silk',
      category: 'Silk saree',
      tags: ['Temple border', 'Rani pink'],
      description: 'Vivid rani pink, golden temple triangles, and softly falling silk folds.'
    }, {
      name: 'Noolam Violet Brocade',
      image: 'assets/rack-purple.webp',
      kind: 'silk',
      category: 'Silk saree',
      tags: ['Gold brocade', 'Deep violet'],
      description: 'Deep violet silk with intricate golden motifs and a richly detailed pallu.'
    }, {
      name: 'Noolam Emerald Silk',
      image: 'assets/rack-green.webp',
      kind: 'silk',
      category: 'Silk saree',
      tags: ['Gold border', 'Emerald green'],
      description: 'Emerald green silk with a generous gold border, ready for a graceful drape.'
    }, {
      name: 'Noolam Marigold Silk',
      image: 'assets/rack-orange.webp',
      kind: 'silk',
      category: 'Silk saree',
      tags: ['Gold border', 'Marigold orange'],
      description: 'Warm orange silk and golden accents, inspired by the colours of celebration.'
    }, {
      name: 'Noolam Ruby Temple Border',
      image: 'assets/rack-maroon.webp',
      kind: 'silk',
      category: 'Silk saree',
      tags: ['Temple border', 'Deep ruby'],
      description: 'Deep ruby silk with a striking line of golden temple-inspired triangles.'
    }, {
      name: 'Noolam Golden Hour Silk',
      image: 'assets/rack-yellow.webp',
      kind: 'silk',
      category: 'Silk saree',
      tags: ['Gold border', 'Mustard yellow'],
      description: 'Mustard yellow silk with delicate golden motifs and a broad zari-style border.'
    }, {
      name: 'Noolam Temple Teal',
      image: 'assets/rack-teal.webp',
      kind: 'silk',
      category: 'Silk saree',
      tags: ['Gold border', 'Turquoise teal'],
      description: 'Cool turquoise teal silk, warm golden detail, and an elegant flowing finish.'
    }, {
      name: 'Malli Half Saree',
      image: 'assets/rack-half-malli.webp',
      kind: 'half',
      category: 'Half saree',
      tags: ['Gold border', 'Pink & green'],
      description: 'A pink blouse, emerald pleated skirt, and matching pink dupatta styled together.'
    }, {
      name: 'Surya Half Saree',
      image: 'assets/rack-half-surya.webp',
      kind: 'half',
      category: 'Half saree',
      tags: ['Gold border', 'Yellow & blue'],
      description: 'A sunny yellow blouse and dupatta with a royal blue skirt and golden hem.'
    }, {
      name: 'Ananya Half Saree',
      image: 'assets/rack-half-ananya.webp',
      kind: 'half',
      category: 'Half saree',
      tags: ['Gold brocade', 'Gold & maroon'],
      description: 'An antique gold blouse and dupatta paired with a maroon pleated silk skirt.'
    }, {
      name: 'Kaveri Half Saree',
      image: 'assets/rack-half-kaveri.webp',
      kind: 'half',
      category: 'Half saree',
      tags: ['Gold border', 'Coral & green'],
      description: 'Coral silk and leaf green come together in a traditional three-piece silhouette.'
    }, {
      name: 'Emerald Silk Blouse',
      image: 'assets/rack-blouse-green.webp',
      kind: 'blouse',
      category: 'Silk blouse',
      tags: ['Short sleeves', 'Emerald green'],
      description: 'An emerald silk blouse with short sleeves and golden floral accents.'
    }, {
      name: 'Rani Pink Silk Blouse',
      image: 'assets/rack-blouse-pink.webp',
      kind: 'blouse',
      category: 'Silk blouse',
      tags: ['Short sleeves', 'Rani pink'],
      description: 'A vivid pink silk blouse, finished with warm golden motifs and sleeve borders.'
    }, {
      name: 'Royal Blue Silk Blouse',
      image: 'assets/rack-blouse-blue.webp',
      kind: 'blouse',
      category: 'Silk blouse',
      tags: ['Short sleeves', 'Royal blue'],
      description: 'Royal blue silk and gold details, designed as a rich contrast to your drape.'
    }, {
      name: 'Antique Gold Silk Blouse',
      image: 'assets/rack-blouse-gold.webp',
      kind: 'blouse',
      category: 'Silk blouse',
      tags: ['Short sleeves', 'Antique gold'],
      description: 'An antique gold brocade-style blouse with a soft sheen and traditional neckline.'
    }, {
      name: 'Bandhej Sangeet Silk',
      image: 'assets/bridal-bandhej.webp',
      kind: 'bridal',
      category: 'Bridal silk',
      occasion: 'THE SANGEET EDIT',
      description: 'A celebration in pink and gold, made for the moments before forever.'
    }, {
      name: 'Sindoor Pattu Vow',
      image: 'assets/bridal-sindoor.webp',
      kind: 'bridal',
      category: 'Bridal silk',
      occasion: 'THE WEDDING EDIT',
      description: 'Vermilion silk, golden borders, and the promise of a beautiful beginning.'
    }, {
      name: 'Manjal Kalyanam Pattu',
      image: 'assets/bridal-manjal.webp',
      kind: 'bridal',
      category: 'Bridal silk',
      occasion: 'THE MUHURTHAM EDIT',
      description: 'Turmeric yellow and ceremonial red, woven into a joyful wedding-day story.'
    }, {
      name: 'Malligai Muhurtham Silk',
      image: 'assets/bridal-malligai.webp',
      kind: 'bridal',
      category: 'Bridal silk',
      occasion: 'THE MORNING RITUALS',
      description: 'Ivory, gold, and a little jasmine. Quiet grace for your most meaningful moments.'
    }, {
      name: 'Maragatha Reception Silk',
      image: 'assets/bridal-maragatha.webp',
      kind: 'bridal',
      category: 'Bridal silk',
      occasion: 'THE RECEPTION EDIT',
      description: 'Emerald silk and golden detail, for celebrating with the people you love.'
    }, {
      name: 'Rose Mehendi Silk',
      image: 'assets/bridal-rose.webp',
      kind: 'bridal',
      category: 'Bridal silk',
      occasion: 'THE MEHENDI EDIT',
      description: 'Rose pink silk for marigold afternoons, music, and memories in the making.'
    }, {
      name: 'Ponni Evening Brocade',
      image: 'assets/bridal-ponni.webp',
      kind: 'bridal',
      category: 'Bridal silk',
      occasion: 'THE EVENING EDIT',
      description: 'Regal violet and rich golden motifs, made for an evening to remember.'
    }, {
      name: 'Kanchi Heirloom Silk',
      image: 'assets/bridal-kanchi.webp',
      kind: 'bridal',
      category: 'Bridal silk',
      occasion: 'THE HEIRLOOM EDIT',
      description: 'Royal blue, a magenta contrast, and the enduring warmth of gold.'
    }];
    const silkJourney = document.querySelector('.silk-journey');
    const silkSticky = document.querySelector('.pick-silk-sticky');
    const silkWindow = document.querySelector('.silk-window');
    const silkCards = [...document.querySelectorAll('.silk-card')];
    const silkPrevious = document.querySelector('.silk-prev');
    const silkNext = document.querySelector('.silk-next');
    const desktopSilks = window.matchMedia('(min-width: 851px)');
    let silkFrame = 0;
    let silkStart = 0;
    let silkDistance = 1;
    let silkRange = 1;
    function silkIsPinned() {
      return desktopSilks.matches && !motionPreference.matches;
    }
    function measureSilks() {
      silkStart = silkJourney.getBoundingClientRect().top + window.scrollY;
      silkDistance = Math.max(1, silkJourney.offsetHeight - silkSticky.offsetHeight);
      silkRange = Math.max(1, silkWindow.scrollWidth - silkWindow.clientWidth);
      document.querySelector('.silk-scroll-hint').firstChild.textContent = silkIsPinned() ? 'SCROLL TO DISCOVER ' : 'SWIPE TO DISCOVER ';
      requestSilkFrame();
    }
    function drawSilkRail() {
      const viewportCentre = silkWindow.clientWidth / 2;
      silkCards.forEach(card => {
        const centre = card.offsetLeft + card.offsetWidth / 2 - silkWindow.scrollLeft;
        const position = Math.max(-1, Math.min(1, (centre - viewportCentre) / viewportCentre));
        card.style.setProperty('--card-angle', `${position * 6}deg`);
        card.style.setProperty('--card-arc', `${Math.abs(position) * 30}px`);
      });
      const progress = clamp(silkWindow.scrollLeft / silkRange);
      document.querySelector('.silk-collection-progress>div>span').style.transform = `scaleX(${.125 + progress * .875})`;
      document.querySelector('.silk-position').textContent = `${String(Math.round(progress * 7) + 1).padStart(2, '0')} / 08`;
      silkPrevious.disabled = silkWindow.scrollLeft < 3;
      silkNext.disabled = silkWindow.scrollLeft >= silkRange - 3;
    }
    function updateSilkScene() {
      silkFrame = 0;
      if (silkIsPinned()) {
        const progress = clamp((window.scrollY - silkStart) / silkDistance);
        silkWindow.scrollLeft = progress * silkRange;
      }
      drawSilkRail();
    }
    function requestSilkFrame() {
      if (!silkFrame) silkFrame = requestAnimationFrame(updateSilkScene);
    }
    function moveSilksTo(left, smooth = true) {
      const target = Math.max(0, Math.min(silkRange, left));
      const behavior = smooth && !motionPreference.matches ? 'smooth' : 'instant';
      if (silkIsPinned()) window.scrollTo({
        top: silkStart + target / silkRange * silkDistance,
        behavior
      });else silkWindow.scrollTo({
        left: target,
        behavior
      });
    }
    function stepSilks(direction) {
      const gap = parseFloat(getComputedStyle(document.querySelector('.silk-rail')).gap);
      moveSilksTo(silkWindow.scrollLeft + direction * (silkCards[0].offsetWidth + gap));
    }
    listen(silkPrevious, 'click', () => stepSilks(-1));
    listen(silkNext, 'click', () => stepSilks(1));
    listen(silkWindow, 'keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home' || event.key === 'End') moveSilksTo(event.key === 'Home' ? 0 : silkRange);else stepSilks(event.key === 'ArrowRight' ? 1 : -1);
    });
    listen(silkWindow, 'scroll', drawSilkRail, {
      passive: true
    });
    listen(silkWindow, 'focusin', event => {
      const card = event.target.closest('.silk-card');
      if (!card) return;
      const left = card.offsetLeft - silkWindow.scrollLeft;
      if (left < 10 || left + card.offsetWidth > silkWindow.clientWidth - 10) moveSilksTo(card.offsetLeft - (silkWindow.clientWidth - card.offsetWidth) / 2, false);
    });
    listen(silkWindow, 'wheel', event => {
      if (!silkIsPinned() || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      moveSilksTo(silkWindow.scrollLeft + event.deltaX, false);
    }, {
      passive: false
    });
    let silkDrag;
    listen(silkWindow, 'pointerdown', event => {
      if (!silkIsPinned() || event.button !== 0 || event.target.closest('button')) return;
      silkDrag = {
        x: event.clientX,
        left: silkWindow.scrollLeft,
        id: event.pointerId
      };
    });
    listen(silkWindow, 'pointermove', event => {
      if (!silkDrag || event.pointerId !== silkDrag.id) return;
      const delta = silkDrag.x - event.clientX;
      if (Math.abs(delta) < 5 && !silkWindow.classList.contains('is-dragging')) return;
      silkWindow.classList.add('is-dragging');
      if (!silkWindow.hasPointerCapture(event.pointerId)) silkWindow.setPointerCapture(event.pointerId);
      moveSilksTo(silkDrag.left + delta, false);
    });
    function finishSilkDrag() {
      silkDrag = null;
      silkWindow.classList.remove('is-dragging');
    }
    listen(silkWindow, 'pointerup', finishSilkDrag);
    listen(silkWindow, 'pointercancel', finishSilkDrag);
    listen(window, 'scroll', requestSilkFrame, {
      passive: true
    });
    listen(window, 'resize', measureSilks);
    listen(window, 'load', measureSilks);
    listen(desktopSilks, 'change', measureSilks);
    listen(motionPreference, 'change', measureSilks);
    document.fonts?.ready.then(measureSilks);
    measureSilks();
    let favouriteSilks = [];
    try {
      const stored = JSON.parse(localStorage.getItem('noolam-silk-favourites-v1') || '[]');
      if (Array.isArray(stored)) favouriteSilks = [...new Set(stored.filter(index => Number.isInteger(index) && index >= 0 && index < silks.length))];
    } catch {/* Favourites remain usable without local storage. */}
    function updateSilkButtons() {
      silkCards.forEach((card, index) => {
        const added = savedSilks.includes(index);
        const favourite = favouriteSilks.includes(index);
        const add = card.querySelector('.silk-add');
        add.classList.toggle('is-added', added);
        add.querySelector('span').textContent = added ? '✓' : '+';
        add.setAttribute('aria-label', added ? `${silks[index].name} silk is in your bag` : `Add ${silks[index].name} silk to bag`);
        card.querySelector('.silk-favourite').setAttribute('aria-pressed', String(favourite));
      });
      document.querySelector('.wishlist').setAttribute('aria-label', `Silk favourites, ${favouriteSilks.length} saved`);
      document.dispatchEvent(new CustomEvent('silk-selection-change'));
    }
    function saveSilkFavourites() {
      try {
        localStorage.setItem('noolam-silk-favourites-v1', JSON.stringify(favouriteSilks));
      } catch {/* Keep favourites in memory. */}
      updateSilkButtons();
    }
    silkCards.forEach((card, index) => {
      listen(card.querySelector('.silk-add'), 'click', () => {
        if (!savedSilks.includes(index)) {
          savedSilks.push(index);
          persistLookBag();
          updateSilkButtons();
        }
        const message = `${silks[index].name} added to your silk selections.`;
        document.querySelector('.silk-live-status').textContent = message;
        showNotice(message);
      });
      listen(card.querySelector('.silk-favourite'), 'click', () => {
        const saved = favouriteSilks.includes(index);
        favouriteSilks = saved ? favouriteSilks.filter(item => item !== index) : [...favouriteSilks, index];
        saveSilkFavourites();
        document.querySelector('.silk-live-status').textContent = `${silks[index].name} ${saved ? 'removed from' : 'saved to'} your favourites.`;
      });
      listen(card, 'pointermove', event => {
        if (event.pointerType !== 'mouse' || motionPreference.matches || silkDrag) return;
        const rect = card.getBoundingClientRect();
        const x = clamp((event.clientX - rect.left) / rect.width);
        const y = clamp((event.clientY - rect.top) / rect.height);
        card.style.setProperty('--tilt-x', `${(y - .5) * -7}deg`);
        card.style.setProperty('--tilt-y', `${(x - .5) * 9}deg`);
        card.style.setProperty('--glow-x', `${x * 100}%`);
        card.style.setProperty('--glow-y', `${y * 100}%`);
      });
      listen(card, 'pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
    const silkFavouritesDialog = document.querySelector('.silk-favourites-dialog');
    const wishlistButton = document.querySelector('.wishlist');
    function renderSilkFavourites() {
      const items = document.querySelector('.silk-favourite-items');
      items.replaceChildren();
      if (!favouriteSilks.length) {
        const empty = document.createElement('p');
        empty.className = 'look-bag-empty';
        empty.textContent = 'Tap a heart in the colour edit to keep a silk here.';
        items.append(empty);
        return;
      }
      favouriteSilks.forEach(index => {
        const silk = silks[index];
        const row = document.createElement('div');
        row.className = 'look-bag-item';
        const image = document.createElement('img');
        image.src = silk.image;
        image.alt = silk.name;
        image.width = 48;
        image.height = 85;
        const copy = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = silk.name;
        const note = document.createElement('p');
        note.textContent = 'The colour edit · silk styling reference';
        copy.append(title, note);
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Remove';
        remove.setAttribute('aria-label', `Remove ${silk.name} from favourites`);
        listen(remove, 'click', () => {
          const position = favouriteSilks.indexOf(index);
          favouriteSilks = favouriteSilks.filter(item => item !== index);
          saveSilkFavourites();
          renderSilkFavourites();
          const remaining = items.querySelectorAll('button');
          if (remaining.length) remaining[Math.min(position, remaining.length - 1)].focus();else document.querySelector('.silk-favourites-continue').focus();
        });
        row.append(image, copy, remove);
        items.append(row);
      });
    }
    listen(wishlistButton, 'click', () => {
      renderSilkFavourites();
      silkFavouritesDialog.showModal();
      document.body.style.overflow = 'hidden';
      refreshRotation();
    });
    listen(document.querySelector('.silk-favourites-close'), 'click', () => silkFavouritesDialog.close());
    listen(document.querySelector('.silk-favourites-continue'), 'click', () => silkFavouritesDialog.close());
    listen(silkFavouritesDialog, 'click', event => {
      if (event.target !== silkFavouritesDialog) return;
      const rect = silkFavouritesDialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) silkFavouritesDialog.close();
    });
    listen(silkFavouritesDialog, 'close', () => {
      document.body.style.overflow = '';
      wishlistButton.focus({
        preventScroll: true
      });
      refreshRotation();
    });
    updateSilkButtons();
    
    // The Rack uses the same persistent silk selections as the colour-edit cards.
    const rackProducts = silks.slice(8, 24).map((product, index) => ({
      ...product,
      index: index + 8
    }));
    const rackFilters = [{
      key: 'all',
      name: 'All pieces',
      matches: () => true
    }, {
      key: 'silk',
      name: 'Silk Sarees',
      matches: product => product.kind === 'silk'
    }, {
      key: 'half',
      name: 'Half Sarees',
      matches: product => product.kind === 'half'
    }, {
      key: 'blouse',
      name: 'Silk Blouses',
      matches: product => product.kind === 'blouse'
    }, {
      key: 'temple',
      name: 'Temple Borders',
      matches: product => product.tags.includes('Temple border')
    }, {
      key: 'brocade',
      name: 'Zari & Brocade',
      matches: product => product.tags.includes('Gold brocade') || product.name.includes('Antique Gold')
    }];
    const rackStage = document.querySelector('.rack-stage');
    const rackWindow = document.querySelector('.rack-window');
    const rackTrack = document.querySelector('.rack-track');
    const rackFocus = document.querySelector('.rack-focus');
    const rackFocusImage = rackFocus.querySelector('img');
    const rackDetail = document.querySelector('.rack-detail');
    const rackBack = document.querySelector('.rack-back');
    const rackPrevious = document.querySelector('.rack-previous');
    const rackNext = document.querySelector('.rack-next');
    let rackFilter = 'all';
    let filteredRack = rackProducts;
    let selectedRack = null;
    let rackOrigin;
    let rackFocusToken = 0;
    let rackHasEntered = false;
    let rackEntranceAnimations = [];
    const rackFilterButtons = rackFilters.map(filter => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.rackFilter = filter.key;
      button.append(document.createTextNode(filter.name));
      const count = document.createElement('span');
      count.textContent = String(rackProducts.filter(filter.matches).length);
      button.append(count);
      button.setAttribute('aria-label', `${filter.name}, ${count.textContent} pieces`);
      listen(button, 'click', () => {
        rackFilter = filter.key;
        clearRackFocus(false);
        renderRack();
        document.querySelector('.rack-live-status').textContent = `${filter.name}. ${filteredRack.length} pieces on the rail.`;
      });
      document.querySelector('.rack-filters').append(button);
      return button;
    });
    function animateRackHangers() {
      rackEntranceAnimations.forEach(animation => animation.cancel());
      rackEntranceAnimations = [];
      if (motionPreference.matches) return;
      rackEntranceAnimations = [...rackTrack.querySelectorAll('.rack-item')].map((item, index) => scope.animate(item, [{
        opacity: 0,
        transform: 'translateY(-18px) rotate(-5deg)'
      }, {
        opacity: 1,
        transform: 'translateY(0) rotate(2deg)',
        offset: .6
      }, {
        opacity: 1,
        transform: 'translateY(0) rotate(0deg)'
      }], {
        duration: 850,
        delay: Math.min(index, 7) * 50,
        easing: 'cubic-bezier(.2,.7,.25,1)',
        fill: 'backwards'
      }));
    }
    function renderRack() {
      const filter = rackFilters.find(filter => filter.key === rackFilter);
      filteredRack = rackProducts.filter(filter.matches);
      rackFilterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.rackFilter === rackFilter)));
      rackTrack.replaceChildren();
      rackTrack.style.justifyContent = filteredRack.length <= 4 ? 'center' : 'flex-start';
      filteredRack.forEach(product => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'rack-item';
        button.dataset.rackIndex = String(product.index);
        button.dataset.kind = product.kind;
        button.setAttribute('aria-label', `Take a closer look at ${product.name}`);
        button.setAttribute('aria-pressed', 'false');
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = `${product.name} on a wooden hanger`;
        image.width = 300;
        image.height = 450;
        image.loading = 'lazy';
        image.draggable = false;
        button.append(image);
        listen(button, 'click', () => focusRackProduct(product.index));
        rackTrack.append(button);
      });
      rackWindow.scrollTo({
        left: 0,
        behavior: 'instant'
      });
      document.querySelector('.rack-count').textContent = `EXPLORE THE COLLECTION · ${filteredRack.length} PIECES`;
      if (rackHasEntered) animateRackHangers();
      requestAnimationFrame(updateRackControls);
    }
    function updateRackControls() {
      const focused = selectedRack !== null;
      rackPrevious.disabled = focused ? filteredRack.length <= 1 : rackWindow.scrollLeft < 3;
      rackNext.disabled = focused ? filteredRack.length <= 1 : rackWindow.scrollLeft >= rackWindow.scrollWidth - rackWindow.clientWidth - 3;
      rackPrevious.setAttribute('aria-label', focused ? 'Previous selected garment' : 'Previous pieces on the rack');
      rackNext.setAttribute('aria-label', focused ? 'Next selected garment' : 'Next pieces on the rack');
    }
    function updateRackSelectionButtons() {
      if (selectedRack === null) return;
      const product = silks[selectedRack];
      const added = savedSilks.includes(selectedRack);
      const favourite = favouriteSilks.includes(selectedRack);
      const add = document.querySelector('.rack-add');
      add.firstChild.textContent = added ? 'Piece added to bag ' : 'Add piece to bag ';
      add.setAttribute('aria-label', added ? `${product.name} is in your bag` : `Add ${product.name} to bag`);
      const heart = document.querySelector('.rack-favourite');
      heart.setAttribute('aria-pressed', String(favourite));
      heart.setAttribute('aria-label', `${favourite ? 'Remove' : 'Save'} ${product.name} ${favourite ? 'from' : 'to'} favourites`);
    }
    async function focusRackProduct(index) {
      const product = rackProducts.find(product => product.index === index);
      if (!product || !filteredRack.some(item => item.index === index)) return;
      const token = ++rackFocusToken;
      const button = rackTrack.querySelector(`[data-rack-index="${index}"]`);
      const hadFocus = selectedRack !== null;
      rackOrigin = button;
      const left = button.offsetLeft - (rackWindow.clientWidth - button.offsetWidth) / 2;
      rackWindow.scrollTo({
        left: Math.max(0, left),
        behavior: 'instant'
      });
      const origin = hadFocus ? rackFocusImage.getBoundingClientRect() : button.querySelector('img').getBoundingClientRect();
      rackFocusImage.getAnimations().forEach(animation => animation.cancel());
      selectedRack = index;
      rackTrack.querySelectorAll('.rack-item').forEach(item => item.setAttribute('aria-pressed', String(Number(item.dataset.rackIndex) === index)));
      rackFocusImage.src = product.image;
      rackFocusImage.alt = `${product.name}, hanging silk detail`;
      rackFocus.hidden = false;
      rackDetail.hidden = false;
      rackBack.hidden = false;
      rackStage.classList.add('has-selection');
      rackStage.focus({
        preventScroll: true
      });
      document.querySelector('.rack-product-category').textContent = product.category.toUpperCase();
      document.querySelector('#rack-product-title').textContent = product.name;
      document.querySelector('.rack-product-description').textContent = product.description;
      const tags = document.querySelector('.rack-product-tags');
      tags.replaceChildren();
      product.tags.forEach(tag => {
        const badge = document.createElement('span');
        badge.textContent = tag;
        tags.append(badge);
      });
      document.querySelector('.rack-browse-hint').firstChild.textContent = 'Use the arrows to find your next favourite ';
      updateRackSelectionButtons();
      updateRackControls();
      document.querySelector('.rack-live-status').textContent = `${product.name}. ${product.category}. ${filteredRack.findIndex(item => item.index === index) + 1} of ${filteredRack.length} pieces.`;
      try {
        await rackFocusImage.decode();
      } catch {/* The alt text remains available if an image fails. */}
      if (!scope.isActive() || token !== rackFocusToken || motionPreference.matches) return;
      const target = rackFocusImage.getBoundingClientRect();
      const dx = origin.left + origin.width / 2 - (target.left + target.width / 2);
      const dy = origin.top - target.top;
      const scale = hadFocus ? .94 : Math.max(.4, Math.min(1, origin.width / target.width));
      scope.animate(rackFocusImage, [{
        opacity: .5,
        transform: `translate(${dx}px,${dy}px) scale(${scale}) rotate(-3deg)`
      }, {
        opacity: 1,
        transform: 'translate(0,0) scale(1) rotate(1deg)',
        offset: .8
      }, {
        opacity: 1,
        transform: 'translate(0,0) scale(1) rotate(0deg)'
      }], {
        duration: 700,
        easing: 'cubic-bezier(.2,.7,.25,1)'
      });
      scope.animate(rackDetail, [{
        opacity: 0,
        transform: 'translateY(14px)'
      }, {
        opacity: 1,
        transform: 'translateY(0)'
      }], {
        duration: 450,
        easing: 'ease-out'
      });
    }
    function clearRackFocus(restore = true) {
      ++rackFocusToken;
      rackFocusImage.getAnimations().forEach(animation => animation.cancel());
      selectedRack = null;
      rackFocus.hidden = true;
      rackDetail.hidden = true;
      rackBack.hidden = true;
      rackStage.classList.remove('has-selection');
      rackTrack.querySelectorAll('.rack-item').forEach(item => item.setAttribute('aria-pressed', 'false'));
      document.querySelector('.rack-browse-hint').firstChild.textContent = 'Tap a hanger to take a closer look ';
      updateRackControls();
      if (restore && rackOrigin?.isConnected) rackOrigin.focus({
        preventScroll: true
      });
    }
    function stepRack(direction) {
      if (selectedRack !== null) {
        const position = filteredRack.findIndex(product => product.index === selectedRack);
        const next = (position + direction + filteredRack.length) % filteredRack.length;
        focusRackProduct(filteredRack[next].index);
      } else rackWindow.scrollBy({
        left: Math.max(180, rackWindow.clientWidth * .65) * direction,
        behavior: motionPreference.matches ? 'instant' : 'smooth'
      });
    }
    listen(rackPrevious, 'click', () => stepRack(-1));
    listen(rackNext, 'click', () => stepRack(1));
    listen(rackWindow, 'scroll', updateRackControls, {
      passive: true
    });
    listen(window, 'resize', updateRackControls);
    listen(rackBack, 'click', () => clearRackFocus());
    listen(document.querySelector('.the-rack'), 'keydown', event => {
      if (!rackStage.contains(event.target) && event.key !== 'Escape') return;
      if (document.querySelector('dialog[open]')) return;
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Escape'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Escape') {
        if (selectedRack !== null) clearRackFocus();
        return;
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') stepRack(event.key === 'ArrowRight' ? 1 : -1);else if (selectedRack !== null) focusRackProduct(filteredRack[event.key === 'Home' ? 0 : filteredRack.length - 1].index);else rackWindow.scrollTo({
        left: event.key === 'Home' ? 0 : rackWindow.scrollWidth,
        behavior: motionPreference.matches ? 'instant' : 'smooth'
      });
    });
    listen(document.querySelector('.rack-add'), 'click', () => {
      if (selectedRack === null) return;
      if (!savedSilks.includes(selectedRack)) {
        savedSilks.push(selectedRack);
        persistLookBag();
        updateSilkButtons();
      }
      showNotice(`${silks[selectedRack].name} saved to your bag.`);
    });
    listen(document.querySelector('.rack-favourite'), 'click', () => {
      if (selectedRack === null) return;
      const saved = favouriteSilks.includes(selectedRack);
      favouriteSilks = saved ? favouriteSilks.filter(index => index !== selectedRack) : [...favouriteSilks, selectedRack];
      saveSilkFavourites();
      document.querySelector('.rack-live-status').textContent = `${silks[selectedRack].name} ${saved ? 'removed from' : 'saved to'} your favourites.`;
    });
    listen(document, 'silk-selection-change', updateRackSelectionButtons);
    listen(motionPreference, 'change', () => {
      rackEntranceAnimations.forEach(animation => animation.cancel());
      rackFocusImage.getAnimations().forEach(animation => animation.cancel());
    });
    renderRack();
    if ('IntersectionObserver' in window) {
      const rackEntryObserver = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        rackHasEntered = true;
        animateRackHangers();
        rackEntryObserver.disconnect();
      }, {
        threshold: .12
      });
      rackEntryObserver.observe(rackStage);
    }
    
    // The Muse is an image gallery. Camera drift and dissolves animate stills;
    // controls deliberately describe images, without implying playable video.
    const museStories = [{
      title: 'A moment in crimson.',
      image: 'assets/muse-crimson.webp',
      alt: 'Woman in a crimson silk saree against indigo and teal heritage walls',
      position: '60% center'
    }, {
      title: 'An heirloom in the making.',
      image: 'assets/showroom-seated.webp',
      alt: 'Two women seated in the showroom in red and emerald green silk sarees',
      position: 'center center'
    }, {
      title: 'Red, for the moments that matter.',
      image: 'assets/mood-wedding.webp',
      alt: 'Bride wearing red and gold silk in a sandstone temple courtyard',
      position: 'center 38%'
    }, {
      title: 'A little pink. A little possibility.',
      image: 'assets/mood-kanchipuram.webp',
      alt: 'Woman in a pink and green silk saree against an olive heritage wall',
      position: 'center 40%'
    }, {
      title: 'A story in violet.',
      image: 'assets/mood-banarasi.webp',
      alt: 'Woman wearing purple and gold brocade silk in a warm wooden interior',
      position: 'center 38%'
    }, {
      title: 'Made of golden afternoons.',
      image: 'assets/mood-festive.webp',
      alt: 'Woman in a golden yellow saree seated in a sunlit garden',
      position: 'center 38%'
    }, {
      title: 'The quiet beauty of zari.',
      image: 'assets/mood-zari.webp',
      alt: 'Woman in a black and gold silk saree in a softly lit teal interior',
      position: 'center 38%'
    }, {
      title: 'Green, like a new beginning.',
      image: 'assets/mood-sacred.webp',
      alt: 'Woman in green and gold silk surrounded by lush garden foliage',
      position: 'center 38%'
    }];
    const museSection = document.querySelector('.the-muse');
    const museStage = document.querySelector('.muse-stage');
    const musePhotos = [...document.querySelectorAll('.muse-photo')];
    const musePauseButton = document.querySelector('.muse-pause');
    const museLightbox = document.querySelector('.muse-lightbox');
    const museEnlargeButton = document.querySelector('.muse-enlarge');
    let selectedMuse = 0;
    let currentMuseLayer = 0;
    let museSelectionToken = 0;
    let museRotationTimer;
    let musePaused = false;
    let museHovered = false;
    let museFocused = false;
    let museInView = false;
    let musePanAnimation;
    const museDotButtons = museStories.map((story, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Show ${story.title}`);
      listen(button, 'click', () => selectMuseStory(index));
      document.querySelector('.muse-dots').append(button);
      return button;
    });
    function refreshMusePlayback() {
      clearTimeout(museRotationTimer);
      const paused = musePaused || museHovered || museFocused || !museInView || motionPreference.matches || document.hidden || Boolean(document.querySelector('dialog[open]'));
      museSection.classList.toggle('is-paused', paused);
      if (musePanAnimation) {
        if (paused) musePanAnimation.pause();else musePanAnimation.play();
      }
      if (!paused) museRotationTimer = setTimeout(() => selectMuseStory(selectedMuse + 1, false), 6500);
    }
    function renderMuseThumbnails() {
      ['.muse-side-left .muse-strip', '.muse-side-right .muse-strip'].forEach((selector, side) => {
        const strip = document.querySelector(selector);
        strip.replaceChildren();
        for (let i = 0; i < 3; i++) {
          const index = (selectedMuse + 1 + side * 3 + i) % museStories.length;
          const story = museStories[index];
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'muse-thumb';
          button.dataset.museStory = String(index);
          button.setAttribute('aria-label', `Show ${story.title}`);
          button.style.setProperty('--thumb-position', story.position);
          const image = document.createElement('img');
          image.src = story.image;
          image.alt = story.alt;
          image.width = 160;
          image.height = 210;
          image.loading = 'lazy';
          const title = document.createElement('span');
          title.textContent = story.title;
          button.append(image, title);
          listen(button, 'click', () => {
            selectMuseStory(index);
            museStage.focus({
              preventScroll: true
            });
          });
          strip.append(button);
        }
      });
    }
    function updateMuseLightbox() {
      const story = museStories[selectedMuse];
      const image = museLightbox.querySelector('img');
      image.src = story.image;
      image.alt = story.alt;
      document.querySelector('#muse-lightbox-title').textContent = story.title;
    }
    async function selectMuseStory(index, announce = true) {
      clearTimeout(museRotationTimer);
      selectedMuse = (index + museStories.length) % museStories.length;
      const token = ++museSelectionToken;
      const story = museStories[selectedMuse];
      museDotButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === selectedMuse)));
      document.querySelector('.muse-story-label>span').textContent = `${String(selectedMuse + 1).padStart(2, '0')} / 08`;
      document.querySelector('.muse-photo-caption h3').textContent = story.title;
      renderMuseThumbnails();
      updateMuseLightbox();
      if (announce) document.querySelector('.muse-live-status').textContent = `${story.title} Photograph ${selectedMuse + 1} of 8.`;
      const oldPhoto = musePhotos[currentMuseLayer];
      const nextLayer = 1 - currentMuseLayer;
      const nextPhoto = musePhotos[nextLayer];
      nextPhoto.loading = 'eager';
      nextPhoto.src = story.image;
      nextPhoto.alt = story.alt;
      nextPhoto.style.setProperty('--muse-position', story.position);
      try {
        await nextPhoto.decode();
      } catch {/* Alt text remains available for unavailable imagery. */}
      if (!scope.isActive() || token !== museSelectionToken) return;
      const oldTransform = getComputedStyle(oldPhoto).transform;
      musePhotos.forEach(photo => photo.getAnimations().forEach(animation => animation.cancel()));
      oldPhoto.style.transform = oldTransform;
      nextPhoto.style.transform = '';
      oldPhoto.classList.remove('is-current');
      oldPhoto.setAttribute('aria-hidden', 'true');
      nextPhoto.classList.add('is-current');
      nextPhoto.removeAttribute('aria-hidden');
      currentMuseLayer = nextLayer;
      musePanAnimation = undefined;
      if (!motionPreference.matches) {
        scope.animate(oldPhoto, [{
          opacity: 1
        }, {
          opacity: 0
        }], {
          duration: 650,
          easing: 'ease-out'
        });
        scope.animate(nextPhoto, [{
          opacity: 0
        }, {
          opacity: 1
        }], {
          duration: 700,
          easing: 'ease-out'
        });
        musePanAnimation = scope.animate(nextPhoto, [{
          transform: 'scale(1.035) translate3d(-.4%,0,0)'
        }, {
          transform: 'scale(1.105) translate3d(.4%,-.5%,0)'
        }], {
          duration: 10000,
          easing: 'linear',
          fill: 'forwards'
        });
      }
      refreshMusePlayback();
    }
    listen(document.querySelector('.muse-previous'), 'click', () => selectMuseStory(selectedMuse - 1));
    listen(document.querySelector('.muse-next'), 'click', () => selectMuseStory(selectedMuse + 1));
    function handleMuseKeys(event) {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      selectMuseStory(event.key === 'Home' ? 0 : event.key === 'End' ? museStories.length - 1 : selectedMuse + (event.key === 'ArrowRight' ? 1 : -1));
    }
    listen(museStage, 'keydown', handleMuseKeys);
    listen(museLightbox, 'keydown', handleMuseKeys);
    listen(musePauseButton, 'click', () => {
      musePaused = !musePaused;
      if (!musePaused) {
        museHovered = false;
        museFocused = false;
      }
      musePauseButton.setAttribute('aria-pressed', String(musePaused));
      musePauseButton.setAttribute('aria-label', musePaused ? 'Play image gallery' : 'Pause image gallery');
      musePauseButton.querySelector('span').textContent = musePaused ? '▷' : 'Ⅱ';
      refreshMusePlayback();
    });
    listen(museSection, 'pointerenter', event => {
      if (event.pointerType === 'mouse') {
        museHovered = true;
        refreshMusePlayback();
      }
    });
    listen(museSection, 'pointerleave', () => {
      museHovered = false;
      refreshMusePlayback();
    });
    listen(museSection, 'focusin', () => {
      museFocused = true;
      refreshMusePlayback();
    });
    listen(museSection, 'focusout', event => {
      museFocused = museSection.contains(event.relatedTarget);
      refreshMusePlayback();
    });
    listen(document, 'visibilitychange', refreshMusePlayback);
    listen(motionPreference, 'change', () => {
      musePhotos.forEach(photo => photo.getAnimations().forEach(animation => animation.cancel()));
      musePanAnimation = undefined;
      refreshMusePlayback();
    });
    let museSwipeStart;
    let ignoreMuseSwipeClick = false;
    listen(museStage, 'pointerdown', event => {
      if (!event.target.closest('button')) museSwipeStart = {
        x: event.clientX,
        y: event.clientY
      };
    });
    listen(museStage, 'pointercancel', () => {
      museSwipeStart = undefined;
    });
    listen(museStage, 'pointerup', event => {
      if (!museSwipeStart) return;
      const dx = event.clientX - museSwipeStart.x;
      const dy = event.clientY - museSwipeStart.y;
      museSwipeStart = undefined;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        selectMuseStory(selectedMuse + (dx < 0 ? 1 : -1));
        ignoreMuseSwipeClick = true;
        setTimeout(() => ignoreMuseSwipeClick = false, 100);
      }
    });
    listen(museStage, 'click', event => {
      if (ignoreMuseSwipeClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    listen(museEnlargeButton, 'click', () => {
      updateMuseLightbox();
      museLightbox.showModal();
      document.body.style.overflow = 'hidden';
      refreshMusePlayback();
      refreshRotation();
    });
    listen(document.querySelector('.muse-lightbox-close'), 'click', () => museLightbox.close());
    listen(document.querySelector('.muse-lightbox-previous'), 'click', () => selectMuseStory(selectedMuse - 1));
    listen(document.querySelector('.muse-lightbox-next'), 'click', () => selectMuseStory(selectedMuse + 1));
    listen(museLightbox, 'click', event => {
      if (event.target !== museLightbox) return;
      const rect = museLightbox.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) museLightbox.close();
    });
    listen(museLightbox, 'close', () => {
      document.body.style.overflow = '';
      museEnlargeButton.focus({
        preventScroll: true
      });
      refreshMusePlayback();
      refreshRotation();
    });
    [bagDialog, silkFavouritesDialog, collectionDialog].forEach(dialog => {
      const observer = new MutationObserver(refreshMusePlayback);
      observer.observe(dialog, {
        attributes: true,
        attributeFilter: ['open']
      });
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        museInView = entries[0].isIntersecting;
        refreshMusePlayback();
      }, {
        threshold: .15
      }).observe(museSection);
    }
    selectMuseStory(0, false);
    
    // Silk, in motion: a separate row of shoppable photo stories. Original reel
    // footage can replace these photographs later; controls do not imply live video.
    const motionStories = [{
      title: 'Emerald Silk',
      product: 11,
      image: 'assets/mood-sacred.webp',
      position: 'center 38%',
      background: '#30452a',
      caption: 'A little green. A little grace. A whole new beginning.'
    }, {
      title: 'Rani Pink Temple',
      product: 9,
      image: 'assets/mood-kanchipuram.webp',
      position: 'center 38%',
      background: '#5d6541',
      caption: 'Bright pink silk and golden borders, made for your moment.'
    }, {
      title: 'Violet Brocade',
      product: 10,
      image: 'assets/mood-banarasi.webp',
      position: 'center 38%',
      background: '#36283c',
      caption: 'Jewel tones and golden threads. A story worth keeping.'
    }, {
      title: 'Ruby Temple Border',
      product: 13,
      image: 'assets/muse-crimson.webp',
      position: '67% center',
      background: '#304b55',
      caption: 'A rich red drape for the moments that stay with you.'
    }, {
      title: 'Golden Hour',
      product: 14,
      image: 'assets/mood-festive.webp',
      position: 'center 38%',
      background: '#928344',
      caption: 'Sunlit silk, marigold mornings, and a little celebration.'
    }, {
      title: 'Royal Blue Zari',
      product: 8,
      image: 'assets/look-blue.webp',
      position: 'center center',
      background: '#24316b',
      caption: 'Royal blue, a magenta contrast, and the glimmer of gold.'
    }, {
      title: 'Marigold Silk',
      product: 12,
      image: 'assets/look-orange.webp',
      position: 'center center',
      background: '#946e3e',
      caption: 'Warm orange silk that brings its own sunshine.'
    }, {
      title: 'Temple Teal',
      product: 15,
      image: 'assets/look-teal.webp',
      position: 'center center',
      background: '#245d60',
      caption: 'Cool teal and pink, woven into one beautiful colour story.'
    }];
    let activeMotionStories = motionStories;
    const motionSection = document.querySelector('.silk-motion');
    const motionWindow = document.querySelector('.motion-window');
    const motionRail = document.querySelector('.motion-rail');
    const motionPrevious = document.querySelector('.motion-previous');
    const motionNext = document.querySelector('.motion-next');
    const motionStoryDialog = document.querySelector('.motion-story-dialog');
    const motionStoryMain = document.querySelector('.motion-story-main');
    const motionStoryPhoto = document.querySelector('.motion-story-photo');
    const motionStoryPause = document.querySelector('.motion-story-pause');
    motionStoryMain.tabIndex = 0;
    motionStoryMain.setAttribute('aria-label', 'Photo story. Use arrow keys to browse and Space to pause.');
    let selectedMotionStory = 0;
    let motionStoryOpener;
    let motionStoryTimer;
    let motionStoryProgressAnimation;
    let motionStoryPanAnimation;
    let motionStoryPaused = false;
    let motionStoryHeld = false;
    let motionStoryToken = 0;
    let motionGesture;
    const motionStoryDuration = 8000;
    const motionCardAnimations = [];
    function motionIcon(name) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('aria-hidden', 'true');
      const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      use.setAttribute('href', `#${name}`);
      svg.append(use);
      return svg;
    }
    const motionCards = motionStories.map((story, index) => {
      const card = document.createElement('article');
      card.className = 'motion-card';
      card.dataset.storyIndex = String(index);
      card.style.setProperty('--story-bg', story.background);
      card.style.setProperty('--story-position', story.position);
      card.style.setProperty('--story-angle', `${[-1, .6, -.7, .8, 0, -.6, .8, -.4][index]}deg`);
      const image = document.createElement('img');
      image.src = story.image;
      image.alt = `${story.title}, a silk campaign portrait`;
      image.width = 360;
      image.height = 640;
      image.loading = 'lazy';
      const open = document.createElement('button');
      open.type = 'button';
      open.className = 'motion-open';
      open.setAttribute('aria-label', `Open ${story.title} photo story`);
      const number = document.createElement('span');
      number.className = 'motion-card-index';
      number.textContent = `STORY ${String(index + 1).padStart(2, '0')}`;
      const icon = document.createElement('span');
      icon.className = 'motion-open-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.append(motionIcon('arrow'));
      const copy = document.createElement('span');
      copy.className = 'motion-card-copy';
      const category = document.createElement('small');
      category.textContent = 'KANJIVARAM SILK';
      const title = document.createElement('strong');
      title.textContent = story.title;
      const description = document.createElement('span');
      description.textContent = story.caption;
      copy.append(category, title, description);
      open.append(number, icon, copy);
      listen(open, 'click', () => openMotionStory(index, open));
      const heart = document.createElement('button');
      heart.type = 'button';
      heart.className = 'motion-card-heart';
      heart.append(motionIcon('heart'));
      listen(heart, 'click', () => toggleMotionFavourite(index, motionStories));
      const shop = document.createElement('div');
      shop.className = 'motion-card-shop';
      const label = document.createElement('span');
      label.textContent = 'THE SILK EDIT';
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'motion-card-add';
      add.append(document.createTextNode('Add to bag '), motionIcon('bag'));
      listen(add, 'click', () => addMotionSilk(index, motionStories));
      shop.append(label, add);
      card.append(image, open, heart, shop);
      motionRail.append(card);
      return card;
    });
    function refreshMotionShopping() {
      motionCards.forEach((card, index) => {
        const story = motionStories[index];
        const product = silks[story.product];
        const added = savedSilks.includes(story.product);
        const saved = favouriteSilks.includes(story.product);
        const add = card.querySelector('.motion-card-add');
        add.classList.toggle('is-added', added);
        add.firstChild.textContent = added ? 'In your bag ' : 'Add to bag ';
        add.setAttribute('aria-label', added ? `${product.name} is in your bag` : `Add ${product.name} from story to bag`);
        const heart = card.querySelector('.motion-card-heart');
        heart.setAttribute('aria-pressed', String(saved));
        heart.setAttribute('aria-label', `${saved ? 'Remove' : 'Save'} ${product.name} ${saved ? 'from' : 'to'} favourites`);
      });
      const story = activeMotionStories[selectedMotionStory];
      const product = silks[story.product];
      const added = savedSilks.includes(story.product);
      const saved = favouriteSilks.includes(story.product);
      const add = document.querySelector('.motion-story-add');
      add.firstChild.textContent = added ? 'In your bag ' : 'Add to bag ';
      add.setAttribute('aria-label', added ? `${product.name} is in your bag` : `Add ${product.name} to bag`);
      const heart = document.querySelector('.motion-story-favourite');
      heart.setAttribute('aria-pressed', String(saved));
      heart.setAttribute('aria-label', `${saved ? 'Remove' : 'Save'} ${product.name} ${saved ? 'from' : 'to'} favourites`);
    }
    function addMotionSilk(index, collection = activeMotionStories) {
      const product = collection[index].product;
      if (!savedSilks.includes(product)) {
        savedSilks.push(product);
        persistLookBag();
        updateSilkButtons();
      }
      const message = `${silks[product].name} saved to your bag.`;
      document.querySelector(collection === motionStories ? '.motion-live-status' : '.festive-live-status').textContent = message;
      if (!motionStoryDialog.open) showNotice(message);
    }
    function toggleMotionFavourite(index, collection = activeMotionStories) {
      const product = collection[index].product;
      const saved = favouriteSilks.includes(product);
      favouriteSilks = saved ? favouriteSilks.filter(item => item !== product) : [...favouriteSilks, product];
      saveSilkFavourites();
      document.querySelector(collection === motionStories ? '.motion-live-status' : '.festive-live-status').textContent = `${silks[product].name} ${saved ? 'removed from' : 'saved to'} your favourites.`;
    }
    function updateMotionRailControls() {
      const range = Math.max(1, motionWindow.scrollWidth - motionWindow.clientWidth);
      const progress = clamp(motionWindow.scrollLeft / range);
      motionPrevious.disabled = motionWindow.scrollLeft < 3;
      motionNext.disabled = motionWindow.scrollLeft >= range - 3;
      document.querySelector('.motion-rail-count').textContent = `${String(Math.round(progress * 7) + 1).padStart(2, '0')} / 08`;
    }
    function stepMotionRail(direction) {
      motionWindow.scrollBy({
        left: (motionCards[0].offsetWidth + parseFloat(getComputedStyle(motionRail).gap)) * direction,
        behavior: motionPreference.matches ? 'instant' : 'smooth'
      });
    }
    listen(motionPrevious, 'click', () => stepMotionRail(-1));
    listen(motionNext, 'click', () => stepMotionRail(1));
    listen(motionWindow, 'scroll', updateMotionRailControls, {
      passive: true
    });
    listen(window, 'resize', updateMotionRailControls);
    listen(motionWindow, 'keydown', event => {
      if (motionSection.classList.contains('is-expanded') || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home' || event.key === 'End') motionWindow.scrollTo({
        left: event.key === 'Home' ? 0 : motionWindow.scrollWidth,
        behavior: motionPreference.matches ? 'instant' : 'smooth'
      });else stepMotionRail(event.key === 'ArrowRight' ? 1 : -1);
    });
    listen(document.querySelector('.motion-view-all'), 'click', event => {
      const expanded = motionSection.classList.toggle('is-expanded');
      event.currentTarget.setAttribute('aria-expanded', String(expanded));
      event.currentTarget.firstChild.textContent = expanded ? 'View fewer ' : 'View all ';
      motionWindow.scrollTo({
        left: 0,
        behavior: 'instant'
      });
      motionWindow.focus({
        preventScroll: true
      });
      motionSection.scrollIntoView({
        block: 'start',
        behavior: 'instant'
      });
      requestAnimationFrame(updateMotionRailControls);
    });
    function refreshMotionStoryPlayback() {
      clearTimeout(motionStoryTimer);
      const paused = motionStoryPaused || motionStoryHeld || document.hidden || motionPreference.matches || !motionStoryDialog.open;
      [motionStoryProgressAnimation, motionStoryPanAnimation].forEach(animation => {
        if (!animation) return;
        if (paused) animation.pause();else animation.play();
      });
      motionStoryPause.setAttribute('aria-pressed', String(motionStoryPaused));
      motionStoryPause.setAttribute('aria-label', motionStoryPaused ? 'Play story sequence' : 'Pause story sequence');
      motionStoryPause.textContent = motionStoryPaused ? '▷' : 'Ⅱ';
      if (!paused && motionStoryProgressAnimation) {
        const remaining = Math.max(50, motionStoryDuration - Number(motionStoryProgressAnimation.currentTime || 0));
        motionStoryTimer = setTimeout(() => showMotionStory(selectedMotionStory + 1), remaining);
      }
    }
    async function showMotionStory(index) {
      clearTimeout(motionStoryTimer);
      motionStoryProgressAnimation?.cancel();
      motionStoryPanAnimation?.cancel();
      motionStoryProgressAnimation = undefined;
      motionStoryPanAnimation = undefined;
      selectedMotionStory = (index + activeMotionStories.length) % activeMotionStories.length;
      const token = ++motionStoryToken;
      const story = activeMotionStories[selectedMotionStory];
      motionStoryMain.style.setProperty('--story-bg', story.background);
      motionStoryMain.style.setProperty('--story-position', story.position);
      document.querySelector('#motion-story-title').textContent = story.title;
      document.querySelector('.motion-story-description').textContent = story.caption;
      const progress = document.querySelector('.motion-story-progress');
      progress.replaceChildren();
      activeMotionStories.forEach((_, i) => {
        const segment = document.createElement('span');
        segment.className = i < selectedMotionStory ? 'is-complete' : i === selectedMotionStory ? 'is-current' : '';
        segment.append(document.createElement('i'));
        progress.append(segment);
      });
      progress.setAttribute('aria-label', `Story ${selectedMotionStory + 1} of ${activeMotionStories.length}`);
      [['.motion-story-before', -1], ['.motion-story-after', 1]].forEach(([selector, direction]) => {
        const neighbour = activeMotionStories[(selectedMotionStory + direction + activeMotionStories.length) % activeMotionStories.length];
        const button = document.querySelector(selector);
        button.style.setProperty('--story-bg', neighbour.background);
        button.style.setProperty('--story-position', neighbour.position);
        button.querySelector('img').src = neighbour.image;
        button.querySelector('span').textContent = neighbour.title;
        button.setAttribute('aria-label', `${direction < 0 ? 'Previous' : 'Next'} silk story: ${neighbour.title}`);
      });
      refreshMotionShopping();
      const preload = new Image();
      preload.src = story.image;
      try {
        await preload.decode();
      } catch {/* The image alt text remains available. */}
      if (!scope.isActive() || token !== motionStoryToken || !motionStoryDialog.open) return;
      motionStoryPhoto.src = story.image;
      motionStoryPhoto.alt = `${story.title}, animated photo story`;
      if (!motionPreference.matches) {
        scope.animate(motionStoryPhoto, [{
          opacity: .4
        }, {
          opacity: 1
        }], {
          duration: 350,
          easing: 'ease-out'
        });
        motionStoryPanAnimation = scope.animate(motionStoryPhoto, [{
          transform: 'scale(1.035) translateY(0)'
        }, {
          transform: 'scale(1.12) translateY(-1%)'
        }], {
          duration: motionStoryDuration,
          easing: 'linear',
          fill: 'forwards'
        });
        motionStoryProgressAnimation = scope.animate(progress.querySelector('.is-current>i'), [{
          transform: 'scaleX(0)'
        }, {
          transform: 'scaleX(1)'
        }], {
          duration: motionStoryDuration,
          easing: 'linear',
          fill: 'forwards'
        });
      } else progress.querySelector('.is-current>i').style.transform = 'scaleX(1)';
      refreshMotionStoryPlayback();
    }
    function openMotionStory(index, opener, collection = motionStories) {
      activeMotionStories = collection;
      motionStoryOpener = opener;
      motionStoryPaused = false;
      motionStoryHeld = false;
      motionStoryDialog.showModal();
      document.body.style.overflow = 'hidden';
      motionStoryMain.focus({
        preventScroll: true
      });
      showMotionStory(index);
      refreshRotation();
      refreshMusePlayback();
    }
    listen(document.querySelector('.motion-story-close'), 'click', () => motionStoryDialog.close());
    listen(document.querySelector('.motion-story-before'), 'click', () => showMotionStory(selectedMotionStory - 1));
    listen(document.querySelector('.motion-story-after'), 'click', () => showMotionStory(selectedMotionStory + 1));
    listen(motionStoryPause, 'click', () => {
      motionStoryPaused = !motionStoryPaused;
      refreshMotionStoryPlayback();
    });
    listen(document.querySelector('.motion-story-add'), 'click', () => addMotionSilk(selectedMotionStory));
    listen(document.querySelector('.motion-story-favourite'), 'click', () => toggleMotionFavourite(selectedMotionStory));
    listen(document.querySelector('.motion-story-more'), 'click', () => {
      document.body.style.overflow = '';
      motionStoryDialog.close();
    });
    listen(motionStoryDialog, 'keydown', event => {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
        showMotionStory(event.key === 'Home' ? 0 : event.key === 'End' ? activeMotionStories.length - 1 : selectedMotionStory + (event.key === 'ArrowRight' ? 1 : -1));
      } else if (event.key === ' ' && !event.target.closest('button,a')) {
        event.preventDefault();
        motionStoryPaused = !motionStoryPaused;
        refreshMotionStoryPlayback();
      }
    });
    listen(motionStoryMain, 'pointerdown', event => {
      if (event.target.closest('button,a')) return;
      motionGesture = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
        id: event.pointerId
      };
      motionStoryHeld = true;
      refreshMotionStoryPlayback();
      motionStoryMain.setPointerCapture(event.pointerId);
    });
    listen(motionStoryMain, 'pointerup', event => {
      if (!motionGesture || event.pointerId !== motionGesture.id) return;
      const gesture = motionGesture;
      motionGesture = undefined;
      motionStoryHeld = false;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) showMotionStory(selectedMotionStory + (dx < 0 ? 1 : -1));else if (performance.now() - gesture.time < 250 && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
        const rect = motionStoryMain.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        if (x < .33) showMotionStory(selectedMotionStory - 1);else if (x > .66) showMotionStory(selectedMotionStory + 1);else refreshMotionStoryPlayback();
      } else refreshMotionStoryPlayback();
    });
    listen(motionStoryMain, 'pointercancel', () => {
      motionGesture = undefined;
      motionStoryHeld = false;
      refreshMotionStoryPlayback();
    });
    listen(motionStoryDialog, 'click', event => {
      if (event.target === motionStoryDialog) motionStoryDialog.close();
    });
    listen(motionStoryDialog, 'close', () => {
      ++motionStoryToken;
      clearTimeout(motionStoryTimer);
      motionStoryPhoto.getAnimations().forEach(animation => animation.cancel());
      motionStoryProgressAnimation?.cancel();
      motionStoryHeld = false;
      motionGesture = undefined;
      document.body.style.overflow = '';
      if (motionStoryOpener?.isConnected) motionStoryOpener.focus({
        preventScroll: true
      });
      refreshRotation();
      refreshMusePlayback();
    });
    listen(document, 'visibilitychange', refreshMotionStoryPlayback);
    listen(motionPreference, 'change', () => {
      motionCardAnimations.forEach(animation => animation.cancel());
      if (motionStoryDialog.open) showMotionStory(selectedMotionStory);
    });
    listen(document, 'silk-selection-change', refreshMotionShopping);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (!motionPreference.matches) {
            const index = motionCards.indexOf(entry.target);
            motionCardAnimations.push(scope.animate(entry.target, [{
              opacity: 0,
              transform: 'translateY(40px)'
            }, {
              opacity: 1,
              transform: `translateY(0) rotate(${[-1, .6, -.7, .8, 0, -.6, .8, -.4][index]}deg)`
            }], {
              duration: 800,
              delay: Math.min(index, 4) * 70,
              easing: 'cubic-bezier(.2,.7,.25,1)',
              fill: 'backwards'
            }));
          }
          observer.unobserve(entry.target);
        });
      }, {
        threshold: .12
      });
      motionCards.forEach(card => observer.observe(card));
    }
    refreshMotionShopping();
    updateMotionRailControls();
    
    // Footer shortcuts open the existing collections, with focus returned to the
    // initiating footer control when the dialog closes.
    listen(document.querySelector('.footer-open-bag'), 'click', event => {
      const opener = event.currentTarget;
      listen(bagDialog, 'close', () => opener.focus({
        preventScroll: true
      }), {
        once: true
      });
      bagButton.click();
    });
    listen(document.querySelector('.footer-open-favourites'), 'click', event => {
      const opener = event.currentTarget;
      listen(silkFavouritesDialog, 'close', () => opener.focus({
        preventScroll: true
      }), {
        once: true
      });
      wishlistButton.click();
    });
    
    // ---- festive.js ----
    // A second, distinct shoppable collection strip from the reference. The portrait
    // viewer is shared with Silk, in motion, but the ten-item sequence stays separate.
    const festiveProductOrder = [26, 28, 27, 25, 24, 30, 29, 31, 14, 9];
    const festiveStories = festiveProductOrder.map(product => ({
      title: silks[product].name,
      product,
      image: silks[product].image,
      position: product >= 24 ? 'center 22%' : 'center 38%',
      background: '#59402e',
      caption: silks[product].description
    }));
    // Use full campaign portraits for the two colour-edit silks at the end.
    festiveStories[8].image = 'assets/mood-festive.webp';
    festiveStories[9].image = 'assets/mood-kanchipuram.webp';
    const festiveSection = document.querySelector('.festive-silks');
    const festiveWindow = document.querySelector('.festive-window');
    const festiveRail = document.querySelector('.festive-rail');
    const festivePrevious = document.querySelector('.festive-prev');
    const festiveNext = document.querySelector('.festive-next');
    const festivePause = document.querySelector('.festive-pause');
    let festiveVisible = false;
    let festivePaused = false;
    let festiveHovered = false;
    let festiveFocused = false;
    let festiveTimer;
    let festiveDirection = 1;
    const festiveEntranceAnimations = [];
    const festiveCards = festiveStories.map((story, index) => {
      const card = document.createElement('article');
      card.className = 'festive-card';
      card.dataset.festiveIndex = String(index);
      const image = document.createElement('img');
      image.src = story.image;
      image.alt = `${story.title}, festive silk styling`;
      image.style.objectPosition = story.position;
      image.width = 360;
      image.height = 640;
      image.loading = 'lazy';
      const open = document.createElement('button');
      open.type = 'button';
      open.className = 'festive-open';
      open.setAttribute('aria-label', `Open ${story.title} festive story`);
      const number = document.createElement('span');
      number.className = 'festive-card-number';
      number.textContent = `MUSE ${String(index + 1).padStart(2, '0')}`;
      const icon = document.createElement('span');
      icon.className = 'festive-open-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.append(motionIcon('arrow'));
      const copy = document.createElement('span');
      copy.className = 'festive-card-copy';
      const category = document.createElement('small');
      category.textContent = silks[story.product].category || 'Festive silk';
      const title = document.createElement('strong');
      title.textContent = story.title;
      const description = document.createElement('span');
      description.textContent = story.caption;
      copy.append(category, title, description);
      open.append(number, icon, copy);
      listen(open, 'click', () => openMotionStory(index, open, festiveStories));
      const heart = document.createElement('button');
      heart.type = 'button';
      heart.className = 'festive-heart';
      heart.append(motionIcon('heart'));
      listen(heart, 'click', () => toggleMotionFavourite(index, festiveStories));
      const shop = document.createElement('div');
      shop.className = 'festive-card-shop';
      const tag = document.createElement('span');
      tag.textContent = 'FESTIVE SILK';
      const add = document.createElement('button');
      add.type = 'button';
      add.className = 'festive-add';
      add.append(document.createTextNode('Add to bag '), motionIcon('bag'));
      listen(add, 'click', () => {
        addMotionSilk(index, festiveStories);
        document.querySelector('.festive-live-status').textContent = `${story.title} saved to your bag.`;
      });
      shop.append(tag, add);
      card.append(image, open, heart, shop);
      festiveRail.append(card);
      return card;
    });
    function refreshFestiveShopping() {
      festiveCards.forEach((card, index) => {
        const story = festiveStories[index];
        const added = savedSilks.includes(story.product);
        const saved = favouriteSilks.includes(story.product);
        const add = card.querySelector('.festive-add');
        add.classList.toggle('is-added', added);
        add.firstChild.textContent = added ? 'In your bag ' : 'Add to bag ';
        add.setAttribute('aria-label', added ? `${story.title} is in your bag` : `Add ${story.title} from festive collection to bag`);
        const heart = card.querySelector('.festive-heart');
        heart.setAttribute('aria-pressed', String(saved));
        heart.setAttribute('aria-label', `${saved ? 'Remove' : 'Save'} ${story.title} ${saved ? 'from' : 'to'} favourites`);
      });
    }
    function updateFestiveControls() {
      const range = Math.max(1, festiveWindow.scrollWidth - festiveWindow.clientWidth);
      const progress = clamp(festiveWindow.scrollLeft / range);
      festivePrevious.disabled = festiveWindow.scrollLeft < 3;
      festiveNext.disabled = festiveWindow.scrollLeft >= range - 3;
      document.querySelector('.festive-position').textContent = `${String(Math.round(progress * 9) + 1).padStart(2, '0')} / 10`;
    }
    function stepFestive(direction) {
      const distance = festiveCards[0].offsetWidth + parseFloat(getComputedStyle(festiveRail).gap);
      festiveWindow.scrollBy({
        left: distance * direction,
        behavior: motionPreference.matches ? 'instant' : 'smooth'
      });
    }
    function refreshFestivePlayback() {
      clearTimeout(festiveTimer);
      if (!festiveVisible || festivePaused || festiveHovered || festiveFocused || motionPreference.matches || document.hidden || festiveSection.classList.contains('is-expanded') || document.querySelector('dialog[open]')) return;
      festiveTimer = setTimeout(() => {
        const range = festiveWindow.scrollWidth - festiveWindow.clientWidth;
        if (festiveWindow.scrollLeft >= range - 3) festiveDirection = -1;else if (festiveWindow.scrollLeft < 3) festiveDirection = 1;
        stepFestive(festiveDirection);
        refreshFestivePlayback();
      }, 4800);
    }
    listen(festivePrevious, 'click', () => {
      stepFestive(-1);
      refreshFestivePlayback();
    });
    listen(festiveNext, 'click', () => {
      stepFestive(1);
      refreshFestivePlayback();
    });
    listen(festiveWindow, 'scroll', updateFestiveControls, {
      passive: true
    });
    listen(window, 'resize', updateFestiveControls);
    listen(festiveWindow, 'keydown', event => {
      if (festiveSection.classList.contains('is-expanded') || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'Home' || event.key === 'End') festiveWindow.scrollTo({
        left: event.key === 'Home' ? 0 : festiveWindow.scrollWidth,
        behavior: motionPreference.matches ? 'instant' : 'smooth'
      });else stepFestive(event.key === 'ArrowRight' ? 1 : -1);
    });
    listen(festivePause, 'click', () => {
      festivePaused = !festivePaused;
      if (!festivePaused) {
        festiveHovered = false;
        festiveFocused = false;
      }
      festivePause.setAttribute('aria-pressed', String(festivePaused));
      festivePause.setAttribute('aria-label', festivePaused ? 'Play festive silk browsing' : 'Pause festive silk browsing');
      festivePause.textContent = festivePaused ? '▷' : 'Ⅱ';
      refreshFestivePlayback();
    });
    listen(festiveSection, 'pointerenter', event => {
      if (event.pointerType === 'mouse') {
        festiveHovered = true;
        refreshFestivePlayback();
      }
    });
    listen(festiveSection, 'pointerleave', () => {
      festiveHovered = false;
      refreshFestivePlayback();
    });
    listen(festiveSection, 'focusin', () => {
      festiveFocused = true;
      refreshFestivePlayback();
    });
    listen(festiveSection, 'focusout', event => {
      festiveFocused = festiveSection.contains(event.relatedTarget);
      refreshFestivePlayback();
    });
    listen(document.querySelector('.festive-view-all'), 'click', event => {
      const expanded = festiveSection.classList.toggle('is-expanded');
      event.currentTarget.setAttribute('aria-expanded', String(expanded));
      event.currentTarget.firstChild.textContent = expanded ? 'View fewer ' : 'View all ten ';
      festiveWindow.scrollTo({
        left: 0,
        behavior: 'instant'
      });
      festiveWindow.focus({
        preventScroll: true
      });
      festiveSection.scrollIntoView({
        block: 'start',
        behavior: 'instant'
      });
      requestAnimationFrame(updateFestiveControls);
      refreshFestivePlayback();
    });
    listen(document, 'silk-selection-change', refreshFestiveShopping);
    listen(document, 'visibilitychange', refreshFestivePlayback);
    listen(motionPreference, 'change', () => {
      festiveEntranceAnimations.forEach(animation => animation.cancel());
      refreshFestivePlayback();
    });
    document.querySelectorAll('dialog').forEach(dialog => new MutationObserver(refreshFestivePlayback).observe(dialog, {
      attributes: true,
      attributeFilter: ['open']
    }));
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        festiveVisible = entries[0].isIntersecting;
        refreshFestivePlayback();
      }, {
        threshold: .15
      }).observe(festiveSection);
      const entryObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (!motionPreference.matches) {
            const index = festiveCards.indexOf(entry.target);
            festiveEntranceAnimations.push(scope.animate(entry.target, [{
              opacity: 0,
              transform: 'translateY(35px)'
            }, {
              opacity: 1,
              transform: 'translateY(0)'
            }], {
              duration: 800,
              delay: Math.min(index, 5) * 60,
              easing: 'cubic-bezier(.2,.7,.25,1)',
              fill: 'backwards'
            }));
          }
          entryObserver.unobserve(entry.target);
        });
      }, {
        threshold: .12
      });
      festiveCards.forEach(card => entryObserver.observe(card));
    }
    refreshFestiveShopping();
    updateFestiveControls();
    
    // ---- bridal.js ----
    // The Bridal Collection shares the main catalogue and persistent silk bag.
    const bridalProducts = silks.slice(24, 32);
    const bridalSection = document.querySelector('.bridal-collection');
    const bridalFan = document.querySelector('.bridal-fan');
    const bridalPause = document.querySelector('.bridal-pause');
    let selectedBridal = 0;
    let bridalTimer;
    let bridalInView = false;
    let bridalPaused = false;
    let bridalHovered = false;
    let bridalFocused = false;
    let bridalScrollFrame = 0;
    try {
      const stored = Number(localStorage.getItem('noolam-bridal-last-v1'));
      if (Number.isInteger(stored) && stored >= 0 && stored < bridalProducts.length) selectedBridal = stored;
    } catch {/* The collection remains browsable without storage. */}
    const bridalDotButtons = [];
    const bridalCards = bridalProducts.map((product, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'bridal-card';
      card.dataset.bridalIndex = String(index);
      card.setAttribute('aria-label', `Select ${product.name} bridal silk`);
      const image = document.createElement('img');
      image.src = product.image;
      image.alt = `${product.name}, a bridal silk campaign portrait`;
      image.width = 400;
      image.height = 640;
      image.loading = 'lazy';
      card.append(image);
      listen(card, 'click', () => selectBridalSilk(index));
      bridalFan.append(card);
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show ${product.name}`);
      listen(dot, 'click', () => selectBridalSilk(index));
      document.querySelector('.bridal-dots').append(dot);
      bridalDotButtons.push(dot);
      return card;
    });
    function updateBridalShopping() {
      const product = bridalProducts[selectedBridal];
      const index = selectedBridal + 24;
      const added = savedSilks.includes(index);
      const favourite = favouriteSilks.includes(index);
      const add = document.querySelector('.bridal-add');
      add.firstChild.textContent = added ? 'Silk added to bag ' : 'Add to bag ';
      add.setAttribute('aria-label', added ? `${product.name} is in your bag` : `Add ${product.name} to bag`);
      const heart = document.querySelector('.bridal-favourite');
      heart.setAttribute('aria-pressed', String(favourite));
      heart.setAttribute('aria-label', `${favourite ? 'Remove' : 'Save'} ${product.name} ${favourite ? 'from' : 'to'} favourites`);
    }
    function refreshBridalRotation() {
      clearTimeout(bridalTimer);
      if (!bridalInView || bridalPaused || bridalHovered || bridalFocused || motionPreference.matches || document.hidden || document.querySelector('dialog[open]')) return;
      bridalTimer = setTimeout(() => selectBridalSilk(selectedBridal + 1, false), 6500);
    }
    function layoutBridalFan() {
      const width = bridalFan.clientWidth;
      const mobile = window.innerWidth <= 520;
      const portraitWidth = mobile ? Math.min(190, width * .47) : Math.min(250, Math.max(175, width * .19));
      bridalFan.style.setProperty('--bridal-card-width', `${portraitWidth}px`);
      bridalFan.style.setProperty('--bridal-card-height', `${portraitWidth * 1.58}px`);
      bridalFan.style.setProperty('--fan-step', `${portraitWidth * (mobile ? .64 : .76)}px`);
      const accessibleDistance = mobile ? 1 : window.innerWidth <= 850 ? 2 : 3;
      bridalCards.forEach((card, index) => {
        let slot = (index - selectedBridal + bridalProducts.length) % bridalProducts.length;
        if (slot > bridalProducts.length / 2) slot -= bridalProducts.length;
        const distance = Math.abs(slot);
        card.style.setProperty('--fan-slot', String(slot));
        card.style.setProperty('--fan-distance', String(distance));
        card.style.setProperty('--fan-scale', String(Math.max(.55, 1 - distance * .105)));
        card.style.setProperty('--fan-opacity', String(distance === 0 ? 1 : distance === 1 ? .78 : distance === 2 ? .47 : distance === 3 ? .23 : 0));
        card.style.setProperty('--fan-blur', distance > 1 ? '.35px' : '0px');
        card.style.setProperty('--fan-layer', String(20 - distance));
        card.classList.toggle('is-current', index === selectedBridal);
        card.setAttribute('aria-pressed', String(index === selectedBridal));
        card.setAttribute('aria-hidden', String(distance > accessibleDistance));
        card.tabIndex = distance > accessibleDistance ? -1 : 0;
        bridalDotButtons[index].setAttribute('aria-pressed', String(index === selectedBridal));
      });
    }
    function updateBridalFanScroll() {
      bridalScrollFrame = 0;
      const bounds = bridalFan.getBoundingClientRect();
      const progress = motionPreference.matches ? 1 : clamp((window.innerHeight - bounds.top) / (Math.min(bounds.height, window.innerHeight) * .9 + window.innerHeight * .08));
      bridalSection.style.setProperty('--fan-open', String(progress));
    }
    function requestBridalFanScroll() {
      if (!bridalScrollFrame) bridalScrollFrame = requestAnimationFrame(updateBridalFanScroll);
    }
    function selectBridalSilk(index, announce = true) {
      selectedBridal = (index + bridalProducts.length) % bridalProducts.length;
      const product = bridalProducts[selectedBridal];
      document.querySelector('.bridal-occasion').textContent = product.occasion;
      document.querySelector('#bridal-selected-title').textContent = product.name;
      document.querySelector('.bridal-description').textContent = product.description;
      document.querySelector('.bridal-counter').textContent = `${String(selectedBridal + 1).padStart(2, '0')} / 08`;
      layoutBridalFan();
      updateBridalShopping();
      refreshBridalRotation();
      try {
        localStorage.setItem('noolam-bridal-last-v1', String(selectedBridal));
      } catch {/* Keep the active portrait in memory. */}
      if (announce) document.querySelector('.bridal-live-status').textContent = `${product.name}. Bridal silk ${selectedBridal + 1} of 8.`;
    }
    listen(document.querySelector('.bridal-previous'), 'click', () => selectBridalSilk(selectedBridal - 1));
    listen(document.querySelector('.bridal-next'), 'click', () => selectBridalSilk(selectedBridal + 1));
    listen(bridalFan, 'keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      selectBridalSilk(event.key === 'Home' ? 0 : event.key === 'End' ? bridalProducts.length - 1 : selectedBridal + (event.key === 'ArrowRight' ? 1 : -1));
      bridalFan.focus({
        preventScroll: true
      });
    });
    listen(document.querySelector('.bridal-add'), 'click', () => {
      const index = selectedBridal + 24;
      if (!savedSilks.includes(index)) {
        savedSilks.push(index);
        persistLookBag();
        updateSilkButtons();
      }
      showNotice(`${bridalProducts[selectedBridal].name} saved to your bag.`);
    });
    listen(document.querySelector('.bridal-favourite'), 'click', () => {
      const index = selectedBridal + 24;
      const favourite = favouriteSilks.includes(index);
      favouriteSilks = favourite ? favouriteSilks.filter(value => value !== index) : [...favouriteSilks, index];
      saveSilkFavourites();
      document.querySelector('.bridal-live-status').textContent = `${bridalProducts[selectedBridal].name} ${favourite ? 'removed from' : 'saved to'} your favourites.`;
    });
    listen(bridalPause, 'click', () => {
      bridalPaused = !bridalPaused;
      if (!bridalPaused) {
        bridalFocused = false;
        bridalHovered = false;
      }
      bridalPause.setAttribute('aria-pressed', String(bridalPaused));
      bridalPause.setAttribute('aria-label', bridalPaused ? 'Play bridal collection rotation' : 'Pause bridal collection rotation');
      bridalPause.textContent = bridalPaused ? '▷' : 'Ⅱ';
      refreshBridalRotation();
    });
    listen(bridalSection, 'pointerenter', event => {
      if (event.pointerType === 'mouse') {
        bridalHovered = true;
        refreshBridalRotation();
      }
    });
    listen(bridalSection, 'pointerleave', () => {
      bridalHovered = false;
      refreshBridalRotation();
    });
    listen(bridalSection, 'focusin', () => {
      bridalFocused = true;
      refreshBridalRotation();
    });
    listen(bridalSection, 'focusout', event => {
      bridalFocused = bridalSection.contains(event.relatedTarget);
      refreshBridalRotation();
    });
    let bridalSwipeStart;
    let bridalIgnoreClick = false;
    listen(bridalFan, 'pointerdown', event => {
      bridalSwipeStart = {
        x: event.clientX,
        y: event.clientY
      };
    });
    listen(bridalFan, 'pointercancel', () => {
      bridalSwipeStart = undefined;
    });
    listen(bridalFan, 'pointerup', event => {
      if (!bridalSwipeStart) return;
      const dx = event.clientX - bridalSwipeStart.x;
      const dy = event.clientY - bridalSwipeStart.y;
      bridalSwipeStart = undefined;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        selectBridalSilk(selectedBridal + (dx < 0 ? 1 : -1));
        bridalIgnoreClick = true;
        setTimeout(() => bridalIgnoreClick = false, 100);
      }
    });
    listen(bridalFan, 'click', event => {
      if (bridalIgnoreClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
    listen(window, 'scroll', requestBridalFanScroll, {
      passive: true
    });
    listen(window, 'resize', () => {
      layoutBridalFan();
      requestBridalFanScroll();
    });
    listen(window, 'load', requestBridalFanScroll);
    listen(document, 'visibilitychange', refreshBridalRotation);
    listen(document, 'silk-selection-change', updateBridalShopping);
    listen(motionPreference, 'change', () => {
      refreshBridalRotation();
      requestBridalFanScroll();
    });
    document.querySelectorAll('dialog').forEach(dialog => new MutationObserver(refreshBridalRotation).observe(dialog, {
      attributes: true,
      attributeFilter: ['open']
    }));
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
      bridalInView = entries[0].isIntersecting;
      refreshBridalRotation();
    }, {
      threshold: .15
    }).observe(bridalSection);
    selectBridalSilk(selectedBridal, false);
    requestBridalFanScroll();
    
    // ---- weave.js ----
    // Shared catalogue and bag helpers come from script.js, loaded first.
    // This renderer projects three textured ribbons into a native 2D canvas.
    const weaveChoices = [{
      product: 9,
      name: 'Rani Pink Temple Border',
      colour: '#d42478'
    }, {
      product: 8,
      name: 'Royal Blue Zari',
      colour: '#304cb7'
    }, {
      product: 10,
      name: 'Violet Brocade',
      colour: '#723c82'
    }, {
      product: 11,
      name: 'Emerald Silk',
      colour: '#267453'
    }, {
      product: 12,
      name: 'Marigold Silk',
      colour: '#e58b23'
    }, {
      product: 13,
      name: 'Ruby Temple Border',
      colour: '#932c47'
    }, {
      product: 14,
      name: 'Golden Hour Silk',
      colour: '#d7b339'
    }, {
      product: 15,
      name: 'Temple Teal',
      colour: '#218b92'
    }];
    const weaveSection = document.querySelector('.the-weave');
    const weaveCanvas = document.querySelector('.weave-canvas');
    const weaveContext = weaveCanvas.getContext('2d');
    const weavePauseButton = document.querySelector('.weave-pause');
    const weaveAddButton = document.querySelector('.weave-add');
    const weaveRoman = ['I', 'II', 'III'];
    let weaveThreads = [9, 8, 14];
    let activeWeaveThread = 0;
    try {
      const stored = JSON.parse(localStorage.getItem('noolam-weave-v1') || 'null');
      if (Array.isArray(stored) && stored.length === 3) {
        const seen = new Set();
        weaveThreads = stored.map(value => {
          if (!weaveChoices.some(choice => choice.product === value) || seen.has(value)) return null;
          seen.add(value);
          return value;
        });
      }
    } catch {/* Keep the recommended trio when stored choices cannot be read. */}
    const weaveTextures = new Map();
    const weaveWeights = weaveThreads.map(value => value === null ? 0 : 1);
    const weavePreviousProducts = weaveThreads.map((value, index) => value === null ? [9, 8, 14][index] : value);
    let weaveVisible = false;
    let weavePaused = false;
    let weaveFrame = 0;
    let weaveLastDraw = 0;
    let weaveTime = .65;
    let weaveScrollPhase = 0;
    let weaveWidth = 1;
    let weaveHeight = 1;
    let weavePixelRatio = 1;
    const weaveSlotElements = weaveRoman.map((roman, index) => {
      const row = document.createElement('div');
      row.className = 'weave-slot';
      const select = document.createElement('button');
      select.type = 'button';
      select.className = 'weave-slot-select';
      const number = document.createElement('span');
      number.textContent = roman;
      const name = document.createElement('span');
      select.append(number, name);
      listen(select, 'click', () => {
        activeWeaveThread = index;
        updateWeaveControls();
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'weave-slot-remove';
      remove.textContent = '×';
      listen(remove, 'click', () => {
        weaveThreads[index] = null;
        activeWeaveThread = index;
        saveWeave();
        updateWeaveControls();
        requestWeaveFrame();
        select.focus({
          preventScroll: true
        });
        document.querySelector('.weave-live-status').textContent = `Thread ${roman} is ready for a new colour.`;
      });
      row.append(select, remove);
      document.querySelector('.weave-slots').append(row);
      return {
        row,
        select,
        name,
        remove
      };
    });
    const weaveSwatchButtons = weaveChoices.map(choice => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'weave-swatch';
      button.dataset.weaveProduct = String(choice.product);
      button.style.setProperty('--swatch-colour', choice.colour);
      button.style.setProperty('--swatch-image', `url('${new URL(silks[choice.product].image, document.baseURI).href}')`);
      button.title = choice.name;
      button.append(document.createElement('span'));
      listen(button, 'click', () => {
        const existing = weaveThreads.indexOf(choice.product);
        if (existing >= 0) {
          activeWeaveThread = existing;
          document.querySelector('.weave-live-status').textContent = `${choice.name} is in thread ${weaveRoman[existing]}.`;
        } else {
          const changed = activeWeaveThread;
          weaveThreads[changed] = choice.product;
          weavePreviousProducts[changed] = choice.product;
          weaveWeights[changed] = motionPreference.matches || weavePaused ? 1 : .15;
          activeWeaveThread = weaveThreads.indexOf(null);
          if (activeWeaveThread < 0) activeWeaveThread = (changed + 1) % 3;
          document.querySelector('.weave-live-status').textContent = `${choice.name} woven into thread ${weaveRoman[changed]}.`;
          saveWeave();
        }
        updateWeaveControls();
        requestWeaveFrame();
      });
      document.querySelector('.weave-swatches').append(button);
      return button;
    });
    function saveWeave() {
      try {
        localStorage.setItem('noolam-weave-v1', JSON.stringify(weaveThreads));
      } catch {/* Compose in memory when storage is unavailable. */}
    }
    function updateWeaveControls() {
      weaveSlotElements.forEach((slot, index) => {
        const choice = weaveChoices.find(choice => choice.product === weaveThreads[index]);
        const active = index === activeWeaveThread;
        slot.row.classList.toggle('is-empty', !choice);
        slot.row.setAttribute('aria-current', String(active));
        slot.name.textContent = choice ? choice.name : 'A thread, waiting';
        slot.select.setAttribute('aria-pressed', String(active));
        slot.select.setAttribute('aria-label', `Select thread ${weaveRoman[index]}: ${choice ? choice.name : 'empty'}`);
        slot.remove.disabled = !choice;
        slot.remove.setAttribute('aria-label', choice ? `Remove ${choice.name} from the weave` : `Thread ${weaveRoman[index]} is empty`);
      });
      weaveChoices.forEach((choice, index) => {
        const thread = weaveThreads.indexOf(choice.product);
        const active = thread === activeWeaveThread && thread >= 0;
        const button = weaveSwatchButtons[index];
        button.setAttribute('aria-pressed', String(thread >= 0));
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-label', `Choose ${choice.name}${thread >= 0 ? `, in thread ${weaveRoman[thread]}` : ''}`);
        button.querySelector('span').textContent = thread >= 0 ? weaveRoman[thread] : '';
      });
      const active = weaveChoices.find(choice => choice.product === weaveThreads[activeWeaveThread]);
      document.querySelector('.weave-active-name').textContent = active ? active.name : 'Your next colour awaits.';
      const selected = weaveThreads.filter(value => value !== null);
      const complete = selected.length === 3;
      const saved = complete && selected.every(index => savedSilks.includes(index));
      document.querySelector('.weave-selected-count').textContent = complete ? 'THREE SILKS, STYLED TOGETHER' : `${selected.length} OF 3 THREADS SELECTED`;
      document.querySelector('.weave-set-status').textContent = complete ? saved ? 'Your weave, kept close.' : 'Your own colour story.' : `Choose ${3 - selected.length} more ${selected.length === 2 ? 'silk' : 'silks'}.`;
      weaveAddButton.disabled = !complete;
      weaveAddButton.firstChild.textContent = saved ? 'Weave saved in bag ' : 'Add the weave to bag ';
      weaveAddButton.setAttribute('aria-label', complete ? saved ? 'All three weave silks are in your bag' : 'Add the three selected silks to bag' : 'Choose three silks before adding the weave to bag');
      weaveCanvas.setAttribute('aria-label', selected.length ? `${selected.length} silk ribbons intertwining: ${selected.map(index => weaveChoices.find(choice => choice.product === index).name).join(', ')}` : 'Three fine threads, waiting for you to choose their silk colours');
    }
    listen(document.querySelector('.weave-reset'), 'click', () => {
      weaveThreads = [null, null, null];
      activeWeaveThread = 0;
      saveWeave();
      updateWeaveControls();
      requestWeaveFrame();
      document.querySelector('.weave-live-status').textContent = 'A new weave. Choose three silk colours.';
    });
    listen(weaveAddButton, 'click', () => {
      if (weaveThreads.some(value => value === null)) return;
      weaveThreads.forEach(index => {
        if (!savedSilks.includes(index)) savedSilks.push(index);
      });
      persistLookBag();
      updateSilkButtons();
      updateWeaveControls();
      showNotice('Your three-silk weave is saved to your bag.');
      document.querySelector('.weave-live-status').textContent = 'All three silks are saved to your bag.';
    });
    listen(document, 'silk-selection-change', updateWeaveControls);
    
    // Derive a ribbon material from the fabric portion of each existing hanger
    // photograph. Cropping is done in the live renderer; source assets stay intact.
    weaveChoices.forEach(choice => {
      const image = new Image();
      image.onload = scope.guard(() => {
        const material = document.createElement('canvas');
        material.width = 768;
        material.height = 96;
        const context = material.getContext('2d');
        context.fillStyle = choice.colour;
        context.fillRect(0, 0, 768, 96);
        context.drawImage(image, image.width * .15, image.height * .34, image.width * .68, image.height * .61, 0, 0, 768, 96);
        const sheen = context.createLinearGradient(0, 0, 0, 96);
        sheen.addColorStop(0, '#fff2');
        sheen.addColorStop(.45, '#fff0');
        sheen.addColorStop(1, '#9b681a22');
        context.fillStyle = sheen;
        context.fillRect(0, 0, 768, 96);
        weaveTextures.set(choice.product, material);
        requestWeaveFrame();
      });
      image.src = silks[choice.product].image;
    });
    function weaveIsRunning() {
      return weaveVisible && !weavePaused && !motionPreference.matches && !document.hidden && !document.querySelector('dialog[open]');
    }
    function measureWeave() {
      const bounds = document.querySelector('.weave-stage').getBoundingClientRect();
      weaveWidth = Math.max(1, bounds.width);
      weaveHeight = Math.max(1, bounds.height);
      weavePixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      weaveCanvas.width = Math.round(weaveWidth * weavePixelRatio);
      weaveCanvas.height = Math.round(weaveHeight * weavePixelRatio);
      requestWeaveFrame();
    }
    function requestWeaveFrame() {
      if (!weaveFrame && weaveContext) weaveFrame = requestAnimationFrame(drawWeaveFrame);
    }
    function weavePoint(t, phase, edge, width) {
      const angle = t * Math.PI * 5 + phase - weaveTime + weaveScrollPhase;
      const amplitude = weaveHeight * .205;
      const roll = angle * .72 + phase * .4;
      const normalY = Math.cos(roll) * width * .5;
      const normalZ = Math.sin(roll) * width * .5;
      const z = Math.cos(angle) * 65 + normalZ * edge;
      const perspective = 1 + z / 1900;
      const x = (t - .5) * (weaveWidth + 180);
      const y = Math.sin(angle) * amplitude + normalY * edge;
      return {
        x: weaveWidth / 2 + x * perspective,
        y: weaveHeight / 2 + y * perspective,
        z
      };
    }
    function drawWeaveSegment(segment) {
      const ctx = weaveContext;
      const [a, b, c, d] = segment.points.map(point => ({
        ...point
      }));
      // Overlap adjoining mesh slices slightly so canvas clip antialiasing cannot
      // expose white seams between otherwise continuous pieces of silk.
      const dx = (b.x + c.x - a.x - d.x) / 2;
      const dy = (b.y + c.y - a.y - d.y) / 2;
      const length = Math.max(.01, Math.hypot(dx, dy));
      const overlapX = dx / length * 1.1;
      const overlapY = dy / length * 1.1;
      [a, d].forEach(point => {
        point.x -= overlapX;
        point.y -= overlapY;
      });
      [b, c].forEach(point => {
        point.x += overlapX;
        point.y += overlapY;
      });
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.lineTo(d.x, d.y);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = weaveChoices.find(choice => choice.product === segment.product)?.colour || '#c6b994';
      ctx.fill();
      const material = weaveTextures.get(segment.product);
      if (material) {
        const sampleWidth = material.width * 2.5 / segment.steps;
        const sampleX = (segment.t * material.width * 2.5 + weaveTime * 28) % (material.width - sampleWidth);
        ctx.save();
        ctx.transform((b.x - a.x) / sampleWidth, (b.y - a.y) / sampleWidth, (d.x - a.x) / 96, (d.y - a.y) / 96, a.x, a.y);
        ctx.drawImage(material, sampleX, 0, sampleWidth, 96, 0, 0, sampleWidth + .5, 96);
        ctx.restore();
      } else {
        ctx.fillStyle = weaveChoices.find(choice => choice.product === segment.product)?.colour || '#c6b994';
        ctx.fillRect(Math.min(a.x, d.x) - 2, Math.min(a.y, b.y, c.y, d.y) - 2, Math.max(b.x, c.x) - Math.min(a.x, d.x) + 4, Math.max(a.y, b.y, c.y, d.y) - Math.min(a.y, b.y, c.y, d.y) + 4);
      }
      const shade = ctx.createLinearGradient((a.x + b.x) / 2, (a.y + b.y) / 2, (c.x + d.x) / 2, (c.y + d.y) / 2);
      shade.addColorStop(0, '#25190e40');
      shade.addColorStop(.2, '#fff5d62e');
      shade.addColorStop(.48, '#fff5d605');
      shade.addColorStop(.82, '#25150a25');
      shade.addColorStop(1, '#1d120c66');
      ctx.fillStyle = shade;
      ctx.fillRect(Math.min(a.x, b.x, c.x, d.x) - 2, Math.min(a.y, b.y, c.y, d.y) - 2, Math.max(a.x, b.x, c.x, d.x) - Math.min(a.x, b.x, c.x, d.x) + 4, Math.max(a.y, b.y, c.y, d.y) - Math.min(a.y, b.y, c.y, d.y) + 4);
      if (segment.depth < -15) {
        ctx.fillStyle = `rgba(32,20,16,${(-segment.depth - 15) / 400})`;
        ctx.fillRect(0, 0, weaveWidth, weaveHeight);
      }
      ctx.restore();
    }
    function drawWeaveFrame(timestamp) {
      weaveFrame = 0;
      const running = weaveIsRunning();
      if (running && timestamp - weaveLastDraw < 32) {
        requestWeaveFrame();
        return;
      }
      const delta = weaveLastDraw ? Math.min((timestamp - weaveLastDraw) / 1000, .06) : .033;
      weaveLastDraw = timestamp;
      if (running) weaveTime += delta * .62;
      weaveWeights.forEach((weight, index) => {
        const target = weaveThreads[index] === null ? 0 : 1;
        weaveWeights[index] = running ? weight + (target - weight) * .12 : target;
      });
      const ctx = weaveContext;
      ctx.setTransform(weavePixelRatio, 0, 0, weavePixelRatio, 0, 0);
      ctx.clearRect(0, 0, weaveWidth, weaveHeight);
      const steps = weaveWidth < 600 ? 120 : 224;
      const segments = [];
      for (let strand = 0; strand < 3; strand++) {
        const phase = strand * Math.PI * 2 / 3;
        const product = weaveThreads[strand];
        const width = Math.min(58, weaveHeight * .17) * weaveWeights[strand];
        if (width < 1.8 || product === null && weaveWeights[strand] < .03) {
          ctx.beginPath();
          for (let i = 0; i <= steps; i++) {
            const point = weavePoint(i / steps, phase, 0, 0);
            if (i === 0) ctx.moveTo(point.x, point.y);else ctx.lineTo(point.x, point.y);
          }
          ctx.strokeStyle = '#a99b824f';
          ctx.lineWidth = .85;
          ctx.stroke();
          if (width < 1.8) continue;
        }
        const materialProduct = product === null ? weavePreviousProducts[strand] : product;
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const next = (i + 1) / steps;
          const points = [weavePoint(t, phase, -1, width), weavePoint(next, phase, -1, width), weavePoint(next, phase, 1, width), weavePoint(t, phase, 1, width)];
          segments.push({
            points,
            product: materialProduct,
            t,
            steps,
            depth: points.reduce((sum, point) => sum + point.z, 0) / 4
          });
        }
      }
      segments.sort((a, b) => a.depth - b.depth);
      segments.forEach(drawWeaveSegment);
      if (running) requestWeaveFrame();
    }
    function syncWeavePlayback() {
      if (weaveFrame) {
        cancelAnimationFrame(weaveFrame);
        weaveFrame = 0;
      }
      weaveLastDraw = 0;
      weavePauseButton.disabled = motionPreference.matches;
      weavePauseButton.setAttribute('aria-pressed', String(weavePaused || motionPreference.matches));
      weavePauseButton.setAttribute('aria-label', motionPreference.matches ? 'Weave animation paused for reduced motion' : weavePaused ? 'Play weave animation' : 'Pause weave animation');
      weavePauseButton.querySelector('span:first-child').textContent = weavePaused || motionPreference.matches ? '▷' : 'Ⅱ';
      document.querySelector('.weave-pause-label').textContent = motionPreference.matches ? 'STILL WEAVE' : weavePaused ? 'PLAY THE WEAVE' : 'PAUSE THE WEAVE';
      requestWeaveFrame();
    }
    listen(weavePauseButton, 'click', () => {
      weavePaused = !weavePaused;
      syncWeavePlayback();
    });
    listen(window, 'resize', measureWeave);
    listen(window, 'load', measureWeave);
    listen(window, 'scroll', () => {
      if (!weaveVisible || weavePaused || motionPreference.matches) return;
      const bounds = weaveSection.getBoundingClientRect();
      weaveScrollPhase = clamp((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)) * Math.PI * .4;
      requestWeaveFrame();
    }, {
      passive: true
    });
    listen(document, 'visibilitychange', syncWeavePlayback);
    listen(motionPreference, 'change', syncWeavePlayback);
    document.querySelectorAll('dialog').forEach(dialog => new MutationObserver(syncWeavePlayback).observe(dialog, {
      attributes: true,
      attributeFilter: ['open']
    }));
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
      weaveVisible = entries[0].isIntersecting;
      syncWeavePlayback();
    }, {
      threshold: .08
    }).observe(weaveSection);else weaveVisible = true;
    updateWeaveControls();
    measureWeave();
    syncWeavePlayback();
  } catch (error) {
    scope.dispose();
    throw error;
  }
  return () => scope.dispose();
}
