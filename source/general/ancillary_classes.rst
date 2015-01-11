##########################
新增配套類別
##########################

在某些情況下，你可能需要開發一個類別，這個類別能使用 Codeigniter 一部分在控制器（Controller）已經現有的功能。
這是很簡單做到的，請看下面。

get_instance()
==============

.. function:: get_instance()

	:returns:	object of class CI_Controller

**所有在你的控制器（Controller）方法裡已經實力化的類別即可存取 Codeigniter 本地的資源** 簡單地通過使用 ``get_instance()`` 函數。這個函數回傳 Codeigniter 主物件。

一般來說，要呼叫 Codeigniter 的方法，你會使用 ``$this``： ::

	$this->load->helper('url');
	$this->load->library('session');
	$this->config->item('base_url');
	// etc.

``$this`` ，只能在你的 Controllers、Models、Views 裡面執行，如果你想要在你的類別裡面使用 Codeigniter 類別，你可以參考下面作法： :

第一步，賦值給 CodeIgniter 物件到一個變數裡： ::

	$CI =& get_instance();

一旦你已經賦值一個物件到變數上，你將會使用這個變數 *取代* 掉 ``$this`` ： ::

	$CI =& get_instance();

	$CI->load->helper('url');
	$CI->load->library('session');
	$CI->config->item('base_url');
	// etc.

.. note:: 在上面這個例子，你會注意到 get_instance() ``函數`` 是傳入參考： ::

		$CI =& get_instance();

	這是非常重要的。賦予參考值允許你使用最原始 CodeIgniter 物件，而不是建立一個副本。

此外，如果你會使用 ``get_instance()`` 到其它類別上，賦予參考到變數上，是較好的行為。
這個方法你將不需要在每個方法裡面呼叫一次 ``get_instance()`` 。

例如： ::

	class Example {

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
			$this->CI->config->item('base_url');
		}

	}

在上面的例子，在你實例化 Example 類別的時候，方法 ``foo()`` 以及 ``bar()`` 即可使用，不需要在其它地方再去呼叫 ``get_instance()`` 函數。
