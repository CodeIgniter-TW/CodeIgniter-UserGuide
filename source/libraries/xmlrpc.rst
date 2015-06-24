##################################
XML-RPC 及 XML-RPC Server 類別
##################################

CodeIgniter 的 XML-RPC 類別讓你可以送出請求給另一個伺服器，
或是建立你自己的 XML-RPC 伺服器來接收請求。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

****************
什麼是 XML-RPC?
****************

簡單來說那是一種通訊方法，可以讓兩台電腦使用 XML 透過網路通訊。
在我們稱為客戶端的電腦，送出一個 XML-RPC **請求** 到另一台稱為伺服器的電腦。
當伺服器收到請求並處理完後，將會送回一個 **回應** 給客戶端。

例如使用 MetaWeblog API 時，XML-RPC 客戶端（通常是一個桌面發行工具）
將會送出一個請求給你網站上的 XML-RPC 伺服器。
這個請求可能是張貼新的文章，也可能要編輯現有的文章。
當 XML-RPC 伺服器收到這個請求時，將會檢查要呼叫哪一個類別/方法來處理。
處理完畢之後，伺服器就送回一個回應訊息。

你可以瀏覽 `XML-RPC <http://www.xmlrpc.com/>`_ 網站來獲得詳細的規格。

***********************
使用 XML-RPC 類別
***********************

初始化類別
======================

就像 CodeIgniter 其它多數類別一樣，XML-RPC 及 XML-RPCS 類別可以在你的 controller 內透過 $this->load->library 函式來初始化:

你可以這樣載入 XML-RPC 類別::

	$this->load->library('xmlrpc');

載入之後，就可以這樣取得 xml-rpc 物件：
$this->xmlrpc

你可以這樣載入 XML-RPC Server 類別::

	$this->load->library('xmlrpc');
	$this->load->library('xmlrpcs');

載入之後，就可以這樣取得 xml-rpcs 物件：
$this->xmlrpcs

.. note:: 當使用 XML-RPC Server 類別時，你必須將 XML-RPC 與 XML-RPC Server 類別都載入。

送出 XML-RPC 請求
========================

你必須提供下列資訊來送出請求給 XML-RPC 伺服器：

-  伺服器的 URL
-  你要呼叫的伺服器方法
-  *請求* 資料（稍後說明）

這是一個基本的範例，用來送出 Weblogs.com ping 給
`Ping-o-Matic <http://pingomatic.com/>`_

::

	$this->load->library('xmlrpc');

	$this->xmlrpc->server('http://rpc.pingomatic.com/', 80);
	$this->xmlrpc->method('weblogUpdates.ping');

	$request = array('My Photoblog', 'http://www.my-site.com/photoblog/');
	$this->xmlrpc->request($request);

	if ( ! $this->xmlrpc->send_request())
	{
		echo $this->xmlrpc->display_error();
	}

說明
-----------

上面的程式碼初始化 XML-RPC 類別，設定了伺服器 URL 以及要呼叫的方法（weblogUpdates.ping）。
請求（此例為標題與網站的 URL）被放進一個陣列以便傳輸，並且使用了 request() 函式來編譯。
之後整個請求被送出。如果 send_request() 方法回傳了 false 我們就顯示 XML-RPC Server 送回的錯誤訊息。

剖析請求
====================

一個 XML-RPC 請求就是你送去給 XML-RPC 伺服器的資料。
請求內的每一個資料片段都被當成一個請求參數。
上面的例子裡有兩個參數：URL 以及你的網站標題。
當 XML-RPC 伺服器收到你的請求時，將會尋找其必要的參數。

請求參數必須被放進陣列來傳輸，且每個參數可以是七種資料型態（strings, numbers, dates, 等等）之一。
如果你的參數是字串以外的資料型態，你必須在陣列裡面包含資料型態。

這個範例是一個含有三個參數的陣列::

	$request = array('John', 'Doe', 'www.some-site.com');
	$this->xmlrpc->request($request);

如果你使用了字串以外的資料型態，或是你有多種不同的資料型態
你需要將每個參數放在它自己的陣列當中，
並在第二個位置中指定資料型態::

	$request = array(
		array('John', 'string'),
		array('Doe', 'string'),
		array(FALSE, 'boolean'),
		array(12345, 'int')
	); 
	$this->xmlrpc->request($request);

在底下的 `資料型態 <#datatypes>`_ 小節有一個完整的資料型態列表。

建立 XML-RPC Server
==========================

XML-RPC Server 的運作就像交通警察一樣，等待請求進來，
然後轉送到適當的函式去處理。

要建立你自己的 XML-RPC 伺服器，需要在你預期收到請求的 controller
裡面初始化 XML-RPC Server 類別，然後設置一個陣列來對應到指令，
這樣子收到請求時就會被送到適當的類別與方法去處理。

這是範例::

	$this->load->library('xmlrpc');
	$this->load->library('xmlrpcs');

	$config['functions']['new_post'] = array('function' => 'My_blog.new_entry');
	$config['functions']['update_post'] = array('function' => 'My_blog.update_entry');
	$config['object'] = $this;

	$this->xmlrpcs->initialize($config);
	$this->xmlrpcs->serve();

上面的範例包含了一個陣列，指定了伺服器允許的兩個方法。
方法的名稱在等號左邊的陣列裡設定，
而要用來處理這個請求的類別與方法則設定在等號右邊的陣列裡。

The 'object' key is a special key that you pass an instantiated class
object with, which is necessary when the method you are mapping to is
not part of the CodeIgniter super object.

也就是說，如果 XML-RPC 客戶端送出一個 new_post 的請求，
你的伺服器會載入 My_blog 類別並且呼叫 new_entry 方法。
如果請求的是 update_post 方法，
你的伺服器會載入 My_blog 類別並呼叫 ``update_entry()`` 方法。

在這個例子裡的函式名稱是隨意的。
你可以自己決定要用什麼名稱，若你用的是其它標準的 API，
像是 Blogger 或是 MetaWeblog API，
那你需要使用它們的函式名稱。

此外，在初始化 XML-RPC Server 類別時有二個配置你或許會用到:
debug 可以設定為 TRUE 來開啟除錯模式，
以及 xss_clean 可以設定為 FALSE 以避免在傳送資料時經過 Security 類別的 ``xss_clean()`` 方法。

處理請求
==========================

當 XML-RPC Server 接收到一個請求，並且載入了用來處理的類別/方法時，
會傳入一個包含客戶端資料的物件給處理的方法。

以上面的例子，如果請求了 new_post 方法，
伺服器將會預期有一個類別長的像這樣::

	class My_blog extends CI_Controller {

		public function new_post($request)
		{

		}
	}

$request 這個變數是個由 Server 編譯過的物件，
它包含了從客戶端所發出的請求，使用這個物件你可以存取 *請求參數* 並且進行處理。
當一切都處理完畢後將會發送回應給客戶端。

以下是一個真實的範例，使用 Blogger API 中的 ``getUserInfo()`` 函數，
客戶端將會向伺服器傳送 username 與 password，
伺服器會回傳特定使用者的資料(暱稱，使用者ID，電子信箱..等)
用來處理的函式看起來可能樣這樣::

	class My_blog extends CI_Controller {

		public function getUserInfo($request)
		{
			$username = 'smitty';
			$password = 'secretsmittypass';

			$this->load->library('xmlrpc');

			$parameters = $request->output_parameters();

			if ($parameters[1] != $username && $parameters[2] != $password)
			{
				return $this->xmlrpc->send_error_message('100', 'Invalid Access');
			}

			$response = array(
				array(
					'nickname'  => array('Smitty', 'string'),
					'userid'    => array('99', 'string'),
					'url'       => array('http://yoursite.com', 'string'),
					'email'     => array('jsmith@yoursite.com', 'string'),
					'lastname'  => array('Smith', 'string'),
					'firstname' => array('John', 'string')
				),
	                         'struct'
			);

			return $this->xmlrpc->send_response($response);
		}
	}

注意：
------

``output_parameters()`` 函數取得一個陣列，對應到客戶端送出的請求參數。
在上述的範例中參數將是 username 與 password。

假如收到的 username 與 password 是無效的，
則使用 ``send_error_message()`` 回傳錯誤訊息。

如果操作成功了，回應裡就會包含一個陣列，裡面存放了用戶資料。

回應的格式
=====================

與 *請求* 相同， *回應* 必須為陣列，
但差別在於回應的陣列 **只含有單一項目** ，
這個項目可以是一個多維陣列，但是回應的主陣列裡只能有一個主要的索引，
底下為一個基本的雛型:::

	$response = array('Response data', 'array');

然而，一般來說回應通常都含有複數的資訊，
為了達成這樣的目的，我們需要將這些資訊放在陣列中，
並讓回應的主陣列保持只有一筆資料。
這個範例展示如何回傳複數資訊::

	$response = array(
		array(
			'first_name' => array('John', 'string'),
			'last_name' => array('Doe', 'string'),
			'member_id' => array(123435, 'int'),
			'todo_list' => array(array('clean house', 'call mom', 'water plants'), 'array'),
		),
		'struct'
	);

注意到上面的陣列被標示為 struct 資料型態。
這是回應最常見的資料型態。

就像請求一樣，回應也可以使用列在 `資料型態 <#datatypes>`_ 裡面的七種型態。

發生錯誤時的回應
=========================

如果你需要送錯誤訊息給客戶端，你可以這樣做::

	return $this->xmlrpc->send_error_message('123', 'Requested data not available');

第一個參數是錯誤代碼，
第二個參數是錯誤訊息。

建立你自己的客戶端與伺服器
===================================

為了幫助你了解目前所提到的，
我們來建立一對 controller 來做為 XML-RPC 客戶端與伺服器，
你可以從客戶端發出請求給伺服器，並且接收到回應。

客戶端
----------

使用文字編輯器建立一個 controller 叫作 Xmlrpc_client.php，
輸入以下的程式碼後儲存到 application/controllers/ 資料夾::

	<?php

	class Xmlrpc_client extends CI_Controller {

		public function index()
		{
			$this->load->helper('url');
			$server_url = site_url('xmlrpc_server');

			$this->load->library('xmlrpc');

			$this->xmlrpc->server($server_url, 80);
			$this->xmlrpc->method('Greetings');

			$request = array('How is it going?');
			$this->xmlrpc->request($request);

			if ( ! $this->xmlrpc->send_request())
			{
				echo $this->xmlrpc->display_error();
			}
			else
			{
				echo '<pre>';
				print_r($this->xmlrpc->display_response());
				echo '</pre>';
			}
		}
	}
	?>

.. note:: 在上述的範例中我們使用了 "url helper"，你可以在 `補助函數 <../general/helpers>`_ 找到更詳細的資訊。

伺服器
----------

使用文字編輯器建立一個 controller 叫作 Xmlrpc_server.php，
輸入以下的程式碼後儲存到 application/controllers/ 資料夾::

	<?php

	class Xmlrpc_server extends CI_Controller {

		public function index()
		{
			$this->load->library('xmlrpc');
			$this->load->library('xmlrpcs');

			$config['functions']['Greetings'] = array('function' => 'Xmlrpc_server.process');

			$this->xmlrpcs->initialize($config);
			$this->xmlrpcs->serve();
		}


		public function process($request)
		{
			$parameters = $request->output_parameters();

			$response = array(
				array(
					'you_said'  => $parameters[0],
					'i_respond' => 'Not bad at all.'
				),
				'struct'
			);

			return $this->xmlrpc->send_response($response);
		}
	}


試試看!
-------

現在就造訪你的網站，用類似下面的網址::

	example.com/index.php/xmlrpc_client/

你現在應該可以看見你發送到伺服器的訊息，以及接收到的回應。

你在客戶端中發送("How's is going?")訊息到伺服器，
並且請求使用 "Greetings" 這個方法來處理。
伺服器收到請求並將其對應到 ``process()`` 方法，
然後送出回應。

在請求的參數中使用關連式陣列
===============================================

如果你想在請求的參數中使用關聯式陣列，你需要使用 'struct' 資料型態::

	$request = array(
		array(
			// Param 0
			array('name' => 'John'),
			'struct'
		),
		array(
			// Param 1
			array(
				'size' => 'large',
				'shape'=>'round'
			),
			'struct'
		)
	);

	$this->xmlrpc->request($request);

當伺服器在處理請求時你可以這樣取得關聯式陣列。

::

	$parameters = $request->output_parameters();
	$name = $parameters[0]['name'];
	$size = $parameters[1]['size'];
	$shape = $parameters[1]['shape'];

資料型態
==========

根據 `XML-RPC spec <http://www.xmlrpc.com/spec>`_ 這邊有七種資料型態
你可以用在 XML-RPC：

-  *int* or *i4*
-  *boolean*
-  *string*
-  *double*
-  *dateTime.iso8601*
-  *base64*
-  *struct* (contains array of values)
-  *array* (contains array of values)

***************
類別參考資料
***************

.. php:class:: CI_Xmlrpc

	.. php:method:: initialize([$config = array()])

		:param	array	$config: 設定資料
		:rtype:	void

		初始化 XML-RPC 函式庫。接受一個內含設定資料的關聯式陣列。

	.. php:method:: server($url[, $port = 80[, $proxy = FALSE[, $proxy_port = 8080]]])

		:param	string	$url: XML-RPC 伺服器 URL
		:param	int	$port: 伺服器 Port
		:param	string	$proxy: 選擇性的 Proxy
		:param	int	$proxy_port: Proxy 的 Port
		:rtype:	void

		設定伺服器的 URL 及 port 以便送出請求::

			$this->xmlrpc->server('http://www.sometimes.com/pings.php', 80);

		也支援 Basic HTTP authentication，只要加在伺服器 URL 上::

			$this->xmlrpc->server('http://user:pass@localhost/', 80);

	.. php:method:: timeout($seconds = 5)

		:param	int	$seconds: 逾時秒數
		:rtype:	void

		設定送出請求後的逾期時間（以秒為單位）::

			$this->xmlrpc->timeout(6);

	.. php:method:: method($function)

		:param	string	$function: 方法名稱
		:rtype:	void

		設定要請求的伺服器方法::

			$this->xmlrpc->method('method');

		'method' 是要請求的方法名稱。

	.. php:method:: request($incoming)

		:param	array	$incoming: 請求的資料
		:rtype:	void

		接受一個包含資料的陣列，並將其發送到伺服器::

			$request = array(array('My Photoblog', 'string'), 'http://www.yoursite.com/photoblog/');
			$this->xmlrpc->request($request);

	.. php:method:: send_request()

		:returns:	成功時回傳 TRUE，失敗時回傳 FALSE
		:rtype:	bool

		用來發送請求的函數，回傳布林值 TURE 或 FALSE 來代表成功或失敗，可以用在條件判斷式中。

	.. method set_debug($flag = TRUE)

		:param	bool	$flag: 設定的除錯狀態
		:rtype:	void

		啟用或關閉除錯，將會顯示各種資訊以及錯誤資料，在開發時很有幫助。

	.. php:method:: display_error()

		:returns:	錯誤訊息字串
		:rtype:	string

		如果你的請求因為某些原因失敗了，回傳一個錯誤訊息字串。
		::

			echo $this->xmlrpc->display_error();

	.. php:method:: display_response()

		:returns:	回應
		:rtype:	mixed

		取得伺服器發送來的回應，回應通常是一個關聯式陣列
		::

			$this->xmlrpc->display_response();

	.. php:method:: send_error_message($number, $message)

		:param	int	$number: 錯誤代碼
		:param	string	$message: 錯誤訊息
		:returns:	XML_RPC_Response 物件
		:rtype:	XML_RPC_Response

		從伺服器發送錯誤訊息給客戶端，
		第一個參數是錯誤代碼，第二個參數為錯誤訊息。
		::

			return $this->xmlrpc->send_error_message(123, 'Requested data not available');

	.. method send_response($response)

		:param	array	$response: 回應資料
		:returns:	XML_RPC_Response 物件
		:rtype:	XML_RPC_Response

		從伺服器發送回應給客戶端。必須提供一個包含回應資料的陣列來傳送。
		::

			$response = array(
				array(
					'flerror' => array(FALSE, 'boolean'),
					'message' => "Thanks for the ping!"
				),
				'struct'
			);

			return $this->xmlrpc->send_response($response);
