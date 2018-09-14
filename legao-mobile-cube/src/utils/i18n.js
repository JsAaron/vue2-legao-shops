// translate router.meta.title, be used in breadcrumb sidebar tagsview

/**
 * 路由的中英转化
 * @param {*} title
 */
export function generateTitle(title) {
  const hasKey = this.$te("route." + title);
  if (hasKey) {
    return this.$t("route." + title); // $t :this method from vue-i18n, inject in @/lang/index.js
  }
  return title;
}
