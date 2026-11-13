export default function SilkInMotion() {
  return (
    <section className="silk-motion" id="silk-in-motion" aria-labelledby="motion-title">
      <div className="motion-heading">
        <div>
          <p className="section-kicker">
            {"THE MUSE REELS"}
          </p>
          <h2 id="motion-title">
            {"Silk, "}
            <span>
              {"in motion."}
            </span>
          </h2>
        </div>
        <p>
          {"Small moments. Beautiful drapes. "}
          <br />
          {"Find a silk story that feels like you."}
        </p>
      </div>
      <div className="motion-toolbar">
        <span>
          {"THE SHORT STORY EDIT"}
        </span>
        <div>
          <button className="motion-previous" type="button" aria-label="Previous silk stories">
            {"←"}
          </button>
          <span className="motion-rail-count">
            {"01 / 08"}
          </span>
          <button className="motion-next" type="button" aria-label="Next silk stories">
            {"→"}
          </button>
        </div>
      </div>
      <div className="motion-window" role="region" aria-label="Silk story cards. Use arrow keys to browse." tabIndex="0">
        <div className="motion-rail" id="motion-collection"></div>
      </div>
      <div className="motion-manifesto" aria-label="Every thread an offering. Woven by hand. Worn in devotion.">
        <div aria-hidden="true">
          <span>
            {"Every thread an offering. "}
            <b>
              {"✦"}
            </b>
            {" Woven by hand. Worn in devotion. "}
            <b>
              {"✦"}
            </b>
            {" Every drape, a story. "}
            <b>
              {"✦"}
            </b>
          </span>
          <span>
            {"Every thread an offering. "}
            <b>
              {"✦"}
            </b>
            {" Woven by hand. Worn in devotion. "}
            <b>
              {"✦"}
            </b>
            {" Every drape, a story. "}
            <b>
              {"✦"}
            </b>
          </span>
        </div>
      </div>
      <div className="motion-footer">
        <span>
          {"STORIES TO WEAR. MOMENTS TO KEEP."}
        </span>
        <div>
          <button className="motion-view-all" type="button" aria-expanded="false" aria-controls="motion-collection">
            {"View all "}
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
        <span className="motion-format-note">
          {"ANIMATED PHOTO STORIES"}
        </span>
      </div>
      <p className="motion-live-status sr-only" role="status" aria-live="polite"></p>
    </section>
  );
}
