#######################
CodeIgniter 一目了然
#######################

CodeIgniter 是網站應用程式框架
=======================================

CodeIgniter 網站應用程式框架 - 給運用PHP開發網站工程師的一個工具。它的目使你在開發專案時需要使用一般功能時，它提供一群豐富的函式庫以及函式庫介面和存取函式庫的邏輯結構，使你在開發一般功能時比從頭造輪子還快許多。 CodeIgniter 讓你專注於專案之上，使你寫出最小化的程式碼達到需要的功能。

CodeIgniter 是免費的
===================

CodeIgniter 是授權在 Apache/BSD-style 開放原始碼 license 你可以盡情地使用它。想要知道更多資訊請閱讀 :doc:`license agreement <../license>` 。

CodeIgniter 是輕量的
===========================

真的很輕量。核心系統只需有幾個非常小的 Library。與現今需要大量資源的 Framework 相比。除此之外函式庫是根據需求才會讀取進來的，所以基礎系統是非常小且快速。

CodeIgniter 是快速的
===================

真的超快。我們跟你挑戰，你絕對找不到比 Codeigniter 還快的 Framework。

CodeIgniter 使用 M-V-C 架構
======================

CodeIgniter 使用 Model-View-Controller 架構，這讓你把邏輯、呈現很好的分開。設計師在設計你的模板檔案，可以達到最小化的程式碼，這是非常好的架構。

CodeIgniter 創造出簡潔的 URL
================================

創造出簡潔、對搜尋引擎友善的 URLs。而不是運用標準的 “query string” 達到同義詞動態系統的 URLs，CodeIgniter 運用分段來完成。::

	example.com/news/article/345

Note: 預設 index.php 字串是包含在 URL 裡面的 (example.com/index.php/news/article/345)，但是這個字串可以被省略掉，通過 .htaccess 檔案設定。

CodeIgniter 全力一擊
=========================

CodeIgniter 是全能的函式庫，它可以使你完成大部分的網頁開發任務，像是存取資料庫，傳送信件，表單驗證，維持session，操作圖片，操作 XML-RPC 資料甚至更多功能。

CodeIgniter 是可擴展的
=========================

系統可以被簡單的擴展，只要通過我們的 libraries、 helpers 或者通過 Class Extensions 或 System Hooks。

CodeIgniter 不需要模板引擎
==============================================

雖然 CodeIgniter *可以* 使用簡單的模板解析器，不過這些是可選的，我們不強迫你使用它。模板引擎根本無法比擬原生的PHP性能，而且模板語言往往都難過學習PHP語言的基礎。來看看這段 PHP code::

	<ul>
	<?php foreach ($addressbook as $name):?>
		<li><?=$name?></li>
	<?php endforeach; ?>
	</ul>

來比較使用虛擬碼的模板語言::

	<ul>
	{foreach from=$addressbook item="name"}
		<li>{$name}</li>
	{/foreach}
	</ul>

沒錯，樣板語言解析稍微簡潔一點，但是它需要花額外的效能去解析虛擬碼回 PHP 來執行。所以我們其一的目標就是 *最佳化* 性能，我們選擇不需要使用模板語言。

CodeIgniter 是完全文件化的
====================================

工程師喜歡寫程式碼，討厭寫文件。我們不一樣，為什麼這麼說呢，因為文件是 **非常重要** 的對程式碼來說，我們致力於把它做好。因此我們的原始碼是非常簡潔的且有良好的註解。

CodeIgniter 有很友善的社群使用者
=============================================

我們正在成長的社群有積極參與的夥伴們
`Community Forums <http://forum.codeigniter.com/>`_.
