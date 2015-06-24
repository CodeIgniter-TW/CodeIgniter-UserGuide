##################
自建函式庫
##################

當我們使用 "函式庫（Libraries）" 這個名稱的時候，我們通常指的是位在 libraries 目錄底下的類別，詳細可參考使用手冊中的類別參考的說明。而在這邊，我們要教你的是如何在 application/libraries 建立你自己的函式庫。這是為了將你的函式庫與 CodeIgniter 內建的區分開來。

CodeIgniter 允許你繼承（extend）原有的類別以擴充新功能。你也可以直接取代掉原本的類別，只要你使用與原有類別相同的名稱並放進 *application/libraries* 資料夾裡即可。

總結歸納:

-  你可以建立（create）全新的函式庫。
-  你可以繼承（extend）原有的函式庫。
-  你可以取代（replace）原有的函式庫。

底下詳細解釋這三個概念。

.. note:: 只有資料庫相關的類別無法被繼承，也無法用你自己的版本取代。其他的類別都可以。

存檔位置
=======

自己建立的類別函式可以存放在 *application/libraries* 資料夾，當 CodeIgniter 必須初始化建立類別函式，系統就會來此資料夾查詢並且載入。

命名規則
==================

-  檔名第一個字母必須為大寫。參考範例：Myclass.php
-  類別宣告第一個字母必須為大寫。參考範例：class Myclass
-  類別名稱與檔名必須相同。

類別檔
==============

類別檔應該有底下的基本型態。::

	<?php
	defined('BASEPATH') OR exit('No direct script access allowed'); 

	class Someclass {

		public function some_method()
		{
		}
	}

	/* End of file Someclass.php */

.. note:: 底下取名 Someclass 單純只是舉例而已。

使用自建類別（Using Your Class）
=============================

由 :doc:`Controller <controllers>` 內的函式載入任何類別，可使用下列的標準語法::

	$this->load->library('someclass');

在 *someclass* 的部份，只是該類別檔案名稱，不需要包含”.php“副檔名。你可以使用大寫或是小寫的檔案名稱，CodeIgniter 都可以接受。

一但載入之後，你可以取用你的類別採用 小寫 的方式::

	$this->someclass->some_method();  // 物件方法名稱必須是小寫

於初使化自定類別時傳遞參數
===============================================

在初始化類別時，您可以透過傳遞第二個陣列參數來設定初始建構子::

	$params = array('type' => 'large', 'color' => 'red');

	$this->load->library('someclass', $params);

當你使用這個特性時，你必須為類別的建構子加上底下程式碼::

	<?php defined('BASEPATH') OR exit('No direct script access allowed');

	class Someclass {

		public function __construct($params)
		{
			// Do something with $params
		}
	}

你也可以使用設定檔來存放設定值，只要在 *application/config/* 資料夾裡，建立一個與類別小寫檔案名稱相同的檔案即可。但若是你使用上面所述的方式，由參數來傳入設定值，則設定檔就不會被使用。

在您的程式裡面使用 CodeIgniter 資源
===================================================

使用函式 ``get_instance()`` 可以讓你在自己的函式庫中取得 CodeIgniter 的資源，這個函式將傳回 CodeIgniter 的 super object。

通常你可以在你的 controller 函式裡直接使用 ``$this`` 來呼叫 CodeIgniter 的函式::

	$this->load->helper('url');
	$this->load->library('session');
	$this->config->item('base_url');
	// etc.

然而，這僅在 controllers，models 或是 views 能夠使用。若是你想在你自己製作的類別中使用 CodeIgniter 的類別，你可以這樣做：

首先，取得 CodeIgniter 物件並存放到變數中::

	$CI =& get_instance();

當你將物件放到變數中，你就可以使用這個變數來 *取代* ``$this`` ::

	$CI =& get_instance();

	$CI->load->helper('url');
	$CI->load->library('session');
	$CI->config->item('base_url');
	// 以此類推。

.. note:: 你會發現範例中 ``get_instance()`` 時使用了 & 以取得物件的參考::
	
		$CI =& get_instance();

	這非常非常重要！！ 取得物件的參考可以讓你使用同一個 CodeIgniter 物件，而不是複製一個副本。

However, since a library is a class, it would be better if you
take full advantage of the OOP principles. So, in order to
be able to use the CodeIgniter super-object in all of the class
methods, you're encouraged to assign it to a property instead::

	class Example_library {

		protected $CI;

		// We'll use a constructor, as you can't directly call a function
		// from a property definition.
		public function __construct()
		{
			// Assign the CodeIgniter super-object
			$this->CI =& get_instance();
		}

		public function foo()
		{
			$this->CI->load->helper('url');
			redirect();
		}

		public function bar()
		{
			echo $this->CI->config->item('base_url');
		}

	}

使用個人版本替換原生函式庫
=======================

只要讓你的類別檔案使用與原生函式庫相同的檔案名稱，CodeIgniter 就會自動用它來代替原本的函式庫。 要這麼做，你必須讓檔案名稱與類別名稱都與要替換的原生函式庫完全相同才行。例如，要取代掉原本的 Email 函式庫，你必須在 *application/libraries/Email.php* 建立一個檔案，並宣告你的類別為::

	class CI_Email {
	
	}

Note 大多數的原生類別名稱都使用 CI\_ 做為前置字串。

這時只需要用標準的方式，就可以讀取你的版本::

	$this->load->library('email');

.. note:: 目前還無法使用你自己的類別來替換掉資料庫的類別。

繼承原生函式庫（Extending Native Libraries）
=========================================

如果你想要做的只是增加一些（可能一或兩個）函式給原有的函式庫，那就沒有必要將整個類別替換掉。這個時候使用繼承來擴充類別是更容易的方法。 要繼承一個類別的作法，有點類似將其替換掉，但有以下的差別：

-  宣告類別時必須要繼承父類別。
-  你的新類別名稱與檔案名稱必須使用 MY\_ 做為前置字串。（這是可以設定的，讓我們繼續往下看。）

例如，繼承原生的 Email 類別，你必須建立一個檔案 *application/libraries/MY_Email.php* ，並這樣宣告你的類別::

	class MY_Email extends CI_Email {

	}

如果你需要在你的類別中使用建構子，那你也必須執行父類別的建構子::

	class MY_Email extends CI_Email {

		public function __construct($config = array())
		{
			parent::__construct($config);
		}

	}

.. note:: Not all of the libraries have the same (or any) parameters
	in their constructor. Take a look at the library that you're
	extending first to see how it should be implemented.

載入子類別
----------------------

要讀取你的子類別，使用標準的語法載入即可。注意不要包含前置字串，例如你要讀取上面範例中 Email 的子類別，你可以這樣做:

	$this->load->library('email');

載入成功後，你就可以像平常使用原生類別那樣使用這個子類別。在本例中，你可以這樣使用 email 類別::

	$this->email->some_method();

自訂子類別的前置字串
-----------------------

要設定自己的子類別前置字串（sub-class prefix），請開啟 *application/config/config.php* 然後找到底下的部份::

	$config['subclass_prefix'] = 'MY_';

所有原生的 CodeIgniter 函式庫, 都是使用 CI\_ 的前置字串, 所以別把它拿來用了。
