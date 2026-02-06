import React from 'react';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, Star, Phone, Mail, MapPin } from 'lucide-react';

const highlights = [
  {
    title: 'منتجات أصلية 100%',
    description: 'نختار أفضل العلامات التجارية بعناية مع ضمانات رسمية لكل منتج.'
  },
  {
    title: 'توصيل سريع ومرن',
    description: 'شحن خلال 24-48 ساعة داخل المدن وخيارات استلام من الفروع.'
  },
  {
    title: 'دعم متواصل',
    description: 'فريق دعم عربي متواجد 24/7 لتجربة شراء سلسة.'
  }
];

const featuredProducts = [
  {
    name: 'حزمة المنزل الذكي',
    price: '1,299 ر.س',
    description: 'إضاءة ذكية، حساس حركة، ومساعد صوتي في حزمة واحدة.',
    tag: 'الأكثر مبيعاً'
  },
  {
    name: 'ساعة رياضية احترافية',
    price: '899 ر.س',
    description: 'تتبع فوري للصحة واللياقة مع مقاومة للماء حتى 50م.',
    tag: 'إصدار جديد'
  },
  {
    name: 'سماعات عزل ضوضاء',
    price: '649 ر.س',
    description: 'صوت محيطي مع بطارية تدوم حتى 36 ساعة.',
    tag: 'خصم 20%'
  }
];

const steps = [
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: 'ادفع بأمان',
    text: 'وسائل دفع متعددة تشمل مدى، Apple Pay، والدفع عند الاستلام.'
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'استلم بسرعة',
    text: 'تتبع لحظي للشحنة وخدمة توصيل مجدولة تناسب وقتك.'
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'ضمان واستبدال',
    text: 'ضمان يصل إلى سنتين مع إمكانية الاستبدال خلال 14 يوماً.'
  }
];

const testimonials = [
  {
    name: 'ليلى أحمد',
    role: 'مديرة تسويق',
    quote: 'تجربة شراء رائعة، وصلت الطلبية في اليوم التالي والتغليف ممتاز.'
  },
  {
    name: 'سلمان العتيبي',
    role: 'رائد أعمال',
    quote: 'الخدمة السريعة والدعم الفني المتجاوب جعلوني أعتمدهم دائماً.'
  },
  {
    name: 'نورة الصالح',
    role: 'مهندسة',
    quote: 'المنتجات أصلية والأسعار منافسة جداً مقارنةً بالسوق.'
  }
];

const faqs = [
  {
    question: 'هل يمكنني إرجاع المنتج؟',
    answer: 'نعم، يمكنك إرجاع المنتج خلال 14 يوماً بشرط الحفاظ على حالته الأصلية.'
  },
  {
    question: 'كم يستغرق الشحن؟',
    answer: 'داخل المدن الرئيسية من 24 إلى 48 ساعة، وخارجها من 3 إلى 5 أيام.'
  },
  {
    question: 'هل الدفع عند الاستلام متاح؟',
    answer: 'نعم، متاح في المدن الرئيسية مع رسوم خدمة بسيطة.'
  }
];

const stats = [
  { value: '120K+', label: 'عميل سعيد' },
  { value: '4.9/5', label: 'تقييم الخدمة' },
  { value: '350+', label: 'علامة تجارية' },
  { value: '24/7', label: 'دعم فوري' }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
              س
            </div>
            <div>
              <p className="text-lg font-bold">سوق النخبة</p>
              <p className="text-sm text-slate-500">تجربة تسوق ذكية وسريعة</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
            <a className="hover:text-emerald-600 transition" href="#features">المميزات</a>
            <a className="hover:text-emerald-600 transition" href="#products">المنتجات</a>
            <a className="hover:text-emerald-600 transition" href="#pricing">الأسعار</a>
            <a className="hover:text-emerald-600 transition" href="#contact">التواصل</a>
            <button className="px-4 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition">
              ابدأ الآن
            </button>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-emerald-100 via-white to-white" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4" /> عروض الصيف وصلت الآن
            </span>
            <h1 className="mt-6 text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
              ابنِ تجربة تسوق متكاملة لعملائك مع منصة مبيعات عصرية.
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              نوفر لك متجر إلكتروني جاهز للبيع مع إدارة مخزون ذكية، حملات تسويقية، وخدمة توصيل سريعة تمنح عملاءك تجربة مميزة.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
                أنشئ متجرك الآن
              </button>
              <button className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition">
                احصل على استشارة مجانية
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-right">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white shadow-xl rounded-3xl p-8 border border-slate-100">
            <p className="text-sm text-slate-500">لوحة المبيعات اليوم</p>
            <p className="text-3xl font-bold mt-2">78,420 ر.س</p>
            <div className="mt-6 space-y-4">
              {highlights.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-slate-900 text-white p-6">
              <div className="flex items-center justify-between">
                <p className="font-semibold">حالة الطلبات</p>
                <span className="text-emerald-300 text-sm">مباشر</span>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>قيد التحضير</span>
                  <strong>142</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>في الطريق</span>
                  <strong>86</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>تم التسليم</span>
                  <strong>1,240</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-emerald-600 font-semibold">مميزات المنصة</p>
          <h2 className="text-3xl font-bold mt-3">حل متكامل لإدارة المبيعات والنمو</h2>
          <p className="text-slate-600 mt-4">
            وفرنا لك كل ما تحتاجه لتوسيع نشاطك التجاري، من إدارة المخزون إلى دعم العملاء والتحليلات المتقدمة.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="mt-4 font-semibold text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="bg-white border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-emerald-600 font-semibold">منتجات مختارة</p>
              <h2 className="text-3xl font-bold mt-3">أفضل المنتجات لزيادة مبيعاتك</h2>
              <p className="text-slate-600 mt-4">
                اخترنا لك منتجات جاهزة للإطلاق مع صور تسويقية ووصف احترافي.
              </p>
            </div>
            <button className="px-5 py-3 rounded-full border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition">
              استعرض الكتالوج الكامل
            </button>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.name} className="rounded-2xl border border-slate-100 p-6 shadow-sm">
                <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-semibold">
                  {product.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-slate-500 mt-2">{product.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">{product.price}</span>
                  <button className="text-sm font-semibold text-emerald-600">أضف للسلة</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-emerald-600 font-semibold">خطط الأسعار</p>
          <h2 className="text-3xl font-bold mt-3">خطط مرنة تناسب كل متجر</h2>
          <p className="text-slate-600 mt-4">
            اختر الخطة المناسبة لحجم مبيعاتك مع إمكانية الترقية في أي وقت.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'انطلاق',
              price: '249 ر.س/شهر',
              features: ['عدد منتجات غير محدود', 'تقارير أسبوعية', 'دعم بريد إلكتروني']
            },
            {
              name: 'نمو',
              price: '499 ر.س/شهر',
              features: ['لوحة تحكم متقدمة', 'حملات تسويقية', 'دعم فوري عبر الدردشة'],
              featured: true
            },
            {
              name: 'احترافي',
              price: '899 ر.س/شهر',
              features: ['مدير حساب مخصص', 'تكاملات ERP', 'تقارير فورية 24/7']
            }
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-6 shadow-sm ${
                plan.featured
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-100 bg-white'
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-2 text-2xl font-bold">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition">
                اختر الخطة
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-emerald-300 font-semibold">قصص نجاح</p>
            <h2 className="text-3xl font-bold mt-3">شركاؤنا حققوا نمواً ملحوظاً</h2>
            <p className="text-slate-300 mt-4">
              اعتمدت أكثر من 120 ألف علامة على منصتنا لزيادة مبيعاتها وتحسين تجربة العملاء.
            </p>
          </div>
          <div className="space-y-6">
            {testimonials.map((item) => (
              <div key={item.name} className="bg-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-slate-400">{item.role}</p>
                  </div>
                  <div className="flex gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-slate-300">{item.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-emerald-600 font-semibold">الأسئلة الشائعة</p>
            <h2 className="text-3xl font-bold mt-3">نحن هنا لمساعدتك دائماً</h2>
            <p className="text-slate-600 mt-4">
              إجابات مباشرة لأكثر الأسئلة التي تردنا من أصحاب المتاجر والعملاء.
            </p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                <p className="text-sm text-slate-500 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold">تواصل مع فريق المبيعات</h2>
            <p className="mt-4 text-emerald-100">
              أخبرنا عن متجرك وسنساعدك في اختيار الخطة المناسبة وتحقيق أعلى المبيعات.
            </p>
            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <span>9200 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <span>sales@elite-market.sa</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5" />
                <span>الرياض - حي الصحافة</span>
              </div>
            </div>
          </div>
          <form className="bg-white text-slate-900 rounded-3xl p-6 space-y-4">
            <div>
              <label className="text-sm font-semibold">الاسم الكامل</label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="اكتب اسمك"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">البريد الإلكتروني</label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">نبذة عن مشروعك</label>
              <textarea
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                rows={4}
                placeholder="صف احتياجاتك بإيجاز"
              />
            </div>
            <button className="w-full py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
              أرسل الطلب
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-lg font-bold">سوق النخبة</p>
            <p className="text-sm text-slate-500 mt-2">
              منصة مبيعات متكاملة تساعدك على إطلاق متجرك بسرعة وتحقيق نمو مستدام.
            </p>
          </div>
          <div className="text-sm text-slate-600 space-y-2">
            <p className="font-semibold text-slate-900">روابط سريعة</p>
            <p>عن المنصة</p>
            <p>الشحن والاسترجاع</p>
            <p>الأسئلة الشائعة</p>
          </div>
          <div className="text-sm text-slate-600 space-y-2">
            <p className="font-semibold text-slate-900">اشترك في النشرة</p>
            <p>احصل على عروض وخصومات حصرية أسبوعياً.</p>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-full border border-slate-200 px-4 py-2"
                placeholder="بريدك الإلكتروني"
              />
              <button className="px-4 py-2 rounded-full bg-slate-900 text-white">اشتراك</button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-100 text-center text-xs text-slate-400 py-4">
          جميع الحقوق محفوظة © 2024 سوق النخبة
        </div>
      </footer>
    </div>
  );
};

export default App;
