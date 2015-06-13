##############
查詢生成器類別
##############

你可以在 CodeIgniter 中使用查詢生成器類別。這個模式可以讓你使用最少的程式從資料庫中取出、插入及更新資訊。在一些案例中，只需要一兩行程式就可以進行資料庫操作。 CodeIgniter 不需要每個資料表都是它自己的一個類別檔。取而代之，它提供了一個更簡單的介面。

除了簡單，使用查詢生成器功能的主要好處在於，它讓你可以產生獨立於資料庫的應用程式，因為實際上的查詢語法是使用不同資料庫的轉接器來產生的。這也讓你的查詢更安全，因為值會由系統自動跳脫。

.. note:: 如果你傾向自己撰寫查詢，你可以在資料庫設定檔中設定不啟用這個類別，來讓核心資料庫函式庫及轉接器使用較少的資源。

.. contents::
    :local:
    :depth: 1

********
選取資料
********

以下函式可以讓你建構 SQL **SELECT** 語句。

**$this->db->get()**

執行選取查詢並回傳結果。它同時可以用來取得資料表中所有記錄：

::

	$query = $this->db->get('mytable');  // 產生： SELECT * FROM mytable

第二及第三個參數，可以讓你設定查詢的限制及偏移：

::

	$query = $this->db->get('mytable', 10, 20);

	// 執行： SELECT * FROM mytable LIMIT 20, 10
	// （使用 MySQL 時。其他資料庫的語法稍有不同）

你會注意到，上面的函式被指派給一個叫做 $query 的變數，它可以用來顯示結果：

::

	$query = $this->db->get('mytable');

	foreach ($query->result() as $row)
	{
		echo $row->title;
	}

請參閱 :doc:`result functions <results>` 頁面有關於生成出 result 的完整討論。

**$this->db->get_compiled_select()**

用來編譯 select 查詢，就像 **$this->db->get()** 但是沒有 *執行* 查詢。這個方法只將 SQL 查詢當做字串回傳。

例如：

::

	$sql = $this->db->get_compiled_select('mytable');
	echo $sql;

	// 印出字串： SELECT * FROM mytable

第二個參數讓你能設定，是否要讓查詢產生器的查詢在編譯之後重設。（預設是會重設，就像使用 `$this->db->get()` 一樣）：

::

	echo $this->db->limit(10,20)->get_compiled_select('mytable', FALSE);

	// 印出字串： SELECT * FROM mytable LIMIT 20, 10
	// （使用 MySQL 時。其他資料庫的語法稍有不同）

	echo $this->db->select('title, content, date')->get_compiled_select();

	// 印出字串： SELECT title, content, date FROM mytable LIMIT 20, 10

要注意的關鍵是在上面的範例中，第二個查詢並未使用 **$this->db->from()** ，也沒有傳送資料表名稱作為第一個參數。會出現這個結果，是因為查詢並未執行 **$this->db->get()** 使得值被重設，或是使用 **$this->db->reset_query()** 直接將值重設。

**$this->db->get_where()**

與上面的函式相同，只是它讓你可以加入 "where" 子句作為第二個參數，而非使用 db->where() 函式：

::

	$query = $this->db->get_where('mytable', array('id' => $id), $limit, $offset);

更詳細的資訊，請參閱下面關於 where 函式的說明。

.. note:: 舊的 getwhere() 方法已經被移除而被 get_where() 方法取代

**$this->db->select()**

讓你可以撰寫查詢中 SELECT 的部份：

::

	$this->db->select('title, content, date');
	$query = $this->db->get('mytable');

	// 執行： SELECT title, content, date FROM mytable

.. note:: 如果要從資料表中選取所有欄位 (\*) ，你不需要使用這個函式。當你忽略， CodeIgniter 會假設你希望選取所有欄位而自動加上 'SELECT \*' 。

``$this->db->select()`` 可接受額外的第二個參數。如果你設成 FALSE ， CodeIgniter 將不會試著保護欄位及資料表名稱。如果你需要自行組合 select 語句，而自動跳脫欄位名稱可能會破壞它時，這個參數會很有用。

::

	$this->db->select('(SELECT SUM(payments.amount) FROM payments WHERE payments.invoice_id=4') AS amount_paid', FALSE);
	$query = $this->db->get('mytable');

**$this->db->select_max()**

用來撰寫查詢中 ``SELECT MAX(field)`` 的部份。你可以額外包含第二個參數，來重新命名查詢結果中的欄位。

::

	$this->db->select_max('age');
	$query = $this->db->get('members');  // 產生： SELECT MAX(age) as age FROM members

	$this->db->select_max('age', 'member_age');
	$query = $this->db->get('members'); // 產生： SELECT MAX(age) as member_age FROM members


**$this->db->select_min()**

用來撰寫查詢中 "SELECT MIN(field)" 的部份。跟 select_max() 一樣，可以額外用第二個參數來重新命名查詢結果中的欄位。

::

	$this->db->select_min('age');
	$query = $this->db->get('members'); // 產生： SELECT MIN(age) as age FROM members


**$this->db->select_avg()**

用來撰寫查詢中 "SELECT AVG(field)" 的部份。跟 select_max() 一樣，可以額外用第二個參數來重新命名查詢結果中的欄位。

::

	$this->db->select_avg('age');
	$query = $this->db->get('members'); // 產生： SELECT AVG(age) as age FROM members


**$this->db->select_sum()**

用來撰寫查詢中 "SELECT SUM(field)" 的部份。跟 select_max() 一樣，可以額外用第二個參數來重新命名查詢結果中的欄位。

::

	$this->db->select_sum('age');
	$query = $this->db->get('members'); // 產生： SELECT SUM(age) as age FROM members

**$this->db->from()**

讓你撰寫查詢中 FROM 的部份：

::

	$this->db->select('title, content, date');
	$this->db->from('mytable');
	$query = $this->db->get();  // 產生： SELECT title, content, date FROM mytable

.. note:: 如同之前的說明，查詢中 FROM 的部份可以在 $this->db->get() 函式中指定，就看你偏好使用哪個方法。

**$this->db->join()**

讓你撰寫查詢中的 JOIN 部分：

::

	$this->db->select('*');
	$this->db->from('blogs');
	$this->db->join('comments', 'comments.id = blogs.id');
	$query = $this->db->get();

	// 產生：
	// SELECT * FROM blogs JOIN comments ON comments.id = blogs.id

如果需要在一個查詢中使用多個 join ，可以多次呼叫這個函式。

如果你需要在查詢中指定 JOIN 的方式，可以透過這個函式的第三個參數來做。可指定的方式有： left, right, outer, inner, left outer, 以及 right outer 。

::

	$this->db->join('comments', 'comments.id = blogs.id', 'left');
	// 產生： LEFT JOIN comments ON comments.id = blogs.id

**************
尋找特定的資料
**************

**$this->db->where()**

這個函式讓你能用四個方法之一來設定 **WHERE** 子句：

.. note:: 所有傳送給這個函式的值會被自動跳脫，以產生較安全的查詢。

#. **簡單的 key/value 方法：**

	::

		$this->db->where('name', $name); // 產生： WHERE name = 'Joe'
	
	注意，它會幫你加上等號。
	
	If you use multiple function calls they will be chained together with
	AND between them:
	
	如果你多次呼叫這個函式，它會將他們用 AND 串在一起：

	::

		$this->db->where('name', $name);
		$this->db->where('title', $title);
		$this->db->where('status', $status);
		// WHERE name = 'Joe' AND title = 'boss' AND status = 'active'

#. **客製的 key/value 方法：**

	You can include an operator in the first parameter in order to
	control the comparison:

	你可以在第一個參數加上運算子，來控制它比較的方式：

	::

		$this->db->where('name !=', $name);
		$this->db->where('id <', $id); // 產生： WHERE name != 'Joe' AND id < 45

#. **關連陣列方法：**

	::

		$array = array('name' => $name, 'title' => $title, 'status' => $status);
		$this->db->where($array);
		// 產生： WHERE name = 'Joe' AND title = 'boss' AND status = 'active'

	You can include your own operators using this method as well:

	你同樣可以在這個方法中使用你要的運算子：

	::

		$array = array('name !=' => $name, 'id <' => $id, 'date >' => $date);
		$this->db->where($array);

#. **自定字串：**

	你可以手動撰寫自己要的子句：

	::

		$where = "name='Joe' AND status='boss' OR status='active'";
		$this->db->where($where);

``$this->db->where()`` 可以接受額外的第三個參數。如果你將它設為 FALSE ， CodeIgniter 將嘗試不去保護欄位及資料表名稱。

::

	$this->db->where('MATCH (field) AGAINST ("value")', NULL, FALSE);

**$this->db->or_where()**

這個函式與前面的相同，只是會將多個實例用 OR 串接起來：

::

	$this->db->where('name !=', $name);
	$this->db->or_where('id >', $id);  // 產生： WHERE name != 'Joe' OR id > 50

.. note:: 舊的 orwhere() 方法已經被移除而被 or_where() 方法取代

**$this->db->where_in()**

產生 WHERE field IN ('item', 'item') SQL 查詢，如果合適的話就用 AND 來串接

::

	$names = array('Frank', 'Todd', 'James');
	$this->db->where_in('username', $names);
	// 產生： WHERE username IN ('Frank', 'Todd', 'James')

**$this->db->or_where_in()**

產生 WHERE field IN ('item', 'item') SQL 查詢，如果合適的話就用 OR 來串接

::

	$names = array('Frank', 'Todd', 'James');
	$this->db->or_where_in('username', $names);
	// 產生： OR username IN ('Frank', 'Todd', 'James')

**$this->db->where_not_in()**

產生 WHERE field NOT IN ('item', 'item') SQL 查詢，如果合適的話就用 AND 來串接

::

	$names = array('Frank', 'Todd', 'James');
	$this->db->where_not_in('username', $names);
	// 產生： WHERE username NOT IN ('Frank', 'Todd', 'James')


**$this->db->or_where_not_in()**

產生 WHERE field NOT IN ('item', 'item') SQL 查詢，如果合適的話就用 OR 來串接

::

	$names = array('Frank', 'Todd', 'James');
	$this->db->or_where_not_in('username', $names);
	// 產生： OR username NOT IN ('Frank', 'Todd', 'James')

**************
尋找相似的資料
**************

**$this->db->like()**

這個方法可以讓你產生 **LIKE** 子句，在做搜尋時很有用。

.. note:: 所有傳進這個方法的值會被自動跳脫。

#. **簡單的 key/value 方法：**

	::

		$this->db->like('title', 'match');
		// 產生： WHERE `title` LIKE '%match%' ESCAPE '!'

	如果你多次呼叫這個方法，它們會使用 AND 來串接：

	::

		$this->db->like('title', 'match');
		$this->db->like('body', 'match');
		// WHERE `title` LIKE '%match%' ESCAPE '!' AND  `body` LIKE '%match% ESCAPE '!'

	如果要控制在哪個位置放置萬用字元，你可以使用額外的第三個參數。可使用的參數為 'before', 'after' 以及 'both' （預設值）

	::

		$this->db->like('title', 'match', 'before');	// 產生： WHERE `title` LIKE '%match' ESCAPE '!'
		$this->db->like('title', 'match', 'after');	// 產生： WHERE `title` LIKE 'match%' ESCAPE '!'
		$this->db->like('title', 'match', 'both');	// 產生： WHERE `title` LIKE '%match%' ESCAPE '!'

#. **關連陣列方法：**

	::

		$array = array('title' => $match, 'page1' => $match, 'page2' => $match);
		$this->db->like($array);
		// WHERE `title` LIKE '%match%' ESCAPE '!' AND  `page1` LIKE '%match%' ESCAPE '!' AND  `page2` LIKE '%match%' ESCAPE '!'


**$this->db->or_like()**

這個與前面的方法相同，只是多個實例會使用 OR 來串接：

::

	$this->db->like('title', 'match'); $this->db->or_like('body', $match);
	// WHERE `title` LIKE '%match%' ESCAPE '!' OR  `body` LIKE '%match%' ESCAPE '!'

.. note:: 舊的 ``orlike()`` 方法已經被移除而被 ``or_like()`` 方法取代

**$this->db->not_like()**

這個方法與 ``like()`` 相同，只是它會產生 NOT LIKE 語句：

::

	$this->db->not_like('title', 'match');	// WHERE `title` NOT LIKE '%match% ESCAPE '!'

**$this->db->or_not_like()**

這個方法與 ``not_like()`` 相同，只是多個實例會使用 OR 來串接：

::

	$this->db->like('title', 'match');
	$this->db->or_not_like('body', 'match');
	// WHERE `title` LIKE '%match% OR  `body` NOT LIKE '%match%' ESCAPE '!'

**$this->db->group_by()**

讓你可以撰寫查詢中 GROUP BY 的部份：

::

	$this->db->group_by("title"); // 產生： GROUP BY title

你也可以用陣列來傳送多個值給它：

::

	$this->db->group_by(array("title", "date"));  // 產生： GROUP BY title, date

.. note:: 舊的 groupby() 方法已經被移除，而被 group_by() 方法取代

**$this->db->distinct()**

用來在查詢中加入 "DISTINCT" 關鍵字

::

	$this->db->distinct();
	$this->db->get('table'); // 產生： SELECT DISTINCT * FROM table

**$this->db->having()**

讓你可以撰寫查詢中 HAVING 的部份。它有兩種語法，分別使用一個或兩個參數：

::

	$this->db->having('user_id = 45');  // 產生： HAVING user_id = 45
	$this->db->having('user_id',  45);  // 產生： HAVING user_id = 45

你也能用陣列來將多個值傳給它：

::

	$this->db->having(array('title =' => 'My Title', 'id <' => $id));
	// 產生： HAVING title = 'My Title', id < 45

如果你使用的資料庫 CodeIgniter 會為它的查詢做跳脫，你可使用額外的第三個參數，將它設定為 FALSE 來防止跳脫內容。

::

	$this->db->having('user_id',  45);  // 在一些資料庫例如MySQL會產生： HAVING `user_id` = 45
	$this->db->having('user_id',  45, FALSE);  // 產生： HAVING user_id = 45


**$this->db->or_having()**

與 having() 相同，只是它會使用 OR 來分隔多個子句。

************
排序查詢結果
************

**$this->db->order_by()**

讓你設定 ORDER BY 子句。

第一個參數包含你要用來排序的欄位名稱。

第二個參數讓你設定結果排序的方向，選項有 **ASC**, **DESC** 以及 **RANDOM** 。

::

	$this->db->order_by('title', 'DESC');
	// 產生： ORDER BY `title` DESC

你也可以用第一個參數傳入自定的字串：

::

	$this->db->order_by('title DESC, name ASC');
	// 產生： ORDER BY `title` DESC, `name` ASC

或是使用多次函式呼叫來傳入多個需要的欄位。

::

	$this->db->order_by('title', 'DESC');
	$this->db->order_by('name', 'ASC');
	// 產生： ORDER BY `title` DESC, `name` ASC

如果你選擇 **RANDOM** 作為排序方向的選項，那第一個參數會被忽略，除非你指定一個數值作為種子。

::

	$this->db->order_by('title', 'RANDOM');
	// 產生： ORDER BY RAND()

	$this->db->order_by(42, 'RANDOM');
	// 產生： ORDER BY RAND(42)

.. note:: 舊的 orderby() 方法已經被移除，而被 order_by() 方法取代

.. note:: Oracle 目前不支援亂數排序，所以預設會使用 ASC 來取代。

****************
結果的限制或計數
****************

**$this->db->limit()**

讓你限制查詢所要回傳的列數：

::

	$this->db->limit(10);  // 產生： LIMIT 10

第二個參數讓你可以指定查詢結果的偏移量。

::

	$this->db->limit(10, 20);  // 產生： LIMIT 20, 10 （使用MySQL時。其他資料庫的語法稍有不同）

**$this->db->count_all_results()**

讓你可以判斷特定 Active Record 查詢的結果列數。查詢可接受查詢生成器所給的限制條件，諸如 ``where()``, ``or_where()``, ``like()``, ``or_like()`` 等。例如：

::

	echo $this->db->count_all_results('my_table');  // 產生一個整數，像是 25
	$this->db->like('title', 'match');
	$this->db->from('my_table');
	echo $this->db->count_all_results(); // 產生一個整數，像是 17

不過這個方法也會重置你傳給 ``select()`` 的任何欄位值。如果你需要保留它們，可以傳送 ``FALSE`` 作為第二個參數：

::

	echo $this->db->count_all_results('my_table', FALSE);

**$this->db->count_all()**

讓你可以判斷特定資料表中資料的列數。提交資料表名稱作為第一個參數。例如：

::

	echo $this->db->count_all('my_table');  // 產生一個整數，像是 25

********
查詢分組
********

查詢分組讓你使用括號在 WHERE 子句中產生不同群組。這讓你可以用複雜的 WHERE 子句來產生查詢。支援巢狀的群組。例如：

::

	$this->db->select('*')->from('my_table')
		->group_start()
			->where('a', 'a')
			->or_group_start()
				->where('b', 'b')
				->where('c', 'c')
			->group_end()
		->group_end()
		->where('d', 'd')
	->get();

	// 生成：
	// SELECT * FROM (`my_table`) WHERE ( `a` = 'a' OR ( `b` = 'b' AND `c` = 'c' ) ) AND `d` = 'd'

.. note:: 群組需要保持平衡，請確認每個 group_start() 都有相對應的 group_end() 。

**$this->db->group_start()**

經由在查詢的 WHERE 子句中加入一個左括號，來起始一個新的群組。

**$this->db->or_group_start()**

經由在查詢的 WHERE 子句中加入一個 OR 以及後面的左括號，來起始一個新的群組。

**$this->db->not_group_start()**

經由在查詢的 WHERE 子句中加入一個 NOT 以及後面的左括號，來起始一個新的群組。

**$this->db->or_not_group_start()**

經由在查詢的 WHERE 子句中加入一個 OR NOT 以及後面的左括號，來起始一個新的群組。

**$this->db->group_end()**

經由在查詢的 WHERE 子句中加入一個右括號，來結束目前的群組。

********
插入資料
********

**$this->db->insert()**

根據你提供的資料產生插入語句字串，並執行查詢。你可以傳入 **陣列** 或 **物件** 作為參數。下面的範例是使用陣列：

::

	$data = array(
		'title' => 'My title',
		'name' => 'My Name',
		'date' => 'My date'
	);

	$this->db->insert('mytable', $data);
	// 產生： INSERT INTO mytable (title, name, date) VALUES ('My title', 'My name', 'My date')

第一個參數包含了資料表的名稱，第二個參數則是一個包含了要存入的值的關連陣列。

下面這個例子則使用物件：

::

	/*
	class Myclass {
		public $title = 'My Title';
		public $content = 'My Content';
		public $date = 'My Date';
	}
	*/

	$object = new Myclass;
	$this->db->insert('mytable', $object);
	// 產生： INSERT INTO mytable (title, content, date) VALUES ('My Title', 'My Content', 'My Date')

第一個參數包含了資料表的名稱，第二個參數則是一個物件。

.. note:: 所有的值都會被自動跳脫以產生較安全的查詢。

**$this->db->get_compiled_insert()**

就像 $this->db->insert() 一樣編譯出插入的查詢，但是並不 *執行* 。這個方法只會把產生的 SQL 查詢當做字串回傳。

範例：

::

	$data = array(
		'title' => 'My title',
		'name'  => 'My Name',
		'date'  => 'My date'
	);

	$sql = $this->db->set($data)->get_compiled_insert('mytable');
	echo $sql;

	// 產生字串： INSERT INTO mytable (title, name, date) VALUES ('My title', 'My name', 'My date')

第二個參數讓你能設定是否要在執行後重設查詢生成器（預設是會，跟 $this->db->insert() 一樣）：

::

	echo $this->db->set('title', 'My Title')->get_compiled_insert('mytable', FALSE);

	// 產生字串： INSERT INTO mytable (title) VALUES ('My Title')

	echo $this->db->set('content', 'My Content')->get_compiled_insert();

	// 產生字串： INSERT INTO mytable (title, content) VALUES ('My Title', 'My Content')

在上例中要注意的重點在於，第二次查詢並沒有使用 `$this->db->from()` ，也沒有把資料表名稱當做第一個參數傳入。這樣依舊能運作的原因在於，查詢並未使用 `$this->db->insert()` 來執行而使得值被重設，也沒有直接使用 `$this->db->reset_query()` 來重設。

.. note:: 這個方法不適用於批次插入資料。

**$this->db->insert_batch()**

根據你提供的資料產生插入語句字串，並且執行查詢。你可以傳入一個 **陣列** 或是 **物件** 給函式。下面的範例是使用陣列：

::

	$data = array(
		array(
			'title' => 'My title',
			'name' => 'My Name',
			'date' => 'My date'
		),
		array(
			'title' => 'Another title',
			'name' => 'Another Name',
			'date' => 'Another date'
		)
	);

	$this->db->insert_batch('mytable', $data);
	// 產生： INSERT INTO mytable (title, name, date) VALUES ('My title', 'My name', 'My date'),  ('Another title', 'Another name', 'Another date')

第一個參數包含了資料表名稱，第二個參數則是要插入資料的關聯陣列。

.. note:: 所有的值都會被自動跳脫以產生較安全的查詢。

********
更新資料
********

**$this->db->replace()**

這個方法會執行一個 REPLACE 語句，它基本上是一個標準的 SQL DELETE 加上 INSERT，使用 *PRIMARY* 與 *UNIQUE* 鍵來做判斷的因素。
在我們的案例中，它可以讓你不需要呼叫 ``select()``, ``update()``, ``delete()`` 與 ``insert()`` 等的不同組合來實現複雜的邏輯。

範例：

::

	$data = array(
		'title' => 'My title',
		'name'  => 'My Name',
		'date'  => 'My date'
	);

	$this->db->replace('table', $data);

	// 執行： REPLACE INTO mytable (title, name, date) VALUES ('My title', 'My name', 'My date')

在上面的範例中，如果我們假設 *title* 欄位是主鍵，而一個列的 *title* 欄位值包含 'My title' ，那這個列會被刪除而用新的資料列取代。

也可以使用 ``set()`` 方法，而且就像使用  ``insert()`` 時一樣，所有的欄位值會被自動跳脫。

**$this->db->set()**

這個函式讓你能設定要插入或更新的值。

**也可以直接傳送一個資料陣列給插入或更新函數**

::

	$this->db->set('name', $name);
	$this->db->insert('mytable');  // 產生： INSERT INTO mytable (name) VALUES ('{$name}')

如果多次呼叫函式，它會根據你是要插入或更新來做適當的組合：

::

	$this->db->set('name', $name);
	$this->db->set('title', $title);
	$this->db->set('status', $status);
	$this->db->insert('mytable');

**set()** 可以接受額外的第三個參數 ($escape) ，將它設定為 FALSE ，可以避免資料被跳脫。為了展示其中的差異，這裡同時使用 escape 參數與不使用 escape 參數來呼叫 set() ：

::

	$this->db->set('field', 'field+1', FALSE);
	$this->db->insert('mytable'); // 執行： INSERT INTO mytable (field) VALUES (field+1)
	$this->db->set('field', 'field+1');
	$this->db->insert('mytable'); // 執行： INSERT INTO mytable (field) VALUES ('field+1')


你也可以傳送關連陣列給這個函式：

::

	$array = array(
		'name' => $name,
		'title' => $title,
		'status' => $status
	);

	$this->db->set($array);
	$this->db->insert('mytable');

或是傳送一個物件：

::

	/*
	class Myclass {
		public $title = 'My Title';
		public $content = 'My Content';
		public $date = 'My Date';
	}
	*/

	$object = new Myclass;
	$this->db->set($object);
	$this->db->insert('mytable');

**$this->db->update()**

根據你傳送的資料產生一個 update 字串並執行查詢。你可以傳送 **陣列** 或 **物件** 給函式。這是使用陣列的例子：

::

	$data = array(
		'title' => $title,
		'name' => $name,
		'date' => $date
	);

	$this->db->where('id', $id);
	$this->db->update('mytable', $data);
	// 產生： 
	// UPDATE mytable  
	// SET title = '{$title}', name = '{$name}', date = '{$date}' 
	// WHERE id = $id

你也可以提供一個物件：

::

	/*
	class Myclass {
		public $title = 'My Title';
		public $content = 'My Content';
		public $date = 'My Date';
	}
	*/

	$object = new Myclass;
	$this->db->where('id', $id);
	$this->db->update('mytable', $object);
	// 產生： 
	// UPDATE mytable  
	// SET title = '{$title}', name = '{$name}', date = '{$date}' 
	// WHERE id = $id

.. note:: 所有的值會被自動跳脫以產生較安全的查詢。

你會發現使用 $this->db->where() 讓你可以設定 WHERE 子句。你也可以額外用字串來直接傳送這個資訊給 update 函式：

::

	$this->db->update('mytable', $data, "id = 4");

Or as an array

或是使用一個陣列：

::

	$this->db->update('mytable', $data, array('id' => $id));

你也可以使用前面提到的 $this->db->set() 函式來執行更新。

**$this->db->update_batch()**

根據你提供的資料產生 update 字串並執行查詢。你也可以傳送一個 **陣列** 或是 **物件** 給這個函式。
這是使用陣列的例子：

::

	$data = array(
	   array(
	      'title' => 'My title' ,
	      'name' => 'My Name 2' ,
	      'date' => 'My date 2'
	   ),
	   array(
	      'title' => 'Another title' ,
	      'name' => 'Another Name 2' ,
	      'date' => 'Another date 2'
	   )
	);

	$this->db->update_batch('mytable', $data, 'title');

	// 產生：
	// UPDATE `mytable` SET `name` = CASE
	// WHEN `title` = 'My title' THEN 'My Name 2'
	// WHEN `title` = 'Another title' THEN 'Another Name 2'
	// ELSE `name` END,
	// `date` = CASE
	// WHEN `title` = 'My title' THEN 'My date 2'
	// WHEN `title` = 'Another title' THEN 'Another date 2'
	// ELSE `date` END
	// WHERE `title` IN ('My title','Another title')

第一個參數會包含資料表的名稱，第二個參數是一個值的陣列，第三個則是 where 使用的鍵。

.. note:: 所有的值會被自動跳脫以產生較安全的查詢。

.. note:: 由於它運作的天性，在這個方法使用 ``affected_rows()`` 不會給你適當的結果。取而代之，使用 ``update_batch()`` 來回傳受影響的列數。

**$this->db->get_compiled_update()**

與 ``$this->db->get_compiled_insert()`` 用幾乎完全一樣的方式運作，只是它會產生 UPDATE SQL 字串而非 INSERT SQL 字串。

請參閱 `$this->db->get_compiled_insert()` 的文件來取得更多資訊。

.. note:: 這個方法無法在批次更新運作。

********
刪除資料
********

**$this->db->delete()**

產生一個刪除的 SQL 字串並執行查詢。

::

	$this->db->delete('mytable', array('id' => $id)); 
	// 產生： 
	// DELETE FROM mytable  
	// WHERE id = $id

第一個參數是資料表名稱，第二個參數是 where 子句。除了傳送資料作為第二個參數，你也可以使用 where() 或是 or_where() 函式：

::

	$this->db->where('id', $id);
	$this->db->delete('mytable');

	// 產生：
	// DELETE FROM mytable
	// WHERE id = $id


如果你想要從多個資料表刪除資料，可以傳送一個資料表名稱的陣列給 delete() 。

::

	$tables = array('table1', 'table2', 'table3');
	$this->db->where('id', '5');
	$this->db->delete($tables);


如果你要把資料表中所有的資料刪除，可以使用 truncate() 函式或是 empty_table() 函式。

**$this->db->empty_table()**

產生一個刪除的 SQL 字串並執行查詢。

::

	  $this->db->empty_table('mytable'); // 產生： DELETE FROM mytable

**$this->db->truncate()**

產生一個 truncate SQL 字串並執行查詢。

::

	$this->db->from('mytable');
	$this->db->truncate();

	// 或

	$this->db->truncate('mytable');

	// 產生：
	// TRUNCATE mytable

.. note:: 如果無法使用 TRUNCATE 命令， truncate() 會執行 "DELETE FROM table" 。

**$this->db->get_compiled_delete()**

運作的方式與 ``$this->db->get_compiled_insert()`` 完全一樣，除了它會產生一個 DELETE SQL 字串而不是 INSERT SQL 字串。

請參閱 $this->db->get_compiled_insert() 文件來取得更多資訊。

********
方法串接
********

方法串接讓你可以把多個函式接起來使用以簡化語法。請考慮下例：

::

	$query = $this->db->select('title')
			->where('id', $id)
			->limit(10, 20)
			->get('mytable');

.. _ar-caching:

**************
查詢生成器快取
**************

雖然不是真的快取，查詢生成器可以儲存（或 "快取" ）查詢中的特定部分，讓你可以在程式中重複使用。正常狀態下，當查詢生成器的呼叫完成時，所有儲存起來的資訊會被重置以準備下一次呼叫。使用快取，讓你能防止重置，而簡單地重複使用資訊。

快取的呼叫是累積的。如果你進行兩次快取的 select() 呼叫，然後進行兩次不快取的呼叫，結果會進行四次 select() 呼叫。
有三個快取函式可以使用：

**$this->db->start_cache()**

必須呼叫這個函式來開始快取。所有正確的查詢生成器的查詢類型（請參閱後面提到的可支援的查詢）會被儲存起來以備接下來的程式使用。

**$this->db->stop_cache()**

呼叫這個函數能停止快取。

**$this->db->flush_cache()**

這個函數會刪除所有查詢生成器快取中的項目。

一個快取的範例
--------------

這是一個使用範例：

::

	$this->db->start_cache();
	$this->db->select('field1');
	$this->db->stop_cache();
	$this->db->get('tablename');
	// 生成： SELECT `field1` FROM (`tablename`)

	$this->db->select('field2');
	$this->db->get('tablename');
	// 生成：  SELECT `field1`, `field2` FROM (`tablename`)

	$this->db->flush_cache();
	$this->db->select('field2');
	$this->db->get('tablename');
	// 生成：  SELECT `field2` FROM (`tablename`)

.. note:: 下列語句可以被快取： select, from, join, where, like, group_by, having, order_by, set

**************
重置查詢生成器
**************

**$this->db->reset_query()**

重置查詢生成器讓你可以重新開始查詢，而不用先呼叫 $this->db->get() 或 $this->db->insert() 等方法。就像其他執行查詢的方法，這並不會讓你重置使用 `查詢生成器快取`_ 快取起來的項目。

在你使用查詢生成器產生 SQL （例如： ``$this->db->get_compiled_select()`` ），然後又想要進行其他動作（例如執行查詢）的狀況下，這樣會很有用：

::

	// 注意， get_compiled_select 方法的第二個參數是 FALSE
	$sql = $this->db->select(array('field1','field2'))
					->where('field3',5)
					->get_compiled_select('mytable', FALSE);
	
	// ...
	// 對 SQL 程式碼做一些瘋狂的事 ... 像是把它加入到 cron script 
	// 來在稍後執行 ...
	// ...
	
	$data = $this->db->get()->result_array();
	
	// 會執行並回傳下列查詢的結果陣列：
	// SELECT field1, field1 from mytable where field3 = 5;

.. note:: 在使用查詢生成器的快取功能，又沒有重置查詢的時候重複呼叫 ``get_compiled_select()`` ，會使得快取被合併兩次。例如，假設你正在快取一個 ``select()`` ，這樣反而會讓你 select 同一個欄位兩次。

********
類別參考
********

.. php:class:: CI_DB_query_builder

	.. php:method:: reset_query()

		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		重置當前查詢生成器的狀態。當你要建立一個在特定狀況下會取消的查詢時，這個方法很有用。

	.. php:method:: start_cache()

		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		開始查詢生成器的快取。

	.. php:method:: stop_cache()

		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		停止查詢生成器的快取。

	.. php:method:: flush_cache()

		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		清空查詢生成器的快取。

	.. php:method:: set_dbprefix([$prefix = ''])

		:param	string	$prefix: 要使用的新前綴
		:returns:	使用中的資料庫前綴
		:rtype:	string

		設定資料庫前綴，此操作無需重新連接到資料庫。

	.. php:method:: dbprefix([$table = ''])

		:param	string	$table: 要加上前綴的資料表名稱
		:returns:	已加上前綴的資料表名稱
		:rtype:	string

		Prepends a database prefix, if one exists in configuration.
		如果設定中存在已經設定好資料庫前綴，就將它加上。

	.. php:method:: count_all_results([$table = '', [$reset = TRUE]])

		:param	string	$table: 資料表名稱
		:param	bool	$reset: 是否要在執行完畢重設 SELECT 的值
		:returns:	查詢結果的列數
		:rtype:	int

		產生一個平台特定的查詢字串，這個查詢字串會用來計算查詢生成器的查詢所回傳的記錄數，然後執行並回傳結果。

	.. php:method:: get([$table = ''[, $limit = NULL[, $offset = NULL]]])

		:param	string	$table: 要查詢的資料表
		:param	int	$limit: LIMIT 子句
		:param	int	$offset: OFFSET 子句
		:returns:	CI_DB_result 的實例（方法串接）
		:rtype:	CI_DB_result

		根據已經呼叫的查詢生成器方法，編譯並執行 SELECT 語句。

	.. php:method:: get_where([$table = ''[, $where = NULL[, $limit = NULL[, $offset = NULL]]]])

		:param	mixed	$table: 要取得資料的資料表（一個或多個），字串或陣列
		:param	string	$where: WHERE 子句
		:param	int	$limit: LIMIT 子句
		:param	int	$offset: OFFSET 子句
		:returns:	CI_DB_result 的實例（方法串接）
		:rtype:	CI_DB_result

		跟 ``get()`` 相同，但是讓你可以直接加入 WHERE 子句。

	.. php:method:: select([$select = '*'[, $escape = NULL]])

		:param	string	$select: 查詢的 SELECT 部分
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢中加入 SELECT 子句。

	.. php:method:: select_avg([$select = ''[, $alias = '']])

		:param	string	$select: 要計算平均值的欄位
		:param	string	$alias: 結果值的欄位別名
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢中加入 SELECT AVG(field) 子句。

	.. php:method:: select_max([$select = ''[, $alias = '']])

		:param	string	$select: 要計算最大值的欄位
		:param	string	$alias: 結果值的欄位別名
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢中加入 SELECT MAX(field) 子句。

	.. php:method:: select_min([$select = ''[, $alias = '']])

		:param	string	$select: 要計算最小值的欄位
		:param	string	$alias: 結果值的欄位別名
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢中加入 SELECT MIN(field) 子句。

	.. php:method:: select_sum([$select = ''[, $alias = '']])

		:param	string	$select: 要計算總和的欄位
		:param	string	$alias: 結果值的欄位別名
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢中加入 SELECT SUM(field) 子句。

	.. php:method:: distinct([$val = TRUE])

		:param	bool	$val: 要使用的 "distinct" 旗標值
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		設定一個旗標，告訴查詢生成器要在查詢的 SELECT 部分加入 DISTINCT 子句。

	.. php:method:: from($from)

		:param	mixed	$from: 字串或陣列，用來指定一個或多個資料表名稱
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		指定查詢的 FROM 子句。

	.. php:method:: join($table, $cond[, $type = ''[, $escape = NULL]])

		:param	string	$table: 要 join 的資料表名稱
		:param	string	$cond: JOIN ON 條件
		:param	string	$type: JOIN 的類型
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢中加入 JOIN 子句。

	.. php:method:: where($key[, $value = NULL[, $escape = NULL]])

		:param	mixed	$key: 用來比較的欄位名稱，或是一個關連陣列
		:param	mixed	$value: 如果 key 是單一欄位名稱，用來指定比較的值
		:param	boolean	$escape: 是否要跳脫值及識別字
		:returns:	DB_query_builder 的實例
		:rtype:	object

		產生查詢的 WHERE 部分。
                多次呼叫時會使用 'AND' 來分隔（串接多個條件）。

	.. php:method:: or_where($key[, $value = NULL[, $escape = NULL]])

		:param	mixed	$key: 用來比較的欄位名稱，或是一個關連陣列
		:param	mixed	$value: 如果 key 是單一欄位名稱，用來指定比較的值
		:param	boolean	$escape: 是否要跳脫值及識別字
		:returns:	DB_query_builder 的實例
		:rtype:	object

		產生查詢的 WHERE 部分。
                多次呼叫時會使用 'OR' 來分隔（串接多個條件）。

	.. php:method:: or_where_in([$key = NULL[, $values = NULL[, $escape = NULL]]])

		:param	string	$key: 要搜尋的欄位
		:param	array	$values: 用來搜尋的值
		:param	boolean	$escape: 是否要跳脫值及識別字
		:returns:	DB_query_builder 的實例
		:rtype:	object

		產生一個 WHERE field IN('item', 'item') SQL 查詢，
                合適的話以 'OR' 串接。

	.. php:method:: or_where_not_in([$key = NULL[, $values = NULL[, $escape = NULL]]])

		:param	string	$key: 要搜尋的欄位
		:param	array	$values: 用來搜尋的值
		:param	boolean	$escape: 是否要跳脫識別字
		:returns:	DB_query_builder 的實例
		:rtype:	object

		產生一個 WHERE field NOT IN('item', 'item') SQL 查詢，
                合適的話以 'OR' 串接。

	.. php:method:: where_in([$key = NULL[, $values = NULL[, $escape = NULL]]])

		:param	string	$key: 要檢查的欄位名稱
		:param	array	$values: 目標值的陣列
		:param	boolean	$escape: 是否要跳脫識別字
		:returns:	DB_query_builder 的實例
		:rtype:	object

		產生一個 WHERE field IN('item', 'item') SQL 查詢，
                合適的話以 'AND' 串接。

	.. php:method:: where_not_in([$key = NULL[, $values = NULL[, $escape = NULL]]])

		:param	string	$key: 要檢查的欄位名稱
		:param	array	$values: 目標值的陣列
		:param	boolean	$escape: 是否要跳脫識別字
		:returns:	DB_query_builder 的實例
		:rtype:	object

		產生一個 WHERE field NOT IN('item', 'item') SQL 查詢，
                合適的話以 'AND' 串接。

	.. php:method:: group_start()

		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		開始一段群組表達式，使用 AND 作為內部條件。

	.. php:method:: or_group_start()

		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		開始一段群組表達式，使用 OR 作為內部條件。

	.. php:method:: not_group_start()

		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		開始一段群組表達式，使用 NOT 作為內部條件。

	.. php:method:: or_not_group_start()

		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		開始一段群組表達式，使用 OR NOT 作為內部條件。

	.. php:method:: group_end()

		:returns:	DB_query_builder 的實例
		:rtype:	object

		結束一段群組表達式。

	.. php:method:: like($field[, $match = ''[, $side = 'both'[, $escape = NULL]]])

		:param	string	$field: 欄位名稱
		:param	string	$match: 要匹配的文字部分
		:param	string	$side: 要在敘述的哪一側加上 '%' 萬用字元
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 LIKE 子句，多次呼叫時會使用 AND 來分隔（串接多個條件）。

	.. php:method:: or_like($field[, $match = ''[, $side = 'both'[, $escape = NULL]]])

		:param	string	$field: 欄位名稱
		:param	string	$match: 要匹配的文字部分
		:param	string	$side: 要在敘述的哪一側加上 '%' 萬用字元
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 LIKE 子句，多次呼叫時會使用 OR 來分隔（串接多個條件）。

	.. php:method:: not_like($field[, $match = ''[, $side = 'both'[, $escape = NULL]]])

		:param	string	$field: 欄位名稱
		:param	string	$match: 要匹配的文字部分
		:param	string	$side: 要在敘述的哪一側加上 '%' 萬用字元
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 NOT LIKE 子句，多次呼叫時會使用 AND 來分隔（串接多個條件）。

	.. php:method:: or_not_like($field[, $match = ''[, $side = 'both'[, $escape = NULL]]])

		:param	string	$field: 欄位名稱
		:param	string	$match: 要匹配的文字部分
		:param	string	$side: 要在敘述的哪一側加上 '%' 萬用字元
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 NOT LIKE 子句，多次呼叫時會使用 OR 來分隔（串接多個條件）。

	.. php:method:: having($key[, $value = NULL[, $escape = NULL]])

		:param	mixed	$key: 識別字（字串）或是由欄位 / 值對構成的關聯陣列
		:param	string	$value: 如果 $key 是識別字，這是要搜尋的值
		:param	string	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 HAVING 子句，多次呼叫時會使用 AND 來分隔（串接多個條件）。

	.. php:method:: or_having($key[, $value = NULL[, $escape = NULL]])

		:param	mixed	$key: 識別字（字串）或是由欄位/值對構成的關聯陣列
		:param	string	$value: 如果 $key 是識別字，這是要搜尋的值
		:param	string	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 HAVING 子句，多次呼叫時會使用 OR 來分隔（串接多個條件）。

	.. php:method:: group_by($by[, $escape = NULL])

		:param	mixed	$by: 要 group by 的欄位，字串或陣列（多個欄位時）
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 GROUP BY 子句。

	.. php:method:: order_by($orderby[, $direction = ''[, $escape = NULL]])

		:param	string	$orderby: 要排序的欄位
		:param	string	$direction: 指定的排序方式： ASC, DESC 或 random
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 ORDER BY 子句。

	.. php:method:: limit($value[, $offset = 0])

		:param	int	$value: 要限制的結果列數
		:param	int	$offset: 要跳過的列數
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 LIMIT 與 OFFSET 子句。

	.. php:method:: offset($offset)

		:param	int	$offset: 要跳過的列數
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		在查詢加入 OFFSET 子句。

	.. php:method:: set($key[, $value = ''[, $escape = NULL]])

		:param	mixed	$key: 欄位名稱，或是由欄位 / 值對構成的陣列
		:param	string	$value: 如果 $key 是單一欄位，就是欄位要指定的值
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		加入稍後會被傳給 ``insert()`` , ``update()`` 或 ``replace()`` 的欄位 / 值對。

	.. php:method:: insert([$table = ''[, $set = NULL[, $escape = NULL]]])

		:param	string	$table: 資料表名稱
		:param	array	$set: 欄位 / 值對構成的關聯陣列
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	成功時回傳 TRUE ，失敗時回傳 FALSE
		:rtype:	bool

		編譯並執行 INSERT 語句。

	.. php:method:: insert_batch([$table = ''[, $set = NULL[, $escape = NULL]]])

		:param	string	$table: 資料表名稱
		:param	array	$set: 要插入的資料
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	成功時回傳插入列數，失敗時回傳 FALSE
		:rtype:	mixed

		編譯並執行批次的 INSERT 語句。

	.. php:method:: set_insert_batch($key[, $value = ''[, $escape = NULL]])

		:param	mixed	$key: 欄位名稱或是由欄位 / 值對構成的陣列
		:param	string	$value: 如果 $key 是單一欄位，指定欄位要設定的值
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		加入稍後會透過 ``insert_batch()`` 插入到資料表的欄位 / 值對。

	.. php:method:: update([$table = ''[, $set = NULL[, $where = NULL[, $limit = NULL]]]])

		:param	string	$table: 資料表名稱
		:param	array	$set: 由欄位 / 值對構成的關聯陣列
		:param	string	$where: WHERE 子句
		:param	int	$limit: LIMIT 子句
		:returns:	成功時回傳 TRUE ，失敗時回傳 FALSE
		:rtype:	bool

		編譯並執行 UPDATE 語句。

	.. php:method:: update_batch([$table = ''[, $set = NULL[, $value = NULL]]])

		:param	string	$table: 資料表名稱
		:param	array	$set: 欄位名稱或由欄位 / 值對構成的關聯陣列
		:param	string	$value: 如果 $set 是單一欄位，指定欄位要設定的值
		:returns:	成功時回傳更新列數，失敗時回傳 FALSE
		:rtype:	mixed

		編譯並執行批次 UPDATE 語句。

	.. php:method:: set_update_batch($key[, $value = ''[, $escape = NULL]])

		:param	mixed	$key: 欄位名稱或由欄位 / 值對構成的陣列
		:param	string	$value: 如果 $key 是單一欄位，指定欄位要設定的值
		:param	bool	$escape: 是否要跳脫值及識別字
		:returns:	CI_DB_query_builder 的實例（方法串接）
		:rtype:	CI_DB_query_builder

		加入稍後會透過 ``update_batch()`` 更新到資料表的欄位 / 值對。

	.. php:method:: replace([$table = ''[, $set = NULL]])

		:param	string	$table: 資料表名稱
		:param	array	$set: 由欄位 / 值對構成的關聯陣列
		:returns:	成功時回傳 TRUE ，失敗時回傳 FALSE
		:rtype:	bool

		編譯並執行 REPLACE 語句。

	.. php:method:: delete([$table = ''[, $where = ''[, $limit = NULL[, $reset_data = TRUE]]]])

		:param	mixed	$table: 要刪除的資料表，字串或陣列（多個資料表）
		:param	string	$where: WHERE 子句
		:param	int	$limit: LIMIT 子句
		:param	bool	$reset_data: TRUE to reset the query "write" clause
		:returns:	成功時回傳 CI_DB_query_builder 的實例（方法串接），失敗時回傳 FALSE
		:rtype:	mixed

		編譯並執行 DELETE 查詢。

	.. php:method:: truncate([$table = ''])

		:param	string	$table: 資料表名稱
		:returns:	成功時回傳 TRUE ，失敗時回傳 FALSE
		:rtype:	bool

		在資料表執行 TRUNCATE 語句。

		.. note:: 如果資料庫平台不支援 TRUNCATE，會使用 DELETE 語句來替代。

	.. php:method:: empty_table([$table = ''])

		:param	string	$table: 資料表名稱
		:returns:	成功時回傳 TRUE ，失敗時回傳 FALSE
		:rtype:	bool

		透過 DELETE 語句將資料表中所有記錄刪除。

	.. php:method:: get_compiled_select([$table = ''[, $reset = TRUE]])

		:param	string	$table: 資料表名稱
		:param	bool	$reset: 是否要重置當前查詢生成器的值
		:returns:	編譯好的 SQL 語句字串
		:rtype:	string

		編譯 SELECT 語句並作為字串回傳。

	.. php:method:: get_compiled_insert([$table = ''[, $reset = TRUE]])

		:param	string	$table: 資料表名稱
		:param	bool	$reset: 是否要重置當前查詢生成器的值
		:returns:	編譯好的 SQL 語句字串
		:rtype:	string

		編譯 INSERT 語句並作為字串回傳。

	.. php:method:: get_compiled_update([$table = ''[, $reset = TRUE]])

		:param	string	$table: 資料表名稱
		:param	bool	$reset: 是否要重置當前查詢生成器的值
		:returns:	編譯好的 SQL 語句字串
		:rtype:	string

		編譯 UPDATE 語句並作為字串回傳。

	.. php:method:: get_compiled_delete([$table = ''[, $reset = TRUE]])

		:param	string	$table: 資料表名稱
		:param	bool	$reset: 是否要重置當前查詢生成器的值
		:returns:	編譯好的 SQL 語句字串
		:rtype:	string

		編譯 DELETE 語句並作為字串回傳。
