const routePaths = {
  auth: {
    base: "/auth",
    forgotPassword: "/auth/forgot-password",
    login: "/auth/login",
    register: "/auth/register",
    resetPassword: "/auth/reset-password"
  },
  home: "/",
  getHomePath: (domainId: string) => `/${domainId}`,
  dashboard: "/:domainId/dashboard",
  getDashboardPath: (domainId: string) => `/${domainId}/dashboard`,
  catalog: {
    base: "/:domainId/catalog",
    getBaseBath: (domainId: string) => `/${domainId}/catalog`,
    products: "/:domainId/catalog/products",
    getProductsListPath: (domainId: string) => `/${domainId}/catalog/products`,
    create: "/:domainId/catalog/create",
    getCreateProductPath: (domainId: string) => `/${domainId}/catalog/create`,
    product: "/:domainId/catalog/products/:productId",
    getProductPath: (domainId: string, productId: string) =>
      `/${domainId}/catalog/products/${productId}`
  },
  orders: {
    base: "/:domainId/orders",
    getBasePath: (domainId: string) => `/${domainId}/orders`,
    order: "/:domainId/orders/:orderId",
    getOrderPath: (domainId: string, orderId: string) =>
      `/${domainId}/orders/${orderId}`
  },
  settings: {
    base: "/:domainId/settings",
    getBaseBath: (domainId: string) => `/${domainId}/settings`
  },
  domains: {
    base: "/:domainId",
    stores: "/stores",
    create: "/create-store"
  }
};
export default routePaths;
