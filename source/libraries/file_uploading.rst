####################
檔案上傳類別
####################

CodeIgniter 的檔案上傳類別允許檔案進行上傳，你可以多種偏好設定，限制檔案類別或檔案大小。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

***********
流  程
***********

上傳檔案通常包含以下幾個過程：

-  一個上傳檔案的表單被顯示，允許使用者選擇一個檔案並上傳它

-  當這個表單被送出時，這個檔案會被上傳到指定的路徑

-  這個過程，檔案會依據要求被驗證確保上傳的檔案符合伺服器設定

-  一旦上傳，使用者會得到一個成功訊息的反饋

為了說明，這裡有個簡單的教學，其後你可以找到參考資訊。

建立上傳表單
========================

使用文字編輯器，建立一個表單叫做 upload_form.php。 其中，放入以下這段程式碼並儲存到
**application/views/** 資料夾中::

	<html>
	<head>
	<title>Upload Form</title>
	</head>
	<body>

	<?php echo $error;?>

	<?php echo form_open_multipart('upload/do_upload');?>

	<input type="file" name="userfile" size="20" />

	<br /><br />

	<input type="submit" value="upload" />

	</form>

	</body>
	</html>

你將會注意到我們使用 form helper 來建立表單的 <form> 標籤開頭。
檔案上傳需要一個多部分整合的表單，所以這個輔助韓式為你建立一個適當的 html 語法，你也
會注意到我們有一個變數 $error，這將可以顯示錯誤訊息當使用者有什麼地方操作錯誤的時候。

The Success Page
================

使用文字編輯器，建立一個成功頁 upload_success.php，其中放置以下的程式碼並儲存於
**application/views/** directory::

	<html>
	<head>
	<title>Upload Form</title>
	</head>
	<body>

	<h3>Your file was successfully uploaded!</h3>

	<ul>
	<?php foreach ($upload_data as $item => $value):?>
	<li><?php echo $item;?>: <?php echo $value;?></li>
	<?php endforeach; ?>
	</ul>

	<p><?php echo anchor('upload', 'Upload Another File!'); ?></p>

	</body>
	</html>

控制器
==============

使用一個文字編輯器，建立一個控制器叫做 Upload.php。其中，放入以下的程式碼並儲存於
**application/controllers/** directory::

	<?php

	class Upload extends CI_Controller {

		public function __construct()
		{
			parent::__construct();
			$this->load->helper(array('form', 'url'));
		}

		public function index()
		{
			$this->load->view('upload_form', array('error' => ' ' ));
		}

		public function do_upload()
		{
			$config['upload_path']		= './uploads/';
			$config['allowed_types']	= 'gif|jpg|png';
			$config['max_size']		= 100;
			$config['max_width']		= 1024;
			$config['max_height']		= 768;

			$this->load->library('upload', $config);

			if ( ! $this->upload->do_upload('userfile'))
			{
				$error = array('error' => $this->upload->display_errors());

				$this->load->view('upload_form', $error);
			}
			else
			{
				$data = array('upload_data' => $this->upload->data());

				$this->load->view('upload_success', $data);
			}
		}
	}
	?>

上傳的檔案夾
====================

上傳影像你會需要一個資料夾。建立一個資料夾在 CodeIgniter 安裝的根目錄位置，並且
叫做 uploads，設定它的權限為777。

試看看!
=======

試看看你的表單，訪問你的網站，使用如下相似的 url 來訪問你的網站::

	example.com/index.php/upload/

你會看到一個上傳檔案的表單，試著上傳一個影像檔案（jpg, gif, or png) 都可。
如果在控制器設定的路徑是正確的話，那們一切會執行正常。

***************
參考指南
***************

初始化上傳類別
=============================

像大部分其他 CodeIgniter 的類別，Upload class 是使用這個方法 ``$this->load->library()`` 在 controller 初始化的::

	$this->load->library('upload');
一旦 Upload class 已被載入，物件將可以被使用如下方式：
$this->upload

設定喜好
===================

相似於其他的 libraries，你可以控制檔案上傳的規格。在上面的 controller 範例中，你的偏好設定如下::

	$config['upload_path'] = './uploads/';
	$config['allowed_types'] = 'gif|jpg|png';
	$config['max_size']	= '100';
	$config['max_width'] = '1024';
	$config['max_height'] = '768';

	$this->load->library('upload', $config);

	// 或是選擇性的，你可以呼叫 ``initialize()`` 方法來設定你的偏好，這樣方式很有用當你自動載入此類別時：
	$this->upload->initialize($config);

以上的偏好應該已經自我說明其規格，以下的表格說明更多其他的偏好設定。

偏好設定
===========

以下是可以設置的設定，預設值說明什麼值將會被使用，如果你沒有設定其它的值的話。
The following preferences are available. The default value indicates
what will be used if you do not specify that preference.

============================ ================= ======================= ======================================================================
Preference                   Default Value     Options                 Description
============================ ================= ======================= ======================================================================
**upload_path**              None              None                    檔案上傳的路徑。此資料夾必須是可寫入的，此路徑可以是絕對的也可以相對路徑。

**allowed_types**            None              None                    mime 檔案類型，設定你可接受的檔案類型，通常使用副檔名當作 mime 類型。
                                                                       可以是陣列或者是以 '|' 作為副檔名連接字串

**file_name**                None              Desired file name       如果有此設定，上傳檔案將被 CodeIgniter 重新命名為這個設定，這個檔案名的副檔名
                                                                       也必須是可以接受的檔案型別。
                                                                       如果副檔名沒有提供，原本的檔案名稱將會被使用。
**file_ext_tolower**         FALSE             TRUE/FALSE (boolean)    如果設定為 TRUE 副檔名將會被強制改為小寫
**overwrite**                FALSE             TRUE/FALSE (boolean)    如果這定為 TRUE，當有相同的檔案名已存在，該檔案將會被覆蓋,
                                                                       如果設定為 FALSE，一個數字將會依附在檔案名之後。

**max_size**                 0                 None                    檔案可以接受的最大 size (in kilobytes)。設定 0 代表沒有檔案大小的限制。
                                                                       注意：PHP 有原本的預設值，設定在 php.ini 檔案中，一般來說是 2048 KB

**max_width**                0                 None                    影像檔案可以接受的最大寬度 (in pixels)，設定 0 代表沒有限制。

**max_height**               0                 None                    影像檔案可以接受的最大高度 (in pixels)，設定 0 代表沒有限制。

**min_width**                0                 None                    影像檔案可以接受的最小寬度 (in pixels)，設定 0 代表沒有限制。

**min_height**               0                 None                    影像檔案可以接受的最小高度 (in pixels)，設定 0 代表沒有限制。

**max_filename**             0                 None                    檔名長度可以接受的最大長度，設定 0 代表沒有限制。
**max_filename_increment**   100               None                    如果 overwrite 被設定為 FALSE，這個設定限制數字增加的最大值。

**encrypt_name**             FALSE             TRUE/FALSE (boolean)    設定為 TRUE 時，檔名將會經由亂數產生。當你不想被使用者辨識出該檔案時，
                                                                       這將會是一個有效的方法。

**remove_spaces**            TRUE              TRUE/FALSE (boolean)    設定為 TRUE 時，任何檔名的空白將會被轉換為底線 underscore，這是被鼓勵的。

**detect_mime**              TRUE              TRUE/FALSE (boolean)    設定為 TRUE 時，伺服器端將會偵測檔案來避免程式碼植入攻擊。
                                                                       請不要關掉這個功能，這會導致資安疑慮，除非你沒有其他的辦法。

**mod_mime_fix**             TRUE              TRUE/FALSE (boolean)    設定為 TRUE 時，多種檔案的副檔名將會在字尾加上底線 underscore，為了避免產生
                                                                       `Apache mod_mime <http://httpd.apache.org/docs/2.0/mod/mod_mime.html#multipleext>`_
                                                                     如果你的資料夾是公開的，請不要關掉這個選項，會導致資安疑慮。
============================ ================= ======================= ======================================================================

在 config file 設置偏好設定
====================================

如果你不喜歡使用以上的方法設定偏好，你可以將設定設置入 config file 中。
建立一個檔案叫做 upload.php， 寫入 $config array 在該檔案中，然後儲存於路徑
**config/upload.php** ，它將會被自動載入。你不需要使用 ``$this->upload->initialize()``
這個方法，如果你已經將設置設定好在 config file。

***************
類別參考
***************

.. php:class:: CI_Upload

	.. php:method:: initialize([array $config = array()[, $reset = TRUE]])

		:param	array	$config: Preferences
		:param	bool	$reset: 沒有提供在 $config 中的設定，是否要重置這些設定至預設值
		:returns:	CI_Upload instance (method chaining)
		:rtype:	CI_Upload

	.. php:method:: do_upload([$field = 'userfile'])

		:param	string	$field: 在表單中變數的名字
		:returns:	TRUE 當成功時, FALSE 當失敗時
		:rtype:	bool

		依據你的設定進行上傳。

		.. note:: 預設檔案來自欄位取名為 userfile 的檔案，而且該表單一定要被設置為 "multipart"。

		::

			<form method="post" action="some_action" enctype="multipart/form-data" />

		如果你有想要上傳自己欄位名的檔案，就將欄位名直接傳入 ``do_upload()`` 方法中::

			$field_name = "some_field_name";
			$this->upload->do_upload($field_name);

	.. php:method:: display_errors([$open = '<p>'[, $close = '</p>']])

		:param	string	$open: 開始標籤
		:param	string	$close: 結束標籤
		:returns:	Formatted error message(s)
		:rtype:	string

		當 ``do_upload()`` 方法回傳錯誤時，此方法回傳錯誤訊息。
        這個方法並不自動 echo ，它會返回資料，所以你可以在需要的時候使用它。

		**Formatting Errors**

			預設錯誤訊息會使用 <p> 標籤包裝，你可以設定自己的標籤包裝，如下::

				$this->upload->display_errors('<p>', '</p>');


	.. php:method:: data([$index = NULL])

		:param	string	$index: Element to return instead of the full array
		:returns:	Information about the uploaded file
		:rtype:	mixed

		這是一個輔助函式，它會回傳該檔案所有的相關資料，以陣列形式表示。以下是一個原型例子::

			Array
			(
				[file_name]	=> mypic.jpg
				[file_type]	=> image/jpeg
				[file_path]	=> /path/to/your/upload/
				[full_path]	=> /path/to/your/upload/jpg.jpg
				[raw_name]	=> mypic
				[orig_name]	=> mypic.jpg
				[client_name]	=> mypic.jpg
				[file_ext]	=> .jpg
				[file_size]	=> 22.2
				[is_image]	=> 1
				[image_width]	=> 800
				[image_height]	=> 600
				[image_type]	=> jpeg
				[image_size_str] => width="800" height="200"
			)

		回傳其中一個元素::

			$this->upload->data('file_name');	// Returns: mypic.jpg

		解釋以上元素所代表的意義:

		================ ====================================================================================================
		Item             Description
		================ ====================================================================================================
		file_name        檔案上傳後的名稱，包含副檔名
		file_type        檔案 MIME 類型
		file_path        檔案在伺服器的絕對路徑
		full_path        檔案在伺服器的絕對路徑，包含檔案名
		raw_name         檔案名，沒有副檔名
		orig_name        原始的檔案名，如果你使用加密後的檔名，此參數才有用
		client_name      使用者當初提供的檔案名，對檔案名進行加密或遞增的操作之前
		file_ext         檔案副檔名，包含句點
		file_size        檔案大小 in kilobytes
		is_image         檔案是否為影像， 1 = image. 0 = not.
		image_width      Image width
		image_height     Image height
		image_type       Image type (一般為沒有句點的副檔名名稱)
		image_size_str   一個包含影像長與寬的字串 (置入於 html tag 會有幫助)
		================ ====================================================================================================
