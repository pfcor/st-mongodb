var pipeline = [
    {
        '$match': {
            'name': 'OneWorld'
        }
    },
    {
        "$graphLookup": {
            "from": "air_airlines",
            "connectFromField": "name",
            "foreignField": "name",
            "as": "airlines"
        }
    }
]

db.air_alliances.aggregate(pipeline).pretty()

