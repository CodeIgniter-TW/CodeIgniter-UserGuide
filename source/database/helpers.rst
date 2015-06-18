############
查詢補助函式
############

獲取查詢執行的資訊
==================

**$this->db->insert_id()**

進行資料庫插入時的插入ID數字。

.. note:: 如果使用了 PDO 驅動連接 PostgreSQL 或是使用 InterBase 驅動程式，這個函式會需要一個 $name 參數，用來指定適當的序列來檢查插入的 id 。

**$this->db->affected_rows()**

顯示會執行 "寫入" 類型的查詢所影響的列數（ insert, update 等）。

.. note:: 在 MySQL ， "DELETE FROM TABLE" 回傳受影響的列數會是 0 。資料庫類別做了一點小 hack ，讓他可以傳回正確的數字。預設這個 hack 是開啟的，不過也可以從資料庫驅動程式檔案中將它關閉。

**$this->db->last_query()**

回傳最近一次執行的查詢（查詢字串，不是查詢結果）。
例如：

::

	$str = $this->db->last_query();
	
	// 產生： SELECT * FROM sometable....


.. note:: 在資料庫設定中取消 **save_queries** 設定，會使這個函式失效

取得資料庫的資訊
================

**$this->db->count_all()**

讓你可以確知一個資料表中資料的列數。使用資料表名稱作為第一個參數。例如：

::

	echo $this->db->count_all('my_table');
	
	// 產生一個整數，像是 25

**$this->db->platform()**

輸出目前在運行的資料庫平台（ MySQL, MS SQL, Postgres 等）：

::

	echo $this->db->platform();

**$this->db->version()**

輸出目前在運行的資料庫版本：

::

	echo $this->db->version();

讓查詢更容易
============

**$this->db->insert_string()**

這個函式簡化了插入資料到資料庫的過程。它會回傳一個正確格式的 SQL 插入字串。例如：

::

	$data = array('name' => $name, 'email' => $email, 'url' => $url);
	
	$str = $this->db->insert_string('table_name', $data);

第一個參數是資料表名稱，第二個參數是要插入資料的關聯陣列。上面的例子會產生：

::

	INSERT INTO table_name (name, email, url) VALUES ('Rick', 'rick@example.com', 'example.com')

.. note:: 值會被自動跳脫，以產生較安全的查詢。

**$this->db->update_string()**

這個函式簡化了撰寫資料庫更新的過程。它會回傳一個正確格式的 SQL 更新字串。例如：

::

	$data = array('name' => $name, 'email' => $email, 'url' => $url);
	
	$where = "author_id = 1 AND status = 'active'";
	
	$str = $this->db->update_string('table_name', $data, $where);

第一個參數是資料表名稱，第二個參數是要更新資料的關連陣列，第三個則是 "where" 子句。上面的例子會產生：

::

	 UPDATE table_name SET name = 'Rick', email = 'rick@example.com', url = 'example.com' WHERE author_id = 1 AND status = 'active'

.. note:: 值會被自動跳脫，以產生較安全的查詢。
