import type { Unit } from '../../types/content'

/**
 * End-of-book digital review, not part of the printed Student's Book.
 * Covers the grammar and vocabulary of Units 1-8 and feeds the big
 * end-of-course quiz (quiz-final-review).
 */
export const finalReview: Unit = {
  id: 'final-review',
  number: 9,
  kind: 'review',
  title: 'final review',
  phrase: 'round it all up',
  overviewPage: 175,
  overviewPdf: 189,
  pages: [175, 190],
  intro:
    'A step back across the whole book: revise the grammar you met in Units 1-8, brush up the vocabulary, then test yourself with the big final quiz.',
  objectives: [
    'Grammar – revise the key structures from every unit',
    'Vocabulary – revisit the core topic words from every unit',
    'Quiz – try the 25-question end-of-course review',
  ],
  video: [],
  lessons: [
    {
      id: 'grammar',
      code: 'Review',
      title: 'Grammar across the book',
      pages: [175, 175],
      labels: {
        grammar: 'revise the grammar of Units 1-8',
      },
      objectives: [
        'choose the correct forms for the main tenses',
        'practise question forms, modals and conditionals',
        'check word order, agreement and verb patterns',
      ],
      blocks: [
        {
          type: 'text',
          title: 'How to use this review',
          paragraphs: [
            'Each exercise below covers the grammar focus of one unit, in book order. If you get something wrong, the explanation points you back to the unit where the point was introduced.',
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'The grammar of the book in one line',
          text: 'Units 1-2: present and narrative tenses. Unit 3: questions and future plans. Unit 4: modals and superlatives. Unit 5: relative clauses and reported speech. Unit 6: used to and comparison. Unit 7: conditionals. Unit 8: ability and the passive.',
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-gram-1',
            title: 'Unit 1: present simple and present continuous',
            kind: 'mcq',
            instructions: 'Choose the correct verb forms.',
            page: 175,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'She usually ___ the bus to work, but today she ___ driving.',
                options: [
                  { label: 'takes / is', correct: true },
                  { label: 'is taking / takes', correct: false },
                  { label: 'take / is', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Water ___ at 100 degrees.',
                options: [
                  { label: 'boils', correct: true },
                  { label: 'is boiling', correct: false },
                  { label: 'boil', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Which sentence puts the adverb of frequency in the right place?',
                options: [
                  { label: 'He is usually late for meetings.', correct: true },
                  { label: 'He usually is late for meetings.', correct: false },
                  { label: 'He is late usually for meetings.', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'I\u2019m not very good at English, but I enjoy ___ new words.',
                options: [
                  { label: 'learning', correct: true },
                  { label: 'to learn', correct: false },
                  { label: 'learn', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-gram-2',
            title: 'Unit 2: past simple, past continuous and present perfect',
            kind: 'mcq',
            instructions: 'Choose the correct verb form.',
            page: 175,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'They were having dinner when the phone ___ .',
                options: [
                  { label: 'rang', correct: true },
                  { label: 'was ringing', correct: false },
                  { label: 'has rung', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'I haven\u2019t ___ this film before \u2013 is it good?',
                options: [
                  { label: 'seen', correct: true },
                  { label: 'saw', correct: false },
                  { label: 'see', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'She ___ her keys yesterday and never found them.',
                options: [
                  { label: 'lost', correct: true },
                  { label: 'has lost', correct: false },
                  { label: 'loses', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'Choose the correct preposition: the shop opens ___ Monday morning.',
                options: [
                  { label: 'on', correct: true },
                  { label: 'at', correct: false },
                  { label: 'in', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-gram-3',
            title: 'Unit 3: question forms and future plans',
            kind: 'mcq',
            instructions: 'Choose the correct form to complete each sentence.',
            page: 176,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: '___ you ever been to Malta?',
                options: [
                  { label: 'Have', correct: true },
                  { label: 'Did', correct: false },
                  { label: 'Do', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'I can\u2019t come \u2013 I ___ tennis with Sara at five.',
                options: [
                  { label: 'am playing', correct: true },
                  { label: 'play', correct: false },
                  { label: 'played', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Could you tell me where the station ___?',
                options: [
                  { label: 'is', correct: true },
                  { label: 'is it', correct: false },
                  { label: 'it is', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'Look at those clouds \u2013 it ___ rain soon.',
                options: [
                  { label: 'is going to', correct: true },
                  { label: 'is raining', correct: false },
                  { label: 'rains', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-gram-4',
            title: 'Unit 4: modals, articles and present perfect superlatives',
            kind: 'mcq',
            instructions: 'Choose the correct word or phrase.',
            page: 176,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'In a library you ___ be quiet \u2013 it\u2019s the rule.',
                options: [
                  { label: 'must', correct: true },
                  { label: 'might', correct: false },
                  { label: 'mustn\u2019t', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'You look tired. You ___ go to bed earlier tonight.',
                options: [
                  { label: 'should', correct: true },
                  { label: 'mustn\u2019t', correct: false },
                  { label: 'are going to', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: '___ Nile is the longest river in Africa.',
                options: [
                  { label: 'The', correct: true },
                  { label: 'A', correct: false },
                  { label: 'An', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'That\u2019s the best film I ___ ever ___ .',
                options: [
                  { label: 'have / seen', correct: true },
                  { label: 'did / see', correct: false },
                  { label: 'am / seeing', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-gram-5',
            title: 'Unit 5: relative clauses, reported speech and predictions',
            kind: 'mcq',
            instructions: 'Choose the correct option.',
            page: 177,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'The man ___ lives next door is a doctor.',
                options: [
                  { label: 'who', correct: true },
                  { label: 'which', correct: false },
                  { label: 'whose', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'That\u2019s the café ___ we first met.',
                options: [
                  { label: 'where', correct: true },
                  { label: 'who', correct: false },
                  { label: 'when', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'She said she ___ at a conference the following week.',
                options: [
                  { label: 'would be', correct: true },
                  { label: 'will be', correct: false },
                  { label: 'is', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'Take an umbrella \u2013 I think it ___ rain later.',
                options: [
                  { label: 'might', correct: true },
                  { label: 'is', correct: false },
                  { label: 'rains', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-gram-6',
            title: 'Unit 6: used to, comparison and for / since / yet',
            kind: 'mcq',
            instructions: 'Choose the correct option.',
            page: 177,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'We ___ live in a small town, but we moved here in 2019.',
                options: [
                  { label: 'used to', correct: true },
                  { label: 'use to', correct: false },
                  { label: 'are used to', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'This sofa is ___ than the old one.',
                options: [
                  { label: 'more comfortable', correct: true },
                  { label: 'comfortabler', correct: false },
                  { label: 'most comfortable', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'She\u2019s the ___ chef in the whole town.',
                options: [
                  { label: 'best', correct: true },
                  { label: 'better', correct: false },
                  { label: 'good', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'I\u2019ve lived in Cairo ___ 2015.',
                options: [
                  { label: 'since', correct: true },
                  { label: 'for', correct: false },
                  { label: 'yet', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-gram-7',
            title: 'Unit 7: conditionals and reflexive pronouns',
            kind: 'mcq',
            instructions: 'Choose the correct option.',
            page: 178,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'If we ___ hard, we\u2019ll finish on time.',
                options: [
                  { label: 'work', correct: true },
                  { label: 'will work', correct: false },
                  { label: 'worked', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'If I ___ you, I\u2019d apologise to her.',
                options: [
                  { label: 'were', correct: true },
                  { label: 'am', correct: false },
                  { label: 'will be', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'I made this cake ___ \u2013 nobody helped me.',
                options: [
                  { label: 'myself', correct: true },
                  { label: 'me', correct: false },
                  { label: 'my', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'She lives ___ herself in a flat near the station.',
                options: [
                  { label: 'by', correct: true },
                  { label: 'with', correct: false },
                  { label: 'on', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-gram-8',
            title: 'Unit 8: can / could / be able to, passive and -ing',
            kind: 'mcq',
            instructions: 'Choose the correct option.',
            page: 178,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'My grandfather ___ play chess brilliantly when he was young.',
                options: [
                  { label: 'could', correct: true },
                  { label: 'can', correct: false },
                  { label: 'be able to', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'This bridge ___ in 1900.',
                options: [
                  { label: 'was built', correct: true },
                  { label: 'built', correct: false },
                  { label: 'is building', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'English ___ in many countries around the world.',
                options: [
                  { label: 'is spoken', correct: true },
                  { label: 'speaks', correct: false },
                  { label: 'speaking', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'I\u2019m looking forward to ___ you again.',
                options: [
                  { label: 'seeing', correct: true },
                  { label: 'see', correct: false },
                  { label: 'to see', correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'vocabulary',
      code: 'Review',
      title: 'Vocabulary across the book',
      pages: [179, 179],
      labels: {
        vocabulary: 'revisit the core vocabulary of Units 1-8',
      },
      objectives: [
        'match key words to their meanings',
        'reuse the words in context',
        'check the words you still need to learn',
      ],
      blocks: [
        {
          type: 'text',
          title: 'Words from every unit',
          paragraphs: [
            'Match each word with its meaning. The words come from the vocabulary we met in Units 1-8, so anything you are unsure about can be found again in the unit where it first appeared.',
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-vocab-1',
            title: 'Unit 1: people and personality',
            kind: 'matching',
            instructions: 'Match each word with its meaning.',
            page: 179,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'colleague', right: 'a person you work with' },
                  { left: 'reliable', right: 'someone you can depend on' },
                  { left: 'generous', right: 'happy to give things or money to others' },
                  { left: 'hard-working', right: 'working with a lot of effort' },
                  { left: 'cheerful', right: 'happy and positive' },
                  { left: 'manager', right: 'the person who leads a team or a department' },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-vocab-2',
            title: 'Unit 2: feelings with -ed and -ing',
            kind: 'matching',
            instructions: 'Match each word with its meaning.',
            page: 179,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'bored', right: 'feeling unhappy because something is not interesting' },
                  { left: 'boring', right: 'making you feel bored' },
                  { left: 'excited', right: 'feeling very happy and enthusiastic about something' },
                  { left: 'exciting', right: 'making you feel excited' },
                  { left: 'frightened', right: 'afraid of something' },
                  { left: 'frightening', right: 'making you feel afraid' },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-vocab-3',
            title: 'Unit 3: learning and decisions',
            kind: 'matching',
            instructions: 'Match each word with its meaning.',
            page: 180,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'revise', right: 'prepare for a test by studying your notes' },
                  { left: 'note down', right: 'write something so you do not forget it' },
                  { left: 'an option', right: 'a thing you can choose' },
                  { left: 'guess', right: 'answer without knowing if you are right' },
                  { left: 'score', right: 'the number of points you get in a test or game' },
                  { left: 'data', right: 'information, especially numbers or facts' },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-vocab-4',
            title: 'Unit 4: success and technology',
            kind: 'matching',
            instructions: 'Match each word with its meaning.',
            page: 180,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'give up', right: 'stop trying' },
                  { left: 'carry on', right: 'continue' },
                  { left: 'failure', right: 'a person or thing that does not succeed' },
                  { left: 'download an app', right: 'install a program on your phone' },
                  { left: 'post a photo', right: 'put a picture on social media' },
                  { left: 'go viral', right: 'spread very quickly across the internet' },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-vocab-5',
            title: 'Unit 5: news and social issues',
            kind: 'matching',
            instructions: 'Match each word with its meaning.',
            page: 181,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'headline', right: 'the title of a news story printed in large letters' },
                  { left: 'fake news', right: 'news that is invented and not true' },
                  { left: 'publish', right: 'make a story available for people to read' },
                  { left: 'donate', right: 'give money or things to help people' },
                  { left: 'charity', right: 'an organisation that helps people in need' },
                  { left: 'campaign', right: 'a programme of planned actions to achieve something' },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-vocab-6',
            title: 'Unit 6: the arts and extreme adjectives',
            kind: 'matching',
            instructions: 'Match each word with its meaning.',
            page: 181,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'composer', right: 'someone who writes music' },
                  { left: 'performer', right: 'someone who plays music or acts in public' },
                  { left: 'works', right: 'the things that artists create (music, books, etc.)' },
                  { left: 'recording', right: 'something recorded so you can watch or listen again' },
                  { left: 'fascinating', right: 'extremely interesting' },
                  { left: 'huge', right: 'extremely big' },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-vocab-7',
            title: 'Unit 7: travel and describing places',
            kind: 'matching',
            instructions: 'Match each word with its meaning.',
            page: 182,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'tourist destination', right: 'a place where tourists go' },
                  { left: 'go sightseeing', right: 'visit the famous places of a town' },
                  { left: 'queue', right: 'a line of people waiting' },
                  { left: 'out of season', right: 'at a time when there are not so many tourists' },
                  { left: 'ancient', right: 'very old' },
                  { left: 'peaceful', right: 'quiet and calm' },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'fr-vocab-8',
            title: 'Unit 8: skills and technology problems',
            kind: 'matching',
            instructions: 'Match each word with its meaning.',
            page: 182,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: 'repair', right: 'fix something broken' },
                  { left: 'replace', right: 'buy something new because the old one does not work' },
                  { left: 'upload', right: 'put something on the internet' },
                  { left: 'install', right: 'put in and connect technology' },
                  { left: 'run out of charge', right: 'have no power left in a device' },
                  { left: 'crash', right: 'stop working suddenly (of a computer)' },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
}