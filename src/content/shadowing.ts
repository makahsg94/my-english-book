// استوديو الشادونج — مصادر الفيديوهات.
// الفيديوهات اللي تحت نوعها course موجودة أصلًا في public/videos/ (من حزمة الوسائط بتاعة الكتاب).
// عشان تضيف كرتون أو فيلم: حط ملف mp4 جوه public/videos/، وبعدين ضيف له Clip جوه الليستة تحت.
// كل "مشهد" فيه سطر الحوار + معناه بالعربي + التايم اللي يبدأ فيه:
//   scenes: [
//     { time: 2, en: "Oh no! The sofa is gone!", ar: "أوه لأ! الكنبة اختفت!" },
//     { time: 9, en: "Daddy Pig, is that your tummy?", ar: "بابا بيج، ده بطنك؟" },
//   ],

export type ShadowKind = 'course' | 'cartoon' | 'movie' | 'series'

export interface ShadowScene {
  en: string
  ar?: string
  /** الثانية اللي يبدأ فيها المشهد (بيتكتب إنك تشوف الفيديو، أو انا أحسبها تقريبي) */
  time: number
  /** نهاية المشهد (اختياري) — لو مش موجودة، هتاخد بداية المشهد اللي بعده */
  end?: number
}

export interface ShadowClip {
  id: string
  title: string
  kind: ShadowKind
  /** اسم ملف mp4 جوه public/videos/ */
  file: string
  source: string
  note?: string
  /** مشاهد بتاعة المقطع — كل مشهد له سطر حوار وزر شادونج */
  scenes?: ShadowScene[]
}

export const SHADOWING_CLIPS: ShadowClip[] = [
  {
    id: 'u1-street',
    title: 'Unit 1 \u00b7 Street Interviews',
    kind: 'course',
    file: 'SO3 A2 U1 BBC StreetInt.mp4',
    source: 'BBC Speakout',
    note: 'مقابلات شارع حقيقية — جُمل قصيرة وسرعة طبيعية',
  },
  {
    id: 'u1-vlogs',
    title: 'Unit 1 \u00b7 Vlogs',
    kind: 'course',
    file: 'SO3 A2 U1 BBC Vlogs.mp4',
    source: 'BBC Speakout',
    note: 'المرة الأولى/الأخيرة اللي جربت فيها حاجة جديدة',
  },
  {
    id: 'u2-programmes',
    title: 'Unit 2 \u00b7 Programmes',
    kind: 'course',
    file: 'SO3 A2 U2 BBC Programmes.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u2-vlogs',
    title: 'Unit 2 \u00b7 Vlogs',
    kind: 'course',
    file: 'SO3 A2 U2 BBC Vlogs.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u3-street',
    title: 'Unit 3 \u00b7 Street Interviews',
    kind: 'course',
    file: 'SO3 A2 U3 BBC StreetInt.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u3-vlogs',
    title: 'Unit 3 \u00b7 Vlogs',
    kind: 'course',
    file: 'SO3 A2 U3 BBC Vlogs.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u4-programmes',
    title: 'Unit 4 \u00b7 Programmes',
    kind: 'course',
    file: 'SO3 A2 U4 BBC Programmes.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u4-vlogs',
    title: 'Unit 4 \u00b7 Vlogs',
    kind: 'course',
    file: 'SO3 A2 U4 BBC Vlogs.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u5-street',
    title: 'Unit 5 \u00b7 Street Interviews',
    kind: 'course',
    file: 'SO3 A2 U5 BBC StreetInt.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u5-vlogs',
    title: 'Unit 5 \u00b7 Vlogs',
    kind: 'course',
    file: 'SO3 A2 U5 BBC Vlogs.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u6-programmes',
    title: 'Unit 6 \u00b7 Programmes',
    kind: 'course',
    file: 'SO3 A2 U6 BBC Programmes.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u6-vlogs',
    title: 'Unit 6 \u00b7 Vlogs',
    kind: 'course',
    file: 'SO3 A2 U6 BBC Vlogs (1).mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u7-street',
    title: 'Unit 7 \u00b7 Street Interviews',
    kind: 'course',
    file: 'SO3 A2 U7 BBC StreetInt.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u7-vlogs',
    title: 'Unit 7 \u00b7 Vlogs',
    kind: 'course',
    file: 'SO3 A2 U7 BBC Vlogs.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u8-programmes',
    title: 'Unit 8 \u00b7 Programmes',
    kind: 'course',
    file: 'SO3 A2 U8 BBC Programmes.mp4',
    source: 'BBC Speakout',
  },
  {
    id: 'u8-vlogs',
    title: 'Unit 8 \u00b7 Vlogs',
    kind: 'course',
    file: 'SO3 A2 U8 BBC Vlogs.mp4',
    source: 'BBC Speakout',
  },
]

// مثال جاهز للنسخ و التعديل — إزالة // عشان يشتغل:
// {
//   id: 'peppa-pool',
//   title: 'Peppa Pig \u00b7 At the Pool',
//   kind: 'cartoon',
//   file: 'peppa-pool.mp4',
//   source: 'Cartoon',
//   note: 'حلقات قصيرة مثالية للشادونج',
//   scenes: [
//     { time: 3, en: 'Oh no! The sofa is gone!', ar: 'أوه لأ! الكنبة اختفت!' },
//     { time: 12, en: "Daddy Pig, is that your tummy?", ar: 'بابا بيج، ده بطنك؟' },
//   ],
// },
// {
//   id: 'movie-clip',
//   title: 'Movie \u00b7 Epic Scene',
//   kind: 'movie',
//   file: 'movie-scene.mp4',
//   source: 'Film',
//   scenes: [{ time: 5, en: 'This is where the journey begins.' }],
// },

export function getShadowClip(id: string): ShadowClip | undefined {
  return SHADOWING_CLIPS.find((c) => c.id === id)
}