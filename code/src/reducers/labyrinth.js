import { createSlice } from '@reduxjs/toolkit';

const labyrinth = createSlice (
{
    name: "labyrinth",
    initialState:
    {
    username: null,
    description: null,
    direction: null,
    buttons: null,
    isLoading: false,
    },
    reducers: {
        setUsername: (store, action) => {
           store.username = action.payload;
        },
        setDescription: (store, action) => {
            store.description = action.payload;
        console.log(store.description)
        },
        setDirection: (store, action) => {
            store.direction = action.payload;
        },
        setButtons: (store, action) => {
            store.buttons = action.payload;
        },
        setLoading: (store, action) => {
            store.isLoading = action.payload;
        }
    }
}
)

export const generateStart = () => {
    return (dispatch, getState) => {
    dispatch(labyrinth.actions.setLoading(true))
    fetch("https://wk16-backend.herokuapp.com/start", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: getState().labyrinth.username})})
    .then(res => res.json())
    .then(data => {
        dispatch(labyrinth.actions.setLoading(false))
        dispatch(labyrinth.actions.setDescription(data.description))
        dispatch(labyrinth.actions.setButtons(data.actions))
    })
    }
}

export const generateStory = () => {
    return (dispatch, getState) => {
        dispatch(labyrinth.actions.setLoading(true))
    fetch("https://wk16-backend.herokuapp.com/action", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: getState().labyrinth.username,
            type: "move",
            direction: getState().labyrinth.direction})})
    .then(res => res.json())
    .then(data => {
        dispatch(labyrinth.actions.setLoading(false))
        dispatch(labyrinth.actions.setDescription(data.description))
        dispatch(labyrinth.actions.setButtons(data.actions))
    });

    }
}

export default labyrinth;