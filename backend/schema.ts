import { document } from "@keystone-next/fields-document";
import { list } from "@keystone-next/keystone";
import {
  float,
  image,
  integer,
  password,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-next/keystone/fields";

import { getPositionByAddress } from "./interactions/geo";

export const lists = {
  User: list({
    ui: {
      listView: {
        initialColumns: ["name"],
      },
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        isIndexed: "unique",
        isFilterable: true,
        validation: { isRequired: true },
      }),
      password: password({ validation: { isRequired: true } }),
      institutions: relationship({ ref: "Institution.owner", many: true }),
    },
  }),

  Institution: list({
    fields: {
      owner: relationship({ ref: "User.institutions", many: false }),
      lastUpdated: timestamp({
        db: { updatedAt: true },
        ui: { itemView: { fieldMode: "read" } },
      }),

      name: text({ validation: { isRequired: true } }),
      gender: select({
        type: "enum",
        options: [
          { value: "mixed", label: "geschlechtsgemischt" },
          { value: "f", label: "nur Mädchen" },
          { value: "m", label: "nur Jungen" },
        ],
        validation: { isRequired: true },
      }),
      ageFrom: integer({ validation: { isRequired: true, min: 0 } }),
      ageTo: integer({ validation: { isRequired: true, min: 0 } }),

      placesAvailable: integer({ validation: { isRequired: true, min: 0 } }),
      placesTotal: integer({ validation: { isRequired: true, min: 0 } }),

      street: text({ validation: { isRequired: true } }),
      streetNumber: text({ validation: { isRequired: true } }),
      zip: integer({ validation: { isRequired: true } }),
      city: text({ validation: { isRequired: true } }),
      positionLat: float(),
      positionLng: float(),

      homepage: text(),
      email: text(),
      phone: text(),
      mobilePhone: text(),

      description: document(),

      logo: image(),
      photo: image(),
    },
    hooks: {
      resolveInput: async ({ resolvedData, item }) => {
        // Update position if at least one address field was updated
        if (resolvedData.street || resolvedData.streetNumber || resolvedData.zip) {
          Object.assign(resolvedData, await getPositionByAddress(item ?? resolvedData));
        }

        return resolvedData;
      },
    },
  }),
};
