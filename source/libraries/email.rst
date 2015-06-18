############
電子郵件類別
############

CodeIgniter 健全的電子郵件類別支援以下事項：

-  多重協定：收信, 寄信, 以及簡單郵件傳輸(SMTP)
-  傳輸層安全協議(TLS) 和簡單郵件傳輸(SMTP) 的加密安全通訊協定(SSL)
-  多重收件人
-  副本和密件副本
-  支援 HTML 或純文字格式
-  夾帶檔案
-  自動換行
-  排序
-  密件副本批次模式，讓較多的郵件能批次密件副本。
-  郵件偵測錯誤工具

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

******************
使用電子郵件程式庫
******************

傳送郵件
========

傳送郵件不僅容易，你也可以將偏好設定加入你的設定檔中。

下面是一個簡單的例子，教你如何傳送郵件。
此範例假設你的其中一個 :doc:`controllers <../general/controllers>` 要傳送郵件。


::

	$this->load->library('email');

	$this->email->from('your@example.com', 'Your Name');
	$this->email->to('someone@example.com');
	$this->email->cc('another@another-example.com');
	$this->email->bcc('them@their-example.com');

	$this->email->subject('Email Test');
	$this->email->message('Testing the email class.');

	$this->email->send();

設定郵件偏好
============

這裡有21個不同的偏好提供設定。你可以手動設定，或是也可以自動透過偏好儲存在你的設定檔中，請見以下描述：

偏好設定是透過陣列來初始化郵件設定。請參考以下範例::

	$config['protocol'] = 'sendmail';
	$config['mailpath'] = '/usr/sbin/sendmail';
	$config['charset'] = 'iso-8859-1';
	$config['wordwrap'] = TRUE;

	$this->email->initialize($config);

.. 註記:: 如果不指定，大多數的偏好都有預設值。

在設定檔中設定郵件偏好
----------------------
若你不喜歡用以上的方法設定偏好，你也可以將偏好設定放在設定檔中。
只需要新建立一個叫做 email.php 的檔案，接著在檔案中加入 $config 陣列。 
然後將它儲存在 config/email.php，它就會自動生效。
若你將偏好儲存在設定檔中，你就不需要使用 ``$this->email->initialize()`` 的函數了。

Email 偏好
==========
下表所有列表，是在傳送郵件時可以被設定的偏好項目。

=================== ====================== ============================ =======================================================================
偏好設定            預設值                 選項                         描述
=================== ====================== ============================ =======================================================================
**useragent**       CodeIgniter            None                         使用者代理
**protocol**        mail                   mail, sendmail, or smtp      電子郵件協定
**mailpath**        /usr/sbin/sendmail     None                         系統傳送郵件路徑
**smtp_host**       No Default             None                         簡單郵件傳輸(SMTP)伺服器位址
**smtp_user**       No Default             None                         簡單郵件傳輸(SMTP)使用者帳號
**smtp_pass**       No Default             None                         簡單郵件傳輸(SMTP)密瑪
**smtp_port**       25                     None                         簡單郵件傳輸(SMTP)連接埠
**smtp_timeout**    5                      None                         簡單郵件傳輸(SMTP)逾時(以秒計)
**smtp_keepalive**  FALSE                  TRUE or FALSE (boolean)      持續的簡單郵件傳輸(SMTP)連結
**smtp_crypto**     No Default             tls or ssl                   簡單郵件傳輸(SMTP)加密
**wordwrap**        TRUE                   TRUE or FALSE (boolean)      開啟自動換行
**wrapchars**       76                                                  自動換行時的每行最大字符數
**mailtype**        text                   text or html                 郵件型態。發送 HTML 郵件時必須是完整的網頁。若你在郵件中有相對位置的連結或圖片網址，是不會顯示的
**charset**         ``$config['charset']``                              字元集(utf-8, iso-8859-1, etc.)
**validate**        FALSE                  TRUE or FALSE (boolean)      是否驗證郵件地址
**priority**        3                      1, 2, 3, 4, 5                郵件優先排序。1=最高，5=最低，3=一般
**crlf**            \\n                    "\\r\\n" or "\\n" or "\\r"   換行符號(使用"\\r\\n"去執行 RFC 822)
**newline**         \\n                    "\\r\\n" or "\\n" or "\\r"   換行符號(使用"\\r\\n"去執行 RFC 822)
**bcc_batch_mode**  FALSE                  TRUE or FALSE (boolean)      啟動密件副本批次模式
**bcc_batch_size**  200                    None                         密件副本批次的數量
**dsn**             FALSE                  TRUE or FALSE (boolean)      從伺服器通知消息
=================== ====================== ============================ =======================================================================

覆蓋自動換行
============

若你啟動自動換行功能(建議執行 RFC 822)，而你在郵件中要插入一個很長的連結，
為了避免它會被斷行而不能點取連結，CodeIgniter 讓你能夠手動覆蓋自動換行，像是這樣::

	The text of your email that
	gets wrapped normally.

	{unwrap}http://example.com/a_long_link_that_should_not_be_wrapped.html{/unwrap}

	More text that will be
	wrapped normally.

請將你不想被斷行的連結放在 {unwrap} {/unwrap} 中間。

********
類別參考
********

.. php:class:: CI_Email

	.. php:method:: from($from[, $name = ''[, $return_path = NULL]])

		:param	string	$from: 「從」郵件地址
		:param	string	$name: 「從」顯示名稱
		:param	string	$return_path: 選用重新定向，未傳送成功的信件到備用郵件地址 
		:returns:	CI_Email instance (方法串接)
		:rtype:	CI_Email

		設定從哪來(寄件人)的郵件地址和名稱::
		
			$this->email->from('you@example.com', 'Your Name');

		你也可以設定一個回傳路徑，協助重新定向未傳送成功的信件::

			$this->email->from('you@example.com', 'Your Name', 'returned_emails@example.com');

		.. 註記:: 若你已經設定 "smtp" 作為協定，就不能使用回傳路徑。

	.. php:method:: reply_to($replyto[, $name = ''])

		:param	string	$replyto: 回覆的郵件地址
		:param	string	$name: 顯示回覆郵件地址的名稱
		:returns:	CI_Email instance (方法串接)
		:rtype:	CI_Email

		設定郵件回覆地址。若沒有提供則會使用 :meth:from 裡的值。範例::

			$this->email->reply_to('you@example.com', 'Your Name');

	.. php:method:: to($to)

		:param	mixed	$to: 使用逗號分隔郵件地址字串，或是使用陣列
		:returns:	CI_Email instance (方法串接)
		:rtype:	CI_Email

		設定收件者的郵件地址。可以是單一的郵件、逗號分割的清單或是陣列
		::

			$this->email->to('someone@example.com');

		::

			$this->email->to('one@example.com, two@example.com, three@example.com');

		::

			$this->email->to(
				array('one@example.com', 'two@example.com', 'three@example.com')
			);

	.. php:method:: cc($cc)

		:param	mixed	$cc: 使用逗號分隔郵件地址字串，或是使用陣列
		:returns:	CI_Email instance (方法串接)
		:rtype:	CI_Email

		設定副本的郵件地址。像是 ``to()`` 的方法，可以是單一的郵件、逗號分割的清單或是陣列。

	.. php:method:: bcc($bcc[, $limit = ''])

		:param	mixed	$bcc: 使用逗號分隔郵件地址字串，或是使用陣列
		:param	int	$limit: 每個批次最大的傳送郵件數
		:returns:	CI_Email instance (方法串接)
		:rtype:	CI_Email

		設定密件副本的郵件地址。像是 ``to()`` 的方法，可以是單一的郵件、逗號分割的清單或是陣列。
		Sets the BCC email address(s). Just like the ``to()`` method, can be a single
		e-mail, a comma-delimited list or an array.

		若設定了 ``$limit`` ，批次模式就會啟用。而批次傳送郵件不會超出設定的 ``$limit`` 。

	.. php:method:: subject($subject)

		:param	string	$subject: 郵件主旨
		:returns:	CI_Email instance (方法串接)
		:rtype:	CI_Email

		設定郵件主旨::

			$this->email->subject('This is my subject');

	.. php:method:: message($body)

		:param	string	$body: 郵件內文
		:returns:	CI_Email instance (方法串接)
		:rtype:	CI_Email

		設定郵件內文::

			$this->email->message('This is my message');

	.. php:method:: set_alt_message($str)

		:param	string	$str: 二選一的 email 內文
		:returns:	CI_Email instance (方法串接)
		:rtype:	CI_Email

		設定二選一的 email 內文::

			$this->email->set_alt_message('This is the alternative message');
		若你使用 HTML 格式的郵件，可使用選擇性的訊息串。
		可以讓你選擇指定的內文，使用非 HTML 格式，因為有的人可能並不支援 HTML 格式。
		若你沒有自行設定，CodeIgniter 將會從你的 HTML 郵件中摘取訊息並取消標籤。

	.. php:method:: set_header($header, $value)

		:param	string	$header: 檔頭名稱
		:param	string	$value: 檔頭的值
		:returns:	CI_Email instance (方法串接)
		:rtype: CI_Email

		給 e-mail 附加的檔頭::

			$this->email->set_header('Header1', 'Value1');
			$this->email->set_header('Header2', 'Value2');

	.. php:method:: clear([$clear_attachments = FALSE])

		:param	bool	$clear_attachments: 是否清除夾帶檔案
		:returns:	CI_Email instance (method方法串接)
		:rtype: CI_Email

		將 email 初始化成清空狀態。此方法用於當重覆發送郵件時，可以在兩次發送中重新設定郵件內容。
		
		::

			foreach ($list as $name => $address)
			{
				$this->email->clear();

				$this->email->to($address);
				$this->email->from('your@example.com');
				$this->email->subject('Here is your info '.$name);
				$this->email->message('Hi '.$name.' Here is the info you requested.');
				$this->email->send();
			}
			
		如果將參數設定為 TRUE，則附件也會被清空
		::
			$this->email->clear(TRUE);

	.. php:method:: send([$auto_clear = TRUE])

		:param	bool	$auto_clear: 是否自動清除訊息資料
		:returns:	 成功則回傳 TRUE，失敗則為 FALSE。
		:rtype:	bool

		郵件寄送的方法。當回傳布林值時，TRUE 代表成功，FALSE 代表失敗。可以有條件的被使用::

			if ( ! $this->email->send())
			{
				// 生成錯誤
			}

		若要求是成功的，此方法會自動清除所有參數。如要停止這種行為則透過 FALSE::

		 	if ($this->email->send(FALSE))
		 	{
		 		// 參數不會被清除
		 	}

		.. 註記:: 為了使用 ``print_debugger()``，你需要避免清除郵件參數。

	.. php:method:: attach($filename[, $disposition = ''[, $newname = NULL[, $mime = '']]])

		:param	string	$filename: 檔案名稱
		:param	string	$disposition: 附件的配置(disposition)。
					      大多數的郵件客戶不論多用途網際網路郵件擴展(MIME)的規範，
					      自己做出決定。https://www.iana.org/assignments/cont-disp/cont-disp.xhtml        
		:param	string	$newname: 自訂檔案名稱
		:param	string	$mime: 使用的 MIME 類型 (對於緩衝數據有所幫助)
		:returns:	CI_Email instance (方法串接)
		:rtype:	CI_Email

		讓你可以傳送附加檔案。將檔案的「路徑/名稱」放在第一個參數。若有多個附件則使用多次參數，範例如下::

			$this->email->attach('/path/to/photo1.jpg');
			$this->email->attach('/path/to/photo2.jpg');
			$this->email->attach('/path/to/photo3.jpg');
		
		要使用默認的附件配置，將第二個參數保留空白，不然就使用 custom 配置::
	
			$this->email->attach('image.jpg', 'inline');

		你也可以使用 URL 如下::

			$this->email->attach('http://example.com/filename.pdf');

		若你想要使用 custom 檔案名稱，你可以使用第三個參數::

			$this->email->attach('filename.pdf', 'attachment', 'report.pdf');

		若你需要使用緩衝字串(buffer string)取代真實檔案，你可以使用第一個參數當作緩衝，
		第三個參數作為檔案名稱，以及第四個參數當作 mime-type::

			$this->email->attach($buffer, 'attachment', 'report.pdf', 'application/pdf');

	.. php:method:: attachment_cid($filename)

		:param	string	$filename: 既有的附檔名稱
		:returns:	附檔的內容 ID，若無則回傳 FALSE。
		:rtype:	string
 
 		設定和回報附檔的內容 ID，讓你在 HTML 中崁入圖片附檔。第一個參數必須是已經夾帶的檔案名稱
		
		::
 
			$filename = '/img/photo1.jpg';
			$this->email->attach($filename);
			foreach ($list as $address)
			{
				$this->email->to($address);
				$cid = $this->email->attach_cid($filename);
				$this->email->message('<img src='cid:". $cid ."' alt="photo1" />');
				$this->email->send();
			}

		.. 註記:: 每個郵件的內容 ID 必須是重新建立且獨一無二的。

	.. php:method:: print_debugger([$include = array('headers', 'subject', 'body')])

		:param	array	$include: 印出訊息中的指定段落
		:returns:	格式化的除錯資訊
		:rtype:	string

		回傳包含任何伺服器訊息地字串，郵件標頭和郵件內容。對除錯很有幫助。

		你可以選擇指定印出的段落。驗證選項包含：**headers**, **subject**, **body**。

		範例::
			// 傳送的同時你要傳入 FALSE 以便郵件數據不會被清除。
			// 如果發生這種情形， ``print_debugger()`` 就什麼都不會輸出。
			$this->email->send(FALSE);

			// 這只會印出郵件的檔頭，包快郵件標題與內容
			$this->email->print_debugger(array('headers'));

		.. 註記:: 預設中，所有的原始數據都會被印出。
