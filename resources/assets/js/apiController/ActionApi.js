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
            console.log(error);
        })
}

export const addTodoAction = (todo) => {
    let uri = '/api/todos';
    axios.post(uri, todo)
        .then((response) => {
            console.log(JSON.stringify(response));
            location.reload();
            console.log("success");
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const isLogin = () => {
    let uri = '/api/isLogin';
    var path = location.pathname;
    console.log(path)
    axios.get(uri)
        .then((response) => {
            if (path === '/login' || path === '/register' || path === '/password/reset') {
                return true;
            }
            else if (response.data === false) {
                console.log('未ログイン')
                location.href = '/';
            }
            return true;
        })
        .catch(function (error) {
            console.log(error);
        })
}