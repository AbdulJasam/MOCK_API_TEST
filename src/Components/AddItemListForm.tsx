import React, { useState } from 'react';
import {AddItemListFormProps} from '../Types/types'

const AddItemListForm: React.FC<AddItemListFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(title, body);
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
        Add Item
      </button>
    </form>
  );
};

export default AddItemListForm;