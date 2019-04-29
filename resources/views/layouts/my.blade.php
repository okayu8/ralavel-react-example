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
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#defaultNavbar1"
                            style="backgroundColor: #273036; borderColor: #273036;"
                                >
                            <span class="icon-bar" style=""></span>
                            <span class="icon-bar" style=""></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="defaultNavbar1" >
                        {{-- Navbarの右側 --}}
                        <ul class="nav navbar-nav">
                            {{-- 投稿ボタン --}}
                            
                            {{-- 認証関連のリンク --}}
                            @guest
                                {{-- 「ログイン」と「ユーザー登録」へのリンク --}}
                                <li>
                                    <a href="{{ route('login') }}" style="color:#961818;">{{ __('Login') }}</a>
                                </li>
                                <li>
                                    <a href="{{ route('register') }}" style="color:#af1c1c;">{{ __('Register') }}</a>
                                </li>
                            
                            @else
                                {{-- 「プロフィール」と「ログアウト」のドロップダウンメニュー --}}
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="dropdown-user" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{ Auth::user()->name }} <span class="caret"></span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdown-user">
                                        <a class="dropdown-item" href="{{ url('users/'.auth()->user()->id) }}">
                                            {{ __('Profile') }}
                                        </a>
                                        <a class="dropdown-item" href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                    document.getElementById('logout-form').submit();">
                                            {{ __('Logout') }}
                                        </a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            @csrf
                                        </form>
                                    </div>
                                </li>
                            @endguest
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <main class="py-4">
            @yield('content')
        </main>
    </div>

    {{-- JavaScript --}}
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
