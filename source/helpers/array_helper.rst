############
Array 輔助函式
############

Array 輔助函式包含了各種輔助陣列操作的相關函式。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

導入輔助函式
===================

Array 輔助函式的載入語法如下：

	$this->load->helper('array');


可用函式格式
===================

允許使用的函式格式如下：


.. php:function:: element($item, $array[, $default = NULL])

	:param	string	$item: 欲從來源陣列中取出的元素
	:param	array	$array: 來源陣列
	:param	bool	$default: 如果非有效來源陣列要回傳的值
	:returns:	失敗時回傳 NULL 成功時回傳陣列元素
	:rtype:	各種型態皆有

	此輔助函式可讓你從來源陣列中提取元素，也可測試出陣列中是否具有索引和值，如果存在將會回傳該值，反之則回傳 NULL 或任何你標明在第三個參數當中的預設值。

	範例
	::

		$array = array(
			'color'	=> 'red',
			'shape'	=> 'round',
			'size'	=> ''
		);

		echo element('color', $array); // returns "red"
		echo element('size', $array, 'foobar'); // returns "foobar"


.. php:function:: elements($items, $array[, $default = NULL])

	:param	string	$item: 欲從來源陣列中取出的元素組
	:param	array	$array: 來源陣列
	:param	bool	$default: 如果非有效來源陣列要賦予的值
	:returns:	失敗時回傳 NULL 成功時回傳陣列元素組
	:rtype:	各種型態皆有

	此輔助函式可讓你從來源陣列中提取元素組，也可測試出其在陣列是否有被定義，如果元素未定義會把值設定為 NULL 或者你在第三個參數中所定義的任何值。

	範例
	::

		$array = array(
			'color' => 'red',
			'shape' => 'round',
			'radius' => '10',
			'diameter' => '20'
		);

		$my_shape = elements(array('color', 'shape', 'height'), $array);

	上方程式碼執行後將會回傳此陣列：
	::

		array(
			'color' => 'red',
			'shape' => 'round',
			'height' => NULL
		);

	第三個參數的預設賦予值可以依你喜好方式設置。
	::

		 $my_shape = elements(array('color', 'shape', 'height'), $array, 'foobar');

	上方程式碼執行後將會回傳此陣列：
	::

		array(     
			'color' 	=> 'red',
			'shape' 	=> 'round',
			'height'	=> 'foobar'
		);

	此函式在傳送 ``$_POST`` 陣列至 Model 時相當有用，可以避免使用者混入額外的 POST data 進你的資料表。

	::

		$this->load->model('post_model');
		$this->post_model->update(
			elements(array('id', 'title', 'content'), $_POST)
		);

	可以保證只有 id、title、content 這三個欄位會被送出更新。


.. php:function:: random_element($array)

	:param	array	$array: 來源陣列
	:returns:	來源陣列中的隨機元素
	:rtype:	各種型態皆有

	在來源陣列中隨機挑選一個元素回傳。

	範例
	::

		$quotes = array(
			"I find that the harder I work, the more luck I seem to have. - Thomas Jefferson",
			"Don't stay in bed, unless you can make money in bed. - George Burns",
			"We didn't lose the game; we just ran out of time. - Vince Lombardi",
			"If everything seems under control, you're not going fast enough. - Mario Andretti",
			"Reality is merely an illusion, albeit a very persistent one. - Albert Einstein",
			"Chance favors the prepared mind - Louis Pasteur"
		);

		echo random_element($quotes);
