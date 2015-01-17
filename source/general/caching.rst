################
網頁快取
################

CodeIgniter 讓你快取自己的網頁，為了要達到最大效能。

雖然 CodeIgniter 相當快，呈現在網頁中的動態資訊取決於於伺服器所擁有的資源、記憶體、處理器的使用率、都會影響到你的網頁處理速度。藉由快取（Caching）你的網頁的方式，只需快取下來就可以發揮功用，可說是達到近乎是靜態網頁的效能。

快取是如何運作的呢？
======================

快取可以把單頁為最小單位，你可以設定頁面的保留時間、何時該被重新更新（Refresh）。當頁面首次載入時，快取檔案則會寫 applocation/cache 目錄之中。下個頁面則由快取檔案取出，接者把這個頁面傳送給對伺服器送出請求（Request）的瀏覽器。假如請求的檔案已經過期（Expired），那麼舊的快取頁面則會被刪除，然後伺服器更新快取後，才會把頁面傳送給瀏覽器。

.. note: Benchmark 標籤並沒有被快取下來，所以當快取功能啟動的時候，你還是可以看到頁面載入的速度。

啟動快取
================

啟動快取功能的方式，把下列的語句放到你的控制器（Controller）裡的任何方法（function）位置： ::

	$this->output->cache($n);

``n`` 代表的是你的頁面預期要保留到更新（remain cached between refreshes）的 **分鐘（minutes）** 。

上面的快取語句可以隨意放在（Controller）的方法（function）裡頭，不會影響到呈現的順序，所以放在你覺得最合理的地方即可。

.. important:: CodeIgniter 採用的是輸出後，才會儲存內容的設計方式，也就是快取（Caching）只會在你的控制器（Controller）要求 :doc:`View <./views>` 的時候，它才會被建立出來。

.. important:: If you change configuration options that might affect
	your output, you have to manually delete your cache files.

.. note:: 為了讓快取檔案可以被寫入到 *application/cache* 目錄，請務必將該目錄開啟為可以被寫入的權限。

刪除快取
===============

如果不再需要某些快取檔案，你可以移除快取語句，這樣在快取檔過期之後就不會再被更新了。

.. note:: 移除語句之後，快取不會被直接移除，還是會被保留下來到原先設定的時間到逾期為止。

如果要提前刪除快取資料，你可以使用 ``delete_cache()`` 函數： ::

	// 對現在請求的 URI 刪除快取
	$this->output->delete_cache();

	// 刪除快取 /foo/bar
	$this->output->delete_cache('/foo/bar');
