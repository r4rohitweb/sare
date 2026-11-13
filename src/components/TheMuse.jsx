export default function TheMuse() {
  return (
    <section className="the-muse" id="the-muse" aria-labelledby="muse-title">
      <div className="muse-heading">
        <p className="section-kicker">
          {"STORIES THAT STAY WITH YOU"}
        </p>
        <h2 id="muse-title">
          {"Feel the "}
          <span>
            {"silk"}
          </span>
        </h2>
        <p>
          {"More than a saree. A feeling you carry."}
        </p>
      </div>
      <div className="muse-orbit">
        <div className="muse-side muse-side-left" role="group" aria-label="More silk stories">
          <div className="muse-strip"></div>
        </div>
        <div className="muse-centre">
          <div className="muse-stage" role="region" aria-label="Silk story image gallery. Use arrow keys to browse." tabIndex="0">
            <img className="muse-photo is-current" src="assets/muse-crimson.webp" alt="Woman in a crimson silk saree against indigo and teal heritage walls" width="1672" height="941" loading="lazy" />
            <img className="muse-photo" src="assets/muse-crimson.webp" alt="" aria-hidden="true" width="1672" height="941" loading="lazy" />
            <div className="muse-image-shade" aria-hidden="true"></div>
            <span className="muse-story-label">
              {"THE MUSE "}
              <span>
                {"01 / 08"}
              </span>
            </span>
            <div className="muse-photo-caption">
              <span>
                {"A SILK STORY"}
              </span>
              <h3>
                {"A moment in crimson."}
              </h3>
            </div>
            <button className="muse-previous muse-image-arrow" type="button" aria-label="Previous silk story">
              {"←"}
            </button>
            <button className="muse-next muse-image-arrow" type="button" aria-label="Next silk story">
              {"→"}
            </button>
            <div className="muse-image-controls">
              <button className="muse-pause" type="button" aria-label="Pause image gallery" aria-pressed="false">
                <span aria-hidden="true">
                  {"Ⅱ"}
                </span>
              </button>
              <span className="muse-control-label">
                {"THE COLOUR OF A MOMENT"}
              </span>
              <button className="muse-enlarge" type="button" aria-label="Enlarge photograph">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="muse-under-image">
            <div className="muse-dots" role="group" aria-label="Choose a silk story"></div>
            <a className="button button-primary muse-collection-link" href="#the-rack">
              {"Explore the Collection "}
              <span className="button-icon">
                <svg>
                  <use href="#arrow"></use>
                </svg>
              </span>
            </a>
            <p className="muse-media-note">
              {"A portrait of silk, in every colour."}
            </p>
          </div>
        </div>
        <div className="muse-side muse-side-right" role="group" aria-label="Discover more moments">
          <div className="muse-strip"></div>
        </div>
      </div>
      <div className="muse-footer">
        <span>
          {"THE SILKORA MUSE"}
        </span>
        <p>
          {"For the moments that become memories."}
          <br />
          {"For the silks that become a part of you."}
        </p>
        <span className="muse-footer-index">
          {"A STORY IN EVERY THREAD "}
          <svg aria-hidden="true">
            <use href="#lotus"></use>
          </svg>
        </span>
      </div>
      <p className="muse-live-status sr-only" role="status" aria-live="polite"></p>
    </section>
  );
}
