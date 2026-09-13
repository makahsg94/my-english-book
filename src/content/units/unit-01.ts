import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const unit01: Unit = {
  id: 'unit-1',
  number: 1,
  title: 'me and you',
  phrase: 'talk about work and study, describe people you know, make plans to meet',
  overviewPage: 7,
  pages: [7, 16],
  intro:
    'In this unit you learn to talk about work and study, describe people and their lives, make plans to meet and describe the people in your life.',
  objectives: [
    '1A – talk about work and study',
    '1B – describe people and their lives',
    '1C – make plans to meet',
    '1D – describe people in your life',
  ],
  video: [
    {
      title: 'BBC Street Interviews: how people describe themselves and their jobs',
      file: 'SO3 A2 U1 BBC StreetInt.mp4',
      page: 12,
      note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
    },
  ],
  lessons: [
    {
      id: '1a',
      code: '1A',
      title: 'Where are you from?',
      pages: [8, 9],
      labels: {
        grammar: 'present simple: I, you, we, they',
        vocabulary: 'jobs and studies',
        pronunciation: 'weak forms and linking: do you',
      },
      objectives: ['talk about work and study', "use the present simple with I, you, we, they", 'describe jobs and studies'],
      blocks: [
        {
          type: 'text',
          title: 'Talk about work and study',
          paragraphs: [
            'You meet people at a party or online and you want to introduce yourself and get to know people: where you live, what your job is, what you like. In this lesson you learn the language you need to ask and answer questions about work and study.',
          ],
        },
        {
          type: 'audio',
          title: 'Conversations in a café',
          tracks: au(['1.01']),
        },
        {
          type: 'grammar',
          title: 'present simple: I, you, we, they',
          explanation:
            'We use the present simple to talk about things that are always or generally true, and for habits and routines.',
          rule: 'Positive: subject + verb. Negative: subject + do not / don\u2019t + verb. Questions: Do + subject + verb? Wh-word + do + subject + verb?',
          table: {
            headers: ['Form', 'Examples'],
            rows: [
              { label: 'Positive', values: ['I come from Italy. They live in Seoul.'] },
              { label: 'Habits', values: ['We get up at 7 a.m.'] },
              { label: 'Negative', values: ['I don\u2019t work on Saturdays.', 'My children don\u2019t watch a lot of TV.'] },
              { label: 'Questions', values: ['Do you live near here?', 'Do they know each other?'] },
              { label: 'Wh- questions', values: ['Where do you live?', 'How do you know each other?'] },
              { label: 'Short answers', values: ['Yes, I do. / No, they don\u2019t.'] },
            ],
          },
          examples: ['What\u2019s your favourite café?', 'Do you have a minute?', 'How do you know each other?'],
          bankPage: 98,
        },
        {
          type: 'vocab',
          title: 'jobs and studies',
          items: [
            { word: 'driver', example: 'a train driver, a bus driver, a taxi driver' },
            { word: 'player', example: 'a football player, a basketball player, a tennis player' },
            { word: 'manager', example: 'a hotel manager, a business manager' },
            { word: 'student', example: 'a university student' },
            { word: 'worker', example: 'an office worker, a farm worker' },
          ],
          source: 'See also Vocabulary Bank, page 133 (jobs)',
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u1-1a-order',
            title: 'Put the words in the correct order',
            kind: 'ordering',
            instructions: 'Make questions with the present simple. The first one is done for you.',
            page: 98,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'ordering',
                title: 'question 1',
                prompt: 'you / Do / classes? / like / English / your',
                items: ['Do', 'you', 'like', 'your', 'English', 'classes?'],
                // answer: Do you like your English classes?
              },
              {
                id: 'q2',
                kind: 'ordering',
                title: 'question 2',
                prompt: 'in / Mr / live / Brown / and / Mrs / New York? / Do',
                items: ['Do', 'Mr', 'and', 'Mrs', 'Brown', 'live', 'in', 'New York?'],
              },
              {
                id: 'q3',
                kind: 'ordering',
                title: 'question 3',
                prompt: 'Sonia / you / and / Do / know / each / other?',
                items: ['Do', 'Sonia', 'and', 'you', 'know', 'each', 'other?'],
              },
              {
                id: 'q4',
                kind: 'ordering',
                title: 'question 4',
                prompt: 'to / go / same / your / Do / children / the / school?',
                items: ['Do', 'your', 'children', 'go', 'to', 'the', 'same', 'school?'],
              },
              {
                id: 'q5',
                kind: 'ordering',
                title: 'question 5',
                prompt: 'TV? / of / watch / your / a / lot / children / Do',
                items: ['Do', 'your', 'children', 'watch', 'a', 'lot', 'of', 'TV?'],
              },
              {
                id: 'q6',
                kind: 'ordering',
                title: 'question 6',
                prompt: 'Ben / Janey / and / Are / married?',
                items: ['Are', 'Ben', 'and', 'Janey', 'married?'],
              },
              {
                id: 'q7',
                kind: 'ordering',
                title: 'question 7',
                prompt: 'here? / come / you / near / Do / from',
                items: ['Do', 'you', 'come', 'from', 'near', 'here?'],
              },
              {
                id: 'q8',
                kind: 'ordering',
                title: 'question 8',
                prompt: 'home? / you / Do / at / English / speak',
                items: ['Do', 'you', 'speak', 'English', 'at', 'home?'],
              },
            ],
          },
        },
        {
          type: 'callout',
          title: 'Speaking task',
          tone: 'tip',
          text: 'Work in groups. One student chooses a famous person; the others ask yes/no questions to guess who it is: "Are you a man?" – "Yes, I am." – "Do you come from ...?" – "No, I don\u2019t."',
        },
        {
          type: 'audio',
          title: 'Lead-in: everyday objects, colours, nationalities, days and numbers',
          tracks: au(['L.01', 'L.02']),
        },
        {
          type: 'pages',
          images: [img(10, 'Lesson 1A, page 8'), img(11, 'Lesson 1A, page 9')],
        },
      ],
    },
    {
      id: '1b',
      code: '1B',
      title: 'Same but different',
      pages: [10, 11],
      labels: {
        grammar: 'present simple: he, she, it',
        vocabulary: 'common verb phrases',
        pronunciation: 'third person -s',
      },
      objectives: ['describe people and their lives', 'use the present simple with he, she, it'],
      blocks: [
        {
          type: 'text',
          title: 'Describe people and their lives',
          paragraphs: [
            'Twin brothers Sam and Andy look the same, but their lives are very different. Read the article and practise describing people: what they do, where they live and what they like doing.',
          ],
        },
        {
          type: 'vocab',
          title: 'common verb phrases',
          items: [
            { word: 'get up', example: 'get up early / at 11 / late' },
            { word: 'go', example: 'go out a lot / to bed late / running' },
            { word: 'have', example: 'have a car / a lot of money / two sisters' },
            { word: 'live', example: 'live in a village / with friends / alone' },
            { word: 'play', example: 'play the guitar / in a band / tennis' },
            { word: 'study', example: 'study Italian / hard / every day' },
            { word: 'teach', example: 'teach students / at a university / English' },
            { word: 'work', example: 'work in a theatre / for a company / from home' },
          ],
        },
        {
          type: 'text',
          title: 'Reading: Identical twins?',
          paragraphs: [
            'Many brothers are very different from each other, but people think twins are exactly the same. In fact, my twin brother Sam and I are very different. It\u2019s hard to believe we come from the same family!',
            'Sam lives in a small village and he\u2019s an actor. He also teaches drama students at university, because he doesn\u2019t have a lot of money. My life is very different. I\u2019m the businessman in the family. I have a small tech start-up company. I work from home, from my flat near the city centre. I think his work is crazy – and he thinks mine is!',
            'Our day-to-day life is very different. I get up early, usually for video calls with business partners in Asia. Sam gets up at about eleven. After that he studies Chinese for an hour. He loves languages! Sam is a vegetarian and he cooks at home for himself. I don\u2019t have time to cook, I go out a lot to local restaurants with friends. Sometimes Sam visits me in the city, and we go and listen to music somewhere. The problem is that Sam likes jazz – he plays the guitar in a jazz band – but I prefer indie concerts.',
            'The great thing is that Sam and I are really good friends and we often do things together. It\u2019s funny when we are out together. People see us and say, "Wow, am I seeing double?" I think this is probably normal for all twins.',
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u1-1b-tf',
            title: 'Are the statements True or False?',
            kind: 'true-false',
            instructions: 'Read the article again. Are the statements True (T) or False (F)?',
            page: 10,
            verified: true,
            questions: [
              { id: 'q1', kind: 'true-false', statement: 'Sam has a lot of money.', correct: false },
              { id: 'q2', kind: 'true-false', statement: 'Sam studies for one hour a day.', correct: true },
              { id: 'q3', kind: 'true-false', statement: 'Sam cooks Chinese food with chicken in it.', correct: false },
              { id: 'q4', kind: 'true-false', statement: 'Andy doesn\u2019t go out to eat alone.', correct: true },
              { id: 'q5', kind: 'true-false', statement: 'The brothers don\u2019t like each other.', correct: false },
            ],
          },
        },
        {
          type: 'grammar',
          title: 'present simple: he, she, it',
          explanation:
            'For he, she and it we add -s (or -es, -ies) to the verb. For the negative we use does not / doesn\u2019t + infinitive.',
          rule: 'Positive: He/She/It + verb + -s. Negative: He/She/It + doesn\u2019t + verb. Questions: Does + he/she/it + verb?',
          table: {
            headers: ['Spelling rules', 'Example'],
            rows: [
              { label: 'most verbs: add -s', values: ['play → plays, live → lives'] },
              { label: 'verbs ending -ch, -sh, -s, -x: add -es', values: ['teach → teaches, watch → watches, finish → finishes'] },
              { label: 'verb ending consonant + -y: change to -ies', values: ['study → studies'] },
              { label: 'do and go', values: ['do → does, go → goes'] },
              { label: 'have', values: ['have → has'] },
            ],
          },
          examples: [
            'Sam lives in a small village.',
            'He gets up at about eleven.',
            'He studies Chinese for an hour.',
            'He doesn\u2019t have a lot of money.',
            'Does she work? – Yes, she does.',
          ],
          bankPage: 99,
        },
        {
          type: 'audio',
          title: 'Pronunciation: third person -s',
          tracks: [
            { label: '1B (provided track)', file: '/audio/014_SO3_A2_SB_1B_Audio_1_0X.mp3', note: 'The only Unit 1 lesson track included in this copy of the audio' },
            { label: '1.05', note: 'Track not included in this copy of the audio' },
            { label: '1.06', note: 'Track not included in this copy of the audio' },
          ],
        },
        {
          type: 'pages',
          images: [img(12, 'Lesson 1B, page 10'), img(13, 'Lesson 1B, page 11')],
        },
      ],
    },
    {
      id: '1c',
      code: '1C',
      title: 'Let\u2019s meet',
      pages: [12, 13],
      labels: {
        grammar: 'How to ... make suggestions',
        vocabulary: 'adjectives for feelings and time phrases',
        pronunciation: 'intonation to show interest',
      },
      objectives: ['make plans to meet', 'use the language of making suggestions', 'describe how you feel'],
      blocks: [
        {
          type: 'text',
          title: 'Make plans to meet',
          paragraphs: [
            'When you arrange to meet a friend you suggest an activity, a time and a place. Learn the phrases for making suggestions and for answering them with interest.',
          ],
        },
        {
          type: 'vocab',
          title: 'adjectives for feelings',
          items: [
            { word: 'all right', example: 'I\u2019m all right, thanks.' },
            { word: 'bored', example: 'I\u2019m bored. Do you want to do something today?' },
            { word: 'hungry', example: 'I\u2019m hungry.' },
            { word: 'angry', example: 'I\u2019m angry at my manager.' },
            { word: 'relaxed', example: 'I feel really relaxed.' },
            { word: 'thirsty', example: 'I\u2019m thirsty. Can I have some water?' },
            { word: 'tired', example: 'I feel really tired.' },
          ],
          source: 'Lesson 1C, page 12',
        },
        {
          type: 'text',
          title: 'A plan over text messages',
          paragraphs: [
            'Lisa and Eva make plans by message: "I\u2019m bored. Do you want to do something today?" – "Sorry, I can\u2019t. Busy day at the restaurant. I feel really tired. What about tomorrow morning?" – "OK. Can we meet for a coffee? ... Let\u2019s try that new café near me, Coffee Club. ... How about ten?" – "Sure, that\u2019s fine. See you there."',
          ],
        },
        {
          type: 'grammar',
          title: 'How to ... make suggestions',
          explanation:
            'Use these phrases to make a suggestion: Let\u2019s + infinitive, Can we + infinitive, Would you like to + infinitive, How about / What about + noun or time.',
          rule: 'Respond positively with OK, Sure, Sure that\u2019s fine, Good idea, Perfect! or I\u2019d love to. Respond negatively with I\u2019m sorry, I can\u2019t or Sorry, I\u2019m busy then.',
          table: {
            headers: ['Making a suggestion', 'Responding'],
            rows: [
              { values: ['Let\u2019s + infinitive', 'OK. / Sure, that\u2019s fine.'] },
              { values: ['Can we + infinitive?', 'Good idea! / Perfect!'] },
              { values: ['Would you like to + infinitive?', 'I\u2019d love to.'] },
              { values: ['How about / What about + noun/time?', 'I\u2019m sorry, I can\u2019t. / Sorry, I\u2019m busy then.'] },
            ],
          },
          examples: [
            'Let\u2019s meet at the cinema.',
            'Can we meet at half past seven?',
            'Would you like to have a coffee?',
            'How about a break? / What about three o\u2019clock?',
            'Sure, that\u2019s fine. See you there.',
          ],
          bankPage: 100,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u1-1c-match',
            title: 'Match the suggestion phrases',
            kind: 'matching',
            instructions: 'Match each suggestion starter with its completion.',
            page: 100,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'matching',
                pairs: [
                  { left: "Let\u2019s", right: 'meet at the cinema.' },
                  { left: 'Can we', right: 'meet at half past seven?' },
                  { left: 'Would you like to', right: 'have a coffee?' },
                  { left: 'How about', right: 'a break?' },
                  { left: 'What about', right: 'three o\u2019clock?' },
                ],
              },
            ],
          },
        },
        {
          type: 'callout',
          title: 'Note: Do you like or Would you like?',
          tone: 'note',
          text: 'We use Do you like to ask about things that are always true: Do you like coffee? / Do you like playing tennis? We use Would you like to make a suggestion: Would you like a coffee? / Would you like to play tennis?',
        },
        {
          type: 'audio',
          title: 'Some listenings for this lesson',
          tracks: au(['1.08', '1.09', '1.11']),
        },
        {
          type: 'video',
          title: 'BBC Street Interviews: describing yourself',
          videos: [
            {
              title: 'BBC Street Interviews: how people describe themselves and their jobs',
              file: 'SO3 A2 U1 BBC StreetInt.mp4',
              page: 12,
            },
          ],
        },
        {
          type: 'vocab',
          title: 'time phrases',
          items: [
            { word: 'today', example: 'Do you want to do something today?' },
            { word: 'tomorrow', example: 'What about tomorrow morning?' },
            { word: 'this afternoon', example: 'Let\u2019s meet this afternoon.' },
            { word: 'at the weekend', example: 'How about at the weekend?' },
            { word: 'after class', example: 'Can we meet after class?' },
            { word: 'on Saturday', example: 'Let\u2019s do something on Saturday.' },
          ],
          source: 'See also Vocabulary Bank, page 134 (time phrases)',
        },
        {
          type: 'pages',
          images: [img(14, 'Lesson 1C, page 12'), img(15, 'Lesson 1C, page 13')],
        },
      ],
    },
    {
      id: '1d',
      code: '1D',
      title: 'Family and friends',
      pages: [14, 15],
      labels: {
        grammar: "possessive 's, s'",
        skills: 'speak and write about people in your life',
      },
      objectives: ['describe people in your life', "use possessive 's and s'"],
      blocks: [
        {
          type: 'text',
          title: 'Describe people in your life',
          paragraphs: [
            'Introduce yourself, talk about your family and describe the five most important people in your life – who they are and how you know them.',
          ],
        },
        {
          type: 'video',
          title: 'BBC Vlogs: Family and friends',
          videos: [
            {
              title: 'BBC Vlogs: five people introduce themselves and their families',
              file: 'SO3 A2 U1 BBC Vlogs.mp4',
              page: 14,
              note: 'Video not bundled in this copy of the material – open the source media pack to watch it.',
            },
          ],
        },
        {
          type: 'grammar',
          title: "possessive 's, s'",
          explanation:
            "We use 's with a person to talk about family and possessions. We use 's with one person and s' with more than one person. With irregular plurals we use 's.",
          rule: "one person → name + 's (my brother's wife) · two or more → name + s' (my parents' house) · irregular plural → +'s (the children's bedroom)",
          table: {
            headers: ['Rule', 'Example'],
            rows: [
              { label: "one person + 's", values: ["My dad's name is Daniel.", "My wife's name is Rachel."] },
              { label: "two or more + s'", values: ["My parents' names are Daniel and Monica."] },
              { label: "irregular plural + 's", values: ["the children's bedroom"] },
              { label: "possessive with no noun", values: ["This book isn't mine. It's Kiera's."] },
            ],
          },
          examples: ["My sister's name is Sarah and she lives in Hamburg.", "My parents' house is near here.", 'This car isn\u2019t mine. It\u2019s my parents\u2019.'],
          bankPage: 101,
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u1-1d-mcq',
            title: "Choose the correct words: 's or s'",
            kind: 'mcq',
            instructions: 'Choose the correct option in each sentence.',
            page: 101,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'It\u2019s ___',
                options: [
                  { label: 'the laptop of Pete', correct: false },
                  { label: "Pete's laptop", correct: true },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Are they ___ sunglasses?',
                options: [
                  { label: "Jennifer's", correct: true },
                  { label: "Jennifers'", correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'This is my ___ bedroom. They\u2019re five and seven years old.',
                options: [
                  { label: "boy's", correct: false },
                  { label: "boys'", correct: true },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'It\u2019s not my bag. It\u2019s ___',
                options: [
                  { label: "John's", correct: true },
                  { label: "Johns'", correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'Where are the ___ toilets?',
                options: [
                  { label: "men's", correct: true },
                  { label: "mens'", correct: false },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: 'Complete the sentence: \u201c___ is sad.\u201d',
                options: [
                  { label: 'The end of the film', correct: true },
                  { label: "film's end", correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'vocab',
          title: 'Key phrases: talking about people',
          items: [
            { word: "Arielle's my sister / a good friend / my manager.", example: 'say who someone is to you' },
            { word: "Ellen is my brother's wife / a friend from work.", example: 'say how someone is connected' },
            { word: "We're friends from work / school. / We're in a class together.", example: 'say how you know someone' },
            { word: "Who is he/she/Dan? / How do you know her/him?", example: 'ask about people' },
            { word: 'Are you very good friends? / How often do you meet/talk?', example: 'ask for more information' },
          ],
        },
        {
          type: 'text',
          title: 'Writing: describe five people in your life',
          paragraphs: [
            'Jasmine writes to her friend: "My parents\u2019 names are Patsy and Vince. They live about an hour from me. I have two sisters ... My sisters\u2019 names are Marcella and Greta. Greta\u2019s a lawyer and she isn\u2019t married. Marcella\u2019s a teacher. She teaches at the local school. She\u2019s married and has one child. Her husband\u2019s name is Marcel ... Their daughter\u2019s name is Sofia, and she\u2019s eight years old. We all meet every Sunday at our parents\u2019 house."',
            'In your own profile you can describe five people in your life, writing about topics such as names, jobs, where they live, married or single, ages and children.',
          ],
        },
        {
          type: 'pages',
          images: [img(16, 'Lesson 1D, page 14'), img(17, 'Lesson 1D, page 15')],
        },
      ],
    },
    {
      id: '1r',
      code: 'Review',
      title: 'Unit 1 Review',
      pages: [16, 16],
      blocks: [
        {
          type: 'text',
          title: 'Review what you have learned',
          paragraphs: [
            'Check your grammar and vocabulary from Unit 1: the present simple, making suggestions, possessive \u2019s, jobs and family words.',
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u1-1r-tf',
            title: 'Correct the sentences',
            kind: 'mcq',
            instructions: 'Choose the word that completes each sentence correctly.',
            page: 16,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Perfect, ___ we meet at nine?',
                options: [
                  { label: 'can', correct: true },
                  { label: 'about', correct: false },
                  { label: 'does', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Sorry, I\u2019m busy. How ___ Monday?',
                options: [
                  { label: 'about', correct: true },
                  { label: 'can', correct: false },
                  { label: '\u2019s', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Yes, she ___. She studies Law at university.',
                options: [
                  { label: 'does', correct: true },
                  { label: 'do', correct: false },
                  { label: 'know', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'Yes. Let\u2019s ___ a coffee.',
                options: [
                  { label: 'get', correct: true },
                  { label: 'know', correct: false },
                  { label: 'Can', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'I don\u2019t ___ the answer. Ask the teacher.',
                options: [
                  { label: 'know', correct: true },
                  { label: 'get', correct: false },
                  { label: 'love', correct: false },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: 'He\u2019s at the University ___ London.',
                options: [
                  { label: 'of', correct: true },
                  { label: 'can', correct: false },
                  { label: "to", correct: false },
                ],
              },
              {
                id: 'q7',
                kind: 'mcq',
                prompt: 'I\u2019d ___ to, but I can\u2019t.',
                options: [
                  { label: 'love', correct: true },
                  { label: 'know', correct: false },
                  { label: 'about', correct: false },
                ],
              },
              {
                id: 'q8',
                kind: 'mcq',
                prompt: 'Would you like ___ have dinner?',
                options: [
                  { label: 'to', correct: true },
                  { label: 'get', correct: false },
                  { label: "doesn't", correct: false },
                ],
              },
              {
                id: 'q9',
                kind: 'mcq',
                prompt: 'He ___ have a job at the moment.',
                options: [
                  { label: "doesn't", correct: true },
                  { label: "isn't", correct: false },
                  { label: 'don\u2019t', correct: false },
                ],
              },
              {
                id: 'q10',
                kind: 'mcq',
                prompt: 'This is the student\u2019s room. They work ___.',
                options: [
                  { label: 'here', correct: true },
                  { label: 'in', correct: false },
                  { label: 'at', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u1-1r-vocab',
            title: 'Vocabulary puzzle',
            kind: 'mcq',
            instructions: 'Choose the correct family or feeling word for each clue.',
            page: 16,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'My mother and my father are my ___',
                options: [
                  { label: 'parents', correct: true },
                  { label: 'cousins', correct: false },
                  { label: 'uncles', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'My mother\u2019s brother is my ___',
                options: [
                  { label: 'uncle', correct: true },
                  { label: 'grandfather', correct: false },
                  { label: 'aunt', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'My father\u2019s sister\u2019s daughter is my ___',
                options: [
                  { label: 'cousin', correct: true },
                  { label: 'nephew', correct: false },
                  { label: 'sister-in-law', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'I don\u2019t have a job at the moment. I\u2019m ___',
                options: [
                  { label: 'unemployed', correct: true },
                  { label: 'retired', correct: false },
                  { label: 'hungry', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'The boss of the hotel is the hotel ___',
                options: [
                  { label: 'manager', correct: true },
                  { label: 'driver', correct: false },
                  { label: 'player', correct: false },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: 'I want to sleep. I feel very ___',
                options: [
                  { label: 'tired', correct: true },
                  { label: 'angry', correct: false },
                  { label: 'thirsty', correct: false },
                ],
              },
              {
                id: 'q7',
                kind: 'mcq',
                prompt: 'My dad is seventy, he doesn\u2019t work. He\u2019s ___',
                options: [
                  { label: 'retired', correct: true },
                  { label: 'unemployed', correct: false },
                  { label: 'bored', correct: false },
                ],
              },
              {
                id: 'q8',
                kind: 'mcq',
                prompt: 'Can I have some water? I\u2019m ___',
                options: [
                  { label: 'thirsty', correct: true },
                  { label: 'hungry', correct: false },
                  { label: 'relaxed', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'pages',
          images: [img(18, 'Unit 1 Review, page 16')],
        },
      ],
    },
  ],
}