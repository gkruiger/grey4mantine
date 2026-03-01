import { ChapterPart, Action, Chapter, VisibleChapterPart } from "../Types/types"
import Data from "./GameData"

interface GameState {
  currentChapterId: string
  log: string[]
}

export default class GameEngine {
  private chapters: Chapter[]
  private state: GameState

  constructor() {
    this.chapters = Data
    this.state = {
      currentChapterId: this.chapters[0].id,
      log: ['start']
    }
  }

  getState(): GameState {
    return {
      currentChapterId: this.state.currentChapterId,
      log: Array.from(this.state.log),
    }
  }

  setCurrentChapter(id: string): void {
    this.state.currentChapterId = id
  }

  getCurrentChapterName(): string {
    return this.getCurrentChapter.name
  }

  getCurrentChapter(): Chapter {
    let currentChapter = this.chapters.find(chapter => chapter.id == this.state.currentChapterId)
    if(currentChapter === undefined) throw Error(`Can't find chapter by id ${this.state.currentChapterId}`)
    return currentChapter
  }

  getChapterPart(id: string): ChapterPart {
    let chapterPart = this.getCurrentChapter().parts.find(chapterPart => chapterPart.id === id)
    if(chapterPart === undefined) throw Error(`Can't find chapter part by id ${id}`)
    return chapterPart
  }

  getVisibleContent(): VisibleChapterPart[] {
    let visibleContent: VisibleChapterPart[] = []

    let currentChapter: Chapter = this.getCurrentChapter()

    // Adding chapterparts
    for(let i=1; i<=this.state.log.length; i++) {
      let logSlice = this.state.log.slice(0, i)

      for(let chapterPart of currentChapter.parts) {
        if(
          (chapterPart.requires && chapterPart.requires.every(requirement => logSlice.includes(requirement))) &&
          !visibleContent.some(part => part.id == chapterPart.id)
        ) {
          visibleContent.push({
            id: chapterPart.id,
            title: chapterPart.title,
            content: [...chapterPart.content.filter(content => content.type == 'text')]
          })
        }        
      }
    }

    // Add actions to the chapterparts
    for(let i=1; i<=this.state.log.length; i++) {
      let logSlice = this.state.log.slice(0, i)

      for(let chapterPart of visibleContent) {
        let possibleActions = this.getChapterPart(chapterPart.id).content.filter(content => content.type === 'action').map(content => content.action)

        for(let possibleAction of possibleActions) {
          if(
            (possibleAction.requires && possibleAction.requires.every(requirement => logSlice.includes(requirement))) &&
            !this.state.log.includes(possibleAction.id) &&
            !chapterPart.content.some(content => content.type === 'action' && content.action.id === possibleAction.id)
          ) {
            chapterPart.content.push({
              type: 'action',
              action: {
                id: possibleAction.id,
                label: possibleAction.label
              }
            })
          }
        }
      }
    }

    // Add actions to the chapterparts
    for(let logItem of this.state.log) {
      for(let chapterPart of visibleContent) {
        let possibleActions = this.getChapterPart(chapterPart.id).content.filter(content => content.type === 'action').map(content => content.action)

        for(let possibleAction of possibleActions) {
          if(possibleAction.id === logItem && possibleAction.resultText) {
            chapterPart.content.push({
              type: 'text',
              text: possibleAction.resultText
            })
          }
        }
      }
    }

    return visibleContent
  }

  performAction(actionId: string): void {
    this.state.log.push(actionId)
  }

  solvePuzzle(puzzleIs: string): void {
    this.state.log.push(puzzleIs)
  }
  
}