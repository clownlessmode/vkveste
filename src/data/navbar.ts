import getContactData from "./main"

// Convert to async function since we need to fetch contact data
async function navbar() {
  const contactData = await getContactData()

  return {
    main: [
      {
        title: "Квесты",
        link: "/quests",
      },
      {
        title: "Праздники",
        link: "/holidays",
      },
      {
        title: "Сертификат",
        link: "/certificate",
      },
      {
        title: contactData.phoneFormatted,
        link: contactData.phone,
      },
    ],
  }
}

export default navbar
