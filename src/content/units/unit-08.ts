import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const unit08: Unit = {
  id: 'unit-8',
  number: 8,
  title: 'away',
  phrase: 'talk about places, travel, and holidays',
  overviewPage: 77,
  pages: [77, 86],
  intro:
    'In this unit you plan and describe trips and holidays: give trip advice, discuss a surprise holiday, make requests in a hotel and watch a BBC documentary about an Arctic expedition.',
  objectives: ['8A – give trip advice', '8B – talk about travel plans', '8C – make requests and offers in a hotel', '8D – talk about a difficult trip'],
  video: [
    {
      title: 'BBC Documentary: Arctic Academy',
      file: 'SO3 A2 U8 BBC Programmes.mp4',
      page: 84,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
    {
      title: 'BBC Vlogs: travel',
      file: 'SO3 A2 U8 BBC Vlogs.mp4',
      page: 86,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
  ],
  lessons: [
    {
      id: '8a',
      code: '8A',
      title: 'Trip advice',
      pages: [78, 79],
      labels: {
        grammar: 'superlative adjectives',
        vocabulary: 'describing places',
        pronunciation: '-t in superlatives',
      },
      objectives: ['give trip advice', 'use superlative adjectives', 'describe places'],
      blocks: [
        {
          type: 'text',
          title: 'Trip advice',
          paragraphs: [
            'Read the travel discussions about a day trip to Sintra in Portugal: how to get there cheaply, what to see, and the best things to do near Lisbon. Then write your own advice using superlatives.',
          ],
        },
        {
          type: 'vocab',
          title: 'describing places',
          items: [
            { word: 'in the middle of nature', meaning: 'surrounded by nature' },
            { word: 'coast', meaning: 'the land next to the sea' },
            { word: 'wonderful', meaning: 'very good' },
            { word: 'hills', meaning: 'areas of high land' },
            { word: 'old town', meaning: 'the historical part of a town' },
            { word: 'pretty shops and caf\u00e9s', meaning: 'attractive places to shop and eat' },
            { word: 'at the top of a hill', meaning: 'on the highest part of a hill' },
            { word: 'forest', meaning: 'a large area with many trees' },
          ],
        },
        {
          type: 'grammar',
          title: 'superlative adjectives',
          explanation:
            'Use the + superlative to compare three or more things and say something is the highest, cheapest, most beautiful, etc.',
          rule: 'short adjectives: the + -est (the cheapest, the highest, the nicest) · long adjectives: the most + adjective (the most beautiful, the most expensive) · irregular: good \u2192 the best, bad \u2192 the worst',
          table: {
            headers: ['Form', 'Example from the travel discussions'],
            rows: [
              { label: 'the + -est', values: ['The train is the cheapest way to get to Sintra.', 'It\u2019s the quickest.'] },
              { label: 'the most + adjective', values: ['The Pena Palace is the most beautiful place in Sintra.', 'A taxi is the most expensive way.'] },
              { label: 'irregular', values: ['What\u2019s the best thing to do near Lisbon?', '... the worst thing was the weather.'] },
            ],
          },
          examples: [
            'It\u2019s the highest place in the old town.',
            'That\u2019s the easiest thing to do, and maybe the nicest.',
            'It\u2019s the busiest road in the area.',
          ],
          bankPage: 126,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u8-8a-mcq',
            title: 'Complete the sentences with the superlative',
            kind: 'mcq',
            instructions: 'Choose the correct superlative form.',
            page: 79,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'The train is ___ way to get to Sintra. (cheap)',
                options: [
                  { label: 'the cheapest', correct: true },
                  { label: 'cheaper', correct: false },
                  { label: 'the most cheap', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'The Pena Palace is ___ place in Sintra. (beautiful)',
                options: [
                  { label: 'the most beautiful', correct: true },
                  { label: 'the beautifulest', correct: false },
                  { label: 'most beautiful', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'What\u2019s ___ thing to do near Lisbon? (good)',
                options: [
                  { label: 'the best', correct: true },
                  { label: 'the goodest', correct: false },
                  { label: 'the most good', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'The easiest thing to do, and maybe ___. (nice)',
                options: [
                  { label: 'the nicest', correct: true },
                  { label: 'most nice', correct: false },
                  { label: 'the more nice', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: '-t in superlatives',
          tracks: au(['8.01']),
        },
        {
          type: 'callout',
          title: 'Speaking task',
          tone: 'tip',
          text: 'Prepare five questions about a town you think is good to visit, using superlatives: "When is the best time to visit?", "What\u2019s the most interesting thing to do?", "Where\u2019s the best place to get a view?"',
        },
        {
          type: 'pages',
          images: [img(80, 'Lesson 8A, page 78'), img(81, 'Lesson 8A, page 79')],
        },
      ],
    },
    {
      id: '8b',
      code: '8B',
      title: 'Surprise travel',
      pages: [80, 81],
      labels: {
        grammar: 'be going to',
        vocabulary: 'travel activities',
        pronunciation: 'weak form of "to"',
      },
      objectives: ['talk about travel plans', 'use be going to'],
      blocks: [
        {
          type: 'text',
          title: 'A surprise holiday',
          paragraphs: [
            'Read the advert: complete a questionnaire and "Surprise Travel" chooses the perfect holiday for you. One week before you leave, they send you the travel tickets and the name of the place.',
          ],
        },
        {
          type: 'vocab',
          title: 'travel activities',
          items: [
            { word: 'do a class', meaning: 'take part in a class (cooking, dance, language)' },
            { word: 'go on an organised tour', meaning: 'join a guided tour' },
            { word: 'go shopping / sightseeing', meaning: 'visit shops / famous places' },
            { word: 'take photos', meaning: 'photograph the sights' },
            { word: 'try the local food', meaning: 'eat local specialities' },
            { word: 'use an app or a guidebook', meaning: 'navigate yourself' },
            { word: 'visit famous places', meaning: 'see the sights' },
            { word: 'going with a local guide', meaning: 'explore with a local person' },
          ],
        },
        {
          type: 'grammar',
          title: 'be going to',
          explanation:
            'Use be going to + infinitive to talk about a future plan or intention.',
          rule: 'subject + am/is/are (not) going to + infinitive',
          table: {
            headers: ['Form', 'Example'],
            rows: [
              { label: 'affirmative', values: ['We\u2019re going to visit some museums.', 'I\u2019m going to take a boat trip.'] },
              { label: 'negative', values: ['We aren\u2019t going to change our plans.'] },
              { label: 'question', values: ['What are you going to do there?'] },
            ],
          },
          examples: [
            'What are you going to do there?',
            'We\u2019re going to visit some museums.',
            'We\u2019re not going to change our plans.',
          ],
          bankPage: 127,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u8-8b-mcq',
            title: 'be going to',
            kind: 'mcq',
            instructions: 'Choose the correct form.',
            page: 81,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'What ___ you do there?',
                options: [
                  { label: 'are going to', correct: true },
                  { label: 'is going to', correct: false },
                  { label: 'am going to', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'We ___ going to visit some museums.',
                options: [
                  { label: 'are', correct: true },
                  { label: 'is', correct: false },
                  { label: 'am', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'We ___ going to change our plans.',
                options: [
                  { label: 'aren\u2019t', correct: true },
                  { label: 'isn\u2019t', correct: false },
                  { label: 'don\u2019t', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'I\u2019m going ___ a boat trip.',
                options: [
                  { label: 'to take', correct: true },
                  { label: 'take', correct: false },
                  { label: 'taking', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'The surprise holiday radio programme and weak form of "to"',
          tracks: au(['8.02', '8.03', '8.04']),
        },
        {
          type: 'pages',
          images: [img(82, 'Lesson 8B, page 80'), img(83, 'Lesson 8B, page 81')],
        },
      ],
    },
    {
      id: '8c',
      code: '8C',
      title: 'At a hotel',
      pages: [82, 83],
      labels: {
        grammar: 'How to ... make requests and offers in a hotel',
        vocabulary: 'hotel language and hotel rooms',
        pronunciation: 'the contraction \u2019ll',
      },
      objectives: ['make requests and offers in a hotel', 'use hotel language'],
      blocks: [
        {
          type: 'text',
          title: 'At a hotel',
          paragraphs: [
            'Read the funniest questions hotel guests asked receptionists last year: "How much is the free breakfast?", "The bath is too big. Can you change my room?", "Can I check out before I check in?"',
          ],
        },
        {
          type: 'vocab',
          title: 'hotel language',
          items: [
            { word: 'book a room', meaning: 'reserve a room' },
            { word: 'check in / check out', meaning: 'arrive / leave a hotel' },
            { word: 'take the lift', meaning: 'use the elevator' },
            { word: 'order room service', meaning: 'ask for food in your room' },
            { word: 'pay your bill', meaning: 'settle your account' },
            { word: 'keep something in the safe', meaning: 'store valuables securely' },
            { word: 'print your boarding pass', meaning: 'print your flight card' },
            { word: 'leave your luggage at reception', meaning: 'deposit bags at the desk' },
            { word: 'airport transfer', meaning: 'transport to/from the airport' },
          ],
          source: 'See also Vocabulary Bank, page 145 (hotel rooms): single/twin/double room, wifi, gym, pool, view',
        },
        {
          type: 'grammar',
          title: 'How to ... make requests and offers in a hotel',
          explanation:
            'Make requests with can/could and offers with will/shall. The receptionist offers to do things for the guest.',
          examples: [
            'G: Can I have another key card? \u2013 R: Of course, I\u2019ll give you another one.',
            'G: The lamp is broken. \u2013 R: I\u2019m sorry to hear that, I\u2019ll send someone up.',
            'G: Could you book an airport transfer for me? \u2013 R: Of course. \u2026 I\u2019m sorry, that\u2019s not possible. All the rooms are booked tomorrow.',
            'R: Would you like to put your passport in the safe here? \u2013 G: Thanks, that\u2019s very kind of you.',
          ],
          bankPage: 128,
        },
        {
          type: 'audio',
          title: 'Hotel conversations and the contraction \u2019ll',
          tracks: au(['8.05', '8.06', '8.07']),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u8-8c-mcq',
            title: 'Requests and offers',
            kind: 'mcq',
            instructions: 'Choose the correct response.',
            page: 83,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'G: There\u2019s no soap in the shower. \u2013 R: I\u2019m sorry to hear that, I ___ someone up.',
                options: [
                  { label: '\u2019ll send', correct: true },
                  { label: '\u2019m sending to', correct: false },
                  { label: 'send up to', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'G: Could I have another key card? \u2013 R: Of course, I ___ give you another one.',
                options: [
                  { label: '\u2019ll', correct: true },
                  { label: '\u2019m', correct: false },
                  { label: '\u2019ve', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'G: Could you book an ___ for me? Tomorrow at 6.30 in the morning.',
                options: [
                  { label: 'airport transfer', correct: true },
                  { label: 'air condition', correct: false },
                  { label: 'area transfer', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'R: Would you like to put your passport ___? \u2013 G: Thanks, that\u2019s very kind of you.',
                options: [
                  { label: 'in the safe', correct: true },
                  { label: 'in the lift', correct: false },
                  { label: 'on the bill', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'pages',
          images: [img(84, 'Lesson 8C, page 82'), img(85, 'Lesson 8C, page 83')],
        },
      ],
    },
    {
      id: '8d',
      code: '8D',
      title: 'Arctic Academy',
      pages: [84, 85],
      labels: {
        grammar: 'adverbs of manner',
        skills: 'talk about a difficult trip',
      },
      objectives: ['watch a BBC documentary', 'use adverbs of manner', 'talk and write about a trip'],
      blocks: [
        {
          type: 'text',
          title: 'Arctic Academy',
          paragraphs: [
            'Craig Mathieson is an Arctic explorer. Every year he chooses ten teenagers from a Scottish school and takes them on a ten-day expedition to the Arctic. It is a life-changing experience, but it isn\u2019t easy for any of them. In this programme, one of the students, Kim, is having problems.',
          ],
        },
        {
          type: 'video',
          title: 'BBC Documentary: Arctic Academy',
          videos: [
            {
              title: 'Ten teenagers, ten days, one Arctic expedition – and Kim is having problems.',
              file: 'SO3 A2 U8 BBC Programmes.mp4',
              page: 84,
              note: 'Before watching, number the events you expect: they wake up, arrive at the second camp, arrive at the top, ski down the mountain, have a meeting, Adam helps Kim, Kim wants to go home, Kim feels much better.',
            },
          ],
        },
        {
          type: 'grammar',
          title: 'adverbs of manner',
          explanation:
            'Adverbs of manner describe how something happens. We usually add -ly to the adjective, but some adverbs are irregular.',
          rule: 'adjective + -ly: slow \u2192 slowly, careful \u2192 carefully · irregular: fast \u2192 fast, good \u2192 well · negative adverb: bad \u2192 badly',
          table: {
            headers: ['Example from the lesson'],
            rows: [
              { label: 'from badly', values: ['For one of them, Kim, the day is starting badly.'] },
              { label: 'irregular (fast)', values: ['They can\u2019t go very fast.'] },
              { label: 'from slowly', values: ['They climb slowly.'] },
              { label: 'from safely', values: ['They arrive safely, tired but happy.'] },
            ],
          },
          examples: [
            'I rode slowly to the river.',
            'I drank it quickly in the morning.',
            'They know the area well.',
            'Do your sightseeing slowly.',
          ],
          bankPage: 129,
        },
        {
          type: 'audio',
          title: 'A walking holiday in New Zealand',
          tracks: au(['8.08']),
        },
        {
          type: 'text',
          title: 'Writing: a trip',
          paragraphs: [
            'Write about a trip in four paragraphs: the good things, then the problems and mistakes. Use adverbs of manner and linking words. Example: "A few years ago I went on a group holiday\u2026 The worst thing was the weather\u2026 In the end, I enjoyed the experience. I\u2019d love to do it again."',
          ],
        },
        {
          type: 'pages',
          images: [img(86, 'Lesson 8D, page 84'), img(87, 'Lesson 8D, page 85')],
        },
      ],
    },
    {
      id: '8r',
      code: 'Review',
      title: 'Unit 8 Review',
      pages: [86, 86],
      blocks: [
        {
          type: 'exercise',
          exercise: {
            id: 'u8-8r-mcq',
            title: 'Choose the correct option',
            kind: 'mcq',
            instructions: 'Complete the story "Home away from home".',
            page: 86,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'It\u2019s 1960 and you ___ going to take a trip.',
                options: [
                  { label: '\u2019re', correct: true },
                  { label: '\u2019ve', correct: false },
                  { label: '\u2019ll', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'You\u2019d like to go to another country and ___ some famous places.',
                options: [
                  { label: 'visit', correct: true },
                  { label: 'go on', correct: false },
                  { label: 'look', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Meet people and ___ a lot of photos.',
                options: [
                  { label: 'take', correct: true },
                  { label: 'took', correct: false },
                  { label: 'taking', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'For students like you, the ___ place to stay is a youth hostel.',
                options: [
                  { label: 'cheapest', correct: true },
                  { label: 'cheaper', correct: false },
                  { label: 'cheap', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'Your Servas host knows the area ___ , so you don\u2019t need to go on an organised tour.',
                options: [
                  { label: 'well', correct: true },
                  { label: 'differently', correct: false },
                  { label: 'good', correct: false },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: 'So you don\u2019t need to ___ an organised tour.',
                options: [
                  { label: 'go on', correct: true },
                  { label: 'go out', correct: false },
                  { label: 'go', correct: false },
                ],
              },
              {
                id: 'q7',
                kind: 'mcq',
                prompt: 'Don\u2019t hurry, just do your sightseeing ___.',
                options: [
                  { label: 'slowly', correct: true },
                  { label: 'happy', correct: false },
                  { label: 'slow', correct: false },
                ],
              },
              {
                id: 'q8',
                kind: 'mcq',
                prompt: 'You and your host cook and eat together, so you can ___ the local food.',
                options: [
                  { label: 'try', correct: true },
                  { label: 'to eat', correct: false },
                  { label: 'eating', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Review listening',
          tracks: au(['R8.01', 'R8.02']),
        },
        {
          type: 'pages',
          images: [img(88, 'Unit 8 Review, page 86')],
        },
        {
          type: 'video',
          title: 'BBC Vlogs: travel',
          videos: [
            {
              title: 'BBC Vlogs: travel',
              file: 'SO3 A2 U8 BBC Vlogs.mp4',
              page: 86,
            },
          ],
        },
      ],
    },
  ],
}