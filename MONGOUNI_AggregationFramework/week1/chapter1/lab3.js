pipeline = [
    {
        $project: {
            title_length: {$size: {$split: ["$title", ' ']}}
        }
    },
    {
        $match: {
            title_length: 1
        }
    }
]