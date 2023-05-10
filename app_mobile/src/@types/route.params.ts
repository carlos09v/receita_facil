
type RootStackParamList = {
    Home: undefined
    Detail: {
        data: {
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
    }
    Search: {
        name: string
    }
}

export type { RootStackParamList }