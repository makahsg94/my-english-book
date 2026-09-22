import type {
  Unit,
  Lesson,
} from '../../types/content'
import { au, img } from '../helpers'

// ===========================================================================
// 1A Who are you?
// ===========================================================================

const lesson1A: Lesson = {
  id: '1a',
  code: '1A',
  title: 'Who are you?',
  subtitle: 'People and relationships \u2022 Present simple and present continuous; state verbs; adverbs of frequency',
  pages: [8, 10],
  labels: {
    grammar: 'present simple and present continuous; state verbs; adverbs of frequency',
    vocabulary: 'people and relationships; personality adjectives',
    pronunciation: 'connected speech: do you',
  },
  objectives: [
    'understand people talking about the people and activities in their life',
    'talk about different people and activities in your life',
    'write a personal profile',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 1A',
      tone: 'info',
      text: "People and relationships \u2022 Who are you? You learn to talk about the groups of people in your life \u2013 teammates, colleagues, family and friends \u2013 and about the activities you do together.",
    },
    {
      type: 'vocab',
      title: 'people and relationships',
      items: [
        { word: 'teammate', meaning: 'a person you play a sport with in the same team', meaningAr: 'زميل في الفريق', example: "I get on well with my teammates on the football team.", exampleAr: 'أنا على وفاق مع رفاق فريقي في فريق كرة القدم.' },
        { word: 'colleague', meaning: 'a person you work with', meaningAr: 'زميل في العمل', example: "I'm friendly with most of my colleagues.", exampleAr: 'أنا ودود مع معظم زملائي في العمل.' },
        { word: 'manager', meaning: 'the person who leads a team or a department', meaningAr: 'المدير (قائد الفريق)', example: 'I have a really good manager. I look up to her.', exampleAr: 'لديّ مدير جيد جداً. أنا أقدّره.' },
        { word: 'close friend', meaning: 'a friend you know very well and trust', meaningAr: 'صديق مقرّب', example: 'I also have a group of close friends and we sometimes play music together.', exampleAr: 'لديّ أيضاً مجموعة من الأصدقاء المقرّبين ونعزف الموسيقى معاً أحياناً.' },
        { word: 'partner', meaning: 'the person you share your life with', meaningAr: 'شريك الحياة', example: 'My partner is my best friend.', exampleAr: 'شريكي هو أفضل صديق لي.' },
        { word: 'grandparent', meaning: 'your mother\u2019s or father\u2019s parent', meaningAr: 'الجدّ أو الجدّة', example: 'My grandparents were very important to me.', exampleAr: 'كان أجدادي مهمّين جداً بالنسبة لي.' },
        { word: 'daughter', meaning: 'a female child', meaningAr: 'الابنة', example: 'My daughter takes after my mother.', exampleAr: 'ابنتي تشبه أمي في الطبع.' },
        { word: 'children', meaning: 'your sons or daughters', meaningAr: 'الأبناء', example: 'I want my children to have a good relationship with my parents.', exampleAr: 'أريد أن تكون علاقة أطفالي بوالديّ جيدة.' },
      ],
      source: 'Vocabulary Bank 1A, page 136',
    },
    {
      type: 'examples',
      title: 'phrases used to talk about relationships',
      items: [
        "have a good relationship with someone \u2192 I get on well with my teammates.",
        'be similar to a parent or relative \u2192 My daughter takes after my mother.',
        'respect someone \u2192 I really look up to my manager.',
        'see, talk or write to someone regularly \u2192 I like to stay in touch with my parents.',
      ],
    },
    {
      type: 'vocab',
      title: 'personality adjectives',
      items: [
        { word: 'funny', meaning: 'making you laugh', meaningAr: 'مضحك', example: "They're so funny, and great to be with.", exampleAr: 'إنهم مضحكون جداً ورائعون في التعامل.' },
        { word: 'kind', meaning: 'caring about other people', meaningAr: 'طيّب / لطيف', example: "She's such a kind and generous person.", exampleAr: 'إنها شخص طيّب وكريم جداً.' },
        { word: 'generous', meaning: 'happy to give things or money to others', meaningAr: 'كريم', example: 'My grandfather is very generous with his time.', exampleAr: 'جدّي كريم جداً بوقته.' },
        { word: 'hard-working', meaning: 'working with effort', meaningAr: 'مجتهد / يعمل بجد', example: 'They are hard-working and very reliable.', exampleAr: 'إنهم مجتهدون وموثوقون جداً.' },
        { word: 'reliable', meaning: 'someone you can depend on', meaningAr: 'موثوق / يُعتمد عليه', example: 'She is a very reliable colleague.', exampleAr: 'إنها زميلة يمكن الاعتماد عليها تماماً.' },
        { word: 'cheerful', meaning: 'happy and positive', meaningAr: 'مبتهج / مرِح', example: "She's always cheerful.", exampleAr: 'إنها دائماً مرِحة.' },
        { word: 'calm', meaning: 'relaxed and not worried', meaningAr: 'هادئ', example: 'It\u2019s amazing that he was so calm.', exampleAr: 'من المدهش أنه كان هادئاً إلى هذا الحد.' },
      ],
    },
    {
      type: 'audio',
      title: 'Listening: three people talking about their lives',
      tracks: au(['1.01']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1a-listening',
        title: 'Who talks about each idea?',
        kind: 'mcq',
        instructions: 'Listen to three people talking about their lives. Who talks about each idea?',
        page: 9,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'Who is studying design and loves it?',
            options: [
              { label: 'Tomasz', correct: true },
              { label: 'Michaela' },
              { label: 'Jo' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'Who plays hockey?',
            options: [
              { label: 'Michaela', correct: true },
              { label: 'Tomasz' },
              { label: 'Jo' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'Who lives at home with their parents?',
            options: [
              { label: 'Jo', correct: true },
              { label: 'Tomasz' },
              { label: 'Michaela' },
            ],
          },
        ],
      },
    },
    {
      type: 'grammar',
      title: 'present simple and present continuous; state verbs; adverbs of frequency',
      explanation:
        "We use the present simple for facts and things that are always or usually true. We use the present continuous for things happening now or around now. Some verbs describe states (feelings, thoughts), not actions, and we don't usually use them in the continuous form.",
      rule:
        "present simple: facts, habits and routines \u2192 We study during the day and then we usually cook together in the evening. present continuous: temporary situations happening around now \u2192 I'm living with a few of the people on my course at the moment. state verbs: like, love, want, need, know, prefer, remember \u2192 stay in the present simple. adverbs of frequency: always, usually, often, sometimes, hardly ever, never \u2013 before the main verb but after be.",
      table: {
        headers: ['Tense', 'Use'],
        rows: [
          { label: 'present simple', values: ['facts, habits and routines', 'My parents live back home in Poland.', 'When they come home, we always try to meet up.'] },
          { label: 'present continuous', values: ['things happening now or around now', "I'm studying design and I love it!", "I'm living with a few of the people on my course at the moment."] },
          { label: 'state verbs', values: ['feelings and states \u2013 not usually continuous', 'I love it! (not: I\u2019m loving it)'] },
          { label: 'adverbs of frequency', values: ['always / usually / often / sometimes / hardly ever / never', 'We always try to meet up when my parents come home.'] },
        ],
      },
      examples: [
        "I'm studying design and I love it!",
        "I'm living with a few of the people on my course at the moment.",
        'We study during the day and then we usually cook together in the evening.',
        'My parents live back home in Poland.',
      ],
      bankPage: 104,
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1a-grammar',
        title: 'Present simple or present continuous?',
        kind: 'mcq',
        instructions: 'Choose the correct verb form.',
        page: 9,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'I \u2026 design at university at the moment.',
            options: [
              { label: "'m studying", correct: true },
              { label: 'study' },
              { label: 'studies' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'We \u2026 during the day and then we usually cook together in the evening.',
            options: [
              { label: 'study', correct: true },
              { label: "'re studying" },
              { label: 'studies' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'My parents \u2026 back home in Poland.',
            options: [
              { label: 'live', correct: true },
              { label: "'re living" },
              { label: 'lives' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: "Right now I \u2026 my course.", 
            options: [
              { label: "'m not enjoying", correct: true },
              { label: 'don\u2019t enjoy' },
              { label: 'not enjoying' },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Pronunciation: connected speech \u2013 do you',
      tracks: au(['1.02', '1.03']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1a-pronunciation',
        title: 'Connected speech: do you',
        kind: 'fill-blank',
        instructions: 'Listen and write the questions you hear. Practise saying them with a partner.',
        page: 9,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'Do you',
            answer: 'cook for your family',
            after: '?',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'Do you',
            answer: 'eat out in restaurants',
            after: '?',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'Do you',
            answer: 'stay in touch with old friends',
            after: '?',
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1a-frequency',
        title: 'Adverbs of frequency',
        kind: 'fill-blank',
        instructions: 'Complete the sentences with an adverb of frequency from the box: always, usually, often, sometimes, hardly ever, never.',
        page: 10,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'I',
            answer: 'hardly ever',
            after: 'eat out in a restaurant; I prefer to cook at home.',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'My grandmother',
            answer: 'always',
            after: 'calls me on my birthday.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'We',
            answer: 'usually',
            after: 'stay with friends when we go on holiday.',
          },
        ],
      },
    },
    {
      type: 'text',
      title: 'Writing: a personal profile',
      paragraphs: [
        "Write a personal profile like Matt's. Say who you are and what you do, describe your character and a passion or interest. Use linking phrases to connect ideas: because (reason), also, as well as, too (adding a similar idea) and for example (giving an example).",
      ],
    },
    {
      type: 'pages',
      images: [img(22, 'Who are you?', 'Pedro and the different groups of people in his life'), img(23, 'Listening and grammar', 'Present simple and present continuous exercises'), img(24, 'A personal profile', 'Model personal profile with linking phrases')],
    },
  ],
}

// ===========================================================================
// 1B Good people
// ===========================================================================

const lesson1B: Lesson = {
  id: '1b',
  code: '1B',
  title: 'Good people',
  subtitle: 'Jobs and work \u2022 Verb patterns',
  pages: [11, 13],
  labels: {
    grammar: 'verb patterns',
    vocabulary: 'jobs; work',
    pronunciation: 'syllable stress',
  },
  objectives: [
    'read a news article about people with unusual jobs',
    'talk about jobs and work using verb patterns',
    'invent a news story',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 1B',
      tone: 'info',
      text: 'Good people \u2013 you read a news article about volunteers who help other people, learn vocabulary for jobs, and practise verb patterns (verb + -ing and verb + to + infinitive).',
    },
    {
      type: 'vocab',
      title: 'jobs',
      items: [
        { word: 'chef', meaning: 'a person who cooks in a restaurant', meaningAr: 'طاهٍ (شيف)', example: 'A chef is responsible for planning the menu and creating new dishes.', exampleAr: 'الطاهي مسؤول عن تخطيط قائمة الطعام وابتكار أطباق جديدة.' },
        { word: 'musician', meaning: 'a person who plays music or sings', meaningAr: 'موسيقي', example: 'My brother is a musician.', exampleAr: 'أخي موسيقي.' },
        { word: 'mechanic', meaning: 'a person whose job is repairing cars and machines', meaningAr: 'ميكانيكي', example: 'The mechanic fixed our car very quickly.', exampleAr: 'أصلح الميكانيكي سيارتنا بسرعة كبيرة.' },
        { word: 'financial consultant', meaning: 'a person who gives advice about money', meaningAr: 'مستشار مالي', example: "I'd like to be a financial consultant because they earn a good salary.", exampleAr: 'أودّ أن أصبح مستشاراً مالياً لأنهم يكسبون راتباً جيداً.' },
        { word: 'shop assistant', meaning: 'a person who helps customers in a shop', meaningAr: 'بائع في متجر', example: 'The shop assistant recommended the blue jacket.', exampleAr: 'نصحني البائع بالسترة الزرقاء.' },
        { word: 'plumber', meaning: 'a person who repairs water pipes', meaningAr: 'سبّاك', example: 'We called a plumber to fix the kitchen tap.', exampleAr: 'اتصلنا بسبّاك ليصلح صنبور المطبخ.' },
        { word: 'gardener', meaning: 'a person who works in a garden', meaningAr: 'بستاني', example: 'Our gardener looks after the plants once a week.', exampleAr: 'يعتني البستاني بالنباتات مرة كل أسبوع.' },
        { word: 'journalist', meaning: 'a person who writes for newspapers or websites', meaningAr: 'صحفي', example: "My sister is a journalist.", exampleAr: 'أختي صحفية.' },
      ],
      source: 'Vocabulary Bank 1B, page 136',
    },
    {
      type: 'audio',
      title: 'Listening: eight people talking about their jobs',
      tracks: au(['1.04']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1b-jobs',
        title: 'Match the speaker with the job',
        kind: 'matching',
        instructions: 'Listen to eight people talking about their jobs and match the description with the job.',
        page: 11,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'matching',
            pairs: [
              { left: 'plans the menu and creates new dishes', right: 'chef' },
              { left: 'repairs cars and machines', right: 'mechanic' },
              { left: 'helps customers in a shop', right: 'shop assistant' },
              { left: 'gives advice about money', right: 'financial consultant' },
              { left: 'fixes water pipes', right: 'plumber' },
              { left: 'looks after plants and gardens', right: 'gardener' },
              { left: 'writes articles for the news', right: 'journalist' },
              { left: 'plays music or sings', right: 'musician' },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Pronunciation: syllable stress',
      tracks: au(['1.05']),
    },
    {
      type: 'text',
      title: 'Reading: news stories about volunteer heroes',
      paragraphs: [
        "Read the articles about three people who do unusual jobs and help their communities. They are described in the media as 'good people'. Complete the table with information from your text: who the person is and where they are, what their job is, what they do for other people, and why they do it.",
      ],
    },
    {
      type: 'text',
      title: 'Vocab sheet: Food is Free',
      paragraphs: [
        "Lou Ridsdale loves gardening. In a small space next to her home in Ballarat, Australia, she grows vegetables. One day she heard about a man in Los Angeles who grew food to share with the community. He belonged to an organisation called Food is Free. Ridsdale saw that she had more vegetables than she needed and decided to give them away, like the man in Los Angeles.",
        'In Ballarat, just 6.4 percent of people eat the recommended amount of vegetables. A lot of people in the city have low incomes and the city has many problems connected to what people eat: lack of affordable food and lack of education about healthy eating. Ridsdale wanted to change this.',
      ],
    },
    {
      type: 'grammar',
      title: 'verb patterns',
      explanation:
        "Some verbs are followed by the to + infinitive form, and other verbs are followed by the -ing form. We can also use the -ing form as the subject of a sentence and after prepositions.",
      rule:
        "verb + to + infinitive: decide, hope, need, want, agree, help, plan \u2192 After leaving school, I decided to do a plumbing course. verb + -ing: enjoy, finish, like, mind, spend time \u2192 Before studying to be a doctor, he worked as a volunteer. -ing form as subject: Working here is great! preposition + -ing form: She agreed to help before realising how hard it was.",
      table: {
        headers: ['Pattern', 'Example'],
        rows: [
          { label: 'verb + to + infinitive', values: ['decide to do \u2022 hope to become \u2022 need to speak', 'After leaving school, I decided to do a plumbing course.', "She hopes to become a chef."] },
          { label: 'verb + -ing', values: ['enjoy working \u2022 spend time learning | Working here is great \u2013 I love it!', 'Before studying to be a doctor, he worked as a volunteer in a hospital.'] },
          { label: '-ing form as subject', values: ['Helping people is what Ridsdale does.'] },
          { label: 'preposition + -ing form', values: ['After leaving the food outside her home, she put up a sign.'] },
        ],
      },
      examples: [
        'After leaving school, I decided to do a plumbing course.',
        'She hopes to become a chef.',
        'Working here is great \u2013 I love it!',
        'Helping people is what Ridsdale does.',
      ],
      bankPage: 105,
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1b-grammar',
        title: 'Verb patterns',
        kind: 'mcq',
        instructions: 'Choose the correct form to complete the sentences.',
        page: 12,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'He promised \u2026 me the money.',
            options: [
              { label: 'to give', correct: true },
              { label: 'giving' },
              { label: 'gave' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'Everyone agreed \u2026 together.',
            options: [
              { label: 'to work', correct: true },
              { label: 'working' },
              { label: 'work' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: "I spent a whole day \u2026 my essay.",
            options: [
              { label: 'writing', correct: true },
              { label: 'to write' },
              { label: 'wrote' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: "We'd like \u2026 an app.",
            options: [
              { label: 'to create', correct: true },
              { label: 'creating' },
              { label: 'created' },
            ],
          },
          {
            id: 'q5',
            kind: 'mcq',
            prompt: "They don't mind \u2026 together.",
            options: [
              { label: 'studying', correct: true },
              { label: 'to study' },
              { label: 'studied' },
            ],
          },
        ],
      },
    },
    {
      type: 'text',
      title: 'Speaking: invent a news story',
      paragraphs: [
        "Work in pairs. Choose one of the headlines and invent a news story. Answer the questions: Where and when did it happen? Who was involved? Why did they decide to do this? What difficulties did they have? How did people hear about the story? Use at least five phrases from the box: after + -ing form \u2022 agreed to \u2022 before + -ing form \u2022 decided to \u2022 helped to \u2022 needed to \u2022 realising \u2022 wanted to.",
      ],
    },
    {
      type: 'pages',
      images: [img(25, 'Good people', 'Jobs vocabulary and syllable stress'), img(26, 'Reading', 'News article about volunteer heroes'), img(27, 'Verb patterns', 'Grammar and speaking: invent a news story')],
    },
  ],
}

// ===========================================================================
// 1C Let's talk!
// ===========================================================================

const lesson1C: Lesson = {
  id: '1c',
  code: '1C',
  title: "Let's talk!",
  subtitle: 'How to \u2026 start and end a conversation; keep a conversation going',
  pages: [14, 15],
  labels: {
    grammar: 'how to \u2026 start and end a conversation; keep a conversation going',
    vocabulary: 'conversation topics',
    pronunciation: 'rhythm and intonation',
  },
  objectives: [
    'start a conversation and keep it going',
    'use phrases to respond and end conversations',
    'practise clear rhythm and intonation',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 1C',
      tone: 'info',
      text: "Let's talk! \u2013 you learn how to start and end a conversation and keep it going. In Japan there are 'Happy to chat' benches where people invite strangers to sit and talk.",
    },
    {
      type: 'vocab',
      title: 'conversation topics',
      items: [
        { word: 'clothes and fashion', meaningAr: 'الملابس والأزياء', example: "That's a nice jacket. Where did you get it?", exampleAr: 'هذه سترة جميلة. من أين اشتريتها؟' },
        { word: 'food and eating out', meaningAr: 'الطعام وتناول الطعام خارج المنزل', example: 'Have you tried these pastries? They look delicious.', exampleAr: 'هل جرّبت هذه المعجّنات؟ تبدو لذيذة.' },
        { word: 'hobbies and free-time activities', meaningAr: 'الهوايات وأنشطة وقت الفراغ', example: 'What kinds of things do you paint?', exampleAr: 'ما أنواع الأشياء التي ترسمها؟' },
        { word: 'holiday experiences', meaningAr: 'تجارب العطلات', example: "We've just got back from Corfu. It was wonderful.", exampleAr: 'لقد عدنا لتوّنا من كورفو. كانت رائعة.' },
        { word: 'politics', meaningAr: 'السياسة', example: 'So, who do you think will win the election?', exampleAr: 'إذن، من تتوقع أن يفوز في الانتخابات؟' },
        { word: 'sport or music events', meaningAr: 'الأحداث الرياضية أو الموسيقية', example: "It's the Big Music Live this weekend. Are you going?", exampleAr: 'إنه مهرجان Big Music Live هذا الأسبوع. هل ستذهب؟' },
        { word: 'the news', meaningAr: 'الأخبار', example: 'Did you hear about the fire in town? It\u2019s terrible.', exampleAr: 'هل سمعت عن الحريق في المدينة؟ إنه فظيع.' },
        { word: 'the weather', meaningAr: 'الطقس', example: "Lovely day, isn't it?", exampleAr: 'يوم جميل، أليس كذلك؟' },
        { word: 'work or studies', meaningAr: 'العمل أو الدراسة', example: 'I hear you have a job in finance. Do you enjoy it?', exampleAr: 'سمعت أن لديك وظيفة في مجال التمويل. هل تستمتع بها؟' },
      ],
    },
    {
      type: 'text',
      title: 'The benefits of talking to strangers',
      paragraphs: [
        'Most of us spend part of our day surrounded by strangers, perhaps when travelling to work, sitting in a park or a cafe or visiting the supermarket. We are together with other people, but nobody talks. However, research shows that starting up a conversation with a stranger can make you feel happier and enjoy your day more.',
        'When Allison Owen-Jones saw a man sitting alone on a bench in the park, she wanted to talk to him, but she felt uncomfortable because she wasn\u2019t sure he would want to chat. Then she had an idea: Happy to chat benches. She made a sign to put on park benches which said \u201cHappy to chat bench. Sit here if you don\u2019t mind someone stopping to say hello.\u201d The idea was a success. Now Happy to chat benches can be found in several countries including Canada, the USA, Australia, Switzerland and Ukraine.',
      ],
    },
    {
      type: 'audio',
      title: 'Listening: three conversations',
      tracks: au(['1.06']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1c-listening',
        title: 'Three conversations: true or false',
        kind: 'true-false',
        instructions: 'Listen to the conversations and decide if the statements are true (T) or false (F).',
        page: 14,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'The man has never been to the music festival before.', correct: false },
          { id: 'q2', kind: 'true-false', statement: 'The woman is going to see a family member at the festival.', correct: true },
          { id: 'q3', kind: 'true-false', statement: 'Kate prefers the coffee from the coffee machine.', correct: false },
          { id: 'q4', kind: 'true-false', statement: 'Kate started work two weeks ago.', correct: true },
          { id: 'q5', kind: 'true-false', statement: 'The man is on holiday.', correct: false },
          { id: 'q6', kind: 'true-false', statement: 'The woman likes the city.', correct: true },
        ],
      },
    },
    {
      type: 'examples',
      title: 'How to \u2026 start, keep going and end a conversation',
      items: [
        'starting a conversation: Is anyone sitting here? \u2022 Do you know if there\u2019s a cafe near here? \u2022 Lovely day, isn\u2019t it? \u2022 Nice to meet you.',
        'responding / keeping a conversation going: What about you? \u2022 Do you mind if I charge my phone here? \u2022 Help yourself.',
        'ending a conversation: I\u2019ve got to go. \u2022 Nice talking to you. \u2022 Keep in touch.',
        'apologising/responding: Not at all. \u2022 Go ahead. \u2022 No problem.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1c-phrases',
        title: 'What are these phrases for?',
        kind: 'mcq',
        instructions: 'Choose the correct use for each group of phrases.',
        page: 15,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: "Nice talking to you. \u2022 I\u2019ve got to go.",
            options: [
              { label: 'ending a conversation', correct: true },
              { label: 'responding / keeping a conversation going', correct: false },
              { label: 'starting a conversation', correct: false },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'Do you mind if I charge my phone here? \u2022 Help yourself. \u2022 What about you?',
            options: [
              { label: 'responding / keeping a conversation going', correct: true },
              { label: 'starting a conversation', correct: false },
              { label: 'ending a conversation', correct: false },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'Is anyone sitting here? \u2022 Nice to meet you.',
            options: [
              { label: 'starting a conversation', correct: true },
              { label: 'ending a conversation', correct: false },
              { label: 'responding / keeping a conversation going', correct: false },
            ],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1c-conversation',
        title: 'Complete the conversations',
        kind: 'fill-blank',
        instructions: 'Complete the extracts from the conversations with the missing words.',
        page: 15,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'Excuse me, is anyone',
            answer: 'sitting',
            after: 'here?',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'No,',
            answer: 'go ahead',
            after: '.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'Excuse me, do you mind if I charge my phone',
            answer: 'here',
            after: '?',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: "Oh, that's my train. Nice",
            answer: 'talking to you',
            after: '.',
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Pronunciation: rhythm and intonation',
      tracks: au(['1.08', '1.09']),
    },
    {
      type: 'text',
      title: 'Speaking: Happy to chat benches',
      paragraphs: [
        'Work in pairs. Student A is sitting on a \u201cHappy to chat\u201d bench near the station; think about where you are and why. Student B sees someone sitting on a \u201cHappy to chat\u201d bench and decides to talk to them. Start a conversation and keep it going, then end it politely.',
        'Reflect: was it easy or difficult to start the conversation and keep it going? Why? Then work in a different pair and choose a different place for your \u201cHappy to chat\u201d bench.',
      ],
    },
    {
      type: 'pages',
      images: [img(28, "Let's talk!", 'Happy to chat benches and conversation topics'), img(29, 'Speaking and pronunciation', 'How to start, keep going and end a conversation')],
    },
  ],
}

// ===========================================================================
// 1D BBC Street Interviews: Lifestyle
// ===========================================================================

const lesson1D: Lesson = {
  id: '1d',
  code: '1D',
  title: 'Lifestyle',
  subtitle: 'BBC Street Interviews \u2022 Modifiers',
  pages: [16, 17],
  labels: {
    grammar: 'modifiers',
    skills: 'an interview about lifestyle',
    writing: 'a blog post about a day in your life',
  },
  objectives: [
    'understand people talking about their lifestyles',
    'talk about your lifestyle using modifiers',
    'write a blog post about a day in your life',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 1D',
      tone: 'info',
      text: 'Lifestyle \u2013 in the BBC Street Interviews people are asked: How would you describe your lifestyle? and Is there anything you would like to change about your lifestyle? Watch the video and note down the adjectives the speakers use.',
    },
    {
      type: 'video',
      title: 'BBC Street Interviews: lifestyle',
      videos: [
        { title: 'BBC Street Interviews: lifestyle', file: 'SO3 B1 U1 BBC StreetInt.mp4', page: 16 },
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1d-video',
        title: 'Who does the following things?',
        kind: 'mcq',
        instructions: 'Watch the first part of the interviews again. Who does the following things?',
        page: 16,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'Lives with their parents, does quite a lot of studying for university.',
            options: [
              { label: 'Elliot', correct: true },
              { label: 'Vambai' },
              { label: 'Tom' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'Works in an office, in finance.',
            options: [
              { label: 'Adam', correct: true },
              { label: 'Jack' },
              { label: 'Philip' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'Cooks for herself.',
            options: [
              { label: 'Vambai', correct: true },
              { label: 'Kayla' },
              { label: 'Alice' },
            ],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1d-video-2',
        title: 'Watch again: true or false',
        kind: 'true-false',
        instructions: 'Watch the second part of the interviews again. Are the statements true (T) or false (F)?',
        page: 16,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'Elliot would like to go for a run every day.', correct: false },
          { id: 'q2', kind: 'true-false', statement: 'Vambai would like to visit different places.', correct: true },
          { id: 'q3', kind: 'true-false', statement: 'Tom would like to spend more money.', correct: false },
          { id: 'q4', kind: 'true-false', statement: 'Kayla would like to travel more.', correct: true },
          { id: 'q5', kind: 'true-false', statement: 'Jack would like to work more.', correct: false },
          { id: 'q6', kind: 'true-false', statement: 'Philip would like to have a more exciting job and live somewhere warmer.', correct: true },
          { id: 'q7', kind: 'true-false', statement: 'Adam would like to have more time to himself.', correct: true },
        ],
      },
    },
    {
      type: 'grammar',
      title: 'modifiers',
      explanation:
        'We use modifiers before adjectives and adverbs to make the meaning stronger or weaker. We can also use a bit before a comparative to talk about a small change, and a lot for a big change.',
      rule:
        "weaker: quite / relatively / fairly + adjective \u2192 I would describe my lifestyle as quite normal. I guess my life is fairly comfortable. patterns: quite a \u2026 lifestyle / a bit more / a lot of.",
      table: {
        headers: ['Form', 'Example'],
        rows: [
          { label: 'quite + adjective', values: ['I would describe my lifestyle as quite normal.', "I have quite a normal lifestyle."] },
          { label: 'pretty / relatively / fairly', values: ['My lifestyle is pretty normal.', 'My lifestyle is relatively normal and conservative.', 'I guess my life is fairly comfortable.'] },
          { label: 'quite a lot of + noun', values: ["I'm doing quite a lot of studying for university."] },
          { label: 'a bit more / a lot more', values: ['I want to travel a bit more.', 'I spend quite a lot of time with my friends.'] },
        ],
      },
      examples: [
        'I would describe my lifestyle as quite normal.',
        'My lifestyle is pretty normal.',
        'I\u2019m doing quite a lot of studying for university.',
        'I want to travel a bit more.',
      ],
      bankPage: 107,
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1d-modifiers',
        title: 'Choose the correct modifier',
        kind: 'mcq',
        instructions: 'Choose the correct word to complete the sentences from the video.',
        page: 16,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'I would describe my lifestyle as \u2026 normal.',
            options: [
              { label: 'quite', correct: true },
              { label: 'a bit' },
              { label: 'to' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: "I'm doing \u2026 a lot of studying for university.",
            options: [
              { label: 'quite', correct: true },
              { label: 'fairly' },
              { label: 'relatively' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'I want to travel \u2026 more.',
            options: [
              { label: 'a bit', correct: true },
              { label: 'quite' },
              { label: 'too' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'My lifestyle is \u2026 normal and conservative.',
            options: [
              { label: 'relatively', correct: true },
              { label: 'a bit' },
              { label: 'too' },
            ],
          },
        ],
      },
    },
    {
      type: 'text',
      title: 'Speaking: an interview about lifestyle',
      paragraphs: [
        'Interview your partner to find out more about their lifestyle. Use the topics in the box (books, food, free time, friends/family, health, hobbies/interests, music, social media, sports, TV) and write six questions about their lifestyle now and things they would like to change.',
        'Use the key phrases: I think I\u2019m quite/relatively/fairly healthy because \u2026 My lifestyle is quite normal/alternative because \u2026 I spend quite a lot of time \u2026 I\u2019d like to \u2026 a bit more. Something I\u2019d like to do is travel more / work less / be a bit more healthy.',
      ],
    },
    {
      type: 'text',
      title: 'Writing: a blog post about a day in your life',
      paragraphs: [
        'Read Kim\u2019s blog post \u201cA day in my life\u201d (a games designer in London). In what ways is her lifestyle similar and different to yours? Then write a blog post about a day in your life. Use some modifiers and write about: what time you usually get up, what you do first in the morning, how you travel to work or college, what you have for lunch, and what you enjoy doing in the evenings.',
      ],
    },
    {
      type: 'pages',
      images: [img(30, 'Lifestyle', 'BBC Street Interviews: people describe their lifestyles'), img(31, 'Writing a blog post', 'Model blog post about a day in your life')],
    },
  ],
}

// ===========================================================================
// Unit 1 Review
// ===========================================================================

const lesson1Review: Lesson = {
  id: '1r',
  code: 'Review',
  title: 'Unit 1 Review',
  subtitle: 'Adverbs of frequency \u2022 Verb patterns \u2022 Modifiers',
  pages: [18, 18],
  labels: {
    grammar: 'review',
    vocabulary: 'review',
    pronunciation: 'review',
  },
  objectives: ['revise the vocabulary and grammar of Unit 1', 'check your progress'],
  blocks: [
    {
      type: 'review',
      title: 'Unit 1 Review',
      text: 'Complete the tasks to recycle the grammar and vocabulary from Unit 1: present simple and present continuous, state verbs, adverbs of frequency, verb patterns and modifiers.',
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-review-frequency',
        title: 'Adverbs of frequency',
        kind: 'matching',
        instructions: 'Match the questions with the answers.',
        page: 18,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'matching',
            pairs: [
              { left: 'Do you usually go to bed after midnight?', right: 'Yes. Sometimes I only sleep for four or five hours.' },
              { left: 'How many texts do you send per day?', right: 'Usually about twenty, but sometimes more.' },
              { left: 'Do you regularly phone friends?', right: 'Yes. I speak to Janet every day.' },
              { left: 'How often do you cook?', right: "Hardly ever. I'm terrible in the kitchen." },
              { left: 'How frequently do you read novels?', right: 'Rarely. I prefer books about history.' },
              { left: 'Do you ever play ball sports?', right: 'Yes. Once in a while I play tennis.' },
            ],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-review-vocab',
        title: 'Complete the words',
        kind: 'fill-blank',
        instructions: 'Add the missing vowels to complete the words in the sentences.',
        page: 18,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: "It's important to g_t on w_ll with your c_ll_ag__s.",
            answer: 'get on well with your colleagues',
            after: '',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: "I'm a teacher, and in my pr_f_ss__n, you need to be very p_t__nt.",
            answer: 'profession \u2026 patient',
            after: '',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'A f_n_nc__l c_ns_lt_nt must be r_l__bl_.',
            answer: 'financial consultant \u2026 reliable',
            after: '',
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-review-verbpatterns',
        title: 'Verb patterns',
        kind: 'true-false',
        instructions: 'Decide whether each pattern is complete and correct.',
        page: 18,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'He promised to give me the money.', correct: true },
          { id: 'q2', kind: 'true-false', statement: 'Everyone agreed working together.', correct: false },
          { id: 'q3', kind: 'true-false', statement: 'I spent a whole day writing my essay.', correct: true },
          { id: 'q4', kind: 'true-false', statement: "We'd like creating an app.", correct: false },
          { id: 'q5', kind: 'true-false', statement: "They don't mind studying together.", correct: true },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-review-modifiers',
        title: 'Modifiers',
        kind: 'fill-blank',
        instructions: 'Complete the sentences with the correct modifiers.',
        page: 18,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: "I would say that I lead",
            answer: 'quite an',
            after: ' unhealthy lifestyle because I don\u2019t do a lot of exercise or eat healthily.',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: "I would like to be",
            answer: 'a bit more',
            after: ' productive.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'I have',
            answer: 'quite a',
            after: ' good social life. I enjoy spending time with friends.',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: 'I would love to have',
            answer: 'a lot more',
            after: ' time for travel.',
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Review listening: check your answers',
      tracks: au(['R1.01']),
    },
  ],
}

export const unit01: Unit = {
  id: 'unit-1',
  number: 1,
  title: 'People',
  phrase: 'people and relationships \u2022 present simple and present continuous \u2022 jobs and work \u2022 conversations \u2022 lifestyle',
  overviewPage: 7,
  pages: [7, 18],
  intro:
    'In this unit you learn to talk about the people in your life and your relationships with them, describe people and jobs, start and keep a conversation going, and talk about your lifestyle. You watch the BBC Vlogs and BBC Street Interviews, listen to people talking about their lives, and write a personal profile and a blog post.',
  objectives: [
    'understand people talking about the people and activities in their life',
    'talk about different people and activities in your life',
    'read a news article about people with unusual jobs',
    'start and end a conversation; keep a conversation going',
    'understand people talking about their lifestyles',
  ],
  video: [
    { title: 'BBC Vlogs: How would your friends describe you?', file: 'SO3 B1 U1 BBC Vlogs.mp4', page: 7 },
    { title: 'BBC Street Interviews: lifestyle', file: 'SO3 B1 U1 BBC StreetInt.mp4', page: 16 },
  ],
  lessons: [
    lesson1A,
    lesson1B,
    lesson1C,
    lesson1D,
    lesson1Review,
  ],
}