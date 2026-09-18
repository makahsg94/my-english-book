import type {
  Unit,
  Lesson,
} from '../../types/content'
import { au, img } from '../helpers'

// ===========================================================================
// 3A Facts and figures
// ===========================================================================

const lesson3A: Lesson = {
  id: '3a',
  code: '3A',
  title: 'Facts and figures',
  subtitle: 'Question forms \u2022 Knowledge: verbs and nouns',
  pages: [32, 34],
  labels: {
    grammar: 'question forms',
    vocabulary: 'knowledge: verbs and nouns',
    pronunciation: 'stressed words in questions',
  },
  objectives: [
    'understand a discussion about a quiz',
    'talk about things that are important to you using question forms',
    'write an email asking for information',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 3A',
      tone: 'info',
      text: 'Facts and figures \u2013 you take part in a general knowledge quiz, learn vocabulary for talking about knowledge, practise question forms and stress the important words in questions.',
    },
    {
      type: 'vocab',
      title: 'knowledge: verbs and nouns',
      items: [
        { word: 'note down', meaning: 'to write something to help you remember it', example: 'I note down new information, and I use my notes to revise for exams.' },
        { word: 'revise', meaning: 'to prepare for a test by studying books and notes', example: 'I use my notes to revise for exams.' },
        { word: 'memory', meaning: 'your ability to remember things and not forget them', example: 'I read all the time and I have a good memory.' },
        { word: 'a mind', meaning: 'the part of you that thinks and understands things', example: 'I think my mind works that way.' },
        { word: 'general knowledge', meaning: 'information on many different subjects', example: 'My general knowledge is fine, although I don\u2019t know much about sport!' },
        { word: 'solve (a problem)', meaning: 'to find the correct answer to a problem', example: 'I love to do quizzes and solve problems.' },
        { word: 'guess', meaning: 'to answer a question without knowing if you are right', example: 'If I don\u2019t know the answer, I just guess!' },
        { word: 'score', meaning: 'the number of points you get during a game or test', example: 'Even if I get a good score, I forget everything immediately afterwards!' },
        { word: 'data', meaning: 'information, especially numbers or facts', example: 'At work, I need to understand data and I\u2019m quite good with numbers.' },
        { word: 'an option', meaning: 'a thing you can choose', example: 'I try to choose the best option.' },
      ],
      source: 'Vocabulary Bank 3A, page 138',
    },
    {
      type: 'audio',
      title: 'Listening: a general knowledge quiz',
      tracks: au(['3.01', '3.02']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3a-quiz',
        title: 'Quick quiz',
        kind: 'mcq',
        instructions: 'Read the general knowledge quiz and choose the correct answers.',
        page: 32,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'Can fish live out of water?',
            options: [
              { label: 'Yes, some fish can breathe air and move on land.', correct: true },
              { label: 'No. Out of water, all fish die after a few minutes.' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'Why do we have eyebrows?',
            options: [
              { label: 'To protect our eyes, e.g. from dirt.', correct: true },
              { label: 'To warm our skin so our eyes don\u2019t freeze in winter.' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'Why do we use the colour red in \u201cstop\u201d signs?',
            options: [
              { label: 'Because red means danger and we can see it from far away.', correct: true },
              { label: 'Because in the past only kings wore red clothes.' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'Who wrote the Sherlock Holmes stories?',
            options: [
              { label: 'Sir Arthur Conan Doyle', correct: true },
              { label: 'Roald Dahl' },
            ],
          },
          {
            id: 'q5',
            kind: 'mcq',
            prompt: 'Where was paper first invented?',
            options: [
              { label: 'China', correct: true },
              { label: 'France' },
            ],
          },
          {
            id: 'q6',
            kind: 'mcq',
            prompt: 'What did Tim Berners-Lee invent?',
            options: [
              { label: 'The World Wide Web', correct: true },
              { label: 'Virtual reality' },
            ],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3a-listening',
        title: 'The quiz discussion: true or false',
        kind: 'true-false',
        instructions: 'Listen to two friends discussing the quiz. Are the statements true (T) or false (F)?',
        page: 32,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'The man thinks he will do well in the quiz.', correct: true },
          { id: 'q2', kind: 'true-false', statement: 'The woman gives extra information about fish that live out of water.', correct: true },
          { id: 'q3', kind: 'true-false', statement: 'The woman gives an example of how eyebrows protect our eyes.', correct: true },
          { id: 'q4', kind: 'true-false', statement: 'The man has never read a Sherlock Holmes book.', correct: true },
          { id: 'q5', kind: 'true-false', statement: 'The woman mentions four of the materials in smartphones.', correct: false },
          { id: 'q6', kind: 'true-false', statement: 'The man\u2019s final score is five out of seven.', correct: false },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3a-phrases',
        title: 'Complete the phrases',
        kind: 'fill-blank',
        instructions: 'Choose the correct words to complete the phrases used in the discussion.',
        page: 32,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: '1 By the',
            answer: 'way',
            after: ', there are about fifty types of \u2026',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: '2 Moving',
            answer: 'on',
            after: ' to the next one, \u2026',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: '3 That',
            answer: 'reminds',
            after: ' me: I think \u2026',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: '4 This is completely',
            answer: 'off-topic',
            after: ', but \u2026',
          },
        ],
      },
    },
    {
      type: 'grammar',
      title: 'question forms',
      explanation:
        'We can ask about the subject of a sentence (Who/What + verb) or about the object (Who/What + auxiliary + subject + verb). We also use question words like why, when, where, how and which with auxiliary verbs.',
      rule:
        "subject question: no auxiliary \u2192 Who wrote the Sherlock Holmes books? (Tim Berners-Lee invented the web. \u2192 Who invented the World Wide Web?) object question: auxiliary + subject \u2192 What did Tim Berners-Lee invent? (Tim Berners-Lee invented the web. \u2192 What did he invent?) preposition at the end: What do you know a lot about?",
      table: {
        headers: ['Form', 'Example'],
        rows: [
          { label: 'subject question (no auxiliary)', values: ['Who wrote the Sherlock Holmes books?', 'Who invented the World Wide Web?'] },
          { label: 'object question (auxiliary)', values: ['What did Tim Berners-Lee invent?', 'Why do we have eyebrows?'] },
          { label: 'question ending in a preposition', values: ['What do you know a lot about?', 'What are you going to do later?'] },
        ],
      },
      examples: [
        'Who wrote the Sherlock Holmes books?',
        'What did Tim Berners-Lee invent?',
        'What do you know a lot about?',
      ],
      bankPage: 112,
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3a-grammar',
        title: 'Question forms',
        kind: 'mcq',
        instructions: 'Choose the correct question.', 
        page: 33,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: '\u2026 invented the World Wide Web?',
            options: [
              { label: 'Who', correct: true },
              { label: 'What' },
              { label: 'How' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'What \u2026 Tim Berners-Lee invent?',
            options: [
              { label: 'did', correct: true },
              { label: 'was' },
              { label: 'does' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'What do you know a lot \u2026?',
            options: [
              { label: 'about', correct: true },
              { label: 'of' },
              { label: 'for' },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Pronunciation: stressed words in questions',
      tracks: au(['3.03', '3.04']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3a-pronunciation',
        title: 'Stressed words in questions',
        kind: 'fill-blank',
        instructions: 'Listen and complete the questions with the missing words, then practise stressing the important words.',
        page: 33,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'When did people first land',
            answer: 'on the Moon',
            after: '?',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'Who played the Black Panther in the',
            answer: '2018 film',
            after: '?',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'Where is',
            answer: 'the Pink Palace',
            after: '?',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: 'What object related to',
            answer: 'weather',
            after: ' did Benjamin Franklin invent?',
          },
        ],
      },
    },
    {
      type: 'text',
      title: 'Writing: an email asking for information',
      paragraphs: [
        'Read the two emails. Compare the formal email (Dear Sir/Madam, \u2026 I am writing to express my interest in applying for a six-month internship) with the informal one (Hi Liz, \u2026 Can you send me some info about that French class?).',
        'A formal email uses long sentences, full forms (I am), polite phrases (Could you tell me \u2026?) and a formal sign-off (Yours faithfully). An informal email uses shorter sentences, contractions (I\u2019m), informal phrases (Can you send me \u2026? Thanks!) and a friendly sign-off (See you soon).',
        'Choose a situation and write your email. Think about who you are writing to and whether the email should be formal or informal.',
      ],
    },
    {
      type: 'pages',
      images: [img(46, 'Facts and figures', 'General knowledge quiz and vocabulary'), img(47, 'Grammar and pronunciation', 'Question forms and stressed words'), img(48, 'Writing', 'A formal and an informal email asking for information')],
    },
  ],
}

// ===========================================================================
// 3B Decisions
// ===========================================================================

const lesson3B: Lesson = {
  id: '3b',
  code: '3B',
  title: 'Decisions',
  subtitle: 'Future plans and intentions \u2022 Decisions',
  pages: [35, 37],
  labels: {
    grammar: 'future plans and intentions',
    vocabulary: 'decisions',
    pronunciation: "weak forms of are you and going to",
  },
  objectives: [
    'read an article about making decisions',
    'talk about future plans and intentions',
    'discuss how you make decisions',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 3B',
      tone: 'info',
      text: 'Decisions \u2013 you read an article about how to make good decisions, learn vocabulary for talking about decisions, and use the present continuous, going to, might and will for future plans and intentions.',
    },
    {
      type: 'text',
      title: 'Reading: The art of making decisions',
      paragraphs: [
        'Our lives are full of decisions. There are small, day-to-day decisions like what clothes to wear or what to have for dinner, and bigger life-changing decisions that will affect our future, like where you choose to live, or what career you decide to have. If you find it hard to make up your mind, there are a few things that can help.',
        'Focus on the big issues. Some scientists studying the brain have seen that all decisions \u2013 big or small \u2013 use the same amount of energy. We get tired when we make decisions all day and this makes it difficult to focus on the important choices we need to make. When you take away the smaller decisions, you allow your brain to focus on the bigger problems. When Barack Obama was U.S. president, he chose to remove one decision from his daily life: what to wear. He always wore a blue or a grey suit with a white shirt. This \u201cuniform\u201d allowed him to focus his energy on the more important decisions he needed to make.',
        'Don\u2019t fear the consequences. When trying to reach a decision, we often select the easiest option, rather than the one which might be difficult or involve more effort. When you make an important choice, think of the option that will help you to develop as a person, rather than choosing the easy option and missing an opportunity.',
        'Follow your gut instincts. For some decisions, you might consider all the advantages and disadvantages, but at other times a quick decision is best. Our brain makes quick judgements about people and situations all the time. We decide on a person\u2019s character within the first 100 milliseconds of seeing their face for the first time. After that, we don\u2019t usually change our mind.',
        'Sleep on it. Sometimes it makes sense to stop thinking about the decision and wait for a while. In fact, if you\u2019re making a complex decision that requires you to consider different factors, research shows that allowing the brain to work on the problem while you\u2019re asleep often helps you decide on the best course of action.',
      ],
    },
    {
      type: 'vocab',
      title: 'decisions',
      items: [
        { word: 'communicate', meaning: 'to share or exchange information, news or ideas', example: 'Good teams communicate well.' },
      ],
      source: '',
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3b-vocab',
        title: 'Decisions vocabulary',
        kind: 'matching',
        instructions: 'Match the words and phrases about decisions with their meanings.',
        page: 36,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'matching',
            pairs: [
              { left: 'make up your mind', right: 'to decide' },
              { left: 'consider', right: 'to think about something' },
              { left: 'choose', right: 'to pick something' },
              { left: 'select', right: 'to decide or pick' },
              { left: 'focus on', right: 'to think about one thing carefully' },
              { left: 'make sense', right: 'to seem like a good idea' },
              { left: 'the advantages and disadvantages', right: 'the good and bad points something has' },
              { left: 'a choice / a decision', right: 'something you decide on' },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Listening: two conversations about decisions',
      tracks: au(['3.05']),
    },
    {
      type: 'grammar',
      title: 'future plans and intentions',
      explanation:
        "We use different forms to talk about the future. The present continuous is for arrangements we have already made. Going to is for plans and intentions. Will is for a decision made at the time of speaking. Might is for a plan we are not sure about.",
      rule:
        "present continuous: a future arrangement \u2192 Next week we're looking at a house in a village. going to: future plans \u2192 They're going to travel around South America. will: a decision made at the time of speaking \u2192 We'll see if we can find somewhere nice, then we'll make our decision. might: a plan you are not sure about \u2192 I might get a job in a local restaurant.",
      table: {
        headers: ['Form', 'Use'],
        rows: [
          { label: 'present continuous', values: ['a future arrangement', "Next week we're looking at a house in a village."] },
          { label: 'going to', values: ['future plans', "They're going to travel around South America."] },
          { label: 'will', values: ['a decision made at the time of speaking', "We'll see if we can find somewhere nice, then we'll make our decision."] },
          { label: 'might', values: ['a plan which you are not sure about', 'I might get a job in a local restaurant.'] },
        ],
      },
      examples: [
        "Next week we're looking at a house in a village.",
        "They're going to travel around South America.",
        "We'll see if we can find somewhere nice, then we'll make our decision.",
        'I might get a job in a local restaurant.',
      ],
      bankPage: 113,
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3b-grammar',
        title: 'Future plans and intentions',
        kind: 'mcq',
        instructions: 'Choose the correct form to talk about the future.',
        page: 36,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'Next week we \u2026 at a house in a village. (an arrangement)',
            options: [
              { label: "'re looking", correct: true },
              { label: 'might look' },
              { label: 'will look' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: "They \u2026 travel around South America. (a plan)",
            options: [
              { label: "'re going to", correct: true },
              { label: 'look' },
              { label: 'might' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'We \u2026 see if we can find somewhere nice, then we\u2019ll make our decision. (decided now)',
            options: [
              { label: "'ll", correct: true },
              { label: 'are going' },
              { label: 'might be' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'I \u2026 get a job in a local restaurant. (not sure yet)',
            options: [
              { label: 'might', correct: true },
              { label: "'ll" },
              { label: "'m going to" },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Pronunciation: weak forms of are you and going to',
      tracks: au(['3.06', '3.07']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3b-pronunciation',
        title: 'Make questions from the prompts',
        kind: 'fill-blank',
        instructions: 'Make questions from the prompts, then listen and check.',
        page: 36,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'Prompt: you / do / later \u2192',
            answer: 'What are you doing later?',
            after: '',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'Prompt: you / cook / dinner tonight \u2192',
            answer: 'What are you cooking for dinner tonight?',
            after: '',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'Prompt: you / have a holiday soon \u2192',
            answer: 'Are you going to have a holiday soon?',
            after: '',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: 'Prompt: you / do after this lesson \u2192',
            answer: 'What are you going to do after this lesson?',
            after: '',
          },
          {
            id: 'q5',
            kind: 'fill-blank',
            before: 'Prompt: you / do next year \u2192',
            answer: 'What are you planning to do next year?',
            after: '',
          },
        ],
      },
    },
    {
      type: 'text',
      title: 'Speaking: talk about future plans and intentions',
      paragraphs: [
        'Prepare to talk for one minute about one or two of the topics below: plans for this evening (what? who? where? food? entertainment?); plans for the weekend (sports? activities? social plans? family?); plans for your next holiday (where? when? why? how to travel? places to visit?); plans for the rest of the year (career? studies? courses? work?).',
        'Talk to other students about your plans and intentions and ask questions to find out more information.',
      ],
    },
    {
      type: 'pages',
      images: [img(49, 'Decisions', 'The art of making decisions'), img(50, 'Vocabulary and grammar', 'Decisions vocabulary and future plans'), img(51, 'Speaking', 'Talk about future plans and intentions')],
    },
  ],
}

// ===========================================================================
// 3C Can I ask you\u2026 ?
// ===========================================================================

const lesson3C: Lesson = {
  id: '3c',
  code: '3C',
  title: 'Can I ask you\u2026 ?',
  subtitle: 'How to \u2026 make polite inquiries',
  pages: [38, 39],
  labels: {
    grammar: 'how to \u2026 make polite inquiries',
    vocabulary: 'facilities; places in a city',
    pronunciation: 'polite intonation',
  },
  objectives: [
    'make polite inquiries using indirect questions',
    'talk about facilities and places in a city',
    'practise polite intonation',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 3C',
      tone: 'info',
      text: 'Can I ask you\u2026 ? \u2013 you learn to make polite inquiries using indirect questions, and vocabulary for facilities and places in a city. The topic is working and studying in Malta.',
    },
    {
      type: 'vocab',
      title: 'facilities',
      items: [
        { word: 'facilities', meaning: 'the buildings, services and equipment provided for a purpose', example: 'The university offers all the facilities you need.' },
        { word: 'campus', meaning: 'the land and buildings of a university or college', example: 'If you are studying at the University of Malta, the campus also has a sports centre.' },
        { word: 'library', meaning: 'a place with a large selection of books', example: 'There is a main library which has a huge selection of books.' },
        { word: 'sports centre', meaning: 'a building where you can do sports', example: 'The campus has a sports centre with football pitches and a swimming pool.' },
        { word: 'gym', meaning: 'a place where you do physical exercise', example: 'Can I use the gym? I\u2019d like to know when the gym opens in the morning.' },
        { word: 'halls of residence', meaning: 'university accommodation for students', example: 'You can stay in university halls of residence or with home-stay families.' },
        { word: 'study areas', meaning: 'places where students can study', example: 'There are outside study areas where students can study together.' },
        { word: 'language schools', meaning: 'schools that teach languages', example: 'You can register for a course at one of the many language schools on the island.' },
        { word: 'employment office', meaning: 'an office that helps people find work', example: 'Jobs in finance or tourism are easy to find in Malta.' },
        { word: 'theatres', meaning: 'places where plays and shows are performed', example: 'The sports centre is in the town square, opposite the theatre.' },
      ],
      source: 'Vocabulary Bank 3C, page 138',
    },
    {
      type: 'text',
      title: 'Reading: work and study abroad in Malta',
      paragraphs: [
        'Ninety percent of the population of Malta speak English, so this is a wonderful study or work abroad option for students who want to improve their English. You can register for a course at one of the many language schools on the island.',
        'EU citizens can work and study in Malta, but people coming from outside the EU need to apply for a work permit from the employment office. Many people find jobs in finance or tourism. There are several private universities in Malta. The University of Malta is the only public university. You can stay in university halls of residence or with home-stay families. Living in Malta is not too expensive \u2013 in fact, Malta is one of the cheapest places to study in Europe. Malta is a fantastic place to practise water sports, with beautiful beaches and warm weather for much of the year.',
      ],
    },
    {
      type: 'audio',
      title: 'Listening: inquiries about working or studying in Malta',
      tracks: au(['3.08']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3c-listening',
        title: 'The conversations: true or false',
        kind: 'true-false',
        instructions: 'Listen again and decide if the statements are true (T) or false (F).',
        page: 39,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'The caller is planning to work in Malta but not to study.', correct: false },
          { id: 'q2', kind: 'true-false', statement: 'He doesn\u2019t need a work visa.', correct: false },
          { id: 'q3', kind: 'true-false', statement: 'You can walk from the accommodation to the campus in fifteen minutes.', correct: true },
          { id: 'q4', kind: 'true-false', statement: "There's a bus if you don't want to walk.", correct: true },
          { id: 'q5', kind: 'true-false', statement: 'Students at the university can use the swimming pool for free.', correct: true },
          { id: 'q6', kind: 'true-false', statement: 'The gym is closed in the mornings.', correct: false },
        ],
      },
    },
    {
      type: 'grammar',
      title: 'indirect questions (polite inquiries)',
      explanation:
        'Indirect questions are more polite than direct questions. In an indirect question, the word order changes: the subject comes before the verb, and we often use Can you tell me\u2026?, Do you know\u2026?, I\u2019d like to know\u2026?, Could you tell me\u2026?',
      rule:
        "word order: question word + subject + verb (no auxiliary after the question word) \u2192 Where is the swimming pool? \u2192 Can you tell me where the swimming pool is? (not: where is the swimming pool is) \u2192 direct: What time does the accommodation office close? \u2192 indirect: I'd like to know what time the accommodation office closes. yes/no questions use if/whether \u2192 Do I need a visa? \u2192 Do you know if I need a visa?",
      table: {
        headers: ['Direct question', 'Indirect (polite) question'],
        rows: [
          { label: 'Where is \u2026?', values: ['Can you tell me where the swimming pool is?'] },
          { label: 'What time does \u2026?', values: ['I\u2019d like to know what time the accommodation office closes.'] },
          { label: 'Can I \u2026?', values: ['Could you tell me if I can use the gym?'] },
          { label: 'Do I need \u2026?', values: ['Do you know if I need a visa?'] },
        ],
      },
      examples: [
        'Can you tell me where the swimming pool is?',
        "I'd like to know what time the accommodation office closes.",
        'Do you know if I need a visa?',
        'Could you tell me if I can use the gym?',
      ],
      bankPage: 114,
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3c-grammar',
        title: 'Rewrite with indirect questions',
        kind: 'fill-blank',
        instructions: 'Rewrite the inquiries using indirect questions to make them more polite.',
        page: 39,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'Direct: "Where is the swimming pool?" \u2192',
            answer: 'Can you tell me where the swimming pool is?',
            after: '',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'Direct: "What time does the accommodation office close?" \u2192',
            answer: "I'd like to know what time the accommodation office closes.",
            after: '',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'Direct: "Do I need a visa?" \u2192',
            answer: 'Do you know if I need a visa?',
            after: '',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: 'Direct: "Can I use the gym?" \u2192',
            answer: "Could you tell me if I can use the gym?",
            after: '',
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3c-grammar-2',
        title: 'Choose the correct indirect question',
        kind: 'mcq',
        instructions: 'Choose the correct indirect question form.',
        page: 39,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: '\u2026 where the sports centre is.',
            options: [
              { label: 'Could you tell me', correct: true },
              { label: 'Could you tell me that' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'Do you know what time the library \u2026?',
            options: [
              { label: 'opens', correct: true },
              { label: 'does the library open' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'Can you tell me \u2026 I need a visa?',
            options: [
              { label: 'if', correct: true },
              { label: 'that' },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Pronunciation: polite intonation',
      tracks: au(['3.10']),
    },
    {
      type: 'text',
      title: 'Speaking: roleplay at a language school',
      paragraphs: [
        'Roleplay. Student A: you want some information about language courses at Ello Language School. Use indirect questions to make polite inquiries: Can you tell me how many hours I will study a day? Can you tell me if I can miss lessons? Would I receive a certificate at the end of the course? Is there a study area on campus? Can I borrow books from the library? Is there free Wi-Fi? Can you tell me where to go shopping near the school?',
        'Student B: you work at a sports centre. Answer your partner\u2019s inquiries. The sports centre is in the town square, opposite the theatre, next to the taxi rank. Anybody can use the facilities \u2013 you don\u2019t need to be a member. Prices for the gym: \u00a310 per hour. Swimming pool open 6 a.m.\u20138 p.m. Gym open 6 a.m.\u201310 p.m.',
      ],
    },
    {
      type: 'pages',
      images: [img(52, 'Can I ask you\u2026 ?', 'Work and study abroad in Malta: facilities and places in a city'), img(53, 'How to make polite inquiries', 'Indirect questions and polite intonation')],
    },
  ],
}

// ===========================================================================
// 3D BBC Street Interviews: What matters most?
// ===========================================================================

const lesson3D: Lesson = {
  id: '3d',
  code: '3D',
  title: 'What matters most?',
  subtitle: 'BBC Street Interviews \u2022 Phrasal verbs',
  pages: [40, 41],
  labels: {
    grammar: 'phrasal verbs',
    skills: 'a conversation about what\u2019s important to you',
    writing: 'an online forum comment',
  },
  objectives: [
    'understand people talking about what is important in their life',
    'use phrasal verbs to talk about what is important to you',
    'write an online forum comment',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 3D',
      tone: 'info',
      text: 'What matters most? \u2013 in the BBC Street Interviews people are asked: What things are important in your life? and What things aren\u2019t important in your life?',
    },
    {
      type: 'video',
      title: 'BBC Street Interviews: what matters most?',
      videos: [
        { title: 'BBC Street Interviews: what matters most?', file: 'SO3 B1 U3 BBC StreetInt.mp4', page: 40 },
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3d-video-1',
        title: 'Watch: which ideas do the speakers mention?',
        kind: 'matching',
        instructions: 'Watch the video and match each speaker with the ideas they mention as important.',
        page: 40,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'matching',
            pairs: [
              { left: 'Lily', right: 'is probably artistic' },
              { left: 'Lotte and Saffi', right: 'socialise a lot with friends' },
              { left: 'Natalia', right: 'sings to change her mood' },
              { left: 'Gerard', right: 'has a job' },
            ],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3d-video-2',
        title: 'Watch again: complete the sentences',
        kind: 'fill-blank',
        instructions: 'Complete the things that the speakers say are or aren\u2019t important to them. Watch the second part of the video again and check.',
        page: 40,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: "Lily: Other people's opinions are",
            answer: 'not very important',
            after: ' to me.',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: "Lotte: I'm more interested in",
            answer: 'current events',
            after: '.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: "Mon Zer: I don't care",
            answer: 'about new trends',
            after: ' that much.',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: "Gerard: I'm not really",
            answer: 'into brands',
            after: ' at all.',
          },
        ],
      },
    },
    {
      type: 'grammar',
      title: 'phrasal verbs',
      explanation:
        'A phrasal verb is a verb + a small word (particle) with a special meaning. In some phrasal verbs, the object can go between the verb and the particle, or after the particle.',
      rule:
        "separable phrasal verbs: I put on a song. = I put a song on. Inseparable phrasal verbs: My friends and I look out for each other. (not: look for each other out) phrasal verbs from the video: put on (a song), look out for (each other).",
      table: {
        headers: ['Phrasal verb', 'Meaning'],
        rows: [
          { label: 'put on (separable)', values: ['to start playing (music)', 'Putting on a certain song can uplift you. \u2192 I put a song on.'] },
          { label: 'look out for (inseparable)', values: ['to take care of / protect', '[It\u2019s important to] look out for each other.'] },
          { label: 'find out', values: ['to discover', 'You are going to find out information about your partner\u2019s answers.'] },
          { label: 'switch on / shut down', values: ['to start / stop a machine', "I switch on my computer and begin work. At 4 p.m., I shut down my computer."] },
        ],
      },
      examples: [
        'Putting on a certain song can uplift you.',
        "[It's important to] look out for each other.",
        'I put on a song. / I put a song on.',
      ],
      bankPage: 115,
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3d-grammar',
        title: 'Position of the object',
        kind: 'true-false',
        instructions: 'Decide whether the two sentences are both correct.',
        page: 40,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'a) I put on a song.  b) I put a song on.', correct: true },
          { id: 'q2', kind: 'true-false', statement: 'a) My friends and I look out for each other.  b) My friends and I look for each other out.', correct: false },
          { id: 'q3', kind: 'true-false', statement: 'a) I switch on my computer.  b) I switch my computer on.', correct: true },
          { id: 'q4', kind: 'true-false', statement: 'a) I shut down my computer.  b) I shut my computer down.', correct: true },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-3d-keyphrases',
        title: 'Key phrases for talking about what matters',
        kind: 'fill-blank',
        instructions: 'Complete the key phrases in your own words so they are true for you.',
        page: 41,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'The things that are important in my life are',
            answer: 'spending time with my family and friends',
            after: '.',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: "I'm not interested in",
            answer: 'fast fashion',
            after: ' at all.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: "I don't care about",
            answer: 'new trends',
            after: ' that much.',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: "I'm not really into",
            answer: 'reality TV shows',
            after: '.',
          },
        ],
      },
    },
    {
      type: 'text',
      title: 'Writing: an online forum comment',
      paragraphs: [
        'Read the example comment (Alex, Maine, USA): \u201cThe things that are important in my life are spending relaxed time at home and making delicious food. I\u2019m very interested in cooking and I like to experiment with new dishes. I started cooking as a teenager and I still love it twenty years later. It\u2019s a very creative hobby and it\u2019s fun to try different types of food. I\u2019m not really into shopping in big supermarkets, so I try to buy local ingredients from the farms and street markets near where I live. I cook at least once a day.\u201d',
        'Write a comment about an activity that is important in your life. Write about: what the activity is; why you enjoy it and why it is important to you; when you first became interested in it; how much time you spend doing it.',
      ],
    },
    {
      type: 'pages',
      images: [img(54, 'What matters most?', 'BBC Street Interviews about what is important in life'), img(55, 'Speaking and writing', 'Conversation about what\u2019s important and an online forum comment')],
    },
  ],
}

// ===========================================================================
// Unit 3 Review
// ===========================================================================

const lesson3Review: Lesson = {
  id: '3r',
  code: 'Review',
  title: 'Unit 3 Review',
  subtitle: 'Question forms \u2022 Future plans and intentions \u2022 Phrasal verbs',
  pages: [42, 42],
  labels: {
    grammar: 'review',
    vocabulary: 'review',
    pronunciation: 'review',
  },
  objectives: ['revise the vocabulary and grammar of Unit 3', 'check your progress'],
  blocks: [
    {
      type: 'review',
      title: 'Unit 3 Review',
      text: 'Complete the tasks to recycle the grammar and vocabulary from Unit 3: question forms, future plans and intentions, phrasal verbs, and knowledge and decisions vocabulary.',
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-review-questions',
        title: 'Correct the questions',
        kind: 'true-false',
        instructions: 'Correct the mistakes in the questions. One of the questions is correct.',
        page: 42,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'When you started studying English?', correct: false },
          { id: 'q2', kind: 'true-false', statement: 'Who did help you to learn English?', correct: false },
          { id: 'q3', kind: 'true-false', statement: 'Did you to learn anything important at school?', correct: false },
          { id: 'q4', kind: 'true-false', statement: 'Do you enjoy learning languages?', correct: true },
          { id: 'q5', kind: 'true-false', statement: 'When you imagine the perfect career, what you think of?', correct: false },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-review-plans',
        title: 'Future plans and intentions',
        kind: 'matching',
        instructions: 'Match the questions with the answers.',
        page: 42,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'matching',
            pairs: [
              { left: 'What are you doing later today?', right: 'After this lesson, I\u2019m going to the library.' },
              { left: 'Where are you going on your next holiday?', right: 'Maybe to a small town by the sea.' },
              { left: 'How are you planning to celebrate your birthday?', right: 'This year I\u2019m going to invite my friends to a party!' },
              { left: 'What time are you going to get up tomorrow?', right: 'At about 6 a.m.' },
              { left: 'Are you doing anything interesting this weekend?', right: "Yes! I'm going to see a film with my partner." },
            ],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-review-phrasal',
        title: 'Phrasal verbs: word order',
        kind: 'true-false',
        instructions: 'Read the paragraph and decide if the different word order of the phrasal verbs is correct.',
        page: 42,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'My alarm goes off at 4.00 a.m. (instead of: goes at 4.00 a.m. off)', correct: true },
          { id: 'q2', kind: 'true-false', statement: 'I get quickly up. (instead of: get up quickly)', correct: false },
          { id: 'q3', kind: 'true-false', statement: 'I put my coat on. (instead of: put on my coat)', correct: true },
          { id: 'q4', kind: 'true-false', statement: 'I get the 4.40 bus on. (instead of: get on the 4.40 bus)', correct: false },
          { id: 'q5', kind: 'true-false', statement: 'I switch my computer on. (instead of: switch on my computer)', correct: true },
          { id: 'q6', kind: 'true-false', statement: 'I look information up. (instead of: look up information)', correct: true },
          { id: 'q7', kind: 'true-false', statement: 'I go at about 11.00 out. (instead of: go out at about 11.00)', correct: false },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u3-review-vocab',
        title: 'Tips for language students',
        kind: 'fill-blank',
        instructions: 'Complete the advice with the words in the box: consider, knowledge, library, mind, note, revise.',
        page: 42,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: '',
            answer: 'Note',
            after: ' down new words in a special notebook.',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'Join a',
            answer: 'library',
            after: ' that has lots of books and magazines in English.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: '',
            answer: 'Revise',
            after: ' grammar and vocabulary every day.',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: 'Train your',
            answer: 'mind',
            after: ' to translate everything you hear and read into English.',
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Review listening: check your answers',
      tracks: au(['R3.01']),
    },
  ],
}

export const unit03: Unit = {
  id: 'unit-3',
  number: 3,
  title: 'Questions',
  phrase: 'question forms \u2022 future plans and intentions \u2022 polite inquiries \u2022 phrasal verbs',
  overviewPage: 31,
  pages: [31, 42],
  intro:
    'In this unit you learn to ask questions in different forms, talk about future plans and intentions, make polite inquiries with indirect questions, and talk about what is important to you using phrasal verbs. You watch BBC Street Interviews, listen to people discussing a quiz and talking about decisions, and write an email, a comment and a forum comment.',
  objectives: [
    'understand a discussion about a quiz',
    'read an article about making decisions',
    'make polite inquiries',
    'understand people talking about what is important in their life',
  ],
  video: [
    { title: 'BBC Vlogs: What things are you curious about and why?', file: 'SO3 B1 U3 BBC Vlogs.mp4', page: 31 },
    { title: 'BBC Street Interviews: what matters most?', file: 'SO3 B1 U3 BBC StreetInt.mp4', page: 40 },
  ],
  lessons: [
    lesson3A,
    lesson3B,
    lesson3C,
    lesson3D,
    lesson3Review,
  ],
}