import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070B16",
        panel: "rgba(12, 18, 34, 0.72)",
        line: "rgba(148, 163, 184, 0.2)",
        cyanGlow: "#22D3EE",
        violetGlow: "#8B5CF6",
        silver: "#E2E8F0"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(34, 211, 238, 0.16)",
        card: "0 18px 60px rgba(0, 0, 0, 0.32)"
      },
      backgroundImage: {
        "radial-showroom":
          "radial-gradient(circle at 20% 0%, rgba(34, 211, 238, 0.22), transparent 30%), radial-gradient(circle at 80% 15%, rgba(139, 92, 246, 0.2), transparent 32%), linear-gradient(135deg, #050816 0%, #08111F 48%, #030712 100%)"
      }
    }
  },
  plugins: []
};

export default config;
