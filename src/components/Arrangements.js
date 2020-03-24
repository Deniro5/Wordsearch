//direction  0: left to right 1: right to left   2: up to down  3 down to up     4: top left to bottom right  5: bottom right to top left 

const arrangements = [
    [
        {size:6 , row: 1, column: 2, direction: 0},
        {size:4 , row: 2, column: 9, direction: 1},
        {size:8 , row: 3, column: 0, direction: 2},
        {size:4 , row: 2, column: 2, direction: 4},
        {size:5 , row: 3, column: 7, direction: 2},
        {size:9 , row: 9, column: 12, direction: 1},
        {size:5 , row: 3, column: 13, direction: 5},
        {size:6 , row: 11, column: 7, direction: 0},
        {size:3 , row: 7, column: 2, direction: 0},
        {size:6 , row: 12, column: 4, direction: 0},
    ],
    [
        {size:8 , row: 2, column: 0, direction: 2},
        {size:4 , row: 0, column: 4, direction: 0},
        {size:9 , row: 1, column: 1, direction: 4},
        {size:3 , row: 13, column: 0, direction: 0},
        {size:5 , row: 3, column: 12, direction: 5},
        {size:5 , row: 3, column: 10, direction: 1},
        {size:7 , row: 12, column: 6, direction: 1},
        {size:3 , row: 10, column: 11, direction: 4},
        {size:6, row:5, column: 3, direction: 2},
        {size:6, row:8, column: 5, direction: 4},
    ],
    [
        {size:8 , row: 2, column: 8, direction: 2},
        {size:4 , row: 4, column: 2, direction: 0},
        {size:6 , row: 12, column: 12, direction: 1},
        {size:7 , row: 6, column: 6, direction: 5},
        {size:4 , row:10, column: 5, direction: 2},
        {size:4 , row:5, column: 10, direction: 4},
        {size:4 , row:3, column: 10, direction: 0},
        {size:5 , row:0, column: 4, direction: 5},
        {size:9 , row:0, column: 13, direction: 1},
        {size:5 , row:9, column: 1, direction: 3},
    ],
    [
        {size:8 , row: 0 , column: 13, direction: 1},
        {size:9 , row:0 , column: 3, direction: 4},
        {size:6 , row: 3 , column: 3, direction: 2},
        {size:3 , row:2 , column: 0, direction: 4},
        {size:7 , row:5 , column: 1, direction: 2},
        {size:6 , row:10 , column: 6, direction: 0},
        {size:3 , row:5 , column: 6, direction: 4},
        {size:5 , row:8 , column: 6, direction: 5},
        {size:7 , row:12 , column: 11, direction: 1},
        {size:4 , row:3 , column: 11, direction: 2},
    ],
]

export default arrangements;