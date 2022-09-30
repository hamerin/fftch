import accesstime0 from "../images/accesstimes/0.png";
import accesstime1 from "../images/accesstimes/1.png";
import accesstime2 from "../images/accesstimes/2.png";
import accesstime3 from "../images/accesstimes/3.png";
import accesstime4 from "../images/accesstimes/4.png";
import content00 from "../images/contents/00.png";
import content01 from "../images/contents/01.png";
import content02 from "../images/contents/02.png";
import content03 from "../images/contents/03.png";
import content04 from "../images/contents/04.png";
import content05 from "../images/contents/05.png";
import content06 from "../images/contents/06.png";
import content07 from "../images/contents/07.png";
import content08 from "../images/contents/08.png";
import content09 from "../images/contents/09.png";
import content10 from "../images/contents/10.png";
import content11 from "../images/contents/11.png";
import content12 from "../images/contents/12.png";
import content13 from "../images/contents/13.png";
import frame1 from "../images/frames/1.png";
import frame2 from "../images/frames/2.png";
import gradient0 from "../images/gradients/0.png";
import gradient1 from "../images/gradients/1.png";
import grandcompany0 from "../images/grandcompanies/0.png";
import grandcompany1 from "../images/grandcompanies/1.png";
import grandcompany2 from "../images/grandcompanies/2.png";
import marker0 from "../images/markers/0.png";
import marker1 from "../images/markers/1.png";
import marker2 from "../images/markers/2.png";
import status0 from "../images/statuses/0.png";
import status1 from "../images/statuses/1.png";
import status2 from "../images/statuses/2.png";
import status3 from "../images/statuses/3.png";
import status4 from "../images/statuses/4.png";
import status5 from "../images/statuses/5.png";
import { AccessTime, BattleJob, CasterJob, Content, CraftingJob, Frame, GatheringJob, Gradient, GrandCompany, HealerJob, Job, JobMarkers, MeleeJob, RangedJob, Status, TankJob } from "./types";

export const frameImageRecord: Record<Frame, string> = {
  "elegant": frame1,
  "simple": frame2,
};

export const accessTimeImageRecord: Record<AccessTime, string> = {
  "아침": accesstime0,
  "오전": accesstime1,
  "오후": accesstime2,
  "저녁": accesstime3,
  "새벽": accesstime4,
};

export const contentImageRecord: Record<Content, string> = {
  "레벨링": content00,
  "극만신": content01,
  "영식": content02,
  "절": content03,
  "PVP": content04,
  "딥 던전": content05,
  "고대무기": content06,
  "채집": content07,
  "제작": content08,
  "터주": content09,
  "하우징": content10,
  "스크린샷": content11,
  "청마도사": content12,
  "골드소서": content13,
};

export const statusImageRecord: Record<Status, string> = {
  "멘토": status0,
  "전투 멘토": status1,
  "제작 채집 멘토": status2,
  "PVP 멘토": status3,
  "새싹": status4,
  "복귀자": status5,
};

export const grandCompanyImageRecord: Record<GrandCompany, string> = {
  "흑와단": grandcompany0,
  "쌍사당": grandcompany1,
  "불멸대": grandcompany2,
};

export const gradientImageRecord: Record<Gradient, string> = {
  "ivory": gradient0,
  "gray": gradient1,
};

export const jobMarkerImageRecord: Record<BattleJob | CraftingJob, string> = {
  "나이트": marker2,
  "전사": marker2,
  "암흑기사": marker2,
  "건브레이커": marker2,
  "백마도사": marker0,
  "학자": marker0,
  "점성술사": marker0,
  "현자": marker0,
  "몽크": marker2,
  "용기사": marker2,
  "닌자": marker2,
  "사무라이": marker2,
  "리퍼": marker2,
  "음유시인": marker2,
  "기공사": marker2,
  "무도가": marker2,
  "흑마도사": marker0,
  "소환사": marker0,
  "적마도사": marker0,
  "청마도사": marker0,
  "목수": marker2,
  "대장장이": marker2,
  "갑주제작사": marker2,
  "보석공예가": marker1,
  "가죽공예가": marker1,
  "재봉사": marker1,
  "연금술사": marker1,
  "요리사": marker1,
};

export const levelPositionX: Record<Job, number> = {
  "나이트": 133.77,
  "전사": 180.39,
  "암흑기사": 226.35,
  "건브레이커": 271.80,
  "백마도사": 326.25,
  "학자": 368.21,
  "점성술사": 417.16,
  "현자": 467.12,
  "몽크": 136.22,
  "용기사": 179.57,
  "닌자": 223.54,
  "사무라이": 271.02,
  "리퍼": 319.48,
  "음유시인": 381.46,
  "기공사": 424.43,
  "무도가": 468.40,
  "흑마도사": 529.56,
  "소환사": 575.56,
  "적마도사": 616.56,
  "청마도사": 657.06,
  "목수": 135.06,
  "대장장이": 181.39,
  "갑주제작사": 226.35,
  "보석공예가": 270.80,
  "가죽공예가": 314.25,
  "재봉사": 359.21,
  "연금술사": 404.16,
  "요리사": 450.12,
  "광부": 511.26,
  "원예가": 555.24,
  "어부": 599.23,
};

export const levelPositionY: Record<Job, number> = {
  "나이트": 587.05,
  "전사": 587.05,
  "암흑기사": 587.05,
  "건브레이커": 587.05,
  "백마도사": 587.05,
  "학자": 587.05,
  "점성술사": 587.05,
  "현자": 587.05,
  "몽크": 665.76,
  "용기사": 665.76,
  "닌자": 665.76,
  "사무라이": 665.76,
  "리퍼": 665.76,
  "음유시인": 665.76,
  "기공사": 665.76,
  "무도가": 665.76,
  "흑마도사": 665.76,
  "소환사": 665.76,
  "적마도사": 665.76,
  "청마도사": 665.76,
  "목수": 784.60,
  "대장장이": 784.60,
  "갑주제작사": 784.60,
  "보석공예가": 784.60,
  "가죽공예가": 784.60,
  "재봉사": 784.60,
  "연금술사": 784.60,
  "요리사": 784.60,
  "광부": 784.60,
  "원예가": 784.60,
  "어부": 784.60,
};

export const allGrandCompanies: GrandCompany[] = [
  "흑와단", "쌍사당", "불멸대"
];

export const allStatuses: Status[] = [
  "멘토", "전투 멘토", "제작 채집 멘토", "PVP 멘토", "새싹", "복귀자"
];

export const allAccessTimes: AccessTime[] = [
  "아침", "오전", "오후", "저녁", "새벽"
];

export const allContents: Content[] = [
  "레벨링", "극만신", "영식", "절", "PVP", "딥 던전", "고대무기", "채집", "제작", "터주", "하우징", "스크린샷", "청마도사", "골드소서"
];

export const allTankJobs: TankJob[] = [
  "나이트", "전사", "암흑기사", "건브레이커"
];

export const allHealerJobs: HealerJob[] = [
  "백마도사", "학자", "점성술사", "현자"
];

export const allMeleeJobs: MeleeJob[] = [
  "몽크", "용기사", "닌자", "사무라이", "리퍼"
];

export const allRangedJobs: RangedJob[] = [
  "음유시인", "기공사", "무도가"
];

export const allCasterJobs: CasterJob[] = [
  "흑마도사", "소환사", "적마도사", "청마도사"
];

export const allCraftingJobs: CraftingJob[] = [
  "목수", "대장장이", "갑주제작사", "보석공예가", "가죽공예가", "재봉사", "연금술사", "요리사"
];

export const allGatheringJobs: GatheringJob[] = [
  "광부", "원예가", "어부"
];

export const allRaceStrings: string[] = [
  "휴런 | 중원 부족 | 여",
  "휴런 | 중원 부족 | 남",
  "휴런 | 고원 부족 | 여",
  "휴런 | 고원 부족 | 남",
  "미코테 | 태양의 추종자 | 여",
  "미코테 | 태양의 추종자 | 남",
  "미코테 | 달의 수호자 | 여",
  "미코테 | 달의 수호자 | 남",
  "라라펠 | 평원 부족 | 여",
  "라라펠 | 평원 부족 | 남",
  "라라펠 | 사막 부족 | 여",
  "라라펠 | 사막 부족 | 남",
  "엘레젠 | 숲 부족 | 여",
  "엘레젠 | 숲 부족 | 남",
  "엘레젠 | 황혼 부족 | 여",
  "엘레젠 | 황혼 부족 | 남",
  "루가딘 | 바다늑대 | 여",
  "루가딘 | 바다늑대 | 남",
  "루가딘 | 불꽃지킴이 | 여",
  "루가딘 | 불꽃지킴이 | 남",
  "아우라 | 렌 | 여",
  "아우라 | 렌 | 남",
  "아우라 | 젤라 | 여",
  "아우라 | 젤라 | 남",
  "비에라 | 라바 비에라 | 여",
  "비에라 | 라바 비에라 | 남",
  "비에라 | 비나 비에라 | 여",
  "비에라 | 비나 비에라 | 남",
  "로스갈 | 맴도는 별 | 남",
  "로스갈 | 떠도는 별 | 남",
];
