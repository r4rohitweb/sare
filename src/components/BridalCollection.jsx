export default function BridalCollection() {
  return (
    <section className="bridal-collection" id="bridal" aria-labelledby="bridal-title">
      <div className="bridal-heading">
        <p className="section-kicker">
          {"FOR THE MUHURTHAM AND EVERY MOMENT AFTER"}
        </p>
        <h2 id="bridal-title">
          {"The Bridal "}
          <span>
            {"Collection"}
          </span>
        </h2>
        <p>
          {"For your first fold. And every forever after."}
        </p>
      </div>
      <div className="bridal-fan" role="region" aria-label="Bridal silk portrait carousel. Use arrow keys to browse." tabIndex="0"></div>
      <div className="bridal-selection">
        <span className="bridal-occasion">
          {"THE SANGEET EDIT"}
        </span>
        <h3 id="bridal-selected-title">
          {"Bandhej Sangeet Silk"}
        </h3>
        <p className="bridal-description">
          {"A celebration in pink and gold, made for the moments before forever."}
        </p>
        <div className="bridal-shopping">
          <button className="bridal-add" type="button">
            {"Add to bag "}
            <span>
              <svg aria-hidden="true">
                <use href="#bag"></use>
              </svg>
            </span>
          </button>
          <button className="bridal-favourite" type="button" aria-label="Save bridal silk to favourites" aria-pressed="false">
            <svg aria-hidden="true">
              <use href="#heart"></use>
            </svg>
          </button>
        </div>
        <small>
          {"Bridal style preview · details confirmed in store"}
        </small>
      </div>
      <div className="bridal-controls">
        <span className="bridal-counter">
          {"01 / 08"}
        </span>
        <div className="bridal-dots" role="group" aria-label="Choose a bridal silk"></div>
        <div className="bridal-arrows">
          <button className="bridal-previous" type="button" aria-label="Previous bridal silk">
            {"←"}
          </button>
          <button className="bridal-next" type="button" aria-label="Next bridal silk">
            {"→"}
          </button>
          <button className="bridal-pause" type="button" aria-label="Pause bridal collection rotation" aria-pressed="false">
            {"Ⅱ"}
          </button>
        </div>
      </div>
      <p className="bridal-footer">
        {"A silk for every ritual. An heirloom for every tomorrow."}
      </p>
      <p className="bridal-live-status sr-only" role="status" aria-live="polite"></p>
    </section>
  );
}
