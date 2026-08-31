import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const unit05: Unit = {
  id: 'unit-5',
  number: 5,
  title: 'the past',
  phrase: 'talk about past events, excuses and what you did at the weekend',
  overviewPage: 47,
  pages: [47, 56],
  intro:
    'In this unit you tell stories about the past, apologise and make excuses, say the time, and talk about what you did at the weekend.',
  objectives: ['5A – talk about changes in life', '5B – tell stories about the past', '5C – apologise and make excuses', '5D – talk about last weekend'],
  video: [
    {
      title: 'BBC Street Interviews: How was your weekend?',
      file: 'SO3 A2 U5 BBC StreetInt.mp4',
      page: 54,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
    {
      title: 'BBC Vlogs: remembering the past',
      file: 'SO3 A2 U5 BBC Vlogs.mp4',
      page: 55,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
  ],
  lessons: [
    {
      id: '5a',
      code: '5A',
      title: 'Then and now',
      pages: [48, 49],
      labels: {
        grammar: 'past simple: regular verbs',
        vocabulary: 'time phrases (2)',
        pronunciation: '-ed ending of regular verbs',
      },
      objectives: ['talk about changes in life', 'use the past simple of regular verbs'],
      blocks: [
        {
          type: 'text',
          title: 'Talk about changes in life',
          paragraphs: [
            'Sometimes life is the same from day to day, year to year, and then it changes. Read about Park Mak-rye, a South Korean YouTube star, and Solonei Rocha da Silva, a Brazilian marathon runner, and the big changes in their lives.',
          ],
        },
        {
          type: 'grammar',
          title: 'past simple: regular verbs',
          explanation:
            'To make the past simple we usually add -ed (or -d) to the infinitive. The form is the same for all persons.',
          rule: 'Positive: infinitive + -ed (worked, cooked, changed). Negative: did not / didn\u2019t + infinitive. Questions: Did + subject + infinitive?',
          table: {
            headers: ['Rule', 'Example'],
            rows: [
              { label: 'add -ed', values: ['work → worked, cook → cooked'] },
              { label: 'add -d', values: ['change → changed, live → lived'] },
              { label: 'negative', values: ["He didn't enjoy that race."] },
              { label: 'question', values: ['Did he enjoy his day job?'] },
            ],
          },
          examples: [
            'Park Mak-rye worked hard all her life.',
            'She opened a restaurant and worked from 4 a.m. to 10 p.m.',
            'Her three children all finished high school.',
            'Yura posted her grandmother\u2019s holiday video on YouTube.',
          ],
          bankPage: 114,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u5-5a-fill',
            title: 'Complete the sentences',
            kind: 'fill-blank',
            instructions: 'Write the past simple form of the verb in brackets.',
            page: 49,
            verified: true,
            questions: [
              { id: 'q1', kind: 'fill-blank', before: 'Last year I', answer: 'exercised', after: 'every morning.' },
              { id: 'q2', kind: 'fill-blank', before: 'Last year I', answer: 'visited', after: 'friends in another country.' },
              { id: 'q3', kind: 'fill-blank', before: 'Last year I', answer: 'watched', after: 'TV every evening.' },
              { id: 'q4', kind: 'fill-blank', before: 'Last year I', answer: 'lived', after: 'somewhere different.' },
              { id: 'q5', kind: 'fill-blank', before: 'Last year I', answer: 'stayed', after: 'in a hotel.' },
              { id: 'q6', kind: 'fill-blank', before: 'Last year I', answer: 'studied', after: 'English every day.' },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Pronunciation: -ed ending of regular verbs',
          tracks: au(['5.01']),
        },
        {
          type: 'vocab',
          title: 'time phrases (2)',
          items: [
            { word: 'all', example: 'all day / all week / all my life' },
            { word: 'from ... to', example: 'from morning to night, from 2015 to 2020 (work)ed from 4 a.m. to 10 p.m.' },
            { word: 'for', example: 'for three years / for two months / for four days' },
            { word: 'before', example: 'before breakfast / before this lesson' },
            { word: 'when', example: 'when I was nineteen / when we were in Spain' },
            { word: 'later', example: 'five minutes later / two days later' },
          ],
        },
        {
          type: 'callout',
          title: 'Speaking',
          tone: 'tip',
          text: 'Ask a partner the difference between "When did you last ...?" and "Do you often ...?" using phrases like listen to the news on the radio, post a photo on social media, play a board game, relax on a beach.',
        },
        {
          type: 'pages',
          images: [img(50, 'Lesson 5A, page 48'), img(51, 'Lesson 5A, page 49')],
        },
      ],
    },
    {
      id: '5b',
      code: '5B',
      title: 'What went wrong?',
      pages: [50, 51],
      labels: {
        grammar: 'past simple: irregular verbs; wh- questions',
        vocabulary: 'life events',
        pronunciation: 'irregular verbs',
      },
      objectives: ['tell stories about the past', 'use the past simple of irregular verbs'],
      blocks: [
        {
          type: 'text',
          title: 'What went wrong?',
          paragraphs: [
            'Three parties, three problems! Listen to people talk about a wedding party, a 21st birthday party and a surprise leaving party – and what went wrong at each one.',
          ],
        },
        {
          type: 'grammar',
          title: 'past simple: irregular verbs; wh- questions',
          explanation:
            'Many common verbs are irregular in the past simple: go → went, have → had, leave → left, say → said, take → took, drive → drove, get → got, do → did.',
          rule: 'Negative: did not / didn\u2019t + infinitive. Yes/no: Did + subject + infinitive? Wh-: question word + did + subject + verb? e.g. Why did the chef phone?',
          table: {
            headers: ['Verb', 'Past simple'],
            rows: [
              { label: 'go', values: ['went'] },
              { label: 'have', values: ['had'] },
              { label: 'leave', values: ['left'] },
              { label: 'say', values: ['said'] },
              { label: 'take', values: ['took'] },
              { label: 'drive', values: ['drove'] },
              { label: 'get', values: ['got'] },
            ],
          },
          examples: [
            'Her husband went to the supermarket and got some frozen desserts.',
            'People said goodbye to me and took a taxi to a small restaurant.',
            'Why did the chef phone?',
            'Who did Jack invite?',
          ],
          bankPage: 115,
        },
        {
          type: 'audio',
          title: 'The three parties and irregular verbs',
          tracks: au(['5.02', '5.03', '5.04']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u5-5b-match',
            title: 'Irregular past simple',
            kind: 'matching',
            instructions: 'Match each verb with its past simple form.',
            page: 50,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'go', right: 'went' },
                  { left: 'have', right: 'had' },
                  { left: 'take', right: 'took' },
                  { left: 'say', right: 'said' },
                  { left: 'leave', right: 'left' },
                  { left: 'drive', right: 'drove' },
                  { left: 'get', right: 'got' },
                ],
              },
            ],
          },
        },
        {
          type: 'vocab',
          title: 'life events',
          items: [
            { word: 'get a job / get married', example: 'leave school, get a job, get married' },
            { word: 'learn to swim / to drive', example: 'I learnt to drive when I was nineteen.' },
            { word: 'meet your best friend / your future husband or wife', example: 'I met my best friend at school.' },
            { word: 'pass your exams / your driving test', example: 'She passed all her exams.' },
            { word: 'become a doctor / a teacher', example: 'He wanted to become a teacher.' },
            { word: 'leave school / your job', example: 'She left school at sixteen.' },
          ],
        },
        {
          type: 'text',
          title: 'Writing: a mini-bio',
          paragraphs: [
            'Write a short blog post about yourself. Start with when and where you were born and important events, and link ideas with after that, then and next. Example: "Hi, my name is Liam Morgan. ... I was born on 8 August 1993, in Des Moines, Iowa. My parents had a restaurant in the centre of town. I spent my childhood in that diner ..." See the Writing Bank, page 92.',
          ],
        },
        {
          type: 'pages',
          images: [img(52, 'Lesson 5B, page 50'), img(53, 'Lesson 5B, page 51')],
        },
      ],
    },
    {
      id: '5c',
      code: '5C',
      title: 'Sorry I\u2019m late.',
      pages: [52, 53],
      labels: {
        grammar: 'How to ... apologise and make excuses',
        vocabulary: 'excuses and saying the time',
        pronunciation: 'intonation for apologising',
      },
      objectives: ['apologise and make excuses', 'say the time'],
      blocks: [
        {
          type: 'text',
          title: 'Apologise and make excuses',
          paragraphs: [
            'Everyone is late sometimes. Learn how to apologise, accept an apology and make (good!) excuses in an online world.',
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u5-5c-match',
            title: 'Make excuses',
            kind: 'matching',
            instructions: 'Match the beginning of each excuse with its ending.',
            page: 52,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'I left', right: 'my bag in a taxi.' },
                  { left: 'I missed', right: 'my train.' },
                  { left: 'My bus', right: 'was late.' },
                  { left: 'My wifi', right: 'was down.' },
                  { left: 'I didn\u2019t hear', right: 'my alarm.' },
                  { left: 'I lost', right: 'all my work.' },
                  { left: 'My daughter', right: 'was ill.' },
                  { left: 'I had the wrong', right: 'time.' },
                ],
              },
            ],
          },
        },
        {
          type: 'grammar',
          title: 'How to ... apologise and make excuses',
          explanation:
            'Apologise with I\u2019m (really / so) sorry. Accept an apology with That\u2019s all right, It\u2019s OK or No problem.',
          examples: [
            'I\u2019m so sorry I\u2019m late.',
            'I\u2019m really sorry. My train was late.',
            'That\u2019s all right.',
            'No problem.',
          ],
          bankPage: 116,
        },
        {
          type: 'audio',
          title: 'Apologies and intonation for apologising',
          tracks: au(['5.05', '5.06']),
        },
        {
          type: 'callout',
          title: 'Culture note',
          tone: 'note',
          text: 'In some countries it is very bad to be late for a business meeting or when meeting friends, and it is important to give the reason why you are late.',
        },
        {
          type: 'vocab',
          title: 'saying the time',
          items: [
            { word: 'It\u2019s half past two.', meaning: '2:30' },
            { word: 'It\u2019s quarter past three.', meaning: '3:15' },
            { word: 'It\u2019s ten to four.', meaning: '3:50' },
            { word: 'It\u2019s five past nine.', meaning: '9:05' },
          ],
          source: 'See also Vocabulary Bank, page 141 (saying the time)',
        },
        {
          type: 'pages',
          images: [img(54, 'Lesson 5C, page 52'), img(55, 'Lesson 5C, page 53')],
        },
      ],
    },
    {
      id: '5d',
      code: '5D',
      title: 'Street Interviews: How was your weekend?',
      pages: [54, 55],
      labels: {
        grammar: 'adjectives and modifiers',
        skills: 'talk about last weekend',
      },
      objectives: ['talk about last weekend', 'use adjectives and modifiers'],
      blocks: [
        {
          type: 'text',
          title: 'Talk about last weekend',
          paragraphs: [
            'People in the street answer: "How was your weekend?" and "What did you do?" Use adjectives like nice, good, lovely, busy, boring and fun – and modifiers to say exactly how you feel.',
          ],
        },
        {
          type: 'video',
title: 'BBC Street Interviews: How was your weekend?',
            videos: [
              {
                title: 'Street interviews: weekend activities',
                file: 'SO3 A2 U5 BBC StreetInt.mp4',
                page: 54,
                note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
              },
              {
                title: 'BBC Vlogs: remembering the past',
                file: 'SO3 A2 U5 BBC Vlogs.mp4',
                page: 55,
              },
            ],
        },
        {
          type: 'grammar',
          title: 'adjectives and modifiers',
          explanation:
            'Use modifiers before adjectives to make them stronger or weaker: really, very (strong) · quite (medium) · a bit (weak). Too means "more than good".',
          rule: 'modifier + adjective: My weekend was very nice. It was quite good. It was a bit crowded. It was too much.',
          examples: [
            'My weekend was very nice.',
            'It was quite good.',
            'It was a bit crowded.',
            'The band was really amazing.',
          ],
          bankPage: 117,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u5-5d-mcq',
            title: 'Choose the correct sentence',
            kind: 'mcq',
            instructions: 'Which sentences are correct?',
            page: 54,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Saying the weekend was slightly busy:',
                options: [
                  { label: 'It was a bit busy.', correct: true },
                  { label: 'It was very a bit busy.', correct: false },
                  { label: 'It was busy a bit.', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Saying the weekend was very good:',
                options: [
                  { label: 'It was quite good.', correct: true },
                  { label: 'It was good quite.', correct: false },
                  { label: 'It was bit good.', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'The loudest concerts are:',
                options: [
                  { label: 'very loud', correct: true },
                  { label: 'a bit loud', correct: false },
                  { label: 'quite loud', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'text',
          title: 'Writing: a recent weekend',
          paragraphs: [
            'Write an email to a friend about a recent weekend. Choose one key event and use modifier + adjective pairs. Example: "The place was a bit crowded and very loud. The band was really amazing."',
          ],
        },
        {
          type: 'pages',
          images: [img(56, 'Lesson 5D, page 54'), img(57, 'Lesson 5D, page 55')],
        },
      ],
    },
    {
      id: '5r',
      code: 'Review',
      title: 'Unit 5 Review',
      pages: [56, 56],
      blocks: [
        {
          type: 'exercise',
          exercise: {
            id: 'u5-5r-mcq',
            title: 'Choose the correct word',
            kind: 'mcq',
            instructions: 'Complete the story about a surprise party.',
            page: 56,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'My mum organised a party for my dad\u2019s 70th birthday and she ___ lots of people.',
                options: [
                  { label: 'invited', correct: true },
                  { label: 'were', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Family members ___ from all over the country.',
                options: [
                  { label: 'came', correct: true },
                  { label: 'became', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'We sat together in a restaurant, we ___ dinner and we chatted.',
                options: [
                  { label: 'had', correct: true },
                  { label: 'eat', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'Then my dad ___ my mum, "Isn\u2019t there a band?"',
                options: [
                  { label: 'said', correct: true },
                  { label: 'asked', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'My mum ___ the band and spoke to their singer.',
                options: [
                  { label: 'called', correct: true },
                  { label: 'woke', correct: false },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: 'The guy said, "Oh, no, we forgot! I\u2019m really ___."',
                options: [
                  { label: 'sorry', correct: true },
                  { label: 'apologise', correct: false },
                ],
              },
              {
                id: 'q7',
                kind: 'mcq',
                prompt: 'Then everyone looked at him and ___ laughing, because from the back room the band started playing!',
                options: [
                  { label: 'started', correct: true },
                  { label: 'changed', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Review listening',
          tracks: au(['R5.01']),
        },
        {
          type: 'pages',
          images: [img(58, 'Unit 5 Review, page 56')],
        },
      ],
    },
  ],
}