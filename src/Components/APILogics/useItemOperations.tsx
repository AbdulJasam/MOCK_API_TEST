import { useState, useEffect } from 'react';
import {Item} from '../../Types/types'

const useItemOperations = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  
  // Sorting state
  const [sortField, setSortField] = useState<'title' | 'body'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch data when component loads
  useEffect(() => {
    
    return () => {
      fetchItems();
    }
  }, [])
  

  // Fetch Items from API
  const fetchItems = () => {
    
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=`)
      .then((response) => response.json())
      .then((data) => {
        setItems((prevItems) => [...prevItems, ...data]);
        
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  };


  // Delete an Item
  const handleDelete = (id: number) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
      .then(() => setItems((prevItems) => prevItems.filter((item) => item.id !== id)))
      .catch((error) => console.error('Error deleting item:', error));
  };

  // Edit Item (Show Edit Form)
  const handleEdit = (item: Item) => {
    setEditingItem(item);
  };

  // Update Existing Item
  const handleUpdateItem = async (id: number, title: string, body: string) => {
    try {
      const existingItem = items.find((item) => item.id === id);
      if (!existingItem) return;

      const isManualItem = id > 100;
      const updatedData = { id, title, body, userId: 1 };

      if (!isManualItem) {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'PATCH',
          body: JSON.stringify(updatedData),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        });
      }

      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
      );

      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };


  // Sort Items
  const handleSort = (field: 'title' | 'body') => {
    setSortField(field);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Apply Sorting
  const sortedItems = [...items].sort((a, b) => {
    return sortOrder === 'asc'
      ? a[sortField].localeCompare(b[sortField])
      : b[sortField].localeCompare(a[sortField]);
  });

  return {
    items,
    editingItem,
    sortOrder,
    handleDelete,
    handleEdit,
    handleUpdateItem,
    handleSort,
    sortedItems,
  };
};

export default useItemOperations;
