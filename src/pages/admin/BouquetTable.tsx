import React from 'react';
import type { IBouquet } from './types';

interface Props {
  bouquets: IBouquet[];
  onEdit: (bouquet: IBouquet) => void;
  onDelete: (id: string) => void;
  onToggleAvailable: (id: string, available: boolean) => void;
  onToggleHidden: (id: string, hidden: boolean) => void;
}

const BouquetTable: React.FC<Props> = ({
  bouquets,
  onEdit,
  onDelete,
  onToggleAvailable,
  onToggleHidden,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm table-auto border">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="p-2 border">Фото</th>
            <th className="p-2 border">Название</th>
            <th className="p-2 border">Цена</th>
            <th className="p-2 border">Размер</th>
            <th className="p-2 border">Теги</th>
            <th className="p-2 border">Категории</th>
            <th className="p-2 border">Доступен</th>
            <th className="p-2 border">Скрыт</th>
            <th className="p-2 border">Действия</th>
          </tr>
        </thead>
        <tbody>
          {bouquets.map((bq) => (
            <tr key={bq._id} className="hover:bg-gray-50">
              <td className="p-2 border">
                <img
                  src={bq.images?.[0]}
                  alt={bq.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="p-2 border">{bq.name}</td>
              <td className="p-2 border">
                {bq.price}₽ {bq.oldPrice ? <span className="line-through text-gray-400 ml-1">{bq.oldPrice}₽</span> : null}
              </td>
              <td className="p-2 border">{bq.textSize}</td>
              {/* <td className="p-2 border">{bq.tags.join(', ')}</td>
              <td className="p-2 border">{bq.categories.join(', ')}</td> */}

              {/* Пока скрыты ...................................*/}
              <td className="p-2 border hidden">
                <input
                  type="checkbox"
                  checked={bq.available}
                  onChange={() => onToggleAvailable(bq._id, !bq.available)}
                />
              </td>
              <td className="p-2 border hidden">
                <input
                  type="checkbox"
                  checked={bq.hidden}
                  onChange={() => onToggleHidden(bq._id, !bq.hidden)}
                />
              </td>

                {/* ............................................... */}

              <td className="p-2 border">
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                    onClick={() => onEdit(bq)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                    onClick={() => onDelete(bq._id)}
                  >
                    Удалить
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default BouquetTable