module.exports = {
  apps: [{
    name: "vidibot",
    script: "./src/index.js",  // Adjust this to your main bot entry point
    watch: true,
    ignore_watch: ["node_modules", "logs"],
    env: {
      NODE_ENV: "production"
    },
    log_file: "combined.log",
    error_file: "error.log",
    out_file: "out.log",
    max_memory_restart: "500M"
  }]
};