###########
控制器 Controllers
###########

Controllers 是你應用程式的心臟，它定義了 HTTP 請求過來時應該被如何處理。

.. contents:: 頁面內容

什麼是 Controller?
=====================

**Controller 是簡單來說就是類別檔案，它命名是關聯在 URI 之上。**

像是這樣的 URI： ::

	example.com/index.php/blog/

在以上例子， CodeIgniter 會嘗試去找出被命名為 Blog.php 的檔案 Controller 並且載入它。

**當 controller 的名字找到符合第一個 URI 區段，那麼它就會被載入。**

讓我們嘗試: Hello World!
==========================

讓我們創立一個簡單的 Controller 你可以看到它是怎樣啟動的。使用你的文字編輯器。創造一個檔案名稱為 Blog.php ，將下列程式碼貼入進去： ::

	<?php
	class Blog extends CI_Controller {

		public function index()
		{
			echo 'Hello World!';
		}
	}

然後儲存到你的 *application/controllers/* 目錄下。

.. important:: 檔案一定要被命名為 'Blog.php'，第一個字母必須大寫 'B'。

現在來用 URL 拜訪你的網站像是這樣： ::

	example.com/index.php/blog/

如果你做的沒錯，那就會出現：

	Hello World!

.. important:: 類別名稱必須以大寫字母開頭。

以下是正確的方式： ::

	<?php
	class Blog extends CI_Controller {

	}
	
以下是 **不** 正確： ::

	<?php
	class blog extends CI_Controller {

	}

總是要記得你的 Controller 要 extends 父 Controller 類別，這樣才能繼承父類別的所有方法。

方法
=======

在上上述中方法名稱被命名為 ``index()``. 如果 URI 中的 第二個區段 是空的話，這個 "index" 是預設被載入。除此之外還有一個方法顯示出 "Hello World" 像是： ::

	example.com/index.php/blog/index/

**URI 中的第二個參數定義了 controller 中的方法要執行哪一個。**

我們來試試看。新增一個新的方法到你的 Controller： ::

	<?php
	class Blog extends CI_Controller {

		public function index()
		{
			echo 'Hello World!';
		}

		public function comments()
		{
			echo 'Look at this!';
		}
	}

現在讀取上例 URL 去看 comments 方法： ::

	example.com/index.php/blog/comments/

你將會看到新的結果。

通過 URI 區段執行你的方法
====================================

如果你的 URI 包含超過兩一個以上的區段，它們會經由你的 method 傳入作為參數。

例如，如果說你有一個 URI 像這樣： ::

	example.com/index.php/products/shoes/sandals/123

你會傳送 URI 第 3 以及 4 區段進入方法裡（“sandals” 和 “123”）： ::

	<?php
	class Products extends CI_Controller {

		public function shoes($sandals, $id)
		{
			echo $sandals;
			echo $id;
		}
	}

.. important:: 如果你使用 :doc:`URI 路由 <routing>` 功能，通過你傳入的方法區段，將會重新路由一次。

定義預設 控制器（Controller）
=============================

CodeIgniter 當 URI 不存在的時候，如果當你個網站根目錄 URL 被請求時，可以被設定預設載入的 Controller。 去指定預設得 Controller，打開你的 **application/config/routes.php** 檔案然後設定這個變數： ::

	$route['default_controller'] = 'Blog';

如果這個名稱 Blog 是你預設想要處理的 Controller 類別。如果你現在讀取 index.php 沒有指定任何 URI 區段，你將會看到你的 Hello World 訊息。

重映射方法呼叫
======================

如上所述，第二個 URI 區段簡單定義了要請求 Controller 的哪個方法。 CodeIgniter 允許你複寫這個行為，通過使用 ``_remap()`` 方法： ::

	public function _remap()
	{
		// Some code here...
	}

.. important:: 如果你的 Controller 包含了命名為 _remap() 方法，不管你的 URI 包含什麼，它將會 總是請求呼叫。 它覆蓋了原本定義在 URI 中的行為，允許你自己定義方法路由規則。

複寫的方法呼叫將作為參數傳遞給 ``_remap()`` 方法（典型的第二個 URI 區段）： ::

	public function _remap($method)
	{
		if ($method === 'some_method')
		{
			$this->$method();
		}
		else
		{
			$this->default_method();
		}
	}

在方法之後的所有額外的區段，將會被傳入 ``_remap()`` 當作可選的第二個參數。這個陣列可以搭配 PHP 的  `call_user_func_array() <http://php.net/call_user_func_array>`_ 去模擬 CodeIgniter 的預設行為。

例如::

	public function _remap($method, $params = array())
	{
		$method = 'process_'.$method;
		if (method_exists($this, $method))
		{
			return call_user_func_array(array($this, $method), $params);
		}
		show_404();
	}

輸出處理
=================

CodeIgniter 有一個 Output 類別會自動地處理你最後傳送給瀏覽器的呈現資料。更多的資訊可以從這裡找到 :doc:`視圖 Views <views>` 和 :doc:`Output 類別
<../libraries/output>` 頁面。在某些情況下，你可能想要以某種方式將最後處理的資料傳送到瀏覽器。CodeIgniter 允許你新增一個命名為 ``_output()`` 的方法到你的控制器（Controller），它將會接收最後輸出的資料。

.. important:: 如果你的 Controller 包含一個方法命名為 ``_output()`` 它將會 總是被 output 類別呼叫來取代直接輸出最終的結果資料。方法的第一個參數將包含最終的輸出。

這裡是例子::

	public function _output($output)
	{
		echo $output;
	}

.. note::

	請注意你的 ``_output()`` 方法將會接收資料在最後的狀態。 在它轉交給 ``_output()`` 方法之前，評測和記憶體使用資料將被呈現出來，快取檔案會被寫入（如果你把快取設定打開），以及標頭檔會被傳送出去（如果你用了這個 :doc:`功能 <../libraries/output>` ）。 為了要你的 Controller 適當地輸出快取，它的 ``_output()`` 方法可以用： ::

		if ($this->output->cache_expiration > 0)
		{
			$this->output->_write_cache($output);
		}

	如果你用了這項功能，頁面執行時間以及記憶體使用量，將無法精準的計算出來，因為它們不會考慮你進一步做的處理。 所有處理完成 之前，對於另一種方式控制輸出，請參閱可用的方法 :doc:`Output Library <../libraries/output>`。

私有方法
===============

在某些情況下，你可能想要從外部隱藏起來一些方法。為了達到這個目的， 簡單的利用 private 或者用 protected 定義方法，它們不會經由 URL 請求而回傳結果。例如，如果你有個方法像是這樣： ::

	private function _utility()
	{
		// some code
	}

試著通過這個 URL 存取它，像是這樣，就不會執行了： ::

	example.com/index.php/blog/_utility/

.. note:: 使用前綴底線的方法名稱也是為了防止被呼叫。 這是原本就有的功能，目的是向後兼容。

組織你的 Controller 到子目錄中
================================================

如果你建立一個龐大的應用程式，你可能找到一個方便的方法組織你的 Contollers 到子目錄中。CodeIgniter 允許你去做這件事。

簡單地新增一個資料夾在你的 *application/controllers/* 目錄底下 然後把你地 Controller 類別放進去。

.. note:: 當你用了這個功能，第一個 URI 區段一定要指定到那個資料夾。例如，如果說你有一個 Controller 位於這裡： ::

		application/controllers/products/Shoes.php

	為了呼叫上述的 controller 你的 URI 將會看起來像是如此： ::

		example.com/index.php/products/shoes/show/123

當 URL 中只包含子目錄，每一個子目錄可能要有一個預設的 Controller。 簡單的命名你的預設 Controller 通過 *application/config/routes.php* 檔案來修改。

CodeIgniter 也允許你去重新映射你的 URIs，通過 :doc:`URI
Routing <routing>` 功能，來達成它。

類別建構子
==================

如果你打算用建構子在所有個 Controller 裡面，你 **一定要** 貼入下面這段程式碼到你的建構子裡： ::

	parent::__construct();

因為 Controller 本身的建構子就被父 Controller 類別之一複寫了，所以你必須這樣做，所以我們要手動呼叫它。

例如::

	<?php
	class Blog extends CI_Controller {

		public function __construct()
		{
			parent::__construct();
			// Your own constructor code
		}
	}

當你的類別在實例話的時候，如果你要建立一些預設的值，或者執行預設的程序，建構子是可以非常有用的完成。 建構子不可以回傳值，但是它可以幫你完成一些預設的工作。

保留的方法名稱
=====================

因為你的 controller 類別是擴展主要的應用程式 controller ，所以你必須小心命名你的方法名稱，除了你要複寫這些本來的方法。 查看 :doc:`Reserved Names <reserved_names>` 所有清單。

.. important:: 你也不應該將方法命名為它的類別名稱。如果你這樣做，並沒有 ``__construct()`` 方法在同一個類別內，然後你的例子 ``Index::index()`` 方法將會被執行當作建構子! 這是 PHP4 向後兼容的功能。

就這樣！
==========

簡而言之，這些是所有關於 Controllers 的核心部分介紹。
