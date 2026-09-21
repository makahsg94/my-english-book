import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const unit03: Unit = {
  id: 'unit-3',
  number: 3,
  title: 'home',
  phrase: 'describe where you live and how to make a place feel like home',
  overviewPage: 27,
  pages: [27, 36],
  intro:
    'In this unit you describe rooms and furniture, talk about the things you have, make invitations and offers, and describe your local area.',
  objectives: ['3A – describe rooms and furniture', '3B – talk about your belongings', '3C – make invitations and offers', '3D – talk about your local area'],
  video: [
    {
      title: 'BBC Street Interviews: Your neighbourhood',
      file: 'SO3 A2 U3 BBC StreetInt.mp4',
      page: 34,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
    {
      title: 'BBC Vlogs: homes and living spaces',
      file: 'SO3 A2 U3 BBC Vlogs.mp4',
      page: 35,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
  ],
  lessons: [
    {
      id: '3a',
      code: '3A',
      title: 'Come in.',
      pages: [28, 29],
      labels: {
        grammar: 'this, that, these, those; here, there',
        vocabulary: 'rooms and furniture',
        pronunciation: '/ɪ/ and /iː/',
      },
      objectives: ['describe rooms and furniture', "use this, that, these, those with here and there"],
      blocks: [
        {
          type: 'text',
          title: 'Describe rooms and furniture',
          paragraphs: [
            'Look at photos of an apartment in Edinburgh and describe the rooms: what is on the wall, in front of the window, behind the laptop, between the windows.',
          ],
        },
        {
          type: 'vocab',
          title: 'rooms and furniture',
          items: [
            { word: 'living room / lounge', meaningAr: 'غرفة المعيشة / الصالة', example: 'TV, sofa, armchair, coffee table', exampleAr: 'تلفاز، أريكة، كرسي بذراعين، طاولة قهوة' },
            { word: 'kitchen', meaningAr: 'المطبخ', example: 'fridge, cooker, sink, worktop, cupboards', exampleAr: 'ثلاجة، موقد، حوض، سطح عمل، خزائن' },
            { word: 'bedroom', meaningAr: 'غرفة النوم', example: 'bed, bedside table, wardrobe, mirror', exampleAr: 'سرير، طاولة جانبية، خزانة ملابس، مرآة' },
            { word: 'bathroom', meaningAr: 'الحمام', example: 'bath, shower, washbasin, towels', exampleAr: 'حوض استحمام، دش، مغسلة، مناشف' },
            { word: 'hall / hallway', meaningAr: 'المدخل / الردهة', example: 'front door, coat hooks', exampleAr: 'الباب الأمامي، خطافات المعاطف' },
            { word: 'garden', meaningAr: 'الحديقة', example: 'flowers, grass, trees', exampleAr: 'زهور، عشب، أشجار' },
          ],
          source: 'See also Vocabulary Bank, page 137 (rooms and furniture)',
        },
        {
          type: 'audio',
          title: 'The owner describes her apartment',
          tracks: au(['3.01', '3.02']),
        },
        {
          type: 'grammar',
          title: 'this, that, these, those; here, there',
          explanation:
            'We use this and these for things that are near (here), and that and those for things that are further away (there). Using the right word makes your description clearer.',
          rule: 'this + singular (here) · these + plural (here) · that + singular (there) · those + plural (there)',
          table: {
            headers: ['near (here)', 'far (there)'],
            rows: [
              { label: 'singular', values: ['this', 'that'] },
              { label: 'plural', values: ['these', 'those'] },
            ],
          },
          examples: [
            'This is the living room.',
            'These two keys here are for the front door.',
            'Do you see those towels over there?',
            'That desk over there is where I work.',
          ],
          bankPage: 106,
        },
        {
          type: 'audio',
          title: 'Pronunciation: /ɪ/ and /iː/',
          tracks: au(['3.03']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u3-3a-mcq',
            title: 'this, that, these or those?',
            kind: 'mcq',
            instructions: 'Choose the correct demonstrative for each sentence.',
            page: 28,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'You enter the code here, and ___ little door opens.',
                options: [
                  { label: 'this', correct: true },
                  { label: 'that', correct: false },
                  { label: 'those', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: '___ two keys here are for the front door.',
                options: [
                  { label: 'These', correct: true },
                  { label: 'This', correct: false },
                  { label: 'Those', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'And do you see ___ towels, over there?',
                options: [
                  { label: 'those', correct: true },
                  { label: 'these', correct: false },
                  { label: 'this', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'And ___ desk over there is where I work.',
                options: [
                  { label: 'that', correct: true },
                  { label: 'this', correct: false },
                  { label: 'these', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'pages',
          images: [img(30, 'Lesson 3A, page 28'), img(31, 'Lesson 3A, page 29')],
        },
      ],
    },
    {
      id: '3b',
      code: '3B',
      title: 'Too much stuff',
      pages: [30, 31],
      labels: {
        grammar: 'have got',
        vocabulary: 'common adjectives (1)',
        pronunciation: 'sentence stress',
      },
      objectives: ['talk about your belongings', 'use have got', 'describe things with common adjectives'],
      blocks: [
        {
          type: 'text',
          title: 'Talk about your belongings',
          paragraphs: [
            'Is it easy to find things in your bag, on your desk, in your bedroom? Read about clutter – the things you have but don\u2019t really need – and learn to talk about what you\u2019ve got.',
          ],
        },
        {
          type: 'vocab',
          title: 'common adjectives (1)',
          items: [
            { word: 'soft', opposite: 'hard', meaningAr: 'ناعم / طري', example: 'a soft, comfortable chair', exampleAr: 'كرسي ناعم ومريح' },
            { word: 'large / big', opposite: 'small', meaningAr: 'كبير / ضخم', example: "It's too large, and you haven't got any space.", exampleAr: 'إنه كبير جداً، وليس لديك أي مساحة.' },
            { word: 'easy', opposite: 'difficult', meaningAr: 'سهل', example: "It's difficult, but you CAN do it!", exampleAr: 'إنه صعب، لكنك تستطيع فعلها!' },
            { word: 'loud', opposite: 'quiet', meaningAr: 'عالٍ / صاخب', example: 'play some loud music', exampleAr: 'شغّل موسيقى عالية' },
            { word: 'long', opposite: 'short', meaningAr: 'طويل', example: 'It\u2019s got a long, short story!', exampleAr: 'إنها تحتوي على قصة طويلة وقصيرة!' },
            { word: 'same', opposite: 'different', meaningAr: 'نفس / مماثل', example: 'They\u2019re the same, not different.', exampleAr: 'إنهما متماثلان، وليسا مختلفين.' },
          ],
        },
        {
          type: 'grammar',
          title: 'have got',
          explanation:
            'Have got and have mean the same thing. We often use have got in speaking and informal writing.',
          rule: "Positive: subject + have/has got. Negative: subject + haven't/hasn't got. Question: Have/Has + subject + got?",
          table: {
            headers: ['Form', 'Example'],
            rows: [
              { label: 'positive', values: ["I've got two sisters.", "He's got a new bike."] },
              { label: 'negative', values: ["You haven't got any space.", "She hasn't got a car."] },
              { label: 'question', values: ['Have you got a bicycle?', 'Has she got a garden?'] },
              { label: "note: 's", values: ["In 'he's got', the 's means has."] },
            ],
          },
          examples: [
            'Have you got two of something?',
            'It\u2019s got the price on the box!',
            'You haven\u2019t got any space for it.',
            'Choose a time of day when you\u2019ve got a lot of energy.',
          ],
          bankPage: 107,
        },
        {
          type: 'audio',
          title: 'Pronunciation: sentence stress',
          tracks: au(['3.04']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u3-3b-mcq',
            title: 'have got',
            kind: 'mcq',
            instructions: 'Choose the correct form of have got.',
            page: 31,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: '___ you ___ a bicycle?',
                options: [
                  { label: 'Have / got', correct: true },
                  { label: 'Has / got', correct: false },
                  { label: 'Are / got', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'He\u2019s got the price on the box!  \u2018\u2019s\u2019 means ___',
                options: [
                  { label: 'has', correct: true },
                  { label: 'is', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'You ___ got any space for it.',
                options: [
                  { label: 'haven\u2019t', correct: true },
                  { label: 'hasn\u2019t', correct: false },
                  { label: 'not', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'She ___ got some coins in her bag.',
                options: [
                  { label: 'has', correct: true },
                  { label: 'have', correct: false },
                  { label: 'is', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          title: 'Speaking',
          tone: 'tip',
          text: 'Choose ten objects that you both have at home and ask about them: "Have you got a guitar at home?" – "No, we haven\u2019t." Then choose five objects to keep and explain your reasons.',
        },
        {
          type: 'pages',
          images: [img(32, 'Lesson 3B, page 30'), img(33, 'Lesson 3B, page 31')],
        },
      ],
    },
    {
      id: '3c',
      code: '3C',
      title: 'What can I bring?',
      pages: [32, 33],
      labels: {
        grammar: 'How to ... make invitations and offers',
        vocabulary: 'social phrases',
        pronunciation: 'rhythm in phrases',
      },
      objectives: ['make invitations and offers', 'use social phrases for guests and hosts'],
      blocks: [
        {
          type: 'text',
          title: 'Make invitations and offers',
          paragraphs: [
            'When you invite someone to your home or are a guest yourself, you use special phrases. Think about what makes a good guest: what you bring, when you arrive and how you take your leave.',
          ],
        },
        {
          type: 'grammar',
          title: 'How to ... make invitations and offers',
          explanation:
            'Use Would you like to + infinitive to make an invitation. Accept with I\u2019d love to; decline politely with I\u2019m sorry, I can\u2019t.',
          rule: 'Make offers with Can I ...?, Shall I ...? and Let me ... + verb.',
          table: {
            headers: ['Function', 'Phrase'],
            rows: [
              { values: ['make an invitation', 'Would you like to + infinitive?'] },
              { values: ['accept', 'I\u2019d love to.'] },
              { values: ['decline politely', 'I\u2019m sorry, I can\u2019t.'] },
              { values: ['make an offer', 'Can I / Shall I / Let me + verb'] },
            ],
          },
          examples: [
            'Would you like to come for dinner on Friday?',
            'I\u2019d love to come.',
            'Sorry, I can\u2019t. I\u2019m busy.',
            'Can I take your jacket?',
            'Shall I get you something to drink?',
            'Let me get your drink.',
          ],
          bankPage: 108,
        },
        {
          type: 'vocab',
          title: 'social phrases',
          items: [
            { word: "Sorry I'm late.", meaningAr: 'آسف لتأخري.', response: 'No problem.', responseAr: 'لا مشكلة.' },
            { word: 'Great to see you!', meaningAr: 'سعيد برؤيتك!', response: 'Thank you for a lovely evening!', responseAr: 'شكراً لك على أمسية رائعة!' },
            { word: 'These are for you.', meaningAr: 'هذه لك.', response: 'Oh, thank you. How nice of you!', responseAr: 'أوه، شكراً لك. كم هذا لطف منك!' },
            { word: "Have a safe journey home.", meaningAr: 'رحلة عودة آمنة.', response: 'You too.', responseAr: 'وأنت أيضاً.' },
            { word: "I'm full. That was delicious!", meaningAr: 'لقد شبعت. كان ذلك لذيذاً!', response: 'Glad you liked it!', responseAr: 'سعيد لأنه أعجبك!' },
          ],
        },
        {
          type: 'audio',
          title: 'Conversations with Jason and rhythm practice',
          tracks: au(['3.05', '3.06', '3.07', '3.08']),
        },
        {
          type: 'callout',
          title: 'Speaking task',
          tone: 'tip',
          text: 'Write a short email to invite a new friend or colleague to your home for a meal, then roleplay: arriving, ending the meal and saying goodbye.',
        },
        {
          type: 'pages',
          images: [img(34, 'Lesson 3C, page 32'), img(35, 'Lesson 3C, page 33')],
        },
      ],
    },
    {
      id: '3d',
      code: '3D',
      title: 'Street Interviews: Your neighbourhood',
      pages: [34, 35],
      labels: {
        grammar: 'there is, there are',
        skills: 'talk about your local area',
      },
      objectives: ['talk about your local area', 'use there is / there are'],
      blocks: [
        {
          type: 'text',
          title: 'Talk about your local area',
          paragraphs: [
            'People in the street describe their homes and neighbourhoods. Talk about your own area: the shops, cafés, parks, neighbours and traffic.',
          ],
        },
        {
          type: 'video',
title: 'BBC Street Interviews: Your neighbourhood',
            videos: [
              {
                title: 'Street interviews: homes and neighbourhoods',
                file: 'SO3 A2 U3 BBC StreetInt.mp4',
                page: 34,
                note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
              },
              {
                title: 'BBC Vlogs: homes and living spaces',
                file: 'SO3 A2 U3 BBC Vlogs.mp4',
                page: 35,
              },
            ],
        },
        {
          type: 'grammar',
          title: 'there is, there are',
          explanation:
            'We use there + be to say something exists. Use There\u2019s / There is with singular and There are with plural.',
          rule: "There's + singular (There's a park close by.) · There are + plural (There are lots of shops.) · Negative: There isn't / There aren't · Questions: Is there ...? / Are there ...?",
          table: {
            headers: ['Form', 'Example'],
            rows: [
              { label: "positive singular", values: ["There's a park close by."] },
              { label: "positive plural", values: ['There are lots of shops.'] },
              { label: "negative", values: ["There isn't very much traffic.", "There aren't any restaurants."] },
              { label: 'question', values: ['Is there a cinema?', 'Are there any good cafés?'] },
            ],
          },
          examples: [
            "There's a small food store close by.",
            'There are a lot of trees.',
            "There isn't very much noise.",
          ],
          bankPage: 109,
        },
        {
          type: 'text',
          title: 'Writing: an email about your local area',
          paragraphs: [
            'Tell a friend about your neighbourhood. Include what is close by, what the area is like and what you like about it. Example sentence: "There\u2019s a small food store close by and a big supermarket about ten minutes\u2019 walk away. It\u2019s a busy area. There\u2019s a lot of traffic."',
          ],
        },
        {
          type: 'pages',
          images: [img(36, 'Lesson 3D, page 34'), img(37, 'Lesson 3D, page 35')],
        },
      ],
    },
    {
      id: '3r',
      code: 'Review',
      title: 'Unit 3 Review',
      pages: [36, 36],
      blocks: [
        {
          type: 'exercise',
          exercise: {
            id: 'u3-3r-match',
            title: 'Match the sentence halves',
            kind: 'matching',
            instructions: 'Match the beginning and the end of each sentence.',
            page: 36,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'One person in my family', right: 'has got black hair.' },
                  { left: 'There are seven people', right: 'in my family.' },
                  { left: 'These photos', right: 'are of my holiday.' },
                  { left: 'This is', right: 'a very difficult exercise.' },
                  { left: 'I like those flowers', right: 'over there.' },
                  { left: 'Have you got any homework', right: 'on your phone?' },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Review listenings',
          tracks: au(['R3.01', 'R3.02', 'VB 3.01', 'VB 3.02']),
        },
        {
          type: 'pages',
          images: [img(38, 'Unit 3 Review, page 36')],
        },
      ],
    },
  ],
}