// استوديو الشادونج — مصادر الفيديوهات.
// - فيديوهات الكتاب (course): ملفات mp4 جوه public/videos/.
// - الكرتون والأفلام: بتشتغل مباشرة من يوتيوب (حط videoId في youtube ولا يلزم أي ملف).
// كل "مشهد" فيه سطر الحوار + معناه بالعربي + التايم اللي يبدأ فيه:
//   scenes: [
//     { time: 2, en: "Oh no! The sofa is gone!", ar: "أوه لأ! الكنبة اختفت!" },
//   ],

export type ShadowKind = 'course' | 'cartoon' | 'movie' | 'series'

export interface ShadowScene {
  en: string
  ar?: string
  /** الثانية اللي يبدأ فيها المشهد */
  time: number
  /** نهاية المشهد (اختياري) — لو مش موجودة، هتاخد بداية المشهد اللي بعده */
  end?: number
}

export interface ShadowClip {
  id: string
  title: string
  kind: ShadowKind
  /** اسم ملف mp4 جوه public/videos/ (لو الفيديو ملف على الموقع) — أو حط youtube بداله */
  file?: string
  /** آي دي فيديو يوتيوب — بيشتغل مباشرة من يوتيوب من غير أي ملفات */
  youtube?: string
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

export function getShadowClip(id: string): ShadowClip | undefined {
  return SHADOWING_CLIPS.find((c) => c.id === id)
}

// ---------------------------------------------------------------------------
// بلاي ليست: Hotel Transylvania 2012 (Full movie in English)
// الفيلم مقسّم على يوتيوب لأجزاء متسلسلة — بيشتغلوا مباشرة من يوتيوب.
// ---------------------------------------------------------------------------

const HOTEL_PART_IDS = [
  'UJh7XGg5WPE',
  'FwnJZRg3YIg',
  'VkRPTPV6CnE',
  'x9dnal6XHM8',
  'eXQM1-Rn0Yw',
  '2BTYVHxU71s',
  'smH-SUJrdao',
  'ejMY5r_4H6A',
  'CEdYoX8LL9c',
  'hVttGbZV6IE',
  'Q7pheZql5-c',
  'mJC3RpSy8Qs',
  'e-xjM-byUEw',
  'ZWVECwNkbQI',
  'yNS1O7JwQYA',
  'dPqXL3evCrU',
  'gUnKLp-PYVY',
  'cr0gVl2oB68',
  'bDIxfIlAHOg',
  'MV0Jb1O-uCQ',
  'FAtcHGKYGRA',
  '1iQSbugolSY',
  'AEUn6GmaXjc',
  '5XE8fe3Uvh8',
  'D9QZal96bL4',
  'pAuGZ1-38N4',
  'QPsHliB8Rzc',
  'jfuKDdgVLfU',
  'GcNCf1MCk2s',
  '-5VlRlgOH74',
  'Be7TDjgV0e4',
  '9e58Nao2PBw',
  'Ag7elKcgpzw',
  'Do9ecZG-RjQ',
  'WHgWfftXwus',
  'zi1col8xlwg',
  'k9M04elAye4',
  'm--Zk3kkQLs',
  'Ez5nugWbs8M',
  'iZW3kPMp1EU',
  'Md4eL7qpmXo',
  'Org_jcLTgrg',
  'p7EJvuShr7c',
  'NoRp9YoFDt8',
  'z3KiDptEVNE',
  '6DcMxq_5DjU',
  'wWBHxnbZQ5E',
  'tNy2otD_zps',
  'hsbQx24dywI',
  'wMyj0QB-1SU',
] as const

const HOTEL_MOVIE: ShadowClip[] = HOTEL_PART_IDS.map((vid, i) => ({
  id: `ht-part-${String(i + 1).padStart(2, '0')}`,
  title: `Hotel Transylvania 2012 \u00b7 Part ${i + 1}`,
  kind: 'movie',
  youtube: vid,
  source: 'YouTube',
  note: i === 0 ? 'الفيلم كامل مقسّم 50 جزء — ابني الشادونج من هنا' : 'كمل الفيلم من الجزء اللي قبله',
}))

const HOTEL_EXTRAS: ShadowClip[] = [
  {
    id: 'ht-best-scenes',
    title: 'Hotel Transylvania \u00b7 Best Scenes & Funny Moments',
    kind: 'movie',
    youtube: 'zZS3LjBntdk',
    source: 'YouTube',
    note: 'مشاهد قصيرة مختارة — مثالية للشادونج السريع',
  },
  {
    id: 'ht-funny-combo',
    title: 'Hotel Transylvania, Angry Birds, Spider-Man \u00b7 Funny Scenes',
    kind: 'cartoon',
    youtube: 'SR_uIgwpL30',
    source: 'YouTube',
    note: 'مواقف مضحكة من أكتر من كرتون',
  },
  {
    id: 'ht-trailer-1',
    title: 'Hotel Transylvania \u00b7 Official Trailer #1',
    kind: 'movie',
    youtube: '2Ioqovct5Vs',
    source: 'YouTube',
    note: 'إعلان قصير — كلمات مظبوطة وسرعة عادية',
  },
  {
    id: 'ht-trailer-official',
    title: 'Hotel Transylvania \u00b7 Official Trailer',
    kind: 'movie',
    youtube: 'FYgzizpCTKU',
    source: 'YouTube',
  },
  {
    id: 'ht-teaser',
    title: 'Hotel Transylvania \u00b7 Teaser Trailer',
    kind: 'movie',
    youtube: 'C_QPspp2KrM',
    source: 'YouTube',
  },
]

SHADOWING_CLIPS.push(...HOTEL_MOVIE, ...HOTEL_EXTRAS)