<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
        <title>Quick Todo</title>
        <link href="<?php echo e(asset('css/app.css')); ?>" rel="stylesheet" type="text/css">
    </head>
    <body>
        <?php if(Session::has('flash_error_message')): ?>
            <div class="container-fluid alert myAlert alert-warning">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <div><?php echo e(Session::get('message')); ?></div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endif; ?>
        
        <?php echo e(csrf_field()); ?>

        <div id="example"></div>
        <script src="<?php echo e(asset('js/app.js')); ?>" >
            var csrfToken = "<?php echo e(csrf_token()); ?>"
        </script>
    </body>
</html>