import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "로또 6/45 가상 추첨 시뮬레이터",
    short_name: "로또 시뮬레이터",
    description: "동행복권 로또 6/45 실제 확률 기반 가상 추첨 시뮬레이터. 1등 당첨될 때까지 탕진 체험 및 수익률 현실 점검",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
