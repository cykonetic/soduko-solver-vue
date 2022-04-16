<template>
    <div class="tile" :title="value" :id="_id" @click="editing = true">
        <input v-if="editing" 
            :value="value"
            @change="update" 
            @blur="update" 
            @keydown="navigate"
            @vnode-mounted="({ el }) => el.focus()"
        >
        <span v-else>{{ value }}</span>
    </div>
</template>

<script>
import { board } from '@/store.js'
    
export default {
    props: {
        column: Number,
        row: Number,
    },
    data() {
        return {
            editing: false,
            valid: true,
            board,
        }
    },
    computed: {
        value() {
            return this.board[this.column][this.row] === 0 ? '' : this.board[this.column][this.row]
        },
        _id() {
            return "r" + this.row + "c" + this.column
        }
    },
    methods: {
        update(event) {
            this.editing = false
            this.board[this.column][this.row] = 0
            document.getElementById(this._id).classList.remove('invalid')
            let value = parseInt(event.target.value.trim())
            // For simplicity, reset illegal values to 0
            if (!(Number.isNaN(value) || 1 > value)) {
                if (9 < value) {
                    value %= 10
                }
                if (!this.$parent.isValidPlacement(value, this.row, this.column)) {
                    document.getElementById(this._id).classList.add('invalid')
                }
                this.board[this.column][this.row] = value
            }
        },
        navigate(event) {
            const key = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
            }
            if (-1 === [ key.left, key.up, key.right, key.down ].indexOf(event.which)) { return }
            // initializing to down eliminates a branch
            let id = "r" + (this.row + 1 > 8 ? 0 : this.row + 1) + "c" + this.column
            if (event.which === key.left) {
                id = "r" + this.row + "c" + (this.column - 1 < 0 ? 8 : this.column - 1)
            } else if (event.which === key.up) {
                id = "r" + (this.row - 1 < 0 ? 8 : this.row - 1) + "c" + this.column
            } else if (event.which === key.right) {
                id = "r" + this.row + "c" + (this.column + 1 > 8 ? 0 : this.column + 1)
            }
            if (id === this._id) { return }
            document.getElementById(id).click()
        }
    }
}
</script>

<style scoped>
.tile {
    padding: 0px;
    margin: 0px;
    border: none;
    height: 50px;
    width: 50px;
}
.tile input, .tile span {
    height: 50px;
    width: 50px;
    line-height: 50px;
}
.tile input {
    font-size: 22px;
    border: none;    
    padding-left: 20px; 
    box-sizing: border-box;
    background-color: #F90;
}
.tile span {
    font-size: 24px;
    font-weight: bold;
}
.invalid {
    background-color: #F00 ;
}
</style>