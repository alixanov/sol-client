// shopData.js

// 🧺 Импорт картинок категорий
import categoryBakery from '../../assets/bakery.png';
import categoryDairy from '../../assets/dairy.png';
import categoryDrink from '../../assets/drink.png';
import categoryFruit from '../../assets/Fruits.png';
import categoryPantry from '../../assets/pantry.png';
import categoryPlants from '../../assets/plants-green.png';
import categorySeafood from '../../assets/seafood.png';
import categorySnacks from '../../assets/Snacks.png';
import categorySweets from '../../assets/sweets.png';
import categoryVegetables from '../../assets/vegetables.png';

// 🛍️ Импорт продуктов
import bread1 from '../../assets/bread-barkery-1.png';
import bread2 from '../../assets/bread-barkery-2.png';
import dairy1 from '../../assets/milk-dairy.png';
import dairy2 from '../../assets/drink.png';
import drinkenergy from '../../assets/energy-drink.png';
import fruitapple from '../../assets/apple-fruits.png';
import fruitcherry from '../../assets/cherries-fruits.png';
import ricepantry from '../../assets/rice-pantry.png';
import pantrysugar from '../../assets/sugar-pantry.png';
import vegetablesbroccoli from '../../assets/vegetables-broccoli.png';
import vegetablescabbage from '../../assets/vegetables-cabbage.png';
import seafoodfishpng from '../../assets/seafood-fish.png';
import seafoodfish2 from '../../assets/seafood-fish2.png';
import snackbar from '../../assets/snackbar.png';
import snackfast from '../../assets/snack-fast-food.png';
import sweetslice from '../../assets/sweet-slice.png';
import sweetpancake from '../../assets/sweet-pancake.png';
import plantssalad1 from '../../assets/salad-plants-green1.png';
import plantssalad2 from '../../assets/salad-plants-green2.png';

export const shopData = [
  {
    category: 'Bakery',
    image: categoryBakery,
    path: '/shop?category=bakery',
    products: [
      {
        id: 1,
        name: 'Baguette',
        image: bread1,
        usdPrice: 2.5,
        tooltip: 'Французское настроение!',
        description: 'Хрустящий багет, свежевыпеченный по классическому рецепту.',
        nutrition: { calories: 250, protein: '8g', carbs: '45g', fat: '3g' },
        availability: 'available',
        featured: 'Легенда французской пекарни!',
      },
      {
        id: 2,
        name: 'Whole Wheat Bread',
        image: bread2,
        usdPrice: 2.99,
        tooltip: 'Полезный завтрак — полезный день!',
        description: 'Цельнозерновой хлеб, богатый клетчаткой и витаминами.',
        nutrition: { calories: 220, protein: '7g', carbs: '40g', fat: '2g' },
        availability: 'low-stock',
        featured: 'Рекомендуем на завтрак!',
      },
    ],
  },
  {
    category: 'Dairy',
    image: categoryDairy,
    path: '/shop?category=dairy',
    products: [
      {
        id: 3,
        name: 'Milk',
        image: dairy1,
        usdPrice: 1.79,
        tooltip: 'Молоко, которое улыбается!',
        description: 'Натуральное коровье молоко, богато кальцием и витаминами.',
        nutrition: { calories: 150, protein: '9g', carbs: '12g', fat: '5g' },
        availability: 'available',
        featured: 'Хорошо сочетается с печеньем!',
      },
      {
        id: 4,
        name: 'Yogurt',
        image: dairy2,
        usdPrice: 1.29,
        tooltip: 'Йогурт с характером!',
        description: 'Кремовый йогурт с живыми культурами.',
        nutrition: { calories: 120, protein: '6g', carbs: '14g', fat: '3g' },
        availability: 'available',
        featured: 'Подходит для утреннего смузи!',
      },
    ],
  },
  {
    category: 'Drinks',
    image: categoryDrink,
    path: '/shop?category=drinks',
    products: [
      {
        id: 5,
        name: 'Energy Drink',
        image: drinkenergy,
        usdPrice: 2.99,
        tooltip: 'Энергия в каждой капле!',
        description: 'Газированный энергетик с кофеином и витаминами.',
        nutrition: { calories: 110, protein: '0g', carbs: '27g', fat: '0g' },
        availability: 'available',
        featured: 'Пей и побеждай!',
      },
    ],
  },
  {
    category: 'Fruits',
    image: categoryFruit,
    path: '/shop?category=fruits',
    products: [
      {
        id: 6,
        name: 'Apple',
        image: fruitapple,
        usdPrice: 0.99,
        tooltip: 'Сочный, как первый SOL!',
        description: 'Красные яблоки, свежие и сладкие.',
        nutrition: { calories: 95, protein: '0.5g', carbs: '25g', fat: '0.3g' },
        availability: 'available',
        featured: 'Один в день — и доктор не нужен!',
      },
      {
        id: 7,
        name: 'Cherries',
        image: fruitcherry,
        usdPrice: 3.49,
        tooltip: 'Летняя радость в коробке!',
        description: 'Свежие черешни, сладкие и сочные.',
        nutrition: { calories: 90, protein: '1g', carbs: '22g', fat: '0.3g' },
        availability: 'low-stock',
        featured: 'Только летом!',
      },
    ],
  },
  {
    category: 'Pantry',
    image: categoryPantry,
    path: '/shop?category=pantry',
    products: [
      {
        id: 8,
        name: 'Rice',
        image: ricepantry,
        usdPrice: 1.89,
        tooltip: 'Белое золото кухни!',
        description: 'Длиннозерный рис — основа любого блюда.',
        nutrition: { calories: 200, protein: '4g', carbs: '45g', fat: '0.4g' },
        availability: 'available',
        featured: 'На гарнир или плов!',
      },
      {
        id: 9,
        name: 'Sugar',
        image: pantrysugar,
        usdPrice: 1.39,
        tooltip: 'Сладкая жизнь в пакете!',
        description: 'Классический тростниковый сахар.',
        nutrition: { calories: 387, protein: '0g', carbs: '100g', fat: '0g' },
        availability: 'available',
        featured: 'Сладко жить не запретишь!',
      },
    ],
  },
  {
    category: 'Vegetables',
    image: categoryVegetables,
    path: '/shop?category=vegetables',
    products: [
      {
        id: 10,
        name: 'Broccoli',
        image: vegetablesbroccoli,
        usdPrice: 2.59,
        tooltip: 'Зелёная сила!',
        description: 'Органическая брокколи, насыщена витаминами C и K.',
        nutrition: { calories: 55, protein: '4g', carbs: '11g', fat: '0.5g' },
        availability: 'available',
        featured: 'Любимец фитнес-тренеров!',
      },
      {
        id: 11,
        name: 'Cabbage',
        image: vegetablescabbage,
        usdPrice: 1.79,
        tooltip: 'Хруст здоровья!',
        description: 'Сочная белокочанная капуста.',
        nutrition: { calories: 22, protein: '1g', carbs: '5g', fat: '0.1g' },
        availability: 'available',
        featured: 'Идеальна для борща!',
      },
    ],
  },
  {
    category: 'Seafood',
    image: categorySeafood,
    path: '/shop?category=seafood',
    products: [
      {
        id: 12,
        name: 'Salmon Fillet',
        image: seafoodfishpng,
        usdPrice: 5.99,
        tooltip: 'Море внутри!',
        description: 'Филе лосося — источник Омега-3.',
        nutrition: { calories: 210, protein: '22g', carbs: '0g', fat: '13g' },
        availability: 'available',
        featured: 'Шеф рекомендует!',
      },
      {
        id: 13,
        name: 'Tuna Slice',
        image: seafoodfish2,
        usdPrice: 4.99,
        tooltip: 'Свежесть океана!',
        description: 'Ломтики тунца, охлажденные.',
        nutrition: { calories: 179, protein: '23g', carbs: '0g', fat: '8g' },
        availability: 'low-stock',
        featured: 'Море рядом!',
      },
    ],
  },
  {
    category: 'Snacks',
    image: categorySnacks,
    path: '/shop?category=snacks',
    products: [
      {
        id: 14,
        name: 'Snack Bar',
        image: snackbar,
        usdPrice: 1.29,
        tooltip: 'Быстро и вкусно!',
        description: 'Полезный перекус с орехами и мёдом.',
        nutrition: { calories: 180, protein: '6g', carbs: '18g', fat: '8g' },
        availability: 'available',
        featured: 'С собой в дорогу!',
      },
      {
        id: 15,
        name: 'Fast Food Snack',
        image: snackfast,
        usdPrice: 2.49,
        tooltip: 'Греховно, но вкусно!',
        description: 'Закуска в стиле street food.',
        nutrition: { calories: 300, protein: '7g', carbs: '25g', fat: '17g' },
        availability: 'available',
        featured: 'Иногда можно!',
      },
    ],
  },
  {
    category: 'Sweets',
    image: categorySweets,
    path: '/shop?category=sweets',
    products: [
      {
        id: 16,
        name: 'Cake Slice',
        image: sweetslice,
        usdPrice: 3.79,
        tooltip: 'Сладость дня!',
        description: 'Воздушный кусочек торта со сливками.',
        nutrition: { calories: 340, protein: '4g', carbs: '40g', fat: '20g' },
        availability: 'available',
        featured: 'Праздник каждый день!',
      },
      {
        id: 17,
        name: 'Pancakes',
        image: sweetpancake,
        usdPrice: 2.99,
        tooltip: 'Пушистый рай!',
        description: 'Пышные блины на молоке с маслом.',
        nutrition: { calories: 250, protein: '6g', carbs: '30g', fat: '12g' },
        availability: 'available',
        featured: 'Идеальны с мёдом!',
      },
    ],
  },
  {
    category: 'Plants',
    image: categoryPlants,
    path: '/shop?category=plants',
    products: [
      {
        id: 18,
        name: 'Green Salad 1',
        image: plantssalad1,
        usdPrice: 1.99,
        tooltip: 'Свежесть зелени!',
        description: 'Микс салатных листьев с мягким вкусом.',
        nutrition: { calories: 20, protein: '2g', carbs: '3g', fat: '0g' },
        availability: 'available',
        featured: 'Основа любого боул-салата!',
      },
      {
        id: 19,
        name: 'Green Salad 2',
        image: plantssalad2,
        usdPrice: 2.29,
        tooltip: 'Салат для чемпионов!',
        description: 'Зелень с хрустом и ярким вкусом.',
        nutrition: { calories: 18, protein: '1.5g', carbs: '2g', fat: '0g' },
        availability: 'available',
        featured: 'Съешь меня первым!',
      },
    ],
  },
];
