 // src/pages/AdminPanel.tsx
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@store/app/hook";
import { type Bouquet } from "../../mocks/productsData";
import {
  addBouquet,
  updateBouquet,
  deleteBouquet,
  fetchBouquets,
} from "@store/slices/bouquetsSlice";
import "./adminPanel.scss";

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const bouquets = useAppSelector((state) => state.bouquets.items);

  const [localBouquets, setLocalBouquets] = useState<Bouquet[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // При успешной авторизации загружаем букеты с сервера
  useEffect(() => {
    if (authenticated) {
      dispatch(fetchBouquets());
      // Также очистим draft, чтобы не мешался старый
      localStorage.removeItem("admin_draft_bouquets");
    }
  }, [authenticated, dispatch]);

  // Синхронизируем localBouquets с bouquets из redux при изменении (ВАРИАНТ 2)
  useEffect(() => {
    if (authenticated) {
      setLocalBouquets(bouquets);
      // Очистим draft при получении свежих данных с сервера,
      // чтобы не перезаписывать старыми черновиками
      localStorage.removeItem("admin_draft_bouquets");
    }
  }, [bouquets, authenticated]);

  // Автосохранение черновика в localStorage при каждом изменении localBouquets
  useEffect(() => {
    // Сохраняем только если пользователь авторизован,
    // чтобы не мешать черновиками до входа
    if (authenticated) {
      const timeout = setTimeout(() => {
        localStorage.setItem("admin_draft_bouquets", JSON.stringify(localBouquets));
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [localBouquets, authenticated]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
      } else {
        const error = await res.json();
        alert(error.error || 'Ошибка авторизации');
      }
    } catch (err) {
      alert('Ошибка подключения к серверу');
      console.error(err);
    }
  };

  // Изменение любого поля букета в localBouquets
  const handleChange = (
    id: string,
    field: keyof Bouquet,
    value: string | number | string[]
  ) => {
    setLocalBouquets((prev) =>
      prev.map((b) => (b._id === id ? { ...b, [field]: value } : b))
    );
  };

  const handleImageChange = (bouquetId: string, index: number, value: string) => {
    setLocalBouquets((prev) =>
      prev.map((b) => {
        if (b._id !== bouquetId) return b;
        const newImages = [...(b.images || [])];
        newImages[index] = value;
        return { ...b, images: newImages };
      })
    );
  };

  const handleAddImage = (bouquetId: string) => {
    setLocalBouquets((prev) =>
      prev.map((b) => {
        if (b._id !== bouquetId) return b;
        const newImages = [...(b.images || []), ""];
        return { ...b, images: newImages };
      })
    );
  };

  const handleRemoveImage = (bouquetId: string, index: number) => {
    setLocalBouquets((prev) =>
      prev.map((b) => {
        if (b._id !== bouquetId) return b;
        const newImages = [...(b.images || [])];
        newImages.splice(index, 1);
        return { ...b, images: newImages };
      })
    );
  };

  const handleAdd = () => {
    const newBouquet: Bouquet = {
      _id: `temp_${crypto.randomUUID()}`,
      name: "",
      price: 0,
      oldprice: 0,
      images: [],
      size: "",
      description: "",
      __v: 0,
    };
    setLocalBouquets((prev) => [newBouquet, ...prev]);
  };

  // Удаление букета: если временный, просто из local, иначе через redux + API
  const handleDelete = (id: string) => {
    if (id.startsWith("temp_")) {
      setLocalBouquets((prev) => prev.filter((b) => b._id !== id));
    } else {
      dispatch(deleteBouquet(id))
        .unwrap()
        .then(() => {
          // После успешного удаления запросим букеты заново для синхронизации
          dispatch(fetchBouquets());
          // Очистим draft после изменений
          localStorage.removeItem("admin_draft_bouquets");
        })
        .catch((err) => {
          alert("Ошибка при удалении букета");
          console.error(err);
        });
    }
  };

  // Сохранение букета: добавление или обновление
  const handleSave = (bouquetToSave: Bouquet) => {
    if (bouquetToSave._id.startsWith("temp_")) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, __v, ...dataToCreate } = bouquetToSave;
      dispatch(addBouquet(dataToCreate))
        .unwrap()
        .then(() => {
          dispatch(fetchBouquets());
          localStorage.removeItem("admin_draft_bouquets");
        })
        .catch((err) => {
          alert("Ошибка при добавлении букета");
          console.error(err);
        });
    } else {
      dispatch(updateBouquet({ id: bouquetToSave._id, data: bouquetToSave }))
        .unwrap()
        .then(() => {
          dispatch(fetchBouquets());
          localStorage.removeItem("admin_draft_bouquets");
        })
        .catch((err) => {
          alert("Ошибка при обновлении букета");
          console.error(err);
        });
    }
  };

  if (!authenticated) {
    return (
      <form className="admin-login" onSubmit={handleAuth}>
        <h2>Вход в админку</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit">Войти</button>
      </form>
    );
  }

  return (
    <div className="admin-panel">
      <h1>Админка: Букеты</h1>
      <button onClick={handleAdd}>➕ Добавить букет</button>
      {localBouquets.map((bouquet) => (
        <div className="admin-card" key={bouquet._id}>
          <input
            value={bouquet.name}
            onChange={(e) => handleChange(bouquet._id, "name", e.target.value)}
            placeholder="Название"
          />
          <input
            value={bouquet.price}
            onChange={(e) =>
              handleChange(bouquet._id, "price", +e.target.value || 0)
            }
            placeholder="Цена"
            type="number"
          />
          <input
            value={bouquet.oldprice}
            onChange={(e) =>
              handleChange(bouquet._id, "oldprice", +e.target.value || 0)
            }
            placeholder="Старая цена"
            type="number"
          />
          <input
            value={bouquet.size}
            onChange={(e) => handleChange(bouquet._id, "size", e.target.value)}
            placeholder="Размер"
          />
          <textarea
            value={bouquet.description || ""}
            onChange={(e) =>
              handleChange(bouquet._id, "description", e.target.value)
            }
            placeholder="Описание"
          />

          <div>
            <label>Фото:</label>
            {(bouquet.images || []).map((img, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "8px", marginBottom: "6px" }}
              >
                <input
                  type="text"
                  value={img}
                  onChange={(e) =>
                    handleImageChange(bouquet._id, i, e.target.value)
                  }
                  placeholder="URL изображения"
                  style={{ flexGrow: 1 }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(bouquet._id, i)}
                >
                  ❌
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddImage(bouquet._id)}>
              ➕ Добавить фото
            </button>
          </div>

          <div style={{ marginTop: 10, display: "flex", gap: "8px" }}>
            <button onClick={() => handleSave(bouquet)}>💾 Сохранить</button>
            <button onClick={() => handleDelete(bouquet._id)}>🗑️ Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;




// import React, { useState, useEffect } from "react";
// import { useAppSelector, useAppDispatch } from "@store/app/hook";
// import { type Bouquet } from "../../mocks/productsData";
// import {
//   addBouquet,
//   updateBouquet,
//   deleteBouquet,
//   fetchBouquets,
// } from "@store/slices/bouquetsSlice";
// import "./adminPanel.scss";

// const AdminPanel = () => {
//   const dispatch = useAppDispatch();
//   const bouquets = useAppSelector((state) => state.bouquets.items);

//   const [localBouquets, setLocalBouquets] = useState<Bouquet[]>([]);
//   const [authenticated, setAuthenticated] = useState(false);
//   const [password, setPassword] = useState("");

//   // При загрузке берём данные из redux либо localStorage (для сохранения изменений между перезагрузками)
//   useEffect(() => {
//     if (authenticated) {
//       dispatch(fetchBouquets());
//     }
//   }, [authenticated, dispatch]);

//   useEffect(() => {
//   const draft = localStorage.getItem("admin_draft_bouquets");
//   if (draft) {
//     setLocalBouquets(JSON.parse(draft));
//   } else {
//     setLocalBouquets(bouquets);
//   }
// }, [bouquets]);

// // 🧠 Автосохранение черновика в localStorage при каждом изменении
// useEffect(() => {
//   const timeout = setTimeout(() => {
//     localStorage.setItem("admin_draft_bouquets", JSON.stringify(localBouquets));
//   }, 500); // сохраняем через 500 мс после последнего изменения

//   return () => clearTimeout(timeout); // сброс при новом изменении
// }, [localBouquets]);

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }, 
//         body: JSON.stringify({ password }),
//       });

//       if (res.ok) {
//         setAuthenticated(true);
//       } else {
//         const error = await res.json();
//         alert(error.error || 'Ошибка авторизации');
//       }
//     } catch (err) {
//       alert('Ошибка подключения к серверу');
//       console.error(err);
//     }
//   };


//   // Общая функция для изменения любого поля букета
//   const handleChange = (
//     id: string,
//     field: keyof Bouquet,
//     value: string | number | string[]
//   ) => {
//     setLocalBouquets((prev) =>
//       prev.map((b) => (b._id === id ? { ...b, [field]: value } : b))
//     );
//   };

//   // Изменение одного URL из массива images
//   const handleImageChange = (bouquetId: string, index: number, value: string) => {
//     setLocalBouquets((prev) =>
//       prev.map((b) => {
//         if (b._id !== bouquetId) return b;
//         const newImages = [...(b.images || [])];
//         newImages[index] = value;
//         return { ...b, images: newImages };
//       })
//     );
//   };

//   // Добавить пустой URL в массив images
//   const handleAddImage = (bouquetId: string) => {
//     setLocalBouquets((prev) =>
//       prev.map((b) => {
//         if (b._id !== bouquetId) return b;
//         const newImages = [...(b.images || []), ""];
//         return { ...b, images: newImages };
//       })
//     );
//   };

//   // Удалить URL из массива images
//   const handleRemoveImage = (bouquetId: string, index: number) => {
//     setLocalBouquets((prev) =>
//       prev.map((b) => {
//         if (b._id !== bouquetId) return b;
//         const newImages = [...(b.images || [])];
//         newImages.splice(index, 1);
//         return { ...b, images: newImages };
//       })
//     );
//   };

//   // Добавить новый букет с временным UUID
//   const handleAdd = () => {
//     const newBouquet: Bouquet = {
//       _id: `temp_${crypto.randomUUID()}`,
//       name: "",
//       price: 0,
//       oldprice: 0,
//       images: [],
//       size: "",
//       description: "",
//       __v: 0,
//     };
//     setLocalBouquets((prev) => [newBouquet, ...prev]);
//   };

//   // Удалить букет локально и на сервере
// const handleDelete = (id: string) => {
//   if (id.startsWith("temp_")) {
//     // Удаляем сразу из локального состояния, т.к. на сервере его нет
//     setLocalBouquets((prev) => prev.filter((b) => b._id !== id));
//   } else {
//     // Удаляем через redux и API, обновление стейта будет после успешного удаления
//     dispatch(deleteBouquet(id));
//   }
// };

//   // Сохранить изменения букет на сервере (создать или обновить)
// const handleSave = (bouquetToSave: Bouquet) => {

//   // startsWith("temp_") — условие для определения новых букетов с временным id, которые ещё не сохранены на сервере.
//   if (bouquetToSave._id.startsWith("temp_")) {
//   // Новый букет — вытаскиваем _id и __v из объекта и создаём data без них
//   // dataToCreate — объект без _id и __v, чтобы сервер мог создать новый документ с правильным id.
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { _id, __v, ...dataToCreate } = bouquetToSave;
//   dispatch(addBouquet(dataToCreate));
// } else {
//   // Для обновления (updateBouquet) передаётся реальный _id.
//   dispatch(updateBouquet({ id: bouquetToSave._id, data: bouquetToSave }));
// }

// };



//   if (!authenticated) {
//     return (
//       <form className="admin-login" onSubmit={handleAuth}>
//         <h2>Вход в админку</h2>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Пароль"
//         />
//         <button type="submit">Войти</button>
//       </form>
//     );
//   }

//   return (
//     <div className="admin-panel">
//       <h1>Админка: Букеты</h1>
//       <button onClick={handleAdd}>➕ Добавить букет</button>
//       {localBouquets.map((bouquet) => (
//         <div className="admin-card" key={bouquet._id}>
//           <input
//             value={bouquet.name}
//             onChange={(e) => handleChange(bouquet._id, "name", e.target.value)}
//             placeholder="Название"
//           />
//           <input
//             value={bouquet.price}
//             onChange={(e) =>
//               handleChange(bouquet._id, "price", +e.target.value || 0)
//             }
//             placeholder="Цена"
//             type="number"
//           />
//           <input
//             value={bouquet.oldprice}
//             onChange={(e) =>
//               handleChange(bouquet._id, "oldprice", +e.target.value || 0)
//             }
//             placeholder="Старая цена"
//             type="number"
//           />
//           <input
//             value={bouquet.size}
//             onChange={(e) => handleChange(bouquet._id, "size", e.target.value)}
//             placeholder="Размер"
//           />
//           <textarea
//             value={bouquet.description || ""}
//             onChange={(e) =>
//               handleChange(bouquet._id, "description", e.target.value)
//             }
//             placeholder="Описание"
//           />

//           {/* Редактирование массива ссылок на фото */}
//           <div>
//             <label>Фото:</label>
//             {(bouquet.images || []).map((img, i) => (
//               <div
//                 key={i}
//                 style={{ display: "flex", gap: "8px", marginBottom: "6px" }}
//               >
//                 <input
//                   type="text"
//                   value={img}
//                   onChange={(e) =>
//                     handleImageChange(bouquet._id, i, e.target.value)
//                   }
//                   placeholder="URL изображения"
//                   style={{ flexGrow: 1 }}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveImage(bouquet._id, i)}
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//             <button type="button" onClick={() => handleAddImage(bouquet._id)}>
//               ➕ Добавить фото
//             </button>
//           </div>

//           <div style={{ marginTop: 10, display: "flex", gap: "8px" }}>
//             <button onClick={() => handleSave(bouquet)}>💾 Сохранить</button>
//             <button onClick={() => handleDelete(bouquet._id)}>🗑️ Удалить</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminPanel;

