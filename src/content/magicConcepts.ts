import rawConcepts from './magicConcepts.json';

export type MagicFamily = 'build' | 'drop' | 'explode' | 'shoot' | 'spawn';

export interface MagicConcept {
  bean: string;
  korean: string;
  concept_name: string;
  family: MagicFamily;
  concept_description: string;
  mobility: string;
  combat_role: string;
  targeting: string;
  attack_shape: string;
  lifecycle: string;
  special_movement: string;
  faction: string;
  art_rule: string;
  behavior: string[];
}

export const magicConcepts = rawConcepts as MagicConcept[];

export const magicFamilyLabels: Record<MagicFamily, string> = {
  build: '설치',
  drop: '투하',
  explode: '범위 폭발',
  shoot: '투사체',
  spawn: '소환',
};
