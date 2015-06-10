###############
PHP 風格指南
###############


本頁主要描述了開發 CodeIgniter 框架本身時所採取的編碼風格。
建議你在自己的專案中也遵循這些規範，但這不是強迫性的。

.. contents:: 目錄

檔案格式
===========

檔案應該以 unicode (UTF-8) 編碼儲存。*不應該* 使用 BOM。
UTF-8 並不像 UTF-16 及 UTF-32， UTF-8 編碼的檔案不需要標示位元組順序(Byte Order)，
而且 BOM 在 PHP 送出結果時會造成一些不好的副作用，使程式無法設置標頭(headers)。
應該使用 Unix 風格的換行字元(LF)。

這邊會說明如何在一些常見的文字編輯器中套用這個設定。
你所使用的編輯器可能有不同的設定方法，請參照編輯器的說明文件。

TextMate
''''''''

#. Open the Application Preferences
#. Click Advanced, and then the "Saving" tab
#. In "File Encoding", select "UTF-8 (recommended)"
#. In "Line Endings", select "LF (recommended)"
#. *Optional:* Check "Use for existing files as well" if you wish to
   modify the line endings of files you open to your new preference.

BBEdit
''''''

#. Open the Application Preferences
#. Select "Text Encodings" on the left.
#. In "Default text encoding for new documents", select "Unicode (UTF-8,
   no BOM)"
#. *Optional:* In "If file's encoding can't be guessed, use", select
   "Unicode (UTF-8, no BOM)"
#. Select "Text Files" on the left.
#. In "Default line breaks", select "Mac OS X and Unix (LF)"

PHP 結束標籤
===============

雖然 PHP 的結束標籤 **?>** 是選擇性的。但如果用到結束標籤的話，
任何在結束標籤之後的空白字元，不論是由開發者、使用者、或 FTP 軟體造成的，
都可能造成非預期的輸出，產生 PHP 錯誤，或是當錯誤被忽略時造成空白頁面。
因此，所有的 PHP 檔案應該要 **省略** 結束標籤，並改用一段註解來標示檔案的結尾，
以及檔案相對於程式根目錄的位置。這樣做讓你依然能夠檢查檔案是否完整，確認內容是否被截斷。

**錯誤的**::

	<?php

	echo "Here's my code!";

	?>

**正確的**::

	<?php

	echo "Here's my code!";

	/* End of file Myfile.php */
	/* Location: ./system/modules/mymodule/myfile.php */

.. note:: 在檔案結尾的註解之後，應該沒有空行或是換行字元，
	若是你在送交 pull request 時看到這個情況，請檢查你的編輯器設定並修正它。

檔案命名
===========

類別檔案應該採用首字母大寫的格式，而其它種類的檔案（設定檔，views，一般程式等等）應該全小寫。

**錯誤的**::

	somelibrary.php
	someLibrary.php
	SOMELIBRARY.php
	Some_Library.php

	Application_config.php
	Application_Config.php
	applicationConfig.php

**正確的**::

	Somelibrary.php
	Some_library.php

	applicationconfig.php
	application_config.php

另外，類別檔案的名稱應該要對應到類別名稱。
例如你有一個類別叫做 `Myclass`，則檔案名稱必須是 **Myclass.php**。

類別與方法命名
=======================

類別名稱應該總是以大寫字母開頭。
字與字之間以底線分隔，而不是使用駝峰風格(CamelCase)。

**錯誤的**::

	class superclass
	class SuperClass

**正確的**::

	class Super_class

::

	class Super_class {

		public function __construct()
		{

		}
	}

類別方法的命名應該完全使用小寫字母並且能夠表達其用途，最好包含動詞。
盡量避免太長太囉唆的命名。字與字之間應該以底線分隔。

**錯誤的**::

	function fileproperties()		// 描述不清，以及需要使用底線分隔
	function fileProperties()		// 描述不清，不應使用駝峰風格
	function getfileproperties()		// 好多了，但仍然漏了底線
	function getFileProperties()		// 不應使用駝峰風格
	function get_the_file_properties_from_the_file()	// 太囉唆

**正確的**::

	function get_file_properties()	// 描述清楚，底線分隔，並且全小寫字母

變數名稱
==============

變數名稱的規則類似於類別方法。
變數應該只用小寫字母，應使用底線分隔，並使用能表達其用途與內容的名稱。
非常短或是非完整字的命名方式應該只使用在 for() 迴圈。

**錯誤的**::

	$j = 'foo';		// 單個字母的變數應該只用在 for() 迴圈內
	$Str			// 不應使用大寫字母
	$bufferedText		// 不應使用駝峰風格，而且可以縮短一些而不影響語意
	$groupid		// 字之間應該使用底線分隔
	$name_of_last_city_used	// 太長了

**正確的**::

	for ($j = 0; $j < 10; $j++)
	$str
	$buffer
	$group_id
	$last_city

註解
==========

一般來說，程式碼應該要添加詳細的註解。
這不僅可以為資淺的開發者描述流程與意圖，當你在修改數月前自己寫的程式時，也能幫你快速的進入狀況。
這邊的註解風格並非強制性的，而是建議的風格。

`DocBlock <http://manual.phpdoc.org/HTMLSmartyConverter/HandS/phpDocumentor/tutorial_phpDocumentor.howto.pkg.html#basics.docblock>`_
風格的註解會放在類別，方法，與屬性的前面，讓編輯器可以取得資訊::

	/**
	 * Super Class
	 *
	 * @package	Package Name
	 * @subpackage	Subpackage
	 * @category	Category
	 * @author	Author Name
	 * @link	http://example.com
	 */
	class Super_class {

::

	/**
	 * Encodes string for use in XML
	 *
	 * @param	string	$str	Input string
	 * @return	string
	 */
	function xml_encode($str)

::

	/**
	 * Data for class manipulation
	 *
	 * @var	array
	 */
	public $data = array();

在程式中使用單行註解，在大塊的註解與程式中間留下一個空行。

::

	// break up the string by newlines
	$parts = explode("\n", $str);

	// A longer comment that needs to give greater detail on what is
	// occurring and why can use multiple single-line comments.  Try to
	// keep the width reasonable, around 70 characters is the easiest to
	// read.  Don't hesitate to link to permanent external resources
	// that may provide greater detail:
	//
	// http://example.com/information_about_something/in_particular/

	$parts = $this->foo($parts);

常數
=========

常數遵循與變數相同的規則，但常數應該永遠使用全大寫字母。
*在適當的時候永遠使用 CodeIgniter 常數，例如 SLASH, LD, RD, PATH_CACHE 等等*

**錯誤的**::

	myConstant	// 缺少底線分隔，以及沒有全部大寫
	N		// 不應使用單個字母的常數
	S_C_VER		// 不具有描述能力的名稱
	$str = str_replace('{foo}', 'bar', $str);	// 應該使用 LD 與 RD 常數

**正確的**::

	MY_CONSTANT
	NEWLINE
	SUPER_CLASS_VERSION
	$str = str_replace(LD.'foo'.RD, 'bar', $str);

TRUE, FALSE, 以及 NULL
=====================

**TRUE**, **FALSE**, 以及 **NULL** 關鍵字應該永遠使用大寫字母。

**錯誤的**::

	if ($foo == true)
	$bar = false;
	function foo($bar = null)

**正確的**::

	if ($foo == TRUE)
	$bar = FALSE;
	function foo($bar = NULL)

邏輯運算子
=================

不建議使用 ``||`` 運算子，因在某些裝置上辨識度低（例如看起來像數字 11）。
``&&`` 比 ``AND`` 為佳，但兩者皆可接受。
``!`` 前後都應該加上空白字元。

**錯誤的**::

	if ($foo || $bar)
	if ($foo AND $bar)  // OK 但是不建議用在一般語法高亮編輯器
	if (!$foo)
	if (! is_array($foo))

**正確的**::

	if ($foo OR $bar)
	if ($foo && $bar) // 推薦作法
	if ( ! $foo)
	if ( ! is_array($foo))


比對回傳值與型別轉換
=======================================

一些 PHP 函式在失敗時回傳 FALSE，但也可能在成功時回傳 "" 或 0，這些值在鬆散比對時也會被當成 FALSE。
當回傳值使用在條件判斷時應該明確的比對變數型別，以確定回傳值確實是所預期的，
而不是在鬆散比對時被型別轉換成相同的值。

在檢查回傳值與使用變數時都嚴格的檢查。
必要時使用 **===** 與 **!==**。

**錯誤的**::

	// 如果 'foo' 位於字串的開頭， strpos 將會回傳 0，
	// 將會造成此條件判斷式被判斷為 TRUE
	if (strpos($str, 'foo') == FALSE)

**正確的**::

	if (strpos($str, 'foo') === FALSE)

**錯誤的**::

	function build_string($str = "")
	{
		if ($str == "")	// 如果參數傳入的是 FALSE 或是 0 會怎樣？
		{

		}
	}

**正確的**::

	function build_string($str = "")
	{
		if ($str === "")
		{

		}
	}


可以參考 `typecasting <http://php.net/manual/en/language.types.type-juggling.php#language.types.typecasting>`_，
來獲得更多資訊。
型別轉換有許多用途，例如當轉換一個變數為字串時，NULL 以及布林 FALSE 會變成空字串，0（以及其它數字）會變成數字字串，
還有布林 TRUE 會變成 "1"::

	$str = (string) $str; // 將 $str 轉型為字串

除錯用程式
==============

不要在送交程式碼時留下除錯用程式，即使是註解掉的。
一些像是 ``var_dump()``, ``print_r()``, ``die()``/``exit()`` 之類的不應該包含在你的程式碼內，除非有除錯以外的用途。

檔案中的空白字元
===================

在 PHP 開始標籤前面，以及結束標籤後面都不應該有空白字元。
由於輸出是被暫存的，在 CodeIgniter 真正開始輸出內容前，空白字元會讓輸出提早開始，
這會造成錯誤，並且使 CodeIgniter 無法送出正確的標頭(headers)。

相容性
=============

CodeIgniter 的最低需求是 PHP 5.2.4。你的程式碼也必須相容這個最低需求，提供合適的備案，
或是做成選擇性啟用的功能。

另外，不要使用會用到非預設函式庫的 PHP 函式，除非你的程式碼在函式庫不存在時能提供替代方法。

一個檔案一個類別
==================

將每個類別放在各自的檔案中，除非這些類別是 *極度相關的* 。
CodeIgniter 裡一個檔案含有多個類別的例子是 Xmlrpc 函式庫檔案。

縮排的空白
==========

在你的程式碼中使用 tab 作為縮排空白，而不是空白字元。
這看起來是個小事，但使用 tab 來取代空白字元允許其它開發者使用他們喜好的縮排等級來閱讀你的程式碼，
並且可以在他們使用的軟體中調整。
另外還有一個好處，使用一個 tab 至少能取代四個空白字元，因此原始碼檔案會更小。

換行
===========

檔案必須儲存為 Unix 換行字元。
這規則比較偏向於 Windows 使用者，總之確認你的編輯器用的是 Unix 換行字元。

程式碼縮排
==============

除了類別宣告以外，使用 Allman style 的縮排。
大括號永遠自己放在一行，並且與其所屬的控制陳述式有相同的縮排。

**錯誤的**::

	function foo($bar) {
		// ...
	}

	foreach ($arr as $key => $val) {
		// ...
	}

	if ($foo == $bar) {
		// ...
	} else {
		// ...
	}

	for ($i = 0; $i < 10; $i++)
		{
		for ($j = 0; $j < 10; $j++)
			{
			// ...
			}
		}

	try {
		// ...
	}
	catch() {
		// ...
	}

**正確的**::

	function foo($bar)
	{
		// ...
	}

	foreach ($arr as $key => $val)
	{
		// ...
	}

	if ($foo == $bar)
	{
		// ...
	}
	else
	{
		// ...
	}

	for ($i = 0; $i < 10; $i++)
	{
		for ($j = 0; $j < 10; $j++)
		{
			// ...
		}
	}

	try
	{
		// ...
	}
	catch()
	{
		// ...
	}

括號間距
===============================

一般來說，括號不應該有額外的空白。
但是在一些需要括號來接受參數的控制結構（declare, do-while,
elseif, for, foreach, if, switch, while）後面應該永遠加上空白，以便與函式區隔，並增加可讀性。

**錯誤的**::

	$arr[ $foo ] = 'foo';

**正確的**::

	$arr[$foo] = 'foo'; // 陣列鍵值兩旁不用空白

**錯誤的**::

	function foo ( $bar )
	{

	}

**正確的**::

	function foo($bar) // 宣告函式時括號周圍不用空白
	{

	}

**錯誤的**::

	foreach( $query->result() as $row )

**正確的**::

	foreach ($query->result() as $row) // 控制結構後面加上一個空白，但不用加在括號內側

多國語系
==============

CodeIgniter 函式庫應該盡可能的利用對應的語系檔案。

**錯誤的**::

	return "Invalid Selection";

**正確的**::

	return $this->lang->line('invalid_selection');

私有方法與變數
=============================

只有在內部使用的方法與變數，例如你的 public 方法用到的工具及幫助函式，應該以底線開頭。

::

	public function convert_text()
	private function _convert_text()

PHP 錯誤
==========

程式碼不應該丟出任何錯誤，並且不能藉由隱藏警告與提醒來達成這個目標。
用到不是自己所建立的變數時（例如 ``$_POST`` 的鍵值），永遠先用 ``isset()`` 檢查後才使用。

確保你的開發環境中為每個使用者都啟用了錯誤回報，以及 display_errors 在 PHP 環境中有啟用。
你可以這樣子檢查::

	if (ini_get('display_errors') == 1)
	{
		exit "Enabled";
	}

在某些伺服器 *display_errors* 被停用了，而你沒有辦法修改 php.ini，那麼你通常可以這樣啟用::

	ini_set('display_errors', 1);

.. note:: 在執行時期使用 ``ini_set()`` 設置 `display_errors
	<http://php.net/manual/en/errorfunc.configuration.php#ini.display-errors>`_
	並不等同於在 PHP 環境中啟用。也就是說若程式發生重大錯誤，將不會有任何作用。

Short Open Tags
===============

永遠使用完整的 PHP 起始標籤，以免伺服器並沒有啟用 *short_open_tag*。

**錯誤的**::

	<? echo $foo; ?>

	<?=$foo?>

**正確的**::

	<?php echo $foo; ?>

.. note:: 自 PHP 5.4 起，永遠可以使用 **<?=** 標籤

一行一個陳述式
======================

永遠不要將多行陳述式合併為一行。

**錯誤的**::

	$foo = 'this'; $bar = 'that'; $bat = str_replace($foo, $bar, $bag);

**正確的**::

	$foo = 'this';
	$bar = 'that';
	$bat = str_replace($foo, $bar, $bag);

字串
=======

永遠使用單引號字串，除非你需要解析變數。
當你需要解析變數時，永遠使用大括號來避免變數名稱解析錯誤。
若是字串中包含了單引號，你也可以使用雙引號來避免使用跳脫字元。

**錯誤的**::

	"My String"					// 沒用到變數解析，使用雙引號沒有特別用處
	"My string $foo"				// 需要加上大括號
	'SELECT foo FROM bar WHERE baz = \'bag\''	// 醜死了

**正確的**::

	'My String'
	"My string {$foo}"
	"SELECT foo FROM bar WHERE baz = 'bag'"

SQL 查詢
===========

SQL 關鍵字永遠使用大寫字母: SELECT, INSERT, UPDATE, WHERE,
AS, JOIN, ON, IN, 等等。

將較長的查詢拆解成多行來增進可讀性，最好每個子句各放在一行。

**錯誤的**::

	// 關鍵字是小寫以及查詢太長(... 表示一行的連續)
	$query = $this->db->query("select foo, bar, baz, foofoo, foobar as raboof, foobaz from exp_pre_email_addresses
	...where foo != 'oof' and baz != 'zab' order by foobaz limit 5, 100");

**正確的**::

	$query = $this->db->query("SELECT foo, bar, baz, foofoo, foobar AS raboof, foobaz
					FROM exp_pre_email_addresses
					WHERE foo != 'oof'
					AND baz != 'zab'
					ORDER BY foobaz
					LIMIT 5, 100");

預設參數
==========================

在適當的時候提供預設參數，可以避免失誤的呼叫造成 PHP 錯誤，並減少一些程式碼。例如::

	function foo($bar = '', $baz = FALSE)
