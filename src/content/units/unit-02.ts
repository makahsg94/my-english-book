import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const unit02: Unit = {
  id: 'unit-2',
  number: 2,
  title: 'lifestyle',
  phrase: 'talk about everyday routines, food and lifestyle choices',
  overviewPage: 17,
  pages: [17, 26],
  intro:
    'In this unit you talk about food, your daily routine and lifestyle, order a meal in a restaurant and describe a special event.',
  objectives: ['2A – talk about what you eat', '2B – talk about your lifestyle', '2C – order a meal in a restaurant', '2D – describe a special event'],
  video: [
    {
      title: 'BBC Programmes: The Indian Relay',
      file: 'SO3 A2 U2 BBC Programmes.mp4',
      page: 24,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
    {
      title: 'BBC Vlogs: everyday life and routines',
      file: 'SO3 A2 U2 BBC Vlogs.mp4',
      page: 25,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
  ],
  lessons: [
    {
      id: '2a',
      code: '2A',
      title: 'Can\u2019t live without it',
      pages: [18, 19],
      labels: {
        grammar: 'countable and uncountable nouns; a, an, some, any',
        vocabulary: 'food and drink',
        pronunciation: 'the weak /ə/ sound: a, an, some',
      },
      objectives: ['talk about what you eat', "use countable and uncountable nouns with a, an, some, any"],
      blocks: [
        {
          type: 'text',
          title: 'Talk about what you eat',
          paragraphs: [
            'Name food and drink, talk about what you like and dislike, and say what you have at home. Learn to use countable and uncountable nouns with a, an, some and any.',
          ],
        },
        {
          type: 'vocab',
          title: 'food and drink',
          items: [
            { word: 'fruit', meaning: 'countable and uncountable', example: 'an apple, grapes, a lemon, tomatoes, an avocado' },
            { word: 'vegetables', meaning: 'countable', example: 'beans, broccoli' },
            { word: 'meat or fish', meaning: 'countable or uncountable', example: 'salmon' },
            { word: 'drinks', meaning: 'countable or uncountable', example: 'orange juice, lemonade' },
            { word: 'other', meaning: 'countable and uncountable', example: 'cheese, eggs, rice, yoghurt' },
          ],
          source: 'See also Vocabulary Bank, page 136 (food and drink)',
        },
        {
          type: 'audio',
          title: 'A podcast about favourite food',
          tracks: au(['2.01', '2.02']),
        },
        {
          type: 'grammar',
          title: 'countable and uncountable nouns; a, an, some, any',
          explanation:
            'Countable nouns are things we can count; they can be singular or plural (a banana, two bananas). Uncountable nouns are things we cannot count in English and are not usually plural (water, rice, pasta).',
          rule: 'Use a or an with singular countable nouns. Use some with plural countable and with uncountable nouns (general amount). Use any in negative sentences and questions. Use a lot of for a big number or amount.',
          table: {
            headers: ['Quantity', 'Use'],
            rows: [
              { label: 'a / an', values: ['singular countable: I have a banana for breakfast.'] },
              { label: 'some', values: ['plural/uncountable, general amount: I\u2019d like some pasta.'] },
              { label: 'a lot of', values: ['big number or amount: We eat a lot of rice.'] },
              { label: 'any', values: ['negative + questions: We don\u2019t have any lemons.'] },
            ],
          },
          examples: [
            'I eat an avocado every day.',
            'We always have cheese at home.',
            'They don\u2019t have any black grapes here.',
            'Can you see any lamb?',
          ],
          bankPage: 102,
        },
        {
          type: 'audio',
          title: 'Pronunciation: the weak /ə/ sound in a, an, some',
          tracks: au(['2.03', '2.04']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u2-2a-mcq',
            title: 'a, an, some or any?',
            kind: 'mcq',
            instructions: 'Choose the correct word to complete each sentence from the lesson.',
            page: 19,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'I eat ___ avocado every day.',
                options: [
                  { label: 'an', correct: true },
                  { label: 'a', correct: false },
                  { label: 'some', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'I have ___ banana for breakfast every day.',
                options: [
                  { label: 'a', correct: true },
                  { label: 'some', correct: false },
                  { label: 'any', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'I need ___ potatoes for tonight.',
                options: [
                  { label: 'some', correct: true },
                  { label: 'a', correct: false },
                  { label: 'an', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'We always have ___ cheese at home.',
                options: [
                  { label: 'some', correct: true },
                  { label: 'an', correct: false },
                  { label: 'a', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'They don\u2019t have ___ black grapes here.',
                options: [
                  { label: 'any', correct: true },
                  { label: 'some', correct: false },
                  { label: 'an', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          title: 'Writing: an online comment',
          tone: 'tip',
          text: 'Write an online comment about your favourite comfort food. Use the linking words and, but and or. See the Writing Bank, page 89.',
        },
        {
          type: 'pages',
          images: [img(20, 'Lesson 2A, page 18'), img(21, 'Lesson 2A, page 19')],
        },
      ],
    },
    {
      id: '2b',
      code: '2B',
      title: 'Your lifestyle',
      pages: [20, 21],
      labels: {
        grammar: 'adverbs and phrases of frequency',
        vocabulary: 'everyday activities',
        pronunciation: 'linking',
      },
      objectives: ['talk about your lifestyle', 'use adverbs and phrases of frequency'],
      blocks: [
        {
          type: 'text',
          title: 'Talk about your lifestyle',
          paragraphs: [
            'Do a lifestyle quiz and then talk about your routines: how often you go online, see friends, exercise and meet new people.',
          ],
        },
        {
          type: 'vocab',
          title: 'everyday activities',
          items: [
            { word: 'check your messages / emails', example: 'go online and check my messages' },
            { word: 'get up early / late', example: 'I usually get up early and go running.' },
            { word: 'go running / shopping / for coffee / for lunch', example: 'I often meet friends for coffee.' },
            { word: 'go to a party / a meeting', example: 'Do you go to parties at the weekend?' },
            { word: 'meet someone online', example: "I join online groups and I make new friends there." },
            { word: 'spend time with your family / early / late', example: 'I spend hours on social media.' },
          ],
        },
        {
          type: 'grammar',
          title: 'adverbs and phrases of frequency',
          explanation:
            'Use adverbs of frequency to say how often you do something: always (100%), usually, often, sometimes, hardly ever (10%), never (0%). They go before most verbs and after the verb be.',
          rule: 'Frequency phrases go at the end of a sentence: every day, once a week, twice a month, three times a year.',
          table: {
            headers: ['Position', 'Example'],
            rows: [
              { label: 'before most verbs', values: ['I always have breakfast at seven.', 'She sometimes goes running.'] },
              { label: 'after the verb be', values: ['They are often late.', 'He is never ill.'] },
              { label: 'phrases at the end', values: ['I go to the cinema once a week.', 'We see them every Sunday.'] },
            ],
          },
          examples: [
            'I hardly ever exercise. Well, never.',
            'I cook lunch for friends every Sunday.',
            'I\u2019m never online at the weekend.',
            'Yes, I\u2019m always online.',
          ],
          bankPage: 103,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u2-2b-mcq',
            title: 'How often?',
            kind: 'mcq',
            instructions: 'Choose the correct adverb of frequency for each meaning (0% = never, 100% = always).',
            page: 21,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: '___ = 100%',
                options: [
                  { label: 'always', correct: true },
                  { label: 'sometimes', correct: false },
                  { label: 'never', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: '___ = 0%',
                options: [
                  { label: 'never', correct: true },
                  { label: 'often', correct: false },
                  { label: 'hardly ever', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: '___ = 10%',
                options: [
                  { label: 'hardly ever', correct: true },
                  { label: 'always', correct: false },
                  { label: 'usually', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: '___ = 80%',
                options: [
                  { label: 'usually', correct: true },
                  { label: 'sometimes', correct: false },
                  { label: 'never', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Pronunciation: linking',
          tracks: au(['2.05', '2.06']),
        },
        {
          type: 'callout',
          title: 'Speaking',
          tone: 'tip',
          text: 'Put these things on a line from "not important" to "very important" for you: animals, coffee, family, food, friends, health, online life, shopping, sleep, sport, time alone, work. Then compare with a partner: "Sleep is very important to me."',
        },
        {
          type: 'pages',
          images: [img(22, 'Lesson 2B, page 20'), img(23, 'Lesson 2B, page 21')],
        },
      ],
    },
    {
      id: '2c',
      code: '2C',
      title: 'Eating out',
      pages: [22, 23],
      labels: {
        grammar: 'How to ... order a meal in a restaurant',
        vocabulary: 'restaurant words',
        pronunciation: 'polite intonation',
      },
      objectives: ['order a meal in a restaurant', 'understand a menu'],
      blocks: [
        {
          type: 'text',
          title: 'Order a meal in a restaurant',
          paragraphs: [
            'Read an article about people\u2019s food photos, learn the words for the parts of a meal and practise polite ways to order a meal in a restaurant.',
          ],
        },
        {
          type: 'vocab',
          title: 'restaurant words',
          items: [
            { word: 'starters', meaning: 'first course' },
            { word: 'main courses', meaning: 'the biggest course of a meal' },
            { word: 'side dishes', meaning: 'extra dishes served with the main course' },
            { word: 'desserts', meaning: 'sweet dish at the end of a meal' },
            { word: 'bill', meaning: 'the paper that shows what you must pay' },
            { word: 'service charge', meaning: 'money you pay for the waiter\u2019s service' },
            { word: 'dinner for two', meaning: 'a meal for two people' },
          ],
        },
        {
          type: 'text',
          title: 'From the menu',
          paragraphs: [
            'Starters: soup of the day (V), deep fried mushrooms with a garlic dip (V), sushi platter, bruschetta with tomatoes and basil (V).',
            'Main courses: beefburger with chips, Thai green chicken curry with rice, salmon in a cream sauce, nut roast (V).',
            'Side dishes: green salad, chips, seasonal vegetables.',
            'Desserts: lemon tart, homemade ice cream (3 scoops), fresh fruit salad, chocolate brownie.',
            'Drinks: orange juice, lemonade, still/sparkling water; coffee – Americano, espresso, cappuccino; tea – green tea, mint tea, breakfast tea.',
          ],
        },
        {
          type: 'grammar',
          title: 'How to ... order a meal in a restaurant',
          explanation:
            'Use can, could and would like / I\u2019d like to make requests in a restaurant. Could is a little more polite than can.',
          rule: 'Use some for requests with plural and uncountable nouns (not any). Use the to order something on the menu. Answer requests with a phrase, not just yes/no.',
          table: {
            headers: ['When?', 'Useful phrase'],
            rows: [
              { values: ['to ask politely', 'Could I / Can we + verb ...?'] },
              { values: ['to order from the menu', 'I\u2019d like the + dish, please.'] },
              { values: ['an amount, not specified', 'some + noun (not any)'] },
              { values: ['a specific menu item', 'the + dish'] },
              { values: ['to ask for the bill', 'Could we have the bill, please?'] },
            ],
          },
          examples: [
            'Could I have the soup, please?',
            'Can we have a table near the window?',
            'I\u2019d like the salmon with a green salad, please.',
            'Would you like something to drink?',
            'Could we have the bill, please?',
          ],
          bankPage: 104,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u2-2c-mcq',
            title: 'Choose the correct word(s)',
            kind: 'mcq',
            instructions: 'Complete each sentence the way a polite customer or waiter would say it.',
            page: 104,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Can we have ___ bread, please?',
                options: [
                  { label: 'some', correct: true },
                  { label: 'any', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'I\u2019d ___ the lamb curry, please.',
                options: [
                  { label: 'like', correct: true },
                  { label: 'like to', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: '___ have some sparkling mineral water, please?',
                options: [
                  { label: 'Could I', correct: true },
                  { label: 'I could', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'Sure, ___',
                options: [
                  { label: 'no problem', correct: true },
                  { label: 'not problem', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'Can we have ___, please?',
                options: [
                  { label: 'the bill', correct: true },
                  { label: 'bill', correct: false },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: 'I\u2019m sorry, we don\u2019t have ___ chicken left.',
                options: [
                  { label: 'any', correct: true },
                  { label: 'some', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Listenings and intonation practice',
          tracks: au(['2.07', '2.08', '2.09', '2.10']),
        },
        {
          type: 'callout',
          title: 'Roleplay',
          tone: 'tip',
          text: 'Prepare a menu from your town or country (three starters, main courses, side dishes and desserts) and roleplay a conversation in a restaurant – one student is the waiter, the others are customers.',
        },
        {
          type: 'pages',
          images: [img(24, 'Lesson 2C, page 22'), img(25, 'Lesson 2C, page 23')],
        },
      ],
    },
    {
      id: '2d',
      code: '2D',
      title: 'Documentary: The Indian Relay',
      pages: [24, 25],
      labels: {
        grammar: 'like, hate, love + -ing',
        skills: 'describe a special event',
      },
      objectives: ['describe a special event', 'use like, hate, love + -ing'],
      blocks: [
        {
          type: 'text',
          title: 'A special event',
          paragraphs: [
            'Every year the people of Okanogan County in Washington State, USA have a fair to celebrate the end of summer. One of the big events is the Indian Relay Race, a tradition of American Indians. Each rider rides three different horses around the track. Watch or read about Oliver Pakootas and his family as they prepare for this important tradition.',
          ],
        },
        {
          type: 'video',
title: 'BBC Programmes: The Indian Relay',
            videos: [
              {
                title: 'Documentary clip: the Indian Relay Race',
                file: 'SO3 A2 U2 BBC Programmes.mp4',
                page: 24,
                note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
              },
              {
                title: 'BBC Vlogs: everyday life and routines',
                file: 'SO3 A2 U2 BBC Vlogs.mp4',
                page: 25,
              },
            ],
        },
        {
          type: 'grammar',
          title: 'like, hate, love + -ing',
          explanation:
            'Use verb + -ing after love, like, enjoy, don\u2019t like and hate.',
          rule: 'Spelling: most verbs add -ing (wait → waiting); verbs ending -e drop the e and add -ing (write → writing); verbs with consonant + vowel + consonant double the final consonant (run → running); verbs ending -y, -w or -x do not double (play → playing).',
          table: {
            headers: ['Verb + -ing', 'Example'],
            rows: [
              { label: 'love / like / enjoy / don\u2019t like / hate', values: ['I love working with my horses.', 'I like riding my horses.'] },
              { label: 'c + v + c: double the consonant', values: ['run → running, get up → getting up'] },
              { label: 'stop + -e', values: ['write → writing, take → taking'] },
              { label: 'no doubling', values: ['wait → waiting, play → playing, know → knowing'] },
            ],
          },
          examples: [
            'Oliver likes riding his horses in the mountains.',
            'They love working with their horses.',
            'I don\u2019t like making mistakes.',
            'We enjoy being together.',
          ],
          bankPage: 105,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u2-2d-match',
            title: 'Write the -ing form',
            kind: 'matching',
            instructions: 'Match each verb with its -ing form.',
            page: 105,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'wait', right: 'waiting' },
                  { left: 'do', right: 'doing' },
                  { left: 'write', right: 'writing' },
                  { left: 'take', right: 'taking' },
                  { left: 'run', right: 'running' },
                  { left: 'get up', right: 'getting up' },
                  { left: 'know', right: 'knowing' },
                  { left: 'play', right: 'playing' },
                ],
              },
            ],
          },
        },
        {
          type: 'text',
          title: 'Writing: describe an event',
          paragraphs: [
            'Think of a special event, e.g. a festival or a national holiday, and describe it in 80–100 words. Use phrases like: "Let me tell you about ...", "It happens in [place] in [month].", "The [event] lasts [number] days.", "My favourite thing is ...".',
            'Example: In Quebec we have a big festival every winter, the Quebec Winter Carnival. The city goes crazy! I love looking at the ice sculptures. The artists often make ice animals and buildings. I always watch the canoe race. My favourite thing is the evening parade.',
          ],
        },
        {
          type: 'audio',
          title: 'The Quebec Winter Carnival',
          tracks: au(['2.11']),
        },
        {
          type: 'pages',
          images: [img(26, 'Lesson 2D, page 24'), img(27, 'Lesson 2D, page 25')],
        },
      ],
    },
    {
      id: '2r',
      code: 'Review',
      title: 'Unit 2 Review',
      pages: [26, 26],
      blocks: [
        {
          type: 'exercise',
          exercise: {
            id: 'u2-2r-cu',
            title: 'Countable or uncountable?',
            kind: 'mcq',
            instructions: 'Is each word countable (C) or uncountable (U)?',
            page: 26,
            verified: true,
            questions: [
              { id: 'q1', kind: 'mcq', prompt: 'broccoli', options: [{ label: 'uncountable', correct: true }, { label: 'countable', correct: false }] },
              { id: 'q2', kind: 'mcq', prompt: 'onion', options: [{ label: 'countable', correct: true }, { label: 'uncountable', correct: false }] },
              { id: 'q3', kind: 'mcq', prompt: 'butter', options: [{ label: 'uncountable', correct: true }, { label: 'countable', correct: false }] },
              { id: 'q4', kind: 'mcq', prompt: 'cucumber', options: [{ label: 'countable', correct: true }, { label: 'uncountable', correct: false }] },
              { id: 'q5', kind: 'mcq', prompt: 'lemonade', options: [{ label: 'uncountable', correct: true }, { label: 'countable', correct: false }] },
              { id: 'q6', kind: 'mcq', prompt: 'prawn', options: [{ label: 'countable', correct: true }, { label: 'uncountable', correct: false }] },
              { id: 'q7', kind: 'mcq', prompt: 'oil', options: [{ label: 'uncountable', correct: true }, { label: 'countable', correct: false }] },
              { id: 'q8', kind: 'mcq', prompt: 'pear', options: [{ label: 'countable', correct: true }, { label: 'uncountable', correct: false }] },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Review listenings',
          tracks: au(['R2.01', 'R2.02', 'VB 2.01']),
        },
        {
          type: 'pages',
          images: [img(28, 'Unit 2 Review, page 26')],
        },
      ],
    },
  ],
}