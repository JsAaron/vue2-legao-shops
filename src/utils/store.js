/**
 * 存储localStorage
 */
export function setStore(name, content) {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export function getStore(name) {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export function removeStore() {
  if (!name) return;
  window.localStorage.removeItem(name);
}
