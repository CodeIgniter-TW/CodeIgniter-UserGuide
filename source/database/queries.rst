########
執行查詢
########

********
查詢基礎
********

常規的查詢
==========

可以使用下 **query** 來提交查詢：

::

	$this->db->query('YOUR QUERY HERE');

當使用 "讀取" 模式來進行查詢，query() 函數以 **object** 型態回傳資料庫的 :doc:`產生查詢結果 <results>` 。
當使用 "寫入" 模式來進行查詢，會依據執行成功或失敗來回傳 TRUE 或 FALSE。
當檢索資料的時候，通常使用一個變數接收查詢的結果，例如：

::

	$query = $this->db->query('YOUR QUERY HERE');

簡單化的查詢
============

**simple_query** 方法是 $this->db->query() 的簡化版。
他 **不會** 回傳資料庫結果集合，不會設定查詢計時器，或者編譯數據，或是儲存您的查詢以便除錯。
簡單的說，它只是讓你提交查詢。大多數用戶很少會使用此功能。

他回傳 database drivers 中 "執行" 函數的回傳結果。
通常是 TRUE 或 FALSE 依據寫入查詢（INSERT, DELETE or UPDATE（合適的實際應用時機））的成功或失敗。
並將成功的查詢轉為可以使用的資源/物件。

::

	if ($this->db->simple_query('YOUR QUERY'))
	{
		echo "Success!";
	}
	else
	{
		echo "Query failed!";
	}

.. 注意:: PostgreSQL's ``pg_exec()`` 函數（舉例）總是再成功的查詢返回資源，即使是寫入的查詢。
	將這件事情緊記在心，當你在找尋 boolean 值的時候。

******************
手動設定資料庫前綴
******************

如果你有設定資料庫前綴，且希望將他加入到資料表名稱，例如當你使用原生 SQL ，可使用以下的語法：

::

	$this->db->dbprefix('tablename'); // outputs prefix_tablename

如果因為某些原因你需要修改前綴，並不需要建立一個新的連結，可使用以下方法：

::

	$this->db->set_dbprefix('newprefix');
	$this->db->dbprefix('tablename'); // outputs newprefix_tablename


************
保護標識符號
************

在眾多資料庫中最好對資料表跟欄位名稱使用保護 - 例如 MySQL 使用反引號 backticks (``)。
**查詢生成器會自動的提供保護**，如果你需要手動保護這些標識符號可以使用：

::

	$this->db->protect_identifiers('table_name');

.. 重要:: 雖然查詢生成器會嘗試提供對任何你提供的欄位與資料表名稱提供最好的保護，注意他 **不是** 設計對任何用戶的輸入提供保護的。
	請 **不要** 提供任何未經檢查過濾的使用者輸入資料。

根據資料庫設定檔裡面的前綴設定，此函數會在資料表前面加上前綴。
您可以透過設定第二個參數為 TRUE (boolen) 來啟動前綴設定：

::

	$this->db->protect_identifiers('table_name', TRUE);


********
跳脫查詢
********

這是一個非常良好安全習慣在你提交資料到資料庫之前進行資料跳脫。
CodeIgniter 提供三個方法可以幫助您做到這一點：

#. **$this->db->escape()** 此函數根據資料型態來運作，所以他只會對字串型態的資料進行跳脫。
	它會自動增加單引號在資料的兩側，所以你不必加上單引號：
   ::

	$sql = "INSERT INTO table (title) VALUES(".$this->db->escape($title).")";

#. **$this->db->escape_str()** 此函數可以跳脫任何資料型態。
	在大多數的情況底下，你使用上述的函數多於使用此函數。此函數用法如下：
   ::

	$sql = "INSERT INTO table (title) VALUES('".$this->db->escape_str($title)."')";

#. **$this->db->escape_like_str()** 此函數可以用在字串將使用於 SQL Like 語法當中，像是萬用字元（'%', '_'）在此函數中也會被跳脫。 
	::

		$search = '20% raise'; 
		$sql = "SELECT id FROM table WHERE column LIKE '%".$this->db->escape_like_str($search)."%'";


********
封裝查詢
********

封裝可以簡化你的查詢語法，讓系統幫忙為您的查詢放入資料. 請參照底下範例：

::

	$sql = "SELECT * FROM some_table WHERE id = ? AND status = ? AND author = ?";
	$this->db->query($sql, array(3, 'live', 'Rick'));

這些問號會自動改為查詢函數的第二個參數陣列資料值。

封裝也支援陣列參數，他將轉換成 IN 使用的集合：
::

	$sql = "SELECT * FROM some_table WHERE id IN ? AND status = ? AND author = ?";
	$this->db->query($sql, array(array(3, 6), 'live', 'Rick'));

轉換後的查詢結果如下：
::

	SELECT * FROM some_table WHERE id IN (3,6) AND status = 'live' AND author = 'Rick'

使用封裝的第二個好處是系統會自動幫忙跳脫字串，形成較安全的查詢語法。
您就不需要手動的處理這些資料；系統將會自動的幫忙處理。

********
錯誤處理
********

**$this->db->error();**

當你需要取得最後一次發生的錯誤，error() 方法將會用一個陣列回傳錯誤的編號與訊息。一個簡單的範例：
::

	if ( ! $this->db->simple_query('SELECT `example_field` FROM `example_table`'))
	{
		$error = $this->db->error(); // Has keys 'code' and 'message'
	}

