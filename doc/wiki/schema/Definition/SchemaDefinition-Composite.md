# Composite Entity

When a relationship is set to **composite** it will be treated as part of a document. \
In the case of Non-Relational databases, the records of the relationship will be stored in the same collection. \

In the case of relational databases, although the data is stored in different tables, when executing import and export it will be treated as an object that contains the records of the relationship. \

The way to define that an entity is composite is by creating the name of the entity by putting the name of the parent in front. \
Example: **Devices.Components**

```yaml
...
domain:
  entities:
    ...
    - name: Devices
      primaryKey: ["id"]
      uniqueKey: ["name"]
      properties:
        - name: id
          length: 32
          required: true
          default: 'concat(type,"-",switch(type){case"phone":imei;default:mac;})'
        - name: type
          length: 16
          required: true
          enum: DeviceType
        - name: name
          length: 32
          required: true
        ...
    - name: Devices.Components
      extends: Products
      primaryKey: ["id"]
      uniqueKey: ["deviceId", "name"]
      properties:
        - name: id
          length: 50
          required: true
          default: concat(deviceId,"-",lower(substring(replace(name," ","-"),0,16)))
        - name: deviceId
          length: 32
          required: true
        - name: name
          length: 16
          required: true
        ...
      relations:
        - name: device
          from: deviceId
          entity: Devices
          to: id
          target: components
      ...    
```
