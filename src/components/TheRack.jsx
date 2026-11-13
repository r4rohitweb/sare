export default function TheRack() {
  return (
    <section className="the-rack" id="the-rack" aria-labelledby="rack-title">
      <div className="rack-heading">
        <p className="section-kicker">
          {"THE NOOLAM RACK"}
        </p>
        <h2 id="rack-title">
          {"Every silk, "}
          <span>
            {"on the rail."}
          </span>
        </h2>
        <p>
          {"A little browsing. A little falling in love."}
        </p>
      </div>
      <div className="rack-filters" role="group" aria-label="Filter the rack"></div>
      <div className="rack-stage" role="region" aria-label="Hanging silk collection. Use arrow keys to browse." tabIndex="0">
        <div className="rack-window" tabIndex="0" aria-label="Browse the hanging garments">
          <div className="rack-track"></div>
        </div>
        <div className="rack-focus" hidden>
          <img src="assets/rack-pink.webp" alt="" width="400" height="600" />
        </div>
        <button className="rack-previous" type="button" aria-label="Previous pieces on the rack">
          {"←"}
        </button>
        <button className="rack-next" type="button" aria-label="Next pieces on the rack">
          {"→"}
        </button>
      </div>
      <div className="rack-detail" hidden>
        <p className="rack-product-category">
          {"SILK SAREE"}
        </p>
        <h3 id="rack-product-title">
          {"Noolam Rani Pink Temple Border"}
        </h3>
        <p className="rack-product-description"></p>
        <div className="rack-product-tags" aria-label="Style details"></div>
        <div className="rack-product-actions">
          <button className="rack-add" type="button">
            {"Add silk to bag "}
            <span>
              <svg>
                <use href="#bag"></use>
              </svg>
            </span>
          </button>
          <button className="rack-favourite" type="button" aria-label="Save this piece to favourites" aria-pressed="false">
            <svg>
              <use href="#heart"></use>
            </svg>
          </button>
        </div>
        <span className="rack-preview-note">
          {"Style selection · details confirmed in store"}
        </span>
      </div>
      <div className="rack-footer">
        <span className="rack-count">
          {"EXPLORE THE COLLECTION · 16 PIECES"}
        </span>
        <button className="rack-back" type="button" hidden>
          {"← Back to the rail"}
        </button>
        <span className="rack-browse-hint">
          {"Tap a hanger to take a closer look "}
          <span aria-hidden="true">
            {"↗"}
          </span>
        </span>
      </div>
      <p className="rack-live-status sr-only" role="status" aria-live="polite"></p>
    </section>
  );
}
