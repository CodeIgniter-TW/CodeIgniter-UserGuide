###################################
替代 View 檔案的 PHP 的語法
###################################

如果你不使用 CodeIgniter 的 :doc:`樣板引擎（template engine） <../libraries/parser>` ，就得在 View files 用純 PHP 句法 。為了最少化 PHP 程式碼在這檔案中的比重，以及要讓 View files 可以比較簡單的辨識出程式碼區塊，我們會建議你使用變換 PHP 句法的功能 ，這樣就可以利用較簡易的控制結構以及 short tag 語法。如果你不熟悉這些句法，你也可以選擇不要使用。

自動支援 Short Tag
===========================

.. note:: 如果你發現在這章節中的句法，無法在你的伺服器運作的話，這有可能是在你的 PHP ini 檔案裡頭，其中的 short tags 功能被關閉了。就算你的伺服器不支援這個功能，你還是能夠依照需求修改 config/config.php，讓 CodeIgniter 可以啟用語法支援。

請留意如果你啟用了這個功能的話，假設你的 View files 發生 PHP 錯誤的話，錯誤訊息 以及實際的行號則不會確實顯示出來。所有的錯誤則會被當成是 ``eval()`` 錯誤。

替代 Echos
=================

一般使用 echo 或是印出變數的作法： ::

	<?php echo $variable; ?>

使用變換句法後，你就可以換成這個表達方式： ::

	<?=$variable?>

替代控制結構
==============================

控制結構，像是 if，for，foreach，以及 while 也可被寫程簡單的格式。這裡有個範例使用 ``foreach`` 的控制結構： ::

	<ul>

	<?php foreach ($todo as $item): ?>

		<li><?=$item?></li>

	<?php endforeach; ?>

	</ul>

請注意這邊沒有結束括號，而是以 ``endforeach`` 來取代。下列的所有控制結構有相同的結束句法（closing syntax）: ``endif`` ， ``endfor`` ， ``endforeach`` ，以及 ``endwhile``

也請注意到，在每個結構之後（除了最後一個）不使用的分號（;），而是冒號（:）。這很容易稿錯，這個非常重要！

這邊還有其它範例，使用 ``if``/``elseif``/``else``，請留意冒號： ::

	<?php if ($username === 'sally'): ?>

		<h3>Hi Sally</h3>

	<?php elseif ($username === 'joe'): ?>

		<h3>Hi Joe</h3>

	<?php else: ?>

		<h3>Hi unknown user</h3>

	<?php endif; ?>
