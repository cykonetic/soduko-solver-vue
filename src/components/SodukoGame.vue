<template>
    <table id="soduko-table">
        <tbody>
            <tr v-for="row in board[0].length" :key="row">
                <td 
                    v-for="column in board.length" 
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
    <button @click="solveBoard">Solve Puzzle</button>
</template>

<script>
import { board } from '@/store.js'
import SodukoTile from '@/components/SodukoTile.vue'

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
            for (let column = 0; column < this.board.length; column++) {
                if (this.board[column][row] === digit) {
                    return true
                }
            }
            return false
        },
        isDigitInColumn(digit, column) {
            for (let row = 0; row < this.board[column].length; row++) {
                if (this.board[column][row] === digit) {
                    return true;
                }
            }
            return false
        },
        isDigitInBox(digit, row, column) {
            const startRow = row - (row % 3)
            const endRow = startRow + 3
            const startColumn = column - (column % 3)
            const endColumn = startColumn + 3

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
            for (let row = 0; row < this.board[0].length; row++) {
                for (let column = 0; column < this.board.length; column++) {
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
        }
    }
}
</script>

<style scoped>
table, tr, td {
    border: none;
    border-spacing: 0px;
    margin: 0px;
    padding: 0px;
    
}
table {
    border: 4px solid #000;
    border-collapse: collapse;
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
</style>