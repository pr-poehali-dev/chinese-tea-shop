import { useState } from "react";
import Icon from "@/components/ui/icon";

export interface FilterState {
  types: string[];
  countries: string[];
  effects: string[];
  priceMin: number;
  priceMax: number;
  search: string;
  sort: string;
}

interface Props {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  open: boolean;
  onClose: () => void;
  resultCount: number;
  types: string[];
  countries: string[];
  effects: string[];
  priceLimit: { min: number; max: number };
}

const SORT_OPTIONS = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Сначала дешевле" },
  { value: "price_desc", label: "Сначала дороже" },
  { value: "name", label: "По названию" },
  { value: "year", label: "По году урожая" },
];

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gold/15 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between font-body text-[10px] tracking-[0.18em] uppercase text-tea-dark hover:text-gold transition-colors mb-3"
      >
        {title}
        <Icon name={open ? "Minus" : "Plus"} size={12} className="text-gold" />
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

function Checkbox({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count?: number }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <div className="flex items-center gap-2.5">
        <span
          className={`w-4 h-4 border flex items-center justify-center transition-all ${
            checked ? "bg-gold border-gold" : "border-gold/40 group-hover:border-gold"
          }`}
        >
          {checked && <Icon name="Check" size={10} className="text-cream" />}
        </span>
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
        <span className={`font-body text-xs ${checked ? "text-tea-dark" : "text-muted-foreground group-hover:text-tea-dark"}`}>
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="font-body text-[10px] text-muted-foreground/60">{count}</span>
      )}
    </label>
  );
}

export default function CatalogFilters({
  filters,
  setFilters,
  open,
  onClose,
  resultCount,
  types,
  countries,
  effects,
  priceLimit,
}: Props) {
  const toggleArray = (key: "types" | "countries" | "effects", val: string) => {
    const arr = filters[key];
    setFilters({
      ...filters,
      [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val],
    });
  };

  const reset = () => {
    setFilters({
      types: [], countries: [], effects: [],
      priceMin: priceLimit.min, priceMax: priceLimit.max,
      search: "", sort: "popular",
    });
  };

  const activeCount =
    filters.types.length +
    filters.countries.length +
    filters.effects.length +
    (filters.search ? 1 : 0) +
    (filters.priceMin > priceLimit.min || filters.priceMax < priceLimit.max ? 1 : 0);

  return (
    <>
      {/* Десктоп: статичная панель */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20">
          <FiltersContent />
        </div>
      </aside>

      {/* Мобайл/планшет: оверлей */}
      {open && (
        <div className="fixed inset-0 z-[150] lg:hidden" onClick={onClose}>
          <div className="absolute inset-0 bg-tea-dark/60 backdrop-blur-sm" />
          <div
            onClick={e => e.stopPropagation()}
            className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-cream overflow-y-auto"
            style={{ animation: "slide-in-left 0.3s ease" }}
          >
            <div className="sticky top-0 bg-cream border-b border-gold/20 px-4 py-4 flex items-center justify-between z-10">
              <span className="font-display text-2xl text-tea-dark">Фильтры</span>
              <button onClick={onClose} className="text-tea-dark/60 hover:text-gold transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-4">
              <FiltersContent />
              <button
                onClick={onClose}
                className="btn-gold btn-glow w-full py-3 mt-4"
              >
                Показать {resultCount} {resultCount === 1 ? "товар" : resultCount < 5 ? "товара" : "товаров"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  function FiltersContent() {
    return (
      <div>
        {/* Поиск */}
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              placeholder="Поиск..."
              className="form-input pl-9 text-xs py-2"
            />
          </div>
        </div>

        {/* Сортировка */}
        <div className="mb-4">
          <label className="font-body text-[9px] tracking-[0.18em] uppercase text-muted-foreground block mb-2">Сортировка</label>
          <select
            value={filters.sort}
            onChange={e => setFilters({ ...filters, sort: e.target.value })}
            className="form-input text-xs py-2 cursor-pointer"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Активные фильтры */}
        {activeCount > 0 && (
          <div className="mb-4 p-3 bg-gold/5 border border-gold/15">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-[10px] tracking-widest uppercase text-gold">
                Активно: {activeCount}
              </span>
              <button
                onClick={reset}
                className="font-body text-[10px] text-tea-dark hover:text-gold transition-colors flex items-center gap-1"
              >
                <Icon name="X" size={10} />
                Сбросить
              </button>
            </div>
          </div>
        )}

        {/* Тип чая */}
        <Section title="Тип чая">
          {types.map(t => (
            <Checkbox
              key={t}
              checked={filters.types.includes(t)}
              onChange={() => toggleArray("types", t)}
              label={t}
            />
          ))}
        </Section>

        {/* Страна */}
        <Section title="Происхождение">
          {countries.map(c => (
            <Checkbox
              key={c}
              checked={filters.countries.includes(c)}
              onChange={() => toggleArray("countries", c)}
              label={c}
            />
          ))}
        </Section>

        {/* Эффект */}
        <Section title="Эффект" defaultOpen={false}>
          {effects.map(ef => (
            <Checkbox
              key={ef}
              checked={filters.effects.includes(ef)}
              onChange={() => toggleArray("effects", ef)}
              label={ef}
            />
          ))}
        </Section>

        {/* Цена */}
        <Section title="Цена, ₽">
          <div className="px-1 pt-2">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="number"
                value={filters.priceMin}
                min={priceLimit.min}
                max={filters.priceMax}
                onChange={e => setFilters({ ...filters, priceMin: Number(e.target.value) || priceLimit.min })}
                className="form-input text-xs py-1.5 w-full"
              />
              <span className="text-muted-foreground">—</span>
              <input
                type="number"
                value={filters.priceMax}
                min={filters.priceMin}
                max={priceLimit.max}
                onChange={e => setFilters({ ...filters, priceMax: Number(e.target.value) || priceLimit.max })}
                className="form-input text-xs py-1.5 w-full"
              />
            </div>
            <div className="relative h-1 bg-gold/15 rounded-full">
              <div
                className="absolute h-full bg-gold rounded-full"
                style={{
                  left: `${((filters.priceMin - priceLimit.min) / (priceLimit.max - priceLimit.min)) * 100}%`,
                  width: `${((filters.priceMax - filters.priceMin) / (priceLimit.max - priceLimit.min)) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-muted-foreground/60 font-body">
              <span>{priceLimit.min} ₽</span>
              <span>{priceLimit.max} ₽</span>
            </div>
          </div>
        </Section>
      </div>
    );
  }
}
