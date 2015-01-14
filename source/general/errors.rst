##############
錯誤處理
##############

CodeIgniter 讓你使用下列的函數來在你的應用程式中建立錯誤報告。
此外，它還有一個 logging 類別來讓錯誤以及除錯訊息可以存成文字檔。

.. note:: CodeIgniter 預設會顯示所有PHP錯誤訊息。
你可能會希望在開發過程完畢後改變這個行為。
你可以在主要的 index.php 檔案的開頭找到 error_reporting() 這個函數。
即使取消錯誤報告，錯誤仍然會寫入 log 檔。

不像大部分 CodeIgniter 的系統，錯誤處理函數只是在整個系統中都可以直接呼叫的程序式函數介面。
這個方式讓你觸發錯誤訊息時不必擔心 class/function 的有效範圍。

CodeIgniter 也會回傳狀態碼無論系統核心何時呼叫 ``exit()`` 函數。
這個結束狀態碼是分隔 HTTP 狀態碼，並作為一個給其它程序的通知服務，
這個服務監視其他程序是否代碼成功地執行完成，或者導致代碼執行終止的問題。
這個變數定義於 *application/config/constants.php* 。While 結束狀態碼在 CLI 設定是最有用的，
回傳適當的狀態碼幫助伺服器軟體保持追蹤你的腳本以及應用程式的健康。

這個函數讓你用下列的錯誤訊息模板來顯示給予的錯誤訊息：

.. function:: show_error($message, $status_code, $heading = 'An Error Was Encountered')

	:param	mixed	$message: 錯誤訊息
	:param	int	$status_code: HTTP 回應狀態碼
	:param	string	$heading: 錯誤頁面標頭
	:rtype:	void

這個函數將顯示錯誤訊息使用以下模板提供給你： ::

	application/views/errors/error_general.php

在錯誤訊息中這個可選的參數 ``$status_code`` 決定什麼 HTTP 狀態碼應該被傳送。
如果 ``$status_code`` 小於 100，HTTP 狀態碼將會被設定為 500，然後結束狀態碼將會被設定成
 ``$status_code + EXIT__AUTO_MIN`` 。如果這個值大於
``EXIT__AUTO_MAX`` ，或者如果 ``$status_code`` 是 100 或者更高，結束狀態碼將會被設定為 ``EXIT_ERROR`` 。
你可以檢查 *application/config/constants.php* 以獲得更多細節。

.. function:: show_404($page = '', $log_error = TRUE)

	:param	string	$page: URI 字串
	:param	bool	$log_error: 是否紀錄錯誤
	:rtype:	void

這個函數將會顯示 404 錯誤訊息，提供以下錯誤訊息模板： ::

	application/views/errors/error_404.php

傳遞給該函數需要的字符串是未找到頁面的文件路徑。
結束狀態碼將被設定在 ``EXIT_UNKNOWN_FILE`` 。
注意如果控制器（Controller）未找到，CodeIgniter 自動地顯示 404 訊息。

CodeIgniter 自動地記錄所有 ``show_404()`` 呼叫。設定第二個參數選項 FALSE 將不會做記錄。

.. function:: log_message($level, $message, $php_error = FALSE)

	:param	string	$level: 記錄層級： 'error'，'debug' 或者 'info'
	:param	string	$message: 記錄的訊息
	:param	bool	$php_error: 是否我們要記錄原生 PHP 錯誤訊息
	:rtype:	void

這個函數讓你寫錯誤訊息到你的記錄檔案內。
你一定三選一中要提供一個 "levels" 到第一個參數內，指定這個錯誤是屬於哪種形態（debug、error、info），
到第二個參數。

例子： ::

	if ($some_var == '')
	{
		log_message('error', 'Some variable did not contain a value.');
	}
	else
	{
		log_message('debug', 'Some variable was correctly set');
	}

	log_message('info', 'The purpose of some variable is to provide some value.');

這裡有三種錯誤訊息型態：

#. Error 訊息。這裡是實際上的錯誤，像是 PHP 錯誤或者使用者錯誤。
#. Debug 訊息。這裡的訊息是除錯用的。例如，如果一個類別被初始化，你可以記錄它當作除錯訊息。
#. Informational 訊息。這裡是最低優先權的訊息，簡單地給對於一些過程信息。CodeIgniter 本身不產生
   info 訊息，如果你要做是可以做的。

.. note:: 為了實際被寫入記錄文件， *logs* 目錄必須設為可以寫入。
  除此之外，你一定要設定“threshold”來做記錄在這邊設定 *application/config/config.php* 。你可能，例如，只需要 error 訊息被記錄，以及不需要其他兩個型態的記錄。如果你設定他為 0 ，記錄將會被關閉。
