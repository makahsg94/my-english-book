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
          paragraphs: [
            'Sort words into everyday objects, colours, countries, numbers, days of the week and the alphabet. Then check your ideas in the Vocabulary Bank, pages 130\u2013132.',
          ],
        },
        {
          type: 'vocab',
          title: 'everyday objects',
          items: [
            { word: 'toothbrush', meaning: 'for cleaning your teeth' },
            { word: 'tissues', meaning: 'soft paper to wipe with' },
            { word: 'laptop', meaning: 'a portable computer' },
            { word: 'purse / wallet', meaning: 'for money and cards' },
            { word: 'stamps', meaning: 'for letters' },
            { word: 'scissors', meaning: 'for cutting' },
            { word: 'file', meaning: 'for documents' },
            { word: 'mobile', meaning: 'a phone you carry' },
            { word: 'driving licence', meaning: 'shows you can drive' },
            { word: 'glasses', meaning: 'for seeing' },
            { word: 'ticket', meaning: 'for travel or events' },
          ],
        },
        {
          type: 'vocab',
          title: 'colours, countries and nationalities',
          items: [
            { word: 'red, yellow, blue, green, white, black, brown, orange, purple, pink', meaning: 'colours' },
            { word: 'Brazilian, Scottish, Turkish, Polish, Chinese, Vietnamese, Portuguese, German, Greek, French', meaning: 'nationalities' },
            { word: 'an/-ian: Brazil, Australia, Colombia, America, Mexico, Russia, Argentina, South Africa, Italy', meaning: 'country \u2192 nationality' },
          ],
        },
        {
          type: 'vocab',
          title: 'the alphabet, days and numbers',
          items: [
            { word: 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday', meaning: 'days of the week' },
            { word: 'one \u2192 a hundred', meaning: 'numbers 1\u2013100, including eleven, fifteen, twenty, thirty, forty-four, seventy-two, ninety' },
            { word: 'A\u2013Z', meaning: 'the alphabet \u2013 spell words like Australia (A-u-s-t-r-a-l-i-a)' },
          ],
        },
        {
          type: 'grammar',
          title: 'review: subject pronouns and be; object pronouns and possessive adjectives',
          explanation:
            'Review I/you/he/she/it/we/they with am/is/are, and me/you/him/her + my/your/his/her.',
          examples: [
            'My sister is a singer. She\u2019s a singer.',
            'Greta is from Germany. Her name\u2019s Greta.',
            'They\u2019re married. They\u2019re in Egypt.',
            'That\u2019s my phone. It\u2019s expensive.',
          ],
          bankPage: 96,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'li-qw',
            title: 'Question words',
            kind: 'mcq',
            instructions: 'Choose the correct question word.',
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
          tracks: au(['L.01', 'L.02']),
        },
        {
          type: 'callout',
          title: 'Classroom language',
          tone: 'tip',
          text: 'What does \u201csingular\u201d mean? How do you spell it? Sorry, could you say that again? Which page is it on? Thirty-five. – practice with your partner.',
        },
        {
          type: 'pages',
          images: [img(8, 'Lead-in, page 6')],
        },
      ],
    },
  ],
}