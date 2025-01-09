import { format, parseISO } from "date-fns"

interface TimeSlot {
  id: string
  time: string
  price: number
}

export interface QuestWithSlots {
  name: string
  id: string
  description: string
  timeSlots: TimeSlot[]
  type: "horror" | "drinking" | "quest"
  difficulty: 1 | 2 | 3
}

interface Quest {
  id: string
  slug: string
  name: string
  quote: string
  statistics: {
    playersAllTime: number
    length: number
    players: string
    type: "horror" | "drinking" | "quest"
    difficulty: 1 | 2 | 3
    rating: {
      value: string
      overall: number
    }
  }
  lore: string
  requirements: string[]
  timelines: {
    days: string[]
    timegroups: {
      times: string[]
      price: number
    }[]
  }[]
}

const testQuests: Quest[] = [
  {
    id: "1",
    slug: "testa",
    name: "Узник подземелья",
    quote: "Настоящая командная игра",
    statistics: {
      playersAllTime: 18388,
      length: 120,
      players: "2-8",
      type: "horror",
      difficulty: 3,
      rating: {
        value: "4.5",
        overall: 5,
      },
    },
    lore: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    requirements: ["18+", "Не страшно"],
    timelines: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        timegroups: [
          {
            times: ["11:00", "16:00"],
            price: 100,
          },
          {
            times: ["20:00"],
            price: 150,
          },
        ],
      },
      {
        days: ["Saturday", "Sunday"],
        timegroups: [
          {
            times: ["12:00", "17:00"],
            price: 200,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    slug: "test",
    name: "Техасская резня бензопилой",
    quote: "Embark on a journey to defeat the mighty dragon.",
    statistics: {
      playersAllTime: 18388,
      length: 120,
      players: "1-4",
      type: "horror",
      difficulty: 3,
      rating: {
        value: "4.5",
        overall: 5,
      },
    },
    lore: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    requirements: ["18+", "Не страшно"],
    timelines: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        timegroups: [
          {
            times: ["13:00", "13:00", "16:00"],
            price: 100,
          },
          {
            times: ["20:00"],
            price: 150,
          },
        ],
      },
      {
        days: ["Saturday", "Sunday"],
        timegroups: [
          {
            times: ["12:00", "17:00"],
            price: 200,
          },
        ],
      },
    ],
  },
]

export default testQuests

function getTimeSlotsForDay(
  quest: Quest,
  dayOfWeek: string
): Promise<TimeSlot[]> {
  const matchingTimeline = quest.timelines.find((timeline) =>
    timeline.days.includes(dayOfWeek)
  )

  if (!matchingTimeline) return Promise.resolve([])

  return Promise.resolve(
    matchingTimeline.timegroups.flatMap((group) =>
      group.times.map((time) => ({
        id: `${time}-${group.price}`,
        time,
        price: group.price,
      }))
    )
  )
}

export async function getQuests() {
  return testQuests
}

export async function getQuest(slug: string) {
  return testQuests.find((quest) => quest.slug === slug)
}

export async function getQuestsForDate(
  date: string
): Promise<QuestWithSlots[]> {
  const dayOfWeek = format(parseISO(date), "eeee")

  const questsWithSlots = await Promise.all(
    testQuests.map(async (quest) => {
      const timeSlots = await getTimeSlotsForDay(quest, dayOfWeek)
      if (timeSlots.length === 0) return null

      return {
        name: quest.name,
        id: quest.id,
        description: quest.lore,
        type: quest.statistics.type,
        difficulty: quest.statistics.difficulty,
        timeSlots,
      }
    })
  )

  return questsWithSlots.filter(
    (quest): quest is QuestWithSlots => quest !== null
  )
}
