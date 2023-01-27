import React from 'react';
import ContentLoader from 'react-content-loader';

import './Skeleton.scss';

interface PropsType {
  props?: any;
}

const Skeleton: React.FC<PropsType> = (props) => {
  return (
    <div className='skeleton__list'>
      {[...new Array(8)].map((item, index) => {
        return (
          <ContentLoader
            key={index}
            speed={2}
            width={305}
            height={501}
            viewBox='0 0 305 501'
            backgroundColor='#3e3e3e'
            foregroundColor='#ecebeb'
            {...props}>
            <rect x='16' y='19' rx='15' ry='15' width='282' height='182' />
            <rect x='37' y='224' rx='10' ry='10' width='163' height='19' />
            <rect x='35' y='259' rx='5' ry='5' width='221' height='14' />
            <rect x='26' y='299' rx='12' ry='12' width='121' height='19' />
            <rect x='40' y='413' rx='6' ry='6' width='47' height='20' />
            <rect x='179' y='406' rx='8' ry='8' width='111' height='36' />
            <rect x='155' y='299' rx='12' ry='12' width='121' height='19' />
            <rect x='26' y='328' rx='12' ry='12' width='121' height='19' />
            <rect x='156' y='330' rx='12' ry='12' width='121' height='19' />
            <rect x='25' y='357' rx='12' ry='12' width='121' height='19' />
            <rect x='157' y='359' rx='12' ry='12' width='121' height='19' />
          </ContentLoader>
        );
      })}
    </div>
  );
};

export default Skeleton;
