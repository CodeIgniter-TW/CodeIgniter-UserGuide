################
HTML Table 類別
################

Table 類別提供函式讓你能夠自動產生 HTML 表格，
可以使用陣列，或是從資料庫的查詢結果。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

*********************
使用 Table 類別
*********************

初始化類別
======================

就像 CodeIgniter 其它多數類別一樣，
Table 類別可以在你的 controller 內透過 ``$this->load->library()`` 函式來初始化::

	$this->load->library('table');

載入之後，就可以這樣取得 Table 物件::

	$this->table

範例
========

這個範例示範如何從一個多維陣列來產生一個表格。
陣列的第一個索引將會成為表頭
（或是你可以使用之後會提到的 ``set_heading()`` 函式來設定你想要的表頭）

::

	$this->load->library('table');

	$data = array(
		array('Name', 'Color', 'Size'),
		array('Fred', 'Blue', 'Small'),
		array('Mary', 'Red', 'Large'),
		array('John', 'Green', 'Medium')	
	);

	echo $this->table->generate($data);

這個範例示範以資料庫的查詢結果來產生表格，
並且自動的以資料表的名稱來作為表頭
（或是你可以使用之後會提到的 ``set_heading()`` 函式來設定你想要的表頭）

::

	$this->load->library('table');

	$query = $this->db->query('SELECT * FROM my_table');

	echo $this->table->generate($query);

這邊示範以陸續加入參數的方式產生表格::

	$this->load->library('table');

	$this->table->set_heading('Name', 'Color', 'Size');

	$this->table->add_row('Fred', 'Blue', 'Small');
	$this->table->add_row('Mary', 'Red', 'Large');
	$this->table->add_row('John', 'Green', 'Medium');

	echo $this->table->generate();

與上例相同，但是使用的參數是陣列::

	$this->load->library('table');

	$this->table->set_heading(array('Name', 'Color', 'Size'));

	$this->table->add_row(array('Fred', 'Blue', 'Small'));
	$this->table->add_row(array('Mary', 'Red', 'Large'));
	$this->table->add_row(array('John', 'Green', 'Medium'));

	echo $this->table->generate();

改變表格的外觀
===============================

Table 類別允許你使用樣版，以便設計表格的外觀。
底下是一個樣版的雛型::

	$template = array(
		'table_open'		=> '<table border="0" cellpadding="4" cellspacing="0">',

		'thead_open'		=> '<thead>',
		'thead_close'		=> '</thead>',

		'heading_row_start'	=> '<tr>',
		'heading_row_end'	=> '</tr>',
		'heading_cell_start'	=> '<th>',
		'heading_cell_end'	=> '</th>',

		'tbody_open'		=> '<tbody>',
		'tbody_close'		=> '</tbody>',

		'row_start'		=> '<tr>',
		'row_end'		=> '</tr>',
		'cell_start'		=> '<td>',
		'cell_end'		=> '</td>',

		'row_alt_start'		=> '<tr>',
		'row_alt_end'		=> '</tr>',
		'cell_alt_start'	=> '<td>',
		'cell_alt_end'		=> '</td>',

		'table_close'		=> '</table>'
	);

	$this->table->set_template($template);

.. note:: 你可以看到這個樣版擁有二組 "row" 的設定，
	可以讓你在陳列資料時交替使用不同顏色或設計元素。

如果你只是要改變部份樣式時，
你可以只提供要修改的部份，
而不需要提供整個樣版。
在這個範例中，只有改變表格的起始標籤::

	$template = array(
		'table_open' => '<table border="1" cellpadding="2" cellspacing="1" class="mytable">'
	);

	$this->table->set_template($template);
	
你也可以在設定檔中設置預設值。

***************
類別參考
***************

.. php:class:: CI_Table

	.. attribute:: $function = NULL

		允許你設置一個 PHP 的原生函式或是一個有效的函式來套用在所有的表格資料。
		::

			$this->load->library('table');

			$this->table->set_heading('Name', 'Color', 'Size');
			$this->table->add_row('Fred', '<strong>Blue</strong>', 'Small');

			$this->table->function = 'htmlspecialchars';
			echo $this->table->generate();

		在上面的範例中，所有的資料都會經過 PHP 的 :php:func:`htmlspecialchars()` 函式處理，產生結果如下::

			<td>Fred</td><td>&lt;strong&gt;Blue&lt;/strong&gt;</td><td>Small</td>

	.. php:method:: generate([$table_data = NULL])

		:param	mixed	$table_data: 用來產生表格的資料
		:returns:	HTML 表格
		:rtype:	string

		回傳一個字串，裡面包含了所產生的表格。
		接受一個可省略的參數，可以是陣列或是資料庫查詢結果。

	.. php:method:: set_caption($caption)

		:param	string	$caption: 表格標題
		:returns:	CI_Table 實例 (方法鏈)
		:rtype:	CI_Table

		讓你能為表格加入標題。
		::

			$this->table->set_caption('Colors');

	.. php:method:: set_heading([$args = array()[, ...]])

		:param	mixed	$args: 表頭，可以用一個陣列或是多個字串來設定
		:returns:	CI_Table 實例 (方法鏈)
		:rtype:	CI_Table

		允許你設定表頭。你可以提供一個陣列或是個別的參數::

			$this->table->set_heading('Name', 'Color', 'Size');

			$this->table->set_heading(array('Name', 'Color', 'Size'));

	.. php:method:: add_row([$args = array()[, ...]])

		:param	mixed	$args: 一列的資料，可以用一個陣列或是多個字串來設定
		:returns:	CI_Table 實例 (方法鏈)
		:rtype:	CI_Table

		讓你可以在表格增加一列。你可以提供一個陣列或是個別的參數::

			$this->table->add_row('Blue', 'Red', 'Green');

			$this->table->add_row(array('Blue', 'Red', 'Green'));

		如果你想要設定個別格子的標籤屬性，你可以使用關聯式陣列。
		鍵值 **data** 的資料是表格的內容。
		其它所有的 鍵 => 值 對都會以 鍵='值' 的格式加進標籤屬性中。::

			$cell = array('data' => 'Blue', 'class' => 'highlight', 'colspan' => 2);
			$this->table->add_row($cell, 'Red', 'Green');

			// 將會產生
			// <td class='highlight' colspan='2'>Blue</td><td>Red</td><td>Green</td>

	.. php:method:: make_columns([$array = array()[, $col_limit = 0]])

		:param	array	$array: 一個含有多列資料的陣列
		:param	int	$col_limit: 表格的欄位數
		:returns:	可用來產生 HTML 表格的陣列
		:rtype:	array

		這個函式藉由輸入一個一維陣列與欄位個數來產生一個多維陣列，
		並以此多維陣列來產生表格。
		範例::

			$list = array('one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve');

			$new_list = $this->table->make_columns($list, 3);

			$this->table->generate($new_list);

			// 產生類似這樣的表格

			<table border="0" cellpadding="4" cellspacing="0">
			<tr>
			<td>one</td><td>two</td><td>three</td>
			</tr><tr>
			<td>four</td><td>five</td><td>six</td>
			</tr><tr>
			<td>seven</td><td>eight</td><td>nine</td>
			</tr><tr>
			<td>ten</td><td>eleven</td><td>twelve</td></tr>
			</table>


	.. php:method:: set_template($template)

		:param	array	$template: 一個含有樣板資料的關聯式陣列
		:returns:	成功回傳 TRUE，否則回傳 FALSE
		:rtype:	bool

		讓你設定樣板。你可以提供完整樣板，也可以只提供部份樣板。
		::

			$template = array(
				'table_open'  => '<table border="1" cellpadding="2" cellspacing="1" class="mytable">'
			);
		
			$this->table->set_template($template);

	.. php:method:: set_empty($value)

		:param	mixed	$value: 要放在空白欄位的值
		:returns:	CI_Table 實例 (方法鏈)
		:rtype:	CI_Table

		為空白的欄位設定預設值。
		你可能會想設定一個非換行空白::

			$this->table->set_empty("&nbsp;");

	.. php:method:: clear()

		:returns:	CI_Table 實例 (方法鏈)
		:rtype:	CI_Table

		清除表格。當你想要顯示不同資料的多個表格時，
		你應該清除先前所建立的表格資料。例如::

			$this->load->library('table');

			$this->table->set_heading('Name', 'Color', 'Size');
			$this->table->add_row('Fred', 'Blue', 'Small');
			$this->table->add_row('Mary', 'Red', 'Large');
			$this->table->add_row('John', 'Green', 'Medium');

			echo $this->table->generate();

			$this->table->clear();

			$this->table->set_heading('Name', 'Day', 'Delivery');
			$this->table->add_row('Fred', 'Wednesday', 'Express');
			$this->table->add_row('Mary', 'Monday', 'Air');
			$this->table->add_row('John', 'Saturday', 'Overnight');

			echo $this->table->generate();
