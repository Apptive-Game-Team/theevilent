import { magicConcepts, type MagicConcept } from './magicConcepts';

// The lobby reports a magic by its database name ("fire_shot") and its prefab.
// The compendium keys the same magic by `bean` ("fire_shot"). Today the two
// agree, but the match ignores case and separators so "FireShot", "fire-shot"
// and "fire_shot" all land on one entry.
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const conceptsByKey = new Map(magicConcepts.map((magic) => [normalize(magic.bean), magic]));

/** The name is tried first: several magics share a prefab, no two share a name. */
export const findMagicConcept = (name: string, prefab: string | null): MagicConcept | undefined =>
  conceptsByKey.get(normalize(name)) ?? (prefab ? conceptsByKey.get(normalize(prefab)) : undefined);
