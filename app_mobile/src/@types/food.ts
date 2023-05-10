interface FoodType {
    id: string
    name: string
    total_ingredients: string
    time: number
    cover: string
    video: string
    ingredients: {
        id: string
        name: string
        amount: string
    }[]
    instructions: {
        id: string
        text: string
    }[]
}

export { FoodType }