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
      { id: 1, name: 'Baguette', image: bread1, usdPrice: 2.5, tooltip: 'Французское настроение!' },
      { id: 2, name: 'Whole Wheat Bread', image: bread2, usdPrice: 2.99, tooltip: 'Полезный завтрак — полезный день!' },
    ],
  },
  {
    category: 'Dairy',
    image: categoryDairy,
    path: '/shop?category=dairy',
    products: [
      { id: 3, name: 'Milk', image: dairy1, usdPrice: 1.79, tooltip: 'Молоко, которое улыбается!' },
      { id: 4, name: 'Yogurt', image: dairy2, usdPrice: 1.29, tooltip: 'Йогурт с характером!' },
    ],
  },
  {
    category: 'Drinks',
    image: categoryDrink,
    path: '/shop?category=drinks',
    products: [
      { id: 5, name: 'Energy Drink', image: drinkenergy, usdPrice: 2.99, tooltip: 'Энергия в каждой капле!' },
    ],
  },
  {
    category: 'Fruits',
    image: categoryFruit,
    path: '/shop?category=fruits',
    products: [
      { id: 6, name: 'Apple', image: fruitapple, usdPrice: 0.99, tooltip: 'Сочный, как первый SOL!' },
      { id: 7, name: 'Cherries', image: fruitcherry, usdPrice: 3.49, tooltip: 'Летняя радость в коробке!' },
    ],
  },
  {
    category: 'Pantry',
    image: categoryPantry,
    path: '/shop?category=pantry',
    products: [
      { id: 8, name: 'Rice', image: ricepantry, usdPrice: 1.89, tooltip: 'Белое золото кухни!' },
      { id: 9, name: 'Sugar', image: pantrysugar, usdPrice: 1.39, tooltip: 'Сладкая жизнь в пакете!' },
    ],
  },
  {
    category: 'Vegetables',
    image: categoryVegetables,
    path: '/shop?category=vegetables',
    products: [
      { id: 10, name: 'Broccoli', image: vegetablesbroccoli, usdPrice: 2.59, tooltip: 'Зелёная сила!' },
      { id: 11, name: 'Cabbage', image: vegetablescabbage, usdPrice: 1.79, tooltip: 'Хруст здоровья!' },
    ],
  },
  {
    category: 'Seafood',
    image: categorySeafood,
    path: '/shop?category=seafood',
    products: [
      { id: 12, name: 'Salmon Fillet', image: seafoodfishpng, usdPrice: 5.99, tooltip: 'Море внутри!' },
      { id: 13, name: 'Tuna Slice', image: seafoodfish2, usdPrice: 4.99, tooltip: 'Свежесть океана!' },
    ],
  },
  {
    category: 'Snacks',
    image: categorySnacks,
    path: '/shop?category=snacks',
    products: [
      { id: 14, name: 'Snack Bar', image: snackbar, usdPrice: 1.29, tooltip: 'Быстро и вкусно!' },
      { id: 15, name: 'Fast Food Snack', image: snackfast, usdPrice: 2.49, tooltip: 'Греховно, но вкусно!' },
    ],
  },
  {
    category: 'Sweets',
    image: categorySweets,
    path: '/shop?category=sweets',
    products: [
      { id: 16, name: 'Cake Slice', image: sweetslice, usdPrice: 3.79, tooltip: 'Сладость дня!' },
      { id: 17, name: 'Pancakes', image: sweetpancake, usdPrice: 2.99, tooltip: 'Пушистый рай!' },
    ],
  },
  {
    category: 'Plants',
    image: categoryPlants,
    path: '/shop?category=plants',
    products: [
      { id: 18, name: 'Green Salad 1', image: plantssalad1, usdPrice: 1.99, tooltip: 'Свежесть зелени!' },
      { id: 19, name: 'Green Salad 2', image: plantssalad2, usdPrice: 2.29, tooltip: 'Салат для чемпионов!' },
    ],
  },
];
