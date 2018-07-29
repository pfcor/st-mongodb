// $lookup

var pipeline = [
    {
        "$match": {
            "airplane": {"$in": ["747", "380"]}
        }
    },
    {
        "$lookup": {
            "from": "air_alliances",
            "localField": "airline.name",
            "foreignField": "airlines",
            "as": "air_alliance"
        }
    },
    {
        '$match': {
            'air_alliance.0': {'$exists': true}
        }
    },
    {
        "$project": {
            '_id': 0,
            'airline': '$airline.name',
            'airplane': 1,
            'air_alliance': {'$arrayElemAt': ['$air_alliance', 0]}
        }
    },
    {
        '$addFields': {
            'air_alliance': '$air_alliance.name'
        }
    },
    {
        '$sortByCount': '$air_alliance'
    }
]

db.air_routes.aggregate(pipeline).pretty()

