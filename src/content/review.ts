// ---------------------------------------------------------------------------
// Comprehensive review data - extracted from the revision document Generator.
// Vocabulary tables (word + Arabic meaning + example), grammar summaries and a
// 25-question quiz. Rendered by pages/ReviewPage.tsx
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
    unit: "الوحدة 1: me and you",
    tables: [
      {
        title: "الوظائف والدراسة – Jobs and studies (1A)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["driver", "سائق", "My father is a train driver."], ["player", "لاعب", "He is a famous football player."], ["manager", "مدير", "She is the hotel manager."], ["student", "طالب / طالبة", "I am a university student."], ["worker", "عامل", "He is an office worker."]],
      },
      {
        title: "أفعال شائعة مركبة – Common verb phrases (1B)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["get up", "يستيقظ", "I get up early every day."], ["go", "يذهب / يخرج", "We go out a lot on Fridays."], ["have", "يملك / عنده", "They have two sisters."], ["live", "يعيش / يسكن", "Sam lives in a small village."], ["play", "يلعب", "He plays the guitar in a band."], ["study", "يدرس", "She studies Italian every day."], ["teach", "يدرّس", "He teaches English at university."], ["work", "يعمل", "I work from home."]],
      },
      {
        title: "صفات المشاعر – Adjectives for feelings (1C)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["all right", "تمام / بخير", "I'm all right, thanks."], ["bored", "(إحساس) الملل", "I'm bored. Let's do something."], ["hungry", "جوعان", "I'm hungry. Can I have a sandwich?"], ["angry", "غضبان / زعلان", "I'm angry at my manager."], ["relaxed", "مُرتاح / مسترخي", "I feel really relaxed today."], ["thirsty", "عطشان", "I'm thirsty. Can I have some water?"], ["tired", "تعبان / مرهق", "I feel really tired after work."]],
      },
      {
        title: "عبارات الوقت – Time phrases (1C)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["today", "النهارده", "Do you want to do something today?"], ["tomorrow", "بكرة", "What about tomorrow morning?"], ["this afternoon", "بعد الضهر", "Let's meet this afternoon."], ["at the weekend", "في عطلة نهاية الأسبوع", "How about meeting at the weekend?"], ["after class", "بعد الحصة / المحاضرة", "Can we meet after class?"], ["on Saturday", "يوم السبت", "Let's do something on Saturday."]],
      },
      {
        title: "العائلة – Family words",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["parents", "الوالدين", "My parents live near me."], ["uncle", "عم / خال", "My mother's brother is my uncle."], ["cousin", "ابن العم / الخال", "My cousin is a doctor."], ["aunt", "عمة / خالة", "My favourite aunt visits us in summer."], ["grandfather / grandmother", "جد / جدة", "My grandfather is 80 years old."], ["nephew / niece", "ابن / بنت الأخ", "My nephew is five years old."], ["sister-in-law", "أخت الزوج / زوجة الأخ", "My sister-in-law is a teacher."], ["retired", "متقاعد", "My dad is retired now."], ["unemployed", "عاطل عن العمل", "He is unemployed at the moment."]],
      },
    ],
  },
  {
    unit: "الوحدة 2: lifestyle",
    tables: [
      {
        title: "الأكل والشرب – Food and drink (2A)",
        headers: ["الكلمة", "معدود أم لا", "المعنى", "مثال"],
        rows: [["apple / banana / lemon", "معدود (C)", "تفاحة / موزة / ليمونة", "I eat an apple every day."], ["grapes / tomatoes / potatoes", "جمع معدود", "عنب / طماطم / بطاطس", "There are some grapes in the bowl."], ["avocado / orange / pear", "معدود (C)", "أفوكادو / برتقالة / كمثرى", "I have an avocado for breakfast."], ["beans / onions / cucumbers", "معدود (C)", "فاصوليا / بصل / خيار", "We need some onions for tonight."], ["broccoli", "غير معدود (U)", "بروكلي", "Boil the broccoli for ten minutes."], ["salmon / chicken", "معدود أو غير معدود", "سلمون / فراخ", "They don't have any salmon left."], ["orange juice / lemonade", "غير معدود (U)", "عصير برتقال / ليمونادا", "A glass of orange juice, please."], ["water / coffee / tea / milk", "غير معدود (U)", "مياه / قهوة / شاي / لبن", "We always have coffee at home."], ["cheese / butter / oil / rice / pasta", "غير معدود (U)", "جبنة / زبدة / زيت / أرز / مكرونة", "We eat a lot of rice."], ["eggs / bread / yoghurt", "بيض (C) – عيش وزبادي (U)", "بيض / خبز / زبادي", "I'd like some yoghurt after dinner."]],
      },
      {
        title: "أنشطة يومية – Everyday activities (2B)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["check your messages / emails", "تشيك على الرسائل / الإيميلات", "I check my emails every morning."], ["get up early / late", "يقوم بدري / متأخر", "I usually get up early."], ["go running / shopping / for coffee", "يروح يركض / يتسوق / ياخد قهوة", "I often go running before work."], ["go to a party / a meeting", "يروح حفلة / اجتماع", "Do you go to parties at the weekend?"], ["meet someone online", "يقابل حد أونلاين", "I meet new friends online."], ["spend time with your family", "يقضي وقت مع عيلته", "I spend time with my family every Sunday."]],
      },
      {
        title: "مطعم – Restaurant words (2C)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["starter", "المقبلات (أول طبق)", "For a starter, I'll have the soup."], ["main course", "الطبق الرئيسي", "My main course is beefburger with chips."], ["side dish", "طبق جانبي", "I'll have chips as a side dish."], ["dessert", "حلويات / تحلية", "Lemon tart for dessert, please."], ["bill", "الحساب", "Could we have the bill, please?"], ["service charge", "رسوم الخدمة", "Is the service charge included?"], ["dinner for two", "عشاء لشخصين", "A dinner for two costs about 40 euros."]],
      },
      {
        title: "أفعال + ing (2D)",
        headers: ["القاعدة", "مثال"],
        rows: [["معظم الأفعال: +ing", "wait → waiting, play → playing"], ["فعل ينتهي بـ e: نحذفها", "write → writing, take → taking"], ["حرف ساكن + علة + ساكن (ضع الحرف الأخير)", "run → running, get up → getting up"], ["أفعال تنتهي بـ y / w / x: بدون مضاعفة", "know → knowing"]],
      },
    ],
  },
  {
    unit: "الوحدة 3: home",
    tables: [
      {
        title: "الغرف والأثاث – Rooms and furniture (3A)",
        headers: ["الكلمة", "المكان / الغرفة", "المعنى", "مثال"],
        rows: [["sofa / armchair / coffee table", "living room", "كنبة / كرسي بذراعين / ترابيزة", "There is a sofa and an armchair in the living room."], ["TV", "living room", "تليفزيون", "The TV is on the wall."], ["fridge / cooker / sink / cupboards", "kitchen", "تلاجة / بوتاجاز / حوض / دواليب", "The fridge is next to the cooker."], ["worktop", "kitchen", "سطح المطبخ (الرخامة)", "Don't put the hot pan on the worktop."], ["bed / bedside table / wardrobe / mirror", "bedroom", "سرير / كوموديني / دولاب / مراية", "The wardrobe is next to the bed."], ["bath / shower / washbasin / towels", "bathroom", "بانيو / دش / حوض غسيل / مناشف", "I have a shower every morning."], ["front door / coat hooks", "hall (المدخل)", "الباب الرئيسي / علاقات جاكيتات", "Hang your coat on the hook."], ["flowers / grass / trees", "garden", "ورد / نجيل / شجر", "There are flowers and trees in the garden."]],
      },
      {
        title: "صفات شائعة (1) – Common adjectives (3B)",
        headers: ["الكلمة", "المعنى", "العكس (Opposite)", "مثال"],
        rows: [["soft", "ناعم / طري", "hard (صلب)", "The sofa is soft and comfortable."], ["large / big", "كبير", "small (صغير)", "The room is too large for us."], ["easy", "سهل", "difficult (صعب)", "The exercise is easy."], ["loud", "عالي / صاخب", "quiet (هادئ)", "The music is very loud."], ["long", "طويل", "short (قصير)", "It's a long, boring story."], ["same", "نفس", "different (مختلف)", "We're wearing the same T-shirt."]],
      },
      {
        title: "عبارات اجتماعية – Social phrases (3C)",
        headers: ["الموقف / العبارة", "الرد"],
        rows: [["Sorry I'm late.", "No problem."], ["Great to see you!", "Thank you for a lovely evening!"], ["These are for you.", "Oh, thank you. How nice of you!"], ["Have a safe journey home.", "You too."], ["I'm full. That was delicious!", "Glad you liked it!"]],
      },
    ],
  },
  {
    unit: "الوحدة 4: this world",
    tables: [
      {
        title: "عبارات الزمن والتواريخ – Time phrases and dates (4A)",
        headers: ["الأداة", "الاستخدام", "أمثلة"],
        rows: [["in", "السنة / الشهر / الفصل / أجزاء اليوم", "in 2012, in July, in the summer, in the morning"], ["on", "أيام محددة وتواريخ", "on Friday, on Saturday, on 4 May"], ["at", "الليل والعطلة", "at night, at the weekend"], ["last", "آخر مرة ماضية", "last night, last Friday, last weekend"], ["ago", "منذ فترة (في الماضي)", "a month ago, ten minutes ago"], ["yesterday", "امبارح", "yesterday morning, yesterday evening"]],
      },
      {
        title: "الأرقام والكميات – Amounts and numbers (4B)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["nearly a hundred", "قرابة المية (~98)", "Nearly a hundred people came."], ["just over a hundred", "شوية فوق المية (~102)", "The hotel has just over a hundred rooms."], ["under a hundred", "أقل من مية", "The answer is under a hundred."], ["about a hundred", "حوالى مية", "We walked about a hundred metres."], ["exactly a hundred", "مية بالظبط", "The tickets cost exactly a hundred pounds."], ["over a hundred", "فوق المية", "There are over a hundred students."]],
      },
      {
        title: "السوق والتسوق – Shops (4C)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["bakery", "مخبز", "I bought fresh bread at the bakery."], ["bookshop", "مكتبة كتب", "You can find novels at the bookshop."], ["chemist's / pharmacy", "صيدلية", "I need medicine from the chemist's."], ["clothes shop", "محل ملابس", "She bought a dress at the clothes shop."], ["delicatessen", "محل منتجات أكلة خاصة", "The delicatessen sells special cheeses."], ["electrical shop", "محل أجهزة كهربائية", "I got a new charger at the electrical shop."], ["florist's", "محل ورود", "He bought flowers at the florist's."], ["shoe shop", "محل أحذية", "These trainers are from the shoe shop."], ["supermarket", "سوبر ماركت", "We buy our food at the supermarket."]],
      },
      {
        title: "الطقس والفصول – Weather and seasons (4D)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["spring / summer / autumn / winter", "الربيع / الصيف / الخريف / الشتاء", "In summer, the weather is hot."], ["sunny", "مشمس", "It's sunny today."], ["cloudy", "غائم", "The sky is cloudy."], ["windy", "عاصف / رياح", "It's very windy today."], ["rainy / raining", "ممطر", "I don't like rainy days."], ["snowy / snowing", "مثلج", "It was snowy in January."], ["hot / warm / cold / freezing", "حار / دافي / بارد / برد جدًا", "It's freezing here in winter."], ["wet / dry", "ممطر / جاف", "The car park is wet when it rains."]],
      },
    ],
  },
  {
    unit: "الوحدة 5: the past",
    tables: [
      {
        title: "عبارات الزمن (2) – Time phrases (5A)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["all", "كل الـ (يوم/أسبوع/عمر)", "She worked hard all week."], ["from ... to", "من ... إلى", "She worked from 4 a.m. to 10 p.m."], ["for", "لمدة", "I lived there for three years."], ["before", "قبل", "I run before breakfast."], ["when", "لما (في الماضي)", "I learnt to drive when I was nineteen."], ["later", "بعدين / لاحقًا", "Five minutes later, he called me."]],
      },
      {
        title: "أحداث الحياة – Life events (5B)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["get a job / get married", "يحصل على وظيفة / يتجوز", "She got a job at the bank last year."], ["learn to swim / to drive", "يتعلم يعوم / يسوق", "I learnt to drive when I was nineteen."], ["meet your best friend", "يقابل صاحبه المفضل", "I met my best friend at school."], ["pass your exams / your driving test", "ينجح في الامتحانات / اختبار القيادة", "He passed all his exams."], ["become a doctor / a teacher", "يبقى دكتور / مدرس", "She wants to become a teacher."], ["leave school / your job", "يسيب المدرسة / الشغل", "He left school at sixteen."]],
      },
      {
        title: "أفعال شاذة – Irregular verbs (5B)",
        headers: ["الفعل", "الماضي", "مثال"],
        rows: [["go", "went", "I went to London."], ["have", "had", "We had dinner at eight."], ["leave", "left", "He left the party early."], ["say", "said", "She said goodbye."], ["take", "took", "I took a taxi."], ["drive", "drove", "My dad drove me to school."], ["get", "got", "She got a puppy."], ["do", "did", "I did my homework."], ["come", "came", "They came by bus."], ["eat", "ate", "We ate a lot."], ["become", "became", "He became a doctor."]],
      },
      {
        title: "الأعذار – Excuses (5C)",
        headers: ["العبارة", "المعنى"],
        rows: [["I missed my train.", "فاتني القطر."], ["My bus was late.", "الأتوبيس اتأخر."], ["My wifi was down.", "النت وقع."], ["I didn't hear my alarm.", "سمعتش المنبه."], ["I lost all my work.", "ضيّعت كل شغلي."], ["I had the wrong time.", "كان عندي الوقت الغلط."]],
      },
      {
        title: "قراءة الساعة – Saying the time (5C)",
        headers: ["العبارة", "الوقت"],
        rows: [["It's half past two.", "2:30"], ["It's quarter past three.", "3:15"], ["It's ten to four.", "3:50"], ["It's five past nine.", "9:05"]],
      },
    ],
  },
  {
    unit: "الوحدة 6: out and about",
    tables: [
      {
        title: "الملابس والمظهر – Clothes and appearance (6A)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["jumper", "كنزة صوف", "Put on a warm jumper."], ["T-shirt", "تيشرت", "He's wearing a white T-shirt."], ["jacket", "جاكيت", "This jacket is too big."], ["shirt", "قميص", "He wears a shirt to work."], ["skirt", "جيبة", "She has a red skirt."], ["top", "بلوزة", "That top is beautiful."], ["hat", "قبعة", "I need a hat for the sun."], ["jeans", "جينز", "These jeans are comfortable."], ["trainers", "كوتشي / جزمة رياضية", "I wear trainers at the gym."], ["tall / short", "طويل / قصير (للقامة)", "My brother is tall, but I'm short."], ["long hair / short hair", "شعر طويل / قصير", "She's got long dark hair."], ["blonde", "أشقر", "His sister is blonde."], ["beard / moustache", "لحية / شنب", "My dad has got a beard."], ["checked", "مُقلم مربعات", "He's wearing a checked shirt."]],
      },
      {
        title: "صفات شائعة (2) – Common adjectives (6B)",
        headers: ["الكلمة", "المعنى", "العكس", "مثال"],
        rows: [["short", "قصير", "long", "It's a short journey."], ["dangerous", "خطير", "safe", "Don't cross here. It's dangerous."], ["expensive", "غالي", "cheap", "A taxi is expensive."], ["difficult", "صعب", "easy", "The exam was difficult."], ["noisy", "مزعج", "quiet", "The street is very noisy."], ["quick / fast", "سريع", "slow", "The train is quick."], ["boring", "ممل", "interesting", "The film was boring."], ["comfortable", "مريح", "uncomfortable", "This seat is very comfortable."]],
      },
      {
        title: "وسائل المواصلات – Transport collocations (6B)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["go by car / train / bus / plane / boat / bike", "يروح بالعربية / قطر / أتوبيس / طيارة / مركب / عجلة", "I usually go to work by train."], ["go on foot", "يمشي على رجليه", "It's ten minutes on foot."], ["take a taxi / the bus / a plane", "يركب تاكسي / أتوبيس / طيارة", "We took a taxi to the airport."], ["ride a bike", "يركب عجلة", "She rides a bike to school."], ["drive a car", "يسوق عربية", "He drives to work every day."]],
      },
      {
        title: "أماكن – Places (6C)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["pedestrian bridge", "كوبري للمشاة", "Cross the pedestrian bridge."], ["crossroads", "تقاطع", "Go straight on at the crossroads."], ["traffic lights", "إشارة مرور", "Turn right at the traffic lights."], ["corner", "ناصية", "The shop is on the corner."], ["square", "ميدان", "There is a statue in the square."], ["car park", "موقف عربيات", "Park in the car park, please."], ["bus stop", "موقف أتوبيس", "Wait for the bus at the bus stop."], ["statue", "تمثال", "The statue is in front of the castle."]],
      },
      {
        title: "حروف الجر للحركة – Movement (6D)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["out of", "برة من (من الداخل للخارج)", "I walked out of the building."], ["into", "جوه (من برا لجوه)", "She went into the shop."], ["towards", "ناحية / في اتجاه", "He walked towards the station."], ["past", "ماشي قدام / بجانب", "Walk past the post office."], ["along", "على طول الـ", "Go along this road."], ["across", "من ناحية للتانية", "We walked across the bridge."], ["through", "من جوه (خلال)", "They went through the park."], ["up / down", "لفوق / لتحت", "She ran up the stairs."], ["back", "راجع", "Come back at five o'clock."]],
      },
    ],
  },
  {
    unit: "الوحدة 7: work",
    tables: [
      {
        title: "مهارات وصفات – Skills and qualities (7A)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["be relaxed", "تكون هادي / مرتاح", "You need to be relaxed in this job."], ["work well with people", "تشكل كويس مع الناس", "She works well with people."], ["be good with people's names", "تفتكر الأسماء بسهولة", "He is good with people's names."], ["work long hours", "تشكل ساعات طويلة", "Nurses often work long hours."], ["work alone", "تشكل لوحدك", "I prefer to work alone."], ["work with your hands", "تشكل بيدك (شغل يدوي)", "He loves working with his hands."], ["be good at / with animals, numbers, languages", "تكون شاطر في الحيوانات / الأرقام / اللغات", "She's good at languages."]],
      },
      {
        title: "أفعال مركبة – Phrasal verbs (7B)",
        headers: ["الفعل المركب", "المعنى", "مثال"],
        rows: [["look after", "يعتني ب", "She looks after her little sister."], ["give up", "يبطل / يسيب", "Don't give up your job."], ["pick up", "يلم (زبالة)", "We pick up rubbish on the beach."], ["look up", "يدور على (معلومة)", "Look up the word on the internet."], ["turn off", "يطفى", "Turn off your phone in class."], ["clean up", "ينضف", "Clean up your bedroom, please."]],
      },
      {
        title: "لغة التليفون – Phoning (7C)",
        headers: ["الكلمة", "المعنى", "مثال"],
        rows: [["call / phone / ring", "يتصل", "I need to ring the leisure centre."], ["mobile / smartphone / landline", "موبايل / سمات فون / تليفون أرضي", "Call me on my mobile."], ["hold on a minute", "استنى لحظة", "Could you hold on a minute?"], ["leave / send / delete a message", "يسيب / يبعت / يمسح رسالة", "Leave a message and I'll call you back."], ["call / phone / ring you back", "يرجع يتصل بيك", "I'll call you back tomorrow."], ["press 2", "دوس على 2", "Press 2 for the spa."], ["voicemail", "بريد صوتي", "Her voicemail is always full."]],
      },
    ],
  },
  {
    unit: "الوحدة 8: away",
    tables: [
      {
        title: "وصف الأماكن – Describing places (8A)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["in the middle of nature", "في وسط الطبيعة", "The hotel is in the middle of nature."], ["coast", "ساحل / على البحر", "The village is on the coast."], ["wonderful", "رائع", "The view is wonderful."], ["hills", "تلال", "The town is in the hills."], ["old town", "المدينة القديمة", "Let's visit the old town."], ["pretty shops and cafés", "محلات وكافيهات جميلة", "There are pretty shops and cafés in the streets."], ["at the top of a hill", "فوق التل", "The castle is at the top of a hill."], ["forest", "غابة", "There is a big forest near here."]],
      },
      {
        title: "أنشطة السفر – Travel activities (8B)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["do a class", "يشترك في كورس", "I'm going to do a cooking class."], ["go on an organised tour", "يروح في رحلة منظمة", "We went on an organised tour of the city."], ["go shopping / sightseeing", "يتسوق / يتفرج على الأماكن", "We're going sightseeing tomorrow."], ["take photos", "يصور", "Take lots of photos at the palace."], ["try the local food", "يجرّب الأكل المحلي", "You should try the local food."], ["use an app or a guidebook", "يستخدم تطبيق / دليل", "Use an app to find your way."], ["visit famous places", "يزور أماكن شهيرة", "We want to visit famous places."], ["go with a local guide", "مع مرشد محلي", "We'll explore with a local guide."]],
      },
      {
        title: "لغة الفندق – Hotel language (8C)",
        headers: ["العبارة", "المعنى", "مثال"],
        rows: [["book a room", "يحجز أوضه", "I'd like to book a room for two nights."], ["check in / check out", "يسجل دخول / خروج", "You can check in after two o'clock."], ["take the lift", "ياخد الأسانسير", "Take the lift to the third floor."], ["order room service", "يطلب خدمة الغرف", "Let's order room service for dinner."], ["pay your bill", "يدفع الحساب", "You can pay your bill at reception."], ["keep something in the safe", "يحفظ في الخزنة", "Keep your passport in the safe."], ["print your boarding pass", "يطبع كارت الصعود", "Print your boarding pass before you go."], ["leave your luggage at reception", "يسيب الشنط عند الاستقبال", "You can leave your luggage at reception."], ["airport transfer", "توصيل مطار", "Could you book an airport transfer?"]],
      },
      {
        title: "ظروف الطريقة – Adverbs of manner (8D)",
        headers: ["الظرف", "المعنى", "مثال"],
        rows: [["slowly", "ببطء", "They climbed slowly."], ["carefully", "بحذر / بحرص", "Drive carefully in the rain."], ["quickly", "بسرعة", "He left the room quickly."], ["fast", "بسرعة (بدون تغيير)", "She can run very fast."], ["well", "كويس / تمام (من good)", "They know the area well."], ["badly", "وحش / بسوء", "The day is starting badly."]],
      },
    ],
  },
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
    unit: "الوحدة 1: me and you",
    points: [
      {
        title: "المضارع البسيط – Present simple (I, you, we, they)",
        explanation: "للتحدث عن أشياء صحيحة دائمًا أو بشكل عام، وعن العادات والروتين.",
        rules: [
          {
            rule: "الإثبات – Positive",
            examples: "I come from Italy. / They live in Seoul.",
          },
          {
            rule: "النفي – Negative",
            examples: "I don't work on Saturdays.",
          },
          {
            rule: "السؤال – Questions",
            examples: "Do you live near here?",
          },
          {
            rule: "سؤال بكلمة استفهام – Wh- questions",
            examples: "Where do you live?",
          },
          {
            rule: "ردود قصيرة – Short answers",
            examples: "Yes, I do. / No, they don't.",
          },
        ],
      },
      {
        title: "المضارع البسيط – Present simple (he, she, it)",
        explanation: "مع he/she/it نضيف s للفعل. النفي بـ doesn't والسؤال بـ Does.",
        rules: [
          {
            rule: "أغلب الأفعال: +s",
            examples: "play → plays, live → lives",
          },
          {
            rule: "أفعال تنتهي بـ ch/sh/s/x: +es",
            examples: "teach → teaches, watch → watches",
          },
          {
            rule: "ساكن + y: تتحول لـ ies",
            examples: "study → studies",
          },
          {
            rule: "شاذ: do → does, go → goes",
            examples: "have → has",
          },
          {
            rule: "النفي والسؤال",
            examples: "He doesn't have a lot of money. / Does she work? – Yes, she does.",
          },
        ],
      },
      {
        title: "الملكية – Possessive 's",
        explanation: "نستخدم 's مع الشخص الواحد، و s' مع أكثر من واحد.",
        rules: [
          {
            rule: "شخص واحد + 's",
            examples: "My brother's wife.",
          },
          {
            rule: "أكثر من واحد + s'",
            examples: "My parents' house.",
          },
          {
            rule: "جمع شاذ + 's",
            examples: "the children's bedroom",
          },
          {
            rule: "الملكية من غير اسم",
            examples: "It's Kiera's.",
          },
        ],
      },
      {
        title: "How to ... عمل اقتراح – Make suggestions",
        explanation: "لعمل اقتراح: Let's + فعل، Can we + فعل؟، Would you like to + فعل؟، How about / What about + اسم أو وقت.",
        rules: [
          {
            rule: "Let's + فعل",
            examples: "Let's meet at the cinema.",
          },
          {
            rule: "Can we + فعل؟",
            examples: "Can we meet at half past seven?",
          },
          {
            rule: "Would you like to + فعل؟",
            examples: "Would you like to have a coffee?",
          },
          {
            rule: "How about / What about",
            examples: "How about a break? / What about three o'clock?",
          },
          {
            rule: "رد إيجابي / سلبي",
            examples: "Sure, that's fine. / I'm sorry, I can't.",
          },
        ],
      },
    ],
  },
  {
    unit: "الوحدة 2: lifestyle",
    points: [
      {
        title: "المعدود وغير المعدود – Countable / uncountable + a, an, some, any",
        explanation: "نستخدم a/an مع المفرد المعدود، some مع الجمع وغير المعدود (كمية غير محددة)، any في النفي والسؤال، و a lot of للكمية الكبيرة.",
        rules: [
          {
            rule: "a / an",
            examples: "I have a banana for breakfast. / an avocado",
          },
          {
            rule: "some",
            examples: "I'd like some pasta.",
          },
          {
            rule: "a lot of",
            examples: "We eat a lot of rice.",
          },
          {
            rule: "any",
            examples: "We don't have any lemons.",
          },
        ],
      },
      {
        title: "ظروف التكرار – Adverbs of frequency",
        explanation: "always (100%) – usually (80%) – often – sometimes – hardly ever (10%) – never (0%). قبل معظم الأفعال وبعد فعل be، وعبارات التكرار في آخر الجملة.",
        rules: [
          {
            rule: "قبل معظم الأفعال",
            examples: "I always have breakfast at seven.",
          },
          {
            rule: "بعد فعل be",
            examples: "They are often late.",
          },
          {
            rule: "عبارات في آخر الجملة",
            examples: "I go to the cinema once a week. / every Sunday",
          },
        ],
      },
      {
        title: "How to ... طلب وجبة – Order a meal",
        explanation: "نستخدم can / could / would like في الطلب. Could ألطف من can، وفي الطلبات بنستخدم some مش any.",
        rules: [
          {
            rule: "طلب مهذب",
            examples: "Could I / Can we + فعل ...؟",
          },
          {
            rule: "لو من القائمة",
            examples: "I'd like the salmon, please.",
          },
          {
            rule: "كمية غير محددة",
            examples: "some + اسم (مش any)",
          },
          {
            rule: "طلب الحساب",
            examples: "Could we have the bill, please?",
          },
        ],
      },
      {
        title: "like, hate, love + -ing",
        explanation: "نستخدم فعل + ing بعد love / like / enjoy / don't like / hate.",
        rules: [
          {
            rule: "قاعدة الإضافة",
            examples: "wait → waiting",
          },
          {
            rule: "فعل ينتهي بـ e",
            examples: "write → writing",
          },
          {
            rule: "ساكن + علة + ساكن (مضاعفة)",
            examples: "run → running",
          },
          {
            rule: "بدون مضاعفة",
            examples: "play → playing, know → knowing",
          },
        ],
      },
    ],
  },
  {
    unit: "الوحدة 3: home",
    points: [
      {
        title: "this, that, these, those",
        explanation: "this/these للقريب (here)، و that/those للبعيد (there).",
        rules: [
          {
            rule: "مفرد قريب",
            examples: "This is the living room.",
          },
          {
            rule: "جمع قريب",
            examples: "These keys here are for the front door.",
          },
          {
            rule: "مفرد بعيد",
            examples: "That desk over there is where I work.",
          },
          {
            rule: "جمع بعيد",
            examples: "Do you see those towels over there?",
          },
        ],
      },
      {
        title: "have got",
        explanation: "have got = have، وتُستخدم كثيرًا في الكلام والكتابة غير الرسمي.",
        rules: [
          {
            rule: "إثبات",
            examples: "I've got two sisters. / He's got a new bike.",
          },
          {
            rule: "نفي",
            examples: "You haven't got any space.",
          },
          {
            rule: "سؤال",
            examples: "Have you got a bicycle? / Has she got a garden?",
          },
          {
            rule: "ملحوظة",
            examples: "في he's got: الـ 's معناها has",
          },
        ],
      },
      {
        title: "How to ... دعوة وعروض – Invitations and offers",
        explanation: "الدعوة بـ Would you like to + فعل، والقبول بـ I'd love to، والرفض بـ I'm sorry, I can't. العروض بـ Can I / Shall I / Let me + فعل.",
        rules: [
          {
            rule: "دعوة",
            examples: "Would you like to come for dinner on Friday?",
          },
          {
            rule: "قبول / رفض",
            examples: "I'd love to. / Sorry, I can't. I'm busy.",
          },
          {
            rule: "عرض",
            examples: "Can I take your jacket? / Shall I get you a drink?",
          },
        ],
      },
      {
        title: "there is / there are",
        explanation: "There's + مفرد، There are + جمع، ويعني (يوجد).",
        rules: [
          {
            rule: "مفرد",
            examples: "There's a park close by.",
          },
          {
            rule: "جمع",
            examples: "There are lots of shops.",
          },
          {
            rule: "نفي",
            examples: "There isn't much traffic. / There aren't any restaurants.",
          },
          {
            rule: "سؤال",
            examples: "Is there a cinema? / Are there any good cafés?",
          },
        ],
      },
    ],
  },
  {
    unit: "الوحدة 4: this world",
    points: [
      {
        title: "الماضي البسيط لـ be – was / were",
        explanation: "was مع I/he/she/it و were مع you/we/they. النفي wasn't / weren't.",
        rules: [
          {
            rule: "إثبات مفرد",
            examples: "The first Instagram photo was in 2010.",
          },
          {
            rule: "إثبات جمع",
            examples: "All three were new in the 2010s.",
          },
          {
            rule: "سؤال",
            examples: "Was the singer British? / Where were you?",
          },
          {
            rule: "ردود قصيرة",
            examples: "Yes, I was. / No, it wasn't.",
          },
        ],
      },
      {
        title: "how much / how many / how + صفة",
        explanation: "How much + غير معدود، How many + جمع معدود، والحجم/المسافة/المدة بـ How + صفة.",
        rules: [
          {
            rule: "How much + غير معدود",
            examples: "How much water ...?",
          },
          {
            rule: "How many + جمع",
            examples: "How many slices ...?",
          },
          {
            rule: "How far (مسافة)",
            examples: "How far do you walk?",
          },
          {
            rule: "How long (مدة / حجم)",
            examples: "How long do you wait?",
          },
          {
            rule: "How often (تكرار)",
            examples: "How often do you check your phone?",
          },
        ],
      },
      {
        title: "should / shouldn't والأوامر – Imperatives",
        explanation: "نصيحة: You should + فعل، تحذير: You shouldn't + فعل، توجيه: الفعل بدون فاعل.",
        rules: [
          {
            rule: "نصيحة",
            examples: "You should stay for a week or two.",
          },
          {
            rule: "تحذير",
            examples: "You shouldn't start the day too late.",
          },
          {
            rule: "توجيه",
            examples: "Go out early and find a good place to sit.",
          },
        ],
      },
    ],
  },
  {
    unit: "الوحدة 5: the past",
    points: [
      {
        title: "الماضي البسيط للأفعال المنتظمة – Regular verbs",
        explanation: "الفعل + ed (أو d). النفي بـ didn't + فعل، والسؤال بـ Did + فاعل + فعل.",
        rules: [
          {
            rule: "إضافة ed",
            examples: "work → worked, cook → cooked",
          },
          {
            rule: "إضافة d",
            examples: "change → changed, live → lived",
          },
          {
            rule: "نفي",
            examples: "He didn't enjoy that race.",
          },
          {
            rule: "سؤال",
            examples: "Did he enjoy his day job?",
          },
        ],
      },
      {
        title: "الماضي البسيط للأفعال الشاذة – Irregular verbs",
        explanation: "أفعال شائعة بتتغير تغيير كامل في الماضي. النفي والسؤال بـ did.",
        rules: [
          {
            rule: "أفعال شاذة",
            examples: "go → went, have → had, leave → left, say → said",
          },
          {
            rule: "أكثر",
            examples: "take → took, drive → drove, get → got, do → did",
          },
          {
            rule: "سؤال بكلمة استفهام",
            examples: "Why did the chef phone?",
          },
          {
            rule: "سؤال بدون فعل",
            examples: "Who did Jack invite?",
          },
        ],
      },
      {
        title: "How to ... الاعتذار – Apologise and make excuses",
        explanation: "الاعتذار بـ I'm (really / so) sorry، وقبول الاعتذار بـ That's all right / It's OK / No problem.",
        rules: [
          {
            rule: "اعتذار",
            examples: "I'm really sorry. My train was late.",
          },
          {
            rule: "قبول الاعتذار",
            examples: "That's all right. / It's OK. / No problem.",
          },
        ],
      },
      {
        title: "الصفات والمعدلات – Adjectives and modifiers",
        explanation: "really / very (قوي)، quite (متوسط)، a bit (شوية)، too (زيادة عن اللزوم).",
        rules: [
          {
            rule: "قوي",
            examples: "My weekend was very nice.",
          },
          {
            rule: "متوسط",
            examples: "It was quite good.",
          },
          {
            rule: "ضعيف",
            examples: "It was a bit crowded.",
          },
          {
            rule: "زيادة",
            examples: "It was too much.",
          },
        ],
      },
    ],
  },
  {
    unit: "الوحدة 6: out and about",
    points: [
      {
        title: "المضارع المستمر – Present continuous",
        explanation: "فاعل + am/is/are + فعل + ing، لوصف شيء بيحصل دلوقتي.",
        rules: [
          {
            rule: "إثبات",
            examples: "I'm using Becky's phone.",
          },
          {
            rule: "نفي",
            examples: "Her phone isn't working.",
          },
          {
            rule: "سؤال",
            examples: "Are you driving? / What's she wearing?",
          },
        ],
      },
      {
        title: "صفة المقارنة – Comparative adjectives",
        explanation: "لو الصفة قصيرة: + er، ولو طويلة: more + صفة. وشاذ: good → better, bad → worse.",
        rules: [
          {
            rule: "صفة قصيرة",
            examples: "slow → slower, quiet → quieter",
          },
          {
            rule: "صفة طويلة",
            examples: "beautiful → more beautiful",
          },
          {
            rule: "شاذ",
            examples: "good → better, bad → worse",
          },
          {
            rule: "بعد المقارنة",
            examples: "... than a car",
          },
        ],
      },
      {
        title: "How to ... إعطاء اتجاهات – Give directions",
        explanation: "بنعطي الاتجاه خطوة بخطوة: walk + اتجاه، turn left/right، go straight on، go past، cross.",
        rules: [
          {
            rule: "سؤال عن الطريق",
            examples: "How do I get ... from here?",
          },
          {
            rule: "المشي",
            examples: "Walk up / down Cork Hill.",
          },
          {
            rule: "استمر",
            examples: "Go straight on at the crossroads.",
          },
          {
            rule: "غير اتجاه",
            examples: "Turn left / right at the corner.",
          },
          {
            rule: "عدي / اعبر",
            examples: "Go past the car park. / Cross the bridge.",
          },
        ],
      },
      {
        title: "حروف الجر للحركة",
        explanation: "out of / into / towards / past / along / across / through / up / down.",
        rules: [
          {
            rule: "من بره لجوه",
            examples: "I walked out of my building.",
          },
          {
            rule: "ناحية",
            examples: "It walked towards me.",
          },
          {
            rule: "على طول / من خلال",
            examples: "Walk along the road. / through the park.",
          },
          {
            rule: "عابر",
            examples: "Walk past my car. / across the river.",
          },
        ],
      },
    ],
  },
  {
    unit: "الوحدة 7: work",
    points: [
      {
        title: "أدوات التعريف – Articles (a, an, the, zero)",
        explanation: "a/an قبل الوظيفة والمفرد. the قبل شيء محدد. بدون أداة مع الجمع العام والعبارات الثابتة.",
        rules: [
          {
            rule: "a/an قبل الوظيفة",
            examples: "Stefano is a professional sleeper.",
          },
          {
            rule: "a/an = واحد",
            examples: "Are you looking for a job? I write a blog.",
          },
          {
            rule: "the = محدد",
            examples: "Is this the job for you?",
          },
          {
            rule: "بدون أداة",
            examples: "Test beds and write reports. (عام) / in bed (عبارة ثابتة)",
          },
        ],
      },
      {
        title: "المضارع البسيط مقابل المستمر",
        explanation: "المضارع البسيط للعادة والأشياء الثابتة، والمستمر للي بيحصل دلوقتي.",
        rules: [
          {
            rule: "عادة / ثابت",
            examples: "I work for a bank. / He doesn't live near here.",
          },
          {
            rule: "بيحصل دلوقتي",
            examples: "I'm working outside today. / Today I'm helping Jim.",
          },
        ],
      },
      {
        title: "How to ... التليفون – Phone for information",
        explanation: "بداية المكالمة بـ Hello, this is ... / How can I help you؟ ونطلب الانتظار بـ Could you hold on a minute؟ والنهاية بـ Thank you for calling.",
        rules: [
          {
            rule: "الرد على التليفون",
            examples: "Hello, this is Mills Leisure Centre. How can I help you?",
          },
          {
            rule: "طلب الانتظار",
            examples: "Sorry, could you hold on a minute?",
          },
          {
            rule: "بعد الانتظار",
            examples: "Sorry about that. Thank you for waiting.",
          },
          {
            rule: "إنهاء المكالمة",
            examples: "Thank you for calling.",
          },
        ],
      },
      {
        title: "أفعال + to + فعل (مصدر) – Verbs and to infinitive",
        explanation: "بعد would like / would love / want / plan / need / hope / choose نستخدم to + فعل.",
        rules: [
          {
            rule: "would like to",
            examples: "I'd like to learn a foreign language.",
          },
          {
            rule: "would love to",
            examples: "I'd love to learn Italian.",
          },
          {
            rule: "want / plan / need",
            examples: "I want to learn the guitar. / I plan to do a course.",
          },
          {
            rule: "important for me to",
            examples: "It's important for me to learn photography.",
          },
        ],
      },
    ],
  },
  {
    unit: "الوحدة 8: away",
    points: [
      {
        title: "صفة التفضيل – Superlative adjectives",
        explanation: "the + صفة قصيرة + est (the cheapest)، the most + صفة طويلة، وشاذ: the best, the worst.",
        rules: [
          {
            rule: "the + est",
            examples: "The train is the cheapest way. / It's the quickest.",
          },
          {
            rule: "the most + صفة",
            examples: "The Pena Palace is the most beautiful place.",
          },
          {
            rule: "شاذ",
            examples: "What's the best thing to do? / the worst thing",
          },
        ],
      },
      {
        title: "be going to",
        explanation: "فاعل + am/is/are (not) going to + فعل، للخطة أو النية المستقبلية.",
        rules: [
          {
            rule: "إثبات",
            examples: "We're going to visit some museums.",
          },
          {
            rule: "نفي",
            examples: "We aren't going to change our plans.",
          },
          {
            rule: "سؤال",
            examples: "What are you going to do there?",
          },
        ],
      },
      {
        title: "How to ... طلبات وعروض في الفندق – Requests and offers",
        explanation: "الطلب بـ Can I / Could I + فعل؟ والعرض بـ I'll + فعل أو Would you like to + فعل؟",
        rules: [
          {
            rule: "طلب",
            examples: "Can I have another key card?",
          },
          {
            rule: "عرض مستقبلي (will)",
            examples: "I'll give you another one. / I'll send someone up.",
          },
          {
            rule: "عرض مهذب",
            examples: "Would you like to put your passport in the safe?",
          },
          {
            rule: "غير ممكن",
            examples: "I'm sorry, that's not possible.",
          },
        ],
      },
      {
        title: "ظروف الطريقة – Adverbs of manner",
        explanation: "صفة + ly لتكوين الظرف، وبعضها شاذ.",
        rules: [
          {
            rule: "صفة + ly",
            examples: "slow → slowly, careful → carefully",
          },
          {
            rule: "شاذ",
            examples: "fast → fast, good → well",
          },
          {
            rule: "سلبي",
            examples: "bad → badly",
          },
        ],
      },
    ],
  },
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
    prompt: "He manages the hotel. He is the hotel ____.",
    options: ["driver","manager","player","student"],
    answer: "manager",
    explanation: "لأنه هو اللي بيدير الفندق، فالكلمة الصح هي manager ومعناها مدير.",
    wrongNotes: {"driver":"driver معناها سواق، ومش اللي بيدير الفندق.","player":"player معناها لاعب، ومش لاعي الفندق.","student":"student معناها طالب، ومش طالب اللي بيدير الفندق."},
  },
  {
    prompt: "Can I have some water, please? I'm ____.",
    options: ["hungry","tired","thirsty","bored"],
    answer: "thirsty",
    explanation: "لما تطلب مية يبقى انت عطشان، وthirsty معناها عطشان.",
    wrongNotes: {"hungry":"hungry معناها جوعان، وده مش سبب طلب الماء.","tired":"tired معناها تعبان، وملهاش علاقة بالماء.","bored":"bored معناها زهقان، ومش السبب في طلب الماء."},
  },
  {
    prompt: "My brother Sam ____ in a small village.",
    options: ["live","lives","living","is live"],
    answer: "lives",
    explanation: "الفاعل Sam مفرد، فالفعل في المضارع البسيط بياخد s ويكون lives.",
    wrongNotes: {"live":"live من غير s، ومش صح مع الفاعل المفرد.","living":"living دي صيغة الـ ing ومحتاجة فعل مساعد قبلها.","is live":"is live تركيب غلط، والصحيح هو lives."},
  },
  {
    prompt: "Do you want to do something? Let's ____ a coffee after class.",
    options: ["get","getting","got","to get"],
    answer: "get",
    explanation: "بعد Let's بنستخدم الفعل في المصدر من غير to، فالصحيح هو get.",
    wrongNotes: {"getting":"getting دي صيغة الـ ing ومش صح بعد Let's.","got":"got دي صيغة الماضي، ومش بعد Let's.","to get":"to get فيه to زيادة، لأن بعد Let's من غير to."},
  },
  {
    prompt: "This is my ____ bedroom. We are two brothers and we share it.",
    options: ["brother","brother's","brothers'","brothers"],
    answer: "brothers'",
    explanation: "لأنهم إخوات (جمع) وبيكلموا عن غرفة مشتركة، فبنستخدم ملكية الجمع اللي بتنتهي بـ s ونزود عليها apostrophe فقط.",
    wrongNotes: {"brother":"brother مفرد من غير علامة ملكية، ومش صح في الجملة دي.","brother's":"brother's دي ملكية المفرد (أخ واحد بس)، والجملة بتتكلم عن اخوات.","brothers":"brothers جمع بس من غير علامة ملكية، بيفتقر للـ apostrophe."},
  },
  {
    prompt: "Which word is uncountable (غير معدود)?",
    options: ["broccoli","beans","onion","lemon"],
    answer: "broccoli",
    explanation: "broccoli (البَروكلي) كلمة غير معدودة، ومينفعش نحسبها أو نديها جمع.",
    wrongNotes: {"beans":"beans كلمة معدودة وقابلة للجمع.","onion":"onion كلمة معدودة.","lemon":"lemon كلمة معدودة."},
  },
  {
    prompt: "We don't have ____ lemons in the fridge.",
    options: ["some","any","an","a"],
    answer: "any",
    explanation: "في الجمل المنفية بنستخدم any مع الجمع وغير المعدود.",
    wrongNotes: {"some":"some بيتستخدم في الجمل المثبتة، مش في المنفية.","an":"an بنستخدمها قبل مفرد بيبدأ بحرف علة، ومش مناسبة هنا.","a":"a بنستخدمها قبل مفرد، و«lemons» هنا جمع."},
  },
  {
    prompt: "The first course of a meal is a ____.",
    options: ["starter","main course","side dish","dessert"],
    answer: "starter",
    explanation: "الطبق الأول في الوجبة اسمه starter (المقبلات).",
    wrongNotes: {"main course":"main course هو الطبق الرئيسي، مش الأول.","side dish":"side dish هو طبق جانبي بجانب الطبق الرئيسي.","dessert":"dessert هو الحُلو اللي بيتاكل في الآخر."},
  },
  {
    prompt: "____ we have the bill, please?",
    options: ["Do","Could","Should","Are"],
    answer: "Could",
    explanation: "Could هي الصيغة المهذبة في طلب الحساب (bill).",
    wrongNotes: {"Do":"Do صيغة سؤال عادية ومش مناسبة للطلب المهذب هنا.","Should":"Should بتستخدم للنصيحة، مش لطلب الأدب.","Are":"Are مبنستعملش مع «have» في السؤال ده."},
  },
  {
    prompt: "____ a big park close to my house.",
    options: ["There's","There are","It's","Has"],
    answer: "There's",
    explanation: "للتعبير عن وجود حاجة بنستخدم There's، وهنا park مفرد.",
    wrongNotes: {"There are":"There are بنستخدمها مع الجمع، وpark هنا مفرد.","It's":"It's بدي عن صفة أو تعريف، مش عن وجود.","Has":"Has محتاجة فاعل، ومش بتعبّر عن وجود حاجة."},
  },
  {
    prompt: "____ you got a bicycle at home?",
    options: ["Are","Has","Have","Do"],
    answer: "Have",
    explanation: "السؤال من «got» بنستخدم Have: «Have you got...?»",
    wrongNotes: {"Are":"Are مش صح مع got.","Has":"Has بتستخدم مع he/she/it، مش مع you.","Do":"Do you got تركيب غلط، الصحيح Have you got."},
  },
  {
    prompt: "Shall I ____ you something to drink?",
    options: ["get","getting","got","to get"],
    answer: "get",
    explanation: "بعد Shall I بنستخدم الفعل في المصدر من غير to، فالصحيح هو get.",
    wrongNotes: {"getting":"getting دي صيغة الـ ing ومش صح بعد Shall I.","got":"got دي صيغة الماضي، ومش بعد Shall I.","to get":"to get فيه to زيادة، لأن بعد Shall I من غير to."},
  },
  {
    prompt: "The first Instagram photo ____ in 2010.",
    options: ["was","were","is","did"],
    answer: "was",
    explanation: "لأن photo مفرد وفي الماضي (2010)، فبنستخدم was.",
    wrongNotes: {"were":"were بنستخدمها مع الجمع، وphoto هنا مفرد.","is":"is للمضارع، والجملة عن اللي حصل في الماضي.","did":"did فعل مساعد ومينفعش ييجي كفعل أساسي هنا."},
  },
  {
    prompt: "____ water do we use to make a pair of jeans?",
    options: ["How many","How much","How long","How far"],
    answer: "How much",
    explanation: "لأن water كلمة غير معدودة، فبنستخدم How much للكمية.",
    wrongNotes: {"How many":"How many بنستخدمها مع المعدود، والمية غير معدودة.","How long":"How long بسأل بيها عن المدة الزمنية.","How far":"How far بسأل بيها عن المسافة."},
  },
  {
    prompt: "You ____ start the day too late, or you'll miss breakfast.",
    options: ["should","shouldn't","must","can't"],
    answer: "shouldn't",
    explanation: "الجمله بتقول متبداش اليوم متأخر علشان متفوتش الفطار، فهي نصيحة بسلبية",
    wrongNotes: {"should":"should عكس المعنى، لأن هنا بننهي عن حاجة.","must":"must معناها لازم وتحتمل معنى إجباري أكتر من اللازم.","can't":"can't معناها مش قادر، وده مش المعنى المطلوب."},
  },
  {
    prompt: "Last year I ____ English every day.",
    options: ["study","studied","studying","studies"],
    answer: "studied",
    explanation: "Last year دليل على الماضي، وصيغة الماضي من study هي studied.",
    wrongNotes: {"study":"study مضارع، والجملة بتتكلم عن ماضي.","studying":"studying دي ing ومحتاجة فعل مساعد.","studies":"studies مضارع مع الفاعل المفرد، ومش مناسب هنا."},
  },
  {
    prompt: "She ____ to London by train last week.",
    options: ["goed","went","gone","goes"],
    answer: "went",
    explanation: "صيغة الماضي من فعل go هي went (ماضي شاذ).",
    wrongNotes: {"goed":"goed غلط، فعل go شاذ وماضيها went.","gone":"gone دي التصريف الثالث ومحتاجة فعل مساعد قبلها.","goes":"goes مضارع مع الفاعل المفرد، والجملة ماضي."},
  },
  {
    prompt: "It's 3:15. It's ____.",
    options: ["quarter to three","three past fifteen","quarter past three","three quarters"],
    answer: "quarter past three",
    explanation: "3:15 يعني ربع بعد التلاتة، وبنقول quarter past three.",
    wrongNotes: {"quarter to three":"quarter to three يعني ربع لـ 3:45، مش 3:15.","three past fifteen":"three past fifteen مش صيغة صحيحة في الإنجليزية.","three quarters":"three quarters معناها ثلاثة أرباع، مش تعبير للوقت."},
  },
  {
    prompt: "You buy medicine at the ____.",
    options: ["bakery","chemist's","florist's","shoe shop"],
    answer: "chemist's",
    explanation: "chemist's هي الصيدلية، ودي اللي بنشتري منها الدواء.",
    wrongNotes: {"bakery":"bakery هي المخبز، بيباع فيه العيش.","florist's":"florist's بيباع فيه الزهور.","shoe shop":"shoe shop بيباع فيه الأحذية (الجزمة)."},
  },
  {
    prompt: "Listen! She ____ the guitar right now.",
    options: ["plays","is playing","played","play"],
    answer: "is playing",
    explanation: "right now دليل على المضارع المستمر، فبنستخدم is playing.",
    wrongNotes: {"plays":"plays مضارع بسيط للعادة، مش للحاجة اللي بتحصل دلوقتي.","played":"played صيغة ماضي، والجملة بتحصل دلوقتي.","play":"play من غير s، ومش صح مع الفاعل المفرد She."},
  },
  {
    prompt: "A plane is ____ than a car.",
    options: ["faster","fastest","more fast","fast"],
    answer: "faster",
    explanation: "للمقارنة بين حاجتين بنستخدم faster مع than.",
    wrongNotes: {"fastest":"fastest دي صيغة التفضيل (الأسرع من كل الحاجات)، مش مقارنة.","more fast":"more fast غلط، لإن fast صفة قصيرة بتاخد er.","fast":"fast من غير مقارنة، ومعها than لازم صيغة مقارنة."},
  },
  {
    prompt: "Please ____ your phones during the exam.",
    options: ["turn off","turn on","turn up","turn into"],
    answer: "turn off",
    explanation: "في الامتحان بنطلب إقفال الموبايلات، وturn off معناها يقفل الجهاز.",
    wrongNotes: {"turn on":"turn on معناها يفتح الجهاز، وعكس المقصود.","turn up":"turn up معناها يزود الصوت.","turn into":"turn into معناها يتحول لحاجة تانية."},
  },
  {
    prompt: "Stefano is ____ professional sleeper.",
    options: ["a","an","the","(no article)"],
    answer: "a",
    explanation: "professional sleeper بيبدأ بحرف ساكن، فأول مرة نذكره بنستخدم a.",
    wrongNotes: {"an":"an بنستخدمها قبل كلمة بتحذف بحرف علة، وprofessional هنا بحرف ساكن.","the":"the بنستخدمها لحاجة معينة معروفة، وهنا بندي معلومة جديدة.","(no article)":"(no article) غلط لأن sleeper كلمة معدودة، ومحتاجة أداة قبلها."},
  },
  {
    prompt: "I'd like ____ a foreign language.",
    options: ["learn","learning","to learn","learned"],
    answer: "to learn",
    explanation: "بعد I'd like بنستخدم المصدر to + الفعل، يعني to learn.",
    wrongNotes: {"learn":"learn من غير to غلط بعد I'd like.","learning":"learning بصيغة الـ ing، ومش بنستخدمها بعد I'd like.","learned":"learned صيغة ماضي، ومش مناسبة هنا."},
  },
  {
    prompt: "The Pena Palace is ____ place in Sintra.",
    options: ["the most beautiful","the beautifulest","most beautiful","more beautiful"],
    answer: "the most beautiful",
    explanation: "لصيغة التفضيل مع الصفات الطويلة بنستخدم the most + صفة، فالصحيح the most beautiful.",
    wrongNotes: {"the beautifulest":"the beautifulest غلط، beautiful صفة طويلة بتاخد the most.","most beautiful":"most beautiful محتاجة the قبلها في التفضيل.","more beautiful":"more beautiful للمقارنة بين حاجتين، ومش تفضيل."},
  },
]
export const REVIEW_QUIZ_LETTERS = ['a', 'b', 'c', 'd'] as const
