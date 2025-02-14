import React from 'react';
import {FetchingListProps} from '../Types/types'



const FetchingList: React.FC<FetchingListProps> = ({ items, onDelete, onEdit, onUpdate, editingItem }) => {

  return (
    <ul className="space-y-4 mb-8 ">
      {items.map((item, key) => (
        <li key={key} className="p-4 bg-gray-100 shadow-md rounded-md flex flex-col">
          {editingItem?.id === item.id ? (
            <>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) =>
                  onEdit({ ...editingItem, title: e.target.value }) // Update editingItem state
                }
                className="p-2 border rounded-md mb-2"
              />
              <textarea
                value={editingItem.body} // Bind textarea value to editingItem body
                onChange={(e) =>
                  onEdit({ ...editingItem, body: e.target.value }) // Update editingItem state
                }
                className="w-full p-2 border border-gray-300"
                autoFocus
              />
              <button
                onClick={() => onUpdate(item.id, editingItem.title, editingItem.body)}
                className="px-3 py-1 bg-green-500 text-white rounded-md mr-2"
              >
                Save              {/* Save changes */}
              </button>
              <button
                onClick={() => onEdit(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded-md"
              >
                Cancel         {/* Chancel button */}
              </button>
            </>
          ) : (             //Listing component with edit and delete buttons
            <>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-gray-700">{item.body}</p>
              <div className="mt-2">
                <button
                  onClick={() => {
                    onEdit(item);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FetchingList;
