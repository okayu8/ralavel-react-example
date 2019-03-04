export const getTodoAction = () => {
    axios.get('/api/todos')
        .then(response => {
            console.log('todos_list')
            console.log('data:' + JSON.stringify(response.data))
            const todos = [
                {
                    "data": response.data.data,
                    "nextURL": response.data.next_page_url,
                    "prevUrl": response.data.prev_page_url
                }
            ]
            return todos;
        })
        .catch(function (error) {
            console.log(error)
        })
}