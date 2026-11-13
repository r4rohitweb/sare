export default function Hero() {
  return (
    <div className="hero-journey" id="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-image" role="img" aria-label="A warmly lit silk showroom with colourful folded sarees, hanging Kanjivaram silks, and a mannequin in a red and gold saree"></div>
        <div className="hero-walk-scene" role="img" aria-label="Two women in red and green silk sarees walk forward and sit together in the showroom" aria-hidden="true">
          <video className="hero-walk-video" muted playsInline preload="none" poster="assets/hero-walk-user-poster.webp" aria-hidden="true" disablePictureInPicture>
            <source data-src="assets/hero-walk-user.mp4" type="video/mp4" />
            <source data-src="assets/hero-walk-user.webm" type="video/webm" />
          </video>
        </div>
        <div className="hero-seated-scene" role="img" aria-label="Two women seated in the silk showroom, one wearing a red and gold Kanjivaram saree and the other an emerald green and gold saree" aria-hidden="true">
          <div className="hero-seated-image"></div>
        </div>
        <div className="hero-shade"></div>
        <div className="hero-content">
          <p className="eyebrow">
            <span>
              {"✦"}
            </span>
            {" KANCHIPURAM "}
            <i>
              {"·"}
            </i>
            {" PURE ZARI "}
            <i>
              {"·"}
            </i>
            {" HANDWOVEN SILK"}
          </p>
          <h1 id="hero-title">
            {"Woven for the Divine"}
            <span>
              {"."}
            </span>
          </h1>
          <p className="hero-description">
            <strong>
              {"NOOLAM"}
            </strong>
            {" brings the temple looms of Kanchipuram home: Kanjivaram silk in"}
            <br className="desktop-break" />
            {" heritage colours, bordered in real zari and finished by hand."}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#try-the-look" data-collection="Try the Look">
              {"Try the Look "}
              <span className="button-icon">
                <svg>
                  <use href="#arrow"></use>
                </svg>
              </span>
            </a>
            <a className="button button-secondary" href="#the-rack" data-collection="The Rack">
              {"Browse the Rack "}
              <svg>
                <use href="#arrow"></use>
              </svg>
            </a>
          </div>
        </div>
        <div className="hero-story hero-story-craft" aria-hidden="true">
          <p className="story-kicker">
            {"01 / THE HANDS BEHIND THE SILK"}
          </p>
          <h2>
            {"Woven by hand, thread"}
            <br />
            {"by thread."}
          </h2>
          <p>
            {"Each saree carries the story of its maker."}
          </p>
        </div>
        <div className="hero-story hero-story-gold" aria-hidden="true">
          <p className="story-kicker">
            {"02 / THE LIGHT IN EVERY THREAD"}
          </p>
          <h2>
            {"Gold that catches"}
            <br />
            {"temple light."}
          </h2>
          <p>
            {"Silk and zari intertwined, so the little things shine."}
          </p>
        </div>
        <div className="hero-story hero-story-life" aria-hidden="true">
          <p className="story-kicker">
            {"03 / A STORY TO MAKE YOUR OWN"}
          </p>
          <h2>
            {"Made for a life"}
            <br />
            {"with you."}
          </h2>
          <p>
            {"From the first drape to the memories that follow."}
          </p>
        </div>
        <div className="hero-story hero-story-heirloom" aria-hidden="true">
          <p className="story-kicker">
            {"04 / AN INHERITANCE IN EVERY THREAD"}
          </p>
          <h2>
            {"An heirloom from the"}
            <br />
            {"first fold."}
          </h2>
          <p>
            {"Worn once, kept for generations."}
          </p>
        </div>
        <a className="hero-scroll-cue" href="#the-archive">
          <span>
            {"SCROLL TO UNFOLD"}
          </span>
          <span className="scroll-cue-line" aria-hidden="true"></span>
          <span aria-hidden="true">
            {"↓"}
          </span>
        </a>
        <div className="hero-scroll-progress" aria-hidden="true">
          <span></span>
        </div>
        <button className="sound-toggle" type="button" aria-label="Replay curtain opening" title="Replay curtain opening">
          <svg>
            <use href="#lotus"></use>
          </svg>
        </button>
      </section>
    </div>
  );
}
