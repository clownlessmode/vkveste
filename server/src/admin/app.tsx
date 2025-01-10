import type { StrapiApp } from "@strapi/strapi/admin"

export default {
  config: {
    locales: ["ru"],
    translations: {
      ru: {
        // ... existing translations ...
        
        // Collection type field translations
        "content-type.fields.bookingStatus": "Статус бронирования",
        "content-type.fields.title": "Заголовок",
        "content-type.fields.createdAt": "Дата создания",
        
        // Collection type name translations
        "content-type.name.singular": "Запись",
        "content-type.name.plural": "Записи",
        
        // Component field translations
        "components.fields.fieldName": "Название поля",
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log(app)
  },
}