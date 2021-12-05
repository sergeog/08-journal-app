import cloudinary from 'cloudinary';

import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dnxo0e0ss',
  api_key: '881868315563281',
  api_secret: 'twdl5aAHBgRayg46WMRzEzLgGqs',
});

describe('Pruebas en fileUpload.js', () => {
  test('debe cargar un archivo y retornar una URL', async () => {
    const response = await fetch(
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
    );
    const blob = await response.blob();
    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');
    await cloudinary.v2.api.delete_resources(imageId);
  });

  test('debe retornar un error', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
