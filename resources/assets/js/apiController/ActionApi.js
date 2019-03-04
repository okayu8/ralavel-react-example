export const getTodoAction = () => {
    axios.get('/api/todos')
        .then(response => {
            console.log('todos_list')
            console.log('data:' + JSON.stringify(response.data))
            this.setState({
                data: response.data.data,
                nextUrl: response.data.next_page_url,
                prevUrl: response.data.prev_page_url,
            })
        })
        .catch(function (error) {
            console.log(error)
        })
}