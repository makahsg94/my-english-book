export interface WritingTask {
  id: string
  unitId: string
  title: string
  prompt: string
  minWords: number
  targets: string[]
  starters: string[]
}

export const WRITING_TASKS: WritingTask[] = [
  {
    id: 'writing-lead-in',
    unitId: 'lead-in',
    title: 'A few words about you',
    prompt:
      'Introduce yourself. Write your name, your country, your favourite colour and some everyday objects you have today. Add one thing you like.',
    minWords: 20,
    targets: ['hello', 'name', 'from', 'country', 'favourite', 'favorite', 'colour', 'color', 'green', 'blue', 'phone', 'bag', 'book'],
    starters: ['My name is\u2026', 'I\u2019m from\u2026', 'My favourite colour is\u2026', 'Today I have\u2026'],
  },
  {
    id: 'writing-unit-1',
    unitId: 'unit-1',
    title: 'My job or studies',
    prompt:
      'Write about what you do every day. Where do you work or study? What do you do? Then make a plan to meet a friend next week.',
    minWords: 40,
    targets: ['work', 'study', 'student', 'teacher', 'job', 'meet', 'weekend', 'coffee', 'like', 'go'],
    starters: ['I work / I study\u2026', 'Every day I\u2026', 'I like\u2026', 'Let\u2019s meet\u2026'],
  },
  {
    id: 'writing-unit-2',
    unitId: 'unit-2',
    title: 'What I eat and do',
    prompt:
      'Write about your food and your day. What do you eat and drink? How often do you do things? What is your favourite meal?',
    minWords: 40,
    targets: ['breakfast', 'lunch', 'dinner', 'coffee', 'bread', 'always', 'usually', 'sometimes', 'never', 'eat', 'drink', 'love'],
    starters: ['For breakfast I usually eat\u2026', 'I love\u2026', 'Sometimes I\u2026', 'At the weekend I\u2026'],
  },
  {
    id: 'writing-unit-3',
    unitId: 'unit-3',
    title: 'My home and my street',
    prompt:
      'Describe your home. Which rooms has it got? What furniture is there? Write two or three sentences about your local area, too.',
    minWords: 45,
    targets: ['house', 'flat', 'apartment', 'bedroom', 'kitchen', 'living room', 'table', 'window', 'neighbourhood', 'street', 'shop'],
    starters: ['I live in\u2026', 'My house has got\u2026', 'In my bedroom there is\u2026', 'Near my home there is\u2026'],
  },
  {
    id: 'writing-unit-4',
    unitId: 'unit-4',
    title: 'A special time',
    prompt:
      'Write about a day in the past that you remember. When was it? Where were you? Who was with you? Add a date or a number.',
    minWords: 45,
    targets: ['was', 'were', 'date', 'year', 'born', 'yesterday', 'school', 'birthday', 'last', 'summer'],
    starters: ['On\u2026 I was\u2026', 'It was\u2026', 'I was at\u2026', 'There were\u2026'],
  },
  {
    id: 'writing-unit-5',
    unitId: 'unit-5',
    title: 'Last weekend',
    prompt:
      'Write what you did last weekend and where you went. Then make an excuse for one thing you did not do.',
    minWords: 45,
    targets: ['went', 'visited', 'played', 'watched', 'walked', 'did', 'because', 'sorry', 'excuse', 'home'],
    starters: ['Last weekend I went\u2026', 'On Saturday I played\u2026', 'I didn\u2019t\u2026 because\u2026', 'Sorry, I\u2026'],
  },
  {
    id: 'writing-unit-6',
    unitId: 'unit-6',
    title: 'What is happening now',
    prompt:
      'Look around you. What are people doing right now? Then write how to get from your home to a place you know \u2013 turn left or turn right?',
    minWords: 45,
    targets: ['watching', 'walking', 'talking', 'reading', 'left', 'right', 'straight', 'turn', 'go', 'stop'],
    starters: ['Right now my mother is\u2026', 'I am\u2026', 'I usually go\u2026', 'It is ten minutes from here.'],
  },
  {
    id: 'writing-unit-7',
    unitId: 'unit-7',
    title: 'My dream job',
    prompt:
      'Write about a job you want to do or a job you know. What do you do in this job? What is good about it? What about volunteer work?',
    minWords: 45,
    targets: ['job', 'work', 'doctor', 'teacher', 'nurse', 'office', 'volunteer', 'help', 'money', 'future'],
    starters: ['I want to be\u2026', 'In this job you\u2026', 'One good thing about this job is\u2026', 'I help\u2026'],
  },
  {
    id: 'writing-unit-8',
    unitId: 'unit-8',
    title: 'A place to visit',
    prompt:
      'Write about a city or a country you want to visit, or a holiday you remember. What can you see and do there? Why do you like it?',
    minWords: 45,
    targets: ['travel', 'beach', 'city', 'hotel', 'summer', 'holiday', 'visit', 'sea', 'tourist', 'museum', 'nice', 'old'],
    starters: ['I want to visit\u2026', 'It is a\u2026', 'You can\u2026', 'I went there\u2026'],
  },
]

export function getWritingTask(unitId: string): WritingTask | undefined {
  return WRITING_TASKS.find((t) => t.unitId === unitId)
}