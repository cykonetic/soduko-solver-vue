<template>
    <div id="soduko-container">
        <div id="soduko-table-panel">
            <table id="soduko-table">
                <tbody>
                    <tr v-for="row in board.length" :key="row">
                        <td 
                            v-for="column in board[row - 1].length"
                            :key="column"
                            :class="{
                                'border-top': row % 3 === 1, 
                                'border-right': column % 3 === 0, 
                                'border-bottom': row % 3 === 0, 
                                'border-left': column % 3 === 1
                            }" 
                        >
                            <soduko-tile :row="row-1" :column="column-1" :valid="true"></soduko-tile>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="soduko-list-panel">
            <ul id="soduko-ui">
                <li><button @click="timeSolution">Solve Puzzle</button></li>
                <li><button @click="clearBoard">Clear Puzzle</button></li>
                <li>{{ message }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { board } from '@/store.js'
import SodukoTile from '@/components/SodukoTile.vue'

const GRID_SIZE = 9
const SUBGRID_SIZE = 3

export default {
    components: {
        SodukoTile
    },
    data() {
        return {
            message: '',
            board
        }
    },
    methods: {
        isDigitInRow(digit, row) {
            for (let column = 0; column < GRID_SIZE; column++) {
                if (this.board[column][row] === digit) { return true }
            }
            return false
        },
        isDigitInColumn(digit, column) {
            for (let row = 0; row < GRID_SIZE; row++) {
                if (this.board[column][row] === digit) { return true }
            }
            return false
        },
        isDigitInBox(digit, row, column) {
            const startRow = row - (row % SUBGRID_SIZE)
            const endRow = startRow + SUBGRID_SIZE
            const startColumn = column - (column % SUBGRID_SIZE)
            const endColumn = startColumn + SUBGRID_SIZE

            for (let column = startColumn; column < endColumn; column++) {
                for (let row = startRow; row < endRow; row++) {
                    if (this.board[column][row] === digit) { return true }
                }
            }
            return false
        },
        isValidPlacement(digit, row, column) {
            return !(
                this.isDigitInBox(digit, row, column) ||
                this.isDigitInRow(digit, row) ||
                this.isDigitInColumn(digit, column)
            )
        },
        solveBoard() {
            for (let row = 0; row < GRID_SIZE; row++) {
                for (let column = 0; column < GRID_SIZE; column++) {
                    if (this.board[column][row] !== 0) { continue }
                    for (let digit = 1; digit < 10; digit++) {
                        if (this.isValidPlacement(digit, row, column)) {
                            this.board[column][row] = digit
                            if (this.solveBoard()) { return true }
                            this.board[column][row] = 0
                        }
                    }
                    return false        
                }
            }
            return true
        },
        clearBoard() {
            for (let row = 0; row < GRID_SIZE; row++) {
                for (let column = 0; column < GRID_SIZE; column++) {
                    this.board[column][row] = 0
                }
            }
            this.message = ''
        },
        timeSolution() {
            const startTime = Date.now()
            const success = this.solveBoard()
            const ellapsedTime = (Date.now() - startTime) / 1000
            this.message = (success ? 'Solved in ' : 'No solution after ') + ellapsedTime + ' seconds.'
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
}
li {
    margin: 10px;
    padding-top: 20px;
}
table, tr, td {
    border-collapse: collapse;
    border-spacing: 0px;
    margin: 0px;
    padding: 0px;
    
}
table {
    border: 4px solid #000;
}
tr {
    border: none;
}
td {
    border: 1px solid #000;
    height: 50px;
    width: 50px;
}
button {
    width: 100px;
    height: 50px;
}
#soduko-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.border-top {
    border-top: 3px solid #000;
}
.border-right {
    border-right: 3px solid #000;
}
.border-bottom {
    border-bottom: 3px solid #000;
}
.border-left {
    border-left: 3px solid #000;
}
</style>