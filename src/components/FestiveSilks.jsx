export default function FestiveSilks() {
  return (
    <section className="festive-silks" id="festive-silks" aria-labelledby="festive-title">
      <div className="festive-heading">
        <div>
          <p className="section-kicker">
            {"THE FESTIVE SILK EDIT"}
          </p>
          <h2 id="festive-title">
            {"Ten silks. "}
            <span>
              {"Ten muses."}
            </span>
          </h2>
        </div>
        <p>
          {"A colour for every celebration. "}
          <br />
          {"A story in every saree."}
        </p>
      </div>
      <div className="festive-toolbar">
        <span>
          {"DISCOVER THE FESTIVE COLLECTION"}
        </span>
        <div>
          <button className="festive-prev" type="button" aria-label="Previous festive silks">
            {"←"}
          </button>
          <span className="festive-position">
            {"01 / 10"}
          </span>
          <button className="festive-next" type="button" aria-label="Next festive silks">
            {"→"}
          </button>
          <button className="festive-pause" type="button" aria-label="Pause festive silk browsing" aria-pressed="false">
            {"Ⅱ"}
          </button>
        </div>
      </div>
      <div className="festive-window" role="region" aria-label="Ten festive silk cards. Use arrow keys to browse." tabIndex="0">
        <div className="festive-rail" id="festive-collection"></div>
      </div>
      <div className="festive-ribbon" aria-label="Ten festive silks. Ten muses. Every thread an offering. Woven by hand. Worn in devotion.">
        <div aria-hidden="true">
          <span>
            {"Ten festive silks. Ten muses. "}
            <b>
              {"✦"}
            </b>
            {" Every thread an offering. "}
            <b>
              {"✦"}
            </b>
            {" Woven by hand. Worn in devotion. "}
            <b>
              {"✦"}
            </b>
          </span>
          <span>
            {"Ten festive silks. Ten muses. "}
            <b>
              {"✦"}
            </b>
            {" Every thread an offering. "}
            <b>
              {"✦"}
            </b>
            {" Woven by hand. Worn in devotion. "}
            <b>
              {"✦"}
            </b>
          </span>
        </div>
      </div>
      <div className="festive-footer">
        <span>
          {"THE COLOURS OF A CELEBRATION"}
        </span>
        <div>
          <button className="festive-view-all" type="button" aria-expanded="false" aria-controls="festive-collection">
            {"View all ten "}
            <span>
              {"↗"}
            </span>
          </button>
          <a href="#the-rack">
            {"Shop the Rack "}
            <span>
              {"↗"}
            </span>
          </a>
        </div>
        <small>
          {"Style selections · details confirmed in store"}
        </small>
      </div>
      <p className="festive-live-status sr-only" role="status" aria-live="polite"></p>
    </section>
  );
}
