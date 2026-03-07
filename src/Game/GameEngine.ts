import { ChapterView, ChapterPartView, ContentBlockView } from "../Types/types"
import Data from "./GameData"

export default class GameEngine {
  private log: string[]
  private view: ChapterView[]
  private currentChapterId: string = ''
  private currentChapterPartId: string = ''

  constructor() {
    this.log = []

    this.view = Data
      .map(chapter=> ({ 
        id: chapter.id,
        title: chapter.title,
        requires: chapter.requires,
        revealedAt: undefined,
        parts: chapter.parts.map(part => ({
          id: part.id,
          title: part.title,
          requires: part.requires,
          revealedAt: undefined,
          content: part.content.flatMap((content): ContentBlockView[] => {
            let returnValue: ContentBlockView[] = []
            switch (content.type) {
              case 'text': 
                returnValue.push({
                  type: content.type,
                  requires: content.requires,
                  text: content.text,
                  revealedAt: undefined,
                })
                break
              case 'action': 
                returnValue.push({
                  id: content.id,
                  type: content.type,
                  label: content.label,
                  requires: content.requires,
                  dont: content.dont,
                  changeChapter: content.changeChapter,
                  revealedAt: undefined,
                  isExecuted: false
                })
                if(content.resultText !== undefined) {
                  returnValue.push({
                    type:'text',
                    requires: [content.id],
                    text: content.resultText,
                    revealedAt: undefined,
                  })
                }
                break
              case 'puzzle': 
                returnValue.push({
                  id: content.id,
                  type: content.type,
                  requires: content.requires,         
                  revealedAt: undefined,
                  isSolved: false
                })
                if(content.resultText !== undefined) {
                  returnValue.push({
                    type:'text',
                    requires: [content.id],
                    text: content.resultText,
                    revealedAt: undefined,
                  })
                }
                break
            }
            return returnValue
          })
        }))
      }))

    // Execute fake first action
    this.performAction('start')
  }

  private getMaxOrderNumber(): number {
    let maxOrderNumber = 0
    
    for(let chapter of this.view) {
      if(chapter.revealedAt != undefined && chapter.revealedAt > maxOrderNumber) maxOrderNumber = chapter.revealedAt
      for(let chapterPart of chapter.parts) {
        if(chapterPart.revealedAt != undefined && chapterPart.revealedAt > maxOrderNumber) maxOrderNumber = chapterPart.revealedAt
        for(let content of chapterPart.content) {
          if(content.revealedAt != undefined && content.revealedAt > maxOrderNumber) maxOrderNumber = content.revealedAt
        }
      }
    }
    
    return maxOrderNumber
  }

  performAction(actionId: string): void {
    this.log.push(actionId)

    for(let chapter of this.view) { 
  
      if(chapter.id == actionId) {
        this.currentChapterId = actionId 
      }
  
      for(let chapterPart of chapter.parts) {
        if(this.meetsRequirements(chapterPart.requires) && chapterPart.revealedAt === undefined) {
          chapterPart.revealedAt = this.getMaxOrderNumber() + 1
          this.currentChapterPartId = chapterPart.id
        }
        
        for(let content of chapterPart.content) {
          switch(content.type) {
            case 'action':
              if(this.meetsRequirements(content.requires) && content.revealedAt === undefined) content.revealedAt = this.getMaxOrderNumber() + 1
              if(this.actionIsTaken(content.id)) content.isExecuted = true
              if(content.dont !== undefined && this.actionsAreTaken(content.dont)) content.isExecuted = true
              if(content.id == actionId && content.changeChapter) this.currentChapterId = content.changeChapter
              break   
            case 'puzzle':
              if(this.meetsRequirements(content.requires) && content.revealedAt === undefined) content.revealedAt = this.getMaxOrderNumber() + 1
              if(this.puzzleIsSolved(content.id)) content.isSolved = true
              break
            case 'text':
              if(this.meetsRequirements(content.requires) && content.revealedAt === undefined) content.revealedAt = this.getMaxOrderNumber() + 1
              break
          }
        }    
      }  
    }

    // Scroll to? Waarnaar? Welke situaties? 
  }

  private meetsRequirements(requirements: string[]): boolean {
    return requirements.every(requirement => this.log.includes(requirement))
  }

  private actionIsTaken(actionId: string): boolean {
    return this.log.includes(actionId)
  }

  private actionsAreTaken(actionIds: string[]): boolean {
    return actionIds.every(actionId => this.actionIsTaken(actionId))    
  }

  private puzzleIsSolved(puzzleId: string): boolean {
    return this.actionIsTaken(puzzleId)
  }

  getCurrentChapterPartId(): string {
    return this.currentChapterPartId
  }

  getCurrentChapterName(): string {
    const chapterName = this.view.find(chapter => chapter.id === this.currentChapterId)?.title
    if(chapterName === undefined) throw Error(`Can't find chapter name based on id ${this.currentChapterId}.`)
    return chapterName
  }

  getVisibleContent(): ChapterPartView[] {
    const relevantChapterParts = this.view.find(chapter => chapter.id == this.currentChapterId)?.parts
    if(relevantChapterParts === undefined) throw Error(`Can't find chapter name based on id ${this.currentChapterId}.`)
    
    const visibleContent = relevantChapterParts
      .filter(chapterPart => chapterPart.revealedAt !== undefined)
      .map(chapterPart => ({
        ...chapterPart,
        content: chapterPart.content
          .filter(content => content.revealedAt !== undefined)
          .sort((a, b) => (a.revealedAt ?? 0) - (b.revealedAt ?? 0))
      }))
    
    return visibleContent
  }
}