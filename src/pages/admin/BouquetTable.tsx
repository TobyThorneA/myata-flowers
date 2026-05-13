import type { IBouquet } from "./types";

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
      <table className="min-w-full table-auto text-sm">
        {/* <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0 z-10"> */}
        {/* <thead className="bg-gray-100 text-xs uppercase text-gray-600"> */}
        <thead className="sticky top-[59px] z-10 border border-black bg-gray-300 shadow-sm">
          <tr>
            <th className="border border-gray-400 p-2">Фото</th>
            <th className="border border-gray-400 p-2">Название</th>
            <th className="border border-gray-400 p-2">Цена</th>
            <th className="border border-gray-400 p-2">Размер</th>
            {/* <th className="p-2 border">Теги</th>
            <th className="p-2 border">Категории</th> */}
            <th className="border border-gray-400 p-2">Доступен</th>
            <th className="border border-gray-400 p-2">Скрыт</th>
            <th className="border border-gray-400 p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {bouquets.map((bq) => (
            <tr key={bq._id} className="hover:bg-gray-50">
              <td className="border border-gray-400 p-2">
                <img src={bq.images?.[0]} alt={bq.name} className="h-16 w-16 object-cover" />
              </td>
              <td className="border border-gray-400 p-2">{bq.name}</td>
              <td className="border border-gray-400 p-2">
                {bq.price}₽{" "}
                {bq.oldPrice ? (
                  <span className="ml-1 text-gray-400 line-through">{bq.oldPrice}₽</span>
                ) : null}
              </td>
              <td className="border border-gray-400 p-2">{bq.textSize}</td>
              {/* <td className="p-2 border">{bq.tags.join(', ')}</td>
              <td className="p-2 border">{bq.categories.join(', ')}</td> */}

              <td className="border border-gray-400 p-2">
                <input
                  type="checkbox"
                  checked={bq.available}
                  onChange={() => onToggleAvailable(bq._id, !bq.available)}
                />
              </td>
              <td className="border border-gray-400 p-2">
                <input
                  type="checkbox"
                  checked={bq.hidden}
                  onChange={() => onToggleHidden(bq._id, !bq.hidden)}
                />
              </td>

              <td className="border border-gray-400 p-2">
                <div className="flex gap-2">
                  <button
                    className="rounded bg-blue-500 px-2 py-1 text-xs text-white"
                    onClick={() => onEdit(bq)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="rounded bg-red-500 px-2 py-1 text-xs text-white"
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

export default BouquetTable;
