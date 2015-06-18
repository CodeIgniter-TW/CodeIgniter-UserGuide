########
設定類別
########

設定類別提供一個取得偏好設定的方法。這些偏好可以從預設的設定檔 (application/config/config.php) 或是你自訂的設定檔中取得。

.. 註記:: 此類別會由系統自動執行初始化，因此無須手動執行。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

****************
開始作業設定類別
****************

剖析設定類別
============

在預設裡，CodeIgniter 在 application/config/config.php 中有一個主要設定檔。
若你用文字編輯器打開檔案，將會看到設定的項目存放在一個叫做 $config 的陣列中。

你可以在此檔案中加入你自己的設定項目，或是如果你喜歡將設定項目分開 (假設你還是需要設定項目)，
只需建立你自己的檔案並且存放在設定資料夾中。

.. 註記:: 若是你使用與預設的設定檔相同的格式，建立了你自己的設定檔並存放在 $config 陣列中，即使這些陣列有著相同名稱，CodeIgniter 還是會聰明地管理這些檔案，避免造成衝突。(前提是這些陣列索引的名稱是不同的。)

載入設定檔
=====================

.. 註記::
	CodeIgniter 將會自動載入主要預設檔 (application/config/config.php)，
	所以如果你有建立自己的，只需要載入你自己的設定檔。
	
載入設定檔有兩個方法:

手動載入
********
要載入你自訂的設定檔，你會需要使用在 :doc:`controller </general/controllers>` 中的函數：

	$this->config->load('filename');

其中 filename 是指你的設定檔檔名，不包含 .php 副檔名。

若你需要載入多個設定檔，通常你需要將它合併到一個主要的設定陣列。
但是，如果你在不同的設定檔中有相同的陣列索引名稱，會發生名稱衝突。
為了避免此狀況，你可以設定第二個參數為 TRUE，這樣不同的設定會存放在以檔名為索引的陣列中。
範例::

	// 儲放在陣列中的原型: $this->config['blog_settings'] = $config
	$this->config->load('blog_settings', TRUE);

請見以下 "取得設定項目" 章節，來學習如何使用此方式取得設定項目。

第三個參數讓你抑制當設定檔不存在時會產生的錯誤::

	$this->config->load('blog_settings', FALSE, TRUE);

自動載入
********

若你發現你需要特定全域的設定檔，你可以讓系統自動載入。
開啟位於 application/config/autoload.php 的 **autoload.php** 檔案，
然後按照指示加入你的設定檔。

取得設定項目
============

要從你的設定檔中取得項目，使用以下函數::

	$this->config->item('item_name');

其中 item_name 是你要取得的 $config 陣列索引。舉例來說，要取得你選擇的語言::

	$lang = $this->config->item('language');

若你嘗試要取得的項目不存在，這個方法則會回傳 NULL。

若你使用 ``$this->config->load`` 的第二個參數來指派設定項目給指定的索引，
你可以在 ``$this->config->item`` 的第二個參數，使用指定的索引名稱來取得它。
範例::

	// 讀取叫做 blog_settings.php 的設定檔，並指派給索引叫做 "blog_settings"
	$this->config->load('blog_settings', TRUE);

	// 從叫做 "blog_settings" 的陣列中，取出設定項目名稱叫做 site_name 的值
	$site_name = $this->config->item('site_name', 'blog_settings');

	// 這是另一種方式，一樣可取出相同的項目
	$blog_config = $this->config->item('blog_settings');
	$site_name = $blog_config['site_name'];

建立設定項目
============

若你想要建立一個設定項目，或是修改一個現存的項目，你可以這麼做::

	$this->config->set_item('item_name', 'item_value');

其中 item_name 是你要修改的 $config 陣列索引，而 item_value 是它的值。

.. _config-environments:

環境變數
========

你可以依目前的環境來載入不同的設定檔。
ENVIRONMENT 常數被定義在 index.php，詳細描述請見 :doc:`Handling Environments </general/environments>` 章節。

建立一個特定環境 (environment-specific) 的設定檔，
你需要新增或複製在 application/config/{ENVIRONMENT}/{FILENAME}.php 裡的設定檔。

舉例來說，建立一個只有在產品上線使用的設定檔 (production-only config.php)，你需要這麼做：

#. 建立一個目錄 application/config/production/
#. 在目錄中複製你現存的 config.php
#. 編輯 application/config/production/config.php 讓它包含你的產品上線設定值。

當你設定 ENVIRONMENT 常數為 'production'，將會載入新的只有在產品上線 (production-only config.php) 可使用的設定值。

你可以將以下檔案放在特定環境 (environment-specific) 目錄中：

-  預設的 CodeIgniter 設定檔
-  你自訂的設定檔

.. 註記::
	CodeIgniter 總是優先載入全域設定檔案 (例如：在 application/config/ 中的檔案)，
	接著再嘗試載入目前的環境設定檔。
	這代表你不需要將「所有」設定檔放置在環境目錄中。
	只需要將想要改變的環境設定檔案放入即可。
	在環境目錄中的設定檔通常會覆蓋住全域設定檔。
	

********
類別參考
********

.. php:class:: CI_Config

	.. attribute:: $config

		所有載入設定值的陣列

	.. attribute:: $is_loaded

		所有載入設定檔的陣列


	.. php:method:: item($item[, $index=''])

		:param	string	$item: 設定項目名稱
		:param	string	$index: 索引名稱
		:returns:	回傳設定項目值，若沒有則顯示 NULL
		:rtype:	mixed

		取得一個設定項目。

	.. php:method:: set_item($item, $value)

		:param	string	$item: 設定項目名稱
		:param	string	$value: 設定項目值
		:rtype:	void

		設置一個設定檔中指定的值

	.. php:method:: slash_item($item)

		:param	string	$item: 設定項目名稱
		:returns:	回傳包含 slash 的設定項目，若沒有則顯示 NULL
		:rtype:	mixed

		``item()`` 也是使用相同的方法，不同之處在於在項目的尾端加入一個 slash。

	.. php:method:: load([$file = ''[, $use_sections = FALSE[, $fail_gracefully = FALSE]]])

		:param	string	$file: 設定檔案名稱
		:param	bool	$use_sections: 是否讓設定值載入到它的章節 (主要陣列的索引)
		:param	bool	$fail_gracefully: 回傳 FALSE 或是顯示錯誤訊息
		:returns:	成功則回傳 TRUE，錯誤則為 FALSE
		:rtype:	bool

		載入設定檔案。

	.. php:method:: site_url()

		:returns:	Site URL
		:rtype:	string

		此方法根據你在設定檔中指定的索引取得 URL。

		此方法通常透過 :doc:`URL Helper </helpers/url_helper>` 中對應的功能。

	.. php:method:: base_url()

		:returns:	網址(URL)的基本位置
		:rtype:	string

		此方法透過加入一個選擇性的路徑，來取得你的網站 URL，像是CSS樣式檔或是圖片。
		This method retrieves the URL to your site, plus an optional path such
		as to a stylesheet or image.

		此方法通常透過 :doc:`URL Helper </helpers/url_helper>` 中對應的功能。
		

	.. php:method:: system_url()

		:returns:	你的 CI system/ directory 網址定位點
		:rtype:	string

		此方法可以在你的 CodeIgniter system/directory 取得 URL

		.. 註記:: 此方法是有爭議性的 (This method is DEPRECATED)，因為它鼓勵不安全的編碼。
			  你的 *system/* 目錄不該是公開的。
			
