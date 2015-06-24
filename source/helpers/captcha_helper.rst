##############
CAPTCHA 輔助函式
##############

CAPTCHA 輔助函式包含了各種輔助產生驗證圖片的相關函式。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

導入輔助函式
===================

CAPTCHA 輔助函式的載入語法如下：
::

	$this->load->helper('captcha');

使用 CAPTCHA 輔助函式
========================

準備好如下所示的語法後，就可以產生驗證碼：
::

	$vals = array(
		'word'		=> 'Random word',
		'img_path'	=> './captcha/',
		'img_url'	=> 'http://example.com/captcha/',
		'font_path'	=> './path/to/fonts/texb.ttf',
		'img_width'	=> '150',
		'img_height'	=> 30,
		'expiration'	=> 7200,
		'word_length'	=> 8,
		'font_size'	=> 16,
		'img_id'	=> 'Imageid',
		'pool'		=> '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',

		// White background and border, black text and red grid
		'colors'	=> array(
			'background' => array(255, 255, 255),
			'border' => array(255, 255, 255),
			'text' => array(0, 0, 0),
			'grid' => array(255, 40, 40)
		)
	);

	$cap = create_captcha($vals);
	echo $cap['image'];

-  驗證碼函式需要 GD 圖像函式庫。
-  只有 **img_path** 與 **img_url** 是必填的。
-  假設沒有填 **word**，函式會自動生成一個隨機的 ASCII 字串，當然你也可以從你自己準備的文字庫當中隨機挑選。
-  如果你沒有標明字型檔的路徑，將會使用醜醜的預設字型。
-  “captcha” 資料夾必須是可以寫入的。
-  **expiration** (以秒數計) 標明出驗證碼圖示過多久之後會被刪除，預設是兩小時。
-  **word_length** 預設為 8，**pool** 預設為 ‘0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ’。
-  **font_size** 預設為 16，GD 字型有大小限制。如果要使用更大的字體請選用其他字型。
-  **img_id** 將是驗證碼圖示的 id。
-  如果任一 **colors** 內的值不見了，將會以預設值代替。

建立驗證碼資料庫
-----------------

為了避免驗證碼被有心人士利用，你可以將 ``create_captcha()`` 所回傳的資訊加入到資料庫中。如此一來，當資料從使用者端送來的時候只需要驗證此筆資料是否存在且未過期即可。

資料表建置範例
::

	CREATE TABLE captcha (  
		captcha_id bigint(13) unsigned NOT NULL auto_increment,  
		captcha_time int(10) unsigned NOT NULL,  
		ip_address varchar(45) NOT NULL,  
		word varchar(20) NOT NULL,  
		PRIMARY KEY `captcha_id` (`captcha_id`),  
		KEY `word` (`word`)
	);

這是搭配資料庫使用的範例語法。在頁面中驗證碼顯示的地方，你可以填入如下的語法：
::

	$this->load->helper('captcha');
	$vals = array(     
		'img_path'	=> './captcha/',     
		'img_url'	=> 'http://example.com/captcha/'     
	);

	$cap = create_captcha($vals);
	$data = array(     
		'captcha_time'	=> $cap['time'],     
		'ip_address'	=> $this->input->ip_address(),     
		'word'		=> $cap['word']     
	);

	$query = $this->db->insert_string('captcha', $data);
	$this->db->query($query);

	echo 'Submit the word you see below:';
	echo $cap['image'];
	echo '<input type="text" name="captcha" value="" />';

然後，資料接收端頁面則填入如下語法：
::

	// 首先，刪除舊的驗證碼
	$expiration = time() - 7200; // Two hour limit
	$this->db->where('captcha_time < ', $expiration)
		->delete('captcha');

	// 確認驗證碼是否存在
	$sql = 'SELECT COUNT(*) AS count FROM captcha WHERE word = ? AND ip_address = ? AND captcha_time > ?';
	$binds = array($_POST['captcha'], $this->input->ip_address(), $expiration);
	$query = $this->db->query($sql, $binds);
	$row = $query->row();

	if ($row->count == 0)
	{     
		echo 'You must submit the word that appears in the image.';
	}

可用函式格式
===================

允許使用的函式格式如下：

.. php:function:: create_captcha([$data = ''[, $img_path = ''[, $img_url = ''[, $font_path = '']]]])

	:param	array	$data: 存有驗證碼資訊的陣列
	:param	string	$img_path: 建立驗證碼圖示的路徑
	:param	string	$img_url: 驗證碼圖示資料夾的 URL
	:param	string	$font_path: 字型檔的伺服器路徑
	:returns:	array('word' => $word, 'time' => $now, 'image' => $img)
	:rtype:	陣列

	取得輸入在陣列中的資訊生成驗證碼，且根據你的需求產生驗證碼圖示，並將圖示的相關資訊回傳。

	::

		array(
			'image'	=> IMAGE TAG
			'time'	=> TIMESTAMP (in microtime)
			'word'	=> CAPTCHA WORD
		)

	回傳的 **image** 是 HTML 圖示標籤：
	::

		<img src="http://example.com/captcha/12345.jpg" width="140" height="50" />

	回傳的 **time** 是被用來當作圖片檔名（沒有副檔名）的時間戳記，就像是這樣的數字：1139612155.3422

	回傳的 **word** 是出現在驗證碼圖示中的文字，如果沒有指定特定字串給函式的話將會隨機挑選一個字串。
