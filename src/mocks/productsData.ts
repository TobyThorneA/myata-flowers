export interface Bouquet {
  _id: string;
  name: string;
  price: number;
  oldprice: number;
  images: string[];
  size: string;
  description?: string;
  __v: number;
}

// export const bouquets: Bouquet[] = [
//   {
//   "_id": "68434f2619266c11dd863eec",
//   "name": "Джульетта",
//   "price": 3000,
//   "oldprice": 4100,
//   "size": "25х50 см",
//   "description": " Этот букет пионовидных роз 🌸 — идеальное решение для тех, кто хочет подарить что-то необычное. Нежные лепестки роз так похожи на пионы, что легко спутать их с этим цветком. Они добавляют композиции элегантности и нежности, делая букет неотразимым. Эти цветы прекрасно подойдут для создания теплой и праздничной атмосферы, будь то день рождения, свидание или просто знак внимания. Порадуйте близких букетом, который выделяется своей утонченностью и природной красотой! 🌿",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/джульетта/1.13.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/джульетта/1.13.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/джульетта/1.13.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/джульетта/1.13.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/джульетта/1.13.5.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/джульетта/1.13.6.webp"
//   ],
//   "__v": 4
// },
// {
//   "_id": "68434f2619266c11dd863eed",
//   "name": "Ромашки",
//   "price": 3300,
//   "oldprice": 4000,
//   "size": "45х70 см",
//   "description": "Ищете универсальный, стильный и свежий букет? Ромашковые хризантемы - сочетание легкости, естественной красоты и стойкости. Порадуйте своих близких очаровательным букетом, ведь ромашки - это символ чистоты, радости и теплых эмоций🌿💛",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ромашки/2.4.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ромашки/2.4.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ромашки/2.4.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ромашки/2.4.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "6847299c033f41de0158efcb",
//   "name": "Пионы",
//   "price": 3600,
//   "oldprice": 4900,
//   "size": "30х50 см",
//   "description": "🌸 Букет нежно-розовых пионов — воплощение утончённой красоты и нежности! Эти цветы словно созданы для того, чтобы подарить улыбку и тепло 💖. Нежные лепестки наших пионов напоминают о весне и радуют свежестью в каждом лепестке. 🌷 Для любимых и особенных моментов 🌷 Идеальный выбор для поздравления или романтического жеста! Каждый букет — это гармония естественной красоты и изысканного стиля ✨. Подходит как для торжеств, так и для тёплых, душевных встреч 💐. 📦 Доставка свежих цветов в любое удобное для вас место! 🔹 Купить букет пионов легко! Просто напишите или позвоните нам! Свежие пионы разных оттенков. Букет, который не оставит равнодушным.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/пионы/3.1.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/пионы/3.1.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/пионы/3.1.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/пионы/3.1.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/пионы/3.1.5.webp"
//   ],
//   "__v": 4
// },
// {
//   "_id": "684729b7033f41de0158efcd",
//   "name": "Облако хризантем",
//   "price": 3900,
//   "oldprice": 5200,
//   "size": "40х70 см",
//   "description": "Элегантный букет белых хризантем с доставкой по городу 🌸 Эти нежные цветы прекрасно подойдут для любого случая — от спокойного комплимента до торжественного события 🌿 Свежесть и красота белых хризантем добавят утонченности и гармонии вашему дню 🌼 Пишите или звоните для заказа!",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/облако-хризантем/2.6.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/облако-хризантем/2.6.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/облако-хризантем/2.6.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/облако-хризантем/2.6.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "684729bc033f41de0158efce",
//   "name": "Вечерний сад",
//   "price": 6900,
//   "oldprice": 8700,
//   "size": "50×50 см",
//   "description": "Пышное сочетание текстур и оттенков, где каждый элемент будто дышит. Воздушность, объем и природная гармония - как если бы летний вечер в цветущем саду застыл в ваших руках. Обрамленный дикой зеленью он заучит как свежая мелодия в дуэте роскоши и легкости💞",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вечерний-сад/6.6.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вечерний-сад/6.6.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вечерний-сад/6.6.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вечерний-сад/6.6.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "684729bf033f41de0158efcf",
//   "name": "Кружевной бал",
//   "price": 3900,
//   "oldprice": 4800,
//   "size": "35×50 см",
//   "description": "Эти изящные белые розы с легкими, ажурными лепестками создают ощущение утонченности и нежности 🌸 Их красота покоряет с первого взгляда, добавляя нотку элегантности в любой интерьер и становясь символом чистоты и искренности. Этот букет станет отличным выбором для подарка, который говорит без слов 💐 Пишите или звоните с удовольствием соберем такой букет для Вас!",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/кружевной-бал/1.15.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/кружевной-бал/1.15.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/кружевной-бал/1.15.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/кружевной-бал/1.15.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68483b6f033f41de0158efdf",
//   "name": "Нега",
//   "price": 4500,
//   "oldprice": 5400,
//   "size": "40х50 см",
//   "description": "Бархатная нежность в каждом бутоне. Пышные, как летние облака, и тёплые, как утреннее солнце.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нега/1.1.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нега/1.1.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нега/1.1.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нега/1.1.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нега/1.1.5.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нега/1.1.6.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68483dbb033f41de0158efe0",
//   "name": "Лесная нимфа",
//   "price": 3900,
//   "oldprice": 4600,
//   "size": "40х50 см",
//   "description": "Утончённая классика в обрамлении сочной зелени. Белоснежные бутоны, словно кружево, переплетаются с диким папоротником, создавая элегантную гармонию.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/лесная-нимфа/1.2.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/лесная-нимфа/1.2.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/лесная-нимфа/1.2.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/лесная-нимфа/1.2.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68483e6e033f41de0158efe1",
//   "name": "Ажур",
//   "price": 3900,
//   "oldprice": 4600,
//   "size": "40х50 см",
//   "description": "Будто соткан из утреннего света и шёпота эквадорских ветров. Каждая роза с ажурными лепестками — как отдельное произведение искусства, вместе создающее эффект роскоши.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ажур/1.3.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ажур/1.3.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ажур/1.3.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ажур/1.3.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ажур/1.3.5 обрезать.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68483ec7033f41de0158efe2",
//   "name": "Вечная классика",
//   "price": 4800,
//   "oldprice": 5700,
//   "size": "45х60 см",
//   "description": "Ажурные алые и белые розы - контраст страсти и чистоты, где каждый лепесток играет на фоне благородной глубины. Как чёрно-белое кино с алыми акцентами — вне времени, вне конкуренции.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вечная-классика/1.5.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вечная-классика/1.5.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вечная-классика/1.5.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вечная-классика/1.5.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68483fb6033f41de0158efe3",
//   "name": "Облако роз",
//   "price": 3300,
//   "oldprice": 3800,
//   "size": "30х50 см",
//   "description": " Бархатная нежность в каждом бутоне. Пышные, как летние облака, и тёплые, как утреннее солнце.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/облако-роз/1.6.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/облако-роз/1.6.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/облако-роз/1.6.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/облако-роз/1.6.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484009033f41de0158efe4",
//   "name": "Таинственный лес",
//   "price": 3700,
//   "oldprice": 4500,
//   "size": "35х50 см",
//   "description": "Пушистые бутоны роз, словно таинственные огоньки в глубокой зелени листьев папоротника. Их природная фактура создает ощущение загадочной лесной сказки.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/таинственный-лес/1.7.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/таинственный-лес/1.7.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/таинственный-лес/1.7.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/таинственный-лес/1.7.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/таинственный-лес/1.7.5.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "684841c4033f41de0158efe5",
//   "name": "Алый бархат",
//   "price": 2500,
//   "oldprice": 3100,
//   "size": "30х50 см",
//   "description": "пышные пионовидные розы с ажурными лепестками. Их глубина и благородное сияние превращают каждый бутон в маленькое произведение искусства. Бархатистые переливы, игра света на изгибах лепестков – этот букет создан для тех, кто ценит роскошь и страсть.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/алый-бархат/1.8.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/алый-бархат/1.8.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/алый-бархат/1.8.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/алый-бархат/1.8.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/алый-бархат/1.8.5.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "6848420e033f41de0158efe6",
//   "name": "Речная нимфа",
//   "price": 3900,
//   "oldprice": 4300,
//   "size": "40х50 см",
//   "description": "Объёмные, почти фарфоровые бутоны с витиеватыми краями — этот букет хочется не только рассматривать, но и бережно касаться. Гипнотическая красота.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/речная-нимфа/1.9.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/речная-нимфа/1.9.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/речная-нимфа/1.9.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/речная-нимфа/1.9.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484248033f41de0158efe7",
//   "name": "Шарм",
//   "price": 2500,
//   "oldprice": 2900,
//   "size": "30х50 см",
//   "description": "Бархатистая роскошь роз и графичная зелень пальмы – дуэт, в котором нежность встречается с диким шармом.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/шарм/1.10.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/шарм/1.10.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/шарм/1.10.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/шарм/1.10.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484288033f41de0158efe8",
//   "name": "Вспышка чувств",
//   "price": 6100,
//   "oldprice": 7800,
//   "size": "40х50 см",
//   "description": "Пионовидные кустовые розы - пышные, как летние облака, и теплые, как утреннее солнце. Идеальный выбор для тех, кто ценит изящество с нотками романтичности. Роскошный микс для особенных случаев.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вспышка-чувств/1.14.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вспышка-чувств/1.14.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вспышка-чувств/1.14.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/вспышка-чувств/1.14.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "684842d8033f41de0158efe9",
//   "name": "Ажурные розы",
//   "price": 3900,
//   "oldprice": 4600,
//   "size": "40х50 см",
//   "description": "Как если бы архитектор барокко задумал цветок — витиевато, изысканно, с намёком на божественное совершенство. Эти розы слишком идеальные, чтобы быть настоящими, и всё же они у вас в руках. Букет для тех, кто верит в магию деталей.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ажурные-розы/1.11.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ажурные-розы/1.11.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ажурные-розы/1.11.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/ажурные-розы/1.11.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "684843b2033f41de0158efea",
//   "name": "Мистик",
//   "price": 4700,
//   "oldprice": 5500,
//   "size": "35х50 см",
//   "description": "От пудрового до сочного фламинго – монохромная гамма, где главное – игра фактур и простота форм. Утонченность в каждом лепестке.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/мистик/1.12.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/мистик/1.12.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/мистик/1.12.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/мистик/1.12.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/мистик/1.12.5.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/мистик/1.12.6.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484409033f41de0158efeb",
//   "name": "Сиреневый закат",
//   "price": 4600,
//   "oldprice": 5500,
//   "size": "40х70 см",
//   "description": "Чистота линий, пышность форм – этот букет говорит на языке элегантной простоты, а сами цветы создают атмосферу спокойствия и безмятежности.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/сиреневый-закат/2.1.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/сиреневый-закат/2.1.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/сиреневый-закат/2.1.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/сиреневый-закат/2.1.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/сиреневый-закат/2.1.5.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484451033f41de0158efec",
//   "name": "Синий гигант",
//   "price": 5500,
//   "oldprice": 6700,
//   "size": " 60х100 см",
//   "description": "Будто целое поле ромашек и воздушной гипсофилы поместили в одну охапку. Сочность, свежесть и нежность — этот букет пахнет свободой и бесконечным июньским днём.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/синий-гигант/2.2.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/синий-гигант/2.2.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/синий-гигант/2.2.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/синий-гигант/2.2.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "6848448e033f41de0158efed",
//   "name": "Розовый гигант",
//   "price": 5500,
//   "oldprice": 6700,
//   "size": " 60х100 см",
//   "description": "Будто целое поле ромашек и воздушной гипсофилы поместили в одну охапку. Сочность, свежесть и нежность — этот букет пахнет свободой и бесконечным июньским днём.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/розовый-гигант/2.3.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/розовый-гигант/2.3.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/розовый-гигант/2.3.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/розовый-гигант/2.3.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484510033f41de0158efee",
//   "name": "Шепот",
//   "price": 2200,
//   "oldprice": 2700,
//   "size": " 30x50 см",
//   "description": "Ромашки — как весёлые барашки в облаках гипсофилы. Объёмный, лёгкий, с характером — букет для тех, кто любит, чтобы цветы `звучали` громко и радостно.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/шепот/2.5.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/шепот/2.5.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/шепот/2.5.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/шепот/2.5.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "6848455d033f41de0158efef",
//   "name": "Клубничное мороженое",
//   "price": 3300,
//   "oldprice": 4000,
//   "size": " 35x50 см",
//   "description": "Этот букет — как десертное ассорти: сочные оттенки и воздушная текстура пионов.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/клубничное-мороженое/3.2.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/клубничное-мороженое/3.2.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/клубничное-мороженое/3.2.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/клубничное-мороженое/3.2.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/клубничное-мороженое/3.2.5.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "684845ac033f41de0158eff0",
//   "name": "Розовый сон",
//   "price": 6400,
//   "oldprice": 8000,
//   "size": " 40х50 см",
//   "description": "Будто акварельный букет: нежные переходы оттенков, объёмные бутоны и лёгкая небрежность садового цветника. Каждый стебель — новый оттенок настроения.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/розовый-сон/3.3.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/розовый-сон/3.3.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/розовый-сон/3.3.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/розовый-сон/3.3.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "6848479b033f41de0158eff1",
//   "name": "Нежность",
//   "price": 4000,
//   "oldprice": 4800,
//   "size": " 30х50 см",
//   "description": "Пушистые пионы тонут в кружевной дымке гипсофилы, создавая ощущение воздушного цветочного бриза. Каждый лепесток будто подсвечен изнутри теплым летним светом. Как объятие в цветочном исполнении – мягкое, тёплое и бесконечно нежное.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нежность/3.4.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нежность/3.4.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нежность/3.4.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нежность/3.4.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/нежность/3.4.5.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "6848486c033f41de0158eff2",
//   "name": "Улица роз",
//   "price": 1900,
//   "oldprice": 2200,
//   "size": " 23х25 см",
//   "description": "Готовый сюрприз — пионовидные кустовые розы в коробке уже собраны для тех, кто ценит безупречный вкус. Добавьте открытку — и идеальный презент готов!",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/улица-роз/4.1.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/улица-роз/4.1.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/улица-роз/4.1.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/улица-роз/4.1.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484932033f41de0158eff4",
//   "name": "Белое кружево",
//   "price": 2900,
//   "oldprice": 3300,
//   "size": " 35х35 см",
//   "description": "Лёгкость фарфора и шарм эвкалипта. Идеальное сочетание минимализма и элегантности.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/белое-кружево/4.2.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/белое-кружево/4.2.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/белое-кружево/4.2.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/белое-кружево/4.2.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484997033f41de0158eff5",
//   "name": "Лукошко ромашек",
//   "price": 1400,
//   "oldprice": 1600,
//   "size": " 23х23 см",
//   "description": "Словно первые лучи солнца, пробивающиеся сквозь туман – нежные оттенки и лёгкий, едва уловимый аромат.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/лукошко-ромашек/4.3.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/лукошко-ромашек/4.3.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/лукошко-ромашек/4.3.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/лукошко-ромашек/4.3.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id":"684849e7033f41de0158eff6",
//   "name": "Акварель",
//   "price": 2300,
//   "oldprice": 2700,
//   "size": " 30х30 см",
//   "description": "Нежные соцветия гипсофилы в пастельных тонах, будто акварельные брызги. Идеальный вариант для тех, кто любит воздушную легкость с нотками романтики. Как лёгкий вздох, застывший в цвете",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/акварель/4.4.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/акварель/4.4.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/акварель/4.4.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/акварель/4.4.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484a32033f41de0158eff7",
//   "name": "Белоснежка",
//   "price": 3400,
//   "oldprice": 4400,
//   "size": " 40х70 см",
//   "description": "Утончённые и стойкие – эти цветы сохранят кристальную чистоту оттенка и лёгкость форм даже спустя дни. Природная элегантность без лишних слов.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/белоснежка/5.1.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/белоснежка/5.1.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/белоснежка/5.1.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/белоснежка/5.1.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/белоснежка/5.1.5.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484a8f033f41de0158eff8",
//   "name": "Сиреневый туман",
//   "price": 3000,
//   "oldprice": 3800,
//   "size": " 35х50 см",
//   "description": " Миниатюрный сад из цветной гипсофилы – хрупкий, но удивительно стойкий. Добавит нежности любому интерьеру или станет трогательным дополнением к подарку.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/сиреневый-туман/5.2.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/сиреневый-туман/5.2.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/сиреневый-туман/5.2.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/сиреневый-туман/5.2.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484b1f033f41de0158eff9",
//   "name": "Букет маме",
//   "price": 2900,
//   "oldprice": 3600,
//   "size": " 40х50 см",
//   "description": "Бархатные бутоны, звёздчатые всплески и кружевные акценты — этот букет играет на контрастах. Обрамлённый дикой зеленью, он звучит как свежая мелодия в дуэте роскоши и лёгкости.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/букет-маме/6.1.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/букет-маме/6.1.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/букет-маме/6.1.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/букет-маме/6.1.4.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484b66033f41de0158effa",
//   "name": "Бархат",
//   "price": 5300,
//   "oldprice": 6500,
//   "size": " 40х50 см",
//   "description": "Роскошный букет для особого случая. Шёлковистые лепестки, тёплый медовый аромат – этот букет не просто дарит красоту, а создаёт атмосферу. Природная магия в каждом изгибе.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/бархат/6.2.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/бархат/6.2.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/бархат/6.2.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/бархат/6.2.4 обрезать.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/бархат/6.2.5.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484bb3033f41de0158effb",
//   "name": "Утренняя мелодия",
//   "price": 2500,
//   "oldprice": 3200,
//   "size": " 25х50 см",
//   "description": "Композиция, где хрупкость — лишь видимость: эти стойкие оттенки будут звучать свежо день за днём. Зелёная оправа добавляет природной гармонии.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/утренняя-мелодия/6.3.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/утренняя-мелодия/6.3.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/утренняя-мелодия/6.3.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/утренняя-мелодия/6.3.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/утренняя-мелодия/6.3.5.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484bf8033f41de0158effc",
//   "name": "Рассвет",
//   "price": 3100,
//   "oldprice": 3900,
//   "size": " 30х50 см",
//   "description": "Невесомые кружевные формы переплетаются с нежными акварельными мазками, обрамлённые свежей зеленью. Лёгкий, как вздох, но запоминающийся, как первая строчка любимого стихотворения.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/рассвет/6.4.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/рассвет/6.4.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/рассвет/6.4.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/рассвет/6.4.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/рассвет/6.4.5.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/рассвет/6.4.6.webp"
//   ],
//   "__v": 3
// },
// {
//   "_id": "68484c51033f41de0158effd",
//   "name": "Два сердца",
//   "price": 4200,
//   "oldprice": 5300,
//   "size": " 35х60 см",
//   "description": "Алые розы, горящие как страсть, в сочетании с облаком белой гортензии. Контраст энергичного и нежного создает гармонию вне времени.",
//   "images": [
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/6.5.1.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/6.5.2.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/6.5.3.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/6.5.4.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/photo_5339132184654638635_y.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/photo_5339132184654638638_y.webp",
//     "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/photo_5339132184654638639_y (1).webp"
//   ],
//   "__v": 3
// }
// ];


export const freeDeliveryPromoBouquets = [
  {
  "_id": "68484c51033f41de0158effd",
  "name": "Два сердца",
  "price": 4200,
  "oldprice": 5300,
  "size": " 40х60 см",
  "description": "Алые розы, горящие как страсть, в сочетании с облаком белой гортензии. Контраст энергичного и нежного создает гармонию вне времени.",
  "images": [
    "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/6.5.1.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/6.5.2.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/6.5.3.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/6.5.4.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/photo_5339132184654638635_y.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/photo_5339132184654638638_y.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/два-сердца/photo_5339132184654638639_y (1).webp"
  ],
  "__v": 3
  },
  {
  "_id": "68484bb3033f41de0158effb",
  "name": "Мелодия",
  "price": 5500,
  "oldprice": 6900,
  "size": " 45х50 см",
  "description": "Белые кустовые розы, сплетенные в нежную симфонию. Каждый бутон - как тихая нота чистоты, а весь букет - гармоничный аккорд свежести и роскоши.",
  "images": [
    "https://storage.yandexcloud.net/myata-bouquets/catalog/%D0%9C%D0%B5%D0%BB%D0%BE%D0%B4%D0%B8%D1%8F/photo_2025-06-15_16-02-30.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/%D0%9C%D0%B5%D0%BB%D0%BE%D0%B4%D0%B8%D1%8F/photo_2025-06-15_16-02-43.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/%D0%9C%D0%B5%D0%BB%D0%BE%D0%B4%D0%B8%D1%8F/photo_2025-06-15_16-02-48.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/%D0%9C%D0%B5%D0%BB%D0%BE%D0%B4%D0%B8%D1%8F/photo_2025-06-15_16-02-52.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/%D0%9C%D0%B5%D0%BB%D0%BE%D0%B4%D0%B8%D1%8F/photo_2025-06-15_16-02-56.webp"
  ],
  "__v": 3
},
{
  "_id": "684729bc033f41de0158efce",
  "name": "Вечерний сад",
  "price": 6900,
  "oldprice": 8700,
  "size": "50×50 см",
  "description": "Пышное сочетание текстур и оттенков, где каждый элемент будто дышит. Воздушность, объем и природная гармония - как если бы летний вечер в цветущем саду застыл в ваших руках. Обрамленный дикой зеленью он заучит как свежая мелодия в дуэте роскоши и легкости💞",
  "images": [
    "https://storage.yandexcloud.net/myata-bouquets/catalog/вечерний-сад/6.6.1.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/вечерний-сад/6.6.2.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/вечерний-сад/6.6.3.webp",
    "https://storage.yandexcloud.net/myata-bouquets/catalog/вечерний-сад/6.6.4.webp"
  ],
  "__v": 3
},
];
