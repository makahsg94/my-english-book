import type { ReviewQuizQuestion } from './types'

export const REVIEW_QUIZ: ReviewQuizQuestion[] = [
  {
    prompt: "I ___ this band. Their music is amazing!",
    options: ["love", "am loving", "am love", "loves"],
    answer: "love",
    explanation: "لأن love فعل حالة بيُعبِّر عن شعور مش عن فعل جاري، وعلشان كده بيجي في المضارع البسيط.",
    wrongNotes: {
      "am loving": "لأن love فعل حالة ومش بياخد المستمر — مبنقولش I am loving.",
      "am love": "لأن الصيغة دي غلط؛ عايزين إما love أو am loving، مش الاتنين مع بعض.",
      loves: "لأن loves بنستخدمه مع he/she/it، والفاعل هنا I."
    }
  },
  {
    prompt: "We ___ go to the cinema — I can't remember the last time we went.",
    options: ["always", "hardly ever", "usually", "sometimes"],
    answer: "hardly ever",
    explanation: "لأنه قال إنه مش فاكر آخر مرة راحوا فيها السينما، يعني بيمشوا نادرًا جدًا — وده معنى hardly ever.",
    wrongNotes: {
      always: "لأن always معناها دائمًا، وعكسها تمامًا إننا مش فاكرين آخر مرة رحنا فيها للسينما.",
      usually: "لأن usually معناها غالبًا، وده بيوحي إنهم بيروحوا بانتظام تقريبًا.",
      sometimes: "لأن sometimes معناها أحيانًا، ومش بيناسب الجملة اللي بتبين إنها حاجة نادرة."
    }
  },
  {
    prompt: "She works in the same office as me. She is my ___.",
    options: ["colleague", "neighbour", "teammate", "cousin"],
    answer: "colleague",
    explanation: "لأن colleague معناها زميل الشغل، وهي بتشتغل معايا في نفس المكتب.",
    wrongNotes: {
      neighbour: "لأن neighbour معناها جار، ومش شرط إنها تشتغل في نفس المكتب معاك.",
      teammate: "لأن teammate معناها زميل في نفس الفريق الرياضي، مش زميل في الشغل.",
      cousin: "لأن cousin معناها ابن العم، ودي صلة عائلية مش علاقة شغل."
    }
  },
  {
    prompt: "When the phone rang, I ___ a shower.",
    options: ["had", "was having", "have had", "used to have"],
    answer: "was having",
    explanation: "لأن الفعل الطويل (أخذ الدش) كان جاري لما الرنة حصلت فجأة — يعني هنستخدم الماضي المستمر was having.",
    wrongNotes: {
      had: "لأن had بتوصف فعل خلص، لكن الجملة بتوصف حاجة كانت لسه بتحصل واتقطعت بالرنة.",
      "have had": "لأنه present perfect ومش بيتستخدم لحاجة حصلت في وقت محدد في الماضي زي الرنة المفاجئة.",
      "used to have": "لأن used to بتوصف عادة قديمة، مش حدث معين كان جاري في اللحظة دي."
    }
  },
  {
    prompt: "I ___ to the beach yesterday — it was lovely.",
    options: ["went", "have been", "had gone", "go"],
    answer: "went",
    explanation: "لأن اليوم ده ماضي محدد (yesterday) وفعل خلص تمامًا — فمنستخدم الماضي البسيط went.",
    wrongNotes: {
      "have been": "لأنه present perfect وبيوصف تجربة عامة من غير وقت محدد، لكن هنا في yesterday.",
      "had gone": "لأن الماضي التام بيدي زمن أقدم من حدث ماضي تاني، ومفيش حدث بعده في الجملة.",
      go: "لأن go مضارع بسيط، ومش بنستخدمه مع وقت محدد في الماضي زي yesterday."
    }
  },
  {
    prompt: "Sorry I'm late — I ___ lost in the old town.",
    options: ["got", "made", "did", "had"],
    answer: "got",
    explanation: "لأن get lost هي collocation ثابتة معناها أضعت الطريق — وبنقول get مع lost، مش make أو do.",
    wrongNotes: {
      made: "لأننا بنقول get lost مش made lost — فعل make مش بتتجمّع مع lost.",
      did: "لأن did lost صيغة غلط؛ الفعل الصح مع lost هو get.",
      had: "لأن had lost ممكن تعبر عن شيء قديم، لكن الصيغة الطبيعية للتعبير عن المعنى ده هي got lost."
    }
  },
  {
    prompt: "___ she live near the station?",
    options: ["Does", "Do", "Is", "Are"],
    answer: "Does",
    explanation: "لأن السؤال في المضارع البسيط مع الفاعل she بياخد Does، وبعده الفعل بصيغته الأصلية.",
    wrongNotes: {
      Do: "لأن Do بتيجي مع I وyou وwe وthey، لكن she من he/she/it.",
      Is: "لأن Is بتستخدم مع الأسماء والصفات، لكن هنا في فعل أصلي زي live.",
      Are: "لأن Are بتيجي مع you وwe وthey ومش مع she، وهنا في فعل أساسي مش be."
    }
  },
  {
    prompt: "I've already booked the tickets. We ___ to London on Friday.",
    options: ["are flying", "will fly", "have flown", "were flying"],
    answer: "are flying",
    explanation: "لأنه حجز التذاكر، يعني الترتيب جاهز ومتأكد منه — فمنستخدم المضارع المستمر are flying للاتفاقيات المستقبلية.",
    wrongNotes: {
      "will fly": "لأن will بتعبر عن قرار بيتمع في لحظة الكلام، لكن هنا الترتيب متجهز ومحجوز من قبل.",
      "have flown": "لأنه present perfect وبيوصف تجربة حصلت قبل كده، مش رحلة لسه هتحصل يوم الجمعة.",
      "were flying": "لأن were flying ماضي مستمر، لكن الجملة تتكلم عن يوم الجمعة الجاي في المستقبل."
    }
  },
  {
    prompt: "Can you tell me where the station ___?",
    options: ["is", "are", "does", "do"],
    answer: "is",
    explanation: "لأن في السؤال الغير مباشر بنرتب كلمة السؤال + الفاعل + الفعل من غير مساعد — علشان كده where the station is.",
    wrongNotes: {
      are: "لأن are محتاج فاعل جمع، لكن station فاعل مفرد.",
      does: "لأن does بييجي مع فعل أصلي، لكن هنا الفعل المطلوب هو be (is).",
      do: "لأن do صيغة مقلوبة من السؤال المباشر، وفي الغير مباشر بنخلي الفاعل قبل الفعل: where the station is."
    }
  },
  {
    prompt: "She's the woman ___ wrote that blog post.",
    options: ["who", "which", "where", "whose"],
    answer: "who",
    explanation: "لأن who بنستخدمه مع الأشخاص، واحنا بنوصف امرأة هي اللي كتبت البوست.",
    wrongNotes: {
      which: "لأن which بيستخدم مع الأشياء والحيوانات، مش مع الأشخاص.",
      where: "لأن where بيستخدم مع الأماكن، ومش مع شخص.",
      whose: "لأن whose بتعبّر عن الملكية، لكن هنا في فعل wrote ومحتاجين فاعل مش مالك."
    }
  },
  {
    prompt: "His friends said that he ___ a genius.",
    options: ["was", "is", "will be", "has been"],
    answer: "was",
    explanation: "لأن في الكلام المنقول (reported speech) بنرجع الزمن خطوة لورا: is بتتحول لـ was.",
    wrongNotes: {
      is: "لأن بعد said بنغير المضارع للماضي في الكلام المنقول، فعلشان is بتبقى was.",
      "will be": "لأن will بتيجي في الكلام المنقول but بتتحول لـ would، ومش بتبقى will be.",
      "has been": "لأن تحويل present perfect في الكلام المنقول هو had been، لكن الجملة الأساسية هنا كانت is مش has been."
    }
  },
  {
    prompt: "The title of a news story, usually in large letters, is the ___.",
    options: ["headline", "post", "blog", "plot"],
    answer: "headline",
    explanation: "لأن headline هي عنوان الخبر في الأخبار، وبتتكتب بحروف كبيرة.",
    wrongNotes: {
      post: "لأن post هو منشور على منصات التواصل، ومش عنوان الخبر.",
      blog: "لأن blog هو مدونة كاملة، مش سطر عنوان للخبر.",
      plot: "لأن plot معناها أحداث القصة، ومش عنوان خبر إخباري."
    }
  },
  {
    prompt: "He ___ collect old stamps when he was a child.",
    options: ["used to", "was used to", "use to", "uses to"],
    answer: "used to",
    explanation: "لأن used to + فعل بيوصف عادة أو حالة حصلت في الماضي وخلصت، وده مناسب مع when he was a child.",
    wrongNotes: {
      "was used to": "لأن was used to بييجي بعده فعل بـ -ing وبيوصف التعود على شيء، مش عادة قديمة.",
      "use to": "لأن الصيغة الصح في الجملة المثبتة هي used to مش use to.",
      "uses to": "لأن uses to غلط؛ used to صيغة ثابتة مش بتتصرف مع الفاعل بأي شكل."
    }
  },
  {
    prompt: "Travelling by train is usually ___ than flying.",
    options: ["slower", "more slow", "slowest", "most slow"],
    answer: "slower",
    explanation: "لأن slow صفة قصيرة، وشكل المقارنة بتاعتها مع than هو slower.",
    wrongNotes: {
      "more slow": "لأن more بتيجي مع الصفات الطويلة، لكن slow صفة قصيرة بتاخد -er.",
      slowest: "لأن slowest دي صيغة التفضيل المطلق (أبطأ حاجة)، ومش بنستخدمها مع than للمقارنة بين اتنين.",
      "most slow": "لأن most بيعبر عن التفضيل المطلق مش المقارنة، وslow قصيرة ومش محتاجة most أصلًا."
    }
  },
  {
    prompt: "Which word usually comes before 'fantastic'? ___ fantastic.",
    options: ["absolutely", "very", "enough", "quietly"],
    answer: "absolutely",
    explanation: "لأن fantastic صفة قوية (extreme adjective)، والكلمة اللي بنقوي بيها الصفات دي هي absolutely.",
    wrongNotes: {
      very: "لأن very بنستخدمها مع الصفات العادية زي good، مش مع الصفات القوية زي fantastic.",
      enough: "لأن enough بتيجي بعد الصفة (good enough) مش قبلها، ومعناها كفاية.",
      quietly: "لأن quietly ظرف معناها بهدوء، ومعناه بيتناسبش مع fantastic."
    }
  },
  {
    prompt: "If you ___ hard, you will pass the exam.",
    options: ["study", "will study", "studied", "would study"],
    answer: "study",
    explanation: "لأن ده first conditional: If + مضارع بسيط + will — فعشان كده نكمل الفراغ بـ study.",
    wrongNotes: {
      "will study": "لأن في أول شرط، بعد If بنستخدم المضارع البسيط مش will.",
      studied: "لأن studied بيدي معنى hypothetical من second conditional، وده بيحتاج would مش will في الجزء التاني.",
      "would study": "لأن would بتيجي في الجزء التاني من الجملة الشرطية، مش بعد If."
    }
  },
  {
    prompt: "If I ___ a bigger flat, I would invite you to stay.",
    options: ["had", "have", "would have", "will have"],
    answer: "had",
    explanation: "لأن ده second conditional بيوصف حاجة مش حقيقية: If + ماضي بسيط + would — فعلشان had.",
    wrongNotes: {
      have: "لأن have بتيجي في first conditional، لكن الجزء التاني هنا فيه would مش will.",
      "would have": "لأن would مش بييجي بعد If في الجمل الشرطية — بييجي في الجزء التاني بس.",
      "will have": "لأن will بعد If ممنوع، وده شرط متخيّل (غير حقيقي) مش مستقبل مؤكد."
    }
  },
  {
    prompt: "A city that is full of energy and life can be described as ___.",
    options: ["vibrant", "ancient", "wooden", "peaceful"],
    answer: "vibrant",
    explanation: "لأن vibrant معناها مليان طاقة وحيوية، وده بالظبط اللي بتوصفه الجملة.",
    wrongNotes: {
      ancient: "لأن ancient معناها قديم جدًا، وده بيتكلم عن السن مش عن الطاقة والحيوية.",
      wooden: "لأن wooden معناها مصنوع من الخشب، ومش بينقال عن مدينة.",
      peaceful: "لأن peaceful معناها هاديء ومسالم، وده عكس فكرة مليان طاقة وحركة."
    }
  },
  {
    prompt: "When I was young, I ___ run very fast.",
    options: ["could", "can", "will be able to", "may"],
    answer: "could",
    explanation: "لأن could بتوصف قدرة كانت موجودة في الماضي، وده مناسب مع when I was young.",
    wrongNotes: {
      can: "لأن can بتوصف قدرة في الحاضر، والجملة بتتكلم عن الماضي.",
      "will be able to": "لأن دي صيغة بتتعلق بالمستقبل، والجملة عن وقت في الماضي.",
      may: "لأن may بتعبر عن إمكانية أو إذن، مش بيوصف قدرة."
    }
  },
  {
    prompt: "Every minute, hundreds of hours of video ___ to YouTube.",
    options: ["are uploaded", "is uploaded", "upload", "uploaded"],
    answer: "are uploaded",
    explanation: "لأن الجملة مجهول (passive) لإن الفيديوهات هي اللي بيتعمل عليها الفعل، والفاعل hundreds جمع — فعلشان are uploaded.",
    wrongNotes: {
      "is uploaded": "لأن الفاعل hundreds جمع، فمتناسبش مع هو is اللي للمفرد.",
      upload: "لأن upload فعل معلوم (active) ويحتاج فاعل صريح، والجملة مجهولة لإن مين اللي بيعمل مش مهم.",
      uploaded: "لأن uploaded من غير are مبيتكوّنش passive — محتاجين be + past participle."
    }
  },
  {
    prompt: "I really enjoy ___ new languages.",
    options: ["learning", "to learn", "learn", "learned"],
    answer: "learning",
    explanation: "لأن الفعل enjoy بييجي بعده الفعل بـ -ing: enjoy + learning.",
    wrongNotes: {
      "to learn": "لأن to learn بتيجي بعد الأفعال اللي بتاخد to + infinitive، لكن enjoy بتاخد -ing بس.",
      learn: "لأن learn المجرد (bare infinitive) مش بييجي بعد enjoy مباشرة.",
      learned: "لأن learned ماضي، ومش بييجي بعد enjoy كتكميل مباشر."
    }
  },
  {
    prompt: "You ___ smoke inside the building.",
    options: ["mustn't", "don't have to", "should", "needn't"],
    answer: "mustn't",
    explanation: "لأن mustn't معناها ممنوع ومش مسموح، والتدخين داخل المبنى بالظبط كده.",
    wrongNotes: {
      "don't have to": "لأن don't have to معناها مش لازم بس مسموح، لكن التدخين هنا ممنوع خالص.",
      should: "لأن should نصيحة بس (مش فكرة كويسة)، لكن القاعدة هنا ممنوع من نوع قانوني.",
      "needn't": "لأن needn't معناها مش ضروري، وده بيدي معنى مسموح — عكس المطلوب."
    }
  },
  {
    prompt: "He gets really upset when he loses. He's a bad ___.",
    options: ["loser", "winner", "player", "fan"],
    answer: "loser",
    explanation: "لأن bad loser عبارة ثابتة معناها شخص بيعمل مشاكل لما بيخسر، وده مطابق للوصف.",
    wrongNotes: {
      winner: "لأن الوصف عن واحد بيخسر وبيزعل، ومش بنقول عليه bad winner في السياق ده.",
      player: "لأن player معناها لاعب، لكن الوصف عن تصرفه عند الخسارة مش عن مهنته كلاعب.",
      fan: "لأن fan يعني مشجع، ومش هو اللي بيلعب أصلًا علشان يتوصف كـ loser."
    }
  },
  {
    prompt: "Listen! Someone ___ at the door.",
    options: ["is knocking", "knocks", "has knocked", "knocked"],
    answer: "is knocking",
    explanation: "لأن الفعل بيحصل دلوقتي بنفس وقت الكلام (Listen!)، فعلشان المضارع المستمر is knocking.",
    wrongNotes: {
      knocks: "لأن knocks بيوصف عادة عامة، لكن هنا إجراء بيحصل في اللحظة دي.",
      "has knocked": "لأن has knocked بيوصف حاجة حصلت وأثرها باقي، لكن اللي بيحصل لسه الآن محتاج مستمر.",
      knocked: "لأن knocked ماضي بسيط وبيوصف حدث خلص، لكن هنا بنسمع الرنة حاليًا."
    }
  },
  {
    prompt: "That's the best meal I ___ ever had!",
    options: ["have", "am", "did", "was"],
    answer: "have",
    explanation: "لأن جملة the best + ever بتاخد المضارع التام: I have ever had.",
    wrongNotes: {
      am: "لأن am (مضارع مستمر) مش بيشتغل مع ever had — المحتاجين present perfect.",
      did: "لأن did ماضي بسيط، ومش بييجي مع ever had في الصيغة دي.",
      was: "لأن was بتتتكلم عن الماضي التام، والجملة بتوصف تجربة حتى اللحظة دي فالمضارع التام هو الصح."
    }
  }
]