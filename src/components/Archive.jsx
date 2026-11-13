export default function Archive() {
  return (
    <section className="archive" id="the-archive" aria-labelledby="archive-title">
      <div className="heritage-ribbon" aria-label="Kanchipuram. Pure zari. Handwoven. Temple borders. Bridal silk.">
        <div className="heritage-ribbon-track" aria-hidden="true">
          <span>
            {"KANCHIPURAM "}
            <b>
              {"❖"}
            </b>
            {" PURE ZARI "}
            <b>
              {"❖"}
            </b>
            {" HANDWOVEN "}
            <b>
              {"❖"}
            </b>
            {" TEMPLE BORDERS "}
            <b>
              {"❖"}
            </b>
            {" BRIDAL SILK "}
            <b>
              {"❖"}
            </b>
          </span>
          <span>
            {"KANCHIPURAM "}
            <b>
              {"❖"}
            </b>
            {" PURE ZARI "}
            <b>
              {"❖"}
            </b>
            {" HANDWOVEN "}
            <b>
              {"❖"}
            </b>
            {" TEMPLE BORDERS "}
            <b>
              {"❖"}
            </b>
            {" BRIDAL SILK "}
            <b>
              {"❖"}
            </b>
          </span>
        </div>
      </div>
      <div className="archive-inner">
        <div className="archive-heading">
          <div>
            <p className="section-kicker">
              {"THE SILKORA ARCHIVE"}
            </p>
            <h2 id="archive-title">
              {"Six Moods. "}
              <span>
                {"Timeless Sarees"}
              </span>
            </h2>
          </div>
          <p className="archive-intro">
            {"Wedding vows, everyday grace. "}
            <br />
            {"Six silk stories, beautifully "}
            <br />
            {"woven into every moment."}
          </p>
        </div>
        <div className="mood-gallery" role="region" aria-label="Explore six silk collections" tabIndex="0">
          <button className="mood-card" data-mood="0" aria-label="View Wedding Edit collection">
            <span className="mood-arch">
              <img src="assets/mood-wedding.webp" alt="Bride in a red and gold silk saree in a temple courtyard" width="400" height="680" loading="lazy" />
              <svg className="arch-outline" aria-hidden="true">
                <use href="#arch-frame"></use>
              </svg>
              <span className="mood-explore" aria-hidden="true">
                <svg>
                  <use href="#arrow"></use>
                </svg>
              </span>
            </span>
            <span className="mood-name">
              {"Wedding Edit"}
            </span>
          </button>
          <button className="mood-card" data-mood="1" aria-label="View Kanchipuram Icons collection">
            <span className="mood-arch">
              <img src="assets/mood-kanchipuram.webp" alt="Woman in a magenta silk saree with an emerald green pallu" width="400" height="680" loading="lazy" />
              <svg className="arch-outline" aria-hidden="true">
                <use href="#arch-frame"></use>
              </svg>
              <span className="mood-explore" aria-hidden="true">
                <svg>
                  <use href="#arrow"></use>
                </svg>
              </span>
            </span>
            <span className="mood-name">
              {"Kanchipuram Icons"}
            </span>
          </button>
          <button className="mood-card" data-mood="2" aria-label="View Banarasi Heirlooms collection">
            <span className="mood-arch">
              <img src="assets/mood-banarasi.webp" alt="Woman wearing a purple Banarasi saree with gold brocade" width="400" height="680" loading="lazy" />
              <svg className="arch-outline" aria-hidden="true">
                <use href="#arch-frame"></use>
              </svg>
              <span className="mood-explore" aria-hidden="true">
                <svg>
                  <use href="#arrow"></use>
                </svg>
              </span>
            </span>
            <span className="mood-name">
              {"Banarasi Heirlooms"}
            </span>
          </button>
          <button className="mood-card" data-mood="3" aria-label="View Festive Radiance collection">
            <span className="mood-arch">
              <img src="assets/mood-festive.webp" alt="Woman in a golden yellow silk saree on a garden terrace" width="400" height="680" loading="lazy" />
              <svg className="arch-outline" aria-hidden="true">
                <use href="#arch-frame"></use>
              </svg>
              <span className="mood-explore" aria-hidden="true">
                <svg>
                  <use href="#arrow"></use>
                </svg>
              </span>
            </span>
            <span className="mood-name">
              {"Festive Radiance"}
            </span>
          </button>
          <button className="mood-card" data-mood="4" aria-label="View Zari Stories collection">
            <span className="mood-arch">
              <img src="assets/mood-zari.webp" alt="Woman wearing a black and antique gold silk saree" width="400" height="680" loading="lazy" />
              <svg className="arch-outline" aria-hidden="true">
                <use href="#arch-frame"></use>
              </svg>
              <span className="mood-explore" aria-hidden="true">
                <svg>
                  <use href="#arrow"></use>
                </svg>
              </span>
            </span>
            <span className="mood-name">
              {"Zari Stories"}
            </span>
          </button>
          <button className="mood-card" data-mood="5" aria-label="View Sacred Silks collection">
            <span className="mood-arch">
              <img src="assets/mood-sacred.webp" alt="Woman in a leaf green silk saree surrounded by garden foliage" width="400" height="680" loading="lazy" />
              <svg className="arch-outline" aria-hidden="true">
                <use href="#arch-frame"></use>
              </svg>
              <span className="mood-explore" aria-hidden="true">
                <svg>
                  <use href="#arrow"></use>
                </svg>
              </span>
            </span>
            <span className="mood-name">
              {"Sacred Silks"}
            </span>
          </button>
        </div>
        <div className="archive-bottom">
          <p>
            {"Six moods. A thousand ways to wear your story."}
          </p>
          <div className="gallery-controls">
            <button type="button" className="gallery-prev" aria-label="Previous collections">
              {"←"}
            </button>
            <button type="button" className="gallery-next" aria-label="Next collections">
              {"→"}
            </button>
          </div>
          <span className="archive-index" aria-hidden="true">
            {"01 — 06"}
          </span>
        </div>
      </div>
    </section>
  );
}
