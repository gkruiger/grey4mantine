export type Chapter = {
  id: string,
  title: string,
  parts: ChapterPart[]
}

export type ChapterPart = {
  id: string,
  title: string,
  requires: string[],
  content: ContentBlock[]
}

export type VisibleChapterPart = {
  id: string,
  title: string,
  content: ContentBlock[]
}

export type ContentBlock =
  | { type: "text", text: string }
  | { type: 'action', action: Action }
  | { type: 'puzzle', puzzle: Puzzle }

export type Action = {
  id: string,
  label: string,
  requires?: string[],
  resultText?: string
}

export type Puzzle = {
  id: string,
  requires: string[],
  resultText: string
}