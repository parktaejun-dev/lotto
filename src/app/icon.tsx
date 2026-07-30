import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #fef08a 0%, #f59e0b 50%, #b45309 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
            border: "1px solid #fef08a",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a",
              fontSize: "11px",
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
