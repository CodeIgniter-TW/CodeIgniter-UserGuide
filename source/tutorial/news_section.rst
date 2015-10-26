############
新聞模組介紹
############

在上一章，我們寫了一個含有靜態頁面的類別，並介紹了一些關於 framework 的基本觀念。我們使用了客製的路由規則來使 URI 更乾淨。現在是時候來加入動態內容與使用資料庫了。

設定你的模型（Model）
---------------------

我們將資料庫操作放在模型裡面，而不是控制器當中，這樣子方便我們之後重用這些程式。 模型是你用來讀取、新增以及更新資訊的地方，不論是從資料庫或其它存放資料處。它們代表著你的資料。

打開 application/models 資料夾，新增一個檔案名為 News_model.php 並加上下列程式碼。 確認你正確的設定了你的資料庫，就像 `這份文件 <../database/configuration.html>`_. 裡所描述的那樣。


::

	<?php
	class News_model extends CI_Model {

		public function __construct()
		{
			$this->load->database();
		}
	}

這段程式碼看起來與先前使用的控制器程式很像。它建立了一個新的模型，繼承自 ``CI_Model`` ，並載入了資料庫程式庫。 這使得我們可以使用 ``$this->db`` 這個物件來存取資料庫類別。

在你存取資料庫之前，需要先建立資料庫結構。連線到你的資料庫並執行下列 SQL 命令。順便增加一些種子資料。

::

	CREATE TABLE news (
		id int(11) NOT NULL AUTO_INCREMENT,
		title varchar(128) NOT NULL,
		slug varchar(128) NOT NULL,
		text text NOT NULL,
		PRIMARY KEY (id),
		KEY slug (slug)
	);

現在資料庫與模型已經設定好了，你需要一個方法來取得資料庫中的所有文章。我們使用 CodeIgniter 內建的資料庫抽象層 — `Query Builder <../database/query_builder.html>`_ — 來做這件事。 這使你可以只寫一次查詢，就能夠在 `所有支援的資料庫執行 <../general/requirements.html>`_ 。請將以下程式碼加進你的模型。

::

	public function get_news($slug = FALSE)
	{
		if ($slug === FALSE)
		{
			$query = $this->db->get('news');
			return $query->result_array();
		}

		$query = $this->db->get_where('news', array('slug' => $slug));
		return $query->row_array();
	}

這段程式碼讓你可以進行兩種不同的查詢。你可以取得所有的新聞資料，也可以根據新聞的 `slug <#>`_ 來查詢。 你可能注意到 $slug 變數在使用前沒有被消毒，因為 :doc:`Query Builder <../database/query_builder>` 會幫你做這件事。

顯示新聞
----------------

我們已經寫好查詢，現在模型應該要連結到用來顯示新聞給使用者的檢視。這可以在我們之前做的控制器中完成，但為了清楚起見，我們來定義一個新的 "news" 控制器。 在 application/controllers/News.php 建立新的控制器。

::

	<?php
	class News extends CI_Controller {

		public function __construct()
		{
			parent::__construct();
			$this->load->model('news_model');
		}

		public function index()
		{
			$data['news'] = $this->news_model->get_news();
		}

		public function view($slug = NULL)
		{
			$data['news_item'] = $this->news_model->get_news($slug);
		}
	}

在這程式中，你可能會看到一些與先前建立的檔案相似的部份。首先是 ``__construct()`` 方法：它呼叫父類別（ ``CI_Controller`` ）的建構子，並且載入模型， 讓它可以在這個控制器的其它方法中被使用。

接下來這邊有兩個方法，一個用來檢視所有的新聞，一個用來看特定的新聞。你可以看到在第二個方法中， $slug 變數被傳入到模型的方法裡。 模型就使用這個參數來找出所要的新聞。

現在控制器已經從模型中取回了資料。但還沒有東西被顯示出來。下一步要將資料傳給檢視。
::

	public function index()
	{
		$data['news'] = $this->news_model->get_news();
		$data['title'] = 'News archive';

		$this->load->view('templates/header', $data);
		$this->load->view('news/index', $data);
		$this->load->view('templates/footer');
	}

上面的程式從模型中取回所有的新聞並存放進變數中。標題的值也被指定給 $data['title'] 元素，並將所有資料傳送給檢視。 你現在需要建立一個檢視來顯示這些新聞項目。建立 application/views/news/index.php 並加入下一段程式碼。

::

	<h2><?php echo $title ?></h2>

	<?php foreach ($news as $news_item): ?>

		<h3><?php echo $news_item['title'] ?></h3>
		<div class="main">
			<?php echo $news_item['text'] ?>
		</div>
		<p><a href="news/<?php echo $news_item['slug'] ?>">View article</a></p>

	<?php endforeach ?>

這邊我們輪詢每個新聞項目並顯示給使用者。你可以看到我們用 PHP 混合了 HTML 做成模板。 如果你喜歡使用模板語言，你可以使用 CodeIgniter 的 `模板解析器 <../libraries/parser.html>`_ 或其它第三方解析器。

新聞總覽頁面現在已經完成了，但是還缺了一個頁面用來顯示個別的新聞。剛剛建立的模型設計成可以輕易的達成這個功能。 你只需要在控制器增加一些程式並新增一個檢視。回到 news 控制器並更新方法 ``view()`` 加入下列程式碼。

::

	public function view($slug = NULL)
	{
		$data['news_item'] = $this->news_model->get_news($slug);

		if (empty($data['news_item']))
		{
			show_404();
		}

		$data['title'] = $data['news_item']['title'];

		$this->load->view('templates/header', $data);
		$this->load->view('news/view', $data);
		$this->load->view('templates/footer');
	}

現在我們呼叫 ``get_news()`` 方法，並將 ``$slug`` 傳入，這樣它就會回傳特定的新聞。 接著在 application/views/news/view.php 建立對應的檢視檔案，並輸入下列代碼。
::

	<?php
	echo '<h2>'.$news_item['title'].'</h2>';
	echo $news_item['text'];

路由（Routing）
-------------

因為我們之前在路由規則中使用了萬用字串，你必須增加額外的路由規則才能檢視你剛剛建立的控制器。 打開你的路由檔案（application/config/routes.php）並修改成像下面的代碼那樣。 這將確保請求可以到達 news 控制器而不是直接送給 pages 控制器。第一行的規則將含有 slug 的 URI 導向 news 控制器的 view 方法。
::

	$route['news/(:any)'] = 'news/view/$1';
	$route['news'] = 'news';
	$route['(:any)'] = 'pages/view/$1';
	$route['default_controller'] = 'pages/view';

打開你的瀏覽器，輸入你的根目錄網址並加上 index.php/news 來看看你的新聞頁面。
