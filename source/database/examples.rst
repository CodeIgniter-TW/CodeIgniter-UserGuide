#########################
資料庫 快速入門：範例程式
#########################

以下的頁面包含了示範如何使用資料庫類別的範例程式。請閱讀各個函數的說明頁面來了解完整的細節。

起始化資料庫類別
================

以下的程式根據你 :doc:`設定檔 <configuration>` 中的設定載入並初始化資料類別：

::

	$this->load->database();

類別一旦載入，就可以像下面說明這樣使用：

注意：如果你的所有的頁面都需要存取資料，你可以設定自動連線資料庫，參閱 :doc:`連線資料庫 <connecting>` 來了解細節。

標準的多結果查詢（物件版）
==========================

::

	$query = $this->db->query('SELECT name, title, email FROM my_table');
	
	foreach ($query->result() as $row)
	{
		echo $row->title;
		echo $row->name;
		echo $row->email;
	}
	
	echo 'Total Results: ' . $query->num_rows();

以上的 result() 函數返回一個 **物件** 陣列。範例：$row->title 。 

標準的多結果查詢（陣列版）
==========================

::

	$query = $this->db->query('SELECT name, title, email FROM my_table');
	
	foreach ($query->result_array() as $row)
	{
		echo $row['title'];
		echo $row['name'];
		echo $row['email'];
	}

以上 result_array() 函數返回一個標準的索引陣列。範例：$row['title'] 。

結果測試
========

如果你執行的查詢可能 **不會** 產生結果，那你最好在取得結果之前先用 num_rows() 函數做一下測試：

::

	$query = $this->db->query("YOUR QUERY");
	if ($query->num_rows() > 0)
	{
		foreach ($query->result() as $row)
		{
			echo $row->title;
			echo $row->name;
			echo $row->body;
		}
	}

標準的單一結果查詢（物件版）
============================

::

	$query = $this->db->query('SELECT name FROM my_table LIMIT 1'); 
	$row = $query->row();
	echo $row->name;

上例中 row() 函數返回一個 **物件**。範例：$row->name 。

標準的單一結果查詢（陣列版）
============================

::

	$query = $this->db->query('SELECT name FROM my_table LIMIT 1');
	$row = $query->row_array();
	echo $row['name'];

上例中 row_array() 函數傳回一個 **陣列** 。範例：$row['name'] 。

標準新增
========

::

	$sql = "INSERT INTO mytable (title, name) VALUES (".$this->db->escape($title).", ".$this->db->escape($name).")";
	$this->db->query($sql);
	echo $this->db->affected_rows();

查詢生成器 查詢
===============

:doc:`查詢生成器 <query_builder>` 給你一個取得資料的簡單方法：

::

	$query = $this->db->get('table_name');
	
	foreach ($query->result() as $row)
	{
		echo $row->title;
	}

上例中 get() 函數傳回指定的資料表中所有的結果。 :doc:`查詢生成器 <query_builder>` 類別包含完整的資料操作方法。

查詢生成器 新增
===============

::

	$data = array(
		'title' => $title,
		'name' => $name,
		'date' => $date
	);
	
	$this->db->insert('mytable', $data);  // Produces: INSERT INTO mytable (title, name, date) VALUES ('{$title}', '{$name}', '{$date}')

