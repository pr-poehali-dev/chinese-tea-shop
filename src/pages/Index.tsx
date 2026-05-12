import { useState, useRef, useEffect, useMemo } from "react";
import Icon from "@/components/ui/icon";
import TeaQuiz from "@/components/TeaQuiz";
import CatalogFilters, { FilterState } from "@/components/CatalogFilters";

const IMG = {
  hero: "https://cdn.poehali.dev/projects/2608d454-ee87-4107-a637-5c661ed75f9d/files/03046ac1-b07a-4e4d-af17-78c1d413f3b4.jpg",
  puer: "https://cdn.poehali.dev/projects/2608d454-ee87-4107-a637-5c661ed75f9d/files/099a1827-3fbf-494f-9dae-d1846e90cac8.jpg",
  gift: "https://cdn.poehali.dev/projects/2608d454-ee87-4107-a637-5c661ed75f9d/files/0277c2d0-edce-40da-bc2d-2a907cc411f2.jpg",
  gaba: "https://cdn.poehali.dev/projects/2608d454-ee87-4107-a637-5c661ed75f9d/files/7b6757d2-7f39-41aa-a73c-3624d17b34bc.jpg",
  white: "https://cdn.poehali.dev/projects/2608d454-ee87-4107-a637-5c661ed75f9d/files/0eede399-603a-4ce6-be32-81896917b3fb.jpg",
};

const teas = [
  { id: 1, name: "Шу Пуэр «Золотой Дворец»", origin: "Юньнань, Китай", country: "Китай", year: "2018", price: 2800, weight: "357 г", tag: "Пуэр", effects: ["Расслабление", "Пищеварение"], description: "Глубокий землистый вкус с нотами чернослива и дерева. Блин выдержан 6 лет в специальных хранилищах.", img: IMG.puer },
  { id: 2, name: "ГАБА Улун «Лунная Роса»", origin: "Тайвань", country: "Тайвань", year: "2024", price: 3400, weight: "100 г", tag: "ГАБА", effects: ["Спокойствие", "Сон"], description: "Ферментирован в азоте, богат ГАМК. Карамельный вкус с фруктовыми нотами и долгим послевкусием.", img: IMG.gaba },
  { id: 3, name: "Да Хун Пао «Утёс»", origin: "Уишань, Фуцзянь", country: "Китай", year: "2023", price: 4200, weight: "50 г", tag: "Улун", effects: ["Бодрость", "Концентрация"], description: "Легендарный красный халат. Сильная обжарка, минеральные тона скал, орхидеевый аромат.", img: null },
  { id: 4, name: "Белый Пион «Серебро»", origin: "Фуцзянь, Китай", country: "Китай", year: "2024", price: 1900, weight: "100 г", tag: "Белый", effects: ["Спокойствие", "Иммунитет"], description: "Молодые побеги, минимальная обработка. Цветочный аромат, медовая сладость, бархатистость.", img: IMG.white },
  { id: 5, name: "Дянь Хун «Золотые Спирали»", origin: "Юньнань, Китай", country: "Китай", year: "2024", price: 2200, weight: "100 г", tag: "Красный", effects: ["Бодрость", "Согревание"], description: "Красный чай из золотых почек. Шоколад, мёд, солод — роскошный утренний чай.", img: null },
  { id: 6, name: "Те Гуань Инь «Железная Богиня»", origin: "Аньси, Фуцзянь", country: "Китай", year: "2024", price: 1600, weight: "100 г", tag: "Улун", effects: ["Концентрация", "Спокойствие"], description: "Классический улун с цветочно-молочным ароматом. Раскрывается при многократных заварках.", img: null },
  { id: 7, name: "Шэн Пуэр «Горный туман»", origin: "Юньнань, Китай", country: "Китай", year: "2020", price: 3100, weight: "200 г", tag: "Пуэр", effects: ["Бодрость", "Концентрация"], description: "Сырой пуэр с высокогорных плантаций. Терпкость, зелень, долгое сладкое послевкусие.", img: null },
  { id: 8, name: "Чай Хуа «Жасминовая жемчужина»", origin: "Фуцзянь, Китай", country: "Китай", year: "2024", price: 980, weight: "100 г", tag: "Зелёный", effects: ["Спокойствие", "Иммунитет"], description: "Зелёный чай, ароматизированный живыми цветами жасмина. Свежесть, нежность, умиротворение.", img: null },
  { id: 9, name: "Ли Шань Улун «Ледяная вершина»", origin: "Тайвань, 2600м", country: "Тайвань", year: "2024", price: 5200, weight: "75 г", tag: "Улун", effects: ["Концентрация", "Бодрость"], description: "Высокогорный улун с молочным ароматом и медовой сладостью. Каждый лист — ручной сбор.", img: null },
  { id: 10, name: "Хэй Ча «Тёмная скала»", origin: "Хунань, Китай", country: "Китай", year: "2016", price: 2600, weight: "250 г", tag: "Тёмный", effects: ["Пищеварение", "Расслабление"], description: "Выдержанный хуаньский тёмный чай. Мягкий, древесный, с земляными нотами — для ценителей.", img: null },
  { id: 11, name: "Сян Пянь «Осенний листопад»", origin: "Анхой, Китай", country: "Китай", year: "2024", price: 1400, weight: "100 г", tag: "Красный", effects: ["Бодрость", "Согревание"], description: "Красный чай Кимун с уникальным «орхидейным» ароматом. Мягкий, без вяжущего привкуса.", img: null },
  { id: 12, name: "Лун Цзин «Колодец дракона»", origin: "Ханчжоу, Чжэцзян", country: "Китай", year: "2024", price: 2900, weight: "50 г", tag: "Зелёный", effects: ["Концентрация", "Иммунитет"], description: "Легендарный императорский зелёный чай. Плоские листья, ореховый аромат, светлый настой.", img: null },
];

const categories = ["Все", "Пуэр", "Улун", "ГАБА", "Белый", "Красный", "Зелёный", "Тёмный"];

const TEA_EMOJI: Record<string, string> = {
  Пуэр: "🍂", ГАБА: "🌙", Улун: "🔥", Белый: "🌸", Красный: "✨", Зелёный: "🌿", Тёмный: "🪨"
};

const benefits = [
  { icon: "Award", title: "Прямые поставки", text: "Работаем напрямую с плантациями Китая, Тайваня и Японии" },
  { icon: "Shield", title: "Гарантия качества", text: "Каждая партия проходит дегустацию и проверку сертификатов" },
  { icon: "Truck", title: "Бережная доставка", text: "Специальная упаковка для сохранения аромата при транспортировке" },
  { icon: "Users", title: "Экспертная помощь", text: "ИИ-консультант и живые чайные мастера готовы помочь с выбором" },
];

type ModalType = "account" | "callback" | "feedback" | "cart" | null;

interface User {
  name: string;
  email: string;
  orders: { id: string; date: string; items: string; total: number; status: string }[];
}

const DEMO_USER: User = {
  name: "Александр",
  email: "alex@example.com",
  orders: [
    { id: "#1042", date: "05.05.2024", items: "Шу Пуэр, Белый Пион", total: 4700, status: "Доставлен" },
    { id: "#1031", date: "18.04.2024", items: "Да Хун Пао «Утёс»", total: 4200, status: "Доставлен" },
    { id: "#1019", date: "02.04.2024", items: "Лун Цзин, ГАБА Улун", total: 6300, status: "Доставлен" },
  ],
};

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountTab, setAccountTab] = useState<"profile" | "orders" | "favourites">("profile");
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Добро пожаловать в «Лунный Чай»! Расскажите, какой вкус предпочитаете — и я подберу идеальный сорт для вас." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [callbackForm, setCallbackForm] = useState({ name: "", phone: "" });
  const [feedbackForm, setFeedbackForm] = useState({ name: "", contact: "", message: "" });
  const [callbackSent, setCallbackSent] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const PRICE_LIMIT = { min: 900, max: 5500 };
  const [filters, setFilters] = useState<FilterState>({
    types: [], countries: [], effects: [],
    priceMin: PRICE_LIMIT.min, priceMax: PRICE_LIMIT.max,
    search: "", sort: "popular",
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const closeModal = () => setModal(null);

  const addToCart = (id: number) => {
    setCartItems(prev => [...prev, id]);
    setCartCount(prev => prev + 1);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: msg }]);
    setTimeout(() => {
      const replies = [
        "Отличный вопрос! Для любителей глубоких вкусов я рекомендую наши выдержанные пуэры — они раскрываются с каждой заваркой.",
        "Если вы цените нежность и аромат, обратите внимание на Белый Пион или Лун Цзин. Лёгкие, цветочные, без горечи.",
        "ГАБА Улун — особый выбор: он успокаивает нервную систему и имеет мягкий карамельный вкус. Идеален вечером.",
        "Да Хун Пао — это легенда. Если вы готовы к сильному, насыщенному чаю с дымными нотами, он для вас.",
      ];
      setChatMessages(prev => [...prev, {
        role: "ai",
        text: replies[Math.floor(Math.random() * replies.length)]
      }]);
    }, 900);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setModal("account");
    setAccountTab("profile");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    closeModal();
  };

  const handleCallback = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSent(true);
    setTimeout(() => { setCallbackSent(false); closeModal(); }, 2500);
  };

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => { setFeedbackSent(false); closeModal(); }, 2500);
  };

  const allCountries = useMemo(() => Array.from(new Set(teas.map(t => t.country))), []);
  const allEffects = useMemo(() => Array.from(new Set(teas.flatMap(t => t.effects))), []);

  const filteredTeas = useMemo(() => {
    let result = teas;

    if (activeCategory !== "Все") result = result.filter(t => t.tag === activeCategory);
    if (filters.types.length) result = result.filter(t => filters.types.includes(t.tag));
    if (filters.countries.length) result = result.filter(t => filters.countries.includes(t.country));
    if (filters.effects.length) result = result.filter(t => t.effects.some(e => filters.effects.includes(e)));
    result = result.filter(t => t.price >= filters.priceMin && t.price <= filters.priceMax);
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.origin.toLowerCase().includes(q));
    }

    switch (filters.sort) {
      case "price_asc": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price_desc": result = [...result].sort((a, b) => b.price - a.price); break;
      case "name": result = [...result].sort((a, b) => a.name.localeCompare(b.name, "ru")); break;
      case "year": result = [...result].sort((a, b) => b.year.localeCompare(a.year)); break;
    }
    return result;
  }, [activeCategory, filters]);

  return (
    <div className="min-h-screen bg-cream font-body">

      {/* ═══ ШАПКА ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/96 backdrop-blur-sm border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Логотип */}
            <div className="flex flex-col leading-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <span className="font-display text-2xl font-light tracking-widest text-tea-dark">月茶</span>
              <span className="text-[9px] font-body tracking-[0.25em] uppercase text-gold mt-0.5">Лунный Чай</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#catalog" className="nav-link">Каталог</a>
              <button onClick={() => setQuizOpen(true)} className="nav-link flex items-center gap-1.5 text-gold hover:text-gold">
                <Icon name="Sparkles" size={11} />
                Подобрать чай
              </button>
              <a href="#gift" className="nav-link">Подарки</a>
              <a href="#about" className="nav-link">О нас</a>
              <a href="#delivery" className="nav-link">Доставка</a>
              <a href="#contact" className="nav-link">Контакты</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="nav-link hover:text-gold transition-colors">
                <Icon name="Search" size={16} />
              </button>

              {/* Личный кабинет */}
              <button
                className="nav-link flex items-center gap-1.5 hover:text-gold transition-colors btn-glow px-2 py-1"
                onClick={() => setModal(isLoggedIn ? "account" : "account")}
              >
                <Icon name={isLoggedIn ? "UserCheck" : "User"} size={16} className={isLoggedIn ? "text-gold" : ""} />
                <span className="hidden sm:inline text-[10px] tracking-widest uppercase">
                  {isLoggedIn ? DEMO_USER.name : "Войти"}
                </span>
              </button>

              {/* Корзина */}
              <button
                className="relative nav-link hover:text-gold transition-colors btn-glow px-2 py-1"
                onClick={() => setModal("cart")}
              >
                <Icon name="ShoppingBag" size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-1 w-4 h-4 bg-gold text-cream text-[9px] rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="md:hidden nav-link" onClick={() => setMenuOpen(!menuOpen)}>
                <Icon name={menuOpen ? "X" : "Menu"} size={18} />
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-cream border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
            <button
              onClick={() => { setQuizOpen(true); setMenuOpen(false); }}
              className="nav-link flex items-center gap-2 text-gold"
            >
              <Icon name="Sparkles" size={11} />
              Подобрать чай
            </button>
            {["Каталог", "Подарки", "О нас", "Доставка", "Контакты"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </div>
        )}
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.hero})` }} />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <p className="animate-fade-in-up delay-100 font-body text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
              Магазин редких чаёв
            </p>
            <h1 className="animate-fade-in-up delay-200 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-cream leading-none mb-6">
              Искусство<br />
              <em className="gold-shimmer not-italic">чайного</em><br />
              пути
            </h1>
            <p className="animate-fade-in-up delay-300 font-body text-xs sm:text-sm text-cream/75 leading-relaxed mb-8 sm:mb-10 max-w-sm">
              Отборные чаи из Китая, Тайваня и Японии. Прямые поставки с плантаций, выдержанные пуэры, редкие улуны.
            </p>
            <div className="animate-fade-in-up delay-400 flex flex-wrap gap-3 sm:gap-4">
              <button
                className="btn-gold btn-glow px-6 sm:px-8 py-3 sm:py-3.5 flex items-center gap-2"
                onClick={() => setQuizOpen(true)}
              >
                <Icon name="Sparkles" size={13} />
                Подобрать чай
              </button>
              <button
                className="btn-outline-gold btn-glow px-6 sm:px-8 py-3 sm:py-3.5 border-cream/50 text-cream"
                onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
              >
                В каталог
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50">
          <span className="text-[9px] tracking-[0.2em] uppercase font-body">Листать</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream/50 to-transparent" />
        </div>
      </section>

      {/* ═══ ПРЕИМУЩЕСТВА ═══ */}
      <section className="bg-tea-dark py-16" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-4 group-hover:border-gold transition-colors duration-300">
                  <Icon name={b.icon} size={20} className="text-gold" />
                </div>
                <h3 className="font-display text-lg text-cream mb-2">{b.title}</h3>
                <p className="font-body text-xs text-cream/50 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ КАТАЛОГ ═══ */}
      <section id="catalog" className="py-14 sm:py-20 bg-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">Наш ассортимент</p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-tea-dark">Коллекция чаёв</h2>
            <div className="divider-gold" />
            <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
              Каждый чай — это история места, сезона и мастера. Мы отбираем только лучшее.
            </p>
          </div>

          {/* Категории-чипсы */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Layout: фильтры + сетка */}
          <div className="flex gap-8">
            <CatalogFilters
              filters={filters}
              setFilters={setFilters}
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
              resultCount={filteredTeas.length}
              types={categories.filter(c => c !== "Все")}
              countries={allCountries}
              effects={allEffects}
              priceLimit={PRICE_LIMIT}
            />

            <div className="flex-1 min-w-0">
              {/* Топбар: количество + кнопка фильтров для мобильных */}
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-xs text-muted-foreground">
                  Найдено: <span className="text-tea-dark font-medium">{filteredTeas.length}</span>
                </p>
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="lg:hidden btn-outline-gold btn-glow px-4 py-2 flex items-center gap-2"
                >
                  <Icon name="SlidersHorizontal" size={12} />
                  Фильтры
                </button>
              </div>

              {/* Сетка */}
              {filteredTeas.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-5xl block mb-4">🔍</span>
                  <p className="font-display text-2xl text-tea-dark mb-2">Ничего не найдено</p>
                  <p className="font-body text-xs text-muted-foreground mb-6">Попробуйте изменить фильтры</p>
                  <button
                    onClick={() => {
                      setActiveCategory("Все");
                      setFilters({ types: [], countries: [], effects: [], priceMin: PRICE_LIMIT.min, priceMax: PRICE_LIMIT.max, search: "", sort: "popular" });
                    }}
                    className="btn-outline-gold btn-glow px-6 py-2.5"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredTeas.map(tea => (
                    <div key={tea.id} className="tea-card card-hover group">
                      <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-tea-mid to-tea-dark">
                        {tea.img ? (
                          <img src={tea.img} alt={tea.name} className="tea-img" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-7xl opacity-25 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">
                              {TEA_EMOJI[tea.tag] ?? "🍵"}
                            </span>
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="bg-gold text-cream text-[9px] tracking-widest uppercase px-2 py-1 font-body">{tea.tag}</span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="border border-cream/30 text-cream text-[9px] tracking-wider uppercase px-2 py-1 font-body">{tea.year}</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-2">
                            <h3 className="font-display text-xl font-medium text-tea-dark leading-tight">{tea.name}</h3>
                            <p className="font-body text-[10px] text-gold tracking-wider uppercase mt-1">{tea.origin}</p>
                          </div>
                          <span className="font-body text-[9px] text-muted-foreground border border-border px-2 py-1 whitespace-nowrap shrink-0">{tea.weight}</span>
                        </div>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{tea.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {tea.effects.slice(0, 2).map(ef => (
                            <span key={ef} className="font-body text-[9px] text-gold border border-gold/30 px-1.5 py-0.5">{ef}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <span className="font-display text-2xl text-tea-dark">{tea.price.toLocaleString()} ₽</span>
                          <button
                            className="btn-gold btn-glow px-4 sm:px-5 py-2 flex items-center gap-2"
                            onClick={() => addToCart(tea.id)}
                          >
                            <Icon name="ShoppingBag" size={12} />
                            В корзину
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ПОДАРОЧНЫЕ НАБОРЫ ═══ */}
      <section id="gift" className="gift-banner py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">Особый повод</p>
              <h2 className="font-display text-4xl sm:text-5xl font-light text-cream mb-4">Подарочные<br />наборы</h2>
              <div className="w-10 h-px bg-gold mb-6" />
              <p className="font-body text-sm text-cream/60 leading-relaxed mb-8 max-w-sm">
                Деревянные шкатулки ручной работы с отборными чаями. Идеальный подарок для тех, кто ценит красоту и вкус. Гравировка по желанию.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { name: "«Три дракона»", desc: "3 сорта пуэра · деревянная шкатулка", price: "от 4 900 ₽" },
                  { name: "«Лунная коллекция»", desc: "5 редких улунов · шёлковый вкладыш", price: "от 7 800 ₽" },
                  { name: "«Императорский»", desc: "8 премиум-сортов · бамбук и медь", price: "от 14 500 ₽" },
                ].map((g, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-cream/10 pb-3">
                    <div>
                      <p className="font-display text-lg text-cream">{g.name}</p>
                      <p className="font-body text-[10px] text-cream/40">{g.desc}</p>
                    </div>
                    <span className="font-body text-xs text-gold whitespace-nowrap">{g.price}</span>
                  </div>
                ))}
              </div>
              <button className="btn-gold btn-glow px-8 py-3.5">Выбрать набор</button>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gold/5 rounded-sm" />
              <img src={IMG.gift} alt="Подарочные наборы" className="relative w-full object-cover" style={{ maxHeight: 420 }} />
              <div className="absolute bottom-4 right-4 bg-gold/90 text-cream px-4 py-2">
                <p className="font-body text-[9px] tracking-widest uppercase">Гравировка</p>
                <p className="font-display text-lg">Бесплатно</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ЦИТАТА ═══ */}
      <section className="relative py-24 bg-tea-dark overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 select-none">
          <span className="text-[20rem] font-display text-gold leading-none">茶</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-6">Философия</p>
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl text-cream font-light leading-relaxed mb-6 px-2">
            «В каждой чашке — история горы, дождя и рук мастера. Чай — это медитация в действии»
          </blockquote>
          <div className="divider-gold" />
          <p className="font-body text-[10px] text-cream/40 tracking-widest uppercase">Lu Yu · Классик чайного канона · VIII век</p>
        </div>
      </section>

      {/* ═══ ДОСТАВКА ═══ */}
      <section id="delivery" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">Логистика</p>
              <h2 className="font-display text-4xl sm:text-5xl font-light text-tea-dark mb-4">Доставка<br />и оплата</h2>
              <div className="w-10 h-px bg-gold mb-6" />
              <div className="space-y-6">
                {[
                  { icon: "Package", title: "Курьером по Москве", detail: "1–2 дня · от 350 ₽" },
                  { icon: "MapPin", title: "Почтой России / СДЭК", detail: "3–7 дней · от 250 ₽" },
                  { icon: "Zap", title: "Экспресс-доставка", detail: "День в день · от 650 ₽" },
                  { icon: "Gift", title: "Самовывоз в Москве", detail: "Бесплатно · по договорённости" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="w-9 h-9 border border-gold/30 flex items-center justify-center shrink-0 group-hover:border-gold transition-colors mt-0.5">
                      <Icon name={item.icon} size={14} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-tea-dark">{item.title}</p>
                      <p className="font-body text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-5 border border-gold/20 bg-gold/5">
                <p className="font-body text-xs text-tea-dark">
                  <span className="text-gold font-medium">Бесплатная доставка</span> при заказе от 5 000 ₽ по всей России
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 border border-border bg-white">
                <h3 className="font-display text-2xl text-tea-dark mb-3">Оплата</h3>
                <div className="space-y-3">
                  {["Банковская карта онлайн", "СБП (быстрые переводы)", "Наличными курьеру", "Перевод по реквизитам"].map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                      <span className="font-body text-sm text-tea-dark">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border border-border bg-white">
                <h3 className="font-display text-2xl text-tea-dark mb-3">Возврат и обмен</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  Если чай вас не устроил — мы вернём деньги или предложим замену в течение 14 дней. Ваше доверие важнее любой продажи.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ КОНТАКТЫ ═══ */}
      <section id="contact" className="py-20 bg-pattern">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">Связаться</p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-tea-dark">Обратная связь</h2>
            <div className="divider-gold" />
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-border p-8">
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Имя</label>
                  <input type="text" placeholder="Ваше имя" className="form-input" />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Телефон / Email</label>
                  <input type="text" placeholder="+7 (___) ___-__-__" className="form-input" />
                </div>
              </div>
              <div className="mb-5">
                <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Сообщение</label>
                <textarea rows={4} placeholder="Расскажите, что вас интересует..." className="form-input resize-none" />
              </div>
              <button className="btn-gold btn-glow w-full py-3.5">Отправить сообщение</button>
            </div>
            <div className="flex flex-wrap justify-center gap-10 mt-8">
              {[
                { icon: "Phone", text: "+7 (495) 000-00-00" },
                { icon: "Mail", text: "hello@lunnyichai.ru" },
                { icon: "MessageCircle", text: "Telegram" },
              ].map((c, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors cursor-pointer">
                  <Icon name={c.icon} size={16} />
                  <span className="font-body text-xs">{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ФУТЕР ═══ */}
      <footer className="bg-tea-dark py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex flex-col leading-none mb-4">
                <span className="font-display text-3xl font-light tracking-widest text-cream">月茶</span>
                <span className="text-[9px] font-body tracking-[0.25em] uppercase text-gold mt-1">Лунный Чай</span>
              </div>
              <p className="font-body text-xs text-cream/40 leading-relaxed max-w-xs">
                Редкие чаи из Китая, Тайваня и Японии. Прямые поставки с лучших плантаций мира с 2019 года.
              </p>
            </div>
            <div>
              <h4 className="font-body text-[9px] tracking-[0.2em] uppercase text-gold mb-4">Магазин</h4>
              <div className="space-y-2">
                {["Каталог", "Новинки", "Подарочные наборы", "Аксессуары"].map(l => (
                  <div key={l}><a href="#" className="font-body text-xs text-cream/40 hover:text-gold transition-colors">{l}</a></div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-body text-[9px] tracking-[0.2em] uppercase text-gold mb-4">Информация</h4>
              <div className="space-y-2">
                {["О нас", "Доставка и оплата", "Возврат товара", "Конфиденциальность"].map(l => (
                  <div key={l}><a href="#" className="font-body text-xs text-cream/40 hover:text-gold transition-colors">{l}</a></div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="font-body text-[10px] text-cream/25 tracking-wider">© 2024 Лунный Чай. Все права защищены.</p>
            <p className="font-body text-[10px] text-cream/25 tracking-wider">ИП · ИНН 000000000000</p>
          </div>
        </div>
      </footer>

      {/* ═══ ПЛАВАЮЩИЕ КНОПКИ (левый нижний угол) ═══ */}
      <div className="feedback-fab">
        <button
          onClick={() => setModal("callback")}
          className="fab-btn flex items-center gap-2 bg-tea-dark border border-gold/40 text-cream px-4 py-2.5 btn-glow text-[10px] tracking-wider uppercase font-body hover:border-gold transition-colors"
          title="Обратный звонок"
        >
          <Icon name="Phone" size={14} className="text-gold" />
          <span className="feedback-fab-label">Обратный звонок</span>
        </button>
        <button
          onClick={() => setModal("feedback")}
          className="fab-btn flex items-center gap-2 bg-tea-dark border border-gold/40 text-cream px-4 py-2.5 btn-glow text-[10px] tracking-wider uppercase font-body hover:border-gold transition-colors"
          title="Написать нам"
        >
          <Icon name="MessageSquare" size={14} className="text-gold" />
          <span className="feedback-fab-label">Написать нам</span>
        </button>
      </div>

      {/* ═══ ЧАТ ═══ */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gold text-cream shadow-xl flex items-center justify-center hover:bg-gold-light transition-colors group btn-glow"
        title="Чайный консультант"
      >
        <span className="text-xl">🍵</span>
        <span className="absolute right-16 bg-tea-dark text-cream text-xs font-body px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Спросить консультанта
        </span>
      </button>

      {chatOpen && (
        <div className="fixed bottom-24 right-3 left-3 sm:left-auto sm:right-6 z-50 sm:w-80 bg-white border border-border shadow-2xl flex flex-col" style={{ maxHeight: 420 }}>
          <div className="bg-tea-dark px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-base">🍵</span>
              <div>
                <p className="font-body text-xs text-cream font-medium">Чайный консультант</p>
                <p className="font-body text-[9px] text-gold tracking-wider">онлайн</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-cream/50 hover:text-cream transition-colors">
              <Icon name="X" size={14} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 font-body text-xs leading-relaxed ${msg.role === "user" ? "bg-gold text-cream" : "bg-secondary text-foreground"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-3 border-t border-border flex gap-2 shrink-0">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Спросите о чае..."
              className="flex-1 border border-border px-3 py-2 font-body text-xs focus:outline-none focus:border-gold transition-colors"
            />
            <button onClick={sendMessage} className="btn-gold btn-glow px-3 py-2">
              <Icon name="Send" size={12} />
            </button>
          </div>
        </div>
      )}

      {/* ═══ МОДАЛЬНЫЕ ОКНА ═══ */}
      {modal && (
        <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>

          {/* ─── ЛИЧНЫЙ КАБИНЕТ ─── */}
          {modal === "account" && (
            <div className="modal-box">
              <div className="bg-tea-dark px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar-gold">{isLoggedIn ? DEMO_USER.name[0] : "?"}</div>
                  <div>
                    <p className="font-display text-xl text-cream">{isLoggedIn ? DEMO_USER.name : "Личный кабинет"}</p>
                    {isLoggedIn && <p className="font-body text-[10px] text-gold">{DEMO_USER.email}</p>}
                  </div>
                </div>
                <button onClick={closeModal} className="text-cream/50 hover:text-cream transition-colors">
                  <Icon name="X" size={16} />
                </button>
              </div>

              {isLoggedIn ? (
                <>
                  <div className="flex border-b border-border">
                    {(["profile", "orders", "favourites"] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setAccountTab(tab)}
                        className={`tab-btn flex-1 ${accountTab === tab ? "active" : ""}`}
                      >
                        {tab === "profile" ? "Профиль" : tab === "orders" ? "Заказы" : "Избранное"}
                      </button>
                    ))}
                  </div>
                  <div className="p-6">
                    {accountTab === "profile" && (
                      <div className="space-y-4">
                        <div>
                          <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Имя</label>
                          <input defaultValue={DEMO_USER.name} className="form-input" />
                        </div>
                        <div>
                          <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Email</label>
                          <input defaultValue={DEMO_USER.email} className="form-input" />
                        </div>
                        <div>
                          <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Телефон</label>
                          <input placeholder="+7 (___) ___-__-__" className="form-input" />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <button className="btn-gold btn-glow flex-1 py-2.5">Сохранить</button>
                          <button onClick={handleLogout} className="btn-outline-gold px-4 py-2.5 text-xs">Выйти</button>
                        </div>
                      </div>
                    )}
                    {accountTab === "orders" && (
                      <div className="space-y-3">
                        {DEMO_USER.orders.map(o => (
                          <div key={o.id} className="border border-border p-3">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-display text-base text-tea-dark">{o.id}</span>
                              <span className="font-body text-[10px] text-gold tracking-wider">{o.status}</span>
                            </div>
                            <p className="font-body text-xs text-muted-foreground">{o.items}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-body text-[10px] text-muted-foreground">{o.date}</span>
                              <span className="font-display text-base text-tea-dark">{o.total.toLocaleString()} ₽</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {accountTab === "favourites" && (
                      <div className="text-center py-8">
                        <span className="text-4xl mb-3 block">🍵</span>
                        <p className="font-display text-xl text-tea-dark mb-2">Список пуст</p>
                        <p className="font-body text-xs text-muted-foreground">Добавляйте понравившиеся чаи в избранное</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex border-b border-border">
                    {(["login", "register"] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setAuthTab(tab)}
                        className={`tab-btn flex-1 ${authTab === tab ? "active" : ""}`}
                      >
                        {tab === "login" ? "Войти" : "Регистрация"}
                      </button>
                    ))}
                  </div>
                  <form onSubmit={handleLogin} className="p-6 space-y-4">
                    {authTab === "register" && (
                      <div>
                        <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Имя</label>
                        <input type="text" placeholder="Ваше имя" className="form-input" required />
                      </div>
                    )}
                    <div>
                      <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={loginForm.email}
                        onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Пароль</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                        className="form-input"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-gold btn-glow w-full py-3">
                      {authTab === "login" ? "Войти" : "Создать аккаунт"}
                    </button>
                    {authTab === "login" && (
                      <p className="font-body text-[10px] text-center text-muted-foreground">
                        <a href="#" className="text-gold hover:underline">Забыли пароль?</a>
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          )}

          {/* ─── ОБРАТНЫЙ ЗВОНОК ─── */}
          {modal === "callback" && (
            <div className="modal-box">
              <div className="bg-tea-dark px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-gold/50 flex items-center justify-center">
                    <Icon name="Phone" size={14} className="text-gold" />
                  </div>
                  <p className="font-display text-xl text-cream">Обратный звонок</p>
                </div>
                <button onClick={closeModal} className="text-cream/50 hover:text-cream transition-colors">
                  <Icon name="X" size={16} />
                </button>
              </div>
              {callbackSent ? (
                <div className="p-8 text-center">
                  <span className="text-4xl block mb-3">✅</span>
                  <p className="font-display text-2xl text-tea-dark mb-2">Заявка принята!</p>
                  <p className="font-body text-xs text-muted-foreground">Мы перезвоним вам в течение 15 минут</p>
                </div>
              ) : (
                <form onSubmit={handleCallback} className="p-6 space-y-4">
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    Оставьте имя и номер телефона — наш специалист перезвонит вам в течение 15 минут в рабочее время.
                  </p>
                  <div>
                    <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Имя</label>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={callbackForm.name}
                      onChange={e => setCallbackForm(p => ({ ...p, name: e.target.value }))}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={callbackForm.phone}
                      onChange={e => setCallbackForm(p => ({ ...p, phone: e.target.value }))}
                      className="form-input"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-gold btn-glow w-full py-3">
                    Позвоните мне
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ─── ОБРАТНАЯ СВЯЗЬ ─── */}
          {modal === "feedback" && (
            <div className="modal-box">
              <div className="bg-tea-dark px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-gold/50 flex items-center justify-center">
                    <Icon name="MessageSquare" size={14} className="text-gold" />
                  </div>
                  <p className="font-display text-xl text-cream">Написать нам</p>
                </div>
                <button onClick={closeModal} className="text-cream/50 hover:text-cream transition-colors">
                  <Icon name="X" size={16} />
                </button>
              </div>
              {feedbackSent ? (
                <div className="p-8 text-center">
                  <span className="text-4xl block mb-3">✅</span>
                  <p className="font-display text-2xl text-tea-dark mb-2">Сообщение отправлено!</p>
                  <p className="font-body text-xs text-muted-foreground">Мы ответим вам в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleFeedback} className="p-6 space-y-4">
                  <div>
                    <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Имя</label>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={feedbackForm.name}
                      onChange={e => setFeedbackForm(p => ({ ...p, name: e.target.value }))}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Email или телефон</label>
                    <input
                      type="text"
                      placeholder="your@email.com"
                      value={feedbackForm.contact}
                      onChange={e => setFeedbackForm(p => ({ ...p, contact: e.target.value }))}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-1.5">Сообщение</label>
                    <textarea
                      rows={4}
                      placeholder="Ваш вопрос или пожелание..."
                      value={feedbackForm.message}
                      onChange={e => setFeedbackForm(p => ({ ...p, message: e.target.value }))}
                      className="form-input resize-none"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-gold btn-glow w-full py-3">
                    Отправить
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ─── КОРЗИНА ─── */}
          {modal === "cart" && (
            <div className="modal-box">
              <div className="bg-tea-dark px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-gold/50 flex items-center justify-center">
                    <Icon name="ShoppingBag" size={14} className="text-gold" />
                  </div>
                  <p className="font-display text-xl text-cream">Корзина</p>
                </div>
                <button onClick={closeModal} className="text-cream/50 hover:text-cream transition-colors">
                  <Icon name="X" size={16} />
                </button>
              </div>
              <div className="p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <span className="text-4xl block mb-3">🛍️</span>
                    <p className="font-display text-2xl text-tea-dark mb-2">Корзина пуста</p>
                    <p className="font-body text-xs text-muted-foreground mb-5">Добавьте чай из каталога</p>
                    <button onClick={closeModal} className="btn-outline-gold btn-glow px-6 py-2.5">Перейти в каталог</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {Array.from(new Set(cartItems)).map(id => {
                      const tea = teas.find(t => t.id === id)!;
                      const qty = cartItems.filter(i => i === id).length;
                      return (
                        <div key={id} className="flex justify-between items-center border-b border-border pb-3">
                          <div className="flex-1 pr-3">
                            <p className="font-display text-base text-tea-dark leading-tight">{tea.name}</p>
                            <p className="font-body text-[10px] text-gold">{tea.weight} × {qty}</p>
                          </div>
                          <span className="font-display text-lg text-tea-dark">{(tea.price * qty).toLocaleString()} ₽</span>
                        </div>
                      );
                    })}
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Итого</span>
                      <span className="font-display text-2xl text-tea-dark">
                        {cartItems.reduce((sum, id) => sum + (teas.find(t => t.id === id)?.price ?? 0), 0).toLocaleString()} ₽
                      </span>
                    </div>
                    <button className="btn-gold btn-glow w-full py-3 mt-2">Оформить заказ</button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ═══ КВИЗ ═══ */}
      <TeaQuiz
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        teas={teas}
        onAddToCart={addToCart}
      />

    </div>
  );
}