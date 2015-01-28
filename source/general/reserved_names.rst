##############
保留名稱
##############

為了幫忙大家， CodeIgniter 使用了一系列的函式，方法，類別以及變數名稱在它們的操作之中。因為如此，所以有些名稱不能給開發者使用。下面列表是保留名稱，不可以使用。

Controller 名稱
----------------

因為你的 Controller 類別將擴展主要的應用程式 Controller 所以你一定要小心不要將方法命名成這些，否則你的原生方法會覆蓋它們。 下面是保留的名稱的列表。不要任何這些命名您的 Controller：

-  Controller
-  CI_Base
-  _ci_initialize
-  Default
-  index

Functions 名稱
---------------

-  :func:`is_php()`
-  :func:`is_really_writable()`
-  ``load_class()``
-  ``is_loaded()``
-  ``get_config()``
-  :func:`config_item()`
-  :func:`show_error()`
-  :func:`show_404()`
-  :func:`log_message()`
-  :func:`set_status_header()`
-  :func:`get_mimes()`
-  :func:`html_escape()`
-  :func:`remove_invisible_characters()`
-  :func:`is_https()`
-  :func:`function_usable()`
-  :func:`get_instance()`
-  ``_error_handler()``
-  ``_exception_handler()``
-  ``_stringify_attributes()``

Variables 名稱
--------------

-  ``$config``
-  ``$db``
-  ``$lang``

Constants 名稱
--------------

-  ENVIRONMENT
-  FCPATH
-  SELF
-  BASEPATH
-  APPPATH
-  VIEWPATH
-  CI_VERSION
-  MB_ENABLED
-  ICONV_ENABLED
-  UTF8_ENABLED
-  FILE_READ_MODE
-  FILE_WRITE_MODE
-  DIR_READ_MODE
-  DIR_WRITE_MODE
-  FOPEN_READ
-  FOPEN_READ_WRITE
-  FOPEN_WRITE_CREATE_DESTRUCTIVE
-  FOPEN_READ_WRITE_CREATE_DESTRUCTIVE
-  FOPEN_WRITE_CREATE
-  FOPEN_READ_WRITE_CREATE
-  FOPEN_WRITE_CREATE_STRICT
-  FOPEN_READ_WRITE_CREATE_STRICT
-  EXIT_SUCCESS
-  EXIT_ERROR
-  EXIT_CONFIG
-  EXIT_UNKNOWN_FILE
-  EXIT_UNKNOWN_CLASS
-  EXIT_UNKNOWN_METHOD
-  EXIT_USER_INPUT
-  EXIT_DATABASE
-  EXIT__AUTO_MIN
-  EXIT__AUTO_MAX
