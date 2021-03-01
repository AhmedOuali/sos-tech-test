module.exports = process.env.NODE_ENV === "production" ? {
  FRONT_URL: "http://app.aos.res2menu.online",
  END_POINT_WS_URL: "http://api.aos.res2menu.online",
  SITEMAP: {
    INDEX: "/",
    LOGIN: "/login",
    HOME: "/"
  }
} : {
  FRONT_URL: "http://app.aos.res2menu.online",
  END_POINT_WS_URL: "http://api.aos.res2menu.online",
  SITEMAP: {
    INDEX: "/",
    LOGIN: "/login",
    HOME: "/"
  }
}
