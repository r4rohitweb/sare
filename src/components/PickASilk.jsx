export default function PickASilk() {
  return (
    <section className="silk-journey" id="pick-a-silk" aria-labelledby="silk-title">
      <div className="pick-silk-sticky">
        <div className="silk-heading">
          <div>
            <p className="section-kicker">
              {"A COLOUR FOR EVERY STORY"}
            </p>
            <h2 id="silk-title">
              {"Pick a "}
              <span>
                {"Silk"}
              </span>
            </h2>
          </div>
          <p>
            {"Tilt a card, find your colour. "}
            <br />
            {"Press "}
            <span className="silk-inline-plus">
              {"+"}
            </span>
            {" to keep a silk in your bag."}
          </p>
        </div>
        <div className="silk-window" role="region" aria-label="Eight silk styles. Scroll to browse, or use the collection arrows." tabIndex="0">
          <div className="silk-rail">
            <article className="silk-card" data-silk="0" style={{"--card-colour": "#2263e8", "--card-ink": "#fff9e7"}}>
              <span className="silk-card-number">
                {"01 / THE COLOUR EDIT"}
              </span>
              <h3>
                {"Monsoon"}
                <br />
                {"Blue"}
              </h3>
              <img src="assets/look-blue.webp" alt="Royal blue silk saree styled with a magenta blouse" width="314" height="627" loading="lazy" />
              <button className="silk-favourite" type="button" aria-label="Favourite Monsoon Blue" aria-pressed="false">
                <svg>
                  <use href="#heart"></use>
                </svg>
              </button>
              <span className="silk-card-caption">
                {"KANJIVARAM SILK"}
              </span>
              <button className="silk-add" type="button" aria-label="Add Monsoon Blue silk to bag">
                <span aria-hidden="true">
                  {"+"}
                </span>
              </button>
            </article>
            <article className="silk-card" data-silk="1" style={{"--card-colour": "#f29a0f", "--card-ink": "#fff9e7"}}>
              <span className="silk-card-number">
                {"02 / THE COLOUR EDIT"}
              </span>
              <h3>
                {"Sindoor"}
                <br />
                {"Sun"}
              </h3>
              <img src="assets/look-orange.webp" alt="Orange silk saree styled with a teal blouse" width="314" height="627" loading="lazy" />
              <button className="silk-favourite" type="button" aria-label="Favourite Sindoor Sun" aria-pressed="false">
                <svg>
                  <use href="#heart"></use>
                </svg>
              </button>
              <span className="silk-card-caption">
                {"KANJIVARAM SILK"}
              </span>
              <button className="silk-add" type="button" aria-label="Add Sindoor Sun silk to bag">
                <span aria-hidden="true">
                  {"+"}
                </span>
              </button>
            </article>
            <article className="silk-card" data-silk="2" style={{"--card-colour": "#6515d7", "--card-ink": "#fff9e7"}}>
              <span className="silk-card-number">
                {"03 / THE COLOUR EDIT"}
              </span>
              <h3>
                {"Magenta"}
                <br />
                {"Shot Silk"}
              </h3>
              <img src="assets/look-pink.webp" alt="Vivid pink silk saree styled with a navy blouse" width="314" height="627" loading="lazy" />
              <button className="silk-favourite" type="button" aria-label="Favourite Magenta Shot Silk" aria-pressed="false">
                <svg>
                  <use href="#heart"></use>
                </svg>
              </button>
              <span className="silk-card-caption">
                {"KANJIVARAM SILK"}
              </span>
              <button className="silk-add" type="button" aria-label="Add Magenta Shot Silk to bag">
                <span aria-hidden="true">
                  {"+"}
                </span>
              </button>
            </article>
            <article className="silk-card" data-silk="3" style={{"--card-colour": "#d91d39", "--card-ink": "#fff9e7"}}>
              <span className="silk-card-number">
                {"04 / THE COLOUR EDIT"}
              </span>
              <h3>
                {"Palace"}
                <br />
                {"Purple"}
              </h3>
              <img src="assets/look-purple.webp" alt="Purple brocade silk saree styled with a gold blouse" width="314" height="627" loading="lazy" />
              <button className="silk-favourite" type="button" aria-label="Favourite Palace Purple" aria-pressed="false">
                <svg>
                  <use href="#heart"></use>
                </svg>
              </button>
              <span className="silk-card-caption">
                {"BROCADE SILK"}
              </span>
              <button className="silk-add" type="button" aria-label="Add Palace Purple silk to bag">
                <span aria-hidden="true">
                  {"+"}
                </span>
              </button>
            </article>
            <article className="silk-card" data-silk="4" style={{"--card-colour": "#dfae23", "--card-ink": "#302719"}}>
              <span className="silk-card-number">
                {"05 / THE COLOUR EDIT"}
              </span>
              <h3>
                {"Bengal"}
                <br />
                {"Garden"}
              </h3>
              <img src="assets/look-green.webp" alt="Emerald green silk saree styled with a mustard blouse" width="314" height="627" loading="lazy" />
              <button className="silk-favourite" type="button" aria-label="Favourite Bengal Garden" aria-pressed="false">
                <svg>
                  <use href="#heart"></use>
                </svg>
              </button>
              <span className="silk-card-caption">
                {"EMERALD SILK"}
              </span>
              <button className="silk-add" type="button" aria-label="Add Bengal Garden silk to bag">
                <span aria-hidden="true">
                  {"+"}
                </span>
              </button>
            </article>
            <article className="silk-card" data-silk="5" style={{"--card-colour": "#ca174c", "--card-ink": "#fff9e7"}}>
              <span className="silk-card-number">
                {"06 / THE COLOUR EDIT"}
              </span>
              <h3>
                {"Kanchi"}
                <br />
                {"Ruby"}
              </h3>
              <img src="assets/look-maroon.webp" alt="Maroon temple-border silk saree styled with an emerald blouse" width="314" height="627" loading="lazy" />
              <button className="silk-favourite" type="button" aria-label="Favourite Kanchi Ruby" aria-pressed="false">
                <svg>
                  <use href="#heart"></use>
                </svg>
              </button>
              <span className="silk-card-caption">
                {"TEMPLE-BORDER SILK"}
              </span>
              <button className="silk-add" type="button" aria-label="Add Kanchi Ruby silk to bag">
                <span aria-hidden="true">
                  {"+"}
                </span>
              </button>
            </article>
            <article className="silk-card" data-silk="6" style={{"--card-colour": "#e2bc24", "--card-ink": "#302719"}}>
              <span className="silk-card-number">
                {"07 / THE COLOUR EDIT"}
              </span>
              <h3>
                {"Benares"}
                <br />
                {"Gold"}
              </h3>
              <img src="assets/look-yellow.webp" alt="Mustard yellow silk saree styled with a maroon blouse" width="314" height="627" loading="lazy" />
              <button className="silk-favourite" type="button" aria-label="Favourite Benares Gold" aria-pressed="false">
                <svg>
                  <use href="#heart"></use>
                </svg>
              </button>
              <span className="silk-card-caption">
                {"GOLDEN SILK"}
              </span>
              <button className="silk-add" type="button" aria-label="Add Benares Gold silk to bag">
                <span aria-hidden="true">
                  {"+"}
                </span>
              </button>
            </article>
            <article className="silk-card" data-silk="7" style={{"--card-colour": "#208453", "--card-ink": "#fff9e7"}}>
              <span className="silk-card-number">
                {"08 / THE COLOUR EDIT"}
              </span>
              <h3>
                {"Temple"}
                <br />
                {"Teal"}
              </h3>
              <img src="assets/look-teal.webp" alt="Teal silk saree styled with a pink blouse" width="314" height="627" loading="lazy" />
              <button className="silk-favourite" type="button" aria-label="Favourite Temple Teal silk" aria-pressed="false">
                <svg>
                  <use href="#heart"></use>
                </svg>
              </button>
              <span className="silk-card-caption">
                {"KANJIVARAM SILK"}
              </span>
              <button className="silk-add" type="button" aria-label="Add Temple Teal silk to bag">
                <span aria-hidden="true">
                  {"+"}
                </span>
              </button>
            </article>
          </div>
        </div>
        <div className="silk-footer">
          <span className="silk-scroll-hint">
            {"SCROLL TO DISCOVER "}
            <span aria-hidden="true">
              {"↔"}
            </span>
          </span>
          <div className="silk-collection-progress">
            <span>
              {"THE COLLECTION"}
            </span>
            <div aria-hidden="true">
              <span></span>
            </div>
          </div>
          <div className="silk-controls">
            <button className="silk-prev" type="button" aria-label="Previous silk cards">
              {"←"}
            </button>
            <span className="silk-position">
              {"01 / 08"}
            </span>
            <button className="silk-next" type="button" aria-label="Next silk cards">
              {"→"}
            </button>
          </div>
        </div>
        <p className="silk-live-status sr-only" role="status" aria-live="polite"></p>
      </div>
    </section>
  );
}
