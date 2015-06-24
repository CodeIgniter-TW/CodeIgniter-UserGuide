############
產生查詢結果
############

有幾總方法可以產生查詢結果：

.. contents::
    :local:
    :depth: 2

********
結果陣列
********

**result()**

這方法會回傳一個查詢結果的陣列**物件**，或者失敗時會回傳 **空陣列**。
一般狀況可以使用 foreach 迴圈，就像底下：

::

	$query = $this->db->query("YOUR QUERY");
	
	foreach ($query->result() as $row)
	{
		echo $row->title;
		echo $row->name;
		echo $row->body;
	}

上述方法的別名是 ``result_object()``。

假如您的查詢可能 **不會** 產生結果，我們建議您先用下面方式進行判斷：

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

你也可以傳入一個字串給 result()，每一個結果物件將實體化為該類別（注意：該類別必須為可讀取的）。

::

	$query = $this->db->query("SELECT * FROM users;");

	foreach ($query->result('User') as $user)
	{
		echo $user->name; // access attributes
		echo $user->reverse_name(); // or methods defined on the 'User' class
	}

**result_array()**

這方法會回傳一個查詢結果的陣列資料，或者當查無資料時會回傳 **空陣列**。
一般狀況可以使用 foreach 迴圈，就像底下：

::

	$query = $this->db->query("YOUR QUERY");
	
	foreach ($query->result_array() as $row)
	{
		echo $row['title'];
		echo $row['name'];
		echo $row['body'];
	}

******
結果列
******

**row()**

此方法會回傳單筆查詢資料。假如您查詢的資料超過一筆，它只會回傳第一筆資料。 結果會以一個 **物件** 回傳。參考範例：

::

	$query = $this->db->query("YOUR QUERY");
	
	if ($query->num_rows() > 0)
	{
		$row = $query->row();
		
		echo $row->title;
		echo $row->name;
		echo $row->body;
	}

如果您想要回傳特定的第幾筆資料，可以設定第一個參數為您想要的該筆資料：

::

	$row = $query->row(5);

你也可以傳入第二個字串參數，這是結果物件將被實體化為的類別名稱

::

	$query = $this->db->query("SELECT * FROM users LIMIT 1;");
	$query->row(0, 'User');
	
	echo $row->name; // access attributes
	echo $row->reverse_name(); // or methods defined on the 'User' class

**row_array()**

同等於上述 ``row()`` 方法，不同的是它回傳是陣列。參考範例：

::

	$query = $this->db->query("YOUR QUERY");
	
	if ($query->num_rows() > 0)
	{
		$row = $query->row_array();
		
		echo $row['title'];
		echo $row['name'];
		echo $row['body'];
	}

如果您想要回傳特定的第幾筆資料，可以設定第一個參數為您想要的該筆資料：

::

	$row = $query->row_array(5);

除此之外，您可以利用底下方式查詢到 前一筆/下一筆/第一筆/最後一筆 資料：

	| **$row = $query->first_row()**
	| **$row = $query->last_row()**
	| **$row = $query->next_row()**
	| **$row = $query->previous_row()**

預設回傳值為物件，除非設定第一個參數為 "array"：

	| **$row = $query->first_row('array')**
	| **$row = $query->last_row('array')**
	| **$row = $query->next_row('array')**
	| **$row = $query->previous_row('array')**

.. 注意:: 上述所有的方法都會將所有的查詢結果載入到記憶體當中（預載）。使用 ``unbuffered_row()`` 來處理大型的查詢結果集合。

**unbuffered_row()**

此方法會回傳單筆查詢資料，但並不會像 ``row()`` 將所有查詢結果預載到記憶體中。
如果你的查詢結果超過一筆，他將回傳該筆資料並將內部資料指標移動到下一筆資料。

::

	$query = $this->db->query("YOUR QUERY");
	
	while ($row = $query->unbuffered_row())
	{	
		echo $row->title;
		echo $row->name;
		echo $row->body;
	}

你可以選擇傳入 'object' （預設）或 'array' 來指定回傳的資料型態：
::

	$query->unbuffered_row();		// object
	$query->unbuffered_row('object');	// object
	$query->unbuffered_row('array');	// associative array

************
結果輔助方法
************

**num_rows()**

The number of rows returned by the query. Note: In this example, $query
is the variable that the query result object is assigned to::

	$query = $this->db->query('SELECT * FROM my_table');
	
	echo $query->num_rows();

.. note:: Not all database drivers have a native way of getting the total
	number of rows for a result set. When this is the case, all of
	the data is prefetched and ``count()`` is manually called on the
	resulting array in order to achieve the same result.
	
**num_fields()**

The number of FIELDS (columns) returned by the query. Make sure to call
the method using your query result object::

	$query = $this->db->query('SELECT * FROM my_table');
	
	echo $query->num_fields();

**free_result()**

It frees the memory associated with the result and deletes the result
resource ID. Normally PHP frees its memory automatically at the end of
script execution. However, if you are running a lot of queries in a
particular script you might want to free the result after each query
result has been generated in order to cut down on memory consumption.

Example::

	$query = $this->db->query('SELECT title FROM my_table');
	
	foreach ($query->result() as $row)
	{
		echo $row->title;
	}

	$query->free_result();  // The $query result object will no longer be available

	$query2 = $this->db->query('SELECT name FROM some_table');

	$row = $query2->row();
	echo $row->name;
	$query2->free_result(); // The $query2 result object will no longer be available

**data_seek()**

This method sets the internal pointer for the next result row to be
fetched. It is only useful in combination with ``unbuffered_row()``.

It accepts a positive integer value, which defaults to 0 and returns
TRUE on success or FALSE on failure.

::

	$query = $this->db->query('SELECT `field_name` FROM `table_name`');
	$query->data_seek(5); // Skip the first 5 rows
	$row = $query->unbuffered_row();

.. note:: Not all database drivers support this feature and will return FALSE.
	Most notably - you won't be able to use it with PDO.

********
物件參考
********

.. class:: CI_DB_result

	.. method:: result([$type = 'object'])

		:param	string	$type: Type of requested results - array, object, or class name
		:returns:	Array containing the fetched rows
		:rtype:	array

		A wrapper for the ``result_array()``, ``result_object()``
		and ``custom_result_object()`` methods.

		Usage: see `Result Arrays`_.

	.. method:: result_array()

		:returns:	Array containing the fetched rows
		:rtype:	array

		Returns the query results as an array of rows, where each
		row is itself an associative array.

		Usage: see `Result Arrays`_.

	.. method:: result_object()

		:returns:	Array containing the fetched rows
		:rtype:	array

		Returns the query results as an array of rows, where each
		row is an object of type ``stdClass``.

		Usage: see `Result Arrays`_.

	.. method:: custom_result_object($class_name)

		:param	string	$class_name: Class name for the resulting rows
		:returns:	Array containing the fetched rows
		:rtype:	array

		Returns the query results as an array of rows, where each
		row is an instance of the specified class.

	.. method:: row([$n = 0[, $type = 'object']])

		:param	int	$n: Index of the query results row to be returned
		:param	string	$type: Type of the requested result - array, object, or class name
		:returns:	The requested row or NULL if it doesn't exist
		:rtype:	mixed

		A wrapper for the ``row_array()``, ``row_object() and 
		``custom_row_object()`` methods.

		Usage: see `Result Rows`_.

	.. method:: unbuffered_row([$type = 'object'])

		:param	string	$type: Type of the requested result - array, object, or class name
		:returns:	Next row from the result set or NULL if it doesn't exist
		:rtype:	mixed

		Fetches the next result row and returns it in the
		requested form.

		Usage: see `Result Rows`_.

	.. method:: row_array([$n = 0])

		:param	int	$n: Index of the query results row to be returned
		:returns:	The requested row or NULL if it doesn't exist
		:rtype:	array

		Returns the requested result row as an associative array.

		Usage: see `Result Rows`_.

	.. method:: row_object([$n = 0])

		:param	int	$n: Index of the query results row to be returned
                :returns:	The requested row or NULL if it doesn't exist
		:rtype:	stdClass

		Returns the requested result row as an object of type
		``stdClass``.

		Usage: see `Result Rows`_.

	.. method:: custom_row_object($n, $type)

		:param	int	$n: Index of the results row to return
		:param	string	$class_name: Class name for the resulting row
		:returns:	The requested row or NULL if it doesn't exist
		:rtype:	$type

		Returns the requested result row as an instance of the
		requested class.

	.. method:: data_seek([$n = 0])

		:param	int	$n: Index of the results row to be returned next
		:returns:	TRUE on success, FALSE on failure
		:rtype:	bool

		Moves the internal results row pointer to the desired offset.

		Usage: see `Result Helper Methods`_.

	.. method:: set_row($key[, $value = NULL])

		:param	mixed	$key: Column name or array of key/value pairs
		:param	mixed	$value: Value to assign to the column, $key is a single field name
		:rtype:	void

		Assigns a value to a particular column.

	.. method:: next_row([$type = 'object'])

		:param	string	$type: Type of the requested result - array, object, or class name
		:returns:	Next row of result set, or NULL if it doesn't exist
		:rtype:	mixed

		Returns the next row from the result set.

	.. method:: previous_row([$type = 'object'])

		:param	string	$type: Type of the requested result - array, object, or class name
		:returns:	Previous row of result set, or NULL if it doesn't exist
		:rtype:	mixed

		Returns the previous row from the result set.

	.. method:: first_row([$type = 'object'])

		:param	string	$type: Type of the requested result - array, object, or class name
		:returns:	First row of result set, or NULL if it doesn't exist
		:rtype:	mixed

		Returns the first row from the result set.

	.. method:: last_row([$type = 'object'])

		:param	string	$type: Type of the requested result - array, object, or class name
		:returns:	Last row of result set, or NULL if it doesn't exist
		:rtype:	mixed

		Returns the last row from the result set.

	.. method:: num_rows()

		:returns:	Number of rows in the result set
		:rtype:	int

		Returns the number of rows in the result set.

		Usage: see `Result Helper Methods`_.

	.. method:: num_fields()

		:returns:	Number of fields in the result set
		:rtype:	int

		Returns the number of fields in the result set.

		Usage: see `Result Helper Methods`_.

	.. method:: field_data()

		:returns:	Array containing field meta-data
		:rtype:	array

		Generates an array of ``stdClass`` objects containing
		field meta-data.

	.. method:: free_result()

		:rtype:	void

		Frees a result set.

		Usage: see `Result Helper Methods`_.

	.. method:: list_fields()

		:returns:	Array of column names
		:rtype:	array

		Returns an array containing the field names in the
		result set.
