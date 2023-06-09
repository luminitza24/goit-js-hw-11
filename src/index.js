import Notiflix from 'notiflix';
import { galleryClear, Manageresponse } from './js/gallerymarkup';
import {toggleButton} from './js/button';
import { fetchImages } from './js/FetchImages';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const Form = document.querySelector('.search-form');
const loadButton = document.querySelector('.load__more');

let currentPage = 1;
const per_page = 40;
let query = '';
Form.addEventListener('submit', async event => {
  event.preventDefault();
  const searchQuery = Form.querySelector('[name=searchQuery]').value;
  if (searchQuery === '') {
    Notiflix.Notify.failure('Please write something');
    return;
  }

  if (query !== searchQuery) {
    query = searchQuery;
    currentPage = 1;
    galleryClear();
  }
  try {
    const resp = await fetchImages(query, currentPage, per_page);
    Manageresponse(resp, per_page);
    const totalHits = resp.totalHits || 0;
    if (currentPage === 1) {
      if (totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();
      } else {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      }
    }
    Form.reset();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Error occurred. Please try again later.');
  }
});

loadButton.addEventListener('click', async () => {
  currentPage++;
  try {
    const resp = await fetchImages(query, currentPage, per_page);
    Manageresponse(resp, per_page);
    const totalHits = resp.totalHits || 0;
    if (currentPage *per_page >= totalHits) {
      toggleButton(false);
      if (totalHits > 0) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }
    }
    const lightbox = new SimpleLightbox('.gallery a' );
    lightbox.refresh();
   
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    Form.reset();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Error occurred. Please try again later.');
  }
});
var controller = new ScrollMagic.Controller();
var scene = new ScrollMagic.Scene({
  triggerElement: '#trigger', 
  duration: 400 
})
.setPin('pinnedElement'); 

controller.addScene(scene);
