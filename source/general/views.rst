##########
視圖 Views
##########

視圖（View）只是簡單的網站頁面，或者片段頁面，像是 header， footer，sidebar，等等。事實上，Views 可以很彈性的嵌入到其它 Views（包含其它 views 等等）如果你需要這樣的層次結構。


視圖（Views）無法直接呼叫，他們一定要通過 :doc:`控制器 Controller <controllers>` 來呼叫。 記得在 MVC framework 時， :doc:`Controllers <controllers>` 像是交通警察一樣工作，所以他負責去抓取指定的視圖（View）。如果你還沒看過控制器（Controllers）頁面，你應該要先看過唷。

使用範例 :doc:`控制器 Controller <controllers>` 你會建立一個 Controller 頁面，讓你增加 View 到裡面。

建立一個 View
===============

用你的文字編輯器，建立一個檔案叫做 blogview.php ，然後把下面程式碼放進來： ::

	<html>
	<head>
		<title>My Blog</title>
	</head>
	<body>
		<h1>Welcome to my Blog!</h1>
	</body>
	</html>
	
然後儲存檔案到 *application/views/* 目錄。

載入 View
==============

為了載入指定的 View 你可以跟隨下面操作放到 Controller 裡的方法裡： ::

	$this->load->view('name');

它的名字就是你 View 檔案的名字。

.. note:: 後綴 .php 是不需要的唷，除非你有其它或連續的 .php 。

現在，打開你的 Controller 目錄，你新增一個簡單的名稱叫做 Blog.php，用頁面讀取方法取道掉 echo 語句： ::

	<?php
	class Blog extends CI_Controller {

		public function index()
		{
			$this->load->view('blogview');
		}
	}

你通過 URL 來拜訪你的網站，你將會看到你的頁面。這個 URL 大概長這樣： ::

	example.com/index.php/blog/

載入多個 Views
======================

CodeIgniter 將會聰明地處理多個呼叫 ``$this->load->view()`` 從 Controller 裡面。如果呼叫超過一個，那麼它們會被連續附加在一起。例如，你可能有 header view，menu view，content view，以及 footer view。然後像這樣： ::

	<?php

	class Page extends CI_Controller {

		public function index()
		{
			$data['page_title'] = 'Your title';
			$this->load->view('header');
			$this->load->view('menu');
			$this->load->view('content', $data);
			$this->load->view('footer');
		}

	}

從上述例子來看，我們運用了 “動態附加資料” ，您將會在下面看到。

儲存 Views 到子目錄
====================================

你的 View 檔案可以被儲存到子目錄內，如果你喜歡分類組織了話。如果你這樣做你將需要去引入子目錄名稱來讀取 View。 例如： ::

	$this->load->view('directory_name/file_name');

增加動態資料到 View
===============================

資料是使用 **陣列** 或 **物件** 從 Controller 傳送到 View 裡面，透過 View 讀取的方法傳入第二個參數內。這裡是運用陣列的方法： ::

	$data = array(
		'title' => 'My Title',
		'heading' => 'My Heading',
		'message' => 'My Message'
	);

	$this->load->view('blogview', $data);

然後這裡是運用物件的方法傳入： ::

	$data = new Someclass();
	$this->load->view('blogview', $data);

.. note:: 如果你是用物件，類別變數將會被轉成陣列元素。

讓我們試試看 增加到你的 Controller 檔案裡。 新增以下程式碼： ::

	<?php
	class Blog extends CI_Controller {

		public function index()
		{
			$data['title'] = "My Real Title";
			$data['heading'] = "My Real Heading";

			$this->load->view('blogview', $data);
		}
	}

現在打開你的 View 檔案然後改變字串替換成陣列的鍵值： ::

	<html>
	<head>
		<title><?php echo $title;?></title>
	</head>
	<body>
		<h1><?php echo $heading;?></h1>
	</body>
	</html>

然後通過 URL 來讀取頁面， 你已經使用變數代替原本的字串了。

建立迴圈
==============

傳遞給你的 View 文件中的資料陣列並不局限於簡單的變量。你可以通過多維陣列，可以循環產生多個欄位資料。例如，如果你從資料庫中撈取資料，這時它通常是在一個多維陣列的形式。

這裡有一個簡單的例子。添加到您的 Controller： ::

	<?php
	class Blog extends CI_Controller {

		public function index()
		{
			$data['todo_list'] = array('Clean House', 'Call Mom', 'Run Errands');

			$data['title'] = "My Real Title";
			$data['heading'] = "My Real Heading";

			$this->load->view('blogview', $data);
		}
	}

現在打開你的 View 文件，建立一個迴圈： ::

	<html>
	<head>
		<title><?php echo $title;?></title>
	</head>
	<body>
		<h1><?php echo $heading;?></h1>
	
		<h3>My Todo List</h3>

		<ul>
		<?php foreach ($todo_list as $item):?>
	
			<li><?php echo $item;?></li>
	
		<?php endforeach;?>
		</ul>

	</body>
	</html>

.. note:: 你會注意到，在上面我們使用 PHP 的替代語法的例子。如果你不熟悉它，你可以閱讀一下 :doc:`這裡 <alternative_php>` 。

資料回傳到 views
=======================

這裡是第三個 **可選的** 參數，它返回讀取那個頁面的整個 HTML，而不是將其發送到瀏覽器。如果你在處理資料的狀況下，這個方法是很有用的。如果你設定成 TRUE（boolean）它就會回傳資料。預設是 false，那麼他就會將 View 發送到瀏覽器了。 如果你要有資料回傳，記得塞入這個變數： ::

	$string = $this->load->view('myfile', '', TRUE);
