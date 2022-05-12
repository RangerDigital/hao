import axios from 'axios';

axios.defaults.baseURL = import.meta.env.API_URL || 'https://5d9f7fe94d823c0014dd323d.mockapi.io';

class ContactService {
  createMessage(form) {
    return axios.post('/api/message', form);
  }
}

export default new ContactService();
