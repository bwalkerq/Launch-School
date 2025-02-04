
document.addEventListener('DOMContentLoaded', event => {
  const templates = {};
  let photos;

  document.querySelectorAll("script[type='text/x-handlebars']").forEach(tmpl => {
    templates[tmpl["id"]] = Handlebars.compile(tmpl["innerHTML"]);
  });

  document.querySelectorAll("[data-type=partial]").forEach(tmpl => {
    Handlebars.registerPartial(tmpl["id"], tmpl["innerHTML"]);
  });

  fetch("/photos")
    .then(response => response.json())
    .then(json => {
      photos = json;
      for (let photo of photos) {
        let src = photo.src
        src.replace('://via.placeholder', 's://dummyimage');
        photo.src = src;
      }
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id)
    });

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({ photos: photos }));
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(function(item) {
      return item.id === idx;
    })[0];
    let header = document.querySelector("section > header");
    // header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
    header.innerHTML = templates.photo_information(photo);
  }
  function getCommentsFor(idx) {
    fetch("/comments?photo_id=" + idx)
      .then(response => response.json())
      .then(commentJson => {
        let commentList = document.querySelector("#comments ul");
        commentList.insertAdjacentHTML('beforeend', templates.photo_comments({ comments: commentJson }));
      });
  }
});