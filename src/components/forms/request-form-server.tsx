import fetchFromStrapi from "@/lib/strapi"

export async function getQuestsData() {
  const response = await fetchFromStrapi("quests", {
    next: {
      tags: ["quests"],
      revalidate: 0,
    },
    cache: "no-store",
  })

  const quests = response.data
  return quests
    .map((quest) => ({
      label: quest.name,
      description: quest.quote,
      type: quest.statistics.type,
      difficulty: quest.statistics.difficulty,
      players: quest.statistics.players,
      background: `http://89.104.69.151:1338${quest.cover.url}`,
      link: `/quest/${quest.slug}`,
      order: quest.order,
    }))
    .sort((a, b) => a.order - b.order)
} 