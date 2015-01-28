################
CodeIgniter URLs
################

在預設情況下，URLs 在 CodeIgniter 是被設計對搜尋引擎以及人類閱讀友善的方式。而不是用標準的 "query string" 的 URLs 同義動態系統，CodeIgniter 使用
(分段式) **segment-based** 像是::

	example.com/news/article/my_article

.. note:: Query string URLs 是可以被啟動的，在下面會再敘述。

URI 區段
============

區段在 URL 中，是通過 Model-View-Controller 架構來完成，常常表示方式如下： ::

	example.com/class/function/ID

#. 第一個區段被調用的是控制器 **class**。
#. 第二個區段代表被稱為類別 **function** 或者方法。
#. 第三個區段，以及所有額外的區段，代表ID以及所有以及後面的變數，它會傳送到 controller 裡面。

:doc:`URI Library <../libraries/uri>` 以及 :doc:`URL Helper
<../helpers/url_helper>` 包含了功能，可以很容易的使用 URI 資料。除此之外，你的 URLs 可以更彈性的被重映射 使用
:doc:`URI Routing <routing>` 功能。

移除掉 index.php 檔案
===========================

在預設情況下 **index.php** 檔案會被包好到你的 URLs： ::

	example.com/index.php/news/article/my_article

如果你的 Apache server 有啟動 **mod_rewrite** ，你可以很簡單的移除掉這個字串，使用簡單的規則通過修改 .htaccess 即可達成。這裡有簡單的範例檔案，使用”原生“方法，來重導向所有請求，除了指定的項目之外：

::
	
	RewriteEngine On
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteRule ^(.*)$ index.php/$1 [L]

在上述的例子中，所有的 HTTP request 除了現有的資料夾以及現有的檔案，其他請求會被視為通過你的 index.php 去請求。
比方說如果你的專案在 http://localhost/CI/index.php 如果放在 CI 這個目錄下，您有個 images 資料夾、以及 index.php 還有 robots.txt 這三個東西必須公開存取的，那麼你可以這樣做：

::

	RewriteEngine on
	RewriteBase /CI
	RewriteCond $1 !^(index\.php|images|robots\.txt|$)
	RewriteRule ^(.*)$ index.php/$1 [L,QSA]

公開存取的檔案或資料夾，在 RewriteCond 中可以通過 | 來分隔公開存取的檔案或資料夾，如果專案是在 http://localhost 底下，那麼 RewriteBase 後面接 / 即可。

.. note:: 這些具體的規則可能並不適用於所有 Server 配置工作。

.. note:: 請務必遵從上面的規則，你可能需要從公開訪問的任何檔案或資料夾排除。

增加 URL 後綴
===================

在你的 **config/config.php** 檔案裡，你可以指定一個後綴來加入到所有的 URLs 產生中，通過 CodeIgniter。以下例子，如果你的 URL 是： ::

	example.com/index.php/products/view/shoes

通過修改參數 **$config['url_suffix']** 你可以增加一個後綴，像是 .html 讓頁面顯示如下例子： ::

	example.com/index.php/products/view/shoes.html

啟動 Query Strings
======================

在一些例子中，如果你比較喜歡使用 query strings URLs 像是： ::

	index.php?c=products&m=view&id=345

CodeIgniter 可選地支援這項功能，它可以被啟動，在你的 **application/config.php** 檔案裡。 如果你打開設定，你會看到以下項目： ::

	$config['enable_query_strings'] = FALSE;
	$config['controller_trigger'] = 'c';
	$config['function_trigger'] = 'm';

如果你修改了 "enable_query_strings" 成 TRUE 這個功能就會被啟動。 你的 controllers 和 functions 將會被通過 "觸發" 字串來存取，你所設定的調用 controllers 以及 methods： ::

	index.php?c=controller&m=method

.. note:: 如果你使用 query strings 你將必須建立你自己的 URLs，而不能用 URL 輔助函式（以及其它輔助函式像是 form輔助函式 來產生 URLs）因為這些設計有基於分段 URL 工作的。
