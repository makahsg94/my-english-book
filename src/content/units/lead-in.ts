import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const leadIn: Unit = {
  id: 'lead-in',
  number: 0,
  title: 'Lead-in',
  phrase: 'get started',
  overviewPage: 6,
  pages: [6, 6],
  intro:
    'Warm up and get going: put words into groups, review the grammar you already know, and check your classroom language.',
  objectives: ['Review vocabulary groups', 'Review subject pronouns and be', 'Use classroom language'],
  video: [],
  lessons: [
    {
      id: 'li',
      code: 'Lead-in',
      title: 'Hello!',
      pages: [6, 6],
      labels: {
        grammar: 'subject pronouns and be; object pronouns and possessive adjectives',
        vocabulary: 'everyday objects, colours, countries, the alphabet, days, numbers',
      },
      objectives: ['review starter vocabulary', 'review subject pronouns and be', 'use classroom language'],
      blocks: [
        {
          type: 'text',
          title: 'Put the words in groups',
          titleAr: 'رتّب الكلمات في مجموعات',
          paragraphs: [
            'Sort words into everyday objects, colours, countries, numbers, days of the week and the alphabet. Then check your ideas in the Vocabulary Bank, pages 130\u2013132.',
          ],
        },
        {
          type: 'vocab',
          title: 'everyday objects',
          titleAr: 'الأشياء اليومية',
          items: [
            { word: 'toothbrush', meaning: 'for cleaning your teeth', meaningAr: 'فرشاة أسنان' },
            { word: 'tissues', meaning: 'soft paper to wipe with', meaningAr: 'مناديل ورقية' },
            { word: 'laptop', meaning: 'a portable computer', meaningAr: 'حاسوب محمول' },
            { word: 'purse / wallet', meaning: 'for money and cards', meaningAr: 'حافظة نقود / محفظة' },
            { word: 'stamps', meaning: 'for letters', meaningAr: 'طوابع' },
            { word: 'scissors', meaning: 'for cutting', meaningAr: 'مقص' },
            { word: 'file', meaning: 'for documents', meaningAr: 'ملف' },
            { word: 'mobile', meaning: 'a phone you carry', meaningAr: 'هاتف محمول' },
            { word: 'driving licence', meaning: 'shows you can drive', meaningAr: 'رخصة قيادة' },
            { word: 'glasses', meaning: 'for seeing', meaningAr: 'نظارة' },
            { word: 'ticket', meaning: 'for travel or events', meaningAr: 'تذكرة' },
          ],
        },
        {
          type: 'vocab',
          title: 'colours, countries and nationalities',
          titleAr: 'الألوان، البلدان والجنسيات',
          items: [
            { word: 'red, yellow, blue, green, white, black, brown, orange, purple, pink', meaning: 'colours', meaningAr: 'أحمر، أصفر، أزرق، أخضر، أبيض، أسود، بني، برتقالي، بنفسجي، وردي' },
            { word: 'Brazilian, Scottish, Turkish, Polish, Chinese, Vietnamese, Portuguese, German, Greek, French', meaning: 'nationalities', meaningAr: 'البرازيلي، الاسكتلندي، التركي، البولندي، الصيني، الفيتنامي، البرتغالي، الألماني، اليوناني، الفرنسي' },
            { word: 'an/-ian: Brazil, Australia, Colombia, America, Mexico, Russia, Argentina, South Africa, Italy', meaning: 'country \u2192 nationality', meaningAr: 'لاحقة الجنسية: البرازيل، أستراليا، كولومبيا، أمريكا، المكسيك، روسيا، الأرجنتين، جنوب أفريقيا، إيطاليا' },
          ],
        },
        {
          type: 'vocab',
          title: 'the alphabet, days and numbers',
          titleAr: 'الحروف الأبجدية، الأيام والأرقام',
          items: [
            { word: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday', meaning: 'days of the week', meaningAr: 'الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت، الأحد' },
            { word: 'one \u2192 a hundred', meaning: 'numbers 1\u2013100, including eleven, fifteen, twenty, thirty, forty-four, seventy-two, ninety', meaningAr: 'من واحد إلى مئة (1 إلى 100)' },
            { word: 'A\u2013Z', meaning: 'the alphabet \u2013 spell words like Australia (A-u-s-t-r-a-l-i-a)', meaningAr: 'الحروف الإنجليزية من A إلى Z (تهجئة الكلمات)' },
          ],
        },
        {
          type: 'grammar',
          title: 'review: subject pronouns and be; object pronouns and possessive adjectives',
          titleAr: 'مراجعة: ضمائر الفاعل وفعل يكون؛ ضمائر المفعول وصفات الملكية',
          explanation:
            'Review I/you/he/she/it/we/they with am/is/are, and me/you/him/her + my/your/his/her.',
          explanationAr:
            'راجع الضمائر I/you/he/she/it/we/they مع am/is/are، و me/you/him/her مع my/your/his/her.',
          table: {
            headers: ['Subject', 'Object', 'Possessive adjective'],
            rows: [
              { label: 'I', values: ['me', 'my'] },
              { label: 'you', values: ['you', 'your'] },
              { label: 'he', values: ['him', 'his'] },
              { label: 'she', values: ['her', 'her'] },
              { label: 'it', values: ['it', 'its'] },
              { label: 'we', values: ['us', 'our'] },
              { label: 'they', values: ['them', 'their'] },
            ],
          },
          examples: [
            'My sister is a singer. She\u2019s a singer.',
            'Greta is from Germany. Her name\u2019s Greta.',
            'They\u2019re married. They\u2019re in Egypt.',
            'That\u2019s my phone. It\u2019s expensive.',
          ],
          bankPage: 96,
          videos: [
            { id: '929jxBdtUSM', title: 'How to Use To Be in English - Using Be in English Grammar Lesson' },
            { id: 'rrSl1bQcnoI', title: 'Using the Verb Be - 5 Levels of English Grammar' },
            { id: '6Dna4Tl_YlA', title: '9 Parts of Speech in English - English Grammar Lesson' },
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'li-qw',
            title: 'Question words',
            kind: 'mcq',
            instructions: 'Choose the correct question word.',
            instructionsAr: 'اختر كلمة السؤال الصحيحة.',
            page: 6,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: '___ your name?',
                options: [
                  { label: 'What\u2019s', correct: true },
                  { label: 'How\u2019s', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: '___ are you from?',
                options: [
                  { label: 'Where', correct: true },
                  { label: 'Who', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: '___ are you today?',
                options: [
                  { label: 'How', correct: true },
                  { label: 'Why', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: '___ your favourite actor?',
                options: [
                  { label: 'Who\u2019s', correct: true },
                  { label: 'What\u2019s', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: '___ your birthday?',
                options: [
                  { label: 'When\u2019s', correct: true },
                  { label: 'Where\u2019s', correct: false },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: '___ are you here?',
                options: [
                  { label: 'Why', correct: true },
                  { label: 'What', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'li-pro',
            title: 'Subject pronouns and possessive adjectives',
            kind: 'mcq',
            instructions: 'Complete each sentence with the correct word.',
            instructionsAr: 'أكمل كل جملة بالكلمة الصحيحة.',
            page: 6,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'My sister is a singer. ___ a singer.',
                options: [
                  { label: 'She\u2019s', correct: true },
                  { label: 'He\u2019s', correct: false },
                  { label: 'They\u2019re', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Greta is from Germany. ___ name\u2019s Greta.',
                options: [
                  { label: 'Her', correct: true },
                  { label: 'His', correct: false },
                  { label: 'Them', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'They\u2019re married. ___ in Egypt.',
                options: [
                  { label: 'They\u2019re', correct: true },
                  { label: 'He\u2019s', correct: false },
                  { label: 'It\u2019s', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'That\u2019s my phone. ___ expensive.',
                options: [
                  { label: 'It\u2019s', correct: true },
                  { label: 'He\u2019s', correct: false },
                  { label: 'Your', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Listen and repeat',
          titleAr: 'استمع وكرر',
          tracks: au(['L.01', 'L.02']),
        },
        {
          type: 'callout',
          title: 'Classroom language',
          titleAr: 'لغة الصف',
          tone: 'tip',
          text: 'What does \u201csingular\u201d mean? How do you spell it? Sorry, could you say that again? Which page is it on? Thirty-five. – practice with your partner.',
          textAr: 'ماذا تعني كلمة \u201csingular\u201d؟ كيف تتهجّى ذلك؟ آسف، هل يمكنك إعادة القول من فضلك؟ في أي صفحة؟ خمسة وثلاثون. – تدرب مع زميلك.',
        },
        {
          type: 'pages',
          images: [img(8, 'Lead-in, page 6')],
        },
      ],
    },
  ],
}