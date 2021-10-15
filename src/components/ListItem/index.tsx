import React from 'react';

const ListItem = ({
  title,
  item,
  secondItem,
}: {
  title: string;
  item: string;
  secondItem?: string;
}) => {
  return (
    <li className="text-md text-navyBlue">
      <span className="mr-2 text-textColor"> {title}: </span>
      {secondItem ? ` ${item} / ${secondItem}` : item}
    </li>
  );
};

export default ListItem;
