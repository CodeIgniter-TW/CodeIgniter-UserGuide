##########
購物車類別
##########

當消費者在瀏覽你的網頁時，購物車類別讓商品可以加入購物車中。
這些項目被檢視並顯示在標準的購物車模式中，允許消費者更新數量或移除商品。

.. 重要:: 購物車函式庫 (Cart library) 是不適用的。
   現在只用於回溯相容 (backwards compatibility)。

請注意，購物車僅提供購物車的函數功能。並沒有提供運送、信用卡授權或其他項目處理。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

**************
使用購物車類別
**************

初始化購物車類別
================

.. 重要:: 購物車類別使用了 CodeIgniter 的 :doc:`Session Class <sessions>`，將購物資訊儲存於資料庫中，
	  因此在使用購物車類別前你必須設定好資料庫，請參考 :doc:`Session Documentation <sessions>`，
	  並且於 application/config/config.php 設定好相關內容。

使用 ``$this->load->library`` 函式，在控制器中初始化購物車類別::

	$this->load->library('cart');

載入一次後，購物車的物件使用如下::

	$this->cart

.. 註記:: 購物車類別會自動下載並初始化 Session 類別，因此除非你在程式的其他地方有使用 Session，
          否則並不需要讀取 Session 類別。

在購物車中新增一個商品
======================

使用 ``$this->cart->insert`` 的方式，可以將商品資訊透過陣列放入，這樣就可以在購物車中新增商品。如下範例::

	$data = array(
		'id'      => 'sku_123ABC',
		'qty'     => 1,
		'price'   => 39.95,
		'name'    => 'T-Shirt',
		'options' => array('Size' => 'L', 'Color' => 'Red')
	);

	$this->cart->insert($data);

.. 重要:: 上面的前四組陣列索引都是必要的 (id, qty, price, and name)。
 	  少了其中一個則資料將不會被儲存在購物車中。
 	  第五個索引 (選用) 則非必要。當你商品有其他資訊需要被記錄，將其以陣列的方式儲存。

五個索引的意思如下：

-  **id** - 每個商品都必須要有一個唯一的辨識值。通常會指一個 sku，或是其他辨識值。
-  **qty** - 購買數量。
-  **price** - 商品價格。
-  **name** - 商品名稱。
-  **options** - 商品的其他附加資訊。必須使用陣列傳入。

除了上述五個索引外，還有兩個保留字 (reserved words)：rowid 和 subtotal。
這兩個適用於購物車類別的內部，因此請不要將這兩字做為索引名稱。

你的陣列會包含附加的資訊。你陣列內的任何資訊都會被儲存於 session 中。
最好的做法是在你的商品資訊中建立一套規則，如此一來將會更容易顯示你的商品資訊。

::

	$data = array(
		'id'      => 'sku_123ABC',
		'qty'     => 1,
		'price'   => 39.95,
		'name'    => 'T-Shirt',
		'coupon'	 => 'XMAS-50OFF'
	);

	$this->cart->insert($data);

若你成功插入單一商品，``insert()`` 方法將會回傳 $rowid，也就是這項編號。

在購物車中新增多個商品
======================

透過使用多維陣列的方式，可以依次將多樣商品放置在購物車中。
當你想讓消費者可以在同一頁中選擇多樣商品，此方式會相當實用。請參考以下::

	$data = array(
		array(
			'id'      => 'sku_123ABC',
			'qty'     => 1,
			'price'   => 39.95,
			'name'    => 'T-Shirt',
			'options' => array('Size' => 'L', 'Color' => 'Red')
		),
		array(
			'id'      => 'sku_567ZYX',
			'qty'     => 1,
			'price'   => 9.95,
			'name'    => 'Coffee Mug'
		),
		array(
			'id'      => 'sku_965QRS',
			'qty'     => 1,
			'price'   => 29.95,
			'name'    => 'Shot Glass'
		)
	);

	$this->cart->insert($data);

顯示購物車
==========

為了顯示購物車，你會建立一個視圖檔 :doc:`view file </general/views>`，如同以下範例：
請注意，此範例使用了表單輔助函數 :doc:`form helper </helpers/form_helper>`。

::

	<?php echo form_open('path/to/controller/update/method'); ?>

	<table cellpadding="6" cellspacing="1" style="width:100%" border="0">

	<tr>
		<th>QTY</th>
		<th>Item Description</th>
		<th style="text-align:right">Item Price</th>
		<th style="text-align:right">Sub-Total</th>
	</tr>

	<?php $i = 1; ?>

	<?php foreach ($this->cart->contents() as $items): ?>

		<?php echo form_hidden($i.'[rowid]', $items['rowid']); ?>

		<tr>
			<td><?php echo form_input(array('name' => $i.'[qty]', 'value' => $items['qty'], 'maxlength' => '3', 'size' => '5')); ?></td>
			<td>
				<?php echo $items['name']; ?>

				<?php if ($this->cart->has_options($items['rowid']) == TRUE): ?>

					<p>
						<?php foreach ($this->cart->product_options($items['rowid']) as $option_name => $option_value): ?>

							<strong><?php echo $option_name; ?>:</strong> <?php echo $option_value; ?><br />

						<?php endforeach; ?>
					</p>

				<?php endif; ?>

			</td>
			<td style="text-align:right"><?php echo $this->cart->format_number($items['price']); ?></td>
			<td style="text-align:right">$<?php echo $this->cart->format_number($items['subtotal']); ?></td>
		</tr>

	<?php $i++; ?>

	<?php endforeach; ?>

	<tr>
		<td colspan="2"> </td>
		<td class="right"><strong>Total</strong></td>
		<td class="right">$<?php echo $this->cart->format_number($this->cart->total()); ?></td>
	</tr>

	</table>

	<p><?php echo form_submit('', 'Update your Cart'); ?></p>

更新購物車
==========

為了更新購物車內的商品資訊，你必須透過 ``$this->cart->update()`` 的方式，傳送一個包含 Row ID 以及數量的陣列。

.. 註記:: 若數量是設定為 0，則商品將會從購物車中移除。

::

	$data = array(
		'rowid' => 'b99ccdf16028f015540f341130b6d8ec',
		'qty'   => 3
	);

	$this->cart->update($data);

	// 或是使用多維陣列來新增多筆

	$data = array(
		array(
			'rowid'   => 'b99ccdf16028f015540f341130b6d8ec',
			'qty'     => 3
		),
		array(
			'rowid'   => 'xw82g9q3r495893iajdh473990rikw23',
			'qty'     => 4
		),
		array(
			'rowid'   => 'fh4kdkkkaoe30njgoe92rkdkkobec333',
			'qty'     => 2
		)
	);

	$this->cart->update($data);

當插入一個商品時，你也可以更新之前定義的特性，例如選項、價格或是其他自定義範圍 (custom fields)。

::

	$data = array(
		'rowid'  => 'b99ccdf16028f015540f341130b6d8ec',
		'qty'    => 1,
		'price'	 => 49.95,
		'coupon' => NULL
	);

	$this->cart->update($data);

什麼是 Row ID？
***************

Row ID 當你將商品加入購物車時產生的一個唯一值。
這樣一來，同樣商品但不同選項的物品就能在購物車中被管理。

舉例來說，若有人買了兩件不同尺寸但款式一樣的 T-shirts (相同商品 ID)。
因為是同樣的商品，所以商品 ID 將會判定成相同的商品編號。
因此，購物車必須根據商品 ID 以及其他相關選項，提供每個商品唯一的 Row ID 來作區別。

一般而言，消費者會透過 "檢視購物車" 頁面，來更新購物車資訊。
因此身為開發人員，你必須確定 Row ID 有隱藏在你的 "檢視購物車" 頁面中，
並且確保當更新表單被提交時，它會通過 ``update()`` 方法來更新購物車。
更多資訊請參考以上的"檢視購物車"頁面。


********
類別參考
********

.. php:class:: CI_Cart

	.. attribute:: $product_id_rules = '\.a-z0-9_-'
		
		這些是我們用來驗證商品 ID 的固定表達規則－－預設為字母數字、破折號、底線及句號。

	.. attribute:: $product_name_rules	= '\w \-\.\:'
		
		這些是我們用來驗種商品 ID 及商品名稱的固定表達規則－－預設為字母數字、破折號、底線、分號及句號。
		
	.. attribute:: $product_name_safe = TRUE

		是否只允許安全商品名稱，預設為 TRUE。

	.. php:method:: insert([$items = array()])

		:param	array	$items: 加入購物車的商品
		:returns:	成功則為　TRUE，失敗則為 FALSE
		:rtype:	bool

		在購物車中加入商品，並存入 Session 表格。成功則為 TRUE，失敗則為 FALSE。

	.. php:method:: update([$items = array()])

		:param	array	$items: 購物車中更新的商品
		:returns:	成功則為 TRUE，失敗則為 FALSE。
		:rtype:	bool

		此方法允許更改商品的特性。
		一般來說若消費者在確認前修改商品數量，會從 "檢視購物車頁面" 中叫出。
		此陣列中的每個商品必須包含 rowid。

	.. php:method:: remove($rowid)

		:param	int	$rowid: 移除購物車中的商品 rowid
		:returns:	成功則為 TRUE，失敗則為 FALSE。
		:rtype:	bool

		允許你透過傳送 ``$rowid`` 移除購物車中的商品。

	.. php:method:: total()

		:returns:	總金額
		:rtype:	int

		在購物車中顯示總金額。


	.. php:method:: total_items()

		:returns:	購物車中項目的總數量
		:rtype:	int

		在購物車中顯示總數量。


	.. php:method:: contents([$newest_first = FALSE])

		:param	bool	$newest_first: 是否將最新商品排在前面
		:returns:	購物車的陣列
		:rtype:	array
		
		回傳購物車內所有東西的陣列。你可以從最新到最舊分類訂單，否則他將會從最舊到最新排序。

	.. php:method:: get_item($row_id)

		:param	int	$row_id: 欲取得的 Row ID
		:returns:	商品資訊的陣列
		:rtype:	array

		回傳吻合特定 Row ID 的商品陣列，若顯示 FALSE 則此商品不存在。

	.. php:method:: has_options($row_id = '')

		:param	int	$row_id: 欲檢查的 Row ID
		:returns:	存在返回 TRUE，不存在為 FALSE
		:rtype:	bool

		若是購物車內的特定資料含有選項，則顯示 TRUE(布林值)
		。此方法使用於含有 ``contents()``的函數中，你必須傳送 Rowid，
		可參考上述 "顯示購物車" 中的範例。
		
		如果該項目有設定附加資訊 (options) 的選項，則返回 TRUE (布林值)。
		這個方式的設計，你必須傳送 rowid 到這個方法，同時也可與 ``contents()`` 做循環 (loop) 使用，
		可參考上述 "顯示購物車" 中的範例。
		
	.. php:method:: product_options([$row_id = ''])

		:param	int	$row_id: Row ID
		:returns:	附加資訊的陣列
		:rtype:	array

		回傳購物車內的特定商品的附加資訊 (options) 陣列。
		這個方式的設計，你必須傳送 rowid 到這個方法，同時也可與 ``contents()`` 做循環 (loop) 使用，
		可參考上述 "顯示購物車" 中的範例。

	.. php:method:: destroy()

		:rtype: void

		當消費者購物完畢時，允許你清空購物車。
