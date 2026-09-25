import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const unit06: Unit = {
  id: 'unit-6',
  number: 6,
  title: 'out and about',
  phrase: 'describe what people are doing now, compare journeys and give directions',
  overviewPage: 57,
  pages: [57, 66],
  intro:
    'In this unit you describe what people are doing now and what they look like, compare types of transport, give directions and talk about an unusual experience.',
  objectives: ['6A – describe what is happening now', '6B – talk about transport', '6C – give directions', '6D – talk about an experience'],
  video: [
    {
      title: 'BBC Programmes: Cities: nature\u2019s new wild',
      file: 'SO3 A2 U6 BBC Programmes.mp4',
      page: 64,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
    {
      title: 'BBC Vlogs: out and about',
      file: 'SO3 A2 U6 BBC Vlogs (1).mp4',
      page: 65,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
  ],
  lessons: [
    {
      id: '6a',
      code: '6A',
      title: 'Meet me in town.',
      pages: [58, 59],
      labels: {
        grammar: 'present continuous',
        vocabulary: 'clothes and appearance',
        pronunciation: 'weak form of are',
      },
      objectives: ['describe what is happening now', 'describe clothes and appearance'],
      blocks: [
        {
          type: 'text',
          title: 'Describe what is happening now',
          titleAr: 'صِف ما يحدث الآن',
          paragraphs: [
            'Work friends Tom and Becky plan to meet. Listen to their phone conversations and describe what people are doing at this moment – and what they look like.',
          ],
        },
        {
          type: 'grammar',
          title: 'present continuous',
          titleAr: 'المضارع المستمر',
          explanation:
            'We use the present continuous for something that is happening now, at this moment.',
          explanationAr:
            'نستخدم المضارع المستمر للتعبير عن شيء يحدث الآن، في هذه اللحظة.',
          rule: 'subject + am/are/is + verb + -ing. Negative: subject + am not / isn\u2019t / aren\u2019t + -ing. Questions: Am/Are/Is + subject + -ing?',
          ruleAr: 'الفاعل + am/are/is + الفعل + -ing. النفي: الفاعل + am not/isn\u2019t/aren\u2019t + -ing. الأسئلة: Am/Are/Is + الفاعل + -ing؟',
          table: {
            headers: ['Form', 'Example'],
            rows: [
              { label: 'positive', values: ["I'm using Becky's phone."] },
              { label: 'negative', values: ["Her phone isn't working."] },
              { label: 'question', values: ['Are you driving?', "What's she wearing?"] },
            ],
          },
          examples: [
            'I\u2019m waiting for a bus.',
            'He\u2019s making a joke.',
            'Are you listening?',
          ],
          bankPage: 118,
          videos: [
            { id: '0djfJqWhnpY', title: 'How to Use the Present Continuous - English Verb Tenses Grammar Lesson' },
          ],
        },
        {
          type: 'audio',
          title: 'Phone conversations and the weak form of are',
          titleAr: 'محادثات هاتفية وصيغة النطق الضعيفة لـ are',
          tracks: au(['6.01', '6.02', '6.03']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6a-mcq',
            title: 'present continuous',
            kind: 'mcq',
            instructions: 'Choose the correct form.',
            instructionsAr: 'اختر الصيغة الصحيحة.',
            page: 58,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'I ___ using Becky\u2019s phone.',
                options: [
                  { label: 'am', correct: true },
                  { label: 'is', correct: false },
                  { label: 'are', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Her phone ___ working.',
                options: [
                  { label: 'isn\u2019t', correct: true },
                  { label: 'aren\u2019t', correct: false },
                  { label: 'don\u2019t', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: '___ you driving?',
                options: [
                  { label: 'Are', correct: true },
                  { label: 'Is', correct: false },
                  { label: 'Am', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'What ___ she wearing?',
                options: [
                  { label: 'is', correct: true },
                  { label: 'are', correct: false },
                  { label: 'am', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'vocab',
          title: 'clothes and appearance',
          titleAr: 'الملابس والمظهر',
          items: [
            { word: 'jumper, T-shirt, jacket, shirt, skirt, top, hat, jeans, trainers', meaning: 'items of clothing', meaningAr: 'ملابس: بلوفر، تيشيرت، جاكيت، قميص، جيبة، توب، قبعة، جينز، حذاء رياضي' },
            { word: 'tall / short', meaning: 'height', meaningAr: 'طويل / قصير' },
            { word: 'long hair / short hair', meaning: 'hair', meaningAr: 'شعر طويل / شعر قصير' },
            { word: 'blonde', meaning: 'hair colour', meaningAr: 'أشقر' },
            { word: 'beard / moustache', meaning: 'facial hair', meaningAr: 'لحية / شارب' },
            { word: 'checked', meaning: 'pattern in squares', meaningAr: 'مقلم / بنقشة المربعات' },
          ],
          source: 'See also Vocabulary Bank, page 142 (clothes and appearance)',
        },
        {
          type: 'callout',
          title: 'Writing: a group photo',
          titleAr: 'الكتابة: صورة جماعية',
          tone: 'tip',
          text: 'Describe a family or group photo in an email: who the people are and what they are wearing/doing. See the Writing Bank, page 93.',
          textAr: 'صِف صورة عائلية أو جماعية في رسالة إلكترونية: من هم الأشخاص وماذا يرتدون أو يفعلون. انظر بنك الكتابة في الصفحة 93.',
        },
        {
          type: 'pages',
          images: [img(60, 'Lesson 6A, page 58'), img(61, 'Lesson 6A, page 59')],
        },
      ],
    },
    {
      id: '6b',
      code: '6B',
      title: 'My way',
      pages: [60, 61],
      labels: {
        grammar: 'comparative adjectives',
        vocabulary: 'common adjectives (2) and transport collocations',
        pronunciation: 'sentence stress',
      },
      objectives: ['talk about transport', 'use comparative adjectives'],
      blocks: [
        {
          type: 'text',
          title: 'Talk about transport',
          titleAr: 'تحدث عن وسائل النقل',
          paragraphs: [
            'Three people found unusual ways to travel to work: a librarian rows a boat down a river, two sisters built a hovercraft, and a factory worker built his own plane!',
          ],
        },
        {
          type: 'vocab',
          title: 'common adjectives (2)',
          titleAr: 'صفات شائعة (2)',
          items: [
            { word: 'short', opposite: 'long', meaningAr: 'قصير', example: 'a short journey', exampleAr: 'رحلة قصيرة' },
            { word: 'dangerous', opposite: 'safe', meaningAr: 'خطير', example: 'a safe route', exampleAr: 'طريق آمن' },
            { word: 'expensive', opposite: 'cheap', meaningAr: 'غالي / مكلف', example: 'a cheap ticket', exampleAr: 'تذكرة رخيصة' },
            { word: 'difficult', opposite: 'easy', meaningAr: 'صعب', example: 'an easy journey', exampleAr: 'رحلة سهلة' },
            { word: 'noisy', opposite: 'quiet', meaningAr: 'صاخب / مزعج', example: 'a quiet street', exampleAr: 'شارع هادئ' },
            { word: 'quick / fast', opposite: 'slow', meaningAr: 'سريع', example: 'a slow boat', exampleAr: 'قارب بطيء' },
            { word: 'boring', opposite: 'interesting', meaningAr: 'ممل', example: 'an interesting route', exampleAr: 'طريق مثير للاهتمام' },
            { word: 'comfortable', opposite: 'uncomfortable', meaningAr: 'مريح', example: 'a comfortable seat', exampleAr: 'مقعد مريح' },
          ],
        },
        {
          type: 'vocab',
          title: 'transport collocations',
          titleAr: 'تعبيرات وسائل النقل',
          items: [
            { word: 'go by car / train / bus / plane / boat / bike', meaningAr: 'يذهب بالسيارة / القطار / الأتوبيس / الطائرة / القارب / الدراجة', example: 'I usually go by train.', exampleAr: 'عادة أذهب بالقطار.' },
            { word: 'go on foot', meaningAr: 'يذهب سيراً على الأقدام', example: 'It\u2019s ten minutes on foot.', exampleAr: 'المسافة عشر دقائق سيراً على الأقدام.' },
            { word: 'take a taxi / the bus / a plane', meaningAr: 'يأخذ تاكسي / الأتوبيس / طائرة', example: 'We took a taxi to the airport.', exampleAr: 'أخذنا تاكسي إلى المطار.' },
            { word: 'ride a bike', meaningAr: 'يركب دراجة', example: 'She rides a bike to school.', exampleAr: 'تركب دراجة إلى المدرسة.' },
            { word: 'drive a car', meaningAr: 'يقود سيارة', example: 'He drives to work.', exampleAr: 'يذهب إلى العمل بالسيارة.' },
          ],
          source: 'See also Vocabulary Bank, page 143 (transport collocations)',
        },
        {
          type: 'grammar',
          title: 'comparative adjectives',
          titleAr: 'الصفات المقارنة',
          explanation:
            'We use comparative adjectives to compare two things, often with than.',
          explanationAr:
            'نستخدم الصفات المقارنة للمقارنة بين شيئين، وغالباً مع than.',
          rule: 'Short adjectives (one syllable): add -er (slow → slower, short → shorter). Long adjectives (two syllables or more): use more + adjective (more beautiful, more dangerous). Irregular: good → better, bad → worse.',
          ruleAr: 'الصفات القصيرة (مقطع واحد): أضف -er (slow ← slower، short ← shorter). الصفات الطويلة (مقطعان فأكثر): استخدم more + صفة (more beautiful، more dangerous). الشاذة: good ← better، bad ← worse.',
          table: {
            headers: ['Type', 'Comparative'],
            rows: [
              { label: 'short adjective', values: ['slow → slower, quiet → quieter, noisy → noisier'] },
              { label: 'long adjective', values: ['beautiful → more beautiful', 'interesting → more interesting'] },
              { label: 'irregular', values: ['good → better, bad → worse'] },
              { label: 'after a comparative', values: ['... than a car'] },
            ],
          },
          examples: [
            'The boat is slower than a car.',
            'The river is more beautiful than the motorway.',
            'It\u2019s faster than driving.',
            'Much slower than the zip line!',
          ],
          bankPage: 119,
          videos: [
            { id: 'wC5GPzMb9BE', title: 'How to Use Adjectives in English - English Grammar Course' },
            { id: 'UlNuPWiyK9Y', title: 'Adjectives and Adverbs in English - 5 Levels of Difficulty' },
          ],
        },
        {
          type: 'audio',
          title: 'Pronunciation: comparing and sentence stress',
          titleAr: 'النطق: المقارنة ونبرات الجملة',
          tracks: au(['6.04', '6.05']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6b-mcq',
            title: 'Comparative form',
            kind: 'mcq',
            instructions: 'Choose the correct comparative adjective.',
            instructionsAr: 'اختر الصفة المقارنة الصحيحة.',
            page: 61,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'The boat is ___ than a car.',
                options: [
                  { label: 'slower', correct: true },
                  { label: 'more slow', correct: false },
                  { label: 'slow', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'The river is ___ than the motorway.',
                options: [
                  { label: 'more beautiful', correct: true },
                  { label: 'beautifuller', correct: false },
                  { label: 'most beautiful', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'good → ___',
                options: [
                  { label: 'better', correct: true },
                  { label: 'gooder', correct: false },
                  { label: 'more good', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'bad → ___',
                options: [
                  { label: 'worse', correct: true },
                  { label: 'badder', correct: false },
                  { label: 'more bad', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'Flying is ___ than driving.',
                options: [
                  { label: 'faster', correct: true },
                  { label: 'more fast', correct: false },
                  { label: 'fastest', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'pages',
          images: [img(62, 'Lesson 6B, page 60'), img(63, 'Lesson 6B, page 61')],
        },
      ],
    },
    {
      id: '6c',
      code: '6C',
      title: 'Getting around',
      pages: [62, 63],
      labels: {
        grammar: 'How to ... give directions',
        vocabulary: 'places',
        pronunciation: 'stress to correct information',
      },
      objectives: ['give directions', 'understand directions'],
      blocks: [
        {
          type: 'text',
          title: 'Give directions',
          titleAr: 'أعطِ الاتجاهات',
          paragraphs: [
            'Explore Dublin on foot: from Millennium Bridge to the Molly Malone statue, and from Ha\u2019penny Bridge to Dublin Castle. Then follow a route on the map of Dublin.',
          ],
        },
        {
          type: 'vocab',
          title: 'places and directions',
          titleAr: 'الأماكن والاتجاهات',
          items: [
            { word: 'pedestrian bridge', meaning: 'a bridge for people on foot', meaningAr: 'جسر للمشاة' },
            { word: 'crossroads', meaning: 'where two roads cross', meaningAr: 'تقاطع طرق' },
            { word: 'traffic lights', meaning: 'lights that control traffic', meaningAr: 'إشارات المرور' },
            { word: 'corner', meaning: 'the place where two streets meet', meaningAr: 'الزاوية / الناصية' },
            { word: 'square', meaning: 'an open space in a town', meaningAr: 'ميدان / ساحة' },
            { word: 'car park', meaning: 'a place to park cars', meaningAr: 'موقف سيارات' },
            { word: 'bus stop', meaning: 'the place where buses stop', meaningAr: 'موقف الأتوبيس' },
            { word: 'statue', meaning: 'a model of a person made of stone or metal', meaningAr: 'تمثال' },
          ],
        },
        {
          type: 'grammar',
          title: 'How to ... give directions',
          titleAr: 'كيف ... نعطي الاتجاهات',
          explanation:
            'Give directions step by step: walk/go + direction + place, then turn left/right, go straight on, cross or go past a place.',
          explanationAr:
            'أعطِ الاتجاهات خطوة بخطوة: امشِ أو اذهب + اتجاه + مكان، ثم انعطف يساراً أو يميناً، وامشِ باستقامة، واعبر أو مرّ بجانب مكان.',
          table: {
            headers: ['Step', 'Phrase'],
            rows: [
              { values: ['ask the way', 'How do I get ... from here?'] },
              { values: ['go on foot', 'Walk up/down + street'] },
              { values: ['keep going', 'Go straight on at the crossroads.'] },
              { values: ['change direction', 'Turn left/right at + landmark.'] },
              { values: ['pass a place', 'Go past + place.'] },
              { values: ['cross', 'Cross the bridge / square.'] },
            ],
          },
          examples: [
            'How do I get from here?',
            'Walk up Cork Hill.',
            'At the crossroads, go straight on.',
            'Cross the pedestrian bridge.',
            'Turn left at the next corner.',
            'Go past the car park and the café is on your right.',
            'Go to the end of the road and turn right at the traffic lights.',
            'Cross the square and the statue is in front of you.',
          ],
          bankPage: 120,
          videos: [
            { id: 'By94mMolWUI', title: 'How to Use To, In, and At - Prepositions in English Grammar' },
            { id: 'SDO8mP45hr8', title: 'Should You Use TO or FOR? - 5 Levels of English Grammar' },
          ],
        },
        {
          type: 'audio',
          title: 'Asking for directions and stress to correct information',
          titleAr: 'السؤال عن الاتجاهات ونبرة تصحيح المعلومة',
          tracks: au(['6.06', '6.07', '6.08']),
        },
        {
          type: 'callout',
          title: 'Pronunciation note',
          titleAr: 'ملاحظة النطق',
          tone: 'note',
          text: 'When you correct information, stress the correct word: A: "Grafton Bridge." B: "Actually no, it\u2019s Grattan Bridge."',
          textAr: 'عند تصحيح معلومة، نبر على الكلمة الصحيحة: أ: "Grafton Bridge". ب: "في الحقيقة لا، إنها Grattan Bridge".',
        },
        {
          type: 'pages',
          images: [img(64, 'Lesson 6C, page 62'), img(65, 'Lesson 6C, page 63')],
        },
      ],
    },
    {
      id: '6d',
      code: '6D',
      title: 'Documentary: Cities: nature\u2019s new wild',
      pages: [64, 65],
      labels: {
        grammar: 'prepositions and adverbs of movement',
        skills: 'talk about an experience',
      },
      objectives: ['talk about an experience', 'use prepositions and adverbs of movement'],
      blocks: [
        {
          type: 'text',
          title: 'An unusual experience',
          titleAr: 'تجربة غير عادية',
          paragraphs: [
            'Cities are growing bigger and bigger, and animals are moving into the cities, where there is more food and safer places for their families. Follow the journey of a group of penguins from the ocean to their homes near Cape Town.',
          ],
        },
        {
          type: 'video',
title: 'BBC Programmes: Cities: nature\u2019s new wild',
titleAr: 'برامج بي بي سي: المدن: برية الطبيعة الجديدة',
            videos: [
              {
                title: 'Documentary clip: penguins in the city',
                file: 'SO3 A2 U6 BBC Programmes.mp4',
                page: 64,
                note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
              },
              {
                title: 'BBC Vlogs: out and about',
                file: 'SO3 A2 U6 BBC Vlogs (1).mp4',
                page: 65,
              },
            ],
        },
        {
          type: 'vocab',
          title: 'prepositions and adverbs of movement',
          titleAr: 'حروف الجر وظروف الحركة',
          items: [
            { word: 'out of', meaning: 'from inside to outside (walk out of my building)', meaningAr: 'خارج من (من الداخل إلى الخارج)' },
            { word: 'into', meaning: 'from outside to inside (go into a house)', meaningAr: 'إلى داخل (من الخارج إلى الداخل)' },
            { word: 'towards', meaning: 'in the direction of (walk towards me)', meaningAr: 'باتجاه (في اتجاه)' },
            { word: 'past', meaning: 'going by (walk past my car)', meaningAr: 'أمام / متجاوزاً (يمرّ بجانب)' },
            { word: 'along', meaning: 'following the length of (along the road)', meaningAr: 'على طول (بمحاذاة الطريق)' },
            { word: 'across', meaning: 'from one side to the other (cross the river)', meaningAr: 'عبر (من جانب إلى آخر)' },
            { word: 'through', meaning: 'in one side and out the other (walk through the park)', meaningAr: 'خلال / عبر (من جانب للجانب الآخر)' },
            { word: 'up / down', meaning: 'going to a higher / lower place', meaningAr: 'صعوداً / هبوطاً (إلى مكان أعلى / أدنى)' },
            { word: 'back', meaning: 'returning (come back)', meaningAr: 'يعود (العودة)' },
          ],
          source: 'Grammar Bank, page 121 – prepositions and adverbs of movement',
        },
        {
          type: 'audio',
          title: 'Jordan describes an unusual experience',
          titleAr: 'جوردان يصف تجربة غير عادية',
          tracks: au(['6.09']),
        },
        {
          type: 'text',
          title: 'Reading: A City Story',
          titleAr: 'القراءة: قصة مدينة',
          paragraphs: [
            'This happened last year, in my hometown. It was in the middle of the afternoon. I walked out of my building and got into my car. My car was in front of my building, so I didn\u2019t need to walk far. Suddenly I saw a big dog at the end of the road. It walked towards me, and when it was very close, I saw that it wasn\u2019t a dog \u2013 it was a wolf! A wolf in the city centre! I was safe inside my car, but I was very scared. I took out my phone and tried to video the wolf as it walked past my car. Usually there were people on the street, but at that moment there wasn\u2019t anybody. I watched the wolf for a minute. Then it turned the corner and was gone. It was just like in a dream. After that I always looked along the road before I left my apartment.',
          ],
        },
        {
          type: 'callout',
          title: 'Writing: a city story',
          titleAr: 'الكتابة: قصة مدينة',
          tone: 'tip',
          text: 'Write your own city story about an unusual experience. Use linking words (and, after that, because, but, so, then) and three prepositions or adverbs of movement.',
          textAr: 'اكتب قصتك الخاصة عن المدينة وعن تجربة غير عادية، مستخدماً أدوات الربط (و، بعد ذلك، لأن، لكن، لذلك، ثم) وثلاثة من حروف الجر أو ظروف الحركة.',
        },
        {
          type: 'pages',
          images: [img(66, 'Lesson 6D, page 64'), img(67, 'Lesson 6D, page 65')],
        },
      ],
    },
    {
      id: '6r',
      code: 'Review',
      title: 'Unit 6 Review',
      pages: [66, 66],
      blocks: [
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6r-mcq',
            title: 'Choose the correct option',
            kind: 'mcq',
            instructions: 'Complete the text about a zip line over the Angry River.',
            instructionsAr: 'أكمل النص عن الحبل الانزلاقي فوق نهر أنغري.',
            page: 66,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'When Cha Huilan needs medicine for her mother, she doesn\u2019t ___ a bike.',
                options: [
                  { label: 'ride', correct: true },
                  { label: 'go', correct: false },
                  { label: 'take', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'She goes by zip line ___ the River Nu.',
                options: [
                  { label: 'across', correct: true },
                  { label: 'through', correct: false },
                  { label: 'on', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'The River Nu is very strong, and boats can\u2019t cross it ___',
                options: [
                  { label: 'safely', correct: true },
                  { label: 'safe', correct: false },
                  { label: 'more safe', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'A boat is ___ than the zip line.',
                options: [
                  { label: 'more dangerous', correct: true },
                  { label: 'dangerouser', correct: false },
                  { label: 'dangerouster', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'Walking is much ___.',
                options: [
                  { label: 'slower', correct: true },
                  { label: 'more slow', correct: false },
                  { label: 'slowest', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Review listenings',
          titleAr: 'استماعات المراجعة',
          tracks: au(['R6.01', 'R6.02']),
        },
        {
          type: 'pages',
          images: [img(68, 'Unit 6 Review, page 66')],
        },
      ],
    },
  ],
}