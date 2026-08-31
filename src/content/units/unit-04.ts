import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const unit04: Unit = {
  id: 'unit-4',
  number: 4,
  title: 'this world',
  phrase: 'talk about the past, numbers and the world around you',
  overviewPage: 37,
  pages: [37, 46],
  intro:
    'In this unit you talk about famous people and the past, use numbers and amounts, get help in shops and say what time of year is best to visit a place.',
  objectives: ['4A – talk about the past', '4B – use numbers and amounts', '4C – get help in shops', '4D – give advice about a good time to visit'],
  video: [
    {
      title: 'BBC Programmes: Sakura time',
      file: 'SO3 A2 U4 BBC Programmes.mp4',
      page: 43,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
    {
      title: 'BBC Vlogs: everyday life and numbers',
      file: 'SO3 A2 U4 BBC Vlogs.mp4',
      page: 44,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
  ],
  lessons: [
    {
      id: '4a',
      code: '4A',
      title: 'What a decade!',
      pages: [38, 39],
      labels: {
        grammar: 'past simple of be: was, were',
        vocabulary: 'time phrases (1) and dates',
        pronunciation: 'weak and strong sounds: was, were',
      },
      objectives: ['talk about the past', 'use the past simple of be', 'talk about time and dates'],
      blocks: [
        {
          type: 'text',
          title: 'Talk about the past',
          paragraphs: [
            "Do a quiz about the 2010s (twenty-tens): the first Instagram photo, TIME magazine's Person of the Year, the most expensive football transfer and the bestselling album of the decade.",
          ],
        },
        {
          type: 'grammar',
          title: 'past simple of be: was, were',
          explanation:
            'We use was and were to talk about the past. Was is for I / he / she / it; were is for you / we / they.',
          rule: "Positive: I/he/she/it was, you/we/they were. Negative: wasn't / weren't. Question: Was ...? / Were ...? Short answers: Yes, I was. / No, I wasn't.",
          table: {
            headers: ['Form', 'Example'],
            rows: [
              { label: 'positive singular', values: ['The first Instagram photo was in 2010.'] },
              { label: 'positive plural', values: ['All three were new in the 2010s.'] },
              { label: 'question', values: ['Was the singer British?', 'Where were you in 2010?'] },
              { label: 'short answers', values: ['Yes, I was. / No, it wasn\u2019t.'] },
            ],
          },
          examples: [
            '2016 was a good year for Puerto Rico.',
            'No, it wasn\u2019t Messi. It was Neymar.',
            'It got 53 million \u2018likes\u2019 for an egg.',
          ],
          bankPage: 110,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u4-4a-mcq',
            title: 'was or were',
            kind: 'mcq',
            instructions: 'Choose the correct form of be.',
            page: 38,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'The first Instagram photo ___ in 2010.',
                options: [
                  { label: 'was', correct: true },
                  { label: 'were', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'All three ___ new in the 2010s.',
                options: [
                  { label: 'were', correct: true },
                  { label: 'was', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: '___ 2016 a good year for Puerto Rico?',
                options: [
                  { label: 'Was', correct: true },
                  { label: 'Were', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'No, it ___ Messi. It was Neymar.',
                options: [
                  { label: 'wasn\u2019t', correct: true },
                  { label: 'weren\u2019t', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'A podcast about the 2010s and pronunciation',
          tracks: au(['4.01', '4.02']),
        },
        {
          type: 'vocab',
          title: 'time phrases (1) and dates',
          items: [
            { word: 'in', example: 'in 2012, in July, in the summer, in the morning/afternoon/evening' },
            { word: 'on', example: 'on Friday, on Saturday, on 4 May, on 10 June' },
            { word: 'at', example: 'at night, at the weekend' },
            { word: 'last', example: 'last night, last Friday, last weekend, last month' },
            { word: 'ago', example: 'a month ago, a week ago, ten minutes ago' },
            { word: 'yesterday', example: 'yesterday morning, yesterday evening' },
          ],
          source: 'See also Vocabulary Bank, page 138 (dates)',
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u4-4a-date',
            title: 'Saying dates',
            kind: 'matching',
            instructions: 'Match each written date with the way we say it.',
            page: 39,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: '9 January', right: 'the ninth of January' },
                  { left: '4 May', right: 'the fourth of May' },
                  { left: '1 March', right: 'the first of March' },
                  { left: '12 December', right: 'the twelfth of December' },
                ],
              },
            ],
          },
        },
        {
          type: 'text',
          title: 'Writing: a special time',
          paragraphs: [
            'Write about a special time for you – a day, week, month or year. Say when it was, where you were, who was with you and what made it special. Example: "My special time was a holiday seven years ago, in the summer. I was 28. I was with my family in southern Turkey for a week."',
          ],
        },
        {
          type: 'pages',
          images: [img(40, 'Lesson 4A, page 38'), img(41, 'Lesson 4A, page 39')],
        },
      ],
    },
    {
      id: '4b',
      code: '4B',
      title: 'Life in numbers',
      pages: [40, 41],
      labels: {
        grammar: 'how much, how many; how + adjective',
        vocabulary: 'amounts and numbers',
        pronunciation: 'intonation to check understanding',
      },
      objectives: ['use numbers and amounts', 'ask questions with how much, how many and how + adjective'],
      blocks: [
        {
          type: 'text',
          title: 'Numbers are everywhere',
          paragraphs: [
            'Read an article full of surprising facts: we check our phones 96 times a day, a bath uses about 100 litres of water, and Americans eat 350 slices of pizza per second.',
          ],
        },
        {
          type: 'grammar',
          title: 'how much, how many; how + adjective',
          explanation:
            "Use How much + uncountable noun and How many + plural countable noun. With an adjective use How far (distance), How long (time/size), How big (size), How often (frequency).",
          rule: "How much + uncountable (How much water ...?) · How many + plural (How many slices ...?) · How far / How long / How big / How often + present simple",
          table: {
            headers: ['Question word', 'Use', 'Example'],
            rows: [
              { values: ['How much', 'uncountable nouns', 'How much water ...?'] },
              { values: ['How many', 'plural countable nouns', 'How many slices ...?'] },
              { values: ['How far', 'distance', 'How far do you walk?'] },
              { values: ['How long', 'time or size', 'How long do you wait?'] },
              { values: ['How big', 'size', 'How big is it?'] },
              { values: ['How often', 'frequency', 'How often do you check your phone?'] },
            ],
          },
          examples: [
            'How much water do we use to make a pair of jeans?',
            'How many slices do they eat a day?',
            'How long do you wait at a traffic light?',
            'How far do you walk in a year?',
            'How often do you check your phone?',
          ],
          bankPage: 111,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u4-4b-mcq',
            title: 'how much, how many or how + adjective',
            kind: 'mcq',
            instructions: 'Choose the correct question word.',
            page: 41,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: '___ water do we use to make a pair of jeans?',
                options: [
                  { label: 'How much', correct: true },
                  { label: 'How many', correct: false },
                  { label: 'How far', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: '___ slices do they eat a day?',
                options: [
                  { label: 'How many', correct: true },
                  { label: 'How much', correct: false },
                  { label: 'How long', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: '___ do you wait at a traffic light?',
                options: [
                  { label: 'How long', correct: true },
                  { label: 'How much', correct: false },
                  { label: 'How many', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: '___ do you walk in a year?',
                options: [
                  { label: 'How far', correct: true },
                  { label: 'How much', correct: false },
                  { label: 'How often', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: '___ do you brush your teeth?',
                options: [
                  { label: 'How often', correct: true },
                  { label: 'How far', correct: false },
                  { label: 'How much', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'vocab',
          title: 'amounts and numbers',
          items: [
            { word: 'nearly a hundred', meaning: 'about 98' },
            { word: 'just over a hundred', meaning: 'about 102' },
            { word: 'under a hundred', meaning: 'below 100' },
            { word: 'about a hundred', meaning: 'around 100' },
            { word: 'exactly a hundred', meaning: '100' },
            { word: 'over a hundred', meaning: 'above 100' },
          ],
          source: 'Lesson 4B, page 40',
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u4-4b-amounts',
            title: 'Match the numbers',
            kind: 'matching',
            instructions: 'Match each number with the phrase that describes it.',
            page: 40,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: '70', right: 'just under a hundred' },
                  { left: '98', right: 'nearly a hundred' },
                  { left: '98–102', right: 'about a hundred' },
                  { left: '100', right: 'exactly a hundred' },
                  { left: '102', right: 'just over a hundred' },
                  { left: '140', right: 'over a hundred' },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u4-4b-spell',
            title: 'Write the numbers in English',
            kind: 'fill-blank',
            instructions: 'Type each number in English words, e.g. 96 \u2192 ninety-six.',
            page: 40,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'fill-blank',
                before: '96',
                answer: 'ninety-six',
                after: '',
              },
              {
                id: 'q2',
                kind: 'fill-blank',
                before: '171',
                answer: 'one hundred and seventy-one',
                accept: ['one hundred seventy-one'],
                after: '',
              },
              {
                id: 'q3',
                kind: 'fill-blank',
                before: '350',
                answer: 'three hundred and fifty',
                accept: ['three hundred fifty'],
                after: '',
              },
              {
                id: 'q4',
                kind: 'fill-blank',
                before: '100',
                answer: 'a hundred',
                accept: ['one hundred'],
                after: '',
              },
              {
                id: 'q5',
                kind: 'fill-blank',
                before: '7,500',
                answer: 'seven thousand five hundred',
                accept: ['seven thousand, five hundred'],
                after: '',
              },
              {
                id: 'q6',
                kind: 'fill-blank',
                before: '148,000',
                answer: 'one hundred and forty-eight thousand',
                accept: ['one hundred forty-eight thousand'],
                after: '',
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Pronunciation: intonation to check understanding',
          tracks: au(['4.03']),
        },
        {
          type: 'callout',
          title: 'Note',
          tone: 'note',
          text: 'When you don\u2019t understand or don\u2019t hear a number, check with a short question: "Sorry, how many?" Use falling intonation.',
        },
        {
          type: 'pages',
          images: [img(42, 'Lesson 4B, page 40'), img(43, 'Lesson 4B, page 41')],
        },
      ],
    },
    {
      id: '4c',
      code: '4C',
      title: 'Where can I get ...?',
      pages: [42, 43],
      labels: {
        grammar: 'How to ... get help in shops',
        vocabulary: 'shops and shopping',
        pronunciation: 'linking',
      },
      objectives: ['get help in shops', 'talk about shopping'],
      blocks: [
        {
          type: 'text',
          title: 'Get help in shops',
          paragraphs: [
            "Louise is in Amsterdam for a conference but her suitcase is in Paris. Read her messages and work out which shops she needs to visit before her talk at 9 a.m.",
          ],
        },
        {
          type: 'grammar',
          title: 'How to ... get help in shops',
          explanation:
            'Use polite questions with Can I / Could I and Excuse me to ask for help and information in shops.',
          rule: 'Excuse me + Could you ...? · Can I / Could I ...? · How much is it? · Can I pay by phone/card? · Could I have a receipt?',
          table: {
            headers: ['You want to ...', 'Say this'],
            rows: [
              { values: ['get attention', 'Excuse me, could you help me?'] },
              { values: ['ask if they sell something', 'Do you sell phone chargers?'] },
              { values: ['try clothes on', 'Can I try it on?'] },
              { values: ['find the fitting rooms', 'Where are the changing rooms?'] },
              { values: ['ask about a different colour', 'Have you got it in a different colour?'] },
              { values: ['ask the price / pay', 'How much is it? / Can I pay by card?'] },
            ],
          },
          examples: [
            'Excuse me, could you help me?',
            'Do you sell phone chargers for this phone?',
            'Can I try it on?',
            'Where are the changing rooms?',
            'Have you got it in a different colour?',
            'How much is it? / Can I pay by card?',
          ],
          bankPage: 112,
        },
        {
          type: 'vocab',
          title: 'shops and shopping',
          items: [
            { word: 'bakery', meaning: 'bread and cakes' },
            { word: 'bookshop', meaning: 'books' },
            { word: 'chemist\u2019s / pharmacy', meaning: 'medicine and toothpaste' },
            { word: 'clothes shop', meaning: 'clothes' },
            { word: 'clothes shop (big)', meaning: 'many kinds of clothes' },
            { word: 'delicatessen', meaning: 'special foods' },
            { word: 'electrical shop', meaning: 'phones, computers' },
            { word: 'florist\u2019s', meaning: 'flowers' },
            { word: 'shoe shop', meaning: 'shoes' },
            { word: 'supermarket', meaning: 'food and everyday things' },
          ],
          source: 'See also Vocabulary Bank, page 139 (shops)',
        },
        {
          type: 'audio',
          title: 'Louise goes shopping and linking practice',
          tracks: au(['4.04', '4.05', '4.06', '4.07']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u4-4c-mcq',
            title: 'In the shop',
            kind: 'mcq',
            instructions: 'Choose the correct phrase for each situation.',
            page: 42,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Ask how much something costs:',
                options: [
                  { label: 'How much is it?', correct: true },
                  { label: 'How much are they cost?', correct: false },
                  { label: 'What price it is?', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Try on some clothes:',
                options: [
                  { label: 'Can I try it on?', correct: true },
                  { label: 'Can I try on it?', correct: false },
                  { label: 'Can it try I on?', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Pay without cash:',
                options: [
                  { label: 'Can I pay by card?', correct: true },
                  { label: 'Can I pay card?', correct: false },
                  { label: 'Pay by card can I?', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'Ask for proof of payment:',
                options: [
                  { label: 'Could I have a receipt?', correct: true },
                  { label: 'Could I have a bill?', correct: false },
                  { label: 'Could I have reservation?', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'pages',
          images: [img(44, 'Lesson 4C, page 42'), img(45, 'Lesson 4C, page 43')],
        },
        {
          type: 'video',
          title: 'BBC Programmes: Sakura time',
          videos: [
            {
              title: 'Documentary clip: the cherry blossom season',
              file: 'SO3 A2 U4 BBC Programmes.mp4',
              page: 43,
              note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
            },
          ],
        },
      ],
    },
    {
      id: '4d',
      code: '4D',
      title: 'Documentary: Sakura time',
      pages: [44, 45],
      labels: {
        grammar: 'should, shouldn\u2019t; imperatives',
        skills: 'talk about a good time to visit',
      },
      objectives: ['give advice about a good time to visit', 'use should, shouldn\u2019t and imperatives'],
      blocks: [
        {
          type: 'text',
          title: 'A good time to visit',
          paragraphs: [
            'Japan has four seasons, and many people\u2019s favourite season is spring. In spring the blossoms open on one million cherry trees. The Japanese call these blossoms \u2018sakura\u2019. At sakura time, a pink wave of colour travels from south to north and people come out to celebrate.',
          ],
        },
        {
          type: 'video',
          title: 'BBC Vlogs: everyday life and numbers',
          videos: [
            {
              title: 'BBC Vlogs: everyday life and numbers',
              file: 'SO3 A2 U4 BBC Vlogs.mp4',
              page: 44,
            },
          ],
        },
        {
          type: 'grammar',
          title: 'should, shouldn\u2019t; imperatives',
          explanation:
            'Use should + verb for something that is necessary or a good idea, and shouldn\u2019t + verb for something that is a bad idea. Use the imperative (the base form) for instructions.',
          rule: 'You should + verb (advice) · you shouldn\u2019t + verb (warning) · base verb (instruction): Go out early!',
          table: {
            headers: ['Use', 'Pattern', 'Example'],
            rows: [
              { values: ['advice', 'You should + verb', 'You should stay for a week or two.'] },
              { values: ['warning', 'You shouldn\u2019t + verb', 'You shouldn\u2019t start the day too late.'] },
              { values: ['instruction', 'base verb', 'Go out early and find a good place to sit.'] },
            ],
          },
          examples: [
            'You should stay for a week or two.',
            'You shouldn\u2019t start the day too late.',
            'You should bring some warm clothes.',
            'Go out early and find a good place to sit.',
          ],
          bankPage: 113,
        },
        {
          type: 'vocab',
          title: 'weather and seasons',
          items: [
            { word: 'seasons', meaning: 'spring, summer, autumn, winter' },
            { word: 'sunny', meaning: 'sunshine, not cloudy' },
            { word: 'cloudy', meaning: 'with clouds' },
            { word: 'windy', meaning: 'with wind' },
            { word: 'rainy / raining', meaning: 'with rain' },
            { word: 'snowy / snowing', meaning: 'with snow' },
            { word: 'hot / warm / cold / freezing', meaning: 'temperature words' },
            { word: 'wet / dry', meaning: 'with / without rain' },
          ],
          source: 'See also Vocabulary Bank, page 140 (weather and seasons)',
        },
        {
          type: 'audio',
          title: 'A good time to visit Lake Balaton',
          tracks: au(['4.08']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u4-4d-order',
            title: 'Put the words in order',
            kind: 'ordering',
            instructions: 'Make questions with How and should.',
            page: 46,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'ordering',
                title: 'question 1',
                prompt: 'How / water / drink?',
                items: ['How', 'much', 'water', 'should', 'you', 'drink?'],
                // answer: How much water should you drink?
              },
              {
                id: 'q2',
                kind: 'ordering',
                title: 'question 2',
                prompt: 'How / fruit / eat?',
                items: ['How', 'much', 'fruit', 'should', 'you', 'eat?'],
              },
              {
                id: 'q3',
                kind: 'ordering',
                title: 'question 3',
                prompt: 'How / far / walk / for / exercise?',
                items: ['How', 'far', 'should', 'you', 'walk', 'for', 'exercise?'],
              },
              {
                id: 'q4',
                kind: 'ordering',
                title: 'question 4',
                prompt: 'How / hours / sleep?',
                items: ['How', 'many', 'hours', 'should', 'you', 'sleep?'],
              },
              {
                id: 'q5',
                kind: 'ordering',
                title: 'question 5',
                prompt: 'How / long / stop using / phone / before bedtime?',
                items: ['How', 'long', 'before', 'bedtime', 'should', 'you', 'stop', 'using', 'your', 'phone?'],
              },
              {
                id: 'q6',
                kind: 'ordering',
                title: 'question 6',
                prompt: 'How / often / brush / teeth?',
                items: ['How', 'often', 'should', 'you', 'brush', 'your', 'teeth?'],
              },
            ],
          },
        },
        {
          type: 'text',
          title: 'Writing: the best time to visit',
          paragraphs: [
            'Reply to an email asking when to visit your city or region. Say the best time to come, some good things to do and what clothes to bring. Example: "In the south of Chile, many people think the best time is summer. But I think you should come in autumn, maybe in April. There aren\u2019t so many tourists at that time. You should bring warm clothes."',
          ],
        },
        {
          type: 'pages',
          images: [img(46, 'Lesson 4D, page 44'), img(47, 'Lesson 4D, page 45')],
        },
      ],
    },
    {
      id: '4r',
      code: 'Review',
      title: 'Unit 4 Review',
      pages: [46, 46],
      blocks: [
        {
          type: 'text',
          title: 'Review what you have learned',
          paragraphs: [
            'You can find extra practice in the lesson pages: questions with How and should, were/was forms and dates. Review the podcasts and the conversations in the unit listenings.',
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u4-4r-mcq',
            title: 'Choose the correct word',
            kind: 'mcq',
            instructions: 'Complete the text about memorising facts.',
            page: 46,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Most people don\u2019t remember life before the internet, because I ___ at school in Scotland in the 70s and 80s.',
                options: [
                  { label: 'was', correct: true },
                  { label: 'were', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'There ___ any Google to ask for information.',
                options: [
                  { label: 'wasn\u2019t', correct: true },
                  { label: 'was', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'When my friends and I ___ at school, it was important to memorise facts.',
                options: [
                  { label: 'were', correct: true },
                  { label: 'was', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'I think every child ___ learn the dates of important events.',
                options: [
                  { label: 'should', correct: true },
                  { label: 'shouldn\u2019t', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Review listenings',
          tracks: au(['R4.01', 'R4.02', 'R4.03']),
        },
        {
          type: 'pages',
          images: [img(48, 'Unit 4 Review, page 46')],
        },
      ],
    },
  ],
}