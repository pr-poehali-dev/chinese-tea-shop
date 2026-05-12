import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Tea {
  id: number;
  name: string;
  origin: string;
  country: string;
  year: string;
  price: number;
  weight: string;
  tag: string;
  effects: string[];
  description: string;
  img: string | null;
}

interface Props {
  tea: Tea | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (id: number, qty: number, weight: number) => void;
  allTeas: Tea[];
  onOpenTea: (id: number) => void;
}

const TEA_EMOJI: Record<string, string> = {
  Пуэр: "🍂", ГАБА: "🌙", Улун: "🔥", Белый: "🌸", Красный: "✨", Зелёный: "🌿", Тёмный: "🪨"
};

const WEIGHTS = [
  { g: 50, mult: 1 },
  { g: 100, mult: 1.9 },
  { g: 200, mult: 3.6 },
];

const BREWING_PRESETS: Record<string, { temp: string; time: string; rounds: string; method: string; ratio: string }> = {
  Пуэр:    { temp: "95–100°C", time: "10–30 сек", rounds: "8–12 заварок", method: "Пролив (гун-фу)", ratio: "6 г / 150 мл" },
  Улун:    { temp: "90–95°C",  time: "20–40 сек", rounds: "6–10 заварок", method: "Пролив (гун-фу)", ratio: "5 г / 150 мл" },
  ГАБА:    { temp: "85–90°C",  time: "30–60 сек", rounds: "5–8 заварок",  method: "Пролив (гун-фу)", ratio: "5 г / 150 мл" },
  Белый:   { temp: "75–85°C",  time: "2–4 мин",   rounds: "3–5 заварок",  method: "Прямая заварка", ratio: "3 г / 200 мл" },
  Красный: { temp: "90–95°C",  time: "2–3 мин",   rounds: "3–5 заварок",  method: "Прямая заварка", ratio: "4 г / 200 мл" },
  Зелёный: { temp: "75–80°C",  time: "1–2 мин",   rounds: "2–4 заварки",  method: "Прямая заварка", ratio: "3 г / 200 мл" },
  Тёмный:  { temp: "95–100°C", time: "20–40 сек", rounds: "6–10 заварок", method: "Пролив (гун-фу)", ratio: "5 г / 150 мл" },
};

const TASTE_NOTES: Record<string, string[]> = {
  Пуэр:    ["Чернослив", "Дерево", "Земля", "Орех", "Кора", "Сладость"],
  Улун:    ["Орхидея", "Мёд", "Карамель", "Минеральность", "Фрукты", "Сливки"],
  ГАБА:    ["Карамель", "Сухофрукты", "Мёд", "Ваниль", "Слива", "Тёплая древесина"],
  Белый:   ["Пион", "Мёд", "Свежесть", "Молодая зелень", "Луговые травы"],
  Красный: ["Шоколад", "Мёд", "Солод", "Какао", "Изюм", "Печёное яблоко"],
  Зелёный: ["Свежесть", "Морская волна", "Орех", "Сладкая трава", "Шпинат"],
  Тёмный:  ["Сухие листья", "Орех", "Дерево", "Грибы", "Кожа", "Дым"],
};

const REVIEWS_DB: Record<number, { name: string; rating: number; date: string; text: string }[]> = {
  1: [
    { name: "Дмитрий К.", rating: 5, date: "12 апреля 2024", text: "Великолепный пуэр! Глубокий, насыщенный, с долгим послевкусием. Каждый пролив раскрывает новые ноты. Заказывал уже трижды." },
    { name: "Анна М.",    rating: 5, date: "3 марта 2024",   text: "Подарили мужу на годовщину — он чайный гурман. Был в восторге, теперь это наш фаворит." },
    { name: "Игорь С.",   rating: 4, date: "20 февраля 2024", text: "Достойный шу пуэр. Землистый, мягкий. Для меня немного слабее, чем ожидал, но в целом отличный чай." },
  ],
};

const DEFAULT_REVIEWS = [
  { name: "Елена В.", rating: 5, date: "15 апреля 2024", text: "Прекрасный чай! Аромат, вкус — всё на высоте. Очень довольна заказом." },
  { name: "Михаил Р.", rating: 5, date: "2 апреля 2024", text: "Великолепное качество. Чай свежий, упаковка добротная. Рекомендую!" },
];

export default function TeaDetail({ tea, open, onClose, onAddToCart, allTeas, onOpenTea }: Props) {
  const [weightIdx, setWeightIdx] = useState(1);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"about" | "brewing" | "reviews">("about");

  useEffect(() => {
    if (tea) {
      setWeightIdx(1);
      setQty(1);
      setTab("about");
    }
  }, [tea?.id]);

  if (!open || !tea) return null;

  const brewing = BREWING_PRESETS[tea.tag] ?? BREWING_PRESETS.Улун;
  const notes = TASTE_NOTES[tea.tag] ?? [];
  const reviews = REVIEWS_DB[tea.id] ?? DEFAULT_REVIEWS;
  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  const selectedWeight = WEIGHTS[weightIdx];
  const finalPrice = Math.round(tea.price * selectedWeight.mult);
  const totalPrice = finalPrice * qty;

  const similarTeas = allTeas.filter(t => t.tag === tea.tag && t.id !== tea.id).slice(0, 3);

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: 920, width: "95%" }}>

        {/* Шапка */}
        <div className="bg-tea-dark px-5 py-4 flex items-center justify-between sticky top-0 z-10">
          <p className="font-display text-xl text-cream truncate pr-3">{tea.name}</p>
          <button onClick={onClose} className="text-cream/50 hover:text-cream transition-colors shrink-0">
            <Icon name="X" size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Фото */}
          <div className="relative bg-gradient-to-br from-tea-mid to-tea-dark md:min-h-[520px] flex items-center justify-center overflow-hidden">
            {tea.img ? (
              <img src={tea.img} alt={tea.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[10rem] opacity-25">{TEA_EMOJI[tea.tag] ?? "🍵"}</span>
            )}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-gold text-cream text-[10px] tracking-widest uppercase px-3 py-1 font-body">{tea.tag}</span>
              <span className="border border-cream/30 text-cream text-[10px] tracking-wider uppercase px-3 py-1 font-body bg-tea-dark/40 backdrop-blur-sm">
                Урожай {tea.year}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-tea-dark/60 backdrop-blur-sm border border-gold/20 px-4 py-3">
              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => (
                  <Icon
                    key={i}
                    name="Star"
                    size={11}
                    className={i <= Math.round(avgRating) ? "text-gold" : "text-cream/20"}
                  />
                ))}
                <span className="font-body text-[10px] text-cream/70 ml-1.5">{avgRating.toFixed(1)} · {reviews.length} отзывов</span>
              </div>
              <p className="font-body text-[10px] text-gold tracking-widest uppercase">{tea.origin}</p>
            </div>
          </div>

          {/* Информация */}
          <div className="p-5 sm:p-6 bg-cream">
            <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold mb-2">{tea.country}</p>
            <h2 className="font-display text-3xl text-tea-dark leading-tight mb-3">{tea.name}</h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">{tea.description}</p>

            {/* Эффекты */}
            <div className="flex flex-wrap gap-2 mb-5">
              {tea.effects.map(ef => (
                <span key={ef} className="font-body text-[10px] text-gold border border-gold/40 px-2.5 py-1 tracking-wider uppercase">
                  {ef}
                </span>
              ))}
            </div>

            {/* Выбор веса */}
            <div className="mb-4">
              <p className="font-body text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-2">Объём упаковки</p>
              <div className="grid grid-cols-3 gap-2">
                {WEIGHTS.map((w, i) => (
                  <button
                    key={w.g}
                    onClick={() => setWeightIdx(i)}
                    className={`quiz-option py-2.5 text-center ${weightIdx === i ? "active" : ""}`}
                  >
                    <p className="font-display text-lg text-tea-dark leading-none">{w.g} г</p>
                    <p className="font-body text-[9px] text-muted-foreground mt-1">
                      {Math.round(tea.price * w.mult).toLocaleString()} ₽
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Количество и цена */}
            <div className="flex items-center justify-between gap-4 mb-5 pb-5 border-b border-gold/15">
              <div className="flex items-center border border-gold/30">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 flex items-center justify-center text-tea-dark hover:bg-gold/10 transition-colors"
                >
                  <Icon name="Minus" size={12} />
                </button>
                <span className="w-9 h-9 flex items-center justify-center font-display text-lg text-tea-dark">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 flex items-center justify-center text-tea-dark hover:bg-gold/10 transition-colors"
                >
                  <Icon name="Plus" size={12} />
                </button>
              </div>
              <div className="text-right">
                <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">Итого</p>
                <p className="font-display text-3xl text-tea-dark leading-none">{totalPrice.toLocaleString()} ₽</p>
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={() => onAddToCart(tea.id, qty, selectedWeight.g)}
                className="btn-gold btn-glow flex-1 py-3 flex items-center justify-center gap-2"
              >
                <Icon name="ShoppingBag" size={13} />
                В корзину
              </button>
              <button className="btn-outline-gold btn-glow px-4 py-3" title="В избранное">
                <Icon name="Heart" size={14} />
              </button>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Truck" size={13} className="text-gold" />
              <p className="font-body text-[11px]">Бесплатная доставка от 5 000 ₽</p>
            </div>
          </div>
        </div>

        {/* Табы внизу */}
        <div className="border-t border-gold/15">
          <div className="flex overflow-x-auto">
            {[
              { key: "about", label: "Описание" },
              { key: "brewing", label: "Заварка" },
              { key: "reviews", label: `Отзывы (${reviews.length})` },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as typeof tab)}
                className={`tab-btn whitespace-nowrap ${tab === t.key ? "active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-6">
            {/* Описание */}
            {tab === "about" && (
              <div className="space-y-5">
                <div>
                  <h3 className="font-display text-2xl text-tea-dark mb-3">Вкусовые ноты</h3>
                  <div className="flex flex-wrap gap-2">
                    {notes.map(n => (
                      <span key={n} className="font-body text-xs bg-gold/10 text-tea-dark border border-gold/20 px-3 py-1.5">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl text-tea-dark mb-3">Характеристики</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                    {[
                      ["Тип", tea.tag],
                      ["Страна", tea.country],
                      ["Регион", tea.origin],
                      ["Урожай", tea.year + " года"],
                      ["Упаковка", `${selectedWeight.g} г`],
                      ["Цена за 50 г", `${tea.price.toLocaleString()} ₽`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-baseline border-b border-dashed border-gold/15 pb-1.5">
                        <span className="font-body text-[11px] text-muted-foreground">{k}</span>
                        <span className="font-body text-xs text-tea-dark text-right">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Заварка */}
            {tab === "brewing" && (
              <div>
                <h3 className="font-display text-2xl text-tea-dark mb-4">Способ заварки</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                  {[
                    { icon: "Thermometer", label: "Температура", value: brewing.temp },
                    { icon: "Clock", label: "Время", value: brewing.time },
                    { icon: "RotateCw", label: "Заварок", value: brewing.rounds },
                    { icon: "Beaker", label: "Метод", value: brewing.method },
                    { icon: "Scale", label: "Пропорция", value: brewing.ratio },
                    { icon: "Droplet", label: "Вода", value: "Мягкая, фильтрованная" },
                  ].map((b, i) => (
                    <div key={i} className="border border-gold/20 bg-white p-3">
                      <Icon name={b.icon} size={14} className="text-gold mb-2" />
                      <p className="font-body text-[9px] tracking-widest uppercase text-muted-foreground mb-1">{b.label}</p>
                      <p className="font-display text-sm text-tea-dark leading-tight">{b.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-gold/5 border border-gold/20 p-4">
                  <p className="font-body text-[10px] tracking-widest uppercase text-gold mb-2">Совет мастера</p>
                  <p className="font-body text-xs text-tea-dark leading-relaxed">
                    Первую заварку слейте после 5 секунд — она «пробуждает» лист. Вкус полностью раскроется со 2–3 пролива.
                    Не передерживайте чай: горячая вода вытягивает терпкость.
                  </p>
                </div>
              </div>
            )}

            {/* Отзывы */}
            {tab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display text-4xl text-tea-dark leading-none">{avgRating.toFixed(1)}</span>
                      <div>
                        {[1,2,3,4,5].map(i => (
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            className={`inline ${i <= Math.round(avgRating) ? "text-gold" : "text-border"}`}
                          />
                        ))}
                        <p className="font-body text-[10px] text-muted-foreground">{reviews.length} отзывов</p>
                      </div>
                    </div>
                  </div>
                  <button className="btn-outline-gold btn-glow px-4 py-2 text-[10px]">
                    Оставить отзыв
                  </button>
                </div>

                <div className="space-y-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="border-b border-gold/10 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="avatar-gold" style={{ width: 36, height: 36, fontSize: "1rem" }}>{r.name[0]}</div>
                          <div>
                            <p className="font-body text-sm text-tea-dark font-medium">{r.name}</p>
                            <p className="font-body text-[10px] text-muted-foreground">{r.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => (
                            <Icon
                              key={i}
                              name="Star"
                              size={10}
                              className={i <= r.rating ? "text-gold" : "text-border"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Похожие товары */}
        {similarTeas.length > 0 && (
          <div className="border-t border-gold/15 p-5 sm:p-6 bg-pattern">
            <h3 className="font-display text-2xl text-tea-dark mb-4">Похожие чаи</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {similarTeas.map(s => (
                <button
                  key={s.id}
                  onClick={() => onOpenTea(s.id)}
                  className="text-left tea-card card-hover group"
                >
                  <div className="relative h-28 bg-gradient-to-br from-tea-mid to-tea-dark flex items-center justify-center overflow-hidden">
                    {s.img ? (
                      <img src={s.img} alt={s.name} className="tea-img" />
                    ) : (
                      <span className="text-4xl opacity-30">{TEA_EMOJI[s.tag]}</span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-display text-base text-tea-dark leading-tight mb-1">{s.name}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-body text-[10px] text-gold uppercase tracking-wider">{s.origin}</span>
                      <span className="font-display text-sm text-tea-dark">{s.price.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
