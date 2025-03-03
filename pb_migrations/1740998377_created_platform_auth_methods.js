/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_1940545659",
        "hidden": false,
        "id": "relation961728715",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "platform",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "select2734208925",
        "maxSelect": 4,
        "name": "auth_type",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "OAuth",
          "APIKey",
          "Basic",
          "Other"
        ]
      },
      {
        "hidden": false,
        "id": "select11490771",
        "maxSelect": 2,
        "name": "scope",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "ads",
          "social"
        ]
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1721462995",
        "max": 0,
        "min": 0,
        "name": "auth_url",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text761198834",
        "max": 0,
        "min": 0,
        "name": "token_url",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_1130034014",
    "indexes": [],
    "listRule": null,
    "name": "platform_auth_methods",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1130034014");

  return app.delete(collection);
})
