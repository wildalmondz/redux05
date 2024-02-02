
export async function handler(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results
}

export async function blogHandler(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

export async function eventsHandler(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

export async function search(url) {
    const response = await fetch(url);
      const data = await response.json();
      const docs = data.response.docs ?? [];
      const results = docs.map(doc => {
        return {
            title: doc?.headline?.main,
            url: doc.web_url,
            uri: doc.uri,
        }
      })
    return results
}

/*
export const checkForBlog = (type, slugName) => function (dispatch) {
  dispatch(actionCreators.());
  return fetch(`${apiPath}/blog/v2/${type}/${slugName}`, {
    method: 'get',
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('404');
    })
    .then(blogStatus =>
      dispatch(actionCreators.getBlogSuccess(blogStatus))).catch((error) => {
      if (debugLevel > 1 ) { console.error(error); }
      dispatch(actionCreators.getBlogError(error));
    });
};
 */