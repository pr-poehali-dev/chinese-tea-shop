import Icon from "@/components/ui/icon";

export const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <style>
      .gold { fill: #C9A961; }
      .gold-stroke { fill: none; stroke: #C9A961; stroke-width: 2; }
      .gold-stroke-thin { fill: none; stroke: #C9A961; stroke-width: 1; opacity: 0.5; }
      .cream { fill: #F5EFE0; }
      .title { font-family: 'Cormorant Garamond', 'Times New Roman', serif; font-weight: 300; }
      .subtitle { font-family: 'Montserrat', sans-serif; font-weight: 400; letter-spacing: 6px; }
    </style>
  </defs>

  <!-- Эмблема: круг с иероглифом луны -->
  <g transform="translate(300, 130)">
    <!-- Внешний круг -->
    <circle r="80" class="gold-stroke" stroke-width="2.5"/>
    <!-- Внутренний круг -->
    <circle r="72" class="gold-stroke-thin"/>
    <!-- Декоративные точки -->
    <circle cx="0" cy="-80" r="3" class="gold"/>
    <circle cx="0" cy="80" r="3" class="gold"/>
    <circle cx="-80" cy="0" r="3" class="gold"/>
    <circle cx="80" cy="0" r="3" class="gold"/>
    <!-- Иероглиф 月 (луна) -->
    <text x="0" y="22" text-anchor="middle" class="gold title" font-size="90">月</text>
  </g>

  <!-- Название -->
  <text x="300" y="270" text-anchor="middle" class="cream title" font-size="58" letter-spacing="2">Лунный Чай</text>

  <!-- Разделитель -->
  <line x1="270" y1="295" x2="330" y2="295" class="gold-stroke" stroke-width="1.5"/>

  <!-- Подпись -->
  <text x="300" y="325" text-anchor="middle" class="gold subtitle" font-size="11">ПРЕМИУМ · С 2019</text>

  <!-- Декоративные элементы по бокам -->
  <g class="gold" opacity="0.6">
    <text x="120" y="270" text-anchor="middle" class="title" font-size="32">茶</text>
    <text x="480" y="270" text-anchor="middle" class="title" font-size="32">道</text>
  </g>
</svg>`;

const BigLogo = () => {
  const handleDownload = (format: "svg" | "png") => {
    if (format === "svg") {
      const blob = new Blob([LOGO_SVG], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "lunnyi-chai-logo.svg";
      link.click();
      URL.revokeObjectURL(url);
    } else {
      const img = new Image();
      const svgBlob = new Blob([LOGO_SVG], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 800;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "#1C1610";
        ctx.fillRect(0, 0, 1200, 800);
        ctx.drawImage(img, 0, 0, 1200, 800);
        canvas.toBlob((blob) => {
          if (!blob) return;
          const pngUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = pngUrl;
          link.download = "lunnyi-chai-logo.png";
          link.click();
          URL.revokeObjectURL(pngUrl);
        }, "image/png");
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-tea-dark border-t border-gold/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center select-none pointer-events-none">
        <span className="text-[28rem] font-display text-gold leading-none">月</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">Брендбук</p>
        <h2 className="font-display text-3xl sm:text-4xl font-light text-cream mb-3">Наш логотип</h2>
        <div className="w-12 h-px bg-gold mx-auto mb-12" />

        <div
          className="bg-tea-dark border border-gold/30 p-8 sm:p-12 mb-8 mx-auto"
          dangerouslySetInnerHTML={{ __html: LOGO_SVG.replace('width="600" height="400"', 'width="100%" height="auto" style="max-width:600px;display:block;margin:0 auto;"') }}
        />

        <p className="font-body text-xs text-cream/50 max-w-md mx-auto mb-8 leading-relaxed">
          Скачайте логотип в векторном формате SVG — он сохранит идеальное качество при любом размере.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => handleDownload("svg")}
            className="group flex items-center gap-2 bg-gold text-tea-dark px-7 py-3 hover:bg-gold/90 transition-all"
          >
            <Icon name="Download" size={16} />
            <span className="font-body text-xs tracking-[0.2em] uppercase">Скачать SVG</span>
          </button>
          <button
            onClick={() => handleDownload("png")}
            className="group flex items-center gap-2 border border-gold text-gold px-7 py-3 hover:bg-gold hover:text-tea-dark transition-all"
          >
            <Icon name="Image" size={16} />
            <span className="font-body text-xs tracking-[0.2em] uppercase">Скачать PNG</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto">
          <div className="text-center">
            <p className="font-display text-2xl text-gold">SVG</p>
            <p className="font-body text-[9px] tracking-widest uppercase text-cream/40 mt-1">Вектор</p>
          </div>
          <div className="text-center border-x border-gold/15">
            <p className="font-display text-2xl text-gold">∞</p>
            <p className="font-body text-[9px] tracking-widest uppercase text-cream/40 mt-1">Масштаб</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl text-gold">PNG</p>
            <p className="font-body text-[9px] tracking-widest uppercase text-cream/40 mt-1">1200px</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigLogo;
