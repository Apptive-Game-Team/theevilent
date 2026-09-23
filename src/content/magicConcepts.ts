import rawConcepts from './magicConcepts.json';

export type MagicFamily = 'build' | 'drop' | 'explode' | 'shoot' | 'spawn';

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

export const magicFamilyLabels: Record<MagicFamily, string> = {
  build: '설치',
  drop: '투하',
  explode: '폭발',
  shoot: '투사체',
  spawn: '소환',
};
