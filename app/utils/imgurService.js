import axios from 'axios';
import Error from 'UI/Error';
import unNest from 'Utils/nest';
import uniqBy from 'lodash/uniqBy';
import { getUserData } from 'Store';

class ImgurService {
  constructor() {
    this.IMGUR_CLIENT_ID = 'f902af779e07be6';
  }

  async uploadFile(file) {
    axios
      .post('https://api.imgur.com/3/image', file, {
        headers: {
          Authorization: `Client-ID ${this.IMGUR_CLIENT_ID}`,
        },
      })
      .then(
        imgData => imgData
          && imgData.data
          && imgData.data.data
          && imgData.data.data.link,
      );
    console.log('uploading');
  }
}
export default new ImgurService();
