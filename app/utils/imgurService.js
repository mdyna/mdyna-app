import axios from 'axios';
import Error from 'UI/Error';
import { toast } from 'react-toastify';

class ImgurService {
  constructor() {
    this.IMGUR_CLIENT_ID = 'f902af779e07be6';
  }

  async uploadFile(file) {
    return axios
      .post('https://api.imgur.com/3/image', file, {
        headers: {
          Authorization: `Client-ID ${this.IMGUR_CLIENT_ID}`,
        },
      })
      .then((imgData) => {
        const imageLink = imgData
          && imgData.data
          && imgData.data.data
          && imgData.data.data.link;
        if (imageLink) {
          toast.info('Image uploaded to imgur');

          return imageLink;
        }
        return '';
      })
      .catch(() => {
        Error.throwError('Error uploading file to imgur');
        return file.name;
      });
  }
}
export default new ImgurService();
