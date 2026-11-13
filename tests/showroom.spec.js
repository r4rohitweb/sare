import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Font delivery is external to the application; keep checks deterministic offline.
  await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ body: '', contentType: 'text/css' }));
});

test('all sections render once and local assets load at desktop and mobile widths', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (new URL(response.url()).origin === new URL(page.url()).origin && response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.goto('./#the-archive');
  await expect(page.locator('main section')).toHaveCount(10);
  expect(await page.locator('#temple-arch').evaluate(element => element.tagName)).toBe('clipPath');
  await expect(page.locator('.look-dots button')).toHaveCount(8);
  await expect(page.locator('.rack-item')).toHaveCount(16);
  await expect(page.locator('.bridal-card')).toHaveCount(8);
  await expect(page.locator('.weave-swatch')).toHaveCount(8);
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const id of ['the-archive', 'try-the-look', 'pick-a-silk', 'the-rack', 'festive-silks', 'the-muse', 'silk-in-motion', 'bridal', 'the-weave', 'footer']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('looks, bag deduplication, persistence and removal work', async ({ page }) => {
  await page.goto('./#try-the-look');
  await page.locator('.look-dots button').nth(1).click();
  await expect(page.locator('#selected-look-title')).toHaveText('Rose & Gold');
  await page.locator('.add-look-button').click();
  await page.locator('.add-look-button').click();
  await expect(page.locator('.bag-count')).toHaveText('1');
  await page.reload();
  await expect(page.locator('.bag-count')).toHaveText('1');
  await page.locator('.shopping-bag').click();
  await expect(page.locator('.look-bag-dialog')).toBeVisible();
  await expect(page.locator('.look-bag-item')).toHaveCount(1);
  await expect(page.locator('.look-bag-item h3')).toHaveText('Rose & Gold');
  await page.locator('.look-bag-item button').click();
  await expect(page.locator('.look-bag-item')).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(page.locator('.look-bag-dialog')).not.toBeVisible();
});

test('rack filters, favourites and shared shopping work', async ({ page }) => {
  await page.goto('./#the-rack');
  await page.locator('[data-rack-index="9"]').click();
  await expect(page.locator('#rack-product-title')).toHaveText('Noolam Rani Pink Temple Border');
  await page.locator('.rack-favourite').click();
  await expect(page.locator('.rack-favourite')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.rack-add').click();
  await expect(page.locator('.bag-count')).toHaveText('1');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /Blouses/ }).click();
  await expect(page.locator('.rack-item')).toHaveCount(4);
  await page.locator('.wishlist').click();
  await expect(page.locator('.silk-favourite-items .look-bag-item')).toHaveCount(1);
  await page.keyboard.press('Escape');
  await page.reload();
  await page.locator('.wishlist').click();
  await expect(page.locator('.silk-favourite-items .look-bag-item')).toHaveCount(1);
});

test('weave selections save three products to the shared bag', async ({ page }) => {
  await page.goto('./#the-weave');
  await expect(page.locator('.weave-swatch[aria-pressed="true"]')).toHaveCount(3);
  await page.locator('[data-weave-product="11"]').click();
  await page.locator('.weave-add').click();
  await expect(page.locator('.bag-count')).toHaveText('3');
  await page.reload();
  await expect(page.locator('.weave-slots')).toContainText('Emerald Silk');
  await expect(page.locator('.bag-count')).toHaveText('3');
  const dimensions = await page.locator('.weave-canvas').evaluate(canvas => [canvas.width, canvas.height]);
  expect(dimensions.every(value => value > 0)).toBe(true);
});

test('mobile navigation and collection dialog remain keyboard accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./#the-archive');
  await page.locator('.menu-toggle').click();
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  await page.locator('[data-mood]').first().click();
  await expect(page.locator('.collection-dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.collection-dialog')).not.toBeVisible();
  await expect(page.locator('[data-mood]').first()).toBeFocused();
});

test('hero media loads on approach and falls back if both sources fail', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./#home');
  await expect.poll(() => page.locator('.hero-walk-video').evaluate(video => video.readyState)).toBeGreaterThanOrEqual(2);
  expect(await page.locator('.hero-walk-video').evaluate(video => video.paused && video.muted)).toBe(true);
  await page.route('**/hero-walk-user.mp4', route => route.abort());
  await page.route('**/hero-walk-user.webm', route => route.abort());
  await page.reload();
  await page.evaluate(() => {
    const journey = document.querySelector('.hero-journey');
    scrollTo({ top: (journey.offsetHeight - journey.querySelector('.hero').offsetHeight) * .94, behavior: 'instant' });
  });
  await expect.poll(() => page.locator('.hero-seated-scene').evaluate(element => +getComputedStyle(element).opacity)).toBe(1);
});

test('campaign stories and bridal selections share the catalogue', async ({ page }) => {
  await page.goto('./#the-muse');
  await page.locator('.muse-dots button').nth(1).click();
  await expect(page.locator('.muse-dots button').nth(1)).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.motion-card').first().click();
  await expect(page.locator('.motion-story-dialog')).toBeVisible();
  await page.locator('.motion-story-add').click();
  await page.keyboard.press('Escape');
  await page.locator('.bridal-dots button').nth(1).click();
  await expect(page.locator('.bridal-dots button').nth(1)).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.bridal-add').click();
  await expect(page.locator('.bag-count')).toHaveText('2');
});

test('unmount restores page state and remount creates no duplicate controls', async ({ page }) => {
  test.skip(!!process.env.TEST_BASE_URL, 'The lifecycle fixture is served only by the development server.');
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/tests/fixtures/remount.html#try-the-look');
  await expect(page.locator('.look-dots button')).toHaveCount(8);
  await page.locator('.add-look-button').click();
  await page.locator('.shopping-bag').click();
  await expect(page.locator('.look-bag-dialog')).toBeVisible();
  await page.evaluate(() => window.showroomFixture.unmount());
  await expect(page.locator('#root')).toBeEmpty();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
  expect(await page.evaluate(() => document.documentElement.classList.contains('motion-ready'))).toBe(false);
  await page.evaluate(() => window.showroomFixture.mount());
  await expect(page.locator('.look-dots button')).toHaveCount(8);
  await expect(page.locator('.bridal-card')).toHaveCount(8);
  await page.locator('.look-dots button').nth(1).click();
  await expect(page.locator('#selected-look-title')).toHaveText('Rose & Gold');
  expect(errors).toEqual([]);
});
