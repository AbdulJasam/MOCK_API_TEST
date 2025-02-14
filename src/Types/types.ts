
export type Item = {
    id: number;
    title: string;
    body: string;
    userId: number;
  };

export interface ListingProps {
    items: Item[];
    onDelete: (id: number) => void;
    onEdit: (item: Item) => void;
    onUpdate: (id: number, title: string, body: string) => void;
    editingItem: Item | null;
  }

  export type FetchingItem = {
    id: number;
    title: string;
    body: string;
  };

  
  export interface FetchingListProps {
    items: FetchingItem[];
    onDelete: (id: number) => void;
    onEdit: (item: any) => void;
    onUpdate: (id: number, title: string, body: string) => void;
    editingItem: any | null;
  }

  export interface AddItemListFormProps {
    onAdd: (title: string, body: string) => void;
  }
  