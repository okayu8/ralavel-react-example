<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- CSRF トークン --}}
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Todo Login</title>

    {{-- CSS --}}
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <div class="container">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" style="color:#000000;" href="/">ToDoList</a>
                    </div>
                    <div className="collapse navbar-collapse" id="defaultNavbar1" >
                        {{-- Navbarの右側 --}}
                        <ul class="nav navbar-nav">
                            
                                {{-- 「ログイン」と「ユーザー登録」へのリンク --}}
                                <li>
                                    <a href="{{ route('login') }}" style="color:#961818;">{{ __('Login') }}</a>
                                </li>
                                <li>
                                    <a href="{{ route('register') }}" style="color:#af1c1c;">{{ __('Register') }}</a>
                                </li>
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <main class="py-4">
            @yield('content')
        </main>
    </div>

</body>
</html>
