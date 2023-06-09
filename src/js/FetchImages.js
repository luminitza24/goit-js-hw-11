import axios from 'axios';
import Notiflix from 'notiflix';

const URL = 'https://pixabay.com/api';
const API_KEY = '36867365-3643e28b2c6642941cb9e037d';

const fetchImages = async (query, page, per_page) => {
  try {
    const response = await axios.get(
      `${URL}/?key=${API_KEY}&q=${query}&u=image_type=photo&orientation=horizontal&saferesearch=true&page=${page}&per_page=${per_page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Error occurred. Please try again later.');
    throw error;
  }
};
export { fetchImages };
