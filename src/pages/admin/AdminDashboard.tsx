// src/pages/admin/AdminDashboard.tsx
// список букетов + удаление и т.д.
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@store/app/hook';
import {
  fetchBouquetsThunk,
  deleteBouquetThunk,
  updateBouquetThunk,
  createBouquetThunk,
} from '@store/slices/bouquetSlice';
import BouquetForm, { type BouquetFormData } from './BouquetForm';
import BouquetTable from './BouquetTable';
import type { IBouquet } from './types';

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const bouquets = useAppSelector((state) => state.bouquet.items);
  const [editingBouquet, setEditingBouquet] = useState<IBouquet | null>(null);
  const [showForm, setShowForm] = useState(false);

  const sortedAsc = [...bouquets].sort((a, b) => a.price - b.price);
//   const sortedAsc = [...bouquets].sort((a, b) => {
//   // 1. Сначала по hidden
//   if (a.hidden !== b.hidden) {
//     return a.hidden ? 1 : -1; // скрытые идут в конец
//   }

//   // 2. Потом по available
//   if (a.available !== b.available) {
//     return a.available ? -1 : 1; // доступные раньше
//   }

//   // 3. Потом по цене
//   return a.price - b.price;
// });

  useEffect(() => {
    dispatch(fetchBouquetsThunk({ isAdmin: true }));
  }, [dispatch]);

  const handleCreate = () => {
    setEditingBouquet(null);
    setShowForm(true);
  };

  const handleEdit = (bouquet: IBouquet) => {
    setEditingBouquet(bouquet);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Удалить букет?')) {
      await dispatch(deleteBouquetThunk(id));
      dispatch(fetchBouquetsThunk({ isAdmin: true }));
    }
  };

  const handleSave = async (data: BouquetFormData) => {
    if (editingBouquet) {
      await dispatch(updateBouquetThunk({ id: editingBouquet._id, data })).unwrap();
    } else {
      await dispatch(createBouquetThunk(data)).unwrap();
    }
    setShowForm(false);
    setEditingBouquet(null);
    dispatch(fetchBouquetsThunk({ isAdmin: true }));
  };

  const handleToggleAvailable = async (id: string, available: boolean) => {
    await dispatch(updateBouquetThunk({ id, data: { available } })).unwrap();
    dispatch(fetchBouquetsThunk({ isAdmin: true }));
  };

  const handleToggleHidden = async (id: string, hidden: boolean) => {
    await dispatch(updateBouquetThunk({ id, data: { hidden } })).unwrap();
    dispatch(fetchBouquetsThunk({ isAdmin: true }));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Админка: Управление букетами</h1>

      {showForm ? (
        <BouquetForm
          initialData={editingBouquet}
          onSave={handleSave}
          onCancel={() => {
            setEditingBouquet(null);
            setShowForm(false);
          }}
        />
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleCreate}
            >
              + Новый букет
            </button>
          </div>

          <BouquetTable
            bouquets={sortedAsc}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleAvailable={handleToggleAvailable}
            onToggleHidden={handleToggleHidden}
          />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;


