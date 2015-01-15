###################
透過 CLI 執行 CodeIgniter
###################

就如同透過瀏覽器呼叫 applications  :doc:`控制器（Controllers） <./controllers>`
一樣，我們也可以透過 command-line interface（CLI）呼叫程式。

.. contents:: Page Contents

CLI 是什麼？
================

Command-line interface 是透過文字介面跟操作者溝通 更多詳細資訊，請參考 `Wikipedia 文章 <http://en.wikipedia.org/wiki/Command-line_interface>`_ 。

為什麼透過 CLI 執行？
=============================

這裡有許多原因透過 command-line 去執行 CodeIgniter，但是它們總是被忽略。

-  透過 CLI 去執行您的 cron-jobs 而不需要使用 *wget* 或 *curl* 。
-  藉由檢查 :func:`is_cli()` 函數返回值，讓你的 cron-jobs 不可存取被載入的 URL 。
-  互動式“tasks”工作，像是動態改變權限、清除 cache 目錄、執行備份...等。
-  可以利用其他語言整合其他相關應用，例如：亂數 C++ 程式可以呼叫一個指令和在您的 Model 裡面執行程式！

讓我們來嘗試：Hello World！
==========================

讓我們建立一支簡單的控制器來當作範例，利用您的編輯器新增檔案 Tools.php，並且將底下程式碼寫入到檔案裡面： ::

	<?php
	class Tools extends CI_Controller {

		public function message($to = 'World')
		{
			echo "Hello {$to}!".PHP_EOL;
		}
	}

之後將檔案儲存到 *application/controllers/* 目錄底下。

現在您可以透過瀏覽器觀鍵入底下網址： ::

	example.com/index.php/tools/message/to

另外方式，我們可以透過 Mac/Linux 終端機或者是在 Windows 底下執行“cmd”去執行 CodeIgniter 專案。

.. code-block:: bash

	$ cd /path/to/project;
	$ php index.php tools message

如果你成功執行，你應該會看到 *Hello World!* 印出來。

.. code-block:: bash

	$ php index.php tools message "John Smith"

這裡我們也可以用同樣方式傳入 URL 參數，例如傳入“John Smith”： ::

	Hello John Smith!

就這樣!
==========

簡單來說就是將控制器使用在 command line，請記住這只能使用在基本控制器（Controller）上面，所以只有 Routing 跟 ``_remap()`` 可以正常執行。
