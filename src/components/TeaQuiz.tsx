import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Tea {
  id: number;
  name: string;
  origin: string;
  year: string;
  price: number;
  weight: string;
  tag: string;
  description: string;
  img: string | null;
}

interface TeaQuizProps {
  open: boolean;
  onClose: () => void;
  teas: Tea[];
  onAddToCart: (id: number) => void;
}

type Tag = "Пуэр" | "Улун" | "ГАБА" | "Белый" | "Красный" | "Зелёный" | "Тёмный";

interface QuizState {
  taste: string;
  strength: string;
  time: string;
  effect: string;
  experience: string;
}

const STEPS = [
  {
    key: "taste",
    title: "Какой вкус вам ближе?",
    subtitle: "Шаг 1 из 5",
    options: [
      { value: "floral", label: "Цветочный, нежный", emoji: "🌸", desc: "Лёгкие ароматы цветов и мёда" },
      { value: "fruity", label: "Фруктовый, сладкий", emoji: "🍑", desc: "Карамель, фрукты, выпечка" },
      { value: "earthy", label: "Землистый, глубокий", emoji: "🍂", desc: "Дерево, орех, чернослив" },
      { value: "fresh", label: "Свежий, травянистый", emoji: "🌿", desc: "Зелень, луговые травы" },
    ],
  },
  {
    key: "strength",
    title: "Какую крепость предпочитаете?",
    subtitle: "Шаг 2 из 5",
    options: [
      { value: "light", label: "Лёгкий", emoji: "☁️", desc: "Тонкий, прозрачный настой" },
      { value: "medium", label: "Средний", emoji: "🍵", desc: "Сбалансированный вкус" },
      { value: "strong", label: "Крепкий", emoji: "🔥", desc: "Насыщенный, плотный" },
    ],
  },
  {
    key: "time",
    title: "Когда планируете пить чай?",
    subtitle: "Шаг 3 из 5",
    options: [
      { value: "morning", label: "Утром", emoji: "🌅", desc: "Бодрит, заряжает энергией" },
      { value: "day", label: "Днём", emoji: "☀️", desc: "Поддерживает концентрацию" },
      { value: "evening", label: "Вечером", emoji: "🌙", desc: "Расслабляет, успокаивает" },
      { value: "any", label: "В любое время", emoji: "♾️", desc: "Универсальный выбор" },
    ],
  },
  {
    key: "effect",
    title: "Какой эффект вы хотите?",
    subtitle: "Шаг 4 из 5",
    options: [
      { value: "energy", label: "Бодрость", emoji: "⚡", desc: "Прогнать сонливость" },
      { value: "calm", label: "Спокойствие", emoji: "🧘", desc: "Расслабление и медитация" },
      { value: "focus", label: "Концентрация", emoji: "🎯", desc: "Помочь сосредоточиться" },
      { value: "pleasure", label: "Удовольствие", emoji: "💫", desc: "Просто наслаждение вкусом" },
    ],
  },
  {
    key: "experience",
    title: "Ваш чайный опыт?",
    subtitle: "Шаг 5 из 5",
    options: [
      { value: "beginner", label: "Новичок", emoji: "🌱", desc: "Только начинаю знакомство" },
      { value: "amateur", label: "Любитель", emoji: "🍃", desc: "Знаю несколько сортов" },
      { value: "expert", label: "Знаток", emoji: "🏆", desc: "Разбираюсь в нюансах" },
    ],
  },
];

const TAG_PRIORITY: Record<string, Tag[]> = {
  floral: ["Белый", "Улун", "Зелёный"],
  fruity: ["ГАБА", "Красный", "Улун"],
  earthy: ["Пуэр", "Тёмный"],
  fresh: ["Зелёный", "Белый"],
  light: ["Белый", "Зелёный"],
  medium: ["Улун", "Красный", "ГАБА"],
  strong: ["Пуэр", "Тёмный"],
  morning: ["Красный", "Зелёный"],
  day: ["Улун", "Зелёный"],
  evening: ["ГАБА", "Пуэр", "Белый"],
  any: ["Улун"],
  energy: ["Красный", "Зелёный"],
  calm: ["ГАБА", "Белый"],
  focus: ["Улун", "Зелёный"],
  pleasure: ["Пуэр", "Улун", "Красный"],
  beginner: ["Зелёный", "Красный", "Белый"],
  amateur: ["Улун", "Пуэр"],
  expert: ["Пуэр", "Тёмный", "ГАБА"],
};

function scoreTeas(answers: QuizState, teas: Tea[]) {
  const scores = new Map<number, number>();
  teas.forEach(tea => scores.set(tea.id, 0));

  Object.values(answers).forEach(answer => {
    const preferredTags = TAG_PRIORITY[answer] ?? [];
    preferredTags.forEach((tag, idx) => {
      const weight = preferredTags.length - idx;
      teas.forEach(tea => {
        if (tea.tag === tag) {
          scores.set(tea.id, (scores.get(tea.id) ?? 0) + weight);
        }
      });
    });
  });

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id]) => teas.find(t => t.id === id)!)
    .filter(Boolean);
}

export default function TeaQuiz({ open, onClose, teas, onAddToCart }: TeaQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizState>({
    taste: "", strength: "", time: "", effect: "", experience: ""
  });
  const [showResults, setShowResults] = useState(false);

  const reset = () => {
    setStep(0);
    setAnswers({ taste: "", strength: "", time: "", effect: "", experience: "" });
    setShowResults(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const selectOption = (value: string) => {
    const key = STEPS[step].key as keyof QuizState;
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 250);
    } else {
      setTimeout(() => setShowResults(true), 250);
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  if (!open) return null;

  const currentStep = STEPS[step];
  const currentKey = currentStep.key as keyof QuizState;
  const progress = ((step + (answers[currentKey] ? 1 : 0)) / STEPS.length) * 100;
  const recommendations = showResults ? scoreTeas(answers, teas) : [];

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="modal-box" style={{ maxWidth: showResults ? 720 : 560 }}>

        {/* Шапка */}
        <div className="bg-tea-dark px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold/50 flex items-center justify-center">
              <span className="text-base">🍵</span>
            </div>
            <div>
              <p className="font-display text-xl text-cream">Подобрать чай</p>
              {!showResults && (
                <p className="font-body text-[10px] text-gold tracking-wider">{currentStep.subtitle}</p>
              )}
            </div>
          </div>
          <button onClick={handleClose} className="text-cream/50 hover:text-cream transition-colors">
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Прогресс */}
        {!showResults && (
          <div className="h-1 bg-cream/50 relative">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Контент */}
        {!showResults ? (
          <div className="p-6">
            <h3 className="font-display text-3xl text-tea-dark mb-6 text-center leading-tight">
              {currentStep.title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentStep.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => selectOption(opt.value)}
                  className={`quiz-option text-left p-4 ${
                    answers[currentKey] === opt.value ? "active" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{opt.emoji}</span>
                    <div className="flex-1">
                      <p className="font-display text-lg text-tea-dark leading-tight">{opt.label}</p>
                      <p className="font-body text-[10px] text-muted-foreground mt-1">{opt.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 pt-5 border-t border-border">
              <button
                onClick={goBack}
                disabled={step === 0}
                className="font-body text-[10px] tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <Icon name="ChevronLeft" size={12} />
                Назад
              </button>
              <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === step ? "w-6 bg-gold" : i < step ? "w-1.5 bg-gold/50" : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-center mb-6">
              <span className="text-4xl block mb-2">✨</span>
              <h3 className="font-display text-3xl text-tea-dark mb-2">Ваш идеальный чай</h3>
              <p className="font-body text-xs text-muted-foreground">
                На основе ваших предпочтений мы подобрали {recommendations.length} сортов
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {recommendations.map((tea, idx) => (
                <div key={tea.id} className="flex gap-4 p-4 border border-gold/20 bg-white hover:border-gold transition-colors group">
                  <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-tea-mid to-tea-dark flex items-center justify-center overflow-hidden">
                    {tea.img ? (
                      <img src={tea.img} alt={tea.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl opacity-40">🍵</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-gold/10 text-gold text-[9px] tracking-widest uppercase px-2 py-0.5">
                        #{idx + 1} {idx === 0 && "идеально"}
                      </span>
                      <span className="font-body text-[9px] text-muted-foreground tracking-wider">{tea.tag}</span>
                    </div>
                    <p className="font-display text-lg text-tea-dark leading-tight">{tea.name}</p>
                    <p className="font-body text-[10px] text-gold uppercase tracking-wider mt-0.5">{tea.origin}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-display text-xl text-tea-dark">{tea.price.toLocaleString()} ₽</span>
                      <button
                        onClick={() => onAddToCart(tea.id)}
                        className="btn-gold btn-glow text-[10px] px-4 py-1.5"
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="btn-outline-gold btn-glow flex-1 py-3 flex items-center justify-center gap-2"
              >
                <Icon name="RotateCcw" size={12} />
                Пройти заново
              </button>
              <button onClick={handleClose} className="btn-gold btn-glow flex-1 py-3">
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
