<template>
    <div>
        <div class="control">
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
                            <soduko-tile :row="row - 1" :column="column - 1" :valid="true"></soduko-tile>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="control">
            <button @click="solveBoard">Solve Puzzle</button>
            <button @click="clearBoard">Clear Puzzle</button>
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
            board
        }
    },
    methods: {
        isDigitInRow(digit, row) {
            for (let column = 0; column < GRID_SIZE; column++) {
                if (this.board[column][row] === digit) {
                    return true
                }
            }
            return false
        },
        isDigitInColumn(digit, column) {
            for (let row = 0; row < GRID_SIZE; row++) {
                if (this.board[column][row] === digit) {
                    return true;
                }
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
                    if (this.board[column][row] === digit) {
                        return true
                    }
                }
            }
            return false
        },
        isValidPlacement(digit, row, column) {
            return !(
                this.isDigitInRow(digit, row) ||
                this.isDigitInColumn(digit, column) ||
                this.isDigitInBox(digit, row, column)
            )
        },
        solveBoard() {
            for (let row = 0; row < GRID_SIZE; row++) {
                for (let column = 0; column < GRID_SIZE; column++) {
                    if (this.board[column][row] === 0) {
                        for (let digit = 1; digit < 10; digit++) {
                            if (this.isValidPlacement(digit, row, column)) {
                                this.board[column][row] = digit
                                if (this.solveBoard()) {
                                    return true
                                } else {
                                    this.board[column][row] = 0
                                }
                            }
                        }
                        return false
                    }
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
        }
    }
}
</script>

<style scoped>
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
div {
    border: 1px solid #F00;
    margin: auto;
}
.control {
    display: inline-block;
}
</style>