// 1. change here is that now the passed‑in state is not
// a list of speakers, it's an object with two parameters,
// isLoading and speakerList.
function speakersReducer(state, action) {
  // function updateFavorite(favoriteValue) {
  //   return state.map((item) => {
  //     if (item.id === action.sessionId) {
  //       return { ...item, favorite: favoriteValue };
  //     }
  //     return item;
  //   });
  // }

  function updateFavorite(favoriteValue) {
    return state.speakerList.map((item) => {
      if (item.id === action.id) {
        return { ...item, favorite: favoriteValue };
      }
      return item;
    });
  }

  switch (action.type) {
    case "setSpeakerList": {
      // 2. when our action type is setSpeakerList, we can't just return action.data, which remember, looking back at our dispatch call, is just the speakerList array
      // we have to return a new state with the speakerList array replaced. That is, we have to assume there are other objects in state besides our speakerList, so we need to surgically replace just the speakerList in our state.

      // return action.data;

      // return an object that first spreads the existing state, then follows that with a state we want to replace. In this case, that's just setting the speakerList property to action.data.
      //  Here is our first benefit we get from including the state isLoading in our reducer. After we set the speakerList, we also want to set IsLoading to false. We can do it right here, just add another property, after spreading state, set isLoading to false.
      return { ...state, speakerList: action.data, isLoading: false };
    }
    case "favorite": {
      // We need to update this as well. Commenting out the below code
      // return updateFavorite(true);

      return { ...state, speakerList: updateFavorite(true) };

      // return state.map((item) => {
      //   if (item.id === action.sessionId) {
      //     item.favorite = true;
      //   }
      //   return item;
      // })
    }
    case "unfavorite": {
      return { ...state, speakerList: updateFavorite(false) };
    }
    case "incrementFavoriteClickCount": {
      return { ...state, favoriteClickCount: state.favoriteClickCount + 1 };
    }
    default:
      return state;
  }
}

export default speakersReducer;
