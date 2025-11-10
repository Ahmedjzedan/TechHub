"use server";

import { db } from "@/db"; // adjust path
import { eq, like, inArray, sql, or, and, desc, asc } from "drizzle-orm";
import {
  items,
  categories,
  brands,
  itemImages,
  itemAttributes,
  tags,
  itemTags,
  carts,
  cartItems,
  wishlist,
  orderItems,
  orders,
  // ... other imports
} from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Item = InferSelectModel<typeof items>;
type Category = InferSelectModel<typeof categories>;
type Brand = InferSelectModel<typeof brands>;
type ItemImage = InferSelectModel<typeof itemImages>;
type ItemAttribute = InferSelectModel<typeof itemAttributes>;
type Tag = InferSelectModel<typeof tags>;

export type FullItem = Item & {
  itemImages: ItemImage[];
  itemAttributes: ItemAttribute[];
  category: Category | null;
  brand: Brand | null;
  tags: Tag[];
};

export async function getItemsByCategory(categoryName: string) {
  try {
    const category = await db.query.categories.findFirst({
      where: eq(categories.name, categoryName),
    });

    if (!category) {
      return [];
    }

    const itemsInCategory = await db.query.items.findMany({
      where: eq(items.categoryId, category.id),
      with: {
        itemImages: true,
        itemAttributes: true,
        brand: true,
        category: true,
        itemTags: {
          with: {
            tag: true,
          },
        },
      },
    });

    return itemsInCategory;
  } catch (err) {
    console.error("Error fetching items by category:", err);
    return [];
  }
}

// export async function getItemsByTag(tagName) {}

export async function GetItemByID(itemID: number) {
  try {
    // 1. Find the item by its ID
    const item = await db.query.items.findFirst({
      where: eq(items.id, itemID),
      with: {
        itemImages: true,
        itemAttributes: true,
        brand: true,
        category: true,
        itemTags: {
          with: {
            tag: true, // Fetch the actual tag data
          },
        },
      },
    });

    if (!item) {
      return null;
    }

    // 2. (Recommended) Flatten the tags for a clean response
    const tags = item.itemTags.map((itemTag) => itemTag.tag);

    // Return the item with the clean tags array
    return { ...item, tags: tags };
  } catch (err) {
    console.error("Error fetching item by ID:", err);
    return null;
  }
}

// Helper object for eager loading (you can reuse this)
const fullItemInclude = {
  itemImages: true,
  itemAttributes: true,
  brand: true,
  category: true,
  itemTags: {
    with: {
      tag: true,
    },
  },
} as const;

function flattenTags(item: any) {
  const tags = item.itemTags.map((itemTag: any) => itemTag.tag);
  return { ...item, tags };
}

export async function getItemsByTag(tagName: string) {
  try {
    const tag = await db.query.tags.findFirst({
      where: eq(tags.name, tagName),
    });

    if (!tag) {
      return [];
    }

    const itemRelations = await db.query.itemTags.findMany({
      where: eq(itemTags.tagId, tag.id),
      with: {
        item: {
          with: fullItemInclude,
        },
      },
    });

    return itemRelations.map((relation) => flattenTags(relation.item));
  } catch (err) {
    console.error("Error fetching items by tag:", err);
    return [];
  }
}

export async function getItemsByName(itemName: string) {
  try {
    const foundItems = await db.query.items.findMany({
      where: like(items.name, `%${itemName}%`),
      with: fullItemInclude,
    });

    return foundItems.map(flattenTags);
  } catch (err) {
    console.error("Error fetching items by name:", err);
    return [];
  }
}

export async function getCategories() {
  try {
    const categories = await db.query.categories.findMany();
    if (categories) {
      return categories;
    } else {
      throw "fuck";
    }
  } catch (err) {
    console.error("failed to get categories, error: " + err);
    return [];
  }
}
/**
 * Creates a new, empty cart for a user.
 * If a cart already exists, it does nothing.
 */
export async function createCart(userId: number) {
  try {
    await db.insert(carts).values({ userId: userId }).onConflictDoNothing(); // This prevents errors if the cart exists

    console.log(`Cart created (or already existed) for user: ${userId}`);
    return { success: true };
  } catch (err) {
    console.error("Error creating cart:", err);
    return { success: false, error: (err as Error).message };
  }
}

/**
 * Gets all items in a user's cart.
 * If no cart is found, it creates one and returns an empty array.
 */
export async function getCartItems(userId: number) {
  try {
    // We can do this in one efficient query using 'with'
    const cart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
      with: {
        cartItems: {
          // Eager load the cart items...
          with: {
            item: { with: fullItemInclude }, // ...and the item details for each
          },
        },
      },
    });

    if (cart) {
      // If we found a cart, return its items
      return cart.cartItems;
    }

    // --- Cart not found, so we create one ---
    console.log(`No cart found for user ${userId}, creating one...`);
    await createCart(userId);

    // The new cart is empty, so just return an empty array.
    // No need to query again.
    return [];
  } catch (err) {
    console.error("Error fetching cart items:", err);
    return []; // Return empty array on error
  }
}

/**
 * Inserts or updates an item in the user's cart.
 * If no cart exists, it creates one first.
 */
export async function InsertCartItem(
  userId: number,
  itemId: number,
  quantity: number
) {
  try {
    // 1. Get the cart
    let cart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
      columns: { id: true }, // We only need the ID
    });

    // 2. If no cart, create one
    if (!cart) {
      console.log(`No cart for user ${userId}, creating one for insert...`);
      await createCart(userId);
      // Re-fetch the cart we just created
      cart = await db.query.carts.findFirst({
        where: eq(carts.userId, userId),
        columns: { id: true },
      });

      // If it's *still* not found, something is very wrong
      if (!cart)
        throw new Error("Failed to create or find cart after creation.");
    }

    // 3. Now that we're sure a cart exists, insert/update the item
    await db
      .insert(cartItems)
      .values({
        cartId: cart.id,
        itemId: itemId,
        quantity: quantity,
      })
      .onConflictDoUpdate({
        // This handles items already in the cart
        target: [cartItems.cartId, cartItems.itemId],
        set: { quantity: quantity },
      });

    return { success: true };
  } catch (err) {
    console.error("Error inserting cart item:", err);
    return { success: false, error: (err as Error).message };
  }
}

// Inside your app/actions/actions.ts file

export async function getItemsById(itemIds: string | number | number[]) {
  try {
    let finalItemIds: number[] = [];

    // 1. Safely parse the input
    if (typeof itemIds === "string") {
      const parsedValue = JSON.parse(itemIds);
      if (Array.isArray(parsedValue)) {
        finalItemIds = parsedValue.map(Number);
      } else if (typeof parsedValue === "number") {
        finalItemIds = [parsedValue];
      }
    } else if (Array.isArray(itemIds)) {
      finalItemIds = itemIds;
    } else if (typeof itemIds === "number") {
      finalItemIds = [itemIds];
    }

    if (finalItemIds.length === 0) {
      return [];
    }

    // 2. Build the 'where' clause
    const conditions = finalItemIds.map((id) => eq(items.id, id));
    const whereClause = or(...conditions);

    // 3. Fetch the full item data
    const fetchedItems = await db.query.items.findMany({
      where: whereClause,
      with: fullItemInclude,
    });

    // 4. --- THIS IS THE FIX ---
    // Return the flattened items directly, not the cart format
    return fetchedItems.map(flattenTags);
    // --- END OF FIX ---
  } catch (err) {
    console.error("Error fetching items by ID array:", err);
    return [];
  }
}

export async function AddToCart(userId: number, itemId: number) {
  try {
    let cart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
      columns: { id: true },
    });

    if (!cart) {
      console.log(`No cart for user ${userId}, creating one for insert...`);
      await createCart(userId);
      cart = await db.query.carts.findFirst({
        where: eq(carts.userId, userId),
        columns: { id: true },
      });
      if (!cart)
        throw new Error("Failed to create or find cart after creation.");
    }

    // 3. Insert the item. If it exists, increment the quantity.
    await db
      .insert(cartItems)
      .values({
        cartId: cart.id,
        itemId: itemId,
        quantity: 1, // Default to 1 on first insert
      })
      .onConflictDoUpdate({
        target: [cartItems.cartId, cartItems.itemId],
        // Use SQL to increment the existing quantity by 1
        set: {
          quantity: sql`${cartItems.quantity} + 1`,
        },
      });

    return { success: true };
  } catch (err) {
    console.error("Error in AddToCart:", err);
    return { success: false, error: "Failed to add item to cart." };
  }
}

export async function removeFromCart(userId: number, itemId: number) {
  try {
    // 1. Find the user's cart
    const cart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
      columns: { id: true },
    });

    // If there's no cart, there's nothing to remove.
    if (!cart) {
      console.log("No cart found for user, nothing to remove.");
      return { success: true };
    }

    // 2. Delete the item from the cart
    await db
      .delete(cartItems)
      .where(and(eq(cartItems.cartId, cart.id), eq(cartItems.itemId, itemId)));

    return { success: true };
  } catch (err) {
    console.error("Error in removeFromCart:", err);
    return { success: false, error: "Failed to remove item from cart." };
  }
}
export async function addToWishList({
  userId,
  itemId,
}: {
  userId: number;
  itemId: number;
}) {
  try {
    console.log(userId, itemId);
    // 1. Insert the new pair
    await db
      .insert(wishlist)
      .values({
        userId: userId,
        itemId: itemId,
      })
      .onConflictDoNothing();
    return { success: true };
  } catch (err) {
    console.error("Error in addToWishList:", err);
    return { success: false, error: "Failed to add item to wishlist." };
  }
}

export async function GetWishListItems(userId: number) {
  try {
    // 1. Query the wishlist join table
    const wishlistEntries = await db.query.wishlist.findMany({
      // 2. Find all rows matching the user's ID
      where: eq(wishlist.userId, userId),
      with: {
        item: {
          // 3. Eager load the full item for each entry
          with: fullItemInclude,
        },
      },
    });

    // 4. Map the results to return a clean array of items
    return wishlistEntries.map((entry) => flattenTags(entry.item));
  } catch (err) {
    console.error("Error fetching wishlist items:", err);
    return [];
  }
}

export async function removeFromWishList({
  userId,
  itemId,
}: {
  userId: number;
  itemId: number;
}) {
  try {
    // 1. Find the specific entry and delete it
    await db
      .delete(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.itemId, itemId)));

    return { success: true };
  } catch (err) {
    console.error("Error in removeFromWishList:", err);
    return { success: false, error: "Failed to remove item from wishlist." };
  }
}
export async function CheckOutCart(userId: number) {
  try {
    // 1. Get the user's cart
    const cart = await db.query.carts.findFirst({
      where: eq(carts.userId, userId),
    });

    if (!cart) {
      throw new Error("No cart found for this user.");
    }

    // 2. Get all items in the cart, along with their price info
    const itemsInCart = await db.query.cartItems.findMany({
      where: eq(cartItems.cartId, cart.id),
      with: {
        item: {
          columns: {
            price: true,
            discount: true,
          },
        },
      },
    });

    if (itemsInCart.length === 0) {
      throw new Error("Cart is empty.");
    }

    // 3. Calculate the total and prepare the order items
    let totalAmount = 0;
    const itemsForOrder = itemsInCart.map((cartItem) => {
      // Calculate the final price (with discount)
      const priceAtPurchase = cartItem.item.discount
        ? cartItem.item.price -
          cartItem.item.price * (cartItem.item.discount / 100)
        : cartItem.item.price;

      totalAmount += priceAtPurchase * cartItem.quantity;

      return {
        itemId: cartItem.itemId,
        quantity: cartItem.quantity,
        priceAtPurchase: Math.round(priceAtPurchase * 100) / 100, // Round to 2 decimals
      };
    });

    const newOrder = await db
      .insert(orders)
      .values({
        userId: userId,
        totalAmount: Math.round(totalAmount * 100) / 100,
        status: "processing",
      })
      .returning({ id: orders.id });

    const orderId = newOrder[0].id;

    const orderItemsToInsert = itemsForOrder.map((item) => ({
      orderId: orderId,
      itemId: item.itemId,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase,
    }));

    await db.insert(orderItems).values(orderItemsToInsert);

    await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));

    console.log(`Order ${orderId} created successfully for user ${userId}.`);
    return { success: true, orderId: orderId };
  } catch (err) {
    console.error("Error in CheckOutCart:", err);
    return { success: false, error: (err as Error).message };
  }
}

export async function CheckoutItem(userId: number, itemId: number) {
  try {
    const item = await db.query.items.findFirst({
      where: eq(items.id, itemId),
      columns: {
        price: true,
        discount: true,
      },
    });

    if (!item) {
      throw new Error("Item not found.");
    }

    const priceAtPurchase = item.discount
      ? item.price - item.price * (item.discount / 100)
      : item.price;

    const totalAmount = Math.round(priceAtPurchase * 100) / 100;

    const newOrder = await db
      .insert(orders)
      .values({
        userId: userId,
        totalAmount: totalAmount,
        status: "processing",
      })
      .returning({ id: orders.id });

    const orderId = newOrder[0].id;

    await db.insert(orderItems).values({
      orderId: orderId,
      itemId: itemId,
      quantity: 1,
      priceAtPurchase: totalAmount,
    });

    console.log(`Single item order ${orderId} created for user ${userId}.`);
    return { success: true, orderId: orderId };
  } catch (err) {
    console.error("Error in CheckoutItem:", err);
    return { success: false, error: (err as Error).message };
  }
}

export async function getOrdersWithItems(userId: number) {
  try {
    const userOrders = await db.query.orders.findMany({
      where: eq(orders.userId, userId),
      orderBy: [asc(orders.createdAt)], // Show newest orders first
      with: {
        orderItems: {
          with: {
            item: {
              columns: {
                name: true, // We only need the item's name
              },
            },
          },
        },
      },
    });
    return userOrders;
  } catch (err) {
    console.error("Error fetching orders with items:", err);
    return [];
  }
}
export async function GetOrderItems(orderId: number) {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
    });

    if (!order) {
      throw new Error("Order not found.");
    }

    const orderItemsList = await db.query.orderItems.findMany({
      where: eq(orderItems.orderId, orderId),
      with: {
        item: {
          with: fullItemInclude, // Eager load all item info
        },
      },
    });

    const fullOrderItems = orderItemsList.map((orderItem) => {
      return { ...orderItem, item: flattenTags(orderItem.item) };
    });

    return {
      ...order,
      orderItems: fullOrderItems,
    };
  } catch (err) {
    console.error("Error fetching order items:", err);
    return null;
  }
}
// export async function getOrders(userid) {}

// export async function getOrderItems(orderId) {}

// export async function GetWishListItems(userToken) {}

// export async function GetUserAddress(userToken) {}

// export async function GetSessionsActive(userToken) {}

// export async function GetCartItems(userToken) {}

// export async function InsertCartItem(userToken, itemId, quantity) {}

// export async function DeleteCartItem(userToken, itemId) {}
