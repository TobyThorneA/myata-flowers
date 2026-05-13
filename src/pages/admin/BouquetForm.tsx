// src/pages/admin/BouquetForm.tsx
// форма добавления/редактирования
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import type { IBouquet } from "./types";

//   name: z.string().min(1, 'Название обязательно'),
//   price: z.number().min(1, 'Укажите цену'),
//   oldPrice: z.number().optional(),
//   description: z.string().min(1, 'Описание обязательно'),
//   images: z
//     .string()
//     .transform((val) =>
//       val
//         .split(/[\n,]/)
//         .map((s) => s.trim())
//         .filter(Boolean)
//     )
//     .refine((arr: string[]) => arr.length > 0 && arr.every((url) => /^https?:\/\/.+/.test(url)), {
//       message: 'Введите хотя бы одну корректную ссылку на изображение',
//     }),
//   size: z.string().min(1, 'Размер обязателен'),
//   textSize: z.enum(['маленький', 'средний', 'большой']),
//   promotion: z
//     .object({
//       active: z.boolean(),
//       type: z.enum(['discount', 'free_delivery', 'delivery_discount']),
//       description: z.string().optional(),
//     })
//     .optional(),
//   flowers: z
//     .array(
//       z.object({
//         type: z.string().min(1),
//         sort: z.string().min(1),
//         color: z.string().min(1),
//         quantity: z.number().min(1),
//       })
//     )
//     .min(1, 'Добавьте хотя бы один цветок'),
//   available: z.boolean(),
//   hidden: z.boolean(),
//   tags: z.array(z.string()).optional(),
//   categories: z.array(z.string()).optional(),
// });

// До трансформации — форма
const bouquetFormInputSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  price: z.number().min(1, "Укажите цену"),
  oldPrice: z.number().optional(),
  description: z.string().min(1, "Описание обязательно"),
  images: z.string().min(1, "Добавьте хотя бы одну ссылку"),
  size: z.string().min(1, "Размер обязателен"),
  textSize: z.enum(["маленький", "средний", "большой"]),
  promotion: z
    .object({
      active: z.boolean(),
      type: z.enum(["discount", "free_delivery", "delivery_discount"]),
      description: z.string().optional(),
    })
    .optional(),
  flowers: z
    .array(
      z.object({
        type: z.string().min(1),
        sort: z.string().min(1),
        color: z.string().min(1),
        quantity: z.number().min(1),
      }),
    )
    .min(1, "Добавьте хотя бы один цветок"),
  available: z.boolean(),
  hidden: z.boolean(),
  tags: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
});

// После трансформации — для сохранения
const bouquetSchema = bouquetFormInputSchema.extend({
  images: z
    .string()
    .transform((val) =>
      val
        .split(/[\n,]/)
        .map((s) => s.trim())
        .filter(Boolean),
    )
    .refine((arr: string[]) => arr.length > 0 && arr.every((url) => /^https?:\/\/.+/.test(url)), {
      message: "Введите хотя бы одну корректную ссылку на изображение",
    }),
});

export type BouquetFormInput = z.infer<typeof bouquetFormInputSchema>; // для формы
export type BouquetFormData = z.infer<typeof bouquetSchema>; // после .transform

interface Props {
  initialData?: IBouquet | null;
  onSave: (data: BouquetFormData) => Promise<void>;
  onCancel: () => void;
}

const BouquetForm: React.FC<Props> = ({ initialData, onSave, onCancel }) => {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BouquetFormInput>({
    resolver: zodResolver(bouquetFormInputSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          images: initialData.images.join("\n"), // преобразуем массив в строку для textarea
        }
      : {
          name: "",
          price: 0,
          description: "",
          images: "",
          size: "",
          textSize: "маленький",
          flowers: [],
          available: true,
          hidden: false,
          tags: [],
          categories: [],
        },
  });
  const flowersArray = useFieldArray({ control, name: "flowers" });

  const promotion = watch("promotion");
  const promotionActive = promotion?.active ?? false;
  const flowersErrorMessage =
    typeof errors.flowers?.message === "string" ? errors.flowers.message : undefined;

  /////////////////////////////////////////////////////////////////////////////////////////////

  // ...внутри BouquetForm, перед submit
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // const handleFilesUpload = async (files: FileList | null) => {
  //   if (!files || files.length === 0) return;

  //   const formData = new FormData();
  //   formData.append('bouquetName', watch('name') || 'Без названия'); // используем текущее имя букета
  //   Array.from(files).forEach((file) => formData.append('files', file));

  //   try {
  //     setUploading(true);
  //     const res = await fetch('https://api-v2.myata-flowers.ru/api/bouquets/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     const data = await res.json();
  //     if (data.images) {
  //       setUploadedImages(data.images);
  //       // Обновляем поле images формы, чтобы сохранить ссылки
  //       reset({ ...watch(), images: data.images.join('\n') });
  //     }
  //   } catch (err) {
  //     console.error('Ошибка загрузки файлов', err);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  ////////////////////////////////////////////////////////////////////////////////////////

  const handleFilesUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append("name", watch("name") || "Без названия"); // 👈 теперь совпадает с бэком
    Array.from(files).forEach((file) => formData.append("images", file)); // 👈 имя поля совпадает с multer

    try {
      setUploading(true);
      const res = await fetch("https://api-v2.myata-flowers.ru/api/bouquets/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.urls) {
        // 👈 бэкенд возвращает { urls }, не { images }
        setUploadedImages(data.urls);
        reset({ ...watch(), images: data.urls.join("\n") });
      }
    } catch (err) {
      console.error("Ошибка загрузки файлов", err);
    } finally {
      setUploading(false);
    }
  };

  const submit = async (data: BouquetFormInput) => {
    try {
      const parsedData = bouquetSchema.parse(data); // <- здесь всё приведётся к правильному виду
      await onSave(parsedData); // <- сюда уйдёт уже правильный `BouquetFormData`
      setMessage({ type: "success", text: "Букет сохранён 🎉" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Ошибка при сохранении букета" });
    } finally {
      setTimeout(() => {
        setMessage(null);
        reset();
      }, 3000);
    }
  };

  return (
    <>
      {message && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div
            className={`w-full max-w-md rounded p-8 text-center text-xl font-semibold text-white shadow-lg ${
              message.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
            role="alert"
          >
            {message.text}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(submit)} className="mb-6 rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          {initialData ? "Редактировать букет" : "Добавить новый букет"}
        </h2>

        {/* Название */}
        <div className="mb-2">
          <label className="block">Название *</label>
          <input {...register("name")} className="w-full rounded border p-1" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Цена и старая цена */}
        <div className="mb-2 grid grid-cols-2 gap-4">
          <div>
            <label>Цена *</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="w-full rounded border p-1"
            />
            {errors.price && <p className="text-sm text-red-600">{errors.price.message}</p>}
          </div>
          <div>
            <label>Старая цена</label>
            <input
              type="number"
              step="0.01"
              {...register("oldPrice", { valueAsNumber: true })}
              className="w-full rounded border p-1"
            />
          </div>
        </div>

        {/* Описание */}
        <div className="mb-2">
          <label>Описание *</label>
          <textarea {...register("description")} className="w-full rounded border p-1" rows={3} />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Изображения */}
        <div className="mb-4">
          <label>Ссылки на изображения *</label>
          <textarea
            {...register("images")}
            rows={4}
            className="w-full rounded border p-1"
            placeholder={`https://...jpg\nhttps://...webp`}
          />
          {errors.images && <p className="text-sm text-red-600">{errors.images.message}</p>}
        </div>

        {/*Новый механизм загрузки изображений*/}

        {/* Загрузка изображений */}
        <div className="mb-4">
          <label>Фотографии букета</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFilesUpload(e.target.files)}
            className="w-full rounded border p-1"
          />

          {uploading && <p className="text-sm text-blue-600">Загрузка...</p>}

          {uploadedImages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {uploadedImages.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`bouquet-${idx}`}
                  className="h-20 w-20 rounded border object-cover"
                />
              ))}
            </div>
          )}

          {errors.images && <p className="text-sm text-red-600">{errors.images.message}</p>}
        </div>

        {/* Цветы */}
        <div className="mb-4">
          <label>Цветы *</label>
          {flowersArray.fields.map((field, idx) => (
            <div key={field.id} className="mb-2 grid grid-cols-5 gap-2">
              <input
                placeholder="Тип"
                {...register(`flowers.${idx}.type`)}
                className="rounded border p-1"
              />
              <input
                placeholder="Сорт"
                {...register(`flowers.${idx}.sort`)}
                className="rounded border p-1"
              />
              <input
                placeholder="Цвет"
                {...register(`flowers.${idx}.color`)}
                className="rounded border p-1"
              />
              <input
                type="number"
                placeholder="Кол-во"
                {...register(`flowers.${idx}.quantity`, { valueAsNumber: true })}
                className="rounded border p-1"
              />
              <button
                type="button"
                onClick={() => flowersArray.remove(idx)}
                className="text-red-600"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => flowersArray.append({ type: "", sort: "", color: "", quantity: 1 })}
            className="text-sm text-blue-600"
          >
            Добавить цветок
          </button>

          {flowersErrorMessage && <p className="text-sm text-red-600">{flowersErrorMessage}</p>}
        </div>

        {/* Размер и размер текста */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label>Размер *</label>
            <input {...register("size")} className="w-full rounded border p-1" />
          </div>
          <div>
            <label>Размер текста *</label>
            <select {...register("textSize")} className="w-full rounded border p-1">
              <option value="маленький">маленький</option>
              <option value="средний">средний</option>
              <option value="большой">большой</option>
            </select>
          </div>
        </div>

        {/* Акция */}
        <div className="my-4">
          <label>
            <input type="checkbox" {...register("promotion.active")} className="mr-2" />
            Активна акция?
          </label>
          {promotionActive && (
            <div className="mt-2 flex flex-col gap-2">
              <select {...register("promotion.type")} className="rounded border p-1">
                <option value="discount">Скидка</option>
                <option value="free_delivery">Бесплатная доставка</option>
                <option value="delivery_discount">Скидка на доставку</option>
              </select>
              <input
                placeholder="Описание акции"
                {...register("promotion.description")}
                className="rounded border p-1"
              />
            </div>
          )}
        </div>

        {/* Чекбоксы */}
        {/* <div className="mb-4">
          <label><input type="checkbox" {...register('available')} className="mr-2" />Доступен</label>
          <label className="ml-4"><input type="checkbox" {...register('hidden')} className="mr-2" />Скрыт</label>
        </div> */}

        <div className="mb-4">
          <Controller
            name="available"
            control={control}
            render={({ field }) => (
              <label>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mr-2"
                />
                Доступен
              </label>
            )}
          />

          <Controller
            name="hidden"
            control={control}
            render={({ field }) => (
              <label className="ml-4">
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mr-2"
                />
                Скрыт
              </label>
            )}
          />
        </div>

        {/* Теги и категории */}
        <div className="mb-2">
          <label>Теги (через запятую)</label>
          <input
            placeholder="tag1,tag2"
            {...register("tags", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : v,
            })}
            className="w-full rounded border p-1"
          />
        </div>

        <div className="mb-4">
          <label>Категории (через запятую)</label>
          <input
            placeholder="cat1,cat2"
            {...register("categories", {
              setValueAs: (v) =>
                typeof v === "string"
                  ? v
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : v,
            })}
            className="w-full rounded border p-1"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="rounded border px-4 py-2">
            Отмена
          </button>
          <button type="submit" className="rounded bg-green-600 px-4 py-2 text-white">
            {initialData ? "Сохранить" : "Создать"}
          </button>
        </div>
      </form>
    </>
  );
};

export default BouquetForm;
