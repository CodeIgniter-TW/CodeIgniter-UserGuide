##################
效能測試類別
##################

CodeIgniter擁有一個常駐的效能測試類別，能夠計算出兩個標記位置間的執行時間。

.. note:: 這個類別會由系統建立，所以不需要使用者自行建立

除此之外，效能測試總是會於框架觸發時開始執行，並且於輸出頁面前結束，能夠取
得一個非常準確的系統執行時間。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

*************************
使用效能測試類別
*************************

效能測試類別可用於
:doc:`controllers </general/controllers>`,
:doc:`views </general/views>`, 或是你的 :doc:`models </general/models>`.
使用的順序為：

#. 標記一個起始點 
#. 標記一個結束點
#. 執行 "elapsed time" 函數取得執行時間

範例：

	$this->benchmark->mark('code_start');

	// 程式碼於這裡執行 

	$this->benchmark->mark('code_end');

	echo $this->benchmark->elapsed_time('code_start', 'code_end');

.. note:: "code_start" 和 "code_end" 是可以任意命名的. 他們只是兩個作為
    標記識別的名稱。你可以使用所有你想使用的單字，並建立多組標記點。
    範例::

		$this->benchmark->mark('dog');

		// 程式碼於這裡執行

		$this->benchmark->mark('cat');

		// 更多程式碼於這裡執行

		$this->benchmark->mark('bird');

		echo $this->benchmark->elapsed_time('dog', 'cat');
		echo $this->benchmark->elapsed_time('cat', 'bird');
		echo $this->benchmark->elapsed_time('dog', 'bird');


分析效能測試結果
===============================

如果你希望將你的效能測試數據用於 :doc:`Profiler </general/profiling>` 
所有的標記點都必須成對設置，而且標記點的名稱必須相同，並以 _start 和 _end 結尾。
範例::

	$this->benchmark->mark('my_mark_start');

	// Some code happens here...

	$this->benchmark->mark('my_mark_end');

	$this->benchmark->mark('another_mark_start');

	// Some more code happens here...

	$this->benchmark->mark('another_mark_end');

請參考 :doc:`Profiler page </general/profiling>` 獲得更多資訊

顯示總執行時間
===============================

如果你希望顯示Codeigniter從開始執行到顯示頁面的時間，只要在樣板中放入以下程式碼::

	<?php echo $this->benchmark->elapsed_time();?>

你會注意到這是和上一個範例中相同的函數，除了 **沒有** 使用任何參數。
當參數為空時，不管你在哪裡執行這個函數，直到顯示頁面前Codeigniter不會停止效能測試

如果你不喜歡使用純PHP，另一個顯示執行時間的方法為使用虛擬變數::

	{elapsed_time}

.. note:: 如果你想要測試controller中的效能，你就必須設置自己的起始/結束標記點

顯示記憶體用量
=============================

如果你的PHP在安裝時有開啟--enable-memory-limit，你就可以使用下面的程式碼顯示記憶體用量::

	<?php echo $this->benchmark->memory_usage();?>

.. note:: 這個函數只能在view files中使用。記憶體用量會反應整個應用程式的使用量。

如果你不喜歡使用純PHP，另一個顯示記憶體用量的方法為使用虛擬變數::

	{memory_usage}


***************
類別參考
***************

.. php:class:: CI_Benchmark

	.. php:method:: mark($name)

		:param	string	$name: 標記名稱
		:rtype:	void

        設置標記

	.. php:method:: elapsed_time([$point1 = ''[, $point2 = ''[, $decimals = 4]]])

		:param	string	$point1: 起始標記名稱
		:param	string	$point2: 結束標記名稱
		:param	int	$decimals: 小數點位數
        :returns:	經過的時間
		:rtype:	string

        計算並回傳兩個標記點間的執行時間。

        如果第一個參數為空，這個函數會回傳 ``{elapsed_time}`` 虛擬函數。這讓完整的系統執行時間能在樣板中顯示。
        The output class will swap the real value for this variable.


	.. php:method:: memory_usage()

		:returns:	記憶體用量資訊
		:rtype:	string

        回傳 ``{memory_usage}``

		This permits it to be put it anywhere in a template without the memory
		being calculated until the end. The :doc:`Output Class <output>` will
		swap the real value for this variable.
