export default function Footer() {
  return (
    <footer className="site-footer" id="footer" aria-labelledby="footer-title">
      <div className="footer-zari" aria-hidden="true"></div>
      <div className="footer-inner">
        <div className="footer-invitation">
          <div>
            <p className="footer-kicker">
              {"A THREAD THAT STAYS WITH YOU"}
            </p>
            <h2 id="footer-title">
              {"Woven with heritage."}
              <br />
              <em>
                {"Worn with love."}
              </em>
            </h2>
          </div>
          <a className="footer-explore" href="#the-rack">
            {"Find your silk "}
            <span>
              <svg aria-hidden="true">
                <use href="#arrow"></use>
              </svg>
            </span>
          </a>
        </div>
        <div className="footer-columns">
          <div className="footer-brand-story">
            <a href="#home" className="footer-brand" aria-label="SILKORA home">
              <svg aria-hidden="true">
                <use href="#lotus"></use>
              </svg>
              <span>
                {"SILKORA"}
              </span>
              <small>
                {"A THREAD OF TRADITION"}
              </small>
            </a>
            <p>
              {"Silks for the moments that matter. "}
              <br />
              {"Discover colour, drape, and the stories "}
              <br />
              {"beautifully woven between."}
            </p>
            <span className="footer-brand-signature">
              {"A little tradition. A little you."}
            </span>
          </div>
          <nav className="footer-navigation" aria-label="Footer collections">
            <h3>
              {"THE COLLECTION"}
            </h3>
            <a href="#try-the-look">
              {"Try the Look"}
            </a>
            <a href="#pick-a-silk">
              {"Pick a Silk"}
            </a>
            <a href="#the-rack">
              {"The Rack"}
            </a>
            <a href="#bridal">
              {"The Bridal Collection"}
            </a>
          </nav>
          <nav className="footer-navigation" aria-label="Footer silk stories">
            <h3>
              {"THE SILKORA WORLD"}
            </h3>
            <a href="#the-archive">
              {"The Silkora Archive"}
            </a>
            <a href="#festive-silks">
              {"Ten Silks. Ten Muses."}
            </a>
            <a href="#the-muse">
              {"Feel the Drape"}
            </a>
            <a href="#silk-in-motion">
              {"Silk, in Motion"}
            </a>
          </nav>
          <div className="footer-personal">
            <h3>
              {"MAKE IT YOURS"}
            </h3>
            <a href="#the-weave">
              {"Create your weave "}
              <span aria-hidden="true">
                {"↗"}
              </span>
            </a>
            <button className="footer-open-bag" type="button">
              {"Your look bag "}
              <svg aria-hidden="true">
                <use href="#bag"></use>
              </svg>
            </button>
            <button className="footer-open-favourites" type="button">
              {"Your saved silks "}
              <svg aria-hidden="true">
                <use href="#heart"></use>
              </svg>
            </button>
            <p>
              {"Keep a little colour"}
              <br />
              {"for your next chapter."}
            </p>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          <span>
            {"SILKORA"}
          </span>
          <svg>
            <use href="#lotus"></use>
          </svg>
        </div>
        <div className="footer-bottom">
          <small>
            {"© 2026 SILKORA. All rights reserved."}
          </small>
          <span>
            {"ONE THREAD. A THOUSAND STORIES."}
          </span>
          <a href="#home" className="footer-back-top">
            {"Back to top "}
            <span aria-hidden="true">
              {"↑"}
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
