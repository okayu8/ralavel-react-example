<!DOCTYPE html>
<html lang="<?php echo e(app()->getLocale()); ?>">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title>Todo Login</title>

    
    <link href="<?php echo e(asset('css/app.css')); ?>" rel="stylesheet">
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
                        
                        <ul class="nav navbar-nav">
                            
                                
                                <li>
                                    <a href="<?php echo e(route('login')); ?>" style="color:#961818;"><?php echo e(__('Login')); ?></a>
                                </li>
                                <li>
                                    <a href="<?php echo e(route('register')); ?>" style="color:#af1c1c;"><?php echo e(__('Register')); ?></a>
                                </li>
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <main class="py-4">
            <?php echo $__env->yieldContent('content'); ?>
        </main>
    </div>

</body>
</html>
