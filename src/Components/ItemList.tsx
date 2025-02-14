import React from 'react';
import FetchingList from './FetchingList';
import {ListingProps} from '../Types/types'


const ItemList: React.FC<ListingProps> = ({ items, onDelete, onEdit, onUpdate, editingItem }) => {
  return (
    <FetchingList
      items={items}
      onDelete={onDelete}
      onEdit={onEdit}
      onUpdate={onUpdate}
      editingItem={editingItem}
    />
  );
};

export default ItemList;
