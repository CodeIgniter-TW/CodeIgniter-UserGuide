#####################
從 3.0.2 升級到 3.0.3
#####################

在執行升級之前，你應該更換 index.php 為靜態檔案，將網站導向此靜態網頁。

步驟 1: 更新網站 CodeIgniter 檔案
=================================

取代 *system/* 目錄打下的所有目錄與檔案。

.. 注意:: 假如您有修改此目錄底下的檔案，麻煩請先複製備份。

步驟 2: 確定你的 'base_url' 設定值不是空的
==========================================

當 ``$config['base_url']`` 未設定，CodeIgniter 將會嘗試的辨識你的網站網址是什麼。
這麼做單純的只是為了你在開發一個全新的應用的時候，可以很方便的開始。

自動偵測是一個很不可靠的方式，而且有安全性的隱憂。
這就是為什麼你 **始終應該** 手動的設定！

CodeIgniter 3.0.3 的其中一個改變，就是如何自動化的辨識。
具體的說，將使用伺服器的 IP 位置取代原本由瀏覽器的請求網域名稱的作法。
因此，如果你原本是依靠自動偵測來設定，這將完全改變你網站的運作方式。

如果你需要允許多個網域名稱，例如 http:// 和 https:// 同時動態的根據請求來使用。
*application/config/config.php* 依然是一個 PHP 檔案。
你可以用幾行的程式碼來建立一個動態設定的邏輯，例如::

	$allowed_domains = array('domain1.tld', 'domain2.tld');
	$default_domain  = 'domain1.tld';

	if (in_array($_SERVER['HTTP_HOST'], $allowed_domains, TRUE))
	{
		$domain = $_SERVER['HTTP_HOST'];
	}
	else
	{
		$domain = $default_domain;
	}

	if ( ! empty($_SERVER['HTTPS']))
	{
		$config['base_url'] = 'https://'.$domain;
	}
	else
	{
		$config['base_url'] = 'http://'.$domain;
	}