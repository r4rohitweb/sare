export default function Dialogs() {
  return (
    <>
      <dialog className="motion-story-dialog" aria-labelledby="motion-story-title">
        <button className="motion-story-close" type="button" aria-label="Close silk story">
          {"×"}
        </button>
        <div className="motion-story-viewer">
          <button className="motion-story-neighbour motion-story-before" type="button" aria-label="Previous silk story">
            <img src="assets/mood-festive.webp" alt="" width="360" height="640" />
            <span>
              {"Previous story"}
            </span>
          </button>
          <article className="motion-story-main">
            <img className="motion-story-photo" src="assets/mood-sacred.webp" alt="" width="360" height="640" />
            <div className="motion-story-shade" aria-hidden="true"></div>
            <div className="motion-story-progress" aria-label="Story progress"></div>
            <div className="motion-story-brand">
              <span>
                <svg aria-hidden="true">
                  <use href="#lotus"></use>
                </svg>
              </span>
              <div>
                <strong>
                  {"silkora"}
                </strong>
                <small>
                  {"Silk stories, woven in colour"}
                </small>
              </div>
              <button className="motion-story-pause" type="button" aria-label="Pause story sequence" aria-pressed="false">
                {"Ⅱ"}
              </button>
            </div>
            <div className="motion-story-copy">
              <p className="motion-story-type">
                {"KANJIVARAM SILK"}
              </p>
              <h2 id="motion-story-title">
                {"Emerald Silk"}
              </h2>
              <p className="motion-story-description"></p>
              <div className="motion-story-shopping">
                <button className="motion-story-add" type="button">
                  {"Add to bag "}
                  <svg aria-hidden="true">
                    <use href="#bag"></use>
                  </svg>
                </button>
                <button className="motion-story-favourite" type="button" aria-label="Save story silk to favourites" aria-pressed="false">
                  <svg aria-hidden="true">
                    <use href="#heart"></use>
                  </svg>
                </button>
                <a className="motion-story-more" href="#the-rack">
                  {"More sarees ↗"}
                </a>
              </div>
              <span className="motion-story-note">
                {"Style preview · details confirmed in store"}
              </span>
            </div>
          </article>
          <button className="motion-story-neighbour motion-story-after" type="button" aria-label="Next silk story">
            <img src="assets/mood-kanchipuram.webp" alt="" width="360" height="640" />
            <span>
              {"Next story"}
            </span>
          </button>
        </div>
        <p className="motion-story-help">
          {"Tap the sides to skip · hold the image to pause · use ← → to browse"}
        </p>
      </dialog>
      <dialog className="muse-lightbox" aria-labelledby="muse-lightbox-title">
        <button className="muse-lightbox-close" type="button" aria-label="Close enlarged photograph">
          {"×"}
        </button>
        <div className="muse-lightbox-image">
          <img src="assets/muse-crimson.webp" alt="" width="1672" height="941" />
        </div>
        <div className="muse-lightbox-footer">
          <button className="muse-lightbox-previous" type="button" aria-label="Previous enlarged photograph">
            {"←"}
          </button>
          <div>
            <span>
              {"THE SILKORA MUSE"}
            </span>
            <h2 id="muse-lightbox-title">
              {"A moment in crimson."}
            </h2>
          </div>
          <button className="muse-lightbox-next" type="button" aria-label="Next enlarged photograph">
            {"→"}
          </button>
        </div>
      </dialog>
      <dialog className="silk-favourites-dialog" aria-labelledby="silk-favourites-title">
        <button className="silk-favourites-close" type="button" aria-label="Close silk favourites">
          {"×"}
        </button>
        <p className="section-kicker">
          {"THE ONES YOU LOVE"}
        </p>
        <h2 id="silk-favourites-title">
          {"Your silk favourites."}
        </h2>
        <p className="look-bag-intro">
          {"A little colour, kept close."}
        </p>
        <div className="silk-favourite-items look-bag-items"></div>
        <button className="silk-favourites-continue" type="button">
          {"Back to the collection "}
          <span>
            {"↗"}
          </span>
        </button>
      </dialog>
      <dialog className="look-bag-dialog" aria-labelledby="look-bag-title">
        <button className="look-bag-close" type="button" aria-label="Close look bag">
          {"×"}
        </button>
        <p className="section-kicker">
          {"YOUR STYLE SELECTIONS"}
        </p>
        <h2 id="look-bag-title">
          {"Your look bag."}
        </h2>
        <p className="look-bag-intro">
          {"Keep your favourite looks together for your visit."}
        </p>
        <div className="look-bag-items"></div>
        <p className="look-bag-footnote">
          {"Illustrative styling selections. Availability and pricing are confirmed in store."}
        </p>
        <button className="look-bag-continue" type="button">
          {"Keep exploring "}
          <span>
            {"↗"}
          </span>
        </button>
      </dialog>
      <dialog className="collection-dialog" aria-labelledby="collection-title" aria-describedby="collection-description">
        <button className="collection-close" type="button" aria-label="Close collection preview">
          {"×"}
        </button>
        <div className="collection-image">
          <img src="assets/mood-wedding.webp" alt="" width="400" height="680" />
        </div>
        <div className="collection-copy">
          <p className="section-kicker">
            {"THE SILKORA ARCHIVE"}
          </p>
          <span className="collection-number" aria-hidden="true">
            {"01 / 06"}
          </span>
          <h2 id="collection-title">
            {"Wedding Edit"}
          </h2>
          <p id="collection-description"></p>
          <button className="collection-back" type="button">
            {"Back to the archive "}
            <span>
              {"↗"}
            </span>
          </button>
        </div>
      </dialog>
    </>
  );
}
