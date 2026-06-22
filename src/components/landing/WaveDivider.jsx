export default function WaveDivider({
  color = "#F5F0FF",
}) {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 120"
        className="w-full h-30"
        preserveAspectRatio="none"
      >
        <path
          fill={color}
          d="
            M0,64
            C120,96
            240,0
            360,32

            C480,64
            600,128
            720,96

            C840,64
            960,0
            1080,32

            C1200,64
            1320,96
            1440,64

            L1440,120
            L0,120
            Z
          "
        />
      </svg>
    </div>
  );
}