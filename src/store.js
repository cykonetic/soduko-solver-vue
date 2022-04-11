import { reactive } from "vue"

export const board = reactive(
    Array.from(Array(9).keys()).map(
        // eslint-disable-next-line no-unused-vars
        (i) => Array.from(Array(9).keys()).map((i) => 0)
    )
)
