import { useAppSelector } from '@/hooks/useAppSelector';
import { viewActions as actions } from '@/redux/slices/viewSlice';
import { useActionCreators } from '@/redux/store';
import classNames from 'classnames';
import { FC } from 'react';

import './Category.scss';

const menuList = [
  { id: 0, title: 'Піца' },
  { id: 1, title: 'Сайди' },
  { id: 2, title: 'Напої' },
];

const Category: FC = () => {
  const { category } = useAppSelector((state) => state.view);
  const viewActions = useActionCreators(actions);

  return (
    <div className='category'>
      <ul className='category__list'>
        {menuList.map((item) => (
          <li
            onClick={() => viewActions.setCategory(item.id)}
            className={classNames('category__item', { 'category__item-active': category === item.id })}
            key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
