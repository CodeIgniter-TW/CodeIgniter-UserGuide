###############
Language 輔助函式
###############

Language 輔助函式包含了各種輔助多國語言操作的相關函式。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

導入輔助函式
===================

輔助函式的載入語法如下：

	$this->load->helper('language');

可用函示格式
===================

允許使用的函示格式如下：


.. php:function:: lang($line[, $for = ''[, $attributes = array()]])

 	:param	string	$line: Language line key
 	:param	string	$for: HTML "for" attribute (ID of the element we're creating a label for)
 	:param	array	$attributes: 額外的 HTML 元素
 	:returns:	HTML-formatted 語言標籤
	:rtype:	string

	此函示回傳顯示格式會比 ``CI_Lang::line()`` 更清楚易懂。

	範例::

		echo lang('language_key', 'form_item_id', array('class' => 'myClass'));
		// 顯示: <label for="form_item_id" class="myClass">Language line</label>
