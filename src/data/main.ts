import fetchFromStrapi from "@/lib/strapi"

interface StrapiContact {
  data: {
    social: {
      instagram: string
      vkontakte: string
      telegram: string
    }
    phone: string
    email: string
  }
}

function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "").replace(/^8/, "7")
  if (cleaned.length !== 11 || !cleaned.startsWith("7")) return phone
  return `+7 (${cleaned.slice(1, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`
}

async function getContactData() {
  try {
    const response = await fetchFromStrapi<StrapiContact>("contact", {
      next: { tags: ["contact"] },
    })

    return {
      instagram: response.data.social.instagram,
      vkontakte: response.data.social.vkontakte,
      telegram: response.data.social.telegram,
      phone: `tel:${response.data.phone}`,
      phoneFormatted: formatPhoneNumber(response.data.phone),
      email: `${response.data.email}`,
    }
  } catch (error) {
    return {
      phone: "tel:+74822630444",
      email: "mail@vzaperti.com",
    }
  }
}

export default getContactData
