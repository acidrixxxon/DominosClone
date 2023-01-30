import React, { FC } from 'react';

interface ComponentProps {
  item: { id: number; title: string; icon: any };
  changeCategory: (id: number) => void;
}

const MobileNavItem: FC<ComponentProps> = ({ item, changeCategory }) => {
  return (
    <li className='mobileNav__navigation-item' key={item.id} onClick={() => changeCategory(item.id)}>
      {item.icon} {item.title}
    </li>
  );
};

export default React.memo(MobileNavItem);
