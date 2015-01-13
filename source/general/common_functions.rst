################
通用函數
################

CodeIgniter 使用少許幾個全域函數來協助運行，你也可以在任何時候呼叫它們。這不需要載入任何程式庫或是補助函數。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

.. function:: is_php($version)

	:param	string	$version: 版本號
	:returns:	TRUE 如果當前 PHP 版本至少是你提供的版本號，否則 FALSE
	:rtype:	bool

	確定是否正在使用的PHP版本大於提供的版本號。

	例子： ::

		if (is_php('5.3'))
		{
			$str = quoted_printable_encode($str);
		}

	如果系統的 PHP 版本等於或高於你所提供的版本，本函數將返回布林值 TRUE。如果系統的 PHP 版本低於你所提供的那個版本，本函數將返回 FALSE。

.. function:: is_really_writable($file)

	:param	string	$file: 檔案路徑
	:returns:	TRUE 如果路徑是可以被寫入的，否則 FALSE 
	:rtype:	bool

	在 Windows 伺服器上，除非檔案屬性標示成唯讀否則作業系統不會傳回 FALSE，結果就是即使你真的無法寫入檔案 ``is_writable()`` 仍然可能返回 TRUE。這個函數會先嘗試寫入檔案來確認它是否真的可以寫入。一般只有在平台不可靠時才建議你是用這個函數。

	這個函數第一步嘗試寫入檔案來確認是否檔案真的可以被寫入。一般只會在推薦的平台上使用這個函數。這個信息可能是不可靠的。

	例子： ::

		if (is_really_writable('file.txt'))
		{
			echo "I could write to this if I wanted to";
		}
		else
		{
			echo "File is not writable";
		}

	.. note:: 另請參見 `PHP bug #54709 <https://bugs.php.net/bug.php?id=54709>`_ 查看更多訊息。

.. function:: config_item($key)

	:param	string	$key: 配置項目的鍵
	:returns:	配置訊息的鍵值，如果找不到則 NULL
	:rtype:	mixed

	:doc:`Config 函式庫 <../libraries/config>` 為獲取配置信息的首選方式，因為 ``config_item()`` 可用於檢索單個鍵。查看 :doc:`Config 函式庫 <../libraries/config>`
	查看更多訊息。

.. :noindex: function:: show_error($message, $status_code[, $heading = 'An Error Was Encountered'])

	:param	mixed	$message: Error message
	:param	int	$status_code: HTTP Response status code
	:param	string	$heading: Error page heading
	:rtype:	void

	This function calls ``CI_Exception::show_error()``. For more info,
	please see the :doc:`Error Handling <errors>` documentation.

.. :noindex: function:: show_404([$page = ''[, $log_error = TRUE]])

	:param	string	$page: URI string
	:param	bool	$log_error: Whether to log the error
	:rtype:	void

	This function calls ``CI_Exception::show_404()``. For more info,
	please see the :doc:`Error Handling <errors>` documentation.

.. :noindex: function:: log_message($level, $message)

	:param	string	$level: Log level: 'error', 'debug' or 'info'
	:param	string	$message: Message to log
	:rtype:	void

	This function is an alias for ``CI_Log::write_log()``. For more info,
	please see the :doc:`Error Handling <errors>` documentation.

.. function:: set_status_header($code[, $text = ''])

	:param	int	$code: HTTP 回應狀態碼
	:param	string	$text: 客製化狀態碼訊息
	:rtype:	void

	允許你操作設定伺服器標頭狀態。例如： ::

		set_status_header(401);
		// 設定標頭狀態成:  Unauthorized

	`查看 <http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html>`_ 獲得完整標頭列表。

.. function:: remove_invisible_characters($str[, $url_encoded = TRUE])

	:param	string	$str: 輸入字串
	:param	bool	$url_encoded: 是否移除 URL－編碼 字元
	:returns:	已過濾字串
	:rtype:	string

	這個函數防止插入 NULL 字元，在 ASCII
	字元之間，像是 Java\\0script 。

	例子： ::

		remove_invisible_characters('Java\\0script');
		// Returns: 'Javascript'

.. function:: html_escape($var)

	:param	mixed	$var: 要跳脫的變數（字串或陣列）
	:returns:	已跳脫的 HTML 字串
	:rtype:	mixed

	這個函數作為一個 PHP 的原生函數 ``htmlspecialchars()`` 的別名，好處是可以接受字串陣列。

	這是一個有效防止跨站腳本攻擊的函數（XSS）。

.. function:: get_mimes()

	:returns:	關聯檔案型態的陣列
	:rtype:	array

	這個函數回傳一個 *參考* 它是 MIMEs 陣列來自於
	*application/config/mimes.php* 。

.. function:: is_https()

	:returns:	TRUE 如果當前連線使用 HTTP-over-SSL，否則 FALSE
	:rtype:	bool

	回傳 TRUE 如果當前是安全（HTTPS）連線，否則 FALSE
	在其它情況下（包含 non-HTTP 請求）。

.. function:: is_cli()

	:returns:	TRUE 如果當前連線是在 CLI 底下，否則 FALSE
	:rtype:	bool

	Returns TRUE 如果應用程式執行在命令列底下，否則 FALSE。

	.. note:: 這個函數檢查，變數 ``PHP_SAPI`` 值是 'cli'
		或者如果常數 ``STDIN`` 是已經被定義的，則為判斷是在 CLI 底下執行。

.. function:: function_usable($function_name)

	:param	string	$function_name: 函數名稱
	:returns:	TRUE 如果這個函數可以被使用，否則 FALSE
	:rtype:	bool

	回傳 TRUE 如果這個函數是存在的以及可用的，否則 FALSE。

	這個函數執行一個 ``function_exists()`` 函數來檢查是否
	`Suhosin extension <http://www.hardened-php.net/suhosin/>` 是被載入的，
	檢查是否它沒有關閉這個函數被檢查的功能。

	如果你想要檢查你的函數可否使用，這個方法是非常有用的，像是 ``eval()`` 以及 ``exec()`` ，
	這兩個函數是非常危險的，在高度嚴格的安全策略服務器可能被禁用。

	.. note:: 此功能被引入，因為了 Suhosin 終止腳本執行，但事實證明這是一個錯誤。這個修復已經有一段時間了（版本0.9.34），但遺憾的是還沒有發布。
