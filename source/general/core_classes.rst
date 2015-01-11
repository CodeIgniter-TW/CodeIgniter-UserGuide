############################
新增系統核心類別
############################

每次 CodeIgniter 執行時，有幾個基礎類別會自動初始化，成為核心框架的一部分。不過還是有可能用你自己的版本來置換甚至擴充這些系統核心類別。

**大部分的使用者永遠不會需要這樣做，但是這個選項還是保留給那些想要大幅置換或擴充 CodeIgniter 核心的人。**

.. note:: 介入核心系統可能引發許多隱藏的問題，所以請在這麼做之前確定你知道你自己在做什麼。

系統類別列表
=================

以下是一個系統核心檔案的清單，每次 CodeIgniter 執行時都會呼叫他們： :

-  Benchmark
-  Config
-  Controller
-  Exceptions
-  Hooks
-  Input
-  Language
-  Loader
-  Log
-  Output
-  Router
-  Security
-  URI
-  Utf8

更換核心類別
======================

要用你自己的系統核心類別來置換預設的，只要將你自己的版本放在 *application/core* 目錄裡： ::

	application/core/some_class.php

如果這個目錄不存在，你可以自己新增。

任何與在上述清單中檔案名稱相符的檔案都會被載入，取代系統正常使用的。

請注意，你的類別名稱必須使用 CI 作為前置字串。例如，如果你的檔案名稱是 Input.php ，那類別名稱將是： ::

	class CI_Input {

	}

繼承核心類別
====================

如果你所要做的只是在現存程式庫中加入一些功能，例如增加一兩個函數，那置換掉整個程式庫就太過火了。在這個狀況下，擴充類別是比較好的做法。擴充一個類別與用一些例外來取代一個類別幾乎是相同的： :

-  類別宣告必須繼承（extend）父類別
-  你的新類別名稱與檔名必須使用 MY\_ 前置字串（這是可設定的，請見下述）。

例如，要擴充一個內建的 Input 類別，你要先新增檔名為 application/core/MY_Input.php 的檔案，然後這樣宣告你的類別： ::

	class MY_Input extends CI_Input {

	}

.. note:: 如果你需要在你的類別中使用建構函數（Constructor），確定有在裡面擴充父類別的建構函數（Constructor）：

::

		class MY_Input extends CI_Input {

			public function __construct()
			{
				parent::__construct();
			}
		}

**Tip:**  你類別中任何與父類別中相同名稱的函數，將會取代父類別的（這一般叫做“方法覆蓋 method overriding”）。這個方式允許你實質上改變 CodeIgniter 的核心。

如果你要擴充控制器（Controller）核心類別，請確定有在你的應用程式控制器（Controller）的建構函數（Constructor）中擴充你的新類別。

::

	class Welcome extends MY_Controller {

		public function __construct()
		{
			parent::__construct();
		}

		public function index()
		{
			$this->load->view('welcome_message');
		}
	}

自訂子類別的前綴字串
-----------------------

要設定你自己的子類別前置字串，請編輯你的 *application/config/config.php* 檔案並修改下面的項目： ::

	$config['subclass_prefix'] = 'MY_';

請注意，所有的 CodeIgniter 內建程式庫都使用 CI\_ 前綴字串，所以不要用它來當作你自己的前綴字串。
