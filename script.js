/* ===== Tiffin Box – Food Delivery App (Vanilla JS + localStorage) ===== */
'use strict';

/* ---------- 1. Translations (UI text; dish names stay in English) ---------- */
const I18N = {
  en: {
    heroTitle: 'Garam khana, seedha aapke darwaze par.', heroSub: 'Pick from 50 dishes, choose your delivery speed and track every order live.',
    searchPh: 'Search dishes…', pureVeg: 'Pure Veg', sortDefault: 'Sort: Relevance', sortRating: 'Top rated', sortLow: 'Price: Low to High', sortHigh: 'Price: High to Low',
    anyPrice: 'Any price', under150: 'Under ₹150', under250: 'Under ₹250', under350: 'Under ₹350',
    cart: 'Cart', myOrders: 'My orders', admin: 'Admin', on: 'On', off: 'Off',
    addDish: 'Add a new dish', dishName: 'Dish name', price: 'Price (₹)', imageUrl: 'Image URL (optional)', shortDesc: 'Short description', vegetarian: 'Vegetarian', addToMenu: 'Add to menu',
    yourCart: 'Your cart', emptyCart: 'Your cart is empty. Add something tasty from the menu.', add: 'Add', remove: 'Remove', removeDish: 'Remove dish',
    couponPh: 'Promo code', apply: 'Apply', couponApplied: 'Coupon applied!', couponMin: 'Add more items to use this coupon (min ₹{min}).', couponBad: 'Invalid coupon code.', couponHint: 'Try FIRST50, SAVE10 or FREEDEL',
    itemTotal: 'Item total', discount: 'Discount', deliveryFee: 'Delivery fee', free: 'FREE', taxes: 'Taxes (5%)', total: 'Total',
    checkout: 'Checkout', proceed: 'Proceed to checkout', contact: 'Contact details', fullName: 'Full name', mobile: 'Mobile number',
    deliverTo: 'Delivery details', newAddress: 'Add a new address', label: 'Save as', lbl_home: 'Home', lbl_work: 'Work', lbl_other: 'Other', address: 'Full address', pincode: 'PIN code',
    instructions: 'Delivery instructions', notesPh: 'e.g. Ring the bell twice', note1: 'Leave at the door', note2: "Don't ring the bell", note3: 'Call on arrival',
    speed: 'Delivery speed', standard: 'Standard', express: 'Express',
    payment: 'Payment method', upi: 'UPI', card: 'Credit / Debit Card', netbanking: 'Net Banking', wallet: 'Wallets', cod: 'Cash on Delivery',
    upiId: 'UPI ID', cardNumber: 'Card number', cardName: 'Name on card', expiry: 'Expiry (MM/YY)', cvv: 'CVV', selectBank: 'Select bank',
    codNote: 'Pay in cash when your order arrives. Please keep exact change handy.', secure: '🔒 Card details are never stored.',
    billSummary: 'Bill summary', placeOrder: 'Place order', orderConfirmed: 'Order confirmed', trackOrder: 'Track this order',
    noOrders: 'No orders yet. Your placed orders will appear here.', arrivesBy: 'Arriving by', thanks: 'Thanks',
    st_confirmed: 'Confirmed', st_preparing: 'Preparing', st_out: 'Out for delivery', st_delivered: 'Delivered',
    noMatch: 'No dishes match. Try another search or category.', viewCart: 'View cart', items: 'items',
    cat_All: 'All', cat_Biryani: 'Biryani', cat_Starters: 'Starters', 'cat_Main Course': 'Main Course', cat_Burgers: 'Burgers', cat_Pizza: 'Pizza', cat_Drinks: 'Drinks', cat_Desserts: 'Desserts',
    errName: 'Enter your full name (letters only).', errPhone: 'Enter a 10-digit mobile number starting with 6–9.', errAddrPick: 'Choose or add a delivery address.',
    errLine: 'Enter a full address (at least 10 characters).', errPin: 'Enter a 6-digit PIN code.', errPay: 'Choose a payment method.', errUpiApp: 'Choose a UPI app.',
    errUpi: 'Enter a valid UPI ID, e.g. name@okicici.', errCard: 'Enter a 16-digit card number.', errCardName: 'Enter the name on the card.',
    errExpiry: 'Enter a valid, unexpired date (MM/YY).', errCvv: 'Enter the 3-digit CVV.', errBank: 'Select your bank.', errWallet: 'Choose a wallet.', errDish: 'Enter a dish name and a price above 0.'
  },
  hi: {
    heroTitle: 'गरम खाना, सीधे आपके दरवाज़े पर।', heroSub: '50 व्यंजनों में से चुनिए, डिलीवरी की गति तय कीजिए और हर ऑर्डर लाइव ट्रैक कीजिए।',
    searchPh: 'व्यंजन खोजें…', pureVeg: 'शुद्ध शाकाहारी', sortDefault: 'क्रम: प्रासंगिक', sortRating: 'सर्वाधिक रेटिंग', sortLow: 'कीमत: कम से ज़्यादा', sortHigh: 'कीमत: ज़्यादा से कम',
    anyPrice: 'कोई भी कीमत', under150: '₹150 से कम', under250: '₹250 से कम', under350: '₹350 से कम',
    cart: 'कार्ट', myOrders: 'मेरे ऑर्डर', admin: 'एडमिन', on: 'चालू', off: 'बंद',
    addDish: 'नया व्यंजन जोड़ें', dishName: 'व्यंजन का नाम', price: 'कीमत (₹)', imageUrl: 'फ़ोटो का लिंक (वैकल्पिक)', shortDesc: 'संक्षिप्त विवरण', vegetarian: 'शाकाहारी', addToMenu: 'मेन्यू में जोड़ें',
    yourCart: 'आपका कार्ट', emptyCart: 'आपका कार्ट खाली है। मेन्यू से कुछ स्वादिष्ट जोड़ें।', add: 'जोड़ें', remove: 'हटाएँ', removeDish: 'व्यंजन हटाएँ',
    couponPh: 'प्रोमो कोड', apply: 'लगाएँ', couponApplied: 'कूपन लग गया!', couponMin: 'इस कूपन के लिए और आइटम जोड़ें (न्यूनतम ₹{min})।', couponBad: 'कूपन कोड मान्य नहीं है।', couponHint: 'FIRST50, SAVE10 या FREEDEL आज़माएँ',
    itemTotal: 'आइटम का कुल', discount: 'छूट', deliveryFee: 'डिलीवरी शुल्क', free: 'मुफ़्त', taxes: 'कर (5%)', total: 'कुल',
    checkout: 'चेकआउट', proceed: 'चेकआउट करें', contact: 'संपर्क विवरण', fullName: 'पूरा नाम', mobile: 'मोबाइल नंबर',
    deliverTo: 'डिलीवरी विवरण', newAddress: 'नया पता जोड़ें', label: 'इस नाम से सहेजें', lbl_home: 'घर', lbl_work: 'ऑफ़िस', lbl_other: 'अन्य', address: 'पूरा पता', pincode: 'पिन कोड',
    instructions: 'डिलीवरी निर्देश', notesPh: 'जैसे: दो बार घंटी बजाएँ', note1: 'दरवाज़े पर रख दें', note2: 'घंटी न बजाएँ', note3: 'पहुँचने पर कॉल करें',
    speed: 'डिलीवरी की गति', standard: 'स्टैंडर्ड', express: 'एक्सप्रेस',
    payment: 'भुगतान का तरीका', upi: 'यूपीआई', card: 'क्रेडिट / डेबिट कार्ड', netbanking: 'नेट बैंकिंग', wallet: 'वॉलेट', cod: 'डिलीवरी पर नकद',
    upiId: 'यूपीआई आईडी', cardNumber: 'कार्ड नंबर', cardName: 'कार्ड पर नाम', expiry: 'समाप्ति (MM/YY)', cvv: 'सीवीवी', selectBank: 'बैंक चुनें',
    codNote: 'ऑर्डर पहुँचने पर नकद भुगतान करें। कृपया खुले पैसे तैयार रखें।', secure: '🔒 कार्ड की जानकारी कभी सहेजी नहीं जाती।',
    billSummary: 'बिल का सार', placeOrder: 'ऑर्डर करें', orderConfirmed: 'ऑर्डर पक्का हुआ', trackOrder: 'ऑर्डर ट्रैक करें',
    noOrders: 'अभी कोई ऑर्डर नहीं। आपके ऑर्डर यहाँ दिखेंगे।', arrivesBy: 'पहुँचने का समय', thanks: 'धन्यवाद',
    st_confirmed: 'पक्का', st_preparing: 'तैयार हो रहा है', st_out: 'डिलीवरी के लिए निकला', st_delivered: 'पहुँच गया',
    noMatch: 'कोई व्यंजन नहीं मिला। दूसरी खोज या श्रेणी आज़माएँ।', viewCart: 'कार्ट देखें', items: 'आइटम',
    cat_All: 'सभी', cat_Biryani: 'बिरयानी', cat_Starters: 'स्टार्टर', 'cat_Main Course': 'मुख्य भोजन', cat_Burgers: 'बर्गर', cat_Pizza: 'पिज़्ज़ा', cat_Drinks: 'पेय', cat_Desserts: 'मिठाई',
    errName: 'अपना पूरा नाम लिखें (केवल अक्षर)।', errPhone: '6–9 से शुरू होने वाला 10 अंकों का मोबाइल नंबर लिखें।', errAddrPick: 'डिलीवरी का पता चुनें या जोड़ें।',
    errLine: 'पूरा पता लिखें (कम से कम 10 अक्षर)।', errPin: '6 अंकों का पिन कोड लिखें।', errPay: 'भुगतान का तरीका चुनें।', errUpiApp: 'यूपीआई ऐप चुनें।',
    errUpi: 'सही यूपीआई आईडी लिखें, जैसे name@okicici।', errCard: '16 अंकों का कार्ड नंबर लिखें।', errCardName: 'कार्ड पर छपा नाम लिखें।',
    errExpiry: 'सही और वैध तारीख लिखें (MM/YY)।', errCvv: '3 अंकों का सीवीवी लिखें।', errBank: 'अपना बैंक चुनें।', errWallet: 'वॉलेट चुनें।', errDish: 'व्यंजन का नाम और 0 से ज़्यादा कीमत लिखें।'
  },
  bn: {
    heroTitle: 'গরম খাবার, সোজা আপনার দরজায়।', heroSub: '৫০টি পদ থেকে বেছে নিন, ডেলিভারির গতি ঠিক করুন আর প্রতিটি অর্ডার লাইভ ট্র্যাক করুন।',
    searchPh: 'খাবার খুঁজুন…', pureVeg: 'নিরামিষ', sortDefault: 'সাজান: প্রাসঙ্গিক', sortRating: 'সেরা রেটিং', sortLow: 'দাম: কম থেকে বেশি', sortHigh: 'দাম: বেশি থেকে কম',
    anyPrice: 'যেকোনো দাম', under150: '₹১৫০-এর নিচে', under250: '₹২৫০-এর নিচে', under350: '₹৩৫০-এর নিচে',
    cart: 'কার্ট', myOrders: 'আমার অর্ডার', admin: 'অ্যাডমিন', on: 'চালু', off: 'বন্ধ',
    addDish: 'নতুন খাবার যোগ করুন', dishName: 'খাবারের নাম', price: 'দাম (₹)', imageUrl: 'ছবির লিংক (ঐচ্ছিক)', shortDesc: 'সংক্ষিপ্ত বিবরণ', vegetarian: 'নিরামিষ', addToMenu: 'মেনুতে যোগ করুন',
    yourCart: 'আপনার কার্ট', emptyCart: 'আপনার কার্ট খালি। মেনু থেকে কিছু সুস্বাদু যোগ করুন।', add: 'যোগ', remove: 'সরান', removeDish: 'খাবার সরান',
    couponPh: 'প্রোমো কোড', apply: 'প্রয়োগ', couponApplied: 'কুপন প্রয়োগ হয়েছে!', couponMin: 'এই কুপনের জন্য আরও আইটেম যোগ করুন (সর্বনিম্ন ₹{min})।', couponBad: 'কুপন কোডটি সঠিক নয়।', couponHint: 'FIRST50, SAVE10 বা FREEDEL চেষ্টা করুন',
    itemTotal: 'আইটেমের মোট', discount: 'ছাড়', deliveryFee: 'ডেলিভারি চার্জ', free: 'বিনামূল্যে', taxes: 'কর (5%)', total: 'সর্বমোট',
    checkout: 'চেকআউট', proceed: 'চেকআউটে যান', contact: 'যোগাযোগের তথ্য', fullName: 'পুরো নাম', mobile: 'মোবাইল নম্বর',
    deliverTo: 'ডেলিভারির তথ্য', newAddress: 'নতুন ঠিকানা যোগ করুন', label: 'এই নামে সেভ করুন', lbl_home: 'বাড়ি', lbl_work: 'অফিস', lbl_other: 'অন্যান্য', address: 'সম্পূর্ণ ঠিকানা', pincode: 'পিন কোড',
    instructions: 'ডেলিভারি নির্দেশনা', notesPh: 'যেমন: দুবার বেল বাজান', note1: 'দরজার কাছে রেখে যান', note2: 'বেল বাজাবেন না', note3: 'পৌঁছে ফোন করুন',
    speed: 'ডেলিভারির গতি', standard: 'স্ট্যান্ডার্ড', express: 'এক্সপ্রেস',
    payment: 'পেমেন্টের মাধ্যম', upi: 'ইউপিআই', card: 'ক্রেডিট / ডেবিট কার্ড', netbanking: 'নেট ব্যাংকিং', wallet: 'ওয়ালেট', cod: 'ডেলিভারিতে নগদ',
    upiId: 'ইউপিআই আইডি', cardNumber: 'কার্ড নম্বর', cardName: 'কার্ডে নাম', expiry: 'মেয়াদ (MM/YY)', cvv: 'সিভিভি', selectBank: 'ব্যাংক বেছে নিন',
    codNote: 'অর্ডার পৌঁছালে নগদে দাম দিন। অনুগ্রহ করে খুচরো টাকা হাতে রাখুন।', secure: '🔒 কার্ডের তথ্য কখনও সংরক্ষণ করা হয় না।',
    billSummary: 'বিলের সারাংশ', placeOrder: 'অর্ডার করুন', orderConfirmed: 'অর্ডার নিশ্চিত হয়েছে', trackOrder: 'অর্ডার ট্র্যাক করুন',
    noOrders: 'এখনও কোনো অর্ডার নেই। অর্ডার করলে এখানে দেখা যাবে।', arrivesBy: 'পৌঁছানোর সময়', thanks: 'ধন্যবাদ',
    st_confirmed: 'নিশ্চিত', st_preparing: 'তৈরি হচ্ছে', st_out: 'ডেলিভারির পথে', st_delivered: 'পৌঁছে গেছে',
    noMatch: 'কোনো খাবার মেলেনি। অন্য সার্চ বা বিভাগ চেষ্টা করুন।', viewCart: 'কার্ট দেখুন', items: 'আইটেম',
    cat_All: 'সব', cat_Biryani: 'বিরিয়ানি', cat_Starters: 'স্টার্টার', 'cat_Main Course': 'মূল পদ', cat_Burgers: 'বার্গার', cat_Pizza: 'পিৎজা', cat_Drinks: 'পানীয়', cat_Desserts: 'মিষ্টি',
    errName: 'আপনার পুরো নাম লিখুন (শুধু অক্ষর)।', errPhone: '৬–৯ দিয়ে শুরু ১০ সংখ্যার মোবাইল নম্বর লিখুন।', errAddrPick: 'ডেলিভারির ঠিকানা বেছে নিন বা যোগ করুন।',
    errLine: 'সম্পূর্ণ ঠিকানা লিখুন (কমপক্ষে ১০ অক্ষর)।', errPin: '৬ সংখ্যার পিন কোড লিখুন।', errPay: 'পেমেন্টের মাধ্যম বেছে নিন।', errUpiApp: 'একটি ইউপিআই অ্যাপ বেছে নিন।',
    errUpi: 'সঠিক ইউপিআই আইডি লিখুন, যেমন name@okicici।', errCard: '১৬ সংখ্যার কার্ড নম্বর লিখুন।', errCardName: 'কার্ডে ছাপা নাম লিখুন।',
    errExpiry: 'সঠিক ও বৈধ তারিখ লিখুন (MM/YY)।', errCvv: '৩ সংখ্যার সিভিভি লিখুন।', errBank: 'আপনার ব্যাংক বেছে নিন।', errWallet: 'একটি ওয়ালেট বেছে নিন।', errDish: 'খাবারের নাম ও ০-এর বেশি দাম লিখুন।'
  }
};

/* ---------- 2. Config & menu data ---------- */
const KEYS = { menu: 'fo_menu_v3', cart: 'fo_cart_v3', orders: 'fo_orders_v3', admin: 'fo_admin', veg: 'fo_vegOnly', lang: 'fo_lang', addr: 'fo_addresses', coupon: 'fo_coupon' };
const CATEGORIES = ['Biryani', 'Starters', 'Main Course', 'Burgers', 'Pizza', 'Drinks', 'Desserts'];
const CAT_ICON = { All: '🍽️', Biryani: '🍛', Starters: '🍢', 'Main Course': '🍲', Burgers: '🍔', Pizza: '🍕', Drinks: '🥤', Desserts: '🍮' };
const TAX_RATE = 0.05;
const SPEEDS = { standard: { fee: 40, mins: 35, step: 12000 }, express: { fee: 80, mins: 18, step: 8000 } }; // step = demo ms per status
const STATUSES = ['confirmed', 'preparing', 'out', 'delivered'];
const COUPONS = {
  FIRST50: { type: 'flat', value: 50, min: 199 },
  SAVE10: { type: 'pct', value: 10, max: 100, min: 300 },
  FREEDEL: { type: 'ship', min: 0 }
};

// Unsplash photo IDs per category (dishes in a category cycle through them). Broken links fall back to an emoji tile.
const IMG_POOL = {
  Biryani: ['1563379091339-03b21ab4f4f8', '1589302168068-964664d93dc0', '1631515243349-e0cb75fb8d3a'],
  Starters: ['1599487488170-d11ec9c172f0', '1555939594-58d7cb561ad1', '1601050690597-df0568f70950', '1567188040759-fb8a883dc6d8'],
  'Main Course': ['1565557623262-b51c2513a641', '1585937421612-70a008356fbe', '1631452180519-c014fe946bc7', '1596797038530-2c107229654b'],
  Burgers: ['1568901346375-23c9450c58cd', '1550547660-d9450f859349', '1571091718767-18b5b1457add'],
  Pizza: ['1513104890138-7c749659a591', '1565299624946-b28f40a0ae38', '1574071318508-1cdbab80d002'],
  Drinks: ['1544145945-f90425340c7e', '1461023058943-07fcbe16d735', '1556679343-c7306c1976bc'],
  Desserts: ['1551024601-bec78aea704b', '1578985545062-69928b1d9587', '1606313564200-e75d5e30476c']
};
const imgUrl = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=70`;

// [name, category, price, isVeg, rating, fallback emoji, description]
const RAW_MENU = [
  ['Hyderabadi Chicken Dum Biryani', 'Biryani', 299, 0, 4.6, '🍛', 'Basmati dum-cooked with spiced chicken'],
  ['Kolkata Mutton Biryani', 'Biryani', 379, 0, 4.7, '🍛', 'Fragrant rice, tender mutton and aloo'],
  ['Lucknowi Veg Biryani', 'Biryani', 219, 1, 4.3, '🍚', 'Mixed vegetables, saffron, fried onions'],
  ['Paneer Tikka Biryani', 'Biryani', 249, 1, 4.4, '🍚', 'Smoky paneer layered with masala rice'],
  ['Egg Biryani', 'Biryani', 199, 0, 4.2, '🥚', 'Boiled eggs in spicy masala rice'],
  ['Prawn Biryani', 'Biryani', 349, 0, 4.5, '🍤', 'Juicy prawns with coastal spices'],
  ['Chicken Tikka Biryani', 'Biryani', 319, 0, 4.5, '🍗', 'Tandoori chicken pieces over dum rice'],
  ['Mushroom Dum Biryani', 'Biryani', 229, 1, 4.1, '🍄', 'Button mushrooms, mint and saffron rice'],
  ['Paneer Tikka', 'Starters', 229, 1, 4.5, '🧀', 'Charred paneer cubes with mint chutney'],
  ['Chicken 65', 'Starters', 249, 0, 4.4, '🍗', 'Crispy, spicy South Indian fried chicken'],
  ['Veg Spring Rolls', 'Starters', 149, 1, 4.0, '🌯', 'Crunchy rolls with cabbage and carrot'],
  ['Hara Bhara Kebab', 'Starters', 179, 1, 4.2, '🥬', 'Spinach and green pea patties'],
  ['Tandoori Chicken (Half)', 'Starters', 289, 0, 4.6, '🍗', 'Yoghurt-marinated, clay-oven roasted'],
  ['Kolkata Fish Fry', 'Starters', 269, 0, 4.4, '🐟', 'Crumb-fried bhetki with kasundi'],
  ['Veg Samosa (2 pcs)', 'Starters', 59, 1, 4.3, '🥟', 'Crisp pastry with spiced potato'],
  ['Crispy Corn', 'Starters', 169, 1, 4.1, '🌽', 'Golden fried corn tossed with pepper'],
  ['Butter Chicken', 'Main Course', 329, 0, 4.7, '🍗', 'Tandoori chicken in creamy tomato gravy'],
  ['Dal Makhani', 'Main Course', 219, 1, 4.5, '🍲', 'Black lentils simmered overnight'],
  ['Palak Paneer', 'Main Course', 239, 1, 4.3, '🥘', 'Paneer in smooth spinach gravy'],
  ['Bengali Macher Jhol', 'Main Course', 349, 0, 4.4, '🐟', 'Light mustard fish curry with rice'],
  ['Butter Naan (2 pcs)', 'Main Course', 59, 1, 4.1, '🫓', 'Soft tandoor bread brushed with butter'],
  ['Kadhai Paneer', 'Main Course', 259, 1, 4.4, '🥘', 'Paneer with capsicum in kadhai masala'],
  ['Chicken Tikka Masala', 'Main Course', 339, 0, 4.6, '🍛', 'Grilled chicken in rich onion-tomato gravy'],
  ['Mutton Rogan Josh', 'Main Course', 399, 0, 4.6, '🍖', 'Kashmiri-style slow-cooked mutton curry'],
  ['Chole Bhature', 'Main Course', 149, 1, 4.5, '🫓', 'Spicy chickpeas with fluffy fried bread'],
  ['Jeera Rice', 'Main Course', 129, 1, 4.0, '🍚', 'Basmati tempered with cumin'],
  ['Aloo Tikki Burger', 'Burgers', 129, 1, 4.0, '🍔', 'Crispy potato patty, mint mayo'],
  ['Chicken Zinger Burger', 'Burgers', 189, 0, 4.4, '🍔', 'Spicy fried chicken, lettuce, cheese'],
  ['Paneer Tikka Burger', 'Burgers', 169, 1, 4.2, '🥪', 'Tandoori paneer, pickled onion'],
  ['Double Cheese Veg Burger', 'Burgers', 179, 1, 4.3, '🍔', 'Veg patty with two cheese slices'],
  ['Margherita Pizza', 'Pizza', 249, 1, 4.2, '🍕', 'Tomato, mozzarella, fresh basil'],
  ['Farmhouse Pizza', 'Pizza', 329, 1, 4.3, '🍕', 'Capsicum, mushroom, corn, olives'],
  ['Chicken Tikka Pizza', 'Pizza', 359, 0, 4.5, '🍕', 'Smoky chicken tikka with onion'],
  ['Paneer Makhani Pizza', 'Pizza', 339, 1, 4.4, '🍕', 'Paneer in makhani sauce with cheese'],
  ['Mango Lassi', 'Drinks', 89, 1, 4.5, '🥭', 'Thick chilled yoghurt and mango'],
  ['Cold Coffee', 'Drinks', 119, 1, 4.3, '🧋', 'Blended coffee with ice cream'],
  ['Fresh Lime Soda', 'Drinks', 69, 1, 4.0, '🍋', 'Sweet or salted, with mint'],
  ['Masala Chai', 'Drinks', 39, 1, 4.4, '☕', 'Ginger-cardamom tea in a kulhad'],
  ['Sweet Lassi', 'Drinks', 79, 1, 4.3, '🥛', 'Chilled sweet yoghurt drink'],
  ['Jaljeera', 'Drinks', 59, 1, 4.0, '🥤', 'Tangy cumin-mint cooler'],
  ['Rose Sharbat', 'Drinks', 69, 1, 4.1, '🌹', 'Rose syrup, chilled milk, basil seeds'],
  ['Virgin Mojito', 'Drinks', 109, 1, 4.2, '🍹', 'Lime, mint and soda over ice'],
  ['Gulab Jamun (2 pcs)', 'Desserts', 79, 1, 4.4, '🍮', 'Warm milk dumplings in cardamom syrup'],
  ['Mishti Doi', 'Desserts', 99, 1, 4.6, '🍨', 'Bengali caramelised yoghurt in a clay pot'],
  ['Rasgulla (2 pcs)', 'Desserts', 89, 1, 4.3, '⚪', 'Spongy chhena balls in light syrup'],
  ['Chocolate Brownie', 'Desserts', 129, 1, 4.2, '🍫', 'Fudgy brownie served warm'],
  ['Kulfi Falooda', 'Desserts', 139, 1, 4.5, '🍧', 'Pistachio kulfi with falooda and rabri'],
  ['Gajar Halwa', 'Desserts', 119, 1, 4.4, '🥕', 'Slow-cooked carrot pudding with nuts'],
  ['Sandesh (2 pcs)', 'Desserts', 99, 1, 4.3, '🍬', 'Soft Bengali milk sweet'],
  ['Choco Lava Cake', 'Desserts', 149, 1, 4.5, '🎂', 'Warm cake with a molten chocolate centre']
];
const seen = {};
const SAMPLE_MENU = RAW_MENU.map(([name, category, price, veg, rating, emoji, description], i) => {
  const n = (seen[category] = (seen[category] ?? -1) + 1);
  const pool = IMG_POOL[category];
  return { id: i + 1, name, category, price, veg: Boolean(veg), rating, emoji, description, image: imgUrl(pool[n % pool.length]) };
});

/* ---------- 3. Storage, state & helpers ---------- */
const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage blocked: keep working in memory */ } };

const state = {
  menu: load(KEYS.menu, SAMPLE_MENU), cart: load(KEYS.cart, []), orders: load(KEYS.orders, []), addresses: load(KEYS.addr, []),
  coupon: load(KEYS.coupon, ''), admin: load(KEYS.admin, false), vegOnly: load(KEYS.veg, false), lang: load(KEYS.lang, 'en'),
  speed: 'standard', category: 'All', query: '', sort: 'default', maxPrice: 0
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const t = (k) => I18N[state.lang]?.[k] ?? I18N.en[k] ?? k;
const money = (n) => '₹' + n.toFixed(2);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const qtyOf = (id) => state.cart.find((c) => c.itemId === id)?.quantity || 0;

const imgTag = (i, cls = 'dish-img') => i.image
  ? `<img class="${cls}" src="${esc(i.image)}" alt="${esc(i.name)}" loading="lazy" data-emoji="${esc(i.emoji || '🍽️')}">`
  : `<div class="${cls} fallback" aria-hidden="true">${esc(i.emoji || '🍽️')}</div>`;

// Any photo that fails to load is swapped for a coloured emoji tile
document.addEventListener('error', (e) => {
  const img = e.target;
  if (!(img instanceof HTMLImageElement) || !img.dataset.emoji) return;
  const tile = document.createElement('div');
  tile.className = img.className + ' fallback';
  tile.setAttribute('aria-hidden', 'true');
  tile.textContent = img.dataset.emoji;
  img.replaceWith(tile);
}, true);

/* ---------- 4. Cart & bill logic ---------- */
function totals() {
  const subtotal = state.cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const c = COUPONS[state.coupon];
  const active = c && subtotal >= c.min;
  let discount = 0;
  if (active && c.type === 'flat') discount = c.value;
  if (active && c.type === 'pct') discount = Math.min((subtotal * c.value) / 100, c.max);
  discount = Math.min(discount, subtotal);
  const freeShip = (active && c.type === 'ship') || (state.speed === 'standard' && subtotal >= 500);
  const delivery = subtotal === 0 || freeShip ? 0 : SPEEDS[state.speed].fee;
  const tax = (subtotal - discount) * TAX_RATE;
  return { subtotal, discount, delivery, tax, total: subtotal - discount + tax + delivery };
}

const billHTML = (b) => `<dl class="totals">
  <div><dt>${t('itemTotal')}</dt><dd>${money(b.subtotal)}</dd></div>
  ${b.discount ? `<div class="save"><dt>${t('discount')}</dt><dd>−${money(b.discount)}</dd></div>` : ''}
  <div><dt>${t('deliveryFee')}</dt><dd>${b.delivery ? money(b.delivery) : t('free')}</dd></div>
  <div><dt>${t('taxes')}</dt><dd>${money(b.tax)}</dd></div>
  <div class="grand"><dt>${t('total')}</dt><dd>${money(b.total)}</dd></div></dl>`;

function addToCart(id) {
  const item = state.menu.find((m) => m.id === id);
  if (!item) return;
  const line = state.cart.find((c) => c.itemId === id);
  if (line) line.quantity += 1;
  else state.cart.push({ itemId: id, name: item.name, price: item.price, quantity: 1 });
  syncCart();
}
function changeQty(id, delta) {
  const line = state.cart.find((c) => c.itemId === id);
  if (!line) return;
  line.quantity += delta;
  if (line.quantity <= 0) state.cart = state.cart.filter((c) => c.itemId !== id);
  syncCart();
}
function removeFromCart(id) { state.cart = state.cart.filter((c) => c.itemId !== id); syncCart(); }
function syncCart() { save(KEYS.cart, state.cart); renderCart(); refreshControls(); }

function applyCoupon() {
  const code = $('#couponInput').value.trim().toUpperCase();
  if (!COUPONS[code]) { $('#couponMsg').textContent = t('couponBad'); return; }
  state.coupon = code;
  save(KEYS.coupon, code);
  $('#couponInput').value = '';
  renderCart();
}

/* ---------- 5. Rendering ---------- */
const qtyHTML = (id) => `<div class="qty"><button data-dec="${id}" aria-label="Decrease">−</button><span>${qtyOf(id)}</span><button data-inc="${id}" aria-label="Increase">+</button></div>`;
const controlHTML = (id) => (qtyOf(id) ? qtyHTML(id) : `<button class="btn primary sm" data-add="${id}">${t('add')}</button>`);
function refreshControls() { $$('[data-ctl]').forEach((el) => { el.innerHTML = controlHTML(+el.dataset.ctl); }); }

function renderCategories() {
  $('#cats').innerHTML = ['All', ...CATEGORIES].map((c) =>
    `<button class="cat ${c === state.category ? 'active' : ''}" data-cat="${c}"><span aria-hidden="true">${CAT_ICON[c]}</span>${t('cat_' + c)}</button>`).join('');
  const sel = $('#adminCategory').value;
  $('#adminCategory').innerHTML = CATEGORIES.map((c) => `<option value="${c}">${t('cat_' + c)}</option>`).join('');
  if (sel) $('#adminCategory').value = sel;
}

function renderMenu() {
  const items = state.menu.filter((i) =>
    (state.category === 'All' || i.category === state.category) &&
    (!state.vegOnly || i.veg) && (!state.maxPrice || i.price <= state.maxPrice) &&
    `${i.name} ${i.description}`.toLowerCase().includes(state.query));
  if (state.sort === 'low') items.sort((a, b) => a.price - b.price);
  if (state.sort === 'high') items.sort((a, b) => b.price - a.price);
  if (state.sort === 'rating') items.sort((a, b) => b.rating - a.rating);
  $('#menuGrid').innerHTML = items.length ? items.map((i) => `
    <article class="card">
      <div class="media">${imgTag(i)}<span class="rate">★ ${(i.rating || 0).toFixed(1)}</span></div>
      <div class="body">
        <h3><span class="dot ${i.veg ? 'veg' : 'nonveg'}" role="img" aria-label="${i.veg ? 'Veg' : 'Non-veg'}"></span>${esc(i.name)}</h3>
        <p>${esc(i.description)}</p>
        <div class="row"><strong>${money(i.price)}</strong><div data-ctl="${i.id}">${controlHTML(i.id)}</div></div>
        ${state.admin ? `<button class="link danger" data-delete="${i.id}">${t('removeDish')}</button>` : ''}
      </div>
    </article>`).join('') : `<p class="empty">${t('noMatch')}</p>`;
}

function renderCart() {
  const b = totals();
  const count = state.cart.reduce((n, c) => n + c.quantity, 0);
  $('#cartItems').innerHTML = state.cart.length ? state.cart.map((c) => {
    const m = state.menu.find((x) => x.id === c.itemId) || { name: c.name };
    return `<li class="cart-row">${imgTag(m, 'thumb')}
      <div class="grow"><strong>${esc(c.name)}</strong>
        <small>${money(c.price)} × ${c.quantity} = <b>${money(c.price * c.quantity)}</b></small>
        <div class="qty-row">${qtyHTML(c.itemId)}<button class="link danger" data-remove="${c.itemId}">${t('remove')}</button></div>
      </div></li>`;
  }).join('') : `<li class="empty">${t('emptyCart')}</li>`;

  const cp = COUPONS[state.coupon];
  $('#couponApplied').innerHTML = cp ? `<span class="chip on">🏷️ ${state.coupon} <button class="link" data-unapply aria-label="Remove coupon">✕</button></span>` : '';
  $('#couponMsg').textContent = cp ? (b.subtotal >= cp.min ? t('couponApplied') : t('couponMin').replace('{min}', cp.min)) : t('couponHint');

  const bill = state.cart.length ? billHTML(b) : '';
  $('#cartBill').innerHTML = bill;
  $('#coBill').innerHTML = bill;
  $('#checkoutTotal').textContent = money(b.total);
  $('#cartBadge').textContent = count;
  $('#checkoutBtn').disabled = !count;
  $('#cartBar').hidden = !count;
  $('#cartBarText').textContent = `${count} ${t('items')} · ${money(b.total)}`;
}

function renderAddresses() {
  const cur = $('input[name="addr"]:checked')?.value;
  const saved = state.addresses.map((a) => `
    <label class="opt"><input type="radio" name="addr" value="${a.id}"><i>📍</i>
      <span><b>${esc(t('lbl_' + a.label))}</b><br><small>${esc(a.line)} · ${esc(a.pin)}</small></span>
      <button type="button" class="link danger" data-deladdr="${a.id}" aria-label="Delete address">✕</button></label>`).join('');
  $('#addrList').innerHTML = saved + `<label class="opt"><input type="radio" name="addr" value="new"><i>➕</i><span><b>${t('newAddress')}</b></span></label>`;
  const want = [...$$('input[name="addr"]')].find((r) => r.value === cur) || $$('input[name="addr"]')[0];
  want.checked = true;
}

function renderOrders() {
  $('#ordersList').innerHTML = state.orders.length ? state.orders.map((o) => {
    const step = STATUSES.indexOf(o.status);
    const eta = new Date(o.timestamp + o.etaMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `<li class="order">
      <div class="row"><strong>${o.orderId}</strong><small>${new Date(o.timestamp).toLocaleString()}</small></div>
      <p>${o.items.map((i) => `${esc(i.name)} × ${i.quantity}`).join(', ')}</p>
      <ol class="track">${STATUSES.map((s, k) => `<li class="${k <= step ? 'done' : ''}">${t('st_' + s)}</li>`).join('')}</ol>
      <p class="eta">${step === 3 ? '✅ ' + t('st_delivered') : '🕒 ' + t('arrivesBy') + ' ' + eta}</p>
      <p>📍 ${esc(o.customerDetails.address)}</p>
      <div class="row"><span>${esc(o.customerDetails.name)} · ${esc(o.customerDetails.payment)}</span><strong>${money(o.totalAmount)}</strong></div>
    </li>`;
  }).join('') : `<li class="empty">${t('noOrders')}</li>`;
}

function renderAdmin() {
  $('#adminPanel').hidden = !state.admin;
  $('#adminToggle').textContent = `${t('admin')}: ${t(state.admin ? 'on' : 'off')}`;
  $('#adminToggle').setAttribute('aria-pressed', state.admin);
}

function applyLang() {
  document.documentElement.lang = state.lang;
  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
  renderCategories(); renderAdmin(); renderMenu(); renderCart(); renderAddresses(); renderOrders();
}

/* ---------- 6. Panels ---------- */
function closePanels() {
  $$('.drawer.open, .modal.open').forEach((p) => p.classList.remove('open'));
  $('#overlay').hidden = true;
}
function syncCheckout() {
  const f = new FormData($('#checkoutForm'));
  $$('[data-pay]').forEach((el) => { el.hidden = el.dataset.pay !== f.get('payment'); });
  $('#newAddr').hidden = f.get('addr') !== 'new';
}
function openPanel(id) {
  closePanels();
  if (id === 'checkoutModal') {
    if (!state.cart.length) return;
    renderAddresses(); renderCart(); syncCheckout();
  }
  if (id === 'ordersModal') renderOrders();
  $('#' + id).classList.add('open');
  $('#overlay').hidden = false;
}

/* ---------- 7. Checkout & orders ---------- */
const validExpiry = (v) => {
  const m = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(v);
  return !!m && new Date(2000 + Number(m[2]), Number(m[1])) > new Date();
};
const payLabel = (m, r) => ({
  UPI: `UPI · ${r.upiApp} (${(r.upiId || '').trim()})`,
  Card: `Card •••• ${(r.cardNumber || '').replace(/\s/g, '').slice(-4)}`, // only the last 4 digits are kept
  'Net Banking': `Net Banking · ${r.bank}`,
  Wallet: r.wallet
}[m] || t('cod'));

function placeOrder(customer, bill) {
  const order = {
    orderId: 'ORD-' + Date.now().toString(36).toUpperCase(),
    customerDetails: customer, items: state.cart.map((c) => ({ ...c })), bill,
    totalAmount: Number(bill.total.toFixed(2)), speed: state.speed, etaMinutes: SPEEDS[state.speed].mins,
    status: STATUSES[0], timestamp: Date.now()
  };
  state.orders.unshift(order);
  save(KEYS.orders, state.orders);
  state.cart = []; state.coupon = ''; save(KEYS.coupon, '');
  syncCart();
  showReceipt(order);
}

function showReceipt(o) {
  const eta = new Date(o.timestamp + o.etaMinutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  $('#receiptBody').innerHTML = `
    <p><strong>${o.orderId}</strong><br>${t('thanks')}, ${esc(o.customerDetails.name)}!<br>
    🕒 ${t('arrivesBy')} ${eta}<br>📍 ${esc(o.customerDetails.address)}<br>💳 ${esc(o.customerDetails.payment)}
    ${o.customerDetails.notes ? `<br>📝 ${esc(o.customerDetails.notes)}` : ''}</p>
    ${o.items.map((i) => `<div class="receipt-line"><span>${esc(i.name)} × ${i.quantity}</span><span>${money(i.price * i.quantity)}</span></div>`).join('')}
    ${billHTML(o.bill)}`;
  openPanel('receiptModal');
}

function tickStatuses() {
  let changed = false;
  state.orders.forEach((o) => {
    const idx = Math.min(STATUSES.length - 1, Math.floor((Date.now() - o.timestamp) / SPEEDS[o.speed].step));
    if (STATUSES[idx] !== o.status) { o.status = STATUSES[idx]; changed = true; }
  });
  if (changed) { save(KEYS.orders, state.orders); renderOrders(); }
}

/* ---------- 8. Events (delegation) ---------- */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-add],[data-inc],[data-dec],[data-remove],[data-delete],[data-cat],[data-open],[data-close],[data-apply],[data-unapply],[data-deladdr],[data-note]');
  if (!el) return;
  const d = el.dataset;
  if (d.add) addToCart(+d.add);
  else if (d.inc) changeQty(+d.inc, 1);
  else if (d.dec) changeQty(+d.dec, -1);
  else if (d.remove) removeFromCart(+d.remove);
  else if (d.delete) {
    state.menu = state.menu.filter((m) => m.id !== +d.delete);
    state.cart = state.cart.filter((c) => c.itemId !== +d.delete);
    save(KEYS.menu, state.menu); syncCart(); renderMenu();
  } else if (d.cat) { state.category = d.cat; renderCategories(); renderMenu(); }
  else if (d.open) openPanel(d.open);
  else if ('close' in d) closePanels();
  else if ('apply' in d) applyCoupon();
  else if ('unapply' in d) { state.coupon = ''; save(KEYS.coupon, ''); renderCart(); }
  else if (d.deladdr) { state.addresses = state.addresses.filter((a) => a.id !== d.deladdr); save(KEYS.addr, state.addresses); renderAddresses(); syncCheckout(); }
  else if (d.note) { const ta = $('[name="notes"]'); ta.value = (ta.value ? ta.value + '. ' : '') + t(d.note); }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanels(); });
$('#couponInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); applyCoupon(); } });

$('#search').addEventListener('input', (e) => { state.query = e.target.value.trim().toLowerCase(); renderMenu(); });
$('#sort').addEventListener('change', (e) => { state.sort = e.target.value; renderMenu(); });
$('#maxPrice').addEventListener('change', (e) => { state.maxPrice = Number(e.target.value); renderMenu(); });
$('#vegToggle').addEventListener('change', (e) => { state.vegOnly = e.target.checked; save(KEYS.veg, state.vegOnly); renderMenu(); });
$('#lang').addEventListener('change', (e) => { state.lang = e.target.value; save(KEYS.lang, state.lang); applyLang(); });
$('#adminToggle').addEventListener('click', () => { state.admin = !state.admin; save(KEYS.admin, state.admin); renderAdmin(); renderMenu(); });

$('#adminForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const price = Number(f.price);
  if (!f.name.trim() || !(price > 0)) { $('#adminError').textContent = t('errDish'); return; }
  $('#adminError').textContent = '';
  state.menu.push({
    id: state.menu.reduce((max, m) => Math.max(max, m.id), 0) + 1, name: f.name.trim(), category: f.category, price,
    veg: f.veg === 'on', rating: 4, emoji: '🍽️', image: /^https?:\/\//.test(f.image.trim()) ? f.image.trim() : '',
    description: f.description.trim() || 'Freshly made to order.'
  });
  save(KEYS.menu, state.menu);
  e.target.reset();
  renderMenu();
});

const form = $('#checkoutForm');
form.addEventListener('change', (e) => {
  if (e.target.name === 'speed') { state.speed = e.target.value; renderCart(); }
  syncCheckout();
});
form.addEventListener('input', (e) => {
  const el = e.target;
  if (el.name === 'cardNumber') el.value = el.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})(?=.)/g, '$1 ');
  if (el.name === 'cardExpiry') { const d = el.value.replace(/\D/g, '').slice(0, 4); el.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; }
  if (['cardCvv', 'phone', 'pin'].includes(el.name)) el.value = el.value.replace(/\D/g, '');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!state.cart.length) { closePanels(); return; }
  const raw = Object.fromEntries(new FormData(form));
  const val = (k) => (raw[k] || '').trim();
  $$('[data-err]').forEach((el) => { el.textContent = ''; });
  let valid = true;
  const check = (field, ok, msg) => { if (!ok) { $(`[data-err="${field}"]`).textContent = t(msg); valid = false; } };

  check('name', /^\p{L}[\p{L}\p{M} .'-]{1,49}$/u.test(val('name')), 'errName');
  check('phone', /^[6-9]\d{9}$/.test(val('phone')), 'errPhone');
  const isNew = raw.addr === 'new';
  check('addr', !!raw.addr, 'errAddrPick');
  if (isNew) { check('line', val('line').length >= 10, 'errLine'); check('pin', /^\d{6}$/.test(val('pin')), 'errPin'); }
  const m = raw.payment;
  check('payment', !!m, 'errPay');
  if (m === 'UPI') { check('upiApp', !!raw.upiApp, 'errUpiApp'); check('upiId', /^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(val('upiId')), 'errUpi'); }
  if (m === 'Card') {
    check('cardNumber', /^\d{16}$/.test(val('cardNumber').replace(/\s/g, '')), 'errCard');
    check('cardName', val('cardName').length >= 2, 'errCardName');
    check('cardExpiry', validExpiry(val('cardExpiry')), 'errExpiry');
    check('cardCvv', /^\d{3}$/.test(val('cardCvv')), 'errCvv');
  }
  if (m === 'Net Banking') check('bank', !!raw.bank, 'errBank');
  if (m === 'Wallet') check('wallet', !!raw.wallet, 'errWallet');
  if (!valid) { $('.error:not(:empty)')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }

  let addr;
  if (isNew) {
    addr = { id: 'a' + Date.now(), label: raw.label, line: val('line'), pin: val('pin') };
    state.addresses.push(addr);
    save(KEYS.addr, state.addresses);
  } else addr = state.addresses.find((a) => a.id === raw.addr);

  const customer = {
    name: val('name'), phone: val('phone'), address: `${t('lbl_' + addr.label)}: ${addr.line}, ${addr.pin}`,
    notes: val('notes'), payment: payLabel(m, raw)
  };
  const bill = totals();
  form.reset();
  state.speed = 'standard';
  placeOrder(customer, bill);
  renderAddresses(); syncCheckout();
});

/* ---------- 9. Init ---------- */
save(KEYS.menu, state.menu);
$('#lang').value = state.lang;
$('#vegToggle').checked = state.vegOnly;
applyLang();
syncCheckout();
tickStatuses();
setInterval(tickStatuses, 3000);
