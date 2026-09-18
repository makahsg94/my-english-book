import type {
  Unit,
  Lesson,
} from '../../types/content'
import { au, img } from '../helpers'

// ===========================================================================
// 1A Who are you?
// ===========================================================================

const lesson1A: Lesson = {
  id: '1a',
  code: '1A',
  title: 'Who are you?',
  subtitle: 'People and relationships \u2022 Present simple and present continuous; state verbs; adverbs of frequency',
  pages: [8, 9],
  labels: {
    grammar: 'present simple and present continuous; state verbs; adverbs of frequency',
    vocabulary: 'people and relationships; personality adjectives',
    pronunciation: 'connected speech: do you',
  },
  objectives: [
    'talk about different people and activities in your life',
    'use the present simple and present continuous and state verbs',
    'write a personal profile',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 1A',
      tone: 'info',
      text: "People and relationships \u2022 Who are you? You learn to talk about the people in your life \u2013 friends, family, teammates and colleagues \u2013 and what you do together.",
    },
    {
      type: 'vocab',
      title: 'people and relationships',
      items: [
        { word: 'teammate', meaning: 'a person you play a sport with in the same team', example: "I get on well with my teammates on the football team." },
        { word: 'close friend', meaning: 'a friend you know very well and feel very comfortable with', example: "I have a group of close friends and we often go out together." },
        { word: 'family member', meaning: 'a person in your family', example: 'I stayed in touch with my family members when I moved abroad.' },
        { word: 'grandparent', meaning: 'your mother\u2019s or father\u2019s parent', example: 'My grandparents were very important to me.' },
        { word: 'partner', meaning: 'the person you share your life with', example: 'My partner is my best friend.' },
        { word: 'colleague', meaning: 'a person you work with', example: "I'm friendly with most of my colleagues." },
      ],
      source: 'Vocabulary Bank 1A, page 128',
    },
    {
      type: 'grammar',
      title: 'present simple and present continuous; state verbs; adverbs of frequency',
      explanation:
        'We use the present simple for facts, habits and things that are always or usually true. We use the present continuous for things happening now or around now. Some verbs describe states, not actions, and we don\u2019t usually use them in the continuous form.',
      rule:
        "present simple: I/you/we/they + verb (I work in London. Do you live near here?); he/she/it + verb-s (She works in a hospital). present continuous: be + verb-ing (Right now I'm studying for my exams.). state verbs: like, love, want, know, need, prefer, remember (Not: I'm liking it.). adverbs of frequency: always, usually, often, sometimes, hardly ever, never \u2013 before the main verb but after be.",
      table: {
        headers: ['Form', 'Use'],
        rows: [
          { label: 'present simple', values: ['facts, habits and routines', 'I study design at university. She usually cooks with her flatmates.'] },
          { label: 'present continuous', values: ['things happening now or around now', "At the moment I'm living in New York. He's working on a new project these days."] },
          { label: 'state verbs', values: ['feelings, thoughts and states \u2013 not usually continuous', 'I love getting to know new cities. (Not: I\u2019m loving.)'] },
          { label: 'adverbs of frequency', values: ['always / usually / often / sometimes / hardly ever / never before the main verb', 'We usually cook together in the evening. I hardly ever eat in a restaurant.'] },
        ],
      },
      examples: [
        "I'm studying design and I love it.",
        'We study during the day and then we usually cook together in the evening.',
        "I'm from Turkey, but at the moment I'm living in London.",
        'I always call my parents at the weekend.',
      ],
      bankPage: 9,
    },
    {
      type: 'examples',
      title: 'state verbs with the present simple',
      items: [
        'I love travelling. (not "I\u2019m loving travelling")',
        'She wants to become a chef. (not "She is wanting")',
        'Do you know Paulo? (not "Are you knowing")',
        "I don't mind waiting a few minutes. (not \"I\u2019m not minding\")",
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1a-grammar',
        title: 'Present simple or present continuous?',
        kind: 'mcq',
        instructions: 'Choose the correct form.',
        page: 8,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: "I \u2026 out with my friends tonight.",
            options: [
              { label: 'go' },
              { label: "'m going", correct: true },
              { label: 'am going to go' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'My sister \u2026 in a bank in the city centre.',
            options: [
              { label: 'works', correct: true },
              { label: "'s working" },
              { label: 'work' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: "I \u2026 this book at the moment.",
            options: [
              { label: 'read' },
              { label: "'m reading", correct: true },
              { label: 'am read' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'We \u2026 to the beach every Saturday in summer.',
            options: [
              { label: 'go', correct: true },
              { label: "'re going" },
              { label: 'goes' },
            ],
          },
          {
            id: 'q5',
            kind: 'mcq',
            prompt: 'She \u2026 getting up early.',
            options: [
              { label: 'isn\u2019t loving' },
              { label: 'doesn\u2019t love', correct: true },
              { label: "don't love" },
            ],
          },
          {
            id: 'q6',
            kind: 'mcq',
            prompt: 'How often \u2026 you see your grandparents?',
            options: [
              { label: 'are' },
              { label: 'do', correct: true },
              { label: 'does' },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Connected speech: do you',
      tracks: au(['1.01']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1a-pron',
        title: 'Rhythm: do you',
        kind: 'ordering',
        instructions: 'Put the words in the correct order to make the conversation.',
        page: 9,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'ordering',
            title: 'question 1',
            items: ['Do', 'you', 'come', 'here', 'often?'],
          },
          {
            id: 'q2',
            kind: 'ordering',
            title: 'question 2',
            items: ['Where', 'do', 'you', 'work?'],
          },
          {
            id: 'q3',
            kind: 'ordering',
            title: 'question 3',
            items: ['How', 'do', 'you', 'know', 'each', 'other?'],
          },
          {
            id: 'q4',
            kind: 'ordering',
            title: 'question 4',
            items: ['What', 'are', 'you', 'doing', 'tonight?'],
          },
        ],
      },
    },
    {
      type: 'pages',
      images: [img(10, 'Who are you?', 'People in a caf\u00e9 meeting and chatting'), img(11, 'Present simple and present continuous', 'Grammar box with examples')],
    },
  ],
}

// ===========================================================================
// 1B Good people
// ===========================================================================

const lesson1B: Lesson = {
  id: '1b',
  code: '1B',
  title: 'Good people',
  subtitle: 'Jobs \u2022 Verb patterns \u2022 Read a news story',
  pages: [10, 11],
  labels: {
    grammar: 'verb patterns',
    vocabulary: 'jobs',
    pronunciation: 'syllable stress',
  },
  objectives: [
    'talk about jobs and work',
    'use verb patterns (verb + -ing / verb + to + infinitive)',
    'invent a news story',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 1B',
      tone: 'info',
      text: "Good people \u2013 read a news article about a woman with an unusual job and invent your own news story.",
    },
    {
      type: 'vocab',
      title: 'jobs',
      items: [
        { word: 'a chef', meaning: 'a person who cooks in a restaurant', example: 'A chef is responsible for planning the menu and creating new dishes.' },
        { word: 'a mechanic', meaning: 'a person who repairs cars and machines', example: 'My cousin is a mechanic; he repairs cars in a garage.' },
        { word: 'a financial consultant', meaning: 'a person who gives advice about money', example: 'You need to speak to a financial consultant about your money.' },
        { word: 'a journalist', meaning: 'a person who writes news articles', example: 'A journalist writes about news and people for a newspaper or magazine.' },
        { word: 'a builder', meaning: 'a person who builds houses and other buildings', example: 'The builders put up a new school in six months.' },
        { word: 'a volunteer', meaning: 'a person who works without being paid', example: 'She worked as a volunteer in a hospital before becoming a doctor.' },
      ],
      source: 'Vocabulary Bank 1B, page 128',
    },
    {
      type: 'grammar',
      title: 'verb patterns',
      explanation:
        'Some verbs are followed by the -ing form, and other verbs are followed by the to + infinitive. We also use verb + preposition + -ing and verb + to + -ing.',
      rule:
        "verb + -ing: enjoy, love, like, hate, finish, spend time, suggest (I enjoy working with people.); verb + to + infinitive: want, need, decide, hope, agree, offer (She decided to give the food away.); verb + preposition + -ing: be interested in, good at, stop someone from (He was interested in growing his own food.); verb + object + to + infinitive: ask, want, need (We asked them to help.).",
      table: {
        headers: ['Pattern', 'Examples'],
        rows: [
          { label: 'verb + -ing', values: ['I love volunteering in my free time.', 'They finished building the bridge last year.'] },
          { label: 'verb + to + infinitive', values: ["She decided to become a chef.", 'We hope to see our idea catch on.'] },
          { label: 'verb + preposition + -ing', values: ["He's interested in doing new things.", "I'm good at solving problems."] },
          { label: 'verb + object + to + infinitive', values: ['They asked me to help.', 'She wanted her children to have a good education.'] },
        ],
      },
      examples: [
        "We decided to give them away, like the man in Los Angeles.",
        'She agreed to meet people who wanted to help.',
        'Education is the other important part of the programme.',
      ],
      bankPage: 11,
    },
    {
      type: 'audio',
      title: 'Syllable stress',
      tracks: au(['VB 1.01', 'VB 1.02']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1b-patterns',
        title: 'Choose the correct form',
        kind: 'mcq',
        instructions: 'Choose the correct verb pattern.',
        page: 11,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: "She decided \u2026 a plumbing course.",
            options: [
              { label: 'to do', correct: true },
              { label: 'doing' },
              { label: 'do' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'He hopes \u2026 a chef.',
            options: [
              { label: 'to become', correct: true },
              { label: 'becoming' },
              { label: 'become' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'I enjoy \u2026 with my colleagues.',
            options: [
              { label: 'to work' },
              { label: 'working', correct: true },
              { label: 'work' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'We need \u2026 more fruit and vegetables.',
            options: [
              { label: 'to eat', correct: true },
              { label: 'eating' },
              { label: 'eat' },
            ],
          },
          {
            id: 'q5',
            kind: 'mcq',
            prompt: "I'm interested \u2026 learn more about it.",
            options: [
              { label: 'to learn' },
              { label: 'in learning', correct: true },
              { label: 'at learning' },
            ],
          },
          {
            id: 'q6',
            kind: 'mcq',
            prompt: 'She asked me \u2026 the volunteers.',
            options: [
              { label: 'to help', correct: true },
              { label: 'helping' },
              { label: 'help' },
            ],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1b-reading',
        title: 'Read about a woman with an unusual job',
        kind: 'true-false',
        instructions: 'Read the news article about Lou Ridsdale. Are the statements true (T) or false (F)?',
        page: 12,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'Lou Ridsdale grows vegetables in her garden.', correct: true },
          { id: 'q2', kind: 'true-false', statement: 'She got the idea from a man in Los Angeles.', correct: true },
          { id: 'q3', kind: 'true-false', statement: 'People donate food that they pay for.', correct: false },
          { id: 'q4', kind: 'true-false', statement: 'Ridsdale sells the food to people in need.', correct: false },
          { id: 'q5', kind: 'true-false', statement: 'Education is part of the programme.', correct: true },
        ],
      },
    },
    {
      type: 'text',
      title: 'Reading: a news story',
      paragraphs: [
        "In several countries now, benches with the message 'Happy to chat' encourage strangers to sit together and talk. In the same spirit, small 'give and take' street pantries work like a free shop: people leave fruit and vegetables they have grown, and anyone can take what they need. There is no money involved and no one is judged on what they bring.",
        'Lou Ridsdale loves gardening. In a small space next to her home in Ballarat, Australia, she grows vegetables. She heard about a man in Los Angeles who grew food to share with his community, and she decided to do the same. Today, volunteers deliver the food and people help themselves. "Helping people is what I do," she says. "No one is judged on what they bring or take \u2013 only that they leave with a smile."',
      ],
    },
    {
      type: 'audio',
      title: 'Reading audio',
      tracks: au(['R1.01']),
    },
    {
      type: 'pages',
      images: [img(12, 'Good people', 'News story about unusual jobs'), img(13, 'Verb patterns', 'Grammar examples')],
    },
  ],
}

// ===========================================================================
// 1C Let's talk!
// ===========================================================================

const lesson1C: Lesson = {
  id: '1c',
  code: '1C',
  title: "Let's talk!",
  subtitle: 'Conversation topics \u2022 Start, keep going and end a conversation',
  pages: [12, 13],
  labels: {
    grammar: 'conversation skills',
    vocabulary: 'conversation topics',
    pronunciation: 'rhythm and intonation',
  },
  objectives: [
    'start and end a conversation',
    'keep a conversation going',
    'talk about different topics',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 1C',
      tone: 'info',
      text: "Let's talk! Most of us spend part of our day surrounded by strangers \u2013 on a bench in the park, in a caf\u00e9, at a bus stop. How do we start a conversation and keep it going?",
    },
    {
      type: 'text',
      title: 'Happy to chat benches',
      paragraphs: [
        'When Allison Owen-Jones saw a man sitting alone on a bench in the park, she wanted to talk to him but she felt uncomfortable because she wasn\u2019t sure he would want to chat. Then she had an idea: "Happy to chat" benches. She made a sign saying, "Happy to chat. Sit here if you don\u2019t mind someone stopping to say hello." The idea was a success. Now "Happy to chat" benches can be found in several countries including Canada, the USA, Australia, Switzerland and Ukraine.',
        'So, the next time you see someone sitting alone, give them a smile and say hello. You never know: they might be happy to talk.',
      ],
    },
    {
      type: 'vocab',
      title: 'conversation topics',
      items: [
        { word: 'the weather', response: "Lovely day, isn't it?" },
        { word: 'clothes and fashion', response: "That's a nice jacket. Where did you get it?" },
        { word: 'work or studies', response: 'What do you do? / Do you enjoy your studies?' },
        { word: 'sport or music', response: 'Did you see the game last night?' },
        { word: 'the news', response: "Did you hear about the fire in town? It's terrible." },
        { word: 'holidays', response: 'Have you got any plans for the summer?' },
      ],
      source: 'Conversation topics',
    },
    {
      type: 'examples',
      title: 'Starting, keeping and ending a conversation',
      items: [
        'Starting: Excuse me, is anyone sitting here? / Do you mind if I charge my phone here?',
        'Keeping it going: How about you? / Really? / What do you think? / Oh no, that\u2019s a shame.',
        'Ending: It was nice talking to you. / I\u2019ve got to go. / See you later!',
      ],
    },
    {
      type: 'audio',
      title: 'Conversation phrases: rhythm and intonation',
      tracks: au(['1.02', '1.03']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1c-matching',
        title: 'Match the phrases to their use',
        kind: 'matching',
        instructions: 'Match the phrases with what they do: a) starting, b) keeping the conversation going, c) ending.',
        page: 14,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'matching',
            pairs: [
              { left: "Excuse me, is anyone sitting here?", right: 'starting a conversation' },
              { left: 'How about you?', right: 'asking the other person to keep going' },
              { left: "It's been nice talking to you.", right: 'ending a conversation' },
              { left: "That's a nice jacket. Where did you get it?", right: 'commenting on someone\u2019s clothes' },
              { left: "I've got to go.", right: 'saying you must leave' },
              { left: "What do you think?", right: 'asking for an opinion' },
            ],
          },
        ],
      },
    },
    {
      type: 'pages',
      images: [img(14, "Let's talk!", 'Happy to chat bench and people talking'), img(15, 'Rhythm and intonation', 'Conversation phrases')],
    },
  ],
}

// ===========================================================================
// 1D Lifestyle
// ===========================================================================

const lesson1D: Lesson = {
  id: '1d',
  code: '1D',
  title: 'Lifestyle',
  subtitle: 'BBC Street Interviews \u2022 Modifiers',
  pages: [14, 15],
  labels: {
    grammar: 'modifiers',
    vocabulary: 'lifestyle',
    pronunciation: 'street interviews',
  },
  objectives: [
    'understand people talking about their lifestyles',
    'talk about your lifestyle using modifiers',
    'write a blog post about a day in your life',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 1D',
      tone: 'info',
      text: "Lifestyle \u2013 in the BBC Street Interviews, people are asked: How would you describe your lifestyle? and Is there anything you would like to change?",
    },
    {
      type: 'audio',
      title: 'BBC Street Interviews: lifestyle',
      tracks: au(['1.04']),
    },
    {
      type: 'video',
      title: 'BBC Street Interviews: lifestyle',
      videos: [
        { title: 'BBC Street Interviews: lifestyle', file: 'SO3 B1 U1 BBC StreetInt.mp4', page: 15 },
      ],
    },
    {
      type: 'grammar',
      title: 'modifiers',
      explanation:
        'We use modifiers before adjectives and adverbs to make the meaning stronger or weaker. We also use them before comparatives like more and less.',
      rule:
        'weaker: quite, fairly, relatively, a bit + adjective (My lifestyle is quite normal.); stronger: really, very, a lot + adjective (It\u2019s a really busy week.); a bit / a lot + comparative (I want to travel a bit more. / We do a lot more exercise.).',
      table: {
        headers: ['Strengthener', 'Use'],
        rows: [
          { label: 'quite / fairly / relatively', values: ['weaker meaning', "I would describe my lifestyle as quite normal.", "My lifestyle is relatively normal and conservative."] },
          { label: 'really / very / a lot', values: ['stronger meaning', "I'm doing a lot of studying for university.", 'It was a really busy week.'] },
          { label: 'a bit + comparative', values: ['small change', 'I want to travel a bit more.'] },
          { label: 'a lot + comparative', values: ['large change', 'We want to do a lot more exercise.'] },
        ],
      },
      examples: [
        "I would describe my lifestyle as quite normal.",
        "I've got a pretty busy life at the moment.",
        "My lifestyle is relatively normal and conservative.",
        "I'm doing quite a lot of studying for university right now.",
        "iat least I want to travel a bit more.",
      ],
      bankPage: 15,
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1d-modifiers',
        title: 'Choose the correct modifier',
        kind: 'mcq',
        instructions: 'Choose the correct modifier.',
        page: 15,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: "I would describe my lifestyle as \u2026 normal.",
            options: [
              { label: 'quite', correct: true },
              { label: 'always' },
              { label: 'never' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: "I've got \u2026 a lot of studying for university.",
            options: [
              { label: 'doing', correct: true },
              { label: 'to do' },
              { label: 'do' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'I want to travel \u2026 more.',
            options: [
              { label: 'a bit', correct: true },
              { label: 'quite' },
              { label: 'too' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'My life is \u2026 normal and conservative.',
            options: [
              { label: 'a lot' },
              { label: 'relatively', correct: true },
              { label: 'really' },
            ],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-1d-video',
        title: 'BBC Street Interviews: lifestyle',
        kind: 'true-false',
        instructions: 'Watch the interviews again. Are the statements true (T) or false (F)?',
        page: 14,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'One speaker would like to go for a run every day.', correct: false },
          { id: 'q2', kind: 'true-false', statement: 'One speaker would like to visit different places.', correct: true },
          { id: 'q3', kind: 'true-false', statement: 'One speaker would like to spend more money.', correct: false },
          { id: 'q4', kind: 'true-false', statement: 'Almost all the speakers say their lifestyle is quite normal.', correct: true },
          { id: 'q5', kind: 'true-false', statement: 'One speaker would like to have more time to themselves.', correct: true },
        ],
      },
    },
    {
      type: 'text',
      title: 'Writing: a blog post about a day in your life',
      paragraphs: [
        'Write a blog post about a day in your life. Start with a strong first sentence to interest the reader. Describe what you do in the morning, during the day and in the eveningcars. Use adverbs of frequency (always, usually, sometimes, hardly ever, never) and modifiers (quite, really, a bit) to make your description more interesting. End by inviting your readers to share something about their day.',
      ],
    },
    {
      type: 'pages',
      images: [img(16, 'Lifestyle', 'BBC Street Interviews about lifestyle'), img(17, 'Writing a blog post', 'Model blog post about a day in your life')],
    },
  ],
}

// ===========================================================================
// Unit 1 Review
// ===========================================================================

const lesson1Review: Lesson = {
  id: '1r',
  code: 'Review',
  title: 'Unit 1 Review',
  subtitle: 'Present simple and continuous \u2022 Verb patterns \u2022 Conversation',
  pages: [16, 16],
  labels: {
    grammar: 'review',
    vocabulary: 'review',
    pronunciation: 'review',
  },
  objectives: ['revise the vocabulary and grammar of Unit 1', 'check your progress'],
  blocks: [
    {
      type: 'review',
      title: 'Unit 1 Review',
      text: 'Complete the tasks to recycle the grammar and vocabulary from Unit 1: present simple and present continuous, state verbs, adverbs of frequency, verb patterns and modifiers. Then do the "Common errors" activity to check the details you often confuse.',
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-review-common',
        title: 'Common errors',
        kind: 'true-false',
        instructions: 'Decide which sentences are correct and which contain mistakes.',
        page: 16,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: "My sister doesn't like football.", correct: true },
          { id: 'q2', kind: 'true-false', statement: "What you studying at university?", correct: false },
          { id: 'q3', kind: 'true-false', statement: "I'm from France.", correct: true },
          { id: 'q4', kind: 'true-false', statement: 'I live here since 2018.', correct: false },
          { id: 'q5', kind: 'true-false', statement: 'She has worked in several cities.', correct: true },
          { id: 'q6', kind: 'true-false', statement: "Inot working when she arrived.", correct: false },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u1-review-vocab',
        title: 'Jobs and relationships',
        kind: 'matching',
        instructions: 'Match the words to their meanings.',
        page: 16,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'matching',
            pairs: [
              { left: 'a colleague', right: 'a person you work with' },
              { left: 'a close friend', right: 'a friend you know very well' },
              { left: 'a grandparent', right: 'your mother\u2019s or father\u2019s parent' },
              { left: 'a chef', right: 'a person who cooks in a restaurant' },
            ],
          },
        ],
      },
    },
    {
      type: 'review',
      title: "How to\u2026 check your progress",
      text: "Do the Unit 1 Review now. When you finish, check: Can I talk about the people and activities in my life? Can I use verb patterns correctly? Can I start and keep a conversation going? Can I describe my lifestyle? If not, review the Grammar Bank on page 104\u2013105 and the Vocabulary Bank on page 128.",
    },
  ],
}


export const unit01: Unit = {
  id: 'unit-1',
  number: 1,
  title: 'People',
  phrase: "talk about the people and activities in your life; talk about jobs and work; start and keep a conversation going; talk about your lifestyle",
  overviewPage: 6,
  pages: [6, 16],
  intro:
    "In this unit you learn to talk about the people and activities in your life, describe people and jobs, keep a conversation going and talk about your lifestyle. You watch BBC Street Interviews and a BBC Vlog, listen to people talking about their lives and write a personal profile and a blog post about a day in your life.",
  objectives: [
    'understand people talking about the people and activities in their life',
    'talk about jobs and work',
    'start, keep going and end a conversation',
    'talk about your lifestyle',
  ],
  video: [
    { title: 'BBC Vlog: How would your friends describe you?', file: 'SO3 B1 U1 BBC Vlogs.mp4', page: 7 },
    { title: 'BBC Street Interviews: lifestyle', file: 'SO3 B1 U1 BBC StreetInt.mp4', page: 15 },
  ],
  lessons: [
    lesson1A,
    lesson1B,
    lesson1C,
    lesson1D,
    lesson1Review,
  ],
}

