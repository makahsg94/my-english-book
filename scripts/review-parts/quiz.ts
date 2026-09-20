export interface QuizQuestion {
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
  wrongNotes: { [wrongOption: string]: string };
}

export const QUIZ: QuizQuestion[] = [
  {
    prompt: "He manages the hotel. He is the hotel ____.",
    options: ["driver", "manager", "player", "student"],
    answer: "manager",
    explanation: "لأنه هو اللي بيدير الفندق، فالكلمة الصح هي manager ومعناها مدير.",
    wrongNotes: {
      "driver": "driver معناها سواق، ومش اللي بيدير الفندق.",
      "player": "player معناها لاعب، ومش لاعي الفندق.",
      "student": "student معناها طالب، ومش طالب اللي بيدير الفندق."
    }
  },
  {
    prompt: "Can I have some water, please? I'm ____.",
    options: ["hungry", "tired", "thirsty", "bored"],
    answer: "thirsty",
    explanation: "لما تطلب مية يبقى انت عطشان، وthirsty معناها عطشان.",
    wrongNotes: {
      "hungry": "hungry معناها جوعان، وده مش سبب طلب الماء.",
      "tired": "tired معناها تعبان، وملهاش علاقة بالماء.",
      "bored": "bored معناها زهقان، ومش السبب في طلب الماء."
    }
  },
  {
    prompt: "My brother Sam ____ in a small village.",
    options: ["live", "lives", "living", "is live"],
    answer: "lives",
    explanation: "الفاعل Sam مفرد، فالفعل في المضارع البسيط بياخد s ويكون lives.",
    wrongNotes: {
      "live": "live من غير s، ومش صح مع الفاعل المفرد.",
      "living": "living دي صيغة الـ ing ومحتاجة فعل مساعد قبلها.",
      "is live": "is live تركيب غلط، والصحيح هو lives."
    }
  },
  {
    prompt: "Do you want to do something? Let's ____ a coffee after class.",
    options: ["get", "getting", "got", "to get"],
    answer: "get",
    explanation: "بعد Let's بنستخدم الفعل في المصدر من غير to، فالصحيح هو get.",
    wrongNotes: {
      "getting": "getting دي صيغة الـ ing ومش صح بعد Let's.",
      "got": "got دي صيغة الماضي، ومش بعد Let's.",
      "to get": "to get فيه to زيادة، لأن بعد Let's من غير to."
    }
  },
  {
    prompt: "This is my ____ bedroom. We are two brothers and we share it.",
    options: ["brother", "brother's", "brothers'", "brothers"],
    answer: "brothers'",
    explanation: "لأنهم إخوات (جمع) وبيكلموا عن غرفة مشتركة، فبنستخدم ملكية الجمع اللي بتنتهي بـ s ونزود عليها apostrophe فقط.",
    wrongNotes: {
      "brother": "brother مفرد من غير علامة ملكية، ومش صح في الجملة دي.",
      "brother's": "brother's دي ملكية المفرد (أخ واحد بس)، والجملة بتتكلم عن اخوات.",
      "brothers": "brothers جمع بس من غير علامة ملكية، بيفتقر للـ apostrophe."
    }
  },
  {
    prompt: "Which word is uncountable (غير معدود)?",
    options: ["broccoli", "beans", "onion", "lemon"],
    answer: "broccoli",
    explanation: "broccoli (البَروكلي) كلمة غير معدودة، ومينفعش نحسبها أو نديها جمع.",
    wrongNotes: {
      "beans": "beans كلمة معدودة وقابلة للجمع.",
      "onion": "onion كلمة معدودة.",
      "lemon": "lemon كلمة معدودة."
    }
  },
  {
    prompt: "We don't have ____ lemons in the fridge.",
    options: ["some", "any", "an", "a"],
    answer: "any",
    explanation: "في الجمل المنفية بنستخدم any مع الجمع وغير المعدود.",
    wrongNotes: {
      "some": "some بيتستخدم في الجمل المثبتة، مش في المنفية.",
      "an": "an بنستخدمها قبل مفرد بيبدأ بحرف علة، ومش مناسبة هنا.",
      "a": "a بنستخدمها قبل مفرد، و«lemons» هنا جمع."
    }
  },
  {
    prompt: "The first course of a meal is a ____.",
    options: ["starter", "main course", "side dish", "dessert"],
    answer: "starter",
    explanation: "الطبق الأول في الوجبة اسمه starter (المقبلات).",
    wrongNotes: {
      "main course": "main course هو الطبق الرئيسي، مش الأول.",
      "side dish": "side dish هو طبق جانبي بجانب الطبق الرئيسي.",
      "dessert": "dessert هو الحُلو اللي بيتاكل في الآخر."
    }
  },
  {
    prompt: "____ we have the bill, please?",
    options: ["Do", "Could", "Should", "Are"],
    answer: "Could",
    explanation: "Could هي الصيغة المهذبة في طلب الحساب (bill).",
    wrongNotes: {
      "Do": "Do صيغة سؤال عادية ومش مناسبة للطلب المهذب هنا.",
      "Should": "Should بتستخدم للنصيحة، مش لطلب الأدب.",
      "Are": "Are مبنستعملش مع «have» في السؤال ده."
    }
  },
  {
    prompt: "____ a big park close to my house.",
    options: ["There's", "There are", "It's", "Has"],
    answer: "There's",
    explanation: "للتعبير عن وجود حاجة بنستخدم There's، وهنا park مفرد.",
    wrongNotes: {
      "There are": "There are بنستخدمها مع الجمع، وpark هنا مفرد.",
      "It's": "It's بدي عن صفة أو تعريف، مش عن وجود.",
      "Has": "Has محتاجة فاعل، ومش بتعبّر عن وجود حاجة."
    }
  },
  {
    prompt: "____ you got a bicycle at home?",
    options: ["Are", "Has", "Have", "Do"],
    answer: "Have",
    explanation: "السؤال من «got» بنستخدم Have: «Have you got...?»",
    wrongNotes: {
      "Are": "Are مش صح مع got.",
      "Has": "Has بتستخدم مع he/she/it، مش مع you.",
      "Do": "Do you got تركيب غلط، الصحيح Have you got."
    }
  },
  {
    prompt: "Shall I ____ you something to drink?",
    options: ["get", "getting", "got", "to get"],
    answer: "get",
    explanation: "بعد Shall I بنستخدم الفعل في المصدر من غير to، فالصحيح هو get.",
    wrongNotes: {
      "getting": "getting دي صيغة الـ ing ومش صح بعد Shall I.",
      "got": "got دي صيغة الماضي، ومش بعد Shall I.",
      "to get": "to get فيه to زيادة، لأن بعد Shall I من غير to."
    }
  },
  {
    prompt: "The first Instagram photo ____ in 2010.",
    options: ["was", "were", "is", "did"],
    answer: "was",
    explanation: "لأن photo مفرد وفي الماضي (2010)، فبنستخدم was.",
    wrongNotes: {
      "were": "were بنستخدمها مع الجمع، وphoto هنا مفرد.",
      "is": "is للمضارع، والجملة عن اللي حصل في الماضي.",
      "did": "did فعل مساعد ومينفعش ييجي كفعل أساسي هنا."
    }
  },
  {
    prompt: "____ water do we use to make a pair of jeans?",
    options: ["How many", "How much", "How long", "How far"],
    answer: "How much",
    explanation: "لأن water كلمة غير معدودة، فبنستخدم How much للكمية.",
    wrongNotes: {
      "How many": "How many بنستخدمها مع المعدود، والمية غير معدودة.",
      "How long": "How long بسأل بيها عن المدة الزمنية.",
      "How far": "How far بسأل بيها عن المسافة."
    }
  },
  {
    prompt: "You ____ start the day too late, or you'll miss breakfast.",
    options: ["should", "shouldn't", "must", "can't"],
    answer: "shouldn't",
    explanation: "الجمله بتقول متبداش اليوم متأخر علشان متفوتش الفطار، فهي نصيحة بسلبية",
    wrongNotes: {
      "should": "should عكس المعنى، لأن هنا بننهي عن حاجة.",
      "must": "must معناها لازم وتحتمل معنى إجباري أكتر من اللازم.",
      "can't": "can't معناها مش قادر، وده مش المعنى المطلوب."
    }
  },
  {
    prompt: "Last year I ____ English every day.",
    options: ["study", "studied", "studying", "studies"],
    answer: "studied",
    explanation: "Last year دليل على الماضي، وصيغة الماضي من study هي studied.",
    wrongNotes: {
      "study": "study مضارع، والجملة بتتكلم عن ماضي.",
      "studying": "studying دي ing ومحتاجة فعل مساعد.",
      "studies": "studies مضارع مع الفاعل المفرد، ومش مناسب هنا."
    }
  },
  {
    prompt: "She ____ to London by train last week.",
    options: ["goed", "went", "gone", "goes"],
    answer: "went",
    explanation: "صيغة الماضي من فعل go هي went (ماضي شاذ).",
    wrongNotes: {
      "goed": "goed غلط، فعل go شاذ وماضيها went.",
      "gone": "gone دي التصريف الثالث ومحتاجة فعل مساعد قبلها.",
      "goes": "goes مضارع مع الفاعل المفرد، والجملة ماضي."
    }
  },
  {
    prompt: "It's 3:15. It's ____.",
    options: ["quarter to three", "three past fifteen", "quarter past three", "three quarters"],
    answer: "quarter past three",
    explanation: "3:15 يعني ربع بعد التلاتة، وبنقول quarter past three.",
    wrongNotes: {
      "quarter to three": "quarter to three يعني ربع لـ 3:45، مش 3:15.",
      "three past fifteen": "three past fifteen مش صيغة صحيحة في الإنجليزية.",
      "three quarters": "three quarters معناها ثلاثة أرباع، مش تعبير للوقت."
    }
  },
  {
    prompt: "You buy medicine at the ____.",
    options: ["bakery", "chemist's", "florist's", "shoe shop"],
    answer: "chemist's",
    explanation: "chemist's هي الصيدلية، ودي اللي بنشتري منها الدواء.",
    wrongNotes: {
      "bakery": "bakery هي المخبز، بيباع فيه العيش.",
      "florist's": "florist's بيباع فيه الزهور.",
      "shoe shop": "shoe shop بيباع فيه الأحذية (الجزمة)."
    }
  },
  {
    prompt: "Listen! She ____ the guitar right now.",
    options: ["plays", "is playing", "played", "play"],
    answer: "is playing",
    explanation: "right now دليل على المضارع المستمر، فبنستخدم is playing.",
    wrongNotes: {
      "plays": "plays مضارع بسيط للعادة، مش للحاجة اللي بتحصل دلوقتي.",
      "played": "played صيغة ماضي، والجملة بتحصل دلوقتي.",
      "play": "play من غير s، ومش صح مع الفاعل المفرد She."
    }
  },
  {
    prompt: "A plane is ____ than a car.",
    options: ["faster", "fastest", "more fast", "fast"],
    answer: "faster",
    explanation: "للمقارنة بين حاجتين بنستخدم faster مع than.",
    wrongNotes: {
      "fastest": "fastest دي صيغة التفضيل (الأسرع من كل الحاجات)، مش مقارنة.",
      "more fast": "more fast غلط، لإن fast صفة قصيرة بتاخد er.",
      "fast": "fast من غير مقارنة، ومعها than لازم صيغة مقارنة."
    }
  },
  {
    prompt: "Please ____ your phones during the exam.",
    options: ["turn off", "turn on", "turn up", "turn into"],
    answer: "turn off",
    explanation: "في الامتحان بنطلب إقفال الموبايلات، وturn off معناها يقفل الجهاز.",
    wrongNotes: {
      "turn on": "turn on معناها يفتح الجهاز، وعكس المقصود.",
      "turn up": "turn up معناها يزود الصوت.",
      "turn into": "turn into معناها يتحول لحاجة تانية."
    }
  },
  {
    prompt: "Stefano is ____ professional sleeper.",
    options: ["a", "an", "the", "(no article)"],
    answer: "a",
    explanation: "professional sleeper بيبدأ بحرف ساكن، فأول مرة نذكره بنستخدم a.",
    wrongNotes: {
      "an": "an بنستخدمها قبل كلمة بتحذف بحرف علة، وprofessional هنا بحرف ساكن.",
      "the": "the بنستخدمها لحاجة معينة معروفة، وهنا بندي معلومة جديدة.",
      "(no article)": "(no article) غلط لأن sleeper كلمة معدودة، ومحتاجة أداة قبلها."
    }
  },
  {
    prompt: "I'd like ____ a foreign language.",
    options: ["learn", "learning", "to learn", "learned"],
    answer: "to learn",
    explanation: "بعد I'd like بنستخدم المصدر to + الفعل، يعني to learn.",
    wrongNotes: {
      "learn": "learn من غير to غلط بعد I'd like.",
      "learning": "learning بصيغة الـ ing، ومش بنستخدمها بعد I'd like.",
      "learned": "learned صيغة ماضي، ومش مناسبة هنا."
    }
  },
  {
    prompt: "The Pena Palace is ____ place in Sintra.",
    options: ["the most beautiful", "the beautifulest", "most beautiful", "more beautiful"],
    answer: "the most beautiful",
    explanation: "لصيغة التفضيل مع الصفات الطويلة بنستخدم the most + صفة، فالصحيح the most beautiful.",
    wrongNotes: {
      "the beautifulest": "the beautifulest غلط، beautiful صفة طويلة بتاخد the most.",
      "most beautiful": "most beautiful محتاجة the قبلها في التفضيل.",
      "more beautiful": "more beautiful للمقارنة بين حاجتين، ومش تفضيل."
    }
  }
];