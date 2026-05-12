import Icon from "@/components/ui/icon";

export const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <defs>
    <style>
      .gold { fill: #C9A961; }
      .gold-stroke { fill: none; stroke: #C9A961; stroke-width: 2.5; }
      .gold-stroke-thin { fill: none; stroke: #C9A961; stroke-width: 1; opacity: 0.5; }
      .title { font-family: 'Cormorant Garamond', 'Times New Roman', serif; font-weight: 300; }
    </style>
  </defs>

  <g transform="translate(150, 150)">
    <circle r="120" class="gold-stroke"/>
    <circle r="108" class="gold-stroke-thin"/>
    <circle cx="0" cy="-120" r="4" class="gold"/>
    <circle cx="0" cy="120" r="4" class="gold"/>
    <circle cx="-120" cy="0" r="4" class="gold"/>
    <circle cx="120" cy="0" r="4" class="gold"/>
    <text x="0" y="35" text-anchor="middle" class="gold title" font-size="140">月</text>
  </g>
</svg>`;

export const SWIRL_LOGO_COLOR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <defs>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4FB3E8"/>
      <stop offset="100%" stop-color="#1E3FB8"/>
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A8E84F"/>
      <stop offset="100%" stop-color="#3FB81E"/>
    </linearGradient>
  </defs>

  <g transform="translate(150, 150)">
    <path d="M 0,-110 A 110,110 0 0,1 0,110 A 55,55 0 0,1 0,0 A 55,55 0 0,0 0,-110 Z" fill="url(#blueGrad)"/>
    <path d="M 0,110 A 110,110 0 0,1 0,-110 A 55,55 0 0,1 0,0 A 55,55 0 0,0 0,110 Z" fill="url(#greenGrad)"/>
    <circle cx="0" cy="-55" r="14" fill="url(#greenGrad)"/>
    <circle cx="0" cy="55" r="14" fill="url(#blueGrad)"/>
    <circle r="110" fill="none" stroke="#1E3FB8" stroke-width="2" opacity="0.4"/>
  </g>
</svg>`;

export const SWIRL_LOGO_MONO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
  <g transform="translate(150, 150)">
    <path d="M 0,-110 A 110,110 0 0,1 0,110 A 55,55 0 0,1 0,0 A 55,55 0 0,0 0,-110 Z" fill="#1C1610"/>
    <path d="M 0,110 A 110,110 0 0,1 0,-110 A 55,55 0 0,1 0,0 A 55,55 0 0,0 0,110 Z" fill="none" stroke="#1C1610" stroke-width="3"/>
    <circle cx="0" cy="-55" r="14" fill="none" stroke="#1C1610" stroke-width="3"/>
    <circle cx="0" cy="55" r="14" fill="#1C1610"/>
    <circle r="110" fill="none" stroke="#1C1610" stroke-width="2"/>
  </g>
</svg>`;

const downloadSvg = (svg: string, name: string) => {
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}.svg`;
  link.click();
  URL.revokeObjectURL(url);
};

const downloadPng = (svg: string, name: string, bg?: string) => {
  const img = new Image();
  const svgBlob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svgBlob);
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (bg) {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 1200, 1200);
    }
    ctx.drawImage(img, 0, 0, 1200, 1200);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const pngUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${name}.png`;
      link.click();
      URL.revokeObjectURL(pngUrl);
    }, "image/png");
    URL.revokeObjectURL(url);
  };
  img.src = url;
};

type LogoCardProps = {
  title: string;
  subtitle: string;
  svg: string;
  fileName: string;
  bgClass: string;
  pngBg?: string;
};

const LogoCard = ({ title, subtitle, svg, fileName, bgClass, pngBg }: LogoCardProps) => (
  <div className="flex flex-col">
    <div className={`${bgClass} border border-gold/20 p-8 sm:p-10 flex items-center justify-center aspect-square mb-5`}>
      <div
        className="w-full max-w-[260px]"
        dangerouslySetInnerHTML={{
          __html: svg.replace('width="300" height="300"', 'width="100%" height="auto"'),
        }}
      />
    </div>

    <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-1.5 text-center">{subtitle}</p>
    <h3 className="font-display text-xl text-cream mb-4 text-center">{title}</h3>

    <div className="flex gap-2 justify-center">
      <button
        onClick={() => downloadSvg(svg, fileName)}
        className="flex items-center gap-1.5 bg-gold text-tea-dark px-4 py-2 hover:bg-gold/90 transition-all"
      >
        <Icon name="Download" size={13} />
        <span className="font-body text-[10px] tracking-[0.2em] uppercase">SVG</span>
      </button>
      <button
        onClick={() => downloadPng(svg, fileName, pngBg)}
        className="flex items-center gap-1.5 border border-gold text-gold px-4 py-2 hover:bg-gold hover:text-tea-dark transition-all"
      >
        <Icon name="Image" size={13} />
        <span className="font-body text-[10px] tracking-[0.2em] uppercase">PNG</span>
      </button>
    </div>
  </div>
);

const BigLogo = () => {
  return (
    <section className="py-20 sm:py-28 bg-tea-dark border-t border-gold/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center select-none pointer-events-none">
        <span className="text-[28rem] font-display text-gold leading-none">月</span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">Брендбук</p>
          <h2 className="font-display text-3xl sm:text-4xl font-light text-cream mb-3">Логотипы</h2>
          <div className="w-12 h-px bg-gold mx-auto mb-5" />
          <p className="font-body text-xs text-cream/50 max-w-md mx-auto leading-relaxed">
            Скачайте логотипы в векторном формате SVG — идеальное качество при любом размере
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <LogoCard
            title="Эмблема «月»"
            subtitle="Основной"
            svg={LOGO_SVG}
            fileName="lunnyi-chai-emblem"
            bgClass="bg-tea-dark"
            pngBg="#1C1610"
          />
          <LogoCard
            title="Цветной знак"
            subtitle="С градиентом"
            svg={SWIRL_LOGO_COLOR}
            fileName="lunnyi-chai-swirl-color"
            bgClass="bg-cream"
          />
          <LogoCard
            title="Монохромный"
            subtitle="Чёрно-белый"
            svg={SWIRL_LOGO_MONO}
            fileName="lunnyi-chai-swirl-mono"
            bgClass="bg-cream"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mt-14 max-w-md mx-auto">
          <div className="text-center">
            <p className="font-display text-2xl text-gold">SVG</p>
            <p className="font-body text-[9px] tracking-widest uppercase text-cream/40 mt-1">Вектор</p>
          </div>
          <div className="text-center border-x border-gold/15">
            <p className="font-display text-2xl text-gold">∞</p>
            <p className="font-body text-[9px] tracking-widest uppercase text-cream/40 mt-1">Масштаб</p>
          </div>
          <div className="text-center">
            <p className="font-display text-2xl text-gold">1200px</p>
            <p className="font-body text-[9px] tracking-widest uppercase text-cream/40 mt-1">PNG</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigLogo;
