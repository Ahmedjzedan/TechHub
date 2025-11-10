import { relations } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  primaryKey,
  text,
  real,
} from "drizzle-orm/sqlite-core";

// --- USER & ACCOUNT TABLES ---
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  pictureUrl: text("picture_url"),
  phoneNumber: text("phone_number").unique(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const addresses = sqliteTable("addresses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  street: text("street").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  country: text("country").notNull(),
  isDefault: integer("is_default", { mode: "boolean" })
    .default(false)
    .notNull(),
});

export const creditCards = sqliteTable("credit_cards", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  lastFourDigits: text("last_four_digits").notNull(),
  cardType: text("card_type"),
  expiryDate: text("expiry_date").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sessionToken: text("session_token").notNull().unique(),
  deviceInfo: text("device_info"),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  lastSeen: integer("last_seen", { mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .notNull(),
});

// --- PRODUCT CATALOG TABLES ---
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const brands = sqliteTable("brands", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  logoUrl: text("logo_url"),
});

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
});

export const items = sqliteTable("items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  discount: real("discount").default(0.0).notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "set null" }),
  brandId: integer("brand_id")
    .notNull()
    .references(() => brands.id, { onDelete: "set null" }),
});

export const itemTags = sqliteTable(
  "item_tags",
  {
    itemId: integer("item_id")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.itemId, t.tagId] }),
  })
);

export const itemImages = sqliteTable("item_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

export const itemAttributes = sqliteTable("item_attributes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  itemId: integer("item_id")
    .notNull()
    .references(() => items.id, { onDelete: "cascade" }),
  attributeName: text("attribute_name").notNull(),
  attributeValue: text("attribute_value").notNull(),
});

// --- SHOPPING & ORDERING (JOIN) TABLES ---
export const carts = sqliteTable("carts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const cartItems = sqliteTable(
  "cart_items",
  {
    cartId: integer("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    itemId: integer("item_id")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.cartId, table.itemId] }),
  })
);

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  status: text("status", {
    enum: ["processing", "shipped", "delivered", "canceled"],
  })
    .notNull()
    .default("processing"),
  totalAmount: real("total_amount").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export const orderItems = sqliteTable(
  "order_items",
  {
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    itemId: integer("item_id")
      .notNull()
      .references(() => items.id, { onDelete: "restrict" }),
    quantity: integer("quantity").notNull(),
    priceAtPurchase: real("price_at_purchase").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.orderId, table.itemId] }),
  })
);

export const wishlist = sqliteTable(
  "wishlist",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    itemId: integer("item_id")
      .notNull()
      .references(() => items.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.itemId] }),
  })
);

// --- RELATIONS ---
export const usersRelations = relations(users, ({ many, one }) => ({
  addresses: many(addresses),
  creditCards: many(creditCards),
  sessions: many(sessions),
  orders: many(orders),
  cart: one(carts, { fields: [users.id], references: [carts.userId] }),
}));

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, { fields: [addresses.userId], references: [users.id] }),
}));

export const creditCardsRelations = relations(creditCards, ({ one }) => ({
  user: one(users, { fields: [creditCards.userId], references: [users.id] }),
}));

export const itemsRelations = relations(items, ({ one, many }) => ({
  category: one(categories, {
    fields: [items.categoryId],
    references: [categories.id],
  }),
  brand: one(brands, {
    fields: [items.brandId],
    references: [brands.id],
  }),
  itemImages: many(itemImages),
  itemAttributes: many(itemAttributes),
  itemTags: many(itemTags),
}));

export const itemAttributesRelations = relations(itemAttributes, ({ one }) => ({
  item: one(items, {
    fields: [itemAttributes.itemId],
    references: [items.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  orderItems: many(orderItems),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, { fields: [carts.userId], references: [users.id] }),
  cartItems: many(cartItems),
}));

export const wishlistRelations = relations(wishlist, ({ one }) => ({
  user: one(users, { fields: [wishlist.userId], references: [users.id] }),
  item: one(items, { fields: [wishlist.itemId], references: [items.id] }),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
  item: one(items, { fields: [cartItems.itemId], references: [items.id] }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  item: one(items, { fields: [orderItems.itemId], references: [items.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  items: many(items),
}));

export const brandsRelations = relations(brands, ({ many }) => ({
  items: many(items),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  itemTags: many(itemTags),
}));

export const itemImagesRelations = relations(itemImages, ({ one }) => ({
  item: one(items, {
    fields: [itemImages.itemId],
    references: [items.id],
  }),
}));

export const itemTagsRelations = relations(itemTags, ({ one }) => ({
  item: one(items, {
    fields: [itemTags.itemId],
    references: [items.id],
  }),
  tag: one(tags, {
    fields: [itemTags.tagId],
    references: [tags.id],
  }),
}));
