################
Typography 類別
################

Typography 類別可以幫忙你處理文字的格式。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

**************************
使用 Typography 類別
**************************

初始化類別
======================

就像 CodeIgniter 其它多數類別一樣，
Typography 類別可以在你的 controller 內透過 ``$this->load->library()`` 函式來初始化::

	$this->load->library('typography');

載入之後，就可以這樣取得 Typography 物件::

	$this->typography

***************
類別參考
***************

.. php:class:: CI_Typography

	.. attribute:: $protect_braced_quotes = FALSE

		當 Typography 與  :doc:`Template Parser library <parser>` 搭配使用時，
		通常會需要保護大括號內的單引號與雙引號不被改變。
		要啟用這個功能，將 ``protect_braced_quotes`` 屬性設定為 TRUE。

		使用範例::

			$this->load->library('typography');
			$this->typography->protect_braced_quotes = TRUE;

	.. php:method:: auto_typography($str[, $reduce_linebreaks = FALSE])

		:param	string	$str: 輸入字串
		:param	bool	$reduce_linebreaks: 是否縮減連續的換行
		:returns:	可安全用在 HTML 排版的字串
		:rtype:	string

		將文字格式化成語意與排版正確的 HTML。
		輸入一個字串，並套用下列的規則處理後回傳:

		 -  在段落前後加上 <p></p> （使用兩個換行來標示段落）。
		 -  換行被轉換為 <br />，除了出現在 <pre> 標籤內的以外。
		 -  區塊元素，像是 <div> 標籤，不會被放進段落中，但是若其內容文字含有段落，則內容文字會被放進段落裡。
		 -  引號會被轉換成對應的印刷體(curly)引號，除了出現在 HTML 標籤中的以外。
		 -  撇號被轉換為印刷體撇號。
		 -  兩個連字號（不管是 這 -- 樣 或 這--樣）會被轉換為破折號。
		 -  單字前面或後面的三個連續句號被轉換為省略號。
		 -  跟在句子後的兩個空白字元會被轉換為不斷行空白(non-breaking spaces)來模擬兩個空白。

		使用範例::

			$string = $this->typography->auto_typography($string);

		這邊有一個選擇性的參數，可以決定是否要將兩個以上的連續換行縮減為兩個。
		傳入布林值 TRUE 來啟用這個功能::

			$string = $this->typography->auto_typography($string, TRUE);

		.. note:: 文字排版可以用掉很多處理器資源，尤其是要處理的內容很多的時候。
			如果你決定要這麼做，你可能也會考慮 :doc:`快取 <../general/caching>` 你的頁面。

	.. php:method:: format_characters($str)

		:param	string	$str: 輸入字串
		:returns:	格式化的字串
		:rtype:	string

		這個方法類似上面的 ``auto_typography()`` ，差別是只做字元轉換：

		 -  引號會被轉換成對應的印刷體(curly)引號，除了出現在 HTML 標籤中的以外。
		 -  撇號被轉換為印刷體撇號。
		 -  兩個連字號（不管是 這 -- 樣 或 這--樣）會被轉換為破折號。
		 -  單字前面或後面的三個連續句號被轉換為省略號。
		 -  跟在句子後的兩個空白字元會被轉換為不斷行空白(non-breaking spaces)來模擬兩個空白。

		使用範例::

			$string = $this->typography->format_characters($string);

	.. php:method:: nl2br_except_pre($str)

		:param	string	$str: 輸入字串
		:returns:	格式化的字串
		:rtype:	string

		將換行轉換為 <br /> 標籤，除非其位於 <pre> 標籤內。
		這個方法與 PHP 原生的 :php:func:`nl2br()` 函式相等，但是 nl2br() 會忽略 <pre> 標籤。

		使用範例::

			$string = $this->typography->nl2br_except_pre($string);
