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

// const AdminDashboard = () => {
//   const dispatch = useAppDispatch();
//   const bouquets = useAppSelector((state) => state.bouquet.items);
//   const [editingBouquet, setEditingBouquet] = useState<IBouquet | null>(null);
//   const [showForm, setShowForm] = useState(false);


//   const scrollPositionRef = useRef(0);
//   const formContainerRef = useRef<HTMLDivElement>(null);

//     // Восстанавливать скролл после закрытия формы
//   useEffect(() => {
//     if (!showForm) {
//       window.scrollTo(0, scrollPositionRef.current);
//     }
//   }, [showForm]);

//   const handleCreate = () => {
//     scrollPositionRef.current = window.scrollY;
//     setEditingBouquet(null);
//     setShowForm(true);
//   };

//   const handleEdit = (bouquet: IBouquet) => {
//     scrollPositionRef.current = window.scrollY;
//     setEditingBouquet(bouquet);
//     setShowForm(true);
//   };

//     // const [scrollPosition, setScrollPosition] = useState(0);

//   // const handleCreate = () => {
//   //   setScrollPosition(window.scrollY);
//   //   setEditingBouquet(null);
//   //   setShowForm(true);
//   // };

//   // const handleEdit = (bouquet: IBouquet) => {
//   //   setScrollPosition(window.scrollY);
//   //   setEditingBouquet(bouquet);
//   //   setShowForm(true);
//   // };

//   // const handleCancel = () => {
//   //   setEditingBouquet(null);
//   //   setShowForm(false);
//   //   // Восстанавливаем скролл после рендера формы
//   //   setTimeout(() => {
//   //     window.scrollTo(0, scrollPosition);
//   //   }, 0);
//   // };


//   const sortedAsc = [...bouquets].sort((a, b) => a.price - b.price);
// //   const sortedAsc = [...bouquets].sort((a, b) => {
// //   // 1. Сначала по hidden
// //   if (a.hidden !== b.hidden) {
// //     return a.hidden ? 1 : -1; // скрытые идут в конец
// //   }

// //   // 2. Потом по available
// //   if (a.available !== b.available) {
// //     return a.available ? -1 : 1; // доступные раньше
// //   }

// //   // 3. Потом по цене
// //   return a.price - b.price;
// // });

//   useEffect(() => {
//     // @ts-expect-error вызов thunk с типами
//     dispatch(fetchBouquetsThunk({ isAdmin: true }));
//   }, [dispatch]);

//   // const handleCreate = () => {
//   //   setEditingBouquet(null);
//   //   setShowForm(true);
//   // };

//   // const handleEdit = (bouquet: IBouquet) => {
//   //   setEditingBouquet(bouquet);
//   //   setShowForm(true);
//   // };

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Удалить букет?')) {
//       // @ts-expect-error вызов thunk с типами
//       await dispatch(deleteBouquetThunk(id));
//       // @ts-expect-error вызов thunk с типами
//       dispatch(fetchBouquetsThunk({ isAdmin: true }));
//     }
//   };

//   const handleSave = async (data: BouquetFormData) => {
//     if (editingBouquet) {
//       // @ts-expect-error вызов thunk с типами
//       await dispatch(updateBouquetThunk({ id: editingBouquet._id, data })).unwrap();
//     } else {
//       // @ts-expect-error вызов thunk с типами
//       await dispatch(createBouquetThunk(data)).unwrap();
//     }
//     setShowForm(false);
//     setEditingBouquet(null);
//     // @ts-expect-error вызов thunk с типами
//     dispatch(fetchBouquetsThunk({ isAdmin: true }));
//   };

//   const handleToggleAvailable = async (id: string, available: boolean) => {
//     // @ts-expect-error вызов thunk с типами
//     await dispatch(updateBouquetThunk({ id, data: { available } })).unwrap();
//     // @ts-expect-error вызов thunk с типами
//     dispatch(fetchBouquetsThunk({ isAdmin: true }));
//   };

//   const handleToggleHidden = async (id: string, hidden: boolean) => {
//     // @ts-expect-error вызов thunk с типами
//     await dispatch(updateBouquetThunk({ id, data: { hidden } })).unwrap();
//     // @ts-expect-error вызов thunk с типами
//     dispatch(fetchBouquetsThunk({ isAdmin: true }));
//   };

//   return (
//     <div ref={formContainerRef}>
//       <div className="font-sansSerif pr-8 admin-scroll">
//       <h1 className=" text-xl font-bold mb-1 text-center">Админка: Управление букетами</h1>

//       {showForm ? (
//         <BouquetForm
//           initialData={editingBouquet}
//           onSave={handleSave}
//           onCancel={() => {
//             setEditingBouquet(null);
//             setShowForm(false);
//           }}
//         />
//       ) : (
//         // <div className='flex'>
//         //   <BouquetTable
//         //     bouquets={sortedAsc}
//         //     onEdit={handleEdit}
//         //     onDelete={handleDelete}
//         //     onToggleAvailable={handleToggleAvailable}
//         //     onToggleHidden={handleToggleHidden}
//         //   />

//         //   <div className="flex absolute right-5 justify-end mb-4">
//         //     <button
//         //       className="bg-green-600 text-white px-4 py-2 rounded h-10"
//         //       onClick={handleCreate}
//         //     >
//         //       + Новый букет
//         //     </button>
//         //   </div>
//         // </div>


//         <div className="relative">
//           {/* Кнопка - fixed в правом верхнем углу */}
//           <button
//             className="fixed right-4 top-24 bg-green-600 text-white px-4 py-2 rounded z-30 shadow-lg hover:bg-green-700"
//             onClick={handleCreate}
//           >
//             + Новый букет
//           </button>

//           {/* Таблица со sticky заголовком */}
//           <BouquetTable
//             bouquets={sortedAsc}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//             onToggleAvailable={handleToggleAvailable}
//             onToggleHidden={handleToggleHidden}
//           />
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// AdminDashboard.tsx
// src/pages/admin/AdminDashboard.tsx
const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const bouquets = useAppSelector((state) => state.bouquet.items);
  const [editingBouquet, setEditingBouquet] = useState<IBouquet | null>(null);
  const [showForm, setShowForm] = useState(false);

  const sortedAsc = [...bouquets].sort((a, b) => a.price - b.price);

  useEffect(() => {
    // @ts-expect-error вызов thunk с типами
    dispatch(fetchBouquetsThunk({ isAdmin: true }));
  }, [dispatch]);

  const handleCreate = () => {
    setEditingBouquet(null);
    setShowForm(true);
    // Блокируем скролл страницы когда форма открыта
    document.body.style.overflow = 'hidden';
  };

  const handleEdit = (bouquet: IBouquet) => {
    setEditingBouquet(bouquet);
    setShowForm(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCancel = () => {
    setEditingBouquet(null);
    setShowForm(false);
    // Восстанавливаем скролл
    document.body.style.overflow = 'auto';
  };

  // ДОБАВЬ ЭТИ ОБРАБОТЧИКИ - они отсутствуют в моём коде
  const handleDelete = async (id: string) => {
    if (window.confirm('Удалить букет?')) {
      // @ts-expect-error вызов thunk с типами
      await dispatch(deleteBouquetThunk(id));
      // @ts-expect-error вызов thunk с типами
      dispatch(fetchBouquetsThunk({ isAdmin: true }));
    }
  };

  const handleToggleAvailable = async (id: string, available: boolean) => {
    // @ts-expect-error вызов thunk с типами
    await dispatch(updateBouquetThunk({ id, data: { available } })).unwrap();
    // @ts-expect-error вызов thunk с типами
    dispatch(fetchBouquetsThunk({ isAdmin: true }));
  };

  const handleToggleHidden = async (id: string, hidden: boolean) => {
    // @ts-expect-error вызов thunk с типами
    await dispatch(updateBouquetThunk({ id, data: { hidden } })).unwrap();
    // @ts-expect-error вызов thunk с типами
    dispatch(fetchBouquetsThunk({ isAdmin: true }));
  };

  const handleSave = async (data: BouquetFormData) => {
    if (editingBouquet) {
      // @ts-expect-error вызов thunk с типами
      await dispatch(updateBouquetThunk({ id: editingBouquet._id, data })).unwrap();
    } else {
      // @ts-expect-error вызов thunk с типами
      await dispatch(createBouquetThunk(data)).unwrap();
    }
    setShowForm(false);
    setEditingBouquet(null);
    document.body.style.overflow = 'auto';
    // @ts-expect-error вызов thunk с типами
    dispatch(fetchBouquetsThunk({ isAdmin: true }));
  };

  return (
    <div className="font-sansSerif pr-8 relative">
      <h1 className="text-xl font-bold mb-1 text-center">
        Админка: Управление букетами
      </h1>

      {/* Основной интерфейс - всегда виден */}
      <div className="relative">
        <button
          className="fixed right-4 top-24 bg-green-600 text-white px-4 py-2 rounded z-30 shadow-lg hover:bg-green-700"
          onClick={handleCreate}
        >
          + Новый букет
        </button>

        <BouquetTable
          bouquets={sortedAsc}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleAvailable={handleToggleAvailable}
          onToggleHidden={handleToggleHidden}
        />
      </div>

      {/* Форма как модальное окно поверх всего */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black bg-opacity-50 pt-20 pb-10 px-4">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl">
            <BouquetForm
              initialData={editingBouquet}
              onSave={handleSave}
              onCancel={handleCancel}
            />
            
            {/* Кнопка закрытия сверху */}
            <button
              onClick={handleCancel}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminDashboard;


