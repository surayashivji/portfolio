document.addEventListener('DOMContentLoaded', function() {
  var grid = document.querySelector('.portfolio-grid');
  var masonry;

  function initMasonry() {
    masonry = new Masonry(grid, {
      itemSelector: '.portfolio-item',
      columnWidth: '.portfolio-item',
      percentPosition: true,
      gutter: 20
    });
  }
  

  function layoutMasonry() {
    if (masonry) {
      masonry.destroy();
    }
    initMasonry();
  }

// Handle media loading
var mediaElements = grid.querySelectorAll('video, img');
var loadedMedia = 0;

function mediaLoaded() {
  loadedMedia++;
  if (loadedMedia === mediaElements.length) {
    initMasonry();
  }
}

mediaElements.forEach(function(media) {
  if (media.tagName === 'IMG') {
    if (media.complete) {
      mediaLoaded();
    } else {
      media.addEventListener('load', mediaLoaded);
    }
  } else if (media.tagName === 'VIDEO') {
    if (media.readyState >= 3) {
      mediaLoaded();
    } else {
      media.addEventListener('loadeddata', mediaLoaded);
    }
  }
  media.addEventListener('error', mediaLoaded);
});

  // ReLayout Masonry on window resize
  window.addEventListener('resize', layoutMasonry);

  // If there are no media elements, initialize Masonry immediately
  if (mediaElements.length === 0) {
    initMasonry();
  }
});