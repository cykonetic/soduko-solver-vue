<template>
    <div class="tile" :title="value" @click="editing = true">
        <input v-if="editing" :value="value" @change="update" @blur="update" @vnode-mounted="({ el }) => el.focus()">
        <span v-else>{{ value }}</span>
    </div>
</template>

<script>
import { board } from '@/store.js'
    
export default {
    props: {
        column: Number,
        row: Number,
        valid: Boolean
    },
    data() {
        return {
            editing: false,
            board,
        }
    },
    computed: {
        value() {
            return this.board[this.column][this.row] === 0 ? '' : this.board[this.column][this.row]
        }
    },
    methods: {
        update(event) {
            this.editing = false
            let value = parseInt(event.target.value.trim())
            // For simplicity, reset illegal values to 0
            if (Number.isNaN(value) || value < 1 || value > 9) {
                value = 0
            }
            this.board[this.column][this.row] = value
        },
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
</style>