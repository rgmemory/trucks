//state

const initial_state ={
    shipper: '',
    pickup: '',
    destination: '',
    date: '',
    rate: ''
}

//action types

const SHIPPER = 'SHIPPER'
const PICKUP = 'PICKUP'
const DESTINATION = 'DESTINATION'
const DATE = 'DATE'
const RATE = 'RATE'

//reducer

export default function reducer(state = initial_state, action){
    switch(action.type){
        case SHIPPER:
            return Object.assign({}, state, {shipper: action.payload})
        case PICKUP:
            return Object.assign({}, state, {pickup: action.payload})
        case DESTINATION:
            return Object.assign({}, state, {destination: action.payload})
        case DATE:
            return Object.assign({}, state, {date: action.payload})
        case RATE:
            return Object.assign({}, state, {rate: action.payload})
        default:
            return state
    }
}


//actions

export function handleShipper(value){
    return{
        type: SHIPPER,
        payload: value
    }
}


////get all these redux things to work
export function handlePickup(value){
    return{
        type: PICKUP,
        payload: value
    }
}
export function handleDestination(value){
    return{
        type: DESTINATION,
        payload: value
    }
}


export function handleDate(value){
    return{
        type: DATE,
        payload: value
    }
}


export function handleRate(value){
    return{
        type: RATE,
        payload: value
    }
}