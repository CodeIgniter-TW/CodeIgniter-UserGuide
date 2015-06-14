##################
單元測試類別
##################

單元測試是為應用軟體中每一個函數撰寫測試程式的開發方式。
如果你不熟悉這個概念，可以稍微 google 一下這個主題。

CodeIgniter 的單元測試類別非常簡單，由一個評估函式以及兩個結果函式構成。
它並不打算成為一個完整成熟的測試套件，而只提供了簡單的機制讓你評估你的程式碼，
來確認它是否產生正確的資料型別與結果。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

******************************
使用單元測試函式庫
******************************

類別初始化
======================

就像 CodeIgniter 其它多數類別一樣，
Unit Test 類別可以在你的 controller 內透過 $this->load->library 函式來初始化::

	$this->load->library('unit_test');

載入之後，就可以這樣取得 Unit Test 物件 ``$this->unit``

執行測試
=============

提供待測程式與預期的結果來執行測試，如下所示:

	$this->unit->run('test', 'expected result', 'test name', 'notes');

其中 'test' 是待測程式實際回傳的值，
'expected result' 是你預期的結果，
'test name' 用來命名這個測試，可省略，
'notes' 是備註，也可省略。範例::

	$test = 1 + 1;

	$expected_result = 2;

	$test_name = 'Adds one plus one';

	$this->unit->run($test, $expected_result, $test_name);

預期的結果可以是值相符，或是型別相符兩者之一。
這是值相符的範例::

	$this->unit->run('Foo', 'Foo');

這是型別相符的範例::

	$this->unit->run('Foo', 'is_string');

注意到第二個參數 "is_string" 了嗎？
這告訴函式要檢查你的待測程式回傳值是否為字串型別。
這裡有一份清單列出了可以用來比對的型別：

-  is_object
-  is_string
-  is_bool
-  is_true
-  is_false
-  is_int
-  is_numeric
-  is_float
-  is_double
-  is_array
-  is_null

產生報告
==================

你可以在每個測試執行後就顯示結果，或是執行完數個測試後才產生報告。
直接 echo 或是 return 就可以顯示報告::

	echo $this->unit->run($test, $expected_result);

或是這樣子取得所有測試的報告::

	echo $this->unit->report();

報告將會以表格呈現。
如果你偏好原始資料，也可以這樣做來取得原始資料陣列::

	echo $this->unit->result();

嚴格模式
===========

單元測試類別預設使用鬆散比對來檢查值是否相符。
例如下面的範例::

	$this->unit->run(1, TRUE);

測試評估的是一個整數，但預期的結果是一個布林值。
而由於 PHP 的型別鬆散特性，上面的程式使用一般的相等來檢查時，
結果會是 TRUE::

	if (1 == TRUE) echo 'This evaluates as true';

若有需要的話，你可以將單元測試類別設置為嚴格模式，
這樣在比對結果時，除了比對值以外，還會比對資料型態::

	if (1 === TRUE) echo 'This evaluates as FALSE';

你可以這樣子啟動嚴格模式::

	$this->unit->use_strict(TRUE);

啟用/停用單元測試
===============================

如果你想要把一些測試留在程式碼中，但只想在需要的時候才執行，
你可以用下面的方法來停用單元測試::

	$this->unit->active(FALSE);

單元測試的陳列
=================

當你顯示單元測試結果時，預設包含下列的項目：

-  Test Name (test_name)
-  Test Datatype (test_datatype)
-  Expected Datatype (res_datatype)
-  Result (result)
-  File Name (file)
-  Line Number (line)
-  Any notes you entered for the test (notes)

使用 $this->unit->set_test_items()，你可以決定項目是否要顯示。
例如，如果你只想要顯示測試名稱與結果：

客製要顯示的測試
---------------------------

::

	$this->unit->set_test_items(array('test_name', 'result'));

建立模板
-------------------

如果你想要用非預設的格式來顯示測試結果，你可以定義自己的模板。
這是一個簡單的模板範例。請注意必要的虛擬變數::

	$str = '
	<table border="0" cellpadding="4" cellspacing="1">
	{rows}
		<tr>
			<td>{item}</td>
			<td>{result}</td>
		</tr>
	{/rows}
	</table>';

	$this->unit->set_template($str);

.. note:: 你的模板必須在測試執行 **之前** 定義。

***************
類別參考
***************

.. php:class:: CI_Unit_test

	.. php:method:: set_test_items($items)

		:param array $items: 要顯示的項目列表
		:returns: void

		設置要顯示的項目列表。可用的選項有：

		  - test_name
		  - test_datatype
		  - res_datatype
		  - result
		  - file
		  - line
		  - notes

	.. php:method:: run($test[, $expected = TRUE[, $test_name = 'undefined'[, $notes = '']]])

		:param	mixed	$test: 測試資料
		:param	mixed	$expected: 預期的結果
		:param	string	$test_name: 測試名稱
		:param	string	$notes: 附加在此測試的任何備註
		:returns:	測試報告
		:rtype:	string

		執行單元測試。

	.. php:method:: report([$result = array()])

		:param	array	$result: 一個包含了測試結果的陣列
		:returns:	測試報告
		:rtype:	string

		為已經執行完的測試產生報告。

	.. php:method:: use_strict([$state = TRUE])

		:param	bool	$state: 嚴格模式旗標
		:rtype:	void

		啟用/停用嚴格模式。

	.. php:method:: active([$state = TRUE])

		:param	bool	$state: 是否啟用單元測試
		:rtype:	void

		啟用/停用單元測試。

	.. php:method:: result([$results = array()])

		:param	array	$results: 測試結果列表
		:returns:	包含測試結果原始資料的陣列
		:rtype:	array

		回傳測試結果的原始資料。

	.. php:method:: set_template($template)

		:param	string	$template: 測試結果模板
		:rtype:	void

		設置要用來顯示測試結果的模板。
