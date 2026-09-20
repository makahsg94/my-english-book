// ---------------------------------------------------------------------------
// Comprehensive review data - extracted and translated from the Speakout B1
// unit lessons. Vocabulary tables (word + Arabic meaning + example), grammar
// summaries and a 25-question quiz. Rendered by pages/ReviewPage.tsx
// ---------------------------------------------------------------------------
export interface ReviewVocabTable {
  title: string
  headers: string[]
  rows: string[][]
}

export interface ReviewVocabGroup {
  unit: string
  tables: ReviewVocabTable[]
}

export const REVIEW_VOCAB: ReviewVocabGroup[] = [
  {
    "unit": "الوحدة 1: People",
    "tables": [
      {
        "title": "الناس والعلاقات – People and relationships (1A)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "teammate",
            "زميل في نفس الفريق",
            "I get on well with my teammates on the football team."
          ],
          [
            "colleague",
            "زميل في الشغل",
            "I'm friendly with most of my colleagues."
          ],
          [
            "manager",
            "المدير",
            "I have a really good manager. I look up to her."
          ],
          [
            "close friend",
            "صديق مقرّب",
            "I also have a group of close friends and we sometimes play music together."
          ],
          [
            "partner",
            "شريك الحياة",
            "My partner is my best friend."
          ],
          [
            "grandparent",
            "جد / جدة",
            "My grandparents were very important to me."
          ],
          [
            "daughter",
            "بنت",
            "My daughter takes after my mother."
          ],
          [
            "children",
            "أولاد",
            "I want my children to have a good relationship with my parents."
          ]
        ]
      },
      {
        "title": "صفات الشخصية – Personality adjectives (1A)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "funny",
            "مضحك",
            "They're so funny, and great to be with."
          ],
          [
            "kind",
            "طيب",
            "She's such a kind and generous person."
          ],
          [
            "generous",
            "كريم",
            "My grandfather is very generous with his time."
          ],
          [
            "hard-working",
            "مجتهد / شغال بجد",
            "They are hard-working and very reliable."
          ],
          [
            "reliable",
            "يمكن الاعتماد عليه",
            "She is a very reliable colleague."
          ],
          [
            "cheerful",
            "مرح / دمه خفيف",
            "She's always cheerful."
          ],
          [
            "calm",
            "هادي",
            "It’s amazing that he was so calm."
          ]
        ]
      },
      {
        "title": "الوظائف – Jobs (1B)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "chef",
            "شيف / طباخ",
            "A chef is responsible for planning the menu and creating new dishes."
          ],
          [
            "musician",
            "موسيقي",
            "My brother is a musician."
          ],
          [
            "mechanic",
            "ميكانيكي",
            "The mechanic fixed our car very quickly."
          ],
          [
            "financial consultant",
            "مستشار مالي",
            "I'd like to be a financial consultant because they earn a good salary."
          ],
          [
            "shop assistant",
            "بائع في محل",
            "The shop assistant recommended the blue jacket."
          ],
          [
            "plumber",
            "سباك",
            "We called a plumber to fix the kitchen tap."
          ],
          [
            "gardener",
            "بوستاني / عامل جنينة",
            "Our gardener looks after the plants once a week."
          ],
          [
            "journalist",
            "صحفي",
            "My sister is a journalist."
          ]
        ]
      },
      {
        "title": "مواضيع المحادثة – Conversation topics (1C)",
        "headers": [
          "العبارة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "clothes and fashion",
            "الموضة والملابس",
            "That's a nice jacket. Where did you get it?"
          ],
          [
            "food and eating out",
            "الأكل والخروج للأكل",
            "Have you tried these pastries? They look delicious."
          ],
          [
            "hobbies and free-time activities",
            "الهوايات وأنشطة وقت الفراغ",
            "What kinds of things do you paint?"
          ],
          [
            "holiday experiences",
            "تجارب الإجازات",
            "We've just got back from Corfu. It was wonderful."
          ],
          [
            "politics",
            "السياسة",
            "So, who do you think will win the election?"
          ],
          [
            "sport or music events",
            "ماتشات أو أحداث موسيقية",
            "It's the Big Music Live this weekend. Are you going?"
          ],
          [
            "the news",
            "الأخبار",
            "Did you hear about the fire in town? It’s terrible."
          ],
          [
            "the weather",
            "الطقس",
            "Lovely day, isn't it?"
          ],
          [
            "work or studies",
            "الشغل والمذاكرة",
            "I hear you have a job in finance. Do you enjoy it?"
          ]
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 2: Tale tellers",
    "tables": [
      {
        "title": "صفات المشاعر – Adjectives for feelings; -ed/-ing adjectives (2A)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "bored",
            "زهقان / حاسس بالملل",
            "We were bored, so we went into the garage."
          ],
          [
            "exciting",
            "مثير",
            "We were really excited when we found all dad’s paints."
          ],
          [
            "frightened",
            "خايف",
            "My sister and I were frightened."
          ],
          [
            "embarrassed",
            "محرج",
            "I think he found it a bit embarrassing."
          ],
          [
            "annoyed",
            "مضايق / زعلان",
            "Dad is going to be really annoyed!"
          ],
          [
            "surprised",
            "متفاجئ",
            "I'm surprised you chose blue."
          ],
          [
            "disappointed",
            "خايب أمل",
            "He was probably disappointed with us."
          ],
          [
            "amazed",
            "مذهول / منبهر",
            "It's amazing that he was so calm."
          ]
        ]
      },
      {
        "title": "كلمات القصة – Story words (2B)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "hero",
            "بطل القصة",
            "The hero of the film saves the town."
          ],
          [
            "characters",
            "شخصيات القصة",
            "The characters in this book are very realistic."
          ],
          [
            "plot",
            "الحبكة / مجريات الأحداث",
            "I think having an exciting plot is important."
          ],
          [
            "ending",
            "النهاية",
            "I like a happy ending, too."
          ],
          [
            "storyteller",
            "الراوي",
            "The storyteller at the festival was amazing."
          ],
          [
            "performances",
            "العروض / الأداء",
            "I love the actors' performances."
          ],
          [
            "fairytales",
            "حكايات خرافية",
            "My grandmother told me fairytales."
          ],
          [
            "TV shows",
            "برامج التليفزيون",
            "It's the same with TV shows and films."
          ]
        ]
      },
      {
        "title": "التوافقات مع get و make – Collocations with get and make (2C)",
        "headers": [
          "العبارة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "get off",
            "ينزل من مواصلة",
            "I got off at the wrong bus stop!"
          ],
          [
            "get lost",
            "يضيع / يضل الطريق",
            "Sorry I’m late – I got lost!"
          ],
          [
            "get held up",
            "يتأخر",
            "I got held up at work."
          ],
          [
            "get the wrong day/time/date/address",
            "يفهم اليوم/الوقت/التاريخ/العنوان غلط",
            "I got the wrong day!"
          ],
          [
            "make a mistake",
            "يعمل غلطة",
            "I made a mistake with the address."
          ],
          [
            "make a call",
            "يعمل مكالمة / يتصل",
            "I had to make an urgent call."
          ],
          [
            "make a plan",
            "يرتب خطة",
            "My partner made other plans and I didn’t know until it was too late."
          ],
          [
            "make a mess",
            "يعمل فوضى",
            "My little sister made a mess and I had to clean it up."
          ]
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 3: Questions",
    "tables": [
      {
        "title": "المعرفة: أفعال وأسماء – Knowledge: verbs and nouns (3A)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "note down",
            "يدوّن / يكتب عشان يفتكر",
            "I note down new information, and I use my notes to revise for exams."
          ],
          [
            "revise",
            "يراجع (لفحص)",
            "I use my notes to revise for exams."
          ],
          [
            "memory",
            "الذاكرة",
            "I read all the time and I have a good memory."
          ],
          [
            "a mind",
            "العقل",
            "I think my mind works that way."
          ],
          [
            "general knowledge",
            "ثقافة عامة",
            "My general knowledge is fine, although I don’t know much about sport!"
          ],
          [
            "solve (a problem)",
            "يحل مشكلة",
            "I love to do quizzes and solve problems."
          ],
          [
            "guess",
            "يخمّن",
            "If I don’t know the answer, I just guess!"
          ],
          [
            "score",
            "النقاط / الدرجة",
            "Even if I get a good score, I forget everything immediately afterwards!"
          ],
          [
            "data",
            "بيانات ومعلومات",
            "At work, I need to understand data and I’m quite good with numbers."
          ],
          [
            "an option",
            "خيار",
            "I try to choose the best option."
          ]
        ]
      },
      {
        "title": "القرارات – Decisions (3B)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "communicate",
            "يتواصل / يتبادل المعلومات",
            "Good teams communicate well."
          ]
        ]
      },
      {
        "title": "المرافق – Facilities (3C)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "facilities",
            "المرافق والخدمات",
            "The university offers all the facilities you need."
          ],
          [
            "campus",
            "الحرم الجامعي",
            "If you are studying at the University of Malta, the campus also has a sports centre."
          ],
          [
            "library",
            "المكتبة",
            "There is a main library which has a huge selection of books."
          ],
          [
            "sports centre",
            "مركز رياضي",
            "The campus has a sports centre with football pitches and a swimming pool."
          ],
          [
            "gym",
            "صالة جيم / رياضة",
            "Can I use the gym? I’d like to know when the gym opens in the morning."
          ],
          [
            "halls of residence",
            "سكن الجامعة",
            "You can stay in university halls of residence or with home-stay families."
          ],
          [
            "study areas",
            "أماكن المذاكرة",
            "There are outside study areas where students can study together."
          ],
          [
            "language schools",
            "معاهد اللغات",
            "You can register for a course at one of the many language schools on the island."
          ],
          [
            "employment office",
            "مكتب التوظيف",
            "Jobs in finance or tourism are easy to find in Malta."
          ],
          [
            "theatres",
            "المسارح",
            "The sports centre is in the town square, opposite the theatre."
          ]
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 4: winners",
    "tables": [
      {
        "title": "النجاح – Success (4A)",
        "headers": [
          "العبارة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "talented",
            "موهوب",
            "She's a really talented dancer - she's so good!"
          ],
          [
            "strict (with yourself)",
            "صارم مع نفسك",
            "He needs to be strict about when he starts work."
          ],
          [
            "do well",
            "ينجح / يظبط",
            "She is doing well at school and getting good grades."
          ],
          [
            "bad loser",
            "بزعل جدًا لما يخسر",
            "He hates it when his team doesn't win. He's a bad loser."
          ],
          [
            "working hard",
            "شغال بجد / مجتهد",
            "She's working hard, so I'm sure she'll be successful."
          ],
          [
            "competitive",
            "بيحب المنافسة",
            "The brothers are very competitive. They always want to win."
          ],
          [
            "carry on",
            "يكمل / يستمر",
            "Carry on playing and do not stop until you win."
          ],
          [
            "give up",
            "يستسلم / يبطل",
            "She is thinking about giving up her job."
          ],
          [
            "failure",
            "فشل",
            "Do not be afraid of failure."
          ],
          [
            "succeed",
            "ينجح / يحقق هدفه",
            "Only a few people achieve their dreams."
          ]
        ]
      },
      {
        "title": "توافقات التكنولوجيا وبناء الكلمات – Technology collocations; word building: suffixes (4B)",
        "headers": [
          "العبارة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "create a webpage",
            "ينشئ صفحة ويب",
            "Tim Berners-Lee showed how to create webpages."
          ],
          [
            "send / receive a text",
            "يبعت / يستلم رسالة نصية",
            "Didn’t you receive all my texts?"
          ],
          [
            "download an app",
            "ينزّل تطبيق",
            "You just use your email address and add a password."
          ],
          [
            "launch a website",
            "يطلق موقع ويب",
            "When we launched a website last year, we didn’t expect so many people to visit it so quickly!"
          ],
          [
            "post a photo",
            "ينشر صورة",
            "Do you post photos on social media?"
          ],
          [
            "share a video or photo",
            "يتشارك فيديو أو صورة",
            "I shared a video with my friends on Instagram."
          ],
          [
            "comment on a webpage",
            "يعلّق على صفحة ويب",
            "Please leave a comment on their website."
          ],
          [
            "go viral",
            "ينتشر بسرعة (viral)",
            "It didn’t exactly go viral, but it did launch a website that has been incredibly popular."
          ]
        ]
      },
      {
        "title": "الرياضات والألعاب – Sports and games (4C)",
        "headers": [
          "العبارة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "take part in",
            "يشارك في",
            "Do you take part in any sports?"
          ],
          [
            "support a team",
            "يشجع فريق",
            "I support Manchester United."
          ],
          [
            "a fan of a team/player",
            "مشجع لفريق / لاعب",
            "Are you a fan of any teams or players?"
          ],
          [
            "a champion",
            "بطل (الفائز)",
            "We're the champions!"
          ],
          [
            "score points / goals",
            "يسجل نقاط / أهداف",
            "Do you know how you score points?"
          ],
          [
            "board game",
            "لعبة لوحية",
            "Do you have any board games at home?"
          ],
          [
            "e-sports",
            "رياضات إلكترونية",
            "He takes part in e-sports competitions."
          ]
        ]
      },
      {
        "title": "عبارات مفيدة: رحلة لا تُنسى – Key phrases: a memorable journey (4D)",
        "headers": [
          "القاعدة",
          "مثال"
        ],
        "rows": [
          [
            "للتحدث عن أروع رحلة في حياتي",
            "The most memorable journey I've ever been on was…"
          ],
          [
            "للتعبير عن أول مرة",
            "It was my first time…"
          ],
          [
            "لوصف أنها كانت من أروع التجارب",
            "It was one of the most amazing…"
          ],
          [
            "لبيان سبب عدم نسيانها",
            "It was memorable because…"
          ],
          [
            "لذكر مدة الرحلة",
            "The journey took… days."
          ],
          [
            "لوصف أكثر الأماكن إثارة للاهتمام",
            "… is definitely the most interesting place I've been to."
          ]
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 5: news",
    "tables": [
      {
        "title": "الأخبار ووسائل التواصل الاجتماعي – news and social media (5A)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "publish",
            "ينشر",
            ""
          ],
          [
            "journalist",
            "صحفي",
            ""
          ],
          [
            "find out",
            "يكتشف / يعرف (معلومة)",
            ""
          ],
          [
            "post",
            "ينشر / يرفع قصة على الإنترنت",
            ""
          ],
          [
            "headline",
            "عنوان الخبر (بالخط الكبير)",
            ""
          ],
          [
            "fake news",
            "أخبار مزيفة / كدابة",
            ""
          ],
          [
            "the facts",
            "الحقائق",
            ""
          ],
          [
            "blog post",
            "منشور / تدوينة على مدونة",
            ""
          ],
          [
            "go viral",
            "ينتشر بسرعة على الإنترنت (فيروسي)",
            ""
          ],
          [
            "spot",
            "يشوف / يلاحظ",
            "I think it’s pretty easy to spot this kind of story."
          ]
        ]
      },
      {
        "title": "قضايا اجتماعية؛ البيئة – social issues; the environment (5B)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "pollution",
            "تلوث",
            ""
          ],
          [
            "level",
            "المستوى / الكمية",
            "Levels of pollution means the amount of dirt or unwanted objects in the environment."
          ],
          [
            "recycle",
            "يعيد تدوير",
            ""
          ],
          [
            "waste",
            "نفايات / زبالة",
            ""
          ],
          [
            "campaign",
            "حملة (توعية / إعلانية)",
            ""
          ],
          [
            "activists",
            "نشطاء",
            ""
          ],
          [
            "collect",
            "يجمع",
            ""
          ],
          [
            "charity",
            "جمعية خيرية",
            ""
          ],
          [
            "donate",
            "يتبرع",
            ""
          ],
          [
            "environment",
            "البيئة / الطبيعة حوالينا",
            ""
          ]
        ]
      },
      {
        "title": "الأحداث والمناسبات – events and occasions (5C)",
        "headers": [
          "العبارة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "pass your exams/driving test",
            "تنجح في الامتحانات / اختبار القيادة",
            "I passed my driving test."
          ],
          [
            "fail your exams/driving test",
            "تسقط (تفشل) في الامتحانات / اختبار القيادة",
            "I failed my accountancy exams for the third time."
          ],
          [
            "have a baby",
            "تخلف / عندك بيبي",
            "Lolita was born on Saturday."
          ],
          [
            "lose your job",
            "تخسر شغلك / تشتغيلك",
            "I’m now worried I might lose my job."
          ],
          [
            "get promoted / a new job",
            "تترقى / تاخد شغل جديد",
            "I got promoted, so I’m now earning more money."
          ],
          [
            "have an argument",
            "تخانق / عندك خلاف",
            "I had an argument with a friend."
          ],
          [
            "win a competition/match",
            "تكسب مسابقة / ماتش",
            "I won a competition and got a prize."
          ],
          [
            "get engaged/married",
            "تُخطب / تتجوز",
            "We’re getting married in the summer."
          ],
          [
            "break your phone/laptop",
            "تكسر موبايلك / لابتوبك",
            "I broke my phone."
          ],
          [
            "get 2,000 likes",
            "تاخد 2000 لايك",
            "My video got over 2,000 likes!"
          ],
          [
            "graduate from university",
            "تتخرج من الجامعة",
            "I graduated from university last year."
          ],
          [
            "move house",
            "تنقل بيت جديد",
            "I’ve just moved into a really nice house."
          ],
          [
            "have your birthday",
            "تعيد ميلادك",
            "How did you have your last birthday?"
          ],
          [
            "quit your job",
            "تسيب شغلك",
            "I’m thinking about quitting my job."
          ],
          [
            "celebrate",
            "تحتفل",
            "We’re having a party for my 40th."
          ]
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 6: creators",
    "tables": [
      {
        "title": "الفنون – the arts (6A)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "musician",
            "عازف / موسيقي",
            ""
          ],
          [
            "the arts",
            "الفنون (موسيقى، كتابة، رسم، أدب، سينما)",
            ""
          ],
          [
            "performer",
            "مؤدي / فنان بيعزف أو بيمثل قدام الناس",
            ""
          ],
          [
            "recording",
            "تسجيل",
            ""
          ],
          [
            "painter",
            "رسام",
            ""
          ],
          [
            "style",
            "أسلوب / ستايل",
            ""
          ],
          [
            "subjects",
            "المواضيع",
            ""
          ],
          [
            "composer",
            "ملحن / مؤلف موسيقى",
            ""
          ],
          [
            "works",
            "الأعمال الفنية",
            ""
          ],
          [
            "image",
            "صورة",
            ""
          ]
        ]
      },
      {
        "title": "تكوين الكلمات (الإبداع) – creativity: word building (6B)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "imagine / imagination / imaginative",
            "فعل / اسم / صفة",
            ""
          ],
          [
            "create / creativity / creative",
            "فعل / اسم / صفة",
            ""
          ],
          [
            "art / art / artistic",
            "اسم / اسم / صفة",
            ""
          ],
          [
            "photograph / photography / photographic",
            "فعل / اسم / صفة",
            ""
          ],
          [
            "skill / skill / skilful",
            "فعل / اسم / صفة",
            ""
          ],
          [
            "talent / talent / talented",
            "فعل / اسم / صفة",
            ""
          ]
        ]
      },
      {
        "title": "صفات متطرفة – extreme adjectives (6C)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "good",
            "صفة عادية",
            "We can say 'very good'. We can't say 'very fantastic'."
          ],
          [
            "fantastic",
            "صفة متطرفة (قوية)",
            "We can say 'absolutely fantastic'. We can't say 'absolutely good'."
          ],
          [
            "bad / terrible",
            "عادية / متطرفة",
            ""
          ],
          [
            "interesting / fascinating",
            "عادية / متطرفة",
            ""
          ],
          [
            "big / huge",
            "عادية / متطرفة",
            ""
          ],
          [
            "small / tiny",
            "عادية / متطرفة",
            ""
          ],
          [
            "important / essential",
            "عادية / متطرفة",
            ""
          ],
          [
            "difficult / impossible",
            "عادية / متطرفة",
            ""
          ]
        ]
      },
      {
        "title": "اطلب وادّي رأي وأسباب – Ask for and give opinions and reasons (6C)",
        "headers": [
          "الموقف / العبارة",
          "الرد"
        ],
        "rows": [
          [
            "طلب رأي – Asking for an opinion (How about you? / What makes you say that? / What do/did you think of…?)",
            "فاكر إيه فيها؟ (What do you think about it?)"
          ],
          [
            "إبداء رأي – Giving an opinion (Forme,… / In my view,… / I think… / I would say…)",
            "في رأيي، التصميم جديد ومثير فعلًا. (In my view, it’s a really new and exciting design.)"
          ],
          [
            "طلب سبب – Asking for a reason (Why do you think that?)",
            "ليه فاكر كده؟ (Why do you think that?)"
          ],
          [
            "إعطاء سبب – Giving a reason (The reason is… / It’s because…)",
            "عشانه مجاني. (It’s because it’s free.)"
          ],
          [
            "الاتفاق على الاختلاف – Agreeing to disagree (I suppose we’re all different. / I guess it’s good we’re not all the same.)",
            "أعتقد إن كلنا بندوق حاجات مختلفة. (I guess we all like different things.)"
          ]
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 7: travel",
    "tables": [
      {
        "title": "السفر والسياحة – travel and tourism (7A)",
        "headers": [
          "العبارة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "tradition / traditional",
            "تقليد / تقليدي",
            "It’s a local tradition in Poland for people to throw water at each other on ‘wet Monday’."
          ],
          [
            "custom",
            "عُرف / عادة",
            "Family life is very important in Italian customs."
          ],
          [
            "out of season",
            "خارج الموسم (سياح أقل)",
            "You can usually find much better prices if you travel out of season."
          ],
          [
            "festival",
            "مهرجان / عيد",
            "Chinese New Year is one of China’s most important festivals."
          ],
          [
            "tourist destination",
            "وجهة سياحية",
            "The USA, Spain and Japan are three of the most popular tourist destinations."
          ],
          [
            "weekend trip / break",
            "رحلة / أجازة نهاية الأسبوع",
            "We're going for a short break to the Lake District this weekend."
          ],
          [
            "go sightseeing",
            "تتفرج على المعالم السياحية",
            "We saw all the main sights yesterday."
          ],
          [
            "queue",
            "طابور / دور",
            "I hate standing in queues with all those people."
          ],
          [
            "traffic jams",
            "زحمة سير",
            "There are often traffic jams on the way to the beach."
          ],
          [
            "attractions",
            "أماكن جذب سياحي",
            "Which attractions do you visit?"
          ],
          [
            "trip",
            "رحلة",
            "We’re going on a trip to the Lake District."
          ]
        ]
      },
      {
        "title": "الطبيعة – the natural world (7B)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "coast",
            "ساحل",
            "I walked along the coast every morning."
          ],
          [
            "beach",
            "شاطئ",
            "Those dogs on the beach were my friends."
          ],
          [
            "landscape",
            "منظر طبيعي",
            "The landscape was never boring."
          ],
          [
            "field",
            "حقل",
            "We walked through green fields."
          ],
          [
            "valley",
            "وادي",
            "We went over hills, through valleys."
          ],
          [
            "stream / river",
            "جدول / نهر",
            "We walked next to streams and rivers."
          ],
          [
            "forest",
            "غابة",
            "The path led through a forest."
          ]
        ]
      },
      {
        "title": "وصف الأماكن – describing places (7C)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "vibrant",
            "نابض بالحياة / مليء بالطاقة",
            "It's worth a visit to experience this vibrant, exciting and modern city."
          ],
          [
            "modern",
            "حديث / عصري",
            "The buildings are modern."
          ],
          [
            "ancient",
            "قديم / أثري",
            "This ancient bridge is over 800 years old."
          ],
          [
            "narrow / wide",
            "ضيق / واسع",
            "The streets are so narrow you can't drive down them."
          ],
          [
            "peaceful",
            "هادئ / مريح",
            "I love sitting in the park - it’s so peaceful."
          ],
          [
            "wooden",
            "خشبي",
            "There are some old wooden benches."
          ],
          [
            "colourful",
            "ملوّن / بألوان زاهية",
            "The buildings are colourful."
          ],
          [
            "historical",
            "تاريخي",
            "There are many historical buildings in Rome."
          ],
          [
            "traditional",
            "تقليدي",
            "We saw traditional houses in the old town."
          ],
          [
            "famous for",
            "مشهور بـ",
            "The city is famous for its beautiful views."
          ]
        ]
      },
      {
        "title": "اعمل وردّ على توصيات – make and respond to recommendations (7C)",
        "headers": [
          "الموقف / العبارة",
          "الرد"
        ],
        "rows": [
          [
            "There are a few things you absolutely have to see/do… (توصية قوية)",
            "طريقة قوية للتوصية (a strong way to recommend)"
          ],
          [
            "You must visit/try/see… (توصية قوية)",
            "استخدم must + فعل (use must + verb)"
          ],
          [
            "You should definitely visit… (توصية قوية)",
            "استخدم should + definitely (use should + definitely)"
          ],
          [
            "Make sure you… (تخليه ماينساش)",
            "يتبعه مضارع بسيط (make sure + present simple)"
          ],
          [
            "… is one of the best things to do… (توصية بأفضل ما في المكان)",
            "حاجة من أحسن الحاجات (it's one of the best)"
          ],
          [
            "It’s a lovely/great place to… (توصية بمكان لنشاط)",
            "مكان جميل ينفع + فعل (it's a lovely place to + verb)"
          ],
          [
            "Don’t leave without visiting/seeing… (لا يفوتك)",
            "متفوتش من غير + ing (don't + without + -ing)"
          ],
          [
            "Oh wow! How exciting! (الرد بحماس)",
            "الرد: فكرة عظيمة / فكرة كويسة / ده يبان مثير (responding: That's a great idea. / OK, that's a good idea. / That sounds interesting.)"
          ]
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 8: know-how",
    "tables": [
      {
        "title": "قدرات عملية؛ أفعال مركبة للقدرات – practical abilities; abilities: phrasal verbs (8A)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "repair",
            "يصلح",
            "He sometimes has to repair things that go wrong."
          ],
          [
            "replace",
            "يستبدل",
            "He replaced the old parts of his van."
          ],
          [
            "upload",
            "يرفع حاجة على الإنترنت",
            "He uploads the videos to YouTube."
          ],
          [
            "put up",
            "يثبّت / يعلّق على الحائط",
            "They put up shelves."
          ],
          [
            "calculate",
            "يحسب",
            "He calculated what size it should be."
          ],
          [
            "design",
            "يصمم / يرسم ويخطط",
            "He designed the tiny house."
          ],
          [
            "install",
            "يركّب (تقنية)",
            "He installed electricity."
          ],
          [
            "turn (something) into (something else)",
            "يحوّل (حاجة) إلى (حاجة تانية)",
            "He turned his van into a mobile studio."
          ],
          [
            "solve a problem",
            "يحل مشكلة",
            "They had to solve a few problems."
          ],
          [
            "arrange",
            "يرتب / ينسق",
            "They arranged access to running water."
          ]
        ]
      },
      {
        "title": "مصاحبات الفيديو – video collocations (8B)",
        "headers": [
          "الكلمة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "clip",
            "مقطع قصير من فيديو أطول",
            "A video clip is a short piece from a longer video."
          ],
          [
            "share",
            "يشارك (فيديو) على السوشيال ميديا",
            "If you share a video, other people can watch it too."
          ],
          [
            "edit",
            "يعدّل الفيديو / يقصه",
            "When you edit a video, you make it shorter."
          ],
          [
            "like",
            "يعمل لايك / يبيّن إنه عاجبه",
            "You might like the video."
          ],
          [
            "comment",
            "يكتب تعليق على فيديو",
            "You might comment on it."
          ],
          [
            "make",
            "يعمل / بيصوّر فيديو",
            "A lot of people make videos to use for marketing."
          ],
          [
            "vlog",
            "مدونة فيديو (فلوغ)",
            "A video podcast is often called a vlog."
          ],
          [
            "upload",
            "يرفع الفيديو على الإنترنت",
            "Hundreds of hours of video are uploaded to YouTube every minute."
          ]
        ]
      },
      {
        "title": "مشاكل تقنية – technical problems (8C)",
        "headers": [
          "العبارة",
          "المعنى",
          "مثال"
        ],
        "rows": [
          [
            "crash",
            "يعلّق / يقف فجأة (للجهاز)",
            "My computer keeps crashing in the middle of a meeting."
          ],
          [
            "out of order",
            "معطل / مش شغال (للماكينة)",
            "The photocopier is out of order."
          ],
          [
            "broken",
            "مكسور / معطل",
            "The printer is broken."
          ],
          [
            "run out of charge",
            "البطارية تخلص (مفيش طاقة)",
            "My phone runs out of charge too quickly."
          ],
          [
            "lose the wifi signal",
            "يفقد إشارة الواي فاي",
            "I lost the wifi signal."
          ],
          [
            "open / download / attach a file",
            "يفتح / يحمّل / يرفق ملف",
            "I can’t open a file or attachment on my laptop."
          ],
          [
            "create / change / forget a password",
            "يعمل / يغيّر / ينسى باسورد",
            "You can’t use your account until you log in and create a new password."
          ],
          [
            "slow internet connection",
            "إنترنت بطيء",
            "You have a slow internet connection."
          ],
          [
            "get cut off",
            "ينقطع عنك الكلام في المكالمة",
            "I get cut off after waiting for twenty minutes."
          ]
        ]
      }
    ]
  }
]
export interface ReviewGrammarRule {
  rule: string
  examples: string
}

export interface ReviewGrammarPoint {
  title: string
  explanation: string
  rules: ReviewGrammarRule[]
}

export interface ReviewGrammarGroup {
  unit: string
  points: ReviewGrammarPoint[]
}

export const REVIEW_GRAMMAR: ReviewGrammarGroup[] = [
  {
    "unit": "الوحدة 1: People",
    "points": [
      {
        "title": "المضارع البسيط والمضارع المستمر – Present simple and present continuous; state verbs; adverbs of frequency (1A)",
        "explanation": "بنستخدم المضارع البسيط للحقائق والأشياء اللي بتحصل دائمًا أو عادة. وبنستخدم المضارع المستمر لأشياء بتحصل دلوقتي أو في الفترة دي. وفي أفعال بتوصف حالات (مشاعر وأفكار) مش أفعال حركة، وعادة مبنستخدمهاش في صيغة المستمر.",
        "rules": [
          {
            "rule": "المضارع البسيط – Present simple: للحقائق والعادات والروتين",
            "examples": "My parents live back home in Poland. / When they come home, we always try to meet up."
          },
          {
            "rule": "المضارع المستمر – Present continuous: لأشياء بتحصل دلوقتي أو قريب من دلوقتي",
            "examples": "I'm studying design and I love it! / I'm living with a few of the people on my course at the moment."
          },
          {
            "rule": "أفعال الحالة – State verbs: مشاعر وحالات، وعادة بنخليها في المضارع البسيط مش المستمر",
            "examples": "I love it! (not: I’m loving it)"
          },
          {
            "rule": "ظروف التكرار – Adverbs of frequency: always / usually / often / sometimes / hardly ever / never قبل الفعل الرئيسي وبعد be",
            "examples": "We always try to meet up when my parents come home."
          }
        ]
      },
      {
        "title": "أنماط الأفعال – Verb patterns (1B)",
        "explanation": "في أفعال بييجي بعدها to + الفعل المصدر، وفي أفعال بييجي بعدها صيغة -ing. وبنقدر نستخدم صيغة -ing كفاعل للجملة وبعد حروف الجر.",
        "rules": [
          {
            "rule": "فعل + to + الفعل المصدر – Verb + to + infinitive (decide, hope, need, want, agree, help, plan)",
            "examples": "decide to do • hope to become • need to speak / After leaving school, I decided to do a plumbing course. / She hopes to become a chef."
          },
          {
            "rule": "فعل + -ing – Verb + -ing (enjoy, finish, like, mind, spend time)",
            "examples": "enjoy working • spend time learning | Working here is great – I love it! / Before studying to be a doctor, he worked as a volunteer in a hospital."
          },
          {
            "rule": "صيغة -ing كفاعل – -ing form as subject",
            "examples": "Helping people is what Ridsdale does."
          },
          {
            "rule": "حرف جر + صيغة -ing – Preposition + -ing form",
            "examples": "After leaving the food outside her home, she put up a sign."
          }
        ]
      },
      {
        "title": "المُعدِّلات – Modifiers (1D)",
        "explanation": "بنستخدم المُعدِّلات قبل الصفات والظروف عشان نقلل المعنى أو نقوّيه. وبنقدر نستخدم a bit قبل صيغة المقارنة للكلام عن تغيير صغير، و a lot عن تغيير كبير.",
        "rules": [
          {
            "rule": "quite + صفة – لوصف شيء طبيعي تمامًا",
            "examples": "I would describe my lifestyle as quite normal. / I have quite a normal lifestyle."
          },
          {
            "rule": "pretty / relatively / fairly + صفة – لتخفيف المعنى",
            "examples": "My lifestyle is pretty normal. / My lifestyle is relatively normal and conservative. / I guess my life is fairly comfortable."
          },
          {
            "rule": "quite a lot of + اسم – كمية كبيرة نسبيًا",
            "examples": "I'm doing quite a lot of studying for university."
          },
          {
            "rule": "a bit more (شوية أكتر) / a lot more (كتير أكتر)",
            "examples": "I want to travel a bit more. / I spend quite a lot of time with my friends."
          }
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 2: Tale tellers",
    "points": [
      {
        "title": "الأزمنة السردية – Narrative tenses (2A)",
        "explanation": "لما نحكي قصة، بنستخدم الماضي المستمر عشان نرسم الخلفية (معلومات أساسية)، والماضي البسيط للأحداث الرئيسية، والماضي التام للكلام عن حدث حصل قبلها.",
        "rules": [
          {
            "rule": "الماضي المستمر – Past continuous: للخلفية وتهيئة المشهد",
            "examples": "They were sleeping on the floor. / She was getting very worried."
          },
          {
            "rule": "الماضي البسيط – Past simple: الأحداث الرئيسية في القصة",
            "examples": "Suddenly, the train stopped in the middle of nowhere. / The driver left me on the beach."
          },
          {
            "rule": "الماضي التام – Past perfect: لحدث حصل قبل حدث تاني في الماضي",
            "examples": "Jane woke up on the railway track. She had fallen off the train. / I couldn’t remember the exact beach where we had arranged to meet."
          }
        ]
      },
      {
        "title": "الماضي البسيط والمضارع التام – Past simple and present perfect (2B)",
        "explanation": "الماضي البسيط بيعبّر عن حدث بدأ وانتهى في وقت محدد في الماضي. المضارع التام لشيء بدأ في الماضي ومستمر، أو لسه مهم، دلوقتي.",
        "rules": [
          {
            "rule": "الماضي البسيط – Past simple: لحدث بدأ وانتهى في وقت محدد في الماضي",
            "examples": "In December 2019, researchers in Indonesia found a cave with paintings."
          },
          {
            "rule": "المضارع التام – Present perfect: لشيء بدأ في الماضي ومستمر أو لسه مهم دلوقتي",
            "examples": "People in the Middle East have told the story of Little Red Riding Hood for a thousand years."
          },
          {
            "rule": "المضارع التام مع have – Present perfect of have: الصيغة المختصرة (I've, you've, they've)",
            "examples": "New technologies have brought exciting new ways to tell stories."
          }
        ]
      },
      {
        "title": "حروف الجر للوقت – Prepositions of time (2D)",
        "explanation": "بنستخدم before و until و during للكلام عن الوقت في حكاية عن مكان أو حالة.",
        "rules": [
          {
            "rule": "until – الوضع مستمر لحد الوقت ده",
            "examples": "The old way of life continued until the government moved people out."
          },
          {
            "rule": "before – قبل الوقت ده",
            "examples": "Before they moved into modern homes, families shared the caves with their animals."
          },
          {
            "rule": "during – في نفس وقت فترة معينة",
            "examples": "The changes happened during the 1950s."
          }
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 3: Questions",
    "points": [
      {
        "title": "صيغ الأسئلة – Question forms (3A)",
        "explanation": "بنقدر نسأل عن فاعل الجملة (Who/What + الفعل) أو عن المفعول (Who/What + أداة مساعدة + الفاعل + الفعل). وبنستخدم كمان كلمات استفهام زي why, when, where, how و which مع الأفعال المساعدة.",
        "rules": [
          {
            "rule": "سؤال عن الفاعل – Subject question (بدون أداة مساعدة)",
            "examples": "Who wrote the Sherlock Holmes books? / Who invented the World Wide Web?"
          },
          {
            "rule": "سؤال عن المفعول – Object question (مع أداة مساعدة)",
            "examples": "What did Tim Berners-Lee invent? / Why do we have eyebrows?"
          },
          {
            "rule": "سؤال ينتهي بحرف جر – Question ending in a preposition",
            "examples": "What do you know a lot about? / What are you going to do later?"
          }
        ]
      },
      {
        "title": "الخطط والنوايا المستقبلية – Future plans and intentions (3B)",
        "explanation": "بنستخدم صيغ مختلفة للكلام عن المستقبل. المضارع المستمر لترتيبات متفق عليها، و going to للخطط والنوايا، و will لقرار بيتاخد وقت الكلام نفسه، و might لخطة مش متأكدين منها.",
        "rules": [
          {
            "rule": "المضارع المستمر – Present continuous: لترتيب مستقبلي متفق عليه",
            "examples": "Next week we're looking at a house in a village."
          },
          {
            "rule": "going to: للخطط والنوايا المستقبلية",
            "examples": "They're going to travel around South America."
          },
          {
            "rule": "will: لقرار بيتاخد وقت الكلام نفسه",
            "examples": "We'll see if we can find somewhere nice, then we'll make our decision."
          },
          {
            "rule": "might: لخطة مش متأكد منها",
            "examples": "I might get a job in a local restaurant."
          }
        ]
      },
      {
        "title": "الأسئلة غير المباشرة – Indirect questions (polite inquiries) (3C)",
        "explanation": "الأسئلة غير المباشرة ألطف من المباشرة. فيها ترتيب الكلمات بيتغير: الفاعل بييجي قبل الفعل، وكثيرًا بنستخدم Can you tell me…? و Do you know…? و I'd like to know…? و Could you tell me…?",
        "rules": [
          {
            "rule": "من صيغة Where is…؟ – كلمة السؤال + الفاعل + الفعل",
            "examples": "Can you tell me where the swimming pool is?"
          },
          {
            "rule": "من صيغة What time does…؟",
            "examples": "I’d like to know what time the accommodation office closes."
          },
          {
            "rule": "من صيغة Can I…؟ – بـ if",
            "examples": "Could you tell me if I can use the gym?"
          },
          {
            "rule": "من صيغة Do I need…؟ – بـ if",
            "examples": "Do you know if I need a visa?"
          }
        ]
      },
      {
        "title": "الأفعال المركبة – Phrasal verbs (3D)",
        "explanation": "الفعل المركب هو فعل + كلمة صغيرة (particle) ليها معنى خاص. في بعض الأفعال المركبة، المفعول ممكن يتوسط بين الفعل والجزيء أو ييجي بعده.",
        "rules": [
          {
            "rule": "put on (قابل للفصل) – يشغّل موسيقى",
            "examples": "Putting on a certain song can uplift you. → I put a song on."
          },
          {
            "rule": "look out for (غير قابل للفصل) – يهتم بحد / يحميه",
            "examples": "[It's important to] look out for each other."
          },
          {
            "rule": "find out – يكتشف",
            "examples": "You are going to find out information about your partner's answers."
          },
          {
            "rule": "switch on / shut down – يشغّل / يقفل جهاز",
            "examples": "I switch on my computer and begin work. At 4 p.m., I shut down my computer."
          }
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 4: winners",
    "points": [
      {
        "title": "الأفعال الناقصة للقواعد والنصائح – Modals for rules and advice (4A)",
        "explanation": "الأفعال الناقصة (modal verbs) بتغير معنى الفعل اللي بعدها. بعضها بيقول إن حاجة ضرورية، وبعضها بيقول إنها مش ضرورية، وبعضها بيدي نصيحة.",
        "rules": [
          {
            "rule": "must / have to / need to – شيء ضروري وملزم، مفيش خيار تاني",
            "examples": "You must work really hard."
          },
          {
            "rule": "don't have to / needn't – ده مش ضروري",
            "examples": "You needn't work all the time."
          },
          {
            "rule": "should / shouldn't – فكرة كويسة / فكرة وحشة (نصيحة)",
            "examples": "You should be nice to people."
          },
          {
            "rule": "mustn't – متعملش ده، مش مسموح أو مش ينصح بيه",
            "examples": "You mustn't give up."
          }
        ]
      },
      {
        "title": "أدوات النكرة والتعريف – Articles (4B)",
        "explanation": "الأدوات بتوضح للمستمع أو القارئ لو احنا بنتكلم عن حاجة جديدة، أو حاجة معروفة، أو عن حاجات بشكل عام.",
        "rules": [
          {
            "rule": "a / an – أول ذكر (معلومة جديدة)",
            "examples": "Books often say it was the Wright brothers."
          },
          {
            "rule": "a / an – مع المهن",
            "examples": "He was an inventor."
          },
          {
            "rule": "the – لشخص أو شيء معروف",
            "examples": "The Brazilian’s flight was watched by hundreds of people."
          },
          {
            "rule": "the – مع صيغة التفضيل (superlatives)",
            "examples": "the biggest questions"
          },
          {
            "rule": "بدون أداة – للتحدث عن الناس والأشياء بشكل عام ومع معظم أسماء الأماكن",
            "examples": "Books about the history of flight / France, North Carolina"
          }
        ]
      },
      {
        "title": "How to… شرح القواعد والإجراءات – Explain rules and procedures (4C)",
        "explanation": "لما نشرح قواعد أو إجراءات، بنقدم المعلومة في تسلسل واضح وبنية واضحة: بنبدأ بمعلومات عامة وبعدين نضيف التفاصيل.",
        "rules": [
          {
            "rule": "طريقة الفوز – How to win",
            "examples": "The goal is to… / The aim of the game is to…"
          },
          {
            "rule": "التنظيم والمعدات – Organisation and equipment",
            "examples": "There are (six players). It is played on a field."
          },
          {
            "rule": "تسلسل الخطوات – Procedure",
            "examples": "To start with… Then / Next… After that…"
          },
          {
            "rule": "القواعد – Rules",
            "examples": "You score (shooting the ball into the goal). You can… You have to / must… You can't / mustn't…"
          }
        ]
      },
      {
        "title": "المضارع التام + صيغة التفضيل – Present perfect + superlative (4D)",
        "explanation": "بنقدر نستخدم المضارع التام مع صيغة التفضيل للصفات عشان نحكي عن تجربة مرتبطة بحياتنا كلها.",
        "rules": [
          {
            "rule": "This is the best + اسم + I've ever + التصريف الثالث – لتجربة هي الأفضل في حياتك",
            "examples": "This is the best holiday I've ever had!"
          },
          {
            "rule": "It's the worst + اسم + I've ever + التصريف الثالث – لتجربة هي الأسوأ",
            "examples": "It's the worst hotel I've ever stayed in."
          },
          {
            "rule": "It's the longest + اسم + I've ever + التصريف الثالث – لتجربة هي الأطول",
            "examples": "It's the longest journey I've been on!"
          }
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 5: news",
    "points": [
      {
        "title": "جمل الوصل – relative clauses (5A)",
        "explanation": "جمل الوصل بتضيف معلومات إضافية عن شخص أو شيء أو مكان أو وقت، وبتتبدأ بضمير وصل: who (للناس)، which (للأشياء)، where (للأماكن)، when (للأوقات)، و whose (للملكية). ومن الممكن كمان نستخدم that مكان who أو which في جمل الوصل الضرورية.",
        "rules": [
          {
            "rule": "who = للناس (الأشخاص)",
            "examples": "Christopher Blair is a journalist who writes fake news."
          },
          {
            "rule": "which = للأشياء",
            "examples": "He writes news stories which are completely fake."
          },
          {
            "rule": "where = للأماكن",
            "examples": "This is the room where Maarten Schenk works."
          },
          {
            "rule": "when = للأوقات",
            "examples": "He makes a note of the time when a story is first shared on social media."
          },
          {
            "rule": "whose = للملكية",
            "examples": "This is the politician whose story went viral."
          }
        ]
      },
      {
        "title": "الكلام المنقول – reported speech (5B)",
        "explanation": "لما تنقل كلام حد (reported speech) بنرجع الزمن خطوة للخلف (backshift) وبنغيَّر الضمائر والكلمات: المضارع → الماضي، المضارع التام → الماضي التام، و will → would.",
        "rules": [
          {
            "rule": "المضارع → الماضي (present → past)",
            "examples": "\"He is a genius.\" → His friends said that he was a genius."
          },
          {
            "rule": "المضارع التام → الماضي التام (present perfect → past perfect)",
            "examples": "“It has changed my life.” → One child in Mexico told us that it had changed his life."
          },
          {
            "rule": "will → would (المستقبل بيرجع خطوة في الكلام المنقول)",
            "examples": "“Bali will ban single-use plastic bags.” → The governor said that Bali would ban single-use plastic bags."
          }
        ]
      },
      {
        "title": "التنبؤ بالمستقبل: will و might و be going to – will, might and be going to for predictions (5D)",
        "explanation": "بنستخدم will و might و be going to عشان نتكلم عن المستقبل: will بتدل على يقين قوي، might على احتمال، و be going to غالبًا على توقع قوي مبني على أدلة في الحاضر أو نية أكيدة.",
        "rules": [
          {
            "rule": "will + فعل = أكيد (يقين قوي)",
            "examples": "I think print media will disappear. / We will bring you wonderful stories from all around the world. / We probably won’t publish stories about disasters."
          },
          {
            "rule": "might + فعل = احتمال (ممكن يحصل)",
            "examples": "I think it might be hard to distinguish real news from fake news."
          },
          {
            "rule": "be going to + فعل = توقع قوي (مبني على أدلة / نية)",
            "examples": "I definitely think that celebrities are going to be more prominent."
          }
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 6: creators",
    "points": [
      {
        "title": "used to (عادة في الماضي) – used to (6A)",
        "explanation": "بنستخدم used to + فعل عشان نتكلم عن عادة منتظمة أو حالة في الماضي مش لسه بقت في الحاضر. النفي بيكو بـ didn't use to + فعل، ولو عايز توصف حدث واحد في الماضي بنستخدم الماضي البسيط.",
        "rules": [
          {
            "rule": "used to + فعل (عادة / حالة في الماضي)",
            "examples": "He used to listen to his father playing the piano. / He used to arrive at his studio in the afternoon."
          },
          {
            "rule": "didn't use to + فعل (النفي)",
            "examples": "I didn't use to like playing sports at school. / I didn't use to like vegetables."
          },
          {
            "rule": "حدث واحد في الماضي (للمقارنة مع عادة)",
            "examples": "He immediately fell in love with the instrument. / He painted his first painting when he was seven."
          }
        ]
      },
      {
        "title": "المقارنة والتفضيل – comparatives and superlatives (6B)",
        "explanation": "المقارنة بين حاجتين بنستخدمها بـ comparative، ولقول إن حاجة هي الأفضل/الأكبر بنستخدم superlative: الصفات القصيرة + er/est، والصفات الطويلة بـ more / the most، وفيه صفات شاذة. ومن الممكن كمان (not) as + صفة + as.",
        "rules": [
          {
            "rule": "صفات قصيرة: + er / the + est",
            "examples": "I have to work harder when I’m at home. (fast → faster → the fastest)"
          },
          {
            "rule": "صفات طويلة / ظروف بـ ly: more / the most",
            "examples": "more interesting – the most important part of my job"
          },
          {
            "rule": "شاذ: good/well → better → the best",
            "examples": "That's the best thing about cooking."
          },
          {
            "rule": "(not) as + صفة + as (مقارنة بالمساواة)",
            "examples": "Creativity is just as important as these other things."
          }
        ]
      },
      {
        "title": "المضارع التام مع for و since و yet – present perfect + for, since and yet (6D)",
        "explanation": "المضارع التام مع for و since و yet عشان نتكلم عن حاجة بدأت في الماضي ولسه صحيحة دلوقتي: for = مدة من الزمن، since = نقطة محددة في الماضي، و yet = “لحد دلوقتي” في النفي عشان نقول إن الحاجة لسه متحصلش ولسه متوقعينها.",
        "rules": [
          {
            "rule": "for + مدة من الزمن",
            "examples": "Nigel Schofield has worked with Yinka for more than ten years."
          },
          {
            "rule": "since + نقطة محددة في الماضي",
            "examples": "The art gallery has supported Yinka since the start of his career."
          },
          {
            "rule": "yet في النفي (متعملش لحد دلوقتي)",
            "examples": "Yinka hasn't seen the finished sculpture yet."
          }
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 7: travel",
    "points": [
      {
        "title": "الشرط الأول والثاني – first and second conditionals (7A)",
        "explanation": "الشرط الأول بيوصف موقف حقيقي ومحتمل في المستقبل (If + مضارع بسيط + will)، والشرط الثاني بيوصف موقف افتراضي أو متخيل مش حقيقي (If + ماضٍ بسيط + would).",
        "rules": [
          {
            "rule": "الشرط الأول: If + مضارع بسيط + will (حقيقي ومحتمل في المستقبل)",
            "examples": "If you try to speak their language, people will appreciate your efforts. / If you travel to somewhere new, you'll understand the culture better if you read a book about its history."
          },
          {
            "rule": "الشرط الثاني: If + ماضٍ بسيط + would (افتراضي / متخيل)",
            "examples": "If people tried going somewhere different, the main tourist destinations wouldn't be so busy. / If everyone took their litter home with them, tourist destinations would be a lot cleaner and more attractive."
          }
        ]
      },
      {
        "title": "الضمائر المنعكسة – reflexive pronouns (7D)",
        "explanation": "بنستخدم الضمائر المنعكسة (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) لما المفعول بيه يكون نفس شخص الفاعل. و by + ضمير منعكس يعني “لوحدك” (alone).",
        "rules": [
          {
            "rule": "by + myself = لوحدي",
            "examples": "I like the freedom of travelling by myself."
          },
          {
            "rule": "by + yourself = لوحدك",
            "examples": "Do you prefer travelling by yourself?"
          },
          {
            "rule": "himself / herself = لوحده / لوحدها",
            "examples": "My brother likes travelling by himself. / Ana prefers walking by herself."
          },
          {
            "rule": "ourselves = لوحدنا",
            "examples": "We really enjoyed ourselves."
          }
        ]
      }
    ]
  },
  {
    "unit": "الوحدة 8: know-how",
    "points": [
      {
        "title": "can و could و be able to – can, could, be able to (8A)",
        "explanation": "بنستخدم can/can't للقدرة في الحاضر، و could/couldn't للقدرة العامة في الماضي، و be able to لكل الأزمنة ولإنجاز محدد نجحت فيه في الماضي (was/were able to).",
        "rules": [
          {
            "rule": "can / can't + فعل (القدرة في الحاضر)",
            "examples": "I can fix a roof. I can't play video games."
          },
          {
            "rule": "could / couldn't + فعل (القدرة العامة في الماضي)",
            "examples": "I could draw quite well. I couldn’t do any of that a few years ago."
          },
          {
            "rule": "was/were able to (إنجاز محدد نجحت فيه في الماضي)",
            "examples": "I was able to use my skills to design clothes."
          },
          {
            "rule": "be able to مع أزمنة تانية (المستقبل / التام)",
            "examples": "I'm able to install a washing machine."
          }
        ]
      },
      {
        "title": "المعلوم والمجهول – active and passive (8B)",
        "explanation": "في المعلوم (active) الفاعل بيعمل الفعل: People share the videos. وفي المجهول (passive) المهم هو الفعل أو الحاجة اللي اتأثرت بيه مش مين عمله: be + اسم المفعول (past participle).",
        "rules": [
          {
            "rule": "المعلوم (active): الفاعل بينفّذ الفعل",
            "examples": "People watch these videos. / People shared the video more than 6 million times."
          },
          {
            "rule": "المجهول في المضارع: is/are + اسم المفعول",
            "examples": "These kinds of videos are watched every day. / The students are given homework every day."
          },
          {
            "rule": "المجهول في الماضي: was/were + اسم المفعول",
            "examples": "The video was shared more than 6 million times. / The clip was uploaded to YouTube."
          },
          {
            "rule": "نستخدم المجهول لما الفاعل مش مهم أو مش معروف",
            "examples": "Every minute, hundreds of hours of video are uploaded to YouTube. / In the past, journalists were sent somewhere to report on a news event."
          }
        ]
      },
      {
        "title": "How to... وصف مشكلة وتقديم توصيات – How to... describe a problem and make recommendations (8C)",
        "explanation": "لوصف مشكلة: There’s a problem with... / The ... isn’t working. / I can’t ... / It won’t ... / It keeps (crashing). للتوصيات: Have you tried + ing? / Try + ing? / Have you checked ...? / Maybe you could + فعل.",
        "rules": [
          {
            "rule": "وصف مشكلة حالية",
            "examples": "There's a problem with my internet connection. / The printer isn't working. / I think it's broken."
          },
          {
            "rule": "وصف مشكلة بتتكرر",
            "examples": "It keeps crashing when I open the file. / When/Every time I open the file, it crashes."
          },
          {
            "rule": "تقديم توصية / حل",
            "examples": "Have you tried restarting it? / Try restarting it. / Have you checked the wifi? / Maybe you could check the wifi."
          },
          {
            "rule": "الرد لما الحل يشتغل",
            "examples": "Yes, I'll try that. / Yes, that works. / Yes, it's working now."
          }
        ]
      },
      {
        "title": "فعل + ing – -ing form (8D)",
        "explanation": "أفعال معينة بيتبعها فعل تاني في صورة ing: enjoy, hate, imagine, like, love, practise, recommend, remember, spend time, start, stop, suggest, try و غيرها. مثال: I like learning languages.",
        "rules": [
          {
            "rule": "start / begin + ing (بداية فعل)",
            "examples": "I started learning them."
          },
          {
            "rule": "spend time + ing (يقضي وقت في)",
            "examples": "She spends an hour every week talking to different people."
          },
          {
            "rule": "enjoy / like / love / hate + ing (قيام وحُب فعل)",
            "examples": "Personally, I enjoy studying with other people more than by myself. / I like learning languages. / I can't stand translating!"
          },
          {
            "rule": "practise + ing (الممارسة)",
            "examples": "I practise listening to songs."
          },
          {
            "rule": "recommend / suggest / imagine / remember + ing (توصية / نصح / تخيل / تذكُّر)",
            "examples": "I recommend going to a class. / I remember listening to my favourite British bands years ago."
          }
        ]
      }
    ]
  }
]
export interface ReviewQuizQuestion {
  prompt: string
  options: string[]
  answer: string
  /** Arabic note explaining why `answer` is correct. */
  explanation: string
  /** Optional Arabic note per wrong option explaining why that choice is wrong. */
  wrongNotes?: Record<string, string>
}

export const REVIEW_QUIZ: ReviewQuizQuestion[] = [
  {
    "prompt": "I ___ this band. Their music is amazing!",
    "options": [
      "love",
      "am loving",
      "am love",
      "loves"
    ],
    "answer": "love",
    "explanation": "لأن love فعل حالة بيُعبِّر عن شعور مش عن فعل جاري، وعلشان كده بيجي في المضارع البسيط.",
    "wrongNotes": {
      "am loving": "لأن love فعل حالة ومش بياخد المستمر — مبنقولش I am loving.",
      "am love": "لأن الصيغة دي غلط؛ عايزين إما love أو am loving، مش الاتنين مع بعض.",
      "loves": "لأن loves بنستخدمه مع he/she/it، والفاعل هنا I."
    }
  },
  {
    "prompt": "We ___ go to the cinema — I can't remember the last time we went.",
    "options": [
      "always",
      "hardly ever",
      "usually",
      "sometimes"
    ],
    "answer": "hardly ever",
    "explanation": "لأنه قال إنه مش فاكر آخر مرة راحوا فيها السينما، يعني بيمشوا نادرًا جدًا — وده معنى hardly ever.",
    "wrongNotes": {
      "always": "لأن always معناها دائمًا، وعكسها تمامًا إننا مش فاكرين آخر مرة رحنا فيها للسينما.",
      "usually": "لأن usually معناها غالبًا، وده بيوحي إنهم بيروحوا بانتظام تقريبًا.",
      "sometimes": "لأن sometimes معناها أحيانًا، ومش بيناسب الجملة اللي بتبين إنها حاجة نادرة."
    }
  },
  {
    "prompt": "She works in the same office as me. She is my ___.",
    "options": [
      "colleague",
      "neighbour",
      "teammate",
      "cousin"
    ],
    "answer": "colleague",
    "explanation": "لأن colleague معناها زميل الشغل، وهي بتشتغل معايا في نفس المكتب.",
    "wrongNotes": {
      "neighbour": "لأن neighbour معناها جار، ومش شرط إنها تشتغل في نفس المكتب معاك.",
      "teammate": "لأن teammate معناها زميل في نفس الفريق الرياضي، مش زميل في الشغل.",
      "cousin": "لأن cousin معناها ابن العم، ودي صلة عائلية مش علاقة شغل."
    }
  },
  {
    "prompt": "When the phone rang, I ___ a shower.",
    "options": [
      "had",
      "was having",
      "have had",
      "used to have"
    ],
    "answer": "was having",
    "explanation": "لأن الفعل الطويل (أخذ الدش) كان جاري لما الرنة حصلت فجأة — يعني هنستخدم الماضي المستمر was having.",
    "wrongNotes": {
      "had": "لأن had بتوصف فعل خلص، لكن الجملة بتوصف حاجة كانت لسه بتحصل واتقطعت بالرنة.",
      "have had": "لأنه present perfect ومش بيتستخدم لحاجة حصلت في وقت محدد في الماضي زي الرنة المفاجئة.",
      "used to have": "لأن used to بتوصف عادة قديمة، مش حدث معين كان جاري في اللحظة دي."
    }
  },
  {
    "prompt": "I ___ to the beach yesterday — it was lovely.",
    "options": [
      "went",
      "have been",
      "had gone",
      "go"
    ],
    "answer": "went",
    "explanation": "لأن اليوم ده ماضي محدد (yesterday) وفعل خلص تمامًا — فمنستخدم الماضي البسيط went.",
    "wrongNotes": {
      "have been": "لأنه present perfect وبيوصف تجربة عامة من غير وقت محدد، لكن هنا في yesterday.",
      "had gone": "لأن الماضي التام بيدي زمن أقدم من حدث ماضي تاني، ومفيش حدث بعده في الجملة.",
      "go": "لأن go مضارع بسيط، ومش بنستخدمه مع وقت محدد في الماضي زي yesterday."
    }
  },
  {
    "prompt": "Sorry I'm late — I ___ lost in the old town.",
    "options": [
      "got",
      "made",
      "did",
      "had"
    ],
    "answer": "got",
    "explanation": "لأن get lost هي collocation ثابتة معناها أضعت الطريق — وبنقول get مع lost، مش make أو do.",
    "wrongNotes": {
      "made": "لأننا بنقول get lost مش made lost — فعل make مش بتتجمّع مع lost.",
      "did": "لأن did lost صيغة غلط؛ الفعل الصح مع lost هو get.",
      "had": "لأن had lost ممكن تعبر عن شيء قديم، لكن الصيغة الطبيعية للتعبير عن المعنى ده هي got lost."
    }
  },
  {
    "prompt": "___ she live near the station?",
    "options": [
      "Does",
      "Do",
      "Is",
      "Are"
    ],
    "answer": "Does",
    "explanation": "لأن السؤال في المضارع البسيط مع الفاعل she بياخد Does، وبعده الفعل بصيغته الأصلية.",
    "wrongNotes": {
      "Do": "لأن Do بتيجي مع I وyou وwe وthey، لكن she من he/she/it.",
      "Is": "لأن Is بتستخدم مع الأسماء والصفات، لكن هنا في فعل أصلي زي live.",
      "Are": "لأن Are بتيجي مع you وwe وthey ومش مع she، وهنا في فعل أساسي مش be."
    }
  },
  {
    "prompt": "I've already booked the tickets. We ___ to London on Friday.",
    "options": [
      "are flying",
      "will fly",
      "have flown",
      "were flying"
    ],
    "answer": "are flying",
    "explanation": "لأنه حجز التذاكر، يعني الترتيب جاهز ومتأكد منه — فمنستخدم المضارع المستمر are flying للاتفاقيات المستقبلية.",
    "wrongNotes": {
      "will fly": "لأن will بتعبر عن قرار بيتمع في لحظة الكلام، لكن هنا الترتيب متجهز ومحجوز من قبل.",
      "have flown": "لأنه present perfect وبيوصف تجربة حصلت قبل كده، مش رحلة لسه هتحصل يوم الجمعة.",
      "were flying": "لأن were flying ماضي مستمر، لكن الجملة تتكلم عن يوم الجمعة الجاي في المستقبل."
    }
  },
  {
    "prompt": "Can you tell me where the station ___?",
    "options": [
      "is",
      "are",
      "does",
      "do"
    ],
    "answer": "is",
    "explanation": "لأن في السؤال الغير مباشر بنرتب كلمة السؤال + الفاعل + الفعل من غير مساعد — علشان كده where the station is.",
    "wrongNotes": {
      "are": "لأن are محتاج فاعل جمع، لكن station فاعل مفرد.",
      "does": "لأن does بييجي مع فعل أصلي، لكن هنا الفعل المطلوب هو be (is).",
      "do": "لأن do صيغة مقلوبة من السؤال المباشر، وفي الغير مباشر بنخلي الفاعل قبل الفعل: where the station is."
    }
  },
  {
    "prompt": "She's the woman ___ wrote that blog post.",
    "options": [
      "who",
      "which",
      "where",
      "whose"
    ],
    "answer": "who",
    "explanation": "لأن who بنستخدمه مع الأشخاص، واحنا بنوصف امرأة هي اللي كتبت البوست.",
    "wrongNotes": {
      "which": "لأن which بيستخدم مع الأشياء والحيوانات، مش مع الأشخاص.",
      "where": "لأن where بيستخدم مع الأماكن، ومش مع شخص.",
      "whose": "لأن whose بتعبّر عن الملكية، لكن هنا في فعل wrote ومحتاجين فاعل مش مالك."
    }
  },
  {
    "prompt": "His friends said that he ___ a genius.",
    "options": [
      "was",
      "is",
      "will be",
      "has been"
    ],
    "answer": "was",
    "explanation": "لأن في الكلام المنقول (reported speech) بنرجع الزمن خطوة لورا: is بتتحول لـ was.",
    "wrongNotes": {
      "is": "لأن بعد said بنغير المضارع للماضي في الكلام المنقول، فعلشان is بتبقى was.",
      "will be": "لأن will بتيجي في الكلام المنقول but بتتحول لـ would، ومش بتبقى will be.",
      "has been": "لأن تحويل present perfect في الكلام المنقول هو had been، لكن الجملة الأساسية هنا كانت is مش has been."
    }
  },
  {
    "prompt": "The title of a news story, usually in large letters, is the ___.",
    "options": [
      "headline",
      "post",
      "blog",
      "plot"
    ],
    "answer": "headline",
    "explanation": "لأن headline هي عنوان الخبر في الأخبار، وبتتكتب بحروف كبيرة.",
    "wrongNotes": {
      "post": "لأن post هو منشور على منصات التواصل، ومش عنوان الخبر.",
      "blog": "لأن blog هو مدونة كاملة، مش سطر عنوان للخبر.",
      "plot": "لأن plot معناها أحداث القصة، ومش عنوان خبر إخباري."
    }
  },
  {
    "prompt": "He ___ collect old stamps when he was a child.",
    "options": [
      "used to",
      "was used to",
      "use to",
      "uses to"
    ],
    "answer": "used to",
    "explanation": "لأن used to + فعل بيوصف عادة أو حالة حصلت في الماضي وخلصت، وده مناسب مع when he was a child.",
    "wrongNotes": {
      "was used to": "لأن was used to بييجي بعده فعل بـ -ing وبيوصف التعود على شيء، مش عادة قديمة.",
      "use to": "لأن الصيغة الصح في الجملة المثبتة هي used to مش use to.",
      "uses to": "لأن uses to غلط؛ used to صيغة ثابتة مش بتتصرف مع الفاعل بأي شكل."
    }
  },
  {
    "prompt": "Travelling by train is usually ___ than flying.",
    "options": [
      "slower",
      "more slow",
      "slowest",
      "most slow"
    ],
    "answer": "slower",
    "explanation": "لأن slow صفة قصيرة، وشكل المقارنة بتاعتها مع than هو slower.",
    "wrongNotes": {
      "more slow": "لأن more بتيجي مع الصفات الطويلة، لكن slow صفة قصيرة بتاخد -er.",
      "slowest": "لأن slowest دي صيغة التفضيل المطلق (أبطأ حاجة)، ومش بنستخدمها مع than للمقارنة بين اتنين.",
      "most slow": "لأن most بيعبر عن التفضيل المطلق مش المقارنة، وslow قصيرة ومش محتاجة most أصلًا."
    }
  },
  {
    "prompt": "Which word usually comes before 'fantastic'? ___ fantastic.",
    "options": [
      "absolutely",
      "very",
      "enough",
      "quietly"
    ],
    "answer": "absolutely",
    "explanation": "لأن fantastic صفة قوية (extreme adjective)، والكلمة اللي بنقوي بيها الصفات دي هي absolutely.",
    "wrongNotes": {
      "very": "لأن very بنستخدمها مع الصفات العادية زي good، مش مع الصفات القوية زي fantastic.",
      "enough": "لأن enough بتيجي بعد الصفة (good enough) مش قبلها، ومعناها كفاية.",
      "quietly": "لأن quietly ظرف معناها بهدوء، ومعناه بيتناسبش مع fantastic."
    }
  },
  {
    "prompt": "If you ___ hard, you will pass the exam.",
    "options": [
      "study",
      "will study",
      "studied",
      "would study"
    ],
    "answer": "study",
    "explanation": "لأن ده first conditional: If + مضارع بسيط + will — فعشان كده نكمل الفراغ بـ study.",
    "wrongNotes": {
      "will study": "لأن في أول شرط، بعد If بنستخدم المضارع البسيط مش will.",
      "studied": "لأن studied بيدي معنى hypothetical من second conditional، وده بيحتاج would مش will في الجزء التاني.",
      "would study": "لأن would بتيجي في الجزء التاني من الجملة الشرطية، مش بعد If."
    }
  },
  {
    "prompt": "If I ___ a bigger flat, I would invite you to stay.",
    "options": [
      "had",
      "have",
      "would have",
      "will have"
    ],
    "answer": "had",
    "explanation": "لأن ده second conditional بيوصف حاجة مش حقيقية: If + ماضي بسيط + would — فعلشان had.",
    "wrongNotes": {
      "have": "لأن have بتيجي في first conditional، لكن الجزء التاني هنا فيه would مش will.",
      "would have": "لأن would مش بييجي بعد If في الجمل الشرطية — بييجي في الجزء التاني بس.",
      "will have": "لأن will بعد If ممنوع، وده شرط متخيّل (غير حقيقي) مش مستقبل مؤكد."
    }
  },
  {
    "prompt": "A city that is full of energy and life can be described as ___.",
    "options": [
      "vibrant",
      "ancient",
      "wooden",
      "peaceful"
    ],
    "answer": "vibrant",
    "explanation": "لأن vibrant معناها مليان طاقة وحيوية، وده بالظبط اللي بتوصفه الجملة.",
    "wrongNotes": {
      "ancient": "لأن ancient معناها قديم جدًا، وده بيتكلم عن السن مش عن الطاقة والحيوية.",
      "wooden": "لأن wooden معناها مصنوع من الخشب، ومش بينقال عن مدينة.",
      "peaceful": "لأن peaceful معناها هاديء ومسالم، وده عكس فكرة مليان طاقة وحركة."
    }
  },
  {
    "prompt": "When I was young, I ___ run very fast.",
    "options": [
      "could",
      "can",
      "will be able to",
      "may"
    ],
    "answer": "could",
    "explanation": "لأن could بتوصف قدرة كانت موجودة في الماضي، وده مناسب مع when I was young.",
    "wrongNotes": {
      "can": "لأن can بتوصف قدرة في الحاضر، والجملة بتتكلم عن الماضي.",
      "will be able to": "لأن دي صيغة بتتعلق بالمستقبل، والجملة عن وقت في الماضي.",
      "may": "لأن may بتعبر عن إمكانية أو إذن، مش بيوصف قدرة."
    }
  },
  {
    "prompt": "Every minute, hundreds of hours of video ___ to YouTube.",
    "options": [
      "are uploaded",
      "is uploaded",
      "upload",
      "uploaded"
    ],
    "answer": "are uploaded",
    "explanation": "لأن الجملة مجهول (passive) لإن الفيديوهات هي اللي بيتعمل عليها الفعل، والفاعل hundreds جمع — فعلشان are uploaded.",
    "wrongNotes": {
      "is uploaded": "لأن الفاعل hundreds جمع، فمتناسبش مع هو is اللي للمفرد.",
      "upload": "لأن upload فعل معلوم (active) ويحتاج فاعل صريح، والجملة مجهولة لإن مين اللي بيعمل مش مهم.",
      "uploaded": "لأن uploaded من غير are مبيتكوّنش passive — محتاجين be + past participle."
    }
  },
  {
    "prompt": "I really enjoy ___ new languages.",
    "options": [
      "learning",
      "to learn",
      "learn",
      "learned"
    ],
    "answer": "learning",
    "explanation": "لأن الفعل enjoy بييجي بعده الفعل بـ -ing: enjoy + learning.",
    "wrongNotes": {
      "to learn": "لأن to learn بتيجي بعد الأفعال اللي بتاخد to + infinitive، لكن enjoy بتاخد -ing بس.",
      "learn": "لأن learn المجرد (bare infinitive) مش بييجي بعد enjoy مباشرة.",
      "learned": "لأن learned ماضي، ومش بييجي بعد enjoy كتكميل مباشر."
    }
  },
  {
    "prompt": "You ___ smoke inside the building.",
    "options": [
      "mustn't",
      "don't have to",
      "should",
      "needn't"
    ],
    "answer": "mustn't",
    "explanation": "لأن mustn't معناها ممنوع ومش مسموح، والتدخين داخل المبنى بالظبط كده.",
    "wrongNotes": {
      "don't have to": "لأن don't have to معناها مش لازم بس مسموح، لكن التدخين هنا ممنوع خالص.",
      "should": "لأن should نصيحة بس (مش فكرة كويسة)، لكن القاعدة هنا ممنوع من نوع قانوني.",
      "needn't": "لأن needn't معناها مش ضروري، وده بيدي معنى مسموح — عكس المطلوب."
    }
  },
  {
    "prompt": "He gets really upset when he loses. He's a bad ___.",
    "options": [
      "loser",
      "winner",
      "player",
      "fan"
    ],
    "answer": "loser",
    "explanation": "لأن bad loser عبارة ثابتة معناها شخص بيعمل مشاكل لما بيخسر، وده مطابق للوصف.",
    "wrongNotes": {
      "winner": "لأن الوصف عن واحد بيخسر وبيزعل، ومش بنقول عليه bad winner في السياق ده.",
      "player": "لأن player معناها لاعب، لكن الوصف عن تصرفه عند الخسارة مش عن مهنته كلاعب.",
      "fan": "لأن fan يعني مشجع، ومش هو اللي بيلعب أصلًا علشان يتوصف كـ loser."
    }
  },
  {
    "prompt": "Listen! Someone ___ at the door.",
    "options": [
      "is knocking",
      "knocks",
      "has knocked",
      "knocked"
    ],
    "answer": "is knocking",
    "explanation": "لأن الفعل بيحصل دلوقتي بنفس وقت الكلام (Listen!)، فعلشان المضارع المستمر is knocking.",
    "wrongNotes": {
      "knocks": "لأن knocks بيوصف عادة عامة، لكن هنا إجراء بيحصل في اللحظة دي.",
      "has knocked": "لأن has knocked بيوصف حاجة حصلت وأثرها باقي، لكن اللي بيحصل لسه الآن محتاج مستمر.",
      "knocked": "لأن knocked ماضي بسيط وبيوصف حدث خلص، لكن هنا بنسمع الرنة حاليًا."
    }
  },
  {
    "prompt": "That's the best meal I ___ ever had!",
    "options": [
      "have",
      "am",
      "did",
      "was"
    ],
    "answer": "have",
    "explanation": "لأن جملة the best + ever بتاخد المضارع التام: I have ever had.",
    "wrongNotes": {
      "am": "لأن am (مضارع مستمر) مش بيشتغل مع ever had — المحتاجين present perfect.",
      "did": "لأن did ماضي بسيط، ومش بييجي مع ever had في الصيغة دي.",
      "was": "لأن was بتتتكلم عن الماضي التام، والجملة بتوصف تجربة حتى اللحظة دي فالمضارع التام هو الصح."
    }
  }
]

export const REVIEW_QUIZ_LETTERS = ['a', 'b', 'c', 'd'] as const
