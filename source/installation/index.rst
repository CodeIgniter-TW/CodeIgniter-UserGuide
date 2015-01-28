#########################
安裝指引
#########################

CodeIgniter 安裝分 4 個部份：

#. 解壓縮下載個安裝包。
#. 上傳 Codeigniter 的目錄以及檔案到你的 Server，一般來說 index.php 會在 Server 的根目錄。
#. 用文字編輯器或開發工具打開 application/config/config.php 然後設定你的 base URL。如果你想要設定 encryption 或 sessions，那就設定 encryption key。
#. 如果你想要用 database，請打開 application/config/database.php 檔案，然後設定你的 database 設定。

如果你想要增加安全性以及隱藏 Codeigniter 的目錄位置，你可以重新命名 system 目錄以及 application 目錄。如果你重新命名它們，你必須打開根目錄的 index.php 檔案然後設定 $system_path 以及 $application_folder 變數，改成你所改變目錄的名稱。

至於最安全的方法，讓放在 web 根目錄上的 system 以及所有 application 目錄，移動到瀏覽器無法直接存取的位置。預設的方法是 .htaccess 檔案放在所有的資料夾來避免直接存取，如果 Server 設定不支持 .htaccess，那麼最好的方法還是把它們從公開存取的資料夾移走。

如果你想要保持你的 views 資料夾公開的，那麼也可能地請把它從 application 資料夾移出。

移開它們之後，請到根目錄修改 index.php 檔案以及設定 $system_path、$application_folder、$view_folder 變數，最好是完整的路徑，像是‘/www/MyUser/system’。

除此之外一個額外的 production environments（在根目錄的index.php）預設是取消 PHP 錯誤訊息以及取消所有只允許開發者使用的功能。可以在 CodeIgniter 中，通過設定 ENVIRONMENT 變數來達成，這裡有完整的描述 :doc:`security
page <../general/security>`.

就這樣！

如果你是初學 CodeIgniter，請閱讀 :doc:`Getting
Started <../overview/getting_started>` 章節，來開始學習如何建立一個動態的 PHP 應用程式。享受它吧！

.. toctree::
	:hidden:
	:titlesonly:

	downloads
	self
	upgrading
	troubleshooting

