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
// بلاي ليست: Hotel Transylvania 2 (Full movie in English)
// الجزء الثاني من فيلم Hotel Transylvania — مشاهد مختارة بتشتغل مباشرة من يوتيوب.
// ---------------------------------------------------------------------------

const HOTEL2_CLIPS: ShadowClip[] = [
  {
    id: 'ht2-wedding',
    title: 'Congratulations Mavis and Jonathan · Hotel Transylvania 2',
    kind: 'movie',
    youtube: 'vjwG5a3nzjQ',
    source: 'YouTube',
    note: 'بداية الفيلم — حفل جواز مافيس وجوناثان والفرحة في القلعة',
  },
  {
    id: 'ht2-intros',
    title: 'Wedding Scene · Hotel Transylvania 2',
    kind: 'movie',
    youtube: 'idwFe11xq0E',
    source: 'YouTube',
    note: 'مشهد العرس الكامل — تتهنّى للعروسين من كل شخصية',
  },
  {
    id: 'ht2-gift',
    title: 'The Big Gift · Hotel Transylvania 2',
    kind: 'movie',
    youtube: '4a-qIYMSre4',
    source: 'YouTube',
    note: 'وصول الهدية الكبيرة — مفاجأة دراكولا ومفاجأة لعائلته كمان',
  },
  {
    id: 'ht2-mom-back',
    title: 'Maman! · Hotel Transylvania 2',
    kind: 'movie',
    youtube: 'rNGxMhbbHtM',
    source: 'YouTube',
    note: 'رجوع ماما دراكولا والقواعد الجديدة للخاطفين المزعجين',
  },
  {
    id: 'ht2-mummy',
    title: 'Hotel Transylvania 2 (4/10) · Mummy Mistake',
    kind: 'movie',
    youtube: '7y9stFHCvEY',
    source: 'YouTube',
    note: 'غلطة الموميا — فطيرة الفراولة ومفاجأة مش لطيفة',
  },
  {
    id: 'ht2-camp',
    title: 'Hotel Transylvania 2 (5/10) · Camp Vamp',
    kind: 'movie',
    youtube: 'RkINjKcnVuY',
    source: 'YouTube',
    note: 'يوم تخييم الوحوش (Camp Vamp) — لعبة كرة الغولم الشهيرة',
  },
  {
    id: 'ht2-change',
    title: "Hotel Transylvania 2 (7/10) · You Can't Change Him",
    kind: 'movie',
    youtube: 'oOp7Q_xw94I',
    source: 'YouTube',
    note: 'محاولات دراكولا لتعليم دِنيس يصطاد — بس الحبكة الحقيقية أخطر',
  },
  {
    id: 'ht2-batfight',
    title: 'Hotel Transylvania 2 (9/10) · Family Bat Fight',
    kind: 'movie',
    youtube: 'n1lQR-GjWYw',
    source: 'YouTube',
    note: 'المعركة الجوية الكبيرة بين الوحوش والوباء العصري',
  },
  {
    id: 'ht2-monster',
    title: "Hotel Transylvania 2 (10/10) · I'm in Love With a Monster",
    kind: 'movie',
    youtube: 'D4_CGzg3fmQ',
    source: 'YouTube',
    note: 'نهاية الفيلم — دراكولا يتقبّل دِنيس زي ما هو',
  },
  {
    id: 'ht2-credits',
    title: "Hotel Transylvania 2 · I'm in Love With a Monster (End Credits)",
    kind: 'movie',
    youtube: '1zkI6mn7Mio',
    source: 'YouTube',
    note: 'أغنية النهاية — استمتع بالكلمات وأنت تردد الأغنية معاها',
  },
]

SHADOWING_CLIPS.push(...HOTEL2_CLIPS)