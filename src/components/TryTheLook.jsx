export default function TryTheLook() {
  return (
    <section className="try-look" id="try-the-look" aria-labelledby="look-title">
      <div className="look-heading">
        <div>
          <p className="section-kicker">
            {"STYLED HEAD TO TOE"}
          </p>
          <h2 id="look-title">
            {"Try the "}
            <span>
              {"Look."}
            </span>
          </h2>
          <p className="look-subtitle">
            {"Eight looks, styled head to toe. Tap a look to see the pieces."}
          </p>
        </div>
        <span className="look-edition">
          {"THE KANJIVARAM EDIT "}
          <span>
            {"01 — 08"}
          </span>
        </span>
      </div>
      <div className="look-layout">
        <div className="look-runway">
          <div className="look-stage" role="region" aria-label="Saree looks carousel. Use the left and right arrow keys to change looks." tabIndex="0">
            <button className="look-model is-selected" data-look="0" aria-label="Select Temple Teal look" aria-pressed="true">
              <img src="assets/look-teal.webp" alt="Full-length model in a teal Kanjivaram saree and pink blouse" width="400" height="800" loading="lazy" />
            </button>
            <button className="look-model" data-look="1" aria-label="Select Rose &amp; Gold look" aria-pressed="false">
              <img src="assets/look-pink.webp" alt="Full-length model in a pink silk saree and navy blouse" width="400" height="800" loading="lazy" />
            </button>
            <button className="look-model" data-look="2" aria-label="Select Royal Blue look" aria-pressed="false">
              <img src="assets/look-blue.webp" alt="Full-length model in a royal blue silk saree and magenta blouse" width="400" height="800" loading="lazy" />
            </button>
            <button className="look-model" data-look="3" aria-label="Select Violet Heirloom look" aria-pressed="false">
              <img src="assets/look-purple.webp" alt="Full-length model in a purple brocade silk saree and gold blouse" width="400" height="800" loading="lazy" />
            </button>
            <button className="look-model" data-look="4" aria-label="Select Emerald Grace look" aria-pressed="false">
              <img src="assets/look-green.webp" alt="Full-length model in an emerald green silk saree and mustard blouse" width="400" height="800" loading="lazy" />
            </button>
            <button className="look-model" data-look="5" aria-label="Select Marigold Flame look" aria-pressed="false">
              <img src="assets/look-orange.webp" alt="Full-length model in an orange silk saree and teal blouse" width="400" height="800" loading="lazy" />
            </button>
            <button className="look-model" data-look="6" aria-label="Select Golden Hour look" aria-pressed="false">
              <img src="assets/look-yellow.webp" alt="Full-length model in a mustard yellow silk saree and maroon blouse" width="400" height="800" loading="lazy" />
            </button>
            <button className="look-model" data-look="7" aria-label="Select Ruby Tradition look" aria-pressed="false">
              <img src="assets/look-maroon.webp" alt="Full-length model in a maroon silk saree and emerald blouse" width="400" height="800" loading="lazy" />
            </button>
          </div>
          <div className="look-runway-footer">
            <div className="look-arrows">
              <button className="look-prev" type="button" aria-label="Previous look">
                {"←"}
              </button>
              <button className="look-next" type="button" aria-label="Next look">
                {"→"}
              </button>
            </div>
            <div className="look-dots" role="group" aria-label="Choose a look"></div>
            <div className="look-playback">
              <span className="look-counter">
                {"01 / 08"}
              </span>
              <button className="look-pause" type="button" aria-label="Pause automatic look rotation" aria-pressed="false">
                <span aria-hidden="true">
                  {"Ⅱ"}
                </span>
              </button>
            </div>
          </div>
        </div>
        <aside className="look-details" aria-labelledby="selected-look-title">
          <div className="look-detail-title">
            <p className="section-kicker">
              {"THE COMPLETE LOOK"}
            </p>
            <h3 id="selected-look-title">
              {"Temple Teal"}
            </h3>
            <p className="look-detail-note">
              {"Six pieces. One beautiful story."}
            </p>
          </div>
          <div className="look-pieces">
            <details className="look-piece">
              <summary>
                <span className="piece-art piece-saree" aria-hidden="true">
                  <svg viewBox="0 0 40 48">
                    <path d="m13 4 15 2 6 35-26 3z" fill="var(--look-silk)"></path>
                    <path d="m13 4 7 1-5 37-7 2z" fill="var(--look-blouse)"></path>
                    <path d="m8 38 25-3 1 6-26 3z" fill="#cfae56"></path>
                    <path d="m20 5 6 1 6 29-6 1z" fill="#dfc478" opacity=".8"></path>
                  </svg>
                </span>
                <span>
                  <strong className="piece-saree-name">
                    {"Teal Kanjivaram silk"}
                  </strong>
                  <small>
                    {"The drape"}
                  </small>
                </span>
                <span className="piece-plus" aria-hidden="true">
                  {"+"}
                </span>
              </summary>
              <p className="piece-saree-description">
                {"Luminous teal silk with a broad gold border and a contrasting pink blouse."}
              </p>
            </details>
            <details className="look-piece">
              <summary>
                <span className="piece-art" aria-hidden="true">
                  <svg viewBox="0 0 40 48">
                    <path d="m7 10 9-4q4 8 8 0l9 4 5 13-9 4-2-7v19H13V20l-2 7-9-4z" fill="var(--look-blouse)"></path>
                    <path d="M14 35h12v4H14z" fill="#d1ae52"></path>
                  </svg>
                </span>
                <span>
                  <strong className="piece-blouse-name">
                    {"Pink silk blouse"}
                  </strong>
                  <small>
                    {"The contrast"}
                  </small>
                </span>
                <span className="piece-plus" aria-hidden="true">
                  {"+"}
                </span>
              </summary>
              <p>
                {"A contrasting silk blouse brings the colour story together."}
              </p>
            </details>
            <details className="look-piece">
              <summary>
                <span className="piece-art" aria-hidden="true">
                  <svg viewBox="0 0 40 48">
                    <path d="M4 20q16 12 32 0l-1 5q-15 11-30 0z" fill="#c6a144"></path>
                    <circle cx="20" cy="27" r="4" fill="#e2c56f"></circle>
                  </svg>
                </span>
                <span>
                  <strong>
                    {"Gold waist belt"}
                  </strong>
                  <small>
                    {"The finishing touch"}
                  </small>
                </span>
                <span className="piece-plus" aria-hidden="true">
                  {"+"}
                </span>
              </summary>
              <p>
                {"A traditional waist belt defines the drape and highlights the pleats."}
              </p>
            </details>
            <details className="look-piece">
              <summary>
                <span className="piece-art" aria-hidden="true">
                  <svg viewBox="0 0 40 48">
                    <g fill="#c6a144">
                      <circle cx="11" cy="12" r="3"></circle>
                      <circle cx="29" cy="12" r="3"></circle>
                      <path d="M11 17 4 32h14zm18 0-7 15h14z"></path>
                      <circle cx="6" cy="35" r="2"></circle>
                      <circle cx="11" cy="36" r="2"></circle>
                      <circle cx="16" cy="35" r="2"></circle>
                      <circle cx="24" cy="35" r="2"></circle>
                      <circle cx="29" cy="36" r="2"></circle>
                      <circle cx="34" cy="35" r="2"></circle>
                    </g>
                  </svg>
                </span>
                <span>
                  <strong>
                    {"Temple jhumkas"}
                  </strong>
                  <small>
                    {"A little movement"}
                  </small>
                </span>
                <span className="piece-plus" aria-hidden="true">
                  {"+"}
                </span>
              </summary>
              <p>
                {"Bell-shaped earrings inspired by the intricate forms of temple jewellery."}
              </p>
            </details>
            <details className="look-piece">
              <summary>
                <span className="piece-art" aria-hidden="true">
                  <svg viewBox="0 0 40 48">
                    <path d="M6 9q0 27 14 28Q34 36 34 9M11 10q0 20 9 21 9-1 9-21" stroke="#c6a144" strokeWidth="3" fill="none"></path>
                    <path d="m20 32 5 5-5 7-5-7z" fill="#d3ae51"></path>
                  </svg>
                </span>
                <span>
                  <strong>
                    {"Layered gold necklace"}
                  </strong>
                  <small>
                    {"Close to the heart"}
                  </small>
                </span>
                <span className="piece-plus" aria-hidden="true">
                  {"+"}
                </span>
              </summary>
              <p>
                {"Two delicate layers echo the gold tones woven through the saree."}
              </p>
            </details>
            <details className="look-piece">
              <summary>
                <span className="piece-art piece-bangles" aria-hidden="true">
                  <svg viewBox="0 0 40 48">
                    <path d="M8 12h24v27H8z" fill="var(--look-silk)"></path>
                    <path d="M8 12h24v4H8zm0 8h24v3H8zm0 7h24v3H8zm0 8h24v4H8z" fill="#d1ae52"></path>
                  </svg>
                </span>
                <span>
                  <strong>
                    {"Silk & gold bangles"}
                  </strong>
                  <small>
                    {"The final detail"}
                  </small>
                </span>
                <span className="piece-plus" aria-hidden="true">
                  {"+"}
                </span>
              </summary>
              <p>
                {"Colour-matched bangles with golden accents complete the styling."}
              </p>
            </details>
          </div>
          <div className="look-bag-action">
            <span>
              {"STYLED TOGETHER "}
              <strong>
                {"6 pieces"}
              </strong>
            </span>
            <button className="add-look-button" type="button">
              {"Add look to bag "}
              <span>
                <svg>
                  <use href="#bag"></use>
                </svg>
              </span>
            </button>
            <small className="look-preview-label">
              {"Style preview · selections for your visit"}
            </small>
          </div>
        </aside>
      </div>
      <p className="look-live-status sr-only" role="status" aria-live="polite"></p>
    </section>
  );
}
