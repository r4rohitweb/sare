export default function TheWeave() {
  return (
    <section className="the-weave" id="the-weave" aria-labelledby="weave-title">
      <div className="weave-topline">
        <span>
          {"SEER VARISAI"}
        </span>
        <span>
          {"THREE COLOURS. ONE STORY."}
        </span>
        <button className="weave-reset" type="button">
          {"Start again "}
          <span aria-hidden="true">
            {"↺"}
          </span>
        </button>
      </div>
      <div className="weave-heading">
        <p className="section-kicker">
          {"A LITTLE OF YOU IN EVERY THREAD"}
        </p>
        <h2 id="weave-title">
          {"Three silks, "}
          <span>
            {"one weave."}
          </span>
        </h2>
        <p>
          {"Choose the colours. Weave your own story."}
        </p>
      </div>
      <div className="weave-stage">
        <canvas className="weave-canvas" role="img" aria-label="Three silk ribbons intertwining in pink, blue, and gold">
          <p>
            {"Three silks, woven together. Use the colour selectors below to create your combination."}
          </p>
        </canvas>
        <button className="weave-pause" type="button" aria-label="Pause weave animation" aria-pressed="false">
          <span aria-hidden="true">
            {"Ⅱ"}
          </span>
          <span className="weave-pause-label">
            {"PAUSE THE WEAVE"}
          </span>
        </button>
      </div>
      <div className="weave-composer">
        <div className="weave-slots" role="group" aria-label="Your three silk threads"></div>
        <div className="weave-palette">
          <p>
            {"Choose a silk to weave it in"}
          </p>
          <div className="weave-swatches" role="group" aria-label="Choose a silk colour"></div>
          <span className="weave-active-name">
            {"Rani Pink Temple Border"}
          </span>
          <small>
            {"Choose a thread to change its colour."}
          </small>
        </div>
        <div className="weave-shopping">
          <span className="weave-selected-count">
            {"THREE SILKS, STYLED TOGETHER"}
          </span>
          <strong className="weave-set-status">
            {"Your own colour story."}
          </strong>
          <button className="weave-add" type="button">
            {"Add the weave to bag "}
            <span>
              <svg aria-hidden="true">
                <use href="#bag"></use>
              </svg>
            </span>
          </button>
          <small>
            {"Style selections · availability confirmed in store"}
          </small>
        </div>
      </div>
      <div className="weave-footer">
        <span>
          {"HANDWOVEN IN COLOUR. HELD TOGETHER BY YOU."}
        </span>
        <a href="#the-rack">
          {"Discover every silk "}
          <span aria-hidden="true">
            {"↗"}
          </span>
        </a>
      </div>
      <p className="weave-live-status sr-only" role="status" aria-live="polite"></p>
    </section>
  );
}
