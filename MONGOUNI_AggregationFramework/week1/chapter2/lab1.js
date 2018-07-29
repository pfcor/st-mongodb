var favorites = [
    "Sandra Bullock",
    "Tom Hanks",
    "Julia Roberts",
    "Kevin Spacey",
    "George Clooney"
]

pipeline = [
    {
        $match: {
            countries: "USA",
            "tomatoes.viewer.rating": {$gte: 3}
        }
    },
    {
        $addFields: {
            num_favs: {
                $size: {
                    $ifNull: [
                        {$setIntersection: [favorites, "$cast"]},
                        []
                    ]
                }
            }
        }
    },
    {
        $sort: {
            num_favs: -1,
            "tomatoes.viewer.rating": -1,
            title: -1
        }
    },
    {
        $skip: 24
    },
    {
        $limit: 1
    },
    {
        $project: {
            _id: 0,
            title: 1,
            num_favs: 1,
            rating: "$tomatoes.viewer.rating"
        }
    }
]