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
    <div className="scrollbar-hide min-w-full">
    {/* <div className=" h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide min-w-full"> */}
      <table className=" text-sm table-auto min-w-full">
        {/* <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0 z-10"> */}
        {/* <thead className="bg-gray-100 text-xs uppercase text-gray-600"> */}
        <thead className="sticky top-[59px] border border-black z-10 bg-gray-300 shadow-sm">
          <tr>
            <th className="p-2 border border-gray-400">Фото</th>
            <th className="p-2 border border-gray-400">Название</th>
            <th className="p-2 border border-gray-400">Цена</th>
            <th className="p-2 border border-gray-400">Размер</th>
            {/* <th className="p-2 border">Теги</th>
            <th className="p-2 border">Категории</th> */}
            <th className="p-2 border border-gray-400">Доступен</th>
            <th className="p-2 border border-gray-400">Скрыт</th>
            <th className="p-2 border border-gray-400">Действия</th>
          </tr>
        </thead>
        <tbody>
          {bouquets.map((bq) => (
            <tr key={bq._id} className="hover:bg-gray-50">
              <td className="p-2 border border-gray-400">
                <img
                  src={bq.images?.[0]}
                  alt={bq.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="p-2 border border-gray-400">{bq.name}</td>
              <td className="p-2 border border-gray-400">
                {bq.price}₽ {bq.oldPrice ? <span className="line-through text-gray-400 ml-1">{bq.oldPrice}₽</span> : null}
              </td>
              <td className="p-2 border border-gray-400">{bq.textSize}</td>
              {/* <td className="p-2 border">{bq.tags.join(', ')}</td>
              <td className="p-2 border">{bq.categories.join(', ')}</td> */}

              
              <td className="p-2 border border-gray-400">
                <input
                  type="checkbox"
                  checked={bq.available}
                  onChange={() => onToggleAvailable(bq._id, !bq.available)}
                />
              </td>
              <td className="p-2 border border-gray-400">
                <input
                  type="checkbox"
                  checked={bq.hidden}
                  onChange={() => onToggleHidden(bq._id, !bq.hidden)}
                />
              </td>

              <td className="p-2 border border-gray-400">
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
