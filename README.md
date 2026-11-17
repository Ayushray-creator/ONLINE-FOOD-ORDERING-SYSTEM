# Tiffin Box – Online Food Ordering System

A complete, client-side food delivery web app built with **pure HTML5, CSS3 and Vanilla JavaScript (ES6+)**. There is no framework and no backend: the browser's `localStorage` stores the menu, cart, saved addresses and placed orders, so the project runs as a standalone website and simulates the full ordering lifecycle (browse → cart → checkout → payment → live order tracking).

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [How to Run](#how-to-run)
5. [How to Use the App](#how-to-use-the-app)
6. [Business Rules](#business-rules)
7. [Data Model (localStorage)](#data-model-localstorage)
8. [Validation Rules](#validation-rules)
9. [Manual Testing Checklist](#manual-testing-checklist)
10. [Known Limitations](#known-limitations)
11. [Future Scope](#future-scope)

---

## Features

| Area | What it does |
| --- | --- |
| **Menu** | 50 dishes in 7 categories (Biryani, Starters, Main Course, Burgers, Pizza, Drinks, Desserts) with photos, ratings and veg / non-veg markers |
| **Search & filters** | Live search, category chips, **Pure Veg** toggle, sort (relevance, top rated, price low/high) and maximum-price filter |
| **Cart** | Slide-out drawer with thumbnails, per-item totals, +/− quantity controls, remove item, promo codes and a detailed bill |
| **Promo codes** | `FIRST50`, `SAVE10`, `FREEDEL` (see [Business Rules](#business-rules)) |
| **Delivery** | Saved addresses (Home / Work / Other), add or delete addresses, delivery instructions with quick-note chips, Standard or Express speed with estimated time |
| **Payments** | UPI (GPay, PhonePe, Paytm, BHIM + UPI ID), Credit / Debit Card, Net Banking, Wallets, Cash on Delivery |
| **Orders** | Receipt after checkout, order history and a 4-step live status tracker (Confirmed → Preparing → Out for delivery → Delivered) |
| **Languages** | Header switcher for **English, हिन्दी and বাংলা** (UI text; dish names stay in English) |
| **Admin mode** | Toggle to add a new dish (name, category, price, veg flag, optional image URL) or remove a dish |
| **Responsive UI** | Mobile-first layout with a sticky bottom cart bar on small screens |
| **Accessibility** | Semantic HTML, ARIA labels, keyboard focus styles, `Esc` closes panels, reduced-motion support |

---

## Tech Stack

- **HTML5** – semantic structure, dialogs and forms
- **CSS3** – CSS variables, Flexbox, Grid, responsive media queries
- **JavaScript (ES6+)** – modules of functions, event delegation, `localStorage`
- **Google Fonts** (optional) – Bricolage Grotesque, DM Sans, Noto Sans Devanagari and Noto Sans Bengali
- **Unsplash** images (optional) – loaded from the internet, with an emoji fallback tile

No build tools, package manager or external JavaScript libraries are needed.

---

## Project Structure

```
food-ordering/
├── index.html        # Page structure (header, menu, cart drawer, checkout, receipt, orders)
├── style.css         # All styling and responsive rules
├── script.js         # App logic: data, rendering, cart, checkout, i18n, tracker
├── tiffin-box.html   # Single-file version (CSS + JS inlined) – use this OR the three files above
└── README.md         # This file
```

> Use **either** `index.html` + `style.css` + `script.js` (kept in the same folder with exactly these names) **or** the standalone `tiffin-box.html`. Do not mix them.

---

## How to Run

1. Download the project folder.
2. Make sure the file names are exactly `index.html`, `style.css` and `script.js`. If your browser added `(1)` to a name (for example `style (1).css`), rename it, otherwise the page loads without styling.
3. Double-click `index.html` (or `tiffin-box.html`) to open it in Chrome, Edge, Firefox or Safari.
4. Optional: in VS Code, right-click `index.html` → **Open with Live Server**.
5. To reset all data, open DevTools → **Application** → **Local Storage** and delete the keys starting with `fo_`.

An internet connection is only needed for photos and Google Fonts. Offline, the app still works and shows emoji tiles and system fonts.

---

## How to Use the App

1. **Browse** – pick a category, search for a dish, switch on **Pure Veg**, or sort by price / rating.
2. **Add to cart** – press **Add**, then use **+ / −** on the card or in the cart drawer.
3. **Apply a promo** – type a code in the cart (for example `FIRST50`) and press **Apply**.
4. **Checkout** – enter name and mobile number, choose or add a delivery address, pick Standard or Express delivery, add instructions, choose a payment method and press **Place order**.
5. **Track** – open **My orders** to watch the status move through the four steps.
6. **Admin** – press the **Admin** button in the header to show the *Add a new dish* form and *Remove dish* links.
7. **Language** – use the drop-down in the header to switch between English, Hindi and Bengali.

---

## Business Rules

**Bill calculation**

```
Item total  = Σ (price × quantity)
Discount    = from the applied promo code (if its minimum is met)
Taxes       = 5% × (Item total − Discount)
Delivery    = Standard ₹40 or Express ₹80
Grand total = Item total − Discount + Taxes + Delivery
```

**Delivery options**

| Option | Estimated time | Fee |
| --- | --- | --- |
| Standard | 30–40 min | ₹40 (free when item total is ₹500 or more) |
| Express | 15–20 min | ₹80 |

**Promo codes**

| Code | Offer | Condition |
| --- | --- | --- |
| `FIRST50` | Flat ₹50 off | Item total ≥ ₹199 |
| `SAVE10` | 10% off, up to ₹100 | Item total ≥ ₹300 |
| `FREEDEL` | Free delivery (any speed) | None |

**Order status simulation** – statuses advance automatically with time so the whole flow can be demonstrated quickly: every 12 seconds for Standard orders and every 8 seconds for Express orders. Status is calculated from the order timestamp, so it continues correctly after a page refresh.

---

## Data Model (localStorage)

| Key | Content |
| --- | --- |
| `fo_menu_v3` | Array of menu items |
| `fo_cart_v3` | Array of cart lines |
| `fo_orders_v3` | Array of placed orders (newest first) |
| `fo_addresses` | Array of saved delivery addresses |
| `fo_coupon` | Currently applied promo code |
| `fo_admin` | `true` / `false` – admin mode |
| `fo_vegOnly` | `true` / `false` – Pure Veg toggle |
| `fo_lang` | `en`, `hi` or `bn` |

**Menu item**

```json
{
  "id": 1,
  "name": "Hyderabadi Chicken Dum Biryani",
  "category": "Biryani",
  "price": 299,
  "veg": false,
  "rating": 4.6,
  "emoji": "🍛",
  "image": "https://images.unsplash.com/photo-…",
  "description": "Basmati dum-cooked with spiced chicken"
}
```

**Cart line**

```json
{ "itemId": 1, "name": "Hyderabadi Chicken Dum Biryani", "price": 299, "quantity": 2 }
```

**Saved address**

```json
{ "id": "a1760000000000", "label": "home", "line": "12 Park Street, Kolkata", "pin": "700016" }
```

**Order**

```json
{
  "orderId": "ORD-LX4K2P9",
  "customerDetails": {
    "name": "Ayush Kumar",
    "phone": "9876543210",
    "address": "Home: 12 Park Street, Kolkata, 700016",
    "notes": "Leave at the door",
    "payment": "UPI · GPay (name@okicici)"
  },
  "items": [{ "itemId": 1, "name": "Hyderabadi Chicken Dum Biryani", "price": 299, "quantity": 2 }],
  "bill": { "subtotal": 598, "discount": 50, "delivery": 0, "tax": 27.4, "total": 575.4 },
  "totalAmount": 575.4,
  "speed": "standard",
  "etaMinutes": 35,
  "status": "preparing",
  "timestamp": 1760000000000
}
```

**Privacy note:** full card numbers and CVV are never stored. For card payments only a label such as `Card •••• 1111` is saved in the order.

---

## Validation Rules

| Field | Rule |
| --- | --- |
| Full name | Letters (including Hindi and Bengali), spaces, `.` `'` `-`; 2–50 characters |
| Mobile number | 10 digits, starting with 6, 7, 8 or 9 |
| New address | At least 10 characters, plus a 6-digit PIN code |
| UPI | An app must be selected and the UPI ID must look like `name@bank` |
| Card | 16-digit number, name on card, valid **unexpired** `MM/YY`, 3-digit CVV |
| Net Banking | A bank must be selected |
| Wallet | A wallet must be selected |
| Checkout | Blocked when the cart is empty |
| Admin form | Dish name required and price greater than 0 |

Dish names, descriptions and image URLs entered in the admin form are HTML-escaped before display.

---

## Manual Testing Checklist

1. **Empty cart** – open the cart with nothing added: the *Proceed to checkout* button must be disabled.
2. **Cart maths** – add 2 × Hyderabadi Chicken Dum Biryani (₹299). Item total should be ₹598.00, tax ₹29.90 and delivery ₹0.00 (free above ₹500). Switching to Express should add ₹80.00.
3. **Promo codes** – apply `SAVE10` on a ₹598 cart (discount ₹59.80). Try `FIRST50`, `FREEDEL` and an invalid code (an error message must appear). Remove items until the total falls below the minimum and confirm the minimum-order message.
4. **Validation** – submit the checkout form empty, then with a phone number like `12345`, a card with an expired date and a UPI ID without `@`. Each case must show an error and must not place an order.
5. **Persistence** – add items, refresh the page: cart, Pure Veg toggle, language and saved addresses must remain.
6. **Order flow** – place an order, check the receipt, then open **My orders**: the tracker should move to *Preparing* after about 12 seconds (Standard) and reach *Delivered* after about 36 seconds.
7. **Addresses** – place an order with a new address, reopen checkout: the address must be listed and selectable; delete it with ✕.
8. **Filters** – enable **Pure Veg** (only green-dot dishes), then combine a category, search text, sort and max price.
9. **Languages** – switch to हिन्दी and বাংলা: headings, buttons, labels and error messages must change; refresh and confirm the choice is remembered.
10. **Admin mode** – turn Admin on, add a dish (with and without an image URL), refresh to confirm it persists, then remove it.
11. **Responsive layout** – in DevTools, test 375 px and 768 px widths: two-column menu on phones, bottom cart bar visible, cart drawer full width, checkout fields stacked.
12. **Keyboard** – open the cart and checkout, press `Esc` to close, and tab through the form to confirm visible focus.

---

## Known Limitations

- This is a front-end simulation. Orders, payments and addresses are **not** sent to a server and no real payment is processed.
- Data lives in one browser on one device; clearing browser data removes it.
- Photos use Unsplash image links. If a link fails to load, an emoji tile is shown instead; replace the IDs in `IMG_POOL` inside `script.js` (or use an image URL in Admin mode) to change them.
- Only UI text is translated; dish names and descriptions remain in English.
- Order tracking uses a time-based demo simulation, not real delivery data.

---

## Future Scope

- Node.js / Express (or Firebase) backend with a database and user login
- Real payment gateway integration (Razorpay, Stripe)
- Live order tracking on a map and push notifications
- Restaurant dashboard with order management and sales reports
- Ratings and reviews, favourites and re-order
- Progressive Web App support (offline mode, install on phone)

---

## Author & License

Created as a student project for learning front-end web development. Free to use and modify for educational purposes.
