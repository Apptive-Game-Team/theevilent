import rawConcepts from './magicConcepts.json';
import rawGameData from './magicGameData.json';
import type { Language } from '../i18n/language';

export type MagicFamily = 'build' | 'drop' | 'explode' | 'shoot' | 'spawn';

export type MagicElement = 'Fire' | 'Lightning' | 'Nature' | 'Rock' | 'Water' | 'Wind';

/**
 * One magic as the compendium shows it. `name` and `description` are copied
 * from the client's own tables — `Magic_ko-KR` for the name and
 * `MagicBook_ko-KR` for the description — so the site says exactly what the
 * in-game magic book says. `description` is empty for the magics that table
 * has no entry for. `faction` is empty where no faction has been decided.
 */
export interface MagicConcept {
  bean: string;
  name: string;
  family: MagicFamily;
  faction: string;
  description: string;
}

export const magicConcepts = rawConcepts as MagicConcept[];

/**
 * What the game itself knows about a magic, keyed by bean. Generated, not
 * hand-written:
 *
 * - `nameEn`: `Magic_en`, joined to the bean through the camelCase key in
 *   `Magic Shared Data` (fire_shot -> fireShot).
 * - `descriptionEn`: `MagicBook_en`, whose keys are the bean itself.
 * - `elements`: WordOnlineDatabase V001 baseline, `prefab_elements` rows of the
 *   magic's prefab; `magics.element` only where the prefab has no row.
 * - `manaCost`: WordOnlineDatabase V002 (`rebalance_mana_by_card_tier`), the
 *   last migration that sets mana_cost.
 *
 * A field is absent where its source has no value. No English name exists for
 * pve_water_slime_nest, rallying_torch and vine_fan (the client tables have no
 * row with that key or Korean name), so those three show the Korean name in
 * English too. Ten beans have no `magics` row at all (the four slime nests other
 * than fire, pve_water_slime_nest, fire_drop, nature_drop, wind_drop,
 * rallying_torch, vine_fan) and so carry neither element nor mana cost.
 */
export interface MagicGameData {
  nameEn?: string;
  descriptionEn?: string;
  elements?: MagicElement[];
  manaCost?: number;
}

const magicGameData = rawGameData as Record<string, MagicGameData>;

export const getMagicGameData = (bean: string): MagicGameData => magicGameData[bean] ?? {};

export const getMagicName = (magic: MagicConcept, language: Language) =>
  language === 'en' ? getMagicGameData(magic.bean).nameEn ?? magic.name : magic.name;

/** Falls back to the Korean description when `MagicBook_en` has none. */
export const getMagicDescription = (magic: MagicConcept, language: Language) =>
  language === 'en' ? getMagicGameData(magic.bean).descriptionEn ?? magic.description : magic.description;

export const magicElements: MagicElement[] = ['Fire', 'Lightning', 'Nature', 'Rock', 'Water', 'Wind'];

export const magicElementLabels: Record<Language, Record<MagicElement, string>> = {
  ko: { Fire: '불', Lightning: '번개', Nature: '자연', Rock: '바위', Water: '물', Wind: '바람' },
  en: { Fire: 'Fire', Lightning: 'Lightning', Nature: 'Nature', Rock: 'Rock', Water: 'Water', Wind: 'Wind' },
};

export const magicFamilyLabels: Record<MagicFamily, string> = {
  build: '설치',
  drop: '투하',
  explode: '폭발',
  shoot: '투사체',
  spawn: '소환',
};

export const magicFamilyLabelsEn: Record<MagicFamily, string> = {
  build: 'Build',
  drop: 'Drop',
  explode: 'Explosion',
  shoot: 'Projectile',
  spawn: 'Summon',
};

/**
 * English faction names follow the wording `MagicBook_en` already uses
 * ("Hellfire Legion", "rock golem tribe", "human magic civilization",
 * "dimensional wanderers", "World Tree"). 타락한 정령 has no English wording in
 * the client; "Corrupted Spirits" is this site's rendering until it does.
 */
export const magicFactionLabelsEn: Record<string, string> = {
  '세계수 정령': 'World Tree Spirits',
  '지옥불 군단': 'Hellfire Legion',
  '물 슬라임': 'Water Slimes',
  '돌 골렘 부족': 'Rock Golem Tribe',
  '인간 마법 문명': 'Human Magic Civilization',
  '차원 유랑종': 'Dimensional Wanderers',
  '타락한 정령': 'Corrupted Spirits',
};
