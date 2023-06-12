

type ArrayElementType<ArrType> = ArrType extends readonly (infer ElementType)[] 
    ? ElementType
    : never;

// export type CardType = ArrayElementType<typeof CARDS>;


export type CardType = {
    id : number;
    title: string;
    data: string;
    userId: number;
}

export type Loop = {
    id: number;
    title: string;
    data: string;
    userId: number;
}

export type SwipeType = "like" | "nope" | "superlike";

export type ResultType = { [k in SwipeType] : number};

export type HistoryType = CardType & { swipe: SwipeType };

export interface CardProps {
    card: CardType;
    active: boolean;
    removeCard: (oldCard: CardType, swipe: SwipeType) => void;

}

export interface PlayerState {
    isActive: boolean,
    isPlaying: boolean,
    currentLoops: Loop[] | [],
    activeLoop: Loop | null,
    currentIndex: number
}