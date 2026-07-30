import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
          borderRadius: "36px",
        }}
      >
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #b45309 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            border: "4px solid #fef08a",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a",
              fontSize: "52px",
              fontWeight: 900,
              fontFamily: "sans-serif",
            }}
          >
            7
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
