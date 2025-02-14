import React from 'react';
import ItemList from './ItemList';
import useItemOperations from './APILogics/useItemOperations';

const Home_Comp: React.FC = () => {
    const {
        editingItem,
        sortOrder,
        handleDelete,
        handleEdit,
        handleUpdateItem,
        handleSort,
        sortedItems,
    } = useItemOperations();

    return (
        <div className="container mx-auto p-2 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">React Mock API App</h1>
            {/* Sorting Buttons */}
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => handleSort('title')}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm font-semibold hover:bg-gray-800"
                >
                    Sort by Title ({sortOrder})
                </button>
                <button
                    onClick={() => handleSort('body')}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm font-semibold hover:bg-gray-800"
                >
                    Sort by Description ({sortOrder})
                </button>
            </div>

            {/* List of Items */}
            <ItemList
                items={sortedItems}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onUpdate={handleUpdateItem}
                editingItem={editingItem}
            />
        </div>
    );
};

export default Home_Comp;
