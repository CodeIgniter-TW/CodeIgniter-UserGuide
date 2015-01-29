################
輔助函式
################

輔助，顧名思義，幫助您的任務。每個輔助函式是一個簡單的功能，在特定類別的集合。 **URL 輔助函式** ，可以幫助我們創建連接，有 Form 輔助函式可以幫助您創建表單元素， **Text 輔助函式** 進行各種文本格式的程序， **Cookie 輔助函式** 設置和讀取cookie， **File 輔助函式** 幫你處理文件，等等。

不像大多數其它系統中，輔助函式不是用物件導向的格式。他們是簡單的，程序的功能。每個輔助函式處理一個特定的任務，與其他功能無依賴性。

CodeIgniter 在預設情況下不讀取任何輔助檔案，所以使用輔助函式第一步就是讀取它們。一旦讀取它們，就會成為全域變數可以通過 :doc:`控制器 Controller <../general/controllers>` 以及
:doc:`Views <../general/views>` 操作它們。

輔助函式通常儲存在你的 **system/helpers** 目錄或 **application/helpers** 目錄。 CodeIgniter 會先找 **application/helpers** 目錄。 如果目錄不存在，或者目錄下不存在這個輔助函式ㄊ，CI 將轉為讀取 **system/helpers/** 目錄下的輔助函式。

載入輔助函式
================

載入一個輔助函式是相當簡單的使用下面的方法： ::

	$this->load->helper('name');

這個 **name** 輔助函式的檔案名稱，不需要 .php 後綴名稱 或者 ”helper“ 字串。

例如，要載入 **URL 輔助函式** 檔案，他的檔案名稱是 **url_helper.php** ，你可以這樣做： ::

	$this->load->helper('url');

輔助函式可以在任何地方被載入，從您的 Controller 方法內（甚至在您 View 的文件，雖然這不是一個很好的做法），只要你使用它之前，你加載它就可以了。你可以加載你的輔助函式在你的 Contoller 建構子，使他們在任何函式內都可以自動地使用，或者您也可以在需要它的特定功能加載一個輔助函式。

.. note:: 輔助函式載入時如上述方法沒有返回值，所以不要嘗試將它分配給一個變數。只要使用它，如上所示。

載入多個輔助函式
========================

如果你需要加載多個輔助函式，你可以在一個陣列，像這樣指定它們： ::

	$this->load->helper(
		array('helper1', 'helper2', 'helper3')
	);

自動載入輔助函式
====================

如果你發現你需要在全域使用特定輔助函式，你可以在 CodeIgniter 的系統初始化過程中自動加載它。這是通過 **application/config/autoload.php** 文件並添加輔助函式的自動加載陣列 **$autoload['helper']** 來完成。

使用輔助函式
==============

一旦你載入了想要使用的輔助函式文件，你會將它視為一個標準的PHP函式。

例如，創造一個連接，使用 ``anchor()`` 函式，放到你的 View 檔案裡，你可以這樣做： ::

	<?php echo anchor('blog/comments', 'Click Here');?>

其中 "Click Here" 是連接的名字，然後 "blog/comments" 是通過 URI 去連接到 controller/method 。

“擴展” 輔助函式
===================

為了 “擴展” 輔助函式，創立一個檔案到 **application/helpers/** 資料夾內 且文件具有與現存輔助函式相同名稱，但是前綴要寫 **MY\_** (該名稱是可配置的，見下文。)。

如果你需要做的就是在現有的輔助函式上添加一些功能，也許增加一個或兩個功能，或者更改特定的輔助函式工作 - 您如果替換掉整個輔助函式那就太不值得。在這種情況下，最好是 ”擴展“ 的輔助函式。

.. note:: 術語 "extend" 是寬鬆地，因為輔助函式是程序化的且獨立的以及不能用傳統的程式設計的意義去擴展它。在底層下，這項功能給你一個能力去增加或替換掉輔助函式提供的功能。

例如，為了擴展原生的 **Array 輔助函式** 你要創立一個檔案名為 **application/helpers/MY_array_helper.php** 然後新增一個函式複寫掉原本的函式： ::

	// any_in_array() 並不在 Array 補助函式中，所以要定義一個新函式
	function any_in_array($needle, $haystack)
	{
		$needle = is_array($needle) ? $needle : array($needle);

		foreach ($needle as $item)
		{
			if (in_array($item, $haystack))
			{
				return TRUE;
			}
	        }

		return FALSE;
	}

	// random_element() 已包含在 Array 補助函式中，所以會覆蓋原有的函式
	function random_element($array)
	{
		shuffle($array);
		return array_pop($array);
	}

設定你自己的前綴
-----------------------

檔案名稱的前綴是 "擴展" 輔助函式，同樣也是或展 函式庫 以及 核心類別。 為了要設定自己的前綴，請打開 **application/config/config.php** 檔案然後尋找這個設定::

	$config['subclass_prefix'] = 'MY_';

請注意所有的原生 CodeIgniter 函式庫的前綴事 **CI\_** 所以不要使用這個字串當做你的前綴。

現在該做什麼?
=========

在目錄表，你會發現所有可用的輔助函式的列表。瀏覽每一個看到他們做了什麼。
