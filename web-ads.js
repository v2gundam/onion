// Loaded only by the public web app, never by the extension popup.
(() => {
  if (window.location.protocol !== "https:" ||
      window.location.hostname !== "v2gundam.github.io" ||
      !window.location.pathname.startsWith("/onion/")) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6207625854271970";
  script.crossOrigin = "anonymous";
  // Google's supported setting for regular, bottom-only anchor ads.
  script.setAttribute("data-overlays", "collapsed-bottom");
  document.head.append(script);
})();
