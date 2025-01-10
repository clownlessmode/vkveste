import type { Schema, Struct } from "@strapi/strapi"

export interface RequirementsRequirements extends Struct.ComponentSchema {
  collectionName: "components_requirements_requirements"
  info: {
    description: ""
    displayName: "requirements"
  }
  attributes: {
    requirement: Schema.Attribute.Text
  }
}

export interface SchedulingTimegroup extends Struct.ComponentSchema {
  collectionName: "components_scheduling_timegroup"
  info: {
    description: ""
    displayName: "Timegroup"
  }
  attributes: {
    price: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      >
    times: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SchedulingTimeline extends Struct.ComponentSchema {
  collectionName: "components_scheduling_timeline"
  info: {
    description: ""
    displayName: "Timeline"
  }
  attributes: {
    days: Schema.Attribute.JSON &
      Schema.Attribute.CustomField<
        "plugin::multi-select.multi-select",
        [
          "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A",
          "\u0412\u0442\u043E\u0440\u043D\u0438\u043A",
          "\u0421\u0440\u0435\u0434\u0430",
          "\u0427\u0435\u0442\u0432\u0435\u0440\u0433",
          "\u041F\u044F\u0442\u043D\u0438\u0446\u0430",
          "\u0421\u0443\u0431\u0431\u043E\u0442\u0430",
          "\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435",
        ]
      > &
      Schema.Attribute.DefaultTo<"[]">
    timegroups: Schema.Attribute.Component<"scheduling.timegroup", true>
  }
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: "components_shared_seos"
  info: {
    displayName: "SEO"
    icon: "search"
  }
  attributes: {
    canonicalURL: Schema.Attribute.String
    keywords: Schema.Attribute.Text
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required
    metaImage: Schema.Attribute.Media<"images">
    metaRobots: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"index,follow">
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SocialSoczialnyeSeti extends Struct.ComponentSchema {
  collectionName: "components_social_soczialnye_seti"
  info: {
    displayName: "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438"
    icon: "book"
  }
  attributes: {
    instagram: Schema.Attribute.String
    telegram: Schema.Attribute.String
    vkontakte: Schema.Attribute.String
  }
}

export interface StatsQuestStatistics extends Struct.ComponentSchema {
  collectionName: "components_stats_quest_statistics"
  info: {
    displayName: "Quest Statistics"
  }
  attributes: {
    difficulty: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3
          min: 1
        },
        number
      >
    length: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1
        },
        number
      >
    players: Schema.Attribute.String & Schema.Attribute.Required
    playersAllTime: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>
    rating: Schema.Attribute.Component<"stats.rating", false> &
      Schema.Attribute.Required
    type: Schema.Attribute.Enumeration<
      ["key", "sword", "skull", "money", "potion", "hat", "drink"]
    > &
      Schema.Attribute.Required
  }
}

export interface StatsRating extends Struct.ComponentSchema {
  collectionName: "components_stats_rating"
  info: {
    description: ""
    displayName: "Rating"
  }
  attributes: {
    overall: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0
        },
        number
      >
    value: Schema.Attribute.Float &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 100000
          min: 0
        },
        number
      >
  }
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "requirements.requirements": RequirementsRequirements
      "scheduling.timegroup": SchedulingTimegroup
      "scheduling.timeline": SchedulingTimeline
      "seo.seo": SeoSeo
      "social.soczialnye-seti": SocialSoczialnyeSeti
      "stats.quest-statistics": StatsQuestStatistics
      "stats.rating": StatsRating
    }
  }
}
