#######################
相容性函數
#######################

CodeIgniter 提供一組相容性函數，使你可以使用非原生可使用的 PHP 函數，
但是只有在更高的版本或者依賴於一定的擴充插件。

作為客製化實作，這些函數對他們本身來說，也將有一些依賴性設定，如果你的 PHP 安裝沒有提供原生的函數，使用我們的方法是很有用的。

.. note:: 大部份像是 `通用函數 <common_functions>` ，只要依賴條件滿足，相容性函數總是可以使用的。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

****************
密碼雜湊
****************

這組相容性函數提供一個 “反向移植” 在 PHP 的標準 `Password Hashing extension <http://php.net/password>`_ ，其它方式可以使用，就是將 PHP 版本升級到 PHP 5.5 。

依賴
============

- PHP 5.3.7
- ``CRYPT_BLOWFISH`` 提供給 ``crypt()``

常數
=========

- ``PASSWORD_BCRYPT``
- ``PASSWORD_DEFAULT``

函數參考
==================

.. function:: password_get_info($hash)

	:param	string	$hash: 雜湊的密碼
	:returns:	雜湊密碼的資訊
	:rtype:	array

	要獲得更多資訊，請參考 `PHP manual for
	password_get_info() <http://php.net/password_get_info>`_ 。

.. function:: password_hash($password, $algo[, $options = array()])

	:param	string	$password: 明文密碼
	:param	int	$algo: 雜湊演算法
	:param	array	$options: 雜湊選項
	:returns:	雜湊密碼，或者錯誤 FALSE
	:rtype:	string

	要獲得更多資訊，請參考 `PHP manual for
	password_hash() <http://php.net/password_hash>`_ 。

	.. note:: 除非你提供你自己的（以及有效的）salt，這個函數可以進一步提供依賴於可使用的 CSPRNG source。
	 	滿足下列每一個條件：
		- ``mcrypt_create_iv()`` with ``MCRYPT_DEV_URANDOM``
		- ``openssl_random_pseudo_bytes()``
		- /dev/arandom
		- /dev/urandom

.. function:: password_needs_rehash($hash, $algo [, $options = array()])

	:param	string	$hash: 雜湊密碼
	:param	int	$algo: 雜湊演算法
	:param	array	$options: 雜湊選項
	:returns:	TRUE 如果雜湊可以被匹配於輸入的演算法以及選項給重新雜湊，否則 FALSE
	:rtype:	bool

	要獲得更多資訊，請參考 `PHP manual for
	password_needs_rehash() <http://php.net/password_needs_rehash>`_ 。

.. function:: password_verify($password, $hash)

	:param	string	$password: 純文本密碼
	:param	string	$hash: 雜湊密碼
	:returns:	TRUE 如果密碼匹配雜湊，如果不是 FALSE
	:rtype:	bool

	要獲得更多資訊，請參考 `PHP manual for
	password_verify() <http://php.net/password_verify>`_ 。

*********************
雜湊（訊息摘要）
*********************

This compatibility layer contains backports for the ``hash_equals()``
and ``hash_pbkdf2()`` functions, which otherwise require PHP 5.6 and/or
PHP 5.5 respectively.

依賴
============

- None

函數參考
==================

.. function:: hash_equals($known_string, $user_string)

	:param	string	$known_string: 已知的字串
	:param	string	$user_string: 使用者提供的字串
	:returns:	TRUE 如果字串匹配，否則 FALSE
	:rtype:	string

	要獲得更多資訊，請參考 `PHP manual for
	hash_equals() <http://php.net/hash_equals>`_ 。

.. function:: hash_pbkdf2($algo, $password, $salt, $iterations[, $length = 0[, $raw_output = FALSE]])

	:param	string	$algo: 雜湊演算法
	:param	string	$password: 密碼
	:param	string	$salt: 雜湊的 salt
	:param	int	$iterations: 迭代推導過程中執行的次數
	:param	int	$length: 輸出字串長度
	:param	bool	$raw_output: 是否輸出原始二進制資料
	:returns:	如果 raw_output 設置為TRUE， 則回傳原始二進制數據表示的信息摘要，否則回傳 16 進制小寫字串格式表示的信息摘要。
	:rtype:	string

	要獲得更多資訊，請參考 `PHP manual for
	hash_pbkdf2() <http://php.net/hash_pbkdf2>`_ 。

****************
多字節字串
****************

這個相容性函數提供有限的參考 PHP's
`Multibyte String extension <http://php.net/mbstring>`_ 。由於是有限的替代解決方法，只有少數的函數是可用的。

.. note:: 當一個字元參數省略， ``$config['charset']`` 將被用。

依賴
============

- `iconv <http://php.net/iconv>`_ extension

.. important:: 這個依賴是非必要的，這個函數總是被定義好了。 If iconv is not available, they WILL
	fall-back to their non-mbstring versions.

.. important:: Where a character set is supplied, it must be
	supported by iconv and in a format that it recognizes.

.. note:: For you own dependency check on the actual mbstring
	extension, use the ``MB_ENABLED`` constant.

函數參考
==================

.. function:: mb_strlen($str[, $encoding = NULL])

	:param	string	$str: 輸入字串
	:param	string	$encoding: 字元集合
	:returns:	字串長度，或者錯誤 FALSE
	:rtype:	string

	要獲得更多資訊，請參考 `PHP manual for
	mb_strlen() <http://php.net/mb_strlen>`_ 。

.. function:: mb_strpos($haystack, $needle[, $offset = 0[, $encoding = NULL]])

	:param	string	$haystack: String to search in
	:param	string	$needle: Part of string to search for
	:param	int	$offset: Search offset
	:param	string	$encoding: Character set
	:returns:	Numeric character position of where $needle was found or FALSE if not found
	:rtype:	mixed

	要獲得更多資訊，請參考 `PHP manual for
	mb_strpos() <http://php.net/mb_strpos>`_ 。

.. function:: mb_substr($str, $start[, $length = NULL[, $encoding = NULL]])

	:param	string	$str: Input string
	:param	int	$start: Position of first character
	:param	int	$length: Maximum number of characters
	:param	string	$encoding: Character set
	:returns:	Portion of $str specified by $start and $length or FALSE on failure
	:rtype:	string

	要獲得更多資訊，請參考 `PHP manual for
	mb_substr() <http://php.net/mb_substr>`_ 。

******************
標準函數
******************

這組相容性函數提供了支持 PHP 中的一些標準的功能，只是可能需要一個較新的 PHP 版本。

依賴
============

- None

函數參考
==================

.. function:: array_column(array $array, $column_key[, $index_key = NULL])

	:param	array	$array: 需要取出的多維陣列的陣列
	:param	mixed	$column_key: 需要返回值的列的索引
	:param	mixed	$index_key: 需要把哪個索引當作返回值的索引
	:returns:	從多維陣列中返回單列陣列
	:rtype:	array

	要獲得更多資訊，請參考 `PHP manual for
	array_column() <http://php.net/array_column>`_ 。

.. function:: array_replace(array $array1[, ...])

	:param	array	$array1: Array in which to replace elements
	:param	array	...: Array (or multiple ones) from which to extract elements
	:returns:	Modified array
	:rtype:	array

	要獲得更多資訊，請參考 `PHP manual for
	array_replace() <http://php.net/array_replace>`_ 。

.. function:: array_replace_recursive(array $array1[, ...])

	:param	array	$array1: Array in which to replace elements
	:param	array	...: Array (or multiple ones) from which to extract elements
	:returns:	Modified array
	:rtype:	array

	要獲得更多資訊，請參考 `PHP manual for
	array_replace_recursive() <http://php.net/array_replace_recursive>`_ 。

	.. important:: Only PHP's native function can detect endless recursion.
		Unless you are running PHP 5.3+, be careful with references!

.. function:: hex2bin($data)

	:param	array	$data: Hexadecimal representation of data
	:returns:	Binary representation of the given data
	:rtype:	string

	要獲得更多資訊，請參考 `PHP manual for hex2bin()
	<http://php.net/hex2bin>`_ 。

.. function:: quoted_printable_encode($str)

	:param	string	$str: Input string
	:returns:	8bit-encoded string
	:rtype:	string

	要獲得更多資訊，請參考 `PHP manual for
	quoted_printable_encode() <http://php.net/quoted_printable_encode>`_ 。
