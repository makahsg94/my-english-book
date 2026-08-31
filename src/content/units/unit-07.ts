import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const unit07: Unit = {
  id: 'unit-7',
  number: 7,
  title: 'work',
  phrase: 'talk about jobs, working life, and volunteer work',
  overviewPage: 67,
  pages: [67, 76],
  intro:
    'In this unit you talk about unusual jobs and the world of work, describe your routines and what is happening now, phone for information and do a survey about skills.',
  objectives: ['7A – talk about jobs', '7B – talk about working life', '7C – phone for information', '7D – do a survey about skills'],
  video: [
    {
      title: 'BBC Vlogs: what do you do, and what would you like to learn?',
      file: 'SO3 A2 U7 BBC Vlogs.mp4',
      page: 74,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
    {
      title: 'BBC Street Interviews: jobs and working life',
      file: 'SO3 A2 U7 BBC StreetInt.mp4',
      page: 75,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
  ],
  lessons: [
    {
      id: '7a',
      code: '7A',
      title: 'Odd jobs',
      pages: [68, 69],
      labels: {
        grammar: 'articles: a, an, the, zero',
        vocabulary: 'skills and qualities',
        pronunciation: 'weak forms: a, an, the',
      },
      objectives: ['talk about jobs', 'use articles a, an, the and zero article'],
      blocks: [
        {
          type: 'text',
          title: 'Talk about jobs',
          paragraphs: [
            'Is this the job for you? Read about a professional sleeper who tests beds for hotel companies, and a TV runner – "a waiter, a taxi driver and a secretary at the same time".',
          ],
        },
        {
          type: 'grammar',
          title: 'articles: a, an, the, zero',
          explanation:
            'Use a/an before people\u2019s jobs and before singular nouns to mean one. Use the before a specific thing that we know about. Use zero article before plural nouns in general and in some fixed phrases.',
          rule: 'a/an + singular (a job, an idea) · the + specific (the company, the job for you) · zero article + plural general (beds, reports) and fixed phrases (at work, in bed, to school)',
          table: {
            headers: ['Rule', 'Example'],
            rows: [
              { label: 'a/an before a job', values: ['Stefano is a professional sleeper.', 'He\u2019s a TV runner.'] },
              { label: 'a/an = one', values: ['Are you looking for a job?', 'I write a blog.'] },
              { label: 'the = specific', values: ['I write a blog ... and the company wants customers to know ...', 'Is this the job for you?'] },
              { label: 'zero article', values: ['Test beds and write reports. (in general)', 'Spend more time writing reports than sleeping in bed. (fixed phrase)'] },
            ],
          },
          examples: [
            'He\u2019s a toy breaker.',
            'He works for many different companies.',
            'at work, in bed, to school',
          ],
          bankPage: 122,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u7-7a-mcq',
            title: 'a, an, the or nothing?',
            kind: 'mcq',
            instructions: 'Choose the correct article for each sentence.',
            page: 68,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Stefano is ___ professional sleeper.',
                options: [
                  { label: 'a', correct: true },
                  { label: 'the', correct: false },
                  { label: '(no article)', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'I write a blog for a hotel company and ___ company wants customers to know that its beds are perfect.',
                options: [
                  { label: 'the', correct: true },
                  { label: 'a', correct: false },
                  { label: '(no article)', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Is this ___ job for you?',
                options: [
                  { label: 'the', correct: true },
                  { label: 'a', correct: false },
                  { label: '(no article)', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'He spends more time writing reports than sleeping in ___ bed.',
                options: [
                  { label: '(no article)', correct: true },
                  { label: 'the', correct: false },
                  { label: 'a', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'He often spends more time writing reports; ___ reports are about beds.',
                options: [
                  { label: 'the', correct: true },
                  { label: 'a', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Weak forms: a, an, the',
          tracks: au(['7.01', '7.02']),
        },
        {
          type: 'vocab',
          title: 'skills and qualities',
          items: [
            { word: 'be relaxed', meaning: 'stay calm' },
            { word: 'work well with people', meaning: 'good team behaviour' },
            { word: 'be good with people\u2019s names', meaning: 'remember names easily' },
            { word: 'work long hours', meaning: 'work for a long time' },
            { word: 'work alone', meaning: 'work by yourself' },
            { word: 'work with your hands', meaning: 'practical, manual work' },
            { word: 'be good at / with animals, numbers, languages', meaning: 'have ability' },
          ],
          source: 'See also Vocabulary Bank, page 144 (skills)',
        },
        {
          type: 'callout',
          title: 'Speaking task',
          tone: 'tip',
          text: 'Choose four jobs and write two interview questions for each one, using phrases such as: "Are you good with people?", "Can you work long hours?"',
        },
        {
          type: 'pages',
          images: [img(70, 'Lesson 7A, page 68'), img(71, 'Lesson 7A, page 69')],
        },
      ],
    },
    {
      id: '7b',
      code: '7B',
      title: 'An extra day',
      pages: [70, 71],
      labels: {
        grammar: 'present simple and present continuous',
        vocabulary: 'phrasal verbs',
        pronunciation: 'connected speech, the /t/ sound',
      },
      objectives: ['talk about working life', 'use the present simple and present continuous', 'use everyday phrasal verbs'],
      blocks: [
        {
          type: 'text',
          title: 'An extra day',
          paragraphs: [
            'Imagine you have an extra day free each week. What would you like to do? Listen to people talk about how they spend their extra day – volunteering, cleaning and helping others.',
          ],
        },
        {
          type: 'vocab',
          title: 'phrasal verbs',
          items: [
            { word: 'look after', example: 'look after the elephants / someone\u2019s pet' },
            { word: 'give up', example: 'give up your job' },
            { word: 'pick up', example: 'pick up rubbish' },
            { word: 'look up', example: 'look up information on the internet' },
            { word: 'turn off', example: 'turn off your phone' },
            { word: 'clean up', example: 'clean up your bedroom' },
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u7-7b-match',
            title: 'Match the phrasal verbs',
            kind: 'matching',
            instructions: 'Match each phrasal verb with the phrase that goes with it.',
            page: 70,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'look after', right: 'the elephants' },
                  { left: 'give up', right: 'your job' },
                  { left: 'pick up', right: 'rubbish' },
                  { left: 'look up', right: 'information on the internet' },
                  { left: 'turn off', right: 'your phone' },
                  { left: 'clean up', right: 'your bedroom' },
                ],
              },
            ],
          },
        },
        {
          type: 'grammar',
          title: 'present simple and present continuous',
          explanation:
            'Use the present simple for habits, routines and things that are always true. Use the present continuous for things happening now.',
          rule: 'present simple: I work for a bank. · present continuous: I\u2019m working outside today. · Compare: He works at the weekend (habit) / Today he\u2019s helping Jim (now).',
          table: {
            headers: ['Use', 'Example'],
            rows: [
              { label: 'habits and always true', values: ['I work for a bank.', 'Sometimes I come here and help at the weekend.'] },
              { label: 'happening now', values: ['I\u2019m working outside in this beautiful place.', 'Today I\u2019m helping Jim.'] },
            ],
          },
          examples: [
            'She works in a shop. (always)',
            'She\u2019s working in the garden today. (now)',
            'He doesn\u2019t live near here. (always)',
          ],
          bankPage: 123,
        },
        {
          type: 'audio',
          title: 'The extra day podcast and connected speech',
          tracks: au(['7.03', '7.04', '7.05']),
        },
        {
          type: 'callout',
          title: 'Volunteer jobs',
          tone: 'tip',
          text: 'Give us just ONE day a week! Match the statements with the volunteer jobs: plant trees (important after forest fires), train a sports team (good for people who are good at sports), teach children to read (good with young children).',
        },
        {
          type: 'pages',
          images: [img(72, 'Lesson 7B, page 70'), img(73, 'Lesson 7B, page 71')],
        },
      ],
    },
    {
      id: '7c',
      code: '7C',
      title: 'I\u2019m calling to check',
      pages: [72, 73],
      labels: {
        grammar: 'How to ... phone for information',
        vocabulary: 'phoning',
        pronunciation: 'friendly intonation',
      },
      objectives: ['phone for information', 'use phone language'],
      blocks: [
        {
          type: 'text',
          title: 'Phone for information',
          paragraphs: [
            'Call a leisure centre to ask about the spa, swimming classes and opening times. Learn the language you need on the phone – and how to sound friendly.',
          ],
        },
        {
          type: 'vocab',
          title: 'phoning',
          items: [
            { word: 'call / phone / ring', meaning: 'the same meaning' },
            { word: 'mobile / smartphone / landline', meaning: 'phones you can use' },
            { word: 'hold on a second / minute / moment', meaning: 'wait a short time' },
            { word: 'leave / send / delete a message', meaning: 'voicemail actions' },
            { word: 'call / phone / ring you back', meaning: 'return the call' },
            { word: 'press 2', meaning: 'press 2 on the keypad' },
            { word: 'voicemail', meaning: 'a system that records messages' },
          ],
        },
        {
          type: 'grammar',
          title: 'How to ... phone for information',
          explanation:
            'Start the call with Hello, this is ... / How can I help you? Use Sorry, could you hold on a minute? to ask the caller to wait. End with Thank you for calling.',
          examples: [
            'Hello, this is Mills Leisure Centre.',
            'You\u2019re speaking to Simon. How can I help?',
            'Sorry, could you hold on a minute?',
            'Sorry about that. Thank you for waiting.',
            'Can I help you with anything else?',
            'Thank you for calling.',
          ],
          bankPage: 124,
        },
        {
          type: 'audio',
          title: 'The automated message and phone conversations',
          tracks: au(['7.06', '7.07', '7.08', '7.09', '7.10']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u7-7c-mcq',
            title: 'Phoning vocabulary',
            kind: 'mcq',
            instructions: 'Choose the correct word.',
            page: 72,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'I need to ___ the leisure centre.',
                options: [
                  { label: 'ring', correct: true },
                  { label: 'ring up to', correct: false },
                  { label: 'ring on', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Could you ___ on a minute?',
                options: [
                  { label: 'hold', correct: true },
                  { label: 'wait for', correct: false },
                  { label: 'stay', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Please leave a ___ and we\u2019ll call you back.',
                options: [
                  { label: 'message', correct: true },
                  { label: 'voice', correct: false },
                  { label: 'call', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'To book the spa, press ___.',
                options: [
                  { label: '2', correct: true },
                  { label: 'a second', correct: false },
                  { label: 'the button of two', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'pages',
          images: [img(74, 'Lesson 7C, page 72'), img(75, 'Lesson 7C, page 73')],
        },
      ],
    },
    {
      id: '7d',
      code: '7D',
      title: 'Would you like to ...?',
      pages: [74, 75],
      labels: {
        grammar: 'verbs and to infinitive',
        skills: 'do a survey',
      },
      objectives: ['do a survey about skills', 'use verbs with the to infinitive'],
      blocks: [
        {
          type: 'text',
          title: 'Do a survey about skills',
          paragraphs: [
            'Ask people what skills they have and what skills they would like to learn. Use verbs like would like, want, plan, need and love with the to infinitive.',
          ],
        },
        {
          type: 'video',
title: 'BBC Vlogs: what do you do?',
            videos: [
              {
                title: 'People answer: "What do you do?" and "What skills would you like to learn?"',
                file: 'SO3 A2 U7 BBC Vlogs.mp4',
                page: 74,
                note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
              },
              {
                title: 'BBC Street Interviews: jobs and working life',
                file: 'SO3 A2 U7 BBC StreetInt.mp4',
                page: 75,
              },
            ],
        },
        {
          type: 'grammar',
          title: 'verbs and to infinitive',
          explanation:
            "After would like, would love, want, plan, need, hope and choose we use the to infinitive (to + verb).",
          table: {
            headers: ['Verb + to infinitive', 'Example'],
            rows: [
              { label: "would like to", values: ["I'd like to learn a foreign language."] },
              { label: "would love to", values: ["I'd love to learn Italian."] },
              { label: 'want to / plan to / need to', values: ['I want to learn the guitar.', 'I plan to do a course.', 'I need to use English at work.'] },
              { label: "important / good for me to", values: ["It's important for me to learn photography."] },
            ],
          },
          examples: [
            "I'd love to learn Italian about photography.",
            'I want to do a course in music production.',
            'I need to be able to drive.',
            'I plan to use English for work.',
          ],
          bankPage: 125,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u7-7d-mcq',
            title: 'Verb or to infinitive?',
            kind: 'mcq',
            instructions: 'Choose the correct form to complete each sentence.',
            page: 74,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'I\u2019d like ___ a foreign language.',
                options: [
                  { label: 'to learn', correct: true },
                  { label: 'learn', correct: false },
                  { label: 'learning', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'I want ___ the guitar.',
                options: [
                  { label: 'to learn', correct: true },
                  { label: 'learning', correct: false },
                  { label: 'learned', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'I plan ___ a course in music production.',
                options: [
                  { label: 'to do', correct: true },
                  { label: 'doing', correct: false },
                  { label: 'do', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'It\u2019s important for me ___ photography.',
                options: [
                  { label: 'to learn', correct: true },
                  { label: 'learning', correct: false },
                  { label: 'learned', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'text',
          title: 'Writing: a survey summary',
          paragraphs: [
            'Ask six people "What skills do you have and what would you like to learn?" and summarise the answers: the question, the answers and a comment about the answers. Example: "Two people can sing and they often act in the local theatre. One person would love to learn to dance the tango!"',
          ],
        },
        {
          type: 'pages',
          images: [img(76, 'Lesson 7D, page 74'), img(77, 'Lesson 7D, page 75')],
        },
      ],
    },
    {
      id: '7r',
      code: 'Review',
      title: 'Unit 7 Review',
      pages: [76, 76],
      blocks: [
        {
          type: 'exercise',
          exercise: {
            id: 'u7-7r-mcq',
            title: 'Choose the correct option',
            kind: 'mcq',
            instructions: 'Complete the story "From computers to pizzas".',
            page: 76,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Ján\u00f3s was twenty-four when he decided ___ a new job.',
                options: [
                  { label: 'to get', correct: true },
                  { label: 'to getting', correct: false },
                  { label: 'get', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'He had quite good computer skills and he could ___ some customers\u2019 problems.',
                options: [
                  { label: 'fix', correct: true },
                  { label: 'fax', correct: false },
                  { label: 'draw', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'He started ___ a new job, and found one as a pizza delivery man.',
                options: [
                  { label: 'looking for', correct: true },
                  { label: 'looking after', correct: false },
                  { label: 'looking up', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'The interview was simple: \u201cCan you ___ a van?\u201d',
                options: [
                  { label: 'drive', correct: true },
                  { label: 'draw', correct: false },
                  { label: 'type', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: '\u201cWhat did you deliver a van / are you good ___ money and people?\u201d',
                options: [
                  { label: 'good with', correct: true },
                  { label: 'good at', correct: false },
                  { label: 'good for', correct: false },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: 'He is now the manager but he says it was very difficult to ___ his pizza delivery job.',
                options: [
                  { label: 'give up', correct: true },
                  { label: 'pick up', correct: false },
                  { label: 'clean up', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Review listening',
          tracks: au(['R7.01']),
        },
        {
          type: 'pages',
          images: [img(78, 'Unit 7 Review, page 76')],
        },
      ],
    },
  ],
}