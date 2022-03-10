function speakersReducer(state, action) {
  function updateFavorite(favoriteValue) {
    return state.map((item) => {
      if (item.id === action.sessionId) {
        return { ...item, favorite: favoriteValue };
      }
      return item;
    });
  }

  switch (action.type) {
    case "setSpeakerList": {
      return action.data;
    }
    case "favorite": {
      return updateFavorite(true);
      // return state.map((item) => {
      //   if (item.id === action.sessionId) {
      //     item.favorite = true;
      //   }
      //   return item;
      // })
    }
    case "unfavorite": {
      return updateFavorite(false);
    }
    default:
      return state;
  }
}

export default speakersReducer;
