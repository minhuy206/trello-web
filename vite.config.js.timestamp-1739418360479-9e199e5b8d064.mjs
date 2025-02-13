// vite.config.js
import { defineConfig } from "file:///Users/minhuy/Library/Mobile%20Documents/com~apple~CloudDocs/Project/trello-web/node_modules/vite/dist/node/index.js";
import react from "file:///Users/minhuy/Library/Mobile%20Documents/com~apple~CloudDocs/Project/trello-web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///Users/minhuy/Library/Mobile%20Documents/com~apple~CloudDocs/Project/trello-web/node_modules/vite-plugin-svgr/dist/index.js";
var vite_config_default = defineConfig({
  define: {
    "process.env": process.env
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: "~", replacement: "/src" }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWluaHV5L0xpYnJhcnkvTW9iaWxlIERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL1Byb2plY3QvdHJlbGxvLXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21pbmh1eS9MaWJyYXJ5L01vYmlsZSBEb2N1bWVudHMvY29tfmFwcGxlfkNsb3VkRG9jcy9Qcm9qZWN0L3RyZWxsby13ZWIvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21pbmh1eS9MaWJyYXJ5L01vYmlsZSUyMERvY3VtZW50cy9jb21+YXBwbGV+Q2xvdWREb2NzL1Byb2plY3QvdHJlbGxvLXdlYi92aXRlLmNvbmZpZy5qc1wiOy8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3ZncidcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBkZWZpbmU6IHtcbiAgICAncHJvY2Vzcy5lbnYnOiBwcm9jZXNzLmVudlxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKSwgc3ZncigpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbeyBmaW5kOiAnficsIHJlcGxhY2VtZW50OiAnL3NyYycgfV1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBR2pCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLGVBQWUsUUFBUTtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQ3pCLFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxhQUFhLE9BQU8sQ0FBQztBQUFBLEVBQzVDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
