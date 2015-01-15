##############################
處理多環境變數
##############################

程式開發者常常根據目前是開發階段或者是產品階段來調整系統狀況。舉例來說錯誤輸出對於開發階段是非常有用的，但是如果產品”上線“了，這錯誤訊息就是代表著系統漏洞甚至安全訊息的疑慮。

ENVIRONMENT 常數
========================

CodeIgniter 自帶一個環境常數 ``$_SERVER['CI_ENV']`` 預設將環境變數設定為‘development’。在 index.php 頂端你會發現底下程式碼： ::

	define('ENVIRONMENT', isset($_SERVER['CI_ENV']) ? $_SERVER['CI_ENV'] : 'development');

這個伺服器變數可以被設定在你的 .htaccess 檔案，或者 Apache 
設定於 `SetEnv <https://httpd.apache.org/docs/2.2/mod/mod_env.html#setenv>`_。 
用於 nginx 以及其它伺服器的方法，你可以完全地移除這個邏輯然後基於伺服器 IP 位置設定常數。

除了影響一些基本框架的行為（見下一節），你可以使用這個常數在開發之間區分什麼樣的環境正在運行。

預設框架行為的影響
=====================================

在原始 CodeIgniter 系統裡面，此變數備用在某些地方，此章節會描述環境變數 ENVIRONMENT 所帶來的影響。

錯誤回報
---------------

設定 ENVIRONMENT 值為‘development’將會打開所有錯誤訊息，遇到 PHP 錯誤，瀏覽器將會顯示其訊息，相反地，如果設定為‘production’，系統將會關閉錯誤訊息。關閉錯誤訊息是 :doc:`好的安全實作 <security>` 。

設定檔
-------------------

此功能可以選擇性的使用，您可以讀取特定的 environment 設定檔，對於需要多種環境的開發者來說相當方便，使用方式可以參考 `Config 類別 <../libraries/config.html#environments>`_ 文件。
