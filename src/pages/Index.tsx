import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import ChatWidget from '@/components/ChatWidget';
import AnimatedBackground from '@/components/AnimatedBackground';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const features = [
    {
      icon: 'Search',
      title: 'Умный поиск',
      description: 'Найдите идеального специалиста или проект с помощью интеллектуальных фильтров и рекомендаций'
    },
    {
      icon: 'Briefcase',
      title: 'Портфолио',
      description: 'Демонстрируйте свои лучшие работы и привлекайте больше клиентов'
    },
    {
      icon: 'Star',
      title: 'Рейтинги и отзывы',
      description: 'Прозрачная система оценок помогает выбрать проверенных исполнителей'
    },
    {
      icon: 'Shield',
      title: 'Безопасная сделка',
      description: 'Эскроу-сервис гарантирует защиту средств для обеих сторон'
    },
    {
      icon: 'BarChart3',
      title: 'Аналитика',
      description: 'Отслеживайте статистику проектов и эффективность работы'
    },
    {
      icon: 'Zap',
      title: 'Быстрый старт',
      description: 'Начните работать уже сегодня — регистрация занимает 2 минуты'
    }
  ];

  const benefits = [
    { title: 'Более 500K', subtitle: 'специалистов' },
    { title: '1M+', subtitle: 'выполненных проектов' },
    { title: '4.8/5', subtitle: 'средний рейтинг' },
    { title: '24/7', subtitle: 'поддержка' }
  ];

  const pricing = [
    {
      name: 'Старт',
      price: '0',
      period: 'бесплатно',
      features: ['5 откликов в месяц', 'Базовое портфолио', 'Доступ к поиску', 'Email поддержка'],
      popular: false
    },
    {
      name: 'Про',
      price: '990',
      period: 'в месяц',
      features: ['Неограниченные отклики', 'Премиум портфолио', 'Приоритет в поиске', 'Аналитика', 'Поддержка 24/7', 'Бейдж PRO'],
      popular: true
    },
    {
      name: 'Бизнес',
      price: '2990',
      period: 'в месяц',
      features: ['Все из PRO', 'Команда до 10 человек', 'API доступ', 'Персональный менеджер', 'Белый лейбл', 'Корпоративная отчетность'],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Анна Петрова',
      role: 'Дизайнер',
      text: 'Нашла здесь множество интересных проектов. Удобный интерфейс и прозрачные условия работы.',
      rating: 5
    },
    {
      name: 'Максим Соколов',
      role: 'Разработчик',
      text: 'Лучшая платформа для фрилансеров! Быстрые выплаты и качественные заказчики.',
      rating: 5
    },
    {
      name: 'Елена Морозова',
      role: 'Копирайтер',
      text: 'Работаю на платформе уже 2 года. Стабильный поток заказов и отличная поддержка.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Как начать работать на платформе?',
      answer: 'Зарегистрируйтесь, заполните профиль, добавьте примеры работ в портфолио — и можете откликаться на проекты!'
    },
    {
      question: 'Какая комиссия платформы?',
      answer: 'Комиссия составляет 10% от стоимости проекта. Для PRO-пользователей — 5%.'
    },
    {
      question: 'Как работает эскроу?',
      answer: 'Заказчик резервирует средства на платформе, они переводятся исполнителю после завершения работы и подтверждения.'
    },
    {
      question: 'Можно ли работать из любой страны?',
      answer: 'Да, платформа работает по всему миру. Поддерживаются различные способы вывода средств.'
    },
    {
      question: 'Есть ли гарантия оплаты?',
      answer: 'Да, система эскроу гарантирует, что вы получите оплату после выполнения работы согласно условиям.'
    }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center glow">
                <Icon name="Briefcase" size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Корвикс
              </span>
            </div>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] glass">
                <div className="flex flex-col gap-6 mt-8">
                  {['home', 'benefits', 'features', 'pricing', 'testimonials', 'faq', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => {
                        scrollToSection(section);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-lg font-medium transition-colors hover:text-primary text-left ${
                        activeSection === section ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {section === 'home' && 'Главная'}
                      {section === 'benefits' && 'Преимущества'}
                      {section === 'features' && 'Функционал'}
                      {section === 'pricing' && 'Тарифы'}
                      {section === 'testimonials' && 'Отзывы'}
                      {section === 'faq' && 'FAQ'}
                      {section === 'contact' && 'Контакты'}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex items-center gap-8">
              {['home', 'benefits', 'features', 'pricing', 'testimonials', 'faq', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'benefits' && 'Преимущества'}
                  {section === 'features' && 'Функционал'}
                  {section === 'pricing' && 'Тарифы'}
                  {section === 'testimonials' && 'Отзывы'}
                  {section === 'faq' && 'FAQ'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                Войти
              </Button>
              <Button className="bg-primary hover:bg-primary/90 glow">
                Начать
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <Badge className="glass px-6 py-2 text-sm font-medium border-primary/20">
              🚀 Более 500,000 специалистов уже с нами
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Найдите лучших
              </span>
              <br />
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">фрилансеров</span>
            </h1>

            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed px-4">
              Платформа нового поколения для поиска специалистов и проектов.
              Безопасно, быстро, эффективно.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 glow">
                <Icon name="Rocket" size={20} className="mr-2" />
                Начать бесплатно
              </Button>
              <Button size="lg" variant="outline" className="glass glass-hover text-lg px-8 py-6">
                <Icon name="Play" size={20} className="mr-2" />
                Как это работает
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 scroll-reveal">
            {benefits.map((benefit, index) => (
              <Card key={index} className="glass glass-hover p-8 text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{benefit.title}</h3>
                <p className="text-foreground/60">{benefit.subtitle}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Всё для вашей работы</h2>
            <p className="text-foreground/60 text-lg">Мощные инструменты для эффективного сотрудничества</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass glass-hover p-8 space-y-4 scroll-reveal">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center">
                  <Icon name={feature.icon as any} size={28} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Выберите свой тариф</h2>
            <p className="text-foreground/60 text-lg">Гибкие планы для любых задач</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <Card 
                key={index} 
                className={`glass glass-hover p-8 relative scroll-reveal ${plan.popular ? 'ring-2 ring-primary glow' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    Популярный
                  </Badge>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-primary">{plan.price}</span>
                      <span className="text-foreground/60">₽</span>
                    </div>
                    <p className="text-foreground/60 mt-1">{plan.period}</p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'glass glass-hover'}`}
                    size="lg"
                  >
                    Выбрать план
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Что говорят пользователи</h2>
            <p className="text-foreground/60 text-lg">Отзывы специалистов, которые работают с нами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass glass-hover p-8 space-y-4 scroll-reveal">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Частые вопросы</h2>
            <p className="text-foreground/60 text-lg">Всё, что нужно знать о платформе</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="glass border-white/10">
                <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-foreground/70 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass glass-hover p-12 text-center space-y-6">
            <h2 className="text-4xl font-bold">Готовы начать?</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Присоединяйтесь к тысячам специалистов, которые уже нашли идеальные проекты
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 glow">
                <Icon name="UserPlus" size={20} className="mr-2" />
                Зарегистрироваться
              </Button>
              <Button size="lg" variant="outline" className="glass glass-hover px-8">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <ChatWidget />

      <footer className="border-t border-border py-12 px-6 mt-20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                  <Icon name="Briefcase" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">Корвикс</span>
              </div>
              <p className="text-foreground/60 text-sm">
                Платформа для поиска специалистов и проектов
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#features" className="hover:text-primary transition-colors">Функции</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 text-sm">© 2024 Корвикс. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;