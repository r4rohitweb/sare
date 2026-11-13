export default function Header() {
  return (
    <header className="site-header">
      <a href="#home" className="brand" aria-label="Silkora home">
        <svg>
          <use href="#lotus"></use>
        </svg>
        <span>
          {"SILKORA"}
        </span>
        <small>
          {"A THREAD OF TRADITION"}
        </small>
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <a className="active" href="#home" aria-current="page">
          {"Home"}
        </a>
        <a href="#try-the-look" data-collection="Try the Look">
          {"Try the Look"}
        </a>
        <a href="#pick-a-silk" data-collection="Pick a Silk">
          {"Pick a Silk"}
        </a>
        <a href="#the-rack" data-collection="The Rack">
          {"The Rack"}
        </a>
        <a href="#the-muse" data-collection="The Muse">
          {"The Muse"}
        </a>
        <a href="#bridal" data-collection="Bridal">
          {"Bridal"}
        </a>
        <a href="#the-weave" data-collection="The Weave">
          {"The Weave"}
        </a>
      </nav>
      <div className="header-actions">
        <button className="icon-button wishlist" aria-label="Wishlist" data-notice="Your wishlist is waiting for your favourite silks.">
          <svg>
            <use href="#heart"></use>
          </svg>
        </button>
        <button className="icon-button shopping-bag" aria-label="Shopping bag" data-notice="Your shopping bag is empty.">
          <svg>
            <use href="#bag"></use>
          </svg>
        </button>
        <button className="store-button" data-notice="Store location and visiting details are coming soon.">
          {"Visit the Store "}
          <span>
            <svg>
              <use href="#pin"></use>
            </svg>
          </span>
        </button>
        <button className="menu-toggle icon-button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
          <span></span>
          <span></span>
        </button>
      </div>
      <nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>
        <a href="#home" aria-current="page">
          {"Home"}
        </a>
        <a href="#try-the-look" data-collection="Try the Look">
          {"Try the Look"}
        </a>
        <a href="#pick-a-silk" data-collection="Pick a Silk">
          {"Pick a Silk"}
        </a>
        <a href="#the-rack" data-collection="The Rack">
          {"The Rack"}
        </a>
        <a href="#the-muse" data-collection="The Muse">
          {"The Muse"}
        </a>
        <a href="#bridal" data-collection="Bridal">
          {"Bridal"}
        </a>
        <a href="#the-weave" data-collection="The Weave">
          {"The Weave"}
        </a>
      </nav>
    </header>
  );
}
