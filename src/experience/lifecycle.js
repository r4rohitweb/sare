/** Own browser resources created by the showroom's animation engine. */
export function createExperienceScope(root) {
  let active = true;
  const removers = [];
  const observers = new Set();
  const timeouts = new Set();
  const intervals = new Set();
  const frames = new Set();
  const animations = new Set();
  // Keep React's original node identities when resetting imperative galleries.
  const snapshots = [root, ...root.querySelectorAll('*')].map(element => ({
    element,
    attributes: [...element.attributes].map(({ name, value }) => [name, value]),
    children: [...element.childNodes],
  }));
  const pageAttributes = [document.body, document.documentElement].map(element => ({
    element,
    attributes: [...element.attributes].map(({ name, value }) => [name, value]),
  }));

  function guard(callback) {
    return (...args) => active ? callback(...args) : undefined;
  }

  function listen(target, event, callback, options) {
    // Native EventTarget preserves listener identity and its once/passive flags.
    target.addEventListener(event, callback, options);
    removers.push(() => target.removeEventListener(event, callback, options));
  }

  function trackedObserver(NativeObserver) {
    return class extends NativeObserver {
      constructor(callback, options) {
        super(guard(callback), options);
        observers.add(this);
      }
    };
  }

  function restoreAttributes({ element, attributes }) {
    for (const attribute of [...element.attributes]) element.removeAttribute(attribute.name);
    for (const [name, value] of attributes) element.setAttribute(name, value);
  }

  return {
    listen,
    guard,
    isActive: () => active,
    IntersectionObserver: window.IntersectionObserver && trackedObserver(window.IntersectionObserver),
    MutationObserver: trackedObserver(window.MutationObserver),
    ResizeObserver: window.ResizeObserver && trackedObserver(window.ResizeObserver),
    setTimeout(callback, delay, ...args) {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        if (active) callback(...args);
      }, delay);
      timeouts.add(id);
      return id;
    },
    clearTimeout(id) {
      window.clearTimeout(id);
      timeouts.delete(id);
    },
    setInterval(callback, delay, ...args) {
      const id = window.setInterval(guard(() => callback(...args)), delay);
      intervals.add(id);
      return id;
    },
    clearInterval(id) {
      window.clearInterval(id);
      intervals.delete(id);
    },
    requestAnimationFrame(callback) {
      const id = window.requestAnimationFrame(time => {
        frames.delete(id);
        if (active) callback(time);
      });
      frames.add(id);
      return id;
    },
    cancelAnimationFrame(id) {
      window.cancelAnimationFrame(id);
      frames.delete(id);
    },
    animate(element, ...args) {
      const animation = element.animate(...args);
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
      return animation;
    },
    dispose() {
      if (!active) return;
      active = false;
      removers.forEach(remove => remove());
      observers.forEach(observer => observer.disconnect());
      timeouts.forEach(id => window.clearTimeout(id));
      intervals.forEach(id => window.clearInterval(id));
      frames.forEach(id => window.cancelAnimationFrame(id));
      animations.forEach(animation => animation.cancel());
      root.querySelectorAll('video').forEach(video => video.pause());
      root.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
      root.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
      for (const snapshot of snapshots.reverse()) {
        snapshot.element.replaceChildren(...snapshot.children);
        restoreAttributes(snapshot);
      }
      pageAttributes.forEach(restoreAttributes);
    },
  };
}
