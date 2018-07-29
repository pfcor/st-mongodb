x_max = 1521105
x_min = 5
min = 1
max = 10

pipeline = [
    {
        $match: {
            languages: "English",
            "imdb.rating": {$gte: 1},
            "imdb.votes": {$gte: 1},
            year: {$gte: 1990}
        }
    },
    {
        $project: {
            _id: 0,
            title: 1,
            rating: "$imdb.rating",
            votes: "$imdb.votes",
            scaled_votes: {
                $add: [
                    min,
                    {
                        $multiply: [
                            (max-min),
                            {
                                $divide: [
                                    {$subtract: ["$imdb.votes", x_min]},
                                    {$subtract: [x_max, x_min]}
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    },
    {
        $addFields: {
            normalized_rating: {
                $avg: [
                    "$scaled_votes",
                    "$rating"
                ]
            }
        }
    },
    {
        $sort: {
            normalized_rating: 1
        }
    },
    {
        $limit: 1
    }
]