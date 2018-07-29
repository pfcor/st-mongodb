// $unwind
var pipeline = [
    {
        $match: {
            "languages": "English",
            "imdb.rating": {"$gte": 0}
        }
    },
    {
        $unwind: "$cast"
    },
    {
        $project: {
            "_id": 0,
            "imdb.rating": 1,
            "cast": 1,
            "languages": 1,
            "title": 1
        }
    },
    {
        $group: {
            "_id": "$cast",
            "numFilms": {"$sum": 1},
            "average": {"$avg": "$imdb.rating"}
        }
    },
    {
        $sort: {
            "numFilms": -1
        }
    },
    {
        $limit: 1
    },
    {
        $project: {
            "_id": 1,
            "numFilms": 1,
            "average": {
                "$divide": 
                    [{
                        "$trunc": {"$multiply": ["$average", 10]}
                    }, 
                    10
                ]
            }
        }
    }
]