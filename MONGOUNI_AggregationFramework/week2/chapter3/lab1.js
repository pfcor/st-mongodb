// $group
var query = {
    "awards": {
        "$regex": /^Won.+?Oscar.+?/
    }
}

var project = {
    "_id": 0,
    "awards": 1
}


var pipeline = [
    {
        $match: {
            "awards": {
                "$regex": /^Won.+?Oscar.+?/
            }
        }
    },
    {
        $group: {
            _id: null,
            "highest_rating": {"$max": "$imdb.rating"},
            "lowest_rating": {"$min": "$imdb.rating"},
            "average_rating": {"$avg": "$imdb.rating"},
            "deviation": {"$stdDevSamp": "$imdb.rating"},
        }
    }
]

