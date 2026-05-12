import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/2608d454-ee87-4107-a637-5c661ed75f9d/files/03046ac1-b07a-4e4d-af17-78c1d413f3b4.jpg";

const teas = [
  {
    id: 1,
    name: "Шу Пуэр «Золотой Дворец»",
    origin: "Юньнань, Китай",
    year: "2018",
    price: 2800,
    weight: "357 г",
    tag: "Пуэр",
    description: "Глубокий землистый вкус с нотами чернослива и дерева. Чай прессован в форме блина, выдержка 6 лет.",
    emoji: "🍂",
  },
  {
    id: 2,
    name: "ГАБА Улун «Лунная Роса»",
    origin: "Тайвань",
    year: "2024",
    price: 3400,
    weight: "100 г",
    tag: "ГАБА",
    description: "Ферментирован в азоте, богат ГАМК. Карамельный вкус с фруктовыми нотами и долгим послевкусием.",
    emoji: "🌙",
  },
  {
    id: 3,
    name: "Да Хун Пао «Утёс»",
    origin: "Уишань, Фуцзянь",
    year: "2023",
    price: 4200,
    weight: "50 г",
    tag: "Улун",
    description: "Легендарный красный халат. Сильная обжарка, минеральные тона скал, орхидеевый аромат.",
    emoji: "🔥",
  },
  {
    id: 4,
    name: "Белый Пион «Серебро»",
    origin: "Фуцзянь, Китай",
    year: "2024",
    price: 1900,
    weight: "100 г",
    tag: "Белый",
    description: "Молодые побеги, минимальная обработка. Цветочный аромат, медовая сладость, бархатистость.",
    emoji: "🌸",
  },
  {
    id: 5,
    name: "Дянь Хун «Золотые Спирали»",
    origin: "Юньнань, Китай",
    year: "2024",
    price: 2200,
    weight: "100 г",
    tag: "Красный",
    description: "Юньнаньский красный чай из золотых почек. Шоколад, мёд, солод — роскошный утренний чай.",
    emoji: "✨",
  },
  {
    id: 6,
    name: "Те Гуань Инь «Железная Богиня»",
    origin: "Аньси, Фуцзянь",
    year: "2024",
    price: 1600,
    weight: "100 г",
    tag: "Улун",
    description: "Классический улун с цветочно-молочным ароматом. Долгое раскрытие вкуса при многократных заварках.",
    emoji: "🌿",
  },
];

const categories = ["Все", "Пуэр", "Улун", "ГАБА", "Белый", "Красный"];

const benefits = [
  { icon: "Award", title: "Прямые поставки", text: "Работаем напрямую с плантациями Китая, Тайваня и Японии" },
  { icon: "Shield", title: "Гарантия качества", text: "Каждая партия проходит дегустацию и проверку сертификатов" },
  { icon: "Truck", title: "Бережная доставка", text: "Специальная упаковка для сохранения аромата при транспортировке" },
  { icon: "Users", title: "Экспертная помощь", text: "ИИ-консультант и живые чайные мастера готовы помочь с выбором" },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "ai", text: "Добро пожаловать! Я чайный консультант. Расскажите, какой вкус вы предпочитаете — и я подберу идеальный чай для вас." }
  ]);
  const [chatInput, setChatInput] = useState("");

  const addToCart = (id: number) => {
    setCartCount(prev => prev + 1);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        role: "ai",
        text: "Это очень интересный выбор! Исходя из ваших предпочтений, я рекомендую обратить внимание на наш ассортимент пуэров и улунов. Хотите узнать подробнее о каком-либо сорте?"
      }]);
    }, 1000);
  };

  const filteredTeas = activeCategory === "Все"
    ? teas
    : teas.filter(t => t.tag === activeCategory);

  return (
    <div className="min-h-screen bg-cream font-body">

      {/* Шапка */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl font-light tracking-widest text-tea-dark">茶道</span>
              <span className="text-[9px] font-body tracking-[0.25em] uppercase text-gold mt-0.5">Чайный Путь</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#catalog" className="nav-link">Каталог</a>
              <a href="#about" className="nav-link">О нас</a>
              <a href="#delivery" className="nav-link">Доставка</a>
              <a href="#contact" className="nav-link">Контакты</a>
            </nav>

            <div className="flex items-center gap-4">
              <button className="nav-link flex items-center gap-1.5 hover:text-gold transition-colors">
                <Icon name="Search" size={16} />
              </button>
              <button className="nav-link flex items-center gap-1.5 hover:text-gold transition-colors">
                <Icon name="User" size={16} />
                <span className="hidden sm:inline text-[10px] tracking-widest uppercase">Войти</span>
              </button>
              <button className="relative nav-link flex items-center gap-1.5 hover:text-gold transition-colors">
                <Icon name="ShoppingBag" size={16} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-cream text-[9px] rounded-full flex items-center justify-center font-body font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden nav-link"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Icon name={menuOpen ? "X" : "Menu"} size={18} />
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-cream border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
            {["Каталог", "О нас", "Доставка", "Контакты"].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link" onClick={() => setMenuOpen(false)}>{item}</a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <p className="animate-fade-in-up delay-100 font-body text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
              Магазин редких чаёв
            </p>
            <h1 className="animate-fade-in-up delay-200 font-display text-6xl md:text-7xl lg:text-8xl font-light text-cream leading-none mb-6">
              Искусство<br />
              <em className="gold-shimmer not-italic">чайного</em><br />
              пути
            </h1>
            <p className="animate-fade-in-up delay-300 font-body text-sm text-cream/75 leading-relaxed mb-10 max-w-sm">
              Отборные чаи из Китая, Тайваня и Японии. Прямые поставки с плантаций, выдержанные пуэры, редкие улуны.
            </p>
            <div className="animate-fade-in-up delay-400 flex flex-wrap gap-4">
              <button
                className="btn-gold px-8 py-3.5"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Перейти в каталог
              </button>
              <button className="btn-outline-gold px-8 py-3.5 border-cream/50 text-cream hover:border-gold">
                Наша история
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50">
          <span className="text-[9px] tracking-[0.2em] uppercase font-body">Листать</span>
          <div className="w-px h-12 bg-gradient-to-b from-cream/50 to-transparent" />
        </div>
      </section>

      {/* Преимущества */}
      <section className="bg-tea-dark py-16" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-4 group-hover:border-gold transition-colors">
                  <Icon name={b.icon} size={20} className="text-gold" />
                </div>
                <h3 className="font-display text-lg text-cream mb-2">{b.title}</h3>
                <p className="font-body text-xs text-cream/50 leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section id="catalog" className="py-20 bg-pattern">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">Наш ассортимент</p>
            <h2 className="font-display text-5xl font-light text-tea-dark">Коллекция чаёв</h2>
            <div className="divider-gold" />
            <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
              Каждый чай — это история места, сезона и мастера. Мы отбираем только лучшее.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-[10px] tracking-[0.15em] uppercase font-body transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gold text-cream"
                    : "border border-gold/30 text-tea-dark hover:border-gold hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeas.map(tea => (
              <div key={tea.id} className="tea-card card-hover group">
                <div className="relative h-48 bg-gradient-to-br from-tea-mid to-tea-dark flex items-center justify-center overflow-hidden">
                  <span className="text-6xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
                    {tea.emoji}
                  </span>
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold text-cream text-[9px] tracking-widest uppercase px-2 py-1 font-body">
                      {tea.tag}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="border border-cream/30 text-cream text-[9px] tracking-wider uppercase px-2 py-1 font-body">
                      {tea.year}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-display text-xl font-medium text-tea-dark leading-tight">{tea.name}</h3>
                      <p className="font-body text-[10px] text-gold tracking-wider uppercase mt-1">{tea.origin}</p>
                    </div>
                    <span className="font-body text-[9px] text-muted-foreground border border-border px-2 py-1 whitespace-nowrap">
                      {tea.weight}
                    </span>
                  </div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">{tea.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-display text-2xl text-tea-dark">
                      {tea.price.toLocaleString()} ₽
                    </span>
                    <button
                      className="btn-gold px-5 py-2 flex items-center gap-2"
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

          <div className="text-center mt-10">
            <button className="btn-outline-gold px-10 py-3.5">
              Весь каталог
            </button>
          </div>
        </div>
      </section>

      {/* Цитата */}
      <section className="relative py-24 bg-tea-dark overflow-hidden">
        <div className="absolute inset-0 opacity-5 flex items-center justify-center">
          <span className="text-[20rem] font-display text-gold leading-none select-none">茶</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-6">Философия</p>
          <blockquote className="font-display text-3xl md:text-4xl text-cream font-light leading-relaxed mb-6">
            «В каждой чашке — история горы, дождя и рук мастера. Чай — это медитация в действии»
          </blockquote>
          <div className="divider-gold" />
          <p className="font-body text-[10px] text-cream/40 tracking-widest uppercase">Lu Yu · Классик чайного канона · VIII век</p>
        </div>
      </section>

      {/* Доставка */}
      <section id="delivery" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">Логистика</p>
              <h2 className="font-display text-5xl font-light text-tea-dark mb-4">Доставка<br />и оплата</h2>
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
                  Если чай вас не устроил — мы вернём деньги или предложим замену в течение 14 дней с момента получения. Ваше доверие важнее любой продажи.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contact" className="py-20 bg-pattern">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">Связаться</p>
            <h2 className="font-display text-5xl font-light text-tea-dark">Обратная связь</h2>
            <div className="divider-gold" />
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-border p-8">
              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors bg-transparent"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Телефон / Email</label>
                  <input
                    type="text"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors bg-transparent"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground block mb-2">Сообщение</label>
                <textarea
                  rows={4}
                  placeholder="Расскажите, что вас интересует..."
                  className="w-full border border-border px-4 py-3 font-body text-sm focus:outline-none focus:border-gold transition-colors bg-transparent resize-none"
                />
              </div>
              <button className="btn-gold w-full py-3.5">
                Отправить сообщение
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-10 mt-8">
              {[
                { icon: "Phone", text: "+7 (495) 000-00-00" },
                { icon: "Mail", text: "hello@chaynyput.ru" },
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

      {/* Футер */}
      <footer className="bg-tea-dark py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex flex-col leading-none mb-4">
                <span className="font-display text-3xl font-light tracking-widest text-cream">茶道</span>
                <span className="text-[9px] font-body tracking-[0.25em] uppercase text-gold mt-1">Чайный Путь</span>
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
            <p className="font-body text-[10px] text-cream/25 tracking-wider">© 2024 Чайный Путь. Все права защищены.</p>
            <p className="font-body text-[10px] text-cream/25 tracking-wider">ИП · ИНН 000000000000</p>
          </div>
        </div>
      </footer>

      {/* Кнопка чата */}
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gold text-cream shadow-xl flex items-center justify-center hover:bg-gold-light transition-colors group"
        title="Чайный консультант"
      >
        <span className="text-xl">🍵</span>
        <span className="absolute right-16 bg-tea-dark text-cream text-xs font-body px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Спросить консультанта
        </span>
      </button>

      {/* ИИ-чат */}
      {chatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white border border-border shadow-2xl flex flex-col" style={{ maxHeight: '420px' }}>
          <div className="bg-tea-dark px-4 py-3 flex items-center justify-between">
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

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: '280px' }}>
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 font-body text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gold text-cream"
                    : "bg-secondary text-foreground"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Спросите о чае..."
              className="flex-1 border border-border px-3 py-2 font-body text-xs focus:outline-none focus:border-gold transition-colors"
            />
            <button onClick={sendMessage} className="btn-gold px-3 py-2">
              <Icon name="Send" size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}