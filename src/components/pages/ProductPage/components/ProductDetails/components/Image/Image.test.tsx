import { shallow } from 'enzyme';
import React from 'react';

import Image from './Image';

describe('Product details image component', () => {
  let testImageUrl =
    'https://media.dominos.ua/__sized__/menu/product_osg_image_category/2022/11/09/PRODUCT_IMAGE-PIZZA_PIECES-960x619pix_CURRY-thumbnail-960x960-70.jpg';
  let altText = 'Піца Каррі';

  it('render component without crashing', () => {
    const image = shallow(<Image imageUrl={testImageUrl} alt={altText} />);

    expect(image.length).toBe(1);
    expect(image.find('img').prop('alt')).toBe(altText);
    expect(image.find('img').prop('src')).toBe(testImageUrl);
  });
});
