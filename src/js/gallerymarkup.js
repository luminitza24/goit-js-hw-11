import toggleButton from './button';
import { fetchImages } from './FetchImages';
const per_page = 40

const getElement = () => document.querySelector('.gallery');

const galleryClear = () => {
  const element = getElement();
  if (element) {
  element.innerHTML = '';
  }
};

const Manageresponse = (data, per_page) => {
  const { hits, totalHits } = data;

  const element = getElement();
  if (!element) {
    return;
  }

  const markup = hits.map((hit,index) => galleryMarkup(hit, index)).join('');

  element.insertAdjacentHTML('beforeend', markup);

  const galleryItems = element.querySelectorAll('.gallery__items');
  const currentPage = Math.ceil(galleryItems.length / per_page);

  if (currentPage * per_page >= totalHits) {
toggleButton(false);
  } else {
    toggleButton(true);
  }
};

const galleryMarkup = (hit) => {
  return ` 
        <div class="gallery__items">
        <div class="images">
          <a class= "link" href="${hit.largeImageURL}" >
              <img class= "img" src="${hit.webformatURL}" alt="${hit.tags} " loading="lazy" />
            </a>  
        </div>
        <div class="gallery__details">
            <p class="gallery__info">
            <span>Likes: </span> ${hit.likes}
            </p>
            <p class="gallery__info">
              <span>Views: </span> ${hit.views}
            </p>
            <p class="gallery__info">
              <span>Comments: </span> ${hit.comments}
            </p>
            <p class="gallery__info">
              <span>Downloads:</span> ${hit.downloads}
            </p>
        </div>
        </div>
  `;
};

export {Manageresponse, galleryClear };