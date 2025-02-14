import { useState, useEffect } from 'react';
import {Item} from '../../Types/types'

const useItemOperations = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  
  // Sorting state
  const [sortField, setSortField] = useState<'title' | 'body'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch data when component loads
  useEffect(() => {
      fetchItems(1);
  }, [])
  

  // Fetch Items from API
  const fetchItems = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch items: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.length === 0) {
        setAllLoaded(true);
        return; // Exit early to prevent unnecessary state updates
      }
  
      setItems((prevItems) => [...prevItems, ...data]);
  
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };
  

  // Add New Item
  const handleAddItem = async (title: string, body: string) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ title, body, userId: 1 }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add item: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      setItems((prevItems) => [data, ...prevItems]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };
  

  // Delete an Item
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
  
      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status} ${response.statusText}`);
      }
  
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  // Edit Item (Show Edit Form)
  const handleEdit = (item: Item) => {
    setEditingItem(item);
  };

  // Update Existing Item
  const handleUpdateItem = async (id: number, title: string, body: string) => {
    try {
      const existingItem = items.find((item) => item.id === id);
      if (!existingItem) {
        console.warn(`Item with ID ${id} not found.`);
        return;
      }
  
      const isManualItem = id > 100;
      const updatedData = { ...existingItem, title, body };
  
      if (!isManualItem) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify(updatedData),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to update item: ${response.status} ${response.statusText}`);
        }
      }
  
      // Update local state
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
      );
  
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setEditingItem(null); // Ensures editing mode is exited
    }
  };
  

  // Load More Items
  const handleLoadMore = () => {
    if (!loading && !allLoaded) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchItems(nextPage);
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
    loading,
    allLoaded,
    editingItem,
    sortOrder,
    handleAddItem,
    handleDelete,
    handleEdit,
    handleUpdateItem,
    handleLoadMore,
    handleSort,
    sortedItems,
  };
};

export default useItemOperations;
