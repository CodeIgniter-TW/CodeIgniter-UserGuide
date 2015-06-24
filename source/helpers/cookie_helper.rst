#############
Cookie 輔助函式
#############

Cookie 輔助函式包含了各種輔助使用 Cookie 的相關函式。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

導入輔助函式
===================

Cookie 輔助函式的載入語法如下：
::

	$this->load->helper('cookie');

可用函式格式
===================

允許使用的函式格式如下：


.. php:function:: set_cookie($name[, $value = ''[, $expire = ''[, $domain = ''[, $path = '/'[, $prefix = ''[, $secure = FALSE[, $httponly = FALSE]]]]]]]])

	:param	mixed	$name: Cookie 名稱或包含函式中所有有效參數的陣列
	:param	string	$value: Cookie 值
	:param	int	$expire: 有效期限秒數
	:param	string	$domain: Cookie 網域名稱（通常是：.yourdomain.com）
	:param	string	$path: Cookie 路徑
	:param	string	$prefix: Cookie 名稱前綴
	:param	bool	$secure: 是否只透過 HTTPS 傳送 Cookie
	:param	bool	$httponly: 是否對 JavaScript 隱藏 Cookie
	:rtype:	不回傳任何值

	此輔助函式對於設置 Cookie 提供了相當友善的語法，可以參考 :doc:`Input Library <../libraries/input>` 敘述中所提到的用法，此函式相當於就是 ``CI_Input::set_cookie()`` 的別名。

.. php:function:: get_cookie($index[, $xss_clean = NULL]])

	:param	string	$index: Cookie 名稱
	:param	bool	$xss_clean: 是否對回傳值啟用 XSS 過濾機制
	:returns:	Cookie 的值或沒有找到就回傳 NULL
	:rtype:	各種型態皆有

	此輔助函式對於取得 Cookie 提供了相當友善的語法，可以參考 :doc:`Input Library <../libraries/input>` 敘述中所提到的用法。此函式執行起來雖與 ``CI_Input::cookie()`` 很相像，但除此之外會加入你在 *application/config/config.php* 檔案中所設置的前綴 ``$config['cookie_prefix']``。

.. php:function:: delete_cookie($name[, $domain = ''[, $path = '/'[, $prefix = '']]]])

	:param	string	$name: Cookie 名稱
	:param	string	$domain: Cookie 網域名稱（通常是：.yourdomain.com）
	:param	string	$path: Cookie 路徑
	:param	string	$prefix: Cookie 名稱前綴
	:rtype:	void

	刪除 Cookie 時，除非你指定了路徑或其他值，否則只有具有 **name** 的 Cookie 會被刪除。
	::

		delete_cookie('name');

	此函式在格式上除了沒有 **value** 跟 **expire** 這兩個參數之外，其實與 ``set_cookie()`` 不盡相同。你可以只對第一個參數送出一個的陣列或者你也可以個別設置參數。
	::

		delete_cookie($name, $domain, $path, $prefix);
