##########################
應用程式效能分析
##########################

這個效能分析類別（Profiler Class）會顯示出 Benchmark 的查詢結果、然後將 ``$_POST`` 的資料置於頁面的尾端。這些資訊在進行開發時，用來協助除錯或是最佳化相當有用。

初始化類別
======================

.. important:: 這各類別不需要額外步驟將它初始化。他可由 :doc:`Output 函式庫 <../libraries/output>` 自動載入，效能分析功能就會啟動並顯示結果在頁面尾端。

啟動效能分析器
=====================

在 :doc:`控制器（Controller） <controllers>` 函數中，啟動效能分析器： ::

	$this->output->enable_profiler(TRUE);

啟動之後，效能結果就會被產生出來放入頁面尾端。

關閉效能分析器的方式： ::

	$this->output->enable_profiler(FALSE);

設定 Benchmark 點
========================

為了使效能分析器去編譯以及顯示 Benchmark 資料，你一定標記 Benchmark 點。

請參考設定 Benchmark 點的分法 :doc:`Benchmark 函式庫 <../libraries/benchmark>` 頁面。

啟動和關閉效能分析器的區段
========================================

分析資料中的每個字段可通過設置相應的控制變數 TRUE or FALSE 來啟用和關閉。其中的一個方法是：你可以在 *application/config/profiler.php* 設定文件裡設置整個程序的全域預設值。

例子： ::

	$config['config']          = FALSE;
	$config['queries']         = FALSE;

你可以在控制器中通過呼叫 ``set_profiler_sections()`` 來複寫預設的設定，詳細參考： :doc:`Output 函式庫 <../libraries/output>` ： ::

	$sections = array(
		'config'  => TRUE,
		'queries' => TRUE
	);

	$this->output->set_profiler_sections($sections);

下表列出了可用的分析器資料字段和用來訪問這些字段的 key。

======================= =================================================================== ========
Key                     Description                                                         Default
======================= =================================================================== ========
**benchmarks**          在各個計時點花費的時間以及總時間															            TRUE
**config**              CodeIgniter 設定變數         	                                        TRUE
**controller_info**     被呼叫的方法以及所屬的控制器類別 							                            TRUE
**get**                 請求所傳遞的所有 GET 資料 						                                  TRUE
**http_headers**        本次請求的 HTTP 標頭												                            TRUE
**memory_usage**        本次請求所消耗的總記憶體空間，用 bytes 來計算										          TRUE
**post**                請求所傳遞的所有 POST 資料 						                                  TRUE
**queries**             列出資料庫操作的語句以及消耗的時間																			  TRUE
**uri_string**          本次請求的 URI 字串							                                      TRUE
**session_data**        本次的資料儲存在 session                                  							TRUE
**query_toggle_count**  在幾次資料庫語句執行，資料庫區塊預設為隱藏   															 25
======================= =================================================================== ========

.. note:: 從資料庫設定檔中關閉 :doc:`save_queries </database/configuration>` 設定將會有效關閉無用的資料庫’語句操作‘以及頁面呈現分析的消耗資源。你可以選擇性地複寫掉這個設定 ``$this->db->save_queries = TRUE;`` 。沒有這個設置，您將無法查看資料庫語句操作或者	`last_query <database/helpers>` 。
