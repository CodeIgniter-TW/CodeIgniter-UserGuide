################
User Agent 類別
################

User Agent 類別提供函數來幫助你辨別瀏覽器、
行動裝置或是機器人(Robot)的資訊，
此外你也可以取得參照位址(referrer)、語系與編碼資訊。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

**************************
使用 User Agent 類別
**************************

初始化類別
======================

就像 CodeIgniter 其它多數類別一樣，
User Agent 類別可以在你的 controller 內透過 $this->load->library 函式來初始化::

	$this->load->library('user_agent');

載入之後，就可以這樣取得 Zip 物件： ``$this->agent``

User Agent 定義
======================

User Agent 的定義檔放置在 application/config/user_agents.php，如有必要你可以額外增加項目。

範例
=======

當 User Agent 初始化後，
它將開始判斷是瀏覽器、行動裝置或機器人來造訪你的網頁，
如果可以它也會取得平台資訊。

::

	$this->load->library('user_agent');

	if ($this->agent->is_browser())
	{
		$agent = $this->agent->browser().' '.$this->agent->version();
	}
	elseif ($this->agent->is_robot())
	{
		$agent = $this->agent->robot();
	}
	elseif ($this->agent->is_mobile())
	{
		$agent = $this->agent->mobile();
	}
	else
	{
		$agent = 'Unidentified User Agent';
	}

	echo $agent;

	echo $this->agent->platform(); // Platform info (Windows, Linux, Mac, etc.)

***************
類別參考
***************

.. php:class:: CI_User_agent

	.. php:method:: is_browser([$key = NULL])

		:param	string	$key: 瀏覽器的名稱，可省略
		:returns:	如果是（指定的）瀏覽器，回傳 TRUE，否則回傳 FALSE
		:rtype:	bool

		判別是否為已知的瀏覽器，回傳 TRUE 或 FALSE。
		::

			if ($this->agent->is_browser('Safari'))
			{
				echo 'You are using Safari.';
			}
			elseif ($this->agent->is_browser())
			{
				echo 'You are using a browser.';
			}

		.. note:: 在這個範例中 "Safari" 這個字串是瀏覽器清單裡面陣列的鍵值。
			你可以在 **application/config/user_agents.php**
			找到瀏覽器清單來新增或修改設定。

	.. php:method:: is_mobile([$key = NULL])

		:param	string	$key: 行動裝置的名稱，可省略
		:returns:	如果是（指定的）行動裝置，回傳 TRUE，否則回傳 FALSE
		:rtype:	bool

		判別是否為已知的行動裝置，回傳 TRUE 或 FALSE。
		::

			if ($this->agent->is_mobile('iphone'))
			{
				$this->load->view('iphone/home');
			}
			elseif ($this->agent->is_mobile())
			{
				$this->load->view('mobile/home');
			}
			else
			{
				$this->load->view('web/home');
			}

	.. php:method:: is_robot([$key = NULL])

		:param	string	$key: 機器人名稱，可省略
		:returns:	如果是（指定的）機器人，回傳 TRUE，否則回傳 FALSE
		:rtype:	bool

		判別是否為已知的機器人，回傳 TRUE 或 FALSE。

		.. note:: 機器人清單中只包含了幾種最常見的機器人，而不是完整的清單。
			由於機器人種類有數百種，因此想要把每一種都找出來是沒有效率的。
			如果你發現常常造訪網站的機器人不在清單內，你可以將其加入
			**application/config/user_agents.php** 。

	.. php:method:: is_referral()

		:returns:	若使用者是否從其它網站過來的，回傳 TRUE，否則回傳 FALSE
		:rtype:	bool

		判斷使用者是否從其它網站過來，回傳 TRUE 或 FALSE。

	.. php:method:: browser()

		:returns:	偵測到的瀏覽器名稱或是空字串
		:rtype:	string

		回傳正在造訪你的網站的瀏覽器名稱。

	.. php:method:: version()

		:returns:	偵測到的瀏覽器版本或是空字串
		:rtype:	string

		回傳正在造訪你的網站的瀏覽器版本。

	.. php:method:: mobile()

		:returns:	偵測到的行動裝置品牌或是空字串
		:rtype:	string

		回傳正在造訪你的網站的行動裝置名稱。

	.. php:method:: robot()

		:returns:	偵測到的機器人名稱或是空字串
		:rtype:	string

		回傳正在造訪你的網站的機器人名稱。

	.. php:method:: platform()

		:returns:	偵測到的作業系統或是空字串
		:rtype:	string

		回傳正在造訪你的網站的平台名稱 (Linux，Windows，OS X，等等)。

	.. php:method:: referrer()

		:returns:	偵測到的來源網址或是空字串
		:rtype:	string

		假如使用者是從其它網站造訪，通常你可以這樣子來檢查::

			if ($this->agent->is_referral())
			{
				echo $this->agent->referrer();
			}

	.. php:method:: agent_string()

		:returns:	完整的使用者代理(user agent)字串或是空字串
		:rtype:	string

		回傳完整的使用者代理(user agent)資訊。通常會是類似這樣的字串::

			Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US; rv:1.8.0.4) Gecko/20060613 Camino/1.0.2

	.. php:method:: accept_lang([$lang = 'en'])

		:param	string	$lang: 語系代碼
		:returns:	如果語系是被接受的，回傳 TRUE，否則回傳 FALSE
		:rtype:	bool

		讓你檢查使用者代理(user agent)是否接受某個語系，例如::

			if ($this->agent->accept_lang('en'))
			{
				echo 'You accept English!';
			}

		.. note:: 這個方法並不是非常可靠，因為某些瀏覽器並沒有提供語系資訊，
			即使有提供，也不一定是精確的。

	.. php:method:: languages()

		:returns:	包含可接受的語系的陣列
		:rtype:	array

		回傳一個陣列，包含了使用者代理(user agent)支援的語系。

	.. php:method:: accept_charset([$charset = 'utf-8'])

		:param	string	$charset: 編碼名稱
		:returns:	如果編碼是可接受的，回傳 TRUE，否則回傳 FALSE
		:rtype:	bool

		讓你檢查使用者代理(user agent)是否接受特定的編碼，例如::

			if ($this->agent->accept_charset('utf-8'))
			{
				echo 'You browser supports UTF-8!';
			}

		.. note:: 這個方法並不是非常可靠，因為某些瀏覽器並沒有提供編碼資訊，
			即使有提供，也不一定是精確的。

	.. php:method:: charsets()

		:returns:	包含可接受的編碼的陣列
		:rtype:	array

		回傳一個陣列，包含了使用者代理(user agent)支援的編碼。

	.. php:method:: parse($string)

		:param	string	$string: 一個客製的使用者代理(user agent)字串
		:rtype:	void

		分析一個客製的使用者代理(user agent)字串，而不是目前訪客使用的那一個。
