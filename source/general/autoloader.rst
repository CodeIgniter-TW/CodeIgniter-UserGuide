######################
自動載入資源
######################

CodeIgniter 具有”自動載入（auto-load）“的功能，可允許程式庫、輔助函數、Model 模組在每次系統啟動時自動載入。如果你需要某個資源可在 application 被全域（globally）使用的話，你應該考慮使用自動載入的功能。


底下的項目可以被自動載入：

-  位在 *libraries/* 目錄下的核心類別檔（core classes）
-  位在 *helpers/* 目錄下的補助函式檔（helpers）
-  位在 *config/* 目錄下的自訂設定檔（config）
-  位在 *system/language/* 目錄下的語言檔（language）
-  位在 *models/* 目錄下的資料庫檔（models）

要自動載入資源，請開啟 **application/config/autoload.php** 的檔案，然後將要自動載入的項目置於 autoload array 裡頭。你可以位不同的載入項目，找到相關的的說明。

.. note:: 當新增載入項目至 autoload array 時，不需要包含檔案的副檔名（.php）。

此外，如果你想要在 CodeIgniter 中使用 `Composer <https://getcomposer.org/>`_
自動載入器，只要設定 ``$config['composer_autoload']`` 成 ``TRUE`` 或者
設定客製化路徑 **application/config/config.php** 設定檔。
