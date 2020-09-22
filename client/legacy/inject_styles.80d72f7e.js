function inject_styles (files) {
  return Promise.all(files.map(function (file) {
    return new Promise(function (fulfil, reject) {
      var href = new URL(file, import.meta.url);
      var relative = ('' + href).substring(document.baseURI.length);
      var link = document.querySelector('link[rel=stylesheet][href="' + relative + '"]') || document.querySelector('link[rel=stylesheet][href="' + href + '"]');

      if (!link) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      }

      if (link.sheet) {
        fulfil();
      } else {
        link.onload = function () {
          return fulfil();
        };

        link.onerror = reject;
      }
    });
  }));
}

export default inject_styles;
