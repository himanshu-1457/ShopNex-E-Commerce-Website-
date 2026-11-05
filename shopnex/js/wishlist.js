/* wishlist.js - core wishlist functions (wishlist page comes in Phase 7) */

function getWishlist() {
  return getFromStorage(STORAGE_KEYS.wishlist, []);
}

function isInWishlist(productId) {
  return getWishlist().includes(Number(productId));
}

// Add if missing, remove if already present. Returns true when product is now in wishlist.
function toggleWishlist(productId) {
  const id = Number(productId);
  if (!getProductById(id)) return false;

  let wishlist = getWishlist();
  let isNowInWishlist;

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(savedId => savedId !== id);
    isNowInWishlist = false;
    showToast('Removed from wishlist');
  } else {
    wishlist.push(id);
    isNowInWishlist = true;
    showToast('Added to wishlist ♥', 'success');
  }

  saveToStorage(STORAGE_KEYS.wishlist, wishlist);
  updateBadges();
  return isNowInWishlist;
}