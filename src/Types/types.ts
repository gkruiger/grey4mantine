// Data

export type Chapter = {
  id: string,
  title: string,
  requires: string[],
  parts: ChapterPart[]
}

export type ChapterPart = {
  id: string,
  title: string,
  requires: string[],
  content: ContentBlock[]
}

export type ContentBlock = Text | Action | Puzzle

export type Text = { 
  type: "text", 
  requires: string[],
  text: string 
}

export type Action = { 
  type: 'action', 
  id: string,
  label: string,
  requires: string[],
  dont?: string[],
  resultText?: string,
  changeChapter?: string,
  chapter?: string
}

export type Puzzle = {
  type: 'puzzle', 
  id: string,
  requires: string[],
  resultText: string
}

// State

export type ChapterView = {
  id: string,
  title: string,
  requires: string[],
  revealedAt: number | undefined,
  parts: ChapterPartView[]
}

export type ChapterPartView = {
  id: string,
  title: string,
  requires: string[],
  content: ContentBlockView[]
  revealedAt: number | undefined
}

export type ContentBlockView = TextView | ActionView | PuzzleView

export type TextView = { 
  type: 'text',
  text: string,
  requires: string[],
  revealedAt: number | undefined
}

export type ActionView = { 
  type: 'action',
  id: string,
  label: string,
  requires: string[],
  dont?: string[],
  changeChapter?: string
  revealedAt: number | undefined
  isExecuted: boolean
}

export type PuzzleView = {
  type: 'puzzle',
  id: string,
  requires: string[],
  revealedAt: number | undefined
  isSolved: boolean,
}