###########
模型 Models
##########

模型（Models）是給傳統 MVC 架構更多 **可選地** 提供使用。

.. contents:: 頁面內容

什麼是 Model？
================

Models 是 PHP 類別，它是被設計來存取資料庫用的。比如說，使用 CodeIgniter 去管理部落格。你可以有一個 Model 類別它包含函式去 insert，update，還有 retrieve 你的部落格資料。這裡有個例子，來看看 Model 類別是怎麼樣的： ::

	class Blog_model extends CI_Model {

		public $title;
		public $content;
		public $date;

		public function __construct()
		{
			// Call the CI_Model constructor
			parent::__construct();
		}

		public function get_last_ten_entries()
		{
			$query = $this->db->get('entries', 10);
			return $query->result();
		}

		public function insert_entry()
		{
			$this->title	= $_POST['title']; // please read the below note
			$this->content	= $_POST['content'];
			$this->date	= time();

			$this->db->insert('entries', $this);
		}

		public function update_entry()
		{
			$this->title	= $_POST['title'];
			$this->content	= $_POST['content'];
			$this->date	= time();

			$this->db->update('entries', $this, array('id' => $_POST['id']));
		}

	}

.. note:: 在上述例子我們使用 :doc:`Query Builder	<../database/query_builder>` 方法去存取資料庫。

.. note:: 為簡單起見，在本實施例中，我們直接地使用 ``$_POST`` 。這通常是不好的做法，更好的方法將是使用 :doc:`Input 函式庫 <../libraries/input>` ``$this->input->post('title')`` 。

剖析 Model
==================

Model 類別是儲存在 **application/models/** 目錄。 它們可以巢狀的包含在子目錄中，如果你想要分類組織了話，這是個好方法。

基本的 Model 類別原型長這樣： ::

	class Model_name extends CI_Model {

		public function __construct()
		{
			parent::__construct();
		}

	}

這個 **Model_name** 是你的類別名稱。 類別名稱 **一定要** 第一個字母大寫的，其餘部分小寫的。請確認你的類別擴展基本的 Model 類別。

檔案名稱要跟類別名稱一樣。例如： ::

	class User_model extends CI_Model {

		public function __construct()
		{
			parent::__construct();
		}

	}

你的檔案目錄會長這樣： ::

	application/models/User_model.php

載入 Model
===============

你的 models 會被呼叫，通過 :doc:`控制器 Controller <controllers>` 呼叫方法。 用以下方法載入 models： ::

	$this->load->model('model_name');

如果你的 Model 位於子目錄，引入相關的路徑經由 Models 目錄。位於 *application/models/blog/Queries.php* 你將要讀取它，用法： ::

	$this->load->model('blog/queries');

一旦載入，你會使用一個物件是具有相同於 Model 名稱的物件，它可以執行你 Model 的方法： ::

	$this->load->model('model_name');

	$this->model_name->method();

如果你想分配給 Model 不同的名稱，你可以通過傳入的第二個參數指定它： ::

	$this->load->model('model_name', 'foobar');

	$this->foobar->method();

這裡是一個 Controller，載入一個 Model 的例子，然後提供給一個 View： ::

	class Blog_controller extends CI_Controller {

		public function blog()
		{
			$this->load->model('blog');

			$data['query'] = $this->blog->get_last_ten_entries();

			$this->load->view('blog', $data);
		}
	}
	

自動載入 Models
===================

如果你想要在整個應用程式中全域加載，並使用某些 model 你可以打開 **application/config/autoload.php** 檔案，然後增加這些 model 到 $autoload['model'] 陣列裡。

連接資料庫
===========================

當 Model 被載入近來，但是 **還沒** 自動地連接到資料庫。 提供給您連接資料庫的選項在下面：

-  您可以連接使用標準資料庫的方法 :doc:`這裡描述 <../database/connecting>` 無論你從 Controller 類別 或 Model 類別連接都可以。
-  你可以告訴 Model 加載時自動連接資料庫，透過第三個參數傳遞TRUE（Boolean）自動連接和連接設置，在你的資料庫設定文件中定義將被使用::

	$this->load->model('model_name', '', TRUE);

-  您可以通過第三個參數通過手動資料庫連接設置： ::

	$config['hostname'] = 'localhost';
	$config['username'] = 'myusername';
	$config['password'] = 'mypassword';
	$config['database'] = 'mydatabase';
	$config['dbdriver'] = 'mysqli';
	$config['dbprefix'] = '';
	$config['pconnect'] = FALSE;
	$config['db_debug'] = TRUE;

	$this->load->model('model_name', '', $config);
