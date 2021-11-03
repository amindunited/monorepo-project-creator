import axios from 'axios';

const curl = async (url: string) => {
  return await axios.get(url)
    .then(response => response.data)
    .catch(err => console.error(`Error loading ${url}`, err));
};

export {
  curl
}
