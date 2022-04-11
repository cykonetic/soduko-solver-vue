/* eslint-disable no-unused-vars */
import { reactive } from "vue"

const COLUMNS = 9
const ROWS = 9

export const board = reactive(
    Array.from(Array(COLUMNS).keys()).map((i) =>
        Array.from(Array(ROWS).keys()).map((i) => 0)
    )
)
