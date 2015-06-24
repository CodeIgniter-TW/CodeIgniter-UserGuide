###############
Trackback 類別
###############

Trackback 類別提供函式讓你可以傳送與接收 Trackback 資料。

如果你對 Trackback 不熟悉，可以參考 `這邊 <http://en.wikipedia.org/wiki/Trackback>`_ 的資料。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

*************************
使用 Trackback 類別
*************************

初始化類別
======================

就像 CodeIgniter 其它多數類別一樣，
Trackback 類別可以在你的 controller 內透過 ``$this->load->library()`` 函式來初始化::

	$this->load->library('trackback');

載入之後，就可以這樣取得 Trackback 物件::

	$this->trackback

送出 Trackbacks
==================

Trackback 可以從你的 controller 的任何一個函式送出，類似這樣::

	$this->load->library('trackback');

	$tb_data = array(
		'ping_url'  => 'http://example.com/trackback/456',
		'url'       => 'http://www.my-example.com/blog/entry/123',
		'title'     => 'The Title of My Entry',
		'excerpt'   => 'The entry content.',
		'blog_name' => 'My Blog Name',
		'charset'   => 'utf-8'
	);

	if ( ! $this->trackback->send($tb_data))
	{
		echo $this->trackback->display_errors();
	}
	else
	{
		echo 'Trackback was sent!';
	}

陣列資料說明：

-  **ping_url** - 你要送出 Trackback 的目標網站 URL。
   只要使用逗號來分隔，你就可以一次送給多個 URL。
-  **url** - 在你網站出現此參照內容的網誌 URL。
-  **title** - 你的網誌標題。
-  **excerpt** - 你的網誌內容。
-  **blog_name** - 你的網站名稱。
-  **charset** - 你的網站所使用的編碼，如果省略的話將會使用 UTF-8。

.. note:: Trackback 類別會從內容中自動擷取前五百個字元，且清除所有的 HTML。

Trackback 的 send 方法將回傳布林值來代表成功或失敗。
如果失敗了，你可以這樣取得錯誤訊息::

	$this->trackback->display_errors();

接收 Trackbacks
====================

在你可以接收 Trackback 之前你必須有一篇網誌文章。
如果你沒有網誌，那就不用繼續了。

接收 Trackback 比送出要複雜一些，因為你需要資料庫來儲存，而且你還需要檢查送來的資料。
我們鼓勵你做徹底的檢查，以避免廣告或是重複的資料。
你可能也想要限制同一個 IP 在一段時間內能送出的 Trackback 數量，來進一步減少廣告。
接收 Trackback 的步驟非常簡單。大部分的精力都是花費在檢查上。

你的 Ping URL
=============

為了能夠接收 Trackback，你必須在每個網誌文章後面加上 Trackback URL。
人們將透過這個 URL 來發送 Trackback 給你（我們將這個稱為 "Ping URL"）。

你的 Ping URL 必須指到 Trackback 接收程式所在的 controller 方法，
且這個 URL 必須含有文章的編號，這樣你才能找到實際對應的文章。

例如，若是你的 controller 命名為 Trackback，
而且用來接收的函式稱為 receive，那麼你的 Ping URL 應該看起來像這樣::

	http://example.com/index.php/trackback/receive/entry_id

entry_id 就對應到你文章的編號。

建立 Trackback 資料表
==========================

在你可以接收 Trackback 之前你必須要建立一個資料表來儲存。
這是一個基本的雛型::

	CREATE TABLE trackbacks (
		tb_id int(10) unsigned NOT NULL auto_increment,
		entry_id int(10) unsigned NOT NULL default 0,
		url varchar(200) NOT NULL,
		title varchar(100) NOT NULL,
		excerpt text NOT NULL,
		blog_name varchar(100) NOT NULL,
		tb_date int(10) NOT NULL,
		ip_address varchar(45) NOT NULL,
		PRIMARY KEY `tb_id` (`tb_id`),
		KEY `entry_id` (`entry_id`)
	);

Trackback 規格書內只要求 Trackback 送出四種資訊（網址，標題，內容，網站名稱），
但為了提供更多有用的資料，我們在資料表中增加了一些欄位（日期、IP 位址、等等）。

處理 Trackback
======================

這邊示範如何接收並處理 Trackback。
底下的程式碼應該放在你要用來接收 Trackback 的 controller 函式內::

	$this->load->library('trackback');
	$this->load->database();

	if ($this->uri->segment(3) == FALSE)
	{
		$this->trackback->send_error('Unable to determine the entry ID');
	}

	if ( ! $this->trackback->receive())
	{
		$this->trackback->send_error('The Trackback did not contain valid data');
	}

	$data = array(
		'tb_id'      => '',
		'entry_id'   => $this->uri->segment(3),
		'url'        => $this->trackback->data('url'),
		'title'      => $this->trackback->data('title'),
		'excerpt'    => $this->trackback->data('excerpt'),
		'blog_name'  => $this->trackback->data('blog_name'),
		'tb_date'    => time(),
		'ip_address' => $this->input->ip_address()
	);

	$sql = $this->db->insert_string('trackbacks', $data);
	$this->db->query($sql);

	$this->trackback->send_success();

備註：
^^^^^^

文章編號應該放在 URL 第三個區段。
這是基於我們前面給的 URI 範例::

	http://example.com/index.php/trackback/receive/entry_id

注意文章編號是放在第三個區段，你可以這樣取得::

	$this->uri->segment(3);

在上面的接收程式碼中，如果遺漏了第三個區段將會造成錯誤。
如果沒有一個正確的文章編號，就沒有理由繼續處理下去。

$this->trackback->receive() 是一個簡單的驗證函式。
用來檢查接收的資料並確認包含了四種必要的資料（網址，標題，內容，網站名稱）。
回傳值是布林值，用來代表成功或失敗。
若是失敗，你可以送出錯誤訊息。

送來的 Trackback 資料可以這樣取得::

	$this->trackback->data('item')

'item' 代表四種資料的一種：網址，標題，內容，網站名稱

如果資料成功的接收了，你可以送出一個成功訊息::

	$this->trackback->send_success();

.. note:: 以上的程式碼不包含資料驗證，但你應該加上它。

***************
類別參考
***************

.. php:class:: CI_Trackback

	.. attribute:: $data = array('url' => '', 'title' => '', 'excerpt' => '', 'blog_name' => '', 'charset' => '')

		Trackback 資料陣列。

	.. attribute:: $convert_ascii = TRUE

		是否將特殊字元轉換為 HTML entities。

	.. php:method:: send($tb_data)

		:param	array	$tb_data: Trackback 資料
		:returns:	成功時回傳 TRUE，失敗時回傳 FALSE
		:rtype:	bool

		送出 Trackback。

	.. php:method:: receive()

		:returns:	成功時回傳 TRUE，失敗時回傳 FALSE
		:rtype:	bool

		這個方法簡單的驗證了接收到的資料，成功時回傳 TRUE，失敗時回傳 FALSE。
		如果資料是正確的，會被存放在 ``$this->data`` 陣列中，以便放進資料庫。

	.. php:method:: send_error([$message = 'Incomplete information')

		:param	string	$message: 錯誤訊息
		:rtype: void

		回應一個錯誤訊息。

		.. note:: 這個方法將會中止程式的執行。

	.. php:method:: send_success()

		:rtype:	void

		回應一個成功訊息。

		.. note:: 這個方法將會中止程式的執行。

	.. php:method:: data($item)

		:param	string	$item: 資料鍵值
		:returns:	存在時回傳資料內容，否則回傳空字串
		:rtype:	string

		回傳資料陣列中的單個項目。

	.. php:method:: process($url, $data)

		:param	string	$url: 目標網址
		:param	string	$data: POST 原始資料
		:returns:	成功時回傳 TRUE，失敗時回傳 FALSE
		:rtype:	bool

		建立一個網路連線並送出資料給伺服器，成功時回傳 TRUE，失敗時回傳 FALSE。

	.. php:method:: extract_urls($urls)

		:param	string	$urls: 以逗號分隔的 URL 列表
		:returns:	包含 URL 的陣列
		:rtype:	array

		這個方法可以同時送出數個 Trackback。傳入一個字串，包含了所有 URL （以逗號或空白分隔）並將每個 URL 放進一個陣列。

	.. php:method:: validate_url(&$url)

		:param	string	$url: Trackback URL
		:rtype:	void

		單純給 URL 加上 *http://* ，若已有則不變。

	.. php:method:: get_id($url)

		:param	string	$url: Trackback URL
		:returns:	回傳 URL ID，若失敗則回傳 FALSE
		:rtype:	string

		搜尋並傳回 URL ID，若失敗則回傳 FALSE

	.. php:method:: convert_xml($str)

		:param	string	$str: 輸入字串
		:returns:	轉換後的字串
		:rtype:	string

		將 XML 保留字轉換為 entities。

	.. php:method:: limit_characters($str[, $n = 500[, $end_char = '&#8230;']])

		:param	string	$str: 輸入字串
		:param	int	$n: 字串長度上限
		:param	string	$end_char: 要放在字串結尾的字元
		:returns:	縮短的字串
		:rtype:	string

		限制字串的字元數量。會保留完整的單字。

	.. php:method:: convert_ascii($str)

		:param	string	$str: 輸入字串
		:returns:	轉換後的字串
		:rtype:	string

		將特殊字元轉換為 HTML entities。

	.. php:method:: set_error($msg)

		:param	string	$msg: 錯誤訊息
		:rtype:	void

		紀錄錯誤訊息。

	.. php:method:: display_errors([$open = '<p>'[, $close = '</p>']])

		:param	string	$open: 開啟標籤
		:param	string	$close: 結束標籤
		:returns:	HTML 格式的錯誤訊息
		:rtype:	string

		回傳 HTML 格式的錯誤訊息，若沒有錯誤則回傳空字串。
