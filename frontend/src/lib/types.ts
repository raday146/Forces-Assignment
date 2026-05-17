export interface Force {
  id: number;
  name: string;
  forceType: string;
  parentId: number | null;
}

export interface SearchResult {
  id: number;
  name: string;
  forceType: string;
  parentId: number | null;
  path: string[];
}