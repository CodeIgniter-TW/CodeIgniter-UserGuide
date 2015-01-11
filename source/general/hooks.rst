####################################
Hooks－擴充核心
####################################

CodeIgniter 的 Hooks 機制提供了一個方法來進入並改變框架的內部作業而不用修改核心檔案。當 CodeIgniter 執行時，它會遵循在 :doc:`程式流程圖 <../overview/appflow>` 頁面中圖示的流程。不過在一些實例中，你也許會想要在流程的特定的階段執行特定的動作。例如，你可能會想要在你的控制器（Controller）載入前後執行一些程式，或是在其他位置觸發你自己的程式。

啟動 Hooks
==============

Hooks 機制可以透過下列 **application/config/config.php** 檔案中的設定項目來啟動： ::

	$config['enable_hooks'] = TRUE;

定義一個 Hook
===============

Hooks 定義在 **application/config/hooks.php** 檔案中。每一個hook都用下面陣列的方式來指定：

::

	$hook['pre_controller'] = array(
		'class'    => 'MyClass',
		'function' => 'Myfunction',
		'filename' => 'Myclass.php',
		'filepath' => 'hooks',
		'params'   => array('beer', 'wine', 'snacks')
	);

**Notes:**

陣列索引的名稱與你要使用的特定的 hook 插入點相對應。在上例中，hook 插入點是 pre_controller 。本頁底下可以找到一個hook插入點的清單。另外，以下的項目必須在hook的關係陣列中定義好：

-  **class** 你想要執行的類別名稱。如果你想要使用一個函數而不是類別，就保持空白。
-  **function** 你要呼叫的函數名稱。
-  **filename** 你的類別/函數所在的檔案名稱。
-  **filepath** 包含你程式的目錄名稱。注意：程式必須在你的 application 目錄內，所以這個目錄名稱是相對於 application 的路徑。例如，如果你的程式放在 *application/hooks* ，那你只要用 hooks 當作 ‘filepath’。如果你的程式放在 *application/hooks/utilities*，那你要用 hooks/utilities 作為 ‘filepath’。路徑最後不用加斜線。
-  **params** 任何你希望傳遞給程式的參數，這是非必須的選項。

如果你的 PHP 版本 5.3+，你也可以使用 lambda/anoymous 函數（或者閉包函數）寫 hooks，使用簡單的語法： ::

	$hook['post_controller'] = function()
	{
		/* do something here */
	};

在同一的 Hook 中多次呼叫
===============================

如果要在一個hook插入多個程式，只要把陣列宣告成多維的就可以。像這樣： ::

	$hook['pre_controller'][] = array(
		'class'    => 'MyClass',
		'function' => 'MyMethod',
		'filename' => 'Myclass.php',
		'filepath' => 'hooks',
		'params'   => array('beer', 'wine', 'snacks')
	);

	$hook['pre_controller'][] = array(
		'class'    => 'MyOtherClass',
		'function' => 'MyOtherMethod',
		'filename' => 'Myotherclass.php',
		'filepath' => 'hooks',
		'params'   => array('red', 'yellow', 'blue')
	);

注意要在陣列索引後加上中括號： ::

	$hook['pre_controller'][]

這樣就可以讓你在一個 hook 中插入多個程式。程式執行的順序就是你在陣列中定義的順序。

Hook 插入點
===========

以下是可用的 hook 插入點清單。

-  **pre_system**
   在系統執行的初期執行。這時只有benchmark及hook類別被載入。路由或其他程序都還沒執行。
-  **pre_controller**
   在所有的控制器（Controller）呼叫之前執行。此時所有的基礎類別、路由、安全檢查都已經完成。
-  **post_controller_constructor**
   在控制器(controller)實例化之後但是任何方法都還未呼叫之前立刻執行。
-  **post_controller**
   在控制器（Controller）執行完畢之後立刻執行。
-  **display_override**
   覆蓋用來在系統執行完畢後向瀏覽器送出完成的頁面的 ``_display()`` 函數。這樣就允許你用你自己定義的顯示方法。注意，你必須用 ``$this->CI =& get_instance()`` 取得CI參考物件然後才可透過呼叫 ``$this->CI->output->get_output()`` 來使用完成的頁面資料。
-  **cache_override**
   讓你可以呼叫自己定義的函數而非 :doc:`Output 函式庫 <../libraries/output>` 中的 ``_display_cache()`` 函數。這讓你可以使用自己的 cache 顯示機制。
-  **post_system**
   在完成的頁面送到瀏覽器之後呼叫。在系統執行結束時，完成的資料已送到瀏覽器之後執行。
