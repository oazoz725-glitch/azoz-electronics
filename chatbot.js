// ===== AZZOUZ ELECTRONICS CHATBOT =====
const Chatbot = (() => {

  const storeInfo = {
    name: 'عزوز للإلكترونيات',
    since: 1992,
    specialties: ['ملفات السماعات', 'أمبليفاير', 'ترانزستورات', 'موسفتات', 'ICs', 'بطاريات ليثيوم', 'دوائر شحن وحماية', 'كاسيت سيارة', 'أدابترات'],
    phone: '01xxxxxxxxxx',
    location: 'مصر',
  };

  const responses = {
    greeting: [
      'أهلاً وسهلاً! 👋 أنا مساعد عزوز للإلكترونيات. كيف أقدر أساعدك؟',
      'مرحباً بك في عزوز للإلكترونيات! 🌟 إيه اللي بتدور عليه؟',
      'أهلاً! عندنا أفضل قطع الإلكترونيات منذ 1992 💪 إيه احتياجك؟',
    ],
    thanks: [
      'بكل سرور! 😊 في أي خدمة تانية؟',
      'العفو! نحن دايماً في الخدمة 🤝',
      'يسعدنا خدمتك! هل تحتاج شيء آخر؟',
    ],
    unknown: [
      'آسف، مش فاهم السؤال كويس. ممكن توضح أكتر؟ 🤔',
      'مش واضح معي. حاول تسأل بطريقة مختلفة أو تواصل معنا مباشرة.',
      'للاستفسارات المعقدة، تواصل مع فريقنا على الهاتف. 📞',
    ],
  };

  const knowledge = [
    {
      keywords: ['سلام', 'اهلا', 'أهلا', 'هلو', 'مرحبا', 'صباح', 'مساء', 'هاي', 'hi', 'hello'],
      answer: () => responses.greeting[Math.floor(Math.random() * responses.greeting.length)],
    },
    {
      keywords: ['شكرا', 'شكراً', 'تسلم', 'ممتاز', 'عظيم', 'تمام'],
      answer: () => responses.thanks[Math.floor(Math.random() * responses.thanks.length)],
    },
    {
      keywords: ['انتم مين', 'عن المتجر', 'من انتم', 'متجركم', 'بتبيعوا ايه'],
      answer: () => `نحن **${storeInfo.name}** 🌟\n\nمتجر إلكترونيات متخصص منذ **عام ${storeInfo.since}** - أكثر من 30 سنة خبرة!\n\nنبيع:\n• ملفات السماعات 🔊\n• أمبليفاير وقطع الصوت 📡\n• ترانزستورات وموسفتات ⚡\n• ICs ودوائر إلكترونية 💡\n• بطاريات ليثيوم وملحقاتها 🔋\n• كاسيت السيارة وأودي 🚗\n• أدابترات ومحولات 🔌`,
    },
    {
      keywords: ['ملف سماعة', 'ملفات', 'سماعة', 'فويس كويل', 'voice coil', 'بوصة'],
      answer: () => {
        const speakers = PRODUCTS.filter(p => p.category === 'speakers');
        let msg = '🔊 **ملفات السماعات المتاحة:**\n\n';
        speakers.forEach(s => {
          msg += `• **${s.name}** - ${s.price} جنيه\n`;
        });
        msg += '\nكل الملفات متوفرة بجودة عالية! أي مقاس تحتاج؟';
        return msg;
      },
    },
    {
      keywords: ['امبليفاير', 'أمبليفاير', 'مكبر', 'tda', 'lm3886', 'ic صوت'],
      answer: () => {
        const amps = PRODUCTS.filter(p => p.category === 'amplifier');
        let msg = '📡 **أشرطة الأمبليفاير المتاحة:**\n\n';
        amps.forEach(a => {
          msg += `• **${a.name}** - ${a.price} جنيه\n`;
        });
        msg += '\nعايز أنصحك بإيه بالظبط؟ قولي القدرة المطلوبة بالواط.';
        return msg;
      },
    },
    {
      keywords: ['ترانزستور', 'transistor', 'tip41', 'tip42', '2n3055', 'موسفت', 'mosfet', 'irfz44', 'irf3205'],
      answer: () => {
        const trans = PRODUCTS.filter(p => p.category === 'transistor');
        let msg = '⚡ **الترانزستورات والموسفتات:**\n\n';
        trans.forEach(t => {
          msg += `• **${t.name}** - ${t.price} جنيه\n`;
        });
        msg += '\nكلهم أصلي وجودة عالية! أي نوع تحتاج؟';
        return msg;
      },
    },
    {
      keywords: ['بطارية', 'ليثيوم', 'حجر', '18650', '21700', 'باك', 'li-ion', 'lithium'],
      answer: () => {
        const batt = PRODUCTS.filter(p => p.category === 'battery');
        let msg = '🔋 **بطاريات الليثيوم المتاحة:**\n\n';
        batt.forEach(b => {
          msg += `• **${b.name}** - ${b.price} جنيه\n`;
        });
        msg += '\nعايز مساعدة في اختيار البطارية المناسبة لمشروعك؟';
        return msg;
      },
    },
    {
      keywords: ['شحن', 'bms', 'tp4056', 'حماية', 'دائرة شحن', 'دائرة حماية'],
      answer: () => {
        const charging = PRODUCTS.filter(p => p.category === 'charging');
        let msg = '🛡️ **دوائر الشحن والحماية:**\n\n';
        charging.forEach(c => {
          msg += `• **${c.name}** - ${c.price} جنيه\n`;
        });
        msg += '\nعندنا كل احتياجات بطاريات الليثيوم! كام خلية في مشروعك؟';
        return msg;
      },
    },
    {
      keywords: ['كاسيت', 'سيارة', 'car', 'أودي سيارة', 'راديو'],
      answer: () => {
        const car = PRODUCTS.filter(p => p.category === 'car');
        let msg = '🚗 **منتجات كاسيت السيارة:**\n\n';
        car.forEach(c => {
          msg += `• **${c.name}** - ${c.price} جنيه\n`;
        });
        msg += '\nعايز تجديد أودي سيارتك؟ هنساعدك!';
        return msg;
      },
    },
    {
      keywords: ['أدابتر', 'ادابتر', 'محول', 'adapter', 'شاحن', 'باور'],
      answer: () => {
        const adapters = PRODUCTS.filter(p => p.category === 'adapter');
        let msg = '🔌 **الأدابترات والمحولات:**\n\n';
        adapters.forEach(a => {
          msg += `• **${a.name}** - ${a.price} جنيه\n`;
        });
        msg += '\nمحتاج جهد معين؟ قولي ونساعدك!';
        return msg;
      },
    },
    {
      keywords: ['ic', 'ne555', 'lm317', 'lm7805', 'دائرة متكاملة', 'ايسيه'],
      answer: () => {
        const ics = PRODUCTS.filter(p => p.category === 'ic');
        let msg = '💡 **الدوائر المتكاملة ICs:**\n\n';
        ics.forEach(i => {
          msg += `• **${i.name}** - ${i.price} جنيه\n`;
        });
        return msg;
      },
    },
    {
      keywords: ['مقاومة', 'resistor', 'مكثف', 'capacitor', 'قطع', 'كومبوننت'],
      answer: () => {
        const res = PRODUCTS.filter(p => p.category === 'resistor');
        let msg = '🔩 **المقاومات والمكثفات:**\n\n';
        res.forEach(r => {
          msg += `• **${r.name}** - ${r.price} جنيه\n`;
        });
        return msg;
      },
    },
    {
      keywords: ['سعر', 'بكام', 'كام', 'تمن', 'ثمن', 'سعره', 'يساوي'],
      answer: (msg) => {
        const found = PRODUCTS.find(p =>
          msg.toLowerCase().includes(p.nameEn.toLowerCase()) ||
          msg.includes(p.name.split('–')[0].trim())
        );
        if (found) {
          return `💰 **${found.name}**\n\nالسعر: **${found.price} جنيه**${found.oldPrice ? `\n~~${found.oldPrice} جنيه~~` : ''}\n\nتقدر تضيفه للسلة مباشرة من صفحة المنتجات!`;
        }
        return 'قولي اسم المنتج اللي تريد سعره وهجيبهولك فوراً! 💰';
      },
    },
    {
      keywords: ['توصية', 'انصحني', 'أنصحني', 'محتاج', 'مشروع'],
      answer: () => '💡 **حتساعدني أنصحك بشكل أفضل:**\n\n1️⃣ إيه طبيعة مشروعك؟\n2️⃣ إيه الجهد والتيار المطلوب؟\n3️⃣ إيه الميزانية تقريباً؟\n\nبعد ما تجاوبني هعطيك توصية مظبوطة! 🎯',
    },
    {
      keywords: ['شحن توصيل', 'توصيل', 'delivery', 'شحن للمنزل'],
      answer: () => '🚚 **معلومات الشحن والتوصيل:**\n\n• الطلبات فوق **500 جنيه**: شحن مجاني 🎉\n• الطلبات أقل من 500 جنيه: 50 جنيه\n• مدة التوصيل: 2-5 أيام عمل\n• متاح لجميع محافظات مصر',
    },
    {
      keywords: ['ضمان', 'استرجاع', 'إرجاع', 'عطل'],
      answer: () => '✅ **سياسة الضمان:**\n\n• **ICs والترانزستورات**: ضمان 30 يوم\n• **البطاريات والدوائر**: ضمان 60 يوم\n• **ملفات السماعات**: ضمان 90 يوم\n\nنحن نضمن جودة جميع منتجاتنا 💪',
    },
    {
      keywords: ['عنوان', 'مكان', 'فين', 'موقعكم', 'محل', 'الفيوم', 'السهراية'],
      answer: () => '📍 **عنوان المحل:**\n\nالفيوم - السهراية - أمام مستشفى الشفاء ومسجد الصباحية 🏛️\n\n• هاتف وواتساب: **01065636323**\n• ساعات العمل: 9 صباحاً - 9 مساءً يومياً',
    },
    {
      keywords: ['تواصل', 'اتصال', 'هاتف', 'تليفون', 'واتساب', 'whatsapp'],
      answer: () => '📞 **تواصل معنا:**\n\n• هاتف وواتساب: **01065636323**\n• العنوان: الفيوم - السهراية - أمام مستشفى الشفاء ومسجد الصباحية\n• ساعات العمل: 9ص - 9م\n\nنرد بسرعة على جميع الاستفسارات! 😊',
    },
    {
      keywords: ['عروض', 'خصم', 'تخفيض', 'offer', 'sale'],
      answer: () => {
        const sales = PRODUCTS.filter(p => p.badge === 'sale' || p.oldPrice);
        let msg = '🎉 **العروض الحالية:**\n\n';
        sales.forEach(s => {
          const disc = Math.round(((s.oldPrice - s.price) / s.oldPrice) * 100);
          msg += `• **${s.name}**\n  ${s.price} جنيه بدلاً من ${s.oldPrice} جنيه (خصم ${disc}%)\n\n`;
        });
        return msg;
      },
    },
    {
      keywords: ['جديد', 'جديدة', 'وصل', 'new'],
      answer: () => {
        const newItems = PRODUCTS.filter(p => p.badge === 'new');
        let msg = '✨ **المنتجات الجديدة:**\n\n';
        newItems.forEach(p => {
          msg += `• **${p.name}** - ${p.price} جنيه ✨\n`;
        });
        return msg;
      },
    },
  ];

  function getResponse(userMessage) {
    const msg = userMessage.toLowerCase().trim();

    for (const rule of knowledge) {
      if (rule.keywords.some(k => msg.includes(k.toLowerCase()))) {
        const ans = rule.answer(userMessage);
        return formatResponse(ans);
      }
    }

    // Try to find product by name
    const matchedProduct = PRODUCTS.find(p =>
      msg.includes(p.name.substring(0, 8).toLowerCase()) ||
      (p.nameEn && msg.includes(p.nameEn.toLowerCase().split(' ')[0]))
    );

    if (matchedProduct) {
      return formatResponse(`🛍️ **${matchedProduct.name}**\n\n📝 ${matchedProduct.desc}\n\n💰 السعر: **${matchedProduct.price} جنيه**\n\n🔧 المواصفات:\n${matchedProduct.specs.map(s => `• ${s}`).join('\n')}`);
    }

    return formatResponse(responses.unknown[Math.floor(Math.random() * responses.unknown.length)]);
  }

  function formatResponse(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/~~(.*?)~~/g, '<del>$1</del>')
      .replace(/\n/g, '<br>');
  }

  // ===== CHATBOT UI =====
  let isOpen = false;
  let isTyping = false;
  const quickReplies = [
    'ملفات السماعات', 'أمبليفاير', 'بطاريات ليثيوم',
    'العروض', 'التوصيل', 'تواصل معنا'
  ];

  function init() {
    const toggle = document.getElementById('chatbot-toggle');
    const window_ = document.getElementById('chatbot-window');
    const close = document.getElementById('chatbot-close');
    const input = document.getElementById('chatbot-input');
    const send = document.getElementById('chatbot-send');
    const messages = document.getElementById('chatbot-messages');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      window_.classList.toggle('open', isOpen);
      toggle.textContent = isOpen ? '✕' : '🤖';
      if (isOpen && messages.children.length === 0) {
        addBotMessage(
          'أهلاً وسهلاً! 👋 أنا مساعد <strong>عزوز للإلكترونيات</strong><br><br>هقدر أساعدك في:<br>• استفسار عن المنتجات<br>• معرفة الأسعار<br>• اختيار القطعة المناسبة<br>• معلومات الشحن والضمان',
          true
        );
      }
    });

    close.addEventListener('click', () => {
      isOpen = false;
      window_.classList.remove('open');
      toggle.textContent = '🤖';
    });

    send.addEventListener('click', handleSend);
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') handleSend();
    });

    function handleSend() {
      const msg = input.value.trim();
      if (!msg || isTyping) return;
      addUserMessage(msg);
      input.value = '';
      showTyping();
      setTimeout(() => {
        removeTyping();
        addBotMessage(getResponse(msg));
      }, 800 + Math.random() * 600);
    }
  }

  function addBotMessage(html, withQuickReplies = false) {
    const messages = document.getElementById('chatbot-messages');
    if (!messages) return;

    const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.innerHTML = `
      <div class="msg-bubble">${html}</div>
      <div class="msg-time">${time}</div>
      ${withQuickReplies ? `
        <div class="quick-replies">
          ${quickReplies.map(q => `<button class="quick-reply" onclick="handleQuickReply('${q}')">${q}</button>`).join('')}
        </div>
      ` : ''}
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function addUserMessage(text) {
    const messages = document.getElementById('chatbot-messages');
    if (!messages) return;

    const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const div = document.createElement('div');
    div.className = 'chat-msg user';
    div.innerHTML = `
      <div class="msg-bubble">${text}</div>
      <div class="msg-time">${time}</div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    isTyping = true;
    const messages = document.getElementById('chatbot-messages');
    if (!messages) return;
    const div = document.createElement('div');
    div.className = 'chat-msg bot';
    div.id = 'typing-indicator';
    div.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    isTyping = false;
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  return { init, getResponse };
})();

function handleQuickReply(text) {
  const input = document.getElementById('chatbot-input');
  if (input) {
    input.value = text;
    input.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' }));
  }
}

document.addEventListener('DOMContentLoaded', () => Chatbot.init());
