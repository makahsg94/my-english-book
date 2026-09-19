// استوديو الشادونج — مصادر الفيديوهات.
// الكرتون والأفلام: بتشتغل مباشرة من يوتيوب (حط videoId في youtube ولا يلزم أي ملف).
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

export const SHADOWING_CLIPS: ShadowClip[] = []

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