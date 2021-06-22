import axios from 'axios';

const KEY = '21347916-d2cb58bac2dcf6ecd9205e483';

const fetchData = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
    return axios.get(`https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
).then(response => response.data.hits);
    };

  

export default  fetchData;