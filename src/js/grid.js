document.addEventListener('DOMContentLoaded', function() {
  var grid = document.querySelector('.portfolio-grid');
  var masonry;

  function initMasonry() {
    var columnWidth = '.portfolio-item';
    if (window.innerWidth > 1200) {
        columnWidth = '.portfolio-item:nth-child(4n)';
    } else if (window.innerWidth > 1024) {
        columnWidth = '.portfolio-item:nth-child(3n)';
    } else if (window.innerWidth > 480) {
        columnWidth = '.portfolio-item:nth-child(2n)';
    }

    masonry = new Masonry(grid, {
        itemSelector: '.portfolio-item',
        columnWidth: columnWidth,
        percentPosition: true,
        gutter: 20
    });
}

  // Handle video loading
  var videos = grid.querySelectorAll('video');
  var loadedVideos = 0;

  videos.forEach(function(video) {
      if (video.readyState >= 3) {
          videoLoaded();
      } else {
          video.addEventListener('loadeddata', videoLoaded);
          video.addEventListener('error', videoLoaded);
      }
  });

  function videoLoaded() {
      loadedVideos++;
      if (loadedVideos === videos.length) {
          initMasonry();
      }
  }

  // ReLayout Masonry on window resize
  window.addEventListener('resize', function() {
    if (masonry) {
        masonry.destroy();
    }
    initMasonry();
});

  // If there are no videos, initialize Masonry immediately
  if (videos.length === 0) {
      initMasonry();
  }
});