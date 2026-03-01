import { Chapter } from "../Types/types"

const Data: Chapter[] = [{
  id: 'chapter_i:_the_path',
  title: 'Chapter I: The Parh',
  parts: [{
    id: 'the_mountain',
    title: 'The Mountain',
    requires: ['start'],
    content: [{
      type: 'text', 
      text: `It's been a very nice hike so far. Following an almost faded trail. Around me are mountains covered in trees as far as I can see.`,   
    }, {
      type: 'action', 
      action: {
        id: 'test_a', 
        label: 'Test A', 
        requires: [],
        resultText: 'Resulttest A.'
      }
    }, {
      type: 'action', 
      action: {
        id: 'test_b', 
        label: 'Test B', 
        requires: [],
        resultText: 'Resulttest B.'
      }
    }, {
      type: 'action', 
      action: {
        id: 'follow_trail', 
        label: 'Follow trail', 
        requires: [],
        resultText: 'With every step I take, the sky is getting darker. And fast too. A nasty storm is on its way. I should find some cover.'
      }
    }, {
      type: 'puzzle', 
      puzzle: {
        id: 'tets_ppzzle', 
        requires: ['follow_trail'],
        resultText: 'Oh yeah!.'
      }
    }, {
      type: 'action', 
      action: {
        id: 'find_cover', 
        label: 'Find cover', 
        requires: ['follow_trail'],
        resultText: `After a while I spot a rock formation to the side of the trail, with a small opening I could crawl through.`
      }
    }, {
      type: 'action', 
      action: {
        id: 'crawl_through_opening', 
        label: 'Crawl through opening', 
        requires: ['find_cover'],
      }
    }]
  }, {
    id: 'the_cave',
    title: 'The Cave',
    requires: ['crawl_through_opening'],
    content: [{
      type: 'text', 
      text: `On all fours I enter I enter the small opening. Looking back through the opening I see flashes of light. I can hear the thunder getting closer. This is going to take a while. Better get some rest.`,   
    }, {
      type: 'action', 
      action: {
        id: 'lay_down', 
        label: 'Lay down', 
        requires: [],
        resultText: `I move a few stones to create a nice resting place. Tired of the hike I doze off within a minute or two.`
      }
    }, {
      type: 'action', 
      action: {
        id: 'wake_up', 
        label: 'Wake up', 
        requires: ['lay_down'],
        resultText: `When I wake up, I realize I don't see anyting. Don't hear anything either. Have I slept for too long?`
      }
    }, {
      type: 'action', 
      action: {
        id: 'examine_surroundings', 
        label: 'Examine surroundings', 
        requires: ['wake_up'],
        resultText: `I take my small flashlight out of my backpack and shine it around. I can see a passage leading further inside.`
      }
    }, {
      type: 'action', 
      action: {
        id: 'find_opening', 
        label: 'Find opening', 
        requires: ['examine_surroundings'],
        resultText: `It doesn't take long before I find the opening. However, where there was an opening before, now there are big rocks. Probably the storms doing.`
      }
    }, {
      type: 'action', 
      action: {
        id: 'push_rocks', 
        label: 'Push rocks', 
        requires: ['find_opening'],
        resultText: `Although I know it probably won't work, I try it anyway. And yep: totally useless. I'm not getting out the way I got in.`
      }
    }, {
      type: 'action', 
      action: {
        id: 'follow_passage', 
        label: 'Follow passage', 
        requires: ['examine_surroundings'],
      }
    }]
  }, {
    id: 'the_passage',
    title: 'The Passage',
    requires: ['follow_passage'],
    content: [{
      type: 'text', text: `The passage takes me down a bit and ends in another cave. A much bigger one than the one I slept in. In the middle of the cave is a big structure. What?!`
    }, {
      type: 'action', 
      action: {
        id: 'examine_structure', 
        label: 'Examine structure', 
        requires: ['follow_passage'],
        resultText: `The structure consists of three beams that come together at the top, like a pyramid of some sorts. It's approximately twice my height, I could easily stand in the middle. A pillar about waist high is positioned right in front of it.`
      }
    }, {
      type: 'action', 
      action: {
        id: 'enter_structure', 
        label: 'Enter structure', 
        requires: ['examine_structure'],
        resultText: `I position myself at the center of the structure. Nothing happens. Somehow I expected something more.`
      }
    }, {
      type: 'action', 
      action: {
        id: 'examine_pillar', 
        label: 'Examine pillar', 
        requires: ['examine_structure'],
        resultText: `As soon as I get close to the pillar, a hologram apprears on top.`
      }
    }, {
      type: 'action', 
      action: {
        id: 'follow_passage', 
        label: 'Follow passage', 
        requires: ['examine_surroundings'],
      }
    }]
  }]
}]

export default Data