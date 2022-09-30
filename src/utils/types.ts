export type GrandCompany = "흑와단" | "쌍사당" | "불멸대";

export type FreeCompany = { name: string, abbr: string }

export type Race = ({ race: "휴런", subrace: "중원 부족" | "고원 부족" } | { race: "미코테", subrace: "태양의 추종자" | "달의 수호자" } | { race: "라라펠", subrace: "평원 부족" | "사막 부족" } | { race: "엘레젠", subrace: "숲 부족" | "황혼 부족" } | { race: "루가딘", subrace: "바다늑대" | "불꽃지킴이" } | { race: "아우라", subrace: "렌" | "젤라" } | { race: "비에라", subrace: "라바 비에라" | "비나 비에라" } | { race: "로스갈", subrace: "맴도는 별" | "떠도는 별" }) & { gender: "여" | "남" };

export type Status = "멘토" | "전투 멘토" | "제작 채집 멘토" | "PVP 멘토" | "새싹" | "복귀자";

export type AccessTime = "아침" | "오전" | "오후" | "저녁" | "새벽";

export type Content = "레벨링" | "극만신" | "영식" | "절" | "PVP" | "딥 던전" | "고대무기" | "채집" | "제작" | "터주" | "하우징" | "스크린샷" | "청마도사" | "골드소서";

export type TankJob = "나이트" | "전사" | "암흑기사" | "건브레이커";
export type HealerJob = "백마도사" | "학자" | "점성술사" | "현자";
export type MeleeJob = "몽크" | "용기사" | "닌자" | "사무라이" | "리퍼";
export type RangedJob = "음유시인" | "기공사" | "무도가";
export type CasterJob = "흑마도사" | "소환사" | "적마도사" | "청마도사";
export type DPSJob = RangedJob | MeleeJob | CasterJob;
export type BattleJob = TankJob | HealerJob | DPSJob;

export type CraftingJob = "목수" | "대장장이" | "갑주제작사" | "보석공예가" | "가죽공예가" | "재봉사" | "연금술사" | "요리사";
export type GatheringJob = "광부" | "원예가" | "어부";
export type TradeJob = CraftingJob | GatheringJob;

export type Job = BattleJob | TradeJob;

export type JobMarkers = {
  main: BattleJob[],
  specialist: CraftingJob[],
}

export type Theme = "light";

export type JobMarkerVariant = "icon" | "text";

export type Frame = "elegant" | "simple";

export type Gradient = "ivory" | "gray";

export type SheetInfo = {
  name: string,
  server: string,
  grandcompany?: GrandCompany,
  freecompany?: FreeCompany
  status?: Status,
  race?: Race,
  accesstimes: AccessTime[],
  favcontents: Content[],
  levels: Partial<Record<Job, number>>,
  markers: JobMarkers,
  description: string,
}

export type SheetConfig = {
  theme: Theme,
  markervariant: JobMarkerVariant,
  frame?: Frame,
  gradient?: Gradient,
  watermarkColor: number,
  highlightColor: number,
  markerColor: number,
}
