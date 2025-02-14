import React from 'react';
import AddItemListForm from './AddItemListForm';
import ItemList from './ItemList';
import useItemOperations from './APILogics/useItemOperations';

const Home_Comp: React.FC = () => {
    const {
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
    } = useItemOperations();

    return (
        <div className="container mx-auto p-2 min-h-screen">
            <h1 className="text-3xl text-center font-bold mb-6 p-8">React Mock API App</h1>

            {/* Form to Add New Item */}
            <AddItemListForm onAdd={handleAddItem} />

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

            {/* Load More Button */}
            <div className="text-center mt-6">
                {!allLoaded && (
                    <button
                        onClick={handleLoadMore}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-semibold shadow-md hover:bg-blue-600 transition-opacity"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Home_Comp;
