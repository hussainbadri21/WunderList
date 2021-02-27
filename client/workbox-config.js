module.exports = {
    globDirectory: "build/",
    globPatterns: ["**/*.{ico,png,html,txt,css,svg,eot,woff,ttf,woff2,gif}"],
    globIgnores: ["**/*.js", "build/static/js/**/*"],
    swDest: "build/service-worker.js",
};
