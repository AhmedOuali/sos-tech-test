module.exports = process.env.NODE_ENV === "production" ? {
  FRONT_URL: "https://app.res2menu.com",
  END_POINT_WS_URL: "https://api.res2menu.com",
  SITEMAP: {
    INDEX: "/",
    LOGIN: "/login",
    HOME: "/"
  }
} : {
  FRONT_URL: "http://localhost:3000",
  END_POINT_WS_URL: "http://localhost:3001",
  SITEMAP: {
    INDEX: "/",
    LOGIN: "/login",
    HOME: "/"
  }
}
